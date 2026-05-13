/// <reference types="vite/client" />
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Database, Layout, TrendingUp, BarChart3, Globe, Code2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '../lib/utils';
import { fetchGitHubRepos } from '../lib/githubService';

interface Project {
  title: string;
  description: string;
  tags: string[];
  metrics: Record<string, string>;
  github: string;
  demo: string;
  image: string;
  color: string;
  isGitHub?: boolean;
}

const featuredProjects: Project[] = [
  {
    title: 'Profit Analytics Dashboard',
    description: 'Interactive analytics dashboard in Looker Studio covering 34 countries and 263 cities with deep profitability analysis.',
    tags: ['Looker Studio', 'KPI Tracking', 'Business Insights', 'Geo-Analysis'],
    metrics: {
      sales: '55.4M',
      profit: '31.6M',
      orders: '15K'
    },
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    title: 'Supplement Sales Analysis',
    description: 'Customer segmentation and sales analysis dashboard providing actionable bundling strategies.',
    tags: ['Power BI', 'DAX', 'Marketing Strategy', 'Customer Segments'],
    metrics: {
      revenue: '22.9M',
      units: '658K',
      returns: '6.7K'
    },
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    color: 'from-blue-600 to-violet-600'
  },
  {
    title: 'Employee Performance AI',
    description: 'ML model predicting high performers based on historical engagement and productivity metrics.',
    tags: ['Python', 'Scikit-Learn', 'EDA', 'Regression'],
    metrics: {
      accuracy: '92%',
      features: '18+',
      duration: '4-mo'
    },
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=1000',
    color: 'from-emerald-500 to-teal-600'
  }
];

export const Projects = () => {
  const [allProjects, setAllProjects] = useState<Project[]>(featuredProjects);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    async function getRepos() {
      try {
        const username = import.meta.env.VITE_GITHUB_USERNAME || 'APPIKONDAKUMARSAI';
        const repos = await fetchGitHubRepos(username);
        
        const githubProjects: Project[] = repos.map((repo: any) => ({
          title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
          description: repo.description || 'Data-driven project focused on analytical modeling and insights.',
          tags: repo.topics?.length ? repo.topics.slice(0, 4) : [repo.language || 'Data Analysis', 'Python'],
          metrics: {
            stars: repo.stargazers_count.toString(),
            forks: repo.forks_count.toString(),
            size: `${(repo.size / 1024).toFixed(1)}MB`
          },
          github: repo.html_url,
          demo: repo.homepage || repo.html_url,
          image: `https://images.unsplash.com/photo-1518186239717-2e9b136758e5?auto=format&fit=crop&q=80&w=1000&sig=${repo.id}`,
          color: 'from-zinc-800 to-zinc-900',
          isGitHub: true
        }));

        // Filter out repos that match featured ones by name (if any)
        const uniqueGithub = githubProjects.filter(gp => 
          !featuredProjects.some(fp => fp.title.toLowerCase() === gp.title.toLowerCase())
        );

        setAllProjects([...featuredProjects, ...uniqueGithub]);
      } catch (error) {
        console.error('Error fetching dynamic projects:', error);
      } finally {
        setLoading(false);
      }
    }
    getRepos();
  }, []);

  return (
    <section id="projects" className="py-32 px-6 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="flex items-center gap-4 text-zinc-500 font-mono text-[9px] uppercase tracking-[0.4em]"
            >
              <div className="w-10 h-[1px] bg-white/10" />
               Selected Systems & Models
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-[clamp(2rem,4vw,3.5rem)] font-display font-black text-white tracking-tighter leading-tight"
            >
              Featured <span className="text-zinc-600">Case Studies</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="max-w-md lg:text-right"
          >
             <p className="text-[11px] font-mono text-zinc-500 uppercase leading-loose tracking-[0.2em]">
               "Architecture is not just about buildings, but about the systems that govern data flow and structural integrity."
             </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {allProjects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + (i * 0.1) }}
              className={cn(
                "group bento-card relative min-h-[450px] flex flex-col overflow-hidden border-white/[0.03]",
                i === 0 ? "lg:col-span-8" : "lg:col-span-4",
                i === 2 ? "lg:col-span-12" : "",
                i > 2 ? "lg:col-span-4" : ""
              )}
            >
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale opacity-10 group-hover:opacity-40 group-hover:scale-110 group-hover:rotate-1 transition-all duration-[1.5s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/20 to-transparent" />
              </div>

              <div className="relative z-10 p-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-auto">
                   <div className="flex gap-3 flex-wrap max-w-[75%]">
                     {project.isGitHub && (
                       <span className="px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-[9px] font-mono text-brand-primary uppercase flex items-center gap-2 font-black">
                         <Github size={12} /> Live_Repo
                       </span>
                     )}
                     {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/[0.03] border border-white/5 rounded-full text-[8px] font-mono text-zinc-600 uppercase font-black">
                          {tag}
                        </span>
                      ))}
                   </div>
                   <div className="w-12 h-12 glass-dark flex items-center justify-center text-zinc-500 group-hover:text-brand-primary group-hover:border-brand-primary/30 transition-all duration-500">
                      {project.isGitHub ? <Code2 size={24} /> : <Database size={24} />}
                   </div>
                </div>

                <div className="mt-12 space-y-4">
                  <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tighter group-hover:text-brand-primary transition-colors duration-500 capitalize">
                    {project.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 font-light">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto flex items-end justify-between pt-10 border-t border-white/5">
                   <div className="flex gap-8">
                      {Object.entries(project.metrics).map(([key, val]) => (
                        <div key={key} className="space-y-1">
                          <span className="text-[12px] font-display font-black text-white block tracking-tighter">{val}</span>
                          <span className="text-[9px] uppercase font-mono text-zinc-700 font-bold">{key}</span>
                        </div>
                      ))}
                   </div>
                   <div className="flex gap-3">
                     {project.github !== '#' && (
                       <motion.a 
                         whileHover={{ y: -3 }}
                         href={project.github} 
                         target="_blank"
                         rel="noopener noreferrer"
                         className="p-4 rounded-full border border-white/5 text-zinc-500 hover:text-white hover:border-white/20 transition-all"
                       >
                         <Github size={18} />
                       </motion.a>
                     )}
                     <motion.a 
                       whileHover={{ x: 5 }}
                       href={project.demo} 
                       target="_blank"
                       rel="noopener noreferrer"
                       className="p-4 rounded-full bg-white text-black hover:bg-brand-primary hover:text-white transition-all shadow-2xl"
                     >
                       <ExternalLink size={18} />
                     </motion.a>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
