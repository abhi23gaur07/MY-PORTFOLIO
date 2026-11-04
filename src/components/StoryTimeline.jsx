import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Trophy, Shield, Cpu, Award, Milestone, ArrowDown } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

/**
 * StoryTimeline - "Let's go back in time" interactive mechanical history track.
 * Replicates the timeline from Rishi Thakor's portfolio (therishithakor.com).
 */
export default function StoryTimeline() {
  const [activeChapter, setActiveChapter] = useState(0);

  const CHAPTERS = [
    {
      year: '2026',
      when: '2026 — Present',
      title: 'B.Tech Electronics Engineering (Defence Technology)',
      subtitle: 'Rashtriya Raksha University (RRU) · Gandhinagar',
      icon: <Shield className="w-5 h-5 text-blue-600 dark:text-cyan-400" />,
      bullets: [
        'Dedicated undergraduate specialization in Defence Technology and mission-critical embedded hardware.',
        'Hands-on research and prototyping with microcontrollers (ARM Cortex-M, STM32, ESP32) and telemetry buses.',
        'Architecting next-generation sensor arrays, power budgets, and digital logic for field deployment.'
      ]
    },
    {
      year: '2026',
      when: 'SIH Internal Round 2026',
      title: 'Smart India Hackathon (SIH) Internal Round Champion',
      subtitle: '#1 in Hardware Category · #8 in Overall Category',
      icon: <Trophy className="w-5 h-5 text-amber-500" />,
      highlight: true,
      bullets: [
        'Secured 1st Place in the Hardware Category across the entire university round with a functioning physical prototype.',
        'Ranked 8th in the Overall Category competing against dozens of software and hardware teams.',
        'Praised by faculty and industry jury for circuit stability, live edge computing demonstration, and deterministic architecture.'
      ]
    },
    {
      year: '2025',
      when: '2025 – 2026',
      title: 'Project Head & Architect — The Smart Library System',
      subtitle: 'Rashtriya Raksha University Campus Circulation Platform',
      icon: <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      bullets: [
        'Engineered an automated campus circulation platform with high-concurrency SQLite WAL database architecture.',
        'Integrated automated multi-channel WhatsApp reminder alerts reducing student book overdues by >60%.',
        'Implemented 48-hour automated inventory reservation hold expirations and multi-role RBAC.'
      ]
    },
    {
      year: '2025',
      when: '2025',
      title: 'Lead & Platform Head — Delta Neurons 🧠',
      subtitle: 'Assistive Cognitive Healthcare Platform for India’s NER',
      icon: <ActivityIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      bullets: [
        'Designed an innovative Offline-to-Online Synchronization Engine with local queue buffering for zero-internet rural clinics.',
        'Developed culturally rooted Assamese/NER sensory reminiscence stimuli for dementia stimulation.',
        'Built real-time telemetry dashboards tracking cognitive degradation and response regression.'
      ]
    },
    {
      year: '2024',
      when: '2024',
      title: 'Quantum Computing & Embedded Systems Workshops',
      subtitle: 'Qubits, Quantum Gates & Hardware Masterclasses',
      icon: <Award className="w-5 h-5 text-blue-500" />,
      bullets: [
        'Participated in the intensive One-Day Workshop on Quantum Computing exploring superposition, entanglement, and logic gates.',
        'Completed specialized hardware masterclasses in embedded C/C++, breadboard verification, and oscilloscope troubleshooting.'
      ]
    }
  ];

  return (
    <section
      id="about"
      className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#f5f1ed] dark:bg-[#161414] transition-colors duration-500 border-t border-b border-[#e2dcd7] dark:border-[#272322]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Analog Mechanical Clock Meter & Digits */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <ScrollReveal animation="fade-right">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-black/5 dark:bg-white/10 text-slate-700 dark:text-neutral-300 border border-black/10 dark:border-white/10">
                <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                Chronological Milestones
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mt-3 font-serif italic">
                Let's go <br className="hidden sm:inline" />
                <span className="not-italic font-sans">back in time.</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 font-mono leading-relaxed pt-1">
                A verified journey through hackathon victories, defence technology studies, and engineering milestones.
              </p>

              {/* Rolling Year Indicator Box */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#201d1c] border-2 border-[#ded6d0] dark:border-[#332b29] shadow-xl inline-block mt-4">
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-neutral-500 mb-1">
                  Active Epoch
                </div>
                <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{CHAPTERS[activeChapter].year}</span>
                  <span className="text-xs font-sans font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-cyan-950/50 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-cyan-800">
                    Chapter 0{activeChapter + 1}
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-500 dark:text-neutral-400 mt-2">
                  {CHAPTERS[activeChapter].when}
                </div>
              </div>

            </ScrollReveal>
          </div>

          {/* Right Column: Vertical Story Track */}
          <div className="lg:col-span-7 relative">
            
            {/* Glowing Rail Line */}
            <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-600 via-cyan-500 to-slate-300 dark:to-neutral-800" />

            <div className="space-y-8 sm:space-y-12 pl-16 relative">
              {CHAPTERS.map((ch, idx) => {
                const isActive = activeChapter === idx;

                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveChapter(idx)}
                    className={`relative p-6 sm:p-8 rounded-3xl transition-all duration-300 border ${
                      ch.highlight
                        ? 'bg-gradient-to-br from-amber-500/[0.08] to-orange-500/[0.04] dark:from-amber-500/[0.12] dark:to-orange-500/[0.05] border-amber-400/50 dark:border-amber-500/30 shadow-xl'
                        : 'bg-white dark:bg-[#201d1c] border-[#ded6d0] dark:border-[#332b29] shadow-md hover:shadow-xl'
                    }`}
                  >
                    {/* Node Dot on Rail */}
                    <div
                      className={`absolute -left-[54px] top-8 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-blue-600 text-white border-white dark:border-slate-900 scale-125 shadow-lg'
                          : 'bg-white dark:bg-[#1a1818] border-slate-300 dark:border-neutral-700 text-slate-500 scale-100'
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-current" />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono font-bold text-blue-700 dark:text-cyan-400 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-white/10">
                        {ch.when}
                      </span>
                      {ch.highlight && (
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                          🏆 SIH Winner
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {ch.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-neutral-400 mb-4">
                      {ch.subtitle}
                    </p>

                    <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-neutral-300">
                      {ch.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-600 dark:text-cyan-400 font-bold shrink-0 mt-0.5">▹</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

function ActivityIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

