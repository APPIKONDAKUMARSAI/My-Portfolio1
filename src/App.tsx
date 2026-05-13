/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Resume } from './components/Resume';
import { GitHubSection } from './components/Github';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Background3D } from './components/Background';
import { AIChat } from './components/AIChat';
import { DataScienceShowcase } from './components/DataScienceShowcase';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Cursor Glow Effect */}
      <motion.div
        className="fixed top-0 left-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 100, mass: 0.5 }}
      />

      <Background3D />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <DataScienceShowcase />
        <Projects />
        <Resume />
        <GitHubSection />
        <Contact />
      </main>

      <Footer />
      <AIChat />

      {/* High-end decorative elements */}
      <div className="fixed top-20 left-6 h-32 w-[1px] bg-gradient-to-b from-brand-primary to-transparent opacity-20 pointer-events-none" />
      <div className="fixed bottom-20 right-6 h-32 w-[1px] bg-gradient-to-t from-brand-primary to-transparent opacity-20 pointer-events-none" />
    </div>
  );
}

