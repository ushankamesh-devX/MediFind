import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isLoggedIn = !!user;

  return (
    <header className="bg-background-primary border-b border-border-primary shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-medical-gradient rounded-lg flex items-center justify-center">
              <span className="text-text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-gradient">MediFind</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-text-secondary hover:text-theme-primary transition-colors duration-200"
            >
              Home
            </Link>
            {isLoggedIn && user.userType === 'pharmacy_owner' && (
              <Link
                to="/dashboard"
                className="text-text-secondary hover:text-theme-primary transition-colors duration-200"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-text-secondary">
                  Welcome, {user.firstName}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-theme-primary text-text-white px-4 py-2 rounded-lg hover:bg-interactive-hover transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-theme-primary hover:text-interactive-hover transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-theme-primary text-text-white px-4 py-2 rounded-lg hover:bg-interactive-hover transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;