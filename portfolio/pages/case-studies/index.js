import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Link from 'next/link';
import { ArrowRight, Sparkles, ArrowUpRight } from 'lucide-react';
import { SectionReveal } from '@/components/animations';
import { PRODUCTS } from '@/lib/data';

export default function CaseStudiesPage() {
  return (
    <Layout>
      <SEO
        title="Engineering Case Studies"
        description="Detailed technical case studies from Digital Crowd Technologies — architectural breakdowns of Ruchi Bazzar food platform and the School Management System."
        canonical="/case-studies"
      />

      {/* Header */}
      <section className="relative z-10 pt-36 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3.5 py-1 mb-4 backdrop-blur-md">
              <Sparkles size={13} className="text-blue-400" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-300">
                Architectural Breakdown
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              How We Approached <br />
              <span className="text-gradient-orange">the Architecture</span>.
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed max-w-xl mx-auto">
              A transparent look at the challenges, system decisions, and engineering workflows behind our production software.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Case Studies Cards */}
      <section className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 pb-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRODUCTS.map((product) => {
            const isRuchi = product.id === 'ruchi-bazzar';
            const accentColor = isRuchi ? '#FF5E00' : '#0066FF';

            return (
              <SectionReveal key={product.id}>
                <Link
                  href={`/case-studies/${product.id}`}
                  className="group relative flex flex-col justify-between h-full rounded-[2.5rem] border border-white/15 bg-[#0A192F]/40 p-8 sm:p-10 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-400/40 hover:bg-[#0E2442]/60 hover:shadow-[0_25px_60px_rgba(0,102,255,0.2)] overflow-hidden"
                >
                  {/* Subtle Top Accent Ribbon */}
                  <div
                    className="absolute inset-x-0 top-0 h-1.5"
                    style={{
                      background: isRuchi
                        ? 'linear-gradient(to right, #FF5E00, #F97316)'
                        : 'linear-gradient(to right, #0066FF, #38BDF8)',
                    }}
                  />

                  <div>
                    <span
                      className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border mb-4 inline-block"
                      style={{
                        color: accentColor,
                        borderColor: `${accentColor}40`,
                        backgroundColor: `${accentColor}15`,
                      }}
                    >
                      {product.category}
                    </span>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 group-hover:text-blue-200 transition-colors">
                      {product.name}
                    </h2>

                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {product.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-semibold text-sm group-hover:gap-3 transition-all" style={{ color: accentColor }}>
                    <span>Read Architectural Deep-Dive</span>
                    <ArrowRight size={16} />
                  </div>
                </Link>
              </SectionReveal>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
