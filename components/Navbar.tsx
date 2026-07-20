/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { NAV_LINKS } from '../constants';
import BrandLogo from './BrandLogo';

interface NavLinkItem {
  href: string;
  label: string;
}

const NavLink = ({ 
  link, 
  mobile = false, 
  isLandingPage, 
  onClick 
}: { 
  link: NavLinkItem; 
  mobile?: boolean; 
  isLandingPage: boolean; 
  onClick: () => void;
}) => {
  const router = useRouter();
  const isAnchor = link.href.startsWith('#');
  
  // If we are not on the landing page, point anchors back to the home page first
  const href = isLandingPage ? link.href : (isAnchor ? `/${link.href}` : link.href);
  
  const className = mobile 
    ? "flex items-center justify-between px-4 py-4 text-lg font-display font-medium text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
    : "text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors relative group";

  // The Magic Fix: Intercept the click to offset the fixed navbar height
  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isAnchor && isLandingPage) {
      e.preventDefault(); // Stop the default harsh jump
      const element = document.querySelector(link.href);
      
      if (element) {
        // Calculate position minus ~100px for the navbar height
        const topOffset = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
      }
    }
    // Always trigger the mobile menu close
    onClick();
  };

  return (
    <Link
      href={href}
      onClick={handleScrollClick}
      className={className}
    >
      <span>{link.label}</span>
      {!mobile && (
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full"></span>
      )}
      {mobile && <ChevronRight className="w-[18px] h-[18px] text-slate-600" />}
    </Link>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handler for the Join Waitlist buttons
  const handleWaitlistClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isLandingPage) {
      e.preventDefault();
      const waitlistSection = document.querySelector('#waitlist');
      if (waitlistSection) {
        const topOffset = waitlistSection.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-100 py-4 shadow-sm' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
                <div className="max-w-[32px] max-h-[32px] flex items-center justify-center overflow-hidden shrink-0">
                  <BrandLogo variant="nav" />
                </div>
                <span className="text-lg font-display font-black text-slate-900 tracking-tight uppercase antialiased">
                  Kariflow<span className="text-emerald-600 font-serif font-normal">.</span>
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {NAV_LINKS.map((link) => (
              <NavLink 
                key={`desktop-${link.label.toLowerCase().replace(/\s+/g, '-')}`} 
                link={link} 
                isLandingPage={isLandingPage} 
                onClick={() => setIsOpen(false)} 
              />
            ))}
            
            <Link
              href="/contact"
              className="text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors"
            >
              Contact Us
            </Link>

            <Link
              href={isLandingPage ? "#waitlist" : "/#waitlist"}
              onClick={handleWaitlistClick}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/10 active:scale-95"
            >
              Join Waitlist
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:text-emerald-600 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-10 right-10 bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-2xl mt-4"
          >
            <div className="px-6 pt-4 pb-10 space-y-2">
              {NAV_LINKS.map((link) => (
                <NavLink 
                  key={`mobile-${link.label.toLowerCase().replace(/\s+/g, '-')}`} 
                  link={link} 
                  mobile 
                  isLandingPage={isLandingPage} 
                  onClick={() => setIsOpen(false)} 
                />
              ))}
              
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-4 py-4 text-lg font-display font-medium text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
              >
                <span>Contact Us</span>
                <ChevronRight className="w-[18px] h-[18px] text-slate-600" />
              </Link>

              <div className="pt-6">
                <Link
                  href={isLandingPage ? "#waitlist" : "/#waitlist"}
                  onClick={handleWaitlistClick}
                  className="block w-full py-4 rounded-xl bg-emerald-600 text-white text-center font-bold hover:bg-emerald-700 transition-all shadow-lg"
                >
                  Join Waitlist
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}