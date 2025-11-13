import React from 'react';

function PharmacyCard({ pharmacy, onClick }) {
  const getStatusBadge = () => {
    if (!pharmacy.isOpen) {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Closed</span>;
    }
    if (pharmacy.is24Hours) {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Open 24/7</span>;
    }
    return <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Open Now</span>;
  };

  return (
    <div 
      className={`bg-white border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer ${
        !pharmacy.isOpen ? 'opacity-70' : ''
      }`}
      onClick={() => onClick(pharmacy)}
    >
      {/* Header */}
      <div className="flex gap-4 mb-4">
        <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 flex-shrink-0">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
        </div>
        
        <div className="flex-1">
          <h4 className="text-lg font-bold text-gray-800 mb-2">
            {pharmacy.name}
          </h4>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold text-gray-800">{pharmacy.rating}</span>
            </div>
            <span className="text-gray-300">•</span>
            {getStatusBadge()}
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-2xl font-bold text-blue-600 leading-none">
            {pharmacy.distance}
          </span>
          <span className="text-sm text-gray-500">km</span>
        </div>
      </div>

      {/* Body */}
      <div className="py-3 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          <span className="text-gray-700">{pharmacy.phone}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4">
        <button 
          className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 hover:gap-3 transition-all duration-200"
          onClick={(e) => { 
            e.stopPropagation();
            onClick(pharmacy);
          }}
        >
          View Details
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default PharmacyCard;
