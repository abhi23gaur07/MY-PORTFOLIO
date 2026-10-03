import React, { useState } from 'react';
import { 
  ExternalLink, 
  BookOpen, 
  Brain, 
  Check, 
  Copy, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  WifiOff, 
  MessageSquare, 
  Sparkles, 
  Info 
} from 'lucide-react';
import { GithubIcon } from './Icons';
import ScrollReveal from './ScrollReveal';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const { projects } = portfolioData;
  const [copiedId, setCopiedId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCopyClone = (id, repoName) => {
    navigator.clipboard.writeText(`git clone https://github.com/abhi23gaur07/${repoName}.git`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block border border-blue-200 bg-blue-50 rounded-full px-4 py-1.5 text-xs text-blue-700 font-bold mb-4 tracking-wider uppercase shadow-xs">
              Flagship Engineering Repositories
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-5">
              Work That Speaks{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600">
                For Itself
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Curated, high-impact repositories showcasing applied embedded systems, intelligent edge architectures, automated circulation, and healthcare telemetry.
            </p>
          </div>
        </ScrollReveal>

        {/* 2 Featured Projects Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {projects.map((project, idx) => {
            const isSmartLibrary = project.id === 'smart-library';

            return (
              <ScrollReveal
                key={project.id}
                animation={idx === 0 ? 'fade-left' : 'fade-right'}
                delay={idx * 150}
                className="h-full"
              >
                <div
                  className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-9 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/10 card-hover-lift transition-all duration-300 flex flex-col justify-between group h-full"
                >
                <div>
                  {/* Top Badges & Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                        {project.badge}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 flex items-center gap-1.5 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {project.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyClone(project.id, isSmartLibrary ? 'the-smart-library' : 'DELTA-NEURONS-')}
                        title="Copy Git Clone Command"
                        className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center gap-1.5"
                      >
                        {copiedId === project.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>git clone</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Project Title with Icon */}
                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                      {isSmartLibrary ? (
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      ) : (
                        <Brain className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono font-semibold text-blue-600 mt-0.5">
                        {project.category}
                      </p>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                    {project.summary}
                  </p>

                  {/* Key Architecture Highlights */}
                  <div className="space-y-2 mb-6 bg-blue-50/50 border border-blue-100 rounded-2xl p-4">
                    <p className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Key Architectural Pillars:
                    </p>
                    {project.highlights.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="text-blue-600 font-bold shrink-0 mt-0.5">▹</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technical Metrics Strip */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 mb-6 text-center">
                    {Object.entries(project.stats).map(([k, v], i) => (
                      <div key={i} className="flex flex-col items-center">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-full">{v}</span>
                        <span className="text-[10px] font-mono text-slate-500 capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Footer: Tech Stack & CTAs */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-lg bg-slate-100 text-slate-700 border border-slate-200 hover:border-blue-400 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Info className="w-4 h-4" />
                      <span>Full Technical Specs</span>
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>View GitHub Repo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            );
          })}
        </div>

        {/* View All Repositories CTA Button */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="flex justify-center">
            <a
              href="https://github.com/abhi23gaur07?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3.5 px-8 sm:px-10 py-4 rounded-full bg-white hover:bg-blue-600 border border-slate-300 hover:border-blue-600 text-slate-900 hover:text-white font-bold text-base transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-blue-500/20"
            >
              <GithubIcon className="w-5 h-5 group-hover:rotate-6 transition-transform" />
              <span>Explore All My Repositories on GitHub</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </a>
          </div>
        </ScrollReveal>

      </div>

      {/* Modal for Technical Specs (Light Theme) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="flex justify-between items-start mb-5 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono text-blue-600 uppercase tracking-widest font-bold">
                  {selectedProject.badge}
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
              {selectedProject.fullDescription}
            </p>

            <h4 className="text-sm font-bold font-mono text-blue-700 uppercase tracking-wider mb-3">
              Full Feature Implementations:
            </h4>
            <div className="space-y-2 mb-6">
              {selectedProject.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-blue-600 font-bold shrink-0 mt-0.5">✓</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Open on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
