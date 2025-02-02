import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

interface ValueCardProps {
  title: string;
  description: string;
  index: number;
}

const ValueCard: React.FC<ValueCardProps> = ({ title, description, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, margin: "-100px" });

  const variants = {
    hidden: { 
      opacity: 0,
      x: index % 2 === 0 ? -100 : 100,
      rotateY: index % 2 === 0 ? -45 : 45
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.2
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative"
    >
      <div className="relative p-1">
        {/* Card */}
        <div className="relative backdrop-blur-xl bg-gradient-to-br from-black/40 to-black/20 rounded-3xl p-8 border border-white/[0.08] overflow-hidden group">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-transparent" />
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
                backgroundSize: '100px 100px',
                backgroundRepeat: 'repeat',
                transform: 'rotate(30deg)'
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              className="mb-6"
            >
              <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
                {title}
              </h3>
              <div className="h-0.5 w-16 bg-gradient-to-r from-white/40 to-transparent rounded-full mt-3 
                transform origin-left transition-all duration-300 group-hover:w-24 group-hover:from-white/60" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.4 }}
              className="text-lg text-white/60 font-light leading-relaxed"
              style={{ fontFamily: "SF Pro Text, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              {description}
            </motion.p>
          </div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-white/[0.05] to-transparent rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-white/[0.05] to-transparent rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const AboutValues: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const values = [
    {
      title: "Innovation First",
      description: "Constantly pushing boundaries and exploring new frontiers in AI technology to deliver groundbreaking solutions.",
    },
    {
      title: "Ethical Excellence",
      description: "Upholding the highest standards of ethics and transparency in every aspect of our AI development process.",
    },
    {
      title: "Client Success",
      description: "Dedicated to delivering exceptional value and ensuring our clients achieve their business objectives through our solutions.",
    },
    {
      title: "Continuous Learning",
      description: "Embracing a culture of perpetual learning and adaptation to stay at the forefront of AI advancement.",
    }
  ];

  return (
    <section ref={containerRef} className="relative py-32 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(10, 132, 255, 0.08) 0%, transparent 60%)',
            rotate: useTransform(scrollYProgress, [0, 1], [0, 45]),
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 70% 70%, rgba(10, 132, 255, 0.08) 0%, transparent 60%)',
            rotate: useTransform(scrollYProgress, [0, 1], [0, -45]),
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-px w-12 bg-[#0A84FF]/50" />
            <p className="text-[#0A84FF] text-lg font-medium tracking-wide px-4">OUR VALUES</p>
            <div className="h-px w-12 bg-[#0A84FF]/50" />
          </div>
          <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight text-white mb-6">
            Principles That Drive Us
          </h2>
          <p className="text-xl text-[#86868B] max-w-3xl mx-auto font-light leading-relaxed"
            style={{ fontFamily: "SF Pro Text, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
            The core values that shape our approach to innovation and excellence in AI technology
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <ValueCard
              key={value.title}
              title={value.title}
              description={value.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
