// src/middleware/validation.js
const { body } = require('express-validator');

// Validation rules for customer registration
const validateCustomerRegistration = [
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('First name is required and must be less than 100 characters'),

  body('lastName')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Last name is required and must be less than 100 characters'),

  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),

  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),

  body('phoneNumber')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number')
];

// Validation rules for pharmacy registration
const validatePharmacyRegistration = [
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('First name is required and must be less than 100 characters'),

  body('lastName')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Last name is required and must be less than 100 characters'),

  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),

  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),

  body('phoneNumber')
    .isMobilePhone()
    .withMessage('Phone number is required and must be valid'),

  body('pharmacyName')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Pharmacy name is required and must be less than 200 characters'),

  body('licenseNumber')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('License number is required and must be less than 100 characters'),

  body('businessAddress')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Business address is required'),

  body('latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),

  body('longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180')
];

// Validation rules for login
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Validation rules for profile update
const validateProfileUpdate = [
  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Date of birth must be a valid date'),

  body('gender')
    .optional()
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be male, female, or other'),

  body('address')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Address must be less than 500 characters'),

  body('city')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('City must be less than 100 characters'),

  body('postalCode')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Postal code must be less than 20 characters')
];

// Validation rules for pharmacy details update
const validatePharmacyUpdate = [
  body('pharmacyName')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Pharmacy name is required and must be less than 200 characters'),

  body('licenseNumber')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('License number is required and must be less than 100 characters'),

  body('businessAddress')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Business address is required'),

  body('phoneNumber')
    .isMobilePhone()
    .withMessage('Phone number must be valid'),

  body('latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),

  body('longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),

  body('operatingHours')
    .optional()
    .isObject()
    .withMessage('Operating hours must be a valid JSON object')
];

module.exports = {
  validateCustomerRegistration,
  validatePharmacyRegistration,
  validateLogin,
  validateProfileUpdate,
  validatePharmacyUpdate
};