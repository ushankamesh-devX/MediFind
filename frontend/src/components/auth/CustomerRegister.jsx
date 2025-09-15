import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

const CustomerRegister = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { registerCustomer } = useAuth();
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

    if (formData.phoneNumber && !/^(\+94|0)[0-9]{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid Sri Lankan phone number';
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
      const result = await registerCustomer(formData);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-medical-gradient py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-background-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-medical">
            <span className="text-2xl text-theme-primary font-bold">M</span>
          </div>
          <h2 className="text-3xl font-bold text-text-primary">
            Join MediFind
          </h2>
          <p className="mt-2 text-text-secondary">
            Create your customer account
          </p>
        </div>

        <Card className="shadow-medical">
          <Card.Content>
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="bg-theme-error/10 border border-theme-error/20 rounded-lg p-4">
                  <p className="text-theme-error text-sm">{errors.general}</p>
                </div>
              )}

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

              <Input
                type="tel"
                name="phoneNumber"
                placeholder="0771234567"
                label="Phone Number (Optional)"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={errors.phoneNumber}
              />

              <Button
                type="submit"
                className="w-full"
                loading={loading}
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
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
                Are you a pharmacy owner?{' '}
                <Link
                  to="/register/pharmacy"
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

export default CustomerRegister;