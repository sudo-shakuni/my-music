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
DOCS_DIR = os.path.join(REPO_DIR, "docs")
PORT = 8899

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DOCS_DIR, **kwargs)
    def log_message(self, format, *args):
        pass

server = socketserver.TCPServer(("127.0.0.1", PORT), Handler)
srv_thread = threading.Thread(target=server.serve_forever, daemon=True)
srv_thread.start()
time.sleep(0.5)

user_data = os.path.join(REPO_DIR, ".chrome_test_profile_2")
chrome_cmd = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "--headless=new",
    "--remote-debugging-port=9224",
    f"--user-data-dir={user_data}",
    "--no-first-run",
    "--no-default-browser-check",
    f"http://127.0.0.1:{PORT}/index.html"
]

proc = subprocess.Popen(chrome_cmd)
time.sleep(2)

async def main():
    try:
        targets_req = urllib.request.urlopen("http://127.0.0.1:9224/json")
        targets = json.loads(targets_req.read().decode("utf-8"))
        page_target = next(t for t in targets if t.get("type") == "page")
        ws_url = page_target["webSocketDebuggerUrl"]

        async with websockets.connect(ws_url, max_size=20*1024*1024) as ws:
            msg_id = 0
            async def send_cdp(method, params=None):
                nonlocal msg_id
                msg_id += 1
                payload = {"id": msg_id, "method": method, "params": params or {}}
                await ws.send(json.dumps(payload))
                while True:
                    resp = json.loads(await ws.recv())
                    if resp.get("id") == msg_id:
                        return resp.get("result", {})

            await send_cdp("Runtime.enable")
            await send_cdp("Console.enable")

            # Let page load completely
            await asyncio.sleep(1.0)

            # Test exact link from user's screenshot
            test_url = "https://open.spotify.com/playlist/37i9dQZEVXbMWDif5SCB"
            eval_script = f"""
            (async () => {{
              const input = document.getElementById("playlist-url");
              input.value = "{test_url}";
              const form = document.getElementById("fetch-form");
              form.requestSubmit();

              // Wait up to 3.5 seconds for async resolution & render
              for (let i = 0; i < 35; i++) {{
                await new Promise(r => setTimeout(r, 100));
                const plSection = document.getElementById("playlist-section");
                const btnFetch = document.getElementById("btn-fetch");
                if (btnFetch && !btnFetch.disabled && plSection && !plSection.classList.contains("hidden")) {{
                  break;
                }}
              }}

              const btnFetch = document.getElementById("btn-fetch");
              const btnText = btnFetch.querySelector(".btn-text")?.textContent || "";
              const isFetchDisabled = btnFetch.disabled;
              const skeleton = document.getElementById("skeleton-section");
              const isSkeletonHidden = skeleton.classList.contains("hidden");
              const plSection = document.getElementById("playlist-section");
              const isPlSectionVisible = !plSection.classList.contains("hidden");
              const plTitle = document.getElementById("pl-title")?.textContent || "";
              const trackRows = document.querySelectorAll(".track-row").length;

              return {{
                btnText,
                isFetchDisabled,
                isSkeletonHidden,
                isPlSectionVisible,
                plTitle,
                trackRows
              }};
            }})();
            """

            res = await send_cdp("Runtime.evaluate", {
                "expression": eval_script,
                "awaitPromise": True,
                "returnByValue": True
            })

            result_val = res.get("result", {}).get("value", {})
            print("Chrome Live Evaluation Result:")
            print(json.dumps(result_val, indent=2))

            # Verification assertions
            assert result_val.get("isFetchDisabled") is False, "Button is still disabled!"
            assert result_val.get("btnText") == "Load Music", f"Button text expected 'Load Music', got: {result_val.get('btnText')}"
            assert result_val.get("isSkeletonHidden") is True, "Skeleton section is not hidden!"
            assert result_val.get("isPlSectionVisible") is True, "Playlist section is not visible!"
            assert "India" in result_val.get("plTitle"), f"Title does not contain 'India': {result_val.get('plTitle')}"
            assert result_val.get("trackRows") > 0, "No track rows rendered in DOM!"

            print(f"\n[PASS] Successfully verified '{result_val.get('plTitle')}' with {result_val.get('trackRows')} tracks rendered and Load button restored!")
    finally:
        proc.terminate()
        proc.wait()
        server.shutdown()

asyncio.run(main())
