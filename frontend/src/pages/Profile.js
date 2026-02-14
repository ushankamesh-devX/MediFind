import React, { useState, useEffect } from 'react';
import Header from '../components/global/Header';
import Footer from '../components/global/Footer';
import BottomNav from '../components/global/BottomNav';

function Profile() {
    const [userEmail, setUserEmail] = useState('');
    const [profile, setProfile] = useState({
        fullName: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        setUserEmail(email || '');
    }, []);

    const handleSave = () => {
        // TODO: Save profile to backend
        setIsEditing(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            <Header />

            <main className="flex-1 pb-20 md:pb-0">
                {/* Page Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-bold mb-2">My Profile</h1>
                        <p className="text-blue-100 text-lg">Manage your account settings</p>
                    </div>
                </div>

                <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
                    <div className="max-w-3xl mx-auto">
                        {/* Profile Card */}
                        <div className="bg-white shadow-lg p-8 mb-6">
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg text-white text-3xl font-bold">
                                    {userEmail.substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">{profile.fullName || 'User'}</h2>
                                    <p className="text-gray-600">{userEmail}</p>
                                </div>
                            </div>

                            {/* Profile Form */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={profile.fullName}
                                            onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-600 disabled:bg-gray-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            value={profile.phone}
                                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-600 disabled:bg-gray-100"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                    <input
                                        type="text"
                                        value={profile.address}
                                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-600 disabled:bg-gray-100"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                        <input
                                            type="text"
                                            value={profile.city}
                                            onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-600 disabled:bg-gray-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                                        <input
                                            type="text"
                                            value={profile.state}
                                            onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-600 disabled:bg-gray-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                                        <input
                                            type="text"
                                            value={profile.zipCode}
                                            onChange={(e) => setProfile({ ...profile, zipCode: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-600 disabled:bg-gray-100"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    {isEditing ? (
                                        <>
                                            <button
                                                onClick={handleSave}
                                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                                            >
                                                Save Changes
                                            </button>
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-all"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                                        >
                                            Edit Profile
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="w-full py-4 bg-red-600 text-white font-semibold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}

export default Profile;
