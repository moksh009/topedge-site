import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface AutomationApp {
  name: string;
  image: string;
  color: string;
  description: string;
}

const automationApps: AutomationApp[] = [
  {
    name: "Make.com",
    image: "https://assets.website-files.com/6377ac1a39ff1e65214224e4/64a576128647a96d8030c3f1_make-com-logo-white.svg",
    color: "#FF4A4A",
    description: "Advanced automation platform"
  },
  {
    name: "Vapi",
    image: "https://vapi.ai/wp-content/uploads/2023/12/vapi-logo-white.svg",
    color: "#6366F1",
    description: "Voice API integration"
  },
  {
    name: "WhatsApp",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
    color: "#25D366",
    description: "Business messaging"
  },
  {
    name: "Instagram",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
    color: "#E4405F",
    description: "Social engagement"
  },
  {
    name: "Facebook",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    color: "#1877F2",
    description: "Community building"
  },
  {
    name: "Telegram",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg",
    color: "#0088CC",
    description: "Instant messaging"
  }
];

// Duplicate the array for infinite scroll effect
const extendedApps = [...automationApps, ...automationApps, ...automationApps];

const AutomationAppsShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Horizontal scroll animation
  const baseX = useTransform(scrollYProgress, [0, 1], [0, -1000]);
  const springX = useSpring(baseX, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const SCROLL_SPEED = 0.2; 

  useEffect(() => {
    if (isInView && scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth;
      let animationFrameId: number;
      let lastTime = 0;

      const animate = (currentTime: number) => {
        if (lastTime === 0) {
          lastTime = currentTime;
        }
        const deltaTime = currentTime - lastTime;
        
        if (scrollRef.current) {
          scrollRef.current.scrollLeft += SCROLL_SPEED * deltaTime;
          if (scrollRef.current.scrollLeft >= scrollWidth / 3) {
            scrollRef.current.scrollLeft = 0;
          }
        }
        
        lastTime = currentTime;
        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);
      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [isInView]);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen bg-black py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Content Container */}
      <div className="relative container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          className="text-center mb-20"
          style={{ opacity }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{
              background: 'linear-gradient(to right, #fff 20%, #3B82F6 50%, #fff 80%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shine 8s linear infinite',
            }}
          >
            Automation Ecosystem
          </motion.h2>
          <motion.p
            className="text-gray-400 text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Connect and automate your workflow with our powerful integration platform
          </motion.p>
        </motion.div>

        {/* Infinite Scroll Container */}
        <div 
          ref={scrollRef}
          className="relative overflow-x-hidden"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          <motion.div 
            className="flex gap-8 py-10"
            style={{ x: springX }}
          >
            {extendedApps.map((app, index) => (
              <motion.div
                key={index}
                className="relative flex-none w-[400px]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 50,
                    damping: 20,
                    duration: 0.8
                  }
                }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="relative h-[200px] rounded-2xl overflow-hidden backdrop-blur-lg bg-white/5 border border-white/10">
                  {/* App Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* App Logo */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 relative">
                          <img
                            src={app.image}
                            alt={app.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{app.name}</h3>
                          <p className="text-gray-400">{app.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 rounded-full bg-white/10 text-white text-sm">
                          Connect Now
                        </span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/60" />
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `linear-gradient(45deg, ${app.color}40, transparent)`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AutomationAppsShowcase; 