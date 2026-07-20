"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'framer-motion';
import { Coffee, Scissors, CheckCircle, Moon, Clock } from 'lucide-react';

const TIMELINE = [
  {
    time: "08:00 AM",
    title: "Morning Review",
    desc: "Check dashboard for daily deliveries and pickup reminders. No more forgotten orders.",
    icon: Coffee,
    color: "bg-orange-500",
    colorHex: "rgba(249, 115, 22, 0.2)"
  },
  {
    time: "11:00 AM",
    title: "Client Fittings",
    desc: "Log precision measurements instantly. Update fabric statuses in one tap.",
    icon: Scissors,
    color: "bg-emerald-500",
    colorHex: "rgba(16, 185, 129, 0.2)"
  },
  {
    time: "03:00 PM",
    title: "Production Control",
    desc: "Assign tasks to your tailors. Track expenses for laces, buttons, and linings.",
    icon: Clock,
    color: "bg-blue-500",
    colorHex: "rgba(59, 130, 246, 0.2)"
  },
  {
    time: "06:00 PM",
    title: "Delivery & Pickup",
    desc: "Send automated WhatsApp notifications. Confirm payments and close orders.",
    icon: CheckCircle,
    color: "bg-emerald-600",
    colorHex: "rgba(5, 150, 105, 0.2)"
  },
  {
    time: "09:00 PM",
    title: "Peace of Mind",
    desc: "Review daily profit. See your shop grow while you focus on creativity.",
    icon: Moon,
    color: "bg-slate-900",
    colorHex: "rgba(15, 23, 42, 0.2)"
  }
];

export default function DayInLife() {
  return (
    <section className="py-24 bg-white" id="timeline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">The Kariflow Way</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">A Day with Clarity</h3>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-slate-100 hidden md:block" />

          <div className="space-y-16 md:space-y-24">
            {TIMELINE.map((step, i) => {
              const isEven = i % 2 === 0;
              const stepSlug = step.title.replace(/\s+/g, '-').toLowerCase();

              return (
                <motion.div
                  key={`timeline-row-${stepSlug}`}
                  initial={{ opacity: 0, y: 15 }} // 🎯 FIXED: Optimized layout offset to prevent boundary jitter
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Connector Center Point */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 z-10 hidden md:block">
                    <div className="relative flex h-4 w-4 items-center justify-center">
                      {/* 🎯 FIXED: Replaced CPU-heavy keyframe arrays with hardware-accelerated classes */}
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${step.color}`} />
                      <span className={`relative inline-flex rounded-full h-3 w-3 ${step.color} border-2 border-white shadow-md`} />
                    </div>
                  </div>

                  {/* Card Block */}
                  <div className="w-full md:w-1/2 flex justify-center md:justify-start px-4 md:px-8">
                    {/* 🎯 FIXED: Forced clean left-alignment defaults on mobile screen views */}
                    <div className={`p-8 rounded-[40px] border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl transition-all duration-500 w-full group text-left ${
                      isEven ? 'md:text-left' : 'md:text-right'
                    }`}>
                      
                      <div className={`w-14 h-14 rounded-2xl ${step.color} text-white flex items-center justify-center mb-6 shadow-lg transform group-hover:rotate-6 transition-transform ${
                        isEven ? 'mr-auto' : 'md:ml-auto mr-auto'
                      }`}>
                        <step.icon size={26} />
                      </div>
                      
                      <p className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em] mb-2">
                        {step.time}
                      </p>
                      <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                        {step.title}
                      </h4>
                      <p className="text-slate-600 font-medium text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Spacer Column */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}