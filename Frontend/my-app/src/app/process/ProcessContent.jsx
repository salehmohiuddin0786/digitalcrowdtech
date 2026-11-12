"use client";

import React, { useState } from "react";
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
  Search,
  PenTool,
  Cpu,
  Check,
  Terminal,
  Gauge,
  Lock,
  Globe,
  Database,
  Phone,
  ChevronDown,
  ExternalLink,
  Zap,
  Lightbulb,
  Pencil,
} from "lucide-react";
import SectionHeading from "../Component/SectionHeading";
import BorderBeam from "../Component/BorderBeam";
import { SpotlightCard } from "../Component/SpotlightCard";
import { COMPANY } from "../data/company";

export default function ProcessContent() {
  const steps = [
    {
      num: "01",
      name: "Discovery & Requirements",
      phase: "Phase 01",
      duration: "1–3 Days",
      icon: Search,
      tagline: "Clarity Before Code",
      desc: "Every successful system starts with deep alignment. We conduct structured requirement workshops to dissect your business model, understand customer pain points, document user workflows, and define clear success criteria.",
      deliverables: [
        "Comprehensive Functional Scope Document",
        "Target Persona & User Journey Mapping",
        "Technical Feasibility & Integration Assessment",
        "Clear, Fixed Milestone Roadmap",
      ],
      clientAction: "Provide business goals, existing brand assets, and reference workflows.",
      visualType: "discovery",
    },
    {
      num: "02",
      name: "Technical Blueprint & Architecture",
      phase: "Phase 02",
      duration: "2–4 Days",
      icon: Cpu,
      tagline: "Engineered for Scalability",
      desc: "Before sketching UI or writing code, our lead engineers architect the full system foundation: frontend routing paradigms, RESTful API contracts, normalized MySQL relational database schemas, and caching layers.",
      deliverables: [
        "Full-Stack Architecture Specification",
        "Normalized MySQL Relational Schema (ERD)",
        "API Contract & Authentication Strategy",
        "Zero-Surprise Fixed Project Quote",
      ],
      clientAction: "Review and approve the architectural specification and milestone breakdown.",
      visualType: "architecture",
    },
    {
      num: "03",
      name: "UI/UX & Interactive Design",
      phase: "Phase 03",
      duration: "3–6 Days",
      icon: PenTool,
      tagline: "High-Conversion User Experience",
      desc: "We design modern, pixel-perfect user interfaces engineered specifically for your target audience. We prioritize mobile thumb navigation, visual hierarchy, conversion-driven CTAs, and accessible typography.",
      deliverables: [
        "High-Fidelity Responsive Interface Layouts",
        "Design System (Colors, Typography, UI Tokens)",
        "Mobile & Tablet Breakpoint Prototypes",
        "Interactive Clickable Screen Previews",
      ],
      clientAction: "Test wireframes, provide visual feedback, and grant design approval.",
      visualType: "design",
    },
    {
      num: "04",
      name: "Full-Stack Development",
      phase: "Phase 04",
      duration: "1–3 Weeks",
      icon: Code2,
      tagline: "Clean, Modular Engineering",
      desc: "Our engineering team writes clean, production-grade code. We construct responsive Next.js frontend pages, secure Express.js REST microservices, structured database queries with indexes, and integrate essential payment/OTP APIs.",
      deliverables: [
        "Next.js App Router Frontend Implementation",
        "Secure Node.js / Express REST Endpoints",
        "Normalized Database Tables with Foreign Keys",
        "Third-Party Payment Gateway & SMS/OTP Integration",
      ],
      clientAction: "Access live password-protected staging builds to test emerging features.",
      visualType: "code",
    },
    {
      num: "05",
      name: "Rigorous QA & Security Testing",
      phase: "Phase 05",
      duration: "2–4 Days",
      icon: Gauge,
      tagline: "Zero Compromise on Quality",
      desc: "We subject the codebase to thorough functional testing. We verify responsive rendering across real mobile and desktop browsers, validate form sanitation to prevent XSS/SQL injection, and optimize Core Web Vitals to 90+.",
      deliverables: [
        "Cross-Browser Testing (Chrome, Safari, Firefox, Edge)",
        "Mobile Responsiveness & Touch Target Audit",
        "Security, Auth & Payload Validation Checks",
        "Performance Optimization (>90 Core Web Vitals)",
      ],
      clientAction: "Perform User Acceptance Testing (UAT) and verify real business scenarios.",
      visualType: "qa",
    },
    {
      num: "06",
      name: "Production Deployment",
      phase: "Phase 06",
      duration: "1–2 Days",
      icon: Server,
      tagline: "Live on Your Domain",
      desc: "We configure your production hosting environment (Linux Cloud VPS or Vercel), link custom DNS records with your registrar, activate TLS/SSL certificates (HTTPS), set up PM2 process supervision, and monitor traffic launch.",
      deliverables: [
        "Production Server / Cloud VPS Configuration",
        "Free Wildcard SSL / TLS Encryption (HTTPS)",
        "Domain DNS Records & Reverse Proxy Setup",
        "Automated Process Supervision & Error Logging",
      ],
      clientAction: "Provide domain registrar access or delegate DNS records for launch.",
      visualType: "deployment",
    },
    {
      num: "07",
      name: "Handover & Ongoing Growth",
      phase: "Phase 07",
      duration: "Ongoing",
      icon: GitBranch,
      tagline: "100% Intellectual Property Ownership",
      desc: "Unlike agencies that trap clients with proprietary lock-in, we deliver 100% of the GitHub source code, database dumps, and server credentials. We include a 30-day post-launch warranty and provide clear technical guidance.",
      deliverables: [
        "Complete GitHub Repository Ownership Handover",
        "Full Database Dump & Admin Master Credentials",
        "30-Day Post-Launch Warranty & Bug-Fix Guarantee",
        "Comprehensive Admin Operation Documentation",
      ],
      clientAction: "Receive repository transfer and take full custody of your digital assets.",
      visualType: "handover",
    },
  ];

  const standards = [
    {
      title: "Direct Developer Communication",
      desc: "You collaborate directly with the engineers building your code via WhatsApp, Google Meet, or direct phone. No non-technical middlemen or lost requirements.",
      icon: MessageSquare,
      highlight: "Zero Middlemen",
    },
    {
      title: "Milestone-Linked Approvals",
      desc: "Projects are divided into verifiable deliverables. You review and approve each stage (Discovery → Wireframes → Staging Demo) before the next phase begins.",
      icon: Layers,
      highlight: "Step-by-Step",
    },
    {
      title: "100% Source Code Handover",
      desc: "Upon final milestone clearance, complete repository access, database schemas, and credentials belong 100% to you. Zero vendor lock-in.",
      icon: GitBranch,
      highlight: "You Own It",
    },
    {
      title: "Fair & Transparent Invoicing",
      desc: "Payments are linked directly to agreed milestones with zero hidden surprises. You know exactly what you are paying for at every step.",
      icon: CreditCard,
      highlight: "No Hidden Costs",
    },
    {
      title: "High Performance & Security",
      desc: "Every system is built to achieve 90+ Core Web Vitals with clean semantic markup, fast database queries, and robust API payload sanitization.",
      icon: ShieldCheck,
      highlight: "90+ Speed Score",
    },
    {
      title: "Post-Launch Warranty",
      desc: "We stand behind our code. Every launch includes a dedicated 30-day grace period for rapid bug fixing, technical guidance, and launch monitoring.",
      icon: FileCheck,
      highlight: "30-Day Support",
    },
  ];

  const faqs = [
    {
      q: "How long does the entire 7-step process take?",
      a: "A standard business website typically takes 5–10 business days from Step 01 to Step 06. Custom full-stack web applications or e-commerce platforms usually take 2–4 weeks depending on the number of roles, custom workflows, and third-party API integrations.",
    },
    {
      q: "Can I request changes during the design or development phase?",
      a: "Yes. During Step 03 (Design Approval) and Step 04 (Staging Previews), we actively invite your feedback. We discuss adjustments collaboratively so that the final launch matches your vision precisely.",
    },
    {
      q: "What do I need to prepare before starting Step 01?",
      a: "All you need is an idea or outline of your business requirements. If you have an existing logo, branding guidelines, or reference websites you like, sharing those speeds up the discovery consultation.",
    },
    {
      q: "Who owns the domain name, hosting, and source code?",
      a: "You own 100% of everything. We register the domain and server under your accounts or transfer full credentials upon launch. All GitHub repositories, databases, and assets belong entirely to your business.",
    },
    {
      q: "What happens if a bug or issue appears after launch?",
      a: "Every project includes a 30-day post-launch warranty period where our engineering team resolves any functional bugs at zero extra cost. We also offer affordable ongoing maintenance retainers for scaling businesses.",
    },
    {
      q: "Where is your engineering team located?",
      a: "Our core engineering office is located in Unit No 203, SBR CV Towers, Madhapur, Hyderabad. We deliver direct engineering, staging demos, and deployment support pan-India.",
    },
  ];

  const supportAvatars = [
    {
      name: "Engineering Lead",
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
      fallback: "/avatars/avatar-1.svg",
    },
    {
      name: "Full-Stack Dev",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
      fallback: "/avatars/avatar-2.svg",
    },
    {
      name: "UI/UX Designer",
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces",
      fallback: "/avatars/avatar-3.svg",
    },
    {
      name: "Backend Architect",
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
      fallback: "/avatars/avatar-4.svg",
    },
    {
      name: "Project Consultant",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=faces",
      fallback: "/avatars/avatar-5.svg",
    },
  ];

  const renderFaqIcon = (idx) => {
    const mod = idx % 3;
    if (mod === 0) {
      return (
        <div
          className="w-10 h-10 rounded-full bg-[#F87000]/10 [html.light_&]:bg-orange-50 border border-[#F87000]/25 [html.light_&]:border-orange-200 text-[#F87000] [html.light_&]:text-orange-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0"
          aria-hidden="true"
        >
          <Zap size={18} strokeWidth={2.2} />
        </div>
      );
    }
    if (mod === 1) {
      return (
        <div
          className="w-10 h-10 rounded-full bg-[#2F7DE1]/10 [html.light_&]:bg-blue-50 border border-[#2F7DE1]/25 [html.light_&]:border-blue-200 text-[#2F7DE1] [html.light_&]:text-blue-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0"
          aria-hidden="true"
        >
          <Lightbulb size={18} strokeWidth={2.2} />
        </div>
      );
    }
    return (
      <div
        className="w-10 h-10 rounded-full bg-emerald-500/10 [html.light_&]:bg-emerald-50 border border-emerald-500/25 [html.light_&]:border-emerald-200 text-emerald-400 [html.light_&]:text-emerald-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0"
        aria-hidden="true"
      >
        <Pencil size={18} strokeWidth={2.2} />
      </div>
    );
  };

  const renderStepVisual = (type) => {
    switch (type) {
      case "discovery":
        return (
          <div className="rounded-2xl bg-[#0F172A]/90 [html.light_&]:bg-slate-50 p-5 border border-white/10 [html.light_&]:border-slate-200 text-xs font-mono space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 [html.light_&]:border-slate-200">
              <span className="text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                scope_matrix.json
              </span>
              <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded font-bold">
                Discovery Verified
              </span>
            </div>
            <div className="space-y-1.5 text-slate-300 [html.light_&]:text-slate-700">
              <div className="flex items-center justify-between">
                <span>• Business Objectives:</span>
                <span className="text-emerald-400 font-bold">Documented</span>
              </div>
              <div className="flex items-center justify-between">
                <span>• Target Personas:</span>
                <span className="text-blue-400 font-bold">3 Core Workflows</span>
              </div>
              <div className="flex items-center justify-between">
                <span>• Tech Stack Selection:</span>
                <span className="text-[#F87000] font-bold">Next.js + Node + MySQL</span>
              </div>
              <div className="flex items-center justify-between">
                <span>• Budget &amp; Milestone Plan:</span>
                <span className="text-emerald-400 font-bold">Locked (Fixed Price)</span>
              </div>
            </div>
            <div className="pt-2 border-t border-white/10 [html.light_&]:border-slate-200 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Punctuality Score:</span>
              <span className="text-emerald-400 font-bold">100% on Track</span>
            </div>
          </div>
        );

      case "architecture":
        return (
          <div className="rounded-2xl bg-[#0F172A]/90 [html.light_&]:bg-slate-50 p-5 border border-white/10 [html.light_&]:border-slate-200 text-xs font-mono space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 [html.light_&]:border-slate-200">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Cpu size={13} className="text-[#2F7DE1]" />
                system_blueprint.spec
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                Tier-1 Stack
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-lg bg-white/[0.03] [html.light_&]:bg-white border border-white/5 [html.light_&]:border-slate-200">
                <span className="text-[#2F7DE1] font-bold block">Frontend UI</span>
                <span className="text-slate-400">Next.js App Router (SSR)</span>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03] [html.light_&]:bg-white border border-white/5 [html.light_&]:border-slate-200">
                <span className="text-[#F87000] font-bold block">API Microservice</span>
                <span className="text-slate-400">Node.js + Express 5</span>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03] [html.light_&]:bg-white border border-white/5 [html.light_&]:border-slate-200">
                <span className="text-emerald-400 font-bold block">Relational DB</span>
                <span className="text-slate-400">MySQL (Indexed Tables)</span>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03] [html.light_&]:bg-white border border-white/5 [html.light_&]:border-slate-200">
                <span className="text-indigo-400 font-bold block">Security</span>
                <span className="text-slate-400">JWT + Argon2 Hashing</span>
              </div>
            </div>
            <div className="p-2 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-300">
              ⚡ Guaranteed zero monthly aggregator cuts &amp; full database isolation.
            </div>
          </div>
        );

      case "design":
        return (
          <div className="rounded-2xl bg-[#0F172A]/90 [html.light_&]:bg-slate-50 p-5 border border-white/10 [html.light_&]:border-slate-200 text-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 [html.light_&]:border-slate-200 text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <PenTool size={13} className="text-[#F87000]" />
                ui_prototype_v2.fig
              </span>
              <span className="text-[10px] text-[#F87000] bg-orange-500/10 px-2 py-0.5 rounded font-bold">
                100% Mobile First
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 [html.light_&]:text-slate-700">
                <span>Responsive Viewports:</span>
                <span className="text-blue-400 font-bold">390px • 768px • 1440px</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] font-mono text-slate-400">Design Tokens:</span>
                <div className="flex items-center gap-1.5 ml-auto">
                  <div className="w-5 h-5 rounded-full bg-[#0B1220] border border-white/20" title="Obsidian Page" />
                  <div className="w-5 h-5 rounded-full bg-[#2F7DE1]" title="Royal Blue Accent" />
                  <div className="w-5 h-5 rounded-full bg-[#F87000]" title="Electric Orange Brand" />
                  <div className="w-5 h-5 rounded-full bg-[#FFFFFF] border border-slate-300" title="Crisp White" />
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.03] [html.light_&]:bg-white border border-white/5 [html.light_&]:border-slate-200 text-[11px] text-slate-300 [html.light_&]:text-slate-600 flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>Thumb-friendly bottom touch navigation validated.</span>
              </div>
            </div>
          </div>
        );

      case "code":
        return (
          <div className="rounded-2xl bg-[#090D16] p-4 border border-white/10 font-mono text-[11px] text-slate-300 shadow-inner">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-slate-400 text-[10px]">api/controllers/orderController.js</span>
              </div>
              <span className="text-[9px] text-emerald-400 font-bold">PASSING</span>
            </div>
            <pre className="text-slate-300 overflow-x-auto leading-relaxed">
              <code>
                <span className="text-purple-400">export async function</span>{" "}
                <span className="text-blue-400">createOrder</span>(req, res) &#123;{"\n"}
                {"  "}<span className="text-slate-500">// Transactional integrity with MySQL</span>{"\n"}
                {"  "}const order = await db.orders.<span className="text-yellow-300">create</span>(&#123;{"\n"}
                {"    "}userId: req.user.id,{"\n"}
                {"    "}status: <span className="text-emerald-400">&quot;CONFIRMED&quot;</span>,{"\n"}
                {"    "}amount: req.body.total,{"\n"}
                {"  "}&#125;);{"\n"}
                {"  "}<span className="text-purple-400">return</span> res.json(&#123; success: true, id: order.id &#125;);{"\n"}
                &#125;
              </code>
            </pre>
          </div>
        );

      case "qa":
        return (
          <div className="rounded-2xl bg-[#0F172A]/90 [html.light_&]:bg-slate-50 p-5 border border-white/10 [html.light_&]:border-slate-200 text-xs font-mono space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 [html.light_&]:border-slate-200 text-slate-400">
              <span className="flex items-center gap-1.5">
                <Gauge size={13} className="text-emerald-400" />
                lighthouse_audit_report.json
              </span>
              <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded">
                Score: 98/100
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded bg-white/[0.03] [html.light_&]:bg-white border border-white/5 [html.light_&]:border-slate-200">
                <span className="text-emerald-400 font-bold block">Performance</span>
                <span className="text-slate-300 [html.light_&]:text-slate-700">99 / 100</span>
              </div>
              <div className="p-2 rounded bg-white/[0.03] [html.light_&]:bg-white border border-white/5 [html.light_&]:border-slate-200">
                <span className="text-emerald-400 font-bold block">Accessibility</span>
                <span className="text-slate-300 [html.light_&]:text-slate-700">100 / 100</span>
              </div>
              <div className="p-2 rounded bg-white/[0.03] [html.light_&]:bg-white border border-white/5 [html.light_&]:border-slate-200">
                <span className="text-emerald-400 font-bold block">Best Practices</span>
                <span className="text-slate-300 [html.light_&]:text-slate-700">100 / 100</span>
              </div>
              <div className="p-2 rounded bg-white/[0.03] [html.light_&]:bg-white border border-white/5 [html.light_&]:border-slate-200">
                <span className="text-emerald-400 font-bold block">SEO Architecture</span>
                <span className="text-slate-300 [html.light_&]:text-slate-700">100 / 100</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
              <span>Cross-Browser Verified:</span>
              <span className="text-blue-400 font-bold">Chrome • Safari • iOS • Android</span>
            </div>
          </div>
        );

      case "deployment":
        return (
          <div className="rounded-2xl bg-[#090D16] p-4 border border-white/10 font-mono text-[11px] text-slate-300 space-y-2.5 shadow-inner">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-slate-500">
              <span className="text-slate-400 text-[10px] flex items-center gap-1.5">
                <Server size={12} className="text-[#2F7DE1]" />
                production_cluster (Ubuntu 24.04 LTS)
              </span>
              <span className="text-emerald-400 font-bold text-[9px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                ONLINE
              </span>
            </div>
            <div className="space-y-1 text-slate-300">
              <p className="text-emerald-400">✔ PM2 Process Supervisor: 4 Workers Online</p>
              <p className="text-emerald-400">✔ TLS 1.3 / SSL Encryption: Active (A+ Grade)</p>
              <p className="text-emerald-400">✔ Nginx Reverse Proxy: Configured with Gzip/Brotli</p>
              <p className="text-blue-400">✔ Domain Propagation: 100% Globally Synced</p>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
              <span>Average Response Latency:</span>
              <span className="text-emerald-400 font-bold">&lt; 38ms</span>
            </div>
          </div>
        );

      case "handover":
        return (
          <div className="rounded-2xl bg-[#0F172A]/90 [html.light_&]:bg-slate-50 p-5 border border-white/10 [html.light_&]:border-slate-200 text-xs font-mono space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 [html.light_&]:border-slate-200 text-slate-400">
              <span className="flex items-center gap-1.5">
                <GitBranch size={13} className="text-emerald-400" />
                repository_transfer.done
              </span>
              <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded">
                100% Client IP
              </span>
            </div>
            <div className="space-y-1.5 text-slate-300 [html.light_&]:text-slate-700 text-[11px]">
              <div className="flex items-center justify-between">
                <span>• GitHub Repository:</span>
                <span className="text-blue-400 font-bold">Ownership Transferred</span>
              </div>
              <div className="flex items-center justify-between">
                <span>• Database Schemas:</span>
                <span className="text-emerald-400 font-bold">Full SQL Dump Provided</span>
              </div>
              <div className="flex items-center justify-between">
                <span>• Master Admin Keys:</span>
                <span className="text-[#F87000] font-bold">Vault Sealed</span>
              </div>
              <div className="flex items-center justify-between">
                <span>• Post-Launch Warranty:</span>
                <span className="text-emerald-400 font-bold">30 Days Active</span>
              </div>
            </div>
            <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-300">
              🔒 Zero proprietary vendor lock-in. You own every line of code.
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col bg-transparent">
      {/* 1. HERO SECTION WITH RADIAL GLOW & QUICK NAV */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-white/10 [html.light_&]:border-slate-200">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-[#2F7DE1]/20 via-[#F87000]/15 to-transparent blur-[130px] pointer-events-none -z-10 rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#2F7DE1]/10 border border-[#2F7DE1]/30 text-[#2F7DE1] mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-[#F87000]" />
            <span>The Engineering Lifecycle • 7 Clear Milestones</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white [html.light_&]:text-[#0A2540] tracking-tight leading-tight">
            From Blueprint to Launch: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F7DE1] via-blue-400 to-[#F87000]">
              Our Disciplined Process
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 [html.light_&]:text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We follow a structured 7-step engineering roadmap to eliminate surprises, ensure punctual delivery, and build dependable software you 100% own.
          </p>

          {/* Quick-Jump Phase Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
            {steps.map((st) => (
              <a
                key={st.num}
                href={`#step-${st.num}`}
                className="px-3 py-1.5 rounded-full bg-white/5 [html.light_&]:bg-slate-100 hover:bg-[#2F7DE1]/20 [html.light_&]:hover:bg-blue-100 border border-white/10 [html.light_&]:border-slate-200 text-slate-300 [html.light_&]:text-slate-700 hover:text-[#2F7DE1] transition-all flex items-center gap-1.5"
              >
                <span className="text-[#F87000] font-bold">{st.num}</span>
                <span>{st.name.split(" ")[0]}</span>
              </a>
            ))}
          </div>

          {/* 4 Guarantees Pill Bar */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-white/10 [html.light_&]:border-slate-200 text-left">
            <div className="p-3 rounded-xl glass-card-premium">
              <span className="text-xs font-bold text-white [html.light_&]:text-[#0A2540] block">
                Direct Engineers
              </span>
              <span className="text-[11px] text-slate-400">Zero middlemen</span>
            </div>
            <div className="p-3 rounded-xl glass-card-premium">
              <span className="text-xs font-bold text-[#F87000] block">
                Step Approvals
              </span>
              <span className="text-[11px] text-slate-400">You test every phase</span>
            </div>
            <div className="p-3 rounded-xl glass-card-premium">
              <span className="text-xs font-bold text-blue-400 block">
                100% Code Handover
              </span>
              <span className="text-[11px] text-slate-400">Zero vendor lock-in</span>
            </div>
            <div className="p-3 rounded-xl glass-card-premium">
              <span className="text-xs font-bold text-emerald-400 block">
                30-Day Warranty
              </span>
              <span className="text-[11px] text-slate-400">Post-launch safety</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 7-STEP INTERACTIVE TIMELINE ROADMAP */}
      <section className="py-20 md:py-28 bg-transparent border-b border-white/10 [html.light_&]:border-slate-200 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The 7 Milestones"
            title="Step-by-Step Engineering Execution"
            subtitle="Explore exactly how we take your initial idea and engineer it into a scalable, high-performance web platform."
          />

          <div className="space-y-12 sm:space-y-16 relative">
            {steps.map((st, idx) => {
              const Icon = st.icon;
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={st.num}
                  id={`step-${st.num}`}
                  className="rounded-3xl glass-card-premium p-6 sm:p-10 shadow-2xl relative overflow-hidden group border border-white/10 [html.light_&]:border-slate-200 scroll-mt-28"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left/Right Text Content */}
                    <div className={`lg:col-span-7 space-y-4 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                      {/* Step Header Badges */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="w-10 h-10 rounded-xl bg-[#2F7DE1]/15 border border-[#2F7DE1]/30 text-[#2F7DE1] font-mono text-base font-black flex items-center justify-center shrink-0">
                          {st.num}
                        </span>
                        <span className="text-xs font-mono uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md font-bold">
                          {st.phase}
                        </span>
                        <span className="text-xs font-mono text-slate-400 bg-white/5 [html.light_&]:bg-slate-100 px-2.5 py-1 rounded-md">
                          Est: {st.duration}
                        </span>
                        <span className="text-xs font-semibold text-[#F87000] ml-auto hidden sm:inline-block">
                          {st.tagline}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white [html.light_&]:text-[#0A2540] tracking-tight">
                        {st.name}
                      </h2>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                        {st.desc}
                      </p>

                      {/* Deliverables Badges */}
                      <div className="pt-2">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2F7DE1] block mb-2">
                          Key Milestone Deliverables:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {st.deliverables.map((d, dIdx) => (
                            <div
                              key={dIdx}
                              className="flex items-start gap-2 text-slate-300 [html.light_&]:text-slate-700"
                            >
                              <CheckCircle2 size={14} className="text-[#2F7DE1] shrink-0 mt-0.5" />
                              <span>{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Client Role & Approval Point */}
                      <div className="pt-3 border-t border-white/10 [html.light_&]:border-slate-200 flex items-center gap-2 text-xs text-slate-400 [html.light_&]:text-slate-600">
                        <span className="font-bold text-white [html.light_&]:text-[#0A2540] shrink-0">Your Review:</span>
                        <span className="italic">{st.clientAction}</span>
                      </div>
                    </div>

                    {/* Technical Micro-Visual Card */}
                    <div className={`lg:col-span-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                      {renderStepVisual(st.visualType)}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. WORKING PRINCIPLES & ACCOUNTABILITY GUARANTEES */}
      <section className="py-20 md:py-28 bg-transparent border-b border-white/10 [html.light_&]:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Engineering Integrity"
            title="Communication, Milestones &amp; Ownership"
            subtitle="How we maintain transparency, deliverable quality, and professional accountability across every single engagement."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standards.map((std) => {
              const Icon = std.icon;
              return (
                <div
                  key={std.title}
                  className="p-6 rounded-3xl glass-card-premium space-y-4 shadow-xl hover:border-[#2F7DE1]/40 transition group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#2F7DE1]/10 text-[#2F7DE1] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {std.highlight}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white [html.light_&]:text-[#0A2540] group-hover:text-blue-400 transition-colors">
                    {std.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 [html.light_&]:text-slate-600 leading-relaxed">
                    {std.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PROCESS FAQ SECTION (EXACT MOCKUP GRID + OLD SIGNATURE PALETTE) */}
      <section className="py-20 md:py-28 bg-transparent border-b border-white/10 [html.light_&]:border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Elevated Card Container matching Mockup */}
          <div className="rounded-[2.25rem] sm:rounded-[2.75rem] lg:rounded-[3rem] bg-[#0B1220]/95 [html.light_&]:bg-white border border-white/10 [html.light_&]:border-slate-200/90 shadow-[0_25px_70px_rgba(0,0,0,0.65)] [html.light_&]:shadow-[0_25px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl p-7 sm:p-12 lg:p-16 transition-all duration-300">
            
            {/* Header matching image */}
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white [html.light_&]:text-slate-900 tracking-tight leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-400 [html.light_&]:text-slate-500 font-normal leading-relaxed">
                Here are the most asked questions based from our users.
              </p>
            </div>

            {/* 3-Column FAQ Grid */}
            <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-10 sm:gap-y-12">
              {faqs.map((faq, idx) => (
                <div key={idx} className="space-y-3 flex flex-col justify-start group">
                  {/* Circular Icon Badge */}
                  {renderFaqIcon(idx)}

                  {/* Question Title */}
                  <h3 className="text-base font-bold text-white [html.light_&]:text-slate-900 leading-snug tracking-tight">
                    {faq.q}
                  </h3>

                  {/* Answer Text */}
                  <p className="text-xs sm:text-sm text-slate-400 [html.light_&]:text-slate-600 leading-relaxed font-normal">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Support Live Chat Card */}
            <div className="mt-14 sm:mt-16 rounded-2xl sm:rounded-3xl bg-[#070D18]/90 [html.light_&]:bg-[#F8FAFC] border border-white/10 [html.light_&]:border-slate-200/80 p-7 sm:p-10 text-center relative overflow-hidden transition-all duration-200">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-32 bg-[#2F7DE1]/5 blur-2xl pointer-events-none rounded-full" />

              {/* Overlapping Avatar Stack */}
              <div className="flex items-center justify-center -space-x-2.5 mb-4 relative z-10">
                {supportAvatars.map((av, idx) => (
                  <div
                    key={idx}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full ring-2 ring-[#0B1220] [html.light_&]:ring-white overflow-hidden shadow-xs bg-slate-800 [html.light_&]:bg-slate-200 shrink-0 transition-transform hover:scale-110 hover:z-20 duration-150"
                    title={av.name}
                  >
                    <img
                      src={av.src}
                      alt={av.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = av.fallback;
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-white [html.light_&]:text-slate-900 tracking-tight relative z-10">
                Join Our Support Live Chat
              </h3>

              {/* Subtext */}
              <p className="mt-1.5 text-xs sm:text-sm text-slate-400 [html.light_&]:text-slate-600 max-w-md mx-auto relative z-10 leading-relaxed">
                If you still have other questions, why not join our live chat channel?
              </p>

              {/* Action Button */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 relative z-10">
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined" && window.Tawk_API && typeof window.Tawk_API.maximize === "function") {
                      window.Tawk_API.maximize();
                    } else {
                      window.location.href = "/contact";
                    }
                  }}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#2F7DE1] hover:bg-blue-600 shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>Get In Touch</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. HIGH-IMPACT FINAL CALL TO ACTION (WITH BORDERBEAM) */}
      <section className="py-20 md:py-28 bg-transparent relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative rounded-3xl glass-card-premium p-8 sm:p-14 text-center space-y-6 shadow-2xl overflow-hidden border border-white/10 [html.light_&]:border-slate-200">
            {/* Luminous Animated BorderBeam */}
            <BorderBeam duration={8} rx={24} strokeWidth={2} />

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#F87000]/10 border border-[#F87000]/30 text-[#F87000] uppercase tracking-wider">
              <Zap size={13} />
              <span>Initiate Step 01 Discovery</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white [html.light_&]:text-[#0A2540] tracking-tight">
              Ready to Turn Your Blueprint Into Reality?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 [html.light_&]:text-slate-600 max-w-xl mx-auto leading-relaxed">
              Business websites start from ₹4,999. Custom full-stack web applications start from ₹9,999. Share your requirements for a free 24-hour architectural estimate and milestone breakdown.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-[#0B1220] [html.light_&]:text-white bg-[#F87000] hover:bg-[#FF8A24] rounded-full shadow-lg shadow-orange-500/25 transition active:scale-[0.98]"
              >
                <span>Start Your Project</span>
                <ArrowRight size={16} />
              </Link>

              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white [html.light_&]:text-[#0A2540] bg-white/5 [html.light_&]:bg-slate-100 hover:bg-white/10 [html.light_&]:hover:bg-slate-200 border border-white/10 [html.light_&]:border-slate-300 rounded-full transition"
              >
                <Phone size={15} className="text-[#2F7DE1]" />
                <span>Call {COMPANY.phoneDisplay}</span>
              </a>
            </div>

            <p className="text-[11px] text-slate-400 [html.light_&]:text-slate-500 pt-2">
              Based in Madhapur, Hyderabad • Direct Engineer Access • 100% Client Code Ownership
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
