"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, MessageCircle, X } from 'lucide-react';
import ChatWidget from './ChatWidget';

export default function FloatingControls() {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // 🎯 FIXED: Wrapped logic safely to completely avoid Server-Side Hydration errors
  useEffect(() => {
    const toggleVisibility = () => {
      const currentScrollY = window.scrollY;
      
      // 🎯 FIXED: State only updates when crossing the boundary, eliminating rendering lag
      if (currentScrollY > 300) {
        setIsVisible((prev) => (prev ? prev : true));
      } else {
        setIsVisible((prev) => (!prev ? prev : false));
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <ChatWidget 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />

      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-center space-y-4">
        <AnimatePresence>
          {isVisible && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              onClick={scrollToTop}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 shadow-xl hover:bg-emerald-50 hover:text-emerald-600 transition-all group cursor-pointer"
              aria-label="Back to top"
            >
              <ChevronUp size={24} className="group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            boxShadow: ["0px 0px 0px rgba(16, 185, 129, 0)", "0px 0px 20px rgba(16, 185, 129, 0.4)", "0px 0px 0px rgba(16, 185, 129, 0)"]
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            boxShadow: {
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`p-4 rounded-full shadow-2xl transition-all flex items-center group relative cursor-pointer ${
            isChatOpen 
              ? 'bg-slate-900 text-white' 
              : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/20'
          }`}
          aria-label="Toggle chat"
        >
          {isChatOpen ? <X size={28} /> : <MessageCircle size={28} />}
          
          {!isChatOpen && (
            <span className="absolute right-full mr-4 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
              Chat with us
            </span>
          )}
        </motion.button>
      </div>
    </>
  );
}