"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../constants';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="faq">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column - Sticky Info on Desktop */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-6"
            >
              <HelpCircle size={12} />
              <span>Support & Logic</span>
            </motion.div>
            <h2 className="text-4xl font-display font-black text-slate-900 mb-6 tracking-tight leading-tight">
              Frequently Asked <br />
              {/* 🎯 FIXED: Aligned generic font-serif usage to match explicit brand styles */}
              <span className="text-emerald-600 italic font-display">Questions</span>
            </h2>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 max-w-sm mx-auto lg:mx-0">
              Find answers to common questions about setting up Kariflow, custom branding formats, workshop synchronization, and offline database configurations.
            </p>
            <div className="pt-6 border-t border-slate-100 hidden lg:block">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Still looking for guidance?
              </p>
              <a href="/contact" className="text-emerald-600 font-black text-sm hover:underline mt-2 inline-block">
                Talk to a Workshop Strategist &rarr;
              </a>
            </div>
          </div>

          {/* Right Column - Accordion Items */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {FAQS.map((faq, i) => {
                const isCurrentOpen = openIndex === i;
                const panelId = `faq-panel-${i}`;
                const controlId = `faq-control-${i}`;

                return (
                  <motion.div 
                    key={`faq-item-${i}`} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isCurrentOpen 
                        ? 'border-emerald-100 bg-emerald-50/30' 
                        : 'border-slate-100 bg-slate-50/50 hover:border-emerald-100'
                    }`}
                  >
                    <button
                      id={controlId}
                      onClick={() => setOpenIndex(isCurrentOpen ? null : i)}
                      aria-expanded={isCurrentOpen}
                      aria-controls={panelId}
                      className="w-full flex items-center justify-between p-6 text-left focus:outline-none group cursor-pointer"
                    >
                      <span className={`text-base font-black tracking-tight transition-colors ${
                        isCurrentOpen ? 'text-emerald-600' : 'text-slate-600 group-hover:text-emerald-700'
                      }`}>
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isCurrentOpen ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className={`${isCurrentOpen ? 'text-emerald-600' : 'text-slate-400'}`}
                      >
                        <ChevronDown size={20} />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isCurrentOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={controlId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden border-t border-slate-100/50"
                        >
                          {/* 🎯 FIXED: Extracted structural padding container to isolate and smoothen layout height tracking bounds */}
                          <div className="p-6 text-slate-500 text-sm font-medium leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
            
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-16 text-center lg:hidden">
              Still looking for technical specifications? <br />
              <a href="/contact" className="text-emerald-600 font-black hover:underline mt-2 inline-block">Talk to a Workshop Strategist</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}