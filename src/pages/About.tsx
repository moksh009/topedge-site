import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AboutHero from '../components/sections/about/AboutHero';
import AboutMission from '../components/sections/about/AboutMission';
import AboutValues from '../components/sections/about/AboutValues';
import AboutTimeline from '../components/sections/about/AboutTimeline';
import AboutStats from '../components/sections/about/AboutStats';
import AboutTeam from '../components/sections/about/AboutTeam';

const About: React.FC = () => {
  useEffect(() => {
    // Add scroll animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll();
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <main className="bg-black min-h-screen relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0A84FF] to-[#5E5CE6] transform origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section - Fade and Scale */}
      <div className="animate-on-scroll scale-in">
        <AboutHero />
      </div>

      {/* Mission Section - Slide from Left */}
      <div className="animate-on-scroll slide-from-left">
        <AboutMission />
      </div>

      {/* Values Section - Rotate In */}
      <div className="animate-on-scroll rotate-in">
        <AboutValues />
      </div>

      {/* Timeline Section - Clip Path */}
      <div className="animate-on-scroll clip-path-in">
        <AboutTimeline />
      </div>

      {/* Stats Section - Bounce In */}
      <div className="animate-on-scroll bounce-in">
        <AboutStats />
      </div>

      {/* Team Section - Blur In */}
      <div className="animate-on-scroll blur-in">
        <AboutTeam />
      </div>
    </main>
  );
};

export default About;