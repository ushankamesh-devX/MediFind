import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import API_BASE_URL from './config/api';
import Home from './pages/Home';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/global/Header';
import Footer from './components/global/Footer';
import BottomNav from './components/global/BottomNav';

function App() {
  const [symptoms, setSymptoms] = useState([]);
  const [newSymptom, setNewSymptom] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [userEmail, setUserEmail] = useState('');

  // Get authorization headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  };

  // Handle logout
  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail('');
    setSymptoms([]);
    setShowAuthModal(true);
  }, []);

  // Fetch symptoms (protected)
  const fetchSymptoms = useCallback(() => {
    axios.get(`${API_BASE_URL}/symptoms`, getAuthHeaders())
      .then(res => setSymptoms(res.data))
      .catch(err => {
        console.error(err);
        if (err.response?.status === 401) {
          handleLogout();
        }
      });
  }, [handleLogout]);

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('userEmail');
    if (token) {
      setIsLoggedIn(true);
      setUserEmail(storedEmail || '');
      fetchSymptoms();
    } else {
      setShowAuthModal(true);
    }
  }, [fetchSymptoms]);

  // Add symptom (protected)
  const addSymptom = () => {
    if (newSymptom.trim()) {
      axios.post(`${API_BASE_URL}/symptoms`,
        { text: newSymptom },
        getAuthHeaders()
      )
        .then(() => {
          setNewSymptom('');
          fetchSymptoms(); // Refresh the list
        })
        .catch(err => {
          console.error(err);
          if (err.response?.status === 401) {
            handleLogout();
          }
        });
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', user.email);

      setIsLoggedIn(true);
      setUserEmail(user.email);
      setShowAuthModal(false);
      setEmail('');
      setPassword('');

      fetchSymptoms();
    } catch (err) {
      setAuthError(err.response?.data?.error || 'Login failed');
    }
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthError('');

    try {
      await axios.post(`${API_BASE_URL}/register`, {
        email,
        password
      });

      // After successful registration, automatically log in
      handleLogin(e);
    } catch (err) {
      setAuthError(err.response?.data?.error || 'Registration failed');
    }
  };

  // Toggle between login and register
  const toggleAuthMode = () => {
    setIsRegistering(!isRegistering);
    setAuthError('');
    setEmail('');
    setPassword('');
  };

  // Handle login success
  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setUserEmail(user.email);
    fetchSymptoms();
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
  };

  // Layout wrapper for protected pages
  const ProtectedLayout = ({ children }) => (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Header
          isLoggedIn={isLoggedIn}
          userEmail={userEmail}
          onLogout={handleLogout}
        />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <BottomNav />
      </div>
    </ProtectedRoute>
  );

  // Public layout for About and Contact pages
  const PublicLayout = ({ children }) => (
    <div className="min-h-screen flex flex-col">
      <Header
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onLogout={handleLogout}
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <BottomNav />
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedLayout><Home /></ProtectedLayout>} />
        <Route path="/search" element={<ProtectedLayout><Search /></ProtectedLayout>} />
        <Route path="/favorites" element={<ProtectedLayout><Favorites /></ProtectedLayout>} />
        <Route path="/profile" element={<ProtectedLayout><Profile /></ProtectedLayout>} />

        {/* Redirect to home by default */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
