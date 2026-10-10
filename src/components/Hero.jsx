import React from 'react';
import { 
  Trophy, 
  Cpu, 
  ArrowRight, 
  Mail, 
  Sparkles, 
  Radio, 
  CheckCircle2, 
  Code2,
  Shield,
  Layers,
  Quote,
  Download,
  FileText,
  Eye
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import ScrollReveal from './ScrollReveal';
import { portfolioData } from '../data/portfolioData';

export default function Hero() {
  const { personal } = portfolioData;
  const resumeHref = personal.resumeUrl || '/Abhishek_Gaur_Resume.pdf';

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Bio */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            <ScrollReveal animation="fade-right" delay={100} className="w-full">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                <span>Electronics Engineering · Specialization in Defence Technology</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Engineering Defence Technology & Embedded Systems Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600">
                Intelligent Realities
              </span>
            </h1>

            {/* Subtitle / Intro paragraph */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Hi, I'm <strong className="text-slate-900 font-bold">{personal.name}</strong> — a B.Tech Electronics Engineering undergraduate with a{' '}
              <span className="text-blue-700 font-semibold underline decoration-blue-300 decoration-2 underline-offset-2">Specialization in Defence Technology</span> at{' '}
              <span className="text-slate-900 font-semibold">Rashtriya Raksha University (RRU)</span>. Keen learner and a Deep Thinker, currently working on embedded systems and IOT projects, with a focused portfolio consisting of curated, high-impact projects.
            </p>

            {/* Institutional Engineering Excellence Banner */}
            <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50/70 border border-blue-200/90 rounded-2xl p-4 shadow-sm flex flex-wrap sm:flex-nowrap items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black shrink-0 shadow-md shadow-blue-500/20">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2">
                  <span className="text-blue-800 font-bold text-xs tracking-wider uppercase bg-blue-100 px-2 py-0.5 rounded border border-blue-200">
                    Rashtriya Raksha University
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono font-medium">
                    National Importance
                  </span>
                </div>
                <p className="text-slate-900 text-sm font-bold mt-1">
                  <span className="text-blue-700 font-black">School of Engineering & Technology</span> · <span className="text-slate-700">Specialization in Defence Technology</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>View Featured Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={resumeHref}
                download="Abhishek_Gaur_Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-slate-900 hover:bg-blue-700 text-white shadow-md shadow-slate-900/15 hover:shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Download className="w-4 h-4 text-cyan-300" />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full font-semibold text-sm bg-white border border-slate-300 text-slate-800 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50/40 transition-all shadow-sm"
              >
                <span>Contact Abhishek</span>
              </a>

              {/* Direct Social Links */}
              <div className="flex items-center gap-2.5 pl-1">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-blue-600 hover:border-blue-400 hover:scale-105 transition-all shadow-sm"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-blue-600 hover:border-blue-400 hover:scale-105 transition-all shadow-sm"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${personal.email}`}
                  aria-label="Email Abhishek"
                  className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-blue-600 hover:border-blue-400 hover:scale-105 transition-all shadow-sm"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Skills Pills */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-600 font-mono">
              <span className="px-3 py-1 rounded-md bg-white border border-slate-200 flex items-center gap-1.5 shadow-xs">
                <Shield className="w-3.5 h-3.5 text-blue-600" /> Defence Tech Specialization
              </span>
              <span className="px-3 py-1 rounded-md bg-white border border-slate-200 flex items-center gap-1.5 shadow-xs">
                <Cpu className="w-3.5 h-3.5 text-blue-600" /> Embedded Systems
              </span>
              <span className="px-3 py-1 rounded-md bg-white border border-slate-200 flex items-center gap-1.5 shadow-xs">
                <Radio className="w-3.5 h-3.5 text-cyan-600" /> IoT & Sensor Telemetry
              </span>
            </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Abhishek's Photo (Stomach to Top Portrait View) */}
          <div className="lg:col-span-5 flex justify-center items-center relative pb-8 sm:pb-12">
            <ScrollReveal animation="fade-left" delay={200} className="w-full flex justify-center">
            
            {/* Soft Ambient Radial Glow (Blue/Cyan) */}
            <div className="absolute w-72 sm:w-80 h-72 sm:h-80 bg-gradient-to-tr from-blue-300/30 to-cyan-300/30 rounded-full blur-3xl pointer-events-none" />

            {/* Main Portrait Frame */}
            <div className="relative group w-full max-w-sm sm:max-w-md">
              
              {/* Outer decorative card frame */}
              <div className="relative p-2.5 rounded-3xl bg-white border-2 border-slate-200 shadow-2xl shadow-blue-900/10 group-hover:border-blue-400 transition-all duration-500">
                
                {/* Photo Container - Cropped cleanly from stomach to top */}
                <div className="relative rounded-[20px] overflow-hidden bg-slate-100 aspect-[3/4] max-h-[500px]">
                  <img
                    src={personal.avatar}
                    alt={`${personal.name} — Electronics Engineer (Defence Technology)`}
                    className="w-full h-full object-cover object-center filter brightness-[1.01] contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Corner Target Accents */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-blue-400 pointer-events-none" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-blue-400 pointer-events-none" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-blue-300 pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-blue-300 pointer-events-none" />
                </div>
              </div>

              {/* Top-Right Circuit Philosophy Quote Card */}
              <div className="absolute -top-10 -right-4 sm:-right-8 lg:-right-12 max-w-[280px] sm:max-w-[320px] bg-white/95 backdrop-blur-md border border-blue-200/90 rounded-2xl p-3.5 sm:p-4 shadow-xl shadow-blue-900/10 z-20 group-hover:border-blue-400 group-hover:shadow-blue-500/15 transition-all duration-300">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 mt-0.5 shadow-xs">
                    <Quote className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        Circuit Philosophy
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-700 italic font-medium leading-relaxed">
                      "Be a living electronic circuit. Practice resistance where needed, like a resistor. Preserve energy where needed, like a capacitor. Direct energy where needed, like a diode. And above all, be driven by a purpose, like an IC."
                    </p>
                  </div>
                </div>
              </div>

              {/* LEFT-BELOW OF PHOTO: Recruiter-Focused Resume Download & Preview Card */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-10 sm:-left-6 lg:-left-12 w-full sm:w-auto sm:min-w-[295px] bg-white/95 backdrop-blur-md border-2 border-blue-300/90 rounded-2xl p-3.5 sm:p-4 shadow-2xl shadow-blue-900/15 z-20 hover:border-blue-600 transition-all duration-300">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shrink-0 shadow-sm shadow-blue-500/30">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        For Recruiters &amp; Companies
                      </span>
                      <p className="text-xs font-black text-slate-900 mt-0.5">
                        Official Engineering Resume
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={resumeHref}
                    download="Abhishek_Gaur_Resume.pdf"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-md shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CV (PDF)</span>
                  </a>
                  <a
                    href={resumeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Preview Resume in Browser"
                    className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </a>
                </div>
              </div>

            </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <ScrollReveal animation="fade-up" delay={250}>
          <div className="mt-16 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6">
            {personal.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-start p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-400 card-hover-lift transition-all">
                <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-600">
                  {stat.value}
                </span>
                <span className="text-sm font-bold text-slate-900 mt-1">
                  {stat.label}
                </span>
                <span className="text-xs text-slate-500 font-mono mt-0.5">
                  {stat.context}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
