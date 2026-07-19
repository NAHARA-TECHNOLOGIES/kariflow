'use client';

import { motion } from 'framer-motion';
import { Globe, Users, Zap, Award } from 'lucide-react';

const PIN_POINTS = [
  { id: 1, x: '20%', y: '40%', label: 'New York', delay: 0.1 },
  { id: 2, x: '48%', y: '35%', label: 'London', delay: 0.3 },
  { id: 3, x: '52%', y: '65%', label: 'Lagos', delay: 0.5 },
  { id: 4, x: '65%', y: '45%', label: 'Dubai', delay: 0.7 },
  { id: 5, x: '82%', y: '70%', label: 'Singapore', delay: 0.9 },
  { id: 6, x: '15%', y: '75%', label: 'Brazil', delay: 1.1 },
];

export default function SuccessMap() {
  return (
    <section className="py-24 bg-slate-950 text-white overflow-hidden relative" id="global-footprint">
      {/* Background Gradients */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-600 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase tracking-[0.2em] border border-emerald-500/20 mb-6"
            >
              <Globe className="w-3.5 h-3.5 mr-2" />
              Global Footprint
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black mt-4 leading-none tracking-tight">
              Empowering artisans <br />
              <span className="text-emerald-500">across the continent.</span>
            </h2>
          </div>
          <div className="max-w-md w-full text-center md:text-left">
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              From the bustling streets of Lagos, to the commercial streets of Aba to every corner where an artisan is found across the continent.
            </p>
          </div>
        </div>

        <div className="relative aspect-[21/9] bg-white/[0.02] rounded-[40px] border border-white/5 p-8 overflow-hidden">
          {/* Stylized World Map SVG Pattern */}
          <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
            <svg viewBox="0 0 1000 500" className="w-full h-full">
              <path fill="currentColor" d="M150,100 Q180,50 250,80 T400,100 T550,120 T700,80 T850,110 T950,150 L950,450 Q800,480 700,420 T450,450 T150,400 Z" />
            </svg>
          </div>

          {/* Interactive Pins */}
          {PIN_POINTS.map((pin) => (
            <motion.div
              key={pin.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: pin.delay, duration: 0.5, type: 'spring' }}
              style={{ left: pin.x, top: pin.y }}
              className="absolute group cursor-pointer -translate-x-1/2 -translate-y-1/2"
            >
              <div className="relative">
                <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.8)] relative z-10">
                  <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-40"></div>
                </div>
                {/* 🎯 FIXED: added pointer-events-none to prevent popups overriding target selections */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-white text-slate-900 text-[10px] font-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none z-20">
                  {pin.label}
                </div>
              </div>
            </motion.div>
          ))}
          
          <div className="absolute bottom-8 left-8 right-8 flex flex-wrap gap-8 justify-center lg:justify-between items-center text-center lg:text-left">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-500">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black">500+</p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Active Designers</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-500">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black">12k+</p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Successful FITTINGS</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-500">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black">20+</p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Countries Reached</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}