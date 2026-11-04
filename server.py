#!/usr/bin/env python3
"""
NourishX Local Server Runner
Serves the NourishX AI Nutrition Assistant website on http://localhost:8000
"""

import http.server
import socketserver
import webbrowser
import os
import sys

# Ensure UTF-8 output on Windows terminals
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and disable caching during dev/hackathon demo
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

def run_server():
    os.chdir(DIRECTORY)
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            url = f"http://localhost:{PORT}"
            print("=" * 60)
            print("[NourishX] AI Nutrition Assistant & Balanced Diet Engine")
            print("=" * 60)
            print(f"[+] Server is live at: {url}")
            print("[+] Opening browser automatically...")
            print("[+] Press Ctrl+C to stop the server.")
            print("=" * 60)
            try:
                webbrowser.open(url)
            except Exception:
                pass
            httpd.serve_forever()
    except OSError as e:
        print(f"Port {PORT} error: {e}")
        print("Tip: If port 8000 is occupied, you can also directly double-click index.html!")

if __name__ == "__main__":
    run_server()
