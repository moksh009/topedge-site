import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { GlowingOrbs } from '../ui/GlowingOrbs';

interface StatItemProps {
  number: string;
  label: string;
  delay: number;
}

const StatItem = ({ number, label, delay }: StatItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay }}
      className="relative group"
    >
      {/* Enhanced glass effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl group-hover:from-white/15 group-hover:to-white/10 transition-all duration-500" />
      
      {/* Main content container */}
      <div className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 hover:border-purple-500/50 transition-all duration-300 flex flex-col items-center sm:items-start">
        {/* Number with enhanced animation */}
        <motion.div 
          className="flex items-center justify-center sm:justify-start w-full"
          initial={{ scale: 0.5 }}
          animate={isInView ? { scale: 1 } : { scale: 0.5 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            delay: delay + 0.2
          }}
        >
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-white to-purple-400 bg-clip-text text-transparent">
            {number}
          </h3>
        </motion.div>

        {/* Label with enhanced styling */}
        <motion.p 
          className="text-base sm:text-lg md:text-xl text-gray-300 mt-2 sm:mt-3 text-center sm:text-left font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ 
            duration: 0.5,
            delay: delay + 0.4
          }}
        >
          {label}
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: delay + 0.6 }}
        />
      </div>
    </motion.div>
  );
};

export const StatsSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return (
    <motion.section
      ref={containerRef}
      className="relative bg-black py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
      style={{ opacity, scale }}
    >
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Impact By The Numbers
            </h2>
          </div>
          
          {/* Subtle accent line */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600" />
        </div>

        

        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        {/* Stats grid with improved responsive layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.6,
            delay: 0.2,
            ease: "easeOut"
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10"
        >
          <StatItem 
            number="500+" 
            label="Projects Completed"
            delay={0}
          />
          <StatItem 
            number="95%" 
            label="Client Satisfaction"
            delay={0.2}
          />
          <StatItem 
            number="24/7" 
            label="Support Available"
            delay={0.4}
          />
          <StatItem 
            number="50+" 
            label="Team Members"
            delay={0.6}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default StatsSection;
