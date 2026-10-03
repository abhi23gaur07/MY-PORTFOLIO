import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Reading Progress Bar (Electric Blue Glow) */}
      <div className="fixed top-0 left-0 right-0 h-[3.5px] z-[99999] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 transition-all duration-100 ease-out"
          style={{
            width: `${scrollProgress}%`,
            boxShadow: '0 0 10px rgba(37, 99, 235, 0.7), 0 0 20px rgba(6, 182, 212, 0.5)'
          }}
        />
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white/90 backdrop-blur-md border border-blue-200 text-blue-600 shadow-xl shadow-blue-900/10 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:scale-110 active:scale-95 transition-all duration-300 ${
          showBackToTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-5 h-5 stroke-[2.5]" />
      </button>
    </>
  );
}
