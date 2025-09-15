import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const RegisterPage = () => {
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (userType === 'customer') {
      navigate('/register/customer');
    } else if (userType === 'pharmacy') {
      navigate('/register/pharmacy');
    }
  }, [userType, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-medical-gradient py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-background-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-medical">
            <span className="text-2xl text-theme-primary font-bold">M</span>
          </div>
          <h2 className="text-3xl font-bold text-text-primary">
            Join MediFind
          </h2>
          <p className="mt-2 text-text-secondary">
            Choose your account type to get started
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer Registration Card */}
          <Card className="shadow-medical hover:shadow-card-hover transition-shadow duration-300 cursor-pointer" onClick={() => setUserType('customer')}>
            <Card.Content className="text-center p-8">
              <div className="w-20 h-20 bg-theme-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">👤</span>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Customer Account
              </h3>
              <p className="text-text-secondary mb-6">
                Find pharmacies, check medicine availability, and manage your healthcare needs.
                Get instant access to pharmacy locations and services.
              </p>
              <Button className="w-full" onClick={() => setUserType('customer')}>
                Register as Customer
              </Button>
            </Card.Content>
          </Card>

          {/* Pharmacy Registration Card */}
          <Card className="shadow-pharmacy hover:shadow-card-hover transition-shadow duration-300 cursor-pointer" onClick={() => setUserType('pharmacy')}>
            <Card.Content className="text-center p-8">
              <div className="w-20 h-20 bg-pharmacy-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🏥</span>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Pharmacy Owner
              </h3>
              <p className="text-text-secondary mb-6">
                Register your pharmacy, manage inventory, and connect with customers.
                Grow your business with our comprehensive pharmacy management tools.
              </p>
              <Button variant="success" className="w-full" onClick={() => setUserType('pharmacy')}>
                Register Pharmacy
              </Button>
            </Card.Content>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-text-secondary">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-theme-primary hover:text-interactive-hover transition-colors duration-200 font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;