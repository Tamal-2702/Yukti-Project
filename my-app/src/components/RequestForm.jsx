import React, { useState } from "react";
import { Camera, Send, MapPin, Loader2, Sparkles, Phone } from "lucide-react";

export function RequestForm({ onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [location, setLocation] = useState("");
  const [aiTag, setAiTag] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null); // Photo store karne ke liye

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)} (Detected)`);
      }, () => alert("Location access denied!"));
    } else {
      alert("Geolocation not supported");
    }
  };

  // Image ko Backend bhejne layak banana (Base64 format)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAnalyzing(true);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result); // Image ka data save kiya
        
        // Fake AI processing
        setTimeout(() => {
          setAnalyzing(false);
          setAiTag("High Value Verified ✅"); 
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const trackingId = "YUK-" + Math.floor(1000 + Math.random() * 9000); 

    const requestData = {
      trackingId: trackingId,
      flatNumber: formData.get("flatNumber"),
      phone: formData.get("phone"), // NEW PHONE FIELD
      location: location || "Manual Entry",
      residentName: formData.get("residentName"),
      category: formData.get("category"),
      userImage: uploadedImage, // NEW: Uploaded photo bhej rahe hain
      aiStatus: aiTag || "Pending Scan",
      notes: "Auto-detected via YUKTI AI",
    };

    try {
      await fetch('http://localhost:5000/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });
      onSubmit();
      e.target.reset();
      setAiTag(null);
      setLocation("");
      setUploadedImage(null);
      alert(`Request Logged! Tracking ID: ${trackingId}`);
    } catch (error) { console.error(error); }
    setLoading(false);
  };

  return (
    <div className="rounded-xl border bg-white shadow-sm p-6">
      <h3 className="font-bold text-lg mb-1 flex justify-between">
        Log New Pickup
        {aiTag && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center gap-1"><Sparkles size={10}/> AI Verified</span>}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-xs font-bold text-gray-500">Location / Flat</label>
            <input name="flatNumber" required placeholder="Flat A-302" className="w-full border rounded-md p-2 text-sm" />
          </div>
          <div className="flex-1 relative">
            <label className="text-xs font-bold text-gray-500">GPS Coords</label>
            <div className="flex">
              <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Click Map Icon" className="w-full border rounded-l-md p-2 text-sm bg-gray-50" />
              <button type="button" onClick={handleGetLocation} className="bg-blue-600 text-white px-3 rounded-r-md hover:bg-blue-700">
                <MapPin size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* NEW: Phone Number Field */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500">Resident Phone</label>
            <div className="relative">
              <Phone size={14} className="absolute left-2 top-2.5 text-gray-400"/>
              <input name="phone" type="tel" required placeholder="9876543210" className="w-full border rounded-md p-2 pl-8 text-sm" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500">Category</label>
            <select name="category" className="w-full border rounded-md p-2 text-sm">
              <option value="paper">Paper</option>
              <option value="metals">Metals</option>
              <option value="ewaste">E-Waste</option>
              <option value="plastic">Plastic</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>
        </div>
        
        <div className="w-full">
            <label className="text-xs font-bold text-gray-500">Resident Name</label>
            <input name="residentName" required placeholder="Full Name" className="w-full border rounded-md p-2 text-sm" />
        </div>

        <div className="relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors overflow-hidden">
           {uploadedImage ? (
             <img src={uploadedImage} alt="Preview" className="h-32 object-contain" />
           ) : analyzing ? (
             <div className="flex flex-col items-center text-blue-600 animate-pulse">
               <Loader2 className="animate-spin mb-2"/> <span className="text-xs font-bold">Analyzing Waste...</span>
             </div>
           ) : (
             <>
               <Camera className="w-8 h-8 mb-2" />
               <span className="text-xs">Upload Photo (Overrides Default)</span>
               <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*"/>
             </>
           )}
        </div>

        <button type="submit" disabled={loading || analyzing} className="w-full bg-green-600 text-white py-2 rounded-md font-bold hover:bg-green-700 flex justify-center items-center gap-2">
          {loading ? "Broadcasting..." : <><Send size={16} /> Broadcast Request</>}
        </button>
      </form>
    </div>
  );
}