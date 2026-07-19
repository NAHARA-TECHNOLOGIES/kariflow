'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingControls from '../components/FloatingConrols';
import CookieConsent from '../components/CookiesConsent';
import PageLoader from './PageLoader';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <PageLoader />
      <main>
        {children}
      </main>
      <Footer />
      <FloatingControls />
      <CookieConsent />
    </>
  );
}