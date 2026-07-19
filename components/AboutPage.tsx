"use client";

import { BRAND_NAME, BRAND_DESCRIPTION } from '../constants';
import { motion } from 'framer-motion';
import Image from 'next/image';

function LocalSEO({ title, description }: { title?: string; description?: string }) {
  return (
    <>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
    </>
  );
}

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen text-slate-900">
      <LocalSEO 
        title={`About ${BRAND_NAME} | Digitizing the Tailor's Art`}
        description={BRAND_DESCRIPTION}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Ambient Decorative Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
        
        <div className="mt-20 lg:mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Heading & Branding Quotes */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-8"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                <span>Our Heritage &amp; Vision</span>
              </div>
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-display font-black text-slate-900 tracking-tight leading-[0.95] lg:max-w-md">
                Digitizing the <br />
                <span className="text-emerald-600 italic font-serif">Tailor&apos;s Art</span> <br />
                For the Global Map.
              </h1>

              {/* Stylish Quote Block */}
              <div className="border-l-4 border-emerald-600 pl-6 py-2 space-y-2 lg:max-w-sm hidden lg:block">
                <p className="text-slate-500 italic text-sm font-medium leading-relaxed">
                  &quot;The finest garments are born from the marriage of meticulous craft and unyielding structure.&quot;
                </p>
                <p className="text-slate-900 text-[10px] font-black uppercase tracking-widest">
                  — Kariflow Manifesto
                </p>
              </div>
            </motion.div>

            {/* Right Column: Story Narrative */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7 space-y-12"
            >
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed">
                  {BRAND_NAME} was founded to preserve the precision of the artisan. We believe that the intuition of a master tailor shouldn&apos;t be lost in dusty paper books, but amplified through digital precision.
                </p>
                
                <p className="text-lg text-slate-500 leading-relaxed">
                  In a world of fast fashion, we champion the slow, the bespoke, and the high-quality. We provide the tools for individual designers and boutiques to manage production cycles with the same efficiency as global giants.
                </p>
              </div>

              {/* Mission & Methodology Grid */}
              <div className="grid sm:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
                <div>
                  <h2 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-4">Our Mission</h2>
                  <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                    To provide every local artisan with a &quot;Digital Precision Ledger&quot; that captures measurements, tracks styles, and manages global deliveries without breaking the creative flow.
                  </p>
                </div>
                <div>
                  <h2 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-4">The Methodology</h2>
                  <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                    We don&apos;t just build software; we build a movement. Our &quot;Order Mapping&quot; systems are designed specifically for the chaos of a busy fashion house, turning stress into structure.
                  </p>
                </div>
              </div>

              {/* Interactive Dashboard Metric Banner */}
              <div className="p-8 sm:p-10 rounded-[3rem] bg-emerald-600 text-white relative group overflow-hidden shadow-2xl shadow-emerald-900/20">
                 <div className="absolute top-0 right-0 p-4 opacity-10 translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                    <div className="text-[12rem] font-black italic select-none">K</div>
                 </div>
                 <h3 className="text-2xl font-display font-black mb-4 relative z-10">The Result</h3>
                 <p className="text-emerald-50 text-sm leading-relaxed relative z-10 mb-8 font-semibold">
                    Since our launch, we&apos;ve helped hundreds of artisans move their measurement records from scattered books to a secure digital vault. We&apos;ve synchronized 12,000+ fittings and opened doors for local designers to sell confidently to international markets.
                 </p>
                 <div className="flex flex-wrap items-center gap-4 relative z-10">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-4 border-emerald-600 bg-emerald-800 overflow-hidden relative">
                          <Image 
                            src={`https://i.pravatar.cc/150?u=${i + 20}`} 
                            alt="Artisan partner snapshot" 
                            width={40} 
                            height={40} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-emerald-100 font-black uppercase tracking-widest">Joined by 500+ Studios</p>
                 </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}