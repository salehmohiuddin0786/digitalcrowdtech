import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles, MessageSquare, ArrowUpRight } from 'lucide-react';
import { SectionReveal, StaggerContainer, StaggerItem } from '@/components/animations';

const PRICING_TIERS = [
  {
    id: 'sms',
    name: 'School Management System',
    tagline: 'Complete institutional ERP platform',
    price: '₹9,999',
    priceNote: 'One-time software license fee',
    highlight: true,
    badge: 'Popular Institutional Solution',
    features: [
      'Lifetime software license',
      'Student enrollment & profiles',
      'Teacher management & assignments',
      'Parent portal with notices',
      'Attendance tracking & reporting',
      'Fee management & digital receipts',
      'Automated timetable generation',
      'Notice & circular dispatch',
      'Syllabus & curriculum tracking',
      'Transport routes & vehicle oversight',
      'Academic reports & transcripts',
      'Role-based administrator permissions',
    ],
    additionalCosts: [
      { label: 'Domain name', note: 'Approx. ₹800–₹1,200/year (billed directly by registrar)' },
      { label: 'Cloud Hosting / VPS', note: 'Approx. ₹2,000–₹8,000/year (based on student capacity)' },
      { label: 'Custom Feature Add-ons', note: 'Quoted transparently based on custom specification' },
      { label: 'Annual AMC & Maintenance', note: 'Optional SLA support packages available' },
    ],
    cta: { label: 'Get School ERP License', href: '/contact' },
  },
  {
    id: 'custom',
    name: 'Custom Software & SaaS',
    tagline: 'Tailored specifically for your business logic',
    price: 'Project Scoped',
    priceNote: 'Milestone-based billing breakdown',
    highlight: false,
    badge: 'Bespoke Engineering',
    features: [
      'Full-stack Next.js web applications',
      'Multi-vendor e-commerce engines',
      'Custom ERP & operational dashboards',
      'Cross-platform mobile applications',
      'Secure Node.js & Express REST APIs',
      'Real-time Socket.IO systems',
      'Payment gateway & SMS integrations',
      'Complete database schema & indexing',
      'Comprehensive security & auth hardening',
      '100% intellectual property & code ownership',
    ],
    additionalCosts: [
      { label: 'Transparent Estimates', note: 'Detailed breakdown before a single line of code is written' },
      { label: 'Milestone Payments', note: 'Pay as features are demonstrated and verified' },
    ],
    cta: { label: 'Discuss Your Scope', href: '/contact' },
  },
];

export default function PricingPage() {
  return (
    <Layout>
      <SEO
        title="Transparent Pricing"
        description="Clear, honest pricing for Digital Crowd Technologies software products and custom engineering services. School ERP from ₹9,999."
        canonical="/pricing"
      />

      {/* Header */}
      <section className="relative z-10 pt-36 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3.5 py-1 mb-4 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-300">
                Transparent Billing
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Honest pricing. <br />
              <span className="text-gradient-orange">Zero hidden fees</span>.
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed max-w-xl mx-auto">
              We separate license costs, infrastructure costs, and customization work so you always have 100% clarity on your investment.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 pb-28">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {PRICING_TIERS.map((tier) => (
              <StaggerItem key={tier.id}>
                <div
                  className={`relative flex flex-col justify-between h-full rounded-[2.5rem] border p-8 sm:p-10 backdrop-blur-2xl transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${
                    tier.highlight
                      ? 'border-blue-500/40 bg-gradient-to-b from-[#0E2442]/80 via-[#0A192F]/60 to-[#0A192F]/40 shadow-[0_20px_60px_rgba(0,102,255,0.25)]'
                      : 'border-white/15 bg-[#0A192F]/40 hover:border-blue-400/30'
                  }`}
                >
                  
                  {tier.highlight && (
                    <div className="absolute -top-3.5 left-8 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-orange-500 px-3.5 py-1 text-xs font-bold text-white shadow-md">
                      <Sparkles size={12} />
                      <span>{tier.badge}</span>
                    </div>
                  )}

                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                      {tier.name}
                    </span>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-2">
                      {tier.tagline}
                    </h2>

                    <div className="my-6 pb-6 border-b border-white/10">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl sm:text-5xl font-black text-white">{tier.price}</span>
                      </div>
                      <span className="font-mono text-xs text-blue-300 mt-1 block">{tier.priceNote}</span>
                    </div>

                    {/* Features List */}
                    <div className="mb-8">
                      <span className="font-mono text-xs uppercase tracking-wider text-slate-400 block mb-3">
                        What&apos;s Included:
                      </span>
                      <ul className="space-y-2.5" role="list">
                        {tier.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                            <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Additional Infrastructure Costs */}
                    {tier.additionalCosts.length > 0 && (
                      <div className="mb-8 p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 block mb-2.5 font-bold">
                          Transparent Cost Disclosures:
                        </span>
                        <div className="space-y-2 text-xs">
                          {tier.additionalCosts.map((c) => (
                            <div key={c.label}>
                              <span className="font-semibold text-slate-200">{c.label}: </span>
                              <span className="text-slate-400">{c.note}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Link
                    href={tier.cta.href}
                    className={`inline-flex items-center justify-center gap-2 rounded-xl py-4 px-6 text-sm font-bold transition-all ${
                      tier.highlight
                        ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-[0_10px_30px_rgba(0,102,255,0.4)] hover:scale-[1.02]'
                        : 'border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-blue-400/40'
                    }`}
                  >
                    <span>{tier.cta.label}</span>
                    <ArrowRight size={16} />
                  </Link>

                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </Layout>
  );
}
