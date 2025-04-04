import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Star, Quote, Play, Pause } from 'lucide-react';

const testimonial = {
  name: "Steven Mugabe",
  role: "Doctor at Code Clinic",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTP5IqbmloRw1URDMMdIkaWrhKwXN6lMKfFQ&s",
  content: "TopEdge's AI solutions transformed our customer service. Response times dropped by 90% while satisfaction increased by 45%. It's like having a superhuman team that never sleeps.",
  rating: 5,
  company: {
    logo: "code clinic.png",
    name: "Code Clinic"
  },
  video: {
    thumbnailUrl: "https://drive.google.com/uc?export=view&id=1m8UeYAM9Ql9MtIe5ib7SmIex8RXesv6d",
    videoUrl: "https://drive.google.com/uc?export=view&id=1m8UeYAM9Ql9MtIe5ib7SmIex8RXesv6d",
    duration: "2:15"
  }
};

const TestimonialCard = () => {
  const cardRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isInView = useInView(cardRef, { once: false, margin: "-100px" });

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="relative group max-w-4xl mx-auto"
    >
      {/* Premium card design */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10">
        {/* Video Section */}
        <div className="relative aspect-video w-full overflow-hidden rounded-t-3xl">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster={testimonial.video.thumbnailUrl}
            src={testimonial.video.videoUrl}
            onEnded={() => setIsPlaying(false)}
          />
          
          {/* Video Overlay */}
          <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
            <motion.button
              onClick={toggleVideo}
              className="absolute inset-0 w-full h-full flex items-center justify-center group/play"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="relative w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </motion.div>
              {!isPlaying && (
                <div className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
                  <span className="text-white/90 text-sm font-medium">{testimonial.video.duration}</span>
                </div>
              )}
            </motion.button>
          </div>
        </div>

        <div className="p-10">
          {/* Quote icon with premium styling */}
          <div className="absolute top-6 right-8 text-purple-500/20 transform rotate-180">
            <Quote size={120} />
          </div>

          {/* Content with enhanced typography */}
          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Rating with animated stars */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {[...Array(testimonial.rating)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                </motion.div>
              ))}
            </div>

            {/* Testimonial text with gradient */}
            <motion.p 
              className="text-2xl text-center text-gray-200 font-light leading-relaxed mb-10"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3 }}
            >
              "{testimonial.content}"
            </motion.p>

            {/* Author info with enhanced layout */}
            <motion.div 
              className="flex items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500/20">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h4 className="text-xl text-white font-semibold mb-1">{testimonial.name}</h4>
                <p className="text-purple-400 text-sm font-medium">{testimonial.role}</p>
              </div>
              {testimonial.company.logo && (
                <div className="ml-6 border-l border-white/10 pl-6">
                  <img 
                    src={testimonial.company.logo} 
                    alt={testimonial.company.name}
                    className="h-12 opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Premium decorative elements */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent)'
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
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
      className="relative bg-[#030014] py-32 overflow-hidden"
      style={{ opacity, scale }}
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        {/* Dark gradient overlays for smooth transitions */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#030014] to-black" />
        
        {/* Top fade overlay */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/90 to-transparent" />
        
        {/* Bottom fade overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/90 to-transparent" />

        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 60%)',
              'radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 60%)',
              'radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 60%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{
            opacity: 0.6
          }}
        />
        
        {/* Animated gradient lines with reduced opacity */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full"
            style={{
              top: `${30 * (i + 1)}%`,
              background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.15), transparent)',
              transform: 'translateZ(0)',
            }}
            animate={{
              x: [-1000, 1000],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear",
            }}
          />
        ))}

        {/* Additional ambient glow effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl opacity-20" />
        </div>
      </div>

      <motion.div 
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y }}
      >
        {/* Premium section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 mb-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Star className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Client Success Story</span>
          </motion.div>

          <h2 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
            <motion.span
              className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: '200% auto' }}
            >
              Hear From Our Clients
            </motion.span>
          </h2>

          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-8 rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        {/* Single testimonial card */}
        <TestimonialCard />
      </motion.div>
    </motion.section>
  );
};

export default TestimonialsSection; 