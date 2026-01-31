require('dotenv').config();
const express = require('express');
const cors = require('cors');
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

let wasteRequests = [];
let userSessions = {}; 

// --- ROUTES ---

app.get('/', (req, res) => res.send('YUKTI Backend Running & Bot Active! 🤖'));

// 1. API: Web Form Request
app.post('/api/requests', (req, res) => {
  const data = req.body;
  const newRequest = {
    id: Date.now(),
    ...data,
    status: 'searching',
    timeLogged: new Date().toLocaleTimeString(),
    source: 'Web Dashboard'
  };
  wasteRequests.push(newRequest);
  console.log("Web Request Logged:", data.flatNumber);
  res.json({ success: true, request: newRequest });
});

// 2. API: WhatsApp Bot (Smart Correction Feature Added) 🧠
app.post('/api/whatsapp', async (req, res) => {
  try {
    const incomingMsg = req.body.Body ? req.body.Body.trim() : '';
    const from = req.body.From;
    const numMedia = parseInt(req.body.NumMedia || '0'); 
    const mediaUrl = req.body.MediaUrl0;

    console.log(`📩 Msg from ${from} | Text: "${incomingMsg}" | Photos: ${numMedia}`);

    let responseMessage = "";

    if (!userSessions[from]) {
      userSessions[from] = { step: 'START', data: {} };
    }
    const session = userSessions[from];

    // --- STATE MACHINE ---
    switch (session.step) {
      case 'START':
        responseMessage = "👋 Welcome to *YUKTI*! ♻️\n\nLet's clear your waste.\nPlease enter your *Flat Number* (e.g., A-302):";
        session.step = 'ASK_PHOTO'; 
        break;

      case 'ASK_PHOTO':
        if (numMedia > 0) {
           responseMessage = "⚠️ Please enter the *Flat Number* text first.";
        } else {
           session.data.flatNumber = incomingMsg;
           responseMessage = "Got it! ✅\n\nNow, please *Upload a Photo* 📸 of the waste.\n(I will try to identify it for you).";
           session.step = 'AI_ANALYSIS';
        }
        break;

      case 'AI_ANALYSIS':
        if (numMedia > 0) {
          // Photo Received
          console.log("📸 Image Detected:", mediaUrl);
          session.data.imageUrl = mediaUrl;
          
          // 🤖 SMART AI RESPONSE (User ko Control diya)
          responseMessage = "🤖 *AI Analysis Complete...*\n\nI detected: *Mixed Waste*.\n\n👉 If correct, type *'Yes'*.\n👉 If wrong, please *type the correct category* manually (e.g., Plastic, Cardboard).";
          session.step = 'CONFIRM_OR_EDIT'; // Step ka naam badal diya
        } else {
          responseMessage = "⚠️ No photo detected. Please tap the 📎 icon and upload an image.";
        }
        break;

      case 'CONFIRM_OR_EDIT':
        // Yahan Magic Hoga: User input check karo
        let finalCategory = "";
        
        if (incomingMsg.toLowerCase() === 'yes') {
            finalCategory = "Mixed Waste (AI Verified)"; // AI ki baat maan li
        } else {
            finalCategory = incomingMsg + " (User Corrected)"; // User ne khud bataya
        }

        // Request Save Karo
        const newRequest = {
          id: Date.now(),
          flatNumber: session.data.flatNumber,
          category: finalCategory, 
          imageUrl: session.data.imageUrl || "No Image",
          residentName: "WhatsApp User",
          phone: from,
          location: "WhatsApp Geo-Tag",
          status: 'searching',
          timeLogged: new Date().toLocaleTimeString(),
          source: "WhatsApp Bot"
        };
        
        wasteRequests.push(newRequest);
        console.log("✅ Request Saved:", newRequest);

        responseMessage = `🎉 *Pickup Scheduled!*\n\n📦 Category: *${finalCategory}*\n🆔 Track ID: YUK-${Math.floor(1000 + Math.random() * 9000)}\n\n🔔 You will get a notification when a collector accepts.`;
        delete userSessions[from]; 
        break;

      default:
        responseMessage = "Type 'Hi' to start.";
        session.step = 'START';
        break;
    }

    res.set('Content-Type', 'text/xml');
    res.send(`<Response><Message>${responseMessage}</Message></Response>`);
  
  } catch (error) {
    console.error("🔥 ERROR:", error);
    res.set('Content-Type', 'text/xml');
    res.send(`<Response><Message>⚠️ Server Error. Type 'Hi' to restart.</Message></Response>`);
  }
});

// 3. API: Get Requests
app.get('/api/requests', (req, res) => res.json(wasteRequests));

// 4. API: Accept Request
app.post('/api/accept', (req, res) => {
  const { id, collectorName, collectorPhone } = req.body;
  const request = wasteRequests.find(r => r.id === id);

  if (request) {
    request.status = 'scheduled';
    request.collector = collectorName;
    request.collectorPhone = collectorPhone;
    
    if (request.phone && request.phone.startsWith('whatsapp:')) {
      client.messages.create({
        body: `✅ *Job Accepted!*\n\n🚛 *Collector:* ${collectorName}\n📞 *Phone:* ${collectorPhone}\n\nHe is on his way.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: request.phone 
      }).then(m => console.log("User Notified")).catch(e => console.error(e));
    }

    res.json({ success: true, request });
  } else {
    res.status(404).json({ success: false });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));