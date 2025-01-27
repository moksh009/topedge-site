import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Battery, Bot, Contact, Mic, MicOff, Phone, Sparkles, Video, Volume2, X } from 'lucide-react';

interface Message {
  text: string;
  audioFile: string;
  isUser: boolean;
}

const conversation: Message[] = [
  {
    text: "Hello! I'm your AI assistant. I can help you explore our services or schedule a consultation. How can I assist you today?",
    audioFile: "./sounds/ai1.mp3",
    isUser: false
  },
  {
    text: "Hi! I'm interested in learning more about your services.",
    audioFile: "./sounds/user1.mp3",
    isUser: true
  },
  {
    text: "Great! We offer a range of AI-powered solutions including chatbots, virtual assistants, and automation tools. Which area interests you the most?",
    audioFile: "./sounds/ai2.mp3",
    isUser: false
  },
  {
    text: "I'm particularly interested in chatbots for customer service.",
    audioFile: "./sounds/user2.mp3",
    isUser: true
  },
  {
    text: "Excellent choice! Our chatbots use advanced natural language processing to provide 24/7 customer support. They can handle inquiries, process requests, and even learn from interactions.",
    audioFile: "./sounds/ai3.mp3",
    isUser: false
  },
  {
    text: "That sounds promising. What kind of setup and maintenance is required?",
    audioFile: "./sounds/user3.mp3",
    isUser: true
  },
  {
    text: "We handle everything from setup to maintenance. The implementation is seamless, and we provide regular updates and monitoring. Would you like to schedule a demo to see it in action?",
    audioFile: "./sounds/ai4.mp3",
    isUser: false
  },
  {
    text: "Yes, I'd like to see a demo. What's the next step?",
    audioFile: "./sounds/user4.mp3",
    isUser: true
  },
  {
    text: "Perfect! I can help you schedule a demo with our team. We'll show you the full capabilities and customize the presentation to your needs. What time works best for you?",
    audioFile: "./sounds/ai5.mp3",
    isUser: false
  },
  {
    text: "How about next Tuesday afternoon?",
    audioFile: "./sounds/user5.mp3",
    isUser: true
  },
  {
    text: "Tuesday afternoon works great! I'll send you a calendar invite with the demo details. Is there anything specific you'd like us to focus on during the demo?",
    audioFile: "./sounds/ai6.mp3",
    isUser: false
  },
  {
    text: "Yes, please focus on integration capabilities and customization options.",
    audioFile: "./sounds/user6.mp3",
    isUser: true
  },
  {
    text: "Perfect! I've noted that down. You'll receive the calendar invite shortly. We look forward to showing you how our chatbot solution can transform your customer service!",
    audioFile: "./sounds/ai7.mp3",
    isUser: false
  }
];

export const AIAgentInteraction = () => {
  // State management
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [conversationStep, setConversationStep] = useState(0);

  // Audio refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentAudioSrc = useRef<string | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.addEventListener('ended', () => {
      setIsPlaying(false);
      currentAudioSrc.current = null;
    });
    audioRef.current.addEventListener('play', () => setIsPlaying(true));
    audioRef.current.addEventListener('pause', () => setIsPlaying(false));
    audioRef.current.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      setIsPlaying(false);
      currentAudioSrc.current = null;
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current.remove();
        audioRef.current = null;
      }
    };
  }, []);

  // Play audio function
  const playAudio = useCallback(async (audioFile: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!audioRef.current) {
        reject(new Error('Audio not initialized'));
        return;
      }

      // If same audio is already playing, don't restart it
      if (currentAudioSrc.current === audioFile && !audioRef.current.ended) {
        resolve();
        return;
      }

      // Stop current audio if playing
      audioRef.current.pause();
      
      const handleEnded = () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('ended', handleEnded);
          audioRef.current.removeEventListener('error', handleError);
        }
        resolve();
      };

      const handleError = (e: Event) => {
        console.error('Audio playback error:', e);
        if (audioRef.current) {
          audioRef.current.removeEventListener('ended', handleEnded);
          audioRef.current.removeEventListener('error', handleError);
        }
        reject(new Error('Audio playback failed'));
      };

      try {
        audioRef.current.addEventListener('ended', handleEnded);
        audioRef.current.addEventListener('error', handleError);
        
        audioRef.current.src = audioFile;
        audioRef.current.volume = isMuted ? 0 : 1;
        currentAudioSrc.current = audioFile;
        
        const playPromise = audioRef.current.play();
        if (playPromise) {
          playPromise.catch((error) => {
            console.error('Playback failed:', error);
            handleError(new Event('error'));
          });
        }
      } catch (error) {
        console.error('Audio setup error:', error);
        handleError(new Event('error'));
      }
    });
  }, [isMuted]);

  // Progress conversation
  const progressConversation = useCallback(async () => {
    if (!isCallActive || isProcessing || conversationStep >= conversation.length) {
      if (conversationStep >= conversation.length) {
        setIsCallActive(false);
        setConversationStep(0);
      }
      return;
    }

    setIsProcessing(true);
    try {
      const currentMessage = conversation[conversationStep];
      console.log('Processing message:', currentMessage.text);

      await playAudio(currentMessage.audioFile);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setConversationStep(prev => prev + 1);
    } catch (error) {
      console.error('Conversation error:', error);
      setConversationStep(prev => prev + 1);
    } finally {
      setIsProcessing(false);
    }
  }, [isCallActive, isProcessing, conversationStep, playAudio]);

  // Auto progress conversation
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isCallActive && !isProcessing && !isPlaying) {
      timeoutId = setTimeout(progressConversation, 500);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isCallActive, isProcessing, conversationStep, progressConversation, isPlaying]);

  // Handle call toggle
  const handleCallToggle = useCallback(() => {
    if (!isCallActive) {
      setIsCallActive(true);
      setConversationStep(0);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsCallActive(false);
      setConversationStep(0);
      setIsPlaying(false);
      setIsProcessing(false);
    }
  }, [isCallActive]);

  // Handle mute toggle
  const handleMuteToggle = useCallback(() => {
    setIsMuted(prev => {
      if (audioRef.current) {
        audioRef.current.volume = prev ? 1 : 0;
      }
      return !prev;
    });
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black">
      {/* Title Section */}
      <div className="text-center mb-16">
        <h2 className="text-6xl md:text-8xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-white">
            AI Voice Assistant
          </span>
        </h2>
        <p className="mt-6 text-2xl md:text-3xl text-slate-300 max-w-2xl mx-auto">
          Experience the future of communication.<br/>
          <span className="text-green-400">Pick up call to hear a live demo →</span>
        </p>
      </div>

      {/* Phone Section */}
      <div className="relative w-full max-w-[300px] mx-auto">
        {/* Glow Effect */}
        <div className="absolute inset-0 -m-1 bg-gradient-to-r from-yellow-500/20 via-pink-500/20 to-maroon-500/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute inset-0 -m-1 bg-gradient-to-b from-yellow-500/20 via-pink-500/20 to-maroon-500/20 rounded-full blur-2xl animate-pulse" />
        
        <div className="relative aspect-[9/19.5] w-full">
          {/* Phone Border */}
          <div className="absolute inset-0 rounded-[45px] bg-black shadow-[0_0_25px_rgba(0,0,0,0.3)] overflow-hidden border border-[#3a3a3c]">
            {/* Status Bar */}
            <div className="relative h-12 flex items-center justify-between px-6 bg-black">
              <div className="text-white text-[14px] font-medium">9:41</div>
              <div className="absolute top-0 left-0 right-0 h-7">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-black flex items-center justify-center">
                  <div className="w-16 h-[3px] rounded-full bg-[#1a1a1a]" />
                </div>
              </div>
              <div>
                <Battery className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Main Content */}
            {!isCallActive ? (
              // Incoming Call Screen
              <div className="flex flex-col h-[calc(100%-3rem)] bg-black">
                <div className="flex-1 flex flex-col items-center">
                  {/* Title */}
                  <div className="w-full text-center mt-12 mb-20">
                    <h2 className="text-white text-[32px] font-medium mb-2">AI Assistant</h2>
                    <p className="text-[#86868b] text-lg">incoming FaceTime Audio</p>
                  </div>

                  {/* Avatar */}
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mb-auto"
                  >
                    <div className="w-24 h-24 rounded-full bg-[#6366f1] flex items-center justify-center">
                      <Bot className="w-12 h-12 text-white" />
                    </div>
                  </motion.div>

                  {/* Call Controls */}
                  <div className="mb-32 w-full flex items-center justify-center space-x-20">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsCallActive(false)}
                      className="w-[60px] h-[60px] rounded-full bg-[#ff453a] flex items-center justify-center shadow-lg"
                    >
                      <X className="w-7 h-7 text-white" />
                    </motion.button>
                    
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCallToggle}
                      className="w-[60px] h-[60px] rounded-full bg-[#34c759] flex items-center justify-center shadow-lg"
                    >
                      <Phone className="w-7 h-7 text-white" />
                    </motion.button>
                  </div>
                </div>
              </div>
            ) : (
              // Active Call Screen
              <div className="flex flex-col h-[calc(100%-3rem)] bg-black">
                <div className="flex-1 flex flex-col items-center pt-8">
                  <div className="flex items-center space-x-4 mb-12">
                    <div className="w-16 h-16 rounded-full bg-[#6366f1] flex items-center justify-center">
                      <Bot className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-white text-2xl font-medium">AI Assistant</h2>
                    </div>
                  </div>

                  {/* Call Controls */}
                  <div className="absolute bottom-28 w-full">
                    <motion.div 
                      className="grid grid-cols-3 gap-6 px-8 mb-12"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {/* Top Row */}
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center space-y-2"
                      >
                        <div className="w-14 h-14 rounded-full bg-[#2c2c2e] flex items-center justify-center">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[#86868b] text-sm">Add Call</span>
                      </motion.button>

                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center space-y-2"
                      >
                        <div className="w-14 h-14 rounded-full bg-[#2c2c2e] flex items-center justify-center">
                          <Video className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[#86868b] text-sm">FaceTime</span>
                      </motion.button>

                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center space-y-2"
                      >
                        <div className="w-14 h-14 rounded-full bg-[#2c2c2e] flex items-center justify-center">
                          <Contact className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[#86868b] text-sm">Contacts</span>
                      </motion.button>

                      {/* Bottom Row */}
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center space-y-2"
                      >
                        <div className="w-14 h-14 rounded-full bg-[#2c2c2e] flex items-center justify-center">
                          <Volume2 className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[#86868b] text-sm">Speaker</span>
                      </motion.button>

                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center space-y-2"
                      >
                        <div className="w-14 h-14 rounded-full bg-[#2c2c2e] flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[#86868b] text-sm">Effects</span>
                      </motion.button>

                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleMuteToggle}
                        className="flex flex-col items-center space-y-2"
                      >
                        <div className={`w-14 h-14 rounded-full ${isMuted ? 'bg-white' : 'bg-[#2c2c2e]'} flex items-center justify-center`}>
                          {isMuted ? <MicOff className="w-6 h-6 text-black" /> : <Mic className="w-6 h-6 text-white" />}
                        </div>
                        <span className="text-[#86868b] text-sm">Mute</span>
                      </motion.button>
                    </motion.div>

                    {/* End Call Button */}
                    <motion.div 
                      className="flex justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCallToggle}
                        className="w-16 h-16 rounded-full bg-[#ff453a] flex items-center justify-center shadow-lg"
                      >
                        <X className="w-8 h-8 text-white" />
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-36 h-1 bg-[#3a3a3c] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
