import React from 'react';
import { 
  Users, 
  Compass, 
  CheckCircle, 
  BookOpen, 
  Brain, 
  Droplets,
  Home,
  ShieldCheck, 
  Target,
  Sparkles,
  ArrowRight,
  Shield
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';

export default function Leadership() {
  const { leadership } = portfolioData;

  const renderLeadershipIcon = (id) => {
    switch (id) {
      case 'lead-aqua-saviour':
        return <Droplets className="w-6 h-6 text-blue-600" />;
      case 'lead-nexus-nurture':
        return <Home className="w-6 h-6 text-blue-600" />;
      case 'lead-smart-library':
        return <BookOpen className="w-6 h-6 text-blue-600" />;
      case 'lead-delta-neurons':
      default:
        return <Brain className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="leadership" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block border border-blue-200 bg-blue-50 rounded-full px-4 py-1.5 text-xs text-blue-700 font-bold mb-4 tracking-wider uppercase shadow-xs">
              Team & Project Stewardship
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-5">
              Leadership & Technical{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600">
                Engagement
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Leading multidisciplinary initiatives across smart water infrastructure, 3D smart living automation, campus software, and cognitive healthcare from initial system design to field-tested execution.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Detailed Leadership Roles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {leadership.map((item, idx) => {
            return (
              <ScrollReveal
                key={item.id}
                animation={idx % 2 === 0 ? 'fade-left' : 'fade-right'}
                delay={(idx % 2) * 150}
                className="h-full"
              >
                <div
                  className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-9 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-900/5 card-hover-lift transition-all duration-300 flex flex-col justify-between group h-full"
                >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-13 h-13 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center p-3 shadow-xs">
                        {renderLeadershipIcon(item.id)}
                      </div>
                      <div>
                        <span className="text-xs font-mono text-blue-600 uppercase tracking-widest font-bold">
                          {item.organization}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 group-hover:text-blue-600 transition-colors">
                          {item.role}
                        </h3>
                      </div>
                    </div>

                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 shrink-0 font-medium">
                      {item.period}
                    </span>
                  </div>

                  {/* Project Context & Scope */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
                    <p className="text-xs font-mono text-blue-700 uppercase tracking-wider font-bold mb-1">
                      Project Scope & Vision:
                    </p>
                    <p className="text-slate-800 text-sm font-semibold leading-relaxed">
                      {item.project} — {item.description}
                    </p>
                  </div>

                  {/* Responsibilities & Achievements */}
                  <div className="space-y-3 mb-6">
                    <p className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">
                      Key Technical & Managerial Responsibilities:
                    </p>
                    {item.responsibilities.map((resp, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact Callout */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex items-start gap-3">
                    <Target className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-mono text-blue-800 uppercase font-black tracking-wider">
                        Measurable Impact
                      </span>
                      <p className="text-xs sm:text-sm text-slate-800 font-medium mt-0.5">
                        {item.impact}
                      </p>
                    </div>
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
