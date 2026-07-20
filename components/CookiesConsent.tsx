"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ShieldCheck, BarChart3, Target, Settings2, Info } from 'lucide-react';
import { getCachedLocation } from '../libs/location';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

async function logConsentSignature(prefs: CookiePreferences) {
  try {
    const locationData = (await getCachedLocation()) || {};
    
    await fetch('/api/legal/consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        preferences: prefs,
        userAgent: navigator.userAgent,
        location: locationData,
        anonymousId: localStorage.getItem('kariflow_anon_id') || crypto.randomUUID()
      }),
    });
    
    sessionStorage.setItem('kariflow_session_audit', 'true');
  } catch (error) {
    console.debug('Session consent logging process bypassed:', error);
  }
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: true
  });

  // 🎯 FIXED: Synchronous state evaluation wrapper ensures clean React hook unmounting lifecycles
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    
    const evaluateConsentStatus = async () => {
      const consent = localStorage.getItem('kariflow_cookie_consent');
      if (!consent) {
        timerId = setTimeout(() => setShowBanner(true), 1500);
      } else {
        try {
          const prefs = JSON.parse(consent) as CookiePreferences;
          setPreferences(prefs); // Keeps checkbox states accurately synced with actual storage states
          
          const auditLogged = sessionStorage.getItem('kariflow_session_audit');
          if (!auditLogged) {
            await logConsentSignature(prefs);
          }
        } catch (e) {
          // If storage is corrupted, trigger the interface safely
          timerId = setTimeout(() => setShowBanner(true), 1500);
        }
      }
    };

    evaluateConsentStatus();

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  const saveConsent = async (prefs: CookiePreferences) => {
    localStorage.setItem('kariflow_cookie_consent', JSON.stringify(prefs));
    setShowBanner(false);
    await logConsentSignature(prefs);
  };

  const handleAcceptAll = () => {
    const prefs = { necessary: true, analytics: true, marketing: true };
    setPreferences(prefs);
    saveConsent(prefs);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; 
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          className="fixed bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:max-w-md z-50"
        >
          <div className="bg-white rounded-[32px] shadow-2xl shadow-slate-900/10 border border-slate-100 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Cookie size={24} />
                </div>
                <button 
                  onClick={() => setShowBanner(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-50"
                  aria-label="Close panel"
                >
                  <X size={20} />
                </button>
              </div>

              <h2 className="text-xl font-black text-slate-900 mb-2">Cookie Preferences</h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
                We use cookies to enhance your experience, analyze site traffic, and personalize content. 
                Choose your settings below.
              </p>

              {!showDetails ? (
                <div className="space-y-3">
                  <button
                    onClick={handleAcceptAll}
                    className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 cursor-pointer"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={() => setShowDetails(true)}
                    className="w-full py-4 bg-slate-50 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <Settings2 size={16} className="mr-2" />
                    Manage Preferences
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-3">
                    {/* Necessary */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent select-none">
                      <div className="flex items-center space-x-3">
                        <ShieldCheck size={18} className="text-emerald-600" />
                        <div>
                          <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Necessary</p>
                          <p className="text-[10px] text-slate-400 font-bold">Required for site to function</p>
                        </div>
                      </div>
                      <div className="w-10 h-5 bg-emerald-500 rounded-full flex items-center px-1 opacity-50 cursor-not-allowed">
                        <div className="w-3 h-3 bg-white rounded-full ml-auto"></div>
                      </div>
                    </div>

                    {/* Analytics */}
                    <button
                      type="button"
                      onClick={() => togglePreference('analytics')}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left cursor-pointer ${
                        preferences.analytics ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <BarChart3 size={18} className={preferences.analytics ? 'text-emerald-600' : 'text-slate-400'} />
                        <div>
                          <p className={`text-xs font-black uppercase tracking-widest ${
                            preferences.analytics ? 'text-emerald-900' : 'text-slate-900'
                          }`}>Analytics</p>
                          <p className="text-[10px] text-slate-500 font-bold">Help us improve the community</p>
                        </div>
                      </div>
                      <div className={`w-10 h-5 rounded-full flex items-center px-1 transition-colors ${
                        preferences.analytics ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}>
                        <div className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                          preferences.analytics ? 'translate-x-5' : 'translate-x-0'
                        }`}></div>
                      </div>
                    </button>

                    {/* Marketing */}
                    <button
                      type="button"
                      onClick={() => togglePreference('marketing')}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left cursor-pointer ${
                        preferences.marketing ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Target size={18} className={preferences.marketing ? 'text-emerald-600' : 'text-slate-400'} />
                        <div>
                          <p className={`text-xs font-black uppercase tracking-widest ${
                            preferences.marketing ? 'text-emerald-900' : 'text-slate-900'
                          }`}>Marketing</p>
                          <p className="text-[10px] text-slate-500 font-bold">Relevant updates and offers</p>
                        </div>
                      </div>
                      <div className={`w-10 h-5 rounded-full flex items-center px-1 transition-colors ${
                        preferences.marketing ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}>
                        <div className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                          preferences.marketing ? 'translate-x-5' : 'translate-x-0'
                        }`}></div>
                      </div>
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowDetails(false)}
                      className="w-1/3 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    {/* 🎯 FIXED: Replaced standard CSS invalid flex-3 value safely with flex-auto allocation */}
                    <button
                      onClick={handleSavePreferences}
                      className="flex-auto py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 cursor-pointer"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center justify-center space-x-4 pt-6 border-t border-slate-100">
                <a href="/privacy" className="text-[10px] font-bold text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest flex items-center">
                  <Info size={12} className="mr-1" /> Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}