"use client";

import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Loader2, Sparkles, Headset, MessageSquare, Paperclip, FileText } from 'lucide-react';

interface Message {
  id: string;
  text?: string;
  file?: {
    name: string;
    url: string;
    type: string;
  };
  sender: 'user' | 'bot' | 'agent';
  timestamp: Date;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_QUESTIONS = [
  "How to sync measurements?",
  "WhatsApp order alerts",
  "Workshop task tracking",
  "Pricing for tailors",
  "Scale my fashion brand"
];

export default function ChatWidget({ isOpen, onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Connection established. 👋 I'm your Kariflow Assistant. I can help with measurement syncing, order tracking, and workshop scaling. How can I assist?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [activeStep, setActiveStep] = useState<'chat' | 'connecting'>('chat');
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, activeStep]);

  const handleSend = (text?: string, file?: Message['file']) => {
    const finalContent = text || inputValue;
    if (!finalContent.trim() && !file) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: finalContent || undefined,
      file: file,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    
    if (file) {
      processBotResponse(finalContent, true);
    } else if (finalContent.toLowerCase().includes('consult') || finalContent.toLowerCase().includes('live') || finalContent.toLowerCase().includes('brief')) {
      startAgentConnection();
    } else {
      processBotResponse(finalContent);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const fileData = {
      name: file.name,
      url: url,
      type: file.type
    };

    handleSend(undefined, fileData);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const startAgentConnection = () => {
    setIsConnecting(true);
    setActiveStep('connecting');
    
    setTimeout(() => {
      setActiveStep('chat');
      setIsConnecting(false);
      const agentMsg: Message = {
        id: Date.now().toString(),
        text: "Hello, this is Kariflow Support. I've been alerted to your inquiry. How can I help with your workshop strategy today?",
        sender: 'agent',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentMsg]);
    }, 3000);
  };

  const processBotResponse = (input: string, isFileUpload = false) => {
    setIsTyping(true);
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: isFileUpload 
          ? "File received. I've queued this for your workshop dashboard. Does this contain measurements or design sketches?"
          : getBotResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200);
  };

  const getBotResponse = (input: string): string => {
    const low = input.toLowerCase();
    if (low.includes('price') || low.includes('cost') || low.includes('tier')) {
      return "Kariflow has tiers ranging from Free for solo tailors to custom plans for fashion houses. You can find detailed pricing on our pricing page. Would you like a link?";
    }
    if (low.includes('measurement') || low.includes('size')) {
      return "Kariflow captures measurements digitally. You can even use voice-to-text to record sizes while fitting a client. All data syncs in real-time.";
    }
    if (low.includes('whatsapp') || low.includes('alert')) {
      return "We integrate directly with WhatsApp. Your clients receive automated updates when their order moves from 'Cutting' to 'Finished'.";
    }
    return "Kariflow is the operating system for modern fashion. Would you like to schedule a quick demo for your studio?";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-24 right-6 w-[360px] sm:w-[420px] h-[580px] bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 flex flex-col z-[70] overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 bg-emerald-600 text-white flex justify-between items-center shrink-0 shadow-lg">
            <div className="flex items-center space-x-3">
              <motion.div 
                animate={{ rotate: isConnecting ? 360 : 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl text-white relative"
              >
                {isConnecting ? <Loader2 size={20} className="animate-spin" /> : <MessageSquare size={20} />}
              </motion.div>
              <div>
                <h3 className="font-display font-black text-sm tracking-tight flex items-center uppercase italic">
                  Kariflow Support
                  <Sparkles size={12} className="ml-1.5 text-emerald-300 animate-pulse" />
                </h3>
                <div className="flex items-center space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-[9px] uppercase font-black tracking-widest text-emerald-100">Live & Secure</span>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/70 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {activeStep === 'connecting' ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100"
              >
                <Headset size={40} />
              </motion.div>
              <div>
                <h4 className="text-xl font-display font-black text-slate-900 mb-2">Escalating to Expert</h4>
                <p className="text-xs text-slate-500 font-medium tracking-tight uppercase">Connecting to Workshop Strategist...</p>
              </div>
              <div className="flex space-x-1.5">
                {[1,2,3].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                    className="w-2 h-2 rounded-full bg-emerald-500"
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Messages Area */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 custom-scrollbar shadow-inner"
              >
                {messages.map((msg) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="max-w-[85%] flex flex-col space-y-1">
                      <div className={`p-4 rounded-2xl text-[13px] font-medium leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-emerald-100 text-emerald-950 rounded-br-none shadow-sm' 
                          : msg.sender === 'agent'
                            ? 'bg-white text-slate-900 rounded-bl-none shadow-md border border-slate-100'
                            : 'bg-white text-slate-700 rounded-bl-none shadow-sm border border-slate-50'
                      }`}>
                        <div className={`flex items-center space-x-2 mb-2 opacity-50 text-[10px] uppercase font-black tracking-widest ${msg.sender === 'user' ? 'text-emerald-800' : ''}`}>
                          {msg.sender === 'user' ? (
                            <><span>You</span><User size={10} strokeWidth={3}/></>
                          ) : msg.sender === 'agent' ? (
                            <><Headset size={10} strokeWidth={3}/><span className="text-emerald-600">Strategist</span></>
                          ) : (
                            <><MessageSquare size={10} strokeWidth={3}/><span>Assistant</span></>
                          )}
                        </div>
                        
                        {msg.file && (
                          <div className="mb-3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                            {msg.file.type.startsWith('image/') ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img 
                                src={msg.file.url} 
                                alt="Attachment" 
                                className="w-full max-h-48 object-cover cursor-pointer hover:opacity-80 transition-all" 
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="flex items-center p-3 space-x-3 bg-white">
                                <div className="p-2 bg-emerald-50 rounded-lg">
                                  <FileText size={20} className="text-emerald-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-[10px] font-black truncate text-slate-900">{msg.file.name}</p>
                                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Document Segment</p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {msg.text && <p className="leading-relaxed font-semibold">{msg.text}</p>}
                      </div>
                      <span className="text-[8px] text-slate-400 px-1 font-black uppercase tracking-tighter">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-bl-none flex items-center space-x-3 shadow-sm">
                      <div className="flex gap-1">
                         {[1,2,3].map(i => <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }} className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />)}
                      </div>
                      <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase italic">Thinking...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestions */}
              {messages.length < 4 && (
                <div className="px-6 py-4 bg-white flex flex-wrap gap-2 border-t border-slate-100">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <motion.button
                      key={q}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSend(q)}
                      className="px-3 py-2 rounded-xl border border-slate-100 bg-slate-50 text-[10px] font-black text-slate-600 hover:border-emerald-500/50 hover:text-emerald-600 transition-all uppercase tracking-tight"
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Input Area */}
              <div className="p-6 bg-white border-t border-slate-100 shrink-0">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx"
                />
                
                <div className="relative flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 hover:text-emerald-600 transition-all"
                  >
                    <Paperclip size={20} strokeWidth={2.5} />
                  </motion.button>
                  
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask about your workshop..."
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:border-emerald-500/50 focus:bg-white transition-all text-slate-900 text-[13px] pr-14 font-bold"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSend()}
                      disabled={!inputValue.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-emerald-600 text-white rounded-full disabled:opacity-30 disabled:grayscale transition-all shadow-lg shadow-emerald-600/20"
                    >
                      <Send size={18} strokeWidth={2.5} />
                    </motion.button>
                  </div>
                </div>
                <p className="text-center text-[10px] text-slate-300 font-black tracking-widest mt-4 uppercase italic">
                  End-to-End Encrypted
                </p>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}