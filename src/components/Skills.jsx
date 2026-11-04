import React, { useState } from 'react';
import { 
  Cpu, 
  Zap, 
  Award, 
  CheckCircle2, 
  Sliders, 
  Wrench, 
  Terminal, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BrainCircuit,
  Binary
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
    <section id="skills" className="py-24 relative overflow-hidden bg-black/[0.02] dark:bg-black/20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block border border-blue-200 dark:border-cyan-500/30 bg-blue-50 dark:bg-cyan-500/10 rounded-full px-4 py-1.5 text-xs text-blue-700 dark:text-cyan-400 font-bold mb-4 tracking-wider uppercase shadow-xs">
              {skills.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-5">
              Core Technical &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400">
                Professional Skills
              </span>
            </h2>
            <p className="text-slate-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
              {skills.description}
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Main Category Selector Buttons */}
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
                    ? 'bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-900 shadow-xl shadow-blue-500/25 scale-[1.02]'
                    : 'bg-white dark:bg-[#201d1c] border border-slate-200 dark:border-[#332b29] text-slate-700 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-blue-300 hover:bg-blue-50/50 dark:hover:bg-white/5 shadow-xs'
                }`}
              >
                <span className={isActive ? 'text-white dark:text-slate-900' : 'text-blue-600 dark:text-cyan-400'}>
                  {categoryIcons[idx]}
                </span>
                <span className="text-left">
                  <span className="block leading-tight">{cat.title}</span>
                  <span className={`text-[10px] font-mono block ${isActive ? 'text-blue-100 dark:text-slate-800' : 'text-slate-500 dark:text-neutral-400'}`}>
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
          <div className="bg-white dark:bg-[#201d1c] border border-slate-200 dark:border-[#332b29] rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-white/10 border border-blue-200 dark:border-white/10 flex items-center justify-center text-blue-700 dark:text-cyan-400 shadow-xs">
                  {categoryIcons[activeCategoryIndex]}
                </div>
                <div>
                  <span className="text-xs font-mono text-blue-600 dark:text-cyan-400 uppercase tracking-widest font-bold">
                    {currentCategory.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {currentCategory.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 mt-0.5">
                    {currentCategory.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-white/10">
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
                className="bg-white dark:bg-[#201d1c] border border-slate-200 dark:border-[#332b29] rounded-3xl p-6 hover:border-blue-400 dark:hover:border-cyan-500/50 hover:shadow-xl card-hover-lift transition-all duration-300 flex flex-col justify-between group h-full"
              >
              <div>
                {/* Top Badge & Metric */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-blue-50 dark:bg-cyan-950/60 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-800">
                    {skill.categoryTag}
                  </span>
                  <span className="text-xs font-mono font-bold text-blue-700 dark:text-cyan-400">
                    {skill.level}%
                  </span>
                </div>

                {/* Skill Name */}
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  {skill.name}
                </h4>

                {/* Technical Description */}
                <p className="text-slate-600 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  {skill.description}
                </p>
              </div>

              {/* Bottom: Tools Chips & Progress Bar */}
              <div>
                <div className="pt-4 border-t border-slate-100 dark:border-white/10 mb-4">
                  <p className="text-[10px] font-mono uppercase text-slate-500 dark:text-neutral-400 tracking-wider font-bold mb-2">
                    Tools, Silicon & Methodologies:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.tools.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-neutral-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-full bg-slate-100 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-cyan-400 dark:to-blue-500 transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
