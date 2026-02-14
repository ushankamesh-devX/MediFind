import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import HeroSection from '../components/Home/HeroSection';
import WelcomeSection from '../components/Home/WelcomeSection';
import SearchSection from '../components/Home/SearchSection';
import MapSection from '../components/Home/MapSection';
import PharmacyList from '../components/Home/PharmacyList';
import BottomNav from '../components/Home/BottomNav';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('map');
  const [userName, setUserName] = useState('User');
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user name if logged in
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      // Simple username extraction from email for now
      const name = userEmail.split('@')[0];
      setUserName(name.charAt(0).toUpperCase() + name.slice(1));
    }
  }, []);

  // Fetch pharmacies
  const fetchPharmacies = useCallback(async (query = '') => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/pharmacies${query ? `?search=${query}` : ''}`);

      // Transform snake_case DB data to camelCase for components
      const transformedData = response.data.map(p => ({
        ...p,
        isOpen: Boolean(p.is_open),
        hours: { open: p.open_time, close: p.close_time },
        // Add random distance for now since we don't have geolocation yet
        distance: (Math.random() * 5 + 0.5).toFixed(1)
      }));

      setPharmacies(transformedData);
      setError(null);
    } catch (err) {
      console.error('Error fetching pharmacies:', err);
      setError('Failed to load pharmacies. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchPharmacies();
  }, [fetchPharmacies]);

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    fetchPharmacies(searchQuery);
  };

  const handleLocationClick = () => {
    console.log('Getting current location...');
    // TODO: Implement geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("Latitude: " + position.coords.latitude +
          "<br>Longitude: " + position.coords.longitude);
        // In the future, send these coords to the backend to sort by distance
      });
    }
  };

  const handlePharmacyClick = (pharmacy) => {
    console.log('Pharmacy clicked:', pharmacy);
    // TODO: Navigate to pharmacy details
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 pb-20 md:pb-0">
      <HeroSection />

      <WelcomeSection userName={userName} />

      <SearchSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        onLocationClick={handleLocationClick}
      />

      {error && (
        <div className="text-center text-red-500 py-4 bg-red-50 mx-4 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <MapSection
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          <PharmacyList
            pharmacies={pharmacies}
            onPharmacyClick={handlePharmacyClick}
          />
        </>
      )}

      <BottomNav />
    </div>
  );
}

export default Home;
