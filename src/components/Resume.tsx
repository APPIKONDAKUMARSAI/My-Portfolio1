/// <reference types="vite/client" />
import React from 'react';
import { motion } from 'motion/react';
import { FileText, Download, ExternalLink, GraduationCap, Briefcase, Award, Eye } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '../lib/utils';
import { ResumeModal } from './ResumeModal';

const education = [
  {
    degree: 'B.Tech in Data Science',
    institution: 'Raghu Engineering College',
    period: '2020 — 2024',
    description: 'Specialized in Big Data Analytics, Machine Learning, and Statistical Modeling.'
  },
  {
    degree: 'Diploma in Mechanical',
    institution: 'Avanthi Institute of Engineering and Technology',
    period: '2017 — 2020',
    description: 'Foundational engineering principles and technical design.'
  }
];

const experience = [
  {
    role: 'AI Data Analyst Trainee',
    company: 'Tech Mahindra Smart Academy',
    period: '2026 — Present',
    description: 'Advanced data modeling and AI-driven analytical solutions for enterprise-level challenges.'
  },
  {
    role: 'Data Analyst Intern',
    company: 'HMI Engineering Services',
    period: 'Nov 2023 — Jan 2024',
    description: 'Analyzed industrial datasets to optimize operational efficiency and developed automated reporting tools.'
  }
];

export const Resume = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <section id="resume" className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono uppercase tracking-widest text-blue-400 mb-6"
            >
              <FileText size={12} /> Curriculum Vitae
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter"
            >
              Professional <span className="text-gradient">Background</span>
            </motion.h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              onClick={() => setIsModalOpen(true)}
              className="group flex items-center gap-3 px-6 py-3 bg-zinc-900 text-white border border-zinc-800 rounded-full font-bold text-sm hover:border-blue-500/50 hover:bg-zinc-800 transition-all duration-300"
            >
              <Eye size={18} />
              Preview Resume
            </motion.button>

            <motion.a
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              href={import.meta.env.VITE_RESUME_URL || "#"}
              download="Resume.pdf"
              target={import.meta.env.VITE_RESUME_URL ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 bg-white text-zinc-950 rounded-full font-bold text-sm hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              <Download size={18} />
              Download Resume
            </motion.a>
          </div>
        </div>

        <ResumeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Experience Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-blue-500">
                <Briefcase size={24} />
              </div>
              <h3 className="text-2xl font-display font-bold text-white">Experience</h3>
            </div>
            
            {experience.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="relative pl-8 border-l border-zinc-800 pb-8 last:pb-0"
              >
                <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-blue-500" />
                <div className="bento-card p-6 group hover:border-blue-500/30 transition-all">
                  <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-2">
                    {item.period}
                  </span>
                  <h4 className="text-xl font-bold text-white mb-1">{item.role}</h4>
                  <p className="text-zinc-400 font-medium mb-4">{item.company}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-violet-500">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-2xl font-display font-bold text-white">Education</h3>
            </div>

            {education.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="relative pl-8 border-l border-zinc-800 pb-8 last:pb-0"
              >
                <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-violet-500" />
                <div className="bento-card p-6 group hover:border-violet-500/30 transition-all">
                  <span className="text-[10px] font-mono text-violet-400 uppercase tracking-widest block mb-2">
                    {item.period}
                  </span>
                  <h4 className="text-xl font-bold text-white mb-1">{item.degree}</h4>
                  <p className="text-zinc-400 font-medium mb-4">{item.institution}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="p-8 rounded-3xl bg-gradient-to-br from-blue-500/5 to-violet-500/5 border border-zinc-800 mt-8 relative overflow-hidden group"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="text-yellow-500" size={20} />
                  <h4 className="font-bold text-white uppercase tracking-tight">Key Achievements</h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-zinc-400">
                    <div className="w-1 h-1 rounded-full bg-blue-500" />
                    Built 15+ AI & Data projects with real-world impact
                  </li>
                  <li className="flex items-center gap-3 text-sm text-zinc-400">
                    <div className="w-1 h-1 rounded-full bg-blue-500" />
                    6+ Professional Certifications in AI & Analytics
                  </li>
                  <li className="flex items-center gap-3 text-sm text-zinc-400">
                    <div className="w-1 h-1 rounded-full bg-blue-500" />
                    Active contributor to Open Source Data projects
                  </li>
                </ul>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                <FileText size={160} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
