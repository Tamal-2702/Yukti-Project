import React, { useState, useEffect } from "react";
import { CheckCircle, IndianRupee, MapPin, Clock, Phone } from "lucide-react";

import paperImg from "../assets/paper.jpg";
import metalImg from "../assets/metal.jpg";
import ewasteImg from "../assets/ewaste.jpg";
import plasticImg from "../assets/plastic.jpg";
import mixedImg from "../assets/mixed.png";

export function CollectorDashboard() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = () => {
    fetch('http://localhost:5000/api/requests')
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleAccept = async (id) => {
    // Collector details collect kar rahe hain
    const collectorName = prompt("Enter Name:", "Raju (Ragpicker)");
    if (!collectorName) return;
    
    // Auto-generate details for demo (Real app me login se aayega)
    const collectorPhone = "98" + Math.floor(10000000 + Math.random() * 90000000);
    const collectorId = "COL-" + Math.floor(100 + Math.random() * 900);

    await fetch('http://localhost:5000/api/accept', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, collectorName, collectorPhone, collectorId }),
    });
    fetchRequests();
    alert(`Bid Accepted! Your details (${collectorPhone}) sent to user.`);
  };

  const getWasteImage = (req) => {
    // LOGIC: Agar user ne photo bheji hai, wo use karo. Warna default.
    if (req.userImage) return req.userImage;

    switch (req.category) {
      case "paper": return paperImg;
      case "metals": return metalImg;
      case "ewaste": return ewasteImg;
      case "plastic": return plasticImg;
      case "mixed": return mixedImg;
      default: return mixedImg;
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-blue-900">Available Bids</h2>
          <p className="text-sm text-gray-500">Visual Bidding Interface</p>
        </div>
        <div className="bg-blue-100 px-3 py-1 rounded-full text-blue-800 text-xs font-bold">Live Feed 🟢</div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {requests.map((req) => (
          <div key={req.id} className={`relative overflow-hidden rounded-2xl shadow-lg bg-white ${req.status === 'scheduled' ? 'opacity-50 grayscale' : ''}`}>
            
            <div className="h-48 w-full relative">
              {/* Image Logic Updated Here */}
              <img 
                src={getWasteImage(req)} 
                alt={req.category} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-md">
                {req.category}
              </div>
              {req.userImage && (
                <div className="absolute bottom-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-md text-[10px] font-bold">
                  📷 USER UPLOADED
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{req.flatNumber}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin size={12}/> {req.location}
                  </p>
                  {/* Show User Phone to Collector */}
                  <p className="text-xs text-blue-600 font-bold flex items-center gap-1 mt-1">
                    <Phone size={12}/> {req.phone || "No Phone"}
                  </p>
                </div>
                <div className="text-right">
                   <p className="text-sm font-bold text-green-700 mt-1">Est: ₹150</p>
                </div>
              </div>

              {req.status === 'scheduled' ? (
                <button disabled className="w-full bg-gray-200 text-gray-500 py-3 rounded-xl font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                  <CheckCircle size={18} /> Taken by {req.collector}
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => handleAccept(req.id)} className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 shadow-md flex items-center justify-center gap-2">
                    Accept
                  </button>
                  <button className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 flex items-center justify-center gap-2">
                    <IndianRupee size={16} /> Bid
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}