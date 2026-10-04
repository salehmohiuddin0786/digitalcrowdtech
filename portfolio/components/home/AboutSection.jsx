import Link from 'next/link';
import { ArrowRight, CheckCircle2, Cpu, Database, Globe, Lock, ShieldCheck } from 'lucide-react';
import { SectionReveal } from '@/components/animations';

const ABOUT_POINTS = [
  'Digital transformation for enterprises & growing businesses',
  'Workflow automation reducing manual errors and overhead',
  'Custom software engineered from first principles',
  'Scalable web platforms & SaaS infrastructure',
  'School & educational institution management suites',
  'E-commerce platforms with payment & logistics integrations',
];

const ARCHITECTURE_NODES = [
  { icon: Globe, label: 'Presentation Layer', sub: 'Next.js 16 · React 19 · Responsive Glass UI', tag: 'Fast TTFB' },
  { icon: Cpu, label: 'Business Logic Layer', sub: 'Node.js · Express · Modular Micro-services', tag: 'High Concurrency' },
  { icon: Database, label: 'Data & Persistence', sub: 'Normalized MySQL · Sequelize ORM · Transactions', tag: 'ACID Compliant' },
  { icon: Lock, label: 'Security & Access', sub: 'JWT Authentication · Role-Based Permissions · Sanitized Inputs', tag: 'Hardened' },
];

export default function AboutSection() {
  return (
    <section className="relative z-10 py-24 lg:py-32" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Content Column */}
          <div className="lg:col-span-6">
            <SectionReveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3.5 py-1 mb-4 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-300">About Digital Crowd</span>
              </div>

              <h2
                id="about-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight"
              >
                Technology engineered around <span className="text-gradient-orange">real business needs</span>.
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
                Digital Crowd Technologies builds practical digital products and robust software solutions for modern businesses and organizations. We never push unnecessary complexity — we focus on understanding your operational workflows before writing code.
              </p>

              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Based in Hyderabad, Telangana, our engineering spans custom management systems, school ERP suites, online commerce ecosystems, and backend APIs. Every project is built for real-world resilience, high availability, and straightforward maintenance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {ABOUT_POINTS.map((point) => (
                  <div key={point} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.1] hover:border-blue-400/40"
              >
                <span>Read Our Full Story</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 text-blue-400" />
              </Link>
            </SectionReveal>
          </div>

          {/* Architecture Visualization Column (Glass Panel) */}
          <div className="lg:col-span-6">
            <SectionReveal delay={0.15}>
              <div className="relative rounded-[2rem] border border-white/15 bg-[#0B1F3A]/40 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                  <div>
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-200">System Architecture Stack</h3>
                    <p className="text-xs text-slate-400 mt-0.5">End-to-End Enterprise Specification</p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1">
                    <ShieldCheck size={14} className="text-blue-400" />
                    <span className="text-[11px] font-mono text-blue-300">Production Tested</span>
                  </div>
                </div>

                {/* Architecture Layers */}
                <div className="space-y-3.5">
                  {ARCHITECTURE_NODES.map((node, i) => {
                    const Icon = node.icon;
                    return (
                      <div
                        key={node.label}
                        className="group flex items-center justify-between gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all duration-300 hover:border-blue-400/35 hover:bg-white/[0.07]"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-105 group-hover:bg-blue-500/20 transition-transform">
                            <Icon size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white group-hover:text-blue-200 transition-colors">{node.label}</p>
                            <p className="text-xs text-slate-400 mt-0.5 font-mono">{node.sub}</p>
                          </div>
                        </div>

                        <span className="hidden sm:inline-block shrink-0 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-slate-300">
                          {node.tag}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Stats Strip */}
                <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                    <p className="text-base font-extrabold text-white">0%</p>
                    <p className="text-[11px] text-slate-400">Lock-in</p>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                    <p className="text-base font-extrabold text-blue-400">100%</p>
                    <p className="text-[11px] text-slate-400">Custom Code</p>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                    <p className="text-base font-extrabold text-orange-400">24/7</p>
                    <p className="text-[11px] text-slate-400">Architecture</p>
                  </div>
                </div>

              </div>
            </SectionReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
