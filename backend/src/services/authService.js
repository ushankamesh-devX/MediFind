// src/services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { User, UserSession, UserProfile, PharmacyDetails } = require('../models');
const config = require('../config/config');

class AuthService {
  // Hash password
  async hashPassword(password) {
    return await bcrypt.hash(password, parseInt(config.SALT_ROUNDS));
  }

  // Verify password
  async verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  // Generate JWT token
  generateToken(user) {
    return jwt.sign(
      {
        userId: user.user_id,
        email: user.email,
        userType: user.user_type
      },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRE }
    );
  }

  // Generate session ID
  generateSessionId() {
    return uuidv4();
  }

  // Create user session
  async createSession(userId, sessionId) {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + parseInt(config.SESSION_EXPIRE_HOURS));

    return await UserSession.create({
      session_id: sessionId,
      user_id: userId,
      expires_at: expiresAt
    });
  }

  // Validate session
  async validateSession(sessionId) {
    const session = await UserSession.findOne({
      where: { session_id: sessionId },
      include: [{
        model: User,
        where: { is_active: true }
      }]
    });

    if (!session) return null;

    // Check if session is expired
    if (new Date() > session.expires_at) {
      await session.destroy();
      return null;
    }

    return session;
  }

  // Destroy session
  async destroySession(sessionId) {
    return await UserSession.destroy({
      where: { session_id: sessionId }
    });
  }

  // Register customer
  async registerCustomer(userData) {
    const { firstName, lastName, email, password, phoneNumber } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const passwordHash = await this.hashPassword(password);

    // Create user
    const user = await User.create({
      email,
      password_hash: passwordHash,
      user_type: 'customer',
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber
    });

    // Create empty user profile
    await UserProfile.create({
      user_id: user.user_id
    });

    return user;
  }

  // Register pharmacy owner
  async registerPharmacy(pharmacyData) {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      pharmacyName,
      licenseNumber,
      businessAddress,
      latitude,
      longitude,
      operatingHours
    } = pharmacyData;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Check if license number already exists
    const existingPharmacy = await PharmacyDetails.findOne({
      where: { license_number: licenseNumber }
    });
    if (existingPharmacy) {
      throw new Error('Pharmacy with this license number already exists');
    }

    // Hash password
    const passwordHash = await this.hashPassword(password);

    // Create user
    const user = await User.create({
      email,
      password_hash: passwordHash,
      user_type: 'pharmacy_owner',
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber
    });

    // Create pharmacy details
    await PharmacyDetails.create({
      user_id: user.user_id,
      pharmacy_name: pharmacyName,
      license_number: licenseNumber,
      business_address: businessAddress,
      latitude,
      longitude,
      phone_number: phoneNumber,
      operating_hours: operatingHours
    });

    return user;
  }

  // Login user
  async login(email, password) {
    // Find user
    const user = await User.findOne({
      where: { email, is_active: true }
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isValidPassword = await this.verifyPassword(password, user.password_hash);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Generate session
    const sessionId = this.generateSessionId();
    await this.createSession(user.user_id, sessionId);

    // Generate JWT token
    const token = this.generateToken(user);

    return {
      user: {
        userId: user.user_id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        userType: user.user_type
      },
      sessionToken: sessionId,
      jwtToken: token
    };
  }

  // Logout user
  async logout(sessionToken) {
    await this.destroySession(sessionToken);
    return { success: true, message: 'Logged out successfully' };
  }

  // Get user by session
  async getUserBySession(sessionToken) {
    const session = await this.validateSession(sessionToken);
    if (!session) {
      throw new Error('Invalid or expired session');
    }

    return session.User;
  }
}

module.exports = new AuthService();