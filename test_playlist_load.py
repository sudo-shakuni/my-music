import os
import sys
import time
import subprocess
import http.server
import socketserver
import threading

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

try:
    url = f"http://127.0.0.1:{port}/"
    cmd = [
        chrome_path,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--dump-dom",
        url
    ]
    res = subprocess.run(cmd, capture_output=True, text=True, timeout=10)
    dom = res.stdout
    
    # Check that tracks are rendered in the DOM
    if 'class="track-row"' in dom and 'Blinding Lights' in dom:
        print("[PASS] Playlist tracks rendered directly into the DOM on initial load!")
    else:
        print("[FAIL] Initial track rows not found in DOM!")
        sys.exit(1)

    if 'id="btn-shortcuts-toggle"' in dom and 'id="shortcuts-modal"' in dom:
        print("[PASS] Interactive UI elements and modals verified in DOM!")
    else:
        print("[FAIL] Modals not found!")
        sys.exit(1)
        
    print("[SUCCESS] Web showcase playlist rendering test PASSED!")
finally:
    server.shutdown()
