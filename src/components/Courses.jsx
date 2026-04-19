import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Star, ArrowRight } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Full-Stack React & Node.js',
    instructor: 'Alex Developer',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop',
    duration: '12 Weeks',
    students: '4.5k',
    rating: '4.9',
    progress: 0,
    tags: ['React', 'Node.js', 'MongoDB']
  },
  {
    id: 2,
    title: 'Advanced Machine Learning',
    instructor: 'Dr. Sarah Chen',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1000&auto=format&fit=crop',
    duration: '16 Weeks',
    students: '8.2k',
    rating: '4.8',
    progress: 45,
    tags: ['Python', 'AI', 'TensorFlow']
  },
  {
    id: 3,
    title: 'UI/UX Masterclass for SaaS',
    instructor: 'Jessica Design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop',
    duration: '8 Weeks',
    students: '3.1k',
    rating: '4.9',
    progress: 100,
    tags: ['Figma', 'UI/UX', 'Design']
  }
];

export default function Courses() {
  return (
    <section id="courses" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Featured Courses</h2>
            <p className="text-lg text-muted-foreground">Hand-crafted curriculums designed to get you hired.</p>
          </div>
          <button className="flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors">
            View All Courses <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div 
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="glass-card rounded-2xl overflow-hidden border flex flex-col group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none"></div>
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full z-20">
                  {course.tags[0]}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 font-medium">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> {course.duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4"/> {course.students}</span>
                  <span className="flex items-center gap-1 text-yellow-500"><Star className="w-4 h-4 fill-current"/> {course.rating}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">By {course.instructor}</p>

                <div className="mt-auto">
                  {course.progress > 0 ? (
                    <div>
                      <div className="flex justify-between text-xs mb-2 font-medium">
                        <span>{course.progress === 100 ? 'Completed' : 'In Progress'}</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${course.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={`h-full rounded-full ${course.progress === 100 ? 'bg-green-500' : 'bg-primary'}`}
                        ></motion.div>
                      </div>
                    </div>
                  ) : (
                    <button className="w-full py-3 rounded-xl border border-border font-medium hover:border-primary hover:bg-primary/5 transition-colors">
                      Enroll Details
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
