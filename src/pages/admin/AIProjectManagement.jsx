import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Search, Trash2, Edit2, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIProjectManagement() {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', difficulty: 'BEGINNER', aiPrompt: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    axios.get('http://localhost:5000/api/admin/projects', { headers: { 'x-user-email': currentUser.email } })
      .then(res => setProjects(res.data)).catch(console.error);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/projects', newProject, { headers: { 'x-user-email': currentUser.email } });
      setIsModalOpen(false);
      setNewProject({ title: '', description: '', difficulty: 'BEGINNER', aiPrompt: '' });
      fetchProjects();
    } catch(err) { console.error(err) }
  };

  const filtered = projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
         <h2 className="text-3xl font-bold">Anti-Gravity AI Projects</h2>
         <div className="flex items-center gap-4">
           <div className="relative">
             <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
             <input 
               type="text" 
               placeholder="Search projects..." 
               className="pl-10 pr-4 py-2 bg-card border rounded-full outline-none focus:ring-2 focus:ring-primary w-64 text-sm"
               value={search}
               onChange={e => setSearch(e.target.value)}
             />
           </div>
           <button onClick={() => setIsModalOpen(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full font-medium flex items-center gap-2 shadow-lg transition-transform active:scale-95">
             <Plus className="w-5 h-5" /> Add Project
           </button>
         </div>
      </div>

      <div className="glass-card rounded-2xl border shadow-sm overflow-hidden">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="border-b bg-muted/50">
                  <th className="p-4 font-semibold text-sm">Project Title</th>
                  <th className="p-4 font-semibold text-sm">Difficulty</th>
                  <th className="p-4 font-semibold text-sm">Created On</th>
                  <th className="p-4 font-semibold text-sm text-right">Actions</th>
               </tr>
            </thead>
            <tbody>
               {filtered.map(project => (
                 <tr key={project.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                             <BrainCircuit className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-bold text-base line-clamp-1">{project.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">{project.description}</p>
                          </div>
                       </div>
                    </td>
                    <td className="p-4">
                       <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                           project.difficulty === 'BEGINNER' ? 'bg-green-100 text-green-700' :
                           project.difficulty === 'INTERMEDIATE' ? 'bg-yellow-100 text-yellow-700' :
                           'bg-red-100 text-red-700'
                         }`}>
                         {project.difficulty}
                       </span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                       {new Date(project.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                       <div className="flex items-center justify-end gap-2 text-muted-foreground">
                         <button className="p-2 hover:bg-muted rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                         <button className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                       </div>
                    </td>
                 </tr>
               ))}
               {filtered.length === 0 && (
                 <tr><td colSpan="4" className="p-8 text-center text-muted-foreground">No projects found.</td></tr>
               )}
            </tbody>
         </table>
      </div>

      {/* Basic Create Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.95}} className="relative w-full max-w-lg glass-card rounded-2xl shadow-2xl border p-6">
              <h3 className="text-2xl font-bold mb-4">Create AI Project Challenge</h3>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input required type="text" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="w-full px-4 py-2 rounded-xl border bg-background" placeholder="e.g. Build a Text-to-Image Bot" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea required value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="w-full px-4 py-2 rounded-xl border bg-background h-20" placeholder="Project challenge details..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Core AI Prompt</label>
                  <textarea required value={newProject.aiPrompt} onChange={e => setNewProject({...newProject, aiPrompt: e.target.value})} className="w-full px-4 py-2 rounded-xl border bg-background h-24 font-mono text-sm text-primary" placeholder="Enter the exact prompt parameters generation..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Difficulty</label>
                  <select value={newProject.difficulty} onChange={e => setNewProject({...newProject, difficulty: e.target.value})} className="w-full px-4 py-2 rounded-xl border bg-background">
                     <option value="BEGINNER">BEGINNER</option>
                     <option value="INTERMEDIATE">INTERMEDIATE</option>
                     <option value="ADVANCED">ADVANCED</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 rounded-xl font-medium hover:bg-muted transition-colors">Cancel</button>
                  <button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-xl font-bold shadow-lg transition-transform active:scale-95">Deploy Project</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
