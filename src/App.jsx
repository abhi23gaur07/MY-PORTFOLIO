import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import PullCord from './components/PullCord';
import CustomCursor from './components/CustomCursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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
  const [mode, setMode] = useState('light');

  useEffect(() => {
    // Check saved mode or default to light
    const saved = localStorage.getItem('abhishek-mode') || 'light';
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
      localStorage.setItem('abhishek-mode', next);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#e8e4e0] dark:bg-[#1a1818] text-[#1a1818] dark:text-[#e8e4e0] relative selection:bg-blue-600 selection:text-white transition-colors duration-500">
      
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
        {/* Editorial Hero with 3D Desk Flip-Calendar & Photo Frame */}
        <Hero />

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
