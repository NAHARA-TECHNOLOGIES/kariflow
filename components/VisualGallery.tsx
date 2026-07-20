'use client';

import { motion, Variants } from 'framer-motion';
import { Camera, Ruler, Users, ShoppingBag, Sparkles } from 'lucide-react';
import Image from 'next/image';

const SNAPSHOTS = [
  {
    title: "Digital Studio",
    desc: "Your shop, in your pocket.",
    image: "/assets/Studio.webp",
    icon: Sparkles
  },
  {
    title: "Happy Staffs",
    desc: "Instant WhatsApp joy.",
    image: "/assets/Happycustmers.webp",
    icon: Users
  },
  {
    title: "Perfect Fit",
    desc: "Records that never fail.",
    image: "/assets/Measurements.webp",
    icon: Ruler
  },
  {
    title: "Global Growth",
    desc: "Scaling your craft.",
    image: "/assets/Growth.webp",
    icon: ShoppingBag
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 20 
    }
  }
};

export default function VisualGallery() {
  return (
    <section className="py-24 bg-white overflow-hidden" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-widest border border-emerald-100 mb-6"
            >
              <Camera className="w-3.5 h-3.5 mr-2" />
              Visual Guide
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
              How It <span className="text-emerald-600 italic font-serif">Looks</span>
            </h2>
          </div>
          <div className="max-w-md w-full text-center md:text-left">
            <p className="text-slate-500 text-xl font-medium italic leading-relaxed">
              "A picture is worth a thousand orders." See how Kariflow transforms the life of an artisan.
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SNAPSHOTS.map((s) => (
            <motion.div
              key={s.title}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative aspect-[3/4] rounded-[3rem] overflow-hidden group cursor-pointer border border-slate-100 bg-slate-50 will-change-transform shadow-sm hover:shadow-xl transition-shadow duration-500"
            >
              <Image
            src={s.image}
            alt={s.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105 bg-emerald-100" // Added background color
            onError={(e) => {
              console.error(`Error loading image: ${s.image}`);
            }}
          />
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-8 flex flex-col justify-end z-10">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-lg shadow-emerald-500/20">
                  <s.icon className="w-5 h-5" />
                </div>
                <h4 className="text-2xl font-black text-white mb-2 tracking-tight">{s.title}</h4>
                <p className="text-slate-300 font-bold text-sm tracking-tight">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}