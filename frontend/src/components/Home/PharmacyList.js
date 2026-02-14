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
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>

        {pharmacies.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              No pharmacies found
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              Try adjusting your search or use your current location to find nearby pharmacies
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
              Use Current Location
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pharmacies.map((pharmacy) => (
              <PharmacyCard
                key={pharmacy.id}
                pharmacy={pharmacy}
                onClick={onPharmacyClick}
              />
            ))}
          </div>
        )}
        {pharmacies.length > 0 && (
          <button className="w-full mt-8 py-4 bg-gray-50 border border-gray-200 text-gray-700 font-medium hover:bg-gray-100 hover:border-gray-300 transition-all duration-200">
            Show More Pharmacies
          </button>
        )}
      </div>
    </section>
  );
}

export default PharmacyList;
