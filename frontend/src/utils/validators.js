import { VALIDATION_RULES, ERRORS } from './constants';

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateEmail = (email) => {
  if (!email) return ERRORS.REQUIRED_FIELD;
  if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) return ERRORS.INVALID_EMAIL;
  return null;
};

/**
 * Validate password
 * @param {string} password - Password to validate
 * @returns {string|null} Error message or null if valid
 */
export const validatePassword = (password) => {
  if (!password) return ERRORS.REQUIRED_FIELD;
  if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) return ERRORS.PASSWORD_TOO_SHORT;
  return null;
};

/**
 * Validate password confirmation
 * @param {string} password - Original password
 * @param {string} confirmPassword - Password confirmation
 * @returns {string|null} Error message or null if valid
 */
export const validatePasswordConfirmation = (password, confirmPassword) => {
  if (!confirmPassword) return ERRORS.REQUIRED_FIELD;
  if (password !== confirmPassword) return ERRORS.PASSWORDS_DONT_MATCH;
  return null;
};

/**
 * Validate required field
 * @param {string} value - Value to check
 * @param {string} fieldName - Name of the field for error message
 * @returns {string|null} Error message or null if valid
 */
export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * Validate phone number (Sri Lankan format)
 * @param {string} phone - Phone number to validate
 * @returns {string|null} Error message or null if valid
 */
export const validatePhone = (phone) => {
  if (!phone) return null; // Phone is optional in some cases
  if (!VALIDATION_RULES.PHONE_REGEX.test(phone)) return ERRORS.INVALID_PHONE;
  return null;
};

/**
 * Validate customer registration form
 * @param {object} formData - Form data to validate
 * @returns {object} Object with field errors
 */
export const validateCustomerRegistration = (formData) => {
  const errors = {};

  errors.firstName = validateRequired(formData.firstName, 'First name');
  errors.lastName = validateRequired(formData.lastName, 'Last name');
  errors.email = validateEmail(formData.email);
  errors.password = validatePassword(formData.password);
  errors.confirmPassword = validatePasswordConfirmation(formData.password, formData.confirmPassword);
  errors.phoneNumber = validatePhone(formData.phoneNumber);

  // Remove null errors
  Object.keys(errors).forEach(key => {
    if (errors[key] === null) delete errors[key];
  });

  return errors;
};

/**
 * Validate pharmacy registration form
 * @param {object} formData - Form data to validate
 * @returns {object} Object with field errors
 */
export const validatePharmacyRegistration = (formData) => {
  const errors = {};

  errors.firstName = validateRequired(formData.firstName, 'First name');
  errors.lastName = validateRequired(formData.lastName, 'Last name');
  errors.email = validateEmail(formData.email);
  errors.password = validatePassword(formData.password);
  errors.confirmPassword = validatePasswordConfirmation(formData.password, formData.confirmPassword);
  errors.phoneNumber = validateRequired(formData.phoneNumber, 'Phone number') || validatePhone(formData.phoneNumber);
  errors.pharmacyName = validateRequired(formData.pharmacyName, 'Pharmacy name');
  errors.licenseNumber = validateRequired(formData.licenseNumber, 'License number');
  errors.businessAddress = validateRequired(formData.businessAddress, 'Business address');

  // Remove null errors
  Object.keys(errors).forEach(key => {
    if (errors[key] === null) delete errors[key];
  });

  return errors;
};

/**
 * Validate login form
 * @param {object} formData - Form data to validate
 * @returns {object} Object with field errors
 */
export const validateLogin = (formData) => {
  const errors = {};

  errors.email = validateEmail(formData.email);
  errors.password = validateRequired(formData.password, 'Password');

  // Remove null errors
  Object.keys(errors).forEach(key => {
    if (errors[key] === null) delete errors[key];
  });

  return errors;
};

/**
 * Check if form has any errors
 * @param {object} errors - Error object
 * @returns {boolean} True if form has errors
 */
export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};

/**
 * Get first error message from errors object
 * @param {object} errors - Error object
 * @returns {string|null} First error message or null
 */
export const getFirstError = (errors) => {
  const errorKeys = Object.keys(errors);
  if (errorKeys.length === 0) return null;
  return errors[errorKeys[0]];
};