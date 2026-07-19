"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'framer-motion';
import { ArrowRight, Play, Scissors, Box, Sparkles, Clock } from 'lucide-react';
import DashboardMockup from '../components/DashboardMockUp';

function HeroBackground() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-50 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] bg-emerald-50/50 rounded-full blur-[100px]" />
    </div>
  );
}

function TechBadges() {
  const badges = [
    { icon: Scissors, text: "Precision Tech" },
    { icon: Box, text: "Order Mapping" },
    { icon: Sparkles, text: "Artisan Soul" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
      className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
    >
      {badges.map((badge, i) => (
        <div key={`tech-badge-${i}`} className="flex items-center space-x-2 font-mono text-[10px] uppercase tracking-widest text-slate-400 border-r border-slate-200 last:border-0 pr-8 last:pr-0">
          <badge.icon size={12} className="text-emerald-600" />
          <span>{badge.text}</span>
        </div>
      ))}
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white min-h-screen flex items-center" id="hero">
      <HeroBackground />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold mb-8 uppercase tracking-widest"
            >
              <Clock size={12} className="animate-pulse" />
              <span>Waitlist Enrollment Open</span>
            </motion.div>
            
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-slate-900 leading-[0.95] tracking-tight mb-8">
              Digitizing the <br />
              <span className="text-emerald-600 italic">Tailor's</span> <br />
              Intuition.
            </h1>
            
            <p className="text-xl text-slate-500 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Kariflow is the all-in-one operating system for modern fashion designers. Build, manage, and scale your workshop with digital precision.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
              {/* 🎯 FIXED: Replaced raw button block tags with valid semantic link anchors */}
              <motion.a
                href="#waitlist"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center space-x-3 shadow-xl shadow-emerald-600/20 transition-shadow hover:shadow-emerald-600/30"
              >
                <span>Join the Waitlist</span>
                <ArrowRight size={18} />
              </motion.a>
              
              <motion.a
                href="#story-video"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all flex items-center justify-center space-x-3 group"
              >
                <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <Play size={12} className="fill-current" />
                </div>
                <span>Watch the Story</span>
              </motion.a>
            </div>

            <TechBadges />
          </motion.div>

          {/* 🎯 FIXED: Replaced unsupported Tailwind perspective utility classes with explicit standard style values */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="flex-1 w-full hidden lg:block"
            style={{ perspective: '2000px' }}
          >
            <div 
              className="transition-transform duration-700 ease-out"
              style={{ transform: 'rotateY(-12deg) rotateX(4deg)' }}
            >
              <DashboardMockup />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}