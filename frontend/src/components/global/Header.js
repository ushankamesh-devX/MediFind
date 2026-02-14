import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Header({ isLoggedIn: propIsLoggedIn, userEmail, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if logged in from props or localStorage
    const token = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('userEmail');

    if (propIsLoggedIn !== undefined) {
      setIsLoggedIn(propIsLoggedIn);
    } else if (token) {
      setIsLoggedIn(true);
    }

    if (userEmail) {
      setUserName(userEmail.split('@')[0]);
    } else if (storedEmail) {
      setUserName(storedEmail.split('@')[0]);
    }
  }, [propIsLoggedIn, userEmail]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MediFind
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                Home
              </Link>
              <Link to="/search" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                Search
              </Link>
              <Link to="/favorites" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                Favorites
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                Contact
              </Link>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="hidden lg:flex items-center bg-gray-100 px-4 py-2 w-64">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search medicines..."
                className="bg-transparent border-none outline-none ml-2 w-full text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Location */}
            <button className="hidden md:flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium">New York</span>
            </button>

            {/* Notifications */}
            <button
              className="relative p-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Notifications"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 shadow-lg"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-3 py-2 transition-colors duration-200"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-label="Profile"
              >
                {isLoggedIn ? (
                  <>
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-md">
                      <span className="text-white font-semibold text-sm uppercase">
                        {userName.substring(0, 2)}
                      </span>
                    </div>
                    <span className="hidden md:block font-medium capitalize">{userName}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="hidden md:block font-medium">Account</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg z-50">
                  {isLoggedIn ? (
                    <>
                      {/* Logged In Menu */}
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-800 capitalize">{userName}</p>
                        <p className="text-xs text-gray-500 mt-1">{userEmail || localStorage.getItem('userEmail')}</p>
                      </div>
                      <div className="py-2">
                        <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>My Profile</span>
                        </Link>
                        <a href="#orders" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          <span>My Orders</span>
                        </a>
                        <Link to="/favorites" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span>Favorites</span>
                        </Link>
                        <a href="#settings" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>Settings</span>
                        </a>
                      </div>
                      <div className="border-t border-gray-200">
                        <button
                          onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('userEmail');
                            setIsLoggedIn(false);
                            setIsProfileOpen(false);
                            if (onLogout) {
                              onLogout();
                            }
                            navigate('/login');
                          }}
                          className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors font-medium"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Logout</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Logged Out Menu */}
                      <div className="py-2">
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            navigate('/login');
                          }}
                          className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                          </svg>
                          <span>Login</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            navigate('/register');
                          }}
                          className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                          </svg>
                          <span>Register</span>
                        </button>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
                        <p className="text-xs text-gray-600">
                          Create an account to save your favorite pharmacies and track orders.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 border-t border-gray-200 px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-col gap-3">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 hover:bg-gray-50 transition-colors duration-200">
              Home
            </Link>
            <Link to="/search" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 hover:bg-gray-50 transition-colors duration-200">
              Search
            </Link>
            <Link to="/favorites" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 hover:bg-gray-50 transition-colors duration-200">
              Favorites
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 hover:bg-gray-50 transition-colors duration-200">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 hover:bg-gray-50 transition-colors duration-200">
              Contact
            </Link>
            <div className="px-4 pt-2">
              <button className="w-full flex items-center gap-2 text-gray-700 hover:text-blue-600 py-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium">New York</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
