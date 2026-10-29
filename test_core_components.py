"""
Core Components & API Verification Test Suite for My-Music
Tests:
1. Platform detection (Spotify, YouTube, YouTube Music, JioSaavn, Amazon Music)
2. Duration formatting (null/zero fallback, seconds, minutes, hours formatting)
3. LRU In-memory metadata caching (store, retrieve, cache-hit speed)
4. FastAPI endpoints returning HTTP 200 (system info, download status, spotify auth status, web UI)
"""

import sys
import os
import time
import requests

# Ensure project root is in sys.path
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, PROJECT_ROOT)

from backend.universal_meta import (
    detect_platform,
    get_cached_metadata,
    set_cached_metadata,
)
from backend.spotify_meta import format_duration


def test_platform_detection():
    print("\n--- [1/4] Testing Platform Detection ---")
    test_cases = [
        ("https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M", "spotify"),
        ("https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT", "spotify"),
        ("spotify:track:4cOdK2wGLETKBW3PvgPWqT", "spotify"),
        ("https://www.youtube.com/watch?v=kJQP7kiw5Fk", "youtube"),
        ("https://youtu.be/kJQP7kiw5Fk", "youtube"),
        ("https://music.youtube.com/watch?v=kJQP7kiw5Fk", "youtube_music"),
        ("https://www.jiosaavn.com/album/kesariya-lofi-flip/Oi120RPXw-E_", "jiosaavn"),
        ("https://www.jiosaavn.com/song/kesariya/Bw8TeBJeB1A", "jiosaavn"),
        ("https://music.amazon.com/albums/B09XYZ123", "amazon"),
        ("https://music.amazon.in/playlists/B08ABC987", "amazon"),
    ]

    passed = 0
    for url, expected in test_cases:
        detected = detect_platform(url)
        assert detected == expected, f"Failed for {url}: expected '{expected}', got '{detected}'"
        print(f"  [PASS] {expected.upper():<14} -> {url[:60]}")
        passed += 1

    print(f"Result: {passed}/{len(test_cases)} platform detection tests passed.")


def test_duration_formatting():
    print("\n--- [2/4] Testing Duration Formatting ---")
    test_cases = [
        (None, "--:--"),
        (0, "--:--"),
        (45000, "0:45"),
        (125000, "2:05"),
        (3599000, "59:59"),
        (3665000, "1:01:05"),
        (7325000, "2:02:05"),
    ]

    passed = 0
    for ms, expected in test_cases:
        formatted = format_duration(ms)
        assert formatted == expected, f"Failed for {ms}ms: expected '{expected}', got '{formatted}'"
        print(f"  [PASS] {str(ms):>10} ms -> '{formatted}'")
        passed += 1

    print(f"Result: {passed}/{len(test_cases)} duration formatting tests passed.")


def test_metadata_cache():
    print("\n--- [3/4] Testing In-Memory LRU Metadata Cache ---")
    test_key = "test_cache_song_key_123"
    mock_payload = {
        "title": "Starboy",
        "artist": "The Weeknd",
        "platform_badge": "Spotify",
        "tracks": [{"title": "Starboy", "duration_ms": 230000}],
    }

    # Verify initial empty/miss
    assert get_cached_metadata(test_key) is None, "Cache should be empty for new key"
    print("  [PASS] Cache miss handled correctly for new key")

    # Store entry
    set_cached_metadata(test_key, mock_payload)
    print("  [PASS] Stored mock metadata in cache")

    # Fast retrieval benchmark
    start_time = time.perf_counter()
    retrieved = get_cached_metadata(test_key)
    lookup_time_ms = (time.perf_counter() - start_time) * 1000

    assert retrieved is not None, "Failed to retrieve stored item from cache"
    assert retrieved["title"] == "Starboy", "Cache payload corrupted"
    assert retrieved["platform_badge"] == "Spotify"
    print(f"  [PASS] Cache hit validated: '{retrieved['title']}' retrieved in {lookup_time_ms:.4f} ms")


def test_fastapi_endpoints():
    print("\n--- [4/4] Testing FastAPI Endpoints (HTTP 200) ---")
    base_url = "http://127.0.0.1:8800"

    # Start in-process uvicorn server if port 8800 is not already responding
    server = None
    try:
        requests.get(f"{base_url}/api/system/info", timeout=1)
    except Exception:
        import uvicorn, threading
        from backend.main import app
        config = uvicorn.Config(app, host="127.0.0.1", port=8800, log_level="error")
        server = uvicorn.Server(config)
        t = threading.Thread(target=server.run, daemon=True)
        t.start()
        for _ in range(20):
            time.sleep(0.1)
            try:
                if requests.get(f"{base_url}/api/system/info", timeout=1).status_code == 200:
                    break
            except Exception:
                pass

    endpoints = [
        ("/", "Frontend Web Dashboard"),
        ("/api/system/info", "System Status & Environment Info"),
        ("/api/download/status", "Live Download Job Status"),
        ("/api/spotify/auth/status", "Spotify Authentication Status"),
        ("/static/style.css", "Static Stylesheet"),
        ("/static/app.js", "Static Application Frontend JavaScript"),
    ]

    passed = 0
    try:
        for path, desc in endpoints:
            url = f"{base_url}{path}"
            resp = requests.get(url, timeout=5)
            assert resp.status_code == 200, f"Endpoint {path} failed with HTTP {resp.status_code}"
            print(f"  [PASS] HTTP 200 OK -> {path:<26} ({desc})")
            passed += 1
    finally:
        if server:
            server.should_exit = True

    print(f"Result: {passed}/{len(endpoints)} endpoint tests passed with HTTP 200.")


def main():
    print("=" * 65)
    print("  My-Music Core Test Suite: Platforms, Duration, Cache & APIs")
    print("=" * 65)

    test_platform_detection()
    test_duration_formatting()
    test_metadata_cache()
    test_fastapi_endpoints()

    print("\n" + "=" * 65)
    print("  [SUCCESS] ALL TEST SUITES PASSED CLEANLY (100% SUCCESS RATE)")
    print("=" * 65)


if __name__ == "__main__":
    main()
