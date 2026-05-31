/*
 * Plant Infection Monitor - Arduino UNO
 *
 * Receives the infection percentage (0-100) from the Python dashboard over
 * USB serial as a newline-terminated integer (e.g. "72\n"), then drives the
 * 7-segment display, RGB LED, servo valve and L298N pump.
 *
 * Upload this sketch ONCE. After that Python sends new values live over serial.
 * Do NOT keep the Arduino IDE Serial Monitor open while Python uses the port.
 *
 * Serial protocol:
 *   PC -> Arduino : "<int>\n"      e.g. "72\n"
 *   Arduino -> PC : "OK:<int>\n"   e.g. "OK:72\n"
 */

#include <Servo.h>
#include <EEPROM.h>

Servo valveServo;

/* -------- Segment & Digit Pins -------- */
int segPins[7]   = {2, 4, 7, 8, 11, 12, 13};
int digitPins[4] = {A0, A1, A2, A3};

/* -------- RGB LED Pins -------- */
int redLED   = 3;
int greenLED = 5;
int blueLED  = 6;

/* -------- Servo -------- */
int servoPin = 9;

/* -------- L298N Pump Pins (UNO Correct) -------- */
int pumpENA = 10;   // Enable (PWM)
int pumpIN1 = A4;   // Direction
int pumpIN2 = A5;   // Direction

/* -------- EEPROM -------- */
const int EEPROM_ADDR = 0;   // where the last infection value is stored

/* -------- Display patterns (LOW = ON) -------- */
byte numbers[10][7] = {
  {0,0,0,0,0,0,1}, // 0
  {1,0,0,1,1,1,1}, // 1
  {0,0,1,0,0,1,0}, // 2
  {0,0,0,0,1,1,0}, // 3
  {1,0,0,1,1,0,0}, // 4
  {0,1,0,0,1,0,0}, // 5
  {0,1,0,0,0,0,0}, // 6
  {0,0,0,1,1,1,1}, // 7
  {0,0,0,0,0,0,0}, // 8
  {0,0,0,0,1,0,0}  // 9
};

/* -------- Infection Percentage --------
 * Live value, updated over serial. Starts from the last saved EEPROM value
 * on reset (or 0 if EEPROM has never been written).
 */
int infection = 0;

/* -------- Serial parsing state (non-blocking) -------- */
long  rxValue   = 0;      // accumulated incoming number
bool  rxHasDigit = false; // have we seen at least one digit?

/* -------- Display ONE digit -------- */
void showDigit(int digitIndex, int number) {

  // Turn OFF all digits
  for (int i = 0; i < 4; i++)
    digitalWrite(digitPins[i], LOW);

  // Set segments (LOW = ON)
  for (int s = 0; s < 7; s++)
    digitalWrite(segPins[s], numbers[number][s]);

  // Enable selected digit
  digitalWrite(digitPins[digitIndex], HIGH);
}

/* -------- Apply a new infection value -------- */
void setInfection(int value) {
  if (value < 0)   value = 0;
  if (value > 100) value = 100;
  infection = value;

  // Persist only when changed (EEPROM.update avoids needless write wear).
  EEPROM.update(EEPROM_ADDR, (byte)infection);

  // Acknowledge back to Python.
  Serial.print("OK:");
  Serial.println(infection);
}

/* -------- Non-blocking serial reader --------
 * Reads whatever bytes are available this loop pass. Builds up an integer and
 * commits it when a newline (or carriage return) arrives.
 */
void readSerial() {
  while (Serial.available() > 0) {
    char c = Serial.read();

    if (c >= '0' && c <= '9') {
      rxValue = rxValue * 10 + (c - '0');
      if (rxValue > 100000) rxValue = 100000;  // overflow guard
      rxHasDigit = true;
    }
    else if (c == '\n' || c == '\r') {
      if (rxHasDigit) {
        setInfection((int)rxValue);
      }
      rxValue = 0;
      rxHasDigit = false;
    }
    // any other character is ignored
  }
}

void setup() {

  /* ---- Serial ---- */
  Serial.begin(115200);

  /* ---- Pin modes FIRST ---- */
  for (int i = 0; i < 7; i++) pinMode(segPins[i], OUTPUT);
  for (int i = 0; i < 4; i++) pinMode(digitPins[i], OUTPUT);

  pinMode(redLED, OUTPUT);
  pinMode(greenLED, OUTPUT);
  pinMode(blueLED, OUTPUT);

  pinMode(pumpENA, OUTPUT);
  pinMode(pumpIN1, OUTPUT);
  pinMode(pumpIN2, OUTPUT);

  /* ---- Servo ---- */
  valveServo.attach(servoPin);

  /* ---- Enable L298N Motor Channel ---- */
  analogWrite(pumpENA, 255);   // FULL enable, independent of jumper

  /* ---- Pump OFF initially ---- */
  digitalWrite(pumpIN1, LOW);
  digitalWrite(pumpIN2, LOW);

  /* ---- Restore last infection value from EEPROM ---- */
  byte stored = EEPROM.read(EEPROM_ADDR);
  if (stored <= 100) {
    infection = stored;           // valid saved value
  } else {
    infection = 0;                // fresh/uninitialised EEPROM (reads 255)
  }
}

void loop() {

  /* -------- Check for a new value from Python (non-blocking) -------- */
  readSerial();

  /* -------- Split infection % (display capped at 99 on 2 digits) -------- */
  int displayValue = (infection > 99) ? 99 : infection;
  int tens = (displayValue / 10) % 10;
  int ones = displayValue % 10;

  /* -------- Display multiplexing -------- */
  showDigit(1, tens);
  delay(3);
  showDigit(2, ones);
  delay(3);

  /* -------- PROPORTIONAL SERVO CONTROL -------- */
  int servoAngle = map(infection, 0, 100, 0, 100);
  valveServo.write(servoAngle);

  /* -------- RGB indication -------- */
  if (infection <= 30) {            // Green: 0-30
    digitalWrite(greenLED, HIGH);
    digitalWrite(redLED, LOW);
    digitalWrite(blueLED, LOW);
  }
  else if (infection <= 60) {       // Yellow: 31-60
    digitalWrite(greenLED, HIGH);
    digitalWrite(redLED, HIGH);
    digitalWrite(blueLED, LOW);
  }
  else {                            // Red: 61-100
    digitalWrite(greenLED, LOW);
    digitalWrite(redLED, HIGH);
    digitalWrite(blueLED, LOW);
  }

  /* -------- PUMP CONTROL (L298N) -------- */
  if (infection > 5) {
    digitalWrite(pumpIN1, HIGH);
    digitalWrite(pumpIN2, LOW);   // Pump ON
  } else {
    digitalWrite(pumpIN1, LOW);
    digitalWrite(pumpIN2, LOW);   // Pump OFF
  }
}
