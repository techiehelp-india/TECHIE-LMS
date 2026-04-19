import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Search, Trash2, Edit2, BookOpen, ListVideo, X, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CourseManagement() {
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', price: '', thumbnail: '' });

  // Modules State
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const [activeCourse, setActiveCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [newLessonUrl, setNewLessonUrl] = useState('');
  const [isLessonLoading, setIsLessonLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios.get('http://localhost:5000/api/admin/courses', { headers: { 'x-user-email': currentUser.email } })
      .then(res => setCourses(res.data)).catch(console.error);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/courses', newCourse, { headers: { 'x-user-email': currentUser.email } });
      setIsModalOpen(false);
      setNewCourse({ title: '', description: '', price: '', thumbnail: '' });
      fetchCourses();
    } catch(err) { console.error(err) }
  };

  const handleYoutubeImport = async (e) => {
    const url = e.target.value;
    if(!url.includes("youtube.com") && !url.includes("youtu.be")) return;
    
    try {
      const res = await axios.get(`https://noembed.com/embed?dataType=json&url=${url}`);
      if(res.data && res.data.title) {
        setNewCourse(prev => ({
           ...prev,
           title: res.data.title || prev.title,
           thumbnail: res.data.thumbnail_url || prev.thumbnail,
           description: `📺 Imported Course Masterclass from ${res.data.author_name}.\n\nOriginal Source: ${url}\n\n${res.data.title} curriculum.`
        }));
      }
    } catch(err) { }
  };

  const openModules = (course) => {
    setActiveCourse(course);
    setIsModulesOpen(true);
    fetchLessons(course.id);
  }

  const fetchLessons = async (cId) => {
    const res = await axios.get(`http://localhost:5000/api/admin/courses/${cId}/lessons`, { headers: { 'x-user-email': currentUser.email } });
    setLessons(res.data);
  }

  const handleAddLesson = async (e) => {
    e.preventDefault();
    if(!newLessonUrl.includes("youtu")) return alert("Only YouTube URLs allowed!");
    setIsLessonLoading(true);
    
    try {
       const res = await axios.get(`https://noembed.com/embed?dataType=json&url=${newLessonUrl}`);
       const title = res.data?.title || 'YouTube Module';
       
       await axios.post(`http://localhost:5000/api/admin/courses/${activeCourse.id}/lessons`, {
          title, videoUrl: newLessonUrl
       }, { headers: { 'x-user-email': currentUser.email } });
       
       setNewLessonUrl('');
       fetchLessons(activeCourse.id);
       fetchCourses();
    } catch(err) { console.error(err) } finally {
      setIsLessonLoading(false);
    }
  }

  const handleDeleteLesson = async (lId) => {
     if(!confirm('Delete this module?')) return;
     await axios.delete(`http://localhost:5000/api/admin/lessons/${lId}`, { headers: { 'x-user-email': currentUser.email }});
     fetchLessons(activeCourse.id);
     fetchCourses();
  }

  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
         <h2 className="text-3xl font-bold">Batch & Curriculum Management</h2>
         <div className="flex items-center gap-4">
           <div className="relative">
             <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
             <input 
               type="text" 
               placeholder="Search batches..." 
               className="pl-10 pr-4 py-2 bg-card border rounded-full outline-none focus:ring-2 focus:ring-primary w-64 text-sm"
               value={search}
               onChange={e => setSearch(e.target.value)}
             />
           </div>
           <button onClick={() => setIsModalOpen(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full font-medium flex items-center gap-2 shadow-lg transition-transform active:scale-95">
             <Plus className="w-5 h-5" /> Create Batch (Course)
           </button>
         </div>
      </div>

      <div className="glass-card rounded-2xl border shadow-sm overflow-hidden">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="border-b bg-muted/50">
                  <th className="p-4 font-semibold text-sm">Batch Details</th>
                  <th className="p-4 font-semibold text-sm">Price</th>
                  <th className="p-4 font-semibold text-sm">Enrollments</th>
                  <th className="p-4 font-semibold text-sm">Status</th>
                  <th className="p-4 font-semibold text-sm text-right">Actions</th>
               </tr>
            </thead>
            <tbody>
               {filtered.map(course => (
                 <tr key={course.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                             <BookOpen className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-bold text-base line-clamp-1">{course.title}</p>
                            <p className="text-xs text-muted-foreground">ID: {course.id.slice(0,8)}...</p>
                          </div>
                       </div>
                    </td>
                    <td className="p-4 font-mono font-medium">${course.price}</td>
                    <td className="p-4 font-medium">{course._count.enrollments}</td>
                    <td className="p-4">
                       <span className={`text-xs px-2 py-1 rounded-full font-bold shadow-sm ${course.published ? 'bg-green-100 text-green-800 border-green-200 border' : 'bg-gray-100 text-gray-700'}`}>
                         {course.published ? 'Active Batch' : 'Draft'}
                       </span>
                    </td>
                    <td className="p-4 text-right">
                       <div className="flex items-center justify-end gap-1 text-muted-foreground">
                         <button onClick={() => openModules(course)} className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shadow-sm mr-2">
                            <ListVideo className="w-4 h-4" /> Manage Modules ({course._count.lessons})
                         </button>
                         <button className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                       </div>
                    </td>
                 </tr>
               ))}
               {filtered.length === 0 && (
                 <tr><td colSpan="5" className="p-8 text-center text-muted-foreground">No courses found.</td></tr>
               )}
            </tbody>
         </table>
      </div>

      {/* Modules Manager Modal */}
      <AnimatePresence>
         {isModulesOpen && activeCourse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
               <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setIsModulesOpen(false)} className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
               <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.95}} className="relative w-full max-w-2xl glass-card rounded-2xl shadow-2xl border overflow-hidden flex flex-col max-h-[80vh]">
                  <div className="p-6 border-b flex justify-between items-center bg-muted/30">
                     <div>
                       <h3 className="text-xl font-bold flex items-center gap-2"><ListVideo className="w-5 h-5 text-primary" /> Modules for "{activeCourse.title}"</h3>
                       <p className="text-sm text-muted-foreground">Paste YouTube links below to automatically append video lessons sequentially to this batch.</p>
                     </div>
                     <button onClick={() => setIsModulesOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors"><X className="w-5 h-5"/></button>
                  </div>

                  <div className="p-6 flex-1 overflow-y-auto space-y-4">
                     <form onSubmit={handleAddLesson} className="flex gap-2">
                        <div className="relative flex-1">
                          <Youtube className="w-5 h-5 text-red-500 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input required type="url" placeholder="https://youtube.com/watch?v=..." value={newLessonUrl} onChange={e => setNewLessonUrl(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border bg-background font-medium focus:ring-2 focus:ring-red-500/50 outline-none transition-all" />
                        </div>
                        <button disabled={isLessonLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50 whitespace-nowrap shadow-lg">
                           {isLessonLoading ? 'Parsing...' : 'Append Video'}
                        </button>
                     </form>

                     <div className="space-y-2 mt-6">
                        {lessons.length === 0 ? (
                           <div className="p-8 text-center text-muted-foreground border-2 border-dashed rounded-xl">No modules uploaded yet. Paste a YouTube link above!</div>
                        ) : lessons.map((lesson, idx) => (
                           <div key={lesson.id} className="flex justify-between items-center p-4 bg-background border rounded-xl hover:shadow-md transition-shadow group">
                              <div className="flex items-center gap-4">
                                 <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0 border border-primary/20">{idx + 1}</div>
                                 <p className="font-bold text-sm leading-tight line-clamp-1">{lesson.title}</p>
                              </div>
                              <button onClick={() => handleDeleteLesson(lesson.id)} className="p-2 text-muted-foreground hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4"/></button>
                           </div>
                        ))}
                     </div>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      {/* Batch Create Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.95}} className="relative w-full max-w-lg glass-card rounded-2xl shadow-2xl border p-6">
              <h3 className="text-2xl font-bold mb-4">Create New Batch</h3>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center justify-between">
                    <span>YouTube URL Magic <span className="text-primary text-xs font-normal bg-primary/10 px-2 py-0.5 rounded ml-2">✨ Auto-Fill Metadata</span></span>
                  </label>
                  <div className="relative">
                     <Youtube className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                     <input type="text" onBlur={handleYoutubeImport} className="w-full pl-10 pr-4 py-2 rounded-xl border bg-background border-purple-500/30 focus:ring-purple-500/50 transition-all font-medium placeholder:font-normal outline-none" placeholder="Paste YouTube link here..." />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Batch Title</label>
                  <input required type="text" value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} className="w-full px-4 py-2 rounded-xl border bg-background outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. Advanced AI Integration" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea required value={newCourse.description} onChange={e => setNewCourse({...newCourse, description: e.target.value})} className="w-full px-4 py-2 rounded-xl border bg-background h-24 outline-none focus:ring-2 focus:ring-primary/50" placeholder="Course details..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Price (USD)</label>
                    <input required type="number" min="0" step="0.01" value={newCourse.price} onChange={e => setNewCourse({...newCourse, price: e.target.value})} className="w-full px-4 py-2 rounded-xl border bg-background outline-none focus:ring-2 focus:ring-primary/50" placeholder="49.99" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Thumbnail Override</label>
                    <input type="text" value={newCourse.thumbnail} onChange={e => setNewCourse({...newCourse, thumbnail: e.target.value})} className="w-full px-4 py-2 rounded-xl border bg-background outline-none focus:ring-2 focus:ring-primary/50" placeholder="Image URL..." />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 rounded-xl font-medium hover:bg-muted transition-colors">Cancel</button>
                  <button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-xl font-bold shadow-lg transition-transform active:scale-95">Deploy Batch</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
