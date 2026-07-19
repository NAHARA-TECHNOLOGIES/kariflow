"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, PlayCircle, Download, TrendingUp, Users, ShoppingBag, Settings, Bell, Zap, Sparkles } from 'lucide-react';

const CHART_POINTS = [
  { x: 0, y: 160 },
  { x: 114, y: 110 },
  { x: 228, y: 130 },
  { x: 342, y: 80 },
  { x: 457, y: 100 },
  { x: 571, y: 50 },
  { x: 685, y: 70 },
  { x: 800, y: 20 },
];

const getCurvePath = (points: { x: number; y: number }[]) => {
  if (points.length === 0) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const cp1x = p0.x + (p1.x - p0.x) / 2;
    const cp1y = p0.y;
    const cp2x = p0.x + (p1.x - p0.x) / 2;
    const cp2y = p1.y;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
  }
  return d;
};

const curveD = getCurvePath(CHART_POINTS);
const areaD = `${curveD} L 800 200 L 0 200 Z`;

// 🎯 FIXED: Relocated BatteryIndicator up to guarantee strict hoisting and runtime initialization safety
const BatteryIndicator = () => {
  const [level, setLevel] = useState(88);

  useEffect(() => {
    const interval = setInterval(() => {
      setLevel(prev => Math.max(10, prev - 0.5));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getColor = () => {
    if (level > 50) return 'bg-emerald-500';
    if (level > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="absolute top-2 right-4 flex items-center gap-1.5 text-[9px] text-white/70 font-mono z-30 select-none">
      <span className="font-bold">{Math.round(level)}%</span>
      <div className="w-6 h-3 border border-white/50 rounded-[3px] p-[1px] relative">
        <div className={`h-full ${getColor()} rounded-[1px] transition-all duration-500`} style={{ width: `${level}%` }} />
      </div>
    </div>
  );
};

export default function DownloadApp() {
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isVibrating, setIsVibrating] = useState(false);
  const [indicatorActive, setIndicatorActive] = useState(false);

  const triggerHaptic = () => {
    if (!hapticEnabled) return;
    setIsVibrating(true);
    setIndicatorActive(true);
    setTimeout(() => setIsVibrating(false), 250);
    setTimeout(() => setIndicatorActive(false), 1200);
  };

  const handleToggleHaptic = () => {
    const nextVal = !hapticEnabled;
    setHapticEnabled(nextVal);
    if (nextVal) {
      setIsVibrating(true);
      setIndicatorActive(true);
      setTimeout(() => setIsVibrating(false), 250);
      setTimeout(() => setIndicatorActive(false), 1200);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-white" id="download">
      
      {/* Animated Background Chart */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none select-none">
        <svg 
          viewBox="0 0 800 200" 
          className="w-full h-full object-cover" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          {/* 🎯 FIXED: Swapped out risky dynamic string paths on layout mount for direct pathLength tracking metrics */}
          <motion.path 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, d: areaD }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            fill="url(#colorValue)" 
          />
          <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
            d={curveD}
            stroke="#10b981" 
            strokeWidth={4}
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-3xl sm:rounded-[40px] p-4 sm:p-8 md:p-12 lg:p-16 overflow-hidden relative shadow-2xl border border-white/5"
        >
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            
            {/* Main Content Details */}
            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-6 border border-emerald-500/20">
                  <Download size={14} className="mr-2" />
                  Mobile App Coming Soon
                </div>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                  Your Business, <br />
                  <span className="text-emerald-500">In Your Pocket.</span>
                </h2>
                <p className="text-lg text-slate-400 mb-8 max-w-md leading-relaxed">
                  Manage measurements, track orders, and monitor profits from anywhere. Sign up once, manage all shops in one app.
                </p>

                <div className="flex flex-wrap gap-4 mb-10">
                  <motion.button 
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center px-6 py-3 bg-white text-slate-900 rounded-xl font-bold transition-all shadow-lg cursor-pointer"
                  >
                    <Apple className="mr-2 w-6 h-6" />
                    <div className="text-left">
                      <p className="text-[10px] uppercase opacity-60 leading-none">App Store</p>
                      <p className="text-sm">Waitlist</p>
                    </div>
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center px-6 py-3 bg-slate-800 text-white border border-slate-700 rounded-xl font-bold transition-all shadow-lg cursor-pointer"
                  >
                    <PlayCircle className="mr-2 w-6 h-6" />
                    <div className="text-left">
                      <p className="text-[10px] uppercase opacity-60 leading-none">Google Play</p>
                      <p className="text-sm">Waitlist</p>
                    </div>
                  </motion.button>
                </div>
              </motion.div>

              {/* Stats Block Footer */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
                {[
                  { label: 'Active Users', val: '5k+', icon: Users },
                  { label: 'Orders', val: '12k+', icon: ShoppingBag },
                  { label: 'Growth', val: '40%', icon: TrendingUp }
                ].map((stat, idx) => (
                  <motion.div 
                    key={`app-stat-${idx}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (idx * 0.05) }}
                    className="flex flex-col"
                  >
                    <div className="flex items-center text-emerald-500 mb-1">
                      <stat.icon size={14} className="mr-1.5" />
                      <span className="text-xl font-bold text-white tracking-tight">{stat.val}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mock Phone Visual Interactive Playground */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-12 lg:mt-0 relative flex justify-center"
            >
              <motion.div 
                animate={isVibrating 
                  ? { 
                      x: [-3, 3, -3, 3, -2, 2, 0], 
                      y: [-1, 1, -1, 1, 0],
                      scale: [0.99, 1.01, 1] 
                    } 
                  : { rotateY: [-4, 4, -4], rotateX: [-1, 1, -1] }
                }
                transition={isVibrating 
                  ? { duration: 0.2, ease: "linear" } 
                  : { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }
                className="relative w-[260px] h-[520px] bg-slate-800 rounded-[2.5rem] border-[6px] border-slate-700 shadow-2xl overflow-hidden shadow-emerald-500/10"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-700 rounded-b-xl z-20" />
                <BatteryIndicator />
                
                <div className="p-5 pt-10 space-y-4 bg-slate-900 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center opacity-40">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20" />
                      <div className="w-8 h-1 bg-slate-700 rounded-full" />
                    </div>

                    <div className="h-32 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 p-4 flex flex-col justify-between">
                       <div className="flex justify-between items-start">
                         <div>
                           <div className="w-12 h-2.5 bg-emerald-500/30 rounded-full mb-1" />
                           <div className="text-[11px] font-bold text-white tracking-tight">Interactive Desk</div>
                         </div>
                         <span className="flex h-2 w-2 relative">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                           <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                         </span>
                       </div>
                       
                       <button
                         onClick={() => {
                           triggerHaptic();
                           document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
                         }}
                         className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-xl text-xs font-black text-center transition-all shadow-lg hover:shadow-emerald-600/20 active:scale-95 cursor-pointer flex items-center justify-center space-x-1.5"
                       >
                         <span>Try Web Demo</span>
                         <span className="text-[10px]">✨</span>
                       </button>
                    </div>

                    {/* Device Options Component Module */}
                    <div className="space-y-2.5 pt-2 border-t border-white/5">
                      <div className="flex items-center space-x-1.5">
                        <Settings size={11} className="text-slate-500" />
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Device Settings</span>
                      </div>

                      {/* Haptic Buzz Setting */}
                      <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Zap size={11} className={hapticEnabled ? "text-amber-400 fill-amber-400/20" : "text-slate-500"} />
                          <div className="text-left">
                            <p className="text-[10px] font-bold text-white leading-none mb-0.5">Haptic Vibe</p>
                            <span className="text-[8px] text-slate-500 font-medium leading-none">Tactile buzz trigger</span>
                          </div>
                        </div>

                        <button
                          onClick={handleToggleHaptic}
                          className={`w-8 h-4.5 rounded-full p-0.5 transition-colors duration-200 cursor-pointer flex items-center ${
                            hapticEnabled ? "bg-emerald-500" : "bg-slate-700"
                          }`}
                        >
                          <motion.div
                            layout
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="w-3.5 h-3.5 rounded-full bg-white shadow-md"
                            style={{
                              marginLeft: hapticEnabled ? "14px" : "0px"
                            }}
                          />
                        </button>
                      </div>

                      {/* Push Alerts Switch Module */}
                      <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Bell size={11} className={notificationsEnabled ? "text-emerald-400 fill-emerald-400/10" : "text-slate-500"} />
                          <div className="text-left">
                            <p className="text-[10px] font-bold text-white leading-none mb-0.5">Push Alerts</p>
                            <span className="text-[8px] text-slate-500 font-medium leading-none">Instant notifications</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setNotificationsEnabled(!notificationsEnabled);
                            triggerHaptic();
                          }}
                          className={`w-8 h-4.5 rounded-full p-0.5 transition-colors duration-200 cursor-pointer flex items-center ${
                            notificationsEnabled ? "bg-emerald-500" : "bg-slate-700"
                          }`}
                        >
                          <motion.div
                            layout
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="w-3.5 h-3.5 rounded-full bg-white shadow-md"
                            style={{
                              marginLeft: notificationsEnabled ? "14px" : "0px"
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* High Fidelity Live Status Feed */}
                  <div className="h-6 relative flex items-center justify-center">
                    <AnimatePresence>
                      {indicatorActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                          className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase flex items-center space-x-1"
                        >
                          <Sparkles size={10} className="animate-spin" />
                          <span>Bzzzt! Triggered</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating Accents */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 top-1/4 p-3 bg-white rounded-xl shadow-xl border border-slate-100 hidden sm:block pointer-events-none"
              >
                <TrendingUp size={16} className="text-emerald-500" />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -left-6 bottom-1/4 p-3 bg-emerald-600 rounded-xl shadow-xl hidden sm:block pointer-events-none"
              >
                <ShoppingBag size={16} className="text-white" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}