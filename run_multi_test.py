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

# Test via Node simulation of docs/app.js
node_test = r"""
const fs = require('fs');
let code = fs.readFileSync(process.argv[2], 'utf-8');

// Realistic DOM simulation
class ClassList {
  constructor() { this.classes = new Set(); }
  add(...c) { c.forEach(x => this.classes.add(x)); }
  remove(...c) { c.forEach(x => this.classes.delete(x)); }
  toggle(c, force) {
    if (force !== undefined) {
      if (force) this.classes.add(c); else this.classes.delete(c);
      return force;
    }
    if (this.classes.has(c)) { this.classes.delete(c); return false; }
    this.classes.add(c); return true;
  }
  contains(c) { return this.classes.has(c); }
}

class MockElement {
  constructor(id = '', tag = 'div') {
    this.id = id;
    this.tagName = tag.toUpperCase();
    this.classList = new ClassList();
    this.children = [];
    this.textContent = '';
    this.innerHTML = '';
    this.value = '';
    this.style = {};
    this.disabled = false;
  }
  addEventListener() {}
  appendChild(child) { this.children.push(child); }
  querySelector(sel) {
    if (sel.includes('.btn-text')) return new MockElement('btn-text', 'span');
    if (sel.includes('.sort-icon')) return new MockElement('sort-icon', 'i');
    if (sel.includes('[data-filter="all"]')) return new MockElement('chip-all', 'button');
    return new MockElement('sub-' + sel);
  }
  querySelectorAll() { return []; }
  scrollIntoView() {}
}

const elementsMap = new Map();
function getEl(id) {
  if (!elementsMap.has(id)) {
    elementsMap.set(id, new MockElement(id));
  }
  return elementsMap.get(id);
}

global.window = {
  location: { hostname: 'sudo-shakuni.github.io', protocol: 'https:' },
  addEventListener: () => {},
  removeEventListener: () => {}
};

global.document = {
  getElementById: (id) => getEl(id),
  querySelector: (sel) => new MockElement(sel),
  querySelectorAll: () => [],
  createElement: (tag) => new MockElement('', tag),
  createDocumentFragment: () => new MockElement('fragment'),
  addEventListener: () => {},
  readyState: 'complete'
};

global.localStorage = {
  store: {},
  getItem(k) { return this.store[k] || null; },
  setItem(k, v) { this.store[k] = String(v); },
  removeItem(k) { delete this.store[k]; }
};

global.navigator = { clipboard: { readText: () => Promise.resolve('') } };
global.showToast = (msg, type) => console.log(`  [TOAST ${type || 'info'}] ${msg}`);

// Evaluate docs/app.js
eval(code);

async function testLinks() {
  const testLinks = [
    { name: "Today's Top Hits (Valid Spotify Playlist)", url: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M" },
    { name: "Top 50 Global (Valid Spotify Playlist)", url: "https://open.spotify.com/playlist/37i9dQZEVXbMDoHDwVN2tF" },
    { name: "Never Gonna Give You Up (Spotify Track)", url: "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT" },
    { name: "Despacito (YouTube)", url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk" },
    { name: "Kesariya (JioSaavn)", url: "https://www.jiosaavn.com/song/kesariya/Bw8TeBJeB1A" },
    { name: "Amazon Music Album", url: "https://music.amazon.com/albums/B09XYZ123" },
    { name: "User Pasted Link (Truncated ID)", url: "https://open.spotify.com/playlist/37i9dQZEVXbMWDif5SCE" },
    { name: "Raw Search Query / Generic Text", url: "coldplay viva la vida" }
  ];

  console.log("=== Testing Pasted Links in Web Showcase ===");
  let passed = 0;
  for (const item of testLinks) {
    console.log(`\nTesting: ${item.name} (${item.url})`);
    
    // Simulate setting input and submitting
    const input = getEl("playlist-url");
    input.value = item.url;
    
    const res = await fetchPlaylistData(item.url);
    if (!res || !res.title || !res.tracks || res.tracks.length === 0) {
      console.error(`  [FAIL] Did not return tracks for ${item.name}`);
    } else {
      const btnFetch = getEl("btn-fetch");
      const isStillLoading = btnFetch.disabled || btnFetch.classList.contains("loading");
      if (isStillLoading) {
        console.error(`  [FAIL] Button still disabled or loading for ${item.name}`);
      } else {
        console.log(`  [PASS] Successfully loaded: "${res.title}" with ${res.tracks.length} tracks (${res.platform_badge})`);
        passed++;
      }
    }
  }

  console.log(`\nResults: ${passed}/${testLinks.length} passed.`);
  if (passed === testLinks.length) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

testLinks().catch(err => {
  console.error("Test error:", err);
  process.exit(1);
});
"""

sim_path = os.path.join(REPO_DIR, "test_multi_links.js")
with open(sim_path, "w", encoding="utf-8") as f:
    f.write(node_test)

try:
    ret = subprocess.run(["node", sim_path, os.path.join(REPO_DIR, "docs", "app.js")], capture_output=True, text=True)
    print(ret.stdout)
    if ret.stderr:
        print("Stderr:", ret.stderr)
finally:
    if os.path.exists(sim_path):
        os.remove(sim_path)
    server.shutdown()
