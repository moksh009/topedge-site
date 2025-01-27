import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';

const AboutMission = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative py-20 bg-black" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-white/[0.02]" />

      <div className="container relative mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-20"
          >
            <motion.h2
              className="text-5xl sm:text-6xl font-semibold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-purple/90 to-purple/80">
                Our Mission
              </span>
            </motion.h2>
            <motion.p
              className="text-lg text-gray-400 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Empowering businesses through innovative AI solutions and strategic digital transformation
            </motion.p>
          </motion.div>

          {/* Mission Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vision Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative group"
            >
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 opacity-25 blur transition duration-1000 group-hover:opacity-75 group-hover:duration-200" />
              <div className="relative h-full bg-black rounded-lg p-8 border border-white/10">
                {/* Card Content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col h-full"
                >
                  {/* Icon */}
                  <motion.div
                    className="w-12 h-12 mb-6 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-6 h-6 text-white transform -rotate-45" />
                  </motion.div>

                  <motion.h3
                    className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    Our Vision
                  </motion.h3>

                  <motion.p
                    className="text-gray-400 flex-grow"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    To be the global leader in AI innovation, shaping the future of digital transformation across industries.
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative group"
            >
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 opacity-25 blur transition duration-1000 group-hover:opacity-75 group-hover:duration-200" />
              <div className="relative h-full bg-black rounded-lg p-8 border border-white/10">
                {/* Card Content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex flex-col h-full"
                >
                  {/* Icon */}
                  <motion.div
                    className="w-12 h-12 mb-6 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-6 h-6 text-white" />
                  </motion.div>

                  <motion.h3
                    className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    Our Approach
                  </motion.h3>

                  <motion.p
                    className="text-gray-400 flex-grow"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    We combine cutting-edge AI technology with deep industry expertise to deliver transformative solutions.
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>

            {/* Values Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative group"
            >
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 opacity-25 blur transition duration-1000 group-hover:opacity-75 group-hover:duration-200" />
              <div className="relative h-full bg-black rounded-lg p-8 border border-white/10">
                {/* Card Content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex flex-col h-full"
                >
                  {/* Icon */}
                  <motion.div
                    className="w-12 h-12 mb-6 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-6 h-6 text-white transform rotate-45" />
                  </motion.div>

                  <motion.h3
                    className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    Our Values
                  </motion.h3>

                  <motion.p
                    className="text-gray-400 flex-grow"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    Innovation, integrity, and excellence drive everything we do, ensuring the highest quality solutions.
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMission;
