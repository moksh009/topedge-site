import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Star, Zap, Sparkles } from 'lucide-react';

const plans = [
  {
    name: "Starter",
    price: "49",
    description: "Perfect for small businesses getting started",
    icon: Star,
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/20",
    features: [
      "AI-powered chatbot",
      "24/7 customer support",
      "Basic analytics",
      "Up to 1,000 conversations/month",
      "2 team members"
    ]
  },
  {
    name: "Pro",
    price: "99",
    description: "Ideal for growing businesses",
    icon: Star,
    gradient: "from-purple-500 to-pink-500",
    shadow: "shadow-purple-500/20",
    popular: true,
    features: [
      "Everything in Starter, plus:",
      "Advanced AI customization",
      "Priority support",
      "Up to 10,000 conversations/month",
      "10 team members",
      "Custom branding"
    ]
  },
  {
    name: "Enterprise",
    price: "249",
    description: "For large-scale operations",
    icon: Star,
    gradient: "from-orange-500 to-red-500",
    shadow: "shadow-orange-500/20",
    features: [
      "Everything in Pro, plus:",
      "Dedicated account manager",
      "Custom AI model training",
      "Unlimited conversations",
      "Unlimited team members",
      "API access",
      "SSO & advanced security"
    ]
  }
];

const PricingPlans = () => {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smoother scroll animations with earlier trigger points
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], ["5%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  return (
    <motion.section
      ref={containerRef}
      id="pricing-plans"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
      style={{
        background: "radial-gradient(circle at center, rgba(124, 58, 237, 0.05) sm:rgba(124, 58, 237, 0.08) md:rgba(124, 58, 237, 0.1) 0%, rgba(0,0,0,0) 70%)"
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/5 sm:via-purple-900/8 md:via-purple-900/10 to-black" />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(124, 58, 237, 0.05) sm:rgba(124, 58, 237, 0.08) md:rgba(124, 58, 237, 0.1) 0%, transparent 70%)",
            y
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <motion.div 
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
            <span className="text-xs sm:text-sm text-purple-300">Choose Your Plan</span>
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="inline-block bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Pricing Plans That Scale With You
            </span>
          </h2>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isHovered = hoveredPlan === plan.name;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                style={{
                  opacity,
                  y,
                  scale,
                }}
                className="relative flex flex-col"
              >
                {/* Floating sparkles */}
                <AnimatePresence>
                  {isHovered && (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={`sparkle-${i}`}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            zIndex: 30,
                          }}
                        >
                          <motion.div
                            animate={{
                              y: [0, -20, 0],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: Math.random() * 0.5,
                            }}
                          >
                            <Sparkles className="w-3 h-3 text-purple-400" />
                          </motion.div>
                        </motion.div>
                      ))}
                    </>
                  )}
                </AnimatePresence>

                {/* Most Popular Badge */}
                {plan.name === "Pro" && (
                  <motion.div
                    className="absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 z-20"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.2 }}
                  >
                    <div className="relative">
                      {/* Glow Effect */}
                      <motion.div 
                        className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full blur-sm"
                        animate={{
                          opacity: [0.5, 0.8, 0.5],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      
                      {/* Badge */}
                      <div className="relative px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full">
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <motion.span
                            animate={{
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, -10, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                            className="text-sm sm:text-base"
                          >
                            ✨
                          </motion.span>
                          <span className="text-xs sm:text-sm font-semibold text-white">Most Popular</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Card */}
                <motion.div
                  className={`relative flex-1 p-6 sm:p-8 rounded-2xl backdrop-blur-xl border border-white/10 bg-gradient-to-b from-black/80 to-purple-950/20 overflow-hidden ${plan.popular ? 'md:scale-105' : ''}`}
                  onHoverStart={() => setHoveredPlan(plan.name)}
                  onHoverEnd={() => setHoveredPlan(null)}
                  whileHover={{ scale: 1.02, y: -5 }}
                  initial={{ scale: 1, y: 0 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.2,
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                >
                  {/* Animated gradient border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    initial={{ background: 'linear-gradient(0deg, rgba(139,92,246,0), rgba(0,0,0,0))' }}
                    animate={isHovered ? {
                      background: [
                        'linear-gradient(0deg, rgba(139,92,246,0.1), rgba(0,0,0,0))',
                        'linear-gradient(90deg, rgba(139,92,246,0.1), rgba(0,0,0,0))',
                        'linear-gradient(180deg, rgba(139,92,246,0.1), rgba(0,0,0,0))',
                        'linear-gradient(270deg, rgba(139,92,246,0.1), rgba(0,0,0,0))'
                      ]
                    } : {
                      background: 'linear-gradient(0deg, rgba(139,92,246,0), rgba(0,0,0,0))'
                    }}
                    transition={{
                      duration: 2,
                      repeat: isHovered ? Infinity : 0,
                      ease: "linear"
                    }}
                  />

                  {/* Plan Icon with enhanced animation */}
                  <motion.div
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-r ${plan.gradient} p-0.5 mb-4 sm:mb-6`}
                    whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                    initial={{ rotate: 0, scale: 1 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.3,
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                  >
                    <motion.div 
                      className="w-full h-full bg-black rounded-xl flex items-center justify-center overflow-hidden"
                      initial={{ background: 'rgba(0,0,0,1)' }}
                      animate={isHovered ? {
                        background: ['rgba(0,0,0,1)', 'rgba(20,0,40,1)', 'rgba(0,0,0,1)']
                      } : {
                        background: 'rgba(0,0,0,1)'
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: isHovered ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    >
                      <motion.div
                        initial={{ scale: 1, rotate: 0 }}
                        animate={isHovered ? {
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        } : {
                          scale: 1,
                          rotate: 0
                        }}
                        transition={{ 
                          duration: 1,
                          repeat: isHovered ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      >
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Plan Details with hover effects */}
                  <motion.h3 
                    className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3"
                    initial={{ color: '#FFFFFF' }}
                    animate={isHovered ? {
                      color: ['#FFFFFF', '#C4B5FD', '#FFFFFF'],
                    } : {
                      color: '#FFFFFF'
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: isHovered ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  >
                    {plan.name}
                  </motion.h3>
                  <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">{plan.description}</p>

                  {/* Price with animation */}
                  <div className="mb-6 sm:mb-8">
                    <motion.div 
                      className="flex items-baseline"
                      initial={{ scale: 1 }}
                      animate={isHovered ? { 
                        scale: [1, 1.05, 1] 
                      } : {
                        scale: 1
                      }}
                      transition={{ 
                        duration: 1,
                        repeat: isHovered ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    >
                      <span className="text-4xl sm:text-5xl font-bold text-white">$</span>
                      <span className="text-4xl sm:text-5xl font-bold text-white ml-1">{plan.price}</span>
                      <span className="text-gray-400 ml-2">/month</span>
                    </motion.div>
                  </div>

                  {/* Features list with enhanced animations */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        className="flex items-start gap-2"
                        initial={{ opacity: 1, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: index * 0.1 + featureIndex * 0.1,
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }}
                      >
                        <motion.div
                          initial={{ scale: 1, rotate: 0 }}
                          animate={isHovered ? {
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                          } : {
                            scale: 1,
                            rotate: 0
                          }}
                          transition={{ 
                            duration: 0.5,
                            delay: featureIndex * 0.1,
                            repeat: isHovered ? Infinity : 0,
                            ease: "easeInOut"
                          }}
                        >
                          <Check className="w-5 h-5 text-green-400 mt-0.5" />
                        </motion.div>
                        <span className="text-gray-300">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Get Started Button with enhanced hover effects */}
                  <Link to="/booking" className="block mt-auto">
                    <motion.button
                      className="relative w-full py-3 px-6 rounded-xl overflow-hidden bg-gradient-to-r from-purple-600/20 to-purple-600/10 border border-purple-500/20 text-white font-semibold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ scale: 1 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/40 to-purple-600/0"
                        initial={{ x: '-100%' }}
                        animate={isHovered ? {
                          x: ['-100%', '100%'],
                        } : {
                          x: '-100%'
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: isHovered ? Infinity : 0,
                          ease: "linear",
                        }}
                      />
                      <motion.div
                        className="relative z-10 flex items-center justify-center gap-2"
                        initial={{ x: 0 }}
                        animate={isHovered ? {
                          x: [0, 5, 0],
                        } : {
                          x: 0
                        }}
                        transition={{
                          duration: 1,
                          repeat: isHovered ? Infinity : 0,
                          ease: "easeInOut",
                        }}
                      >
                        Get Started
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default PricingPlans;
