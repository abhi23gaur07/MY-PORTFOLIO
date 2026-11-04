import React, { useState } from 'react';
import { 
  Search, 
  Cpu, 
  Code, 
  CloudLightning, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  Zap, 
  Layers,
  ShieldCheck
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';

export default function HowITurnIdeas() {
  const { workflow } = portfolioData;
  const [activeStep, setActiveStep] = useState(0);

  const stepIcons = [
    <Search className="w-6 h-6 text-blue-600 dark:text-cyan-400" />,
    <Cpu className="w-6 h-6 text-cyan-600 dark:text-cyan-300" />,
    <Code className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    <CloudLightning className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
  ];

  const deepDives = [
    {
      focus: "Requirements Formulation & Tactical Viability",
      bullets: [
        "Analyzing physical and operational deployment constraints (ambient temperature, power availability, RF signal attenuation).",
        "Assessing whether data processing belongs on the edge (microcontroller) or cloud services to reduce latency.",
        "Defining sensor specifications: sampling frequency, resolution, sensitivity, and power drain.",
        "Formulating strict bill-of-materials (BOM) cost, component sourcing, and defence-grade reliability."
      ]
    },
    {
      focus: "Silicon Selection & Schematic Topologies",
      bullets: [
        "Choosing microcontrollers: ARM Cortex-M & STM32 (deterministic execution), ESP32 (Wi-Fi/BLE & dual-core), or Arduino.",
        "Schematic circuit drafting with noise filtering, decoupling capacitors, and pull-up/pull-down resistor banks.",
        "Routing communication protocols: I2C for modular sensors, SPI for high-speed displays/storage, UART for telemetry transceivers.",
        "Power budgeting: LDO regulators, buck-boost converters, and battery discharge curves."
      ]
    },
    {
      focus: "Firmware Logic & Breadboard Verification",
      bullets: [
        "Writing clean, modular Embedded C/C++ with deterministic state machines and minimal interrupt latency.",
        "Implementing sensor calibration algorithms, noise filtering, and hardware switch debouncing.",
        "Breadboard circuit assembly, verifying signal integrity via logic analyzers and digital multimeters.",
        "Designing local fail-safes: watchdog timers, non-volatile memory (EEPROM/Flash) state retention."
      ]
    },
    {
      focus: "Cloud Pipelines & Field-Hardened Deployment",
      bullets: [
        "Establishing low-overhead communication via lightweight MQTT publish/subscribe and secure REST endpoints.",
        "Developing offline-to-online buffering queues to ensure zero data loss during network blackouts (as built in Delta Neurons).",
        "Configuring automated event dispatchers, including WhatsApp API and email alert pipelines (as built in The Smart Library).",
        "Field stress testing under vibration, temperature, and electrical surges prior to permanent enclosure assembly."
      ]
    }
  ];

  return (
    <section id="workflow" className="py-24 relative overflow-hidden bg-black/[0.02] dark:bg-black/20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block border border-blue-200 dark:border-cyan-500/30 bg-blue-50 dark:bg-cyan-500/10 rounded-full px-4 py-1.5 text-xs text-blue-700 dark:text-cyan-400 font-bold mb-4 tracking-wider uppercase shadow-xs">
              {workflow.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-5">
              Here's How I Turn Ideas Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400">
                Real-World Applications
              </span>
            </h2>
            <p className="text-slate-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
              {workflow.description}
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {workflow.steps.map((step, index) => {
            const isSelected = activeStep === index;
            return (
              <ScrollReveal key={step.number} animation="fade-up" delay={index * 120}>
                <div
                  onClick={() => setActiveStep(index)}
                  className={`cursor-pointer rounded-3xl p-7 transition-all duration-300 flex flex-col justify-between relative group h-full card-hover-lift ${
                  isSelected
                    ? 'bg-white dark:bg-[#201d1c] border-2 border-blue-600 dark:border-cyan-400 shadow-xl shadow-blue-500/10 -translate-y-1.5'
                    : 'bg-white dark:bg-[#201d1c] border border-slate-200 dark:border-[#332b29] shadow-sm hover:border-blue-400 dark:hover:border-cyan-500/50 hover:shadow-md hover:-translate-y-1'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-2xl font-mono font-black ${
                      isSelected ? 'text-blue-600 dark:text-cyan-400' : 'text-slate-400 dark:text-neutral-500 group-hover:text-blue-600 dark:group-hover:text-cyan-400'
                    }`}>
                      {step.number}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                      isSelected ? 'bg-blue-50 dark:bg-white/10 border border-blue-200 dark:border-white/10 shadow-sm' : 'bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5'
                    }`}>
                      {stepIcons[index]}
                    </div>
                  </div>

                  <p className="text-xs font-mono text-blue-600 dark:text-cyan-400 uppercase tracking-widest font-bold mb-1">
                    {step.subtitle}
                  </p>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 leading-snug group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-neutral-300 text-sm leading-relaxed mb-6 font-normal">
                    {step.description}
                  </p>
                </div>

                <div>
                  <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex flex-wrap gap-1.5">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[11px] font-mono px-2.5 py-1 rounded-md transition-colors ${
                          isSelected
                            ? 'bg-blue-50 dark:bg-cyan-950/60 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-800 font-semibold'
                            : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-neutral-400 border border-slate-200 dark:border-white/10'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-cyan-400 group-hover:underline">
                    <span>{isSelected ? 'Viewing Deep Dive' : 'Click for Deep Dive'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                  </div>
                </div>
              </div>
            </ScrollReveal>
            );
          })}
        </div>

        {/* Selected Step Deep Dive Panel */}
        <ScrollReveal animation="zoom-in" delay={200}>
          <div className="bg-white dark:bg-[#201d1c] border border-slate-200 dark:border-[#332b29] rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-white/10 border border-blue-200 dark:border-white/10 flex items-center justify-center font-mono font-black text-xl text-blue-700 dark:text-cyan-400 shadow-sm">
                  {workflow.steps[activeStep].number}
                </div>
                <div>
                  <span className="text-xs font-mono text-blue-600 dark:text-cyan-400 uppercase tracking-widest font-bold">
                    Phase {activeStep + 1} Deep Dive
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {workflow.steps[activeStep].title} — <span className="text-blue-600 dark:text-cyan-400 font-semibold">{deepDives[activeStep].focus}</span>
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-500 dark:text-neutral-400">Step Switcher:</span>
                <div className="flex gap-1.5">
                  {[0, 1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => setActiveStep(num)}
                      className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all ${
                        activeStep === num
                          ? 'bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-900 shadow-md'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10'
                      }`}
                    >
                      0{num + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
              {deepDives[activeStep].bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-slate-700 dark:text-neutral-300 text-sm leading-relaxed">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
