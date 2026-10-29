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

# Test node-based headless script or evaluation
node_test_script = """
const { JSDOM } = require('jsdom');
// If jsdom is not available, node test syntax
console.log('Node test ready');
"""

# Test with node directly executing docs/app.js functions in simulated window
simulation_script = r"""
const fs = require('fs');
let code = fs.readFileSync(process.argv[2], 'utf-8');

// Mock DOM elements
const mockElement = () => ({
  classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
  addEventListener: () => {},
  querySelector: () => mockElement(),
  querySelectorAll: () => [],
  appendChild: () => {},
  textContent: '',
  innerHTML: '',
  value: '',
  style: {},
  scrollIntoView: () => {}
});

global.window = {
  location: { hostname: 'sudo-shakuni.github.io', protocol: 'https:' },
  addEventListener: () => {},
  removeEventListener: () => {}
};
global.document = {
  getElementById: () => mockElement(),
  querySelector: () => mockElement(),
  querySelectorAll: () => [],
  createElement: () => mockElement(),
  createDocumentFragment: () => ({ appendChild: () => {} }),
  addEventListener: () => {},
  readyState: 'complete'
};
global.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
global.navigator = { clipboard: { readText: () => Promise.resolve('') } };
global.showToast = () => {};

// Evaluate code
eval(code);

// Test all 4 platform URLs
async function runTests() {
  const urls = [
    { url: 'https://open.spotify.com/playlist/37i9dQZEVXbMWDif5SCE', name: 'Spotify Playlist' },
    { url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk', name: 'YouTube Track' },
    { url: 'https://www.jiosaavn.com/album/kesariya-lofi-flip/Oi120RPXw-E_', name: 'JioSaavn Album' },
    { url: 'https://music.amazon.com/albums/B09XYZ123', name: 'Amazon Album' }
  ];

  for (const item of urls) {
    const res = await fetchPlaylistData(item.url);
    if (!res || !res.title || !res.tracks || res.tracks.length === 0) {
      throw new Error('Failed to load: ' + item.name);
    }
    console.log(`[PASS] ${item.name} loaded: "${res.title}" (${res.tracks.length} tracks, ${res.platform_badge})`);
  }
}

runTests().then(() => {
  console.log('[SUCCESS] All 4 platforms loaded successfully in Web Showcase!');
  process.exit(0);
}).catch((err) => {
  console.error('[FAIL] Platform loading failed:', err);
  process.exit(1);
});
"""

sim_path = os.path.join(REPO_DIR, "sim_test.js")
with open(sim_path, "w", encoding="utf-8") as f:
    f.write(simulation_script)

try:
    ret = subprocess.run(["node", sim_path, os.path.join(REPO_DIR, "docs", "app.js")], capture_output=True, text=True)
    print(ret.stdout)
    if ret.stderr:
        print("Stderr:", ret.stderr)
    if ret.returncode == 0:
        print("[SUCCESS] Automated simulation of user custom URL submission PASSED!")
    else:
        print("[FAIL] Simulation failed with exit code:", ret.returncode)
        sys.exit(1)
finally:
    if os.path.exists(sim_path):
        os.remove(sim_path)
    server.shutdown()
