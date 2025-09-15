// src/utils/validators.js
/**
 * Custom validation utility functions
 */

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (Sri Lankan format)
const isValidPhoneNumber = (phone) => {
  // Sri Lankan phone number patterns
  const phoneRegex = /^(\+94|0)[1-9][0-9]{8}$/;
  return phoneRegex.test(phone);
};

// Validate password strength
const isValidPassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Validate license number format
const isValidLicenseNumber = (license) => {
  // Basic validation - alphanumeric with optional hyphens
  const licenseRegex = /^[A-Za-z0-9\-]{3,20}$/;
  return licenseRegex.test(license);
};

// Validate coordinates
const isValidCoordinates = (lat, lng) => {
  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);

  return !isNaN(latNum) && !isNaN(lngNum) &&
         latNum >= -90 && latNum <= 90 &&
         lngNum >= -180 && lngNum <= 180;
};

// Validate operating hours JSON
const isValidOperatingHours = (hours) => {
  if (!hours || typeof hours !== 'object') return false;

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

  for (const day of days) {
    if (hours[day]) {
      const dayHours = hours[day];
      if (!dayHours.open || !dayHours.close) return false;
      if (!timeRegex.test(dayHours.open) || !timeRegex.test(dayHours.close)) return false;
    }
  }

  return true;
};

// Validate date of birth (user must be at least 13 years old)
const isValidDateOfBirth = (dateOfBirth) => {
  if (!dateOfBirth) return true; // Optional field

  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= 13 && age <= 120;
};

// Validate postal code (Sri Lankan format)
const isValidPostalCode = (postalCode) => {
  if (!postalCode) return true; // Optional field
  const postalRegex = /^[0-9]{5}$/;
  return postalRegex.test(postalCode);
};

// Validate business address
const isValidAddress = (address) => {
  return address && address.trim().length >= 10 && address.trim().length <= 500;
};

// Validate pharmacy name
const isValidPharmacyName = (name) => {
  return name && name.trim().length >= 2 && name.trim().length <= 200;
};

// Validate user name
const isValidName = (name) => {
  return name && name.trim().length >= 1 && name.trim().length <= 100;
};

// Comprehensive validation for customer registration
const validateCustomerRegistrationData = (data) => {
  const errors = [];

  if (!isValidName(data.firstName)) {
    errors.push('First name is required and must be 1-100 characters');
  }

  if (!isValidName(data.lastName)) {
    errors.push('Last name is required and must be 1-100 characters');
  }

  if (!isValidEmail(data.email)) {
    errors.push('Valid email is required');
  }

  if (!isValidPassword(data.password)) {
    errors.push('Password must be at least 8 characters with uppercase, lowercase, and number');
  }

  if (data.password !== data.confirmPassword) {
    errors.push('Password confirmation does not match');
  }

  if (data.phoneNumber && !isValidPhoneNumber(data.phoneNumber)) {
    errors.push('Invalid phone number format');
  }

  return errors;
};

// Comprehensive validation for pharmacy registration
const validatePharmacyRegistrationData = (data) => {
  const errors = [];

  if (!isValidName(data.firstName)) {
    errors.push('First name is required and must be 1-100 characters');
  }

  if (!isValidName(data.lastName)) {
    errors.push('Last name is required and must be 1-100 characters');
  }

  if (!isValidEmail(data.email)) {
    errors.push('Valid email is required');
  }

  if (!isValidPassword(data.password)) {
    errors.push('Password must be at least 8 characters with uppercase, lowercase, and number');
  }

  if (data.password !== data.confirmPassword) {
    errors.push('Password confirmation does not match');
  }

  if (!isValidPhoneNumber(data.phoneNumber)) {
    errors.push('Valid phone number is required');
  }

  if (!isValidPharmacyName(data.pharmacyName)) {
    errors.push('Pharmacy name is required and must be 2-200 characters');
  }

  if (!isValidLicenseNumber(data.licenseNumber)) {
    errors.push('Valid license number is required');
  }

  if (!isValidAddress(data.businessAddress)) {
    errors.push('Business address is required and must be 10-500 characters');
  }

  if (data.latitude && data.longitude && !isValidCoordinates(data.latitude, data.longitude)) {
    errors.push('Invalid coordinates');
  }

  if (data.operatingHours && !isValidOperatingHours(data.operatingHours)) {
    errors.push('Invalid operating hours format');
  }

  return errors;
};

module.exports = {
  isValidEmail,
  isValidPhoneNumber,
  isValidPassword,
  isValidLicenseNumber,
  isValidCoordinates,
  isValidOperatingHours,
  isValidDateOfBirth,
  isValidPostalCode,
  isValidAddress,
  isValidPharmacyName,
  isValidName,
  validateCustomerRegistrationData,
  validatePharmacyRegistrationData
};