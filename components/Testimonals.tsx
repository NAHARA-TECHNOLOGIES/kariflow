'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'framer-motion';
import { Quote, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const TESTIMONIALS = [
  {
    name: "Adebayo Olawale",
    role: "Proprietor, Heritage Stitches",
    quote: "Moving our measurement books to Kariflow changed everything. We no longer spend hours searching for a client's old record. It's all there, instantly.",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Adebayo"
  },
  {
    name: "Kofi Mensah",
    role: "Founder, Accra Bespoke",
    quote: "The ability to track orders through different workshop stages has reduced our delivery delays by 40%. Our clients love the transparency.",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Kofi"
  },
  {
    name: "Ify Okafor",
    role: "Creative Director, Ify Couture",
    quote: "Kariflow handles the logistics so I can focus on the design. It's like having a dedicated project manager for every single dress I make.",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Ify"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white text-slate-900 overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
             <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-4"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Verified Artisan Partners</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-display font-black leading-[0.95] tracking-tight">
              Trusted by the Next <br />
              <span className="text-emerald-600 italic font-serif">Generation of Designers.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 relative flex flex-col justify-between hover:bg-white hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 group"
            >
              <Quote className="absolute top-10 right-10 w-10 h-10 text-emerald-600/10 group-hover:text-emerald-600/20 transition-all" />
              
              {/* 🎯 FIXED: Escaped quotes using clean string interpolation to secure the Next build */}
              <p className="text-lg font-medium text-slate-600 mb-10 italic leading-relaxed relative z-10">
                {"\""}{t.quote}{"\""}
              </p>
              
              <div className="flex items-center space-x-4 border-t border-slate-200 pt-8">
                <div className="relative w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 overflow-hidden flex-shrink-0">
                  {/* 🎯 FIXED: Replaced standard img with Next.js optimized Image layout */}
                  <Image 
                    src={t.image} 
                    alt={t.name} 
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-display font-black text-slate-900 text-sm">{t.name}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}