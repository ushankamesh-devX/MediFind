// src/utils/helpers.js
/**
 * Utility helper functions for the MediFind backend
 */

// Format user response object
const formatUserResponse = (user) => {
  return {
    userId: user.user_id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    userType: user.user_type,
    phoneNumber: user.phone_number,
    isActive: user.is_active,
    createdAt: user.created_at,
    updatedAt: user.updated_at
  };
};

// Format user profile response object
const formatUserProfileResponse = (profile) => {
  if (!profile) return null;

  return {
    dateOfBirth: profile.date_of_birth,
    gender: profile.gender,
    address: profile.address,
    city: profile.city,
    postalCode: profile.postal_code
  };
};

// Format pharmacy details response object
const formatPharmacyResponse = (pharmacy) => {
  if (!pharmacy) return null;

  return {
    pharmacyName: pharmacy.pharmacy_name,
    licenseNumber: pharmacy.license_number,
    businessAddress: pharmacy.business_address,
    latitude: pharmacy.latitude,
    longitude: pharmacy.longitude,
    phoneNumber: pharmacy.phone_number,
    operatingHours: pharmacy.operating_hours
  };
};

// Calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance; // Distance in kilometers
};

// Convert degrees to radians
const toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

// Validate operating hours format
const validateOperatingHours = (hours) => {
  if (!hours || typeof hours !== 'object') return false;

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  for (const day of days) {
    if (hours[day]) {
      const dayHours = hours[day];
      if (!dayHours.open || !dayHours.close) return false;

      // Validate time format (HH:MM)
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(dayHours.open) || !timeRegex.test(dayHours.close)) {
        return false;
      }
    }
  }

  return true;
};

// Generate random string
const generateRandomString = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Check if user is within operating hours
const isWithinOperatingHours = (operatingHours, currentDay, currentTime) => {
  if (!operatingHours || !operatingHours[currentDay]) return false;

  const dayHours = operatingHours[currentDay];
  const openTime = dayHours.open;
  const closeTime = dayHours.close;

  return currentTime >= openTime && currentTime <= closeTime;
};

// Sanitize input string
const sanitizeString = (str) => {
  if (!str) return '';
  return str.trim().replace(/[<>]/g, '');
};

// Pagination helper
const getPagination = (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  return { offset, limit: parseInt(limit) };
};

// Response helper for success
const successResponse = (message, data = null) => {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  };
};

// Response helper for error
const errorResponse = (message, errors = null) => {
  return {
    success: false,
    message,
    errors,
    timestamp: new Date().toISOString()
  };
};

module.exports = {
  formatUserResponse,
  formatUserProfileResponse,
  formatPharmacyResponse,
  calculateDistance,
  toRadians,
  validateOperatingHours,
  generateRandomString,
  isWithinOperatingHours,
  sanitizeString,
  getPagination,
  successResponse,
  errorResponse
};