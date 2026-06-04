# A0 Poster Planning Documentation  
## Minor Project Evaluation: Smart Pesticide Control System Driven by Plant Infection Analysis

> Purpose of this document: This is **not LaTeX code**. It is a complete planning, content, layout, and generation guide that can be given to a larger LLM to generate a clean **A0-size LaTeX poster** using `beamerposter`, `tikzposter`, or a similar poster class.

---

## 1. Project Identity

### Recommended Poster Title

**Smart Pesticide Control System Driven by Plant Infection Analysis**

### Alternative Report Title

**Intelligent Pesticide Sprinkling System Determined by the Infection Level of Plants**

### Recommended Subtitle

**An AI-IoT based precision agriculture prototype for severity-aware pesticide spraying**

### Institution Header

**Dr. B. R. Ambedkar National Institute of Technology Jalandhar**  
**Department of Instrumentation and Control Engineering**  
**Minor Project Phase-II | B.Tech 3rd Year | Session 2023-2027**

### Submitted By

- Bhavesh Singh - 23106030  
- Chahat Kesharwani - 23106032  
- Sadgi Saraswat - 23106078  
- Vanshika Soni - 23106099  

### Supervised By

**Dr. Karan Veer**  
Assistant Professor / Associate Professor  
Department of Instrumentation and Control Engineering  
NIT Jalandhar

> Note: The report mentions Associate Professor, while the PPT mentions Assistant Professor. Verify the correct designation before final printing.

---

## 2. One-Line Project Summary

The project proposes a smart spraying system that captures tomato leaf images, analyses plant infection severity using an AI/ML model, and activates a pump-based spraying mechanism for a duration proportional to the detected infection level.

---

## 3. A0 Poster Format Recommendation

### Poster Size

Use **A0 size**.

- A0 portrait: 841 mm x 1189 mm  
- A0 landscape: 1189 mm x 841 mm  

### Recommended Orientation

Use **portrait orientation** for evaluation because it gives a strong academic-poster feel and allows a clear top-to-bottom story.

### Recommended Poster Library

Use one of the following:

1. `beamerposter` - best for academic conference-style posters.
2. `tikzposter` - easier block styling, good visual appeal.
3. `baposter` - older but useful for box-based layouts.

### Recommended Choice

Use **beamerposter** with:

- `a0paper`
- `scale` around `1.15` to `1.25`
- 3-column layout
- clean green-agriculture theme
- minimum clutter
- large readable fonts

### Poster Reading Distance

The poster should be readable from 3-5 feet.

Approximate font sizes:

| Element | Suggested Size |
|---|---:|
| Main title | 70-90 pt |
| Authors/institution | 32-42 pt |
| Section headings | 40-50 pt |
| Body text | 26-32 pt |
| Tables/figure captions | 22-26 pt |
| Small reference text | 18-22 pt |

---

## 4. Visual Theme Direction

### Design Mood

The project is about **AI + IoT + agriculture + sustainability**, so the poster should feel:

- technical but not overloaded
- clean and academic
- fresh and agriculture-oriented
- credible for final evaluation
- easy to explain in 3-5 minutes

### Suggested Color Palette

| Role | Color | Usage |
|---|---|---|
| Primary green | `#2E7D32` | Headings, borders, flow arrows |
| Light green | `#E8F5E9` | Section block background |
| Deep charcoal | `#1F2933` | Main text |
| Accent yellow | `#F9A825` | Highlight boxes, severity moderate |
| Alert red | `#D32F2F` | Severe infection |
| Neutral grey | `#F5F5F5` | Background panels |

### Visual Motifs

Use subtle visuals only:

- leaf icon
- dotted IoT/network pattern
- thin green dividers
- small tomato plant image
- system flow arrows
- severity badges: Healthy / Moderate / Severe

Avoid:

- heavy stock images
- too many gradients
- dark background
- excessive decorative grass at bottom
- too much text in paragraphs

---

## 5. Main Poster Storyline

The poster should tell the story in this exact flow:

1. **Problem** - Farmers spray pesticides uniformly even when plants are not equally infected.
2. **Gap** - Existing solutions detect disease but usually do not perform severity-based proportional spraying.
3. **Proposed System** - Camera + ML model + decision logic + ESP32/Arduino + pump.
4. **Methodology** - Five-module closed-loop workflow.
5. **Prototype** - Components, schematic, current implementation.
6. **Results / Expected Performance** - Accuracy target, latency target, pesticide saving.
7. **Impact** - Saves pesticide, reduces cost, protects soil, supports sustainable farming.
8. **Future Scope** - Multi-crop support, autonomous cart, GPS mapping, cloud dashboard.

---

## 6. Recommended A0 Poster Layout

### Overall Layout

Use a **3-column portrait layout**.

```text
+--------------------------------------------------------------------------------+
| LOGO         TITLE + SUBTITLE + AUTHORS + SUPERVISOR + INSTITUTE        LOGO   |
+--------------------------------------------------------------------------------+
| Column 1                      | Column 2                      | Column 3        |
| Problem & Motivation          | System Architecture           | Prototype       |
| Research Gap                  | Methodology                   | Results         |
| Objectives                    | ML + Decision Logic           | Applications    |
| Literature Snapshot           | Hardware/Software             | Future Scope    |
+--------------------------------------------------------------------------------+
| Footer: Keywords | Department | QR code to report/demo/github | Acknowledgement |
+--------------------------------------------------------------------------------+
```

### Column Width Ratio

Use equal columns:

- Column 1: 32%
- Column 2: 36%
- Column 3: 32%

The middle column can be slightly wider because it will contain the main system diagram.

---

## 7. Poster Header Content

### Header Block

**Title:**  
Smart Pesticide Control System Driven by Plant Infection Analysis

**Subtitle:**  
AI-IoT Based Severity-Aware Pesticide Spraying for Sustainable Agriculture

**Authors:**  
Bhavesh Singh (23106030), Chahat Kesharwani (23106032), Sadgi Saraswat (23106078), Vanshika Soni (23106099)

**Supervisor:**  
Dr. Karan Veer, Department of Instrumentation and Control Engineering

**Institute:**  
Dr. B. R. Ambedkar National Institute of Technology Jalandhar

### Header Design Instructions

- Put institute logo on left or center.
- Keep the title as the largest element.
- Use one clean horizontal rule below the header.
- Do not put a full paragraph in the header.

---

## 8. Column 1: Problem, Motivation, Gap, Objectives

### Section 1: Motivation

#### Recommended Title

**Motivation**

#### Poster Text

Agriculture still relies heavily on uniform pesticide spraying, where chemicals are applied across the field without considering the actual infection level of each plant. This leads to pesticide wastage, increased cost for farmers, soil and water contamination, and unnecessary exposure of healthy plants to chemicals.

Tomato plants are highly susceptible to diseases such as early blight, late blight, bacterial spot, and leaf curl. Timely detection and targeted treatment can reduce disease spread and improve pesticide efficiency.

#### Visual Suggestion

Use a simple before-after visual:

```text
Conventional Spraying:
Same pesticide for all plants

Smart Spraying:
Dose depends on infection level
```

Use 3 small plant icons:

- Healthy -> no spray
- Moderate -> short spray
- Severe -> longer spray

---

### Section 2: Problem Statement

#### Recommended Title

**Problem Statement**

#### Poster Text

Conventional pesticide application is inefficient because it does not distinguish between healthy, mildly infected, and severely infected plants. The technical challenge is to build a closed-loop system that can detect plant infection severity from images and convert that severity into a physical spraying action.

#### Highlight Box

**Core Problem:**  
Uniform pesticide spraying causes over-application on healthy plants, under-treatment of severely infected plants, higher operating cost, and environmental damage.

---

### Section 3: Research Gap

#### Recommended Title

**Research Gap**

#### Poster Text

Most existing systems focus on plant disease detection or automated spraying separately. Many approaches classify whether a disease is present, but do not regulate pesticide quantity according to infection severity. There is a need for an affordable, modular, deployable system that integrates real-time image-based severity detection with proportional pesticide actuation.

#### Bullet Version

- Existing ML systems detect disease but often do not control spray quantity.
- Existing spraying robots can be costly or mechanically complex.
- Binary infected/not-infected decisions are not enough for precision spraying.
- Small-scale farmers need a low-cost and modular solution.
- Real-time feedback between detection and actuation is usually missing.

---

### Section 4: Objectives

#### Recommended Title

**Objectives**

#### Poster Text / Bullets

The project aims to:

1. Capture tomato plant leaf images using a camera-based module.
2. Process leaf images using an AI/ML model for infection severity analysis.
3. Classify plant condition into severity levels such as Healthy, Moderate, and Severe.
4. Convert infection severity into calibrated pump actuation duration.
5. Implement pump-based pesticide spraying using microcontroller control.
6. Display infection status visually using indicators such as RGB LED or seven-segment display.
7. Reduce pesticide usage compared to conventional uniform spraying.
8. Build a low-cost prototype suitable for academic and small-scale agricultural use.

---

### Section 5: Literature Snapshot

#### Recommended Title

**Literature Review Snapshot**

Use a small comparison table.

| Existing Direction | Limitation Identified |
|---|---|
| Pesticide wastage studies | Show impact but do not automate control |
| ML plant disease detection | Detect disease but often stop at classification |
| Robotic spraying systems | Expensive and not always severity-aware |
| AI-IoT farming systems | Limited proportional pesticide control |
| Proposed system | Integrates severity detection with actuation |

#### Design Tip

Keep this table compact. Do not include full citations in the main poster body. Put references in the footer.

---

## 9. Column 2: System Architecture and Methodology

This should be the most visual column.

### Section 6: Proposed System Overview

#### Recommended Title

**Proposed System**

#### Poster Text

The proposed system forms a closed-loop pipeline from plant image acquisition to physical spray actuation. A camera captures the tomato leaf image, the ML model predicts infection severity, decision logic maps severity to spray duration, and the microcontroller activates the pump for the required time.

#### Core Flow

```text
Plant Leaf
   ↓
Image Capture
   ↓
Preprocessing
   ↓
ML Severity Detection
   ↓
Decision Logic
   ↓
Microcontroller Command
   ↓
Pump / Nozzle Actuation
   ↓
Spray Event Logging
```

#### Visual Instruction for LaTeX Generator

Create a horizontal or vertical TikZ flow diagram with 7 rounded boxes and arrows. Use green for sensing blocks, blue for AI/processing blocks, orange for decision logic, red for actuation, and grey for logging.

---

### Section 7: Five Functional Modules

#### Recommended Title

**System Modules**

| Module | Function |
|---|---|
| 1. Image Capture & Preprocessing | Captures leaf image and prepares it for ML inference |
| 2. ML-Based Severity Detection | Predicts infection severity using trained model |
| 3. Decision Logic & Communication | Maps severity to pump duration and sends command |
| 4. Spraying Actuation System | Activates pump/nozzle for controlled spraying |
| 5. Monitoring & Logging Dashboard | Stores prediction, spray duration, timestamp, and usage data |

#### Short Poster Text

Each module builds on the previous one, forming a closed loop from detection to action.

---

### Section 8: ML-Based Infection Severity Detection

#### Recommended Title

**AI/ML Severity Detection**

#### Poster Text

The system uses an image-based machine learning pipeline for tomato leaf infection analysis. Images are resized, normalized, optionally filtered, and passed to a trained model. The model outputs either infection percentage or a severity class, which is then used by the control logic.

#### Recommended Technical Details

- Dataset: Tomato leaf disease dataset from Kaggle / PlantVillage.
- Model direction: EfficientNetV2-based transfer learning or equivalent CNN model.
- Input: tomato leaf image.
- Output: infection level or severity class.
- Severity categories:
  - Healthy: less than 30% infection coverage
  - Moderate Infection: 30-60% infection coverage
  - Severe Infection: above 60% infection coverage

#### Visual Suggestion

Add a mini classification card:

```text
Input Image → CNN / EfficientNetV2 → Severity Output
Healthy       Moderate       Severe
0 sec spray   3 sec spray    7 sec spray
```

---

### Section 9: Severity-to-Spray Mapping

#### Recommended Title

**Decision Logic**

Use this as one of the central tables.

| Infection Level | Severity Class | Pump Action | Spray Duration |
|---|---|---|---:|
| Low / Healthy | Healthy | No spray | 0 s |
| Medium | Moderate | Short targeted spray | 3 s |
| High | Severe | Extended spray | 7 s |

#### Poster Text

The decision layer converts the predicted infection severity into pump ON time. This makes the system severity-aware instead of simply spraying all plants equally.

#### Optional Formula

```text
Spray Duration = f(Infection Severity)
```

or

```text
Healthy → 0 s, Moderate → 3 s, Severe → 7 s
```

---

### Section 10: Communication and Control

#### Recommended Title

**Communication & Control**

#### Poster Text

The ML inference unit communicates with the microcontroller through a lightweight command interface. After prediction, the control logic sends severity and spray duration to the controller. The controller activates the pump through the motor driver/MOSFET circuit for the required time.

#### For Final Poster, Decide Which Hardware Story to Use

There is a slight difference between the report and PPT:

| Source | Control Hardware Mentioned |
|---|---|
| Report | ESP32, 12V diaphragm pump, solenoid valve, MOSFET, Wi-Fi HTTP communication |
| PPT / Prototype | Arduino UNO, ESP32-CAM, RGB LED, 7-segment display, L298N motor driver, DC submersible pump |

#### Recommended Way to Present This

Use two labels:

1. **Implemented Prototype:** Arduino UNO + ESP32-CAM + L298N + pump + display + RGB LED  
2. **Scalable Architecture:** ESP32 + Wi-Fi control + solenoid valve + dashboard logging  

This avoids contradiction and shows that the prototype is a working demonstration while the report architecture is the scalable final design.

---

## 10. Column 3: Prototype, Results, Applications, Future Scope

### Section 11: Hardware Prototype

#### Recommended Title

**Prototype Implementation**

#### Poster Text

A decision-making and control prototype has been developed to demonstrate the complete logic of infection analysis and pump-based control. The prototype captures a plant leaf image, processes it using an AI/ML model, calculates infection percentage, displays the infection status, and converts the percentage into a physical control action using a pump.

#### Components Used

Use the components from the PPT because they represent the visible prototype.

| Component | Purpose |
|---|---|
| ESP32-CAM Module | Captures plant leaf image |
| Arduino UNO | Control logic and hardware interface |
| RGB LED | Indicates low, medium, or high infection |
| Seven-Segment Display | Displays infection percentage |
| L298N Motor Driver | Drives the DC pump |
| DC Submersible Pump | Represents pesticide spraying |
| Resistors and Jumper Wires | Circuit connections |
| Battery / Power Supply | Provides power to pump and controller |

#### Visual Suggestion

Place the schematic image from the PPT/report in this section with a clear caption:

**Figure: Prototype schematic showing camera input, controller, display, motor driver, and pump actuation.**

---

### Section 12: What We Have Achieved

#### Recommended Title

**Current Progress**

#### Poster Bullets

- Developed a decision-making and control prototype.
- Captured plant leaf image as system input.
- Processed image using an AI/ML-based infection analysis pipeline.
- Calculated infection percentage / severity level.
- Displayed infection level visually.
- Converted infection level into pump actuation duration.
- Demonstrated the principle: higher infection leads to longer pump ON time.

#### Highlight Statement

**Higher infection → longer pump ON time → more pesticide dispensed**  
**Lower infection → shorter pump ON time → less pesticide dispensed**

---

### Section 13: Expected Results

#### Recommended Title

**Expected Performance**

Use metric cards.

| Metric | Target / Expected Value |
|---|---:|
| Classification accuracy | ≥ 90% |
| End-to-end response latency | ≤ 5 s |
| Dashboard refresh rate | ≤ 2 s |
| Pesticide reduction target | ≥ 40% |
| Theoretical saving in mixed test case | up to 57% |
| System uptime target | ≥ 2 hours |

#### Short Explanation

In a mixed plant population, intelligent spraying avoids pesticide application on healthy plants and reduces the spraying duration for moderately infected plants. This leads to significant pesticide savings compared to uniform spraying.

---

### Section 14: Pesticide Saving Example

#### Recommended Title

**Pesticide Reduction Analysis**

Use this table or a simple bar chart.

| Plant Type | Count | Uniform Spray | Smart Spray | Saving |
|---|---:|---:|---:|---:|
| Healthy | 4 | 28 s | 0 s | 28 s |
| Moderate | 3 | 21 s | 9 s | 12 s |
| Severe | 3 | 21 s | 21 s | 0 s |
| **Total** | **10** | **70 s** | **30 s** | **40 s** |

#### Key Callout

**Smart spraying can reduce total spray duration from 70 seconds to 30 seconds in the sample case, giving a theoretical saving of around 57%.**

#### Visual Suggestion

Add a small bar chart:

```text
Uniform Spraying:    70 s
Intelligent Spraying: 30 s
Savings:             40 s
```

---

### Section 15: Applications

#### Recommended Title

**Applications**

#### Bullets

- Small and marginal farms
- Greenhouse and polyhouse horticulture
- Agricultural research stations
- University-level smart farming laboratories
- Precision spraying for tomato crops
- Possible extension to other high-value crops

#### Short Text

The system is suitable for experimental agriculture, controlled farms, and small-scale deployments where targeted spraying can reduce chemical use and operational cost.

---

### Section 16: Impact

#### Recommended Title

**Expected Impact**

Use a 2x2 grid of impact cards.

| Impact Area | Benefit |
|---|---|
| Farmer Cost | Reduces unnecessary pesticide use |
| Soil Health | Limits chemical over-application |
| Crop Protection | Targets infected plants based on severity |
| Sustainability | Supports precision agriculture and resource efficiency |

#### Strong Closing Sentence

The project demonstrates how AI and embedded control can convert plant health data into precise physical action for sustainable farming.

---

### Section 17: Limitations

#### Recommended Title

**Limitations**

Keep this honest and concise.

- Current model performance depends on dataset quality and lighting conditions.
- Prototype is tested in controlled conditions, not full-scale field deployment.
- Tomato crop is the primary focus at this stage.
- Manual cart positioning is used instead of autonomous navigation.
- Real pesticide is replaced with water/harmless proxy during safe prototype testing.
- Outdoor deployment requires rugged enclosure, waterproofing, and better power management.

---

### Section 18: Future Scope

#### Recommended Title

**Future Scope**

#### Bullets

- Extend disease detection to multiple crops.
- Add autonomous mobile robot/cart navigation.
- Add GPS-based plant location tagging.
- Improve model robustness under natural lighting.
- Integrate cloud dashboard and mobile application.
- Add nozzle calibration based on plant canopy size.
- Include soil moisture, humidity, and temperature sensors.
- Use edge AI deployment for faster inference.

---

### Section 19: Conclusion

#### Recommended Title

**Conclusion**

#### Poster Text

The proposed system integrates computer vision, machine learning, embedded control, and pump-based actuation to enable severity-aware pesticide spraying. By spraying only when required and in proportion to infection level, the prototype demonstrates a practical direction for reducing pesticide wastage, lowering farmer cost, and promoting sustainable agriculture.

---

## 11. Footer Content

### Keywords

Precision Agriculture | AI | IoT | Computer Vision | ESP32-CAM | Arduino | EfficientNetV2 | Smart Spraying | Tomato Leaf Disease

### References

Keep references very small in the footer or as a compact numbered list.

Suggested reference categories:

1. Plant disease detection using CNN / transfer learning.
2. Precision spraying and pesticide wastage studies.
3. AI-IoT based agriculture systems.
4. Tomato leaf disease dataset / PlantVillage dataset.
5. Embedded systems and IoT actuation references.

### QR Code Suggestions

Add one QR code if available:

- project report PDF
- GitHub repository
- demo video
- dashboard link
- Google Drive folder with schematic and images

Label it clearly:

**Scan for report/demo**

---

## 12. Figure and Diagram Checklist

The poster should include **at least 3 strong visuals**.

### Required Visual 1: System Architecture Diagram

A central flow diagram:

```text
Camera → ML Model → Decision Logic → Microcontroller → Pump/Nozzle → Plant
                     ↓
                Dashboard / Logs
```

### Required Visual 2: Prototype Schematic

Use the schematic from the PPT/report. Make it large enough to be readable.

### Required Visual 3: Severity-to-Spray Mapping

Use either:

- table
- three badges
- flow: Healthy / Moderate / Severe → 0s / 3s / 7s

### Optional Visual 4: Savings Bar Chart

Show uniform vs intelligent spraying.

### Optional Visual 5: Module Pipeline

Five module cards:

1. Image capture
2. ML detection
3. Decision logic
4. Actuation
5. Dashboard

---

## 13. Content Priority for A0 Poster

If the poster becomes overcrowded, reduce content in this order:

### Must Keep

- Title, authors, supervisor, institute
- Problem statement
- Proposed system overview
- System architecture diagram
- Methodology / modules
- Prototype components
- Results / expected performance
- Conclusion

### Good to Keep

- Research gap
- Severity-to-spray table
- Pesticide saving example
- Applications
- Future scope

### Can Reduce

- Detailed literature review
- Full hardware cost table
- Long software library list
- Detailed preprocessing steps
- Full references

---

## 14. Final Poster Text: Compact Version

Use this section if the LaTeX-generating LLM needs ready-to-place text.

### Abstract / Overview

Conventional pesticide spraying applies chemicals uniformly across fields, regardless of the health condition of individual plants. This leads to pesticide wastage, increased cost, soil degradation, and unnecessary chemical exposure. This project proposes a smart pesticide control system that detects tomato plant infection severity using image-based AI/ML analysis and converts the detected severity into controlled pump actuation. The system integrates image capture, infection severity detection, decision logic, microcontroller-based control, and pump-based spraying to enable targeted and severity-aware pesticide application.

### Problem

Uniform pesticide spraying does not distinguish between healthy and infected plants. As a result, healthy plants may receive unnecessary chemicals while severely infected plants may not receive sufficient targeted treatment. The project addresses the need for a low-cost, closed-loop system that connects plant health detection with proportional pesticide spraying.

### Proposed Solution

A camera captures the image of a tomato leaf. The image is processed by an AI/ML model to estimate infection level or severity class. Based on the predicted severity, decision logic generates a spray command. The microcontroller then activates the pump for a calibrated duration. Healthy plants receive no spray, moderately infected plants receive a short spray, and severely infected plants receive a longer spray.

### Methodology

The system is divided into five modules: image capture and preprocessing, ML-based infection severity detection, decision logic and communication, spraying actuation, and monitoring/logging. These modules form a closed-loop pipeline from visual plant input to physical pesticide output.

### Current Prototype

The implemented prototype uses an ESP32-CAM for image acquisition, Arduino UNO for control logic, RGB LED and seven-segment display for visual feedback, L298N motor driver for pump control, and a DC pump to represent pesticide spraying. The prototype demonstrates that infection percentage can be converted into a physical control action.

### Results

The expected system targets at least 90% classification accuracy, end-to-end latency below 5 seconds, dashboard refresh below 2 seconds, and pesticide usage reduction of at least 40% compared to uniform spraying. In a sample mixed-health test case, uniform spraying requires 70 seconds of spray time, while intelligent spraying requires only 30 seconds, giving a theoretical saving of approximately 57%.

### Conclusion

The project demonstrates a practical AI-IoT approach for precision agriculture. By combining plant infection analysis with microcontroller-based pump actuation, the system enables targeted pesticide application, reduces chemical wastage, and supports sustainable farming practices.

---

## 15. LaTeX Poster Generation Instructions for a Larger LLM

Give the following instruction to the LLM that will generate the LaTeX code:

```text
Create an A0 portrait academic poster using LaTeX beamerposter. Do not make it text-heavy. Use a 3-column layout with a large header. Theme should be clean, green, agriculture-oriented, and professional. Use rounded section blocks, readable fonts, and enough spacing. Include placeholders for institute logo, system architecture diagram, prototype schematic, and QR code. Use TikZ for the system workflow diagram and severity-to-spray mapping. Use the exact content sections from the provided markdown. Make sure the poster is readable from a distance and does not overflow. Use A0 paper size and scalable font sizes.
```

---

## 16. Suggested LaTeX Structure

The generated poster should follow this structure:

```text
Header:
- Logo
- Title
- Subtitle
- Authors
- Supervisor
- Institute

Column 1:
- Motivation
- Problem Statement
- Research Gap
- Objectives
- Literature Snapshot

Column 2:
- Proposed System
- System Architecture Diagram
- System Modules
- AI/ML Severity Detection
- Decision Logic

Column 3:
- Prototype Implementation
- Current Progress
- Expected Performance
- Pesticide Saving Analysis
- Applications
- Future Scope
- Conclusion

Footer:
- Keywords
- References
- QR code
```

---

## 17. Recommended Final Poster Section Order

1. Title/Header
2. Motivation
3. Problem Statement
4. Research Gap
5. Objectives
6. Proposed System
7. Methodology / System Modules
8. System Architecture Diagram
9. ML Severity Detection
10. Decision Logic
11. Prototype Implementation
12. Results / Expected Performance
13. Applications
14. Limitations
15. Future Scope
16. Conclusion
17. References / QR

---

## 18. Potential Evaluation Questions and Poster Support

Prepare to answer these during the evaluation.

### Q1. Why is this project needed?

Because conventional spraying wastes pesticide by treating all plants equally. The project uses infection-based decision-making to spray only when needed and in the right amount.

### Q2. Why tomato plants?

Tomato is a widely cultivated crop and is affected by several visible leaf diseases. Public datasets are also available for tomato leaf disease detection, making it practical for model training.

### Q3. What is the role of AI/ML?

AI/ML analyses leaf images and predicts infection severity or infection percentage.

### Q4. What is the role of the microcontroller?

The microcontroller converts the decision output into hardware action by activating the pump for a fixed duration.

### Q5. How is pesticide quantity controlled?

By controlling pump ON time. Higher infection means longer pump duration; lower infection means shorter or no spray.

### Q6. How is this different from normal disease detection projects?

This project does not stop at disease detection. It connects detection with actuation, making it a closed-loop system.

### Q7. What are the limitations?

The current prototype is tested in controlled conditions, depends on image quality, focuses mainly on tomato leaves, and uses a pump-based representation rather than large-scale field deployment.

### Q8. What is the future scope?

Multi-crop detection, autonomous navigation, GPS tagging, cloud dashboard, better outdoor enclosure, and edge AI inference.

---

## 19. Final Quality Checklist Before Printing

### Content

- [ ] Title is consistent across poster, report, and PPT.
- [ ] Supervisor designation is verified.
- [ ] Authors and roll numbers are correct.
- [ ] System architecture diagram is readable.
- [ ] Prototype schematic is not blurry.
- [ ] Severity-to-spray table is clearly visible.
- [ ] Claims such as accuracy and saving are labelled as expected/theoretical if not experimentally validated.
- [ ] Results are not overstated.
- [ ] Future scope is realistic.

### Design

- [ ] A0 size is correctly set.
- [ ] Poster is readable at 100% zoom.
- [ ] No paragraph is longer than 4-5 lines.
- [ ] Tables are large enough.
- [ ] Alignment is consistent.
- [ ] Color contrast is strong.
- [ ] QR code works.
- [ ] Logos are high resolution.
- [ ] Final PDF is exported and checked before printing.

### Printing

- [ ] Export as PDF.
- [ ] Check page size is A0.
- [ ] Use 300 DPI images if possible.
- [ ] Avoid low-resolution screenshots.
- [ ] Keep margins safe.
- [ ] Print a small A4 test version first to check layout.

---

## 20. Recommended Single-Sentence Pitch

**Our project turns plant infection analysis into real-time spraying action, so pesticide is applied only where it is needed and in proportion to disease severity.**

---

## 21. Recommended 30-Second Explanation

This project is a smart pesticide control system for precision agriculture. Instead of spraying the same amount of pesticide on every plant, our system captures a tomato leaf image, analyses the infection level using an AI/ML model, and then activates a pump for a duration based on severity. Healthy plants receive no spray, moderately infected plants receive a short spray, and severely infected plants receive a longer spray. This reduces pesticide wastage, lowers cost, and supports sustainable farming.

---

## 22. Recommended 2-Minute Presentation Flow

1. Start with the problem: uniform pesticide spraying wastes chemicals.
2. Explain the gap: disease detection alone is not enough; it must be connected to actuation.
3. Explain your proposed solution: camera, ML model, decision logic, controller, pump.
4. Show the system architecture diagram.
5. Explain the prototype and components.
6. Explain severity-to-spray mapping.
7. Mention expected results: accuracy, latency, pesticide saving.
8. End with impact: low-cost, modular, sustainable agriculture.

---

## 23. Notes for Aligning Report and PPT

The uploaded report and PPT use slightly different naming and hardware emphasis. For the final poster, use a unified narrative:

### Recommended Unified Narrative

- **Project Name:** Smart Pesticide Control System Driven by Plant Infection Analysis
- **Core Idea:** Infection severity determines pesticide spray duration.
- **Prototype:** ESP32-CAM + Arduino UNO + L298N + pump + display + LED.
- **Scalable Final Architecture:** ML inference + Wi-Fi command + ESP32 + pump/solenoid + dashboard.
- **Main Claim:** Severity-aware spraying reduces pesticide use compared to uniform spraying.

### Avoid Saying

- "Fully field deployed" unless actually tested in a real field.
- "Guaranteed 90% accuracy" unless experimentally validated.
- "Real pesticide sprayed" if only water/proxy was used.
- "Autonomous robot" if manual cart positioning was used.

Use terms like:

- prototype
- expected
- theoretical saving
- controlled setup
- scalable architecture
- proof of concept

---

## 24. Final Recommendation

The poster should not try to include the entire report. It should communicate the project clearly in one glance:

**Problem → AI Detection → Control Decision → Pump Action → Reduced Pesticide Use**

The strongest poster will have a clean system architecture diagram in the center, a concise problem and gap on the left, and prototype/results/impact on the right.
