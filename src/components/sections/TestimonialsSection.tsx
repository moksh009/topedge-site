import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Steven Mugabe",
    role: "Doctor at Code Clinic",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTP5IqbmloRw1URDMMdIkaWrhKwXN6lMKfFQ&s",
    content: "TopEdge's AI solutions transformed our customer service. Response times dropped by 90% while satisfaction increased by 45%. It's like having a superhuman team that never sleeps.",
    rating: 5,
    company: {
      logo: "code clinic.png",
      name: "TechCorp"
    }
  },
  {
    name: "Michael Chen",
    role: "Head of Operations",
    image: "/testimonials/2.jpg",
    content: "The AI Agent integration was seamless. Our team now handles 5x more inquiries with better accuracy. The multilingual support is a game-changer for our global operations.",
    rating: 5,
    company: {
      logo: "/companies/globaltech.png",
      name: "GlobalTech"
    }
  },
  {
    name: "Emma Davis",
    role: "Customer Success Manager",
    image: "/testimonials/3.jpg",
    content: "What impressed me most was how the AI maintained our brand voice while handling complex queries. Our customers often can't tell they're talking to an AI!",
    rating: 5,
    company: {
      logo: "/companies/innovate.png",
      name: "Innovate Inc"
    }
  }
];

const TestimonialCard = ({ testimonial, index }: { testimonial: any; index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="relative group"
    >
      {/* Premium card design */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 p-8 sm:p-10">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Quote icon */}
        <div className="absolute -top-4 -left-4 text-purple-500/20">
          <Quote size={80} />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-6">
            {[...Array(testimonial.rating)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: index * 0.2 + i * 0.1 }}
              >
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </motion.div>
            ))}
          </div>

          {/* Testimonial text */}
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.2 + 0.3 }}
          >
            "{testimonial.content}"
          </motion.p>

          {/* Author info */}
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-white font-semibold">{testimonial.name}</h4>
              <p className="text-gray-400 text-sm">{testimonial.role}</p>
            </div>
            {testimonial.company.logo && (
              <div className="ml-auto">
                <img 
                  src={testimonial.company.logo} 
                  alt={testimonial.company.name}
                  className="h-8 opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
            )}
          </div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
        />
      </div>
    </motion.div>
  );
};

export const TestimonialsSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  return (
    <motion.section
      ref={containerRef}
      className="relative bg-black py-20 sm:py-24 md:py-28 lg:py-32 overflow-hidden"
      style={{ opacity, scale }}
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
              'radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
              'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 70%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Add animated gradient lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full"
            style={{
              top: `${20 * i}%`,
              background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.2), transparent)',
              transform: 'translateZ(0)',
            }}
            animate={{
              x: [-1000, 1000],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div 
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-6">
            Client Success Stories
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See what our clients say about our AI solutions
          </p>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-8 rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.name} 
              testimonial={testimonial} 
              index={index} 
            />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default TestimonialsSection; 