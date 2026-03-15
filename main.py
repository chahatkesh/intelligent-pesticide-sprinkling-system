import requests
from PIL import Image
import io
from google import genai
from backend.config import ESP32_CAM_URL, GEMINI_API_KEY

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY must be set in your environment or .env file.")

# Configure Gemini
client = genai.Client(api_key=GEMINI_API_KEY)

def get_image_from_esp32():
    response = requests.get(ESP32_CAM_URL, timeout=5)
    response.raise_for_status()
    return Image.open(io.BytesIO(response.content))

def analyze_leaf_infection(image):
    prompt = """
You are an agricultural plant disease detection system.

Rules:
- If the image is NOT a plant leaf, return ONLY: 0
- If the image is a plant leaf:
  - Estimate visible infection/disease percentage
  - Return a SINGLE INTEGER between 0 and 100
  - No explanation, no text, only the number

Examples:
Leaf looks healthy → 0
Minor spots → 15
Moderate infection → 45
Severe infection → 80
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[prompt, image],
    )
    result = response.text.strip()

    try:
        value = int(result)
        return max(0, min(100, value))
    except:
        return 0

def main():
    try:
        image = get_image_from_esp32()
        infection_percent = analyze_leaf_infection(image)
        print(f"Infection Percentage: {infection_percent}%")
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    main()