import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import '../../styles/animations.css';
import '../../styles/breathe.css';
import { Bot, Brain, Cpu, TrendingUp, Zap } from 'lucide-react';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Section animations
  const sectionScale = useTransform(scrollYProgress,
    [0, 0.5],
    [1, 0.85]
  );

  const sectionOpacity = useTransform(scrollYProgress,
    [0, 0.5],
    [1, 0]
  );

  const sectionY = useTransform(scrollYProgress,
    [0, 0.5],
    ["0%", "5%"]
  );

  // Text animations
  const x1 = useTransform(scrollYProgress, 
    [0, 0.2, 0.4], 
    ["0%", "-10%", "-25%"]
  );
  const x2 = useTransform(scrollYProgress, 
    [0, 0.2, 0.4], 
    ["0%", "10%", "25%"]
  );

  // Background animations
  const bgScale = useTransform(scrollYProgress,
    [0, 0.5],
    [1, 1.1]
  );

  const bgOpacity = useTransform(scrollYProgress,
    [0, 0.5],
    [1, 0.3]
  );

  // Initial animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  return (
    <motion.section 
      ref={sectionRef} 
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden font-sf-pro-display"
      style={{
        scale: sectionScale,
        opacity: sectionOpacity,
        y: sectionY
      }}
    >
      {/* Enhanced Background Effects */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.95), rgba(0,0,0,0.98))'
        }}
      >
        {/* Breathing circle background */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-white/2"
            style={{ filter: 'blur(80px)' }}
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 to-white/2"
            style={{ filter: 'blur(60px)', transform: 'rotate(45deg)' }}
          />
        </motion.div>

        {/* Glowing gradient background */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />

        {/* Floating orbs with reduced opacity */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-500 rounded-full"
              initial={{
                opacity: 0.1,
                scale: Math.random() * 0.5 + 0.5,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                ],
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                ],
                opacity: [0.1, 0.15, 0.1],
                scale: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                filter: 'blur(1px)',
              }}
            />
          ))}
        </div>

        {/* Animated particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-white/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: '0 0 8px 1px rgba(255,255,255,0.2)',
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, Math.random() * 80 - 40, 0],
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-300/40 rounded-full"
              animate={{
                y: [Math.random() * 1000, -10],
                opacity: [0, 1, 0],
                scale: [0, 2, 0]
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
                top: `${Math.random() * 100}%`,
                filter: 'blur(0.5px)'
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
        className="absolute right-10 top-1/3 text-yellow-500/20"
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
        <Brain className="w-16 h-16" />
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
        <Cpu className="w-12 h-12" />
      </motion.div>

      <motion.div
        className="absolute right-1/4 top-1/2 text-green-500/20"
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
        <TrendingUp className="w-12 h-12" />
      </motion.div>

      <motion.div
        className="absolute left-1/3 top-1/4 text-red-500/20"
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
        <Zap className="w-10 h-10" />
      </motion.div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 flex flex-col justify-center items-center text-center min-h-screen">
        {/* Text Animation Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-5xl"
        >
          {/* Title text with consistent gradients */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 md:mb-12 relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 relative"
            >
              {/* Breathing glowing ball behind text */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <motion.div
                  className="w-[200px] sm:w-[500px] md:w-[600px] h-[60px] sm:h-[100px] md:h-[120px] rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    background: 'radial-gradient(circle at center, rgba(139,92,246,0.3) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                />
              </motion.div>

              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: [1, 1.03, 1],
                }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 0.3 },
                  scale: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light relative z-10 whitespace-nowrap"
                style={{
                  background: 'linear-gradient(to right, #FFFFFF 20%, #8B5CF6 50%, #FFFFFF 80%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shine 8s linear infinite',
                }}
              >
                GREAT&nbsp;TO
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: [1, 1.03, 1],
                }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 0.6 },
                  scale: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2
                  }
                }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold"
                style={{
                  background: 'linear-gradient(to right, #FFFFFF 20%, #8B5CF6 50%, #FFFFFF 80%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shine 8s linear infinite',
                }}
              >
                GREATEST
              </motion.span>
            </motion.div>
          </motion.h1>

          {/* Description with tech animation */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 md:mb-12"
            style={{
              textShadow: '0 0 20px rgba(255,255,255,0.2)',
            }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="relative z-10"
            >
              <TypeAnimation
                sequence={[
                  'Transforming visions into reality',
                  1000,
                  'Pioneering AI solutions',
                  1000,
                  'Building tomorrow\'s technology',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                style={{ color: 'rgba(255,255,255,0.8)' }}
                repeat={Infinity}
              />
            </motion.span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center"
          >
            {/* First Button - See how AI works */}
            <Link to="/contact">
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={{
                  hover: { scale: 1.05 },
                  tap: { scale: 0.95 }
                }}
                className="group relative rounded-full"
              >
                {/* Button Container */}
                <div className="relative px-8 py-4 rounded-full">
                  {/* Outer Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-fuchsia-500/30 to-purple-600/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                  
                  {/* Moving Particles Background */}
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-purple-400 rounded-full"
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
                          opacity: [0, 1, 0]
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

                  {/* Main Button Background */}
                  <div className="absolute inset-0 bg-black border border-purple-500/50 group-hover:border-purple-400 rounded-full" />
                  
                  {/* Animated Border Lines */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                      animate={{
                        x: [-100, 100, -100],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent"
                      animate={{
                        x: [100, -100, 100],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </div>

                  {/* Button Content */}
                  <div className="relative flex items-center gap-3">
                    <div className="relative">
                      <span className="text-base sm:text-lg font-medium bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                        See how AI works
                      </span>
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                        animate={{
                          scaleX: [0, 1, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                    <motion.div
                      animate={{
                        x: [0, 5, 0],
                        y: [0, -2, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 group-hover:text-white transition-colors duration-300" />
                    </motion.div>
                  </div>
                </div>
              </motion.button>
            </Link>

            {/* Second Button - Explore Services */}
            <Link to="/services">
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={{
                  hover: { scale: 1.05 },
                  tap: { scale: 0.95 }
                }}
                className="group relative rounded-full"
              >
                {/* Button Container */}
                <div className="relative px-8 py-4">
                  {/* Outer Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-fuchsia-500/30 to-purple-600/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                  
                  {/* Moving Particles Background */}
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-purple-400 rounded-full"
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
                          opacity: [0, 1, 0]
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

                  {/* Main Button Background */}
                  <div className="absolute inset-0 bg-black border border-purple-500/50 group-hover:border-purple-400 rounded-full" />
                  
                  {/* Animated Border Lines */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                      animate={{
                        x: [-100, 100, -100],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent"
                      animate={{
                        x: [100, -100, 100],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </div>

                  {/* Button Content */}
                  <div className="relative flex items-center gap-3">
                    <div className="relative">
                      <span className="text-base sm:text-lg font-medium bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                        Explore Services
                      </span>
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                        animate={{
                          scaleX: [0, 1, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                    <motion.div
                      animate={{
                        x: [0, 5, 0],
                        y: [0, -2, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 group-hover:text-white transition-colors duration-300" />
                    </motion.div>
                  </div>
                </div>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
