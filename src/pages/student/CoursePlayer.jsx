import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { CheckCircle2, ChevronLeft, Loader2, PlayCircle, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CoursePlayer() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({ course: null, completedLessonIds: [] });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');
  const [activeLessonId, setActiveLessonId] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/student/player/${id}`, { headers: { 'x-user-email': currentUser.email } })
      .then(res => {
        setData(res.data);
        if(res.data.course?.lessons?.length > 0) {
           setActiveLessonId(res.data.course.lessons[0].id);
        }
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id, currentUser]);

  const handleMarkComplete = async (lessonId) => {
    try {
      await axios.post('http://localhost:5000/api/student/progress', { lessonId }, { headers: { 'x-user-email': currentUser.email } });
      setData(prev => ({ ...prev, completedLessonIds: [...prev.completedLessonIds, lessonId] }));
      
      setToast("Aaj productive ho gaye lagta hai 😎 🚀");
      setTimeout(() => setToast(''), 3000);
      
      // Auto advance to next lesson if available
      const currentIndex = data.course.lessons.findIndex(l => l.id === lessonId);
      if(currentIndex !== -1 && currentIndex + 1 < data.course.lessons.length) {
         setActiveLessonId(data.course.lessons[currentIndex + 1].id);
      }
    } catch(err) { console.error(err); }
  };

  if (loading) {
     return <div className="h-[50vh] flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;
  }

  if (!data.course) return <div className="text-center p-12 glass-card rounded-3xl font-bold text-red-500">Course not found.</div>;

  const currentLesson = data.course.lessons.find(l => l.id === activeLessonId) || data.course.lessons[0];
  const videoId = currentLesson?.videoUrl?.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i)?.[1] || "dQw4w9WgXcQ";

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ y:-50, opacity:0 }} animate={{ y:0, opacity:1 }} exit={{ y:-50, opacity:0 }} className="fixed top-20 right-6 z-50 glass-card bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400 font-bold px-6 py-3 rounded-full shadow-2xl flex items-center gap-2">
             <CheckCircle2 className="w-5 h-5"/> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => navigate('/student')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium transition-colors">
        <ChevronLeft className="w-5 h-5" /> Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Video Player */}
         <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
               {currentLesson ? (
                 <motion.div key={currentLesson.id} initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="glass-card rounded-3xl overflow-hidden border shadow-xl bg-black aspect-video relative">
                    <iframe 
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                 </motion.div>
               ) : (
                 <div className="glass-card rounded-3xl border shadow-xl bg-muted aspect-video flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                    <Lock className="w-12 h-12 mb-4 opacity-50" />
                    <h3 className="text-xl font-bold">No Modules Available</h3>
                    <p>The Admin has not published any specific modules for this batch yet.</p>
                 </div>
               )}
            </AnimatePresence>

            {currentLesson && (
               <div className="glass-card p-6 md:p-8 rounded-3xl border shadow-sm flex flex-col space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h1 className="text-xl md:text-2xl font-black text-primary">{currentLesson.title}</h1>
                    <button 
                      onClick={() => handleMarkComplete(currentLesson.id)}
                      disabled={data.completedLessonIds.includes(currentLesson.id)}
                      className={`px-6 py-3 rounded-xl font-bold shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 shrink-0 ${
                        data.completedLessonIds.includes(currentLesson.id) 
                          ? 'bg-green-500/20 text-green-600 border border-green-500/30 cursor-not-allowed'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                      }`}
                    >
                      {data.completedLessonIds.includes(currentLesson.id) ? (
                        <><CheckCircle2 className="w-5 h-5"/> Completed ✅</>
                      ) : 'Mark as Completed ✅'}
                    </button>
                  </div>
                  <h2 className="font-bold text-lg text-foreground border-t pt-4">Batch Details: {data.course.title}</h2>
                  <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-muted-foreground">
                     {currentLesson.content || data.course.description}
                  </div>
               </div>
            )}
         </div>

         {/* Sidebar Curriculum */}
         <div className="space-y-4">
            <h3 className="font-bold text-xl px-2">Batch Modules</h3>
            <div className="glass-card rounded-2xl border p-2 flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
               {data.course.lessons?.map((lesson, idx) => {
                 const isCompleted = data.completedLessonIds.includes(lesson.id);
                 const isActive = lesson.id === activeLessonId;
                 
                 return (
                   <div 
                     key={lesson.id} 
                     onClick={() => setActiveLessonId(lesson.id)}
                     className={`p-4 rounded-xl flex items-center gap-4 transition-all cursor-pointer ${isActive ? 'bg-primary/10 border border-primary/20 shadow-sm' : 'hover:bg-muted border border-transparent'}`}
                   >
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${
                          isActive && !isCompleted ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/30' : 
                          isCompleted ? 'bg-green-500/20 border-green-500 text-green-500' : 
                          'bg-background border-muted-foreground/30 text-muted-foreground'
                        }`}>
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                     </div>
                     <div>
                       <p className={`font-bold text-sm leading-tight mb-1 line-clamp-2 ${isActive ? 'text-primary' : 'text-foreground'}`}>Mo. {idx+1}: {lesson.title}</p>
                       <p className="text-xs text-muted-foreground">{lesson.duration || 0} mins</p>
                     </div>
                   </div>
                 )
               })}
               {data.course.lessons.length === 0 && (
                 <p className="p-4 text-sm text-muted-foreground text-center">Batch is currently empty.</p>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}
