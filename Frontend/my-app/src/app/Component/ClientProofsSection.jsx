"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Star,
  Quote,
  ArrowRight,
  TrendingUp,
  Server,
  Database,
  Layers,
  Sparkles,
  Building,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import BorderBeam from "./BorderBeam";

const DELIVERABLES = [
  {
    id: "ruchi-bazaar",
    client: "Ruchi Bazaar Hyperlocal Retail",
    category: "4-App Commerce Ecosystem",
    liveUrl: "https://foodsharing.ruchibazaar.in/",
    headline: "Zero Platform Commissions with 4 Connected Full-Stack Apps",
    problem: "Third-party food delivery aggregators take 25–30% per order, eating into retail margins.",
    solution: "Engineered independent Customer PWA, Merchant POS, Delivery Fleet app, and Central Admin on unified MySQL & Node.js backend.",
    stats: [
      { label: "Commission Saved", value: "100%" },
      { label: "Connected Apps", value: "4 Apps" },
      { label: "Deployment", value: "Live PWA" },
    ],
    tech: ["Next.js", "Node.js", "Express", "MySQL", "Socket.io"],
  },
  {
    id: "unity-credit",
    client: "Unity Credit / Cooperative Harmony",
    category: "Financial Ledger & Banking SaaS",
    liveUrl: "https://unitycredit.in/",
    headline: "Automated Micro-Lending & Audit Ledger Compliance",
    problem: "Manual ledger registers caused accounting discrepancies, delayed interest audits, and lost receipts.",
    solution: "Designed ACID-compliant relational MySQL database structure with automated installment schedules, penalty calculations, and PDF passbook generation.",
    stats: [
      { label: "Audit Accuracy", value: "100%" },
      { label: "Manual Errors", value: "Eliminated" },
      { label: "Status", value: "Live Portal" },
    ],
    tech: ["React", "Express", "MySQL (ACID)", "JWT RBAC"],
  },
  {
    id: "task-digitalcrowd",
    client: "TaskDigitalCrowd Enterprise",
    category: "Workflow & Performance Engine",
    liveUrl: "https://task.digitalcrowdtech.in/",
    headline: "Real-Time Project Coordination & Role-Based Permissions",
    problem: "Disjointed team chats made milestone tracking and individual accountability difficult to monitor.",
    solution: "Custom operational portal with Kanban workflows, time-stamped milestone sign-offs, and automated email notifications.",
    stats: [
      { label: "Coordination Speed", value: "+300%" },
      { label: "Visibility", value: "Real-time" },
      { label: "Access Control", value: "Strict RBAC" },
    ],
    tech: ["Next.js", "Node.js", "REST APIs", "Tailwind CSS"],
  },
  {
    id: "stareggs",
    client: "Star Eggs Wholesale",
    category: "Supply Chain & Pricing Distribution",
    liveUrl: "https://stareggs3.vercel.app/",
    headline: "Daily Dynamic Wholesale Pricing & Instant WhatsApp Invoicing",
    problem: "Wholesale egg market rates fluctuate daily; distributors lost hours calling 100+ retail vendors every morning.",
    solution: "Automated daily price board with instant 1-click WhatsApp quote broadcasts and responsive ordering layout.",
    stats: [
      { label: "Daily Rate Sync", value: "Instant" },
      { label: "Order Dispatch", value: "Direct WhatsApp" },
      { label: "Mobile Speed", value: "<1.2s" },
    ],
    tech: ["Next.js", "Tailwind CSS", "WhatsApp API", "Vercel"],
  },
];

const TESTIMONIALS = [
  {
    quote:
      "DigitalCrowd Tech built our multi-tenant cooperative lending platform with bulletproof ledger precision. No monthly SaaS licenses, 100% source code handed over to us.",
    author: "Mohammed Feroz",
    role: "Managing Director",
    company: "Unity Credit Cooperative",
    rating: 5,
    tag: "Financial SaaS",
  },
  {
    quote:
      "We needed an e-commerce ecosystem connecting our store, kitchen counter, and delivery boys without giving 30% cuts to aggregator apps. Usama and team delivered exactly that.",
    author: "Abdul Rahman",
    role: "Retail Operations Head",
    company: "Ruchi Bazaar Hyperlocal",
    rating: 5,
    tag: "E-Commerce Ecosystem",
  },
  {
    quote:
      "They delivered our business website in 5 days for ₹4,999. Fast mobile loading, WhatsApp chat button, and proper Google Maps placement. Refreshingly transparent pricing.",
    author: "K. Suresh Reddy",
    role: "Proprietor",
    company: "Reddy Real Estate & Logistics",
    rating: 5,
    tag: "Business Website",
  },
];

export default function ClientProofsSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-20 md:py-28 bg-[#090D16]/50 border-b border-white/5 relative overflow-hidden" id="proofs">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-orange-500/10 blur-[130px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          badge="Verified Deliverables & Client Outcomes"
          title="Engineered for Real Businesses. Proven in Production."
          subtitle="We don't deliver generic templates or Figma mockups without backend code. Here is how our platforms perform for active businesses across Hyderabad."
        />

        {/* Deliverables Interactive Case Showcase */}
        <div className="mb-16">
          {/* Deliverables Tab Selector */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none justify-start lg:justify-center">
            {DELIVERABLES.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 border ${
                  activeTab === idx
                    ? "bg-[#2F7DE1] text-white border-blue-400 shadow-lg shadow-blue-500/25"
                    : "bg-[#0D121F] text-slate-400 border-white/10 hover:text-white hover:border-white/20"
                }`}
              >
                <span>{item.client.split(" ")[0]}</span>
                <span className="text-[10px] opacity-75 font-mono">({item.category.split(" ")[0]})</span>
              </button>
            ))}
          </div>

          {/* Active Deliverable Card */}
          {DELIVERABLES[activeTab] && (
            <div className="rounded-3xl border border-white/10 bg-[#0D121F] p-6 sm:p-10 shadow-2xl relative overflow-hidden group">
              <BorderBeam duration={10} rx={24} strokeWidth={2} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Description */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Verified Live System</span>
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {DELIVERABLES[activeTab].category}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                    {DELIVERABLES[activeTab].headline}
                  </h3>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200">
                      <strong className="text-red-400 block mb-0.5 font-semibold">The Operational Challenge:</strong>
                      <span>{DELIVERABLES[activeTab].problem}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-200">
                      <strong className="text-blue-400 block mb-0.5 font-semibold">Our Engineered Solution:</strong>
                      <span>{DELIVERABLES[activeTab].solution}</span>
                    </div>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    <span className="text-[11px] text-slate-500 font-mono">Tech Stack:</span>
                    {DELIVERABLES[activeTab].tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Link */}
                  {DELIVERABLES[activeTab].liveUrl && (
                    <div className="pt-2">
                      <a
                        href={DELIVERABLES[activeTab].liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F87000] hover:bg-[#FF8A24] text-[#0B1220] font-bold text-xs transition shadow-lg shadow-orange-500/20"
                      >
                        <span>Inspect Live Deployment</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  )}
                </div>

                {/* Right Metrics Grid */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3.5">
                  {DELIVERABLES[activeTab].stats.map((st, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col justify-center"
                    >
                      <span className="text-xs text-slate-400 font-medium">{st.label}</span>
                      <span className="text-2xl sm:text-3xl font-black text-white mt-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                        {st.value}
                      </span>
                    </div>
                  ))}
                  <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-center gap-2.5">
                    <ShieldCheck size={20} className="shrink-0 text-blue-400" />
                    <span>100% Clean relational schema with zero vendor lock-in.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Client Testimonials Quote Grid */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              What Business Owners Say About Working With Us
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Direct feedback from business founders, directors, and operators in Hyderabad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-[#0D121F] border border-white/10 flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300 group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {t.tag}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" />
                      ))}
                    </div>
                  </div>

                  <Quote size={24} className="text-blue-500/30 mb-3" />

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#2F7DE1] to-[#F87000] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                      {t.author}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {t.role}, <span className="text-slate-300">{t.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Guarantees Strip */}
        <div className="mt-16 p-6 rounded-2xl bg-gradient-to-r from-blue-900/20 via-[#101A2E] to-orange-900/20 border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <span className="text-xl sm:text-2xl font-black text-white">100%</span>
            <p className="text-xs text-slate-400 mt-0.5">Codebase Handover</p>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black text-emerald-400">₹4,999</span>
            <p className="text-xs text-slate-400 mt-0.5">Transparent Starting Price</p>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black text-blue-400">Zero</span>
            <p className="text-xs text-slate-400 mt-0.5">Hidden Platform Fees</p>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black text-[#F87000]">Hyderabad</span>
            <p className="text-xs text-slate-400 mt-0.5">Direct Local Support</p>
          </div>
        </div>

      </div>
    </section>
  );
}
