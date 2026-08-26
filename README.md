# Digi-Chalk: AI-Driven Interactive Product Platform

> **"Making Every Blackboard a Digital Classroom."**  
> *Provisional Patent Filed (App No. 202641089516) • Indian Patent Office • TRL-2 → TRL-9 Pathway*  
> **Team Zero Resistance • Sri Ramakrishna Engineering College (SREC), Coimbatore**

---

## 📌 Executive Summary

**Digi-Chalk** is an edge-computed hardware retrofit that transforms standard school slate blackboards into real-time interactive digital classrooms for **₹2,000 per unit** (42.5x cheaper than ₹85,000 smartboards)—bringing digital equity to the **90% of Indian classrooms** left behind by high-cost smartboards.

- **Direct Volume Manufacturing Cost (COGS)**: **₹1,055 per unit** (Target BOM for 100+ units)
- **Retail / Government Procurement Price**: **₹2,000 per unit** (~47.25% Gross Margin)
- **Operational Breakeven Volume**: **1,058 – 1,376 units** (Covers ₹10L Phase B Fixed Operational Costs)
- **Seed Funding Requirement**: **₹13,00,000 ($15.5k USD)** across a 15-Month Gated Milestone Architecture

---

## 🛠️ Hardware Subsystems & Itemized BOM (₹1,055)

### 1. Chalk Holder (Mobile Transmitter Unit)
- **Processing Core**: Seeed XIAO ESP32-C3 (`0x68`, BLE GATT, ESP-NOW sync) — ₹280
- **Motion & Inertial Tracking**: MPU6050 6-Axis IMU (Fast Mode `400kHz`, GPIO 4/5 SDA/SCL) — ₹60
- **Acoustic Burst Transmitter**: MCUSD16P40B12RO (40kHz burst transmitter, MT3608 boost to 20-22V, IR2104/IRLZ44N driver) — ₹80
- **Audio Capture**: ICS-43434 24-bit I2S Digital MEMS Microphone (44.1kHz PCM) — ₹180
- **Dual Pen-Down Triggers**: Panasonic EVQ-P7A01P (100gf) tactile switch + 20mm Piezo plate (1MΩ bleed) — ₹25
- **Power & Failsafe**: 80mAh 3.7V LiPo + TP4056 USB-C charging + CR2032 failsafe Diode-OR bridge — ₹80

### 2. Corner Clips (Stationary Receiver Pair ×2)
- **Base Compute & Sync**: ESP32 DevKitC-32E Subsystem (Microsecond timer interrupts & ESP-NOW) — ₹260
- **Ultrasonic Receivers**: Murata MA40S4R 40kHz high-gain receivers — ₹80
- **Analog Front-End (AFE)**: LM358 dual-stage gain (100x–1000x) + LM393 comparator & 1N4148 envelope detector — ₹20
- **Power & Charging**: TP4056 + MCP73831 regulator — ₹12
- **TOTAL DIRECT PRODUCTION BOM**: **₹1,055**

---

## 📐 Mathematical Moat: ARCKF Zero-Drift Sensor Fusion

The **Adaptive-Robust Complementary Kalman Filter (ARCKF)** eliminates line-of-sight signal loss when a teacher's body or arm occludes acoustic sensors:

$$\gamma_{k,i} = (Z_{k,i} - H_{k,i}X_k)^T (H_{k,i}P_k^-H_{k,i}^T + R_{k,i})^{-1} (Z_{k,i} - H_{k,i}X_k)$$

- **Mahalanobis Gating**: $\chi^2 > 6.2$ ($\alpha = 0.001$) gates out acoustic multipath reflections.
- **300µs Temporal Guard Delay**: Prevents near-field acoustic ring-down interference on compact blackboards.
- **Tactile-Piezo Zero-State Reset**: Double-agreement on chalk touchdown halts integration loops and resets IMU gyroscopic drift to zero on every stroke.

---

## 📈 Market Dynamics & Tamil Nadu SSA Channel

- **TAM (Total Addressable Market)**: 37,626 TN Schools × 2 Units/School × ₹2,000 = **₹15.05 Crores**
- **SAM (Serviceable Addressable Market)**: 3-Year Target (10% of TN Schools) = **₹1.50 Crores**
- **SOM (Serviceable Obtainable Market)**: Year 1–2 Pilot Rollout (1% of Schools) = **₹15.05 Lakhs**
- **SSA Multiplier**: A single standard **₹2.4 Lakh per school SSA ICT Grant** equips **120 full classrooms** with Digi-Chalk instead of only 1–2 smartboards.

---

## 🚀 Commercialization Roadmap (₹13,00,000 Seed Ask)

- **Phase A: Path to TRL-6 (Months 1–6) — ₹3,00,000**
  - Phase 1: Bench Prototyping (₹90,000)
  - Phase 2: Small-Batch Fabrication (₹1,35,000)
  - Phase 3: Pilot Deployment (₹75,000)
- **Phase B: Path to TRL-9 Scale (Months 7–15) — ₹10,00,000**
  - 100+ Unit Production Run (₹3,50,000)
  - Multi-District Pilot (₹2,50,000)
  - BIS & Safety Compliance (₹1,00,000)
  - Teacher Training & Field Operations (₹2,00,000)
  - Operational Contingency (₹1,00,000)

---

## 👥 Team Zero Resistance (SREC Coimbatore)

- **Alexander Samuel R** — Founder: Hardware, Firmware & Product Lead (`alexandersamuel2310@gmail.com` | `+91 63620 58595` | [LinkedIn](https://linkedin.com/in/alexandersamuel2006))
- **Bhargavan Balaji** — Co-Founder: Hardware & Technical Supervisor (Power topologies, MT3608 + IR2104 drive circuits)
- **Kaniska Sri S** — Product Design Lead: UI/UX Developer (Ergonomic chassis, alignment wedges, teacher UX)
- **Mithra Karthikeyan** — Marketing Lead / Lead Strategy Lead: Full Stack AI Developer (Edge MobileNet, Cloud-ML EWS, SSA/StartupTN partnership)

---

## 💻 Tech Stack & Local Setup

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS v4, Lucide React, Canvas Confetti
- **Audio Synthesis**: Web Audio API (procedural chalk friction, TDOA pings, and chime synthesis)
- **Math & Physics**: 2D State-Space Kalman Filter, Convex Shape Recognizer, Wave Propagation Multi-Lateration

### Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/mithrakarthikeyan0-ctrl/Digi-Chalk.git
cd Digi-Chalk

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build production bundle
npm run build
```

---

## 🔗 Verified Pitch Deck
- **Airo Platform Interactive Presentation**: [https://airo.ai/share/Y2x1dWY3bTQxbDpjMzk6UW9nWS1tbm81cDA3](https://airo.ai/share/Y2x1dWY3bTQxbDpjMzk6UW9nWS1tbm81cDA3)
