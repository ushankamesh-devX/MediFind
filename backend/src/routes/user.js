// src/routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateSession, requirePharmacyOwner } = require('../middleware/auth');
const {
  validateProfileUpdate,
  validatePharmacyUpdate
} = require('../middleware/validation');

// Get user profile (requires authentication)
router.get('/profile', authenticateSession, userController.getProfile);

// Update user profile (requires authentication)
router.put(
  '/profile',
  authenticateSession,
  validateProfileUpdate,
  userController.updateProfile
);

// Update pharmacy details (requires authentication and pharmacy owner role)
router.put(
  '/pharmacy-details',
  authenticateSession,
  requirePharmacyOwner,
  validatePharmacyUpdate,
  userController.updatePharmacyDetails
);

// Get user sessions (requires authentication)
router.get('/sessions', authenticateSession, userController.getSessions);

// Deactivate account (requires authentication)
router.delete('/account', authenticateSession, userController.deactivateAccount);

// Get user statistics (could be admin only in production)
router.get('/stats', userController.getUserStats);

module.exports = router;