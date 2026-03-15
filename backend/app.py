import asyncio
import base64
import io
import os
import uuid
from contextlib import asynccontextmanager
from datetime import datetime

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse

from backend.analyzer import get_image_from_esp32, analyze_leaf, check_esp32_connection
from backend.database import (
    init_db,
    save_scan,
    get_history,
    get_stats,
    get_all_settings,
    update_setting,
)
from backend.config import CAPTURED_IMAGES_DIR

os.makedirs(CAPTURED_IMAGES_DIR, exist_ok=True)

auto_scan_task = None
connected_clients: list[WebSocket] = []


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield
    global auto_scan_task
    if auto_scan_task:
        auto_scan_task.cancel()


app = FastAPI(title="Plant Disease Monitor", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/images", StaticFiles(directory=CAPTURED_IMAGES_DIR), name="images")


async def broadcast(message: dict):
    import json
    data = json.dumps(message)
    disconnected = []
    for client in connected_clients:
        try:
            await client.send_text(data)
        except Exception:
            disconnected.append(client)
    for client in disconnected:
        connected_clients.remove(client)


async def perform_scan():
    try:
        image = get_image_from_esp32()
        analysis = analyze_leaf(image)

        infection_percent = analysis["infection_percent"]
        is_leaf = analysis["is_leaf"]
        plant_type = analysis["plant_type"]
        message = analysis["message"]

        filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{uuid.uuid4().hex[:6]}.jpg"
        filepath = os.path.join(CAPTURED_IMAGES_DIR, filename)
        image.save(filepath, "JPEG")

        scan_id = await save_scan(filename, infection_percent, is_leaf, plant_type, message)

        buf = io.BytesIO()
        image.save(buf, format="JPEG")
        image_b64 = base64.b64encode(buf.getvalue()).decode("utf-8")

        settings = await get_all_settings()
        threshold = int(settings.get("alert_threshold", "50"))
        alert = is_leaf and infection_percent >= threshold

        result = {
            "type": "scan_result",
            "id": scan_id,
            "timestamp": datetime.now().isoformat(),
            "infection_percent": infection_percent,
            "image": image_b64,
            "image_path": filename,
            "is_leaf": is_leaf,
            "plant_type": plant_type,
            "message": message,
            "alert": alert,
            "threshold": threshold,
        }

        await broadcast(result)
        return result

    except Exception as e:
        error = {"type": "error", "message": str(e)}
        await broadcast(error)
        return error


async def auto_scan_loop():
    while True:
        settings = await get_all_settings()
        if settings.get("auto_scan") == "true":
            await perform_scan()
        interval = int(settings.get("scan_interval", "30"))
        await asyncio.sleep(interval)


@app.post("/api/capture")
async def capture():
    result = await perform_scan()
    if result.get("type") == "error":
        return JSONResponse(status_code=500, content=result)
    return result


@app.get("/api/history")
async def history(limit: int = 50, offset: int = 0):
    records = await get_history(limit, offset)
    return {"records": records}


@app.get("/api/stats")
async def stats():
    return await get_stats()


@app.get("/api/settings")
async def get_settings():
    return await get_all_settings()


@app.post("/api/settings")
async def post_settings(body: dict):
    global auto_scan_task

    for key, value in body.items():
        await update_setting(key, str(value))

    if "auto_scan" in body:
        if body["auto_scan"] == "true" or body["auto_scan"] is True:
            if auto_scan_task is None or auto_scan_task.done():
                auto_scan_task = asyncio.create_task(auto_scan_loop())
        else:
            if auto_scan_task and not auto_scan_task.done():
                auto_scan_task.cancel()
                auto_scan_task = None

    return await get_all_settings()


@app.get("/api/status")
async def status():
    connected = check_esp32_connection()
    return {"esp32_connected": connected}


@app.websocket("/ws/live")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    connected_clients.append(ws)
    try:
        while True:
            data = await ws.receive_text()
            if data == "ping":
                await ws.send_text('{"type": "pong"}')
    except WebSocketDisconnect:
        connected_clients.remove(ws)
    except Exception:
        if ws in connected_clients:
            connected_clients.remove(ws)
