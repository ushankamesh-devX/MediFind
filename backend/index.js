// index.js - Main entry point for MediFind Backend API
require('dotenv').config();
const app = require('./src/app');
const config = require('./src/config/config');

const PORT = config.PORT;

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 MediFind Backend API is running on port ${PORT}`);
  console.log(`📊 Environment: ${config.NODE_ENV}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API Documentation:`);
  console.log(`   POST /api/auth/register/customer - Register customer`);
  console.log(`   POST /api/auth/register/pharmacy - Register pharmacy`);
  console.log(`   POST /api/auth/login - User login`);
  console.log(`   POST /api/auth/logout - User logout`);
  console.log(`   GET /api/auth/validate-session - Validate session`);
  console.log(`   GET /api/user/profile - Get user profile`);
  console.log(`   PUT /api/user/profile - Update user profile`);
  console.log(`   PUT /api/user/pharmacy-details - Update pharmacy details`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = app;