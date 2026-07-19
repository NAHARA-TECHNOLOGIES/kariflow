'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Loader2,
  Link2,
  Check,
  Share2,
  FileText
} from 'lucide-react';

import {
  FaFacebook,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaXTwitter
} from 'react-icons/fa6';
import Link from 'next/link';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string | null;
  category: string;
  readTime: string;
  author: string;
  date: string;
  tags: string[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Newsletter Pipeline State
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showPreferences, setShowPreferences] = useState(false);
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('weekly');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const defaultCategories = [
    { id: '1', name: 'AI in Fashion', slug: 'ai-fashion' },
    { id: '2', name: 'Digital Tools', slug: 'digital-tools' },
    { id: '3', name: 'Business Growth', slug: 'business' }
  ];
  const displayedCategories = categories.length > 0 ? categories : defaultCategories;

  // Sync Content & Taxonomy Engines
  useEffect(() => {
    if (!slug) return;

    Promise.all([
      fetch(`/api/blog/${slug}`).then((res) => (res.ok ? res.json() : null)),
      fetch('/api/categories').then((res) => (res.ok ? res.json() : []))
    ])
      .then(([blogPayload, categoryPayload]) => {
        if (blogPayload?.post) {
          setPost(blogPayload.post);
          setRelated(blogPayload.relatedStories || []);
        } else {
          router.replace('/blog');
        }
        if (Array.isArray(categoryPayload) && categoryPayload.length > 0) {
          setCategories(categoryPayload);
        }
      })
      .catch((err) => console.error('Data pipeline linkage failure:', err))
      .finally(() => setLoading(false));
  }, [slug, router]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
      </div>
    );
  }

  if (!post) return null;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    if (!showPreferences) {
      setShowPreferences(true);
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, frequency, categories: selectedCategories }),
      });

      if (!res.ok) throw new Error();

      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setEmail('');
        setShowPreferences(false);
      }, 4000);
    } catch {
      setStatus('error');
    }
  };

  const shareLinks = {
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="inline-flex items-center text-slate-400 hover:text-emerald-600 font-bold text-sm mb-12 transition-colors group">
          <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Journal
        </Link>
        
        <header className="mb-12">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100 mb-6">
            {post.category}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm font-bold border-y border-slate-50 py-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mr-3">
                <User size={16} />
              </div>
              <div>
                <span className="block text-slate-900">{post.author}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-60">Author</span>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar size={18} className="mr-3 opacity-60" />
              <div>
                <span className="block text-slate-900">{post.date}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-60">Published</span>
              </div>
            </div>
            <div className="flex items-center">
              <Clock size={18} className="mr-3 opacity-60" />
              <div>
                <span className="block text-slate-900">{post.readTime}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-60">Estimated Read</span>
              </div>
            </div>
          </div>
        </header>

        <div className="relative aspect-[21/9] rounded-[40px] overflow-hidden mb-16 shadow-2xl shadow-emerald-900/10 bg-slate-50 flex items-center justify-center text-slate-300">
          {post.image ? (
            post.image.match(/\.(mp4|webm|ogg|mov)(\?|$)|video/i) ? (
              <video src={post.image} className="w-full h-full object-cover" controls autoPlay muted loop playsInline />
            ) : (
        <img
          src={`${s.image}?auto=format&fit=crop&w=600&q=80`}
          alt={s.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />            )
          ) : (
            <FileText size={64} className="opacity-20" />
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <article className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-p:text-slate-600 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50/50 prose-blockquote:rounded-2xl prose-blockquote:p-6 italic prose-img:rounded-3xl">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              {post.tags && post.tags.length > 0 && (
                <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-xs font-bold">#{tag}</span>
                  ))}
                </div>
              )}
            </article>

            <div className="mt-16 pt-8 border-t border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                  <Share2 size={16} />
                </div>
                <div className="text-sm font-black text-slate-900 uppercase tracking-widest">Share this post</div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a href={shareLinks.x} target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all group">
                  <FaTwitter size={18} className="group-hover:scale-110 transition-transform" />
                </a>
                <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all group">
                  <FaFacebook size={18} className="group-hover:scale-110 transition-transform" />
                </a>
                <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all group">
                  <FaLinkedinIn size={18} className="group-hover:scale-110 transition-transform" />
                </a>
                <button onClick={handleCopyLink} className={`flex items-center space-x-2 px-5 py-3 rounded-2xl transition-all font-bold text-xs ${copied ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white'}`}>
                  {copied ? <><Check size={14} /><span>Copied!</span></> : <><Link2 size={14} /><span>Copy Link</span></>}
                </button>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-12">
            {related.length > 0 && (
              <div className="bg-slate-50 rounded-[32px] p-8">
                <h3 className="text-xl font-black text-slate-900 mb-6">Related Stories</h3>
                <div className="space-y-6">
                  {related.map(story => (
                    <Link key={story.id} href={`/blog/${story.slug}`} className="group block">
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">{story.category}</p>
                      <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug line-clamp-2">{story.title}</h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-emerald-600 rounded-[32px] p-8 text-white">
              <h3 className="text-2xl font-black mb-4 leading-tight">Stay ahead of the <span className="italic font-serif">trend</span>.</h3>
              <form className="space-y-6" onSubmit={handleNewsletterSubmit}>
                <input 
                  type="email" required placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/60 text-sm font-bold focus:outline-hidden"
                />
                <AnimatePresence>
                  {showPreferences && status !== 'success' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-6 pt-4 border-t border-white/10 overflow-hidden">
                      <div className="space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100">Frequency</p>
                        <div className="grid grid-cols-2 gap-3">
                          {(['daily', 'weekly'] as const).map(f => (
                            <button key={f} type="button" onClick={() => setFrequency(f)} className={`py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border-2 ${frequency === f ? 'bg-white text-emerald-600' : 'border-white/20 text-white'}`}>{f}</button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100">Interests</p>
                        <div className="flex flex-wrap gap-2">
                          {displayedCategories.map(cat => (
                            <button
                              key={cat.id} type="button" 
                              onClick={() => setSelectedCategories(prev => prev.includes(cat.name) ? prev.filter(c => c !== cat.name) : [...prev, cat.name])}
                              className={`px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border-2 ${selectedCategories.includes(cat.name) ? 'bg-white text-emerald-600' : 'border-white/20 text-white'}`}
                            >
                              {cat.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <button type="submit" disabled={status === 'loading'} className="w-full py-4 bg-white text-emerald-600 font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center">
                  {status === 'loading' ? <Loader2 className="animate-spin" size={18} /> : status === 'success' ? 'Joined!' : 'Join the Journal'}
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}