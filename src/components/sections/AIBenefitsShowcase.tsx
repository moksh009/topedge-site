import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Phone, MessageSquare, Calendar, Users, Clock, Zap, Bot, BrainCircuit, Sparkles, CheckCircle2, XCircle, Building2, Globe2, TrendingUp, ArrowRight } from 'lucide-react';

interface Benefit {
  icon: any;
  title: string;
  subtitle: string;
  painPoints: string[];
  solutions: string[];
  stats: {
    value: string;
    label: string;
  }[];
  gradient: string;
  glowColor: string;
}

const benefits: Benefit[] = [
  {
    icon: Phone,
    title: "AI Voice Agent",
    subtitle: "24/7 Intelligent Call Handling",
    painPoints: [
      "72% of customers choose competitors when calls go unanswered",
      "Missed calls during peak hours and after business hours",
      "High cost of hiring and training receptionists"
    ],
    solutions: [
      "Never miss a call with 24/7 intelligent call handling",
      "Handle unlimited concurrent calls without wait times",
      "Qualify leads and book meetings automatically"
    ],
    stats: [
      { value: "100%", label: "Call Answer Rate" },
      { value: "65%", label: "Cost Reduction" },
      { value: "3x", label: "Lead Conversion" }
    ],
    gradient: "from-[#3B82F6] via-[#6366F1] to-[#8B5CF6]",
    glowColor: "rgba(99, 102, 241, 0.15)"
  },
  {
    icon: MessageSquare,
    title: "Smart Chatbot",
    subtitle: "Instant Multi-Channel Support",
    painPoints: [
      "90% of leads go cold without instant engagement",
      "Inconsistent customer support across channels",
      "Limited support hours causing customer frustration"
    ],
    solutions: [
      "Instant responses across all messaging platforms",
      "Consistent omni-channel customer experience",
      "24/7 lead qualification and nurturing"
    ],
    stats: [
      { value: "60%", label: "Faster Response" },
      { value: "45%", label: "Support Cost Reduction" },
      { value: "85%", label: "Customer Satisfaction" }
    ],
    gradient: "from-[#8B5CF6] via-[#A855F7] to-[#D946EF]",
    glowColor: "rgba(168, 85, 247, 0.15)"
  },
  {
    icon: Calendar,
    title: "Auto Scheduling",
    subtitle: "Global Booking System",
    painPoints: [
      "Lost opportunities due to timezone & availability gaps",
      "Manual scheduling taking up valuable time",
      "Double bookings and scheduling conflicts"
    ],
    solutions: [
      "Automated booking across all timezones",
      "Smart calendar management and conflict resolution",
      "Instant confirmation and reminders"
    ],
    stats: [
      { value: "3x", label: "More Meetings" },
      { value: "95%", label: "Scheduling Accuracy" },
      { value: "80%", label: "Time Saved" }
    ],
    gradient: "from-[#EC4899] via-[#F43F5E] to-[#FB7185]",
    glowColor: "rgba(236, 72, 153, 0.15)"
  }
];

const AIBenefitsShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedBenefit, setSelectedBenefit] = useState<number | null>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen bg-[#050505] py-32 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Enhanced Dark Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Darker Space Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0A0A1A] to-[#050505]" />
        
        {/* Enhanced Nebula Effect */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08), transparent 60%), radial-gradient(circle at 30% 70%, rgba(236, 72, 153, 0.08), transparent 60%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Refined Grid */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ['0px 0px', '100px 100px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(99, 102, 241, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              mask: 'radial-gradient(circle at center, black 30%, transparent 70%)',
            }}
          />
        </div>

        {/* Refined Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(1px)',
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.4, 0],
                y: [-20, 20],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Enhanced Premium Header */}
        <motion.div
          className="text-center mb-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative inline-block mb-6">
            <h2 className="relative text-7xl md:text-8xl font-bold tracking-tight">
              <motion.span
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-300 to-white"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Experience
              </motion.span>
              <br />
              <motion.span
                className="inline-block bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] text-transparent bg-clip-text"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% auto' }}
              >
                AI Excellence
              </motion.span>
            </h2>
          </div>
          <motion.p
            className="text-2xl md:text-3xl text-slate-400 max-w-3xl mx-auto mt-8 font-light tracking-wide leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Unleash the power of AI to transform your business
          </motion.p>
        </motion.div>

        {/* Enhanced Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.21, 0.45, 0.15, 1.0],
              }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedBenefit(selectedBenefit === index ? null : index)}
            >
              {/* Premium Card Design */}
              <div className="relative h-full rounded-3xl transition-transform duration-500 transform-gpu group-hover:scale-[1.02]">
                {/* Enhanced Glassmorphism Background */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-2xl" />
                
                {/* Enhanced Animated Border */}
                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Enhanced Card Content */}
                <div className="relative p-8 h-full">
                  {/* Enhanced Icon */}
                  <div className="relative mb-8">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.gradient} p-3 group-hover:scale-110 transition-transform duration-500`}
                      animate={{
                        boxShadow: [
                          `0 0 20px ${benefit.glowColor}`,
                          `0 0 40px ${benefit.glowColor}`,
                          `0 0 20px ${benefit.glowColor}`,
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <benefit.icon className="w-full h-full text-white" />
                    </motion.div>
                  </div>

                  {/* Enhanced Title & Subtitle */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-slate-200 group-hover:to-white">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-400 text-base leading-relaxed tracking-wide">
                      {benefit.subtitle}
                    </p>
                  </div>

                  {/* Enhanced Stats */}
                  <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-white/5">
                    {benefit.stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        className="text-center relative group/stat"
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.p
                          className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent mb-2"
                        >
                          {stat.value}
                        </motion.p>
                        <p className="text-sm text-slate-400 leading-tight">
                          {stat.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Enhanced Expandable Content */}
                  <AnimatePresence>
                    {selectedBenefit === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-8 pt-6 border-t border-white/5 space-y-8"
                      >
                        {/* Enhanced Pain Points */}
                        <div className="space-y-4">
                          <h4 className="text-base font-semibold text-red-400/90 flex items-center gap-2 mb-4">
                            <XCircle className="w-5 h-5" />
                            Current Challenges
                          </h4>
                          <div className="grid gap-4 pl-2">
                            {benefit.painPoints.map((point, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-4"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-red-400/80 mt-2 flex-shrink-0" />
                                <p className="text-red-400/80 text-base leading-relaxed">{point}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Enhanced Solutions */}
                        <div className="space-y-4">
                          <h4 className="text-base font-semibold text-emerald-400/90 flex items-center gap-2 mb-4">
                            <CheckCircle2 className="w-5 h-5" />
                            Our Solutions
                          </h4>
                          <div className="grid gap-4 pl-2">
                            {benefit.solutions.map((solution, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 + 0.3 }}
                                className="flex items-start gap-4"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 mt-2 flex-shrink-0" />
                                <p className="text-emerald-400/80 text-base leading-relaxed">{solution}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA */}
        <motion.div
          className="text-center mt-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/contact"
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white/5 rounded-full text-white font-semibold text-lg transition-all duration-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Transform Your Business Today</span>
            <motion.div
              className="relative z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-6 h-6" />
            </motion.div>
            
            {/* Enhanced Button Glow */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                background: [
                  'linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.3))',
                  'linear-gradient(225deg, rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.3))',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                filter: 'blur(20px)',
              }}
            />
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AIBenefitsShowcase; 