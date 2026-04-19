import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, BookOpen, ChevronRight, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch live curated batches from Prisma Public API
    axios.get('http://localhost:5000/api/public/courses')
      .then(res => {
         setCourses(res.data);
         setLoading(false);
      }).catch(err => {
         console.error(err);
         setLoading(false);
      });
  }, []);

  const handleEnrollmentClick = async (courseId) => {
    if(!currentUser) {
       alert("Welcome back, future billionaire 😎. Sign in to your account first to enroll!");
       return;
    }
    
    try {
      await axios.post('http://localhost:5000/api/student/enroll', { courseId }, { headers: { 'x-user-email': currentUser.email } });
      navigate('/student');
    } catch(err) {
      if(err.response?.status === 400) {
         navigate(`/student/course/${courseId}`); // Already enrolled
      } else {
         alert("Nice try 😏 but you're not an authorized student.");
      }
    }
  }

  return (
    <section id="courses" className="py-24 relative z-10 w-full overflow-hidden">
      <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 inline-block flex items-center justify-center gap-2">
              <Star className="w-4 h-4" /> Live Curriculums
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 mt-2">
              Featured Masterclass Batches
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
              Hand-crafted curriculums designed to get you hired.
            </p>
          </motion.div>
        </div>

        {loading ? (
           <div className="flex justify-center p-12"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>
        ) : courses.length === 0 ? (
           <div className="text-center p-12 text-muted-foreground font-medium border-2 border-dashed border-muted rounded-3xl">No batches available yet. Admins are creating them!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-3xl overflow-hidden border shadow-lg group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                <div className="aspect-video relative overflow-hidden bg-primary/10">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                  ) : (
                     <div className="w-full h-full bg-gradient-to-br from-purple-500 to-indigo-600"></div>
                  )}
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {course._count.lessons} Modules
                    </span>
                    <div className="flex gap-1 text-yellow-400 drop-shadow-md">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground mb-6 mt-auto">
                    <div className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-full border">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>Self-paced</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-full border">
                      <BookOpen className="w-4 h-4 text-purple-500" />
                      <span>{course._count.enrollments} Enrolled</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold relative overflow-hidden text-primary border">
                         {course.instructor?.profileImage ? <img src={course.instructor.profileImage} className="w-full h-full object-cover"/> : course.instructor?.name[0]}
                      </div>
                      <span className="text-sm font-bold text-foreground">{course.instructor?.name || 'Admin Master'}</span>
                    </div>
                    <span className="text-2xl font-black text-primary bg-primary/10 px-3 py-1 rounded-xl">
                      ${course.price}
                    </span>
                  </div>

                  <button onClick={() => handleEnrollmentClick(course.id)} className="mt-6 w-full py-4 rounded-xl font-bold transition-all bg-muted shadow-inner text-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-lg flex items-center justify-center gap-2 group/btn active:scale-95">
                    Enroll in Batch
                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
