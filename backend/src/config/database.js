// src/config/database.js
const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
const config = require('./config');

const createDatabaseIfNotExists = async () => {
  try {
    // Connect without specifying database
    const connection = await mysql.createConnection({
      host: config.DB_HOST,
      user: config.DB_USER,
      password: config.DB_PASSWORD || '',
      port: config.DB_PORT,
    });

    // Create database if it doesn't exist
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${config.DB_NAME}\``);
    console.log(`Database '${config.DB_NAME}' ensured to exist.`);
    await connection.end();
  } catch (error) {
    console.error('Error creating database:', error);
    throw error;
  }
};

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: 'mysql',
    logging: config.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      paranoid: false
    }
  }
);

// Test database connection
const testConnection = async () => {
  const maxRetries = 10;
  const retryDelay = 5000; // 5 seconds

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // First, ensure database exists
      await createDatabaseIfNotExists();

      // Then test connection
      await sequelize.authenticate();
      console.log('Database connection has been established successfully.');
      return;
    } catch (error) {
      console.error(`Database connection attempt ${attempt} failed:`, error.message);
      if (attempt === maxRetries) {
        console.error('Unable to connect to the database after', maxRetries, 'attempts:', error);
        process.exit(1);
      }
      console.log(`Retrying in ${retryDelay / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
};

module.exports = {
  sequelize,
  testConnection,
  Sequelize
};