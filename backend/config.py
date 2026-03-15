import os
from dotenv import load_dotenv

load_dotenv()

ESP32_CAM_URL = os.getenv("ESP32_CAM_URL", "http://10.231.180.104/capture")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
DATABASE_PATH = os.getenv("DATABASE_PATH", "backend/plant_monitor.db")
CAPTURED_IMAGES_DIR = os.getenv("CAPTURED_IMAGES_DIR", "backend/captured_images")
