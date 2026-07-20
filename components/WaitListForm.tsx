'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown, Activity, Send } from 'lucide-react';
import { getCachedLocation } from '../libs/location';
import { BRAND_NAME } from '../constants';

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    businessType: 'designer' as 'designer' | 'brand' | 'tailor',
    country: '',
    state: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    const autofillLocation = async () => {
      setIsLocating(true);
      try {
        const location = await getCachedLocation();
        if (location) {
          const country = typeof location.country === 'string' ? location.country : (location.country && typeof (location as any).country === 'string' ? (location as any).country : '');
          const region = typeof location.region === 'string' ? location.region : (location.region && typeof (location as any).region === 'string' ? (location as any).region : '');

          setFormData(prev => ({
            ...prev,
            country: prev.country || country,
            state: prev.state || region,
          }));
        }
      } catch (e) {
        console.debug('Autofill location failed');
      } finally {
        setIsLocating(false);
      }
    };
    autofillLocation();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    
    try {
      const location = await getCachedLocation();
      
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          businessType: formData.businessType,
          country: formData.country.trim() || location?.country || 'Unknown',
          state: formData.state.trim() || location?.region || 'Unknown',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      setIsSuccess(true);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || 'Verification failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="waitlist">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-0 pointer-events-none opacity-20">
         <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-200 blur-[120px] rounded-full"></div>
         <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-100 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Value Proposition & Perks */}
          <div className="lg:col-span-5 text-center lg:text-left mb-12 lg:mb-0">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto lg:mx-0 mb-6 text-emerald-600 shadow-sm"
            >
              <Activity className="w-6 h-6" />
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-none">
              Join the <br />
              <span className="text-emerald-600 italic font-serif">Early Circle.</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed font-semibold mb-8 max-w-md mx-auto lg:mx-0">
              Secure priority onboarding and premium features first. {BRAND_NAME || 'Kariflow'} provides the digital infrastructure to scale without losing the soul of custom craftsmanship.
            </p>

            <div className="space-y-6 max-w-md mx-auto lg:mx-0 text-left">
              {[
                { title: "Free White-Glove Setup", desc: "Our artisan success managers will manually migrate your existing paper measurement books." },
                { title: "Lifetime Founder Price Lock", desc: "Lock in early-bird subscription rates forever—even as we roll out pro features." },
                { title: "Direct Feature Influence", desc: "Work directly with our design and engineering teams to prioritize custom tools." }
              ].map((benefit, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-800 tracking-tight">{benefit.title}</h4>
                    <p className="text-xs text-slate-400 font-bold leading-normal">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Waitlist Submission Card */}
          <div className="lg:col-span-7 w-full">
            <div className="bg-white rounded-[40px] p-8 sm:p-12 border border-slate-100 shadow-xl overflow-hidden group">
              <div className="text-center mb-10">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                  Apply for Early Access
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed font-bold">
                  Designed for designers, scaled for brands, loved by artisans.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <label htmlFor="fullName" className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        required
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-emerald-600 focus:bg-white transition-all text-slate-900 text-sm font-bold"
                        placeholder="E.g. Smart Chinemerem"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-emerald-600 focus:bg-white transition-all text-slate-900 text-sm font-bold"
                        placeholder="hello@kariflow.app"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                       <div>
                        <label htmlFor="country" className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Country</label>
                        <input
                          type="text"
                          id="country"
                          required
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-emerald-600 focus:bg-white transition-all text-slate-900 text-sm font-bold disabled:opacity-30"
                          placeholder={isLocating ? "Detecting..." : "Country"}
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          disabled={isLocating && !formData.country}
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">City/State</label>
                        <input
                          type="text"
                          id="state"
                          required
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-emerald-600 focus:bg-white transition-all text-slate-900 text-sm font-bold disabled:opacity-30"
                          placeholder={isLocating ? "Detecting..." : "State"}
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          disabled={isLocating && !formData.state}
                        />
                      </div>
                    </div>

                    <div className="relative group">
                      <label htmlFor="businessType" className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Artisan Profile</label>
                      <div className="relative">
                        <select
                          id="businessType"
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-emerald-600 focus:bg-white transition-all text-slate-900 text-sm font-bold appearance-none cursor-pointer"
                          value={formData.businessType}
                          onChange={(e) => setFormData({ ...formData, businessType: e.target.value as any })}
                        >
                          <option value="designer">Fashion Designer</option>
                          <option value="brand">Fashion Brand</option>
                          <option value="tailor">Production Tailor</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-4 h-4" />
                      </div>
                    </div>

                    {errorMessage && (
                      <p className="text-rose-500 text-xs font-black text-center uppercase tracking-widest">{errorMessage}</p>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 rounded-2xl bg-emerald-600 text-white font-black text-base transition-all flex items-center justify-center shadow-xl shadow-emerald-600/20 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>Submit Application</span>
                          <Send className="w-[18px] h-[18px] ml-2" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-100">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Waitlist Confirmed</h3>
                    <p className="text-slate-500 text-sm mb-8 leading-relaxed font-bold">
                      You're in the inner circle. <br /> We'll reach out once the engine is ready for your workshop.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="text-emerald-600 text-xs font-black uppercase tracking-widest hover:underline"
                    >
                      Add another workshop
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}