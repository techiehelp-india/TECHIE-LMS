import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    description: 'Perfect for beginners starting their AI journey.',
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: ['Access to 5 beginner paths', 'Basic AI Tutor support', 'Community access', 'Weekly assignments'],
    highlighted: false,
  },
  {
    name: 'Pro',
    description: 'Everything you need to land your first tech job.',
    monthlyPrice: 79,
    yearlyPrice: 790,
    features: ['All basic features', 'Unlimited learning paths', '24/7 Priority AI Tutor', 'Real-world projects', 'Career coaching', 'Verified certificate'],
    highlighted: true,
  },
  {
    name: 'Premium',
    description: 'For professionals aiming for senior roles.',
    monthlyPrice: 149,
    yearlyPrice: 1490,
    features: ['All Pro features', '1-on-1 human mentorship', 'Mock interviews', 'Resume reviews', 'Job placement assistance', 'Lifetime access'],
    highlighted: false,
  }
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Flexible Pricing</h2>
          <p className="text-lg text-muted-foreground mb-8">Invest in your career with a plan that suits your goals.</p>
          
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-16 h-8 rounded-full bg-primary/20 flex items-center p-1 cursor-pointer transition-colors"
            >
              <motion.div 
                layout
                initial={false}
                animate={{ x: isYearly ? 32 : 0 }}
                className="w-6 h-6 bg-primary rounded-full shadow-md"
              ></motion.div>
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-foreground' : 'text-muted-foreground'} flex items-center gap-2`}>
              Yearly <span className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs px-2 py-0.5 rounded-full">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative rounded-3xl p-8 border ${plan.highlighted ? 'glass-card border-primary/50 shadow-2xl shadow-primary/20 scale-100 md:scale-105 z-10' : 'bg-card/50 backdrop-blur scale-100'}`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 inset-x-0 flex justify-center -translate-y-1/2">
                  <span className="bg-gradient-to-r from-primary to-purple-500 text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-6 min-h-[40px]">{plan.description}</p>
              
              <div className="mb-8">
                <span className="text-4xl font-extrabold">${isYearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                <span className="text-muted-foreground">/{isYearly ? 'yr' : 'mo'}</span>
              </div>

              <button className={`w-full py-4 rounded-xl font-bold mb-8 transition-transform transform hover:scale-105 active:scale-95 ${plan.highlighted ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' : 'bg-muted text-foreground hover:bg-muted/80'}`}>
                Get Started
              </button>

              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check className={`w-5 h-5 shrink-0 ${plan.highlighted ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
