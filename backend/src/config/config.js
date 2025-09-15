// src/config/config.js
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Database configuration
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'medifind',
  DB_PORT: process.env.DB_PORT || 3306,

  // JWT configuration
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '24h',

  // Session configuration
  SESSION_EXPIRE_HOURS: process.env.SESSION_EXPIRE_HOURS || 24,

  // Password hashing
  SALT_ROUNDS: process.env.SALT_ROUNDS || 12
};