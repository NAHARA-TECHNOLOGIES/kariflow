"use client";

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck, Loader2 } from 'lucide-react';
import { BRAND_NAME, CONTACT_EMAIL, CONTACT_PHONE, OFFICE_LOCATION } from '../constants';
import { response } from 'express';

export default function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    goal: 'Scale my workshop production',
    message: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 🎯 Relational API route replacement for the legacy Firebase engine
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();


      if (!response.ok || result.success === false) {
      throw new Error(result.message);
    }

      setSubmitted(true);
      setFormData({ fullName: '', email: '', goal: 'Scale my workshop production', message: '' });
    } catch (err) {
      console.error('Failed to submit incoming studio inquiry:', err);
      alert('Something went wrong. Please try again or reach out to our team directly via email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Background mesh */}
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-8"
            >
              <MessageSquare size={12} />
              <span>Direct Link to the Studio</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 mb-8 tracking-tight leading-[0.95]">
              Let's Scale Your <br />
              <span className="text-emerald-600 italic font-serif">Craft.</span>
            </h1>
            <p className="text-lg text-slate-500 mb-12 max-w-sm leading-relaxed font-medium">
              Ready to take your fashion business to the global stage? Our team is here to help you digitize your workflow and scale your production.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 lg:block lg:space-y-8">
              <div className="flex items-start group">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mr-4 flex-shrink-0 group-hover:border-emerald-300 transition-all">
                  <Mail size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Digital Inquiry</h3>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-slate-800 font-black hover:text-emerald-600 transition-colors">{CONTACT_EMAIL}</a>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mr-4 flex-shrink-0 group-hover:border-emerald-300 transition-all">
                  <Phone size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">WhatsApp Business</h3>
                  <p className="text-slate-800 font-black">{CONTACT_PHONE}</p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mr-4 flex-shrink-0 group-hover:border-emerald-300 transition-all">
                  <MapPin size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Workshop Hub</h3>
                  <p className="text-slate-800 font-black">{OFFICE_LOCATION}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 lg:mt-0"
          >
            {submitted ? (
              <div className="bg-emerald-600 rounded-[40px] p-12 text-center shadow-2xl shadow-emerald-900/20 text-white">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 text-white">
                  <ShieldCheck size={40} className="animate-bounce" />
                </div>
                <h3 className="text-3xl font-display font-black text-white mb-4">Message Received!</h3>
                <p className="text-emerald-50 mb-8 max-w-xs mx-auto font-medium">One of our artisan success managers from <span className="font-bold">{CONTACT_EMAIL}</span> will be in touch within 24 hours.</p>
                <motion.button 
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => setSubmitted(false)}
                   className="px-8 py-3 bg-white text-emerald-600 rounded-xl font-black text-xs uppercase tracking-widest"
                >
                  Send another message
                </motion.button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 shadow-2xl space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <MessageSquare size={18} className="text-emerald-600" />
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Connect with Us</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">Full Name</label>
                    <input 
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 outline-none focus:border-emerald-500 transition-all text-slate-900 font-bold text-sm"
                      placeholder="e.g. Adebayo Artisan"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 outline-none focus:border-emerald-500 transition-all text-slate-900 font-bold text-sm"
                      placeholder="adebayo@luxurybrand.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">Business Goal</label>
                  <select 
                    required 
                    value={formData.goal}
                    onChange={(e) => setFormData({...formData, goal: e.target.value})}
                    className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 outline-none focus:border-emerald-500 transition-all text-slate-900 font-bold text-sm appearance-none cursor-pointer"
                  >
                    <option value="Scale my workshop production">Scale my workshop production</option>
                    <option value="Global distribution support">Global distribution support</option>
                    <option value="Digital measurement training">Digital measurement training</option>
                    <option value="Enterprise partnership">Enterprise partnership</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">Your Message</label>
                  <textarea 
                    rows={5} 
                    required 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 outline-none focus:border-emerald-500 transition-all text-slate-900 font-bold text-sm" 
                    placeholder="Tell us about your workshop, your artisan team, and your vision for the future..."
                  />
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  disabled={loading}
                  className="w-full py-5 rounded-xl bg-emerald-600 text-white font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-emerald-900/20 flex items-center justify-center space-x-3 group disabled:opacity-50"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </motion.button>
                <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4">
                  Secure & Confidential Communication
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}