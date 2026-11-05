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
 * - Full Dark & Light Mode styling support
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
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        document.documentElement.dataset.mode = 'light';
        localStorage.setItem('abhishek-cinematic-theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        document.documentElement.dataset.mode = 'dark';
        localStorage.setItem('abhishek-cinematic-theme', 'dark');
      }
    }
  };

  const isDark = mode === 'dark';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-[#05070c]/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl shadow-black/80'
            : 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 py-3.5 shadow-md shadow-slate-200/50'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between">
        
        {/* Brand Logo: Stylized "AG." Monogram */}
        <a href="#home" className="flex items-center gap-1 group">
          <span className={`font-sans font-black text-2xl sm:text-3xl tracking-tighter transition-colors drop-shadow-sm ${
            isDark ? 'text-white group-hover:text-cyan-300' : 'text-slate-950 group-hover:text-blue-600'
          }`}>
            AG<span className={isDark ? "text-cyan-400 group-hover:text-amber-400" : "text-blue-600 group-hover:text-amber-500"}>.</span>
          </span>
        </a>

        {/* Center Floating Navigation Links: HOME ABOUT PROJECTS SKILLS CONTACT + RESUME */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-xs font-bold tracking-[0.2em]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative py-1 transition-all duration-200 ${
                  isDark
                    ? isActive ? 'text-white font-extrabold' : 'text-neutral-400 hover:text-white'
                    : isActive ? 'text-blue-600 font-extrabold' : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className={`absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full shadow-md ${
                    isDark
                      ? 'bg-gradient-to-r from-amber-400 via-cyan-400 to-amber-400 shadow-[0_0_10px_#38bdf8]'
                      : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]'
                  }`} />
                )}
              </a>
            );
          })}

          {/* Option of Resume at the top right beside CONTACT */}
          <a
            href="/Abhishek_Gaur_Resume.pdf"
            download="Abhishek_Gaur_Resume.pdf"
            className={`group relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ml-1 ${
              isDark
                ? 'bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-indigo-500/15 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-400/40 hover:border-cyan-300 text-cyan-300 hover:text-white shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                : 'bg-blue-50 hover:bg-blue-100 border border-blue-300 text-blue-700 hover:text-blue-900 shadow-sm'
            }`}
            title="Download Abhishek Gaur's Resume (PDF)"
          >
            <Download className={`w-3.5 h-3.5 group-hover:animate-bounce transition-colors ${isDark ? 'text-cyan-300' : 'text-blue-600'}`} />
            <span>RESUME</span>
          </a>
        </nav>

        {/* Right Action: Sun / Moon Theme Toggle Capsule [ ☼ ☾ ] */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleToggle}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md text-xs font-mono transition-all shadow-sm group cursor-pointer ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 border border-white/15 text-neutral-300 hover:border-cyan-400/50'
                : 'bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800'
            }`}
            aria-label="Toggle theme mode"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
          >
            <Sun className={`w-3.5 h-3.5 transition-all ${!isDark ? 'text-amber-500 scale-125 font-bold' : 'text-neutral-500 group-hover:text-amber-400'}`} />
            <span className={isDark ? "text-neutral-500" : "text-slate-400"}>/</span>
            <Moon className={`w-3.5 h-3.5 transition-all ${isDark ? 'text-cyan-400 scale-125 font-bold' : 'text-slate-400 group-hover:text-cyan-600'}`} />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl border ${
              isDark
                ? 'bg-white/5 border-white/10 text-neutral-300 hover:text-white'
                : 'bg-slate-100 border-slate-300 text-slate-800 hover:text-slate-950'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden backdrop-blur-2xl border-b px-6 py-6 space-y-3 mt-2 shadow-2xl ${
          isDark
            ? 'bg-[#070912]/98 border-cyan-500/20 text-neutral-300'
            : 'bg-white/98 border-slate-200 text-slate-800'
        }`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-[0.2em] transition-colors ${
                isDark ? 'text-neutral-300 hover:text-white hover:bg-white/5' : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
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
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider ${
                isDark
                  ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300'
                  : 'bg-blue-600 text-white shadow-md'
              }`}
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
