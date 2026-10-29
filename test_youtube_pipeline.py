"""
Dedicated verification test suite for YouTube direct download pipeline optimization.
Tests URL extraction, metadata resolution, direct download execution (without search),
and fallback behavior.
"""

import asyncio
import os
import shutil
import sys
import time
from mutagen.id3 import ID3

# Ensure path
sys.path.insert(0, os.path.abspath("."))

from backend.downloader import download_manager, extract_youtube_url
from backend.universal_meta import resolve_universal_metadata, detect_platform


def test_extract_youtube_url_unit():
    print("[1/4] Testing extract_youtube_url with various formats...")

    # Case 1: Standard youtube.com watch URL in direct_url
    t1 = {"direct_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
    assert extract_youtube_url(t1) == "https://www.youtube.com/watch?v=dQw4w9WgXcQ", f"Failed t1: {extract_youtube_url(t1)}"

    # Case 2: Watch URL with playlist parameter (&list=...&index=...)
    t2 = {"direct_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLrEnWoR732-CFvO_d319e8r7o2g_pE1kQ&index=1"}
    assert extract_youtube_url(t2) == "https://www.youtube.com/watch?v=dQw4w9WgXcQ", f"Failed t2: {extract_youtube_url(t2)}"

    # Case 3: youtu.be short URL in url field
    t3 = {"url": "https://youtu.be/dQw4w9WgXcQ?t=10"}
    assert extract_youtube_url(t3) == "https://www.youtube.com/watch?v=dQw4w9WgXcQ", f"Failed t3: {extract_youtube_url(t3)}"

    # Case 4: music.youtube.com URL in spotify_url field
    t4 = {"spotify_url": "https://music.youtube.com/watch?v=dQw4w9WgXcQ"}
    assert extract_youtube_url(t4) == "https://www.youtube.com/watch?v=dQw4w9WgXcQ", f"Failed t4: {extract_youtube_url(t4)}"

    # Case 5: YouTube shorts URL in webpage_url
    t5 = {"webpage_url": "https://www.youtube.com/shorts/dQw4w9WgXcQ"}
    assert extract_youtube_url(t5) == "https://www.youtube.com/watch?v=dQw4w9WgXcQ", f"Failed t5: {extract_youtube_url(t5)}"

    # Case 6: URI format youtube:track:ID
    t6 = {"uri": "youtube:track:dQw4w9WgXcQ"}
    assert extract_youtube_url(t6) == "https://www.youtube.com/watch?v=dQw4w9WgXcQ", f"Failed t6: {extract_youtube_url(t6)}"

    # Case 7: Source is youtube with 11-char ID
    t7 = {"id": "dQw4w9WgXcQ", "source": "youtube"}
    assert extract_youtube_url(t7) == "https://www.youtube.com/watch?v=dQw4w9WgXcQ", f"Failed t7: {extract_youtube_url(t7)}"

    # Case 8: Spotify track should NOT be detected as YouTube
    t8 = {"id": "4cOdK2wGLETKBW3PvgPWqT", "spotify_url": "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT", "source": "spotify"}
    assert extract_youtube_url(t8) is None, f"Failed t8: Expected None, got {extract_youtube_url(t8)}"

    # Case 9: Watch URL with multiple v-like query parameters (regression test for greedy regex)
    t9 = {"direct_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ&prev_v=abcdefghijk"}
    assert extract_youtube_url(t9) == "https://www.youtube.com/watch?v=dQw4w9WgXcQ", f"Failed t9: {extract_youtube_url(t9)}"

    # Case 10: YouTube Live URL format
    t10 = {"direct_url": "https://www.youtube.com/live/dQw4w9WgXcQ?feature=share"}
    assert extract_youtube_url(t10) == "https://www.youtube.com/watch?v=dQw4w9WgXcQ", f"Failed t10: {extract_youtube_url(t10)}"

    # Case 11: Pure YouTube playlist URL should NOT be treated as a single track audio stream
    t11 = {"direct_url": "https://www.youtube.com/playlist?list=PLrEnWoR732-CFvO_d319e8r7o2g_pE1kQ"}
    assert extract_youtube_url(t11) is None, f"Failed t11: Expected None, got {extract_youtube_url(t11)}"

    # Case 12: Bare 11-char ID without source tag must NOT be blindly guessed as YouTube (avoids breaking internal IDs like test_id_123)
    t12 = {"id": "test_id_123"}
    assert extract_youtube_url(t12) is None, f"Failed t12: Expected None, got {extract_youtube_url(t12)}"

    # Case 13: ID that is a full YouTube URL
    t13 = {"id": "https://youtu.be/dQw4w9WgXcQ"}
    assert extract_youtube_url(t13) == "https://www.youtube.com/watch?v=dQw4w9WgXcQ", f"Failed t13: {extract_youtube_url(t13)}"

    # Case 14: Empty or invalid track dictionary
    assert extract_youtube_url({}) is None
    assert extract_youtube_url(None) is None

    print("  [PASS] All extract_youtube_url test cases passed!")


def test_youtube_metadata_resolution():
    print("[2/4] Testing universal metadata resolver on YouTube URL...")
    test_yt_url = "https://www.youtube.com/watch?v=jNQXAC9IVRw"
    
    # Detect platform
    platform = detect_platform(test_yt_url)
    assert platform == "youtube", f"Expected 'youtube', got '{platform}'"

    meta = resolve_universal_metadata(test_yt_url)
    assert meta["source"] == "youtube", f"Expected source 'youtube', got '{meta.get('source')}'"
    assert meta["total_tracks"] >= 1, "Expected at least 1 track"
    
    first = meta["tracks"][0]
    assert first.get("direct_url"), "Expected direct_url to be populated"
    assert "youtube.com" in first["direct_url"], f"Expected direct_url to be YouTube, got {first.get('direct_url')}"
    assert first["id"] == "jNQXAC9IVRw", f"Expected video ID jNQXAC9IVRw, got {first.get('id')}"
    
    # Test extract_youtube_url on the resolved track object
    extracted = extract_youtube_url(first)
    assert extracted == "https://www.youtube.com/watch?v=jNQXAC9IVRw", f"Expected canonical watch URL, got {extracted}"

    # Test watch URL containing unviewable / radio playlist param (regression test)
    unviewable_list_url = "https://www.youtube.com/watch?v=jNQXAC9IVRw&list=ULjNQXAC9IVRw"
    meta_unviewable = resolve_universal_metadata(unviewable_list_url)
    assert meta_unviewable["source"] == "youtube"
    assert len(meta_unviewable["tracks"]) >= 1
    assert meta_unviewable["tracks"][0]["id"] == "jNQXAC9IVRw"
    
    print(f"  [PASS] Resolved: '{first['title']}' by '{first['artists']}'")
    print(f"  [PASS] Direct URL correctly attached: {first['direct_url']}")
    print(f"  [PASS] Watch URL with unviewable playlist param safely handled via fallback!")


def test_direct_youtube_download():
    print("[3/4] Testing direct YouTube URL download without searching...")
    test_dir = os.path.abspath("test_yt_direct_output")
    os.makedirs(test_dir, exist_ok=True)

    # Use a short public domain audio on YouTube: "Me at the zoo" (19s)
    test_track = {
        "id": "jNQXAC9IVRw",
        "title": "Me at the zoo",
        "artists": "jawed",
        "album": "YouTube Classics",
        "year": "2005",
        "cover_url": "https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg",
        "duration_ms": 19000,
        "direct_url": "https://www.youtube.com/watch?v=jNQXAC9IVRw",
        "source": "youtube",
    }

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    options = {
        "output_dir": test_dir,
        "audio_format": "mp3",
        "bitrate": "192",
        "filename_format": "{artist} - {title}",
        "create_m3u8": True,
        "overwrite": True,
    }

    # Intercept yt_dlp calls to verify direct URL is passed directly without ytsearch
    import yt_dlp
    original_download = yt_dlp.YoutubeDL.download
    intercepted_urls = []

    def mock_download(self, url_list):
        intercepted_urls.extend(url_list)
        return original_download(self, url_list)

    yt_dlp.YoutubeDL.download = mock_download

    try:
        download_manager._run_job_worker(
            playlist_title="YouTube Direct Test",
            tracks=[test_track],
            options=options,
            loop=loop,
        )
    finally:
        yt_dlp.YoutubeDL.download = original_download

    # Verify that the direct URL was passed directly to yt_dlp
    print(f"  Intercepted download calls: {intercepted_urls}")
    assert any("jNQXAC9IVRw" in u for u in intercepted_urls), "Direct YouTube URL was not used!"
    assert not any(u.startswith("ytsearch") for u in intercepted_urls), "Duplicate ytsearch was executed despite direct URL!"
    assert not any(u.startswith("scsearch") for u in intercepted_urls), "Duplicate scsearch was executed despite direct URL!"

    # Verify downloaded file
    expected_file = os.path.join(test_dir, "jawed - Me at the zoo.mp3")
    assert os.path.exists(expected_file), f"Expected downloaded file not found: {expected_file}"
    assert os.path.getsize(expected_file) > 10000, "Downloaded file is too small"

    # Verify ID3 metadata
    tags = ID3(expected_file)
    assert str(tags.get("TIT2")) == "Me at the zoo"
    assert str(tags.get("TPE1")) == "jawed"
    assert str(tags.get("TALB")) == "YouTube Classics"
    assert any(k.startswith("APIC") for k in tags.keys()), "Missing embedded cover art APIC tag"

    shutil.rmtree(test_dir, ignore_errors=True)
    print("  [PASS] Direct YouTube download succeeded without any search query!")
    print("  [PASS] ID3 tags & artwork verified on output file.")


def test_spotify_search_fallback():
    print("[4/4] Testing search pipeline for non-direct (Spotify) tracks...")
    # For a track without a direct YouTube link, it must still search and succeed
    test_track = {
        "id": "spot_test_1",
        "title": "Ain't In LA",
        "artists": "ADÉLA",
        "album": "Ain't In LA - Single",
        "year": "2026",
        "cover_url": "https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b273b176fc721e1faba78b1ef35b",
        "duration_ms": 184000,
        "source": "spotify",
    }

    test_dir = os.path.abspath("test_spotify_fallback_output")
    os.makedirs(test_dir, exist_ok=True)

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    options = {
        "output_dir": test_dir,
        "audio_format": "mp3",
        "bitrate": "128",
        "filename_format": "{artist} - {title}",
        "create_m3u8": False,
        "overwrite": True,
    }

    import yt_dlp
    original_download = yt_dlp.YoutubeDL.download
    intercepted_urls = []

    def mock_download(self, url_list):
        intercepted_urls.extend(url_list)
        return original_download(self, url_list)

    yt_dlp.YoutubeDL.download = mock_download

    try:
        download_manager._run_job_worker(
            playlist_title="Spotify Search Test",
            tracks=[test_track],
            options=options,
            loop=loop,
        )
    finally:
        yt_dlp.YoutubeDL.download = original_download

    print(f"  Intercepted download calls: {intercepted_urls}")
    assert any(u.startswith("ytsearch") for u in intercepted_urls), "Expected search query for non-direct track"

    expected_file = os.path.join(test_dir, "ADÉLA - Ain't In LA.mp3")
    assert os.path.exists(expected_file), f"Expected file not found: {expected_file}"
    shutil.rmtree(test_dir, ignore_errors=True)
    print("  [PASS] Search fallback works as expected for non-direct links.")


if __name__ == "__main__":
    print("==================================================")
    print(" Running YouTube Direct Download Verification Suite")
    print("==================================================")
    test_extract_youtube_url_unit()
    test_youtube_metadata_resolution()
    test_direct_youtube_download()
    test_spotify_search_fallback()
    print("\n[SUCCESS] ALL YOUTUBE PIPELINE VERIFICATION TESTS PASSED!")
