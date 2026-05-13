/// <reference types="vite/client" />
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-5xl rounded-full border px-8 py-3',
        isScrolled 
          ? 'bg-black/40 backdrop-blur-3xl border-white/10 shadow-2xl py-3' 
          : 'bg-white/[0.03] backdrop-blur-md border-white/5 py-4'
      )}
    >
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center font-black text-black text-[10px] shadow-[0_0_20px_rgba(99,102,241,0.4)]">
            KSA
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 hover:text-white transition-colors"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-primary transition-all group-hover:w-full" />
            </motion.a>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center gap-6"
        >
          <div className="flex items-center gap-2 px-3 py-1 bg-brand-primary/10 rounded-full border border-brand-primary/20">
            <div className="w-1 h-1 rounded-full bg-brand-primary animate-pulse"></div>
            <span className="text-[9px] font-mono text-brand-primary uppercase tracking-widest font-bold">Live</span>
          </div>
          <a
            href="https://linkedin.com/in/kumar-sai-appikonda-ab3289327"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Linkedin size={16} />
          </a>
        </motion.div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-950 border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium text-zinc-400 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <a href={`https://github.com/${import.meta.env.VITE_GITHUB_USERNAME || 'APPIKONDAKUMARSAI'}`} className="text-zinc-400"><Github /></a>
                <a href="https://linkedin.com/in/kumar-sai-appikonda-ab3289327" className="text-zinc-400"><Linkedin /></a>
                <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL || 'appikondakumarsai2001@gmail.com'}`} className="text-zinc-400"><Mail /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
