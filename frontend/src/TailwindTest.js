// Tailwind CSS Test Component
// You can delete this file after verifying Tailwind works

import React from 'react';

function TailwindTest() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🎉 Tailwind CSS is Working!
        </h1>
        <p className="text-gray-600 mb-4">
          If you can see this styled card with colors and shadows, 
          Tailwind CSS has been successfully installed and configured.
        </p>
        <div className="flex gap-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200">
            Primary Button
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-200">
            Success Button
          </button>
        </div>
      </div>
    </div>
  );
}

export default TailwindTest;
