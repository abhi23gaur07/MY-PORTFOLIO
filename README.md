# MY PORTFOLIO

## Abhishek Gaur — B.Tech Electronics Engineering (Specialization in Defence Technology)

A modern, high-performance personal portfolio website built for **Abhishek Gaur**, B.Tech Electronics Engineering undergraduate (**Specialization in Defence Technology**) at **Rashtriya Raksha University (RRU)**.

Engineered with the viral editorial luxury aesthetic inspired by Rishi Thakor's portfolio: featuring a Verlet physics ceiling pull-cord light switch, a 3D spiral desk flip-calendar, an architectural 3D arched doors hallway ("Magic happens behind the doors"), a mechanical chronological timeline, and verified academic and engineering credentials.

---

## 🚀 Tech Stack
- **Framework:** React 19 + Vite
- **Theme:** Dual Editorial Palette (Warm Sand/Linen Light Mode `#E8E4E0` switchable via Pull-Cord to Obsidian Charcoal Dark Mode `#1A1818`)
- **Styling:** Tailwind CSS v4 (3D perspective transforms, editorial typography, brass hardware gradients)
- **Interactive Physics:**
  - 26-node Verlet Rope Physics ceiling pull-cord with Web Audio API click synthesis
  - 3D desk flip-calendar with leaf rotation (`rotateX(352deg)`) and spiral metallic rings
  - 3D arched doors with dynamic Y-axis opening (`rotateY(28deg)` on hover, `rotateY(75deg)` on click), brass plates, lever handles, and golden floor light spill
- **Cursor Engine:** 2D Canvas ribbon trail cursor replicating the Smart Library Admin physics
- **Animations:** Hardware-accelerated IntersectionObserver reveals and canvas confetti

---

## 🌟 Featured Innovations & Architecture

1. **Verlet Physics Ceiling Pull-Cord (`PullCord.jsx`):**
   - An authentic physical light cord hanging from above the top-right navbar.
   - Grab, pull down, drag, swing, or tap the cord with realistic gravity, spring elasticity, and wind.
   - Snaps with a tactile click sound (synthesized via Web Audio API) to toggle between Editorial Warm Light and Obsidian Charcoal Dark modes.

2. **3D Desk Flip-Calendar Hero Section (`FlipCalendar.jsx` & `Hero.jsx`):**
   - Headline: *"Hi, I'm Abhishek. I am an [3D Flip-Calendar]"*
   - Spiral metallic binding rings, punched holes, and dual-sided leaves flipping down between:
     - `01 / 04` **Embedded Systems Engineer**
     - `02 / 04` **Defence Tech Innovator**
     - `03 / 04` **Hardware Architect (SIH #1)**
     - `04 / 04` **Full-Stack Software Lead**
   - High-impact portrait photo with cyber frame and electronic quote:
     > *"Be a living electronic circuit. Practice resistance where needed, like a resistor. Preserve energy where needed, like a capacitor. Direct energy where needed, like a diode. And above all, be driven by a purpose, like an IC."*
   - Status hairline ribbon: `🟢 Available for Defence & Hardware R&D` · `Rashtriya Raksha University · Gandhinagar`.

3. **The 3D Doors Hallway — "Magic happens behind the doors" (`DoorsSection.jsx`):**
   - A wall of 4 architectural arched 3D doors with brass nameplates, bevelled lever handles, and keyholes:
     - 🚪 **Door 01: Aqua Saviour 💧** (Underground Pipeline Acoustic ToF & GIS Telemetry)
     - 🚪 **Door 02: Nexus Nurture 🏠** (3D Smart Living & 24GHz mmWave Spatial Automation)
     - 🚪 **Door 03: The Smart Library 📚** (Automated Campus Circulation & WhatsApp Notification Platform)
     - 🚪 **Door 04: Delta Neurons 🧠 & Defence Tech 🛡️** (Assistive Cognitive Healthcare & SIH #1 Winner)
   - On hover: Door cracks open in 3D perspective (`rotateY(28deg)`), golden light spills out onto the floor, other doors softly dim, and a dynamic editorial information box slides in.
   - On click: Brass handle turns, door swings wide open, and opens the **Immersive Exhibition Room Modal (`DoorModal.jsx`)** with full specs, architecture diagrams, and GitHub repositories.

4. **"Let's Go Back in Time" Story Timeline (`StoryTimeline.jsx`):**
   - Analog mechanical clock dial with rolling odometer digits for the year (`2026`, `2025`, `2024`...) and progress track.
   - Highlights: RRU Defence Technology undergraduate studies, SIH Rank #1 Hardware victory, and project head initiatives.

5. **Achievements & Hackathons:**
   - **Smart India Hackathon (SIH) RRU Internal Round:** **#1 in Hardware Category** & **#8 in Overall Category**.
   - Interactive confetti celebration button and evaluation criteria breakdown.

6. **How I Turn Ideas Into Reality (Engineering Methodology):**
   - **01. Research & Problem Statement Analysis:** Feasibility study, sensor trade-offs, power budgeting.
   - **02. Circuit Design & Component Selection:** Microcontrollers (ESP32/STM32/Arduino), schematics, bus topologies (I2C/SPI/UART).
   - **03. Firmware & Hardware Prototyping:** Embedded C/C++, state machines, sensor calibration, breadboard verification.
   - **04. Cloud Telemetry, Testing & Deployment:** MQTT/HTTP APIs, offline sync engine, automated alerts, field validation.

7. **Leadership & Technical Engagement:**
   - **Lead & Project Head — Aqua Saviour Platform**
   - **Lead & Project Head — Nexus Nurture Platform**
   - **Lead & Project Head — The Smart Library System**
   - **Lead & Project Head — Delta Neurons Platform**

8. **Certifications & Workshops:**
   - **One-Day Workshop on Quantum Computing** (Quantum bits, superposition, entanglement, quantum logic gates).
   - Embedded Systems & IoT Hardware Masterclass.

9. **Quote & Contact Information:**
   - Inspiring electronics engineering quote reflecting Abhishek's vision.
   - Direct Email: **gaurabhishek2309@gmail.com** with one-click copy and mailto action.
   - Interactive message dispatch form with validation.

---

## 🛠️ How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---
© 2026 Abhishek Gaur · Rashtriya Raksha University
