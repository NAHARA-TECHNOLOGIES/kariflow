"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'framer-motion';
import { CreditCard, Wallet, TrendingUp } from 'lucide-react';

export default function FutureVision() {
  const visions = [
    {
      title: 'Credit Scoring for Loans',
      description: 'Use your business data as a credit score to access expansion loans from agents.',
      icon: CreditCard,
    },
    {
      title: 'Automated Savings',
      description: 'Set custom targets to automatically save a portion of every profit you earn.',
      icon: Wallet,
    },
    {
      title: 'Growth Analytics',
      description: 'Deep insights into your most profitable styles and busiest seasons to help you scale.',
      icon: TrendingUp,
    },
  ];

  const values = [
    { name: 'Customer-centric', desc: 'The artisan first, her structure and her systems.' },
    { name: 'Adaptability', desc: 'We adapt to changing times and technology.' },
    { name: 'Digitalization', desc: 'We believe in digitizing the workflow of traditional artisans.' },
    { name: 'Team work', desc: 'We believe that collective effort is paramount to every endeavor.' },
    { name: 'Optimism', desc: 'We do not give up even in challenging times.' }
  ];

  return (
    <section className="py-24 bg-white text-slate-900 overflow-hidden relative" id="future">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Mission Section */}
        <div className="mb-24 text-center">
          <span className="text-emerald-600 font-black tracking-widest uppercase text-xs">Our Mission</span>
          <p className="text-3xl md:text-4xl font-bold mt-6 tracking-tight max-w-3xl mx-auto">
            To make it easy for African artisans to grow and scale their businesses.
          </p>
        </div>

        {/* Vision Section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-24 gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-emerald-600 font-black tracking-widest uppercase text-xs">Our Vision (Next 10 Years)</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 leading-tight tracking-tight">
              We aspire to be an all-in-one <br /> 
              <span className="text-emerald-600 italic font-display">operating system for artisans.</span>
            </h2>
          </div>
          <div className="max-w-md w-full bg-slate-50 p-8 rounded-[30px] border border-slate-100">
            <ul className="text-slate-700 text-sm leading-relaxed font-medium space-y-3">
              <li className="flex items-start"><span className="text-emerald-500 mr-2">•</span>We aim to help artisans digitize their workflow</li>
              <li className="flex items-start"><span className="text-emerald-500 mr-2">•</span>Help 25 million artisans scale their businesses</li>
              <li className="flex items-start"><span className="text-emerald-500 mr-2">•</span>To lead the financial ecosystem of Africa’s artisans</li>
              <li className="flex items-start"><span className="text-emerald-500 mr-2">•</span>Create 5 million jobs by 2036</li>
            </ul>
          </div>
        </div>

        {/* Core Capabilities / Roadmap Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-28">
          {visions.map((v, i) => (
            <motion.div
              key={`vision-item-${v.title}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="p-8 rounded-[40px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 group"
            >
              <div 
                className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500"
              >
                <v.icon size={28} />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">{v.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{v.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Core Values Section */}
        <div className="border-t border-slate-100 pt-20">
          <div className="text-center mb-12">
            <span className="text-emerald-600 font-black tracking-widest uppercase text-xs">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">The Principles Driving Kariflow</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((val, idx) => (
              <motion.div
                key={`value-${idx}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors"
              >
                <p className="text-slate-600 text-xs leading-relaxed font-medium">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}