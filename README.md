# RETINA-X — Explainable AI for Diabetic Retinopathy Screening in Rural India

**MathWorks Theme | Explainable AI Platform**

RETINA-X is a production-quality MERN stack platform designed for AI-assisted diabetic retinopathy (DR) screening in accessible rural healthcare environments. Built with **Grad-CAM Explainable AI (XAI)**, pixel-level attention visualizers, and offline-first edge architecture for low-bandwidth outreach clinics.

---

## 🎨 Design Identity: Royal Medical AI Command Center
- **Color Palette**: Deep Charcoal (`#050505`, `#0A0A0A`, `#111111`), Burnt Orange (`#FF5A1F`), Deep Crimson (`#C62828`), Muted Gold (`#D4A84F`).
- **Typography**: Inter & Space Grotesk.
- **Visual Style**: Royal UI + Skeuomorphic Tactile Workstation Depth + Brutalist Editorial Framing.

---

## 🚀 Key Features

1. **Interactive Retinal AI Workstation (`/screening`)**
   - Fundus image upload with quick demo presets.
   - 5-step animated neural inference pipeline (Preprocessing → Vessel Segmentation → Feature Extraction → Grad-CAM → Risk Stratification).
   - Medical viewer controls: Zoom (+/-), Pan, Fullscreen, Heatmap layer toggle, Vessel mask overlay, and Lesion bounding boxes.

2. **Grad-CAM Explainable AI (`/explainability`)**
   - Pixel-level attention heatmaps explaining AI predictions.
   - Opacity slider & Side-by-Side comparison mode.
   - Feature breakdown for microaneurysms, hard exudates, hemorrhages, and vessel tortuosity.

3. **Ophthalmology Triage Dashboard (`/dashboard`)**
   - Clinician command center for tracking today's screenings, pending reviews, and urgent high-risk referrals.
   - Searchable rural patient directory (`/patients` & `/patients/:id`).
   - Official printable clinical audit PDF reports (`/reports`).

4. **Rural Edge Support**
   - Built for low-bandwidth primary health centers (PHC) & mobile camps.
   - Client-side ONNX runtime offline execution with automated batch sync.

---

## 🏗️ Technical Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Framer Motion.
- **Backend**: Node.js Express REST API, CORS, Mongoose schemas.
- **XAI Engine**: ResNet-50 / ConvNeXt backbone with Grad-CAM and Layer-CAM attention map extractors.

---

## 💻 Quick Start

### 1. Backend Server
```bash
cd server
npm install
npm run dev # Runs Express API on http://localhost:5001
```

### 2. Frontend Client
```bash
cd client
npm install
npm run dev # Runs Vite React app on http://localhost:3001
```

---

## 📜 Medical Safety Disclaimer
AI-assisted screening is intended for clinical decision support and does not replace professional medical diagnosis. All flagged high-risk cases must be confirmed by a licensed ophthalmologist.
