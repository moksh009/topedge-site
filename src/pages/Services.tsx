import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Database, Bot, Cpu, Brain, Sparkles, MessageSquare } from 'lucide-react';
import { ServiceProcess } from '../components/sections/services/ServiceProcess';
import ChatbotShowcase from '../components/sections/services/ChatbotShowcase';
import { AIAgentInteraction } from '../components/sections/services/AIAgentInteraction';
import { ServiceCTA } from '../components/sections/services/ServiceCTA';
import { ChatbotProcess } from '../components/sections/services/ChatbotProcess';

const Services: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef);

  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative h-screen flex items-center justify-center overflow-hidden" 
        ref={containerRef}
        style={{
          marginTop: '0px', // This will offset the navbar height
          paddingTop: '64px'  // This ensures content is below navbar
        }}
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900/20 to-black">
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-purple-300/20 rounded-full"
                animate={{
                  y: [Math.random() * 1000, -10],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                  delay: Math.random() * 2
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating icons */}
        <motion.div
          className="absolute left-10 top-1/4 text-purple-500/20"
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 360],
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <Bot className="w-16 h-16" />
        </motion.div>

        <motion.div
          className="absolute right-10 top-1/3 text-fuchsia-500/20"
          animate={{
            y: [20, -20, 20],
            rotate: [360, 0],
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <Cpu className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute middle top-1/4 text-yellow-500/20"
          animate={{
            y: [20, -20, 20],
            rotate: [360, 0],
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <Database className="w-16 h-16" />
        </motion.div>

        <motion.div
          className="absolute left-1/4 bottom-1/4 text-blue-500/20"
          animate={{
            y: [-30, 30, -30],
            x: [-20, 20, -20],
            rotate: [0, -360],
          }}
          transition={{
            y: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            x: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <Brain className="w-12 h-12" />
        </motion.div>

        <motion.div
          className="absolute right-1/4 top-1/3 text-purple-500/20"
          animate={{
            y: [20, -20, 20],
            x: [20, -20, 20],
            rotate: [360, 0],
          }}
          transition={{
            y: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            },
            x: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <MessageSquare className="w-12 h-12" />
        </motion.div>

        <motion.div
          className="absolute left-1/3 top-1/4 text-fuchsia-500/20"
          animate={{
            y: [-25, 25, -25],
            x: [-15, 15, -15],
            rotate: [180, -180],
          }}
          transition={{
            y: {
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            },
            x: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <Sparkles className="w-10 h-10" />
        </motion.div>

        {/* Content */}
        <motion.div 
          variants={itemVariants}
          className="relative container mx-auto px-4"
        >
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              <motion.h1 
                variants={itemVariants}
                className="text-9xl md:text-10xl font-bold tracking-tight mb-8"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white animate-gradient-x">
                  Our Services
                </span>
              </motion.h1>
              
              <motion.div 
                variants={itemVariants}
                className="space-y-4 mb-12"
              >
                <motion.h2 
                  variants={itemVariants}
                  className="text-4xl md:text-5xl font-bold tracking-tight"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-white">
                    Empowering Your Business
                  </span>
                </motion.h2>
                
                <motion.p 
                  variants={itemVariants}
                  className="text-2xl md:text-3xl text-white/90 font-light"
                >
                  with cutting-edge AI solutions
                </motion.p>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(168, 85, 247, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                  onClick={() => {
                    const element = document.getElementById('ai-agent-interaction');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
                  <div className="relative flex items-center gap-2 px-8 py-4 bg-black rounded-xl leading-none">
                    <Bot className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
                    <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-blue-200">
                      AI Caller
                    </span>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(168, 85, 247, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                  onClick={() => {
                    const element = document.getElementById('chatbot-showcase');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
                  <div className="relative flex items-center gap-2 px-8 py-4 bg-black rounded-xl leading-none">
                    <MessageSquare className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
                      Chatbot
                    </span>
                  </div>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Rest of the sections */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ServiceProcess />
        <AIAgentInteraction />
        <ChatbotShowcase />
        <ChatbotProcess/>
        <ServiceCTA />
      </motion.div>
    </div>
  );
};

export default Services;
