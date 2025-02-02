import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Bot, User, Send, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const prefilledMessages = [
  "What services do you offer?",
  "How much does it cost?",
  "Can I see a demo?",
  "Do you provide support?",
  "How long does implementation take?"
];

const ChatbotShowcase = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPrefilled, setCurrentPrefilled] = useState(prefilledMessages[0]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [prefilledIndex, setPrefilledIndex] = useState(0);
  
  // Add audio refs
  const sendAudioRef = useRef<HTMLAudioElement>(null);
  const receiveAudioRef = useRef<HTMLAudioElement>(null);

  // Set initial volume for audio elements
  useEffect(() => {
    if (sendAudioRef.current) {
      sendAudioRef.current.volume = 0.5;
    }
    if (receiveAudioRef.current) {
      receiveAudioRef.current.volume = 0.5;
    }
  }, []);

  // Function to play send sound
  const playSendSound = async () => {
    if (sendAudioRef.current) {
      try {
        sendAudioRef.current.currentTime = 0;
        await sendAudioRef.current.play();
      } catch (error) {
        console.log('Error playing send sound:', error);
      }
    }
  };

  // Function to play receive sound
  const playReceiveSound = async () => {
    if (receiveAudioRef.current) {
      try {
        receiveAudioRef.current.currentTime = 0;
        await receiveAudioRef.current.play();
      } catch (error) {
        console.log('Error playing receive sound:', error);
      }
    }
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const handleResize = () => scrollToBottom();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const generateBotResponse = (userMessage: string): string => {
    const responses = {
      services: "We offer AI-powered solutions including chatbots, automation tools, and data analytics. Our services are customized to meet your specific needs.",
      cost: "Our pricing is flexible and depends on your requirements. Basic plans start at $99/month. Would you like to schedule a consultation for a detailed quote?",
      demo: "I'd be happy to show you a live demo! We can schedule a demo call at your convenience.",
      support: "We provide 24/7 support with dedicated account managers and technical experts to ensure smooth operation.",
      implementation: "Implementation typically takes 2-4 weeks, depending on your requirements and system complexity.",
      default: "I'd be happy to help you learn more about our AI solutions. What specific aspect would you like to know about?"
    };

    const message = userMessage.toLowerCase();
    if (message.includes('service')) return responses.services;
    if (message.includes('cost') || message.includes('price')) return responses.cost;
    if (message.includes('demo')) return responses.demo;
    if (message.includes('support')) return responses.support;
    if (message.includes('implementation') || message.includes('long')) return responses.implementation;
    return responses.default;
  };

  const simulateTyping = async (response: string) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsTyping(false);
    
    // Play receive sound and add bot message
    await playReceiveSound();
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'bot',
      content: response,
      timestamp: new Date()
    }]);

    setTimeout(() => {
      const nextIndex = (prefilledIndex + 1) % prefilledMessages.length;
      setPrefilledIndex(nextIndex);
      setCurrentPrefilled(prefilledMessages[nextIndex]);
    }, 300);
  };

  const handleSendMessage = async () => {
    // Create and add user message
    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: currentPrefilled,
      timestamp: new Date()
    };

    // Play send sound and add message
    await playSendSound();
    setMessages(prev => [...prev, userMessage]);

    // Generate and simulate bot response
    const response = generateBotResponse(currentPrefilled);
    await simulateTyping(response);
  };

  return (
    <div className="relative mt-32 mb-20 bg-black">
      {/* Audio elements */}
      <audio 
        ref={sendAudioRef} 
        src="/message sound/send.mp3" 
        preload="auto"
      />
      <audio 
        ref={receiveAudioRef} 
        src="/message sound/receive.mp3" 
        preload="auto"
      />
      
      <div className="text-center mb-16">
        <h2 className="text-6xl md:text-8xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-white">
            Interactive AI Chatbot
          </span>
        </h2>
        <p className="mt-6 text-2xl md:text-3xl text-slate-300 max-w-2xl mx-auto">
          Experience real-time conversations with our advanced AI.<br/>
          <span className="text-blue-400">Try it out below →</span>
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 relative overflow-hidden"
        >
          <div className="max-w-[420px] mx-auto px-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto"
            >
              <div className="absolute inset-0 -m-1 bg-gradient-to-r from-yellow-500/20 via-pink-500/20 to-maroon-500/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute inset-0 -m-1 bg-gradient-to-b from-yellow-500/20 via-pink-500/20 to-maroon-500/20 rounded-full blur-2xl animate-pulse" />

              {/* iPhone Frame */}
              <div className="relative w-full h-[860px] bg-[#0A0A0A] rounded-[45px] border-[12px] border-[#1A1A1A] shadow-2xl overflow-hidden">
                {/* Phone Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-[#1A1A1A] rounded-b-3xl" />
                
                {/* Screen Content */}
                <div className="relative h-full rounded-[35px] overflow-hidden bg-[#0A0A0A]">
                  {/* Chat Header */}
                  <div className="bg-[#0A0A0A] pt-14 pb-4 px-4 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center"
                      >
                        <MessageSquare className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">AI Assistant</h3>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-green-400 rounded-full" />
                          <span className="text-[13px] text-green-400 font-medium">Active Now</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Messages Container */}
                  <div 
                    ref={messagesContainerRef}
                    className="h-[calc(100%-180px)] overflow-y-auto px-4 py-4 space-y-4 scroll-smooth"
                    style={{
                      overscrollBehavior: 'contain',
                      scrollbarWidth: 'thin',
                      scrollbarColor: 'rgba(255,255,255,0.2) transparent'
                    }}
                  >
                    <AnimatePresence mode="popLayout">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-start gap-2 max-w-[85%] ${
                            message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                          }`}>
                            <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${
                              message.type === 'user' ? 'bg-blue-500' : 'bg-violet-500'
                            }`}>
                              {message.type === 'user' ? (
                                <User className="w-4 h-4 text-white" />
                              ) : (
                                <Bot className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <motion.div
                              layout
                              className={`rounded-[20px] px-4 py-3 ${
                                message.type === 'user'
                                  ? 'bg-[#0A84FF] text-white rounded-tr-[4px]'
                                  : 'bg-[#1C1C1E] text-white rounded-tl-[4px]'
                              }`}
                            >
                              <p className="text-[15px] leading-tight whitespace-pre-wrap">{message.content}</p>
                              <p className="text-[11px] opacity-60 mt-1">
                                {message.timestamp.toLocaleTimeString()}
                              </p>
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}

                      {/* Typing Indicator */}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-start gap-2"
                        >
                          <div className="w-8 h-8 shrink-0 rounded-full bg-violet-500 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className="bg-[#1C1C1E] rounded-[20px] rounded-tl-[4px] px-4 py-3">
                            <div className="flex gap-1">
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity }}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                              />
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                              />
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div ref={messagesEndRef} style={{ height: 1, width: 1 }} />
                  </div>

                  {/* Input Area */}
                  <div className="absolute bottom-8 inset-x-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-[#1C1C1E] rounded-full px-4 py-3">
                        <p className="text-[15px] text-gray-400">{currentPrefilled}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleSendMessage}
                        className="p-3 rounded-full bg-[#0A84FF] text-white"
                      >
                        <Send className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone Glow Effects */}
              <div className="absolute -inset-4 z-[-1]">
                <div className="absolute inset-0 bg-gradient-to-t from-violet-600/20 to-transparent blur-2xl transform-gpu" />
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-transparent to-purple-500/20 blur-2xl transform-gpu" />
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ChatbotShowcase;
