import React, { useState } from 'react';

export default function KalarasaLanding() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-yellow-300 overflow-hidden relative">
      {/* Left SVG */}
      <div className="absolute top-20 left-8 z-10">
        <img src="/left.svg" alt="Left decoration" className="w-24 h-24" />
      </div>

      {/* Header */}
      <header className="flex justify-end items-center p-6 relative z-10">
        <div className="space-x-4">
          <button className="px-4 py-2 text-black hover:text-red-700 transition-colors duration-300 font-medium">
            Login
          </button>
          <button className="px-6 py-2 text-black hover:text-red-700 transition-colors duration-300 font-medium">
            Signup
          </button>
        </div>
      </header>

      <div className="flex items-center min-h-[calc(100vh-100px)] px-6">
        {/* Left Content */}
        <div className="flex-1 space-y-8 relative z-10 max-w-md">
          <div className="space-y-4">
            <h2 className="text-lg text-black font-normal leading-relaxed">
              EXPLORE{' '}
              <span className="text-red-700 font-bold text-lg">
                INDIAN ART
              </span>
            </h2>
            <p className="text-lg text-black font-normal">
              LIKE NEVER BEFORE
            </p>
            <div className="w-64 h-0.5 bg-black"></div>
          </div>

          <div className="space-y-6 mt-12">
            {[
              'Folk',
              'Tribal Art', 
              'Handicrafts'
            ].map((category, index) => (
              <div
                key={category}
                className={`cursor-pointer transition-all duration-300 ${
                  hoveredCategory === index ? 'transform translate-x-2' : ''
                }`}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <h3 className="text-2xl text-black hover:text-red-700 transition-colors duration-300 font-normal">
                  {category}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content - SVG */}
        <div className="flex-1 flex justify-center items-center relative">
          <img src="/right.svg" alt="Tribal art decoration" className="max-w-lg h-auto" />
        </div>
      </div>
    </div>
  );
}