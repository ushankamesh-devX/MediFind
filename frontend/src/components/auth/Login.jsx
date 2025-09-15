import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
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

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrors({ general: result.message || 'Login failed. Please try again.' });
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
            Welcome Back
          </h2>
          <p className="mt-2 text-text-secondary">
            Sign in to your MediFind account
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
                placeholder="Enter your password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
              />

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="text-theme-primary hover:text-interactive-hover transition-colors duration-200"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                loading={loading}
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-text-secondary">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-theme-primary hover:text-interactive-hover transition-colors duration-200 font-medium"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default Login;