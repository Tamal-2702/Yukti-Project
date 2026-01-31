import React from 'react';
import { Recycle, UserCircle, Moon, Sun } from "lucide-react";

export function Header({ isDarkMode, toggleTheme, userRole }) {
  return (
    <header className={`sticky top-0 z-50 w-full border-b backdrop-blur transition-colors duration-300 
      ${isDarkMode ? 'bg-slate-900/90 border-slate-700 text-white' : 'bg-white/95 border-gray-200 text-gray-900'}`}>
      
      <div className="flex h-16 items-center px-4 sm:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl text-green-600">
          <Recycle className="h-6 w-6" />
          <span>YUKTI</span>
        </div>

        {/* Right Side Actions */}
        <div className="ml-auto flex items-center gap-4">
          {/* Dark Mode Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-slate-600'}`}
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-medium">{userRole === 'collector' ? 'Raju (Collector)' : 'Ramesh Kumar'}</span>
            <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              {userRole === 'collector' ? 'Zone: Guwahati' : 'Guard Cabin A'}
            </span>
          </div>
          
          <div className={`h-8 w-8 rounded-full flex items-center justify-center border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-100 border-gray-200'}`}>
            <UserCircle className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
}