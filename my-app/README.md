# YUKTI - Smart Waste Management System ♻️

> **Select. Sort. Solve.**
> A digital bridge connecting Urban Households to Informal Waste Collectors (Ragpickers).

## 🚀 Problem Statement
- **Accessibility Gap:** Elderly users & guards struggle with complex apps.
- **Literacy Gap:** Ragpickers cannot use text-heavy interfaces.
- **Economic Gap:** High-value waste (E-waste, Metal) ends up in landfills instead of recycling.

## 💡 Our Solution
YUKTI is a dual-interface platform built for **Gauhati University Hackathon**:
1.  **Society Guard Dashboard:** A simple web portal for guards to log waste on behalf of residents.
    - *Features:* Auto-Geolocation, AI Waste Analysis, Image Upload.
2.  **Collector's Visual App:** A skeuomorphic (image-first) interface for illiterate ragpickers.
    - *Features:* Visual Bidding, Real-time Acceptance, Dark Mode.

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS, Lucide Icons.
- **Backend:** Node.js, Express.js.
- **Key Features:** Real-time Sync, Geolocation API, Base64 Image Handling.

## 📸 Workflow
1. Guard logs a request (e.g., "Metal waste at Flat A-1").
2. Collector sees a **Photo of Metal** (not text) on their phone.
3. Collector accepts the bid.
4. Guard gets real-time confirmation with Collector's Name & Phone.

## 🏃‍♂️ How to Run Locally

### 1. Start Backend Server
```bash
cd backend-server
npm install
npm start
# Server runs on http://localhost:5000

### 2. Frontend Setup
cd my-app
npm install
npm run dev
# App runs on http://localhost:5173