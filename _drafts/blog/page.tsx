import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, User, Clock, Loader2, ChevronDown, Filter, Check, FileText } from 'lucide-react';

import { constructMetadata } from '@/components/SEO';

// 🎯 FIXED: Next.js native metadata orchestration lifecycle hook
export const generateMetadata = () => {
  return constructMetadata({
    title: 'Blog Journal',
    description: 'Insights, stories, and updates from the modern artisan fashion ecosystem.',
  });
};

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
}

const DUMMY_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Evolution of the Digital Precision Ledger',
    excerpt: 'How modern tailoring studios are transitioning away from scattered physical paper measurement notebooks.',
    date: 'July 12, 2026',
    author: 'Kariflow Team',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2',
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header Section */}
        <div className="mb-12 border-b border-slate-900 pb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4">
            <span>Journal &amp; Insights</span>
          </div>
          <h1 className="font-display text-4xl font-black md:text-5xl lg:text-6xl tracking-tight">
            Stories from the <span className="text-emerald-400 italic font-serif font-normal">Workshop</span>
          </h1>
        </div>

        {/* Blog Post Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DUMMY_POSTS.map((post) => (
            <article key={post.id} className="group relative rounded-3xl border border-slate-900 bg-slate-900/40 p-6 transition-all hover:border-emerald-500/30 overflow-hidden">
              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-slate-800 relative mb-6">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center space-x-4 text-xs text-slate-500 mb-3">
                <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-3 line-clamp-2 text-slate-100 group-hover:text-emerald-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-slate-400 line-clamp-3 mb-6 leading-relaxed">
                {post.excerpt}
              </p>
              <Link href={`/blog/${post.id}`} className="inline-flex items-center text-xs font-black uppercase tracking-widest text-emerald-400 gap-2 group-hover:underline">
                Read Article <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}