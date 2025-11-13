import React from 'react';

function HeroSection() {
  return (
    <div className="relative w-full h-[700px] bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Content */}
      <div className="relative h-full px-8 flex items-center">
        <div className="w-full md:w-1/2">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Find Your Medicine
            <span className="block text-3xl md:text-4xl mt-2 text-blue-100">
              Anytime, Anywhere
            </span>
          </h1>
          <p className="text-lg md:text-xl text-blue-50 mb-8">
            Search thousands of pharmacies near you and get the medicines you need instantly.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
            Get Started
          </button>
        </div>

        {/* Hero Image/Illustration */}
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <div className="relative">
            {/* Medical Cross Icon */}
            <div className="w-64 h-64 bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-48 h-48 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </div>
            {/* Floating Pills */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white bg-opacity-30 backdrop-blur-sm flex items-center justify-center animate-bounce">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
              </svg>
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white bg-opacity-30 backdrop-blur-sm flex items-center justify-center" style={{ animationDelay: '0.5s' }}>
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg className="w-full h-12 md:h-16   " viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#f9fafb" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#f9fafb" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#f9fafb"></path>
        </svg>
      </div>
    </div>
  );
}

export default HeroSection;
