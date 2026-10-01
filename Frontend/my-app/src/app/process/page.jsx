import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Layers,
  Code2,
  ShieldCheck,
  Server,
  FileCheck,
  CreditCard,
  MessageSquare,
  GitBranch,
  Sparkles,
} from "lucide-react";
import SectionHeading from "../Component/SectionHeading";
import { HaikeiMeshGlow, HaikeiWave } from "../Component/HaikeiDecorations";

export const metadata = {
  title: "Our Development Process | From Idea to Launch | Digital Crowd Technologies",
  description:
    "Explore our 7-step engineering process: Discover, Plan, Design, Develop, Test, Deploy, and Support. Learn how we handle milestones, approvals, and source-code handover.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/process",
  },
};

export default function ProcessPage() {
  const steps = [
    {
      num: "01",
      name: "Discover",
      badge: "Requirements Gathering",
      desc: "We begin with a detailed consultation to understand your business goals, target audience, brand identity, and operational challenges. We list all necessary pages, user roles, workflows, and third-party integrations.",
      deliverables: ["Requirement documentation", "Scope breakdown", "Target user definition"],
    },
    {
      num: "02",
      name: "Plan",
      badge: "Technical Blueprint",
      desc: "We define the technical architecture: frontend frameworks, backend API endpoints, database schemas, and milestone timelines. You receive a clear scope document and a structured quote with zero surprises.",
      deliverables: ["Architecture blueprint", "Database schema plan", "Milestone schedule"],
    },
    {
      num: "03",
      name: "Design",
      badge: "UI/UX Prototyping",
      desc: "We design clean, modern, responsive wireframes and interface screens. We focus on visual hierarchy, mobile thumb navigation, high contrast typography, and high-conversion calls to action.",
      deliverables: ["Responsive UI layouts", "Color & typography design system", "Client design sign-off"],
    },
    {
      num: "04",
      name: "Develop",
      badge: "Full-Stack Implementation",
      desc: "Our engineering team writes clean, modular code. We implement the frontend in Next.js/React, build secure REST APIs in Node.js/Express, set up relational tables in MySQL, and integrate payment or communication APIs.",
      deliverables: ["Production-ready code", "Tested backend APIs", "Normalized database"],
    },
    {
      num: "05",
      name: "Test",
      badge: "Quality Assurance",
      desc: "Rigorous testing across screen resolutions (mobile, tablet, desktop) and major browsers. We verify form validation, API authentication, database constraints, load performance, and Core Web Vitals.",
      deliverables: ["Cross-browser QA check", "Form and security testing", "Performance verification"],
    },
    {
      num: "06",
      name: "Deploy",
      badge: "Production Launch",
      desc: "We configure your production hosting or Linux VPS server, set up SSL certificates (HTTPS), link DNS records with your domain registrar, and transition your application into live production.",
      deliverables: ["Live domain deployment", "SSL encryption active", "DNS propagation verified"],
    },
    {
      num: "07",
      name: "Support",
      badge: "Post-Launch Handover",
      desc: "We perform full source code and credentials handover. We provide launch monitoring, basic maintenance support, and remain available for feature expansions as your business scales.",
      deliverables: ["Complete source code handover", "Admin login credentials", "Post-launch warranty check"],
    },
  ];

  const standards = [
    {
      title: "Direct Engineering Communication",
      desc: "You communicate directly with the full-stack developers building your software. No account managers or non-technical middlemen misinterpreting your feedback.",
      icon: MessageSquare,
    },
    {
      title: "Milestone-Based Deliverables",
      desc: "Every project is divided into tangible milestones. You test and approve each stage (e.g. Design Approval, Staging Preview) before we proceed to the next.",
      icon: Layers,
    },
    {
      title: "Client Approvals & Transparency",
      desc: "You review working staging links during development so there are no surprises on launch day. Changes are discussed collaboratively.",
      icon: FileCheck,
    },
    {
      title: "Fair Payment Milestones",
      desc: "Payments are linked to verifiable milestone completions, giving you confidence and maintaining mutual accountability.",
      icon: CreditCard,
    },
    {
      title: "Full Source-Code Handover",
      desc: "Upon project completion and milestone clearance, complete repository access, database dumps, and credentials belong 100% to you.",
      icon: GitBranch,
    },
    {
      title: "Technical Documentation",
      desc: "We provide clear setup instructions and administrative guidance so your internal team can operate the software effortlessly.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-[#26344F]/60 [html.light_&]:border-slate-200">
        <HaikeiMeshGlow />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#2F7DE1]/10 border border-[#2F7DE1]/30 text-[#2F7DE1] mb-6">
            <Sparkles size={13} />
            <span>Engineering Lifecycle</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white [html.light_&]:text-[#0A2540] tracking-tight leading-tight">
            From Idea to Launch: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F7DE1] to-[#F87000]">
              Our Structured Process
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#C5CEDD] [html.light_&]:text-[#40484C] leading-relaxed">
            We follow a disciplined 7-step engineering process to eliminate ambiguity, ensure punctual delivery, and build digital software you can trust.
          </p>
        </div>
      </section>

      {/* 7 STEPS DETAILED */}
      <section className="py-20 bg-[#0B1220] [html.light_&]:bg-white border-b border-[#26344F]/60 [html.light_&]:border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-8 rounded-2xl bg-[#16223A] [html.light_&]:bg-[#F4F7FB] border border-[#26344F] [html.light_&]:border-slate-200 hover:border-[#2F7DE1]/40 transition-all duration-300 shadow-xl"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#26344F]/60 [html.light_&]:border-slate-200">
                <div className="flex items-center gap-4">
                  <span className="w-12 h-12 rounded-xl bg-[#2F7DE1]/15 border border-[#2F7DE1]/30 text-[#2F7DE1] font-mono text-lg font-bold flex items-center justify-center shrink-0">
                    {st.num}
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-white [html.light_&]:text-[#0A2540]">{st.name}</h2>
                    <span className="text-xs text-[#2F7DE1] font-semibold">{st.badge}</span>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm sm:text-base text-[#C5CEDD] [html.light_&]:text-[#40484C] leading-relaxed">
                {st.desc}
              </p>

              <div className="mt-6 pt-4 border-t border-[#26344F]/60 [html.light_&]:border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8494AD] [html.light_&]:text-[#64748B] block mb-2">
                  Key Deliverables:
                </span>
                <div className="flex flex-wrap gap-2">
                  {st.deliverables.map((d, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/[0.03] [html.light_&]:bg-white text-[#C5CEDD] [html.light_&]:text-[#40484C] border border-[#26344F] [html.light_&]:border-slate-200"
                    >
                      <CheckCircle2 size={13} className="text-[#2F7DE1] shrink-0" />
                      <span>{d}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STANDARDS & COMMITMENTS */}
      <section className="py-20 bg-[#101A2E] [html.light_&]:bg-[#F4F7FB] border-b border-[#26344F]/60 [html.light_&]:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Working Principles"
            title="Communication, Milestones & Ownership"
            subtitle="How we maintain transparency, deliverable quality, and professional accountability throughout."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standards.map((std) => {
              const Icon = std.icon;
              return (
                <div
                  key={std.title}
                  className="p-6 rounded-2xl bg-[#16223A] [html.light_&]:bg-white border border-[#26344F] [html.light_&]:border-slate-200 space-y-3 shadow-lg"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#2F7DE1]/10 text-[#2F7DE1] flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-white [html.light_&]:text-[#0A2540]">{std.title}</h3>
                  <p className="text-xs sm:text-sm text-[#8494AD] [html.light_&]:text-[#64748B] leading-relaxed">{std.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0B1220] [html.light_&]:bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
            Ready to Begin with Step 01?
          </h2>
          <p className="text-sm text-[#8494AD] [html.light_&]:text-[#64748B]">
            Tell us about your project requirements and let&apos;s start the discovery consultation.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-[#0B1220] [html.light_&]:text-white bg-[#F87000] hover:bg-[#FF8A24] rounded-full shadow-lg shadow-orange-500/25 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <span>Start Your Project</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
