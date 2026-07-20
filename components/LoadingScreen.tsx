"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "framer-motion";
import BrandLogo from "./BrandLogo";
import { BRAND_NAME } from "../constants";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col justify-center items-center">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 border-2 border-slate-100 border-t-emerald-600 rounded-full"
        />

        {/* Brand Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="z-10 flex items-center justify-center"
        >
          <div className="w-10 h-10 animate-pulse">
            <BrandLogo
              className="w-full h-full"
              variant="nav"
            />
          </div>
        </motion.div>
      </div>

      <div className="mt-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-900 font-display font-black text-3xl tracking-[0.2em] uppercase italic"
        >
          {BRAND_NAME}
          <span className="text-emerald-600 font-serif">.</span>
        </motion.p>

        <motion.div
          className="h-px w-32 bg-gradient-to-r from-transparent via-emerald-600/30 to-transparent mt-4 mx-auto origin-center"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        <p className="mt-4 text-[10px] text-green font-black uppercase tracking-[0.5em] antialiased">
          FROM NAHARA TECHNOLOGIES
        </p>
      </div>
    </div>
  );
}