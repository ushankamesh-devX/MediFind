// src/middleware/auth.js
const authService = require('../services/authService');

// Middleware to authenticate user via session token
const authenticateSession = async (req, res, next) => {
  try {
    const sessionToken = req.headers['x-session-token'] || req.body.sessionToken;

    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        message: 'Session token required'
      });
    }

    const user = await authService.getUserBySession(sessionToken);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired session'
      });
    }

    // Attach user to request object
    req.user = {
      userId: user.user_id,
      email: user.email,
      userType: user.user_type
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({
      success: false,
      message: 'Authentication failed'
    });
  }
};

// Middleware to check if user is customer
const requireCustomer = (req, res, next) => {
  if (req.user.userType !== 'customer') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Customer role required.'
    });
  }
  next();
};

// Middleware to check if user is pharmacy owner
const requirePharmacyOwner = (req, res, next) => {
  if (req.user.userType !== 'pharmacy_owner') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Pharmacy owner role required.'
    });
  }
  next();
};

// Optional authentication (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const sessionToken = req.headers['x-session-token'] || req.body.sessionToken;

    if (sessionToken) {
      const user = await authService.getUserBySession(sessionToken);
      if (user) {
        req.user = {
          userId: user.user_id,
          email: user.email,
          userType: user.user_type
        };
      }
    }

    next();
  } catch (error) {
    // Don't fail, just continue without authentication
    next();
  }
};

module.exports = {
  authenticateSession,
  requireCustomer,
  requirePharmacyOwner,
  optionalAuth
};