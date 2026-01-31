import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer'; // Ensure Footer exists or remove import
import { RequestForm } from './components/RequestForm';
import { StatusBoard } from './components/StatusBoard';
import { CollectorDashboard } from './components/CollectorDashboard';
import { ShieldCheck, Truck } from 'lucide-react';

function App() {
  const [user, setUser] = useState(null);
  const [pickups, setPickups] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false); // DARK MODE STATE

  // Backend se data laana
  const fetchLatestData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/requests');
      const data = await res.json();
      setPickups(data.reverse());
    } catch (error) { console.error("API Error", error); }
  };

  useEffect(() => {
    if (user) {
      fetchLatestData();
      const interval = setInterval(fetchLatestData, 2000);
      return () => clearInterval(interval);
    }
  }, [user]);

  // LOGIN SCREEN (Theme Supported)
  if (!user) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-green-50'}`}>
        
        {/* Toggle Button for Login Screen */}
        <button onClick={() => setIsDarkMode(!isDarkMode)} className="absolute top-5 right-5 p-2 rounded-full bg-opacity-20 bg-gray-500 text-white">
          {isDarkMode ? "☀️" : "🌙"}
        </button>

        <div className={`p-8 rounded-2xl shadow-lg max-w-md w-full text-center transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'}`}>
          <h1 className="text-3xl font-bold text-green-600 mb-2">YUKTI Login</h1>
          <p className={`mb-8 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Select your role to continue</p>
          
          <div className="space-y-4">
            <button onClick={() => setUser('guard')} className={`w-full flex items-center justify-center gap-3 p-4 border-2 rounded-xl transition-all group ${isDarkMode ? 'border-slate-700 hover:bg-slate-700' : 'border-green-100 hover:bg-green-50'}`}>
              <div className="bg-green-100 p-2 rounded-full"><ShieldCheck className="text-green-700"/></div>
              <div className="text-left"><h3 className="font-bold">Society Guard</h3><p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}>Log pickup requests</p></div>
            </button>
            
            <button onClick={() => setUser('collector')} className={`w-full flex items-center justify-center gap-3 p-4 border-2 rounded-xl transition-all group ${isDarkMode ? 'border-slate-700 hover:bg-slate-700' : 'border-blue-100 hover:bg-blue-50'}`}>
              <div className="bg-blue-100 p-2 rounded-full"><Truck className="text-blue-700"/></div>
              <div className="text-left"><h3 className="font-bold">Waste Collector</h3><p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}>View & Accept Bids</p></div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MAIN APP
  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      <Header isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} userRole={user} />
      
      {/* Role Indicator / Logout */}
      <div className={`border-b px-8 py-2 flex justify-between items-center ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
        <span className="text-sm font-bold flex items-center gap-2">
          {user === 'guard' ? <ShieldCheck size={16} className="text-green-600"/> : <Truck size={16} className="text-blue-600"/>}
          Logged in as: {user === 'guard' ? 'Guard Cabin A' : 'Raju (Collector)'}
        </span>
        <button onClick={() => setUser(null)} className="text-xs text-red-500 font-bold hover:underline">Log Out</button>
      </div>

      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {user === 'guard' ? (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Note: Cards ke andar ka dark mode basic CSS filter se handle karenge simple rakhne ke liye */}
            <div className={isDarkMode ? "invert hue-rotate-180" : ""}>
               <RequestForm onSubmit={fetchLatestData} />
            </div>
            <div className={isDarkMode ? "invert hue-rotate-180" : ""}>
               <StatusBoard pickups={pickups} />
            </div>
          </div>
        ) : (
          <div className={isDarkMode ? "invert-[.95] hue-rotate-180" : ""}>
             <CollectorDashboard />
          </div>
        )}
      </main>
      
      {/* Footer (Optional) */}
      <footer className={`py-4 text-center text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>
        YUKTI © 2026
      </footer>
    </div>
  );
}

export default App;