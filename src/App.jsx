import React from 'react';
import Preloader from './components/Preloader';
import CircuitBackground from './components/CircuitBackground';
import CustomCursor from './components/CustomCursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowITurnIdeas from './components/HowITurnIdeas';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Leadership from './components/Leadership';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 relative selection:bg-blue-600 selection:text-white">
      {/* Interactive Obsidian Black Custom Cursor (Canvas Ribbon Trail & Glow Dot) */}
      <CustomCursor />

      {/* Top Reading Progress Bar (Electric Blue Glow) & Back-to-Top Button */}
      <ScrollProgressBar />

      {/* Intro Preloader Screen: Light Blue Interface with Name that Slides Up */}
      <Preloader />

      {/* Background Circuit Grid & Lighting Effects */}
      <CircuitBackground />

      {/* Sticky Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Hero & About Section with Profile Image */}
        <Hero />

        {/* Achievements & Hackathons (Placed at Top just above Engineering Methodology) */}
        <Achievements />

        {/* How I Turn Ideas Into Reality (Engineering Methodology & Workflow) */}
        <HowITurnIdeas />

        {/* Featured GitHub Repositories (The Smart Library & Delta Neurons + All Repos Link) */}
        <Projects />

        {/* Leadership & Technical Engagement (Lead & Head Roles) */}
        <Leadership />

        {/* Professional & Technical Skills (Placed ABOVE Certifications) */}
        <Skills />

        {/* Certifications & Workshops (Quantum Computing & Embedded Credentials) */}
        <Certifications />

        {/* Contact Information & Inspiring Quote */}
        <Contact />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}
