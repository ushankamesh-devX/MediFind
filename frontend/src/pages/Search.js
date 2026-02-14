import React, { useState } from 'react';
import Header from '../components/global/Header';
import Footer from '../components/global/Footer';
import BottomNav from '../components/global/BottomNav';
import SearchSection from '../components/Home/SearchSection';
import PharmacyList from '../components/Home/PharmacyList';
import PharmacyCardSkeleton from '../components/Home/PharmacyCardSkeleton';

function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [pharmacies, setPharmacies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        openNow: false,
        open24Hours: false,
        minRating: 0
    });

    const handleSearch = () => {
        console.log('Searching for:', searchQuery);
        // TODO: Implement search with filters
    };

    const handleLocationClick = () => {
        console.log('Getting current location...');
        // TODO: Implement geolocation
    };

    const handlePharmacyClick = (pharmacy) => {
        console.log('Pharmacy clicked:', pharmacy);
        // TODO: Navigate to pharmacy details
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            <Header />

            <main className="flex-1 pb-20 md:pb-0">
                {/* Page Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-bold mb-2">Search Pharmacies</h1>
                        <p className="text-blue-100 text-lg">Find the perfect pharmacy for your needs</p>
                    </div>
                </div>

                {/* Search Section */}
                <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
                    <SearchSection
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        onSearch={handleSearch}
                        onLocationClick={handleLocationClick}
                    />

                    {/* Filters */}
                    <div className="bg-white p-6 shadow-md mt-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Filters</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.openNow}
                                    onChange={(e) => setFilters({ ...filters, openNow: e.target.checked })}
                                    className="w-5 h-5 text-blue-600"
                                />
                                <span className="text-gray-700 font-medium">Open Now</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.open24Hours}
                                    onChange={(e) => setFilters({ ...filters, open24Hours: e.target.checked })}
                                    className="w-5 h-5 text-blue-600"
                                />
                                <span className="text-gray-700 font-medium">24/7 Only</span>
                            </label>
                            <div>
                                <label className="text-gray-700 font-medium block mb-2">Minimum Rating</label>
                                <select
                                    value={filters.minRating}
                                    onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })}
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-600"
                                >
                                    <option value="0">Any Rating</option>
                                    <option value="3">3+ Stars</option>
                                    <option value="4">4+ Stars</option>
                                    <option value="4.5">4.5+ Stars</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <PharmacyCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : (
                        <PharmacyList
                            pharmacies={pharmacies}
                            onPharmacyClick={handlePharmacyClick}
                        />
                    )}
                </div>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}

export default Search;
