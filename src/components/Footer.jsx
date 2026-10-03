import React from 'react';
import { Cpu, Mail, ArrowUp, Heart, Shield } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white border-t border-slate-200 pt-16 pb-12 overflow-hidden z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-100">
          
          {/* Brand & About Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 p-[1.5px] shadow-md shadow-blue-500/20">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Abhishek Gaur
                </h3>
                <p className="text-xs font-mono font-semibold text-blue-600 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-blue-600" /> ECE · Specialization in Defence Technology
                </p>
              </div>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
              B.Tech Electronics Engineering (Specialization in Defence Technology) undergraduate at Rashtriya Raksha University.
            </p>

            {/* Live Operational Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-mono text-blue-700 font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>DEFENCE TECH // HARDWARE // ONLINE</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
              Site Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <a href="#home" className="text-slate-600 hover:text-blue-600 transition-colors">About Me</a>
              <a href="#workflow" className="text-slate-600 hover:text-blue-600 transition-colors">How I Turn Ideas</a>
              <a href="#projects" className="text-slate-600 hover:text-blue-600 transition-colors">Featured Projects</a>
              <a href="#achievements" className="text-slate-600 hover:text-blue-600 transition-colors">Achievements</a>
              <a href="#leadership" className="text-slate-600 hover:text-blue-600 transition-colors">Leadership</a>
              <a href="#skills" className="text-slate-600 hover:text-blue-600 transition-colors">Professional Skills</a>
              <a href="#certifications" className="text-slate-600 hover:text-blue-600 transition-colors">Certifications</a>
              <a href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
              Connect & Repositories
            </h4>
            
            <div className="flex items-center gap-2.5">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all shadow-xs"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all shadow-xs"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                aria-label="Email Abhishek"
                className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all shadow-xs"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <p className="text-[11px] font-mono text-slate-500">
              Rashtriya Raksha University<br />
              Gandhinagar, Gujarat, India
            </p>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} <span className="text-slate-900 font-bold">Abhishek Gaur</span>. All rights reserved.
          </p>

          <p className="flex items-center gap-1 font-medium">
            Built with React, Tailwind CSS & Silicon Passion
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all shadow-xs"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
