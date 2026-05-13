import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Twitter, ChevronUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-20 pb-4 px-6 border-t border-white/5 bg-[#030303]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
          <div className="flex flex-col items-center md:items-start gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-black text-black text-[10px] shadow-2xl">KSA</div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white font-mono leading-none">Portfolio</span>
                <span className="text-[9px] text-zinc-600 font-mono mt-1 uppercase tracking-widest italic">AI Data Analyst</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-12">
            <button 
              onClick={scrollToTop}
              className="group flex flex-col items-center gap-3 text-[9px] font-black font-mono text-zinc-700 uppercase tracking-[0.4em] transition-colors hover:text-white"
            >
              <div className="p-4 border border-zinc-900 rounded-full group-hover:border-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all">
                <ChevronUp size={20} />
              </div>
              Return_To_Origin
            </button>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6 text-[9px] font-mono text-zinc-700 uppercase tracking-[0.5em] font-black">
            <div>© 2024 SYSTEMS_IDENTITY.KSA</div>
          </div>
        </div>

        {/* Technical Banner */}
        <div className="py-10 border-t border-white/[0.03] overflow-hidden whitespace-nowrap opacity-10 text-[10px] uppercase font-mono tracking-[0.6em] text-zinc-500 font-black">
           <motion.div
             animate={{ x: [0, -2000] }}
             transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
             className="inline-block"
           >
             LOG_PROCESS: MACHINE LEARNING :: SYSTEM_INTEGRITY: PREDICTIVE ANALYTICS :: DATA_STORYTELLING :: PERSONAL_PORTFOLIO :: NEURAL_MAPPING :: SQL_OPTIMIZATION :: QUANTITATIVE_RESEARCH :: BUSINESS_INTEGRITY :: LOG_PROCESS: MACHINE LEARNING :: SYSTEM_INTEGRITY: PREDICTIVE ANALYTICS :: DATA_STORYTELLING :: PERSONAL_PORTFOLIO :: NEURAL_MAPPING :: SQL_OPTIMIZATION :: QUANTITATIVE_RESEARCH :: BUSINESS_INTEGRITY
           </motion.div>
        </div>
      </div>
    </footer>
  );
};
