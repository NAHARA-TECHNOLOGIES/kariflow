"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { BRAND_NAME } from '../constants';

interface LegalPage {
  slug: string;
  title: string;
  content: string;
  lastRevised: string;
}

const defaultContent = `
## 1. What are Cookies?
Cookies are small text files stored on your device to help us provide a better experience. ${BRAND_NAME} uses them to remember your session and preferences.

## 2. Essential Cookies
These are required for the app to function. They allow you to stay logged into your workshop dashboard and maintain your measurement patterns while editing.

## 3. Analytics Cookies
We use anonymous analytics to understand how designers use the platform, which helps us improve the measurement tools and workflow features.

## 4. Managing Preferences
You can adjust your cookie settings at any time through our consent banner or via your browser settings.
`;

export default function CookiesPageClient() {
  const [page, setPage] = useState<LegalPage | null>(null);

  // Function is scoped inside useEffect to satisfy compiler dependencies and prevent re-render leaks
  useEffect(() => {
    const fetchCookieDocumentation = async () => {
      try {
        const response = await fetch('/api/legal/cookies');
        if (response.ok) {
          const data = await response.json();
          setPage(data);
        }
      } catch (err) {
        console.error('Failed processing data lookup fetch sequence:', err);
      }
    };

    fetchCookieDocumentation();
  }, []);

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-6 relative">
         <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="mt-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Summary Info (Sticky on Large Screens) */}
            <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                <span>Cookie Policy</span>
              </div>

              <h1 className="text-4xl md:text-5xl xl:text-6xl font-display font-black text-slate-900 tracking-tight leading-[1.1]">
                {page?.title || 'Cookie Policy'} <span className="text-emerald-600 italic">.</span>
              </h1>

              <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
                <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Last Revised: {page?.lastRevised || 'July 2026'}
                </p>
                <div className="h-[2px] bg-slate-200/60 w-12"></div>
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Usage Matrix</h4>
                <ul className="space-y-3 text-xs text-slate-500 font-semibold leading-relaxed">
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600">&bull;</span>
                    <span>Essential sessions preserve loaded metrics so you do not lose fitting logs mid-session.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600">&bull;</span>
                    <span>No marketing trackers are sold or leased for external advertising.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600">&bull;</span>
                    <span>Custom options let you adjust consent preferences securely at any time.</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-[10px] text-slate-400 leading-relaxed font-black uppercase tracking-widest space-y-1">
                <p>Have tech-cookie questions?</p>
                <a href="mailto:support@kariflow.app" className="text-emerald-600 hover:underline">support@kariflow.app</a>
              </div>
            </div>

            {/* Right Column: Scrollable Content Cookies */}
            <div className="lg:col-span-8 bg-slate-50/50 p-8 sm:p-12 rounded-[2.5rem] border border-slate-100">
              <div className="markdown-body prose prose-slate max-w-none text-slate-600">
                <ReactMarkdown>
                  {page?.content || defaultContent}
                </ReactMarkdown>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}