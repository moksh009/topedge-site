import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Milestone, Flag, Award, Rocket } from 'lucide-react';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  index: number;
  gradient: string;
  icon: JSX.Element;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ year, title, description, index, gradient, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 1,
        delay: index * 0.2,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="relative group"
    >
      {/* Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
      
      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="absolute left-0 top-0 w-3 h-3 -translate-x-1/2 rounded-full bg-white/20 border border-white/30 group-hover:bg-white/40 transition-colors duration-300"
      />

      {/* Content */}
      <div className="pl-8 pb-12">
        {/* Year */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.3 }}
          className="inline-block px-4 py-1 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-4"
        >
          <span className="text-sm text-white/60 font-light tracking-wide"
            style={{ fontFamily: "SF Pro Text, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
            {year}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.4 }}
          className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500"
        >
          {title}
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.5 }}
          className="text-lg text-white/60 font-light leading-relaxed"
          style={{ fontFamily: "SF Pro Text, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          {description}
        </motion.p>

        {/* Icon */}
        <div className={`w-12 h-12 mb-4 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white`}>
          {icon}
        </div>

        {/* Hover Effect */}
        <motion.div
          className="absolute inset-0 -m-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)'
          }}
        />
      </div>
    </motion.div>
  );
};

const AboutTimeline: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const timeline = [
    {
      year: "2020",
      title: "Foundation",
      description: "TopEdge was founded with a vision to revolutionize AI technology and make it accessible to businesses worldwide.",
      gradient: 'from-blue-500 to-indigo-600',
      icon: <Flag className="w-6 h-6" />,
    },
    {
      year: "2021",
      title: "First Major Breakthrough",
      description: "Launched our flagship AI platform, enabling businesses to harness the power of artificial intelligence effortlessly.",
      gradient: 'from-purple-500 to-pink-600',
      icon: <Milestone className="w-6 h-6" />,
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Expanded operations to multiple continents, serving clients across diverse industries and establishing key partnerships.",
      gradient: 'from-emerald-500 to-teal-600',
      icon: <Award className="w-6 h-6" />,
    },
    {
      year: "2023",
      title: "Innovation Award",
      description: "Received industry recognition for our groundbreaking AI solutions and commitment to ethical technology development.",
      gradient: 'from-amber-500 to-orange-600',
      icon: <Rocket className="w-6 h-6" />,
    },
    {
      year: "2024",
      title: "Future Forward",
      description: "Continuing to push boundaries with cutting-edge AI research and development, shaping the future of technology.",
      gradient: 'from-violet-500 to-indigo-600',
      icon: <Flag className="w-6 h-6" />,
    }
  ];

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(51,51,51,0.2),transparent_50%)]" />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 70% 30%, rgba(120, 120, 120, 0.08) 0%, transparent 60%)',
            y: useTransform(scrollYProgress, [0, 1], [0, 100])
          }}
        />
      </div>

      <motion.div
        style={{ opacity }}
        className="relative container mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-violet-500 via-purple-500 to-indigo-500">
              Our Journey
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto font-light"
            style={{ fontFamily: "SF Pro Text, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
            A timeline of innovation, growth, and transformative achievements
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {timeline.map((item, index) => (
            <TimelineItem
              key={item.year}
              year={item.year}
              title={item.title}
              description={item.description}
              index={index}
              gradient={item.gradient}
              icon={item.icon}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutTimeline;
