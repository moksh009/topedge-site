import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, ExternalLink, ArrowRight, Globe } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
    { name: 'Booking', href: '/booking' },
  ];

  const services = [
    'AI Consulting',
    'Machine Learning',
    'Data Analytics',
    'Neural Networks',
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-[#1877F2]' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-[#E4405F]' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-[#1DA1F2]' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-[#0A66C2]' },
  ];

  const contactInfo = [
    { icon: Phone, text: '(123) 456 7890', href: 'tel:+11234567890' },
    { icon: Mail, text: 'hello@reallygreatsite.com', href: 'mailto:hello@reallygreatsite.com' },
    { icon: MapPin, text: 'Silicon Valley, CA', href: '#' },
  ];

  return (
    <footer className="relative bg-black">
      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          {/* Company Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 flex flex-col items-center md:items-start"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              TopEdge
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Pioneering the future of artificial intelligence with cutting-edge solutions and innovative technologies.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-gray-400 ${social.color} transition-colors p-2 hover:bg-white/5 rounded-full`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6 flex flex-col items-center md:items-start"
          >
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-4 w-full">
              {quickLinks.map((link) => (
                <motion.li key={link.name} className="flex justify-center md:justify-start">
                  <motion.a
                    href={link.href}
                    className="text-gray-400 hover:text-white flex items-center space-x-2 group transition-all"
                    whileHover={{ x: 4 }}
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 flex flex-col items-center md:items-start"
          >
            <h4 className="text-lg font-semibold text-white">Services</h4>
            <ul className="space-y-4 w-full">
              {services.map((service) => (
                <motion.li 
                  key={service}
                  className="flex justify-center md:justify-start"
                >
                  <motion.span
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center space-x-2 group"
                    whileHover={{ x: 4 }}
                  >
                    <span>{service}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </motion.span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6 flex flex-col items-center md:items-start"
          >
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <ul className="space-y-4 w-full">
              {contactInfo.map((item) => (
                <motion.li key={item.text} className="flex justify-center md:justify-start">
                  <motion.a
                    href={item.href}
                    className="text-gray-400 hover:text-white flex items-center space-x-3 group transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    <item.icon className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
                    <span>{item.text}</span>
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} TopEdge AI. All rights reserved.
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <div className="flex items-center gap-2 text-gray-400">
                <Globe className="w-4 h-4" />
                <select className="bg-transparent text-sm focus:outline-none focus:ring-0 cursor-pointer">
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}