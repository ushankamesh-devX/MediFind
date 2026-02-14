import React from 'react';

function MapSection({ viewMode, setViewMode, pharmacies = [] }) {
  // Calculate dynamic statistics
  const totalPharmacies = pharmacies.length;
  const openNow = pharmacies.filter(p => p.isOpen).length;
  const nearest = pharmacies.length > 0
    ? Math.min(...pharmacies.map(p => parseFloat(p.distance) || 999)).toFixed(1)
    : '0.0';

  return (
    <section className="w-full bg-white shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Header with View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Nearby Pharmacies</h2>
            <p className="text-gray-600 mt-1">Find the closest pharmacies to your location</p>
          </div>

          <div className="flex gap-2 bg-gray-100 p-1">
            <button
              className={`flex items-center gap-2 px-4 py-2 font-medium transition-all duration-200 ${viewMode === 'map'
                ? 'bg-white text-blue-600 shadow-md'
                : 'text-gray-600 hover:text-blue-600'
                }`}
              onClick={() => setViewMode('map')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Map View
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 font-medium transition-all duration-200 ${viewMode === 'list'
                ? 'bg-white text-blue-600 shadow-md'
                : 'text-gray-600 hover:text-blue-600'
                }`}
              onClick={() => setViewMode('list')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              List View
            </button>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg overflow-hidden">
          {/* Map Placeholder with Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `
              linear-gradient(0deg, #e5e7eb 1px, transparent 1px),
              linear-gradient(90deg, #e5e7eb 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}></div>

          {/* Map Markers */}
          <div className="absolute top-1/4 left-1/4 animate-pulse">
            <div className="relative">
              <div className="w-10 h-10 bg-blue-600 shadow-lg flex items-center justify-center transform -translate-x-1/2 -translate-y-full">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 animate-pulse" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="w-10 h-10 bg-purple-600 shadow-lg flex items-center justify-center transform -translate-x-1/2 -translate-y-full">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="absolute top-2/3 left-2/3 animate-pulse" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              <div className="w-10 h-10 bg-green-600 shadow-lg flex items-center justify-center transform -translate-x-1/2 -translate-y-full">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Center Info */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="bg-white shadow-xl px-6 py-4 pointer-events-auto">
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-lg font-bold text-gray-800">Interactive Map</p>
                  <p className="text-sm text-gray-600">Google Maps will be integrated here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="bg-white p-3 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button className="bg-white p-3 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
              </svg>
            </button>
            <button className="bg-white p-3 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 text-center">
            <p className="text-3xl font-bold text-blue-600">{totalPharmacies}</p>
            <p className="text-sm text-gray-600 mt-1">Pharmacies Found</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 text-center">
            <p className="text-3xl font-bold text-green-600">{openNow}</p>
            <p className="text-sm text-gray-600 mt-1">Open Now</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 text-center">
            <p className="text-3xl font-bold text-purple-600">{nearest} km</p>
            <p className="text-sm text-gray-600 mt-1">Nearest</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MapSection;
