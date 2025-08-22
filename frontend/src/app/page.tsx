import React, { useState } from 'react';

export default function KalarasaLanding() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-lime-300 to-yellow-200 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-red-600 animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-24 h-24 rounded-full bg-orange-500 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rotate-45 bg-red-700 animate-spin"></div>
      </div>

      {/* Header */}
      <header className="flex justify-between items-center p-6 relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center text-white font-bold text-lg animate-pulse">
            K
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Kalarasa</h1>
        </div>
        <div className="space-x-4">
          <button className="px-4 py-2 text-gray-800 hover:text-red-700 transition-colors duration-300 font-medium">
            Login
          </button>
          <button className="px-6 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Signup
          </button>
        </div>
      </header>

      <div className="flex items-center min-h-[calc(100vh-100px)] px-6">
        {/* Left Content */}
        <div className="flex-1 space-y-8 relative z-10">
          <div className="space-y-4">
            <h2 className="text-lg text-gray-700 font-medium">
              EXPLORE{' '}
              <span className="text-4xl font-bold text-red-700 bg-white px-2 py-1 rounded-lg shadow-lg">
                INDIAN ART
              </span>
            </h2>
            <p className="text-2xl text-gray-800 font-semibold">
              LIKE NEVER BEFORE
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-red-700 to-orange-500 rounded-full"></div>
          </div>

          <div className="space-y-6 mt-12">
            {[
              { name: 'Folk', icon: '🎭' },
              { name: 'Tribal Art', icon: '🎨' },
              { name: 'Handicrafts', icon: '🏺' }
            ].map((category, index) => (
              <div
                key={category.name}
                className={`group cursor-pointer transition-all duration-300 ${
                  hoveredCategory === index ? 'transform translate-x-4' : ''
                }`}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl group-hover:animate-bounce">{category.icon}</div>
                  <h3 className="text-3xl font-bold text-gray-800 group-hover:text-red-700 transition-colors duration-300">
                    {category.name}
                  </h3>
                </div>
                <div className={`h-1 bg-gradient-to-r from-red-700 to-transparent rounded-full transition-all duration-300 ${
                  hoveredCategory === index ? 'w-48 opacity-100' : 'w-0 opacity-0'
                }`}></div>
              </div>
            ))}
          </div>

          <button className="mt-8 px-8 py-3 bg-gradient-to-r from-red-700 to-red-600 text-white rounded-full hover:from-red-800 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium">
            Explore Now
          </button>
        </div>

        {/* Right Content - Tribal Art */}
        <div className="flex-1 flex justify-center items-center relative">
          <div className="relative">
            {/* Decorative wavy line */}
            <div className="absolute bottom-0 left-0 right-0">
              <svg
                viewBox="0 0 400 20"
                className="w-full h-6 text-red-700 animate-pulse"
                fill="currentColor"
              >
                <path d="M0,10 Q50,5 100,10 T200,10 T300,10 T400,10 L400,20 L0,20 Z" />
              </svg>
            </div>

            {/* Tree */}
            <div className="absolute right-32 bottom-16 text-red-700 animate-sway">
              <svg width="60" height="80" viewBox="0 0 60 80" fill="currentColor">
                <rect x="25" y="50" width="10" height="30" />
                <circle cx="30" cy="35" r="20" />
                <circle cx="20" cy="25" r="8" />
                <circle cx="40" cy="25" r="8" />
                <circle cx="30" cy="15" r="6" />
              </svg>
            </div>

            {/* Dancing figures */}
            <div className="flex space-x-8 items-end pb-8">
              {/* Figure 1 */}
              <div className="text-red-700 animate-dance-left">
                <svg width="80" height="120" viewBox="0 0 80 120" fill="currentColor">
                  <circle cx="40" cy="15" r="8" />
                  <rect x="35" y="25" width="10" height="30" />
                  <rect x="30" y="50" width="20" height="15" />
                  <rect x="25" y="65" width="10" height="25" />
                  <rect x="45" y="65" width="10" height="25" />
                  <rect x="20" y="30" width="15" height="8" transform="rotate(-30 27.5 34)" />
                  <rect x="45" y="25" width="15" height="8" transform="rotate(45 52.5 29)" />
                </svg>
              </div>

              {/* Figure 2 */}
              <div className="text-red-700 animate-dance-right">
                <svg width="80" height="120" viewBox="0 0 80 120" fill="currentColor">
                  <circle cx="40" cy="15" r="8" />
                  <rect x="35" y="25" width="10" height="30" />
                  <rect x="30" y="50" width="20" height="15" />
                  <rect x="25" y="65" width="10" height="25" />
                  <rect x="45" y="65" width="10" height="25" />
                  <rect x="10" y="35" width="15" height="8" transform="rotate(-45 17.5 39)" />
                  <rect x="55" y="30" width="15" height="8" transform="rotate(30 62.5 34)" />
                </svg>
              </div>

              {/* Figure 3 */}
              <div className="text-red-700 animate-dance-left">
                <svg width="80" height="120" viewBox="0 0 80 120" fill="currentColor">
                  <circle cx="40" cy="15" r="8" />
                  <rect x="35" y="25" width="10" height="30" />
                  <rect x="30" y="50" width="20" height="15" />
                  <rect x="25" y="65" width="10" height="25" />
                  <rect x="45" y="65" width="10" height="25" />
                  <rect x="20" y="25" width="15" height="8" transform="rotate(30 27.5 29)" />
                  <rect x="45" y="35" width="15" height="8" transform="rotate(-30 52.5 39)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes dance-left {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-5px) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(0deg); }
          75% { transform: translateY(-5px) rotate(2deg); }
        }
        
        @keyframes dance-right {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(2deg); }
          50% { transform: translateY(-15px) rotate(0deg); }
          75% { transform: translateY(-8px) rotate(-2deg); }
        }

        @keyframes sway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(3deg); }
        }

        .animate-dance-left {
          animation: dance-left 2s ease-in-out infinite;
        }
        
        .animate-dance-right {
          animation: dance-right 2.5s ease-in-out infinite;
        }

        .animate-sway {
          animation: sway 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}