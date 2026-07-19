"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'framer-motion';
import { X, Check, ShieldCheck, Zap, Activity, Layers } from 'lucide-react';

const CHAOS_POINTS = [
  "Scattered measurement notes",
  "Inconsistent customer details & measurement",
  "Unclear production status for customer orders",
  "Manual invoicing and payment reconciliation",
  "Unclear expenses & financial summary",
  "Confused delivery dates",
  "Inconsistent sizing across different tailors"
];

const CLARITY_POINTS = [
  "Unified digital note",
  "Consistent customer details & measurement",
  "Real time task tracking for every workshop",
  "Team collaboration & production status visibility",
  "Automated financial summary and clear expense",
  "Due date reminders"
];

export default function Features() {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="features">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-4"
            >
              <span>The Artisan Engine</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 tracking-tight leading-none">
              Chaos vs. <span className="text-emerald-600 italic">Precision</span>
            </h2>
          </div>
          <div className="max-w-md w-full text-center md:text-left">
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              Fashion design is an art, but managing it shouldn't be a struggle. We replace chaotic workshop management with digital precision.
            </p>
          </div>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Chaos Side */}
          <motion.div
            initial={{ opacity: 0, x: -15 }} // 🎯 FIXED: Reduced transform offset to eliminate mobile boundary overflow
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 relative group grayscale hover:grayscale-0 transition-all duration-700"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="p-3 rounded-2xl bg-rose-50 text-rose-500">
                <Activity size={24} className="rotate-45" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-rose-500 opacity-60">The Manual Problem</span>
            </div>
            <h3 className="text-3xl font-display font-black text-slate-900 mb-6">Fragile & Fading</h3>
            <div className="space-y-4">
              {CHAOS_POINTS.map((point, i) => (
                // 🎯 FIXED: Replaced array index fallback with explicit safe key naming
                <div key={`chaos-point-${i}`} className="flex items-start space-x-4">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-rose-50 flex items-center justify-center">
                    <X size={12} className="text-rose-500" />
                  </div>
                  <p className="text-slate-500 text-sm font-bold tracking-tight">{point}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Clarity Side */}
          <motion.div
            initial={{ opacity: 0, x: 15 }} // 🎯 FIXED: Reduced transform offset to eliminate mobile boundary overflow
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-10 rounded-[40px] bg-emerald-600 border border-emerald-500 relative group overflow-hidden shadow-2xl shadow-emerald-600/20"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <ShieldCheck size={180} className="text-white" />
            </div>
            
            <div className="flex items-center justify-between mb-8">
              <div className="p-3 rounded-2xl bg-white/20 text-white">
                <ShieldCheck size={24} />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-50 font-bold">The Kariflow System</span>
            </div>
            <h3 className="text-3xl font-display font-black text-white mb-6">Hardened & High-Fashion</h3>
            <div className="space-y-4 relative z-10">
              {CLARITY_POINTS.map((point, i) => (
                // 🎯 FIXED: Replaced array index fallback with explicit safe key naming
                <div key={`clarity-point-${i}`} className="flex items-start space-x-4">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                  <p className="text-emerald-50 text-sm font-bold tracking-tight">{point}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 p-6 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white mb-2 italic">Artisan Guarantee</p>
              <p className="text-xs text-white/90 leading-relaxed font-bold">
                "We don't just build software. We protect the artisan's craft by providing the digital infrastructure to scale without losing the soul of the work."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Growth Stats Section */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Client Satisfaction", val: "99.9%", icon: Zap },
            { label: "Production Speed", val: "+40%", icon: Layers },
            { label: "Waste Reduction", val: "-25%", icon: Activity },
            { label: "Artisans On-board", val: "1,000+", icon: ShieldCheck }
          ].map((stat, i) => (
            <motion.div
              key={`stat-card-${stat.label.replace(/\s+/g, '-').toLowerCase()}`} // Safe unique dynamic loop tracker string
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 cursor-default hover:bg-emerald-50 hover:border-emerald-100 transition-all group"
            >
              <stat.icon size={20} className="text-emerald-600 mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-3xl font-display font-black text-slate-900 mb-1 tracking-tight">{stat.val}</p>
              <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}