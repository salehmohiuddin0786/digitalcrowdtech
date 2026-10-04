import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Layers, Users, Database, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { SectionReveal } from '@/components/animations';
import { PRODUCTS, SITE } from '@/lib/data';

export async function getStaticPaths() {
  return {
    paths: PRODUCTS.map((p) => ({ params: { slug: p.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = PRODUCTS.find((p) => p.id === params.slug);
  if (!product) return { notFound: true };
  return { props: { product } };
}

const CASE_STUDY_CONTENT = {
  'ruchi-bazzar': {
    overview:
      'Ruchi Bazzar is a multi-role food delivery and commerce platform built to seamlessly synchronize customers, restaurant partners, delivery fleets, and administrative operators through unified real-time data channels.',
    challenge:
      'Food commerce operations involve continuous asynchronous events: rapid order placements, kitchen preparation statuses, real-time rider assignments, and customer notifications. Generic single-state architectures struggle with concurrency, leading to lost orders and inconsistent delivery tracking.',
    solution:
      'We engineered a multi-tier decoupled architecture: specialized role-based Next.js interfaces for customers, vendor partners, delivery drivers, and master admins. Real-time updates are orchestrated via a dedicated Node.js and Socket.IO micro-layer backed by an ACID-compliant MySQL database schema.',
    architecture: [
      { icon: Users, label: 'Multi-Role Frontend Apps', desc: 'Distinct interfaces tuned for high-volume customer ordering, vendor kitchen management, and mobile dispatch' },
      { icon: Layers, label: 'Node.js & Socket.IO Engine', desc: 'Low-latency event-driven server managing real-time order state broadcasts and bidirectional rider updates' },
      { icon: Database, label: 'ACID MySQL Data Layer', desc: 'Strict relational schema with transactional integrity for multi-vendor balance, order payouts, and item stock' },
      { icon: Lock, label: 'Role-Based Auth (RBAC)', desc: 'Secure JWT authentication with cryptographic role verification preventing unauthorized endpoint access' },
    ],
    process: [
      'Operational workflow modeling across customers, restaurants, drivers, and operations staff',
      'Normalized database schema architecture covering multi-vendor inventory and delivery dispatch',
      'REST API engineering with input sanitization, rate-limiting, and error handling',
      'Real-time WebSocket event dispatch for order acceptance, preparation, and rider tracking',
      'Responsive, mobile-optimized interface design ensuring fast tap-target access on mobile networks',
      'Rigorous end-to-end testing across concurrent order flows and network drop scenarios',
      'Production deployment on Linux VPS with PM2 cluster management and SSL termination',
    ],
    note: 'Active production system. Proprietary client usage volumes and metrics are kept confidential.',
  },
  'school-management': {
    overview:
      'The School Management System is a centralized institutional ERP platform developed to unify administration, faculty, students, and parents under a structured, secure digital environment.',
    challenge:
      'Educational institutions typically juggle fragmented tools: paper registers, offline spreadsheets, disconnected fee software, and manual phone notices. This causes fee reconciliation delays, inaccurate attendance records, and high administrative friction.',
    solution:
      'We built a unified Next.js & Node.js ERP suite that digitizes the entire academic workflow. Administrators control student profiles and automated fee receipt generation; teachers log daily attendance and marks; parents view live fee status and circulars in real-time.',
    architecture: [
      { icon: Users, label: 'Multi-Portal Role Access', desc: 'Secure segregated views for Super Admins, Principals, Accountants, Teachers, Students, and Parents' },
      { icon: Layers, label: 'Server-Rendered Next.js UI', desc: 'Instant page transitions with optimized server rendering to ensure smooth operation on school office desktops' },
      { icon: Database, label: 'Structured Institution DB', desc: 'Optimized schema handling multi-class timetables, student enrollments, fee ledgers, and academic marks' },
      { icon: Lock, label: 'Data Privacy & Ledger Logs', desc: 'Immutable fee transaction logs and role-scoped permissions ensuring confidential student information remains private' },
    ],
    process: [
      'In-depth discovery interviews with school principals, accountants, and teaching staff in Telangana',
      'Complete relational database modeling for classes, sections, fee categories, and attendance registers',
      'Fee engine engineering with automated receipt generation and fee collection status tracking',
      'Parent portal development with accessible mobile navigation for notices and exam schedules',
      'Multi-role permission matrix validation and session management',
      'Comprehensive testing on diverse screen resolutions (office desktops, laptops, and mobile phones)',
      'Documentation and deployment package ready for direct institution deployment',
    ],
    note: 'Available as a commercial software license at ₹9,999. Hosting, domain, and custom module modifications are quoted transparently.',
  },
};

export default function CaseStudyPage({ product }) {
  const content = CASE_STUDY_CONTENT[product.id];
  if (!content) return null;

  const isRuchi = product.id === 'ruchi-bazzar';
  const accentColor = isRuchi ? '#FF5E00' : '#0066FF';

  return (
    <Layout>
      <SEO
        title={`${product.name} Case Study`}
        description={`Architectural case study for ${product.name}: ${content.overview}`}
        canonical={`/case-studies/${product.id}`}
      />

      {/* Back Link */}
      <div className="relative z-10 pt-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          <span>All Case Studies</span>
        </Link>
      </div>

      {/* Header */}
      <section className="relative z-10 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
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
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                Production Case Study
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
              {product.name}
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mb-8">
              {content.overview}
            </p>

            <div className="flex flex-wrap gap-2">
              {product.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-white/10 bg-[#0A192F]/60 px-3 py-1.5 font-mono text-xs text-slate-200 backdrop-blur-md"
                >
                  {t}
                </span>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Main Breakdown Content */}
      <section className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 pb-28">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Challenge & Solution Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionReveal>
              <div className="h-full rounded-2xl border border-white/10 bg-[#0A192F]/40 p-8 backdrop-blur-xl">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-orange-400 block mb-3">
                  01 · The Business Challenge
                </span>
                <h2 className="text-xl font-bold text-white mb-3">Operational Friction</h2>
                <p className="text-slate-300 text-sm leading-relaxed">{content.challenge}</p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="h-full rounded-2xl border border-white/10 bg-[#0A192F]/40 p-8 backdrop-blur-xl">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-400 block mb-3">
                  02 · Architectural Solution
                </span>
                <h2 className="text-xl font-bold text-white mb-3">Engineered Resolution</h2>
                <p className="text-slate-300 text-sm leading-relaxed">{content.solution}</p>
              </div>
            </SectionReveal>
          </div>

          {/* Architecture Pillars */}
          <SectionReveal>
            <div className="rounded-[2.5rem] border border-white/15 bg-[#0A192F]/40 p-8 sm:p-10 backdrop-blur-2xl">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-300 block mb-6">
                03 · Technical Architecture Overview
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.architecture.map((arch) => {
                  const Icon = arch.icon;
                  return (
                    <div
                      key={arch.label}
                      className="p-5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md flex items-start gap-4"
                    >
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border"
                        style={{
                          backgroundColor: `${accentColor}15`,
                          borderColor: `${accentColor}30`,
                          color: accentColor,
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white mb-1">{arch.label}</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">{arch.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </SectionReveal>

          {/* Development Process Steps */}
          <SectionReveal>
            <div className="rounded-[2.5rem] border border-white/15 bg-[#0A192F]/40 p-8 sm:p-10 backdrop-blur-2xl">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-orange-400 block mb-6">
                04 · Engineering &amp; Delivery Workflow
              </span>

              <div className="space-y-3.5">
                {content.process.map((step, i) => (
                  <div key={i} className="flex items-start gap-3.5 text-sm text-slate-300">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/15 bg-white/5 font-mono text-xs font-bold text-slate-200">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Disclosure Note */}
          <SectionReveal>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-xs text-slate-400 leading-relaxed">
              <span className="font-bold text-slate-300">Verification &amp; Confidentiality Note: </span>
              {content.note}
            </div>
          </SectionReveal>

          {/* Bottom Action */}
          <div className="text-center pt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-orange-500 px-8 py-4 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
            >
              <span>Discuss Building a Similar System</span>
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </section>
    </Layout>
  );
}
