import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Frontend Developer @ TechCorp',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    text: 'Techie LMS completely changed my career trajectory. The AI mentor helped me debug code at 2 AM when I was stuck!',
  },
  {
    name: 'Mark Ruff',
    role: 'Full Stack Engineer @ StartupX',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop',
    text: 'The curriculum is top-notch. It focuses on exactly what you need to pass interviews and build scalable apps.',
  },
  {
    name: 'Emily Chen',
    role: 'UI/UX Designer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop',
    text: 'I loved the project-based approach. By the end of the course, I had a portfolio that landed me my first job.',
  },
  {
    name: 'David Kim',
    role: 'Software Engineer @ BigTech',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    text: 'The progress tracking and analytics gave me exactly the motivation I needed. 10/10 would recommend.',
  },
  {
    name: 'Alex Costa',
    role: 'Independent Contractor',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    text: 'Worth every penny. The community is incredibly supportive, and the AI tools are honestly mind-blowing.',
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

      <div className="text-center mb-16 px-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Loved by Students</h2>
        <p className="text-lg text-muted-foreground">Join thousands of others who have transformed their careers.</p>
      </div>

      <div className="flex w-fit animate-[carousel_30s_linear_infinite] hover:[animation-play-state:paused] gap-6 px-4">
        {[...testimonials, ...testimonials].map((t, index) => (
          <div key={index} className="w-[350px] md:w-[450px] flex-shrink-0 glass-card rounded-2xl p-8 border">
            <div className="flex items-center gap-4 mb-6">
              <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-primary" />
              <div>
                <h4 className="font-bold text-lg">{t.name}</h4>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
            <p className="text-foreground/80 leading-relaxed">"{t.text}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}
