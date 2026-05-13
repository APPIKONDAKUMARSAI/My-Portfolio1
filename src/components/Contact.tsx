/// <reference types="vite/client" />
import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, ShieldCheck } from 'lucide-react';

export const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-12 glass-dark p-16 relative overflow-hidden group mb-8"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[140px] pointer-events-none" />
            <div className="flex items-center gap-4 text-zinc-500 font-mono text-[9px] uppercase tracking-[0.4em] mb-10">
              <div className="w-10 h-[1px] bg-white/10" />
               Communication Layer
            </div>
            <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-display font-black text-white mb-6 tracking-tighter leading-[0.95]">
              Initiate <span className="text-zinc-600">Protocol</span> & <br />
              Project Discussion.
            </h2>
            <p className="text-zinc-500 text-sm max-w-lg leading-relaxed font-light">
              Architecting new solutions or optimizing existing datasets? Let's discuss the structural parameters of your next inquiry.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-4 bento-card p-12 flex flex-col justify-between"
          >
            <div className="space-y-12">
              {[
                { icon: Mail, label: 'Standard Endpoint', value: import.meta.env.VITE_CONTACT_EMAIL || 'appikondakumarsai2001@gmail.com', href: `mailto:${import.meta.env.VITE_CONTACT_EMAIL || 'appikondakumarsai2001@gmail.com'}` },
                { icon: Phone, label: 'Direct Audio', value: '+91 9989646615', href: 'tel:+919989646615' },
                { icon: MapPin, label: 'Local Grid', value: 'Visakhapatnam, India', href: '#' },
              ].map((item, i) => (
                <a 
                  key={i} 
                  href={item.href}
                  className="flex items-center gap-6 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-brand-primary/40 transition-all text-zinc-500 group-hover:text-brand-primary">
                    <item.icon size={20} />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest font-black">{item.label}</div>
                    <div className="text-[12px] text-zinc-400 group-hover:text-white transition-colors truncate max-w-[180px] font-mono">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-20 flex gap-4">
              <a href={`https://github.com/${import.meta.env.VITE_GITHUB_USERNAME || 'APPIKONDAKUMARSAI'}`} target="_blank" className="flex-1 h-14 rounded-full border border-white/5 flex items-center justify-center text-zinc-600 hover:text-white hover:bg-white/5 transition-all"><Github size={20} /></a>
              <a href="https://linkedin.com/in/kumar-sai-appikonda-ab3289327" target="_blank" className="flex-1 h-14 rounded-full border border-white/5 flex items-center justify-center text-zinc-600 hover:text-white hover:bg-white/5 transition-all"><Linkedin size={20} /></a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-8 glass-dark p-12 relative overflow-hidden"
          >
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.3em] font-black ml-4">Identification</label>
                  <input 
                    type="text" 
                    placeholder="NAME_OR_ORG"
                    className="w-full px-8 py-5 rounded-full bg-white/[0.03] border border-white/5 focus:border-brand-primary/50 focus:outline-none transition-all placeholder:text-zinc-800 text-xs font-mono uppercase tracking-widest"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.3em] font-black ml-4">Address</label>
                  <input 
                    type="email" 
                    placeholder="EMAIL_HOST_COM"
                    className="w-full px-8 py-5 rounded-full bg-white/[0.03] border border-white/5 focus:border-brand-primary/50 focus:outline-none transition-all placeholder:text-zinc-800 text-xs font-mono uppercase tracking-widest"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.3em] font-black ml-4">Inquiry_Package</label>
                <textarea 
                  rows={4}
                  placeholder="DESCRIBE_THE_DATA_PARAMETER..."
                  className="w-full px-8 py-6 rounded-[2rem] bg-white/[0.03] border border-white/5 focus:border-brand-primary/50 focus:outline-none transition-all resize-none placeholder:text-zinc-800 text-xs font-mono leading-relaxed"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-6 rounded-full bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-4 hover:bg-brand-primary hover:text-white transition-all shadow-2xl"
              >
                Execute Transmission <Send size={16} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
