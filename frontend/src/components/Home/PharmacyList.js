import React from 'react';
import PharmacyCard from './PharmacyCard';

function PharmacyList({ pharmacies, onPharmacyClick }) {
  return (
    <section className="w-full bg-white py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            Nearby Pharmacies <span className="text-gray-500 font-normal">({pharmacies.length})</span>
          </h3>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
            aria-label="Filter"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            Filter
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pharmacies.map((pharmacy) => (
            <PharmacyCard 
              key={pharmacy.id} 
              pharmacy={pharmacy} 
              onClick={onPharmacyClick}
            />
          ))}
        </div>

        <button className="w-full mt-8 py-4 bg-gray-50 border border-gray-200 text-gray-700 font-medium hover:bg-gray-100 hover:border-gray-300 transition-all duration-200">
          Show More Pharmacies
        </button>
      </div>
    </section>
  );
}

export default PharmacyList;
