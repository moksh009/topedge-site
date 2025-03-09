import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Star, Zap, Sparkles, MessageSquare } from 'lucide-react';

const plans = [
  {
    name: "Starter",
    price: "599",
    description: "Setup one time fees only",
    monthlyFee: "$49/month management fees + Operating cost",
    icon: Star,
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/20",
    features: [
      "FAQ",
      "Ticket Creation/Leave Note - pass any message of user to business"
    ],
    addOns: "Add-ons: $300 for appointment setting"
  },
  {
    name: "Pro",
    price: "1299",
    description: "Setup one time fees only",
    monthlyFee: "$99/month management fees + Operating cost",
    icon: Star,
    gradient: "from-purple-500 to-pink-500",
    shadow: "shadow-purple-500/20",
    popular: true,
    features: [
      "Everything in Starter +",
      "Appointment setting to calendar",
      "Dedicated Dashboard",
      "updates customer records in real time"
    ]
  },
  {
    name: "Premium",
    price: "2499",
    description: "Setup one time fees only",
    monthlyFee: "$249/month management fees + Operating cost",
    icon: Star,
    gradient: "from-orange-500 to-red-500",
    shadow: "shadow-orange-500/20",
    features: [
      "All in Pro +",
      "Meeting management",
      "Multi Channel agent",
      "outbound marketing"
    ]
  }
];

const chatbotPlans = [
  {
    name: "Pro",
    price: "599",
    description: "Setup one time fees only",
    monthlyFee: "$49/month management fees + Operating cost",
    icon: Star,
    gradient: "from-[#4D07E3] to-[#7A0BC0]",
    shadow: "shadow-[#4D07E3]/20",
    features: [
      "FAQ",
      "Ticket Creation/Leave Note - pass any message of user to business",
      "Single Channel"
    ],
    addOns: "$89 for additional channel eg. Whatsapp, Instagram....."
  },
  {
    name: "Premium",
    price: "1299",
    description: "Setup one time fees only",
    monthlyFee: "$99/month maintenance fees + Operating cost",
    icon: Star,
    gradient: "from-[#7A0BC0] to-[#4D07E3]",
    shadow: "shadow-[#7A0BC0]/20",
    popular: true,
    features: [
      "All in Pro +",
      "Appointment Setting",
      "Multi-channel",
      "outbound marketing",
      "Advanced Ai Models - ++customer support experience than Pro Plan Setup",
      "Multi Language Support",
      "Human Hand-off"
    ]
  },
  {
    name: "Operational Cost",
    isOperationalCost: true,
    icon: Star,
    gradient: "from-[#4D07E3] to-[#7A0BC0]",
    shadow: "shadow-[#4D07E3]/20",
    features: [
      "2 Software Platform Subscriptions - VoiceFlow & TixaeAgents",
      "Basic Plan - $50/month of VoiceFlow - depends on usage",
      "Basic Plan - $30/month of TixaeAgents - depends on usage",
      "Meta Messaging Api Fees (Minimal - few dollars depends on usage)"
    ],
    footer: "Final Quotation can be provided after Analysis of your daily/monthly usage need"
  }
];

const PricingPlans = () => {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smoother scroll animations with earlier trigger points
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], ["5%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  const handleButtonClick = () => {
    navigate('/booking');
    window.scrollTo(0, 0);
  };

  return (
    <motion.section
      ref={containerRef}
      id="pricing-plans"
      className="relative py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden"
      style={{
        background: "radial-gradient(circle at center, rgba(124, 58, 237, 0.05) 0%, rgba(0,0,0,0) 70%)"
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/5 to-black" />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(124, 58, 237, 0.05) 0%, transparent 70%)",
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
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <motion.div 
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
            <span className="text-xs sm:text-sm text-purple-300">AI Voice Agent Pricing</span>
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-4">
            <span className="inline-block bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Choose Your AI Voice Plan
            </span>
          </h2>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-sm md:max-w-none mx-auto">
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
                className="relative flex flex-col text-center"
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
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-r ${plan.gradient} p-0.5 mb-4 sm:mb-6 mx-auto`}
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
                    className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-center"
                  >
                    {plan.name}
                  </motion.h3>
                  {/* <p className="text-sm text-gray-400 mb-4 sm:mb-6 text-center px-2 sm:px-0">{plan.description}</p> */}

                  {/* Price with animation */}
                  <div className="mb-4 sm:mb-6">
                    <motion.div 
                      className="flex items-baseline justify-center"
                    >
                      <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">$</span>
                      <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white ml-1">{plan.price}</span>
                    </motion.div>
                    <div className="text-sm text-gray-400 mt-2">{plan.description}</div>
                    <div className="text-sm text-gray-400 mt-1">{plan.monthlyFee}</div>
                  </div>

                  {/* Features list with enhanced animations */}
                  <ul className="space-y-3 mb-8 text-left px-2 sm:px-0">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        className="flex items-start gap-2"
                      >
                        <motion.div>
                          <Check className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                        </motion.div>
                        <span className="text-gray-300">{feature}</span>
                      </motion.li>
                    ))}
                    {plan.addOns && (
                      <motion.li className="flex items-start gap-2 mt-4">
                        <span className="text-gray-300 text-sm">{plan.addOns}</span>
                      </motion.li>
                    )}
                  </ul>

                  {/* Get Started Button */}
                  <Link to="/booking" className="block mt-auto w-full sm:w-auto">
                    <motion.button
                      className="relative w-full py-3 px-4 sm:px-6 rounded-xl overflow-hidden bg-gradient-to-r from-purple-600/20 to-purple-600/10 border border-purple-500/20 text-white font-semibold text-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
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
                        Get {plan.name}
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Operational Cost Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12 text-gray-400 max-w-4xl mx-auto px-4"
        >
          <p>Operational Cost - depends on quality of agent Average = $0.13 per minute agent communicate</p>
        </motion.div>

        {/* Chatbot Pricing Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 text-center mb-8 sm:mb-12 md:mb-16"
        >
          <motion.div 
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
            <span className="text-xs sm:text-sm text-blue-300">Advanced Chatbot Pricing</span>
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-4">
            <span className="inline-block bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent">
              Intelligent Chatbot Solutions
            </span>
          </h2>
        </motion.div>

        {/* Chatbot Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-sm md:max-w-none mx-auto">
          {chatbotPlans.map((plan, index) => {
            const Icon = plan.icon;
            const isHovered = hoveredPlan === `chatbot-${plan.name}`;

            return (
              <motion.div
                key={`chatbot-${plan.name}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                style={{
                  opacity,
                  y,
                  scale,
                }}
                className="relative flex flex-col text-center"
                onMouseEnter={() => setHoveredPlan(`chatbot-${plan.name}`)}
                onMouseLeave={() => setHoveredPlan(null)}
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
                            <Sparkles className="w-3 h-3 text-[#4D07E3]" />
                          </motion.div>
                        </motion.div>
                      ))}
                    </>
                  )}
                </AnimatePresence>

                {/* Most Popular Badge */}
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 z-20"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.2 }}
                  >
                    <div className="relative">
                      <motion.div 
                        className="absolute -inset-1 bg-gradient-to-r from-[#4D07E3] to-[#7A0BC0] rounded-full blur-sm"
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
                      <div className="relative px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-[#4D07E3] to-[#7A0BC0] rounded-full">
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

                <motion.div
                  className={`relative flex-1 p-6 sm:p-8 rounded-2xl backdrop-blur-xl border border-white/10 bg-black overflow-hidden ${plan.popular ? 'md:scale-105' : ''}`}
                  onHoverStart={() => setHoveredPlan(`chatbot-${plan.name}`)}
                  onHoverEnd={() => setHoveredPlan(null)}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Animated gradient border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: isHovered
                        ? 'linear-gradient(to bottom right, rgba(122, 11, 192, 0.1), rgba(77, 7, 227, 0.1))'
                        : 'transparent',
                      border: `1px solid ${isHovered ? 'rgba(122, 11, 192, 0.5)' : 'rgba(122, 11, 192, 0.2)'}`,
                      transition: 'all 0.3s ease',
                    }}
                  />

                  {/* Plan Icon with enhanced animation */}
                  <motion.div
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-r ${plan.gradient} p-0.5 mb-4 sm:mb-6 mx-auto`}
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
                  {!plan.isOperationalCost ? (
                    <>
                      <motion.h3 
                        className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-center"
                      >
                        {plan.name}
                      </motion.h3>
                      {/* <p className="text-sm text-gray-400 mb-4 sm:mb-6 text-center px-2 sm:px-0">{plan.description}</p> */}

                      {/* Price with animation */}
                      <div className="mb-4 sm:mb-6 text-center">
                        <motion.div 
                          className="flex items-baseline justify-center"
                        >
                          <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">$</span>
                          <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white ml-1">{plan.price}</span>
                        </motion.div>
                        <div className="text-sm text-gray-400 mt-2 text-center">{plan.description}</div>
                        <div className="text-sm text-gray-400 mt-1 text-center">{plan.monthlyFee}</div>
                      </div>
                    </>
                  ) : (
                    <h3 className="text-2xl font-bold text-white mb-4 text-center">{plan.name}</h3>
                  )}

                  {/* Features list with enhanced animations */}
                  <ul className="space-y-3 mb-8 text-left px-2 sm:px-0">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        className="flex items-start gap-2"
                      >
                        <motion.div
                          animate={isHovered ? {
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                          } : {}}
                          transition={{
                            duration: 1,
                            repeat: isHovered ? Infinity : 0,
                            ease: "easeInOut"
                          }}
                        >
                          <Check className="w-5 h-5 text-[#4D07E3] mt-0.5 shrink-0" />
                        </motion.div>
                        <span className="text-gray-300">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Get Started Button for all plans */}
                  <Link 
                    to="/booking" 
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                    className="block mt-auto w-full"
                  >
                    <motion.button
                      className={`relative w-full py-3 px-4 sm:px-6 rounded-xl overflow-hidden bg-gradient-to-r from-[#4D07E3]/20 to-[#7A0BC0]/10 border border-[#4D07E3]/20 text-white font-semibold text-center ${plan.isOperationalCost ? 'mt-8' : ''}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#4D07E3]/0 via-[#4D07E3]/40 to-[#4D07E3]/0"
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
                        {plan.isOperationalCost ? 'Find Out Your Operation Cost' : `Get ${plan.name}`}
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </motion.button>
                  </Link>

                  {plan.footer && (
                    <p className="text-sm text-gray-400 mt-4">{plan.footer}</p>
                  )}
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
