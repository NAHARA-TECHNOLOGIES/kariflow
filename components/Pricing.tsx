/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap, ShieldCheck, Globe } from 'lucide-react';
import Link from 'next/link';

interface TierProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlight: boolean;
  delay: number;
  icon: any;
  ctaHref: string;
}

const PricingCard: React.FC<{ tier: TierProps }> = ({ tier }) => {
  const Icon = tier.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: tier.delay }}
      className={`p-10 rounded-[32px] border transition-all duration-500 relative flex flex-col h-full group ${
        tier.highlight 
          ? 'border-emerald-200 bg-white shadow-2xl shadow-emerald-500/10' 
          : 'border-slate-100 bg-slate-50/50 text-slate-900'
      }`}
    >
      {tier.highlight && (
        <div className="absolute top-0 right-10 -translate-y-1/2 px-4 py-1.5 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full flex items-center shadow-lg">
          <Zap size={12} className="mr-2 fill-current" />
          Most Popular
        </div>
      )}
      
      <div className="mb-8">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
          tier.highlight ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-600 border border-slate-100 shadow-sm'
        }`}>
          <Icon size={24} />
        </div>
        <h4 className="text-xl font-display font-black mb-2 text-slate-900">{tier.name}</h4>
        <div className="flex items-baseline mb-4">
          <span className="text-4xl font-black tracking-tight text-slate-900">{tier.price}</span>
          <span className="ml-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
            {tier.period}
          </span>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed min-h-[48px] font-medium">
          {tier.description}
        </p>
      </div>
      
      <div className="space-y-4 mb-10 flex-1">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">What's included</p>
        <ul className="space-y-4 pl-0">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start text-xs font-bold list-none">
              <Check className={`mr-3 shrink-0 ${tier.highlight ? 'text-emerald-500' : 'text-slate-400'}`} size={14} strokeWidth={3} />
              <span className="text-slate-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 🎯 FIXED: Removed legacyBehavior/motion.a tag and updated to clean, modern Next.js 15+ Link specs */}
      <Link href={tier.ctaHref} className="w-full mt-auto block">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-4 rounded-xl font-black flex items-center justify-center transition-all uppercase text-[11px] tracking-widest cursor-pointer ${
            tier.highlight 
              ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20 hover:bg-emerald-700' 
              : 'bg-white text-slate-900 border-2 border-slate-100 hover:border-emerald-200'
          }`}
        >
          {tier.cta}
          <ArrowRight size={16} className="ml-2" />
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default function PricingPage() {
  const tiers: TierProps[] = [
    {
      name: "Free",
      price: "₦0",
      period: "forever",
      description: "For solo tailors building trust with the product.",
      features: ["Up to 10 active orders", "Customer records & measurements", "Basic order tracking", "Data export - always, no lock-in", "Deadline reminder"],
      cta: "Get Started",
      highlight: false,
      delay: 0.1,
      icon: ShieldCheck,
      ctaHref: "/contact"
    },
    {
      name: "Premium",
      price: "₦28,800",
      period: "/year",
      description: "For growing tailors & small fashion houses.",
      features: ["Unlimited orders", "Full customer records & history", "Production stage management", "Deadline alerts & reminders", "Expense tracking & financial reports", "Up to 3 team members", "Full data export"],
      cta: "Start Free Trial",
      highlight: true,
      delay: 0.2,
      icon: Zap,
      ctaHref: "/contact"
    },
    {
      name: "Enterprise",
      price: "₦84,000",
      period: "/year",
      description: "For established fashion houses & studios.",
      features: ["Everything in Premium", "Unlimited team members", "Multi-location support", "Advanced analytics & reporting", "Dedicated onboarding support", "Early access to financial services"],
      cta: "Contact Sales",
      highlight: false,
      delay: 0.3,
      icon: Globe,
      ctaHref: "/contact"
    }
  ];

  return (
    <section className="pt-32 pb-24 bg-white relative overflow-hidden min-h-screen">
      {/* Background Decorative Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-10 w-[40%] h-[40%] bg-emerald-100 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-[40%] h-[40%] bg-emerald-50 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl text-center md:text-left">
            <motion.div
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-6"
            >
              <span>Investing in Your Craft</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-none">
              Designed for <span className="text-emerald-600 italic">Every Scale.</span>
            </h2>
          </div>
          <div className="max-w-md w-full text-center md:text-left">
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              Choose the tools that fit your current studio size. Upgrade as your craft reaches the global stage.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
            Need a custom solution for your fashion house? <Link href="/contact" className="text-emerald-600 hover:underline underline-offset-4">Talk to an expert</Link>
          </p>
        </div>
      </div>
    </section>
  );
}