import React, { useState } from 'react';
import HeroSection from '../components/Home/HeroSection';
import WelcomeSection from '../components/Home/WelcomeSection';
import SearchSection from '../components/Home/SearchSection';
import MapSection from '../components/Home/MapSection';
import PharmacyList from '../components/Home/PharmacyList';
import BottomNav from '../components/Home/BottomNav';

// Mock data for nearby pharmacies
const mockPharmacies = [
  {
    id: 1,
    name: 'HealthCare Pharmacy',
    distance: 2.3,
    rating: 4.5,
    phone: '+1-555-0123',
    isOpen: true,
    hours: { open: '08:00', close: '21:00' },
    address: '123 Main St, New York, NY',
    latitude: 40.7158,
    longitude: -74.0090
  },
  {
    id: 2,
    name: 'MediPlus Store',
    distance: 3.1,
    rating: 4.8,
    phone: '+1-555-0456',
    isOpen: true,
    hours: { open: '07:00', close: '21:00' },
    address: '456 Oak Ave, New York, NY',
    latitude: 40.7200,
    longitude: -74.0100
  },
  {
    id: 3,
    name: 'City Pharmacy',
    distance: 4.2,
    rating: 4.2,
    phone: '+1-555-0789',
    isOpen: true,
    hours: { open: '00:00', close: '23:59' },
    is24Hours: true,
    address: '789 Elm St, New York, NY',
    latitude: 40.7100,
    longitude: -74.0050
  },
  {
    id: 4,
    name: 'QuickMeds Pharmacy',
    distance: 5.0,
    rating: 4.6,
    phone: '+1-555-1234',
    isOpen: true,
    hours: { open: '09:00', close: '20:00' },
    address: '321 Pine Rd, New York, NY',
    latitude: 40.7250,
    longitude: -74.0120
  },
  {
    id: 5,
    name: 'Community Drugstore',
    distance: 5.8,
    rating: 4.3,
    phone: '+1-555-5678',
    isOpen: false,
    hours: { open: '08:00', close: '18:00' },
    address: '654 Cedar Ln, New York, NY',
    latitude: 40.7050,
    longitude: -74.0030
  }
];

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('map');
  const [userName] = useState('John');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // TODO: Implement actual search functionality
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 pb-20 md:pb-0">
      <HeroSection />
      
      <WelcomeSection userName={userName} />
      
      <SearchSection 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        onLocationClick={handleLocationClick}
      />
      
      <MapSection 
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      
      <PharmacyList 
        pharmacies={mockPharmacies}
        onPharmacyClick={handlePharmacyClick}
      />
      
      <BottomNav />
    </div>
  );
}

export default Home;
