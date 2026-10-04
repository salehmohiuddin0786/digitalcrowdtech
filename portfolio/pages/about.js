import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck, Target, HeartHandshake } from 'lucide-react';
import { SectionReveal, StaggerContainer, StaggerItem } from '@/components/animations';
import { SITE } from '@/lib/data';

const VALUES = [
  {
    icon: Target,
    title: 'Practical over theoretical',
    desc: 'We focus on building functional systems that solve day-to-day operational problems, rather than showcase pieces with excessive complexity.',
  },
  {
    icon: Sparkles,
    title: 'Business first, technology second',
    desc: 'Technology exists to serve your business objectives. We choose tools and frameworks based on real requirements, not fleeting trends.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparency in scope & cost',
    desc: 'Uncompromising clarity about what is included, what costs extra, and realistic delivery timelines with milestone-based peace of mind.',
  },
  {
    icon: HeartHandshake,
    title: 'Long-term partnership',
    desc: 'Code structured for maintainability. Systems designed for frictionless scale. Full intellectual property ownership handed over to you.',
  },
];

export default function AboutPage() {
  return (
    <Layout>
      <SEO
        title="About Us"
        description="About Digital Crowd Technologies — a modern software engineering and digital solutions company in Hyderabad, India."
        canonical="/about"
      />

      {/* Header */}
      <section className="relative z-10 pt-36 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3.5 py-1 mb-4 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-300">
                Company Overview
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Technology built around <br />
              <span className="text-gradient-orange">real business needs</span>.
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
              Digital Crowd Technologies is a modern software development and technology solutions company based in Hyderabad, Telangana. We engineer resilient digital products for businesses and institutions.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Philosophy & Approach Grid */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <StaggerItem key={v.title}>
                  <div className="rounded-2xl border border-white/10 bg-[#0A192F]/40 p-8 backdrop-blur-xl transition-all duration-300 hover:border-blue-400/40 hover:bg-[#0E2442]/60 hover:shadow-[0_15px_35px_rgba(0,102,255,0.2)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-5">
                      <Icon size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-3">{v.title}</h2>
                    <p className="text-slate-300 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Company Facts Strip */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-[2rem] border border-white/15 bg-gradient-to-r from-[#0A192F]/70 via-[#0B1F3A]/60 to-[#0A192F]/70 p-8 sm:p-12 backdrop-blur-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="pt-4 md:pt-0">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-400">Headquarters</span>
                <p className="text-xl font-bold text-white mt-1">Hyderabad, India</p>
                <p className="text-xs text-blue-400 mt-1">Telangana Tech Hub</p>
              </div>
              <div className="pt-6 md:pt-0 md:pl-6">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-400">Core Focus</span>
                <p className="text-xl font-bold text-white mt-1">Custom Software &amp; ERP</p>
                <p className="text-xs text-orange-400 mt-1">Full-Cycle Engineering</p>
              </div>
              <div className="pt-6 md:pt-0 md:pl-6">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-400">Client Guarantee</span>
                <p className="text-xl font-bold text-white mt-1">100% Code Handover</p>
                <p className="text-xs text-emerald-400 mt-1">No Proprietary Lock-in</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <SectionReveal>
            <h2 className="text-3xl font-bold text-white mb-4">Want to build with us?</h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto mb-8">
              Send us your initial project requirements and we will schedule an engineering consultation call.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(0,102,255,0.4)] transition-transform hover:scale-105"
            >
              <span>Get in Touch</span>
              <ArrowRight size={16} />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </Layout>
  );
}
