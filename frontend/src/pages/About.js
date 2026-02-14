import React from 'react';
import Header from '../components/global/Header';
import Footer from '../components/global/Footer';
import BottomNav from '../components/global/BottomNav';

function About() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            <Header />

            <main className="flex-1 pb-20 md:pb-0">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                    <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl font-bold mb-4">About MediFind</h1>
                        <p className="text-blue-100 text-xl max-w-3xl mx-auto">
                            Your trusted partner in finding pharmacies and medicines quickly and easily
                        </p>
                    </div>
                </div>

                <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
                    {/* Mission Section */}
                    <div className="max-w-4xl mx-auto mb-16">
                        <div className="bg-white shadow-lg p-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-4">
                                At MediFind, we believe that access to healthcare should be simple, fast, and reliable. Our platform connects you with nearby pharmacies, helping you find the medicines you need when you need them.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                We're committed to making healthcare more accessible by providing real-time information about pharmacy locations, operating hours, and medicine availability.
                            </p>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="max-w-6xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">What We Offer</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-6 shadow-lg text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 mx-auto mb-4 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Smart Search</h3>
                                <p className="text-gray-600">
                                    Find pharmacies near you with our intelligent search and filtering system
                                </p>
                            </div>

                            <div className="bg-white p-6 shadow-lg text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 mx-auto mb-4 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Real-Time Info</h3>
                                <p className="text-gray-600">
                                    Get up-to-date information on pharmacy hours and availability
                                </p>
                            </div>

                            <div className="bg-white p-6 shadow-lg text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 mx-auto mb-4 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Easy Navigation</h3>
                                <p className="text-gray-600">
                                    Get directions to any pharmacy with one click using Google Maps
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-white text-center">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <p className="text-5xl font-bold mb-2">1000+</p>
                                <p className="text-blue-100 text-lg">Pharmacies Listed</p>
                            </div>
                            <div>
                                <p className="text-5xl font-bold mb-2">50K+</p>
                                <p className="text-blue-100 text-lg">Happy Users</p>
                            </div>
                            <div>
                                <p className="text-5xl font-bold mb-2">24/7</p>
                                <p className="text-blue-100 text-lg">Available</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}

export default About;
