import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, LineChart, Award, Users, Zap } from 'lucide-react';

const features = [
  {
    icon: <Brain className="w-6 h-6 text-primary" />,
    title: 'AI-Powered Paths',
    description: 'Personalized curriculums that adapt to your learning speed and style dynamically.',
    color: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: <Code className="w-6 h-6 text-purple-500" />,
    title: 'Real-World Projects',
    description: 'Build production-ready applications that you can showcase in your portfolio.',
    color: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    icon: <LineChart className="w-6 h-6 text-green-500" />,
    title: 'Progress Tracking',
    description: 'Detailed analytics on your performance, strengths, and areas for improvement.',
    color: 'bg-green-500/10 border-green-500/20',
  },
  {
    icon: <Award className="w-6 h-6 text-yellow-500" />,
    title: 'Certification System',
    description: 'Earn industry-recognized certificates upon completion of major learning paths.',
    color: 'bg-yellow-500/10 border-yellow-500/20',
  },
  {
    icon: <Users className="w-6 h-6 text-pink-500" />,
    title: 'Community Support',
    description: 'Join thousands of learners, mentors, and experts in our exclusive community.',
    color: 'bg-pink-500/10 border-pink-500/20',
  },
  {
    icon: <Zap className="w-6 h-6 text-orange-500" />,
    title: 'Instant AI Feedback',
    description: 'Get code reviews and explanations instantly from our embedded AI assistant.',
    color: 'bg-orange-500/10 border-orange-500/20',
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Why learn with Techie LMS?
          </h2>
          <p className="text-lg text-muted-foreground">
            We combine cutting-edge AI with modern pedagogical methods to ensure you master skills faster and retain them longer.
          </p>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card border p-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:border-primary/30"
            >
              <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center border ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
