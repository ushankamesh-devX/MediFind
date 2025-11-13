import React from 'react';

function WelcomeSection({ userName }) {
  return (
    <section className="w-full bg-white shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Hello, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{userName}</span>! 👋
        </h2>
        <p className="text-gray-600 text-lg">Find medicines and pharmacies near you</p>
      </div>
    </section>
  );
}

export default WelcomeSection;
