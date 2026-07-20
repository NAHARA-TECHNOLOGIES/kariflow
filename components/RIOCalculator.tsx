'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Clock, DollarSign, Zap } from 'lucide-react';

export default function ROICalculator() {
  const [orders, setOrders] = useState<number>(20);
  const [errors, setErrors] = useState<number>(5);

  const timeSaved = orders * 1.5; // 1.5 hours saved per order
  const moneySaved = (errors * 150) + (timeSaved * 25); // $150 per error fix + $25/hr time value

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden" id="calculator">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase tracking-widest border border-emerald-500/20 mb-6">
              <Calculator className="w-3.5 h-3.5 mr-2" />
              Efficiency Calculator
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              Stop Losing <br />
              <span className="text-emerald-500">Time & Money.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 font-medium leading-relaxed">
              Calculate the true cost of manual management. See how much your fashion business could grow when you automate the repetitive tasks.
            </p>

            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-black uppercase tracking-wider text-slate-300">Orders per Month</label>
                  <span className="text-2xl font-black text-emerald-500">{orders}</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="200" 
                  value={orders} 
                  onChange={(e) => setOrders(parseInt(e.target.value) || 0)}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-black uppercase tracking-wider text-slate-300">Errors (Lost Measurements/Late Deliveries)</label>
                  <span className="text-2xl font-black text-rose-500">{errors}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="30" 
                  value={errors} 
                  onChange={(e) => setErrors(parseInt(e.target.value) || 0)}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              key={`time-${timeSaved}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-8 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-4xl font-black text-white mb-2">{Math.round(timeSaved)} hrs</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                Time saved <br />monthly on management
              </p>
            </motion.div>

            <motion.div 
              key={`money-${moneySaved}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-8 rounded-[3rem] bg-emerald-600 text-white shadow-2xl shadow-emerald-500/20"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center mb-6">
                <DollarSign className="w-6 h-6" />
              </div>
              <p className="text-4xl font-black text-white mb-2">${moneySaved.toLocaleString()}</p>
              <p className="text-xs font-bold text-white/70 uppercase tracking-widest leading-relaxed">
                Potential annual <br />profit increase
              </p>
            </motion.div>

            <div className="md:col-span-2 p-8 rounded-[3rem] bg-slate-800 border border-slate-700">
               <div className="flex items-center space-x-4 mb-4">
                 <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                   <Zap className="w-5 h-5 text-white fill-current" />
                 </div>
                 <h4 className="text-lg font-bold">Scaling Opportunity</h4>
               </div>
               <p className="text-slate-400 text-sm font-medium leading-relaxed">
                 By saving <span className="font-bold text-white">{Math.round(timeSaved)} hours</span> every month, you could fulfill an additional <span className="font-bold text-white">{Math.round(orders * 0.4)} orders</span> without increasing your staff costs.
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}