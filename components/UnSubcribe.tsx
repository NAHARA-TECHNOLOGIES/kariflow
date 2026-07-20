'use client';

import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle2, AlertTriangle, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BRAND_NAME } from '../constants';

// 🎯 NOTE: Metadata generation is handled at the page/layout wrapper level, 
// so we don't need to import constructMetadata directly inside this client block.

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(() => {
    const emailParam = searchParams.get('email');
    return emailParam?.trim().toLowerCase() ?? '';
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setErrorMessage(data.error || 'Failed to process your request. Please try again or contact support.');
      }
    } catch (err) {
      console.error('Unsubscribe error:', err);
      setErrorMessage('A network error occurred. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen text-slate-900 flex items-center justify-center">
      {/* 🎯 FIXED: Removed the old legacy <SEO /> tag entirely */}
      <div className="max-w-md w-full mx-auto px-6 relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full -z-10 animate-pulse pointer-events-none"></div>

        <div className="bg-slate-50 p-8 sm:p-10 rounded-[3rem] border border-slate-100 shadow-3xl overflow-hidden">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="unsubscribe-confirm"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-rose-500 animate-pulse">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight mb-2">
                    Leave the Circle?
                  </h1>
                  <p className="text-slate-500 text-sm font-semibold">
                    We&apos;re sad to see you go. Opt-out of the {BRAND_NAME} weekly crafts and strategic updates digest below.
                  </p>
                </div>

                <form onSubmit={handleUnsubscribe} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">
                      Your Registered Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:border-emerald-600 transition-all font-bold text-sm text-slate-950"
                        placeholder="adebayo@luxurybrand.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    </div>
                  </div>

                  {errorMessage && (
                    <p className="text-rose-500 text-xs font-black text-center uppercase tracking-widest leading-relaxed">
                      {errorMessage}
                    </p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm uppercase tracking-[0.15em] shadow-lg shadow-rose-600/10 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:hover:bg-rose-600"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <span>Unsubscribe Completely</span>
                    )}
                  </motion.button>
                </form>

                <div className="text-center pt-2">
                  <Link
                    href="/"
                    className="inline-flex items-center space-x-2 text-xs font-black text-emerald-600 hover:text-emerald-700 uppercase tracking-widest group"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    <span>Back to Kariflow Home</span>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="unsubscribe-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-4"
              >
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-100">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
                  Unsubscribed
                </h1>
                
                <p className="text-slate-500 text-sm font-semibold leading-relaxed">
                  You&apos;ve been successfully removed from our digest. Your inbox won&apos;t be troubled further. You&apos;re welcome back to register your preferences at any time!
                </p>

                <div className="pt-4">
                  <Link
                    href="/"
                    className="px-8 py-4 rounded-xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors inline-block"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        </div>
      }
    >
      <UnsubscribeContent />
    </Suspense>
  );
}