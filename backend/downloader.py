"""
Audio Downloader and Metadata Tagging Engine.
Searches YouTube Music / YouTube, downloads high-quality audio streams,
converts via FFmpeg, and embeds accurate Spotify metadata and cover artwork.
"""

import asyncio
from collections import OrderedDict, deque
import concurrent.futures
import os
import re
import shutil
import subprocess
import sys
import threading
import time
from typing import Any, Callable, Dict, List, Optional, Tuple
import urllib.parse
import requests

import static_ffmpeg
static_ffmpeg.add_paths()

import yt_dlp
from mutagen.id3 import ID3, APIC, TIT2, TPE1, TALB, TDRC, TRCK, USLT
from mutagen.mp3 import MP3
from mutagen.mp4 import MP4, MP4Cover
from mutagen.flac import FLAC, Picture
from backend.lyrics import fetch_lyrics, save_lrc_file, clean_track_title, clean_artist_name


def sanitize_filename(name: str) -> str:
    """Removes illegal filesystem characters on Windows and other OSes."""
    cleaned = re.sub(r'[<>:"/\\|?*]', '_', name)
    cleaned = re.sub(r'[\x00-\x1f]', '', cleaned)
    return cleaned.strip(". ") or "track"


def open_folder_in_explorer(folder_path: str) -> bool:
    """Opens a folder in Windows File Explorer."""
    abs_path = os.path.abspath(folder_path)
    if not os.path.exists(abs_path):
        os.makedirs(abs_path, exist_ok=True)
    try:
        if sys.platform == "win32":
            os.startfile(abs_path)
        elif sys.platform == "darwin":
            subprocess.run(["open", abs_path], check=True)
        else:
            subprocess.run(["xdg-open", abs_path], check=True)
        return True
    except Exception as e:
        print(f"[Error opening folder] {e}", file=sys.stderr)
        return False


_IMAGE_CACHE_MAX = 150

class _BoundedImageCache:
    """Thread-safe LRU cache for album artwork with bounded memory."""
    def __init__(self, max_size: int = _IMAGE_CACHE_MAX):
        self._cache: OrderedDict[str, bytes] = OrderedDict()
        self._lock = threading.Lock()
        self._max_size = max_size

    def get(self, key: str) -> Optional[bytes]:
        with self._lock:
            if key in self._cache:
                self._cache.move_to_end(key)
                return self._cache[key]
        return None

    def put(self, key: str, value: bytes) -> None:
        with self._lock:
            if key in self._cache:
                self._cache.move_to_end(key)
            else:
                if len(self._cache) >= self._max_size:
                    self._cache.popitem(last=False)
                self._cache[key] = value

    def clear(self) -> None:
        with self._lock:
            self._cache.clear()

_IMAGE_CACHE = _BoundedImageCache()
_HTTP_SESSION = requests.Session()
_HTTP_SESSION.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
})


def fetch_cover_image(cover_url: str) -> Optional[bytes]:
    """Downloads album artwork with LRU caching."""
    if not cover_url:
        return None

    cached = _IMAGE_CACHE.get(cover_url)
    if cached is not None:
        return cached

    # Attempt 1: Direct fetch via persistent session
    try:
        res = _HTTP_SESSION.get(cover_url, timeout=8)
        if res.status_code == 200 and res.content:
            _IMAGE_CACHE.put(cover_url, res.content)
            return res.content
    except Exception:
        pass

    # Attempt 2: Fallback with explicit image headers
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        }
        res = requests.get(cover_url, headers=headers, timeout=10)
        if res.status_code == 200 and res.content:
            _IMAGE_CACHE.put(cover_url, res.content)
            return res.content
    except Exception:
        pass

    return None


def embed_metadata(
    file_path: str,
    title: str,
    artists: str,
    album: str,
    year: str,
    track_number: int,
    total_tracks: int,
    cover_url: Optional[str] = None,
    audio_format: str = "mp3",
    embed_artwork: bool = True,
    lyrics_text: Optional[str] = None,
) -> None:
    """
    Embeds complete ID3 / Vorbis / MP4 metadata, high-res cover art, and synchronized/plain lyrics.
    Uses in-memory cache to avoid re-downloading duplicate album covers.
    """
    img_data = None
    if cover_url and embed_artwork:
        img_data = fetch_cover_image(cover_url)

    ext = os.path.splitext(file_path)[1].lower()

    if ext == ".mp3":
        audio = MP3(file_path, ID3=ID3)
        try:
            audio.add_tags()
        except Exception:
            pass

        audio.tags.add(TIT2(encoding=3, text=[title]))
        audio.tags.add(TPE1(encoding=3, text=[artists]))
        audio.tags.add(TALB(encoding=3, text=[album]))
        if year:
            audio.tags.add(TDRC(encoding=3, text=[str(year)]))
        audio.tags.add(TRCK(encoding=3, text=[f"{track_number}/{total_tracks}"]))

        if lyrics_text:
            audio.tags.add(USLT(encoding=3, lang="eng", desc="Lyrics", text=lyrics_text))

        if img_data:
            audio.tags.add(APIC(
                encoding=3,
                mime="image/jpeg",
                type=3,
                desc="Front Cover",
                data=img_data,
            ))
        audio.save()

    elif ext in [".m4a", ".mp4"]:
        mp4 = MP4(file_path)
        mp4["\xa9nam"] = [title]
        mp4["\xa9ART"] = [artists]
        mp4["\xa9alb"] = [album]
        if year:
            mp4["\xa9day"] = [str(year)]
        mp4["trkn"] = [(track_number, total_tracks)]

        if lyrics_text:
            mp4["\xa9lyr"] = [lyrics_text]

        if img_data:
            cov_format = MP4Cover.FORMAT_PNG if img_data.startswith(b'\x89PNG') else MP4Cover.FORMAT_JPEG
            mp4["covr"] = [MP4Cover(img_data, imageformat=cov_format)]
        mp4.save()

    elif ext == ".flac":
        flac = FLAC(file_path)
        flac["title"] = [title]
        flac["artist"] = [artists]
        flac["album"] = [album]
        if year:
            flac["date"] = [str(year)]
        flac["tracknumber"] = [str(track_number)]
        flac["totaltracks"] = [str(total_tracks)]

        if lyrics_text:
            flac["lyrics"] = [lyrics_text]

        if img_data:
            pic = Picture()
            pic.type = 3
            pic.mime = "image/png" if img_data.startswith(b'\x89PNG') else "image/jpeg"
            pic.desc = "Front Cover"
            pic.data = img_data
            flac.clear_pictures()
            flac.add_picture(pic)
        flac.save()


def _parse_youtube_url_string(c: str) -> Optional[str]:
    """Helper to cleanly parse a YouTube URL or URI string into a canonical watch URL."""
    if not c or not isinstance(c, str):
        return None
    c = c.strip()
    if not c:
        return None

    if c.lower().startswith("youtube:"):
        m = re.match(r"^youtube:(?:track:)?([a-zA-Z0-9_-]{11})$", c, re.IGNORECASE)
        if m:
            return f"https://www.youtube.com/watch?v={m.group(1)}"
        return None

    try:
        parsed = urllib.parse.urlparse(c)
        host = (parsed.netloc or "").lower()
        path = parsed.path or ""

        # youtu.be shortlinks: https://youtu.be/VIDEO_ID?params
        if host in ("youtu.be", "www.youtu.be"):
            vid = path.strip("/").split("/")[0]
            if re.match(r"^[a-zA-Z0-9_-]{11}$", vid):
                return f"https://www.youtube.com/watch?v={vid}"

        # youtube.com, music.youtube.com, m.youtube.com, etc.
        if any(h in host for h in ("youtube.com", "youtube-nocookie.com")):
            # If it's purely a playlist URL without a specific video, don't treat it as a direct track stream
            if path == "/playlist" or ("list=" in parsed.query and "v=" not in parsed.query):
                return None

            # Standard watch URL: /watch?v=VIDEO_ID
            qs = urllib.parse.parse_qs(parsed.query)
            if "v" in qs and qs["v"]:
                vid = qs["v"][0]
                if re.match(r"^[a-zA-Z0-9_-]{11}$", vid):
                    return f"https://www.youtube.com/watch?v={vid}"

            # /shorts/VIDEO_ID, /live/VIDEO_ID, /embed/VIDEO_ID, /v/VIDEO_ID
            m = re.match(r"^/(?:shorts|live|embed|v)/([a-zA-Z0-9_-]{11})", path, re.IGNORECASE)
            if m:
                return f"https://www.youtube.com/watch?v={m.group(1)}"

            # If it has /watch in path and any v parameter
            if "/watch" in path and "v" in qs and qs["v"]:
                return f"https://www.youtube.com/watch?v={qs['v'][0]}"
    except Exception:
        pass

    return None


def extract_youtube_url(track: Dict[str, Any]) -> Optional[str]:
    """Extracts direct YouTube watch URL from track dict if available."""
    if not isinstance(track, dict):
        return None

    yt_id = track.get("youtube_id") or track.get("youtube_video_id") or track.get("yt_id") or track.get("video_id")
    if yt_id and isinstance(yt_id, str):
        yt_id = yt_id.strip()
        if re.match(r"^[a-zA-Z0-9_-]{11}$", yt_id):
            return f"https://www.youtube.com/watch?v={yt_id}"
        res = _parse_youtube_url_string(yt_id)
        if res:
            return res

    uri = track.get("uri")
    if uri:
        res = _parse_youtube_url_string(uri)
        if res:
            return res

    candidates = [
        track.get("direct_url"),
        track.get("url"),
        track.get("webpage_url"),
        track.get("link"),
        track.get("spotify_url"),
    ]

    for cand in candidates:
        if cand:
            res = _parse_youtube_url_string(str(cand))
            if res:
                return res

    source = str(track.get("source") or "").lower()
    t_id = str(track.get("id") or "").strip()
    if t_id:
        if "youtube.com" in t_id or "youtu.be" in t_id or t_id.lower().startswith("youtube:"):
            res = _parse_youtube_url_string(t_id)
            if res:
                return res
        if source in ("youtube", "youtube_music") and re.match(r"^[a-zA-Z0-9_-]{11}$", t_id):
            return f"https://www.youtube.com/watch?v={t_id}"

    return None


_CACHED_FFMPEG_DIR: Optional[str] = None
_FFMPEG_RESOLVE_LOCK = threading.Lock()

def get_ffmpeg_dir() -> Optional[str]:
    """Cached thread-safe resolver for FFmpeg directory."""
    global _CACHED_FFMPEG_DIR
    if _CACHED_FFMPEG_DIR is not None:
        return _CACHED_FFMPEG_DIR or None
    with _FFMPEG_RESOLVE_LOCK:
        if _CACHED_FFMPEG_DIR is None:
            try:
                from setup_ffmpeg import ensure_ffmpeg
                bin_path, _ = ensure_ffmpeg()
                _CACHED_FFMPEG_DIR = os.path.dirname(bin_path) if bin_path else ""
            except Exception:
                _CACHED_FFMPEG_DIR = ""
    return _CACHED_FFMPEG_DIR or None


class DownloadManager:
    """
    Manages active download queue, real-time progress calculation, and thread-safe cancellation.
    """

    def __init__(self):
        self.active_job: Optional[Dict[str, Any]] = None
        self._cancel_flag = False
        self._lock = threading.Lock()
        self.subscribers: List[asyncio.Queue] = []
        self._sub_lock = threading.Lock()

    def add_subscriber(self, q: asyncio.Queue) -> None:
        with self._sub_lock:
            if q not in self.subscribers:
                self.subscribers.append(q)

    def remove_subscriber(self, q: asyncio.Queue) -> None:
        with self._sub_lock:
            if q in self.subscribers:
                self.subscribers.remove(q)

    def broadcast_event(self, event_type: str, data: Dict[str, Any]) -> None:
        """Notifies connected SSE listeners of progress updates safely."""
        payload = {"type": event_type, "data": data}
        with self._sub_lock:
            subs = list(self.subscribers)
        for q in subs:
            try:
                q.put_nowait(payload)
            except Exception:
                pass

    def cancel_current_job(self) -> None:
        """Signals active downloads to abort."""
        with self._lock:
            self._cancel_flag = True
            if self.active_job:
                self.active_job["status"] = "cancelled"
        self.broadcast_event("job_cancelled", {"message": "Download cancelled by user."})

    def is_cancelled(self) -> bool:
        with self._lock:
            return self._cancel_flag

    def start_download_job(
        self,
        playlist_title: str,
        tracks: List[Dict[str, Any]],
        options: Dict[str, Any],
        loop: asyncio.AbstractEventLoop,
    ) -> None:
        """Starts the download job in a background worker thread."""
        with self._lock:
            self._cancel_flag = False
            self.active_job = {
                "playlist_title": playlist_title,
                "status": "running",
                "total": len(tracks),
                "completed": 0,
                "failed": 0,
                "tracks": {t["id"]: {"status": "queued", "progress": 0, "message": "Queued", "title": t.get("title", "")} for t in tracks},
                "options": options,
                "output_dir": options.get("output_dir", ""),
            }

        thread = threading.Thread(
            target=self._run_job_worker,
            args=(playlist_title, tracks, options, loop),
            daemon=True,
        )
        thread.start()

    def _run_job_worker(
        self,
        playlist_title: str,
        tracks: List[Dict[str, Any]],
        options: Dict[str, Any],
        loop: asyncio.AbstractEventLoop,
    ) -> None:
        output_dir = options.get("output_dir", "")
        if not output_dir:
            user_music = os.path.join(os.path.expanduser("~"), "Music", "My-Music Downloads")
            output_dir = os.path.join(user_music, sanitize_filename(playlist_title))

        os.makedirs(output_dir, exist_ok=True)
        audio_format = options.get("audio_format", "mp3").lower()
        bitrate = options.get("bitrate", "320")
        filename_format = options.get("filename_format", "{artist} - {title}")
        create_m3u8 = options.get("create_m3u8", True)
        overwrite = options.get("overwrite", False)

        total_tracks = len(tracks)

        # Concurrency setting (default 3, clamped between 1 and 8 for stability & speed)
        concurrency = int(options.get("concurrency", 3))
        concurrency = max(1, min(8, concurrency))

        # Pre-warm unique album artwork in background pool to eliminate artwork latency
        unique_covers = {t.get("cover_url") for t in tracks if t.get("cover_url")}
        if unique_covers and options.get("embed_artwork", True):
            def _prewarm_covers():
                try:
                    with concurrent.futures.ThreadPoolExecutor(max_workers=min(4, len(unique_covers))) as pool:
                        list(pool.map(fetch_cover_image, unique_covers))
                except Exception:
                    pass
            threading.Thread(target=_prewarm_covers, daemon=True).start()

        # Dedicated background executor for asynchronous lyrics pre-fetching
        lyrics_pool = concurrent.futures.ThreadPoolExecutor(max_workers=concurrency)

        downloaded_dict: Dict[int, Tuple[str, str, int]] = {}
        dict_lock = threading.Lock()
        job_start_time = time.time()
        track_bytes_downloaded: Dict[str, int] = {}
        bytes_lock = threading.Lock()

        # Rolling window for responsive instantaneous bandwidth & smooth ETA calculation
        speed_samples = deque(maxlen=20)  # stores (timestamp, total_bytes)
        smoothed_speed_bps = 0.0
        ffmpeg_dir = get_ffmpeg_dir()

        with self._lock:
            if not self.active_job:
                self.active_job = {
                    "playlist_title": playlist_title,
                    "status": "running",
                    "total": total_tracks,
                    "completed": 0,
                    "failed": 0,
                    "tracks": {t["id"]: {"status": "queued", "progress": 0, "message": "Queued", "title": t.get("title", "")} for t in tracks},
                    "options": options,
                    "output_dir": output_dir,
                }

        def broadcast_progress_snapshot():
            nonlocal smoothed_speed_bps
            now = time.time()
            elapsed = max(0.5, now - job_start_time)

            with bytes_lock:
                total_bytes = sum(track_bytes_downloaded.values())

            # Rolling speed calculation over a 2-second window
            speed_samples.append((now, total_bytes))
            while len(speed_samples) > 2 and (now - speed_samples[0][0]) > 2.0:
                speed_samples.popleft()

            if len(speed_samples) >= 2:
                dt = now - speed_samples[0][0]
                db = total_bytes - speed_samples[0][1]
                if dt >= 0.3:
                    inst_speed = max(0.0, db / dt)
                else:
                    inst_speed = total_bytes / elapsed
            else:
                inst_speed = total_bytes / elapsed

            if smoothed_speed_bps == 0.0:
                smoothed_speed_bps = inst_speed
            else:
                # 35% instantaneous, 65% history for smooth non-jittery reading
                smoothed_speed_bps = 0.35 * inst_speed + 0.65 * smoothed_speed_bps

            if smoothed_speed_bps >= 1024 * 1024:
                speed_str = f"{smoothed_speed_bps / (1024 * 1024):.1f} MB/s"
            elif smoothed_speed_bps >= 1024:
                speed_str = f"{smoothed_speed_bps / 1024:.0f} KB/s"
            else:
                speed_str = f"{smoothed_speed_bps:.0f} B/s"

            with self._lock:
                if not self.active_job:
                    return
                completed = self.active_job["completed"]
                failed = self.active_job["failed"]
                done_count = completed + failed

                # Continuous overall percentage based on real-time track progress sum
                track_progress_sum = sum(
                    t.get("progress", 0) for t in self.active_job["tracks"].values()
                )
                if done_count >= total_tracks:
                    overall_pct = 100
                else:
                    calc_pct = (track_progress_sum / total_tracks) if total_tracks > 0 else 0
                    overall_pct = min(99, int(round(calc_pct)))

                active_workers = [
                    t.get("title", "Track")
                    for t in self.active_job["tracks"].values()
                    if t.get("status") in ("searching", "downloading", "converting", "tagging")
                ]

            # Responsive dynamic ETA calculation based on progress rate
            if done_count >= total_tracks:
                eta_str = "Complete"
            elif overall_pct >= 2 and elapsed >= 1.0:
                pct_rate = overall_pct / elapsed
                if pct_rate > 0.05:
                    rem_sec = int((100 - overall_pct) / pct_rate)
                    if rem_sec < 60:
                        eta_str = f"~{rem_sec}s"
                    elif rem_sec < 3600:
                        eta_str = f"~{rem_sec // 60}m {rem_sec % 60:02d}s"
                    else:
                        eta_str = f"~{rem_sec // 3600}h {(rem_sec % 3600) // 60}m"
                else:
                    eta_str = "Calculating..."
            else:
                eta_str = "Calculating..."

            loop.call_soon_threadsafe(
                self.broadcast_event,
                "job_progress",
                {
                    "completed": completed,
                    "failed": failed,
                    "total": total_tracks,
                    "percent": overall_pct,
                    "speed": speed_str,
                    "eta": eta_str,
                    "elapsed": int(elapsed),
                    "active_count": len(active_workers),
                    "active_tracks": active_workers[:3],
                },
            )

        def download_single_track(item: Tuple[int, Dict[str, Any]]):
            idx, track = item
            if self.is_cancelled():
                return

            track_id = track["id"]
            track_title = track.get("title", "Unknown Track")
            track_artists = track.get("artists", "Unknown Artist")
            album_name = track.get("album") or playlist_title or "Spotify"
            year = track.get("year", "")
            cover_url = track.get("cover_url", "")
            duration_ms = track.get("duration_ms", 0)

            # Check if track has a direct YouTube URL
            direct_yt_url = extract_youtube_url(track)

            # Minimal stagger only for initial burst to prevent socket stampede
            if concurrency > 1 and idx <= concurrency and not direct_yt_url:
                time.sleep((idx % concurrency) * 0.05)

            # Build target filename
            clean_title = sanitize_filename(track_title)
            clean_artist = sanitize_filename(track_artists)
            if filename_format == "{track_number} - {artist} - {title}":
                filename = f"{idx:02d} - {clean_artist} - {clean_title}.{audio_format}"
            else:
                filename = f"{clean_artist} - {clean_title}.{audio_format}"

            final_filepath = os.path.join(output_dir, filename)

            # Check if file already exists
            if os.path.exists(final_filepath) and not overwrite:
                with self._lock:
                    self.active_job["completed"] += 1
                    self.active_job["tracks"][track_id] = {
                        "status": "completed",
                        "progress": 100,
                        "message": "Already downloaded",
                        "filename": filename,
                        "filepath": final_filepath,
                        "title": track_title,
                    }
                with dict_lock:
                    downloaded_dict[idx] = (filename, f"{track_artists} - {track_title}", duration_ms // 1000)

                loop.call_soon_threadsafe(
                    self.broadcast_event,
                    "track_update",
                    {"track_id": track_id, "status": "completed", "progress": 100, "message": "Already exists (skipped)", "filepath": final_filepath, "filename": filename},
                )
                broadcast_progress_snapshot()
                return

            # Asynchronously pre-fetch lyrics in parallel with audio download
            lyrics_future = None
            if options.get("download_lyrics", True):
                try:
                    dur_sec = duration_ms // 1000 if duration_ms > 0 else 0
                    lyrics_future = lyrics_pool.submit(fetch_lyrics, track_title, track_artists, album_name, dur_sec)
                except Exception:
                    pass

            # Notify initial status
            if direct_yt_url:
                with self._lock:
                    self.active_job["tracks"][track_id] = {
                        "status": "downloading",
                        "progress": 15,
                        "message": "Connecting to direct YouTube stream...",
                        "title": track_title,
                    }
                loop.call_soon_threadsafe(
                    self.broadcast_event,
                    "track_update",
                    {"track_id": track_id, "status": "downloading", "progress": 15, "message": "Connecting to direct YouTube stream..."},
                )
            else:
                with self._lock:
                    self.active_job["tracks"][track_id] = {
                        "status": "searching",
                        "progress": 10,
                        "message": "Finding best audio stream...",
                        "title": track_title,
                    }
                loop.call_soon_threadsafe(
                    self.broadcast_event,
                    "track_update",
                    {"track_id": track_id, "status": "searching", "progress": 10, "message": "Finding best audio stream..."},
                )
            broadcast_progress_snapshot()

            try:
                temp_tmpl = os.path.join(output_dir, f"temp_{track_id}.%(ext)s")
                _last_progress_emit = 0.0
                _PROGRESS_THROTTLE_SEC = 0.25

                def ydl_progress_hook(d):
                    nonlocal _last_progress_emit
                    if self.is_cancelled():
                        raise yt_dlp.utils.DownloadCancelled("Download cancelled by user")

                    hook_status = d.get("status")
                    if hook_status == "downloading":
                        total_bytes = d.get("total_bytes") or d.get("total_bytes_estimate") or 0
                        downloaded_bytes = d.get("downloaded_bytes") or 0

                        with bytes_lock:
                            track_bytes_downloaded[track_id] = downloaded_bytes

                        # Map download phase smoothly across 15% -> 85%
                        if total_bytes > 0:
                            pct = 15 + int((downloaded_bytes / total_bytes) * 70)
                        else:
                            pct = min(84, 15 + int(downloaded_bytes / (6 * 1024 * 1024) * 70))
                        pct = max(15, min(85, pct))

                        with self._lock:
                            if self.active_job and track_id in self.active_job.get("tracks", {}):
                                self.active_job["tracks"][track_id]["progress"] = pct
                                self.active_job["tracks"][track_id]["status"] = "downloading"
                                self.active_job["tracks"][track_id]["message"] = f"Downloading audio {pct}%"

                        now = time.time()
                        if now - _last_progress_emit < _PROGRESS_THROTTLE_SEC:
                            return
                        _last_progress_emit = now

                        loop.call_soon_threadsafe(
                            self.broadcast_event,
                            "track_update",
                            {
                                "track_id": track_id,
                                "status": "downloading",
                                "progress": pct,
                                "message": f"Downloading audio {pct}%",
                            },
                        )
                        broadcast_progress_snapshot()

                    elif hook_status == "finished":
                        with self._lock:
                            if self.active_job and track_id in self.active_job.get("tracks", {}):
                                self.active_job["tracks"][track_id]["progress"] = 85
                                self.active_job["tracks"][track_id]["status"] = "converting"
                                self.active_job["tracks"][track_id]["message"] = "Converting audio (FFmpeg)..."
                        loop.call_soon_threadsafe(
                            self.broadcast_event,
                            "track_update",
                            {
                                "track_id": track_id,
                                "status": "converting",
                                "progress": 85,
                                "message": "Converting audio (FFmpeg)...",
                            },
                        )
                        broadcast_progress_snapshot()

                def ydl_postprocessor_hook(d):
                    if self.is_cancelled():
                        raise yt_dlp.utils.DownloadCancelled("Download cancelled by user")

                    pp_status = d.get("status")
                    if pp_status == "started":
                        with self._lock:
                            if self.active_job and track_id in self.active_job.get("tracks", {}):
                                self.active_job["tracks"][track_id]["progress"] = 88
                                self.active_job["tracks"][track_id]["status"] = "converting"
                                self.active_job["tracks"][track_id]["message"] = f"Extracting {audio_format.upper()} audio..."
                        loop.call_soon_threadsafe(
                            self.broadcast_event,
                            "track_update",
                            {
                                "track_id": track_id,
                                "status": "converting",
                                "progress": 88,
                                "message": f"Extracting {audio_format.upper()} audio...",
                            },
                        )
                        broadcast_progress_snapshot()
                    elif pp_status == "finished":
                        with self._lock:
                            if self.active_job and track_id in self.active_job.get("tracks", {}):
                                self.active_job["tracks"][track_id]["progress"] = 92
                                self.active_job["tracks"][track_id]["status"] = "tagging"
                                self.active_job["tracks"][track_id]["message"] = "Embedding metadata & artwork..."
                        loop.call_soon_threadsafe(
                            self.broadcast_event,
                            "track_update",
                            {
                                "track_id": track_id,
                                "status": "tagging",
                                "progress": 92,
                                "message": "Embedding metadata & artwork...",
                            },
                        )
                        broadcast_progress_snapshot()

                ydl_opts = {
                    "format": "bestaudio/best",
                    "outtmpl": temp_tmpl,
                    "noplaylist": True,
                    "nocheckcertificate": True,
                    "progress_hooks": [ydl_progress_hook],
                    "postprocessor_hooks": [ydl_postprocessor_hook],
                    "ffmpeg_location": ffmpeg_dir,
                    "socket_timeout": 15,
                    "retries": 3,
                    "fragment_retries": 3,
                    "postprocessors": [
                        {
                            "key": "FFmpegExtractAudio",
                            "preferredcodec": audio_format,
                            "preferredquality": bitrate,
                        }
                    ],
                    "quiet": True,
                    "no_warnings": True,
                }

                temp_converted = os.path.join(output_dir, f"temp_{track_id}.{audio_format}")
                if os.path.exists(temp_converted):
                    try:
                        os.remove(temp_converted)
                    except Exception:
                        pass

                download_success = False

                # Single reusable YoutubeDL session per track worker to eliminate instantiation overhead
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    if direct_yt_url:
                        try:
                            ydl.download([direct_yt_url])
                            if os.path.exists(temp_converted):
                                download_success = True
                        except Exception as yt_err:
                            print(f"[Direct YouTube Download Warning] Failed for '{direct_yt_url}': {yt_err}")

                    if not download_success:
                        if self.is_cancelled():
                            return

                        if direct_yt_url:
                            with self._lock:
                                if self.active_job and track_id in self.active_job.get("tracks", {}):
                                    self.active_job["tracks"][track_id]["status"] = "searching"
                                    self.active_job["tracks"][track_id]["progress"] = 20
                                    self.active_job["tracks"][track_id]["message"] = "Direct stream unavailable, searching audio alternatives..."
                            loop.call_soon_threadsafe(
                                self.broadcast_event,
                                "track_update",
                                {"track_id": track_id, "status": "searching", "progress": 20, "message": "Direct stream unavailable, searching audio alternatives..."},
                            )
                            broadcast_progress_snapshot()

                        # Multi-Strategy Search & Fallback Pipeline with cleaned metadata queries
                        c_title = clean_track_title(track_title)
                        c_artist = clean_artist_name(track_artists)

                        search_queries = [
                            f"ytsearch1:{track_artists} - {track_title} official audio",
                            f"ytsearch1:{c_artist} - {c_title}",
                            f"scsearch1:{c_artist} - {c_title}",
                            f"ytsearch1:{c_artist} {c_title}",
                            f"scsearch1:{c_title}",
                        ]

                        for q in search_queries:
                            if self.is_cancelled():
                                return
                            try:
                                ydl.download([q])
                                if os.path.exists(temp_converted):
                                    download_success = True
                                    break
                            except Exception:
                                continue

                if not download_success or not os.path.exists(temp_converted):
                    raise RuntimeError(f"Could not extract audio stream for '{track_title}'.")

                # Move temp to final target filename
                if os.path.exists(final_filepath):
                    os.remove(final_filepath)
                shutil.move(temp_converted, final_filepath)

                # Tagging & Lyrics phase
                with self._lock:
                    if self.active_job and track_id in self.active_job.get("tracks", {}):
                        self.active_job["tracks"][track_id]["status"] = "tagging"
                        self.active_job["tracks"][track_id]["progress"] = 95
                        self.active_job["tracks"][track_id]["message"] = "Embedding metadata & lyrics..."
                loop.call_soon_threadsafe(
                    self.broadcast_event,
                    "track_update",
                    {"track_id": track_id, "status": "tagging", "progress": 95, "message": "Embedding metadata & lyrics..."},
                )
                broadcast_progress_snapshot()

                # Collect lyrics (from background future)
                lyrics_text = None
                if lyrics_future is not None:
                    try:
                        lyrics_data = lyrics_future.result(timeout=1.5)
                        if lyrics_data:
                            lyrics_text = lyrics_data.get("plain_lyrics") or lyrics_data.get("synced_lyrics")
                            if lyrics_data.get("synced_lyrics"):
                                base_fname = os.path.splitext(filename)[0]
                                save_lrc_file(output_dir, base_fname, lyrics_data["synced_lyrics"])
                    except Exception as lex:
                        print(f"[Lyrics] Minor notice for '{track_title}': {lex}")

                embed_metadata(
                    file_path=final_filepath,
                    title=track_title,
                    artists=track_artists,
                    album=album_name,
                    year=year,
                    track_number=idx,
                    total_tracks=total_tracks,
                    cover_url=cover_url,
                    audio_format=audio_format,
                    embed_artwork=options.get("embed_artwork", True),
                    lyrics_text=lyrics_text,
                )

                with self._lock:
                    self.active_job["completed"] += 1
                    self.active_job["tracks"][track_id] = {
                        "status": "completed",
                        "progress": 100,
                        "message": "Complete",
                        "filename": filename,
                        "filepath": final_filepath,
                        "title": track_title,
                    }

                with dict_lock:
                    downloaded_dict[idx] = (filename, f"{track_artists} - {track_title}", duration_ms // 1000)

                loop.call_soon_threadsafe(
                    self.broadcast_event,
                    "track_update",
                    {"track_id": track_id, "status": "completed", "progress": 100, "message": "Downloaded & Tagged", "filepath": final_filepath, "filename": filename},
                )
                broadcast_progress_snapshot()

            except Exception as err:
                with self._lock:
                    self.active_job["failed"] += 1
                    self.active_job["tracks"][track_id] = {
                        "status": "failed",
                        "progress": 100,
                        "message": f"Error: {str(err)}",
                        "title": track_title,
                    }
                loop.call_soon_threadsafe(
                    self.broadcast_event,
                    "track_update",
                    {"track_id": track_id, "status": "failed", "progress": 100, "message": str(err)},
                )
                broadcast_progress_snapshot()
            finally:
                # Clean up any leftover temp files
                for pattern_ext in [audio_format, 'webm', 'opus', 'm4a', 'part', 'ytdl']:
                    temp_path = os.path.join(output_dir, f"temp_{track_id}.{pattern_ext}")
                    if os.path.exists(temp_path):
                        try:
                            os.remove(temp_path)
                        except Exception:
                            pass

        # Run concurrent downloads safely with ThreadPoolExecutor
        try:
            with concurrent.futures.ThreadPoolExecutor(max_workers=concurrency) as executor:
                futures = [executor.submit(download_single_track, (idx, track)) for idx, track in enumerate(tracks, 1)]
                for future in concurrent.futures.as_completed(futures):
                    if self.is_cancelled():
                        executor.shutdown(wait=False, cancel_futures=True)
                        break
        finally:
            lyrics_pool.shutdown(wait=False)

        # Generate .m3u8 playlist file in exact original playlist order
        sorted_files = [downloaded_dict[k] for k in sorted(downloaded_dict.keys())]
        m3u8_path = ""
        if create_m3u8 and sorted_files:
            try:
                m3u8_path = os.path.join(output_dir, f"{sanitize_filename(playlist_title)}.m3u8")
                with open(m3u8_path, "w", encoding="utf-8") as f:
                    f.write("#EXTM3U\n")
                    for fname, name, dur in sorted_files:
                        f.write(f"#EXTINF:{dur},{name}\n")
                        f.write(f"{fname}\n")
            except Exception as e:
                print(f"[Warning writing M3U8] {e}", file=sys.stderr)

        with self._lock:
            if not self._cancel_flag:
                self.active_job["status"] = "completed"

        loop.call_soon_threadsafe(
            self.broadcast_event,
            "job_finished",
            {
                "status": self.active_job["status"],
                "completed": self.active_job["completed"],
                "failed": self.active_job["failed"],
                "total": total_tracks,
                "output_dir": output_dir,
                "elapsed_seconds": int(time.time() - job_start_time),
                "m3u8_file": m3u8_path if (create_m3u8 and sorted_files) else "",
            },
        )

        # Free temporary worker memory
        with bytes_lock:
            track_bytes_downloaded.clear()
        with dict_lock:
            downloaded_dict.clear()


# Global singleton manager
download_manager = DownloadManager()
