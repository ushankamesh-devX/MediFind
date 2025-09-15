// src/controllers/authController.js
const authService = require('../services/authService');
const { validationResult } = require('express-validator');

class AuthController {
  // Register customer
  async registerCustomer(req, res) {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { firstName, lastName, email, password, phoneNumber } = req.body;

      const user = await authService.registerCustomer({
        firstName,
        lastName,
        email,
        password,
        phoneNumber
      });

      res.status(201).json({
        success: true,
        message: 'Customer registered successfully',
        user: {
          userId: user.user_id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          userType: user.user_type
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Registration failed'
      });
    }
  }

  // Register pharmacy owner
  async registerPharmacy(req, res) {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        pharmacyName,
        licenseNumber,
        businessAddress,
        latitude,
        longitude,
        operatingHours
      } = req.body;

      const user = await authService.registerPharmacy({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        pharmacyName,
        licenseNumber,
        businessAddress,
        latitude,
        longitude,
        operatingHours
      });

      res.status(201).json({
        success: true,
        message: 'Pharmacy registered successfully',
        user: {
          userId: user.user_id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          userType: user.user_type
        }
      });
    } catch (error) {
      console.error('Pharmacy registration error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Pharmacy registration failed'
      });
    }
  }

  // Login user
  async login(req, res) {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { email, password } = req.body;

      const result = await authService.login(email, password);

      res.json({
        success: true,
        message: 'Login successful',
        ...result
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(401).json({
        success: false,
        message: error.message || 'Login failed'
      });
    }
  }

  // Logout user
  async logout(req, res) {
    try {
      const sessionToken = req.headers['x-session-token'] || req.body.sessionToken;

      if (!sessionToken) {
        return res.status(400).json({
          success: false,
          message: 'Session token required'
        });
      }

      const result = await authService.logout(sessionToken);

      res.json(result);
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        success: false,
        message: 'Logout failed'
      });
    }
  }

  // Validate session
  async validateSession(req, res) {
    try {
      const sessionToken = req.headers['x-session-token'];

      if (!sessionToken) {
        return res.status(401).json({
          success: false,
          message: 'Session token required'
        });
      }

      const user = await authService.getUserBySession(sessionToken);

      res.json({
        success: true,
        user: {
          userId: user.user_id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          userType: user.user_type
        }
      });
    } catch (error) {
      console.error('Session validation error:', error);
      res.status(401).json({
        success: false,
        message: error.message || 'Invalid session'
      });
    }
  }
}

module.exports = new AuthController();