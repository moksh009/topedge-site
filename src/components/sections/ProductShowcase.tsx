import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import showcaseImage from '../../assets/image.png';
import { GlowingOrbs } from '../ui/GlowingOrbs';

// Icons as inline SVG components for better control
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const products = [
  {
    title: "AI Agent",
    description: "Next-generation AI agents that combine human-like understanding with superhuman capabilities. Experience unmatched efficiency, consistency, and scalability.",
    image: showcaseImage,
    features: [
      {
        title: "Instant Scalability",
        description: "Handle unlimited concurrent conversations without quality degradation",
        icon: "Scale"
      },
      {
        title: "Consistent Excellence",
        description: "Maintain peak performance 24/7 with zero quality variance",
        icon: "Star"
      },
      {
        title: "Global Accessibility",
        description: "Instant support in 50+ languages with native-level understanding",
        icon: "Globe"
      },
      {
        title: "Cost Efficiency",
        description: "90% reduction in operational costs with higher satisfaction rates",
        icon: "TrendingUp"
      }
    ],
    metrics: {
      responseTime: {
        value: "0.3s",
        comparison: "20x faster",
        trend: "positive"
      },
      accuracy: {
        value: "99.9%",
        comparison: "15% higher",
        trend: "positive"
      },
      availability: {
        value: "24/7",
        comparison: "3x more",
        trend: "positive"
      },
      scalability: {
        value: "∞",
        comparison: "Unlimited",
        trend: "positive"
      }
    },
    link: "/services/ai-agent",
    gradient: "from-violet-600 via-indigo-500 to-purple-500"
  },
  {
    title: "Human Agent",
    description: "Traditional customer service with inherent limitations in scalability, consistency, and availability. See how our AI solution provides superior results.",
    image: showcaseImage,
    features: [
      {
        title: "Limited Capacity",
        description: "One conversation at a time per agent",
        icon: "User"
      },
      {
        title: "Variable Quality",
        description: "Performance varies based on mood, time, and workload",
        icon: "AlertTriangle"
      },
      {
        title: "Language Barriers",
        description: "Limited language support with translation delays",
        icon: "MessageSquare"
      },
      {
        title: "High Operational Costs",
        description: "Significant overhead with training and management",
        icon: "DollarSign"
      }
    ],
    metrics: {
      responseTime: {
        value: "3-5min",
        comparison: "20x slower",
        trend: "negative"
      },
      accuracy: {
        value: "85%",
        comparison: "15% lower",
        trend: "negative"
      },
      availability: {
        value: "8hrs",
        comparison: "3x less",
        trend: "negative"
      },
      scalability: {
        value: "1:1",
        comparison: "Limited",
        trend: "negative"
      }
    },
    link: "/services/chatbot",
    gradient: "from-blue-600 via-cyan-500 to-teal-500"
  }
];

const ProductShowcase = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const handleProductClick = (link: string) => {
    if (link === '/services/ai-agent') {
      navigate('/services/AIAgentInteraction');
    } else if (link === '/services/chatbot') {
      navigate('/services/ChatbotShowcase');
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#000000] min-h-screen py-20 overflow-hidden"
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
        <GlowingOrbs count={5} intensity="medium" color="rgba(139,92,246,0.15)" />
      </div>

      {/* Content Container */}
      <motion.div 
        className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20"
        style={{ scale, opacity, y }}
      >
        {/* Section Title with Apple-style animation */}
        <div className="text-center mb-20 sm:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative inline-block"
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8">
              AI vs Human
            </h2>
           
          </motion.div>
          
        </div>

        {/* Product Grid with Apple-style cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 lg:gap-24">
          {products.map((product, index) => (
          <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
          >
              {/* Product Card with enhanced styling */}
              <div 
                className="relative overflow-hidden rounded-3xl bg-[#1A1A1A] border border-white/10 transition-all duration-700 group-hover:border-purple-500/30"
                style={{ 
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
              >
                {/* Image Container with enhanced parallax */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-black/50 to-transparent opacity-70 z-10" />
                    <motion.img
                      src={product.image}
                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
                    />
                  </motion.div>

                  {/* Enhanced gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${product.gradient} opacity-30 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-40`} />
              </div>

                {/* Content Container with improved layout */}
                <div className="relative z-20 p-8 sm:p-10">
                  {/* Animated gradient orb */}
          <motion.div
                    className={`absolute -top-40 right-0 w-80 h-80 rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-r ${product.gradient}`}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0, 0.2, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.h3 
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
                    initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
                    {product.title}
                  </motion.h3>
              
                  <motion.p 
                    className="text-lg sm:text-xl text-gray-300 mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {product.description}
                  </motion.p>
              
                  {/* Features List with enhanced animations */}
                  <motion.ul 
                    className="space-y-4 mb-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.15
                        }
                      }
                    }}
                  >
                    {product.features.map((feature, idx) => (
                      <motion.li 
                        key={idx}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        className="flex items-center gap-4"
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                          <CheckIcon className="w-3.5 h-3.5 text-white" />
                    </div>
                        <span className="text-base sm:text-lg text-gray-300">{feature.description}</span>
                      </motion.li>
                ))}
                  </motion.ul>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {Object.entries(product.metrics).map(([key, metric]) => (
                      <div key={key} className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                        <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                        <div className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
                    ))}
        </div>

                  {/* Enhanced CTA Button */}
          <motion.button
                    onClick={() => handleProductClick(product.link)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white rounded-full text-black transition-all duration-300"
                    style={{
                      boxShadow: '0 0 20px rgba(139,92,246,0.3)'
                    }}
          >
                    <span className="text-base sm:text-lg font-semibold relative z-10">
                      {product.title === "AI Agent" ? "Experience AI Advantage" : "Compare with AI"}
            </span>
            <motion.div
                      className="relative z-10"
                      animate={{
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
            >
                      <ArrowRightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </motion.div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
          </motion.button>
                </div>
              </div>
        </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProductShowcase;
