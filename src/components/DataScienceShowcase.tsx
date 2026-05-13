import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Network, Database, Brain, Activity, Layers, Terminal, ShieldCheck } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '../lib/utils';

const pipeline = [
  { icon: Database, label: 'Data Collection', color: 'text-blue-500' },
  { icon: Layers, label: 'Pre-processing', color: 'text-cyan-500' },
  { icon: Brain, label: 'Model Training', color: 'text-brand-primary' },
  { icon: Activity, label: 'Optimization', color: 'text-brand-secondary' },
  { icon: Terminal, label: 'Deployment', color: 'text-brand-accent' },
];

export const DataScienceShowcase = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-32 px-6 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            className="flex items-center justify-center gap-3 text-zinc-600 font-mono text-[9px] uppercase tracking-[0.4em]"
          >
            <div className="w-8 h-[1px] bg-white/10" />
            Computational Methodology
            <div className="w-8 h-[1px] bg-white/10" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2rem,6vw,4.5rem)] font-display font-black text-white tracking-tighter leading-tight"
          >
            The Analytical <span className="text-zinc-600 italic">Architecture</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connecting Line - More technical looking */}
          <div className="absolute top-[40px] left-0 w-full h-[1px] bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(255,255,255,0.1)_4px,rgba(255,255,255,0.1)_8px)] hidden lg:block" />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 relative z-10">
            {pipeline.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="flex flex-col items-center group cursor-default"
              >
                <div className="relative">
                   <div className="w-20 h-20 rounded-full glass-dark flex items-center justify-center relative bg-black border-white/5 group-hover:border-brand-primary/50 group-hover:scale-110 transition-all duration-700">
                      <step.icon size={26} className={cn("transition-colors duration-500", step.color)} />
                      <div className="absolute -inset-2 rounded-full border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                   </div>
                </div>
                
                <h3 className="text-center mt-10 font-bold text-xs text-white uppercase tracking-widest">{step.label}</h3>
                <p className="text-[8px] font-mono text-zinc-700 text-center uppercase tracking-[0.3em] mt-2 font-black">LOG_PHASE_0{i+1}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-32">
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             animate={inView ? { opacity: 1, x: 0 } : {}}
             className="p-16 glass-dark relative group overflow-hidden border-white/[0.03]"
           >
             <div className="absolute -top-10 -right-10 p-8 opacity-5 group-hover:opacity-20 transition-opacity duration-[1s]">
               <Network size={240} className="text-brand-primary" />
             </div>
             
             <div className="space-y-8 relative z-10">
               <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                 <Cpu className="text-brand-primary" size={24} />
               </div>
               
               <div className="space-y-4">
                 <h4 className="text-2xl font-display font-black text-white uppercase tracking-tighter">AI Structural Integrity</h4>
                 <p className="text-zinc-500 text-sm leading-relaxed font-light max-w-sm">
                   Designing modular inference pipelines that operate with deterministic precision across heterogenous environments.
                 </p>
               </div>
               
               <div className="flex items-center gap-6 text-[9px] font-mono font-black uppercase tracking-[0.3em] text-zinc-600">
                 <span className="flex items-center gap-2 text-brand-primary"><ShieldCheck size={14} /> Production_v1</span>
                 <span className="flex items-center gap-2"><ShieldCheck size={14} /> Latency_Optimized</span>
               </div>
             </div>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, x: 30 }}
             animate={inView ? { opacity: 1, x: 0 } : {}}
             className="p-16 glass-dark relative group overflow-hidden border-white/[0.03]"
           >
             <div className="absolute -top-10 -right-10 p-8 opacity-5 group-hover:opacity-20 transition-opacity duration-[1s]">
               <Database size={240} className="text-white" />
             </div>
             
             <div className="space-y-8 relative z-10">
               <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                 <Layers className="text-zinc-400" size={24} />
               </div>
               
               <div className="space-y-4">
                 <h4 className="text-2xl font-display font-black text-white uppercase tracking-tighter">Latent Space Engineering</h4>
                 <p className="text-zinc-500 text-sm leading-relaxed font-light max-w-sm">
                   Advanced transformation logic for dimensional reduction and manifold alignment in high-complexity feature spaces.
                 </p>
               </div>
               
               <div className="flex items-center gap-6 text-[9px] font-mono font-black uppercase tracking-[0.3em] text-zinc-600">
                 <span className="flex items-center gap-2 text-white"><ShieldCheck size={14} /> Automated_X</span>
                 <span className="flex items-center gap-2"><ShieldCheck size={14} /> Semantic_Scale</span>
               </div>
             </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};
