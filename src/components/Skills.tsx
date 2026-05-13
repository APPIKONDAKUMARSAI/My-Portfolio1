import React from 'react';
import { motion } from 'motion/react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';
import { useInView } from 'react-intersection-observer';
import { Database, Code2, Layout, TrendingUp, Cpu, PieChart as PieIcon } from 'lucide-react';
import { cn } from '../lib/utils';

const dataScienceSkills = [
  { subject: 'Python', A: 90, fullMark: 100 },
  { subject: 'SQL', A: 85, fullMark: 100 },
  { subject: 'Machine Learning', A: 80, fullMark: 100 },
  { subject: 'Data Viz', A: 95, fullMark: 100 },
  { subject: 'Statistics', A: 75, fullMark: 100 },
  { subject: 'EDA', A: 90, fullMark: 100 },
];

const toolStats = [
  { name: 'Power BI', level: 95, color: '#F2C811' },
  { name: 'Tableau', level: 88, color: '#E97627' },
  { name: 'Looker Studio', level: 85, color: '#4285F4' },
  { name: 'Excel', level: 90, color: '#217346' },
  { name: 'Pandas', level: 90, color: '#150458' },
];

const skillCategories = [
  {
    title: 'Data Analysis',
    icon: Database,
    skills: ['Python', 'SQL', 'PostgreSQL', 'Statistics', 'EDA'],
    color: 'from-blue-500/20 to-cyan-500/10'
  },
  {
    title: 'Machine Learning',
    icon: Cpu,
    skills: ['Scikit-Learn', 'Regression', 'Classification', 'Clustering'],
    color: 'from-purple-500/20 to-pink-500/10'
  },
  {
    title: 'Visualization',
    icon: PieIcon,
    skills: ['Power BI', 'Tableau', 'Looker Studio', 'Matplotlib', 'Seaborn', 'DAX'],
    color: 'from-orange-500/20 to-yellow-500/10'
  }
];

export const Skills = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-32 px-6 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 text-zinc-500 font-mono text-[9px] uppercase tracking-[0.4em] mb-10">
          <div className="w-10 h-[1px] bg-white/10" />
           Technical Proficiency / Stack
        </div>
        
        <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-display font-black text-white mb-20 tracking-tighter leading-tight">
          Analytical <span className="text-zinc-600">Architecture</span> & <br />
          Computational Toolbox.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Radar Chart for Core Skills */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            className="lg:col-span-7 glass-dark p-12 flex flex-col items-center"
          >
            <div className="w-full flex justify-between items-start mb-16 px-4">
               <div className="space-y-1">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Inference Models</h3>
                 <p className="text-[9px] font-mono text-zinc-600">Core algorithmic focus</p>
               </div>
               <div className="flex gap-1.5">
                 {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-primary/20" />)}
               </div>
            </div>
            
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataScienceSkills}>
                  <PolarGrid stroke="rgba(255,255,255,0.05)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 9, fontWeight: '700', letterSpacing: '0.1em' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke="var(--color-brand-primary)"
                    fill="var(--color-brand-primary)"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Bar Chart for Tools */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 bento-card p-12 overflow-hidden relative"
          >
             <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-16 relative z-10 font-mono">Specialized Ecosystems</h3>
             
             <div className="w-full h-[400px] relative z-10">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={toolStats} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      tick={{ fill: '#a1a1aa', fontSize: 10, fontWeight: 'bold', fontFamily: 'monospace' }} 
                      width={100}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                      contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '1rem', fontSize: '10px' }}
                    />
                    <Bar dataKey="level" radius={[0, 4, 4, 0]} barSize={12}>
                      {toolStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="white" opacity={0.1 + (entry.level / 200)} />
                      ))}
                    </Bar>
                 </BarChart>
               </ResponsiveContainer>
             </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="p-12 bento-card relative overflow-hidden group hover:bg-zinc-900/30"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white group-hover:border-brand-primary/50 transition-all duration-500">
                  <cat.icon size={28} className="text-zinc-400 group-hover:text-brand-primary transition-colors duration-500" />
                </div>
                <div className="text-[12px] font-mono text-zinc-800 font-black">0{i+1}</div>
              </div>
              
              <h3 className="text-xl font-bold mb-6 text-white tracking-tight">{cat.title}</h3>
              
              <div className="flex flex-wrap gap-3">
                {cat.skills.map(skill => (
                  <span key={skill} className="px-4 py-2 bg-white/[0.03] border border-white/[0.05] rounded-full text-[9px] text-zinc-500 font-mono font-bold uppercase tracking-widest hover:text-white hover:border-white/20 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
