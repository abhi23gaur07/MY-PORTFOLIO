import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';

/**
 * Navbar - 3D Cinematic Navigation Bar matching the reference design.
 * 
 * Features:
 * - Geometric "AG." brand logo on the left
 * - Centered uppercase navigation links: HOME, ABOUT, PROJECTS, SKILLS, CONTACT
 * - Dedicated RESUME download button right beside CONTACT
 * - Active section glowing underline indicator
 * - Right-aligned Sun / Moon theme toggle capsule [ ☼ ☾ ]
 * - Mobile responsive drawer with 1-click resume download
 */
export default function Navbar({ mode = 'dark', onToggleMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['home', 'about', 'doors', 'projects', 'skills', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section === 'doors' ? 'projects' : section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home', id: 'home' },
    { name: 'ABOUT', href: '#about', id: 'about' },
    { name: 'PROJECTS', href: '#doors', id: 'projects' },
    { name: 'SKILLS', href: '#skills', id: 'skills' },
    { name: 'CONTACT', href: '#contact', id: 'contact' }
  ];

  const handleToggle = () => {
    if (onToggleMode) {
      onToggleMode();
    } else {
      // Fallback toggle
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        document.documentElement.classList.remove('dark');
        delete document.documentElement.dataset.mode;
        localStorage.setItem('abhishek-cinematic-theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.dataset.mode = 'dark';
        localStorage.setItem('abhishek-cinematic-theme', 'dark');
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#05070c]/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl shadow-black/80'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between">
        
        {/* Brand Logo: Stylized "AG." Monogram */}
        <a href="#home" className="flex items-center gap-1 group">
          <span className="font-sans font-black text-2xl sm:text-3xl tracking-tighter text-white group-hover:text-cyan-300 transition-colors drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            AG<span className="text-cyan-400 group-hover:text-amber-400 transition-colors">.</span>
          </span>
        </a>

        {/* Center Floating Navigation Links: HOME ABOUT PROJECTS SKILLS CONTACT + RESUME */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-xs font-bold tracking-[0.2em] text-neutral-400">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative py-1 transition-all duration-200 hover:text-white ${
                  isActive ? 'text-white' : 'text-neutral-400'
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-cyan-400 to-amber-400 rounded-full shadow-[0_0_10px_#38bdf8]" />
                )}
              </a>
            );
          })}

          {/* Option of Resume at the top right beside CONTACT */}
          <a
            href="/Abhishek_Gaur_Resume.pdf"
            download="Abhishek_Gaur_Resume.pdf"
            className="group relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-indigo-500/15 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-400/40 hover:border-cyan-300 text-cyan-300 hover:text-white font-mono text-xs font-bold tracking-wider transition-all duration-300 shadow-[0_0_12px_rgba(56,189,248,0.2)] hover:shadow-[0_0_20px_rgba(56,189,248,0.45)] hover:scale-105 active:scale-95 cursor-pointer ml-1"
            title="Download Abhishek Gaur's Resume (PDF)"
          >
            <Download className="w-3.5 h-3.5 text-cyan-300 group-hover:text-white group-hover:animate-bounce transition-colors" />
            <span>RESUME</span>
          </a>
        </nav>

        {/* Right Action: Sun / Moon Theme Toggle Capsule [ ☼ ☾ ] */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleToggle}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 backdrop-blur-md text-xs font-mono text-neutral-300 transition-all hover:border-cyan-400/50 shadow-md group cursor-pointer"
            aria-label="Toggle theme mode"
            title="Toggle theme (Light / Dark)"
          >
            <Sun className={`w-3.5 h-3.5 transition-colors ${mode === 'light' ? 'text-amber-400 scale-110' : 'text-neutral-500 group-hover:text-amber-400/80'}`} />
            <span className="text-[10px] text-neutral-500">/</span>
            <Moon className={`w-3.5 h-3.5 transition-colors ${mode === 'dark' ? 'text-cyan-400 scale-110' : 'text-neutral-500 group-hover:text-cyan-400/80'}`} />
          </button>

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
        <div className="md:hidden bg-[#070912]/98 backdrop-blur-2xl border-b border-cyan-500/20 px-6 py-6 space-y-3 mt-2 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-[0.2em] text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {link.name}
            </a>
          ))}
          {/* Mobile Resume Download Option */}
          <div className="pt-2">
            <a
              href="/Abhishek_Gaur_Resume.pdf"
              download="Abhishek_Gaur_Resume.pdf"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-mono text-xs font-bold tracking-wider"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD RESUME</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
