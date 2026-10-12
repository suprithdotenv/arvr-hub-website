# AR VR HUB — BEYOND REALITY
### Official 3D Spatial Computing Website & Portfolio
**BMS Institute of Technology & Management (BMSIT&M)**
*Autonomous Institute Under VTU, Accredited by NBA and NAAC | Yelahanka, Bengaluru*

---

## 🌟 Overview

This is the premium interactive 3D web experience built for **AR VR HUB**, the premier spatial computing and virtual reality innovation club established across the **Department of Computer Science & Engineering (CSE)** and the **Department of Artificial Intelligence & Machine Learning (AIML)** at BMSIT&M.

Designed around spatial depth, 3D perspective, interactive WebGL geometry, and real club heritage, this website serves as a virtual museum and interactive exhibition showcase for students, faculty, industry partners, and jury panels.

---

## 🚀 Key Features

### 1. Cinematic Opening Sequence
- Displays the official **AR VR HUB** circular logo with holographic aura rings, rotating orbit tracks, and ambient nebula lighting.
- One-click **"Enter 3D Experience"** portal transition or skip directly into the main exhibition hall.

### 2. Main Hero: Interactive 3D VR Headset
- Custom procedural 3D VR Headset engineered with Three.js & React Three Fiber:
  - **Front Visor & Chassis:** Matte white ergonomic chassis with dark high-gloss front curved visor.
  - **Sensors:** 4-corner passthrough optical tracking cameras with metallic bezels and glass lenses.
  - **Internal Display:** Dual internal Fresnel optical eyepieces with emissive purple/blue display glow.
  - **Straps & Arms:** Side articulated rigid audio arms, top crown strap, and rear tension adjustment dial.
  - **Interactions:** Continuous auto-rotation, pointer parallax, direct 360° drag-to-inspect OrbitControls, and an interactive **"Explode Parts"** toggle.

### 3. Events Section — The Signature Feature
- **20+ Documented Events:** Every single workshop, hackathon, MoU, and competition from the official club report is presented as a floating 3D exhibit.
- **Authentic Photographic Evidence:** 42 high-resolution photos extracted directly from the report embedded in dimensional holographic frames.
- **Verification Citations:** Every exhibit cites its exact page in the official report (e.g., `Page 6, 22`, `Page 16, 25`).
- **Interactive Filtering & Search:** Filter by category (*Workshops, Hackathons, MoUs, Awards, Outreach*), filter by year (*2023, 2024, 2025*), and real-time keyword search.
- **Deep Inspection Modal:** Click any exhibit to view high-resolution photography, attendee numbers, partner associations, and full descriptions.

### 4. Verified Projects & Innovations
- **WONDERLENS AR:** 3rd prize winner at the SRISHTI 2024 National Level Project Exhibition.
- **VR in Rural Education:** Capstone project bringing immersive STEM laboratories to rural classrooms.
- **Solar System in AR:** Room-scale celestial mechanics simulation.
- **VR Industrial Factory:** Assembly line simulation deployed onto Meta Quest 2.
- **mARtian Land:** Unity 3D planetary colonization world created during mARtian AESSence.
- **Model Context Protocol (MCP) Server Architecture:** AI agent infrastructure built with 0xDay and Kodeus AI.

### 5. Photographic Heritage Gallery
- Responsive photographic gallery with categories (*Milestones, Workshops, Hackathons, Awards, Hands-on Lab, Outreach*).
- Fullscreen lightbox modal with **keyboard navigation** (Left/Right arrows, ESC to close).

### 6. Lab Hardware Specifications
- **AMWIN GPU Workstation:** AMD Ryzen™ 9 7900X (12C/24T, 4.7GHz, 64MB Cache), NVIDIA GeForce RTX 4060 (8GB), 32GB DDR5 5200MHz RAM, 500GB NVMe SSD, 240mm Liquid Cooler, 750W 80+ PSU (Report Page 19).
- **Meta Quest 2 Gear:** All-in-one 6DOF headset, Touch Controllers, spatial audio, and accessories (Report Page 20).

### 7. About & Leadership
- Institutional charter, verbatim 7 core club objectives, and faculty coordinator directory (Dr. Srivani P, Prof. Bharathi R, Dr. Durga Bhavani A, HoDs Dr. Thippeswamy G, Dr. Anupama H S, Dr. Satish Kumar T).

---

## 🛠️ Technology Stack

- **Framework:** React 19 + Vite 6
- **3D Graphics & WebGL:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animation & Transitions:** Framer Motion, Canvas Confetti
- **Styling & Theme:** Tailwind CSS v4, Custom Spatial Glow Utilities, Google Fonts (*Outfit* & *Space Grotesk*)
- **Icons:** Lucide React

---

## 📁 Directory Structure

```
arvr-hub-website/
├── public/
│   └── assets/
│       ├── logo.png               # Official AR VR HUB logo
│       └── events/                # 42 authentic photos extracted from report
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── VRHeadset3D.jsx    # Procedural 3D VR Headset model
│   │   │   └── HeroCanvas.jsx     # R3F Canvas with lights, particles, controls
│   │   ├── navigation/
│   │   │   └── Navbar.jsx         # Header & mobile drawer
│   │   ├── hero/
│   │   │   └── HeroSection.jsx    # Hero section with stats & 3D canvas
│   │   ├── events/
│   │   │   ├── EventExhibit.jsx   # 3D floating exhibit card
│   │   │   └── EventsSection.jsx  # Filterable signature events archive
│   │   ├── projects/
│   │   │   └── ProjectsSection.jsx# Interactive project blueprint viewer
│   │   ├── gallery/
│   │   │   └── GallerySection.jsx # Real moments with keyboard lightbox
│   │   ├── hardware/
│   │   │   └── HardwareSection.jsx# AMWIN workstation & Quest 2 specs
│   │   ├── about/
│   │   │   └── AboutSection.jsx   # Objectives & faculty leadership
│   │   ├── footer/
│   │   │   └── Footer.jsx         # Footer with verified citations
│   │   └── ui/
│   │       └── OpeningSequence.jsx# Cinematic opening sequence
│   ├── data/
│   │   ├── clubInfo.js            # Club info, hardware specs, objectives
│   │   ├── eventsData.js          # All 20+ verified club events
│   │   ├── projectsData.js        # Verified student research projects
│   │   └── galleryData.js         # Verified photographic archive
│   ├── App.jsx                    # Root layout & section controller
│   ├── index.css                  # Global styles & cyberpunk glow utilities
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 💻 How to Run Locally

1. Open PowerShell or Terminal and navigate to the project:
   ```powershell
   cd "C:\Users\Suprith Shetty\.gemini\antigravity\scratch\arvr-hub-website"
   ```

2. Start the development server:
   ```powershell
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`.

---

## 📦 How to Build for Production

1. Generate the optimized production bundle:
   ```powershell
   npm run build
   ```

2. Preview the production build:
   ```powershell
   npm run preview
   ```

---

## ✏️ How Club Members Can Add New Content

- **To add a new event:** Open `src/data/eventsData.js` and add an object to `eventsData`. Place event photos in `public/assets/events/`.
- **To add a new project:** Open `src/data/projectsData.js` and add the project entry.
- **To update faculty or lab hardware:** Edit `src/data/clubInfo.js`.
- All updates reflect automatically across the 3D exhibits and search filters.
