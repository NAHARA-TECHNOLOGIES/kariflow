'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'framer-motion';
import { Scissors, Box, Send, ChevronRight } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'Digital Profiling',
    description: 'We capture every client measurement and preference into a secure digital vault.',
    icon: Scissors,
    color: 'emerald'
  },
  {
    number: '02',
    title: 'Smart Production',
    description: 'Track your orders through cutting, sewing, and fitting with automated workshop alerts.',
    icon: Box,
    color: 'emerald'
  },
  {
    number: '03',
    title: 'Global Delivery',
    description: 'Sync your inventory and ship your finished crafts to clients across the globe with ease.',
    icon: Send,
    color: 'emerald'
  }
];

export default function Steps() {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="how-it-works">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl text-center md:text-left">
            <motion.div
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-6"
            >
              <span>The Kariflow Journey</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-none">
              How It <span className="text-emerald-600 italic font-serif">Works</span>
            </h2>
          </div>
          <div className="max-w-md w-full text-center md:text-left">
            <p className="text-slate-500 text-base leading-relaxed font-medium">
              {/* 🎯 FIXED: Safely wrapped unescaped native apostrophe to prevent Next.js build errors */}
              {"We've"} refined critical fashion operations into a simple, reliable digital workflow so you can concentrate purely on the creative process.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-[4rem] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent -z-0"></div>
          
          {Obj_Map(STEPS)}
        </div>
      </div>
    </section>
  );
}

// Extracted internal mapper utility cleanly for better component performance isolation
function Obj_Map(steps: typeof STEPS) {
  return steps.map((step, i) => {
    const IconComponent = step.icon;
    return (
      <motion.div
        key={step.number}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: i * 0.2 }}
        className="relative z-10 group text-center md:text-left"
      >
        <div className="relative mb-8">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-20 h-20 rounded-3xl bg-white border border-slate-100 flex items-center justify-center mx-auto md:mx-0 shadow-2xl relative z-10 group-hover:border-emerald-500/50 transition-all duration-500"
          >
            {/* 🎯 FIXED: Replaced explicit size props with responsive geometric utility style constraints */}
            <IconComponent className="w-8 h-8 text-emerald-600" />
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-emerald-600 text-[10px] font-black text-white flex items-center justify-center">
              {step.number}
            </div>
          </motion.div>
          {i < steps.length - 1 && (
            <div className="hidden md:block absolute top-1/2 left-full -translate-y-1/2 -ml-3 z-20">
              <ChevronRight className="w-6 h-6 text-slate-200" />
            </div>
          )}
        </div>
        
        <h3 className="text-2xl font-display font-black text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors tracking-tight">
          {step.title}
        </h3>
        <p className="text-slate-500 font-medium leading-relaxed max-w-sm mx-auto md:mx-0 text-sm">
          {step.description}
        </p>
      </motion.div>
    );
  });
}