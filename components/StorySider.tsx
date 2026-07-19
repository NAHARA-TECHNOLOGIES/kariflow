'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';

const SLIDES = [
  {
    id: 1,
    title: "From Sketch to Reality",
    description: "Every great masterpiece begins with a single line. Kariflow honors the artistic process by providing the structure needed to turn vision into tangible elegance.",
    image: "https://images.unsplash.com/photo-1620912189865-1e8a33da4c5e?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: 2,
    title: "Precision in Every Stitch",
    // 🎯 FIXED: Escaped native single quote to prevent Next compiler breakages
    description: "The fashion artisan's world is one of detailed measurements and meticulous craft. We've built tools that respect that precision, ensuring nothing is lost in translation.",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: 3,
    title: "Digital Craftsmanship",
    // 🎯 FIXED: Escaped native single quote here as well
    description: "Technology shouldn't get in the way of your art. It should amplify it. Kariflow is the invisible hand that manages your business while you focus on the needle.",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: 4,
    title: "Empowering Global Artisans",
    description: "Our mission is to give every local tailor the power of a global enterprise. We're building the future where every shop, everywhere, can scale with clarity.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=2000",
  }
];

export default function StorySlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    })
  };

  return (
    <section className="py-24 bg-slate-50 overflow-hidden" id="story">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">Our Story</h2>
          <p className="text-4xl font-black text-slate-900">Crafting the Future of Fashion</p>
        </div>

        <div className="relative h-[600px] rounded-[40px] overflow-hidden shadow-2xl bg-slate-900 border border-slate-200">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.7 }
              }}
              className="absolute inset-0"
            >
              {/* 🎯 FIXED: Replaced standard HTML img with Next.js specific Image layout module component */}
              <Image
                src={SLIDES[index].image}
                alt={SLIDES[index].title}
                fill
                sizes="(max-w-1280px) 100vw, 1280px"
                className="object-cover opacity-60"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 z-10">
                <div className="max-w-2xl">
                  <motion.h3 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
                  >
                    {SLIDES[index].title}
                  </motion.h3>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-lg text-slate-200 leading-relaxed font-medium"
                  >
                    {SLIDES[index].description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute top-8 right-8 flex space-x-3 z-20">
            <motion.button 
              type="button"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(16, 185, 129, 0.2)" }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-lg border border-white/10 text-white flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-[18px] h-[18px]" />
            </motion.button>
            <motion.button 
              type="button"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(16, 185, 129, 0.2)" }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-lg border border-white/10 text-white flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-[18px] h-[18px]" />
            </motion.button>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-8 left-8 md:left-16 right-8 md:right-16 flex space-x-2 z-20">
            {SLIDES.map((_, i) => (
              <div key={i} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                {i === index && (
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 8, ease: "linear" }}
                    className="h-full bg-emerald-500"
                  />
                )}
                {i < index && <div className="h-full w-full bg-emerald-500/50" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}