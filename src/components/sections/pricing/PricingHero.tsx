import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { ChevronRight, Coins, CreditCard, Gem, Crown, Wallet, Sparkles, Star } from 'lucide-react';
import { CyberButton } from '../../ui/CyberButton';

const PricingHero = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Use spring physics for smoother animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(smoothProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(smoothProgress, [0, 0.5, 0.8], [1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.98, 0.95]);

  // Background icons configuration with optimized animations
  const backgroundIcons = [
    { 
      Icon: Crown, 
      size: 96, 
      brightness: 0.4, 
      color: '#FFD700', 
      position: { top: '5%', left: '8%' }, 
      rotation: 15,
      delay: 0.2,
      floatRange: 30,
      duration: 8,
      scale: 1
    },
    { 
      Icon: Gem, 
      size: 84, 
      brightness: 0.5, 
      color: '#9F7AEA', 
      position: { top: '15%', right: '12%' }, 
      rotation: -20,
      delay: 0.3,
      floatRange: 25,
      duration: 7.5,
      scale: 0.9
    },
    { 
      Icon: Coins, 
      size: 64, 
      brightness: 0.95, 
      color: '#F6E05E', 
      position: { bottom: '30%', left: '20%' }, 
      rotation: 25,
      delay: 0.4,
      floatRange: 20,
      duration: 7,
      scale: 1
    },
    { 
      Icon: Wallet, 
      size: 48, 
      brightness: 0.85, 
      color: '#B794F4', 
      position: { bottom: '20%', right: '25%' }, 
      rotation: -15,
      delay: 0.5,
      floatRange: 15,
      duration: 6.5,
      scale: 1
    },
    { 
      Icon: Crown, 
      size: 60, 
      brightness: 0.8, 
      color: '#FBD38D', 
      position: { top: '60%', left: '15%' }, 
      rotation: 30,
      delay: 0.6,
      floatRange: 20,
      duration: 7.5,
      scale: 1
    }
  ];

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ opacity, scale }}
    >
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        style={{
          background: 'radial-gradient(circle at center, rgba(139,92,246,0.2) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(80px)',
        }}
      >
        <motion.div
          className="absolute inset-0"
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
      </motion.div>

      <motion.div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        style={{
          background: 'radial-gradient(circle at center, rgba(91,33,182,0.2) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(60px)',
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>

      {/* Animated grid background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(139,92,246,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139,92,246,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
        }}
      />

      {/* Floating sparkles */}
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

      {/* Background Icons with enhanced animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {backgroundIcons.map((item, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              ...item.position,
              zIndex: 10 - i,
            }}
            initial={{ 
              opacity: 0, 
              scale: 0,
              y: 50,
              rotate: item.rotation - 10,
            }}
            animate={{ 
              opacity: item.brightness,
              scale: item.scale,
              y: 0,
              rotate: item.rotation,
            }}
            transition={{
              duration: 1.2,
              delay: item.delay,
              ease: "easeOut",
            }}
          >
            <motion.div
              animate={{
                y: [-item.floatRange/2, item.floatRange/2, -item.floatRange/2],
                rotate: [item.rotation - 5, item.rotation + 5, item.rotation - 5],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
              style={{
                filter: `brightness(${item.brightness}) drop-shadow(0 0 30px ${item.color}40)`,
              }}
            >
              <item.Icon 
                style={{ 
                  width: item.size,
                  height: item.size,
                  color: item.color,
                }}
              />
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background: `radial-gradient(circle at center, ${item.color}20 0%, transparent 70%)`,
                  filter: 'blur(10px)',
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading with enhanced animation */}
        <motion.div
          className="relative inline-block mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.h1 
            className="text-6xl md:text-7xl font-bold leading-tight relative z-10"
            style={{ y, opacity }}
          >
            <motion.span 
              className="inline-block bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: '200% auto',
              }}
            >
              Pricing Plans
            </motion.span>
            <br />
            <motion.span
              className="inline-block bg-gradient-to-r from-purple-400 via-yellow-200 to-white bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: '200% auto',
              }}
            >
              for Every Business
            </motion.span>
          </motion.h1>
          
          {/* Animated underline */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              width: ['60%', '80%', '60%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              filter: 'blur(2px)',
            }}
          />
        </motion.div>

        <motion.p 
          className="text-gray-300 text-xl max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ y, opacity }}
        >
          <motion.span
            animate={{
              color: ['rgb(209,213,219)', 'rgb(243,244,246)', 'rgb(209,213,219)'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Transform your business with our AI-powered solutions. 
            Choose the perfect plan that scales with your needs.
          </motion.span>
        </motion.p>

        {/* CTA Buttons with enhanced animations */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {/* View Plans Button */}
          <motion.button
            className="group relative rounded-full px-8 py-4 bg-purple-600 text-white font-semibold text-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/pricing')}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                opacity: 0.5,
              }}
            />
            <motion.div
              className="relative z-10 flex items-center gap-2"
              animate={{
                x: [0, 5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              View Plans
              <ChevronRight className="w-5 h-5" />
            </motion.div>
          </motion.button>

          {/* Contact Sales Button */}
          <motion.button
            className="group relative rounded-full px-8 py-4 bg-transparent text-white font-semibold text-lg border border-purple-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contact')}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-500/10 to-purple-600/0"
              animate={{
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="relative z-10">Contact Sales</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PricingHero;
