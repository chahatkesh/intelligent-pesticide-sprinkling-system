import os
from dotenv import load_dotenv

load_dotenv()

ESP32_CAM_URL = os.getenv("ESP32_CAM_URL", "http://10.231.180.104/capture")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
DATABASE_PATH = os.getenv("DATABASE_PATH", "backend/plant_monitor.db")
CAPTURED_IMAGES_DIR = os.getenv("CAPTURED_IMAGES_DIR", "backend/captured_images")

# Arduino UNO over USB serial. Leave ARDUINO_PORT empty to auto-detect.
# macOS examples: /dev/cu.usbmodem14101 or /dev/cu.usbserial-1420
ARDUINO_PORT = os.getenv("ARDUINO_PORT", "")
ARDUINO_BAUD = int(os.getenv("ARDUINO_BAUD", "115200"))
