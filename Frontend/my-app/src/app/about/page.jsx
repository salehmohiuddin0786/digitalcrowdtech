import React from "react";
import Link from "next/link";
import {
  Code2,
  Database,
  Server,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Target,
  Compass,
  Zap,
  Users,
  Terminal,
  ExternalLink,
  Check,
} from "lucide-react";
import SectionHeading from "../Component/SectionHeading";
import { COMPANY } from "../data/company";

export const metadata = {
  title: "About Us | Digital Crowd Technologies",
  description:
    "Learn about Digital Crowd Technologies: an honest, capable web development & software solutions agency based in Madhapur, Hyderabad.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/about",
  },
};

export default function AboutPage() {
  const approaches = [
    {
      title: "1. Business-First Requirements Analysis",
      desc: "Before writing any code, we study your target market, user expectations, and exact operational workflow to ensure software solves actual commercial bottlenecks.",
    },
    {
      title: "2. Full-Stack Cohesion",
      desc: "We don't just glue frontend templates together. We engineer complete systems: responsive React/Next.js frontends, scalable Node.js APIs, normalized MySQL databases, and reliable server deployments.",
    },
    {
      title: "3. Clean, Maintainable Code",
      desc: "Our code adheres to standard JavaScript/React paradigms without bloated dependencies. Everything is structured so your team or any future developer can easily extend it.",
    },
    {
      title: "4. Complete Client Ownership",
      desc: "We believe in honest partnerships. When a project is deployed and completed, 100% of the source code, database schemas, and credentials are completely handed over to you.",
    },
  ];

  return (
    <div className="flex flex-col bg-slate-50/50 [html.dark_&]:bg-transparent">
      {/* 1. HERO */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-200 [html.dark_&]:border-[#22344D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-[#567785]/10 text-[#567785] [html.dark_&]:text-[#8EAEBD] border border-[#567785]/30 mb-4">
            <span>About Digital Crowd Technologies</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E293B] [html.dark_&]:text-white tracking-tight leading-tight">
            Building Digital Solutions for <span className="text-[#E89228]">Real Businesses</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 [html.dark_&]:text-slate-300 leading-relaxed">
            We are a web development and software solutions agency based in Hyderabad. We design, develop, and deploy professional websites and custom software without corporate fluff or exaggerated claims.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <span className="px-3 py-1 rounded-lg bg-white [html.dark_&]:bg-[#152234] text-xs font-bold text-slate-700 [html.dark_&]:text-slate-300 border border-slate-200 [html.dark_&]:border-slate-700 shadow-xs">
              Madhapur, Hyderabad
            </span>
            <span className="px-3 py-1 rounded-lg bg-white [html.dark_&]:bg-[#152234] text-xs font-bold text-slate-700 [html.dark_&]:text-slate-300 border border-slate-200 [html.dark_&]:border-slate-700 shadow-xs">
              Frontend + Backend + DB
            </span>
            <span className="px-3 py-1 rounded-lg bg-white [html.dark_&]:bg-[#152234] text-xs font-bold text-slate-700 [html.dark_&]:text-slate-300 border border-slate-200 [html.dark_&]:border-slate-700 shadow-xs">
              Serving India Wide
            </span>
          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE & WHAT WE DO */}
      <section className="py-14 md:py-20 bg-transparent border-b border-slate-200 [html.dark_&]:border-[#22344D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase bg-[#567785]/10 border border-[#567785]/20 text-[#567785]">
                <span>Who We Are</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1E293B] [html.dark_&]:text-white">
                An Engineering-Led Agency Built on Integrity
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 [html.dark_&]:text-slate-300 leading-relaxed">
                Digital Crowd Technologies was established with a straightforward premise: modern businesses need dependable, capable digital partners who communicate transparently and build robust software that works.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 [html.dark_&]:text-slate-300 leading-relaxed">
                Unlike corporate brokers who subcontract work or rely on fragile, cracked website templates, our engineering team directly designs, codes, tests, and deploys every application from our Hyderabad base. We specialize in end-to-end full-stack development, bridging the gap between attractive visual design and complex backend database architecture.
              </p>
            </div>

            <div className="space-y-4 p-6 sm:p-8 rounded-2xl bg-white [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-[#26364A] shadow-sm">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase bg-[#E89228]/10 border border-[#E89228]/30 text-[#E89228]">
                <span>What We Do</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] [html.dark_&]:text-white">
                From Business Websites to Custom Software
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 [html.dark_&]:text-slate-300 leading-relaxed">
                We handle the entire digital product spectrum:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 [html.dark_&]:text-slate-300">
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-[#27AE60] shrink-0 mt-0.5" />
                  <span><strong>Business Websites:</strong> Fast, responsive, conversion-focused websites starting from ₹4,999.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-[#27AE60] shrink-0 mt-0.5" />
                  <span><strong>Custom Web Applications:</strong> Dynamic full-stack software with MySQL databases and role-based permissions starting from ₹9,999.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-[#27AE60] shrink-0 mt-0.5" />
                  <span><strong>E-commerce &amp; Platforms:</strong> Comprehensive transactional systems such as food delivery marketplaces (Ruchi Bazzar) and retail stores.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-[#27AE60] shrink-0 mt-0.5" />
                  <span><strong>Enterprise &amp; School ERPs:</strong> Multi-portal management systems uniting administrators, staff, parents, and students.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 3. TEAM & LEADERSHIP */}
      <section className="py-14 md:py-20 bg-white [html.dark_&]:bg-[#0D1520] border-b border-slate-200 [html.dark_&]:border-[#22344D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Real Engineering Team"
            title="WHO BUILDS YOUR SOFTWARE"
            subtitle="No fabricated employee rosters or fake stock executive bios. Meet our genuine engineering leadership."
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {COMPANY.leadership.map((member) => (
              <div
                key={member.name}
                className="p-6 sm:p-8 rounded-2xl bg-slate-50 [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-[#26364A] text-center space-y-4 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-[#567785] text-white font-mono text-xl font-bold flex items-center justify-center mx-auto shadow-sm">
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#1E293B] [html.dark_&]:text-white">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-[#E89228] uppercase tracking-wider mt-0.5">
                      {member.role}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Digital Crowd Technologies
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 [html.dark_&]:text-slate-300 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 [html.dark_&]:border-slate-700 flex items-center justify-center">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-peach text-xs font-bold"
                  >
                    <span>Connect on LinkedIn</span>
                    <ExternalLink size={12} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="py-14 text-center">
        <div className="max-w-xl mx-auto px-4">
          <Link
            href="/contact"
            className="btn-brand-orange text-xs font-bold"
          >
            <span>Discuss Your Project With Our Engineering Team</span>
            <ArrowRight size={13} className="ml-1.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
