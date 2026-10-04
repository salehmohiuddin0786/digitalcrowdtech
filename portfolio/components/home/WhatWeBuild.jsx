'use client';
import {
  Globe,
  MonitorSmartphone,
  ShoppingCart,
  LayoutGrid,
  GraduationCap,
  Smartphone,
  Server,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/animations';
import { WHAT_WE_BUILD } from '@/lib/data';

const ICON_MAP = {
  Globe,
  MonitorSmartphone,
  ShoppingCart,
  LayoutGrid,
  GraduationCap,
  Smartphone,
  Server,
};

const TICKER_ITEMS = [
  '100% Code Ownership',
  'Next.js & React Specialists',
  'Milestone-Based Billing',
  'Enterprise Multi-Role ERPs',
  'Real-Time Food Delivery Engines',
  'School Management Platforms',
  'REST & Socket.IO APIs',
  'Hyderabad, Telangana, India',
];

export default function WhatWeBuild() {
  return (
    <section className="relative z-10 py-12" aria-label="What we build and live capabilities">
      
      {/* Infinite Marquee Ticker Tape (inspired by Liminiq's live strip) */}
      <div className="relative mb-14 border-y border-white/10 bg-[#0A192F]/50 py-3.5 backdrop-blur-xl">
        <div className="marquee-container">
          <div className="marquee-content">
            {TICKER_ITEMS.concat(TICKER_ITEMS).map((item, idx) => (
              <span
                key={idx}
                className="flex items-center gap-2.5 whitespace-nowrap text-xs sm:text-sm font-medium text-slate-300/80"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-orange-400" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Capability Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs font-mono font-bold tracking-widest uppercase text-blue-400 mb-2">
            Engineering Capabilities
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            What We Build
          </h2>
        </div>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3.5">
          {WHAT_WE_BUILD.map((item) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <StaggerItem key={item.label}>
                <div className="group relative flex flex-col items-center justify-center gap-3 p-4 sm:p-5 rounded-2xl border border-white/10 bg-[#0A192F]/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-[#0E2442]/70 hover:shadow-[0_12px_30px_rgba(0,102,255,0.2)]">
                  {/* Subtle top reflection */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-blue-500/20 group-hover:to-orange-500/20 group-hover:text-white transition-all duration-300">
                    {Icon && <Icon size={22} aria-hidden="true" />}
                  </div>

                  <span className="text-slate-300 text-xs font-semibold text-center leading-tight group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>

    </section>
  );
}
