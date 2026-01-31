import React from "react";
import { CheckCircle2, Search, CalendarCheck, User, Phone, BadgeCheck } from "lucide-react";

export function StatusBoard({ pickups }) {
  
  const getBadge = (status) => {
    if (status === "searching") return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><Search size={12}/> Finding...</span>;
    if (status === "scheduled") return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><CalendarCheck size={12}/> Confirmed</span>;
    return <span className="text-gray-400 text-xs">-</span>;
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
              <th className="py-3 font-bold">Collector Details</th>
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
                  
                  {/* COLLECTOR DETAILS SECTION */}
                  <td className="py-3">
                    {p.collector ? (
                      <div className="bg-green-50 p-2 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="bg-green-600 text-white p-1 rounded-full"><User size={12}/></div>
                          <span className="font-bold text-xs">{p.collector}</span>
                        </div>
                        <div className="text-xs text-gray-600 space-y-1">
                           <p className="flex items-center gap-1"><BadgeCheck size={10} className="text-blue-500"/> ID: {p.collectorId}</p>
                           <p className="flex items-center gap-1 font-bold text-green-700"><Phone size={10}/> {p.collectorPhone}</p>
                        </div>
                      </div>
                    ) : <span className="text-xs text-gray-400 italic">Waiting for bid...</span>}
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