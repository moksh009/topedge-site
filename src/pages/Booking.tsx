import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Send, CheckCircle, Building2, MessageSquare, User, Mail, Sparkles } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { format, addHours, isBefore, startOfToday, endOfMonth } from 'date-fns';
import toast from 'react-hot-toast';
import 'react-day-picker/dist/style.css';
import { createMeeting, getBookedSlots } from '../lib/calendar';
import { sendConfirmationEmail } from '../lib/emailjs';

const services = [
  {
    id: "1",
    name: 'AI Consultation',
    description: 'Expert guidance on implementing AI solutions',
    duration: '1 hour',
    price: '$150',
    icon: '🤖'
  },
  {
    id: "2",
    name: 'Machine Learning Strategy',
    description: 'Custom ML strategy for your business needs',
    duration: '1 hour',
    price: '$200',
    icon: '🧠'
  },
  {
    id: "3",
    name: 'Data Analysis',
    description: 'In-depth analysis of your data infrastructure',
    duration: '1 hour',
    price: '$175',
    icon: '📊'
  }
];

const steps = ['Select Service', 'Choose Date & Time', 'Personal Info'];

const ProgressBar = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  return (
    <div className="absolute top-1/2 left-[7%] right-[7%] w-[86%] h-1 -translate-y-1/2 -z-10">
      <div className="relative w-full h-full">
        {/* Background line */}
        <div className="absolute inset-0 bg-gray-800/50 rounded-full overflow-hidden" />
        
        {/* Animated progress */}
        <motion.div
          className="absolute h-full rounded-full bg-gradient-to-r from-purple-600 via-violet-500 to-purple-600"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        
        {/* Glowing effect */}
        <motion.div
          className="absolute top-0 h-full rounded-full opacity-50 overflow-hidden"
          style={{
            width: `${(currentStep / (totalSteps - 1)) * 100}%`,
            background: 'linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.5), transparent)',
          }}
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </div>
  );
};

const StepIndicator = ({ step, index, currentStep }: { step: string; index: number; currentStep: number }) => {
  const isActive = index === currentStep;
  const isCompleted = index < currentStep;

  return (
    <motion.div
      className="flex flex-col items-center relative"
      initial={false}
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className={`w-14 h-14 rounded-full flex items-center justify-center ${
          isCompleted 
            ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-violet-600' 
            : isActive 
              ? 'bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 ring-4 ring-purple-500/20' 
              : 'bg-gray-800/80'
        } shadow-lg relative z-10`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isCompleted ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <CheckCircle className="w-6 h-6 text-white" />
          </motion.div>
        ) : (
          <motion.span
            className={`text-lg font-semibold ${isActive ? 'text-white' : 'text-gray-400'}`}
            initial={false}
            animate={{ scale: isActive ? 1.2 : 1 }}
          >
            {index + 1}
          </motion.span>
        )}

        {/* Add gradient glow effect */}
        {isActive && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 opacity-30 blur-md -z-10" />
        )}
      </motion.div>
      <motion.span
        className={`mt-3 text-sm font-medium ${
          isActive ? 'text-white' : 'text-gray-400'
        }`}
        initial={false}
        animate={{ 
          y: isActive ? -4 : 0,
          scale: isActive ? 1.1 : 1
        }}
      >
        {step}
      </motion.span>
      
      {/* Active step indicator dot */}
      {isActive && (
        <motion.div
          className="absolute -bottom-1 w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500"
          layoutId="activeStep"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        />
      )}
    </motion.div>
  );
};

const FloatingParticle = ({ delay }: { delay: number }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
      initial={{ 
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: 0
      }}
      animate={{ 
        y: [0, -20, 0],
        scale: [0, 1, 0],
        opacity: [0, 0.8, 0]
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

const generateTimeSlots = (selectedDate?: Date) => {
  const slots = [];
  const now = new Date();
  const isToday = selectedDate && 
    selectedDate.getDate() === now.getDate() &&
    selectedDate.getMonth() === now.getMonth() &&
    selectedDate.getFullYear() === now.getFullYear();

  for (let hour = 9; hour <= 16; hour++) {
    for (let minute of [0, 30]) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const time = new Date(selectedDate || now);
      time.setHours(hour, minute, 0);

      // Skip slots that have passed if it's today
      if (isToday && time <= now) {
        continue;
      }

      const formattedTime = format(time, 'h:mm a');
      slots.push(formattedTime);
    }
  }

  return slots;
};

const Booking = () => {
  const [selected, setSelected] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<{ date: string; timeSlot: string; }[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const updateAvailableTimeSlots = async (selectedDate: Date) => {
    try {
      // Get all booked slots for the month
      const startDate = startOfToday();
      const endDate = endOfMonth(selectedDate);
      const slots = await getBookedSlots(startDate, endDate);
      setBookedSlots(slots);

      // Filter out booked slots for the selected date
      const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
      const bookedSlotsForDate = slots
        .filter(slot => slot.date === selectedDateStr)
        .map(slot => slot.timeSlot);

      // Generate available time slots
      const allSlots = generateTimeSlots(selectedDate);
      const availableSlots = allSlots.filter(slot => !bookedSlotsForDate.includes(slot));
      
      setAvailableTimeSlots(availableSlots);
    } catch (error) {
      console.error('Error updating time slots:', error);
      toast.error('Failed to load available time slots');
      setAvailableTimeSlots(generateTimeSlots(selectedDate));
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelected(date);
    setTimeSlot('');
    if (date) {
      updateAvailableTimeSlots(date);
    } else {
      setAvailableTimeSlots([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !timeSlot || !selectedService || !formData.name || !formData.email) {
      toast.error('Please complete all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const service = services.find(s => s.id === selectedService);
      const startTime = new Date(selected);
      const [hours, minutes] = timeSlot.match(/\d+/g)?.map(Number) || [];
      if (timeSlot.includes('PM') && hours !== 12) {
        startTime.setHours(hours + 12, minutes || 0);
      } else {
        startTime.setHours(hours, minutes || 0);
      }
      const endTime = addHours(startTime, 1);

      // Create Zoom meeting and calendar event
      const result = await createMeeting(
        startTime.toISOString(),
        endTime.toISOString(),
        `${service?.name} with ${formData.name}`,
        `${formData.message}\n\nCompany: ${formData.company || 'N/A'}`,
        formData.email
      );

      if (!result.success) {
        throw new Error(result.error || 'Failed to create meeting');
      }

      // Send confirmation emails
      const emailResult = await sendConfirmationEmail({
        userEmail: formData.email,
        userName: formData.name,
        serviceName: service?.name || '',
        dateTime: `${format(startTime, 'MMMM d, yyyy')} at ${timeSlot}`,
        company: formData.company,
        message: formData.message,
        zoomLink: result.zoomMeetingUrl
      });

      if (!emailResult.success) {
        throw new Error(emailResult.error || 'Failed to send confirmation email');
      }

      // Update booked slots after successful booking
      await updateAvailableTimeSlots(selected);

      toast.custom(() => (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg shadow-lg flex items-center space-x-3"
        >
          <Sparkles className="w-6 h-6" />
          <div>
            <p className="font-medium">Booking confirmed!</p>
            <p className="text-sm opacity-90">Check your email for meeting details</p>
          </div>
        </motion.div>
      ), { duration: 4000 });

      // Reset form
      setCurrentStep(0);
      setSelected(undefined);
      setTimeSlot('');
      setSelectedService('');
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
      });
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (currentStep === 0 && !selectedService) {
      toast.error('Please select a service');
      return;
    }
    if (currentStep === 1 && (!selected || !timeSlot)) {
      toast.error('Please select date and time');
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="min-h-screen bg-black/95 pt-24 pb-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [-20, 20, -20],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [20, -20, 20],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              background: 'linear-gradient(to right, #fff, #666)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Book a Consultation
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Schedule a personalized session with our AI experts to discuss your project needs
          </motion.p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center max-w-2xl mx-auto mb-8 relative">
            {steps.map((step, index) => (
              <StepIndicator
                key={step}
                step={step}
                index={index}
                currentStep={currentStep}
              />
            ))}
            <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
          </div>
        </div>

        {/* Main Content */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-800/50"
            >
              {currentStep === 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {services.map((service) => (
                    <motion.div
                      key={service.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedService === service.id
                          ? 'bg-purple-600/20 border-2 border-purple-500/50'
                          : 'bg-gray-800/50 border-2 border-gray-700/50 hover:border-purple-600/50'
                      }`}
                      onClick={() => setSelectedService(service.id)}
                    >
                      <div className="text-3xl mb-4">{service.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                      <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">{service.duration}</span>
                        <span className="text-blue-400">{service.price}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {currentStep === 1 && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold mb-4">Select Date</h3>
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={handleDateSelect}
                        disabled={{ before: new Date() }}
                        modifiers={{
                          booked: (date) => {
                            const dateStr = format(date, 'yyyy-MM-dd');
                            return bookedSlots.some(slot => slot.date === dateStr);
                          }
                        }}
                        modifiersStyles={{
                          booked: { color: '#ef4444' }
                        }}
                        className="!bg-transparent"
                        classNames={{
                          day: 'text-gray-300 hover:bg-purple-500/20 rounded-lg transition-colors',
                          selected: '!bg-purple-600 !text-white hover:!bg-purple-700',
                          today: 'text-purple-400 font-bold',
                          disabled: '!text-gray-600 hover:!bg-transparent cursor-not-allowed'
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold mb-4">Select Time</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {availableTimeSlots.map((slot) => (
                        <motion.button
                          key={slot}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                            timeSlot === slot
                              ? 'bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500'
                              : 'bg-gray-800/50 text-gray-300 hover:bg-purple-700/50'
                          }`}
                          onClick={() => setTimeSlot(slot)}
                        >
                          {slot}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-gray-800/50 border border-purple-900/50 rounded-lg py-2 px-10 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Your full name"
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-gray-800/50 border border-purple-900/50 rounded-lg py-2 px-10 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Company
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-gray-800/50 border border-purple-900/50 rounded-lg py-2 px-10 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Your company name"
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Message
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-gray-800/50 border border-purple-900/50 rounded-lg py-2 px-10 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[100px]"
                        placeholder="Tell us about your project"
                      />
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 rounded-lg relative group overflow-hidden bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 hover:from-gray-700 hover:via-gray-600 hover:to-gray-700"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    <span className="relative z-10">Back</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-lg transition-colors ml-auto relative group overflow-hidden ${
                    isSubmitting
                      ? 'bg-gray-700 cursor-not-allowed'
                      : currentStep === steps.length - 1
                      ? 'bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 hover:from-violet-500 hover:via-purple-400 hover:to-fuchsia-400'
                      : 'bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 hover:from-violet-500 hover:via-purple-400 hover:to-fuchsia-400'
                  }`}
                  onClick={handleNextStep}
                  disabled={isSubmitting}
                >
                  <span className="relative z-10 flex items-center">
                    {currentStep === steps.length - 1 ? (
                      <>
                        {isSubmitting ? 'Booking...' : 'Complete Booking'}
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      'Next'
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-400 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Booking;