import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  MessageSquare, 
  Sparkles, 
  Quote, 
  ExternalLink,
  Cpu,
  Shield, 
  Download, 
  FileText, 
  Eye, 
  Briefcase, 
  Phone 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';

export default function Contact() {
  const { personal, contact } = portfolioData;
  const resumeHref = personal.resumeUrl || '/Abhishek_Gaur_Resume.pdf';
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    const mailtoUrl = `mailto:${personal.email}?subject=${encodeURIComponent(
      formData.subject || `Portfolio Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoUrl;
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-black/[0.02] dark:bg-black/20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Engineering Quote Card */}
        <ScrollReveal animation="zoom-in" delay={100}>
          <div className="mb-14 bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/80 dark:from-[#201d1c] dark:via-[#262120] dark:to-[#201d1c] border-2 border-blue-200 dark:border-neutral-700 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
            <div className="absolute top-4 right-6 text-blue-500/10 dark:text-cyan-500/5 pointer-events-none">
              <Quote className="w-32 h-32" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-white/10 border border-blue-200 dark:border-neutral-700 flex items-center justify-center text-blue-700 dark:text-cyan-400 mb-6 shadow-xs">
                <Quote className="w-6 h-6" />
              </div>

              <p className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-800 dark:text-neutral-100 italic leading-relaxed tracking-tight mb-6">
                "{personal.quote}"
              </p>

              <div className="flex flex-col items-center">
                <span className="text-lg font-black text-slate-900 dark:text-white tracking-wide">
                  {personal.name}
                </span>
                <span className="text-xs font-mono font-bold text-blue-700 dark:text-cyan-400 mt-1 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>B.Tech Electronics Engineering (Specialization in Defence Technology)</span>
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 mt-0.5 font-medium">
                  Rashtriya Raksha University (RRU) · Gandhinagar, Gujarat
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* HIGH-IMPACT RECRUITER & COMPANIES RESUME SPOTLIGHT BANNER */}
        <ScrollReveal animation="fade-up" delay={120}>
          <div className="mb-16 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 dark:from-[#141212] dark:via-[#1e1b1a] dark:to-[#141212] text-white p-7 sm:p-10 shadow-2xl border border-blue-500/30 dark:border-neutral-700 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>For Recruiters, R&amp;D Labs &amp; Hiring Companies</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-snug">
                  Looking for an Embedded Systems, IoT Hardware &amp; Full-Stack Innovator?
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Download my official 1-page engineering resume covering <strong className="text-white">SIH Rank #1 Hardware</strong> credentials, <strong className="text-cyan-300">Aqua Saviour</strong>, <strong className="text-cyan-300">Nexus Nurture</strong>, <strong className="text-cyan-300">Delta Neurons</strong>, and B.Tech Defence Technology coursework at Rashtriya Raksha University.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono text-slate-300">
                  {personal.institutionalEmail && (
                    <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg border border-white/15">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      {personal.institutionalEmail}
                    </span>
                  )}
                  {personal.phone && (
                    <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg border border-white/15">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      {personal.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto shrink-0">
                <a
                  href={resumeHref}
                  download="Abhishek_Gaur_Resume.pdf"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Official Resume (PDF)</span>
                </a>
                <a
                  href={resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
                >
                  <Eye className="w-4 h-4 text-cyan-300" />
                  <span>Preview CV</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Section Header */}
        <ScrollReveal animation="fade-up" delay={150}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block border border-blue-200 dark:border-cyan-500/30 bg-blue-50 dark:bg-cyan-500/10 rounded-full px-4 py-1.5 text-xs text-blue-700 dark:text-cyan-400 font-bold mb-4 tracking-wider uppercase shadow-xs">
              Get In Touch
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-5">
              {contact.heading}
            </h2>
            <p className="text-slate-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
              {contact.subheading}
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Info & Interactive Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            <ScrollReveal animation="fade-left" delay={200}>
            
            {/* Email Card */}
            <div className="bg-white dark:bg-[#201d1c] border border-slate-200 dark:border-[#332b29] rounded-3xl p-6 hover:border-blue-400 dark:hover:border-cyan-500/50 transition-all shadow-sm flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-white/10 border border-blue-200 dark:border-white/10 flex items-center justify-center text-blue-600 dark:text-cyan-400 shadow-xs">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider font-semibold">
                      Direct Email
                    </span>
                    <p className="text-slate-900 dark:text-white font-bold text-sm sm:text-base break-all">
                      {personal.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100 dark:border-white/10">
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-white/10 text-xs font-mono font-medium flex items-center justify-center gap-2 transition-all"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">Email Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${personal.email}`}
                  className="py-2 px-4 rounded-xl bg-blue-600 dark:bg-cyan-500 hover:bg-blue-700 text-white dark:text-slate-900 text-xs font-bold transition-all shadow-sm"
                >
                  Send Mail
                </a>
              </div>
            </div>

            {/* LinkedIn Card */}
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-[#201d1c] border border-slate-200 dark:border-[#332b29] rounded-3xl p-6 hover:border-blue-400 dark:hover:border-cyan-500/50 hover:shadow-md transition-all flex items-center justify-between group block shadow-sm"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-white/10 border border-blue-200 dark:border-white/10 flex items-center justify-center text-blue-600 dark:text-cyan-400 shadow-xs">
                  <LinkedinIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider font-semibold">
                    Professional Network
                  </span>
                  <p className="text-slate-900 dark:text-white font-bold text-base group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    LinkedIn Profile
                  </p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-all" />
            </a>

            {/* GitHub Card */}
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-[#201d1c] border border-slate-200 dark:border-[#332b29] rounded-3xl p-6 hover:border-blue-400 dark:hover:border-cyan-500/50 hover:shadow-md transition-all flex items-center justify-between group block shadow-sm"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-800 dark:text-neutral-200 shadow-xs">
                  <GithubIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider font-semibold">
                    Open Source Repositories
                  </span>
                  <p className="text-slate-900 dark:text-white font-bold text-base group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    @abhi23gaur07
                  </p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-all" />
            </a>

            {/* Location Card */}
            <div className="bg-white dark:bg-[#201d1c] border border-slate-200 dark:border-[#332b29] rounded-3xl p-6 flex items-center gap-3.5 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-white/10 border border-emerald-200 dark:border-white/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-xs">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-wider font-semibold">
                  Location & Campus
                </span>
                <p className="text-slate-900 dark:text-white font-bold text-sm">
                  Rashtriya Raksha University (RRU)
                </p>
                <p className="text-slate-500 dark:text-neutral-400 text-xs">
                  Gandhinagar, Gujarat, India
                </p>
              </div>
            </div>

            </ScrollReveal>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <ScrollReveal animation="fade-right" delay={250}>
            <div className="bg-white dark:bg-[#201d1c] border border-slate-200 dark:border-[#332b29] rounded-3xl p-7 sm:p-10 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
                Send a Message
              </h3>
              <p className="text-slate-600 dark:text-neutral-300 text-xs sm:text-sm mb-6">
                Have a project idea, inquiry, or looking to collaborate on electronics engineering, defence technology, or IoT solutions? Reach out below.
              </p>

              {isSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-lg">Message Prepared!</h4>
                  <p className="text-slate-600 dark:text-neutral-300 text-xs sm:text-sm">
                    Your default email client has been opened with your pre-filled message for Abhishek Gaur.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-3 px-5 py-2 rounded-full text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5 font-bold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5 font-bold">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5 font-bold">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Electronics / Defence Tech Project Inquiry"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5 font-bold">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Abhishek, I would love to connect regarding..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 dark:from-cyan-500 dark:to-blue-600 hover:from-blue-700 hover:to-blue-600 text-white font-bold text-sm tracking-wide shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Abhishek</span>
                  </button>
                </form>
              )}
            </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
