/// <reference types="vite/client" />
import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Typewriter } from 'react-simple-typewriter';
import { Github, Linkedin, Mail, FileText, ArrowRight, Database, Brain, BarChart3, Binary, Cpu } from 'lucide-react';
import gsap from 'gsap';
import { cn } from '../lib/utils';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.2
      });
      gsap.from(".hero-cta", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        ease: "back.out(1.7)"
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch z-10">
        
        {/* Main Title Area */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="lg:col-span-8 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-brand-primary font-bold">AI Data Analyst</span>
              <div className="h-[1px] w-24 bg-gradient-to-r from-brand-primary to-transparent" />
            </motion.div>

            <h1 className="hero-title text-[clamp(3.5rem,10vw,8rem)] font-display font-black tracking-[-0.04em] leading-[0.85] text-white">
              KUMAR SAI<br />
              <span className="text-zinc-600 italic">APPIKONDA</span>
            </h1>

            <div className="hero-title pt-4 max-w-2xl">
              <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
                An AI Data Analyst transforming high-dimensional complexity into <span className="text-white font-medium">performant analytical systems</span> and predictive intelligence.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 mt-16">
            <motion.a
                href="#projects"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black rounded-full inline-flex items-center justify-center gap-3 hover:bg-brand-primary hover:text-white transition-all group"
            >
              Explore Projects <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME || 'APPIKONDAKUMARSAI'}` },
                { icon: Linkedin, href: 'https://linkedin.com/in/kumar-sai-appikonda-ab3289327' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full border border-white/10 text-zinc-500 hover:text-white hover:border-white/30 transition-all"
                >
                  <social.icon size={22} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Dynamic Data Panel */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.3 }}
           className="lg:col-span-4 flex flex-col gap-6"
        >
          <div className="flex-1 bento-card p-10 flex flex-col justify-between overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-brand-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
             
             <div className="flex justify-between items-start relative z-10">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <BarChart3 className="text-brand-primary" size={24} />
                </div>
                <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest bg-zinc-950/50 px-2 py-1 rounded">Metrics.v1</div>
             </div>

             <div className="relative z-10">
               <div className="text-7xl font-display font-bold text-white tracking-tighter">15<span className="text-brand-primary font-light">+</span></div>
               <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-500 mt-2">Active Deployments</div>
             </div>

             <div className="space-y-4 pt-8 border-t border-white/5 relative z-10">
                {[
                  { label: 'Model Accuracy', val: '98.2%', color: 'bg-emerald-500' },
                  { label: 'Data Processing', val: '4.2TB', color: 'bg-brand-primary' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-[10px] font-mono uppercase text-zinc-500">
                      <span>{stat.label}</span>
                      <span className="text-white">{stat.val}</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 1, duration: 2 }}
                        className={cn("h-full rounded-full", stat.color)} 
                      />
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="glass-dark p-8 grid grid-cols-2 gap-4">
            {[
              { icon: Database, label: 'PostgreSQL', bg: 'bg-blue-500/5' },
              { icon: Brain, label: 'TensorFlow', bg: 'bg-orange-500/5' },
              { icon: Binary, label: 'Python', bg: 'bg-emerald-500/5' },
              { icon: Cpu, label: 'PyTorch', bg: 'bg-red-500/5' },
            ].map((item, i) => (
              <div
                key={i}
                className={cn("p-4 rounded-[1.5rem] border border-white/[0.03] flex flex-col items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95 cursor-default", item.bg)}
              >
                <item.icon size={28} className="text-zinc-600 group-hover:text-white transition-colors" />
                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-tighter">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-12 flex items-center gap-4 group cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-primary/50 transition-colors">
            <ArrowRight size={14} className="rotate-90 text-zinc-600 group-hover:text-brand-primary transition-colors" />
          </div>
          <div className="absolute inset-0 rounded-full bg-brand-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600 group-hover:text-zinc-400 transition-colors">Scroll to explore</span>
      </motion.div>

      {/* Decorative Blur */}
      <div className="absolute top-0 -left-20 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};
