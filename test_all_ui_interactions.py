import os
import sys
import time
import json
import asyncio
import subprocess
import urllib.request
import http.server
import socketserver
import threading
import websockets

REPO_DIR = r"C:\Users\saipa\.gemini\antigravity\scratch\spotify-downloader"
docs_dir = os.path.join(REPO_DIR, "docs")
port = 8899

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=docs_dir, **kwargs)
    def log_message(self, format, *args):
        pass

server = socketserver.TCPServer(("127.0.0.1", port), Handler)
thread = threading.Thread(target=server.serve_forever, daemon=True)
thread.start()
time.sleep(0.5)

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
if not os.path.exists(chrome_path):
    chrome_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

debug_port = 9899
proc = subprocess.Popen([
    chrome_path,
    "--headless=new",
    f"--remote-debugging-port={debug_port}",
    "--disable-gpu",
    "--no-sandbox",
    f"http://127.0.0.1:{port}/"
], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

time.sleep(2.5)

async def test_full_ui_interactions():
    req = urllib.request.urlopen(f"http://127.0.0.1:{debug_port}/json")
    targets = json.loads(req.read().decode())
    target = next((t for t in targets if "8899" in t.get("url", "")), targets[0])
    ws_url = target["webSocketDebuggerUrl"]
    print("Attached to Chrome target:", target["title"])

    console_errors = []

    async with websockets.connect(ws_url) as ws:
        # Enable domains
        await ws.send(json.dumps({"id": 1, "method": "Runtime.enable"}))
        await ws.send(json.dumps({"id": 2, "method": "Log.enable"}))
        await ws.send(json.dumps({"id": 3, "method": "Console.enable"}))

        # Comprehensive in-browser interaction suite
        eval_script = """
        (async () => {
          const errors = [];
          const logErr = (err) => errors.push(String(err));
          window.addEventListener('error', (e) => logErr(e.message));
          window.addEventListener('unhandledrejection', (e) => logErr(e.reason));

          try {
            // 1. Test Quality Pills
            const pills = document.querySelectorAll('.pill-btn');
            pills.forEach(p => p.click());

            // 2. Test Selection Controls
            const btnSelAll = document.getElementById('btn-select-all');
            if (btnSelAll) btnSelAll.click();
            const btnDeselAll = document.getElementById('btn-deselect-all');
            if (btnDeselAll) btnDeselAll.click();
            const btnInvert = document.getElementById('btn-invert-select');
            if (btnInvert) btnInvert.click();

            // 3. Test Filter Chips
            const chips = document.querySelectorAll('.filter-chip');
            chips.forEach(c => c.click());
            const allChip = document.querySelector('.filter-chip[data-filter="all"]');
            if (allChip) allChip.click();

            // 4. Test In-Playlist Filter Input
            const filterInput = document.getElementById('track-filter-input');
            if (filterInput) {
              filterInput.value = 'blinding';
              filterInput.dispatchEvent(new Event('input'));
              const btnClearFilter = document.getElementById('btn-clear-filter');
              if (btnClearFilter) btnClearFilter.click();
            }

            // 5. Test Table Column Sorting Headers
            const thTitle = document.getElementById('th-sort-title');
            if (thTitle) { thTitle.click(); thTitle.click(); }
            const thAlbum = document.getElementById('th-sort-album');
            if (thAlbum) { thAlbum.click(); thAlbum.click(); }
            const thDur = document.getElementById('th-sort-dur');
            if (thDur) { thDur.click(); thDur.click(); }

            // 6. Test Modals: Shortcuts Modal
            const btnShortcuts = document.getElementById('btn-shortcuts-toggle');
            if (btnShortcuts) btnShortcuts.click();
            const btnCloseShortcuts = document.getElementById('btn-close-shortcuts-modal');
            if (btnCloseShortcuts) btnCloseShortcuts.click();

            // 7. Test Modals: Settings Panel
            const btnSettings = document.getElementById('btn-settings-toggle');
            if (btnSettings) btnSettings.click();
            const btnCloseSettings = document.getElementById('btn-close-settings');
            if (btnCloseSettings) btnCloseSettings.click();

            // 8. Test Modals: Mobile Transfer
            const btnMobile = document.getElementById('btn-mobile-transfer');
            if (btnMobile) btnMobile.click();
            const btnCloseMobile = document.getElementById('btn-close-mobile-modal');
            if (btnCloseMobile) btnCloseMobile.click();

            // 9. Test Mini Player Audio Controls
            const firstPlayBtn = document.querySelector('.btn-preview-play');
            if (firstPlayBtn) firstPlayBtn.click();
            const mpPlay = document.getElementById('mp-btn-play');
            if (mpPlay) { mpPlay.click(); mpPlay.click(); }
            const mpMute = document.getElementById('mp-btn-mute');
            if (mpMute) { mpMute.click(); mpMute.click(); }
            const mpLyrics = document.getElementById('mp-btn-lyrics');
            if (mpLyrics) mpLyrics.click();
            const btnCloseLyrics = document.getElementById('btn-close-lyrics');
            if (btnCloseLyrics) btnCloseLyrics.click();

            // 10. Test Keyboard Accelerators
            window.dispatchEvent(new KeyboardEvent('keydown', { key: '?' }));
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'm' }));
            window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));

            // 11. Test Quick Sample Buttons
            const chipButtons = document.querySelectorAll('.btn-chip');
            if (chipButtons.length > 0) chipButtons[0].click();

          } catch (e) {
            logErr(e.stack || e.message);
          }

          return { errors, passed: errors.length === 0 };
        })()
        """

        await ws.send(json.dumps({
            "id": 100,
            "method": "Runtime.evaluate",
            "params": {"expression": eval_script, "awaitPromise": True, "returnByValue": True}
        }))

        while True:
            resp = await ws.recv()
            data = json.loads(resp)
            if data.get("method") == "Console.messageAdded":
                msg = data.get("params", {}).get("message", {})
                if msg.get("level") == "error":
                    console_errors.append(msg.get("text"))
            if data.get("id") == 100:
                res_val = data.get("result", {}).get("result", {}).get("value", {})
                print("\nBrowser Interactive Evaluation Result:")
                print(f"  Passed cleanly? {res_val.get('passed')}")
                if res_val.get("errors"):
                    print("  In-browser caught errors:", res_val.get("errors"))
                break

    if console_errors:
        print("\nConsole Error Logs captured during interactions:")
        for ce in console_errors:
            print("  [ERROR]", ce)
    else:
        print("\nZero console errors captured across all interactive elements!")

try:
    asyncio.run(test_full_ui_interactions())
finally:
    proc.terminate()
    server.shutdown()
