"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, ShieldCheck, Zap, Layers, Activity, Database } from 'lucide-react';

const TECH_PARTNERS = [
  { name: 'Amazon Web Services', icon: Cloud },
  { name: 'Google Cloud Platform', icon: Database },
  { name: 'Stripe Payments', icon: Zap },
  { name: 'Vercel Infrastructure', icon: Layers },
  { name: 'Firebase Systems', icon: ShieldCheck },
  { name: 'Sentry Observability', icon: Activity },
];

export default function Partners() {
  return (
    <section className="py-16 bg-white relative overflow-hidden border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 italic">
            Empowered by Industry Standards
          </h3>
        </motion.div>

        <div className="relative w-full overflow-hidden">
          {/* Fading Edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* Marquee Wrapper Track */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex w-max"
          >
            <motion.div 
              className="flex items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                duration: 35, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {/* Render double tracks to ensure seamless continuous viewport coverage */}
              {[...TECH_PARTNERS, ...TECH_PARTNERS].map((partner, idx) => {
                const IconComponent = partner.icon;
                return (
                  <div 
                    key={`partner-${partner.name.toLowerCase().replace(/\s+/g, '-')}-${idx}`} 
                    className="flex items-center space-x-4 opacity-40 hover:opacity-100 transition-all duration-500 cursor-default px-12"
                  >
                    <IconComponent className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-sm font-display font-black text-slate-800 tracking-widest uppercase whitespace-nowrap">
                      {partner.name}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}