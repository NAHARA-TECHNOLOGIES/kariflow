'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '../components/LoadingScreen';

export default function PageLoader() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mount safely after first paint
  useEffect(() => {
    const mountTimer = setTimeout(() => {
      setMounted(true);
    }, 0);

    // Increased initial loading duration
    const loaderTimer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(loaderTimer);
    };
  }, []);

  // Handle page transitions
  useEffect(() => {
    if (!mounted) return;

    const transitionStartTimer = setTimeout(() => {
      setLoading(true);
    }, 0);

    // Increased transition loading duration
    const transitionEndTimer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(transitionStartTimer);
      clearTimeout(transitionEndTimer);
    };
  }, [pathname, mounted]);

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {loading && <LoadingScreen />}
    </AnimatePresence>
  );
}