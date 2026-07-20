"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Image from 'next/image'; // 🎯 FIXED: Imported optimized Next.js Image component
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, MapPin, Target } from 'lucide-react';

const COUNTRIES = [
  { name: "Nigeria", region: "West Africa", type: "Hub" },
  { name: "Ghana", region: "West Africa", type: "Active" },
  { name: "Kenya", region: "East Africa", type: "Active" },
  { name: "South Africa", region: "Southern Africa", type: "Expanding" },
  { name: "Senegal", region: "West Africa", type: "Future" },
  { name: "Rwanda", region: "East Africa", type: "Future" },
  { name: "Ethiopia", region: "East Africa", type: "Future" },
  { name: "Egypt", region: "North Africa", type: "Future" },
  { name: "United Kingdom", region: "Europe", type: "International" },
  { name: "United States", region: "Americas", type: "International" },
  { name: "France", region: "Europe", type: "International" },
  { name: "UAE", region: "Middle East", type: "International" },
];

export default function GlobalReach() {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayCount = isExpanded ? COUNTRIES.length : 3;

  return (
    <section className="py-24 bg-white" id="reach">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-3xl shadow-emerald-900/10">
          
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 L100 0" stroke="white" strokeWidth="0.5" />
              <path d="M0 80 L80 0" stroke="white" strokeWidth="0.5" />
              <path d="M0 60 L60 0" stroke="white" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase tracking-widest border border-emerald-500/20 mb-6">
                <Target size={14} className="mr-2" />
                Expansion Roadmap
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                Our Vision is <br />
                <span className="text-emerald-500">Boundless.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
                We are building the logistics layer for global fashion. While we start in the hearts of African tailoring, our systems are designed to coordinate craft anywhere there is a sewing machine and a dream.
              </p>
              
              <div className="flex items-center space-x-6">
                <div className="flex -space-x-3">
                  {[
                    "https://api.dicebear.com/7.x/notionists/svg?seed=Ari",
                    "https://api.dicebear.com/7.x/notionists/svg?seed=Bey",
                    "https://api.dicebear.com/7.x/notionists/svg?seed=Cam",
                    "https://api.dicebear.com/7.x/notionists/svg?seed=Dan"
                  ].map((url, i) => (
                    // Parent container has explicit size rules to constrain Next.js Image fill layout mechanics
                    <div
                      key={`avatar-wrapper-${i}`}
                      className="relative w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden"
                    >
                      <Image
                        src={url}
                        alt="User Avatar Profile"
                        fill
                        sizes="40px"
                        className="object-cover"
                        unoptimized // Dicebear svgs don't need optimization pipelines
                      />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-emerald-600 text-[10px] font-black flex items-center justify-center text-white relative z-10">
                    +500
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Joined from across Africa</p>
              </div>
            </div>

            <div className="space-y-4">
              <motion.div 
                layout
                className="grid gap-4"
              >
                <AnimatePresence mode="popLayout">
                  {COUNTRIES.slice(0, displayCount).map((country, i) => (
                    <motion.div
                      key={`country-card-${country.name}`} // Unique Framer-safe key configuration
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.03, ease: "easeOut" }}
                      className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between group hover:bg-white/[0.06] transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <h4 className="text-white font-bold">{country.name}</h4>
                          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{country.region}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        country.type === 'Hub' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {country.type}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full py-4 rounded-2xl border border-dashed border-white/10 text-slate-400 font-bold flex items-center justify-center space-x-2 hover:border-emerald-500/50 hover:text-emerald-400 transition-all cursor-pointer"
              >
                <span>{isExpanded ? "Hide Expansion List" : "Show All Planned Countries"}</span>
                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}