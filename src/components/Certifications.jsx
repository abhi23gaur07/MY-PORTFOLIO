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
    <Atom className="w-6 h-6 text-blue-600" />,
    <Cpu className="w-6 h-6 text-blue-600" />,
    <Medal className="w-6 h-6 text-amber-600" />
  ];

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block border border-blue-200 bg-blue-50 rounded-full px-4 py-1.5 text-xs text-blue-700 font-bold mb-4 tracking-wider uppercase shadow-xs">
              Credentials & Masterclasses
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-5">
              Certifications &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600">
                Workshops
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
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
                      ? 'bg-gradient-to-b from-white to-blue-50/50 border-2 border-blue-400 shadow-xl shadow-blue-500/10 hover:border-blue-600'
                      : 'bg-white border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md'
                  }`}
                >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                      isQuantum
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {cert.badge}
                    </span>

                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-xs">
                      {certIcons[index]}
                    </div>
                  </div>

                  <span className="text-xs font-mono text-blue-600 uppercase tracking-widest font-bold">
                    {cert.organization}
                  </span>
                  
                  <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                    {cert.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    {cert.description}
                  </p>
                </div>

                {/* Skills Gained */}
                <div>
                  <div className="pt-4 border-t border-slate-100 mb-4">
                    <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-bold mb-2">
                      Core Topics Explored:
                    </p>
                    <div className="space-y-1.5">
                      {cert.skillsGained.map((skill, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-slate-500">
                    <span>{cert.issueDate}</span>
                    <a
                      href={portfolioData.personal.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 transition-colors"
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
