// src/models/PharmacyDetails.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const PharmacyDetails = sequelize.define('PharmacyDetails', {
  pharmacy_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  pharmacy_name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  license_number: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  business_address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  operating_hours: {
    type: DataTypes.JSON,
    allowNull: true
  }
}, {
  tableName: 'pharmacy_details',
  timestamps: false
});

// Define associations
PharmacyDetails.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasOne(PharmacyDetails, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = PharmacyDetails;