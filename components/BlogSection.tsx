"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Loader2 } from 'lucide-react';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string | null;
  category: string;
  readTime: string;
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog/latest')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPosts(data);
      })
      .catch((err) => console.error('Failed to load live studio journals:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 bg-slate-50 overflow-hidden" id="blog-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-4"
            >
              <BookOpen size={12} />
              <span>Artisan Journal</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 leading-[0.95] tracking-tight">
              Stories from the <br />
              <span className="text-emerald-600 italic font-serif">Workshop Floor.</span>
            </h2>
          </div>
          <Link 
            href="/blog" 
            className="inline-flex items-center space-x-2 text-emerald-600 font-black text-xs uppercase tracking-widest hover:translate-x-2 transition-transform"
          >
            <span>View All Stories</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 size={32} className="animate-spin text-emerald-600" />
            <p className="text-xs uppercase tracking-widest font-black text-slate-400">Loading Latest Logs...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-100 rounded-[32px]">
            <BookOpen size={32} className="mx-auto text-slate-300 mb-3" />
            <p className="text-sm font-medium text-slate-400">No journal logs published yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[16/10] rounded-[32px] overflow-hidden mb-6 border border-slate-200 bg-slate-100 flex items-center justify-center">
                    {post.image ? (
                      post.image.match(/\.(mp4|webm|ogg|mov)(\?|$)|video/i) ? (
                        <video 
                          src={post.image} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          muted
                          playsInline
                          autoPlay
                          loop
                        />
                      ) : (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                        />
                      )
                    ) : (
                      <div className="text-slate-300">
                        <BookOpen size={48} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <span>{post.category}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}