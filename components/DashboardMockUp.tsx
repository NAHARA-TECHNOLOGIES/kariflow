"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  MessageSquare, 
  FileText, 
  Download, 
  Scissors,
  Send,
  Zap,
  Box
} from 'lucide-react';

export default function DashboardMockup() {
  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-w-4xl mx-auto w-full">
      {/* App Header Bar */}
      <div className="bg-slate-50/70 px-6 py-4 border-b border-slate-100 flex justify-between items-center select-none">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-rose-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
          <div className="ml-4 flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <Scissors size={12} className="text-emerald-600" />
            <span>Kariflow / Main Workshop</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-[10px] text-emerald-700 font-bold shadow-sm">
              SS
            </div>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">Smart S.</span>
          </div>
        </div>
      </div>

      {/* Main Structural Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px] h-[580px]">
        
        {/* Left Workspace Block Panel (8 Columns) */}
        <div className="md:col-span-7 lg:col-span-8 p-6 md:p-8 overflow-y-auto custom-scrollbar border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <div className="inline-flex items-center space-x-2 px-2 py-0.5 rounded bg-amber-50 text-amber-600 text-[10px] font-black uppercase border border-amber-100 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span>Fitting Today</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Aisha's Bridal Gown</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Deadline: June 15, 2026</p>
              </div>
              <div className="text-right select-none">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="transparent" stroke="#f1f5f9" strokeWidth="5" />
                    <motion.circle 
                      cx="32" 
                      cy="32" 
                      r="28" 
                      fill="transparent" 
                      stroke="#059669" 
                      strokeWidth="5" 
                      strokeDasharray="175.9" 
                      initial={{ strokeDashoffset: 175.9 }}
                      animate={{ strokeDashoffset: 44 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </svg>
                  <span className="absolute text-xs font-black text-slate-900">75%</span>
                </div>
              </div>
            </div>

            {/* Micro Pipeline Step Indicators */}
            <div className="grid grid-cols-5 gap-2 py-5 border-y border-slate-100 select-none">
              {['Measure', 'Cut', 'Sew', 'Fitting', 'Finalize'].map((step, i) => (
                <div key={`step-${i}`} className="text-center group cursor-pointer">
                  <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center transition-all duration-300 text-[11px] font-bold ${
                    i < 3 ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 
                    i === 3 ? 'border-2 border-emerald-600 text-emerald-600 font-black' : 'border border-slate-200 text-slate-300'
                  }`}>
                    {i < 3 ? <CheckCircle2 size={14} strokeWidth={2.5} /> : <span>{i + 1}</span>}
                  </div>
                  <p className={`text-[9px] font-black uppercase tracking-tight ${i <= 3 ? 'text-slate-800' : 'text-slate-300'}`}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Subtask Cards Modules */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center select-none">
                <Zap size={14} className="text-amber-500 mr-2" />
                Workshop Tasks
              </h4>
              <button className="text-[10px] text-emerald-600 hover:text-emerald-700 transition-colors font-black uppercase cursor-pointer">
                View Board
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-black text-emerald-600 uppercase tracking-wider">In Sewing</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Abebe</span>
                </div>
                <h5 className="text-sm font-black text-slate-900 mb-1">Lace Embroidery</h5>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Fine lace detailing on the sleeves and train.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] font-black text-amber-600 uppercase tracking-wider">Urgent</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Ada</span>
                  </div>
                  <h5 className="text-sm font-black text-slate-900 mb-1">Padding & Lining</h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Internal structure and silk lining application.</p>
                </div>
                <button className="mt-3 w-full py-2 rounded-xl bg-emerald-50 text-emerald-600 text-[10px] font-black hover:bg-emerald-100 transition-all uppercase tracking-wider cursor-pointer">
                  Mark Done
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Chat Stream & Files Area (4 Columns) */}
        {/* 🎯 FIXED: Locked parent wrapper properties to clean layouts inside fixed window bounds */}
        <div className="md:col-span-5 lg:col-span-4 bg-slate-50/50 flex flex-col h-full overflow-hidden">
          
          {/* Real-time Message Stream Block */}
          <div className="flex-1 flex flex-col p-5 overflow-hidden">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center select-none">
              <MessageSquare size={12} className="mr-2" />
              Shop Stream
            </div>
            
            {/* 🎯 FIXED: Forced absolute interior flex box layout limits with scroll handling */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-4 mb-4 custom-scrollbar">
              <div className="flex space-x-2.5 items-start">
                {/* 🎯 FIXED: Center-aligned avatar strings nodes natively */}
                <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-slate-600">
                  K
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm max-w-[85%]">
                  <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                    Aisha sent the remaining fabric for the veil. It's in the bin.
                  </p>
                  <span className="text-[8px] text-slate-400 mt-1 block uppercase font-bold tracking-tight">Kosi • 10:42 AM</span>
                </div>
              </div>
              
              <div className="flex space-x-2.5 items-start flex-row-reverse space-x-reverse">
                <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white">
                  ME
                </div>
                <div className="bg-emerald-600 p-3 rounded-2xl rounded-tr-none shadow-md max-w-[85%]">
                  <p className="text-[11px] text-white font-medium leading-relaxed">
                    Perfect. Let's start the cutting phase by 2PM.
                  </p>
                  <span className="text-[8px] text-white/60 mt-1 block text-right uppercase font-bold tracking-tight">You • 10:45 AM</span>
                </div>
              </div>
            </div>

            {/* Message Action Input Dock */}
            <div className="relative mt-auto">
              <input 
                placeholder="Message your team..." 
                className="w-full bg-white border border-slate-200 focus:border-emerald-600 rounded-xl pl-3 pr-9 py-2.5 text-[11px] text-slate-900 focus:outline-none shadow-sm transition-colors"
              />
              <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer">
                <Send size={13} />
              </button>
            </div>
          </div>

          {/* Assets & Specification Sub-dock */}
          <div className="p-5 border-t border-slate-100 bg-slate-50">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center select-none">
              <Box size={12} className="mr-2" />
              Inventory
            </div>
            <div className="space-y-2">
              {[
                { name: 'Bridal_Satin_White.pdf', type: 'Measurements' },
                { name: 'Pattern_Draft_v4.jpg', type: 'Design' }
              ].map((file, i) => (
                <div key={`file-${i}`} className="flex justify-between items-center p-2.5 rounded-xl bg-white border border-slate-100 hover:border-emerald-200 transition-colors cursor-pointer shadow-sm group">
                  <div className="flex items-center space-x-2.5 overflow-hidden">
                    <div className="w-7 h-7 flex items-center justify-center bg-slate-50 group-hover:bg-emerald-50 rounded-lg flex-shrink-0 transition-colors">
                      <FileText size={13} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-black text-slate-900 truncate">{file.name}</p>
                      <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">{file.type}</p>
                    </div>
                  </div>
                  <button className="p-1 text-slate-400 hover:text-emerald-600 rounded transition-colors cursor-pointer">
                    <Download size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}