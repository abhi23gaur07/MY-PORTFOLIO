import React, { useState } from 'react';
import { 
  Cpu, 
  Zap, 
  Award, 
  CheckCircle2, 
  Sliders, 
  Wrench, 
  Activity, 
  Terminal, 
  Radio, 
  Layers, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BrainCircuit,
  Binary,
  Shield
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';

export default function Skills() {
  const { skills } = portfolioData;
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const currentCategory = skills.categories[activeCategoryIndex];

  const categoryIcons = [
    <Cpu className="w-5 h-5" />,
    <Zap className="w-5 h-5" />,
    <Award className="w-5 h-5" />
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block border border-blue-200 bg-blue-50 rounded-full px-4 py-1.5 text-xs text-blue-700 font-bold mb-4 tracking-wider uppercase shadow-xs">
              {skills.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-5">
              Core Technical &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600">
                Professional Skills
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {skills.description}
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Main Category Selector Buttons (Light Theme) */}
        <ScrollReveal animation="fade-up" delay={120}>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
            {skills.categories.map((cat, idx) => {
            const isActive = activeCategoryIndex === idx;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryIndex(idx)}
                className={`flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/25 scale-[1.02] border border-blue-700'
                    : 'bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 shadow-xs'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-blue-600'}>
                  {categoryIcons[idx]}
                </span>
                <span className="text-left">
                  <span className="block leading-tight">{cat.title}</span>
                  <span className={`text-[10px] font-mono block ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                    {cat.badge}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        </ScrollReveal>

        {/* Category Header Card */}
        <ScrollReveal animation="fade-up" delay={150}>
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shadow-xs">
                  {categoryIcons[activeCategoryIndex]}
                </div>
                <div>
                  <span className="text-xs font-mono text-blue-600 uppercase tracking-widest font-bold">
                    {currentCategory.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    {currentCategory.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    {currentCategory.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {currentCategory.skills.length} Specialized Pillars
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Dynamic Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {currentCategory.skills.map((skill, idx) => (
            <ScrollReveal key={skill.name} animation="fade-up" delay={idx * 70} className="h-full">
              <div
                className="bg-white border border-slate-200 rounded-3xl p-6 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 card-hover-lift transition-all duration-300 flex flex-col justify-between group h-full"
              >
              <div>
                {/* Top Badge & Metric */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                    {skill.categoryTag}
                  </span>
                  <span className="text-xs font-mono font-bold text-blue-700">
                    {skill.level}%
                  </span>
                </div>

                {/* Skill Name */}
                <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {skill.name}
                </h4>

                {/* Exact Technical Description */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  {skill.description}
                </p>
              </div>

              {/* Bottom: Tools Chips & Progress Bar */}
              <div>
                <div className="pt-4 border-t border-slate-100 mb-4">
                  <p className="text-[10px] font-mono uppercase text-slate-500 tracking-wider font-bold mb-2">
                    Tools, Silicon & Methodologies:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.tools.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-100 text-slate-700 border border-slate-200 group-hover:border-blue-300 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Animated Level Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Workbench Matrix / Silicon Architecture Strip (Light Theme) */}
        <ScrollReveal animation="zoom-in" delay={150}>
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl shadow-blue-900/5 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 mb-8 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono text-blue-600 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-blue-600" /> Hardware Engineering Workbench
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                Integrated Silicon & Instrument Ecosystem
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Daily tools, lab equipment, protocols, and EDA software utilized across academic and hackathon builds.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 self-start lg:self-auto font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span>VERIFIED WORKBENCH 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Column 1: Lab Instruments */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 mb-3 text-blue-700">
                <Activity className="w-4 h-4" />
                <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900">Lab Instruments</h5>
              </div>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">▹</span>
                  <span>Digital Storage Oscilloscopes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">▹</span>
                  <span>Logic Analyzers & Bus Sniffers</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">▹</span>
                  <span>True-RMS Digital Multimeters</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">▹</span>
                  <span>Bench DC Variable Power Supply</span>
                </div>
              </div>
            </div>

            {/* Column 2: EDA & Simulation */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 mb-3 text-blue-600">
                <Layers className="w-4 h-4" />
                <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900">EDA & Simulation</h5>
              </div>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">▹</span>
                  <span>Altium Designer (PCB Layout)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">▹</span>
                  <span>KiCad EDA (Schematic Capture)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">▹</span>
                  <span>SPICE / LTspice Circuit Sim</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">▹</span>
                  <span>MATLAB & Simulink Systems</span>
                </div>
              </div>
            </div>

            {/* Column 3: Silicon & MCUs */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 mb-3 text-emerald-700">
                <Cpu className="w-4 h-4" />
                <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900">Microcontrollers</h5>
              </div>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">▹</span>
                  <span>ARM Cortex-M Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">▹</span>
                  <span>STM32 (HAL, Registers, Timers)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">▹</span>
                  <span>ESP32 (Dual-core, Wi-Fi/BLE)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">▹</span>
                  <span>Arduino / AVR Prototyping</span>
                </div>
              </div>
            </div>

            {/* Column 4: Busses & Protocols */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 mb-3 text-amber-700">
                <Radio className="w-4 h-4" />
                <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900">Protocols & RF</h5>
              </div>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-amber-600 font-bold">▹</span>
                  <span>I²C, SPI, UART, USB Busses</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-600 font-bold">▹</span>
                  <span>Bluetooth Low Energy (BLE)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-600 font-bold">▹</span>
                  <span>Wi-Fi (802.11) & MQTT Telemetry</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-600 font-bold">▹</span>
                  <span>Verilog / VHDL RTL Logic</span>
                </div>
              </div>
            </div>

          </div>
        </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
