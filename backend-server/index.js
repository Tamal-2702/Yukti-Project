const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware (Data padhne ke liye)
app.use(cors());
// IMPORTANT: Image upload ke liye limit badhayi (10MB)
app.use(express.json({ limit: '10mb' })); 

// Dummy Database (Abhi ke liye yaha save karenge)
let wasteRequests = [];

// 1. API to check if server is running
app.get('/', (req, res) => {
  res.send('YUKTI Backend is Running! 🚀');
});

// 2. API to RECEIVE waste request from Guard
app.post('/api/requests', (req, res) => {
  const data = req.body;
  
  // Backend console mein print karo ki kya aaya
  console.log("Nayi Request Aayi (Flat):", data.flatNumber);

  // Data ko list mein add karo
  const newRequest = {
    id: Date.now(),
    ...data, // Isme ab 'userImage' aur 'phone' bhi aa jayega
    status: 'searching', 
    timeLogged: new Date().toLocaleTimeString()
  };
  
  wasteRequests.push(newRequest);

  // Frontend ko success message bhejo
  res.json({ success: true, request: newRequest });
});

// 3. API to SEND list to Dashboard
app.get('/api/requests', (req, res) => {
  res.json(wasteRequests);
});

// 4. API to ACCEPT a request (UPDATED)
app.post('/api/accept', (req, res) => {
  // Ab hum Phone aur ID bhi receive kar rahe hain
  const { id, collectorName, collectorPhone, collectorId } = req.body;

  // List mein wo request dhundo
  const request = wasteRequests.find(r => r.id === id);

  if (request) {
    request.status = 'scheduled'; // Status badal diya
    request.collector = collectorName || 'Unknown Ragpicker';
    request.collectorPhone = collectorPhone || 'Not Shared'; // SAVE PHONE
    request.collectorId = collectorId || 'N/A';             // SAVE ID
    
    res.json({ success: true, request });
    console.log(`Request ID ${id} accepted by ${collectorName} (${collectorPhone})`);
  } else {
    res.status(404).json({ success: false, message: "Request nahi mili" });
  }
});

// Server Start karo
app.listen(PORT, () => {
  console.log(`Server chal raha hai: http://localhost:${PORT}`);
});