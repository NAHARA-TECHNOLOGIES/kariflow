'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle2, Settings, Loader2, Sparkles, Clock, Send } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('weekly');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [showPreferences, setShowPreferences] = useState(false);

  const defaultCategories = [
    { id: '1', name: 'AI in Fashion', slug: 'ai-fashion' },
    { id: '2', name: 'Digital Tools', slug: 'digital-tools' },
    { id: '3', name: 'Business Growth', slug: 'business' },
    { id: '4', name: 'Trend Forecasts', slug: 'trends' }
  ];

  const displayedCategories = categories.length > 0 ? categories : defaultCategories;

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch('/api/newsletter/categories');
        if (response.ok) {
          const fetched = await response.json();
          if (fetched && fetched.length > 0) setCategories(fetched);
        }
      } catch (err) {
        console.warn('Could not pull categories from API, using defaults:', err);
      }
    }
    loadCategories();
  }, []);

  // 🎯 FIXED: Changed lookup filter criteria to check against consistent slugs instead of string titles
  const toggleCategory = (catSlug: string) => {
    setSelectedCategories(prev => 
      prev.includes(catSlug) ? prev.filter(s => s !== catSlug) : [...prev, catSlug]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    if (!showPreferences) {
      setShowPreferences(true);
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, frequency, categories: selectedCategories })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.updated ? 'Your preferences have been updated!' : 'Welcome to the Kariflow inner circle!');
        
        setTimeout(() => {
          setStatus('idle');
          setEmail('');
          setSelectedCategories([]);
          setShowPreferences(false);
        }, 5000);
      } else {
        throw new Error(data.error || 'Server rejected subscription setup parameters.');
      }
    } catch (error) {
      console.error('Newsletter error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-white" id="newsletter">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-teal-50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-emerald-600 rounded-[48px] md:rounded-[64px] p-8 md:p-16 lg:p-24 overflow-hidden relative shadow-2xl shadow-emerald-900/20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full mb-6">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Digital Insights</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                Stay ahead of the <span className="text-white italic font-serif">trend</span>.
              </h2>
              <p className="text-lg text-emerald-50 font-medium max-w-md leading-relaxed">
                Weekly insights on fashion tech and business growth delivered to your inbox. Join 5,000+ artisans masterscaling production.
              </p>

              <div className="mt-12 flex items-center space-x-8">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-emerald-700 overflow-hidden bg-slate-800 relative">
                      {/* 🎯 FIXED: Standardized image layout properties to guarantee production compile safety */}
                      <img
                        src={`https://i.pravatar.cc/150?u=${i + 10}`} 
                        alt="Subscriber avatar" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-white font-black text-sm uppercase tracking-wider">Join the circle</p>
                  <p className="text-emerald-200/70 text-xs font-bold uppercase tracking-widest">Industry leading insights</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] md:rounded-[40px] p-8 md:p-10"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-5">
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors w-6 h-6" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your fashion house email"
                      className="w-full pl-16 pr-6 py-6 bg-white/10 border-2 border-white/10 focus:border-white rounded-3xl text-white font-bold transition-all focus:outline-none placeholder:text-white/40"
                    />
                  </div>

                  <AnimatePresence>
                    {(email.includes('@') || showPreferences) && status !== 'success' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-6 pt-4 border-t border-white/10 overflow-hidden"
                      >
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-emerald-100 uppercase tracking-widest flex items-center">
                            <Clock className="w-3.5 h-3.5 mr-2" /> Frequency
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {([ 'daily', 'weekly' ] as const).map(freq => (
                              <button
                                key={freq}
                                type="button"
                                onClick={() => setFrequency(freq)}
                                className={`py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border-2 ${
                                  frequency === freq 
                                    ? 'bg-white text-emerald-600 border-white' 
                                    : 'bg-transparent text-white border-white/20 hover:border-white/40'
                                }`}
                              >
                                {freq}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-emerald-100 uppercase tracking-widest flex items-center">
                            <Settings className="w-3.5 h-3.5 mr-2" /> Categories
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {displayedCategories.map((cat) => (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => toggleCategory(cat.slug)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                                  selectedCategories.includes(cat.slug)
                                    ? 'bg-white text-emerald-600 border-white'
                                    : 'bg-transparent text-white border-white/20 hover:border-white/40'
                                }`}
                              >
                                {cat.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white text-emerald-600 p-6 rounded-3xl flex items-center space-x-4"
                    >
                      <CheckCircle2 className="w-8 h-8 flex-shrink-0" strokeWidth={2.5} />
                      <p className="font-black text-xs uppercase tracking-widest leading-relaxed">{message}</p>
                    </motion.div>
                  ) : (
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-6 bg-white text-emerald-600 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-emerald-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
                    >
                      {status === 'loading' ? (
                        <Loader2 className="animate-spin w-6 h-6" />
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>{showPreferences ? 'Confirm Membership' : 'Join the Journal'}</span>
                        </>
                      )}
                    </button>
                  )}
                </AnimatePresence>

                {status === 'error' && (
                  <p className="text-white text-[10px] font-black uppercase tracking-widest text-center mt-4">
                    {message}
                  </p>
                )}

                <p className="text-[10px] text-emerald-100 font-bold text-center uppercase tracking-widest opacity-60">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}