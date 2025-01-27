import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';

const teamMembers = [
  {
    name: 'John Doe',
    role: 'CEO & Founder',
    image: '/team/john.jpg',
    bio: 'Visionary leader with 15+ years in AI and technology innovation.'
  },
  {
    name: 'Jane Smith',
    role: 'CTO',
    image: '/team/jane.jpg',
    bio: 'AI researcher and tech pioneer with multiple patents.'
  },
  // Add more team members as needed
];

const AboutTeam: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isInView = useInView(containerRef, { 
    once: false, 
    amount: 0.2,
    margin: "-10% 0px -10% 0px"
  });

  // Title animation
  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };

  // Smooth spring animations
  const opacity = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.1, 0.4, 0.9, 1],
      [0, 1, 1, 1, 0]
    ),
    { stiffness: 100, damping: 30 }
  );

  const scale = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.2, 0.4, 0.8, 1],
      [0.98, 1, 1, 1, 0.98]
    ),
    { stiffness: 100, damping: 30 }
  );

  // Card animation variants with smoother transitions
  const cardVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      y: 20,
      scale: 0.98,
      transition: {
        duration: 0.3,
        delay: i * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        delay: i * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen bg-black overflow-hidden py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ 
        opacity,
        scale
      }}
    >
      {/* Background Effects */}
      <motion.div 
        className="absolute inset-0"
        style={{
          opacity: useSpring(
            useTransform(
              scrollYProgress,
              [0, 0.1, 0.4, 0.9, 1],
              [0.3, 1, 1, 1, 0.3]
            ),
            { stiffness: 100, damping: 30 }
          )
        }}
      >
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(120, 120, 120, 0.05) 0%, transparent 60%)',
            }}
          />
          
          {/* Animated grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
            <defs>
              <pattern id="team-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#team-grid)" />
          </svg>

          {/* Animated particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
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
        </div>
      </motion.div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Team
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Meet the passionate individuals behind our success
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="relative group"
              style={{
                y: useSpring(
                  useTransform(
                    scrollYProgress,
                    [0, 0.2, 0.4, 0.8, 1],
                    [30, 0, 0, 0, 30]
                  ),
                  { stiffness: 100, damping: 30 }
                )
              }}
            >
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-black/40 to-black/20 rounded-3xl p-8 border border-white/[0.08] overflow-hidden">
                {/* Hover Effects */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  animate={{
                    background: [
                      "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                      "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                    ],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                  }}
                  animate={{
                    x: ["100%", "-100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-white/10">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <motion.h3
                    className="text-2xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    {member.name}
                  </motion.h3>
                  <motion.p
                    className="text-lg text-white/40 mb-4"
                    whileHover={{ color: "rgba(255,255,255,0.6)", transition: { duration: 0.2 } }}
                  >
                    {member.role}
                  </motion.p>
                  <motion.p
                    className="text-base text-white/60 font-light"
                    style={{ fontFamily: "SF Pro Text, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    {member.bio}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AboutTeam;
