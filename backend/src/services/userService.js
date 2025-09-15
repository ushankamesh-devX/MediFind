// src/services/userService.js
const { User, UserProfile, PharmacyDetails, UserSession } = require('../models');

class UserService {
  // Get user by ID with profile and pharmacy details
  async getUserById(userId) {
    const user = await User.findByPk(userId, {
      include: [
        { model: UserProfile, required: false },
        { model: PharmacyDetails, required: false }
      ]
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  // Update user profile
  async updateUserProfile(userId, profileData) {
    const { dateOfBirth, gender, address, city, postalCode } = profileData;

    const [updatedRowsCount] = await UserProfile.update(
      {
        date_of_birth: dateOfBirth,
        gender,
        address,
        city,
        postal_code: postalCode
      },
      { where: { user_id: userId } }
    );

    if (updatedRowsCount === 0) {
      // Profile doesn't exist, create it
      await UserProfile.create({
        user_id: userId,
        date_of_birth: dateOfBirth,
        gender,
        address,
        city,
        postal_code: postalCode
      });
    }

    return await this.getUserById(userId);
  }

  // Update pharmacy details
  async updatePharmacyDetails(userId, pharmacyData) {
    const {
      pharmacyName,
      licenseNumber,
      businessAddress,
      latitude,
      longitude,
      phoneNumber,
      operatingHours
    } = pharmacyData;

    // Check if license number is already used by another pharmacy
    const existingPharmacy = await PharmacyDetails.findOne({
      where: { license_number: licenseNumber }
    });

    if (existingPharmacy && existingPharmacy.user_id !== userId) {
      throw new Error('License number already in use by another pharmacy');
    }

    const [updatedRowsCount] = await PharmacyDetails.update(
      {
        pharmacy_name: pharmacyName,
        license_number: licenseNumber,
        business_address: businessAddress,
        latitude,
        longitude,
        phone_number: phoneNumber,
        operating_hours: operatingHours
      },
      { where: { user_id: userId } }
    );

    if (updatedRowsCount === 0) {
      throw new Error('Pharmacy details not found');
    }

    return await this.getUserById(userId);
  }

  // Get all active sessions for a user
  async getUserSessions(userId) {
    return await UserSession.findAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']]
    });
  }

  // Deactivate user account
  async deactivateUser(userId) {
    const [updatedRowsCount] = await User.update(
      { is_active: false },
      { where: { user_id: userId } }
    );

    if (updatedRowsCount === 0) {
      throw new Error('User not found');
    }

    // Destroy all user sessions
    await UserSession.destroy({
      where: { user_id: userId }
    });

    return { success: true, message: 'User account deactivated successfully' };
  }

  // Reactivate user account
  async reactivateUser(userId) {
    const [updatedRowsCount] = await User.update(
      { is_active: true },
      { where: { user_id: userId } }
    );

    if (updatedRowsCount === 0) {
      throw new Error('User not found');
    }

    return { success: true, message: 'User account reactivated successfully' };
  }

  // Get user statistics
  async getUserStats() {
    const totalUsers = await User.count();
    const activeUsers = await User.count({ where: { is_active: true } });
    const customers = await User.count({
      where: { user_type: 'customer', is_active: true }
    });
    const pharmacyOwners = await User.count({
      where: { user_type: 'pharmacy_owner', is_active: true }
    });

    return {
      totalUsers,
      activeUsers,
      inactiveUsers: totalUsers - activeUsers,
      customers,
      pharmacyOwners
    };
  }
}

module.exports = new UserService();