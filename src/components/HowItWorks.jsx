import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Cpu, Briefcase } from 'lucide-react';

const steps = [
  {
    icon: <UserPlus className="w-8 h-8 text-primary" />,
    title: 'Sign Up & Assess',
    description: 'Create your account and take a quick AI assessment to determine your skill level.',
  },
  {
    icon: <Cpu className="w-8 h-8 text-purple-500" />,
    title: 'Learn with AI',
    description: 'Follow your personalized curriculum, code in browser, and get 24/7 AI mentoring.',
  },
  {
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    title: 'Build & Get Hired',
    description: 'Complete real-world projects, earn your certificate, and start interviewing.',
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">How It Works</h2>
          <p className="text-lg text-muted-foreground">Your journey from beginner to hired professional, powered by AI.</p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 -translate-y-1/2 z-0"></div>

          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.3, duration: 0.6 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center border shadow-xl mb-6 relative">
                  {step.icon}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center shadow-lg border-2 border-background">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
