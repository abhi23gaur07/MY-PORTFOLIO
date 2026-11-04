import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import DoorModal from './DoorModal';
import ScrollReveal from './ScrollReveal';
import { ArrowRight, Sparkles, Key, Compass, Shield } from 'lucide-react';

/**
 * DoorsSection - 3D Doors Hallway ("Magic happens behind the doors").
 * Replicates the signature viral architectural doors from Rishi Thakor's portfolio (therishithakor.com).
 */
export default function DoorsSection() {
  const { projects } = portfolioData;
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [pressedIndex, setPressedIndex] = useState(-1);

  // 4 curated doors mapping to Abhishek's flagship works
  const DOORS = [
    {
      id: 0,
      slug: 'aqua-saviour',
      plate: 'AQUA SAVIOUR',
      title: 'Aqua Saviour 💧',
      subtitle: 'Underground Pipeline Crack & Leakage Localization',
      color: '#1a2e40', // Deep Marine Blue
      colorDark: '#101d2a',
      accent: '#0284c7',
      bullets: [
        'Acoustic ToF Cross-Correlation (Δt at 820Hz–1.25kHz)',
        'Three.js / WebGL 3D Subsurface Strata Cutaway Model',
        '10-Portal GIS Command Center with NASA & Open-Meteo SMAP',
        'Solar-Powered ESP32 + INMP441 I²S Edge Hardware Nodes'
      ],
      projectData: projects.find((p) => p.id === 'aqua-saviour') || projects[0]
    },
    {
      id: 1,
      slug: 'nexus-nurture',
      plate: 'NEXUS NURTURE',
      title: 'Nexus Nurture 🏠',
      subtitle: '3D Smart Home & Spatial mmWave Energy Automation',
      color: '#4a2f1f', // Rich Terracotta Wood
      colorDark: '#321f14',
      accent: '#ea580c',
      bullets: [
        '24GHz Spatial mmWave Radar + Load-Cell Sensor Fusion',
        'Deterministic Edge HVAC Motorized Louver Steering',
        'Interactive 3D Architectural Digital Twin (Mesh Telemetry)',
        'Sleep-Cycle Biometrics & Siri Voice Shortcuts'
      ],
      projectData: projects.find((p) => p.id === 'nexus-nurture') || projects[1]
    },
    {
      id: 2,
      slug: 'smart-library',
      plate: 'SMART LIBRARY',
      title: 'The Smart Library 📚',
      subtitle: 'Automated Campus Circulation & WhatsApp Engine',
      color: '#213a2d', // Forest Sage
      colorDark: '#14251c',
      accent: '#10b981',
      bullets: [
        'Multi-Channel Automated WhatsApp Reminder Engine',
        'High-Performance SQLite WAL Architecture (<50ms)',
        '48-Hour Automated Inventory Hold Expirations',
        'Zero Physical RFID Bloat · Pure High-Concurrency Software'
      ],
      projectData: projects.find((p) => p.id === 'smart-library') || projects[2]
    },
    {
      id: 3,
      slug: 'delta-neurons',
      plate: 'DELTA NEURONS',
      title: 'Delta Neurons 🧠 & Defence Tech 🛡️',
      subtitle: 'Assistive Dementia Healthcare & SIH Winner',
      color: '#3d1f3b', // Royal Plum
      colorDark: '#281427',
      accent: '#a855f7',
      bullets: [
        'Proprietary Offline-to-Online Sync Engine with Local Queue',
        'Culturally Curated Assamese & NER Reminiscence Stimuli',
        'Smart India Hackathon: #1 Hardware & #8 Overall Category',
        'Reaction Speed Degradation Analytics & Doctor Dashboards'
      ],
      projectData: projects.find((p) => p.id === 'delta-neurons') || projects[3]
    }
  ];

  // Play subtle brass latch sound on door action
  const playLatchSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const actx = new AudioCtx();
      const osc = actx.createOscillator();
      const gain = actx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, actx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, actx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.18, actx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(actx.destination);
      osc.start();
      osc.stop(actx.currentTime + 0.09);
    } catch (e) {}
  };

  const handleDoorClick = (door) => {
    playLatchSound();
    setPressedIndex(door.id);
    setTimeout(() => {
      setPressedIndex(-1);
      setActiveModalProject(door.projectData);
    }, 450);
  };

  const activeDoor = hoveredIndex >= 0 ? DOORS[hoveredIndex] : null;

  return (
    <section
      id="works"
      className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#e8e4e0] via-[#dfd8d3] to-[#e8e4e0] dark:from-[#1a1818] dark:via-[#141212] dark:to-[#1a1818] transition-colors duration-500"
    >
      {/* Wall Texture / Subtle Plaster Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-3">
          <ScrollReveal animation="fade-down" delay={50}>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-black/5 dark:bg-white/10 text-slate-700 dark:text-neutral-300 border border-black/10 dark:border-white/10">
              <Compass className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              Flagship Portfolio Wall
            </span>
          </ScrollReveal>

          <ScrollReveal animation="zoom-in" delay={120}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-neutral-100 font-serif italic">
              Magic happens <br className="hidden sm:inline" />
              <span className="not-italic font-sans">behind the doors.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200}>
            <p className="text-xs sm:text-sm font-mono text-slate-600 dark:text-neutral-400 uppercase tracking-widest pt-2">
              Hover to crack open · Click to step through into the room
            </p>
          </ScrollReveal>
        </div>

        {/* Dynamic Wall Description (Slides in when a door is hovered) */}
        <div
          className={`mx-auto max-w-2xl mb-12 p-5 sm:p-6 rounded-2xl bg-white/90 dark:bg-[#201d1c]/90 backdrop-blur-md border border-[#c9beba] dark:border-[#38312f] shadow-xl transition-all duration-300 ${
            activeDoor ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
          style={{ minHeight: '120px' }}
        >
          {activeDoor && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                    {activeDoor.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 font-medium">
                  {activeDoor.subtitle}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {activeDoor.bullets.slice(0, 2).map((b, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-slate-700 dark:text-neutral-300"
                    >
                      ▹ {b}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleDoorClick(activeDoor)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:scale-105 active:scale-95 transition-all shrink-0 shadow-md"
              >
                <span>Enter Room</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Hallway Row of 4 Arched 3D Doors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-end">
          {DOORS.map((door) => {
            const isHovered = hoveredIndex === door.id;
            const isOtherHovered = hoveredIndex >= 0 && hoveredIndex !== door.id;
            const isPressed = pressedIndex === door.id;

            return (
              <div
                key={door.id}
                onMouseEnter={() => setHoveredIndex(door.id)}
                onMouseLeave={() => setHoveredIndex(-1)}
                onClick={() => handleDoorClick(door)}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  isOtherHovered ? 'opacity-35 blur-[0.5px] scale-[0.98]' : 'opacity-100 scale-100'
                }`}
              >
                {/* Doorway Frame (Arched at the top) */}
                <div className="relative w-full aspect-[1/2.25] rounded-t-[50cqw] rounded-b-md p-1.5 sm:p-2 bg-gradient-to-b from-[#2b2522] to-[#1a1614] border-t-2 border-x-2 border-[#544740] shadow-2xl overflow-visible">
                  
                  {/* Inside Room Background (Visible when door cracks open) */}
                  <div className="absolute inset-2 top-3 rounded-t-[48cqw] rounded-b-xs bg-gradient-to-b from-[#0a0f18] via-[#101826] to-[#0d131f] overflow-hidden flex flex-col justify-end p-3 z-0">
                    <div className="text-[10px] font-mono text-cyan-400/80 font-bold tracking-wider opacity-80 uppercase">
                      [Exhibition 0{door.id + 1}]
                    </div>
                    <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full my-1 opacity-70" />
                    <div className="text-[9px] font-mono text-slate-400 truncate">
                      {door.projectData.stats?.architecture || 'Live Prototype'}
                    </div>
                  </div>

                  {/* 3D Arched Door Leaf (Rotates on Y axis) */}
                  <div
                    className="relative w-full h-full rounded-t-[46cqw] rounded-b-xs origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-10 overflow-hidden shadow-xl"
                    style={{
                      backgroundColor: door.color,
                      transform: isPressed
                        ? 'rotateY(75deg)'
                        : isHovered
                        ? 'rotateY(28deg)'
                        : 'rotateY(0deg)',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Wood Fluting Lines */}
                    <div className="absolute inset-0 opacity-15 pointer-events-none flex justify-between px-2">
                      <div className="w-0.5 h-full bg-white/20" />
                      <div className="w-0.5 h-full bg-black/40" />
                      <div className="w-0.5 h-full bg-white/20" />
                      <div className="w-0.5 h-full bg-black/40" />
                    </div>

                    {/* Brass Nameplate */}
                    <div className="absolute left-1/2 top-[28%] -translate-x-1/2 -translate-y-1/2 w-[72%] py-1.5 sm:py-2 px-1 rounded-sm bg-gradient-to-r from-[#d9be7e] via-[#f7e9b8] to-[#c2a15c] border border-[#fffae8]/60 shadow-md text-center">
                      <span className="block text-[9px] sm:text-[11px] lg:text-xs font-black tracking-widest text-[#2d2110] uppercase truncate drop-shadow-xs">
                        {door.plate}
                      </span>
                    </div>

                    {/* Bevelled Brass Lever Handle & Keyhole */}
                    <div className="absolute right-3 sm:right-4 top-[58%] -translate-y-1/2 flex flex-col items-center">
                      {/* Brass Rose Base */}
                      <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-gradient-to-br from-[#f5e6b5] via-[#c9a75d] to-[#735824] border border-[#ffeec4] shadow-md flex items-center justify-center">
                        {/* Lever Arm */}
                        <div
                          className={`w-4 sm:w-5 h-1.5 rounded-full bg-gradient-to-r from-[#fceebe] to-[#a88236] shadow-sm origin-left transition-transform duration-200 ${
                            isPressed ? 'rotate-25' : 'rotate-0'
                          }`}
                        />
                      </div>
                      {/* Keyhole Escutcheon */}
                      <div className="w-2.5 h-3.5 rounded-xs bg-[#5a431c] border border-[#a88236] mt-1.5 flex flex-col items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-black" />
                        <div className="w-0.5 h-1.5 bg-black" />
                      </div>
                    </div>

                    {/* Door Edge Shadow on open */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-transparent to-black/40 pointer-events-none transition-opacity duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </div>

                  {/* Golden Light Spill (Radiates onto floor when cracked open) */}
                  <div
                    className={`absolute -bottom-10 -left-6 -right-6 h-16 pointer-events-none z-20 transition-all duration-500 ${
                      isHovered
                        ? 'opacity-80 scale-100 blur-[2px]'
                        : 'opacity-0 scale-75 blur-md'
                    }`}
                    style={{
                      background: 'radial-gradient(ellipse at top, rgba(255, 220, 140, 0.65) 0%, rgba(255, 200, 100, 0.25) 55%, transparent 75%)',
                      clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0 100%)'
                    }}
                  />

                  {/* Door Sill / Threshold */}
                  <div className="absolute -bottom-2 -left-2 -right-2 h-2.5 bg-gradient-to-r from-[#1c1816] via-[#3d322c] to-[#1c1816] border-t border-[#69584e] rounded-xs shadow-md z-20" />
                </div>

                {/* Subtitle Label Below Door */}
                <div className="text-center pt-3 sm:pt-4">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {door.title}
                  </h4>
                  <p className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                    {door.slug}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Exhibition Room Modal View */}
      <DoorModal
        project={activeModalProject}
        isOpen={Boolean(activeModalProject)}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
