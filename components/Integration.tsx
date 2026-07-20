"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  FileText,
  Camera,
  Layers,
  Calendar,
  Sparkles,
} from "lucide-react";
import { FaPinterest, FaWhatsapp } from "react-icons/fa";

interface IntegrationItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
}

const INTEGRATIONS: IntegrationItem[] = [
  {
    name: "WhatsApp Client Connect",
    icon: FaWhatsapp,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    name: "Pinterest Moodboards",
    icon: FaPinterest,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    name: "AI Design Assistant",
    icon: Sparkles,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    name: "Measurement Sheets",
    icon: FileText,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    name: "Fittings Calendar",
    icon: Calendar,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    name: "Pattern & Layer Guides",
    icon: Layers,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
];

export default function Integrations() {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden" id="integrations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">Ecosystem</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
              Synchronize your <br />
              <span className="text-emerald-600">Design Studio Workflow.</span>
            </h3>
            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
              Kariflow brings client communication, measurement profile tracking, and style inspiration together under one panel. Keep using your favorite production habits while automating the busywork.
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-center space-x-3 font-bold text-slate-700">
                <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>Automated WhatsApp updates for measurements & order tracking</span>
              </li>
              <li className="flex items-center space-x-3 font-bold text-slate-700">
                <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>Link client style sheets to Pinterest reference portfolios</span>
              </li>
              <li className="flex items-center space-x-3 font-bold text-slate-700">
                <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>Smart automated calculations for fabric cuts and adjustments</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 relative">
            {INTEGRATIONS.map((app, i) => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -12, scale: 1.05 }}
                className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col items-center text-center group transition-all"
              >
                <div className={`w-16 h-16 rounded-2xl ${app.bg} ${app.color} flex items-center justify-center mb-4 transition-transform group-hover:rotate-12 flex-shrink-0`}>
                  <app.icon className="w-8 h-8" />
                </div>
                <p className="text-xs font-black text-slate-900 tracking-tight">{app.name}</p>
              </motion.div>
            ))}
            
            {/* Background Blur Decor */}
            <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] -z-10 rounded-full pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}