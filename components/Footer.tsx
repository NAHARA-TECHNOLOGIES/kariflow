/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Link from 'next/link';
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import {
  BRAND_NAME,
  BRAND_DESCRIPTION,
  SOCIAL_LINKS,
} from '../constants';

import BrandLogo from './BrandLogo';
import CopyrightText from '../components/CopyrightText'; // 🎯 FIXED: Extracted client-side text engine

export default function Footer() {
  const socials = [
    {
      icon: FaXTwitter,
      href: SOCIAL_LINKS.twitter || '#',
    },
    {
      icon: FaLinkedinIn,
      href: SOCIAL_LINKS.linkedin || '#',
    },
    {
      icon: FaInstagram,
      href: SOCIAL_LINKS.instagram || '#',
    },
    {
      icon: FaFacebookF,
      href: '#',
    },
  ];

  return (
    <footer
      id="footer"
      className="relative z-10 overflow-hidden border-t border-emerald-900 bg-emerald-950 py-20 text-white"
    >
      {/* Background Graphic Patterns */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <circle cx="10" cy="10" r="40" fill="white" />
          <circle cx="90" cy="90" r="40" fill="white" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-4 lg:gap-8">
          
          {/* Brand Core Column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="group mb-6 flex items-center space-x-2"
            >
              <BrandLogo variant="footer" />
              <span className="font-display text-2xl font-black uppercase italic tracking-tight">
                Kariflow
                <span className="text-emerald-500">.</span>
              </span>
            </Link>

            <p className="mb-8 max-w-xs text-sm font-medium leading-relaxed text-slate-400">
              {BRAND_DESCRIPTION} Built for local artisans.
              Scaled for global fashion icons.
            </p>

            <div className="flex space-x-4">
              {socials.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={`footer-social-${index}`}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-400 transition-all hover:border-emerald-500 hover:text-emerald-400"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Layout Section */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:col-span-3">
            <div>
              <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest">
                The Platform
              </h4>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                <li><Link href="/#features" className="hover:text-emerald-500">Measurement Book</Link></li>
                <li><Link href="/#task-tracker" className="hover:text-emerald-500">Task Routing</Link></li>
                <li><Link href="/#pricing" className="hover:text-emerald-500">Artisan Plans</Link></li>
                <li><Link href="/#faq" className="hover:text-emerald-500">Help Center</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest">
                Community
              </h4>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                <li><Link href="/blog" className="hover:text-emerald-500">Blog Journal</Link></li>
                <li><Link href="/#mission" className="hover:text-emerald-500">Founder Stories</Link></li>
                <li><Link href="/contact" className="hover:text-emerald-500">Contact Support</Link></li>
                <li><Link href="/privacy" className="hover:text-emerald-500">Compliance</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest">
                Studio Status
              </h4>
              <div className="mb-6 flex items-center space-x-3 font-mono text-xs text-emerald-400">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold uppercase italic tracking-[0.2em]">
                  All Systems Syncing
                </span>
              </div>
              <p className="font-mono text-[10px] leading-relaxed tracking-tight text-slate-600">
                v1.28.4-stable
                <br />
                Multi-Shop Engine Active
                <br />
                Secure Cloud Storage
              </p>
            </div>
          </div>
        </div>

        {/* Lower Metadata Panel */}
        <div className="mt-20 flex flex-col items-center justify-between border-t border-slate-800 pt-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 md:flex-row gap-4">
          
          {/* Copyright text engine paired with Nahara Technologies signature */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <CopyrightText brandName={BRAND_NAME} />
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="text-emerald-600 tracking-widest font-bold">From Nahara Technologies</span>
          </div>

          <div className="mt-6 flex space-x-8 md:mt-0 items-center">
            <Link href="/privacy" className="hover:text-emerald-500 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-emerald-500 transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-emerald-500 transition-colors">Cookies</Link>
            
            <Link
              href="/admin"
              className="rounded-full border border-slate-800 bg-slate-800/50 px-3 py-1 hover:border-emerald-500 hover:text-emerald-500 transition-all"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}