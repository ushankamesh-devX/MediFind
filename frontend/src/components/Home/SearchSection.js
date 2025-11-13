import React from 'react';

function SearchSection({ searchQuery, setSearchQuery, onSearch, onLocationClick }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <section className="w-full bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <form onSubmit={handleSubmit} className="flex gap-3 mb-4">
          <div className="flex-1 relative flex items-center">
            <svg 
              className="absolute left-4 text-gray-400 pointer-events-none" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            
            <input
              type="text"
              className="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              placeholder="Search for medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            {searchQuery && (
              <button 
                type="button"
                className="absolute right-3 p-1 hover:bg-gray-100 transition-colors"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>
          
          <button 
            type="submit"
            className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-md hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center"
            aria-label="Search"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </button>
        </form>

        <button 
          className="w-full flex items-center justify-center gap-2 py-4 bg-white border border-gray-200 text-gray-700 font-medium hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
          onClick={onLocationClick}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          Use Current Location
        </button>
      </div>
    </section>
  );
}

export default SearchSection;
