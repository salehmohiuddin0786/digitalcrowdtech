'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { NAV_LINKS, SITE } from '@/lib/data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [router.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href) => {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href);
  };

  return (
    <>
      <header
        className="pointer-events-none fixed inset-x-0 top-0 z-50 transition-all duration-300"
        role="banner"
      >
        <div className="pointer-events-auto mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 pt-3 sm:gap-3 lg:gap-4 lg:px-6 lg:pt-4">
          
          {/* Left Pill: Official Brand Logo */}
          <div className="relative flex items-center rounded-2xl border backdrop-blur-2xl transition-all duration-300 border-white/15 bg-[#0A192F]/70 shadow-[0_12px_36px_rgba(0,0,0,0.4)] h-14 px-3 sm:h-16 sm:px-4">
            <Link href="/" className="group flex items-center gap-2" aria-label="Digital Crowd Technologies">
              <div className="flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-white/95 hover:bg-white transition-all shadow-[0_4px_20px_rgba(0,102,255,0.25)]">
                <img
                  src="/logo.png"
                  alt="Digital Crowd Technologies"
                  className="h-6 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
          </div>

          {/* Center Pill: Desktop Navigation with translucent glass */}
          <nav
            className="hidden lg:flex items-center justify-center gap-1 rounded-2xl border backdrop-blur-2xl transition-all duration-300 border-white/15 bg-[#0A192F]/70 shadow-[0_12px_36px_rgba(0,0,0,0.4)] h-16 px-4"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                    active
                      ? 'text-white'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.08]'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {active && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/30 to-orange-500/20 border border-blue-400/40 -z-10 shadow-[0_0_15px_rgba(0,102,255,0.3)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Pill: Quick Actions + Glowing CTA */}
          <div className="relative flex items-center rounded-2xl border backdrop-blur-2xl transition-all duration-300 border-white/15 bg-[#0A192F]/70 shadow-[0_12px_36px_rgba(0,0,0,0.4)] h-14 px-2 sm:h-16 sm:px-3 gap-2">
            
            {/* Quick Contact badge */}
            <a
              href="mailto:support@digitalcrowdtech.in"
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Online · Quick Quote</span>
            </a>

            {/* Glowing CTA Button */}
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 p-[1px] font-semibold text-white shadow-[0_0_25px_rgba(0,102,255,0.4)] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="flex items-center gap-1.5 rounded-[11px] bg-[#0A192F]/80 px-4 py-2 text-xs sm:text-sm font-semibold backdrop-blur-md transition-colors group-hover:bg-[#0A192F]/50">
                <Sparkles size={14} className="text-orange-400" />
                <span>Get Started</span>
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white hover:bg-white/10 transition-colors lg:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Animated Frosted Glass Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Dark glass backdrop */}
            <div
              className="absolute inset-0 bg-[#060D1A]/95 backdrop-blur-2xl"
              onClick={() => setMobileOpen(false)}
            />

            <div className="relative h-full flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto">
              <div>
                <div className="flex items-center justify-center mb-6">
                  <div className="px-4 py-2 rounded-xl bg-white/95 shadow-lg">
                    <img
                      src="/logo.png"
                      alt="Digital Crowd Technologies"
                      className="h-9 w-auto object-contain"
                    />
                  </div>
                </div>

                <ul className="space-y-1.5" role="list">
                  {NAV_LINKS.map((link, i) => {
                    const active = isActive(link.href);
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <Link
                          href={link.href}
                          className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold transition-all ${
                            active
                              ? 'text-white bg-blue-600/20 border border-blue-500/40 shadow-[0_0_20px_rgba(0,102,255,0.25)]'
                              : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                          }`}
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight size={16} className="text-blue-400 opacity-60" />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/10">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-orange-500 text-white font-bold text-base shadow-[0_10px_30px_rgba(0,102,255,0.35)]"
                >
                  <Sparkles size={18} />
                  <span>Start Your Project</span>
                </Link>

                <div className="text-center">
                  <p className="text-xs text-slate-400">Hyderabad, Telangana, India</p>
                  <p className="text-xs text-blue-400 font-mono mt-1">support@digitalcrowdtech.in</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
