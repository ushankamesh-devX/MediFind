const API_BASE_URL = 'http://localhost:4000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const sessionToken = localStorage.getItem('sessionToken');
  return {
    'Content-Type': 'application/json',
    ...(sessionToken && { Authorization: `Bearer ${sessionToken}` }),
  };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }

  return data;
};

// Authentication APIs
export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  registerCustomer: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register/customer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  registerPharmacy: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register/pharmacy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        sessionToken: localStorage.getItem('sessionToken'),
      }),
    });
    return handleResponse(response);
  },
};

// User APIs
export const userAPI = {
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  updateProfile: async (profileData) => {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
    });
    return handleResponse(response);
  },

  updatePharmacyDetails: async (pharmacyData) => {
    const response = await fetch(`${API_BASE_URL}/user/pharmacy-details`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(pharmacyData),
    });
    return handleResponse(response);
  },
};

// Pharmacy APIs (for future use)
export const pharmacyAPI = {
  // Add pharmacy-specific APIs here when needed
  search: async (query) => {
    const response = await fetch(`${API_BASE_URL}/pharmacy/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getDetails: async (pharmacyId) => {
    const response = await fetch(`${API_BASE_URL}/pharmacy/${pharmacyId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// Generic API call function
export const apiCall = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: getAuthHeaders(),
    ...options,
  });

  return handleResponse(response);
};

export default {
  auth: authAPI,
  user: userAPI,
  pharmacy: pharmacyAPI,
  call: apiCall,
};