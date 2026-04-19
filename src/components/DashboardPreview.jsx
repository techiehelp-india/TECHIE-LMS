import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function DashboardPreview() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={targetRef} className="py-24 relative overflow-hidden bg-muted/30 perspective-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">A Dashboard You'll Love</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to succeed, all in one beautifully designed, distraction-free interface.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative flex justify-center perspective-[2000px]">
        <motion.div 
          style={{ y, rotateX, scale }}
          className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl glass-card border border-white/20 overflow-hidden shadow-2xl relative"
        >
          {/* Header */}
          <div className="h-12 border-b border-border bg-background/50 flex items-center px-6 justify-between backdrop-blur-md">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="h-6 w-48 bg-muted rounded animate-pulse"></div>
            <div className="w-8 h-8 rounded-full bg-primary/20"></div>
          </div>

          {/* Body */}
          <div className="flex h-[calc(100%-3rem)]">
            {/* Sidebar */}
            <div className="w-64 border-r border-border p-6 flex flex-col gap-4 hidden md:flex">
              <div className="h-10 border border-primary/20 bg-primary/10 rounded-xl mb-4"></div>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-8 bg-muted rounded-lg flex items-center px-3">
                  <div className="w-4 h-4 rounded-full bg-foreground/10 mr-3"></div>
                  <div className="h-2 w-1/2 bg-foreground/10 rounded"></div>
                </div>
              ))}
            </div>
            {/* Main Content */}
            <div className="flex-1 p-8 grid grid-rows-[auto,1fr] gap-8 bg-background/20">
              <div className="grid grid-cols-3 gap-6">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="h-32 rounded-xl bg-card border border-border shadow-sm p-4 flex flex-col justify-between">
                     <div className="w-10 h-10 rounded-full bg-primary/10"></div>
                     <div>
                       <div className="h-3 w-1/3 bg-muted mb-2 rounded"></div>
                       <div className="h-6 w-1/2 bg-primary/20 rounded"></div>
                     </div>
                   </div>
                 ))}
              </div>
              <div className="rounded-xl border border-border bg-card shadow-sm p-6 flex gap-8">
                 <div className="flex-1 flex flex-col justify-end gap-2 pr-8 border-r border-border">
                    {[40, 70, 45, 90, 65, 100].map((h, i) => (
                      <div key={i} className="w-full bg-primary/20 rounded-r-md flex items-center pr-2" style={{ height: '14%', width: `${h}%` }}>
                         <div className="w-full h-1/2 bg-primary/40 rounded-r-sm"></div>
                      </div>
                    ))}
                 </div>
                 <div className="w-1/3 flex flex-col gap-4">
                    <div className="h-4 w-1/2 bg-muted rounded"></div>
                    <div className="w-full aspect-square rounded-full border-8 border-primary/20 flex items-center justify-center border-t-primary">
                       <span className="text-3xl font-bold text-primary">78%</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
