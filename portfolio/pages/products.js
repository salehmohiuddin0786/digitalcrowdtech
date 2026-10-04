import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';
import { SectionReveal } from '@/components/animations';
import { PRODUCTS } from '@/lib/data';

export default function ProductsPage() {
  return (
    <Layout>
      <SEO
        title="Software Products"
        description="Proprietary software products by Digital Crowd Technologies — including Ruchi Bazzar food delivery platform and School Management System ERP."
        canonical="/products"
      />

      {/* Header */}
      <section className="relative z-10 pt-36 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-3.5 py-1 mb-4 backdrop-blur-md">
              <Sparkles size={13} className="text-orange-400" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-orange-300">
                Production-Grade Products
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Software Systems Built for <br />
              <span className="text-gradient-orange">Real Business Demands</span>.
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed max-w-xl mx-auto">
              Our proven platforms eliminate months of reinventing the wheel, giving your enterprise immediate operational readiness.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Products List */}
      <section className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 pb-28">
        <div className="max-w-7xl mx-auto space-y-16">
          {PRODUCTS.map((product) => {
            const isRuchi = product.id === 'ruchi-bazzar';
            const accentColor = isRuchi ? '#FF5E00' : '#0066FF';

            return (
              <SectionReveal key={product.id}>
                <div className="rounded-[2.5rem] border border-white/15 bg-[#0A192F]/40 p-8 sm:p-12 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                  
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                    <div>
                      <span
                        className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border mb-3 inline-block"
                        style={{
                          color: accentColor,
                          borderColor: `${accentColor}40`,
                          backgroundColor: `${accentColor}15`,
                        }}
                      >
                        {product.category}
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                        {product.name}
                      </h2>
                    </div>

                    {product.pricing && (
                      <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 text-right">
                        <span className="text-2xl font-black text-white block">{product.pricing.label}</span>
                        <span className="font-mono text-xs text-blue-300">{product.pricing.note}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7">
                      <p className="text-slate-300 text-base leading-relaxed mb-6">
                        {product.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {product.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-slate-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        <Link
                          href={`/case-studies/${product.id}`}
                          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
                        >
                          <span>Detailed Architecture Case Study</span>
                          <ArrowRight size={16} />
                        </Link>

                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-semibold text-slate-200 hover:bg-white/10 transition-colors"
                        >
                          <span>Request Live Demo</span>
                          <ArrowUpRight size={15} />
                        </Link>
                      </div>
                    </div>

                    <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                      <span className="font-mono text-xs uppercase tracking-wider text-slate-400 block mb-4 font-bold">
                        Key Capabilities:
                      </span>
                      <ul className="space-y-2.5" role="list">
                        {product.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                            <CheckCircle2 size={16} style={{ color: accentColor }} className="shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </SectionReveal>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
