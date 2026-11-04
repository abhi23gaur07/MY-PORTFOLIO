import React from 'react';
import { Cpu, Mail, ArrowUp, Shield, ArrowRight, Compass } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

/**
 * Footer - Luxury editorial footer matching Rishi Thakor's portfolio (therishithakor.com).
 */
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact-footer" className="relative bg-[#ebe6e1] dark:bg-[#121111] text-slate-900 dark:text-neutral-100 border-t border-[#d8d0ca] dark:border-[#272322] pt-20 pb-12 overflow-hidden z-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Main Call to Action Block */}
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-black/5 dark:bg-white/10 text-slate-700 dark:text-neutral-300 border border-black/10 dark:border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for New Projects</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08]">
            Need something engineered? <br />
            <span className="font-serif italic font-normal text-blue-700 dark:text-cyan-400">
              Let's make it happen.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 max-w-xl font-normal leading-relaxed">
            I am available for embedded systems R&D, defence technology architectures, IoT hardware telemetry, and custom high-concurrency software. Send me a note and I will get back to you promptly.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-slate-900 font-bold text-sm tracking-wide shadow-lg shadow-black/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Email Abhishek</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#works"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-slate-900 dark:text-white font-bold text-sm border border-black/10 dark:border-white/10 transition-all"
            >
              <Compass className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              <span>See the Doors</span>
            </a>
          </div>
        </div>

        {/* 3-Column Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-10 border-t border-black/10 dark:border-white/10">
          
          {/* Col 1: Flagship Doors */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-neutral-500 font-bold">
              Flagship Doors
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              <li>
                <a href="#works" className="text-slate-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                  Aqua Saviour 💧 · Pipeline Leak ToF Localization
                </a>
              </li>
              <li>
                <a href="#works" className="text-slate-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                  Nexus Nurture 🏠 · 3D Spatial mmWave HVAC Control
                </a>
              </li>
              <li>
                <a href="#works" className="text-slate-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                  The Smart Library 📚 · Automated Campus WhatsApp Platform
                </a>
              </li>
              <li>
                <a href="#works" className="text-slate-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                  Delta Neurons 🧠 · Assistive Healthcare & SIH #1 Winner
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Site Navigation */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-neutral-500 font-bold">
              Site Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-medium">
              <a href="#home" className="text-slate-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Home</a>
              <a href="#works" className="text-slate-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">The Doors</a>
              <a href="#about" className="text-slate-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">My Story</a>
              <a href="#achievements" className="text-slate-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">SIH Awards</a>
              <a href="#workflow" className="text-slate-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Methodology</a>
              <a href="#skills" className="text-slate-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Skills</a>
              <a href="#certifications" className="text-slate-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Certifications</a>
              <a href="#contact" className="text-slate-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Contact</a>
            </div>
          </div>

          {/* Col 3: Status & Credentials */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-neutral-500 font-bold">
              Institutional Status
            </h4>
            <ul className="space-y-1.5 text-xs font-mono text-slate-600 dark:text-neutral-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Rashtriya Raksha University (RRU)</span>
              </li>
              <li>B.Tech Electronics Engineering (Defence Tech)</li>
              <li>Gandhinagar, Gujarat, India</li>
              <li className="pt-2 text-[11px] text-slate-500 dark:text-neutral-500">
                Direct: <a href="mailto:gaurabhishek2309@gmail.com" className="underline hover:text-blue-600 dark:hover:text-cyan-400">gaurabhishek2309@gmail.com</a>
              </li>
            </ul>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-slate-700 dark:text-neutral-200 hover:scale-105 transition-all shadow-xs"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-slate-700 dark:text-neutral-200 hover:scale-105 transition-all shadow-xs"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                aria-label="Email Abhishek"
                className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-slate-700 dark:text-neutral-200 hover:scale-105 transition-all shadow-xs"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} Abhishek Gaur · Designed & Engineered with Silicon Passion</p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
