import { motion, useInView } from 'framer-motion';
import { ArrowRight, Bot, MessageSquare } from 'lucide-react';
import { useRef } from 'react';

export const ServiceCTA = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black">
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-300/20 rounded-full"
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

      <div className="relative container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          // initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-8"
            // initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="inline-block bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 text-transparent bg-clip-text animate-gradient">
              Ready to Transform
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text animate-gradient">
              Your Business?
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-400 mb-12 leading-relaxed"
            // initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Experience the power of AI-driven solutions. Start your journey with us today.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            //initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white font-semibold text-lg hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-xl hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
              <motion.div
                className="relative"
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/50 to-cyan-600/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.a>

            <motion.a
              href="/demo"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-blue-500/30 rounded-full text-blue-300 font-semibold text-lg hover:bg-blue-500/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Demo
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Bot className="w-5 h-5" />
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Floating icons */}
        <motion.div
          className="absolute left-10 top-1/3 text-blue-500/20"
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
          className="absolute right-10 top-2/3 text-cyan-500/20"
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
          <MessageSquare className="w-16 h-16" />
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
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
