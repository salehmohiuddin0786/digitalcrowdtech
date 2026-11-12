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
    <div className="flex flex-col">
      {/* 1. HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden tech-grid-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6">
            <span>About Digital Crowd Technologies</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Building Digital Solutions for <span className="text-gradient-brand">Real Businesses</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
            We are a web development and software solutions agency based in Hyderabad. We design, develop, and deploy professional websites and custom software without corporate fluff or exaggerated claims.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="px-3 py-1 rounded-md bg-white/5 text-xs text-slate-300 border border-white/5">
              Hyderabad, Telangana
            </span>
            <span className="px-3 py-1 rounded-md bg-white/5 text-xs text-slate-300 border border-white/5">
              Frontend + Backend + DB
            </span>
            <span className="px-3 py-1 rounded-md bg-white/5 text-xs text-slate-300 border border-white/5">
              Serving India Wide
            </span>
          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE & WHAT WE DO */}
      <section className="py-20 bg-transparent border-b border-white/10 [html.light_&]:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <span>Who We Are</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
                An Engineering-Led Agency Built on Integrity
              </h2>
              <p className="text-sm sm:text-base text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                Digital Crowd Technologies was established with a straightforward premise: modern businesses need dependable, capable digital partners who communicate transparently and build robust software that works.
              </p>
              <p className="text-sm sm:text-base text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                Unlike corporate brokers who subcontract work or rely on fragile, cracked website templates, our engineering team directly designs, codes, tests, and deploys every application from our Hyderabad base. We specialize in end-to-end full-stack development, bridging the gap between attractive visual design and complex backend database architecture.
              </p>
            </div>

            <div className="space-y-6 p-8 rounded-3xl glass-card-premium shadow-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <span>What We Do</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
                From Business Websites to Custom Software
              </h2>
              <p className="text-sm sm:text-base text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                We handle the entire digital product spectrum:
              </p>
              <ul className="space-y-3 text-sm text-slate-300 [html.light_&]:text-slate-600">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Business Websites:</strong> Fast, responsive, conversion-focused websites starting from ₹4,999.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Custom Web Applications:</strong> Dynamic full-stack software with MySQL databases and role-based permissions starting from ₹9,999.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>E-commerce & Platforms:</strong> Comprehensive transactional systems such as food delivery marketplaces (Ruchi Bazzar) and retail stores.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Enterprise & School ERPs:</strong> Multi-portal management systems uniting administrators, staff, parents, and students.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="py-20 bg-transparent border-b border-white/10 [html.light_&]:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="p-8 rounded-3xl glass-card-premium space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold text-white [html.light_&]:text-[#0A2540]">Our Mission</h3>
              <p className="text-sm text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                To equip small businesses, startups, schools, and growing enterprises with dependable, secure, and modern digital software without the typical agency delays, inflated costs, or technical lock-in.
              </p>
            </div>

            <div className="p-8 rounded-3xl glass-card-premium space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Compass size={24} />
              </div>
              <h3 className="text-xl font-bold text-white [html.light_&]:text-[#0A2540]">Our Vision</h3>
              <p className="text-sm text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                To become Hyderabad and India&apos;s most respected, honest software solutions partner, known for technical authenticity, zero fake claims, and software that drives tangible business growth.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. OUR DEVELOPMENT APPROACH */}
      <section className="py-20 bg-transparent border-b border-white/10 [html.light_&]:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Methodology"
            title="Our Development Approach"
            subtitle="How we structure our development cycles to ensure reliability and speed."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {approaches.map((app, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-card-premium hover:border-blue-500/40 transition shadow-md"
              >
                <h3 className="text-base font-bold text-white [html.light_&]:text-[#0A2540] mb-2">
                  {app.title}
                </h3>
                <p className="text-sm text-slate-400 [html.light_&]:text-slate-600 leading-relaxed">
                  {app.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TEAM & LEADERSHIP */}
      <section className="py-20 bg-transparent border-b border-white/10 [html.light_&]:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Real Engineering Team"
            title="Who Builds Your Software"
            subtitle="No fabricated employee rosters or fake stock executive bios. Meet our genuine engineering leadership."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {COMPANY.leadership.map((member) => (
              <div
                key={member.name}
                className="p-8 rounded-3xl glass-card-premium text-center space-y-4 shadow-xl hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-[#2F7DE1] text-white font-mono text-2xl font-bold flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white [html.light_&]:text-[#0A2540]">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#2F7DE1] uppercase tracking-wider mt-0.5">
                      {member.role}
                    </p>
                    <p className="text-xs text-slate-400 [html.light_&]:text-[#8494AD] mt-1">
                      Digital Crowd Technologies
                    </p>
                  </div>
                  <p className="text-sm text-slate-300 [html.light_&]:text-[#40484C] leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 [html.light_&]:border-slate-200 flex items-center justify-center">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-[#2F7DE1] hover:text-white bg-[#2F7DE1]/10 hover:bg-[#2F7DE1] border border-[#2F7DE1]/30 transition-all duration-200"
                  >
                    <span>Connect on LinkedIn</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="py-20 bg-transparent text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl glass-card-premium shadow-2xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
              Ready to Discuss Your Project?
            </h2>
            <p className="text-sm text-slate-300 [html.light_&]:text-slate-600 max-w-xl mx-auto">
              Tell us about your requirements and we&apos;ll schedule a direct technical consultation.
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-full shadow-lg transition"
              >
                <span>Start Your Project</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
