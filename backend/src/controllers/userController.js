// src/controllers/userController.js
const userService = require('../services/userService');
const { validationResult } = require('express-validator');

class UserController {
  // Get user profile
  async getProfile(req, res) {
    try {
      const userId = req.user.userId;

      const user = await userService.getUserById(userId);

      res.json({
        success: true,
        user: {
          userId: user.user_id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          userType: user.user_type,
          phoneNumber: user.phone_number,
          isActive: user.is_active,
          profile: user.UserProfile ? {
            dateOfBirth: user.UserProfile.date_of_birth,
            gender: user.UserProfile.gender,
            address: user.UserProfile.address,
            city: user.UserProfile.city,
            postalCode: user.UserProfile.postal_code
          } : null,
          pharmacyDetails: user.PharmacyDetails ? {
            pharmacyName: user.PharmacyDetails.pharmacy_name,
            licenseNumber: user.PharmacyDetails.license_number,
            businessAddress: user.PharmacyDetails.business_address,
            latitude: user.PharmacyDetails.latitude,
            longitude: user.PharmacyDetails.longitude,
            phoneNumber: user.PharmacyDetails.phone_number,
            operatingHours: user.PharmacyDetails.operating_hours
          } : null
        }
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get user profile'
      });
    }
  }

  // Update user profile
  async updateProfile(req, res) {
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

      const userId = req.user.userId;
      const profileData = req.body;

      const user = await userService.updateUserProfile(userId, profileData);

      res.json({
        success: true,
        message: 'Profile updated successfully',
        user: {
          userId: user.user_id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          userType: user.user_type,
          profile: user.UserProfile ? {
            dateOfBirth: user.UserProfile.date_of_birth,
            gender: user.UserProfile.gender,
            address: user.UserProfile.address,
            city: user.UserProfile.city,
            postalCode: user.UserProfile.postal_code
          } : null
        }
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to update profile'
      });
    }
  }

  // Update pharmacy details
  async updatePharmacyDetails(req, res) {
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

      const userId = req.user.userId;
      const pharmacyData = req.body;

      const user = await userService.updatePharmacyDetails(userId, pharmacyData);

      res.json({
        success: true,
        message: 'Pharmacy details updated successfully',
        pharmacyDetails: user.PharmacyDetails ? {
          pharmacyName: user.PharmacyDetails.pharmacy_name,
          licenseNumber: user.PharmacyDetails.license_number,
          businessAddress: user.PharmacyDetails.business_address,
          latitude: user.PharmacyDetails.latitude,
          longitude: user.PharmacyDetails.longitude,
          phoneNumber: user.PharmacyDetails.phone_number,
          operatingHours: user.PharmacyDetails.operating_hours
        } : null
      });
    } catch (error) {
      console.error('Update pharmacy details error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to update pharmacy details'
      });
    }
  }

  // Get user sessions
  async getSessions(req, res) {
    try {
      const userId = req.user.userId;

      const sessions = await userService.getUserSessions(userId);

      res.json({
        success: true,
        sessions: sessions.map(session => ({
          sessionId: session.session_id,
          createdAt: session.created_at,
          expiresAt: session.expires_at
        }))
      });
    } catch (error) {
      console.error('Get sessions error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get user sessions'
      });
    }
  }

  // Deactivate account
  async deactivateAccount(req, res) {
    try {
      const userId = req.user.userId;

      const result = await userService.deactivateUser(userId);

      res.json(result);
    } catch (error) {
      console.error('Deactivate account error:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to deactivate account'
      });
    }
  }

  // Get user statistics (admin endpoint)
  async getUserStats(req, res) {
    try {
      const stats = await userService.getUserStats();

      res.json({
        success: true,
        stats
      });
    } catch (error) {
      console.error('Get user stats error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get user statistics'
      });
    }
  }
}

module.exports = new UserController();