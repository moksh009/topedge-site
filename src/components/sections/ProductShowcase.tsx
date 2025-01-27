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
    title: "AI Caller",
    description: "Experience seamless communication with our advanced AI calling system. Perfect for businesses looking to automate customer interactions while maintaining a personal touch.",
    image: showcaseImage,
    features: [
      "Natural voice interactions",
      "Real-time response generation",
      "Multi-language support",
      "Custom voice and personality"
    ],
    link: "/services/ai-agent",
    gradient: "from-violet-600 via-indigo-500 to-purple-500"
  },
  {
    title: "Advanced Chatbot",
    description: "Elevate your customer service with our intelligent chatbot solution. Powered by cutting-edge AI to handle complex conversations and tasks.",
    image: showcaseImage,
    features: [
      "Context-aware responses",
      "Multi-platform integration",
      "24/7 availability",
      "Learning capabilities"
    ],
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
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
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
      className="relative bg-black min-h-screen py-20 overflow-hidden"
    >
      {/* Animated background elements */}
      <GlowingOrbs count={3} intensity="low" color="rgba(139,92,246,0.3)" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90 backdrop-blur-sm" />

      {/* Content Container */}
      <motion.div 
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20"
        style={{ scale, opacity, y }}
      >
        {/* Section Title with animated underline */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative inline-block"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-6">
              Our Solutions
            </h2>
            <motion.div
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mt-6"
          >
            Transform your business with our cutting-edge AI solutions
          </motion.p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              {/* Product Card */}
              <div 
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10 hover:border-purple-500/50 transition-all duration-500"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Image Container with Parallax Effect */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 z-10" />
                    <img
                      src={product.image}
                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  {/* Floating gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${product.gradient} opacity-20 mix-blend-overlay`} />
                </div>

                {/* Content Container */}
                <div className="relative z-20 p-6 sm:p-8">
                  {/* Animated gradient orb */}
                  <div className={`absolute -top-20 right-0 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-gradient-to-r ${product.gradient}`} />
                  
                  <motion.h3 
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    {product.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-base sm:text-lg text-white/70 mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {product.description}
                  </motion.p>
                  
                  {/* Features List with staggered animation */}
                  <motion.ul 
                    className="space-y-3 mb-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1
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
                        className="flex items-center gap-3"
                      >
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                          <CheckIcon className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm sm:text-base text-white/80">{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  {/* CTA Button */}
                  <motion.button
                    onClick={() => handleProductClick(product.link)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    <span className="text-sm sm:text-base font-medium">Learn More</span>
                    <ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
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
