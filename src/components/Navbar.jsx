import React, { useState, useEffect } from 'react';
import { Cpu, Menu, X, ArrowUpRight, Mail, Shield, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const resumeHref = portfolioData.personal.resumeUrl || '/Abhishek_Gaur_Resume.pdf';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy
      const sections = ['home', 'achievements', 'workflow', 'projects', 'leadership', 'skills', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 200;

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#home', id: 'home' },
    { name: 'Achievements', href: '#achievements', id: 'achievements' },
    { name: 'Methodology', href: '#workflow', id: 'workflow' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Leadership', href: '#leadership', id: 'leadership' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Certifications', href: '#certifications', id: 'certifications' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/90 py-3 shadow-md shadow-blue-900/5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 p-[1.5px] shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              Abhishek Gaur
            </span>
            <span className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1">
              <Shield className="w-3 h-3 text-blue-500" /> ECE · DEFENCE TECHNOLOGY
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/90 border border-slate-200 rounded-full px-4 py-1.5 backdrop-blur-md shadow-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                activeSection === link.id
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30 font-bold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/70'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA & Socials */}
        <div className="hidden md:flex items-center gap-2.5">
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all shadow-sm"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all shadow-sm"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={resumeHref}
            download="Abhishek_Gaur_Resume.pdf"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-slate-900 hover:bg-blue-700 text-white shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5 text-cyan-300" />
            <span>Resume</span>
          </a>
          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
          className="lg:hidden w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-blue-600 shadow-sm focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 border-b border-slate-200 backdrop-blur-xl px-6 py-6 mt-3 space-y-3 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeSection === link.id
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-blue-600"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-blue-600"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={resumeHref}
                download="Abhishek_Gaur_Resume.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold bg-slate-900 text-white shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-cyan-300" />
                <span>Resume PDF</span>
              </a>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md shadow-blue-600/30"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
