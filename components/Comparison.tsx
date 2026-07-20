"use client";

import { motion } from 'framer-motion';
import { X, Check, ArrowRight, ShieldCheck, Activity } from 'lucide-react';

const COMPARISON = [
  { feature: "Measurement Records", old: "Dusty Paper Books", new: "Precise digital notebook" },
  { feature: "Order Tracking", old: "Memory & Phone Calls", new: "Real time order mapping & tracking" },
  { feature: "Artisan Feedback", old: "Delayed Guesswork", new: "Automated and instant reports" },
  { feature: "Workshop Speed", old: "Manual Bottlenecks", new: "Task mapping & team management" },
  { feature: "Global Standards", old: "Local Limitation", new: "Global standard quality scale" },
  { feature: "Client Trust", old: "Fragile Communication", new: "All in one communication sync" },
];

export default function Comparison() {
  return (
    <section className="py-24 bg-white overflow-hidden relative border-t border-slate-100" id="compare">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-bold uppercase tracking-widest mb-6"
          >
            <ShieldCheck size={12} />
            <span>The Kariflow Advantage</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight">
             Traditional shops vs. <span className="text-emerald-600 italic">Kariflow enabled studio</span>
          </h2>
        </div>

        <div className="relative overflow-x-auto custom-scrollbar">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-3 gap-8 mb-8 px-8 border-b border-slate-100 pb-6">
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Core Benchmark</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-rose-500/60">Legacy Tailor</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-600">Kariflow Artisans</div>
            </div>

            <div className="space-y-4">
              {COMPARISON.map((item, i) => (
                <motion.div
                  key={item.feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="grid grid-cols-3 gap-8 p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 group transition-all duration-300"
                >
                  <div className="font-display font-black text-slate-900 flex items-center tracking-tight">
                    {item.feature}
                  </div>
                  <div className="flex items-center text-slate-500 text-sm font-medium italic">
                    <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mr-3 shrink-0">
                      <X size={12} />
                    </div>
                    {item.old}
                  </div>
                  <div className="flex items-center text-emerald-600 font-bold text-sm tracking-tight">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3 shrink-0 group-hover:scale-110 transition-transform">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    {item.new}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-16 flex justify-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-1 rounded-3xl bg-emerald-50 border border-emerald-100"
          >
            <div className="px-8 py-5 rounded-2xl bg-white shadow-2xl flex items-center space-x-6 border border-emerald-50">
              <div className="text-xs font-bold text-slate-400 italic flex items-center">
                <Activity size={14} className="mr-2 text-emerald-500 animate-pulse" />
                &quot;Kariflow gave my workshop the structure we needed to focus on craft, not stress.&quot;
              </div>
              <div className="h-4 w-px bg-slate-100"></div>
              <a href="/contact" className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest hover:underline flex items-center group">
                Scale Your Studio <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}