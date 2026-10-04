'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ArrowUpRight, Zap, ShieldCheck, Users, Activity, Layers, Smartphone } from 'lucide-react';
import { SectionReveal } from '@/components/animations';
import { PRODUCTS } from '@/lib/data';

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState({ 'ruchi-bazzar': 'features', 'school-management': 'features' });

  const setTab = (productId, tab) => {
    setActiveTab((prev) => ({ ...prev, [productId]: tab }));
  };

  return (
    <section className="relative z-10 py-24 lg:py-32" aria-labelledby="products-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionReveal className="mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-3.5 py-1 mb-3 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-orange-300">
              Proprietary Systems
            </span>
          </div>
          <h2
            id="products-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Products We&apos;ve Built &amp; <span className="text-gradient-orange">Scaled</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            Real, tested software architectures delivering everyday business value in production.
          </p>
        </SectionReveal>

        {/* Product Cards */}
        <div className="space-y-20">
          {PRODUCTS.map((product, idx) => {
            const isRuchi = product.id === 'ruchi-bazzar';
            const accentGradient = isRuchi
              ? 'from-orange-500 to-amber-500'
              : 'from-blue-600 to-indigo-500';
            const accentBorder = isRuchi ? 'border-orange-500/30' : 'border-blue-500/30';
            const accentColor = isRuchi ? '#FF5E00' : '#0066FF';

            return (
              <SectionReveal key={product.id} delay={idx * 0.1}>
                <div className="relative rounded-[2.5rem] border border-white/15 bg-[#0A192F]/40 p-6 sm:p-10 lg:p-12 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.5)] overflow-hidden">
                  
                  {/* Background subtle radial glow */}
                  <div
                    className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[130px] pointer-events-none opacity-30"
                    style={{ background: accentColor }}
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                    
                    {/* Left Column: Product Information */}
                    <div className="lg:col-span-7">
                      
                      {/* Product Category & Live Badge */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span
                          className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
                          style={{
                            color: accentColor,
                            borderColor: `${accentColor}40`,
                            backgroundColor: `${accentColor}15`,
                          }}
                        >
                          {product.category}
                        </span>

                        <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-full">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Production Ready
                        </span>

                        {product.pricing && (
                          <span className="font-mono text-xs font-bold text-white bg-blue-500/20 border border-blue-400/30 px-3 py-0.5 rounded-full">
                            ₹9,999 Lifetime License
                          </span>
                        )}
                      </div>

                      <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
                        {product.name}
                      </h3>

                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                        {product.description}
                      </p>

                      {/* Interactive Feature Checklist */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                        {product.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                            <CheckCircle2 size={16} style={{ color: accentColor }} className="shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-8 pt-4 border-t border-white/10">
                        <span className="text-xs font-mono text-slate-400 mr-2">Built with:</span>
                        {product.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-slate-200 backdrop-blur-sm"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-4">
                        <Link
                          href={`/case-studies/${product.id}`}
                          className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
                          style={{
                            backgroundImage: isRuchi
                              ? 'linear-gradient(to right, #FF5E00, #EA580C)'
                              : 'linear-gradient(to right, #0066FF, #2563EB)',
                          }}
                        >
                          <span>Explore Full Case Study</span>
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </Link>

                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-slate-200 backdrop-blur-md hover:bg-white/[0.1] hover:text-white transition-colors"
                        >
                          <span>Request Product Demo</span>
                          <ArrowUpRight size={15} />
                        </Link>
                      </div>

                    </div>

                    {/* Right Column: Realistic Glass UI Dashboard Mockup */}
                    <div className="lg:col-span-5">
                      <div className="relative rounded-2xl border border-white/15 bg-[#071324]/80 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                        
                        {/* Browser Chrome Header */}
                        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10">
                          <div className="flex items-center gap-1.5">
                            <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                            <div className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                            <span className="ml-2 font-mono text-[11px] text-slate-400">
                              {isRuchi ? 'ruchibazzar.in/dashboard' : 'school-erp.dct/admin'}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                            v2.4 Live
                          </span>
                        </div>

                        {/* Mock Dashboard Layout */}
                        <div className="space-y-3">
                          {/* Mini Stat Cards */}
                          <div className="grid grid-cols-2 gap-2.5">
                            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                              <span className="text-[10px] font-mono uppercase text-slate-400">
                                {isRuchi ? 'Active Partners' : 'Enrolled Students'}
                              </span>
                              <p className="text-lg font-extrabold text-white mt-0.5">
                                {isRuchi ? 'Multi-Vendor' : 'Institution Suite'}
                              </p>
                              <span className="text-[10px] text-emerald-400 font-mono">● Real-time synced</span>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                              <span className="text-[10px] font-mono uppercase text-slate-400">
                                {isRuchi ? 'Dispatch Pipeline' : 'Fee Management'}
                              </span>
                              <p className="text-lg font-extrabold text-white mt-0.5">
                                {isRuchi ? 'Auto Assignment' : 'Instant Receipts'}
                              </p>
                              <span className="text-[10px] text-blue-400 font-mono">● Automated ledger</span>
                            </div>
                          </div>

                          {/* Mock Data Feed Rows */}
                          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 space-y-2">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                              {isRuchi ? 'Live Orders & Socket Stream' : 'Administrative Roles'}
                            </span>
                            
                            {[
                              { label: isRuchi ? 'Order #4892 · Restaurant Assigned' : 'Principal · Full Oversight', status: 'Active', time: '1s ago' },
                              { label: isRuchi ? 'Delivery Partner En Route' : 'Teacher Portal · Attendance Logged', status: 'Verified', time: '12s ago' },
                              { label: isRuchi ? 'Payment Verified (Gateway)' : 'Parent Portal · Fee Cleared', status: 'Settled', time: '1m ago' },
                            ].map((row, i) => (
                              <div key={i} className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/[0.02] border border-white/5">
                                <div className="flex items-center gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                                  <span className="text-slate-300 font-medium truncate max-w-[190px]">{row.label}</span>
                                </div>
                                <span className="font-mono text-[10px] text-emerald-400">{row.status}</span>
                              </div>
                            ))}
                          </div>

                          {/* Bottom Architecture highlight */}
                          <div className="p-3 rounded-xl border border-white/10 bg-gradient-to-r from-blue-900/20 to-orange-900/20 flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-300">
                              {isRuchi ? 'Socket.IO Live Gateway' : 'Single Centralized DB'}
                            </span>
                            <span className="text-[11px] font-mono text-orange-400">99.9% Uptime</span>
                          </div>

                        </div>

                      </div>
                    </div>

                  </div>

                </div>
              </SectionReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
