"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, CheckCircle2, ChevronRight, Mic, Keyboard } from 'lucide-react';

const MEASUREMENT_POINTS = [
  { id: 'shoulder', label: 'Shoulder Width', x: '50%', y: '15%', value: '42cm' },
  { id: 'chest', label: 'Bust / Chest', x: '50%', y: '28%', value: '98cm' },
  { id: 'waist', label: 'Waistline', x: '50%', y: '42%', value: '84cm' },
  { id: 'hips', label: 'Hip Width', x: '50%', y: '55%', value: '104cm' },
  { id: 'sleeve', label: 'Sleeve Length', x: '15%', y: '35%', value: '62cm' }
];

export default function MeasurementDemo() {
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [inputMode, setInputMode] = useState<'voice' | 'manual'>('voice');

  const togglePoint = (id: string) => {
    if (!history.includes(id)) {
      setHistory(prev => [...prev, id]);
    }
    setSelectedPoint(id);
  };

  return (
    <section className="py-24 bg-slate-50 overflow-hidden" id="demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
          <div>
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">Interactive Experience</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
              Precision Logistics <br />
              <span className="text-emerald-600">Meets Fashion Art.</span>
            </h3>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
              Capture every curve with precision. Use <span className="text-emerald-600">Voice Notes</span> to log sizes hands-free, or type them directly into the app. Kariflow removes the margin for error.
            </p>

            <div className="flex space-x-4 mb-8">
               <button 
                 type="button"
                 onClick={() => setInputMode('voice')}
                 className={`flex-1 p-4 rounded-2xl flex items-center justify-center space-x-3 font-bold transition-all focus:outline-none ${
                   inputMode === 'voice' 
                     ? 'bg-white border-2 border-emerald-500 text-emerald-600 shadow-lg shadow-emerald-50 scale-105' 
                     : 'bg-slate-100 border-2 border-transparent text-slate-500 opacity-60 hover:opacity-100 hover:bg-slate-200'
                 }`}
               >
                 <Mic className={`w-5 h-5 ${inputMode === 'voice' ? 'animate-pulse' : ''}`} />
                 <span>Voice Note</span>
               </button>
               <button 
                 type="button"
                 onClick={() => setInputMode('manual')}
                 className={`flex-1 p-4 rounded-2xl flex items-center justify-center space-x-3 font-bold transition-all focus:outline-none ${
                   inputMode === 'manual' 
                     ? 'bg-white border-2 border-emerald-500 text-emerald-600 shadow-lg shadow-emerald-50 scale-105' 
                     : 'bg-slate-100 border-2 border-transparent text-slate-500 opacity-60 hover:opacity-100 hover:bg-slate-200'
                 }`}
               >
                 <Keyboard className="w-5 h-5" />
                 <span>Manual Type</span>
               </button>
            </div>

            <div className="space-y-4">
              {MEASUREMENT_POINTS.map((point, idx) => (
                <motion.div 
                  key={point.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                    selectedPoint === point.id 
                      ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20' 
                      : 'border-slate-100 bg-white hover:border-emerald-200'
                  }`}
                  onClick={() => togglePoint(point.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      history.includes(point.id) ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {history.includes(point.id) ? <CheckCircle2 className="w-5 h-5" /> : <Ruler className="w-5 h-5" />}
                    </div>
                    <span className={`font-bold ${selectedPoint === point.id ? 'text-emerald-700' : 'text-slate-900'}`}>
                      {point.label}
                    </span>
                  </div>
                  {history.includes(point.id) && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-emerald-600 font-black"
                    >
                      {point.value}
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>
            
            <motion.button 
              whileHover={{ x: 10 }}
              className="mt-12 flex items-center text-emerald-600 font-black space-x-3 group focus:outline-none"
            >
              <span>Explore all 20+ measurement points</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="mt-16 lg:mt-0 relative flex justify-center">
            {/* Visual Mannequin Representation (SVG simplified) */}
            <div className="relative w-[320px] h-[580px] bg-slate-900 rounded-[50px] shadow-2xl overflow-hidden p-6 border-[8px] border-white ring-1 ring-slate-100">
               <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <div className="absolute inset-x-0 h-px bg-white top-1/4"></div>
                 <div className="absolute inset-x-0 h-px bg-white top-2/4"></div>
                 <div className="absolute inset-x-0 h-px bg-white top-3/4"></div>
                 <div className="absolute inset-y-0 w-px bg-white left-1/2"></div>
               </div>

               {/* Mannequin Silhouette */}
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20">
                 <div className="w-16 h-16 rounded-full border-4 border-white mb-4"></div>
                 <div className="w-32 h-60 border-4 border-white rounded-[30%]"></div>
               </div>

               {/* Interaction Points */}
               {MEASUREMENT_POINTS.map((point) => (
                 <motion.button
                  key={`point-hotspot-${point.id}`}
                  onClick={() => togglePoint(point.id)}
                  whileHover={{ scale: 1.3 }}
                  type="button"
                  // 🎯 FIXED: Relocated center transformation offsets to CSS to prevent Framer Motion coordinate override bugs
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                  style={{ left: point.x, top: point.y }}
                 >
                    <div className={`w-6 h-6 rounded-full border-4 border-white shadow-lg transition-all duration-300 relative ${
                      selectedPoint === point.id ? 'bg-emerald-500 scale-110' : 'bg-slate-400 hover:bg-emerald-400'
                    }`}>
                      <div className="absolute inset-0 rounded-full animate-ping bg-emerald-400 opacity-20"></div>
                    </div>
                    
                    <AnimatePresence>
                     {selectedPoint === point.id && (
                       <motion.div
                         initial={{ opacity: 0, y: 10, x: '-50%', scale: 0.8 }}
                         animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
                         exit={{ opacity: 0, x: '-50%', scale: 0.8 }}
                         className="absolute bottom-full left-1/2 mb-4 px-4 py-2 bg-white text-slate-900 rounded-xl shadow-2xl whitespace-nowrap border border-slate-100 font-bold text-sm z-30"
                       >
                         {point.label}: <span className="text-emerald-600">{point.value}</span>
                         <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                       </motion.div>
                     )}
                    </AnimatePresence>
                 </motion.button>
               ))}

               {/* Floating Info */}
               <div className="absolute bottom-10 inset-x-6 bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                 <p className="text-[10px] uppercase font-black text-slate-500 mb-1">Customer Profile</p>
                 <p className="text-sm font-bold text-white mb-2">Shade Balogun</p>
                 <div className="flex space-x-1">
                   {history.map(h => <div key={`completed-${h}`} className="w-2 h-2 rounded-full bg-emerald-500"></div>)}
                   {/* 🎯 FIXED: Standardized array length key templates to guarantee runtime stability */}
                   {Array.from({ length: Math.max(0, 5 - history.length) }).map((_, i) => (
                     <div key={`empty-slot-${i}`} className="w-2 h-2 rounded-full bg-slate-700"></div>
                   ))}
                 </div>
               </div>
            </div>

            {/* Backglow */}
            <div className="absolute -inset-20 bg-emerald-500/10 blur-[120px] rounded-full -z-10 animate-pulse pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}