'use client';
import { Target, Code2, Layers, Layout, ShieldCheck, Wrench, Sparkles } from 'lucide-react';
import { SectionReveal, StaggerContainer, StaggerItem } from '@/components/animations';
import { WHY_US } from '@/lib/data';

const ICON_MAP = { Target, Code2, Layers, Layout, ShieldCheck, Wrench };

export default function WhyUsSection() {
  return (
    <section className="relative z-10 py-24 lg:py-32" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3.5 py-1 mb-3 backdrop-blur-md">
            <Sparkles size={13} className="text-blue-400" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-300">
              Why Digital Crowd
            </span>
          </div>
          <h2
            id="why-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Engineering Without the <span className="text-gradient-blue">Overhead</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto mt-3">
            Factual, straightforward principles that define every project we build for businesses.
          </p>
        </SectionReveal>

        {/* Value Proposition Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_US.map((item) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <StaggerItem key={item.title}>
                <div className="group relative h-full rounded-2xl border border-white/10 bg-[#0A192F]/40 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-[#0E2442]/60 hover:shadow-[0_15px_35px_rgba(0,102,255,0.2)]">
                  
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-5 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-all">
                    {Icon && <Icon size={22} />}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-blue-200 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-300/85 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
}
