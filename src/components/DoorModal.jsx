import React, { useEffect } from 'react';
import { X, ExternalLink, Trophy, Shield, Cpu, Activity, CheckCircle2, ArrowRight } from 'lucide-react';
import { GithubIcon } from './Icons';

/**
 * DoorModal - Immersive exhibition room revealed when walking through a door.
 */
export default function DoorModal({ project, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Backdrop click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Exhibition Room Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#fdfbf7] dark:bg-[#181616] border-2 border-[#d5cdca] dark:border-[#383230] shadow-2xl p-6 sm:p-10 text-slate-900 dark:text-neutral-100 z-10 transition-colors duration-300">
        
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#e5ded9] dark:border-[#2d2725] mb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                {project.badge || 'Flagship Architecture'}
              </span>
              {project.status && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {project.status}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm font-mono text-slate-500 dark:text-neutral-400">
              {project.category}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
              <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-500/20 font-bold">
                {project.year || '2026'}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-white/10 font-medium">
                {project.role || 'Lead & Project Head (Present)'}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 font-semibold">
                {project.period || '2026 – Present'}
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close door view"
            className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center text-slate-600 dark:text-neutral-300 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Narrative & Full Description */}
        <div className="space-y-6">
          <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-neutral-300">
            {project.fullDescription || project.summary}
          </p>

          {/* Architecture Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="p-5 sm:p-6 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-[#e5ded9] dark:border-[#2d2725] space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 dark:text-neutral-400 flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                Key Engineering Deliverables & Innovations
              </h4>
              <ul className="space-y-2.5">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Chips */}
          {project.techStack && (
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-2.5">
                Integrated Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-[#ebe4dd] dark:bg-[#262120] text-slate-800 dark:text-neutral-200 border border-[#d5cdca] dark:border-[#3a3331]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Metrics Grid */}
          {project.stats && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {Object.entries(project.stats).map(([k, v], i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white dark:bg-[#201c1a] border border-[#e5ded9] dark:border-[#332b29] text-center">
                  <div className="text-base sm:text-lg font-black font-mono text-blue-700 dark:text-cyan-400">
                    {v}
                  </div>
                  <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-neutral-400 mt-0.5">
                    {k.replace(/([A-Z])/g, ' $1')}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actions & Repos */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#e5ded9] dark:border-[#2d2725]">
            {project.demoUrl && project.demoUrl.startsWith('http') && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity shadow-md"
              >
                <span>Launch Live Platform</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-slate-800 dark:text-neutral-200 font-semibold text-xs sm:text-sm transition-colors border border-black/10 dark:border-white/10"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View GitHub Repository</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="ml-auto text-xs font-mono text-slate-500 dark:text-neutral-400 hover:underline"
            >
              Step back into hallway [ESC]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
