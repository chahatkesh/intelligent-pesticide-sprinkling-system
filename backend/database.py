import aiosqlite
import os
from datetime import datetime
from backend.config import DATABASE_PATH

DB_PATH = DATABASE_PATH


async def init_db():
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS scans (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT NOT NULL,
                image_path TEXT,
                infection_percent INTEGER NOT NULL,
                is_leaf INTEGER NOT NULL DEFAULT 1,
                plant_type TEXT,
                message TEXT
            )
        """)
        await db.execute("""
            CREATE TABLE IF NOT EXISTS settings (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL
            )
        """)
        # Migrate: add columns if they don't exist (for existing databases)
        try:
            await db.execute("ALTER TABLE scans ADD COLUMN plant_type TEXT")
        except Exception:
            pass
        try:
            await db.execute("ALTER TABLE scans ADD COLUMN message TEXT")
        except Exception:
            pass

        await db.execute("""
            INSERT OR IGNORE INTO settings (key, value) VALUES ('auto_scan', 'false')
        """)
        await db.execute("""
            INSERT OR IGNORE INTO settings (key, value) VALUES ('scan_interval', '30')
        """)
        await db.execute("""
            INSERT OR IGNORE INTO settings (key, value) VALUES ('alert_threshold', '50')
        """)
        await db.commit()


async def save_scan(image_path: str, infection_percent: int, is_leaf: bool = True, plant_type: str = None, message: str = None):
    async with aiosqlite.connect(DB_PATH) as db:
        timestamp = datetime.now().isoformat()
        await db.execute(
            "INSERT INTO scans (timestamp, image_path, infection_percent, is_leaf, plant_type, message) VALUES (?, ?, ?, ?, ?, ?)",
            (timestamp, image_path, infection_percent, 1 if is_leaf else 0, plant_type, message),
        )
        await db.commit()
        cursor = await db.execute("SELECT last_insert_rowid()")
        row = await cursor.fetchone()
        return row[0]


async def get_history(limit: int = 50, offset: int = 0):
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute(
            "SELECT * FROM scans ORDER BY timestamp DESC LIMIT ? OFFSET ?",
            (limit, offset),
        )
        rows = await cursor.fetchall()
        return [dict(row) for row in rows]


async def get_stats():
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute("SELECT COUNT(*) FROM scans")
        total = (await cursor.fetchone())[0]

        cursor = await db.execute("SELECT AVG(infection_percent) FROM scans WHERE is_leaf = 1")
        avg_infection = (await cursor.fetchone())[0] or 0

        cursor = await db.execute(
            "SELECT timestamp, infection_percent FROM scans WHERE is_leaf = 1 ORDER BY timestamp DESC LIMIT 50"
        )
        rows = await cursor.fetchall()
        trend_data = [{"timestamp": row[0], "infection": row[1]} for row in rows]
        trend_data.reverse()

        return {
            "total_scans": total,
            "avg_infection": round(avg_infection, 1),
            "trend_data": trend_data,
        }


async def get_setting(key: str) -> str:
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute("SELECT value FROM settings WHERE key = ?", (key,))
        row = await cursor.fetchone()
        return row[0] if row else None


async def update_setting(key: str, value: str):
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            "INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",
            (key, value),
        )
        await db.commit()


async def get_all_settings():
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute("SELECT key, value FROM settings")
        rows = await cursor.fetchall()
        return {row[0]: row[1] for row in rows}
