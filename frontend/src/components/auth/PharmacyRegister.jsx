import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

const PharmacyRegister = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    pharmacyName: '',
    licenseNumber: '',
    businessAddress: '',
    latitude: '',
    longitude: '',
    operatingHours: {
      monday: { open: '08:00', close: '20:00' },
      tuesday: { open: '08:00', close: '20:00' },
      wednesday: { open: '08:00', close: '20:00' },
      thursday: { open: '08:00', close: '20:00' },
      friday: { open: '08:00', close: '20:00' },
      saturday: { open: '08:00', close: '20:00' },
      sunday: { open: '08:00', close: '20:00' },
    },
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { registerPharmacy } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleOperatingHoursChange = (day, type, value) => {
    setFormData(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          [type]: value,
        },
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^(\+94|0)[0-9]{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid Sri Lankan phone number';
    }

    if (!formData.pharmacyName.trim()) {
      newErrors.pharmacyName = 'Pharmacy name is required';
    }

    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = 'License number is required';
    }

    if (!formData.businessAddress.trim()) {
      newErrors.businessAddress = 'Business address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const result = await registerPharmacy(formData);
      if (result.success) {
        navigate('/login');
      } else {
        setErrors({ general: result.message || 'Registration failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-pharmacy-gradient py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-background-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-pharmacy">
            <span className="text-2xl text-pharmacy-green font-bold">P</span>
          </div>
          <h2 className="text-3xl font-bold text-text-primary">
            Register Your Pharmacy
          </h2>
          <p className="mt-2 text-text-secondary">
            Join MediFind and connect with customers
          </p>
        </div>

        <Card className="shadow-pharmacy">
          <Card.Content>
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="bg-theme-error/10 border border-theme-error/20 rounded-lg p-4">
                  <p className="text-theme-error text-sm">{errors.general}</p>
                </div>
              )}

              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    required
                  />

                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    label="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                  />

                  <Input
                    type="tel"
                    name="phoneNumber"
                    placeholder="0771234567"
                    label="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    error={errors.phoneNumber}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Input
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    label="Password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    required
                  />

                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    label="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    required
                  />
                </div>
              </div>

              {/* Pharmacy Information */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Pharmacy Information</h3>
                <Input
                  type="text"
                  name="pharmacyName"
                  placeholder="Enter pharmacy name"
                  label="Pharmacy Name"
                  value={formData.pharmacyName}
                  onChange={handleChange}
                  error={errors.pharmacyName}
                  required
                />

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Input
                    type="text"
                    name="licenseNumber"
                    placeholder="Enter license number"
                    label="License Number"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    error={errors.licenseNumber}
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Business Address
                  </label>
                  <textarea
                    name="businessAddress"
                    placeholder="Enter full business address"
                    value={formData.businessAddress}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-all duration-200 bg-background-primary text-text-primary placeholder-text-muted resize-none"
                  />
                  {errors.businessAddress && (
                    <p className="mt-1 text-sm text-theme-error">{errors.businessAddress}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Input
                    type="number"
                    name="latitude"
                    placeholder="6.9271"
                    label="Latitude (Optional)"
                    value={formData.latitude}
                    onChange={handleChange}
                    step="any"
                  />

                  <Input
                    type="number"
                    name="longitude"
                    placeholder="79.8612"
                    label="Longitude (Optional)"
                    value={formData.longitude}
                    onChange={handleChange}
                    step="any"
                  />
                </div>
              </div>

              {/* Operating Hours */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Operating Hours</h3>
                <div className="space-y-3">
                  {days.map(day => (
                    <div key={day} className="flex items-center space-x-4">
                      <span className="w-20 text-text-primary capitalize">{day}:</span>
                      <Input
                        type="time"
                        value={formData.operatingHours[day].open}
                        onChange={(e) => handleOperatingHoursChange(day, 'open', e.target.value)}
                        className="w-32"
                      />
                      <span className="text-text-secondary">to</span>
                      <Input
                        type="time"
                        value={formData.operatingHours[day].close}
                        onChange={(e) => handleOperatingHoursChange(day, 'close', e.target.value)}
                        className="w-32"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                loading={loading}
                disabled={loading}
              >
                {loading ? 'Registering Pharmacy...' : 'Register Pharmacy'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-text-secondary">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-theme-primary hover:text-interactive-hover transition-colors duration-200 font-medium"
                >
                  Sign in here
                </Link>
              </p>
              <p className="text-text-secondary mt-2">
                Are you a customer?{' '}
                <Link
                  to="/register/customer"
                  className="text-theme-primary hover:text-interactive-hover transition-colors duration-200 font-medium"
                >
                  Register here
                </Link>
              </p>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default PharmacyRegister;