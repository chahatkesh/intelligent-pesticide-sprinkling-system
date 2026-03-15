# Plant Disease Detection Monitor

IoT-powered plant health monitoring system using ESP32-CAM and Google Gemini AI.

## Setup

### Backend

```bash
pip install -r backend/requirements.txt
python run.py
```

The backend runs on http://localhost:8000

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on http://localhost:5173 (proxies API calls to backend)

## Usage

1. Start the backend server first
2. Start the frontend dev server
3. Open http://localhost:5173 in your browser
4. Use "Scan Now" to capture and analyze a leaf image
5. Enable "Auto-Scan" for continuous monitoring
