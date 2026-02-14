import React, { useState, useEffect } from 'react';
import Header from '../components/global/Header';
import Footer from '../components/global/Footer';
import BottomNav from '../components/global/BottomNav';
import PharmacyCard from '../components/Home/PharmacyCard';

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch favorites from backend
        setLoading(false);
    }, []);

    const handlePharmacyClick = (pharmacy) => {
        console.log('Pharmacy clicked:', pharmacy);
        // TODO: Navigate to pharmacy details
    };

    const handleRemoveFavorite = (pharmacyId) => {
        // TODO: Remove from favorites
        setFavorites(favorites.filter(f => f.id !== pharmacyId));
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            <Header />

            <main className="flex-1 pb-20 md:pb-0">
                {/* Page Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-bold mb-2">My Favorites</h1>
                        <p className="text-blue-100 text-lg">Your saved pharmacies</p>
                    </div>
                </div>

                <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : favorites.length === 0 ? (
                        <div className="text-center py-16">
                            <svg className="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                No favorites yet
                            </h3>
                            <p className="text-gray-600 text-lg mb-6">
                                Start adding pharmacies to your favorites for quick access
                            </p>
                            <a
                                href="/"
                                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                            >
                                Browse Pharmacies
                            </a>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {favorites.map((pharmacy) => (
                                <div key={pharmacy.id} className="relative">
                                    <PharmacyCard
                                        pharmacy={pharmacy}
                                        onClick={handlePharmacyClick}
                                    />
                                    <button
                                        onClick={() => handleRemoveFavorite(pharmacy.id)}
                                        className="absolute top-4 right-4 p-2 bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg"
                                        title="Remove from favorites"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}

export default Favorites;
