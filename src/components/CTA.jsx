import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border border-primary/20 shadow-2xl shadow-primary/20"
        >
          {/* Background glow effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[500px] bg-primary/30 blur-[100px] rounded-full pointer-events-none -z-10"></div>
          
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Ready to start your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">AI Learning Journey?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of developers leveling up their skills with the power of artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-primary/30 flex items-center gap-2">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-background/50 hover:bg-background text-foreground px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 border border-border flex items-center gap-2">
              Talk to Sales
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
