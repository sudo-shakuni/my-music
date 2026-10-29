function formatDuration(ms) {
  if (!ms || isNaN(ms)) return "--:--";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// --- GITHUB PAGES WEB SHOWCASE MODE ---
// In the docs/ build, this is always the static web showcase
const isWebDemo = true;

const SPOTIFY_DEMO_DATA = {
  id: "demo_top_hits",
  title: "My-Music Showcase: Global Hits & Classics",
  author: "My-Music Curator",
  description: "Interactive Web Preview! Click play to test audio previews, try filters & selection. To download actual Lossless FLAC/320kbps MP3 files, run the native Windows app!",
  cover_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
  total_tracks: 6,
  total_duration_str: "22m 45s",
  total_duration_formatted: "22m 45s",
  type: "playlist",
  source: "spotify",
  platform_badge: "Spotify",
  tracks: [
    {
      id: "demo_1",
      title: "Blinding Lights",
      artists: "The Weeknd",
      album: "After Hours",
      duration_ms: 200040,
      duration_str: "3:20", duration_formatted: "3:20",
      cover_url: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=300&q=80",
      preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      spotify_url: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b"
    },
    {
      id: "demo_2",
      title: "Starboy",
      artists: "The Weeknd, Daft Punk",
      album: "Starboy",
      duration_ms: 230453,
      duration_str: "3:50", duration_formatted: "3:50",
      cover_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80",
      preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      spotify_url: "https://open.spotify.com/track/7MXVkk9YM5IZxh0WSlVIh0"
    },
    {
      id: "demo_3",
      title: "Levitating",
      artists: "Dua Lipa",
      album: "Future Nostalgia",
      duration_ms: 203808,
      duration_str: "3:23", duration_formatted: "3:23",
      cover_url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80",
      preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      spotify_url: "https://open.spotify.com/track/463CkQjx2Zk1yXoBuierM9"
    },
    {
      id: "demo_4",
      title: "Get Lucky",
      artists: "Daft Punk, Pharrell Williams",
      album: "Random Access Memories",
      duration_ms: 248413,
      duration_str: "4:08", duration_formatted: "4:08",
      cover_url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&q=80",
      preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      spotify_url: "https://open.spotify.com/track/2Foc5Q5nqNiosCNqttzHof"
    },
    {
      id: "demo_5",
      title: "Midnight City",
      artists: "M83",
      album: "Hurry Up, We're Dreaming",
      duration_ms: 243000,
      duration_str: "4:03", duration_formatted: "4:03",
      cover_url: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=300&q=80",
      preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      spotify_url: "https://open.spotify.com/track/1eyzqe2QqGZUmfcPZtrIyt"
    },
    {
      id: "demo_6",
      title: "Resonance",
      artists: "HOME",
      album: "Odyssey",
      duration_ms: 212000,
      duration_str: "3:32", duration_formatted: "3:32",
      cover_url: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=300&q=80",
      preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
      spotify_url: "https://open.spotify.com/track/1Tu2T8y3Wc0pY7s71NzgDq"
    }
  ]
};

const YOUTUBE_DEMO_DATA = {
  id: "demo_yt_despacito",
  title: "Despacito (Official Video)",
  author: "Luis Fonsi ft. Daddy Yankee",
  description: "Direct YouTube Stream Extraction Demo. Plays preview audio instantly! Download Lossless FLAC with native Windows app.",
  cover_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
  total_tracks: 1,
  total_duration_str: "4m 42s",
  total_duration_formatted: "4m 42s",
  type: "track",
  source: "youtube",
  platform_badge: "YouTube & YT Music",
  tracks: [
    {
      id: "demo_yt_1",
      title: "Despacito",
      artists: "Luis Fonsi, Daddy Yankee",
      album: "VIDA",
      duration_ms: 282000,
      duration_str: "4:42", duration_formatted: "4:42",
      cover_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80",
      preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      spotify_url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk"
    }
  ]
};

const JIOSAAVN_DEMO_DATA = {
  id: "demo_jio_kesariya",
  title: "Kesariya (From 'Brahmastra')",
  author: "Arijit Singh, Pritam, Amitabh Bhattacharya",
  description: "JioSaavn 320kbps High-Bitrate Master Audio Demo. Full ID3 tagging & cover artwork embedded.",
  cover_url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
  total_tracks: 1,
  total_duration_str: "4m 28s",
  total_duration_formatted: "4m 28s",
  type: "track",
  source: "jiosaavn",
  platform_badge: "JioSaavn",
  tracks: [
    {
      id: "demo_jio_1",
      title: "Kesariya",
      artists: "Arijit Singh, Pritam",
      album: "Brahmastra",
      duration_ms: 268000,
      duration_str: "4:28", duration_formatted: "4:28",
      cover_url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80",
      preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      spotify_url: "https://www.jiosaavn.com/song/kesariya/Bw8TeBJeB1A"
    }
  ]
};

const AMAZON_DEMO_DATA = {
  id: "demo_amz_hits",
  title: "Amazon Music Originals & Hits",
  author: "Amazon Music Curated",
  description: "Amazon Music HD / Ultra HD lossless catalog integration demo.",
  cover_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
  total_tracks: 2,
  total_duration_str: "7m 10s",
  total_duration_formatted: "7m 10s",
  type: "playlist",
  source: "amazon",
  platform_badge: "Amazon Music",
  tracks: [
    {
      id: "demo_amz_1",
      title: "Starboy",
      artists: "The Weeknd",
      album: "Starboy",
      duration_ms: 230453,
      duration_str: "3:50", duration_formatted: "3:50",
      cover_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80",
      preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      spotify_url: "https://music.amazon.com/albums/B09XYZ123"
    },
    {
      id: "demo_amz_2",
      title: "Blinding Lights",
      artists: "The Weeknd",
      album: "After Hours",
      duration_ms: 200040,
      duration_str: "3:20", duration_formatted: "3:20",
      cover_url: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=300&q=80",
      preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      spotify_url: "https://music.amazon.com/albums/B09XYZ123"
    }
  ]
};


// ==========================================
// Web Showcase Dynamic Metadata Resolvers
// ==========================================

async function resolveYouTubeMetadata(url) {
  try {
    const res = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(url)}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.title) {
        return {
          id: `yt_${Date.now()}`,
          title: data.title,
          author: data.author_name || "YouTube Creator",
          description: `Direct YouTube stream: "${data.title}" by ${data.author_name || "YouTube"}.`,
          cover_url: data.thumbnail_url || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
          total_tracks: 1,
          total_duration_str: "3:45",
          total_duration_formatted: "3:45",
          type: "track",
          source: "youtube",
          platform_badge: "YouTube & YT Music",
          tracks: [
            {
              id: `yt_track_1`,
              title: data.title,
              artists: data.author_name || "YouTube",
              album: "YouTube Single",
              duration_ms: 225000,
              duration_str: "3:45",
              duration_formatted: "3:45",
              cover_url: data.thumbnail_url || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80",
              preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              spotify_url: url
            }
          ]
        };
      }
    }
  } catch (e) {
    console.warn("YouTube oEmbed fetch error:", e);
  }
  return null;
}

function extractSpotifyEntity(rawUrl) {
  if (!rawUrl) return null;
  const str = rawUrl.trim();
  const uriMatch = str.match(/spotify:(playlist|album|track|artist):([a-zA-Z0-9]+)/i);
  if (uriMatch) {
    return { type: uriMatch[1].toLowerCase(), id: uriMatch[2] };
  }
  const urlMatch = str.match(/(?:playlist|album|track|artist)[\/:]([a-zA-Z0-9]+)/i);
  if (urlMatch) {
    const rawType = str.match(/(playlist|album|track|artist)/i);
    return {
      type: rawType ? rawType[1].toLowerCase() : "playlist",
      id: urlMatch[1]
    };
  }
  if (/^[a-zA-Z0-9]{20,24}$/.test(str)) {
    return { type: "playlist", id: str };
  }
  return null;
}

async function resolveSpotifyMetadata(url) {
  const entity = extractSpotifyEntity(url);
  if (!entity) return null;

  const type = entity.type;
  const id = entity.id;

  // Try Spotify CORS oEmbed API for real titles and artwork (quick 1.2s timeout)
  let oembedData = null;
  try {
    const res = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`, {
      signal: AbortSignal.timeout(1200)
    });
    if (res.ok) {
      oembedData = await res.json();
    }
  } catch (e) {
    // Timeout or network offline, gracefully continue with curated/slug fallback
  }

  const knownPlaylists = {
    "37i9dQZF1DXcBWIGoYBM5M": {
      title: "Today's Top Hits",
      author: "Spotify",
      description: "The hottest tracks right now across the globe.",
      tracks: [
        { title: "Espresso", artists: "Sabrina Carpenter", album: "Short n' Sweet", dur: 175000 },
        { title: "Birds of a Feather", artists: "Billie Eilish", album: "HIT ME HARD AND SOFT", dur: 196000 },
        { title: "Good Luck, Babe!", artists: "Chappell Roan", album: "Good Luck, Babe!", dur: 218000 },
        { title: "Please Please Please", artists: "Sabrina Carpenter", album: "Short n' Sweet", dur: 186000 },
        { title: "Taste", artists: "Sabrina Carpenter", album: "Short n' Sweet", dur: 157000 },
        { title: "Die With A Smile", artists: "Lady Gaga, Bruno Mars", album: "Die With A Smile", dur: 251000 }
      ]
    },
    "37i9dQZEVXbMDoHDwVN2tF": {
      title: "Top 50 - Global",
      author: "Spotify",
      description: "Your daily update of the most played tracks right now.",
      tracks: [
        { title: "Die With A Smile", artists: "Lady Gaga, Bruno Mars", album: "Die With A Smile", dur: 251000 },
        { title: "Birds of a Feather", artists: "Billie Eilish", album: "HIT ME HARD AND SOFT", dur: 196000 },
        { title: "Taste", artists: "Sabrina Carpenter", album: "Short n' Sweet", dur: 157000 },
        { title: "Espresso", artists: "Sabrina Carpenter", album: "Short n' Sweet", dur: 175000 },
        { title: "Beautiful Things", artists: "Benson Boone", album: "Fireworks & Rollerblades", dur: 180000 }
      ]
    },
    "37i9dQZEVXbMWDifOteDxR": {
      title: "Top 50 - India",
      author: "Spotify",
      description: "Your daily update of the most played tracks in India right now.",
      tracks: [
        { title: "Tauba Tauba", artists: "Karan Aujla", album: "Bad Newz", dur: 207000 },
        { title: "Aaj Ki Raat", artists: "Madhubanti Bagchi, Sachin-Jigar", album: "Stree 2", dur: 228000 },
        { title: "Tilasmi Bahein", artists: "Sanjay Leela Bhansali, Sharmistha", album: "Heeramandi", dur: 190000 },
        { title: "Soulmate", artists: "Arijit Singh, Badshah", album: "Ek Tha Raja", dur: 213000 },
        { title: "Ve Haaniyaan", artists: "Danny, Avvy Sra", album: "Ve Haaniyaan", dur: 242000 }
      ]
    }
  };

  // Match exact ID or prefix (covers 37i9dQZEVXbMWDif5SCB and international variants)
  let p = knownPlaylists[id];
  if (!p) {
    if (id.startsWith("37i9dQZEVXbMWDif") || id.startsWith("37i9dQZEVXbMW") || id.includes("MWDif")) {
      p = knownPlaylists["37i9dQZEVXbMWDifOteDxR"];
    } else if (id.startsWith("37i9dQZF1DXcBWIG") || id.startsWith("37i9dQZF1DX") || id.includes("cBWIG")) {
      p = knownPlaylists["37i9dQZF1DXcBWIGoYBM5M"];
    } else if (id.startsWith("37i9dQZEVXbMDoHD") || id.startsWith("37i9dQZEVXbMD") || id.includes("MDoHD")) {
      p = knownPlaylists["37i9dQZEVXbMDoHDwVN2tF"];
    }
  }

  if (p) {
    const finalTitle = oembedData?.title || p.title;
    const finalCover = oembedData?.thumbnail_url || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80";
    return {
      id: `sp_${id}`,
      title: finalTitle,
      author: oembedData?.author_name || p.author,
      description: p.description,
      cover_url: finalCover,
      total_tracks: p.tracks.length,
      total_duration_str: "18m 30s",
      total_duration_formatted: "18m 30s",
      type: "playlist",
      source: "spotify",
      platform_badge: "Spotify",
      tracks: p.tracks.map((t, idx) => ({
        id: `sp_track_${idx + 1}`,
        title: t.title,
        artists: t.artists,
        album: t.album,
        duration_ms: t.dur,
        duration_str: formatDuration(t.dur),
        duration_formatted: formatDuration(t.dur),
        cover_url: finalCover,
        preview_url: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(idx % 16) + 1}.mp3`,
        spotify_url: url
      }))
    };
  }

  if (type === "track") {
    const trackTitle = oembedData?.title || `Spotify Track (${id.slice(0, 8)})`;
    const trackCover = oembedData?.thumbnail_url || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80";
    const trackArtist = oembedData?.author_name || "Spotify Artist";
    return {
      id: `sp_track_${id}`,
      title: trackTitle,
      author: trackArtist,
      description: `Direct Spotify Track Preview: "${trackTitle}". Click Play to test audio preview or download immediately.`,
      cover_url: trackCover,
      total_tracks: 1,
      total_duration_str: "3:30",
      total_duration_formatted: "3:30",
      type: "track",
      source: "spotify",
      platform_badge: "Spotify",
      tracks: [
        {
          id: `sp_tr_${id.slice(0, 8)}`,
          title: trackTitle,
          artists: trackArtist,
          album: "Spotify Single",
          duration_ms: 210000,
          duration_str: "3:30",
          duration_formatted: "3:30",
          cover_url: trackCover,
          preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          spotify_url: url
        }
      ]
    };
  }

  // Custom Spotify playlist or album with oEmbed metadata or graceful fallback
  const customTitle = oembedData?.title || `Spotify ${type.charAt(0).toUpperCase() + type.slice(1)} (${id.slice(0, 10)}...)`;
  const customCover = oembedData?.thumbnail_url || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80";
  return {
    id: `sp_${id}`,
    title: customTitle,
    author: oembedData?.author_name || "Spotify User",
    description: "Interactive Web Preview! Click Play to listen to preview tracks, or run the native My-Music Windows app for full 320k/FLAC downloading.",
    cover_url: customCover,
    total_tracks: SPOTIFY_DEMO_DATA.tracks.length,
    total_duration_str: "22m 45s",
    total_duration_formatted: "22m 45s",
    type: type || "playlist",
    source: "spotify",
    platform_badge: "Spotify",
    tracks: SPOTIFY_DEMO_DATA.tracks
  };
}

function resolveJioSaavnSlugMetadata(url) {
  const songMatch = (url || "").match(/jiosaavn\.com\/(?:song|album)\/([^/]+)/);
  if (songMatch) {
    const rawSlug = songMatch[1];
    const cleanTitle = rawSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return {
      id: `jio_${Date.now()}`,
      title: cleanTitle,
      author: "JioSaavn Artist",
      description: `JioSaavn 320kbps High-Bitrate Master Audio for "${cleanTitle}".`,
      cover_url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
      total_tracks: 1,
      total_duration_str: "4m 28s",
      total_duration_formatted: "4m 28s",
      type: "track",
      source: "jiosaavn",
      platform_badge: "JioSaavn",
      tracks: [
        {
          id: `jio_track_1`,
          title: cleanTitle,
          artists: "Arijit Singh, Pritam",
          album: cleanTitle,
          duration_ms: 268000,
          duration_str: "4:28",
          duration_formatted: "4:28",
          cover_url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80",
          preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          spotify_url: url
        }
      ]
    };
  }
  return JIOSAAVN_DEMO_DATA;
}

function triggerBrowserFileDownload(fileUrl, filename) {
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = filename || "track.mp3";
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function getDemoDataForUrl(url) {
  const p = getPlatformInfo(url || "");
  const pId = p ? p.id : "spotify";
  if (pId === "youtube" || pId === "youtube_music") return YOUTUBE_DEMO_DATA;
  if (pId === "jiosaavn") return JIOSAAVN_DEMO_DATA;
  if (pId === "amazon") return AMAZON_DEMO_DATA;

  if (url && !url.includes("http://") && !url.includes("https://") && !url.includes("spotify:")) {
    const custom = JSON.parse(JSON.stringify(SPOTIFY_DEMO_DATA));
    custom.title = `Search: "${url.trim()}"`;
    custom.description = `Interactive Web Showcase preview for "${url.trim()}". Click Play to test audio preview or run the native Windows app for 320k/FLAC audio.`;
    return custom;
  }
  return SPOTIFY_DEMO_DATA;
}

function initWebShowcaseMode() {
  if (!isWebDemo) return;
  console.log("My-Music running in Web Showcase Demo Mode.");
  
  if (elements.ffmpegBadge) {
    elements.ffmpegBadge.className = "status-pill ready";
    elements.ffmpegStatusText.textContent = "Web Showcase Demo";
  }

  // Render showcase tracks IMMEDIATELY so the user sees songs on first visit
  state.currentPlaylist = SPOTIFY_DEMO_DATA;
  renderPlaylistView(SPOTIFY_DEMO_DATA);
  showToast("🎉 Welcome to My-Music Web Showcase! Click Play on any track to listen to audio previews.", "success", 6000);
}

/**
 * My-Music — Music & Playlist Downloader - Modern Frontend Controller
 * Features:
 * - Native Windows Folder Picker via Backend Dialog
 * - Local HQ Full-Track Streaming & Preview Mini-Player
 * - Automatic Clipboard Detection on Window Focus
 * - 1-Click "Retry Failed Tracks" with auto-isolation
 * - Smart Filter Chips (All, Selected, Unselected, Downloaded, Failed)
 * - Progressive 60 FPS Chunked Rendering (50-item batches)
 * - Shift-Click Multi-Range Selection
 * - Live Queue Drawer & Real-Time Speedometer/ETA
 */

// Application State

// Platform Recognition & Visual Badge Helper
function getPlatformInfo(textOrUrl) {
  const str = (textOrUrl || "").toLowerCase().trim();
  if (str.includes("spotify.com") || str.startsWith("spotify:") || str === "spotify") {
    return { id: "spotify", name: "Spotify", badgeClass: "platform-badge-spotify", icon: "🟢", theme: "theme-spotify" };
  }
  if (str.includes("music.youtube.com") || str === "youtube_music") {
    return { id: "youtube_music", name: "YouTube Music", badgeClass: "platform-badge-youtube", icon: "🔴", theme: "theme-youtube" };
  }
  if (str.includes("youtube.com") || str.includes("youtu.be") || str === "youtube") {
    return { id: "youtube", name: "YouTube", badgeClass: "platform-badge-youtube", icon: "🔴", theme: "theme-youtube" };
  }
  if (str.includes("jiosaavn.com") || str.includes("saavn.com") || str === "jiosaavn") {
    return { id: "jiosaavn", name: "JioSaavn", badgeClass: "platform-badge-jiosaavn", icon: "🔵", theme: "theme-jiosaavn" };
  }
  if (str.includes("music.amazon.") || str.includes("amazon.com/music") || str === "amazon") {
    return { id: "amazon", name: "Amazon Music", badgeClass: "platform-badge-amazon", icon: "🟠", theme: "theme-amazon" };
  }
  return null;
}

const state = {
  currentPlaylist: null,
  selectedTrackIds: new Set(),
  failedTrackIds: new Set(),
  downloadedFilesMap: new Map(), // track_id -> filepath
  activeFilterChip: "all",
  defaultOutputDir: "",
  currentOutputDir: "",
  isDownloading: false,
  eventSource: null,
  currentlyPlayingId: null,
  isPlayingHQ: false,
  previewDuration: 30, // Default preview clip length

  // Spotify Account & Library State
  auth: {
    isAuthenticated: false,
    user: null,
    playlists: [],
    likedSongsData: null,
  },
  activeNavTab: "search",

  // Progressive Rendering & Performance
  filteredTracks: [],
  renderedTrackCount: 0,
  batchSize: 50,
  lastCheckedIndex: -1,
  activeDownloadsMap: new Map(), // track_id -> { track_id, title, artists, status, message, cover_url }
  recentStorageKey: "my-music_recent_v1",
  observer: null,
  lastClipboardChecked: "",
  publicUrl: "",
  networkInfo: null,
  activeQrMode: "lan",
  lyrics: {
    track: null,
    lines: [],
    currentLineIndex: -1,
    isOpen: false,
  },
};

// DOM Elements
const elements = {
  // Spotify Account & Library Elements
  btnSpotifyAccount: document.getElementById("btn-spotify-account"),
  spotifyNavAvatar: document.getElementById("spotify-nav-avatar"),
  spotifyUserName: document.getElementById("spotify-user-name"),
  tabSearch: document.getElementById("tab-search"),
  tabLibrary: document.getElementById("tab-library"),
  libraryStatusBadge: document.getElementById("library-status-badge"),
  librarySection: document.getElementById("library-section"),
  searchSection: document.getElementById("search-section"),
  libraryLoggedOut: document.getElementById("library-logged-out"),
  libraryLoggedIn: document.getElementById("library-logged-in"),
  btnLibraryConnect: document.getElementById("btn-library-connect"),
  btnLibraryManualAuth: document.getElementById("btn-library-manual-auth"),
  userAvatar: document.getElementById("user-avatar"),
  userDisplayName: document.getElementById("user-display-name"),
  userBadge: document.getElementById("user-badge"),
  userEmail: document.getElementById("user-email"),
  userFollowers: document.getElementById("user-followers"),
  userProduct: document.getElementById("user-product"),
  btnRefreshLibrary: document.getElementById("btn-refresh-library"),
  btnSpotifyLogout: document.getElementById("btn-spotify-logout"),
  likedCountText: document.getElementById("liked-count-text"),
  btnDownloadLiked: document.getElementById("btn-download-liked"),
  btnInspectLiked: document.getElementById("btn-inspect-liked"),
  libraryPlaylistsCount: document.getElementById("library-playlists-count"),
  libraryFilterInput: document.getElementById("library-filter-input"),
  libraryPlaylistsGrid: document.getElementById("library-playlists-grid"),
  spotifyAuthModal: document.getElementById("spotify-auth-modal"),
  btnCloseAuthModal: document.getElementById("btn-close-auth-modal"),
  btnModalGoogleLogin: document.getElementById("btn-modal-google-login"),
  btnModalOauthLogin: document.getElementById("btn-modal-oauth-login"),
  btnCopyAuthLink: document.getElementById("btn-copy-auth-link"),
  authWaitingBanner: document.getElementById("auth-waiting-banner"),
  inputManualToken: document.getElementById("input-manual-token"),
  btnSubmitManualToken: document.getElementById("btn-submit-manual-token"),
  btnAutoGrab: document.getElementById("btn-auto-grab"),
  autoGrabStatus: document.getElementById("auto-grab-status"),
  inputSpDcCookie: document.getElementById("input-sp-dc-cookie"),
  btnSubmitSpDc: document.getElementById("btn-submit-sp-dc"),
  linkOpenSpotifyWeb: document.getElementById("link-open-spotify-web"),
  btnCopySnippet: document.getElementById("btn-copy-snippet"),
  codeTokenSnippet: document.getElementById("code-token-snippet"),
  btnCustomClientLogin: document.getElementById("btn-custom-client-login"),
  inputCustomClientId: document.getElementById("input-custom-client-id"),
  inputCustomClientSecret: document.getElementById("input-custom-client-secret"),
  settingSpotifyClientId: document.getElementById("setting-spotify-client-id"),
  settingSpotifyClientSecret: document.getElementById("setting-spotify-client-secret"),
  btnSaveSpotifyCreds: document.getElementById("btn-save-spotify-creds"),

  fetchForm: document.getElementById("fetch-form"),
  playlistUrlInput: document.getElementById("playlist-url"),
  btnPasteClipboard: document.getElementById("btn-paste-clipboard"),
  btnClearUrl: document.getElementById("btn-clear-url"),
  btnFetch: document.getElementById("btn-fetch"),
  fetchSpinner: document.getElementById("fetch-spinner"),
  ffmpegBadge: document.getElementById("ffmpeg-badge"),
  ffmpegStatusText: document.getElementById("ffmpeg-status-text"),
  publicUrlBadge: document.getElementById("public-url-badge"),
  publicUrlText: document.getElementById("public-url-text"),
  btnCopyPublicUrl: document.getElementById("btn-copy-public-url"),

  // Auto-Clipboard Banner
  clipboardBanner: document.getElementById("clipboard-banner"),
  clipboardUrlPreview: document.getElementById("clipboard-url-preview"),
  btnClipboardLoad: document.getElementById("btn-clipboard-load"),
  btnClipboardDismiss: document.getElementById("btn-clipboard-dismiss"),

  // Recent Playlists
  recentSection: document.getElementById("recent-section"),
  recentGrid: document.getElementById("recent-grid"),
  btnClearRecent: document.getElementById("btn-clear-recent"),

  // Skeleton Loading Section
  skeletonSection: document.getElementById("skeleton-section"),

  // Settings
  btnSettingsToggle: document.getElementById("btn-settings-toggle"),
  btnShortcutsToggle: document.getElementById("btn-shortcuts-toggle"),
  shortcutsModal: document.getElementById("shortcuts-modal"),
  btnCloseShortcutsModal: document.getElementById("btn-close-shortcuts-modal"),
  thSortTitle: document.getElementById("th-sort-title"),
  thSortAlbum: document.getElementById("th-sort-album"),
  thSortDur: document.getElementById("th-sort-dur"),
  settingsPanel: document.getElementById("settings-panel"),
  btnCloseSettings: document.getElementById("btn-close-settings"),
  settingOutdir: document.getElementById("setting-outdir"),
  btnBrowseFolder: document.getElementById("btn-browse-folder"),
  btnOpenDir: document.getElementById("btn-open-dir"),
  settingFormat: document.getElementById("setting-format"),
  settingBitrate: document.getElementById("setting-bitrate"),
  settingNaming: document.getElementById("setting-naming"),
  settingConcurrency: document.getElementById("setting-concurrency"),
  toggleM3u8: document.getElementById("toggle-m3u8"),
  toggleArtwork: document.getElementById("toggle-artwork"),
  toggleOverwrite: document.getElementById("toggle-overwrite"),

  // Playlist View
  playlistSection: document.getElementById("playlist-section"),
  plCover: document.getElementById("pl-cover"),
  plType: document.getElementById("pl-type"),
  plTitle: document.getElementById("pl-title"),
  plDesc: document.getElementById("pl-desc"),
  plAuthor: document.getElementById("pl-author"),
  plCount: document.getElementById("pl-count"),
  plDuration: document.getElementById("pl-duration"),
  qualityPills: document.getElementById("quality-pills"),
  btnStartDownload: document.getElementById("btn-start-download"),
  btnRetryFailed: document.getElementById("btn-retry-failed"),
  plFailedCount: document.getElementById("pl-failed-count"),
  downloadBtnLabel: document.getElementById("download-btn-label"),
  btnOpenFolder: document.getElementById("btn-open-folder"),
  btnSelectAll: document.getElementById("btn-select-all"),
  btnDeselectAll: document.getElementById("btn-deselect-all"),
  btnInvertSelect: document.getElementById("btn-invert-select"),
  selectionSummaryPill: document.getElementById("selection-summary-pill"),
  checkAll: document.getElementById("check-all"),
  tracksList: document.getElementById("tracks-list"),
  tracksSentinel: document.getElementById("tracks-sentinel"),
  btnLoadMore: document.getElementById("btn-load-more"),

  // In-Playlist Filter Bar & Chips
  trackFilterInput: document.getElementById("track-filter-input"),
  btnClearFilter: document.getElementById("btn-clear-filter"),
  filterCounter: document.getElementById("filter-counter"),
  filterQuickChips: document.getElementById("filter-quick-chips"),
  chipAllCount: document.getElementById("chip-all-count"),
  chipSelectedCount: document.getElementById("chip-selected-count"),
  chipUnselectedCount: document.getElementById("chip-unselected-count"),
  chipDoneCount: document.getElementById("chip-done-count"),
  chipFailedCount: document.getElementById("chip-failed-count"),

  // Expandable Queue Drawer
  queueDrawer: document.getElementById("queue-drawer"),
  queueActiveCount: document.getElementById("queue-active-count"),
  btnCloseQueue: document.getElementById("btn-close-queue"),
  queueItemsContainer: document.getElementById("queue-items-container"),
  queueEmptyMsg: document.getElementById("queue-empty-msg"),

  // Floating Download Bar & Live Metrics
  downloadBar: document.getElementById("download-bar"),
  barStatusText: document.getElementById("bar-status-text"),
  barProgressText: document.getElementById("bar-progress-text"),
  barProgressFill: document.getElementById("bar-progress-fill"),
  barSpeedVal: document.getElementById("bar-speed-val"),
  barEtaVal: document.getElementById("bar-eta-val"),
  barStreamsVal: document.getElementById("bar-streams-val"),
  btnBarToggleQueue: document.getElementById("btn-bar-toggle-queue"),
  btnQueueCount: document.getElementById("btn-queue-count"),
  btnBarOpenFolder: document.getElementById("btn-bar-open-folder"),
  btnBarCancel: document.getElementById("btn-bar-cancel"),

  // Floating Audio Preview / HQ Mini-Player
  miniPlayer: document.getElementById("mini-player"),
  mpCover: document.getElementById("mp-cover"),
  mpTitle: document.getElementById("mp-title"),
  mpQualityBadge: document.getElementById("mp-quality-badge"),
  mpArtist: document.getElementById("mp-artist"),
  mpBtnPlay: document.getElementById("mp-btn-play"),
  mpProgressBar: document.getElementById("mp-progress-bar"),
  mpProgressFill: document.getElementById("mp-progress-fill"),
  mpCurrentTime: document.getElementById("mp-current-time"),
  mpTotalTime: document.getElementById("mp-total-time"),
  mpBtnMute: document.getElementById("mp-btn-mute"),
  mpVolume: document.getElementById("mp-volume"),
  mpBtnClose: document.getElementById("mp-btn-close"),
  equalizerBars: document.getElementById("equalizer-bars"),
  previewPlayer: document.getElementById("audio-preview-player"),

  // Celebration Modal
  completionModal: document.getElementById("completion-modal"),
  modalSummaryText: document.getElementById("modal-summary-text"),
  modalStatCount: document.getElementById("modal-stat-count"),
  modalStatTime: document.getElementById("modal-stat-time"),
  modalStatFailures: document.getElementById("modal-stat-failures"),
  btnModalRetryFailed: document.getElementById("btn-modal-retry-failed"),
  modalFailedCount: document.getElementById("modal-failed-count"),
  btnModalOpenFolder: document.getElementById("btn-modal-open-folder"),
  btnModalClose: document.getElementById("btn-modal-close"),

  // Toasts
  toastContainer: document.getElementById("toast-container"),

  // Lyrics Drawer
  mpBtnLyrics: document.getElementById("mp-btn-lyrics"),
  lyricsDrawer: document.getElementById("lyrics-drawer"),
  btnCloseLyrics: document.getElementById("btn-close-lyrics"),
  lyricsTrackTitle: document.getElementById("lyrics-track-title"),
  lyricsTrackArtist: document.getElementById("lyrics-track-artist"),
  lyricsSourceBadge: document.getElementById("lyrics-source-badge"),
  lyricsLinesContainer: document.getElementById("lyrics-lines-container"),

  // Mobile Transfer Modal
  btnMobileTransfer: document.getElementById("btn-mobile-transfer"),
  mobileTransferModal: document.getElementById("mobile-transfer-modal"),
  btnCloseMobileModal: document.getElementById("btn-close-mobile-modal"),
  tabQrLan: document.getElementById("tab-qr-lan"),
  tabQrTunnel: document.getElementById("tab-qr-tunnel"),
  qrCodeWrapper: document.getElementById("qr-code-wrapper"),
  mobileTransferUrl: document.getElementById("mobile-transfer-url"),
  btnCopyMobileUrl: document.getElementById("btn-copy-mobile-url"),
};

// Initialize Application
function bootApplication() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
  loadSystemInfo();
  if (isWebDemo) initWebShowcaseMode();
  setupEventListeners();
  setupAudioPlayer();
  setupQualityPills();
  setupTableSorting();
  setupShortcutsModal();

  // Load saved Spotify Developer Credentials
  const savedSpotifyCid = localStorage.getItem("my_music_spotify_client_id") || "";
  const savedSpotifyCsec = localStorage.getItem("my_music_spotify_client_secret") || "";
  if (elements.settingSpotifyClientId) elements.settingSpotifyClientId.value = savedSpotifyCid;
  if (elements.settingSpotifyClientSecret) elements.settingSpotifyClientSecret.value = savedSpotifyCsec;
  if (elements.inputCustomClientId && savedSpotifyCid) elements.inputCustomClientId.value = savedSpotifyCid;
  if (elements.inputCustomClientSecret && savedSpotifyCsec) elements.inputCustomClientSecret.value = savedSpotifyCsec;

  if (elements.btnSaveSpotifyCreds) {
    elements.btnSaveSpotifyCreds.addEventListener("click", () => {
      const cid = elements.settingSpotifyClientId ? elements.settingSpotifyClientId.value.trim() : "";
      const csec = elements.settingSpotifyClientSecret ? elements.settingSpotifyClientSecret.value.trim() : "";
      localStorage.setItem("my_music_spotify_client_id", cid);
      localStorage.setItem("my_music_spotify_client_secret", csec);
      if (elements.inputCustomClientId) elements.inputCustomClientId.value = cid;
      if (elements.inputCustomClientSecret) elements.inputCustomClientSecret.value = csec;
      if (cid) {
        showToast("Spotify Developer Credentials saved! Isolated rate-limit quota active.", "success");
      } else {
        showToast("Cleared Spotify Developer Credentials.", "info");
      }
    });
  }

  setupFilterChips();
  setupIntersectionObserver();
  setupKeyboardShortcuts();
  loadRecentPlaylists();
  setupClipboardAutoDetect();
  checkSpotifyAuth();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootApplication);
} else {
  bootApplication();
}

// Toast Notification Helper
function showToast(message, type = "success", duration = 3500) {
  if (!elements.toastContainer) return;
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  let iconName = "check-circle-2";
  if (type === "error") iconName = "alert-circle";
  if (type === "info") iconName = "info";

  toast.innerHTML = `<i data-lucide="${iconName}"></i> <span>${escapeHtml(message)}</span>`;
  elements.toastContainer.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(40px)";
    setTimeout(() => {
      if (toast.remove) {
        toast.remove();
      } else if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 250);
  }, duration);
}

// Load System & FFmpeg Info
async function loadSystemInfo() {
  if (isWebDemo) {
    state.defaultOutputDir = "C:\\Music\\My-Music";
    if (elements.settingOutdir) elements.settingOutdir.value = state.defaultOutputDir;
    return;
  }
  try {
    const res = await fetch("/api/system/info");
    const data = await res.json();
    state.defaultOutputDir = data.default_music_dir || "";
    if (elements.settingOutdir) elements.settingOutdir.value = state.defaultOutputDir;

    if (data.ffmpeg_ready) {
      elements.ffmpegBadge.className = "status-pill ready";
      elements.ffmpegStatusText.textContent = "FFmpeg Engine Ready";
    } else {
      elements.ffmpegBadge.className = "status-pill";
      elements.ffmpegStatusText.textContent = "FFmpeg Loading...";
    }

    if (data.public_url) {
      state.publicUrl = data.public_url;
      if (elements.publicUrlBadge) {
        elements.publicUrlBadge.classList.remove("hidden");
        elements.publicUrlBadge.title = `Access from anywhere: ${data.public_url}`;
      }
    } else {
      // Re-check once after 4s if tunnel was initializing
      setTimeout(async () => {
        try {
          const r = await fetch("/api/system/info");
          const d = await r.json();
          if (d.public_url && elements.publicUrlBadge) {
            state.publicUrl = d.public_url;
            elements.publicUrlBadge.classList.remove("hidden");
            elements.publicUrlBadge.title = `Access from anywhere: ${d.public_url}`;
          }
        } catch (_) {}
      }, 4000);
    }
  } catch (err) {
    console.error("Failed to load system info:", err);
  }
}

// Event Listeners Setup
function setupEventListeners() {
  // Input clear and paste button visibility
  elements.playlistUrlInput.addEventListener("input", () => {
    updateInputPlatformBadge();
    const hasVal = elements.playlistUrlInput.value.trim().length > 0;
    if (hasVal) {
      elements.btnClearUrl.classList.remove("hidden");
      if (elements.btnPasteClipboard) elements.btnPasteClipboard.classList.add("hidden");
    } else {
      elements.btnClearUrl.classList.add("hidden");
      if (elements.btnPasteClipboard) elements.btnPasteClipboard.classList.remove("hidden");
    }
  });

  elements.btnClearUrl.addEventListener("click", () => {
    elements.playlistUrlInput.value = "";
    elements.btnClearUrl.classList.add("hidden");
    if (elements.btnPasteClipboard) elements.btnPasteClipboard.classList.remove("hidden");
    elements.playlistUrlInput.focus();
  });

  // Paste from Clipboard Button
  if (elements.btnPasteClipboard) {
    elements.btnPasteClipboard.addEventListener("click", pasteFromClipboard);
  }

  // Copy Public Live URL Button
  if (elements.btnCopyPublicUrl) {
    elements.btnCopyPublicUrl.addEventListener("click", (e) => {
      e.stopPropagation();
      if (state.publicUrl) {
        navigator.clipboard.writeText(state.publicUrl);
        showToast("🌐 Public HTTPS link copied! Access from your phone or anywhere.", "success", 4000);
      }
    });
  }

  // Example Chips
  document.querySelectorAll(".btn-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = btn.getAttribute("data-url");
      elements.playlistUrlInput.value = url;
      elements.btnClearUrl.classList.remove("hidden");
      if (elements.btnPasteClipboard) elements.btnPasteClipboard.classList.add("hidden");
      elements.fetchForm.requestSubmit();
    });
  });

  // Clear Recent Playlists
  if (elements.btnClearRecent) {
    elements.btnClearRecent.addEventListener("click", clearRecentPlaylists);
  }

  // Form Submit -> Fetch Metadata
  elements.fetchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const url = elements.playlistUrlInput.value.trim();
    if (!url) return;
    hideClipboardBanner();
    await fetchPlaylistData(url);
  });

  // Settings Panel Toggle
  elements.btnSettingsToggle.addEventListener("click", () => {
    elements.settingsPanel.classList.toggle("hidden");
  });
  elements.btnCloseSettings.addEventListener("click", () => {
    elements.settingsPanel.classList.add("hidden");
  });

  // Windows Native Folder Picker
  if (elements.btnBrowseFolder) {
    elements.btnBrowseFolder.addEventListener("click", chooseFolderNative);
  }

  // Browse Directory in Windows Explorer
  elements.btnOpenDir.addEventListener("click", openCurrentDirectory);
  elements.btnOpenFolder.addEventListener("click", openCurrentDirectory);
  elements.btnBarOpenFolder.addEventListener("click", openCurrentDirectory);

  // Select / Deselect Controls
  elements.btnSelectAll.addEventListener("click", () => setAllTracksSelection(true));
  elements.btnDeselectAll.addEventListener("click", () => setAllTracksSelection(false));
  if (elements.btnInvertSelect) {
    elements.btnInvertSelect.addEventListener("click", invertTracksSelection);
  }
  elements.checkAll.addEventListener("change", (e) => setAllTracksSelection(e.target.checked));

  // In-Playlist Filter Listener
  if (elements.trackFilterInput) {
    elements.trackFilterInput.addEventListener("input", debounce(filterTracks, 150));
  }
  if (elements.btnClearFilter) {
    elements.btnClearFilter.addEventListener("click", () => {
      elements.trackFilterInput.value = "";
      filterTracks();
      elements.trackFilterInput.focus();
    });
  }

  // Load More Tracks Button (manual fallback for sentinel)
  if (elements.btnLoadMore) {
    elements.btnLoadMore.addEventListener("click", renderNextTrackBatch);
  }

  // Delegated click handler for tracks list (checkboxes, play preview/HQ, single downloads)
  if (elements.tracksList) {
    elements.tracksList.addEventListener("click", handleTracksListClick);
  }

  // Live Queue Drawer Toggle & Close
  if (elements.btnBarToggleQueue) {
    elements.btnBarToggleQueue.addEventListener("click", () => {
      elements.queueDrawer.classList.toggle("hidden");
    });
  }
  if (elements.btnCloseQueue) {
    elements.btnCloseQueue.addEventListener("click", () => {
      elements.queueDrawer.classList.add("hidden");
    });
  }

  // Start Download
  elements.btnStartDownload.addEventListener("click", startDownloadProcess);

  // Retry Failed Buttons
  if (elements.btnRetryFailed) {
    elements.btnRetryFailed.addEventListener("click", retryFailedTracks);
  }
  if (elements.btnModalRetryFailed) {
    elements.btnModalRetryFailed.addEventListener("click", () => {
      elements.completionModal.classList.add("hidden");
      retryFailedTracks();
    });
  }

  // Cancel Download
  elements.btnBarCancel.addEventListener("click", cancelDownloadProcess);

  // Celebration Modal Close
  if (elements.btnModalClose) {
    elements.btnModalClose.addEventListener("click", () => {
      elements.completionModal.classList.add("hidden");
    });
  }
  if (elements.btnModalOpenFolder) {
    elements.btnModalOpenFolder.addEventListener("click", () => {
      openCurrentDirectory();
      elements.completionModal.classList.add("hidden");
    });
  }

  // Completion Modal Backdrop Click to dismiss
  if (elements.completionModal) {
    elements.completionModal.addEventListener("click", (e) => {
      if (e.target === elements.completionModal) {
        elements.completionModal.classList.add("hidden");
      }
    });
  }

  // Live sync of manual output directory edits
  if (elements.settingOutdir) {
    elements.settingOutdir.addEventListener("input", () => {
      const val = elements.settingOutdir.value.trim();
      if (val && state.currentPlaylist) {
        state.currentOutputDir = `${val}\\${sanitizeFilename(state.currentPlaylist.title)}`;
      }
    });
  }

  // Navigation Tabs (Search vs Library)
  if (elements.tabSearch) {
    elements.tabSearch.addEventListener("click", () => switchNavTab("search"));
  }
  if (elements.tabLibrary) {
    elements.tabLibrary.addEventListener("click", () => switchNavTab("library"));
  }

  // Spotify Account Button in Navbar
  if (elements.btnSpotifyAccount) {
    elements.btnSpotifyAccount.addEventListener("click", handleSpotifyNavClick);
  }

  // Connect & Auth Modal Triggers
  if (elements.btnLibraryConnect) {
    elements.btnLibraryConnect.addEventListener("click", openSpotifyAuthModal);
  }
  if (elements.btnLibraryManualAuth) {
    elements.btnLibraryManualAuth.addEventListener("click", openSpotifyAuthModal);
  }
  if (elements.btnCloseAuthModal) {
    elements.btnCloseAuthModal.addEventListener("click", closeSpotifyAuthModal);
  }
  if (elements.spotifyAuthModal) {
    elements.spotifyAuthModal.addEventListener("click", (e) => {
      if (e.target === elements.spotifyAuthModal) closeSpotifyAuthModal();
    });
  }
  if (elements.btnModalGoogleLogin) {
    elements.btnModalGoogleLogin.addEventListener("click", startGoogleOrBrowserAuth);
  }
  if (elements.btnModalOauthLogin) {
    elements.btnModalOauthLogin.addEventListener("click", startGoogleOrBrowserAuth);
  }
  if (elements.btnCopyAuthLink) {
    elements.btnCopyAuthLink.addEventListener("click", copySpotifyAuthLink);
  }
  if (elements.btnSubmitManualToken) {
    elements.btnSubmitManualToken.addEventListener("click", handleManualTokenSubmit);
  }
  if (elements.btnAutoGrab) {
    elements.btnAutoGrab.addEventListener("click", handleAutoGrab);
  }
  if (elements.btnSubmitSpDc) {
    elements.btnSubmitSpDc.addEventListener("click", handleSpDcSubmit);
  }
  if (elements.btnCopySnippet) {
    elements.btnCopySnippet.addEventListener("click", copyTokenSnippet);
  }
  if (elements.codeTokenSnippet) {
    elements.codeTokenSnippet.addEventListener("click", copyTokenSnippet);
  }
  if (elements.btnCustomClientLogin) {
    elements.btnCustomClientLogin.addEventListener("click", () => {
      const cid = elements.inputCustomClientId ? elements.inputCustomClientId.value.trim() : "";
      const csec = elements.inputCustomClientSecret ? elements.inputCustomClientSecret.value.trim() : "";
      if (!cid || cid.length < 15) {
        showToast("Please enter a valid Spotify Client ID", "warning");
        return;
      }
      startGoogleOrBrowserAuth({ client_id: cid, client_secret: csec });
    });
  }
  if (elements.linkOpenSpotifyWeb) {
    elements.linkOpenSpotifyWeb.addEventListener("click", (e) => {
      e.preventDefault();
      fetch('/api/system/open-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: 'https://open.spotify.com' })
      }).catch(() => {
        window.open('https://open.spotify.com', '_blank');
      });
    });
  }

  // Spotify Logout & Refresh
  if (elements.btnSpotifyLogout) {
    elements.btnSpotifyLogout.addEventListener("click", handleSpotifyLogout);
  }
  if (elements.btnRefreshLibrary) {
    elements.btnRefreshLibrary.addEventListener("click", () => checkSpotifyAuth(true));
  }

  // Liked Songs 1-Click Actions
  if (elements.btnDownloadLiked) {
    elements.btnDownloadLiked.addEventListener("click", () => downloadLikedSongs(true));
  }
  if (elements.btnInspectLiked) {
    elements.btnInspectLiked.addEventListener("click", () => downloadLikedSongs(false));
  }

  // Library Search / Filter
  if (elements.libraryFilterInput) {
    elements.libraryFilterInput.addEventListener("input", debounce(filterUserPlaylists, 200));
  }

  // Lyrics Drawer Controls
  if (elements.mpBtnLyrics) {
    elements.mpBtnLyrics.addEventListener("click", toggleLyricsDrawer);
  }
  if (elements.btnCloseLyrics) {
    elements.btnCloseLyrics.addEventListener("click", closeLyricsDrawer);
  }

  // Mobile Transfer Modal Controls
  if (elements.btnMobileTransfer) {
    elements.btnMobileTransfer.addEventListener("click", openMobileTransferModal);
  }
  if (elements.btnCloseMobileModal) {
    elements.btnCloseMobileModal.addEventListener("click", closeMobileTransferModal);
  }
  if (elements.mobileTransferModal) {
    elements.mobileTransferModal.addEventListener("click", (e) => {
      if (e.target === elements.mobileTransferModal) closeMobileTransferModal();
    });
  }
  if (elements.tabQrLan) {
    elements.tabQrLan.addEventListener("click", () => switchQrMode("lan"));
  }
  if (elements.tabQrTunnel) {
    elements.tabQrTunnel.addEventListener("click", () => switchQrMode("tunnel"));
  }
  if (elements.btnCopyMobileUrl) {
    elements.btnCopyMobileUrl.addEventListener("click", copyMobileTransferUrl);
  }

  // Listen for popup OAuth callback
  window.addEventListener("message", handleSpotifyAuthMessage);
}

// Native Windows Folder Picker
async function chooseFolderNative() {
  try {
    showToast("Opening Windows folder selector dialog...", "info", 2500);
    const initialDir = elements.settingOutdir.value.trim() || state.defaultOutputDir;
    const res = await fetch("/api/system/select-folder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initial_dir: initialDir }),
    });
    const data = await res.json();
    if (data.success && data.selected_dir) {
      elements.settingOutdir.value = data.selected_dir;
      if (state.currentPlaylist) {
        state.currentOutputDir = `${data.selected_dir}\\${sanitizeFilename(state.currentPlaylist.title)}`;
      }
      showToast(`Saved download destination: ${data.selected_dir}`, "success", 4000);
    }
  } catch (err) {
    showToast("Could not open Windows folder picker: " + err.message, "error");
  }
}

// Auto-Clipboard Detection Setup (Window Focus & Visibility Detection)
function setupClipboardAutoDetect() {
  window.addEventListener("focus", checkClipboardForMusicLink);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      checkClipboardForMusicLink();
    }
  });

  // Check once after initial startup
  setTimeout(checkClipboardForMusicLink, 800);

  if (elements.btnClipboardLoad) {
    elements.btnClipboardLoad.addEventListener("click", () => {
      const url = elements.clipboardUrlPreview.textContent;
      if (url) {
        elements.playlistUrlInput.value = url;
        elements.btnClearUrl.classList.remove("hidden");
        if (elements.btnPasteClipboard) elements.btnPasteClipboard.classList.add("hidden");
        updateInputPlatformBadge();
        hideClipboardBanner();
        elements.fetchForm.requestSubmit();
      }
    });
  }

  if (elements.btnClipboardDismiss) {
    elements.btnClipboardDismiss.addEventListener("click", hideClipboardBanner);
  }
}

async function checkClipboardForMusicLink() {
  try {
    if (!navigator.clipboard || !navigator.clipboard.readText) return;
    const text = (await navigator.clipboard.readText()).trim();
    if (!text) return;

    const p = getPlatformInfo(text);
    if (p && text !== state.lastClipboardChecked && (!state.currentPlaylist || text !== elements.playlistUrlInput.value.trim())) {
      state.lastClipboardChecked = text;
      elements.clipboardUrlPreview.textContent = text;
      
      const bannerBadge = document.getElementById("clipboard-platform-badge");
      if (bannerBadge) {
        bannerBadge.className = `platform-badge platform-badge-sm ${p.badgeClass}`;
        bannerBadge.textContent = `${p.icon} ${p.name}`;
      }
      const bannerTitle = elements.clipboardBanner.querySelector(".clipboard-title");
      if (bannerTitle) {
        bannerTitle.textContent = `${p.name} link detected in clipboard`;
      }
      elements.clipboardBanner.className = `clipboard-banner card ${p.theme}`;
      elements.clipboardBanner.classList.remove("hidden");
      if (window.lucide) window.lucide.createIcons();
    }
  } catch (err) {
    // Clipboard permission not granted yet - ignore quietly
  }
}

function updateInputPlatformBadge() {
  const url = elements.playlistUrlInput ? elements.playlistUrlInput.value.trim() : "";
  const badge = document.getElementById("detected-platform-badge");
  if (!badge) return;
  const p = getPlatformInfo(url);
  if (p) {
    badge.className = `detected-platform-badge platform-badge platform-badge-sm ${p.badgeClass}`;
    badge.textContent = `${p.icon} ${p.name}`;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
}

function hideClipboardBanner() {
  if (elements.clipboardBanner) {
    elements.clipboardBanner.classList.add("hidden");
  }
}

// Quick Filter Chips Setup
function setupFilterChips() {
  if (!elements.filterQuickChips) return;
  const chips = elements.filterQuickChips.querySelectorAll(".filter-chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      state.activeFilterChip = chip.getAttribute("data-filter") || "all";
      filterTracks();
    });
  });
}

function updateFilterChipBadges() {
  if (!state.currentPlaylist) return;
  const total = state.currentPlaylist.tracks.length;
  const selected = state.selectedTrackIds.size;
  const unselected = total - selected;
  const downloaded = state.downloadedFilesMap.size;
  const failed = state.failedTrackIds.size;

  if (elements.chipAllCount) elements.chipAllCount.textContent = total;
  if (elements.chipSelectedCount) elements.chipSelectedCount.textContent = selected;
  if (elements.chipUnselectedCount) elements.chipUnselectedCount.textContent = unselected;
  if (elements.chipDoneCount) elements.chipDoneCount.textContent = downloaded;
  if (elements.chipFailedCount) elements.chipFailedCount.textContent = failed;

  // Show/Hide Retry button if there are failures
  if (elements.btnRetryFailed) {
    if (failed > 0) {
      elements.btnRetryFailed.classList.remove("hidden");
      if (elements.plFailedCount) elements.plFailedCount.textContent = failed;
    } else {
      elements.btnRetryFailed.classList.add("hidden");
    }
  }
}

// Recent Playlists Management
function loadRecentPlaylists() {
  if (!elements.recentSection || !elements.recentGrid) return;
  try {
    const raw = localStorage.getItem(state.recentStorageKey);
    const items = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(items) || items.length === 0) {
      elements.recentSection.classList.add("hidden");
      return;
    }

    elements.recentGrid.innerHTML = items
      .map(
        (pl) => `
        <div class="recent-card" data-url="${escapeHtml(pl.url)}" title="Reload ${escapeHtml(pl.title)}">
          <img src="${escapeHtml(pl.cover_url || '')}" class="recent-thumb" alt="" loading="lazy" />
          <div class="recent-info">
            <span class="recent-name">${escapeHtml(pl.title)}</span>
            <span class="recent-count">${pl.total_tracks} tracks • ${escapeHtml(pl.author || 'Spotify')}</span>
          </div>
        </div>
      `
      )
      .join("");

    // Bind click events to recent cards
    elements.recentGrid.querySelectorAll(".recent-card").forEach((card) => {
      card.addEventListener("click", () => {
        const url = card.getAttribute("data-url");
        if (url) {
          elements.playlistUrlInput.value = url;
          elements.btnClearUrl.classList.remove("hidden");
          if (elements.btnPasteClipboard) elements.btnPasteClipboard.classList.add("hidden");
          elements.fetchForm.requestSubmit();
        }
      });
    });

    elements.recentSection.classList.remove("hidden");
  } catch (err) {
    console.error("Failed loading recent playlists:", err);
  }
}

function saveRecentPlaylist(data, url) {
  try {
    const raw = localStorage.getItem(state.recentStorageKey);
    let items = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(items)) items = [];

    // Filter out duplicates with same url or id
    items = items.filter((item) => item.url !== url && item.id !== data.id);

    // Prepend new item
    items.unshift({
      id: data.id,
      title: data.title,
      author: data.author,
      cover_url: data.cover_url,
      total_tracks: data.total_tracks,
      url: url,
      timestamp: Date.now(),
    });

    // Cap at 6 items
    items = items.slice(0, 6);
    localStorage.setItem(state.recentStorageKey, JSON.stringify(items));
    loadRecentPlaylists();
  } catch (err) {
    console.error("Failed saving recent playlist:", err);
  }
}

function clearRecentPlaylists() {
  localStorage.removeItem(state.recentStorageKey);
  if (elements.recentSection) elements.recentSection.classList.add("hidden");
  showToast("Recent history cleared", "info", 2000);
}

// Quick Quality Pills Setup
function setupQualityPills() {
  if (!elements.qualityPills) return;
  const pills = elements.qualityPills.querySelectorAll(".pill-btn");
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");

      const format = pill.getAttribute("data-format");
      const bitrate = pill.getAttribute("data-bitrate");

      if (elements.settingFormat) elements.settingFormat.value = format;
      if (elements.settingBitrate) elements.settingBitrate.value = bitrate;

      showToast(`Audio format set to ${format.toUpperCase()} (${bitrate} kbps)`, "info", 2000);
    });
  });
}

// Table Column Sorting State
let sortState = { col: null, dir: "asc" };

function setupTableSorting() {
  if (elements.thSortTitle) {
    elements.thSortTitle.addEventListener("click", () => sortTracks("title"));
  }
  if (elements.thSortAlbum) {
    elements.thSortAlbum.addEventListener("click", () => sortTracks("album"));
  }
  if (elements.thSortDur) {
    elements.thSortDur.addEventListener("click", () => sortTracks("dur"));
  }
}

function sortTracks(col) {
  if (!state.currentPlaylist || !state.filteredTracks || state.filteredTracks.length === 0) return;

  if (sortState.col === col) {
    sortState.dir = sortState.dir === "asc" ? "desc" : "asc";
  } else {
    sortState.col = col;
    sortState.dir = "asc";
  }

  // Update visual sort headers
  [
    { el: elements.thSortTitle, key: "title" },
    { el: elements.thSortAlbum, key: "album" },
    { el: elements.thSortDur, key: "dur" }
  ].forEach(({ el, key }) => {
    if (!el) return;
    el.classList.remove("active-asc", "active-desc");
    const icon = el.querySelector(".sort-icon");
    if (key === col) {
      el.classList.add(sortState.dir === "asc" ? "active-asc" : "active-desc");
      if (icon) {
        icon.setAttribute("data-lucide", sortState.dir === "asc" ? "arrow-up" : "arrow-down");
      }
    } else {
      if (icon) {
        icon.setAttribute("data-lucide", "arrow-up-down");
      }
    }
  });
  if (window.lucide) window.lucide.createIcons();

  state.filteredTracks.sort((a, b) => {
    let valA = "", valB = "";
    if (col === "title") {
      valA = (a.title || "").toLowerCase();
      valB = (b.title || "").toLowerCase();
    } else if (col === "album") {
      valA = (a.album || "").toLowerCase();
      valB = (b.album || "").toLowerCase();
    } else if (col === "dur") {
      valA = a.duration_ms || 0;
      valB = b.duration_ms || 0;
      return sortState.dir === "asc" ? valA - valB : valB - valA;
    }
    if (valA < valB) return sortState.dir === "asc" ? -1 : 1;
    if (valA > valB) return sortState.dir === "asc" ? 1 : -1;
    return 0;
  });

  state.renderedTrackCount = 0;
  state.lastCheckedIndex = -1;
  elements.tracksList.innerHTML = "";
  renderNextTrackBatch();

  const label = col === "title" ? "Title" : col === "album" ? "Album" : "Duration";
  const order = sortState.dir === "asc" ? (col === "dur" ? "Shortest first" : "A → Z") : (col === "dur" ? "Longest first" : "Z → A");
  showToast(`Sorted by ${label} (${order})`, "info", 1800);
}

// Keyboard Shortcuts Legend Modal
function setupShortcutsModal() {
  if (elements.btnShortcutsToggle) {
    elements.btnShortcutsToggle.addEventListener("click", () => toggleShortcutsModal(true));
  }
  if (elements.btnCloseShortcutsModal) {
    elements.btnCloseShortcutsModal.addEventListener("click", () => toggleShortcutsModal(false));
  }
  if (elements.shortcutsModal) {
    elements.shortcutsModal.addEventListener("click", (e) => {
      if (e.target === elements.shortcutsModal) toggleShortcutsModal(false);
    });
  }
}

function toggleShortcutsModal(show) {
  if (!elements.shortcutsModal) return;
  const isCurrentlyOpen = !elements.shortcutsModal.classList.contains("hidden");
  const target = show !== undefined ? show : !isCurrentlyOpen;
  if (target) {
    elements.shortcutsModal.classList.remove("hidden");
    if (window.lucide) window.lucide.createIcons();
  } else {
    elements.shortcutsModal.classList.add("hidden");
  }
}

// Keyboard Shortcuts Setup
function setupKeyboardShortcuts() {
  window.addEventListener("keydown", (e) => {
    const active = document.activeElement;
    const isTyping = active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable);

    // '?' to toggle shortcuts modal
    if (e.key === "?" && !isTyping) {
      e.preventDefault();
      toggleShortcutsModal();
      return;
    }

    // 'm' or 'M' to toggle mute
    if ((e.key === "m" || e.key === "M") && !isTyping) {
      e.preventDefault();
      if (elements.mpBtnMute) elements.mpBtnMute.click();
      return;
    }

    // '/' to focus search / filter
    if (e.key === "/" && !isTyping) {
      e.preventDefault();
      if (state.currentPlaylist && elements.trackFilterInput) {
        elements.trackFilterInput.focus();
      } else if (elements.playlistUrlInput) {
        elements.playlistUrlInput.focus();
      }
      return;
    }

    // Ctrl+A to select all (when not in input)
    if (e.ctrlKey && (e.key === "a" || e.key === "A") && !isTyping && state.currentPlaylist) {
      e.preventDefault();
      setAllTracksSelection(true);
      showToast("Selected all tracks", "info", 1500);
      return;
    }

    // Spacebar to toggle audio preview / HQ play
    if (e.code === "Space" && !isTyping && state.currentlyPlayingId) {
      e.preventDefault();
      if (elements.mpBtnPlay) elements.mpBtnPlay.click();
      return;
    }

    // Escape to close modals / queue
    if (e.key === "Escape") {
      if (elements.shortcutsModal && !elements.shortcutsModal.classList.contains("hidden")) {
        toggleShortcutsModal(false);
        return;
      }
      if (elements.queueDrawer && !elements.queueDrawer.classList.contains("hidden")) {
        elements.queueDrawer.classList.add("hidden");
        return;
      }
      if (elements.settingsPanel && !elements.settingsPanel.classList.contains("hidden")) {
        elements.settingsPanel.classList.add("hidden");
        return;
      }
      if (elements.spotifyAuthModal && !elements.spotifyAuthModal.classList.contains("hidden")) {
        closeSpotifyAuthModal();
        return;
      }
      if (elements.completionModal && !elements.completionModal.classList.contains("hidden")) {
        elements.completionModal.classList.add("hidden");
        return;
      }
      if (elements.previewPlayer && !elements.previewPlayer.paused) {
        elements.previewPlayer.pause();
        if (elements.miniPlayer) elements.miniPlayer.classList.add("hidden");
        resetRowPlayIcons();
      }
    }
  });
}

// Paste From Clipboard Helper
async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    if (text && text.trim()) {
      elements.playlistUrlInput.value = text.trim();
      elements.btnClearUrl.classList.remove("hidden");
      if (elements.btnPasteClipboard) elements.btnPasteClipboard.classList.add("hidden");
      showToast("Pasted link from clipboard", "info");
      const isMusicLink = text.includes("spotify.com") || text.startsWith("spotify:") || text.includes("youtube.com") || text.includes("youtu.be") || text.includes("jiosaavn.com") || text.includes("saavn.com") || text.includes("music.amazon");
      if (isMusicLink) {
        elements.fetchForm.requestSubmit();
      }
    } else {
      showToast("Clipboard is empty", "info");
    }
  } catch (err) {
    showToast("Please allow clipboard permissions to paste", "info");
  }
}

// Loading State (Spinner + Skeleton Shimmer)
function setLoadingState(isLoading) {
  if (isLoading) {
    elements.btnFetch.disabled = true;
    elements.fetchSpinner.classList.remove("hidden");
    elements.btnFetch.querySelector(".btn-text").textContent = "Loading...";
    if (elements.skeletonSection) elements.skeletonSection.classList.remove("hidden");
    if (elements.playlistSection) elements.playlistSection.classList.add("hidden");
  } else {
    elements.btnFetch.disabled = false;
    elements.fetchSpinner.classList.add("hidden");
    elements.btnFetch.querySelector(".btn-text").textContent = "Load Music";
    if (elements.skeletonSection) elements.skeletonSection.classList.add("hidden");
  }
}

// Fetch Metadata & Track List from Backend
async function fetchPlaylistData(url) {
  setLoadingState(true);
  try {
    if (isWebDemo) {
      // Web Showcase Direct Instant Resolver (Zero Mixed Content delays)
      let resolved = null;
      const p = getPlatformInfo(url);
      const pId = p ? p.id : "spotify";

      if (pId === "youtube" || pId === "youtube_music") {
        resolved = await resolveYouTubeMetadata(url);
      } else if (pId === "jiosaavn") {
        resolved = resolveJioSaavnSlugMetadata(url);
      } else if (pId === "spotify") {
        resolved = await resolveSpotifyMetadata(url);
      }

      if (!resolved) {
        resolved = getDemoDataForUrl(url);
      }

      setLoadingState(false);
      state.currentPlaylist = resolved;
      saveRecentPlaylist(resolved, url);
      renderPlaylistView(resolved);
      showToast(`Loaded "${resolved.title}" (${resolved.platform_badge})`, "success", 4000);
      return resolved;
    }

    const res = await fetch("/api/playlist/info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: url,
        client_id: localStorage.getItem("my_music_spotify_client_id") || undefined,
        client_secret: localStorage.getItem("my_music_spotify_client_secret") || undefined,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Could not retrieve music metadata.");
    }

    const data = await res.json();
    state.currentPlaylist = data;
    saveRecentPlaylist(data, url);
    renderPlaylistView(data);
    showToast(`Loaded "${data.title}" (${data.total_tracks} tracks)`, "success");
    return data;
  } catch (err) {
    showToast("Error loading music: " + err.message, "error", 5000);
    return null;
  } finally {
    setLoadingState(false);
  }
}

// Progressive Chunked Track Rendering Setup
function setupIntersectionObserver() {
  if ("IntersectionObserver" in window) {
    state.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && state.currentPlaylist) {
            renderNextTrackBatch();
          }
        });
      },
      { rootMargin: "300px" }
    );
    if (elements.tracksSentinel) {
      state.observer.observe(elements.tracksSentinel);
    }
  }
}

// Render Playlist Header & Initialize Progressive Track Rendering
function renderPlaylistView(data) {
  state.selectedTrackIds.clear();
  state.failedTrackIds.clear();
  state.downloadedFilesMap.clear();

  // Populate Header
  elements.plCover.src = data.cover_url || "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A311FFE/image-size/large?v=v2&px=999";
  const badgePrefix = data.platform_badge ? `${data.platform_badge} • ` : "";
  const plPlatform = data.source || (elements.playlistUrlInput ? elements.playlistUrlInput.value : "") || "spotify";
  const pInfo = getPlatformInfo(plPlatform) || { name: data.platform_badge || "Spotify", badgeClass: "platform-badge-spotify", icon: "🟢" };
  const plBadge = document.getElementById("pl-platform-badge");
  if (plBadge) {
    plBadge.className = `platform-badge platform-badge-sm ${pInfo.badgeClass}`;
    plBadge.textContent = `${pInfo.icon} ${data.platform_badge || pInfo.name}`;
  }
  elements.plType.textContent = (data.type || "PLAYLIST").toUpperCase();
  elements.plTitle.textContent = data.title;
  elements.plDesc.textContent = data.description || (data.author ? `Curated by ${data.author}` : "");
  elements.plAuthor.textContent = data.author || "Curator";
  elements.plCount.textContent = data.total_tracks;
  elements.plDuration.textContent = data.total_duration_formatted || "";

  // Reset filter input
  if (elements.trackFilterInput) {
    elements.trackFilterInput.value = "";
    if (elements.btnClearFilter) elements.btnClearFilter.classList.add("hidden");
    elements.filterCounter.textContent = `Showing all ${data.total_tracks} songs`;
  }

  // Build target download directory preview
  const sanitizedTitle = sanitizeFilename(data.title);
  state.currentOutputDir = `${state.defaultOutputDir}\\${sanitizedTitle}`;

  // Select all tracks by default
  data.tracks.forEach((track) => state.selectedTrackIds.add(track.id));

  // Initialize filtered track list & progressive render
  state.activeFilterChip = "all";
  if (elements.filterQuickChips) {
    elements.filterQuickChips.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
    const allChip = elements.filterQuickChips.querySelector('[data-filter="all"]');
    if (allChip) allChip.classList.add("active");
  }

  state.filteredTracks = [...data.tracks];
  state.renderedTrackCount = 0;
  state.lastCheckedIndex = -1;
  elements.tracksList.innerHTML = "";

  renderNextTrackBatch();

  updateSelectionSummary();
  updateFilterChipBadges();
  elements.playlistSection.classList.remove("hidden");
  elements.playlistSection.scrollIntoView({ behavior: "smooth" });
}

// Render Next Batch (50 items) with DocumentFragment for 60 FPS performance
function renderNextTrackBatch() {
  if (!state.currentPlaylist || state.filteredTracks.length === 0) {
    if (elements.tracksSentinel) elements.tracksSentinel.classList.add("hidden");
    return;
  }

  const start = state.renderedTrackCount;
  if (start >= state.filteredTracks.length) {
    if (elements.tracksSentinel) elements.tracksSentinel.classList.add("hidden");
    return;
  }

  const end = Math.min(start + state.batchSize, state.filteredTracks.length);
  const fragment = document.createDocumentFragment();

  for (let i = start; i < end; i++) {
    const track = state.filteredTracks[i];
    const row = document.createElement("div");
    row.className = "track-row";
    row.id = `track-row-${track.id}`;

    const isChecked = state.selectedTrackIds.has(track.id);
    const hasPreview = Boolean(track.preview_url);
    const isDownloaded = state.downloadedFilesMap.has(track.id);

    // Active status fallback
    let statusClass = "queued";
    let statusText = "Ready";
    if (isDownloaded) {
      statusClass = "completed";
      statusText = "Downloaded";
    } else if (state.failedTrackIds.has(track.id)) {
      statusClass = "failed";
      statusText = "Failed";
    } else if (state.activeDownloadsMap.has(track.id)) {
      const activeInfo = state.activeDownloadsMap.get(track.id);
      statusClass = activeInfo.status || "downloading";
      statusText = activeInfo.message || statusClass;
    }

    row.innerHTML = `
      <div class="col-check">
        <input type="checkbox" class="track-checkbox" data-id="${track.id}" data-index="${i}" ${isChecked ? "checked" : ""} />
      </div>
      <div class="col-num">${i + 1}</div>
      <div class="col-title">
        <img src="${track.cover_url || state.currentPlaylist.cover_url}" class="track-thumbnail" alt="" loading="lazy" />
        <div class="track-details">
          <div class="track-name-row">
            <span class="track-name" title="${escapeHtml(track.title)}">${escapeHtml(track.title)}</span>
            <span class="platform-badge platform-badge-xs ${getPlatformInfo(track.source || (state.currentPlaylist ? state.currentPlaylist.source : '') || 'spotify')?.badgeClass || 'platform-badge-spotify'}">${getPlatformInfo(track.source || (state.currentPlaylist ? state.currentPlaylist.source : '') || 'spotify')?.name || 'Spotify'}</span>
            ${track.is_explicit ? '<span class="explicit-tag">E</span>' : ""}
            ${
              isDownloaded
                ? `<button type="button" class="btn-preview-play btn-hq-play" data-id="${track.id}" title="Play Full HQ Downloaded Track"><i data-lucide="play-circle"></i></button>`
                : hasPreview
                ? `<button type="button" class="btn-preview-play" data-id="${track.id}" title="Preview 30s"><i data-lucide="play-circle"></i></button>`
                : ""
            }
          </div>
          <span class="track-artist" title="${escapeHtml(track.artists)}">${escapeHtml(track.artists)}</span>
        </div>
      </div>
      <div class="col-album" title="${escapeHtml(track.album || state.currentPlaylist.title)}">${escapeHtml(track.album || state.currentPlaylist.title)}</div>
      <div class="col-dur">${track.duration_formatted || track.duration_str || formatDuration(track.duration_ms) || "--:--"}</div>
      <div class="col-actions">
        <button type="button" class="btn-single-dl" data-id="${track.id}" title="Download '${escapeHtml(track.title)}' immediately">
          <i data-lucide="download"></i>
        </button>
      </div>
      <div class="col-status">
        <span class="badge-status ${statusClass}" id="status-badge-${track.id}">${statusText}</span>
      </div>
    `;

    fragment.appendChild(row);
  }

  elements.tracksList.appendChild(fragment);
  state.renderedTrackCount = end;

  // Update Sentinel Button / Visibility
  if (elements.tracksSentinel) {
    if (state.renderedTrackCount < state.filteredTracks.length) {
      elements.tracksSentinel.classList.remove("hidden");
      const remaining = state.filteredTracks.length - state.renderedTrackCount;
      if (elements.btnLoadMore) {
        elements.btnLoadMore.innerHTML = `<i data-lucide="chevrons-down"></i> Load More Tracks (${remaining} remaining)`;
      }
    } else {
      elements.tracksSentinel.classList.add("hidden");
    }
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Delegated Click Handler for Tracks List
function handleTracksListClick(e) {
  // 1. Checkbox click
  const chk = e.target.closest(".track-checkbox");
  if (chk) {
    const trackId = chk.getAttribute("data-id");
    const clickedIdx = parseInt(chk.getAttribute("data-index"), 10);
    if (e.shiftKey && state.lastCheckedIndex !== -1 && state.lastCheckedIndex !== clickedIdx) {
      const minIdx = Math.min(state.lastCheckedIndex, clickedIdx);
      const maxIdx = Math.max(state.lastCheckedIndex, clickedIdx);
      const targetChecked = chk.checked;

      for (let j = minIdx; j <= maxIdx; j++) {
        const t = state.filteredTracks[j];
        if (!t) continue;
        if (targetChecked) {
          state.selectedTrackIds.add(t.id);
        } else {
          state.selectedTrackIds.delete(t.id);
        }
        const rowChk = document.querySelector(`.track-checkbox[data-index="${j}"]`);
        if (rowChk) rowChk.checked = targetChecked;
      }
    } else {
      if (chk.checked) {
        state.selectedTrackIds.add(trackId);
      } else {
        state.selectedTrackIds.delete(trackId);
      }
    }
    state.lastCheckedIndex = clickedIdx;
    updateSelectionSummary();
    updateFilterChipBadges();
    return;
  }

  // 2. Single-track download button
  const btnSingleDl = e.target.closest(".btn-single-dl");
  if (btnSingleDl) {
    const trackId = btnSingleDl.getAttribute("data-id");
    if (state.currentPlaylist && state.currentPlaylist.tracks) {
      const track = state.currentPlaylist.tracks.find((t) => t.id === trackId);
      if (track) downloadSingleTrack(track);
    }
    return;
  }

  // 3. Audio preview / HQ play button
  const btnPlay = e.target.closest(".btn-preview-play");
  if (btnPlay) {
    const trackId = btnPlay.getAttribute("data-id");
    if (state.currentPlaylist && state.currentPlaylist.tracks) {
      const track = state.currentPlaylist.tracks.find((t) => t.id === trackId);
      if (track) handleTrackPlayClick(track);
    }
    return;
  }
}

// In-Playlist Live Filter (Text Search + Quick Filter Chips)
function filterTracks() {
  const query = elements.trackFilterInput ? elements.trackFilterInput.value.trim().toLowerCase() : "";
  if (elements.btnClearFilter) {
    if (query.length > 0) {
      elements.btnClearFilter.classList.remove("hidden");
    } else {
      elements.btnClearFilter.classList.add("hidden");
    }
  }

  if (!state.currentPlaylist) return;

  if (query.length === 0 && state.activeFilterChip === "all") {
    state.filteredTracks = state.currentPlaylist.tracks;
  } else {
    state.filteredTracks = state.currentPlaylist.tracks.filter((t) => {
      // 1. Text Search Match
      if (query.length > 0) {
        const text = `${t.title} ${t.artists} ${t.album || ""}`.toLowerCase();
        if (!text.includes(query)) return false;
      }

      // 2. Quick Filter Chip Match
      if (state.activeFilterChip === "selected") {
        return state.selectedTrackIds.has(t.id);
      }
      if (state.activeFilterChip === "unselected") {
        return !state.selectedTrackIds.has(t.id);
      }
      if (state.activeFilterChip === "downloaded") {
        return state.downloadedFilesMap.has(t.id);
      }
      if (state.activeFilterChip === "failed") {
        return state.failedTrackIds.has(t.id);
      }

      return true;
    });
  }

  // Reset rendering pointer and re-render from batch 0
  state.renderedTrackCount = 0;
  state.lastCheckedIndex = -1;
  elements.tracksList.innerHTML = "";

  if (state.filteredTracks.length === 0) {
    elements.tracksList.innerHTML = `
      <div class="tracks-empty-state">
        <i data-lucide="search-x"></i>
        <h3>No matching songs found</h3>
        <p>No tracks match "${escapeHtml(query)}" under the current filter.</p>
      </div>
    `;
    if (elements.tracksSentinel) elements.tracksSentinel.classList.add("hidden");
    if (window.lucide) window.lucide.createIcons();
  } else {
    renderNextTrackBatch();
  }

  const total = state.currentPlaylist.tracks.length;
  if (elements.filterCounter) {
    if (query.length === 0 && state.activeFilterChip === "all") {
      elements.filterCounter.textContent = `Showing all ${total} songs`;
    } else {
      elements.filterCounter.textContent = `Showing ${state.filteredTracks.length} of ${total} songs`;
    }
  }
}

// Selection Helpers
function setAllTracksSelection(isSelected) {
  if (!state.currentPlaylist) return;

  const targetTracks = (state.filteredTracks && state.filteredTracks.length < state.currentPlaylist.tracks.length)
    ? state.filteredTracks
    : state.currentPlaylist.tracks;

  targetTracks.forEach((t) => {
    if (isSelected) {
      state.selectedTrackIds.add(t.id);
    } else {
      state.selectedTrackIds.delete(t.id);
    }
  });

  document.querySelectorAll(".track-checkbox").forEach((chk) => {
    const id = chk.getAttribute("data-id");
    chk.checked = state.selectedTrackIds.has(id);
  });

  elements.checkAll.checked = isSelected && state.selectedTrackIds.size === state.currentPlaylist.tracks.length;
  updateSelectionSummary();
  updateFilterChipBadges();
}

function invertTracksSelection() {
  if (!state.currentPlaylist) return;

  const targetTracks = (state.filteredTracks && state.filteredTracks.length < state.currentPlaylist.tracks.length)
    ? state.filteredTracks
    : state.currentPlaylist.tracks;

  targetTracks.forEach((t) => {
    if (state.selectedTrackIds.has(t.id)) {
      state.selectedTrackIds.delete(t.id);
    } else {
      state.selectedTrackIds.add(t.id);
    }
  });

  document.querySelectorAll(".track-checkbox").forEach((chk) => {
    const id = chk.getAttribute("data-id");
    chk.checked = state.selectedTrackIds.has(id);
  });

  updateSelectionSummary();
  updateFilterChipBadges();
  showToast(`Inverted selection: ${state.selectedTrackIds.size} tracks`, "info", 1800);
}

function updateSelectionSummary() {
  const count = state.selectedTrackIds.size;
  const total = state.currentPlaylist ? state.currentPlaylist.tracks.length : 0;
  elements.downloadBtnLabel.textContent = `Download Selected (${count} ${count === 1 ? "track" : "tracks"})`;
  elements.btnStartDownload.disabled = count === 0;
  elements.checkAll.checked = count === total && total > 0;

  if (elements.selectionSummaryPill) {
    elements.selectionSummaryPill.textContent = `${count} of ${total} selected`;
  }
}

// Unified Track Audio Playback Trigger (prevents duplicate listeners)
function handleTrackPlayClick(track) {
  if (state.downloadedFilesMap.has(track.id)) {
    playTrackAudio(track, true, state.downloadedFilesMap.get(track.id));
  } else if (track.preview_url) {
    playTrackAudio(track, false, track.preview_url);
  }
}

// Floating Mini-Player Controls
function setupAudioPlayer() {
  if (!elements.previewPlayer) return;

  elements.previewPlayer.addEventListener("timeupdate", () => {
    const current = elements.previewPlayer.currentTime || 0;
    const total = elements.previewPlayer.duration || state.previewDuration;
    const pct = total > 0 ? (current / total) * 100 : 0;
    if (elements.mpProgressFill) elements.mpProgressFill.style.width = `${pct}%`;
    if (elements.mpCurrentTime) elements.mpCurrentTime.textContent = formatSec(current);
    if (elements.mpTotalTime) elements.mpTotalTime.textContent = formatSec(total);
    updateLyricsTime(current);
  });

  elements.previewPlayer.addEventListener("ended", () => {
    if (elements.mpBtnPlay) elements.mpBtnPlay.innerHTML = '<i data-lucide="play"></i>';
    if (elements.equalizerBars) elements.equalizerBars.style.opacity = "0.3";
    resetRowPlayIcons();
    if (window.lucide) window.lucide.createIcons();
  });

  if (elements.mpBtnPlay) {
    elements.mpBtnPlay.addEventListener("click", () => {
      if (elements.previewPlayer.paused) {
        elements.previewPlayer.play();
        elements.mpBtnPlay.innerHTML = '<i data-lucide="pause"></i>';
        if (elements.equalizerBars) elements.equalizerBars.style.opacity = "1";
      } else {
        elements.previewPlayer.pause();
        elements.mpBtnPlay.innerHTML = '<i data-lucide="play"></i>';
        if (elements.equalizerBars) elements.equalizerBars.style.opacity = "0.3";
      }
      if (window.lucide) window.lucide.createIcons();
    });
  }

  if (elements.mpProgressBar) {
    elements.mpProgressBar.addEventListener("click", (e) => {
      const rect = elements.mpProgressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = clickX / rect.width;
      const total = elements.previewPlayer.duration || state.previewDuration;
      elements.previewPlayer.currentTime = pct * total;
    });
  }

  if (elements.mpVolume) {
    elements.mpVolume.addEventListener("input", (e) => {
      elements.previewPlayer.volume = parseFloat(e.target.value);
    });
  }

  if (elements.mpBtnMute) {
    elements.mpBtnMute.addEventListener("click", () => {
      elements.previewPlayer.muted = !elements.previewPlayer.muted;
      elements.mpBtnMute.innerHTML = elements.previewPlayer.muted ? '<i data-lucide="volume-x"></i>' : '<i data-lucide="volume-2"></i>';
      if (window.lucide) window.lucide.createIcons();
    });
  }

  if (elements.mpBtnClose) {
    elements.mpBtnClose.addEventListener("click", () => {
      elements.previewPlayer.pause();
      elements.miniPlayer.classList.add("hidden");
      closeLyricsDrawer();
      resetRowPlayIcons();
    });
  }
}

function playTrackAudio(track, isHQ, audioUrlOrPath) {
  if (state.currentlyPlayingId === track.id && !elements.previewPlayer.paused) {
    elements.previewPlayer.pause();
    if (elements.mpBtnPlay) elements.mpBtnPlay.innerHTML = '<i data-lucide="play"></i>';
    if (elements.equalizerBars) elements.equalizerBars.style.opacity = "0.3";
    resetRowPlayIcons();
  } else {
    state.currentlyPlayingId = track.id;
    state.isPlayingHQ = isHQ;

    if (isHQ) {
      elements.previewPlayer.src = `/api/audio/stream?path=${encodeURIComponent(audioUrlOrPath)}`;
      state.previewDuration = track.duration_ms ? track.duration_ms / 1000 : 200;
      if (elements.mpQualityBadge) {
        elements.mpQualityBadge.textContent = "HQ Local Track";
        elements.mpQualityBadge.className = "badge-status ready hq";
      }
    } else {
      elements.previewPlayer.src = audioUrlOrPath;
      state.previewDuration = 30;
      if (elements.mpQualityBadge) {
        elements.mpQualityBadge.textContent = "Preview (30s)";
        elements.mpQualityBadge.className = "badge-status queued";
      }
    }

    elements.previewPlayer.play().catch(() => {});

    // Update Mini Player UI
    if (elements.mpCover) elements.mpCover.src = track.cover_url || (state.currentPlaylist ? state.currentPlaylist.cover_url : "");
    if (elements.mpTitle) elements.mpTitle.textContent = track.title;
    if (elements.mpArtist) elements.mpArtist.textContent = track.artists;
    if (elements.mpBtnPlay) elements.mpBtnPlay.innerHTML = '<i data-lucide="pause"></i>';
    if (elements.equalizerBars) elements.equalizerBars.style.opacity = "1";
    if (elements.miniPlayer) elements.miniPlayer.classList.remove("hidden");

    // Fetch and sync lyrics for currently playing track
    loadAndShowLyrics(track, isHQ, isHQ ? audioUrlOrPath : null);

    resetRowPlayIcons();
    const rowBtn = document.querySelector(`.btn-preview-play[data-id="${track.id}"]`);
    if (rowBtn) {
      rowBtn.innerHTML = '<i data-lucide="pause-circle"></i>';
      rowBtn.style.color = "var(--spotify-green)";
    }
    const rowEl = document.getElementById(`track-row-${track.id}`);
    if (rowEl) {
      rowEl.classList.add("playing");
    }
  }
  if (window.lucide) window.lucide.createIcons();
}

function resetRowPlayIcons() {
  state.currentlyPlayingId = null;
  document.querySelectorAll(".track-row.playing").forEach((r) => r.classList.remove("playing"));
  document.querySelectorAll(".btn-preview-play").forEach((btn) => {
    btn.innerHTML = '<i data-lucide="play-circle"></i>';
    btn.style.color = "";
  });
  if (window.lucide) window.lucide.createIcons();
}

function formatSec(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

// 1-Click Single-Track Download
async function downloadSingleTrack(track) {
  if (!state.currentPlaylist) return;

  if (isWebDemo) {
    updateTrackBadge(track.id, "downloading", "Downloading...");
    const filename = `${sanitizeFilename(track.artists)} - ${sanitizeFilename(track.title)}.mp3`;
    const downloadUrl = track.preview_url || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    triggerBrowserFileDownload(downloadUrl, filename);
    setTimeout(() => {
      updateTrackBadge(track.id, "completed", "Downloaded");
      state.downloadedFilesMap.set(track.id, filename);
      updateFilterChipBadges();
      showToast(`Downloaded "${track.title}" (.mp3)!`, "success", 3000);
    }, 800);
    return;
  }

  const options = getDownloadOptions();
  updateTrackBadge(track.id, "queued", "Queued");

  // Show Bottom Bar
  elements.downloadBar.classList.remove("hidden");
  elements.barStatusText.textContent = `Downloading "${track.title}"...`;
  elements.barProgressText.textContent = `0 / 1 (0%)`;
  elements.barProgressFill.style.width = "0%";
  state.isDownloading = true;

  showToast(`Downloading "${track.title}" by ${track.artists}`, "info");
  initEventStream();

  try {
    const res = await fetch("/api/download/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playlist_title: state.currentPlaylist.title,
        tracks: [track],
        options: options,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Failed to start single track download");
    }
  } catch (err) {
    showToast("Error downloading track: " + err.message, "error");
    state.isDownloading = false;
  }
}

// 1-Click Retry Failed Tracks
async function retryFailedTracks() {
  if (!state.currentPlaylist || state.failedTrackIds.size === 0) return;

  const failedTracks = state.currentPlaylist.tracks.filter((t) => state.failedTrackIds.has(t.id));
  if (failedTracks.length === 0) return;

  const options = getDownloadOptions();
  failedTracks.forEach((t) => {
    updateTrackBadge(t.id, "queued", "Retrying...");
  });

  // Clear from failed set as they are queued
  failedTracks.forEach((t) => state.failedTrackIds.delete(t.id));
  updateFilterChipBadges();

  elements.downloadBar.classList.remove("hidden");
  elements.barStatusText.textContent = `Retrying ${failedTracks.length} failed tracks...`;
  elements.barProgressText.textContent = `0 / ${failedTracks.length} (0%)`;
  elements.barProgressFill.style.width = "0%";
  state.isDownloading = true;

  showToast(`Retrying ${failedTracks.length} failed tracks...`, "info");
  initEventStream();

  try {
    const res = await fetch("/api/download/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playlist_title: state.currentPlaylist.title,
        tracks: failedTracks,
        options: options,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Failed to start retry");
    }
  } catch (err) {
    showToast("Error retrying downloads: " + err.message, "error");
    state.isDownloading = false;
  }
}

// Helper to assemble options object
function getDownloadOptions() {
  return {
    output_dir: elements.settingOutdir.value.trim() ? `${elements.settingOutdir.value.trim()}\\${sanitizeFilename(state.currentPlaylist.title)}` : "",
    audio_format: elements.settingFormat.value,
    bitrate: elements.settingBitrate.value,
    filename_format: elements.settingNaming.value,
    create_m3u8: elements.toggleM3u8.checked,
    overwrite: elements.toggleOverwrite.checked,
    embed_artwork: elements.toggleArtwork ? elements.toggleArtwork.checked : true,
    concurrency: parseInt(elements.settingConcurrency ? elements.settingConcurrency.value : "3", 10),
  };
}

// Start Batch Download Process
async function startDownloadProcess() {
  if (isWebDemo) {
    const selectedTracks = state.currentPlaylist ? state.currentPlaylist.tracks.filter((t) => state.selectedTrackIds.has(t.id)) : [];
    const totalCount = selectedTracks.length || 6;
    showToast(`Starting high-speed download simulation for ${totalCount} tracks...`, "info", 2000);
    elements.downloadBar.classList.remove("hidden");
    elements.btnStartDownload.disabled = true;

    selectedTracks.forEach(t => updateTrackBadge(t.id, "queued", "Queued"));

    // Trigger actual browser downloads for selected tracks
    selectedTracks.forEach((t, idx) => {
      setTimeout(() => {
        const fname = `${sanitizeFilename(t.artists)} - ${sanitizeFilename(t.title)}.mp3`;
        const dUrl = t.preview_url || `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(idx % 16) + 1}.mp3`;
        triggerBrowserFileDownload(dUrl, fname);
      }, idx * 600);
    });

    let step = 0;
    const totalSteps = 24;
    const interval = setInterval(() => {
      step++;
      const pct = Math.min(100, Math.round((step / totalSteps) * 100));
      const completedCount = Math.min(totalCount, Math.floor((step / totalSteps) * totalCount));

      elements.barProgressFill.style.width = `${pct}%`;
      elements.barProgressText.textContent = `${completedCount} / ${totalCount} (${pct}%)`;

      const activeIdx = Math.min(totalCount - 1, Math.floor((step / totalSteps) * totalCount));
      if (selectedTracks[activeIdx]) {
        if (pct < 30) {
          updateTrackBadge(selectedTracks[activeIdx].id, "downloading", `Downloading ${pct}%`);
          elements.barStatusText.textContent = `Connecting to high-speed audio streams...`;
          elements.barSpeedVal.textContent = "5.4 MB/s";
          elements.barEtaVal.textContent = "~3s";
        } else if (pct < 75) {
          updateTrackBadge(selectedTracks[activeIdx].id, "downloading", `Downloading ${pct}%`);
          elements.barStatusText.textContent = `Streaming FLAC/320k audio (${completedCount} of ${totalCount} done)...`;
          elements.barSpeedVal.textContent = "7.8 MB/s";
          elements.barEtaVal.textContent = "~2s";
        } else if (pct < 95) {
          updateTrackBadge(selectedTracks[activeIdx].id, "converting", "Converting (FFmpeg)...");
          elements.barStatusText.textContent = `Embedding studio ID3 tags, synced lyrics & cover art...`;
          elements.barSpeedVal.textContent = "6.2 MB/s";
          elements.barEtaVal.textContent = "~1s";
        }
      }

      // Mark previous tracks completed
      for (let i = 0; i < activeIdx; i++) {
        if (selectedTracks[i]) {
          updateTrackBadge(selectedTracks[i].id, "completed", "Downloaded");
        }
      }

      if (elements.barStreamsVal) elements.barStreamsVal.textContent = "4 active";

      if (step >= totalSteps) {
        clearInterval(interval);
        selectedTracks.forEach(t => updateTrackBadge(t.id, "completed", "Downloaded"));
        elements.barProgressFill.style.width = "100%";
        elements.barProgressText.textContent = `${totalCount} / ${totalCount} (100%)`;
        elements.barStatusText.textContent = `Download complete! ${totalCount} tracks saved.`;
        elements.barEtaVal.textContent = "Done";
        elements.btnStartDownload.disabled = false;

        setTimeout(() => {
          elements.downloadBar.classList.add("hidden");
          if (elements.completionModal) {
            elements.completionModal.classList.remove("hidden");
            elements.modalStatCount.textContent = totalCount;
            elements.modalStatTime.textContent = "2.9s";
            elements.modalStatFailures.textContent = "0";
            elements.modalSummaryText.textContent = `Web Preview Simulation Complete! Successfully verified ${totalCount} studio-grade audio tracks with authentic ID3 tags and high-res cover art.`;
          }
        }, 600);
      }
    }, 120);
    return;
  }
  if (!state.currentPlaylist || state.selectedTrackIds.size === 0) return;

  const selectedTracks = state.currentPlaylist.tracks.filter((t) => state.selectedTrackIds.has(t.id));
  const options = getDownloadOptions();
  state.currentOutputDir = options.output_dir;

  // Reset status badges for selected tracks
  selectedTracks.forEach((t) => {
    updateTrackBadge(t.id, "queued", "Queued");
  });

  // Show Bottom Bar
  elements.downloadBar.classList.remove("hidden");
  elements.barStatusText.textContent = "Starting high-speed download...";
  elements.barProgressText.textContent = `0 / ${selectedTracks.length} (0%)`;
  elements.barProgressFill.style.width = "0%";
  if (elements.barSpeedVal) elements.barSpeedVal.textContent = "0 KB/s";
  if (elements.barEtaVal) elements.barEtaVal.textContent = "Calculating...";
  if (elements.barStreamsVal) elements.barStreamsVal.textContent = `${options.concurrency} streams active`;
  elements.btnStartDownload.disabled = true;
  state.isDownloading = true;

  showToast(`Starting download of ${selectedTracks.length} songs at ${options.concurrency}x concurrency!`, "info");

  // Connect to SSE Stream
  initEventStream();

  try {
    const res = await fetch("/api/download/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playlist_title: state.currentPlaylist.title,
        tracks: selectedTracks,
        options: options,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Failed to start download");
    }
  } catch (err) {
    showToast("Error starting download: " + err.message, "error");
    elements.downloadBar.classList.add("hidden");
    elements.btnStartDownload.disabled = false;
    state.isDownloading = false;
  }
}

// SSE Event Stream Listener
function initEventStream() {
  if (state.eventSource) {
    state.eventSource.close();
  }

  state.eventSource = new EventSource("/api/download/stream");

  state.eventSource.onmessage = (event) => {
    try {
      const payload = JSON.parse(event.data);
      handleServerEvent(payload.type, payload.data);
    } catch (e) {
      // Keep alive / ping
    }
  };

  state.eventSource.onerror = (e) => {
    console.warn("EventSource paused or disconnected.");
  };
}

function handleServerEvent(type, data) {
  if (type === "track_update") {
    const { track_id, status, progress, message, filepath } = data;
    updateTrackBadge(track_id, status, message);

    if (status === "completed") {
      if (filepath) {
        state.downloadedFilesMap.set(track_id, filepath);
      }
      state.failedTrackIds.delete(track_id);
      // Upgrade preview button in row to HQ play button
      const row = document.getElementById(`track-row-${track_id}`);
      if (row) {
        let playBtn = row.querySelector(".btn-preview-play");
        const trackObj = state.currentPlaylist ? state.currentPlaylist.tracks.find((t) => t.id === track_id) : null;
        if (!playBtn && trackObj) {
          const nameRow = row.querySelector(".track-name-row");
          if (nameRow) {
            playBtn = document.createElement("button");
            playBtn.type = "button";
            playBtn.className = "btn-preview-play btn-hq-play";
            playBtn.setAttribute("data-id", track_id);
            playBtn.title = "Play Full HQ Downloaded Track";
            playBtn.innerHTML = '<i data-lucide="play-circle"></i>';
            playBtn.addEventListener("click", () => handleTrackPlayClick(trackObj));
            nameRow.appendChild(playBtn);
            if (window.lucide) window.lucide.createIcons();
          }
        } else if (playBtn && trackObj) {
          playBtn.className = "btn-preview-play btn-hq-play";
          playBtn.title = "Play Full HQ Downloaded Track";
        }
      }
    } else if (status === "failed") {
      state.failedTrackIds.add(track_id);
    }

    updateFilterChipBadges();

    // Track active downloads for the Live Queue Drawer
    if (status === "downloading" || status === "searching" || status === "converting" || status === "tagging") {
      let trackInfo = state.currentPlaylist ? state.currentPlaylist.tracks.find((t) => t.id === track_id) : null;
      state.activeDownloadsMap.set(track_id, {
        track_id,
        title: trackInfo ? trackInfo.title : "Track",
        artists: trackInfo ? trackInfo.artists : "Artist",
        cover_url: trackInfo ? trackInfo.cover_url : (state.currentPlaylist ? state.currentPlaylist.cover_url : ""),
        status,
        message,
      });
    } else if (status === "completed" || status === "failed") {
      setTimeout(() => {
        state.activeDownloadsMap.delete(track_id);
        updateQueueDrawer();
      }, 1500);
    }
    updateQueueDrawer();

  } else if (type === "job_progress") {
    const { completed, total, percent, speed, eta, active_count } = data;
    elements.barStatusText.textContent = `Downloading (${completed} of ${total} finished)`;
    elements.barProgressText.textContent = `${completed} / ${total} (${percent}%)`;
    elements.barProgressFill.style.width = `${percent}%`;

    if (elements.barSpeedVal && speed) elements.barSpeedVal.textContent = speed;
    if (elements.barEtaVal && eta) elements.barEtaVal.textContent = eta;
    if (elements.barStreamsVal && active_count !== undefined) {
      elements.barStreamsVal.textContent = `${active_count} active`;
    }
  } else if (type === "job_finished") {
    elements.barStatusText.textContent = `Download complete! ${data.completed} tracks saved.`;
    elements.barProgressText.textContent = `${data.completed} / ${data.total} (100%)`;
    elements.barProgressFill.style.width = "100%";
    if (elements.barEtaVal) elements.barEtaVal.textContent = "Done";
    elements.btnStartDownload.disabled = false;
    state.isDownloading = false;
    state.activeDownloadsMap.clear();
    updateQueueDrawer();
    updateFilterChipBadges();

    if (state.eventSource) state.eventSource.close();

    // Celebration modal popup
    if (elements.completionModal) {
      elements.modalStatCount.textContent = data.completed;
      elements.modalStatTime.textContent = `${data.elapsed_seconds || 0}s`;
      elements.modalStatFailures.textContent = data.failed || 0;
      elements.modalSummaryText.textContent = `Successfully cloned ${data.completed} tracks with authentic ID3 tags and high-res cover art!`;

      if (data.failed && data.failed > 0 && elements.btnModalRetryFailed) {
        elements.btnModalRetryFailed.classList.remove("hidden");
        if (elements.modalFailedCount) elements.modalFailedCount.textContent = data.failed;
      } else if (elements.btnModalRetryFailed) {
        elements.btnModalRetryFailed.classList.add("hidden");
      }

      elements.completionModal.classList.remove("hidden");
    }
    showToast(`🎉 Download complete! ${data.completed} tracks saved.`, "success", 6000);

  } else if (type === "job_cancelled") {
    elements.barStatusText.textContent = "Download cancelled.";
    elements.btnStartDownload.disabled = false;
    state.isDownloading = false;
    state.activeDownloadsMap.clear();
    updateQueueDrawer();

    if (state.eventSource) state.eventSource.close();
    showToast("Download cancelled by user", "info");
  }
}

// Update Expandable Live Queue Drawer UI
function updateQueueDrawer() {
  if (!elements.queueDrawer || !elements.queueItemsContainer) return;
  const count = state.activeDownloadsMap.size;

  if (elements.queueActiveCount) elements.queueActiveCount.textContent = `${count} active`;
  if (elements.btnQueueCount) elements.btnQueueCount.textContent = count;

  if (count === 0) {
    elements.queueItemsContainer.innerHTML = `<div class="queue-empty">No active downloads in flight</div>`;
    return;
  }

  let html = "";
  state.activeDownloadsMap.forEach((item) => {
    html += `
      <div class="queue-item-row">
        <div class="queue-item-left">
          <img src="${escapeHtml(item.cover_url || '')}" class="queue-item-thumb" alt="" />
          <div class="queue-item-info">
            <span class="queue-item-title">${escapeHtml(item.title)}</span>
            <span class="queue-item-sub">${escapeHtml(item.artists)}</span>
          </div>
        </div>
        <span class="badge-status ${item.status}">${escapeHtml(item.message || item.status)}</span>
      </div>
    `;
  });

  elements.queueItemsContainer.innerHTML = html;
}

function updateTrackBadge(trackId, status, message) {
  const badge = document.getElementById(`status-badge-${trackId}`);
  if (!badge) return;

  badge.className = `badge-status ${status}`;
  badge.textContent = message || status;
}

// Cancel Download
async function cancelDownloadProcess() {
  try {
    await fetch("/api/download/cancel", { method: "POST" });
  } catch (err) {
    console.error("Failed to cancel:", err);
  }
}

// Open Folder in Windows Explorer
async function openCurrentDirectory() {
  const targetPath = state.currentOutputDir || state.defaultOutputDir;
  try {
    const res = await fetch("/api/open-folder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: targetPath }),
    });
    if (res.ok) {
      showToast("Opened music folder in Explorer", "info", 2000);
    }
  } catch (err) {
    alert("Could not open folder in Explorer: " + err.message);
  }
}

// ==========================================
// Spotify Account & Library Controllers
// ==========================================

function switchNavTab(tabName) {
  state.activeNavTab = tabName;
  if (tabName === "library") {
    if (elements.tabSearch) elements.tabSearch.classList.remove("active");
    if (elements.tabLibrary) elements.tabLibrary.classList.add("active");
    if (elements.searchSection) elements.searchSection.classList.add("hidden");
    if (elements.librarySection) elements.librarySection.classList.remove("hidden");
    // If authenticated and no playlists loaded yet, load them
    if (state.auth.isAuthenticated && state.auth.playlists.length === 0) {
      loadUserPlaylists();
    }
  } else {
    if (elements.tabLibrary) elements.tabLibrary.classList.remove("active");
    if (elements.tabSearch) elements.tabSearch.classList.add("active");
    if (elements.librarySection) elements.librarySection.classList.add("hidden");
    if (elements.searchSection) elements.searchSection.classList.remove("hidden");
  }
  if (window.lucide) window.lucide.createIcons();
}

function handleSpotifyNavClick() {
  if (state.auth.isAuthenticated) {
    switchNavTab("library");
  } else {
    openSpotifyAuthModal();
  }
}

function openSpotifyAuthModal() {
  if (isWebDemo) {
    showToast("ℹ️ Spotify account login runs with the local desktop app. In this Web Showcase, test all playlist & player features directly!", "info", 5000);
    return;
  }
  if (elements.spotifyAuthModal) {
    elements.spotifyAuthModal.classList.remove("hidden");
    if (window.lucide) window.lucide.createIcons();
  }
}

function closeSpotifyAuthModal() {
  if (elements.spotifyAuthModal) {
    elements.spotifyAuthModal.classList.add("hidden");
  }
}

let authPollInterval = null;

async function startGoogleOrBrowserAuth(opts = {}) {
  try {
    if (elements.authWaitingBanner) {
      elements.authWaitingBanner.classList.remove("hidden");
    }
    showToast("🌐 Launching Spotify authorization in browser...", "info", 4000);

    const payload = {};
    if (opts && opts.client_id) payload.client_id = opts.client_id;
    if (opts && opts.client_secret) payload.client_secret = opts.client_secret;

    const res = await fetch("/api/spotify/auth/launch_browser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (!data.success || !data.url) {
      throw new Error(data.detail || "Failed to launch browser authentication");
    }

    // Open Spotify OAuth in foreground browser window
    const authWindow = window.open(
      data.url,
      "SpotifyAuth",
      "width=520,height=720,menubar=no,toolbar=no,location=yes,status=no"
    );
    if (!authWindow || authWindow.closed || typeof authWindow.closed === "undefined") {
      // If popup blocker blocked it, open in new tab
      window.open(data.url, "_blank");
    }

    // Start polling status every 1.5s for completion
    if (authPollInterval) clearInterval(authPollInterval);
    let attempts = 0;
    const maxAttempts = 80; // 2 minutes

    authPollInterval = setInterval(async () => {
      attempts++;
      if (attempts > maxAttempts) {
        clearInterval(authPollInterval);
        authPollInterval = null;
        if (elements.authWaitingBanner) elements.authWaitingBanner.classList.add("hidden");
        return;
      }

      try {
        const sRes = await fetch("/api/spotify/auth/status");
        const sData = await sRes.json();
        if (sData.authenticated && sData.user) {
          clearInterval(authPollInterval);
          authPollInterval = null;
          if (elements.authWaitingBanner) elements.authWaitingBanner.classList.add("hidden");
          closeSpotifyAuthModal();
          showToast(`🎉 Connected to Spotify as ${sData.user.display_name}!`, "success", 4500);
          checkSpotifyAuth(true);
          switchNavTab("library");
        }
      } catch (_) {}
    }, 1500);

  } catch (err) {
    if (elements.authWaitingBanner) elements.authWaitingBanner.classList.add("hidden");
    showToast("Authentication error: " + err.message, "error", 4000);
  }
}

async function copyTokenSnippet() {
  const snippet = `fetch('/get_access_token?reason=transport&productType=web_player').then(r=>r.json()).then(d=>{prompt('YOUR SPOTIFY TOKEN (Press Ctrl+C):',d.accessToken);});`;
  try {
    await navigator.clipboard.writeText(snippet);
    showToast("📋 1-Line command copied! Paste it in the Console on open.spotify.com", "success", 4500);
  } catch (_) {
    showToast("Selected snippet. Press Ctrl+C to copy.", "info");
  }
}

async function copySpotifyAuthLink() {
  try {
    const res = await fetch("/api/spotify/auth/login_url");
    const data = await res.json();
    if (data.url) {
      await navigator.clipboard.writeText(data.url);
      showToast("📋 Spotify login link copied! Paste into any browser window.", "success", 4000);
    } else {
      showToast("Could not generate login link", "error");
    }
  } catch (err) {
    showToast("Copy error: " + err.message, "error");
  }
}

async function startSpotifyOAuth() {
  return startGoogleOrBrowserAuth();
}

function handleSpotifyAuthMessage(event) {
  if (event.data && event.data.type === "SPOTIFY_AUTH_SUCCESS") {
    closeSpotifyAuthModal();
    showToast("🎉 Spotify Account connected successfully!", "success", 4000);
    checkSpotifyAuth(true);
    switchNavTab("library");
  }
}

async function handleManualTokenSubmit() {
  const token = elements.inputManualToken ? elements.inputManualToken.value.trim() : "";
  if (!token) {
    showToast("Please enter an access token or raw curl token", "error");
    return;
  }
  if (elements.btnSubmitManualToken) {
    elements.btnSubmitManualToken.disabled = true;
    elements.btnSubmitManualToken.textContent = "Connecting...";
  }
  try {
    const res = await fetch("/api/spotify/auth/manual", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_token: token }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || "Authentication failed with provided token");
    }
    if (elements.inputManualToken) elements.inputManualToken.value = "";
    closeSpotifyAuthModal();
    showToast(`🎉 Connected as ${data.user.display_name}!`, "success", 4000);
    checkSpotifyAuth(true);
    switchNavTab("library");
  } catch (err) {
    showToast("Failed to link token: " + err.message, "error", 5000);
  } finally {
    if (elements.btnSubmitManualToken) {
      elements.btnSubmitManualToken.disabled = false;
      elements.btnSubmitManualToken.textContent = "Connect";
    }
  }
}

async function handleAutoGrab() {
  if (elements.btnAutoGrab) {
    elements.btnAutoGrab.disabled = true;
    elements.btnAutoGrab.innerHTML = '<div class="spinner-small" style="display:inline-block; margin-right:8px; border-top-color:#000;"></div> <span>Grabbing session...</span>';
  }
  const statusEl = elements.autoGrabStatus;
  if (statusEl) {
    statusEl.className = 'auth-status-msg loading';
    statusEl.innerHTML = '<div class="spinner-small"></div> <span>Scanning browsers for Spotify session...</span>';
    statusEl.classList.remove('hidden');
  }

  try {
    const res = await fetch("/api/spotify/auth/auto_grab", { method: "POST" });
    const data = await res.json();
    
    if (data.success && data.user) {
      if (statusEl) {
        statusEl.className = 'auth-status-msg success';
        statusEl.textContent = `Found session in ${data.source}! Connected as ${data.user.display_name}.`;
      }
      setTimeout(() => {
        closeSpotifyAuthModal();
        showToast(`🎉 Connected as ${data.user.display_name} via ${data.source}!`, "success", 4000);
        checkSpotifyAuth(true);
        switchNavTab("library");
      }, 1500);
    } else {
      throw new Error(data.error || "Could not find a valid session");
    }
  } catch (err) {
    if (statusEl) {
      statusEl.className = 'auth-status-msg error';
      statusEl.textContent = "Auto-connect failed: " + err.message;
    }
  } finally {
    if (elements.btnAutoGrab) {
      elements.btnAutoGrab.disabled = false;
      elements.btnAutoGrab.innerHTML = '<i data-lucide="zap"></i> <span>⚡ 1-Click Auto Connect</span>';
      if (window.lucide) window.lucide.createIcons();
    }
  }
}

async function handleSpDcSubmit() {
  const cookieVal = elements.inputSpDcCookie ? elements.inputSpDcCookie.value.trim() : "";
  if (!cookieVal || cookieVal.length < 20) {
    showToast("Please enter a valid sp_dc cookie (starts with AQ...)", "warning", 4000);
    return;
  }
  if (elements.btnSubmitSpDc) {
    elements.btnSubmitSpDc.disabled = true;
    elements.btnSubmitSpDc.textContent = "Connecting...";
  }
  try {
    const res = await fetch("/api/spotify/auth/cookie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sp_dc: cookieVal }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || "Authentication failed with provided cookie");
    }
    if (elements.inputSpDcCookie) elements.inputSpDcCookie.value = "";
    closeSpotifyAuthModal();
    showToast(`🎉 Connected successfully as ${data.user.display_name}!`, "success", 4000);
    checkSpotifyAuth(true);
    switchNavTab("library");
  } catch (err) {
    showToast("Failed to link cookie: " + err.message, "error", 5000);
  } finally {
    if (elements.btnSubmitSpDc) {
      elements.btnSubmitSpDc.disabled = false;
      elements.btnSubmitSpDc.textContent = "Connect";
    }
  }
}

async function handleSpotifyLogout() {
  try {
    await fetch("/api/spotify/auth/logout", { method: "POST" });
    state.auth.isAuthenticated = false;
    state.auth.user = null;
    state.auth.playlists = [];
    state.auth.likedSongsData = null;

    updateAuthUI(false, null);
    showToast("Logged out of Spotify", "info");
  } catch (err) {
    showToast("Logout error: " + err.message, "error");
  }
}

async function checkSpotifyAuth(forceRefresh = false) {
  if (isWebDemo) return;
  try {
    const res = await fetch("/api/spotify/auth/status");
    const data = await res.json();
    if (data.authenticated && data.user) {
      state.auth.isAuthenticated = true;
      state.auth.user = data.user;
      updateAuthUI(true, data.user);
      loadUserPlaylists(forceRefresh);
      loadLikedSongsCount();
    } else {
      state.auth.isAuthenticated = false;
      state.auth.user = null;
      updateAuthUI(false, null);
    }
  } catch (err) {
    console.error("Failed checking Spotify auth status:", err);
  }
}

function updateAuthUI(isAuthenticated, user) {
  if (isAuthenticated && user) {
    if (elements.btnSpotifyAccount) {
      elements.btnSpotifyAccount.classList.add("logged-in");
    }
    if (elements.spotifyUserName) {
      elements.spotifyUserName.textContent = user.display_name || "Spotify User";
    }
    if (elements.spotifyNavAvatar) {
      if (user.avatar_url) {
        elements.spotifyNavAvatar.innerHTML = `<img src="${escapeHtml(user.avatar_url)}" class="spotify-pill-img" alt="" />`;
      } else {
        elements.spotifyNavAvatar.innerHTML = `<i data-lucide="user-check"></i>`;
      }
    }

    if (elements.libraryLoggedOut) elements.libraryLoggedOut.classList.add("hidden");
    if (elements.libraryLoggedIn) elements.libraryLoggedIn.classList.remove("hidden");

    if (user.avatar_url && elements.userAvatar) {
      elements.userAvatar.src = user.avatar_url;
    }
    if (elements.userDisplayName) elements.userDisplayName.textContent = user.display_name;
    if (elements.userEmail) elements.userEmail.textContent = user.email || "";
    if (elements.userProduct) {
      elements.userProduct.textContent = (user.product || "free").toUpperCase();
    }
    if (elements.userFollowers) {
      elements.userFollowers.textContent = `${user.followers ? user.followers.toLocaleString() : 0} followers`;
    }
    if (elements.libraryStatusBadge) {
      elements.libraryStatusBadge.textContent = "CONNECTED";
      elements.libraryStatusBadge.className = "library-badge badge-connected";
    }
  } else {
    if (elements.btnSpotifyAccount) {
      elements.btnSpotifyAccount.classList.remove("logged-in");
    }
    if (elements.spotifyUserName) {
      elements.spotifyUserName.textContent = "Connect Spotify";
    }
    if (elements.spotifyNavAvatar) {
      elements.spotifyNavAvatar.innerHTML = `<i data-lucide="user"></i>`;
    }

    if (elements.libraryLoggedIn) elements.libraryLoggedIn.classList.add("hidden");
    if (elements.libraryLoggedOut) elements.libraryLoggedOut.classList.remove("hidden");

    if (elements.libraryStatusBadge) {
      elements.libraryStatusBadge.textContent = "DISCONNECTED";
      elements.libraryStatusBadge.className = "library-badge badge-disconnected";
    }
  }
  if (window.lucide) window.lucide.createIcons();
}

async function loadUserPlaylists(forceRefresh = false) {
  if (!elements.libraryPlaylistsGrid) return;
  elements.libraryPlaylistsGrid.innerHTML = `
    <div class="library-loading">
      <div class="spinner"></div>
      <p>Loading your Spotify playlists...</p>
    </div>
  `;
  try {
    const res = await fetch(`/api/spotify/me/playlists?limit=50${forceRefresh ? '&refresh=1' : ''}`);
    const data = await res.json();
    if (data.quota_exceeded) {
      elements.libraryPlaylistsGrid.innerHTML = `
        <div class="library-error" style="background: rgba(255, 170, 0, 0.08); border: 1px solid rgba(255, 170, 0, 0.25); padding: 28px; border-radius: 14px; text-align: center; max-width: 580px; margin: 20px auto;">
          <div style="font-size: 2rem; margin-bottom: 8px;">⚡</div>
          <h3 style="color: #ffb830; margin: 0 0 8px; font-size: 1.15rem;">Spotify Shared Rate Limit Reached</h3>
          <p style="color: #b3b3b3; margin: 0 0 18px; font-size: 0.88rem; line-height: 1.5;">
            Spotify's shared public app reached its daily quota limit for automatic playlist listing.<br>
            <strong>You can still download any playlist right now:</strong> Simply copy the link to any playlist from Spotify and paste it into the search box at the top!
          </p>
          <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
            <button class="btn btn-primary" style="padding: 8px 20px;" onclick="switchNavTab('search'); if(elements.playlistUrlInput) elements.playlistUrlInput.focus();">
              <i data-lucide="search"></i> Paste Playlist URL (No Login Needed)
            </button>
            <button class="btn btn-secondary" style="padding: 8px 20px;" onclick="openSpotifyAuthModal();">
              <i data-lucide="key"></i> Connect Custom Developer App
            </button>
          </div>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }
    if (!res.ok) throw new Error(data.detail || "Could not load playlists");
    state.auth.playlists = data.playlists || data.items || [];
    if (elements.libraryPlaylistsCount) {
      elements.libraryPlaylistsCount.textContent = state.auth.playlists.length;
    }
    renderUserPlaylists(state.auth.playlists);
  } catch (err) {
    elements.libraryPlaylistsGrid.innerHTML = `
      <div class="library-error">
        <p>Failed to load playlists: ${escapeHtml(err.message)}</p>
        <button class="btn btn-secondary btn-sm" onclick="loadUserPlaylists(true)">Retry</button>
      </div>
    `;
  }
}

async function loadLikedSongsCount() {
  try {
    const res = await fetch("/api/spotify/me/saved-tracks?limit=1");
    if (res.ok) {
      const data = await res.json();
      if (elements.likedCountText) {
        elements.likedCountText.textContent = `${(data.total_tracks || 0).toLocaleString()} tracks saved`;
      }
    }
  } catch (_) {}
}

function filterUserPlaylists() {
  const query = (elements.libraryFilterInput ? elements.libraryFilterInput.value : "").trim().toLowerCase();
  if (!query) {
    renderUserPlaylists(state.auth.playlists);
    return;
  }
  const filtered = state.auth.playlists.filter(
    (p) =>
      (p.title && p.title.toLowerCase().includes(query)) ||
      (p.name && p.name.toLowerCase().includes(query)) ||
      (p.owner && p.owner.toLowerCase().includes(query))
  );
  renderUserPlaylists(filtered);
}

function renderUserPlaylists(playlists) {
  if (!elements.libraryPlaylistsGrid) return;
  if (!playlists || playlists.length === 0) {
    elements.libraryPlaylistsGrid.innerHTML = `
      <div class="library-empty">
        <i data-lucide="music"></i>
        <p>No playlists found.</p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  let html = "";
  playlists.forEach((pl) => {
    const cover = pl.cover_url || "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A311FFE/image-size/large?v=v2&px=999";
    const plTitle = pl.title || pl.name || "Untitled Playlist";
    const plUrl = pl.url || pl.spotify_url || `https://open.spotify.com/playlist/${pl.id}`;

    html += `
      <div class="library-card" data-id="${pl.id}" data-url="${escapeHtml(plUrl)}">
        <div class="library-card-cover-wrap">
          <img src="${escapeHtml(cover)}" class="library-card-cover" alt="" loading="lazy" />
          <button class="library-card-play-btn btn-dl-quick" data-id="${pl.id}" data-url="${escapeHtml(plUrl)}" title="1-Click Download Entire Playlist">
            <i data-lucide="download"></i>
          </button>
        </div>
        <div class="library-card-info">
          <span class="library-card-title" title="${escapeHtml(plTitle)}">${escapeHtml(plTitle)}</span>
          <span class="library-card-meta">${pl.total_tracks} tracks • ${escapeHtml(pl.owner)}</span>
        </div>
        <div class="library-card-actions">
          <button class="btn btn-secondary btn-sm btn-view-pl" data-id="${pl.id}" data-url="${escapeHtml(plUrl)}">
            <i data-lucide="list-music"></i> View
          </button>
          <button class="btn btn-primary btn-sm btn-dl-pl" data-id="${pl.id}" data-url="${escapeHtml(plUrl)}">
            <i data-lucide="download"></i> Download
          </button>
        </div>
      </div>
    `;
  });

  elements.libraryPlaylistsGrid.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();

  // Attach interactive click handlers
  elements.libraryPlaylistsGrid.querySelectorAll(".library-card").forEach((card) => {
    const url = card.getAttribute("data-url");
    const plObj = playlists.find((p) => (p.url === url || p.spotify_url === url));

    // Clicking anywhere on card (except buttons) views the playlist
    card.addEventListener("click", (e) => {
      if (e.target.closest("button")) return;
      if (plObj) loadLibraryPlaylist(plObj, false);
    });

    const btnView = card.querySelector(".btn-view-pl");
    if (btnView) {
      btnView.addEventListener("click", (e) => {
        e.stopPropagation();
        if (plObj) loadLibraryPlaylist(plObj, false);
      });
    }

    const btnDl = card.querySelector(".btn-dl-pl");
    if (btnDl) {
      btnDl.addEventListener("click", (e) => {
        e.stopPropagation();
        if (plObj) loadLibraryPlaylist(plObj, true);
      });
    }

    const btnDlQuick = card.querySelector(".btn-dl-quick");
    if (btnDlQuick) {
      btnDlQuick.addEventListener("click", (e) => {
        e.stopPropagation();
        if (plObj) loadLibraryPlaylist(plObj, true);
      });
    }
  });
}

async function loadLibraryPlaylist(playlist, autoDownload = false) {
  const plUrl = playlist.url || playlist.spotify_url || `https://open.spotify.com/playlist/${playlist.id}`;
  switchNavTab("search");
  elements.playlistUrlInput.value = plUrl;
  elements.btnClearUrl.classList.remove("hidden");
  if (elements.btnPasteClipboard) elements.btnPasteClipboard.classList.add("hidden");

  const data = await fetchPlaylistData(plUrl);
  if (data && autoDownload) {
    setAllTracksSelection(true);
    setTimeout(() => {
      startDownloadProcess();
    }, 400);
  }
}

async function downloadLikedSongs(autoDownload = false) {
  setLoadingState(true);
  try {
    showToast("Fetching your Spotify Liked Songs...", "info");
    const res = await fetch("/api/spotify/me/saved-tracks?limit=100");
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Failed to load Liked Songs");
    }
    const data = await res.json();
    if (!data.tracks || data.tracks.length === 0) {
      showToast("No saved tracks found in your Liked Songs", "info");
      return;
    }
    state.currentPlaylist = data;
    switchNavTab("search");
    renderPlaylistView(data);
    showToast(`Loaded ${data.tracks.length} Liked Songs!`, "success");
    if (autoDownload) {
      setAllTracksSelection(true);
      setTimeout(() => {
        startDownloadProcess();
      }, 400);
    }
  } catch (err) {
    showToast("Error loading Liked Songs: " + err.message, "error", 5000);
  } finally {
    setLoadingState(false);
  }
}

// Debounce Helper
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function sanitizeFilename(name) {
  return String(name || "track").replace(/[<>:"/\\|?*]/g, "_").trim();
}

// ==========================================
// Synced Lyrics & Karaoke Controllers
// ==========================================

function toggleLyricsDrawer() {
  if (!elements.lyricsDrawer) return;
  const isHidden = elements.lyricsDrawer.classList.contains("hidden");
  if (isHidden) {
    elements.lyricsDrawer.classList.remove("hidden");
    state.lyrics.isOpen = true;
    if (state.currentlyPlayingId && (!state.lyrics.track || state.lyrics.track.id !== state.currentlyPlayingId)) {
      const track = state.currentPlaylist && state.currentPlaylist.tracks
        ? state.currentPlaylist.tracks.find((t) => t.id === state.currentlyPlayingId)
        : null;
      if (track) {
        const isLocal = state.isPlayingHQ;
        const localPath = isLocal ? state.downloadedFilesMap.get(track.id) : null;
        loadAndShowLyrics(track, isLocal, localPath);
      }
    }
  } else {
    closeLyricsDrawer();
  }
}

function closeLyricsDrawer() {
  if (elements.lyricsDrawer) {
    elements.lyricsDrawer.classList.add("hidden");
    state.lyrics.isOpen = false;
  }
}

async function loadAndShowLyrics(track, isLocal = false, localPath = null) {
  if (!track) return;
  state.lyrics.track = track;
  state.lyrics.lines = [];
  state.lyrics.currentLineIndex = -1;

  if (elements.lyricsTrackTitle) elements.lyricsTrackTitle.textContent = track.title;
  if (elements.lyricsTrackArtist) elements.lyricsTrackArtist.textContent = track.artists;
  if (elements.lyricsSourceBadge) {
    elements.lyricsSourceBadge.textContent = "SEARCHING";
    elements.lyricsSourceBadge.className = "badge-status searching";
  }

  if (elements.lyricsLinesContainer) {
    elements.lyricsLinesContainer.innerHTML = `
      <div class="lyrics-loading-state">
        <div class="spinner"></div>
        <p>Fetching synced lyrics...</p>
      </div>
    `;
  }

  try {
    let res;
    if (isLocal && localPath) {
      res = await fetch(`/api/lyrics/local?path=${encodeURIComponent(localPath)}`);
    } else {
      const durSec = track.duration_ms ? Math.round(track.duration_ms / 1000) : 0;
      res = await fetch(`/api/lyrics/get?title=${encodeURIComponent(track.title)}&artist=${encodeURIComponent(track.artists)}&album=${encodeURIComponent(track.album || "")}&duration=${durSec}`);
    }

    if (!res.ok) throw new Error("Lyrics unavailable");
    const data = await res.json();

    if (data.found && data.lines && data.lines.length > 0) {
      state.lyrics.lines = data.lines;
      if (elements.lyricsSourceBadge) {
        elements.lyricsSourceBadge.textContent = data.has_synced ? "SYNCED LRC" : "PLAIN TEXT";
        elements.lyricsSourceBadge.className = "badge-status completed";
      }
      renderLyricsLines(data.lines);
    } else if (data.found && data.plain_lyrics) {
      const plainLines = data.plain_lyrics.split("\n").filter(l => l.trim()).map((text, idx) => ({ time: idx * 5, text }));
      state.lyrics.lines = plainLines;
      if (elements.lyricsSourceBadge) {
        elements.lyricsSourceBadge.textContent = "PLAIN TEXT";
        elements.lyricsSourceBadge.className = "badge-status queued";
      }
      renderLyricsLines(plainLines);
    } else {
      if (elements.lyricsSourceBadge) {
        elements.lyricsSourceBadge.textContent = "NO LYRICS";
        elements.lyricsSourceBadge.className = "badge-status failed";
      }
      if (elements.lyricsLinesContainer) {
        elements.lyricsLinesContainer.innerHTML = `
          <div class="lyrics-empty-state">
            <i data-lucide="mic-off"></i>
            <p>No synchronized lyrics found for this track</p>
          </div>
        `;
        if (window.lucide) window.lucide.createIcons();
      }
    }
  } catch (err) {
    if (elements.lyricsLinesContainer) {
      elements.lyricsLinesContainer.innerHTML = `
        <div class="lyrics-empty-state">
          <i data-lucide="music-2"></i>
          <p>Lyrics could not be loaded</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
    }
  }
}

function renderLyricsLines(lines) {
  if (!elements.lyricsLinesContainer) return;
  const fragment = document.createDocumentFragment();

  lines.forEach((line, index) => {
    const p = document.createElement("p");
    p.className = "lyrics-line";
    p.setAttribute("data-index", index);
    p.setAttribute("data-time", line.time);
    p.textContent = line.text || "♪ ♪ ♪";
    p.addEventListener("click", () => {
      if (elements.previewPlayer) {
        elements.previewPlayer.currentTime = line.time;
        elements.previewPlayer.play().catch(() => {});
      }
    });
    fragment.appendChild(p);
  });

  elements.lyricsLinesContainer.innerHTML = "";
  elements.lyricsLinesContainer.appendChild(fragment);
}

function updateLyricsTime(currentTime) {
  if (!state.lyrics.lines || state.lyrics.lines.length === 0) return;

  let activeIndex = -1;
  for (let i = 0; i < state.lyrics.lines.length; i++) {
    if (currentTime >= state.lyrics.lines[i].time) {
      activeIndex = i;
    } else {
      break;
    }
  }

  if (activeIndex !== state.lyrics.currentLineIndex && activeIndex !== -1) {
    state.lyrics.currentLineIndex = activeIndex;
    const allLines = elements.lyricsLinesContainer ? elements.lyricsLinesContainer.querySelectorAll(".lyrics-line") : [];

    allLines.forEach((el, idx) => {
      if (idx === activeIndex) {
        el.className = "lyrics-line active";
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (idx < activeIndex) {
        el.className = "lyrics-line passed";
      } else {
        el.className = "lyrics-line";
      }
    });
  }
}

// ==========================================
// Mobile Transfer & QR Controllers
// ==========================================

async function openMobileTransferModal() {
  if (!elements.mobileTransferModal) return;
  elements.mobileTransferModal.classList.remove("hidden");

  try {
    if (!state.networkInfo) {
      const res = await fetch("/api/system/network-info");
      if (res.ok) {
        state.networkInfo = await res.json();
      }
    }
    renderQrCodeDisplay();
  } catch (err) {
    showToast("Error resolving local network IP", "error");
  }
}

function closeMobileTransferModal() {
  if (elements.mobileTransferModal) {
    elements.mobileTransferModal.classList.add("hidden");
  }
}

function switchQrMode(mode) {
  state.activeQrMode = mode;
  if (elements.tabQrLan) elements.tabQrLan.classList.toggle("active", mode === "lan");
  if (elements.tabQrTunnel) elements.tabQrTunnel.classList.toggle("active", mode === "tunnel");
  renderQrCodeDisplay();
}

function renderQrCodeDisplay() {
  if (!state.networkInfo) return;
  const isTunnel = state.activeQrMode === "tunnel";
  let targetUrl = state.networkInfo.mobile_lan_url || `http://${state.networkInfo.lan_ip || "127.0.0.1"}:8800/mobile`;

  if (isTunnel) {
    if (state.networkInfo.mobile_tunnel_url) {
      targetUrl = state.networkInfo.mobile_tunnel_url;
    } else {
      showToast("Cloudflare Tunnel is not active; using Local Wi-Fi URL", "info", 3000);
      state.activeQrMode = "lan";
      if (elements.tabQrLan) elements.tabQrLan.classList.add("active");
      if (elements.tabQrTunnel) elements.tabQrTunnel.classList.remove("active");
    }
  }

  if (elements.mobileTransferUrl) {
    elements.mobileTransferUrl.value = targetUrl;
  }

  if (elements.qrCodeWrapper) {
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(targetUrl)}&bgcolor=ffffff&color=000000&margin=0`;
    elements.qrCodeWrapper.innerHTML = `
      <img src="${qrApiUrl}" alt="Scan QR Code" width="160" height="160" style="display:block; border-radius: 4px;" onerror="this.parentElement.innerHTML='<p style=\\'color:#000;font-size:0.8rem;text-align:center;\\'>QR Code</p>'" />
    `;
  }
}

async function copyMobileTransferUrl() {
  if (!elements.mobileTransferUrl || !elements.mobileTransferUrl.value) return;
  try {
    await navigator.clipboard.writeText(elements.mobileTransferUrl.value);
    showToast("Mobile link copied to clipboard!", "success", 2000);
  } catch (e) {
    elements.mobileTransferUrl.select();
    document.execCommand("copy");
    showToast("Mobile link copied to clipboard!", "success", 2000);
  }
}
