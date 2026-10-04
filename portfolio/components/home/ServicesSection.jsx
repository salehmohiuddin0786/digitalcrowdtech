'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Globe,
  ShoppingCart,
  LayoutGrid,
  GraduationCap,
  Smartphone,
  Server,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { SectionReveal, StaggerContainer, StaggerItem } from '@/components/animations';
import { SERVICES } from '@/lib/data';

const ICON_MAP = {
  Globe,
  ShoppingCart,
  LayoutGrid,
  GraduationCap,
  Smartphone,
  Server,
};

const CATEGORIES = ['All', 'Web Platforms', 'Enterprise & ERP', 'Commerce & Mobile', 'APIs & Backend'];

export default function ServicesSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredServices = SERVICES.filter((s) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Web Platforms') return s.id === 'web-development';
    if (selectedCategory === 'Enterprise & ERP') return s.id === 'erp' || s.id === 'school-management';
    if (selectedCategory === 'Commerce & Mobile') return s.id === 'ecommerce' || s.id === 'mobile-apps';
    if (selectedCategory === 'APIs & Backend') return s.id === 'api-backend';
    return true;
  });

  return (
    <section className="relative z-10 py-24 lg:py-32" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3.5 py-1 mb-3 backdrop-blur-md">
              <Sparkles size={13} className="text-blue-400" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-300">
                Core Engineering Services
              </span>
            </div>
            <h2
              id="services-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
            >
              Solutions for the way your <span className="text-gradient-blue">business works</span>.
            </h2>
          </div>

          <p className="text-slate-400 text-sm sm:text-base max-w-md">
            Every software system is architected around your precise business model — no cookie-cutter solutions, just clean engineering.
          </p>
        </SectionReveal>

        {/* Category Pill Filters (Liminiq-style) */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-[0_0_20px_rgba(0,102,255,0.4)]'
                    : 'border border-white/10 bg-[#0A192F]/50 text-slate-300 hover:text-white hover:bg-[#0A192F]/80 backdrop-blur-md'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const Icon = ICON_MAP[service.icon];
            return (
              <StaggerItem key={service.id}>
                <div className="group relative flex flex-col justify-between h-full rounded-2xl border border-white/10 bg-[#0A192F]/40 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-400/40 hover:bg-[#0E2442]/60 hover:shadow-[0_20px_45px_rgba(0,102,255,0.2)]">
                  
                  {/* Subtle top border glow on hover */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    {/* Top Row: Icon + Direct link */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-all">
                        {Icon && <Icon size={24} />}
                      </div>
                      <span className="font-mono text-xs text-slate-500 group-hover:text-orange-400 transition-colors">
                        Enterprise Grade
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-blue-200 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-slate-300/85 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-white/10">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.04] text-[11px] font-mono text-slate-300 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom CTA */}
                    <Link
                      href={`/services#${service.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 group-hover:text-orange-400 transition-colors"
                    >
                      <span>Explore Deliverables</span>
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>

                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Bottom Action */}
        <SectionReveal delay={0.2} className="text-center mt-14">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.1] hover:border-blue-400/40"
          >
            <span>View All Service Specifications</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 text-blue-400" />
          </Link>
        </SectionReveal>

      </div>
    </section>
  );
}
