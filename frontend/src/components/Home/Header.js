import React from 'react';

function Header({ userName }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-blue-600">MediFind</h1>
        </div>
        
        <div className="flex gap-2">
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </button>
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Profile"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
