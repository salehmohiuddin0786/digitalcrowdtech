'use client';
import { SectionReveal, StaggerContainer, StaggerItem } from '@/components/animations';
import { TECH_STACK } from '@/lib/data';
import { Cpu, Terminal, Database, Cloud } from 'lucide-react';

const CATEGORY_ICONS = {
  Frontend: Cpu,
  Backend: Terminal,
  Database: Database,
  'Tools & Infrastructure': Cloud,
};

export default function TechSection() {
  return (
    <section className="relative z-10 py-24 lg:py-32" aria-labelledby="tech-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3.5 py-1 mb-3 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-300">
              Modern Toolchain
            </span>
          </div>
          <h2
            id="tech-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Built With Modern <span className="text-gradient-blue">Technology</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto mt-3">
            A production-proven technology stack selected for performance, reliability, and ease of maintenance.
          </p>
        </SectionReveal>

        {/* Tech Categories Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(TECH_STACK).map(([category, items]) => {
            const Icon = CATEGORY_ICONS[category] || Cpu;
            return (
              <StaggerItem key={category}>
                <div className="group relative h-full rounded-2xl border border-white/10 bg-[#0A192F]/40 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-[#0E2442]/60 hover:shadow-[0_15px_35px_rgba(0,102,255,0.2)]">
                  
                  {/* Subtle top edge highlight */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-105 transition-transform">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                      {category}
                    </h3>
                  </div>

                  <ul className="space-y-3" role="list">
                    {items.map((tech) => (
                      <li
                        key={tech.name}
                        className="flex items-center gap-3 p-2 rounded-xl transition-colors hover:bg-white/[0.04]"
                      >
                        <span
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#071324] font-mono text-xs font-bold text-blue-300 shadow-sm"
                          aria-hidden="true"
                        >
                          {tech.icon}
                        </span>
                        <span className="text-sm font-semibold text-slate-200">
                          {tech.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
}
