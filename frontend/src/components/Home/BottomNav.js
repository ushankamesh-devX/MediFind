import React from 'react';

function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg flex justify-around px-4 py-3 z-30">
      <button className="flex flex-col items-center gap-1 py-2 text-blue-600 flex-1 max-w-[100px]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" clipRule="evenodd"/>
        </svg>
        <span className="text-xs font-semibold">Home</span>
      </button>
      
      <button className="flex flex-col items-center gap-1 py-2 text-gray-500 hover:text-blue-600 transition-colors flex-1 max-w-[100px]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35"/>
        </svg>
        <span className="text-xs font-medium">Search</span>
      </button>
      
      <button className="flex flex-col items-center gap-1 py-2 text-gray-500 hover:text-blue-600 transition-colors flex-1 max-w-[100px]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
        <span className="text-xs font-medium">Favorites</span>
      </button>
      
      <button className="flex flex-col items-center gap-1 py-2 text-gray-500 hover:text-blue-600 transition-colors flex-1 max-w-[100px]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
        <span className="text-xs font-medium">Profile</span>
      </button>
    </nav>
  );
}

export default BottomNav;
