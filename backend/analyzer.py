import json
import requests
from PIL import Image
import io
from google import genai
from backend.config import ESP32_CAM_URL, GEMINI_API_KEY

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY must be set in your environment or .env file.")

client = genai.Client(api_key=GEMINI_API_KEY)

ANALYSIS_PROMPT = """
You are an agricultural plant disease detection system.

Analyze the given image and respond with ONLY a JSON object (no markdown, no extra text).

Rules:
- If the image is NOT a plant/leaf at all, return:
  {"is_leaf": false, "plant_type": null, "infection_percent": 0, "message": "This is not a plant leaf. Please capture a clear image of a plant leaf for analysis."}

- If the image IS a plant leaf:
  - Identify the plant type (e.g., Tomato, Potato, Mango, Rice, Wheat, Corn, Grape, Apple, Pepper, Citrus, etc.)
  - Estimate visible infection/disease percentage (0-100)
  - Return:
  {"is_leaf": true, "plant_type": "<plant name>", "infection_percent": <number>, "message": null}

Examples:
- Healthy tomato leaf → {"is_leaf": true, "plant_type": "Tomato", "infection_percent": 0, "message": null}
- Infected potato leaf → {"is_leaf": true, "plant_type": "Potato", "infection_percent": 45, "message": null}
- A photo of a car → {"is_leaf": false, "plant_type": null, "infection_percent": 0, "message": "This is not a plant leaf. Please capture a clear image of a plant leaf for analysis."}
"""


def get_image_from_esp32() -> Image.Image:
    response = requests.get(ESP32_CAM_URL, timeout=5)
    response.raise_for_status()
    return Image.open(io.BytesIO(response.content))


def analyze_leaf(image: Image.Image) -> dict:
    """Returns dict with keys: is_leaf, plant_type, infection_percent, message"""
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[ANALYSIS_PROMPT, image],
    )
    result = response.text.strip()

    # Strip markdown code fences if present
    if result.startswith("```"):
        result = result.split("\n", 1)[1] if "\n" in result else result[3:]
        if result.endswith("```"):
            result = result[:-3]
        result = result.strip()

    try:
        data = json.loads(result)
        return {
            "is_leaf": bool(data.get("is_leaf", False)),
            "plant_type": data.get("plant_type"),
            "infection_percent": max(0, min(100, int(data.get("infection_percent", 0)))),
            "message": data.get("message"),
        }
    except (json.JSONDecodeError, ValueError, TypeError):
        return {
            "is_leaf": False,
            "plant_type": None,
            "infection_percent": 0,
            "message": "Could not analyze the image. Please try again.",
        }


def check_esp32_connection() -> bool:
    try:
        response = requests.get(ESP32_CAM_URL, timeout=3)
        return response.status_code == 200
    except Exception:
        return False
