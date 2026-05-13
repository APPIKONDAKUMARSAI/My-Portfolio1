import React from 'react';
import { motion } from 'motion/react';
import { Award, Briefcase, GraduationCap, MapPin, Calendar, Clock, Target, Rocket, ShieldCheck, Github } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '../lib/utils';

const journey = [
  {
    type: 'exp',
    title: 'AI Data Analyst Trainee',
    org: 'Tech Mahindra Smart Academy',
    date: '2026',
    icon: Award,
    color: 'text-purple-400 bg-purple-400/10'
  },
  {
    type: 'exp',
    title: 'Data Analyst Intern',
    org: 'HMI Engineering',
    date: 'Nov 2023 - Jan 2024',
    icon: Briefcase,
    color: 'text-brand-primary bg-brand-primary/10'
  }
];

const stats = [
  { label: 'Projects Completed', value: '15+', icon: Rocket },
  { label: 'Certifications', value: '6+', icon: ShieldCheck },
  { label: 'GitHub Repos', value: '20+', icon: Github },
];

export const About = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Story Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8 glass-dark p-12 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 blur-[120px] pointer-events-none" />
            
            <div className="flex items-center gap-4 text-zinc-500 font-mono text-[9px] uppercase tracking-[0.4em] mb-10">
              <div className="w-10 h-[1px] bg-white/10" />
               Introduction / Overview
            </div>
            
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-display font-black mb-10 tracking-tighter leading-[0.95] text-white">
              Synthesizing <span className="text-zinc-600 block">Abstract Data</span> Into Physical Intelligence.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
              <div className="space-y-6 text-zinc-400 text-sm leading-relaxed font-light">
                <p>
                  I am <span className="text-white font-medium">Kumar Sai Appikonda</span>, an AI Data Analyst navigating the intersection of statistical rigor and engineering precision.
                </p>
                <p>
                  My focus lies in building <span className="text-white">scalable inference engines</span> and high-fidelity analytics that transform high-dimensional noise into actionable signal.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] group transition-all hover:bg-white/[0.05]">
                    <div className="text-3xl font-display font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-[8px] font-mono uppercase tracking-[0.2em] text-zinc-600 font-black">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Journey Bento Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4 bento-card p-10 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-[9px] font-black uppercase tracking-[0.34em] text-zinc-600 mb-12 flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full border border-brand-primary" />
                 Experience Log
              </h3>
              
              <div className="relative pl-6 border-l border-white/5 space-y-16">
                {journey.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="relative"
                  >
                    <div className={cn(
                      "absolute -left-[29px] top-1 w-[6px] h-[6px] rounded-full",
                      item.type === 'exp' ? 'bg-brand-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-zinc-800'
                    )} />
                    
                    <div>
                      <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-3 block">
                        {item.date}
                      </span>
                      <h4 className="text-base font-bold text-white mb-1 leading-tight">{item.title}</h4>
                      <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-tighter">{item.org}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-20 pt-8 border-t border-white/5 flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="w-8 h-8 rounded-full border-2 border-zinc-950 bg-zinc-900 flex items-center justify-center overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${n}`} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span className="text-[9px] font-mono text-zinc-600">Collaborating Worldwide</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
