import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

/**
 * Navbar - 3D Cinematic Navigation Bar matching the reference design.
 * 
 * Features:
 * - Stylized cyan/blue 'A' monogram logo
 * - Floating glassmorphic pill nav menu
 * - Glowing 'Let's Connect →' cyber pill button
 * - Mobile responsive drawer
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['home', 'about', 'doors', 'skills', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'The Doors', href: '#doors', id: 'doors' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Achievements', href: '#achievements', id: 'achievements' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090b11]/90 backdrop-blur-xl border-b border-cyan-500/15 py-3 shadow-2xl shadow-cyan-950/40'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo: Stylized 'A' Monogram + Abhishek Gaur */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-400/50 transition-shadow">
            <div className="w-full h-full bg-[#0a0d14] rounded-full flex items-center justify-center font-black text-cyan-400 font-sans text-base tracking-tighter">
              <span className="bg-gradient-to-b from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent transform group-hover:scale-110 transition-transform">
                A
              </span>
            </div>
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
            Abhishek Gaur
          </span>
        </a>

        {/* Center Floating Glassmorphic Capsule Menu */}
        <nav className="hidden md:flex items-center gap-1 bg-[#10141f]/75 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-xl shadow-xl shadow-black/40">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'text-white font-bold bg-white/10 shadow-inner'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action: Let's Connect Button + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-transparent hover:bg-cyan-500/10 text-white hover:text-cyan-300 font-semibold text-xs tracking-wide border border-cyan-400/40 hover:border-cyan-400 shadow-lg shadow-cyan-500/10 transition-all hover:scale-105 active:scale-95"
          >
            <span>Let's Connect</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400 transition-transform group-hover:translate-x-0.5" />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0f17]/98 backdrop-blur-2xl border-b border-cyan-500/20 px-6 py-6 space-y-3 mt-2 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/30"
            >
              <span>Let's Connect</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
