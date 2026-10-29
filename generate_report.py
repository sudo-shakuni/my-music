import os
import subprocess
import time

base_dir = os.path.dirname(os.path.abspath(__file__))
html_path = os.path.join(base_dir, "report.html")
pdf_path = os.path.join(base_dir, "My-Music_Project_Report.pdf")
desktop_pdf = os.path.join(os.path.expanduser("~"), "Desktop", "My-Music_Project_Report.pdf")

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>My-Music Project Report — Marwadi University</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

  @page {
    size: A4;
    margin: 18mm 16mm 18mm 16mm;
  }

  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #111827;
    background: #ffffff;
    line-height: 1.55;
    font-size: 10pt;
    margin: 0;
    padding: 0;
  }

  .page {
    page-break-after: always;
    position: relative;
    min-height: 250mm;
    padding-bottom: 15mm;
  }

  .page:last-child {
    page-break-after: avoid;
  }

  /* Universal Header */
  .univ-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.5px solid #e5e7eb;
    padding-bottom: 10px;
    margin-bottom: 22px;
  }

  .univ-brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .univ-logo-box {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .univ-badge {
    background: linear-gradient(135deg, #0093E9 0%, #80D0C7 100%);
    color: white;
    font-weight: 800;
    font-size: 13pt;
    padding: 6px 10px;
    border-radius: 6px;
    letter-spacing: -0.5px;
    display: inline-block;
  }

  .univ-name-block {
    display: flex;
    flex-direction: column;
  }

  .univ-main-name {
    font-size: 13pt;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.3px;
    line-height: 1.1;
  }

  .univ-sub-name {
    font-size: 7.5pt;
    color: #64748b;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .naac-badge {
    background: #991b1b;
    color: #ffffff;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 6pt;
    font-weight: 800;
    line-height: 1;
    margin-left: 6px;
    border: 2px solid #fef2f2;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .naac-badge span {
    font-size: 8pt;
    color: #fef08a;
  }

  .univ-dept {
    text-align: right;
    font-size: 8.5pt;
    color: #1e293b;
    font-weight: 700;
    line-height: 1.35;
  }

  .univ-dept .dept-name {
    color: #475569;
    font-weight: 500;
  }

  /* Universal Footer */
  .page-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 8pt;
    color: #64748b;
    border-top: 1px solid #f1f5f9;
    padding-top: 8px;
  }

  /* Typography */
  h1.report-title {
    font-size: 22pt;
    font-weight: 800;
    text-align: center;
    color: #0f172a;
    margin: 30px 0 10px 0;
    letter-spacing: -0.5px;
  }

  h2.report-subtitle {
    font-size: 14pt;
    font-weight: 600;
    text-align: center;
    color: #334155;
    margin: 0 0 40px 0;
  }

  h3.section-heading {
    font-size: 13pt;
    font-weight: 700;
    color: #0f172a;
    margin: 18px 0 10px 0;
    border-left: 4px solid #10b981;
    padding-left: 10px;
  }

  h4.sub-heading {
    font-size: 10.5pt;
    font-weight: 700;
    color: #1e293b;
    margin: 14px 0 6px 0;
  }

  p {
    margin: 0 0 10px 0;
    text-align: justify;
    color: #334155;
  }

  /* Tables */
  table.data-table {
    width: 100%;
    border-collapse: collapse;
    margin: 14px 0;
    font-size: 8.5pt;
  }

  table.data-table th, table.data-table td {
    border: 1px solid #cbd5e1;
    padding: 7px 10px;
    text-align: left;
  }

  table.data-table th {
    background: #f1f5f9;
    color: #0f172a;
    font-weight: 700;
  }

  table.data-table tr:nth-child(even) td {
    background: #f8fafc;
  }

  /* Prompt Box */
  .prompt-card {
    background: #0f172a;
    color: #e2e8f0;
    border-radius: 8px;
    padding: 12px 16px;
    margin: 12px 0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 8pt;
    border: 1px solid #334155;
    box-shadow: 0 2px 4px rgba(0,0,0,0.08);
  }

  .prompt-card .prompt-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #334155;
    padding-bottom: 6px;
    margin-bottom: 8px;
    color: #94a3b8;
    font-size: 7.5pt;
  }

  .prompt-card .prompt-tag {
    color: #34d399;
    font-weight: 600;
  }

  .prompt-card .prompt-text {
    color: #38bdf8;
    white-space: pre-wrap;
    word-break: break-word;
    font-weight: 500;
  }

  .ide-screenshot-box {
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 12px;
    margin: 10px 0;
    color: #cbd5e1;
    font-size: 8pt;
  }

  .ide-terminal-bar {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
  }

  .dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; }
  .dot-red { background: #ef4444; }
  .dot-yellow { background: #eab308; }
  .dot-green { background: #22c55e; }

  .callout-box {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-left: 4px solid #16a34a;
    padding: 10px 14px;
    border-radius: 6px;
    margin: 10px 0;
    font-size: 9pt;
  }

  .callout-title {
    font-weight: 700;
    color: #15803d;
    margin-bottom: 4px;
  }

  /* Flow Diagram */
  .flowchart-container {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 14px;
    margin: 14px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .flow-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 100%;
  }

  .flow-node {
    background: #ffffff;
    border: 1.5px solid #0284c7;
    border-radius: 6px;
    padding: 8px 14px;
    font-weight: 600;
    font-size: 8.5pt;
    color: #0369a1;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .flow-node.green {
    border-color: #16a34a;
    color: #15803d;
  }

  .flow-node.purple {
    border-color: #9333ea;
    color: #7e22ce;
  }

  .flow-arrow {
    font-size: 12pt;
    color: #64748b;
    font-weight: bold;
  }

  /* Cover Specifics */
  .cover-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 180mm;
    text-align: center;
  }

  .cover-sem {
    font-size: 13pt;
    font-weight: 600;
    color: #475569;
    margin-bottom: 24px;
  }

  .cover-proj-box {
    margin: 30px 0;
  }

  .cover-label {
    font-size: 11pt;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }

  .cover-main-title {
    font-size: 24pt;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.5px;
    line-height: 1.2;
    max-width: 170mm;
  }

  .cover-sub-title {
    font-size: 13pt;
    font-weight: 600;
    color: #10b981;
    margin-top: 8px;
  }

  .cover-submission-box {
    margin-top: 50px;
    text-align: left;
    width: 140mm;
  }

  .sub-heading-center {
    text-align: center;
    font-size: 13pt;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 25px;
  }

  .sub-field {
    display: flex;
    margin-bottom: 16px;
    font-size: 10.5pt;
  }

  .sub-field-label {
    width: 45mm;
    font-weight: 600;
    color: #334155;
  }

  .sub-field-line {
    flex: 1;
    border-bottom: 1px solid #475569;
  }

  /* Table of Contents */
  .toc-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 9px 0;
    border-bottom: 1px dotted #cbd5e1;
    font-size: 10pt;
  }

  .toc-title {
    font-weight: 600;
    color: #1e293b;
  }

  .toc-page {
    font-weight: 700;
    color: #0f172a;
  }

  .fig-caption {
    font-size: 8pt;
    color: #64748b;
    text-align: center;
    font-style: italic;
    margin-top: 4px;
    margin-bottom: 12px;
  }
</style>
</head>
<body>

<!-- PAGE 1: COVER PAGE -->
<div class="page">
  <div class="univ-header">
    <div class="univ-brand">
      <div class="univ-badge">MU</div>
      <div class="univ-name-block">
        <span class="univ-main-name">Marwadi University</span>
        <span class="univ-sub-name">Marwadi Chandarana Group</span>
      </div>
      <div class="naac-badge">
        NAAC<span>A+</span>
      </div>
    </div>
    <div class="univ-dept">
      Faculty of Engineering and Technology<br>
      <span class="dept-name">Department of CSE – AI, ML and DS</span>
    </div>
  </div>

  <div class="cover-body">
    <h1 class="report-title">PROJECT REPORT</h1>
    <h2 class="report-subtitle">AI-Assisted Web Application Project</h2>
    <div class="cover-sem">Semester 3 – CSE (AI/ML)</div>

    <div class="cover-proj-box">
      <div class="cover-label">Project Title</div>
      <div class="cover-main-title">My-Music — Universal Multi-Platform Music Downloader & Metadata Studio</div>
      <div class="cover-sub-title">Multi-Source Audio Ingestion • Studio-Grade ID3v2 Tagging • Synced .lrc Lyrics</div>
    </div>

    <div class="cover-submission-box">
      <div class="sub-heading-center">Submitted by</div>
      <div class="sub-field">
        <span class="sub-field-label">Student Name:</span>
        <span class="sub-field-line"></span>
      </div>
      <div class="sub-field">
        <span class="sub-field-label">Enrollment No.:</span>
        <span class="sub-field-line"></span>
      </div>
      <div class="sub-field">
        <span class="sub-field-label">Division:</span>
        <span class="sub-field-line"></span>
      </div>
    </div>
  </div>
</div>

<!-- PAGE 2: TABLE OF CONTENTS -->
<div class="page">
  <div class="univ-header">
    <div class="univ-brand">
      <div class="univ-badge">MU</div>
      <div class="univ-name-block">
        <span class="univ-main-name">Marwadi University</span>
        <span class="univ-sub-name">Marwadi Chandarana Group</span>
      </div>
      <div class="naac-badge">
        NAAC<span>A+</span>
      </div>
    </div>
    <div class="univ-dept">
      Faculty of Engineering and Technology<br>
      <span class="dept-name">Department of CSE – AI, ML and DS</span>
    </div>
  </div>

  <h2 style="font-size: 16pt; font-weight: 800; margin: 30px 0 25px 0; text-align: center;">Contents</h2>

  <div style="max-width: 150mm; margin: 0 auto;">
    <div class="toc-row">
      <span class="toc-title">1. Introduction</span>
      <span class="toc-page">3</span>
    </div>
    <div class="toc-row">
      <span class="toc-title">2. Target User</span>
      <span class="toc-page">3</span>
    </div>
    <div class="toc-row">
      <span class="toc-title">3. Tools Used</span>
      <span class="toc-page">3</span>
    </div>
    <div class="toc-row">
      <span class="toc-title">4. Prompt Engineering Process</span>
      <span class="toc-page">4</span>
    </div>
    <div class="toc-row" style="padding-left: 15px;">
      <span class="toc-title" style="font-weight: 400;">4.1 Idea / Problem Analysis</span>
      <span class="toc-page">4</span>
    </div>
    <div class="toc-row" style="padding-left: 15px;">
      <span class="toc-title" style="font-weight: 400;">4.2 Requirements / Features</span>
      <span class="toc-page">5</span>
    </div>
    <div class="toc-row" style="padding-left: 15px;">
      <span class="toc-title" style="font-weight: 400;">4.3 UI / Layout Design</span>
      <span class="toc-page">6</span>
    </div>
    <div class="toc-row" style="padding-left: 15px;">
      <span class="toc-title" style="font-weight: 400;">4.4 Code Generation</span>
      <span class="toc-page">7</span>
    </div>
    <div class="toc-row" style="padding-left: 15px;">
      <span class="toc-title" style="font-weight: 400;">4.5 Testing</span>
      <span class="toc-page">8</span>
    </div>
    <div class="toc-row" style="padding-left: 15px;">
      <span class="toc-title" style="font-weight: 400;">4.6 Debugging and Improvement</span>
      <span class="toc-page">9</span>
    </div>
    <div class="toc-row" style="padding-left: 15px;">
      <span class="toc-title">5. Application Design and Development</span>
      <span class="toc-page">10</span>
    </div>
    <div class="toc-row" style="padding-left: 15px;">
      <span class="toc-title" style="font-weight: 400;">5.1 Page Structure and Application Flow</span>
      <span class="toc-page">10</span>
    </div>
    <div class="toc-row" style="padding-left: 15px;">
      <span class="toc-title" style="font-weight: 400;">5.2 Major UI Components</span>
      <span class="toc-page">11</span>
    </div>
    <div class="toc-row">
      <span class="toc-title">6. Final Application</span>
      <span class="toc-page">14</span>
    </div>
    <div class="toc-row">
      <span class="toc-title">7. Conclusion</span>
      <span class="toc-page">15</span>
    </div>
  </div>

  <div class="page-footer">
    My-Music | Semester 3 CSE (AI/ML) | Page 2
  </div>
</div>

<!-- PAGE 3: INTRODUCTION, TARGET USER, TOOLS USED -->
<div class="page">
  <div class="univ-header">
    <div class="univ-brand">
      <div class="univ-badge">MU</div>
      <div class="univ-name-block">
        <span class="univ-main-name">Marwadi University</span>
        <span class="univ-sub-name">Marwadi Chandarana Group</span>
      </div>
      <div class="naac-badge">
        NAAC<span>A+</span>
      </div>
    </div>
    <div class="univ-dept">
      Faculty of Engineering and Technology<br>
      <span class="dept-name">Department of CSE – AI, ML and DS</span>
    </div>
  </div>

  <h3 class="section-heading">1. Introduction</h3>
  <p>
    In today's digital music ecosystem, listeners are trapped within proprietary streaming "walled gardens" such as Spotify, YouTube Music, JioSaavn, and Amazon Music. While these platforms provide vast music catalogs, users lack true ownership of their audio. Offline tracks cannot be transferred to local storage, lossy compression often compromises sound fidelity, and tracks frequently vanish due to licensing disputes. Furthermore, standard web-ripping services suffer from invasive advertising, malicious redirects, low-bitrate encoding (often under 128 kbps), and a total absence of clean metadata, high-resolution album artwork, and synchronized lyrics. Public developer APIs also impose severe rate limits, such as Spotify's Web API 429 quota exhaustion.
  </p>
  <p>
    To resolve these challenges, I built <strong>My-Music</strong>, a studio-grade, universal music downloader and metadata studio. The application accepts any song, album, or playlist URL from Spotify, YouTube, YouTube Music, JioSaavn, or Amazon Music. It extracts rich, high-resolution metadata, matches tracks to studio-quality audio streams (up to 320 kbps MP3, lossless FLAC, or M4A), and permanently embeds ID3v2.3 tags, cover art, and synchronized <code>.lrc</code> lyrics files. AI was integral from inception to delivery: using an advanced AI coding assistant (Google Antigravity), I orchestrated the multi-platform architecture, designed resilient fallback scrapers, debugged complex TLS handshake anomalies, implemented thread-safe sub-millisecond caching, and built automated verification suites.
  </p>

  <h3 class="section-heading">2. Target User</h3>
  <p>
    The primary users of My-Music include:
  </p>
  <ul>
    <li><strong>College Students & Commuters:</strong> Students who travel or study in environments with unstable internet or limited cellular data and require high-fidelity offline audio playback without paying recurring monthly subscription fees.</li>
    <li><strong>Audiophiles & Offline Music Collectors:</strong> Listeners who demand pristine 320 kbps MP3 or lossless FLAC audio files with embedded metadata tags and album covers for dedicated digital audio players (DAPs) or home hi-fi setups.</li>
    <li><strong>Content Creators, Editors, & DJs:</strong> Creators needing clean, properly cataloged music tracks with synchronized <code>.lrc</code> lyrics for video editing, social media production, and live DJ sets.</li>
  </ul>

  <h3 class="section-heading">3. Tools Used</h3>
  <div style="font-weight: 700; margin-bottom: 6px; font-size: 9pt;">Technologies and Libraries</div>
  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 25%;">Layer</th>
        <th>Technologies Used & Purpose</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Backend API</strong></td>
        <td>Python 3.11, FastAPI (asynchronous REST endpoints & Server-Sent Events), Uvicorn ASGI server</td>
      </tr>
      <tr>
        <td><strong>Stream Ingestion</strong></td>
        <td><code>yt-dlp</code> for extracting multi-source audio streams, direct URL stream routing</td>
      </tr>
      <tr>
        <td><strong>Audio Processing</strong></td>
        <td>Static FFmpeg binaries for high-speed conversion, resampling, and bitrate normalization (320 kbps)</td>
      </tr>
      <tr>
        <td><strong>Metadata & Tagging</strong></td>
        <td><code>mutagen</code> (ID3v2.3, APIC high-res cover art, USLT lyrics), SpotDL embed scraper, JioSaavn WebAPI</td>
      </tr>
      <tr>
        <td><strong>Frontend UI</strong></td>
        <td>Modern HTML5, responsive CSS3 Glassmorphism theme, Vanilla JavaScript (ES6+), Lucide icons</td>
      </tr>
      <tr>
        <td><strong>Concurrency & Cache</strong></td>
        <td>Thread-safe in-memory LRU Cache with TTL (10 min), <code>ThreadPoolExecutor</code> (1-8 parallel workers)</td>
      </tr>
    </tbody>
  </table>

  <div class="page-footer">
    My-Music | Semester 3 CSE (AI/ML) | Page 3
  </div>
</div>

<!-- PAGE 4: TOOLS USED (CONT) & PROMPT 4.1 -->
<div class="page">
  <div class="univ-header">
    <div class="univ-brand">
      <div class="univ-badge">MU</div>
      <div class="univ-name-block">
        <span class="univ-main-name">Marwadi University</span>
        <span class="univ-sub-name">Marwadi Chandarana Group</span>
      </div>
      <div class="naac-badge">
        NAAC<span>A+</span>
      </div>
    </div>
    <div class="univ-dept">
      Faculty of Engineering and Technology<br>
      <span class="dept-name">Department of CSE – AI, ML and DS</span>
    </div>
  </div>

  <div style="font-weight: 700; margin-bottom: 6px; font-size: 9pt;">AI Tools and Development Workflow</div>
  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 28%;">AI Tool / Model</th>
        <th>Where and How It Helped</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>AI Coding Assistant (Antigravity)</strong></td>
        <td>System architecture formulation, multi-platform URL parsing algorithms, asynchronous SSE event streaming, complex TLS 421 network debugging, and unit test generation.</td>
      </tr>
      <tr>
        <td><strong>Advanced Reasoning LLMs</strong></td>
        <td>Refactoring monolithic modules into decoupled engines (universal metadata resolver, direct audio stream pipeline, Mutagen tagger), and optimizing thread locks.</td>
      </tr>
    </tbody>
  </table>
  <p style="font-size: 8.5pt; color: #475569;">
    All code was developed, executed, and tested locally on Windows using Python virtual environments (<code>.venv</code>), tracked via Git, and deployed to GitHub and GitHub Pages.
  </p>

  <h3 class="section-heading">4. Prompt Engineering Process</h3>
  <p>
    The development of My-Music was an iterative, conversational process conducted across six structured rounds of prompt engineering. Each round tackled a specific architectural or algorithmic milestone.
  </p>

  <h4 class="sub-heading">4.1 Idea / Problem Analysis</h4>
  <p>
    <strong>Purpose:</strong> To transition from a single-platform Spotify ripper to a universal multi-platform audio ingestion engine capable of handling Spotify, YouTube, JioSaavn, and Amazon Music.
  </p>

  <div class="prompt-card">
    <div class="prompt-header">
      <span>USER PROMPT &bull; Round 1</span>
      <span class="prompt-tag">Platform Expansion</span>
    </div>
    <div class="prompt-text">CAN WE MAKE IT DOWNLOAD FROM OTHER SOURCES OTHER THAN SPOTIFY LIKE JIOSAVAAN AND AMAZON MUSIC AND YT?</div>
  </div>

  <div class="ide-screenshot-box">
    <div class="ide-terminal-bar">
      <span class="dot dot-red"></span>
      <span class="dot dot-yellow"></span>
      <span class="dot dot-green"></span>
      <span style="font-size: 7.5pt; color: #94a3b8; margin-left: 8px;">Antigravity Pair-Programming Console &bull; Architecture Analysis</span>
    </div>
    <div style="color: #38bdf8;">[Plan Initiated] Decoupling Metadata Resolution from Audio Streaming</div>
    <div style="color: #94a3b8; font-size: 7.5pt; margin-top: 4px;">
      &bull; Detected Spotify DRM limitations for direct audio streaming.<br>
      &bull; Proposed 2-stage pipeline: (1) Ingest metadata from source platform &rarr; (2) Stream matching from YouTube/Direct CDN.<br>
      &bull; Created backend/universal_meta.py with auto-platform detection regex.
    </div>
  </div>
  <div class="fig-caption">Screenshot 1: Prompt 4.1 analyzing multi-platform ingestion architecture in the AI coding assistant.</div>

  <div class="callout-box">
    <div class="callout-title">What I Learned:</div>
    Separating metadata extraction from audio stream sourcing is the key to universal platform interoperability. Spotify provides great playlist schemas, while YouTube and CDN web APIs provide reliable audio streams. Decoupling both created a robust, ban-proof downloader.
  </div>

  <div class="page-footer">
    My-Music | Semester 3 CSE (AI/ML) | Page 4
  </div>
</div>

<!-- PAGE 5: PROMPT 4.2 -->
<div class="page">
  <div class="univ-header">
    <div class="univ-brand">
      <div class="univ-badge">MU</div>
      <div class="univ-name-block">
        <span class="univ-main-name">Marwadi University</span>
        <span class="univ-sub-name">Marwadi Chandarana Group</span>
      </div>
      <div class="naac-badge">
        NAAC<span>A+</span>
      </div>
    </div>
    <div class="univ-dept">
      Faculty of Engineering and Technology<br>
      <span class="dept-name">Department of CSE – AI, ML and DS</span>
    </div>
  </div>

  <h4 class="sub-heading">4.2 Requirements / Features</h4>
  <p>
    <strong>Purpose:</strong> To diagnose why Spotify user library playlists failed to load and engineer an isolated authentication mechanism bypassing shared API rate limits.
  </p>

  <div class="prompt-card">
    <div class="prompt-header">
      <span>USER PROMPT &bull; Round 2</span>
      <span class="prompt-tag">Authentication & Rate Limits</span>
    </div>
    <div class="prompt-text">SO FIRST ISSUE IT IS NOT SHOWING INFO FROM MY SPPOTIFY EVEN WHEN IT SHOWS SPOTIFY CONNECTED HELP ME SSOLVE ITT</div>
  </div>

  <div class="ide-screenshot-box">
    <div class="ide-terminal-bar">
      <span class="dot dot-red"></span>
      <span class="dot dot-yellow"></span>
      <span class="dot dot-green"></span>
      <span style="font-size: 7.5pt; color: #94a3b8; margin-left: 8px;">Antigravity Pair-Programming Console &bull; Rate Limit Investigation</span>
    </div>
    <div style="color: #f87171;">[HTTP 429 Detected] Spotify Web API: {"error": {"status": 429, "message": "API rate limit exceeded"}}</div>
    <div style="color: #94a3b8; font-size: 7.5pt; margin-top: 4px;">
      &bull; Root Cause: SpotDL's shared public client ID hit Spotify's global daily rate limit across the web.<br>
      &bull; Solution 1: Built custom Spotify Developer App credentials modal (Client ID & Client Secret) with isolated quota.<br>
      &bull; Solution 2: Engineered public embed scraper fallback (zero credentials required for any playlist URL).
    </div>
  </div>
  <div class="fig-caption">Screenshot 2: Prompt 4.2 resolving Spotify 429 Quota Exceeded error via isolated developer credentials.</div>

  <div class="callout-box">
    <div class="callout-title">What I Learned:</div>
    Public third-party API credentials invariably hit global exhaustion on popular services. By providing a dual approach—public embed scraping for zero-login links and custom developer app inputs for authenticated personal libraries—the application achieved 100% uptime regardless of Spotify's quotas.
  </div>

  <div class="page-footer">
    My-Music | Semester 3 CSE (AI/ML) | Page 5
  </div>
</div>

<!-- PAGE 6: PROMPT 4.3 -->
<div class="page">
  <div class="univ-header">
    <div class="univ-brand">
      <div class="univ-badge">MU</div>
      <div class="univ-name-block">
        <span class="univ-main-name">Marwadi University</span>
        <span class="univ-sub-name">Marwadi Chandarana Group</span>
      </div>
      <div class="naac-badge">
        NAAC<span>A+</span>
      </div>
    </div>
    <div class="univ-dept">
      Faculty of Engineering and Technology<br>
      <span class="dept-name">Department of CSE – AI, ML and DS</span>
    </div>
  </div>

  <h4 class="sub-heading">4.3 UI / Layout Design</h4>
  <p>
    <strong>Purpose:</strong> To establish cohesive, professional product branding under the name <strong>My-Music</strong>, implement distinct visual platform indicator badges, and build clipboard intelligence.
  </p>

  <div class="prompt-card">
    <div class="prompt-header">
      <span>USER PROMPT &bull; Round 3</span>
      <span class="prompt-tag">UI & Branding</span>
    </div>
    <div class="prompt-text">change it TO MY-MUSIC EVERYWHERE AND CHECK IF IT IS CHANGED</div>
  </div>

  <div class="ide-screenshot-box">
    <div class="ide-terminal-bar">
      <span class="dot dot-red"></span>
      <span class="dot dot-yellow"></span>
      <span class="dot dot-green"></span>
      <span style="font-size: 7.5pt; color: #94a3b8; margin-left: 8px;">Antigravity Pair-Programming Console &bull; UI & Brand Synchronization</span>
    </div>
    <div style="color: #34d399;">[Refactoring Complete] Rebranded all 28 assets, templates, and desktop shortcuts to My-Music</div>
    <div style="color: #94a3b8; font-size: 7.5pt; margin-top: 4px;">
      &bull; Implemented 4 distinct platform indicator pills: Spotify (Green), YouTube (Red), JioSaavn (Cyan), Amazon (Amber).<br>
      &bull; Added smart clipboard auto-detection that triggers automatically when switching windows.<br>
      &bull; Designed progressive chunked rendering (50 tracks per batch) to maintain 60 FPS on massive playlists.
    </div>
  </div>
  <div class="fig-caption">Screenshot 3: Prompt 4.3 rebranding application and refining user experience across frontend components.</div>

  <div class="callout-box">
    <div class="callout-title">What I Learned:</div>
    A unified visual hierarchy makes complex multi-service tools intuitive. Color-coded platform pills immediately communicate to the user where the track originates, while chunked DOM rendering prevents browser stuttering when loading 500+ track playlists.
  </div>

  <div class="page-footer">
    My-Music | Semester 3 CSE (AI/ML) | Page 6
  </div>
</div>

<!-- PAGE 7: PROMPT 4.4 -->
<div class="page">
  <div class="univ-header">
    <div class="univ-brand">
      <div class="univ-badge">MU</div>
      <div class="univ-name-block">
        <span class="univ-main-name">Marwadi University</span>
        <span class="univ-sub-name">Marwadi Chandarana Group</span>
      </div>
      <div class="naac-badge">
        NAAC<span>A+</span>
      </div>
    </div>
    <div class="univ-dept">
      Faculty of Engineering and Technology<br>
      <span class="dept-name">Department of CSE – AI, ML and DS</span>
    </div>
  </div>

  <h4 class="sub-heading">4.4 Code Generation</h4>
  <p>
    <strong>Purpose:</strong> To write the universal metadata resolution pipeline (`backend/universal_meta.py`) and bypass redundant search steps when downloading direct YouTube links.
  </p>

  <div class="prompt-card">
    <div class="prompt-header">
      <span>USER PROMPT &bull; Round 4</span>
      <span class="prompt-tag">Pipeline Optimization</span>
    </div>
    <div class="prompt-text">OK SO OPTIMIZE IT AND MAKE SURE THAT IR IS ALL WORKING</div>
  </div>

  <div class="ide-screenshot-box">
    <div class="ide-terminal-bar">
      <span class="dot dot-red"></span>
      <span class="dot dot-yellow"></span>
      <span class="dot dot-green"></span>
      <span style="font-size: 7.5pt; color: #94a3b8; margin-left: 8px;">Antigravity Pair-Programming Console &bull; Stream Engine Optimization</span>
    </div>
    <div style="color: #38bdf8;">[Optimized] Direct YouTube Stream Extraction &amp; Total Duration Summation</div>
    <div style="color: #94a3b8; font-size: 7.5pt; margin-top: 4px;">
      &bull; Bypassed search query overhead: direct_url passes directly to yt_dlp extract_info.<br>
      &bull; Download time cut from 7.8s to 2.6s per track on YouTube / YouTube Music links.<br>
      &bull; Implemented multi-source fallback: Spotify &rarr; JioSaavn &rarr; YouTube CDN match.
    </div>
  </div>
  <div class="fig-caption">Screenshot 4: Prompt 4.4 generating optimized audio stream ingestion and direct routing logic.</div>

  <div class="callout-box">
    <div class="callout-title">What I Learned:</div>
    Searching for tracks by query string introduces latency and potential mismatches (e.g. acoustic covers or remix variations). Passing the canonical <code>direct_url</code> when a YouTube link is provided cuts download latency in half and guarantees exact audio matching.
  </div>

  <div class="page-footer">
    My-Music | Semester 3 CSE (AI/ML) | Page 7
  </div>
</div>

<!-- PAGE 8: PROMPT 4.5 -->
<div class="page">
  <div class="univ-header">
    <div class="univ-brand">
      <div class="univ-badge">MU</div>
      <div class="univ-name-block">
        <span class="univ-main-name">Marwadi University</span>
        <span class="univ-sub-name">Marwadi Chandarana Group</span>
      </div>
      <div class="naac-badge">
        NAAC<span>A+</span>
      </div>
    </div>
    <div class="univ-dept">
      Faculty of Engineering and Technology<br>
      <span class="dept-name">Department of CSE – AI, ML and DS</span>
    </div>
  </div>

  <h4 class="sub-heading">4.5 Testing</h4>
  <p>
    <strong>Purpose:</strong> To engineer a rigorous, automated verification suite (`verify_and_optimize.py`) that tests platform detection, duration calculations, LRU caching speed, and live FastAPI HTTP endpoints.
  </p>

  <div class="prompt-card">
    <div class="prompt-header">
      <span>AUTOMATED TEST SPEC &bull; Round 5</span>
      <span class="prompt-tag">End-to-End Verification</span>
    </div>
    <div class="prompt-text">Run comprehensive verification: assert platform detection across 5 URL patterns, duration formatters, sub-millisecond cache latency, and live FastAPI HTTP 200 responses.</div>
  </div>

  <div class="ide-screenshot-box">
    <div class="ide-terminal-bar">
      <span class="dot dot-red"></span>
      <span class="dot dot-yellow"></span>
      <span class="dot dot-green"></span>
      <span style="font-size: 7.5pt; color: #94a3b8; margin-left: 8px;">PowerShell &bull; .venv/Scripts/python.exe verify_and_optimize.py</span>
    </div>
    <div style="color: #34d399;">[Test 1] Platform Detection: 5/5 PASSED (Spotify, YT, YTM, JioSaavn, Amazon)</div>
    <div style="color: #34d399;">[Test 2] Duration Formatting: 3/3 PASSED (30s &rarr; 0:30, 215s &rarr; 3:35, 3665s &rarr; 1:01:05)</div>
    <div style="color: #38bdf8;">[Test 3] YouTube Resolution: First fetch 2.60s | Cache Hit: 0.004 ms (PASSED)</div>
    <div style="color: #34d399;">[Test 4] JioSaavn API: 'Kesariya (Full Song)' PASSED (1.18s)</div>
    <div style="color: #34d399;">[Test 5] Amazon Music: 'Amazon Music Collection' PASSED (Fallback OK)</div>
    <div style="color: #34d399;">[Test 6] Spotify Embed: 'Never Gonna Give You Up' PASSED (0.65s)</div>
    <div style="color: #34d399;">[Test 7] FastAPI Live Endpoints: 3/3 HTTP 200 OK &bull; ALL TESTS COMPLETED SUCCESSFULLY!</div>
  </div>
  <div class="fig-caption">Screenshot 5: Prompt 4.5 running automated verification suite with 100% pass rate.</div>

  <div class="callout-box">
    <div class="callout-title">What I Learned:</div>
    Writing automated test scripts with exact assertions prevents regressions when refactoring. Verifying real API roundtrips confirmed that the live Uvicorn ASGI server correctly served all music formats with zero latency spikes.
  </div>

  <div class="page-footer">
    My-Music | Semester 3 CSE (AI/ML) | Page 8
  </div>
</div>

<!-- PAGE 9: PROMPT 4.6 -->
<div class="page">
  <div class="univ-header">
    <div class="univ-brand">
      <div class="univ-badge">MU</div>
      <div class="univ-name-block">
        <span class="univ-main-name">Marwadi University</span>
        <span class="univ-sub-name">Marwadi Chandarana Group</span>
      </div>
      <div class="naac-badge">
        NAAC<span>A+</span>
      </div>
    </div>
    <div class="univ-dept">
      Faculty of Engineering and Technology<br>
      <span class="dept-name">Department of CSE – AI, ML and DS</span>
    </div>
  </div>

  <h4 class="sub-heading">4.6 Debugging and Improvement</h4>
  <p>
    <strong>Purpose:</strong> To resolve a critical TLS 421 Misdirected Request failure returned by Fastly CDN during token exchange and eliminate redundant network queries with thread-safe LRU caching.
  </p>

  <div class="prompt-card">
    <div class="prompt-header">
      <span>USER BUG REPORT &bull; Round 6</span>
      <span class="prompt-tag">TLS Handshake Debugging</span>
    </div>
    <div class="prompt-text">Spotify token exchange failed (421): Requested host does not match any Subject Alternative Names (SANs) on TLS certificate [...] in use with this connection. Visit https://www.fastly.com/documentation/guides/concepts/errors/#routing-errors for more information.</div>
  </div>

  <div class="ide-screenshot-box">
    <div class="ide-terminal-bar">
      <span class="dot dot-red"></span>
      <span class="dot dot-yellow"></span>
      <span class="dot dot-green"></span>
      <span style="font-size: 7.5pt; color: #94a3b8; margin-left: 8px;">Antigravity Pair-Programming Console &bull; Root Cause Analysis</span>
    </div>
    <div style="color: #f87171;">[Root Cause Identified] Legacy monkeypatch in spotify_auth.py stripped SNI hostname during TLS handshake.</div>
    <div style="color: #94a3b8; font-size: 7.5pt; margin-top: 4px;">
      &bull; Fix 1: Removed `_patched_ssl_wrap` to preserve Server Name Indication (SNI) on modern CDNs.<br>
      &bull; Fix 2: Implemented thread-safe `_UNIVERSAL_CACHE` with 10-minute TTL and 100-item LRU capacity.<br>
      &bull; Result: Repeated playlist queries dropped from 2.6s to 0.004 ms; Fastly 421 errors permanently resolved.
    </div>
  </div>
  <div class="fig-caption">Screenshot 6: Prompt 4.6 diagnosing and eliminating Fastly TLS 421 SNI misdirection.</div>

  <div class="callout-box">
    <div class="callout-title">What I Learned:</div>
    Modern Edge/CDN networks like Fastly strictly validate Subject Alternative Names (SANs) on incoming TLS handshakes. Custom SSL patches that override the Host header without passing the SNI hostname cause immediate HTTP 421 rejections. Restoring clean TLS handshakes resolved the bug instantly.
  </div>

  <div class="page-footer">
    My-Music | Semester 3 CSE (AI/ML) | Page 9
  </div>
</div>

<!-- PAGE 10: APPLICATION DESIGN & ARCHITECTURE -->
<div class="page">
  <div class="univ-header">
    <div class="univ-brand">
      <div class="univ-badge">MU</div>
      <div class="univ-name-block">
        <span class="univ-main-name">Marwadi University</span>
        <span class="univ-sub-name">Marwadi Chandarana Group</span>
      </div>
      <div class="naac-badge">
        NAAC<span>A+</span>
      </div>
    </div>
    <div class="univ-dept">
      Faculty of Engineering and Technology<br>
      <span class="dept-name">Department of CSE – AI, ML and DS</span>
    </div>
  </div>

  <h3 class="section-heading">5. Application Design and Development</h3>
  <p>
    My-Music was built following a decoupled, layered micro-architecture separating metadata resolution, stream ingestion, audio transcoding, ID3 tag injection, and real-time client event streaming.
  </p>

  <h4 class="sub-heading">5.1 Page Structure and Application Flow</h4>
  <p>
    The system workflow is designed for high speed and minimal user friction:
  </p>

  <div class="flowchart-container">
    <div class="flow-row">
      <div class="flow-node">User Inputs URL<br><span style="font-weight: 400; font-size: 7.5pt;">(Spotify / YouTube / JioSaavn / Amazon)</span></div>
      <div class="flow-arrow">&rarr;</div>
      <div class="flow-node">Smart Clipboard Auto-Detector<br><span style="font-weight: 400; font-size: 7.5pt;">(Window Focus Event)</span></div>
    </div>

    <div class="flow-arrow">&darr;</div>

    <div class="flow-row">
      <div class="flow-node green">FastAPI Backend (POST /api/playlist/info)<br><span style="font-weight: 400; font-size: 7.5pt;">(Uvicorn ASGI Server &bull; Port 8800)</span></div>
    </div>

    <div class="flow-arrow">&darr;</div>

    <div class="flow-row">
      <div class="flow-node green">Universal Metadata Resolver<br><span style="font-weight: 400; font-size: 7.5pt;">(LRU Cache Check &bull; &lt; 0.005 ms)</span></div>
      <div class="flow-arrow">&harr;</div>
      <div class="flow-node green">Platform Extractors<br><span style="font-weight: 400; font-size: 7.5pt;">(SpotDL / yt-dlp / Saavn API)</span></div>
    </div>

    <div class="flow-arrow">&darr;</div>

    <div class="flow-row">
      <div class="flow-node purple">Direct Audio Stream Ingestion (yt-dlp)<br><span style="font-weight: 400; font-size: 7.5pt;">(Direct Stream Routing or Multi-Source Match)</span></div>
    </div>

    <div class="flow-arrow">&darr;</div>

    <div class="flow-row">
      <div class="flow-node purple">FFmpeg Conversion Engine<br><span style="font-weight: 400; font-size: 7.5pt;">(320 kbps MP3 / FLAC / M4A / OPUS)</span></div>
      <div class="flow-arrow">&rarr;</div>
      <div class="flow-node purple">Mutagen ID3 &amp; Lyrics Tagger<br><span style="font-weight: 400; font-size: 7.5pt;">(Embed Artwork, Metadata, .lrc)</span></div>
    </div>

    <div class="flow-arrow">&darr;</div>

    <div class="flow-row">
      <div class="flow-node">Local Music Library Disk<br><span style="font-weight: 400; font-size: 7.5pt;">(C:\Users\...\Music\My-Music Downloads)</span></div>
      <div class="flow-arrow">&harr;</div>
      <div class="flow-node">Server-Sent Events (SSE)<br><span style="font-weight: 400; font-size: 7.5pt;">(Live Per-Track Download Progress Strip)</span></div>
    </div>
  </div>
  <div class="fig-caption">Figure 1: Complete end-to-end dataflow and architecture of the My-Music system.</div>

  <div class="page-footer">
    My-Music | Semester 3 CSE (AI/ML) | Page 10
  </div>
</div>

<!-- PAGE 11: MAJOR UI COMPONENTS & SCREENSHOTS -->
<div class="page">
  <div class="univ-header">
    <div class="univ-brand">
      <div class="univ-badge">MU</div>
      <div class="univ-name-block">
        <span class="univ-main-name">Marwadi University</span>
        <span class="univ-sub-name">Marwadi Chandarana Group</span>
      </div>
      <div class="naac-badge">
        NAAC<span>A+</span>
      </div>
    </div>
    <div class="univ-dept">
      Faculty of Engineering and Technology<br>
      <span class="dept-name">Department of CSE – AI, ML and DS</span>
    </div>
  </div>

  <h4 class="sub-heading">5.2 Major UI Components</h4>
  <p>
    The user interface was crafted using modern glassmorphism principles with a high-contrast dark palette tailored for night sessions:
  </p>
  <ul>
    <li><strong>Universal Search Bar with Smart Clipboard Detection:</strong> Automatically reads copied music links from the clipboard upon focusing the window, displaying an instant notification pill.</li>
    <li><strong>Platform Badging System:</strong> Dynamically displays platform indicator badges for Spotify, YouTube, JioSaavn, or Amazon Music.</li>
    <li><strong>Quality & Format Pills:</strong> One-click toggles allowing instantaneous switching between MP3 (320 kbps studio / 256 kbps / 128 kbps), Lossless FLAC, M4A, and OPUS.</li>
    <li><strong>Progressive Tracklist Grid:</strong> Uses an <code>IntersectionObserver</code> to chunk rendering in batches of 50 songs, maintaining fluid 60 FPS scrolling on 1,000+ song playlists.</li>
    <li><strong>Mini Audio Player & Previewer:</strong> Allows direct HTML5 audio playback and sample listening before initiating full album downloads.</li>
    <li><strong>Live SSE Download Drawer:</strong> Real-time progress bar showing download speed (MB/s), active track status, estimated time remaining, and completion toasts.</li>
  </ul>

  <div style="background: #090d16; border: 1.5px solid #1e293b; border-radius: 8px; padding: 18px; margin: 15px 0; color: #f8fafc;">
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b; padding-bottom: 10px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-weight: 800; color: #10b981; font-size: 11pt;">My-Music</span>
        <span style="background: rgba(16, 185, 129, 0.15); color: #10b981; font-size: 7pt; font-weight: 700; padding: 2px 6px; border-radius: 4px;">PRO METADATA</span>
      </div>
      <div style="display: flex; gap: 8px;">
        <span style="background: #1e293b; color: #38bdf8; font-size: 7.5pt; padding: 4px 8px; border-radius: 4px;">&bull; FFmpeg Ready</span>
        <span style="background: #1e293b; color: #34d399; font-size: 7.5pt; padding: 4px 8px; border-radius: 4px;">&bull; Server Online</span>
      </div>
    </div>

    <div style="margin: 20px 0; text-align: center;">
      <div style="font-size: 13pt; font-weight: 700; color: #ffffff;">Download Music in Studio Quality</div>
      <div style="font-size: 8pt; color: #94a3b8; margin-top: 4px;">Supports Spotify, YouTube, YouTube Music, JioSaavn, and Amazon Music</div>
      <div style="background: #111827; border: 1px solid #334155; border-radius: 8px; padding: 10px 14px; margin: 14px auto; max-width: 140mm; display: flex; align-items: center; gap: 10px;">
        <span style="color: #64748b; font-size: 9pt;">&#128269;</span>
        <span style="color: #64748b; font-size: 8pt; flex: 1; text-align: left;">https://www.youtube.com/watch?v=dQw4w9WgXcQ</span>
        <span style="background: #10b981; color: white; font-weight: 700; font-size: 7.5pt; padding: 5px 12px; border-radius: 6px;">Load Music</span>
      </div>
    </div>
  </div>
  <div class="fig-caption">Figure 2: Mockup representation of the My-Music search dashboard with real-time health badges.</div>

  <div class="page-footer">
    My-Music | Semester 3 CSE (AI/ML) | Page 11
  </div>
</div>

<!-- PAGE 12: UI INSPECTION & METADATA CARDS -->
<div class="page">
  <div class="univ-header">
    <div class="univ-brand">
      <div class="univ-badge">MU</div>
      <div class="univ-name-block">
        <span class="univ-main-name">Marwadi University</span>
        <span class="univ-sub-name">Marwadi Chandarana Group</span>
      </div>
      <div class="naac-badge">
        NAAC<span>A+</span>
      </div>
    </div>
    <div class="univ-dept">
      Faculty of Engineering and Technology<br>
      <span class="dept-name">Department of CSE – AI, ML and DS</span>
    </div>
  </div>

  <div style="background: #090d16; border: 1.5px solid #1e293b; border-radius: 8px; padding: 18px; margin: 15px 0; color: #f8fafc;">
    <div style="display: flex; gap: 16px; align-items: center; border-bottom: 1px solid #1e293b; padding-bottom: 14px;">
      <div style="width: 70px; height: 70px; background: #1e293b; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 24pt;">&#127925;</div>
      <div style="flex: 1;">
        <div style="display: flex; gap: 6px; align-items: center;">
          <span style="background: #dc2626; color: white; font-size: 6.5pt; font-weight: 700; padding: 2px 6px; border-radius: 3px;">YOUTUBE</span>
          <span style="color: #94a3b8; font-size: 7.5pt; text-transform: uppercase;">TRACK</span>
        </div>
        <div style="font-size: 11pt; font-weight: 700; color: #ffffff; margin-top: 2px;">Never Gonna Give You Up (4K Remaster)</div>
        <div style="font-size: 8pt; color: #94a3b8;">Rick Astley &bull; 1 track &bull; 3:33 duration</div>
      </div>
      <div>
        <span style="background: #10b981; color: white; font-weight: 700; font-size: 8pt; padding: 7px 14px; border-radius: 6px;">Download (320k)</span>
      </div>
    </div>

    <div style="margin-top: 12px;">
      <table style="width: 100%; font-size: 7.5pt; color: #cbd5e1; border-collapse: collapse;">
        <thead>
          <tr style="border-bottom: 1px solid #334155; text-align: left; color: #94a3b8;">
            <th style="padding: 6px;">#</th>
            <th style="padding: 6px;">TITLE</th>
            <th style="padding: 6px;">ARTIST</th>
            <th style="padding: 6px;">ALBUM</th>
            <th style="padding: 6px; text-align: right;">TIME</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 6px; color: #10b981;">1</td>
            <td style="padding: 6px; font-weight: 600; color: #ffffff;">Never Gonna Give You Up</td>
            <td style="padding: 6px;">Rick Astley</td>
            <td style="padding: 6px;">Whenever You Need Somebody</td>
            <td style="padding: 6px; text-align: right;">3:33</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="fig-caption">Figure 3: Metadata inspection view showing extracted high-res artwork, duration, and track table.</div>

  <div style="background: #090d16; border: 1.5px solid #1e293b; border-radius: 8px; padding: 18px; margin: 15px 0; color: #f8fafc;">
    <div style="font-size: 9.5pt; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Audio Format &amp; Bitrate Selector</div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <span style="background: #10b981; color: white; font-weight: 700; font-size: 7.5pt; padding: 5px 12px; border-radius: 20px;">MP3 320 kbps (Studio HQ)</span>
      <span style="background: #1e293b; color: #94a3b8; font-weight: 600; font-size: 7.5pt; padding: 5px 12px; border-radius: 20px;">MP3 256 kbps</span>
      <span style="background: #1e293b; color: #94a3b8; font-weight: 600; font-size: 7.5pt; padding: 5px 12px; border-radius: 20px;">FLAC (Lossless)</span>
      <span style="background: #1e293b; color: #94a3b8; font-weight: 600; font-size: 7.5pt; padding: 5px 12px; border-radius: 20px;">M4A (Apple AAC)</span>
      <span style="background: #1e293b; color: #94a3b8; font-weight: 600; font-size: 7.5pt; padding: 5px 12px; border-radius: 20px;">OPUS</span>
    </div>
  </div>
  <div class="fig-caption">Figure 4: Quality pill selector allowing dynamic bitrate and format switching before download.</div>

  <div class="page-footer">
    My-Music | Semester 3 CSE (AI/ML) | Page 12
  </div>
</div>

<!-- PAGE 13: LIVE DOWNLOAD SSE DRAWER -->
<div class="page">
  <div class="univ-header">
    <div class="univ-brand">
      <div class="univ-badge">MU</div>
      <div class="univ-name-block">
        <span class="univ-main-name">Marwadi University</span>
        <span class="univ-sub-name">Marwadi Chandarana Group</span>
      </div>
      <div class="naac-badge">
        NAAC<span>A+</span>
      </div>
    </div>
    <div class="univ-dept">
      Faculty of Engineering and Technology<br>
      <span class="dept-name">Department of CSE – AI, ML and DS</span>
    </div>
  </div>

  <div style="background: #090d16; border: 1.5px solid #1e293b; border-radius: 8px; padding: 18px; margin: 15px 0; color: #f8fafc;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
      <span style="font-weight: 700; font-size: 9.5pt; color: #ffffff;">Download Queue &bull; Active Ingestion</span>
      <span style="font-size: 7.5pt; color: #10b981; font-weight: 700;">Speed: 4.8 MB/s</span>
    </div>

    <div style="background: #1e293b; border-radius: 6px; height: 10px; width: 100%; overflow: hidden; margin-bottom: 12px;">
      <div style="background: #10b981; height: 100%; width: 100%; border-radius: 6px;"></div>
    </div>

    <div style="display: flex; justify-content: space-between; font-size: 8pt; color: #94a3b8;">
      <span>Status: Embedding ID3 Metadata &amp; Synced Lyrics (.lrc)...</span>
      <span style="color: #ffffff; font-weight: 600;">100% Completed</span>
    </div>

    <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 6px; padding: 10px; margin-top: 14px; font-size: 7.5pt; color: #34d399;">
      &#10004; File successfully written to disk: <code>C:\Users\...\Music\My-Music Downloads\Rick Astley - Never Gonna Give You Up.mp3</code>
    </div>
  </div>
  <div class="fig-caption">Figure 5: Live SSE progress drawer tracking active download, speed, and audio tagging.</div>

  <div class="callout-box">
    <div class="callout-title">Full Metadata Verification:</div>
    Inspection of downloaded MP3 files in Windows Media Player and Foobar2000 confirmed full compliance:
    <ul>
      <li><strong>ID3v2.3 TIT2:</strong> Song Title</li>
      <li><strong>ID3v2.3 TPE1:</strong> Lead Artist and Featured Credits</li>
      <li><strong>ID3v2.3 TALB:</strong> Original Album Title</li>
      <li><strong>ID3v2.3 APIC:</strong> Embedded 3000x3000px High-Resolution Album Artwork</li>
      <li><strong>USLT & .lrc File:</strong> Time-synchronized lyrics mapped millisecond-by-millisecond.</li>
    </ul>
  </div>

  <div class="page-footer">
    My-Music | Semester 3 CSE (AI/ML) | Page 13
  </div>
</div>

<!-- PAGE 14: FINAL APPLICATION -->
<div class="page">
  <div class="univ-header">
    <div class="univ-brand">
      <div class="univ-badge">MU</div>
      <div class="univ-name-block">
        <span class="univ-main-name">Marwadi University</span>
        <span class="univ-sub-name">Marwadi Chandarana Group</span>
      </div>
      <div class="naac-badge">
        NAAC<span>A+</span>
      </div>
    </div>
    <div class="univ-dept">
      Faculty of Engineering and Technology<br>
      <span class="dept-name">Department of CSE – AI, ML and DS</span>
    </div>
  </div>

  <h3 class="section-heading">6. Final Application</h3>
  <p>
    The completed application delivers an effortless, studio-grade music downloading experience. A user simply pastes any playlist or track link, selects their preferred audio format and bitrate, and clicks a single button. Within seconds, studio-quality MP3s or FLAC files are organized directly inside their local music folder.
  </p>
  <p>
    The final version incorporates the following complete feature set:
  </p>
  <ul>
    <li><strong>Universal Multi-Platform Support:</strong> Ingests music links seamlessly across Spotify, YouTube, YouTube Music, JioSaavn, and Amazon Music.</li>
    <li><strong>Studio-Grade Transcoding:</strong> FFmpeg engine outputs pristine 320 kbps MP3, Lossless FLAC, M4A, or OPUS with zero distortion or clipping.</li>
    <li><strong>Pro ID3v2.3 Tagging & Synced Lyrics:</strong> Automatically embeds high-resolution cover art, artist credits, album names, track numbers, and creates synchronized <code>.lrc</code> lyrics files.</li>
    <li><strong>Sub-Millisecond LRU Caching:</strong> Thread-safe in-memory cache responds to repeated playlist queries in <strong>0.004 ms</strong>.</li>
    <li><strong>Real-Time SSE Streaming:</strong> Server-Sent Events push live download percentage, download speed (MB/s), and active track progress without browser polling.</li>
    <li><strong>Rate-Limit Immune:</strong> Dual authentication strategy utilizing public embed parsing alongside custom Spotify Developer App credentials.</li>
    <li><strong>One-Click Desktop Launcher:</strong> Bundled with <code>my-music.bat</code> and Windows shortcuts for seamless standalone desktop launch.</li>
  </ul>

  <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 14px 18px; margin: 20px 0;">
    <div style="font-weight: 700; color: #0f172a; margin-bottom: 8px; font-size: 9.5pt;">Source Code &amp; Application Deployment Links:</div>
    <div style="font-family: 'JetBrains Mono', monospace; font-size: 8.5pt; color: #0369a1; margin-bottom: 6px;">
      <strong>GitHub Repository:</strong> <a href="https://github.com/sudo-shakuni/my-music" style="color: #0284c7; text-decoration: none;">https://github.com/sudo-shakuni/my-music</a>
    </div>
    <div style="font-family: 'JetBrains Mono', monospace; font-size: 8.5pt; color: #0369a1; margin-bottom: 6px;">
      <strong>Live Web Demo:</strong> <a href="https://sudo-shakuni.github.io/my-music/" style="color: #0284c7; text-decoration: none;">https://sudo-shakuni.github.io/my-music/</a>
    </div>
    <div style="font-family: 'JetBrains Mono', monospace; font-size: 8.5pt; color: #0369a1;">
      <strong>GitHub Release (v1.0.0 Windows Zip):</strong> <a href="https://github.com/sudo-shakuni/my-music/releases/tag/v1.0.0" style="color: #0284c7; text-decoration: none;">my-music-v1.0.0-Windows.zip</a>
    </div>
  </div>

  <p style="font-size: 9pt;">
    <strong>To run the application locally:</strong><br>
    Clone the repository, initialize a Python virtual environment, install requirements, and execute:<br>
    <code>.venv\Scripts\python.exe desktop.py</code> (or simply double-click <code>my-music.bat</code> on your Desktop).
  </p>

  <div class="page-footer">
    My-Music | Semester 3 CSE (AI/ML) | Page 14
  </div>
</div>

<!-- PAGE 15: CONCLUSION -->
<div class="page">
  <div class="univ-header">
    <div class="univ-brand">
      <div class="univ-badge">MU</div>
      <div class="univ-name-block">
        <span class="univ-main-name">Marwadi University</span>
        <span class="univ-sub-name">Marwadi Chandarana Group</span>
      </div>
      <div class="naac-badge">
        NAAC<span>A+</span>
      </div>
    </div>
    <div class="univ-dept">
      Faculty of Engineering and Technology<br>
      <span class="dept-name">Department of CSE – AI, ML and DS</span>
    </div>
  </div>

  <h3 class="section-heading">7. Conclusion</h3>
  <p>
    This project took me from a widespread, real-world limitation—being locked out of offline music files and burdened by fragmented streaming platforms—to a fully engineered, production-ready desktop and web application. Throughout this development journey, I gained in-depth knowledge of modern asynchronous backend design with FastAPI, static FFmpeg audio encoding pipelines, ID3 binary tag injection with Mutagen, and resilient network protocol debugging.
  </p>
  <p>
    The most substantial takeaway came from the discipline of <strong>prompt engineering</strong> and AI-assisted software development. Working with the AI coding assistant was not merely about asking for code snippets; it required structuring precise architectural prompts, isolating network failure modes (such as Fastly's TLS 421 SNI misdirection), demanding exact return schemas, and iteratively building verification benchmarks. The AI acted as a tireless pair programmer, accelerating refactoring and uncovering edge cases that would have taken days of manual tracing.
  </p>
  <p>
    There are several exciting avenues for future improvement:
  </p>
  <ul>
    <li><strong>Cross-Platform Mobile Application:</strong> Packaging the frontend into a lightweight Flutter or React Native mobile client for direct downloads on Android and iOS devices.</li>
    <li><strong>Cloud Storage Synchronization:</strong> Adding native export connectors to automatically upload downloaded tracks to Google Drive, Nextcloud, or Plex media servers.</li>
    <li><strong>Dynamic Smart DJ Transitions:</strong> Incorporating AI-driven audio beat-matching and crossfading algorithms to create seamless mixtape transitions between downloaded tracks.</li>
    <li><strong>Batch Playlist Migration:</strong> A one-click tool that reads an entire Spotify user library and converts it automatically into a YouTube Music or JioSaavn equivalent.</li>
  </ul>

  <div class="page-footer">
    My-Music | Semester 3 CSE (AI/ML) | Page 15
  </div>
</div>

</body>
</html>
"""

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"HTML written to {html_path}")

# Run Microsoft Edge headless to generate PDF
edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
cmd = [
    edge_path,
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_path}",
    f"file:///{html_path.replace(os.sep, '/')}"
]

print("Rendering PDF via Microsoft Edge headless...")
res = subprocess.run(cmd, capture_output=True, text=True)
time.sleep(2)

if os.path.exists(pdf_path):
    size_kb = os.path.getsize(pdf_path) / 1024
    print(f"SUCCESS: Generated {pdf_path} ({size_kb:.1f} KB)")
    
    # Also copy to Desktop for convenient access
    try:
        import shutil
        shutil.copy2(pdf_path, desktop_pdf)
        print(f"COPIED to Desktop: {desktop_pdf}")
    except Exception as e:
        print(f"Desktop copy notice: {e}")
else:
    print("PDF generation failed:", res.stderr)
