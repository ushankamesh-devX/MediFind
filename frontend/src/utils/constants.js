// API Configuration
export const API_BASE_URL = 'http://localhost:4000/api';

// User Types
export const USER_TYPES = {
  CUSTOMER: 'customer',
  PHARMACY_OWNER: 'pharmacy_owner',
};

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  PHONE_REGEX: /^(\+94|0)[0-9]{9}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  SESSION_TOKEN: 'sessionToken',
  USER: 'user',
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  REGISTER_CUSTOMER: '/register/customer',
  REGISTER_PHARMACY: '/register/pharmacy',
  DASHBOARD: '/dashboard',
  FORGOT_PASSWORD: '/forgot-password',
};

// Status Messages
export const MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  NETWORK_ERROR: 'Network error. Please try again.',
  VALIDATION_ERROR: 'Please check your input and try again.',
};

// Error Messages
export const ERRORS = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  LOGIN_FAILED: 'Invalid email or password',
  REGISTRATION_FAILED: 'Registration failed. Please try again.',
};

// Days of the week for operating hours
export const DAYS_OF_WEEK = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

// Default operating hours
export const DEFAULT_OPERATING_HOURS = {
  monday: { open: '08:00', close: '20:00' },
  tuesday: { open: '08:00', close: '20:00' },
  wednesday: { open: '08:00', close: '20:00' },
  thursday: { open: '08:00', close: '20:00' },
  friday: { open: '08:00', close: '20:00' },
  saturday: { open: '08:00', close: '20:00' },
  sunday: { open: '08:00', close: '20:00' },
};

// Pharmacy status options
export const PHARMACY_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  BUSY: 'busy',
};

// Medicine availability status
export const AVAILABILITY_STATUS = {
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
  LIMITED: 'limited',
};