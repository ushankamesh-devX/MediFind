// src/models/index.js
const User = require('./User');
const UserProfile = require('./UserProfile');
const PharmacyDetails = require('./PharmacyDetails');
const UserSession = require('./UserSession');

// Export all models
module.exports = {
  User,
  UserProfile,
  PharmacyDetails,
  UserSession
};