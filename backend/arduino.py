"""
Runtime serial communication with the Arduino UNO.

Keeps a single persistent serial connection open (the Arduino resets every
time the port is opened, so we avoid reopening it on every capture). Sends the
infection percentage as a newline-terminated integer (e.g. b"72\\n") and reads
back the "OK:<value>" acknowledgement.

All errors are caught and returned as a structured dict so a serial problem can
never crash a scan.
"""
import logging
import re
import threading
import time

try:
    import serial
    from serial.tools import list_ports
except ImportError:  # pyserial not installed yet
    serial = None
    list_ports = None

from backend.config import ARDUINO_PORT, ARDUINO_BAUD

logger = logging.getLogger("arduino")

# Keywords commonly seen in USB serial device descriptions for UNO/clones.
_PORT_HINTS = (
    "arduino", "usbmodem", "usbserial", "wch", "ch340",
    "ch341", "ttyacm", "ttyusb", "cp210",
)


def coerce_infection(value) -> int:
    """Robustly turn a Gemini result into an int 0..100.

    Accepts: 72, "72", "72%", "The infection is 72%", "infection: 72 percent".
    Falls back to 0 if no valid number is found.
    """
    if isinstance(value, bool):
        value = int(value)
    if isinstance(value, (int, float)):
        num = int(value)
    else:
        match = re.search(r"\d{1,3}", str(value))
        num = int(match.group()) if match else 0
    return max(0, min(100, num))


class ArduinoController:
    def __init__(self, port: str = "", baud: int = 115200):
        self.port = port
        self.baud = baud
        self._conn = None
        self._lock = threading.Lock()

    def _autodetect_port(self):
        if not list_ports:
            return None
        for p in list_ports.comports():
            blob = f"{p.device} {p.description} {p.manufacturer or ''}".lower()
            if any(hint in blob for hint in _PORT_HINTS):
                return p.device
        return None

    def _ensure_connection(self):
        if serial is None:
            raise RuntimeError(
                "pyserial is not installed. Run: pip install pyserial"
            )
        if self._conn is not None and self._conn.is_open:
            return self._conn

        port = self.port or self._autodetect_port()
        if not port:
            raise RuntimeError(
                "No Arduino serial port set or detected. "
                "Set ARDUINO_PORT in .env (e.g. /dev/cu.usbmodem14101)."
            )

        # timeout = read timeout (for the ack), write_timeout guards blocking writes.
        self._conn = serial.Serial(
            port=port, baudrate=self.baud, timeout=2, write_timeout=2
        )
        # Opening the port resets the UNO; wait for the bootloader, then flush.
        time.sleep(2)
        self._conn.reset_input_buffer()
        self._conn.reset_output_buffer()
        logger.info("Arduino connected on %s @ %d baud", port, self.baud)
        return self._conn

    def _close(self):
        try:
            if self._conn:
                self._conn.close()
        except Exception:
            pass
        self._conn = None

    def send_infection(self, value) -> dict:
        """Send infection % to Arduino. Returns a structured result dict.

        Result keys: ok (bool), sent (int), ack (str|None), port (str|None),
        error (str, only on failure).
        """
        infection = coerce_infection(value)
        with self._lock:
            try:
                conn = self._ensure_connection()
                conn.reset_input_buffer()
                conn.write(f"{infection}\n".encode())
                conn.flush()

                # Read the "OK:<value>" acknowledgement (best effort).
                ack = conn.readline().decode(errors="ignore").strip()
                return {
                    "ok": True,
                    "sent": infection,
                    "ack": ack or None,
                    "port": conn.port,
                }
            except PermissionError as e:
                self._close()
                return {
                    "ok": False, "sent": infection,
                    "error": (
                        f"Permission denied on serial port ({e}). "
                        "Close the Arduino IDE Serial Monitor and check port permissions."
                    ),
                }
            except Exception as e:
                # Drop the connection so the next call retries cleanly.
                self._close()
                return {
                    "ok": False,
                    "sent": infection,
                    "error": f"{type(e).__name__}: {e}",
                }


# Singleton used across the app.
controller = ArduinoController(ARDUINO_PORT, ARDUINO_BAUD)
