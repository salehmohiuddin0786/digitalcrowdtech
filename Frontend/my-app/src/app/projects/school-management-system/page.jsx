import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Users,
  Calendar,
  CreditCard,
  ShieldCheck,
  Server,
  Database,
  Layers,
  Cpu,
  FileText,
  Clock,
} from "lucide-react";
import SectionHeading from "../../Component/SectionHeading";
import { getProjectBySlug } from "../../data/projects";

export const metadata = {
  title: "School Management System Case Study | Digital Crowd Technologies",
  description:
    "Case study of our multi-tenant School Management System: Four dedicated portals for Super Admins, Teachers, Students, and Parents with attendance, fee ledger, timetables, and audit logging built on Next.js and MySQL.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/projects/school-management-system",
  },
};

export default function SchoolManagementSystemCaseStudyPage() {
  const project = getProjectBySlug("school-management-system");

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden tech-grid-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-6">
            <span>Case Study</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            School Management System <br />
            <span className="text-gradient-brand">Multi-Portal Education ERP</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
            Consolidating admissions, fee collections, daily attendance, class timetables, and parent communication into four dedicated, role-scoped portals.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono rounded-lg bg-white/5 text-slate-300 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* OVERVIEW & PROBLEM */}
      <section className="py-20 bg-[#07090E] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* The Administrative Problem */}
            <div className="p-8 rounded-2xl bg-[#090D16] border border-white/10 space-y-4">
              <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider block">
                01. The Administrative Problem
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Paper Registers, Fee Leakage & Siloed Records
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Educational institutions traditionally struggle with fragmented administrative overhead:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Paper registers for daily attendance prone to errors, damage, and delayed tabulation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Manual fee receipt books and disconnected spreadsheets causing billing discrepancies and uncollected dues.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Lack of immediate parent communication channels for attendance alerts, announcements, and exam notices.</span>
                </li>
              </ul>
            </div>

            {/* The Solution */}
            <div className="p-8 rounded-2xl bg-[#090D16] border border-white/10 space-y-4">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                02. The Engineering Solution
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Four Dedicated Stakeholder Portals on Relational MySQL
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Digital Crowd Technologies built a clean, role-scoped education management platform with strict data isolation:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>Super Admin portal for institution-wide fee ledgers, teacher staffing, and audit trails.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>Teacher portal for 1-click attendance marking, grade entries, and class timetables.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>Parent & Student portals for digital fee receipts, attendance percentages, and circulars.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* FOUR PORTALS ARCHITECTURE */}
      <section className="py-20 bg-[#05070B] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Architecture Breakdown"
            title="Four Dedicated Role-Based Portals"
            subtitle="Engineered with strict RBAC permission gates to guarantee data confidentiality."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {project.architecture.portals.map((p, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#090D16] border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
                  Portal 0{i + 1}
                </span>
                <h3 className="text-base font-bold text-white">{p.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed pt-1">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-2xl bg-[#0B0F19] border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase block mb-1">
                Backend API Architecture
              </span>
              <p className="text-slate-300 leading-relaxed">
                {project.architecture.backend}
              </p>
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase block mb-1">
                Database Integrity
              </span>
              <p className="text-slate-300 leading-relaxed">
                {project.architecture.database}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="py-20 bg-[#07090E] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Features"
            title="Key Modules Built Into the School ERP"
            subtitle="Designed to eliminate manual friction across everyday academic routines."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {project.features.map((feat, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#0B0F19] border border-white/10 flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300 leading-snug">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENGINEERING CHALLENGES */}
      <section className="py-20 bg-[#05070B] border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Engineering Insights"
            title="Development Challenges & Solutions"
            subtitle="How we handled academic complexity and data integrity."
          />

          <div className="space-y-6">
            {project.challenges.map((c, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#090D16] border border-white/10 space-y-2">
                <h3 className="text-base font-bold text-white">
                  Challenge: {c.challenge}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  <strong className="text-blue-400 font-semibold">Solution: </strong>
                  {c.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#07090E] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Looking for a School or Institution ERP?
          </h2>
          <p className="text-sm text-slate-400">
            Contact us for a tailored demonstration configured for your academic calendar, fee rules, and class levels.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition"
            >
              <span>Request a Demo</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
