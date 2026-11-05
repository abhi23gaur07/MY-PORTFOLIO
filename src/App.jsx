import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import PullCord from './components/PullCord';
import CustomCursor from './components/CustomCursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import DoorsSection from './components/DoorsSection';
import StoryTimeline from './components/StoryTimeline';
import HowITurnIdeas from './components/HowITurnIdeas';
import Achievements from './components/Achievements';
import Leadership from './components/Leadership';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [mode, setMode] = useState('dark');

  useEffect(() => {
    // Default to 3D cinematic dark theme matching the reference mockup
    const saved = localStorage.getItem('abhishek-cinematic-theme') || 'dark';
    setMode(saved);
    if (saved === 'dark') {
      document.documentElement.dataset.mode = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      delete document.documentElement.dataset.mode;
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleToggleMode = () => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (next === 'dark') {
        document.documentElement.dataset.mode = 'dark';
        document.documentElement.classList.add('dark');
      } else {
        delete document.documentElement.dataset.mode;
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('abhishek-cinematic-theme', next);
      localStorage.setItem('abhishek-theme-mode', next);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 relative selection:bg-cyan-500 selection:text-slate-950 transition-colors duration-500">
      
      {/* 2D Canvas Ribbon Trail Custom Cursor */}
      <CustomCursor />

      {/* Verlet Physics Ceiling Pull-Cord Light Switch (Top Right) */}
      <PullCord mode={mode} onToggle={handleToggleMode} />

      {/* Top Reading Progress Bar */}
      <ScrollProgressBar />

      {/* Preloader Splash Screen */}
      <Preloader />

      {/* Sticky Navigation Header with Live IST Clock */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Editorial Hero with 3D WebGL Model in Center */}
        <Hero />

        {/* Dedicated About Me Section (Followed immediately on scroll) */}
        <AboutMe />

        {/* The Signature 3D Doors Hallway ("Magic happens behind the doors") */}
        <DoorsSection />

        {/* "Let's go back in time" Mechanical Story Timeline */}
        <StoryTimeline />

        {/* Achievements & Hackathons (SIH #1 Hardware & #8 Overall) */}
        <Achievements />

        {/* How I Turn Ideas Into Reality (Engineering Methodology & Workflow) */}
        <HowITurnIdeas />

        {/* Leadership & Technical Engagement (Lead & Head Roles) */}
        <Leadership />

        {/* Professional & Technical Skills Matrix */}
        <Skills />

        {/* Certifications & Workshops (Quantum Computing & Embedded Credentials) */}
        <Certifications />

        {/* Contact Information & Inspiring Quote */}
        <Contact />
      </main>

      {/* Editorial Luxury Footer */}
      <Footer />
    </div>
  );
}
