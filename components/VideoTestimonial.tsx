'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, ChevronRight, Quote, X } from 'lucide-react';
import Image from 'next/image';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Aisha Bakare",
    role: "Lead Designer, Aisha Couture",
    location: "Lagos, Nigeria",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    quote: "Kariflow changed how we handle bridal orders. No more missing measurements."
  },
  {
    id: 2,
    name: "Kofi Mensah",
    role: "Founder, K.M. Bespoke",
    location: "Accra, Ghana",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    quote: "The profit tracking gives me peace of mind. I know exactly what I'm making on every suit."
  }
];

export default function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const activeItem = TESTIMONIALS.find(t => t.id === activeVideo);

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden" id="testimonials">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest mb-6"
            >
              Real Stories
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-white leading-tight"
            >
              Artisans growing with <br />
              <span className="text-emerald-400">Kariflow.</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-2 text-slate-400 font-bold"
          >
            <div className="flex -space-x-3 mr-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                  <Image 
                    src={`https://i.pravatar.cc/150?u=${i+10}`} 
                    alt="User avatar" 
                    fill 
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <span>Join 500+ professionals</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group relative bg-slate-800/50 rounded-[40px] overflow-hidden border border-slate-700/50 backdrop-blur-xl"
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Video/Thumbnail Side */}
                <div className="md:w-1/2 relative aspect-video md:aspect-auto min-h-[240px]">
                  <div 
                    className="absolute inset-0 cursor-pointer z-10"
                    onClick={() => setActiveVideo(item.id)}
                  >
                    <Image
                      src={item.thumbnail}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-102"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center z-20">
                      <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 ml-1 text-white fill-current" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="md:w-1/2 p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex text-emerald-400 mb-6">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 mr-1 text-emerald-400 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-10 h-10 text-emerald-500/20 mb-4" />
                    <p className="text-xl font-bold text-white mb-8 leading-relaxed italic">
                      {"\""}{item.quote}{"\""}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-black text-white">{item.name}</h4>
                    <p className="text-sm font-medium text-emerald-400 mb-1">{item.role}</p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{item.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="inline-flex items-center space-x-2 text-slate-400 hover:text-emerald-400 font-black text-sm uppercase tracking-widest transition-colors group">
            <span>View All artisan stories</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Floating Video Popup */}
      <AnimatePresence>
        {activeVideo && activeItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -50, y: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -50, y: 50 }}
            className="fixed bottom-8 left-8 z-[100] w-72 md:w-96 bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          >
            <div className="relative aspect-video bg-black">
              <iframe
                src={`${activeItem.videoUrl}?autoplay=1`}
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={activeItem.name}
              ></iframe>
              <div className="absolute top-2 right-2 flex space-x-2 z-10">
                <button 
                  onClick={() => setActiveVideo(null)}
                  className="p-1.5 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-md transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="p-4 bg-slate-800/95 backdrop-blur-xl border-t border-white/5 flex items-center justify-between">
              <div>
                <p className="text-white text-xs font-black uppercase tracking-widest">{activeItem.name}</p>
                <p className="text-emerald-400 text-[10px] font-bold">{activeItem.role}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Star className="w-3 h-3 text-emerald-400 fill-current" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}