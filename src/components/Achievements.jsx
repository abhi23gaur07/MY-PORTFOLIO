import React from 'react';
import { 
  Trophy, 
  Award, 
  Sparkles, 
  Medal, 
  CheckCircle2, 
  ExternalLink,
  Cpu,
  Flame,
  Shield
} from 'lucide-react';
import confetti from 'canvas-confetti';
import ScrollReveal from './ScrollReveal';
import { portfolioData } from '../data/portfolioData';

export default function Achievements() {
  const { achievements } = portfolioData;

  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#0284c7', '#f59e0b', '#10b981']
    });
  };

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-black/[0.02] dark:bg-black/20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block border border-amber-300 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10 rounded-full px-4 py-1.5 text-xs text-amber-800 dark:text-amber-400 font-bold mb-4 tracking-wider uppercase shadow-xs">
              Hackathons & Recognition
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-5">
              Achievements &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-blue-600 dark:from-amber-400 dark:via-orange-400 dark:to-cyan-400">
                Hackathons
              </span>
            </h2>
            <p className="text-slate-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
              Rigorous competitive hackathons, jury evaluations, and hardware showcases that validated my engineering rigor.
            </p>
          </div>
        </ScrollReveal>

        {/* Crowned SIH Winner Showcase Card */}
        <ScrollReveal animation="fade-up" delay={150}>
          <div 
            onClick={triggerConfetti}
            className="cursor-pointer mb-10 bg-white dark:bg-[#201d1c] border-2 border-amber-400 dark:border-amber-500/50 rounded-3xl p-7 sm:p-10 shadow-xl shadow-amber-500/10 hover:shadow-2xl hover:shadow-amber-500/20 hover:border-amber-500 transition-all duration-300 relative group overflow-hidden"
          >
          {/* Gold badge ribbon */}
          <div className="absolute -right-12 top-7 rotate-45 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[11px] font-mono py-1 px-14 shadow-md uppercase tracking-wider hidden sm:block">
            SIH Winner
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-amber-200 dark:border-amber-500/20">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/30 group-hover:scale-110 transition-transform">
                <Trophy className="w-8 h-8 text-slate-950" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-black uppercase bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30">
                    🏆 #1 Hardware Category Winner
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-blue-100 dark:bg-blue-500/20 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">
                    #8 Overall University Category
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  Smart India Hackathon (SIH) · Rashtriya Raksha University Internal Round
                </h3>
                <p className="text-xs font-mono text-slate-500 dark:text-neutral-400 mt-1">
                  Venue: Rashtriya Raksha University (RRU), Gandhinagar · Competition Round
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                triggerConfetti();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-md shadow-amber-400/30 transition-all shrink-0 self-start lg:self-auto"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Celebrate Win 🎉</span>
            </button>
          </div>

          <div className="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <p className="text-slate-700 dark:text-neutral-200 text-base leading-relaxed mb-4 font-normal">
                Secured <strong className="text-amber-700 dark:text-amber-400 font-bold">1st Place in the Hardware Category</strong> and <strong className="text-slate-900 dark:text-white font-bold">8th Place in the Overall Category</strong> among university-wide multidisciplinary engineering teams at Rashtriya Raksha University. The solution showcased an end-to-end working hardware prototype combining embedded microcontrollers, responsive sensors, and robust digital telemetry.
              </p>
              
              <div className="space-y-2 mt-4">
                {achievements[0].takeaways.map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50/50 dark:bg-amber-500/[0.06] border border-amber-200 dark:border-amber-500/20 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-amber-900 dark:text-amber-300 uppercase tracking-widest font-bold">
                  Evaluation Criteria Aced
                </span>
                <ul className="mt-3 space-y-2 text-xs text-slate-700 dark:text-neutral-300">
                  <li className="flex items-center gap-2">
                    <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Real-world Hardware Reliability</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Live Working Prototype Execution</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Hardware-Software Architecture Co-design</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Low Bill-of-Materials Feasibility</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-amber-200 dark:border-amber-500/20 flex flex-wrap gap-1.5">
                {achievements[0].tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-[#1a1818] text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        </ScrollReveal>

        {/* Other Hackathon & Innovation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.slice(1).map((item, idx) => (
            <ScrollReveal key={item.id} animation={idx % 2 === 0 ? 'fade-left' : 'fade-right'} delay={200 + idx * 100}>
              <div
                className="bg-white dark:bg-[#201d1c] border border-slate-200 dark:border-[#332b29] rounded-3xl p-6 sm:p-7 hover:border-blue-400 dark:hover:border-cyan-500/50 hover:shadow-xl card-hover-lift transition-all flex flex-col justify-between h-full"
              >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-blue-50 dark:bg-white/10 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-white/10">
                    {item.rank}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-neutral-400">
                    {item.year}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs font-mono font-semibold text-blue-600 dark:text-cyan-400 mb-4">
                  {item.venue} · {item.location}
                </p>

                <p className="text-slate-600 dark:text-neutral-300 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="space-y-1.5">
                  {item.takeaways.map((t, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-neutral-300">
                      <span className="text-blue-600 dark:text-cyan-400 font-bold">▹</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-neutral-400 border border-slate-200 dark:border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
