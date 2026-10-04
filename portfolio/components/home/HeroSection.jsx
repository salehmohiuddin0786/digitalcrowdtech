'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  Layers,
  Code2,
  Terminal,
  Activity,
} from 'lucide-react';

const HIGHLIGHT_WORDS = [
  'Modern Web Platforms',
  'Custom ERP Systems',
  'Scalable E-Commerce',
  'School Management Solutions',
  'High-Performance APIs',
];

const TRUST_METRICS = [
  { label: 'Code Quality', value: 'Clean & Scalable', sub: 'Production-ready architecture' },
  { label: 'Architecture', value: '100% Custom', sub: 'No bloated templates' },
  { label: 'Ownership', value: 'Full Code Rights', sub: 'You own your intellectual property' },
  { label: 'Base Location', value: 'Hyderabad, India', sub: 'Direct engineer collaboration' },
];

export default function HeroSection() {
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % HIGHLIGHT_WORDS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="Hero Section"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines, Dynamic Word Rotator, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Live Status Beacon Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-1.5 backdrop-blur-xl shadow-[0_0_20px_rgba(0,102,255,0.2)]"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500" />
              </span>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-200">
                Digital Crowd Technologies · Hyderabad
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6"
            >
              <span className="block text-gradient-blue">Build Digital.</span>
              <span className="block text-gradient-orange">Grow Smarter.</span>
            </motion.h1>

            {/* Dynamic Animated Subtitle Rotator */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2 text-lg sm:text-2xl font-medium text-slate-300 mb-6 h-10"
            >
              <span className="text-slate-400">Engineering:</span>
              <motion.span
                key={activeWordIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="font-semibold text-white border-b-2 border-orange-500/70 pb-0.5"
              >
                {HIGHLIGHT_WORDS[activeWordIndex]}
              </motion.span>
            </motion.div>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base sm:text-lg text-slate-300/85 leading-relaxed max-w-xl mb-9"
            >
              We design and develop high-impact web applications, custom ERPs, e-commerce engines, and management platforms that simplify operations, reach customers, and scale reliably.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-[0_12px_40px_rgba(0,102,255,0.45)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>Start Your Project</span>
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/products"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-6 py-3.5 text-sm sm:text-base font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.1] hover:border-blue-400/40"
              >
                <span>Explore Products</span>
                <ArrowUpRight size={18} className="text-blue-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            {/* Quick Tech Tag Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-2"
            >
              {['Next.js', 'React', 'Node.js', 'MySQL', 'Socket.IO', 'Tailwind CSS'].map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-white/10 bg-[#0A192F]/60 px-3 py-1 text-xs font-mono text-slate-300 backdrop-blur-md"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

          </div>

          {/* Right Column: Transparent Interactive Glass Showcase (Liminiq-inspired) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-[2rem] border border-white/15 bg-[#0B1F3A]/50 p-5 sm:p-6 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
              
              {/* Top Bar of Glass Window */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400/70" />
                  <div className="h-3 w-3 rounded-full bg-amber-400/70" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400/70" />
                  <span className="ml-2 font-mono text-xs text-blue-200/60">dct-system://core</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-300">Operational</span>
                </div>
              </div>

              {/* Main Interactive Metrics Panel */}
              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-md transition-all hover:border-blue-400/30 hover:bg-white/[0.08]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    <Zap size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-blue-200/70">Performance First</span>
                    <span className="block text-sm font-bold text-white">Sub-second API &amp; Server-Rendered UI</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-md transition-all hover:border-orange-400/30 hover:bg-white/[0.08]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-orange-200/70">Zero Technical Debt</span>
                    <span className="block text-sm font-bold text-white">Clean Code &amp; Full IP Handover</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-md transition-all hover:border-indigo-400/30 hover:bg-white/[0.08]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    <Layers size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-indigo-200/70">Custom Architecture</span>
                    <span className="block text-sm font-bold text-white">Tailored for Your Business Logic</span>
                  </div>
                </div>
              </div>

              {/* Verified Product Snapshot Card */}
              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-blue-950/40 to-orange-950/20 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-300">Featured System</span>
                  <span className="text-[11px] font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">LIVE PRODUCT</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">Ruchi Bazzar &amp; School ERP</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Real-time food commerce engine &amp; multi-role school institution management system in active production.
                </p>
                <div className="mt-3 flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-xs font-mono text-blue-300">Socket.IO · Next.js · Node.js</span>
                  <Link
                    href="/case-studies"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-blue-300 transition-colors"
                  >
                    <span>View Case Studies</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              {/* Decorative ambient corner glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
            </div>
          </motion.div>

        </div>

        {/* Bottom Trust & Capability Stats Grid (similar to Liminiq's verified stats) */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUST_METRICS.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 + idx * 0.08 }}
              className="rounded-2xl border border-white/10 bg-[#0A192F]/40 p-4 sm:p-5 backdrop-blur-xl transition-all hover:border-blue-400/30 hover:bg-[#0A192F]/60"
            >
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-300/70">{item.label}</span>
              <p className="text-lg sm:text-xl font-bold text-white mt-1 mb-0.5">{item.value}</p>
              <p className="text-xs text-slate-400">{item.sub}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
