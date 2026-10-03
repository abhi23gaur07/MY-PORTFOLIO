import React from 'react';

export default function CircuitBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Light soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff] via-[#f8faff] to-[#f1f5f9]" />

      {/* Soft atmospheric blue & cyan ambient glows */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[550px] h-[550px] bg-cyan-400/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[700px] h-[700px] bg-indigo-300/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Subtle Light Circuit Grid Lines */}
      <div className="absolute inset-0 bg-circuit-grid opacity-80" />

      {/* Decorative Vector Circuit Traces (Soft Blue) */}
      <svg className="absolute top-20 right-10 w-96 h-96 opacity-25 text-blue-500 hidden lg:block" viewBox="0 0 400 400" fill="none">
        <path d="M50 50 H200 V150 H350" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="50" cy="50" r="4" fill="currentColor" />
        <circle cx="200" cy="150" r="3" fill="currentColor" />
        <circle cx="350" cy="150" r="5" fill="currentColor" />
        <path d="M100 300 V200 H250 V100" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="100" cy="300" r="4" fill="currentColor" />
        <circle cx="250" cy="100" r="4" fill="currentColor" />
      </svg>
      
      <svg className="absolute bottom-40 left-10 w-80 h-80 opacity-20 text-cyan-600 hidden lg:block" viewBox="0 0 300 300" fill="none">
        <path d="M20 280 H120 V180 H280" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="20" cy="280" r="4" fill="currentColor" />
        <circle cx="120" cy="180" r="4" fill="currentColor" />
        <circle cx="280" cy="180" r="5" fill="currentColor" />
      </svg>
    </div>
  );
}
