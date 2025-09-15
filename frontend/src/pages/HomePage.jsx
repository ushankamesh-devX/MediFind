import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const HomePage = () => {
  const features = [
    {
      icon: '🏥',
      title: 'Find Pharmacies',
      description: 'Locate nearby pharmacies with real-time availability and contact information.',
    },
    {
      icon: '📱',
      title: 'Easy Registration',
      description: 'Quick and simple registration for both customers and pharmacy owners.',
    },
    {
      icon: '⏰',
      title: '24/7 Access',
      description: 'Access pharmacy services and information anytime, anywhere.',
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your health information is protected with enterprise-grade security.',
    },
  ];

  const stats = [
    { number: '1000+', label: 'Pharmacies' },
    { number: '50000+', label: 'Customers' },
    { number: '24/7', label: 'Support' },
    { number: '99.9%', label: 'Uptime' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-medical-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-text-white mb-6">
              Your Health, Our Priority
            </h1>
            <p className="text-xl md:text-2xl text-text-white/90 mb-8 max-w-3xl mx-auto">
              Connect with trusted pharmacies in Sri Lanka. Find medicines, get health advice,
              and manage your healthcare needs with MediFind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register/customer">
                <Button size="large" className="bg-background-primary text-theme-primary hover:bg-background-secondary">
                  Get Started as Customer
                </Button>
              </Link>
              <Link to="/register/pharmacy">
                <Button size="large" variant="outline" className="border-text-white text-text-white hover:bg-text-white hover:text-theme-primary">
                  Register Your Pharmacy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Why Choose MediFind?
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              We're revolutionizing healthcare access in Sri Lanka with innovative technology
              and trusted partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-card-hover transition-shadow duration-300">
                <Card.Content className="pt-6">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary">
                    {feature.description}
                  </p>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-theme-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-text-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-pharmacy-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-text-white/90 mb-8">
            Join thousands of customers and pharmacies already using MediFind
            to improve healthcare access in Sri Lanka.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register/customer">
              <Button size="large" className="bg-background-primary text-theme-primary hover:bg-background-secondary">
                Sign Up as Customer
              </Button>
            </Link>
            <Link to="/register/pharmacy">
              <Button size="large" variant="outline" className="border-text-white text-text-white hover:bg-text-white hover:text-pharmacy-green">
                Register Pharmacy
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;