import React from "react";
import { CheckCircle2, Search, CalendarCheck, User, Phone, BadgeCheck, MessageCircle } from "lucide-react";

export function StatusBoard({ pickups }) {
  
  // LIVE LINK (Jo tumne abhi generate kiya hai - YAHAN APNA LINK DALO)
  // Example: https://idalia-semimountainously-messiah.ngrok-free.dev
  const LIVE_LINK = "https://idalia-semimountainously-messiah.ngrok-free.dev"; 

  const getBadge = (status) => {
    if (status === "searching") return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><Search size={12}/> Finding...</span>;
    if (status === "scheduled") return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><CalendarCheck size={12}/> Confirmed</span>;
    return <span className="text-gray-400 text-xs">-</span>;
  };

  // WhatsApp Message Generator
  const shareOnWhatsApp = (pickup) => {
    const text = `🚨 *YUKTI Pickup Alert* 🚨%0A%0A🏠 *Flat:* ${pickup.flatNumber}%0A📦 *Type:* ${pickup.category}%0A📍 *Location:* ${pickup.location}%0A%0A👇 *Click to Accept Job:*%0A${LIVE_LINK}`;
    
    // Desktop/Mobile dono par chalega
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="rounded-xl border bg-white shadow-sm p-6 h-full">
      <h3 className="font-bold text-lg mb-4">Live Tracking Board</h3>
      <div className="overflow-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 border-b bg-gray-50">
            <tr>
              <th className="py-3 px-2 font-bold">Track ID</th>
              <th className="py-3 font-bold">Flat / Contact</th>
              <th className="py-3 font-bold">Status</th>
              <th className="py-3 font-bold">Action</th> {/* New Column */}
            </tr>
          </thead>
          <tbody>
            {pickups.length === 0 ? (
              <tr><td colSpan="4" className="text-center py-10 text-gray-400">No active requests.</td></tr>
            ) : (
              pickups.map((p, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2 font-mono text-xs text-gray-500">{p.trackingId}</td>
                  <td className="py-3 font-medium">
                    {p.flatNumber} 
                    <br/>
                    <span className="text-xs text-blue-600 flex items-center gap-1">
                       <Phone size={10}/> {p.phone}
                    </span>
                  </td>
                  <td className="py-3">{getBadge(p.status)}</td>
                  
                  {/* WHATSAPP ACTION BUTTON */}
                  <td className="py-3">
                    {p.status === 'searching' ? (
                      <button 
                        onClick={() => shareOnWhatsApp(p)}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-md transition-transform hover:scale-110"
                        title="Broadcast to WhatsApp Group"
                      >
                        <MessageCircle size={16} />
                      </button>
                    ) : (
                      // Agar Scheduled hai toh Collector details dikhao
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-xs flex items-center gap-1"><User size={12}/> {p.collector}</span>
                        <span className="text-[10px] text-gray-500 flex items-center gap-1"><Phone size={10}/> {p.collectorPhone}</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}