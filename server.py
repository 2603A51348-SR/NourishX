#!/usr/bin/env python3
"""
NourishX - Full-Stack Backend Server & REST API
Provides persistent database endpoints (SQLite) and Supabase Cloud Proxy.
Serves static assets and provides REST API on http://localhost:8000
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import json
import sqlite3
import urllib.request
import urllib.error
from datetime import datetime, date

# Ensure UTF-8 output on Windows terminals
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(DIRECTORY, "nourishx.db")

SUPABASE_URL = "https://uxqchiiiirqyukmekyax.supabase.co"
SUPABASE_KEY = "sb_publishable_vcII6FFJrwFGOXp7TFX1oA_uUKgJY3l"

# ============================================================================
# DATABASE INITIALIZATION (SQLite)
# ============================================================================

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # 1. Meals Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS meals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT,
        calories INTEGER NOT NULL DEFAULT 0,
        protein REAL NOT NULL DEFAULT 0,
        carbs REAL NOT NULL DEFAULT 0,
        fat REAL NOT NULL DEFAULT 0,
        fiber REAL NOT NULL DEFAULT 0,
        sugar REAL NOT NULL DEFAULT 0,
        sodium REAL NOT NULL DEFAULT 0,
        nutri_score TEXT DEFAULT 'A',
        nova_group INTEGER DEFAULT 1,
        portion TEXT,
        logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # 2. Daily Logs Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS daily_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        log_date TEXT UNIQUE NOT NULL,
        calories_consumed INTEGER NOT NULL DEFAULT 0,
        protein REAL NOT NULL DEFAULT 0,
        carbs REAL NOT NULL DEFAULT 0,
        fat REAL NOT NULL DEFAULT 0,
        fiber REAL NOT NULL DEFAULT 0,
        water_drank INTEGER NOT NULL DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # 3. User Targets Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS user_targets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        calories INTEGER NOT NULL DEFAULT 2150,
        protein REAL NOT NULL DEFAULT 135,
        carbs REAL NOT NULL DEFAULT 230,
        fat REAL NOT NULL DEFAULT 65,
        fiber REAL NOT NULL DEFAULT 35,
        water_glasses INTEGER NOT NULL DEFAULT 8,
        goal TEXT DEFAULT 'maintain',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # 4. Chat History Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS chat_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # Seed initial user target if empty
    cursor.execute("SELECT COUNT(*) FROM user_targets")
    if cursor.fetchone()[0] == 0:
        cursor.execute("""
        INSERT INTO user_targets (calories, protein, carbs, fat, fiber, water_glasses, goal)
        VALUES (2150, 135, 230, 65, 35, 8, 'maintain')
        """)

    conn.commit()
    conn.close()
    print("[NourishX Backend] SQLite database initialized successfully at nourishx.db")

# ============================================================================
# FORWARDING TO SUPABASE
# ============================================================================

def forward_to_supabase(table, payload):
    """Asynchronously forwards record to Supabase if configured."""
    try:
        url = f"{SUPABASE_URL}/rest/v1/{table}"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
        }
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(url, data=data, headers=headers, method="POST")
        with urllib.request.urlopen(req, timeout=3) as resp:
            return resp.status in (200, 201, 204)
    except Exception as e:
        # Non-blocking: local database remains the source of truth
        return False

# ============================================================================
# HTTP REQUEST HANDLER WITH REST API
# ============================================================================

class NourishXHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def _send_json(self, data, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def do_GET(self):
        # API Routes
        if self.path == "/api/status":
            self._handle_status()
        elif self.path == "/api/meals":
            self._handle_get_meals()
        elif self.path.startswith("/api/daily_log"):
            self._handle_get_daily_log()
        elif self.path == "/api/targets":
            self._handle_get_targets()
        elif self.path == "/api/chat":
            self._handle_get_chat()
        else:
            # Fallback to static files
            super().do_GET()

    def do_POST(self):
        # Read JSON body
        content_length = int(self.headers.get("Content-Length", 0))
        body_bytes = self.rfile.read(content_length) if content_length > 0 else b"{}"
        try:
            body = json.loads(body_bytes.decode("utf-8"))
        except Exception:
            body = {}

        if self.path == "/api/meals":
            self._handle_post_meal(body)
        elif self.path == "/api/daily_log":
            self._handle_post_daily_log(body)
        elif self.path == "/api/targets":
            self._handle_post_targets(body)
        elif self.path == "/api/chat":
            self._handle_post_chat(body)
        else:
            self._send_json({"error": "Endpoint not found"}, status=404)

    # ------------------ API Endpoints Implementations ------------------

    def _handle_status(self):
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM meals")
        meal_count = cursor.fetchone()[0]
        conn.close()

        self._send_json({
            "status": "online",
            "server": "NourishX Python Backend",
            "database": "SQLite (nourishx.db)",
            "supabase_url": SUPABASE_URL,
            "meals_logged": meal_count,
            "timestamp": datetime.now().isoformat()
        })

    def _handle_get_meals(self):
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM meals ORDER BY id DESC LIMIT 50")
        rows = [dict(r) for r in cursor.fetchall()]
        conn.close()
        self._send_json({"meals": rows})

    def _handle_post_meal(self, data):
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("""
        INSERT INTO meals (name, category, calories, protein, carbs, fat, fiber, sugar, sodium, nutri_score, nova_group, portion)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data.get("name", "Custom Meal"),
            data.get("category", "Logged Meal"),
            data.get("calories", 0),
            data.get("protein", 0),
            data.get("carbs", 0),
            data.get("fat", 0),
            data.get("fiber", 0),
            data.get("sugar", 0),
            data.get("sodium", 0),
            data.get("nutri_score", "A"),
            data.get("nova_group", 1),
            data.get("portion", "1 serving")
        ))
        meal_id = cursor.lastrowid
        conn.commit()
        conn.close()

        # Forward to Supabase in background
        forward_to_supabase("meals", data)

        self._send_json({"success": True, "id": meal_id, "message": "Meal logged to backend"})

    def _handle_get_daily_log(self):
        today = date.today().isoformat()
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM daily_logs WHERE log_date = ?", (today,))
        row = cursor.fetchone()
        conn.close()

        if row:
            self._send_json(dict(row))
        else:
            self._send_json({
                "log_date": today,
                "calories_consumed": 0,
                "protein": 0,
                "carbs": 0,
                "fat": 0,
                "fiber": 0,
                "water_drank": 0
            })

    def _handle_post_daily_log(self, data):
        today = date.today().isoformat()
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("""
        INSERT INTO daily_logs (log_date, calories_consumed, protein, carbs, fat, fiber, water_drank, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(log_date) DO UPDATE SET
            calories_consumed = excluded.calories_consumed,
            protein = excluded.protein,
            carbs = excluded.carbs,
            fat = excluded.fat,
            fiber = excluded.fiber,
            water_drank = excluded.water_drank,
            updated_at = CURRENT_TIMESTAMP
        """, (
            today,
            data.get("calories", 0),
            data.get("protein", 0),
            data.get("carbs", 0),
            data.get("fat", 0),
            data.get("fiber", 0),
            data.get("waterDrank", 0)
        ))
        conn.commit()
        conn.close()

        # Forward to Supabase
        forward_to_supabase("daily_logs", {
            "log_date": today,
            "calories_consumed": data.get("calories", 0),
            "protein": data.get("protein", 0),
            "carbs": data.get("carbs", 0),
            "fat": data.get("fat", 0),
            "fiber": data.get("fiber", 0),
            "water_drank": data.get("waterDrank", 0)
        })

        self._send_json({"success": True, "message": "Daily log updated in backend"})

    def _handle_get_targets(self):
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM user_targets ORDER BY id DESC LIMIT 1")
        row = cursor.fetchone()
        conn.close()

        if row:
            self._send_json(dict(row))
        else:
            self._send_json({"calories": 2150, "protein": 135, "carbs": 230, "fat": 65, "fiber": 35, "water_glasses": 8})

    def _handle_post_targets(self, data):
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("""
        INSERT INTO user_targets (calories, protein, carbs, fat, fiber, water_glasses, goal)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            data.get("calories", 2150),
            data.get("protein", 135),
            data.get("carbs", 230),
            data.get("fat", 65),
            data.get("fiber", 35),
            data.get("waterGlasses", 8),
            data.get("goal", "maintain")
        ))
        conn.commit()
        conn.close()

        # Forward to Supabase
        forward_to_supabase("user_targets", data)

        self._send_json({"success": True, "message": "Targets saved in backend"})

    def _handle_get_chat(self):
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM chat_history ORDER BY id ASC LIMIT 50")
        rows = [dict(r) for r in cursor.fetchall()]
        conn.close()
        self._send_json({"chat": rows})

    def _handle_post_chat(self, data):
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("""
        INSERT INTO chat_history (sender, message) VALUES (?, ?)
        """, (data.get("sender", "user"), data.get("message", "")))
        conn.commit()
        conn.close()

        forward_to_supabase("chat_history", data)
        self._send_json({"success": True})

# ============================================================================
# SERVER RUNNER
# ============================================================================

def run_server():
    os.chdir(DIRECTORY)
    init_db()

    try:
        with socketserver.TCPServer(("", PORT), NourishXHandler) as httpd:
            url = f"http://localhost:{PORT}"
            print("=" * 65)
            print("[NourishX] Full-Stack AI Nutrition Backend & REST API")
            print("=" * 65)
            print(f"[+] Server is live at: {url}")
            print(f"[+] REST API endpoints:")
            print(f"    - GET/POST  {url}/api/meals")
            print(f"    - GET/POST  {url}/api/daily_log")
            print(f"    - GET/POST  {url}/api/targets")
            print(f"    - GET/POST  {url}/api/chat")
            print(f"    - GET       {url}/api/status")
            print(f"[+] Supabase Project: {SUPABASE_URL}")
            print(f"[+] Opening browser automatically...")
            print(f"[+] Press Ctrl+C to stop the server.")
            print("=" * 65)
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
