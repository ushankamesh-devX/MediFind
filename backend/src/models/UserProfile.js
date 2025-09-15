// src/models/UserProfile.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const UserProfile = sequelize.define('UserProfile', {
  profile_id: {
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
  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: true
  },
  address: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  postal_code: {
    type: DataTypes.STRING(20),
    allowNull: true
  }
}, {
  tableName: 'user_profiles',
  timestamps: false
});

// Define associations
UserProfile.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasOne(UserProfile, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = UserProfile;