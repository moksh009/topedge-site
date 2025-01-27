import { AnimatePresence, motion, useMotionValue, useTransform, LayoutGroup } from 'framer-motion';
import { Bot, Send, CheckCircle, Calendar as CalendarIcon, Star, Clock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import useSound from 'use-sound';
import { emailService } from '../services/emailService';
import { DayPicker, SelectSingleEventHandler } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface Service {
  id: number;
  name: string;
  price: number;
  description: string;
  icon: string;
  rating: string;
  duration: string;
}

const services: Service[] = [
  { 
    id: 1, 
    name: 'Website Development', 
    price: 999, 
    description: 'Custom responsive websites built with modern technologies',
    icon: '🌐',
    rating: '4.9',
    duration: '1 hour'
  },
  { 
    id: 2, 
    name: 'Mobile App Development', 
    price: 1499, 
    description: 'Native iOS and Android apps with seamless UX',
    icon: '📱',
    rating: '4.8',
    duration: '1 hour'
  },
  { 
    id: 3, 
    name: 'UI/UX Design', 
    price: 799, 
    description: 'User-centered design with modern aesthetics',
    icon: '🎨',
    rating: '4.7',
    duration: '1 hour'
  }
];

const availableTimes = [
  '09:00 AM', '10:00 AM', '11:00 AM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: React.ReactNode;
  expectsResponse?: boolean;
  options?: {
    type: string;
    data?: any;
  };
}

const TypewriterEffect = ({ text, delay = 50, onComplete }: { text: string; delay?: number; onComplete?: () => void }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);

  return <span>{currentText}</span>;
};

const MessageBubble = ({ children, type }: { children: React.ReactNode; type: 'user' | 'bot' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`
        flex ${type === 'user' ? 'justify-end' : 'justify-start'}
        w-full mb-4
      `}
    >
      <div className={`
        max-w-[80%] rounded-2xl p-4
        ${type === 'user' 
          ? 'bg-blue-600 text-white ml-auto'
          : 'bg-gray-800 text-gray-100'
        }
      `}>
        {children}
      </div>
    </motion.div>
  );
};

const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 p-4 max-w-[100px] bg-gray-800 rounded-2xl">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="w-2 h-2 bg-gray-400 rounded-full"
      />
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
        className="w-2 h-2 bg-gray-400 rounded-full"
      />
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
        className="w-2 h-2 bg-gray-400 rounded-full"
      />
    </div>
  );
};

const ServiceCard = ({ service, isSelected, onSelect }: { service: Service; isSelected: boolean; onSelect: () => void }) => {
  const scale = useMotionValue(1);
  const boxShadow = useTransform(
    scale,
    [1, 1.02],
    ['0 0 0 rgba(147, 51, 234, 0)', '0 20px 40px rgba(147, 51, 234, 0.2)']
  );

  return (
    <motion.div
      style={{ scale, boxShadow }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`
        relative p-6 rounded-2xl cursor-pointer
        transition-all duration-300 group
        ${isSelected
          ? 'bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-2 border-purple-500/50'
          : 'bg-[#0a0a0a] border border-[#1a1a1a] hover:border-purple-500/30'
        }
        backdrop-blur-xl overflow-hidden
      `}
    >
      {/* Selection Indicator */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full
              flex items-center justify-center"
          >
            <CheckCircle className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service Icon */}
      <motion.div
        initial={false}
        animate={{
          scale: isSelected ? 1.1 : 1,
          y: isSelected ? -5 : 0
        }}
        className="text-4xl mb-4"
      >
        {service.icon}
      </motion.div>

      {/* Service Info */}
      <motion.div
        initial={false}
        animate={{
          y: isSelected ? -5 : 0
        }}
      >
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent
          group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400
          transition-all duration-300"
        >
          {service.name}
        </h3>
        <p className="text-gray-400 mb-4 text-sm">{service.description}</p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-purple-400">
            <Clock className="w-4 h-4" />
            <span>{service.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-blue-400">
            <Star className="w-4 h-4" />
            <span>{service.rating}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-white font-bold">${service.price}</span>
          <motion.div
            initial={false}
            animate={{
              x: isSelected ? 0 : -10,
              opacity: isSelected ? 1 : 0
            }}
            className="text-purple-400 flex items-center gap-1 text-sm"
          >
            <span>Selected</span>
            <CheckCircle className="w-4 h-4" />
          </motion.div>
        </div>
      </motion.div>

      {/* Background Gradient Animation */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={false}
        animate={{
          background: isSelected
            ? [
                'radial-gradient(circle at 0% 0%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 100%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 0% 100%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 0%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
              ]
            : 'none'
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
};

const FormInput = ({ label, value, onChange, type = 'text', placeholder, required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string; required?: boolean }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-300">{label}</label>
    <motion.div
      whileFocus={{ scale: 1.02 }}
      className="relative"
    >
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`
          w-full px-4 py-3 rounded-lg
          bg-[#0a0a0a] border border-[#1a1a1a]
          text-white placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-purple-500/50
          transition-all duration-300
        `}
      />
      <motion.div
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  </div>
);

const Calendar = ({ selectedDate, onSelect }: { selectedDate: Date | undefined; onSelect: SelectSingleEventHandler }) => {
  return (
    <div className="calendar-wrapper p-4 bg-[#0a0a0a] rounded-lg">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={onSelect}
        modifiers={{
          selected: selectedDate,
        }}
        modifiersStyles={{
          selected: {
            backgroundColor: '#7c3aed',
            color: 'white',
            borderRadius: '0.5rem',
          },
        }}
        styles={{
          caption: { color: 'white' },
          head_cell: { color: '#9ca3af' },
          cell: { 
            margin: '0.2rem',
            color: 'white',
          },
          day: {
            margin: '0.2rem',
            borderRadius: '0.5rem',
            transition: 'all 0.2s',
          },
          nav_button: { 
            color: 'white',
          },
          day_selected: {
            backgroundColor: '#7c3aed !important',
            color: 'white !important',
          },
          day_today: {
            color: '#7c3aed !important',
            fontWeight: 'bold',
          }
        }}
        fromDate={new Date()}
        className="p-0"
      />
    </div>
  );
};

const Booking = () => {
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressBarRef.current) {
      const progress = ((currentStep - 1) / 2) * 100;
      progressBarRef.current.style.width = `${progress}%`;
    }
  }, [currentStep]);

  const handleServiceSelect = (service: Service) => {
    setSelectedServices(prev => {
      const isSelected = prev.some(s => s.id === service.id);
      if (isSelected) {
        return prev.filter(s => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const isFormValid = () => {
    return (
      selectedServices.length > 0 &&
      name &&
      email &&
      phone &&
      selectedDate &&
      selectedTime
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      if (!selectedDate) return;

      const totalDuration = selectedServices.reduce((total, service) => {
        const duration = parseInt(service.duration);
        return total + (isNaN(duration) ? 0 : duration);
      }, 0);

      await emailService.sendBookingEmails({
        name,
        email,
        phone,
        companyName,
        additionalInfo,
        services: selectedServices.map(service => ({
          name: service.name,
          description: service.description,
          duration: service.duration,
          price: service.price
        })),
        date: selectedDate,
        time: selectedTime,
        duration: `${totalDuration} hour${totalDuration > 1 ? 's' : ''}`,
        notes: `Selected Services: ${selectedServices.map(s => s.name).join(', ')}`
      });

      setIsSuccess(true);
      toast.success('Booking confirmed! Check your email for details.');
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to send confirmation email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedServices([]);
    setSelectedDate(undefined);
    setSelectedTime('');
    setName('');
    setEmail('');
    setPhone('');
    setCompanyName('');
    setAdditionalInfo('');
    setCurrentStep(1);
    setIsSuccess(false);
  };

  const nextStep = () => {
    if (currentStep === 1 && selectedServices.length === 0) {
      toast.error('Please select at least one service');
      return;
    }
    if (currentStep === 2 && (!selectedDate || !selectedTime)) {
      toast.error('Please select date and time');
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-black flex items-center justify-center"
      >
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0a0a0a] rounded-2xl p-8 border border-[#1a1a1a] backdrop-blur-xl relative"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h2>
            <p className="text-gray-400 mb-8">
              Thank you for booking with us! We've sent a confirmation email with all the details.
              Our team will be in touch with you shortly.
            </p>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">Booking Details</h3>
              <div className="space-y-2 text-left bg-[#0f0f0f] p-6 rounded-xl">
                <p className="text-gray-400">
                  <span className="font-medium text-white">Services:</span>{' '}
                  {selectedServices.map(s => s.name).join(', ')}
                </p>
                <p className="text-gray-400">
                  <span className="font-medium text-white">Date:</span>{' '}
                  {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}
                </p>
                <p className="text-gray-400">
                  <span className="font-medium text-white">Time:</span>{' '}
                  {selectedTime}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetForm}
              className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium"
            >
              Book Another Service
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <LayoutGroup>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-[#111111] pt-20 md:pt-24 pb-12 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              Book Your Consultation
            </motion.h1>
            <motion.p 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto"
            >
              Choose your services and schedule a time that works best for you
            </motion.p>
          </div>

          <div className="relative">
            {/* Progress bar */}
            <div className="h-1 bg-[#2a2a2a] rounded-full mb-8 mt-4">
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-300 ease-out"
              />
            </div>

            {/* Steps indicator */}
            <div className="flex justify-center mb-8 space-x-4 md:space-x-8">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`flex items-center ${
                    currentStep >= step ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  <span className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${currentStep >= step ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-[#2a2a2a]'}
                  `}>
                    {step}
                  </span>
                  <span className="ml-2 text-sm hidden md:inline">
                    {step === 1 ? 'Services' : step === 2 ? 'Schedule' : 'Details'}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-[#1a1a1a] rounded-2xl p-4 md:p-8">
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      isSelected={selectedServices.some((s) => s.id === service.id)}
                      onSelect={() => handleServiceSelect(service)}
                    />
                  ))}
                </div>
              )}

              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-white text-xl font-semibold mb-4">Select Date</h3>
                    <Calendar selectedDate={selectedDate} onSelect={(date) => setSelectedDate(date)} />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-semibold mb-4">Select Time</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={`p-3 rounded-lg text-sm transition-all ${
                            selectedTime === time
                              ? 'bg-purple-600 text-white'
                              : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#2a2a2a]'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Name"
                      value={name}
                      onChange={setName}
                      placeholder="Your full name"
                      required
                    />
                    <FormInput
                      label="Email"
                      value={email}
                      onChange={setEmail}
                      type="email"
                      placeholder="Your email address"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Phone"
                      value={phone}
                      onChange={setPhone}
                      type="tel"
                      placeholder="Your phone number"
                      required
                    />
                    <FormInput
                      label="Company Name"
                      value={companyName}
                      onChange={setCompanyName}
                      placeholder="Your company name (optional)"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Additional Information
                    </label>
                    <textarea
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      placeholder="Any additional details or requirements"
                      className="w-full px-4 py-3 bg-[#1a1a1a] text-white rounded-lg border border-[#2a2a2a] focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-vertical min-h-[100px]"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <button
                    onClick={prevStep}
                    className="flex items-center px-6 py-3 text-gray-300 hover:text-white transition-colors"
                    disabled={isSubmitting}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </button>
                )}
                <button
                  onClick={currentStep === 3 ? handleSubmit : nextStep}
                  disabled={isSubmitting}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                    isSubmitting
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90'
                  } text-white ml-auto`}
                >
                  {isSubmitting ? (
                    'Processing...'
                  ) : currentStep === 3 ? (
                    <>
                      Confirm Booking
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Next Step
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </LayoutGroup>
  );
};

export default Booking;