import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

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
  }, []);

  // Get authorization headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  };

  // Fetch symptoms (protected)
  const fetchSymptoms = () => {
    axios.get('http://localhost:5000/symptoms', getAuthHeaders())
      .then(res => setSymptoms(res.data))
      .catch(err => {
        console.error(err);
        if (err.response?.status === 401) {
          handleLogout();
        }
      });
  };

  // Add symptom (protected)
  const addSymptom = () => {
    if (newSymptom.trim()) {
      axios.post('http://localhost:5000/symptoms', 
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
      const response = await axios.post('http://localhost:5000/login', {
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
      await axios.post('http://localhost:5000/register', {
        email,
        password
      });

      // After successful registration, automatically log in
      handleLogin(e);
    } catch (err) {
      setAuthError(err.response?.data?.error || 'Registration failed');
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail('');
    setSymptoms([]);
    setShowAuthModal(true);
  };

  // Toggle between login and register
  const toggleAuthMode = () => {
    setIsRegistering(!isRegistering);
    setAuthError('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="App">
      {/* Auth Modal */}
      {showAuthModal && !isLoggedIn && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            <form onSubmit={isRegistering ? handleRegister : handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              {authError && <p className="error">{authError}</p>}
              <button type="submit">
                {isRegistering ? 'Register' : 'Login'}
              </button>
            </form>
            <p className="toggle-auth">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <span onClick={toggleAuthMode}>
                {isRegistering ? 'Login' : 'Register'}
              </span>
            </p>
            <p className="demo-credentials">
              <small>Demo: user@example.com / password</small>
            </p>
          </div>
        </div>
      )}

      {/* Main App (only visible when logged in) */}
      {isLoggedIn && (
        <>
          <div className="header">
            <h1>My Health Tracker</h1>
            <div className="user-info">
              <span>Welcome, {userEmail}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          </div>
          
          <div className="input-section">
            <input
              type="text"
              value={newSymptom}
              onChange={(e) => setNewSymptom(e.target.value)}
              placeholder="Log a symptom (e.g., Headache)"
              onKeyPress={(e) => e.key === 'Enter' && addSymptom()}
            />
            <button onClick={addSymptom}>Add Symptom</button>
          </div>

          <div className="symptoms-list">
            <h3>Your Symptoms</h3>
            {symptoms.length === 0 ? (
              <p className="no-symptoms">No symptoms logged yet. Start tracking your health!</p>
            ) : (
              <ul>
                {symptoms.map(symptom => (
                  <li key={symptom.id}>
                    <span className="symptom-text">{symptom.text}</span>
                    <span className="symptom-date">{symptom.date}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;