// API Configuration
// Use nginx proxy route /api which forwards to backend:5000
const API_BASE_URL = `http://${window.location.hostname}/api`;

export default API_BASE_URL;
