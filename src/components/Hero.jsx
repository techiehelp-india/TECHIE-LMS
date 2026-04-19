import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none -z-10">
        <div className="w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-blob mix-blend-multiply dark:mix-blend-lighten absolute top-[-200px] left-[-100px]"></div>
        <div className="w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] animate-blob mix-blend-multiply dark:mix-blend-lighten absolute top-[50px] right-[-100px]" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              New: AI-Driven Learning Paths
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Build Your Future with <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 dark:to-purple-400">
                AI-Powered Learning
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8">
              Learn faster, smarter, and get job-ready with real-world projects, personalized curriculum, and 24/7 AI mentorship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-xl shadow-primary/30 flex items-center justify-center gap-2">
                Start Learning <ArrowRight className="w-5 h-5" />
              </button>
              <button className="glass-card hover:bg-white/90 dark:hover:bg-slate-800/90 px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5 text-primary" /> Explore Courses
              </button>
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
             className="relative lg:h-[600px] flex items-center justify-center"
          >
             {/* Mock Dashboard UI floating */}
             <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl glass-card border flex flex-col shadow-2xl">
                <div className="h-10 border-b border-border flex items-center px-4 gap-2 bg-muted/50 rounded-t-2xl">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col gap-5 bg-background/50 rounded-b-2xl">
                    <div className="h-8 w-1/3 bg-muted rounded-lg"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-primary/10 rounded-xl border border-primary/20 flex flex-col justify-center px-4">
                         <div className="h-4 w-1/2 bg-primary/30 rounded mb-2"></div>
                         <div className="h-6 w-3/4 bg-primary/20 rounded"></div>
                      </div>
                      <div className="h-24 bg-purple-500/10 rounded-xl border border-purple-500/20 flex flex-col justify-center px-4">
                         <div className="h-4 w-1/2 bg-purple-500/30 rounded mb-2"></div>
                         <div className="h-6 w-3/4 bg-purple-500/20 rounded"></div>
                      </div>
                    </div>
                    <div className="flex-1 w-full bg-muted rounded-xl relative overflow-hidden flex items-end p-4">
                      <div className="w-full flex items-end gap-2 h-full opacity-50">
                         <div className="w-1/6 bg-primary/40 rounded-t h-[40%]"></div>
                         <div className="w-1/6 bg-primary/60 rounded-t h-[60%]"></div>
                         <div className="w-1/6 bg-primary/80 rounded-t h-[80%]"></div>
                         <div className="w-1/6 bg-primary rounded-t h-[100%]"></div>
                         <div className="w-1/6 bg-primary/60 rounded-t h-[70%]"></div>
                         <div className="w-1/6 bg-primary/40 rounded-t h-[50%]"></div>
                      </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-8 top-12 glass-card border p-4 rounded-xl flex items-center gap-3 shadow-xl backdrop-blur-xl"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">A+</div>
                  <div>
                    <div className="text-sm font-bold">React Course</div>
                    <div className="text-xs text-muted-foreground">Successfully Completed</div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 10, 0] }} 
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -left-10 bottom-12 glass-card border p-4 rounded-xl flex items-center gap-3 shadow-xl backdrop-blur-xl"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">🤖</div>
                  <div>
                    <div className="text-sm font-bold">AI Tutor</div>
                    <div className="text-xs text-muted-foreground">Keep up the great work!</div>
                  </div>
                </motion.div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
