<div align="center">

  <h1>♻️ YUKTI</h1>
  <h3>Smart Waste Management System</h3>
  <p>
    <b>Bridging the gap between Urban Households and Informal Waste Collectors via Technology.</b>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge" />
    <img src="https://img.shields.io/badge/Bot-Twilio_WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" />
    <img src="https://img.shields.io/badge/Mode-Light_%26_Dark-orange?style=for-the-badge" />
    <img src="https://img.shields.io/badge/Hackathon-Ready-red?style=for-the-badge" />
  </p>

  <br />
</div>

---

## 🚀 Problem Statement
- **Segregation at Source:** Residents often fail to segregate high-value waste (E-waste, Metal).
- **Literacy Gap:** Informal waste collectors (Ragpickers) cannot navigate complex text-based apps.
- **Communication Barrier:** No direct link between society guards and collectors.

## 💡 Our Solution: YUKTI
**YUKTI** is a dual-interface platform integrated with a smart WhatsApp Bot:
1.  **Guard Dashboard:** A web portal for society guards to log waste pickups with photos.
2.  **Collector's Interface:** A **Skeuomorphic (Image-first)** design for illiterate collectors to accept jobs.
3.  **WhatsApp AI Bot:** A conversational bot for residents to schedule pickups, featuring **Simulated AI Image Detection** to automatically categorize waste.

---

## ✨ Key Features

### 🖥️ Web Platform
- **Role-Based Access:** Separate views for Guards (Loggers) and Collectors (Receivers).
- **Dark/Light Mode:** Full UI support for day and night operations.
- **Real-Time Status Board:** Live tracking of waste requests (Searching -> Scheduled).
- **Deep Linking:** "Broadcast to WhatsApp" feature to share jobs directly to collector groups.

### 🤖 Smart WhatsApp Bot (Twilio)
- **Conversational Flow:** No app installation required for residents.
- **AI Image Analysis (Simulated):** Users upload a photo, and the bot "detects" the waste type (e.g., Mixed E-Waste).
- **Smart Correction:** Users can override the AI's detection manually if incorrect.
- **Live Notifications:** Residents get WhatsApp alerts when a collector accepts their request.

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React.js, Vite, Tailwind CSS, Lucide Icons |
| **Backend** | Node.js, Express.js |
| **Database** | In-Memory Storage (Demo) / MongoDB (Scalable) |
| **Bot/Messaging** | Twilio Sandbox API (WhatsApp Webhooks) |
| **Tunneling** | Ngrok / Localtunnel |

---

## 📸 Screenshots
| Guard Dashboard | Dark Mode | WhatsApp Bot Flow |
|:---:|:---:|:---:|
| *(Add Screenshot)* | *(Add Screenshot)* | *(Add Screenshot)* |

---

## 🏃‍♂️ How to Run Locally

### Prerequisites
- Node.js installed.
- Twilio Account (for WhatsApp Bot).

### 1. Clone the Repository
```
git clone [https://github.com/Tamal-2702/Yukti-Project.git](https://github.com/Tamal-2702/Yukti-Project.git)
cd Yukti-Project
```
### 2. Setup Backend
```
cd backend-server
npm install
```
- Create a .env file in backend-server/ folder:
  ```
  TWILIO_ACCOUNT_SID=your_sid
  TWILIO_AUTH_TOKEN=your_token
  TWILIO_PHONE_NUMBER=whatsapp:+14155238886
  MY_PHONE_NUMBER=whatsapp:+91XXXXXXXXXX
  ```
- Start the Server:
  ```
  npm start
  # Server runs on http://localhost:5000
  ```
### 3. Setup Frontend
 Open a new terminal:
 ```
 cd my-app
 npm install
 npm run dev
 # App runs on http://localhost:5173
 ```
### 4. Setup WhatsApp Bot (Twilio)
 1. Run Ngrok on Backend Port:
 ```
 npx ngrok http 5000
 ```
 2. Copy the HTTPS link (e.g., https://xyz.ngrok-free.app).
 3. Go to Twilio Console > Messaging > Sandbox Settings.
 4. Paste the link in "When a message comes in": https://your-ngrok-link.ngrok-free.app/api/whatsapp
 5. Save and send "Hi" to the sandbox number!

---

## 🤝 Workflow Demo

 1. Resident via WhatsApp: Sends "Hi" -> Uploads Photo -> Bot detects waste -> Confirms pickup.
 2. Guard via Web: Logs a request manually via the Dashboard.
 3. System: Requests appear on the Live Status Board.
 4. Collector: Clicks the link shared via WhatsApp -> Views Job (Images) -> Accepts.
 5. Notification: Resident gets a confirmation message on WhatsApp.

---

## 🔮 Future Scope

- Real AI Integration: Connect Python/TensorFlow model for actual image classification.
- Geolocation: Live GPS tracking of the collector's e-rickshaw.
- Reward System: Credits for residents who segregate waste correctly.

---

<div align="center"> <b>SELECT. SORT. SOLVE</b> </div>
<div align="center"> <b>Made with ❤️ for a Cleaner India</b> </div>

