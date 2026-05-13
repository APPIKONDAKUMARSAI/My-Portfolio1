/// <reference types="vite/client" />
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Star, GitFork, Book, Terminal, Code } from 'lucide-react';
import { fetchGitHubRepos, fetchGitHubUserData } from '../lib/githubService';
import { useInView } from 'react-intersection-observer';

export const GitHubSection = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    async function getData() {
      const username = import.meta.env.VITE_GITHUB_USERNAME || 'APPIKONDAKUMARSAI';
      const [userRepos, userProfile] = await Promise.all([
        fetchGitHubRepos(username),
        fetchGitHubUserData(username)
      ]);
      setRepos(userRepos);
      setProfile(userProfile);
      setLoading(false);
    }
    getData();
  }, []);

  if (loading) return null;

  return (
    <section id="github" className="py-32 px-6 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
         <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
           <div className="space-y-6">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={inView ? { opacity: 1, y: 0 } : {}}
               className="flex items-center gap-4 text-zinc-500 font-mono text-[9px] uppercase tracking-[0.4em]"
             >
               <div className="w-10 h-[1px] bg-white/10" />
                Version Control & Repositories
             </motion.div>
             <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] font-display font-black text-white tracking-tighter">Dynamic <span className="text-brand-primary italic">Architecture</span></h2>
           </div>
           <div className="md:text-right">
             <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest font-black">Sync_Status: ACTIVE</p>
             <p className="text-[10px] text-zinc-500 font-mono mt-2 lowercase">@{import.meta.env.VITE_GITHUB_USERNAME || 'APPIKONDAKUMARSAI'}</p>
           </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {repos.slice(0, 8).map((repo, i) => (
             <motion.a
               key={repo.id}
               href={repo.html_url}
               target="_blank"
               rel="noopener noreferrer"
               initial={{ opacity: 0, y: 20 }}
               animate={inView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.8, delay: i * 0.05 }}
               className="p-10 glass-dark border-white/5 hover:border-brand-primary/40 transition-all duration-500 group flex flex-col min-h-[300px] relative overflow-hidden"
             >
               <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               
               <div className="flex items-center justify-between mb-8 relative z-10">
                 <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-600 group-hover:text-brand-primary transition-colors">
                   <Book size={18} />
                 </div>
                 <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-700 font-black">
                   <span className="flex items-center gap-1.5"><Star size={12} className="text-brand-primary" /> {repo.stargazers_count}</span>
                   <span className="flex items-center gap-1.5"><GitFork size={12} /> {repo.forks_count}</span>
                 </div>
               </div>
               
               <h3 className="text-lg font-display font-black text-white mb-4 group-hover:text-brand-primary transition-colors truncate tracking-tight uppercase">
                 {repo.name.replace(/-/g, '_')}
               </h3>
               
               <p className="text-zinc-600 text-xs mb-8 line-clamp-3 flex-grow font-light leading-relaxed group-hover:text-zinc-400 transition-colors">
                 {repo.description || "Experimental data science project utilizing Python and statistical analysis."}
               </p>

               <div className="flex items-center justify-between pt-6 border-t border-white/5 relative z-10">
                 <span className="text-[10px] font-mono text-zinc-700 font-black uppercase tracking-widest">
                   {repo.language || 'Code'}
                 </span>
                 <motion.div whileHover={{ scale: 1.2 }} className="text-zinc-800">
                   <Terminal size={14} />
                 </motion.div>
               </div>
             </motion.a>
           ))}
         </div>

         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={inView ? { opacity: 1, y: 0 } : {}}
           transition={{ delay: 0.8 }}
           className="mt-20 flex flex-col lg:flex-row items-center gap-12 p-16 glass-dark border-white/5 relative overflow-hidden"
         >
           <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent pointer-events-none" />
           
           <div className="relative group shrink-0">
             <div className="absolute -inset-4 bg-brand-primary/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
             <img 
               src={profile?.avatar_url} 
               alt="Kumar Sai" 
               className="relative w-32 h-32 rounded-full border border-white/10 p-1 bg-zinc-950"
             />
           </div>
           
           <div className="text-center lg:text-left flex-1 space-y-6 relative z-10">
             <div className="space-y-1">
               <h4 className="text-3xl font-display font-black text-white tracking-tighter uppercase">{profile?.name || 'Kumar Sai Appikonda'}</h4>
               <p className="text-[10px] font-mono font-black text-brand-primary uppercase tracking-[0.4em]">Principal Scientist</p>
             </div>
             
             <p className="text-zinc-500 text-sm max-w-2xl leading-relaxed font-light">
               {profile?.bio || 'Building future-ready AI and Data solutions. Passionate about machine learning and visual storytelling.'}
             </p>
             
             <div className="flex flex-wrap justify-center lg:justify-start gap-10 text-[9px] font-mono font-black text-zinc-600 uppercase tracking-widest">
                <span className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  {profile?.public_repos} REPOSITORIES
                </span>
                <span className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  {profile?.followers} NETWORK_NODES
                </span>
                <span className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                  LOCATION: {profile?.location || 'VISAKHAPATNAM_IN'}
                </span>
             </div>
           </div>

           <motion.a 
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
             href={`https://github.com/${import.meta.env.VITE_GITHUB_USERNAME || 'APPIKONDAKUMARSAI'}`} 
             target="_blank" 
             rel="noopener noreferrer"
             className="px-10 py-5 rounded-full bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] hover:bg-brand-primary hover:text-white transition-all shadow-2xl shrink-0"
           >
             Connect_On_Github
           </motion.a>
         </motion.div>
      </div>
    </section>
  );
};
