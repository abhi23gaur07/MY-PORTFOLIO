import React from 'react';
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Atom, 
  Cpu, 
  Medal, 
  ExternalLink 
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';

export default function Certifications() {
  const { certifications } = portfolioData;

  const certIcons = [
    <Atom className="w-6 h-6 text-blue-600 dark:text-cyan-400" />,
    <Cpu className="w-6 h-6 text-blue-600 dark:text-cyan-400" />,
    <Medal className="w-6 h-6 text-amber-500" />
  ];

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-black/[0.02] dark:bg-black/20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block border border-blue-200 dark:border-cyan-500/30 bg-blue-50 dark:bg-cyan-500/10 rounded-full px-4 py-1.5 text-xs text-blue-700 dark:text-cyan-400 font-bold mb-4 tracking-wider uppercase shadow-xs">
              Credentials & Masterclasses
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-5">
              Certifications &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400">
                Workshops
              </span>
            </h2>
            <p className="text-slate-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
              Continuous specialized learning across emerging quantum architectures, advanced embedded systems, and institutional hackathon excellence.
            </p>
          </div>
        </ScrollReveal>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => {
            const isQuantum = cert.id === 'cert-quantum';

            return (
              <ScrollReveal
                key={cert.id}
                animation="fade-up"
                delay={index * 120}
                className="h-full"
              >
                <div
                  className={`rounded-3xl p-7 transition-all duration-300 flex flex-col justify-between relative group h-full card-hover-lift ${
                    isQuantum
                      ? 'bg-gradient-to-b from-white to-blue-50/50 dark:from-[#201d1c] dark:to-cyan-950/20 border-2 border-blue-400 dark:border-cyan-500/50 shadow-xl shadow-blue-500/10 hover:border-blue-600'
                      : 'bg-white dark:bg-[#201d1c] border border-slate-200 dark:border-[#332b29] shadow-sm hover:border-blue-400 dark:hover:border-cyan-500/50 hover:shadow-md'
                  }`}
                >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                      isQuantum
                        ? 'bg-blue-100 dark:bg-cyan-950/60 text-blue-800 dark:text-cyan-300 border border-blue-200 dark:border-cyan-800'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-white/10'
                    }`}>
                      {cert.badge}
                    </span>

                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-white/10 border border-blue-100 dark:border-white/10 flex items-center justify-center shadow-xs">
                      {certIcons[index]}
                    </div>
                  </div>

                  <span className="text-xs font-mono text-blue-600 dark:text-cyan-400 uppercase tracking-widest font-bold">
                    {cert.organization}
                  </span>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 mb-3 leading-snug group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {cert.title}
                  </h3>

                  <p className="text-slate-600 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    {cert.description}
                  </p>
                </div>

                {/* Skills Gained */}
                <div>
                  <div className="pt-4 border-t border-slate-100 dark:border-white/10 mb-4">
                    <p className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider font-bold mb-2">
                      Core Topics Explored:
                    </p>
                    <div className="space-y-1.5">
                      {cert.skillsGained.map((skill, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-slate-500 dark:text-neutral-400">
                    <span>{cert.issueDate}</span>
                    <a
                      href={portfolioData.personal.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-cyan-400 hover:underline font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>LinkedIn Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
