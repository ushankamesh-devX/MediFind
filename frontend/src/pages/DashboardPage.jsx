import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const DashboardPage = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect due to useEffect
  }

  return (
    <div className="min-h-screen bg-background-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">
                Welcome back, {user.firstName}!
              </h1>
              <p className="text-text-secondary mt-2">
                {user.userType === 'customer'
                  ? 'Find pharmacies and manage your healthcare needs'
                  : 'Manage your pharmacy and connect with customers'
                }
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Dashboard Content */}
        {user.userType === 'customer' ? (
          <CustomerDashboard />
        ) : (
          <PharmacyDashboard />
        )}
      </div>
    </div>
  );
};

const CustomerDashboard = () => {
  const features = [
    {
      icon: '🏥',
      title: 'Find Pharmacies',
      description: 'Search for pharmacies near you',
      action: 'Search Now',
    },
    {
      icon: '💊',
      title: 'Check Availability',
      description: 'Check medicine availability',
      action: 'Check Now',
    },
    {
      icon: '📍',
      title: 'Location Services',
      description: 'Get directions to pharmacies',
      action: 'Get Directions',
    },
    {
      icon: '📋',
      title: 'Order History',
      description: 'View your order history',
      action: 'View History',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <Card key={index} className="hover:shadow-card-hover transition-shadow duration-300">
          <Card.Content className="text-center p-6">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              {feature.title}
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              {feature.description}
            </p>
            <Button size="small" className="w-full">
              {feature.action}
            </Button>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
};

const PharmacyDashboard = () => {
  const features = [
    {
      icon: '📊',
      title: 'Dashboard Overview',
      description: 'View your pharmacy statistics',
      action: 'View Stats',
    },
    {
      icon: '💊',
      title: 'Inventory Management',
      description: 'Manage your medicine inventory',
      action: 'Manage Inventory',
    },
    {
      icon: '👥',
      title: 'Customer Orders',
      description: 'View and manage customer orders',
      action: 'View Orders',
    },
    {
      icon: '⚙️',
      title: 'Settings',
      description: 'Update pharmacy information',
      action: 'Update Settings',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <Card key={index} className="hover:shadow-card-hover transition-shadow duration-300">
          <Card.Content className="text-center p-6">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              {feature.title}
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              {feature.description}
            </p>
            <Button size="small" variant="success" className="w-full">
              {feature.action}
            </Button>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
};

export default DashboardPage;