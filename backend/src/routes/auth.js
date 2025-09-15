// src/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {
  validateCustomerRegistration,
  validatePharmacyRegistration,
  validateLogin
} = require('../middleware/validation');

// Customer registration
router.post(
  '/register/customer',
  validateCustomerRegistration,
  authController.registerCustomer
);

// Pharmacy registration
router.post(
  '/register/pharmacy',
  validatePharmacyRegistration,
  authController.registerPharmacy
);

// Login
router.post(
  '/login',
  validateLogin,
  authController.login
);

// Logout
router.post('/logout', authController.logout);

// Validate session
router.get('/validate-session', authController.validateSession);

module.exports = router;