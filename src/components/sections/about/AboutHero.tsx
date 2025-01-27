import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, Users2, Lightbulb, Target, ArrowRight, Trophy } from 'lucide-react';
import { GlowingOrbs } from '../../ui/GlowingOrbs';

const AboutHero: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const isInView = useInView(containerRef, { 
    once: false, 
    amount: 0.5,
    margin: "-20% 0px -20% 0px"
  });

  // Enhanced scroll-based animations with better timing
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [1, 1, 0.95, 0.9]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [1, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 0, 30, 60]
  );

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 0, -2, -5]
  );

  // Smooth spring animation for blur effect
  const blurProgress = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.2, 0.8, 1],
      [0, 0, 2, 4]
    ),
    { stiffness: 300, damping: 30 }
  );

  // 3D text animation variants with smoother transitions
  const textReveal = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: 20,
      filter: "blur(5px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 100,
        duration: 0.8
      }
    }
  };

  const fadeIn = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2
      }
    }
  };

  const sectionRef = useRef(null);
  const isInViewSection = useInView(sectionRef, { once: true, margin: "-100px" });

  const opacityOrb = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scaleOrb = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const yOrb = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen bg-black overflow-hidden flex items-center perspective-1000"
      initial={{ opacity: 1, scale: 1 }}
      animate={isInView ? { 
        opacity: 1, 
        scale: 1,
        filter: "blur(0px)",
        y: 0
      } : { 
        opacity: 0.6, 
        scale: 0.95,
        filter: "blur(4px)",
        y: 30
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        scale,
        opacity,
        y,
        filter: blurProgress.get() > 0 ? `blur(${blurProgress.get()}px)` : undefined,
        rotateX: rotate
      }}
    >
      {/* Dynamic Background */}
      <motion.div 
        className="absolute inset-0"
        style={{
          opacity: useTransform(
            scrollYProgress,
            [0, 0.2, 0.8, 1],
            [1, 1, 0.8, 0.6]
          )
        }}
      >
        {/* Enhanced glowing orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <GlowingOrbs 
            count={5} 
            intensity="high" 
            color="rgba(139,92,246,0.5)" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-purple-900/10 backdrop-blur-sm" />
        </div>

        {/* Main gradient */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(120, 120, 120, 0.05) 0%, transparent 60%)',
            scale,
            rotate
          }}
        />
        
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              scale: useTransform(scrollYProgress, [0, 0.5], [1, 0.5])
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
            top: '10%',
            left: '20%',
            scale: useTransform(scrollYProgress, [0, 0.5], [1, 0.8]),
            opacity: useTransform(scrollYProgress, [0, 0.5], [0.6, 0])
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Animated grid */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.03 }}>
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>

        {/* Animated highlight lines */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.02) 50%, transparent 100%)',
            rotate: useTransform(scrollYProgress, [0, 1], [0, 360]),
            opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0])
          }}
        />
      </motion.div>

      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black">
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

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          style={{
            scale: useTransform(scrollYProgress, [0, 0.5], [1, 0.9]),
            opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]),
            y: useTransform(scrollYProgress, [0, 0.5], [0, 50])
          }}
        >
          {/* Pre-title */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
            }}
            className="mb-6"
          >
            <motion.span
              className="inline-block px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.1)",
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm text-white/60 font-light tracking-wide"
                style={{ fontFamily: "SF Pro Text, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                Welcome to TopEdge
              </span>
            </motion.span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="mb-8 perspective-1000"
            style={{
              scale: useTransform(scrollYProgress, [0, 0.3], [1, 0.95]),
              opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]),
              y: useTransform(scrollYProgress, [0, 0.3], [0, 30])
            }}
          >
            <motion.h1
              variants={textReveal}
              className="flex justify-center items-center text-6xl sm:text-7xl md:text-8xl font-semibold tracking-tight"
            >
              <motion.span 
                className="whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-slate-200 via-blue-200 to-slate-200"
                style={{
                  backgroundSize: '200% auto',
                  animation: 'shine 8s linear infinite',
                  textShadow: '0 0 40px rgba(148, 163, 184, 0.2)',
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                Innovating for Tomorrow
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Description */}
          <motion.div
            variants={fadeIn}
            className="max-w-3xl mx-auto mt-8 mb-16 text-center"
          >
            <motion.p 
              className="text-2xl md:text-3xl font-light leading-relaxed mb-16"
              style={{
                background: 'linear-gradient(to right, #E2E8F0, #93C5FD, #E2E8F0)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shine 12s linear infinite',
              }}
            >
              Pioneering AI solutions that transform businesses and empower innovation.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeIn}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link to="/contact">
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={{
                  hover: { scale: 1.05 },
                  tap: { scale: 0.95 }
                }}
                className="relative px-10 py-5 rounded-full overflow-hidden group"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-600 via-blue-600 to-slate-600" />
                
                {/* Animated particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      animate={{
                        x: [
                          Math.random() * 200,
                          Math.random() * -200,
                          Math.random() * 200
                        ],
                        y: [
                          Math.random() * 100,
                          Math.random() * -100,
                          Math.random() * 100
                        ],
                        scale: [0, 1.5, 0],
                        opacity: [0, 0.5, 0]
                      }}
                      transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                      }}
                    />
                  ))}
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>

                {/* Button content */}
                <div className="relative flex items-center gap-3 text-white font-medium text-lg">
                  <span className="group-hover:tracking-wider transition-all duration-300">Get Started</span>
                  <motion.div
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.button>
            </Link>

            <Link to="/about">
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={{
                  hover: { scale: 1.05 },
                  tap: { scale: 0.95 }
                }}
                className="relative px-10 py-5 rounded-full overflow-hidden group"
              >
                {/* Gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-600 via-blue-600 to-slate-600 rounded-full p-[2px]">
                  <div className="absolute inset-0 bg-black rounded-full" />
                </div>

                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-blue-700 to-slate-700 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                
                {/* Moving border line */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                    animate={{
                      x: [-100, 100, -100],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>

                {/* Button content */}
                <div className="relative flex items-center gap-3 text-white font-medium text-lg">
                  <span className="group-hover:tracking-wider transition-all duration-300">Learn More</span>
                  <motion.div
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-2 backdrop-blur-xl"
          >
            <motion.div
              animate={{
                y: [0, 16, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-1 rounded-full bg-white"
            />
          </motion.div>
        </motion.div>

        {/* Floating 3D Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* 3D Spheres */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64"
              style={{
                top: `${20 + i * 30}%`,
                left: `${20 + i * 25}%`,
                perspective: "1000px",
              }}
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-xl" />
              </div>
            </motion.div>
          ))}

          {/* Animated Lines */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-px w-32"
              style={{
                top: `${30 + i * 15}%`,
                left: i % 2 === 0 ? "5%" : "75%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                transformOrigin: i % 2 === 0 ? "left" : "right",
              }}
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Floating icons */}
        <motion.div
          className="absolute left-10 top-1/4 text-yellow-500/20"
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
          <Building2 className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute middle-10 top text-cyan-500/20"
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
          <Trophy className="w-16 h-16" />
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
          <Users2 className="w-16 h-16" />
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
          <Lightbulb className="w-12 h-12" />
        </motion.div>

        <motion.div
          className="absolute right-1/4 top-1/6 text-green-500/20"
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
          <Target className="w-12 h-12" />
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-slate-800/30 via-blue-800/30 to-slate-800/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-l from-slate-800/30 via-blue-800/30 to-slate-800/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.section>
  );
};

export default AboutHero;
