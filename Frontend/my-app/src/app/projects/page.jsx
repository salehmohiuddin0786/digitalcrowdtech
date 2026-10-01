import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ExternalLink,
  Code2,
  CheckCircle2,
  Layers,
  Database,
  Server,
  Globe,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import SectionHeading from "../Component/SectionHeading";
import { PROJECTS } from "../data/projects";

export const metadata = {
  title: "Projects & Portfolio | Digital Crowd Technologies",
  description:
    "Explore real software solutions and digital products built by Digital Crowd Technologies: Ruchi Bazzar, School Management System, and our internal company platform.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/projects",
  },
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden tech-grid-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6">
            <span>Verified Portfolio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Our Work: <span className="text-gradient-brand">Real Software Deliverables</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
            We believe in honest engineering. We showcase only real products and software solutions built by our team with full technical breakdowns.
          </p>

          <div className="mt-6 p-3 rounded-xl bg-white/[0.03] border border-white/10 max-w-md mx-auto text-xs text-slate-400">
            Zero fake clients, zero stock screenshots, and zero fabricated performance metrics.
          </div>
        </div>
      </section>

      {/* PROJECTS LISTING */}
      <section className="py-20 bg-[#07090E] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="rounded-2xl bg-[#090D16] border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Left Info Column */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-2">
                    {project.isInternal ? (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300">
                        {project.label}
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400">
                        {project.category}
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {project.title}
                  </h2>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      Core Technologies Used:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-xs font-mono rounded bg-white/5 text-slate-300 border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      Verified Capabilities:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                      {project.features.slice(0, 6).map((f, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-blue-400 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    {project.caseStudyUrl && (
                      <Link
                        href={project.caseStudyUrl}
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition"
                      >
                        <span>View In-Depth Case Study</span>
                        <ArrowRight size={15} />
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition"
                      >
                        <span>Visit Website</span>
                        <ExternalLink size={15} />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Right Architecture / Preview Card */}
                <div className="lg:col-span-5">
                  <div className="rounded-xl bg-[#0F1422] border border-white/10 p-6 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/5 text-xs">
                      <span className="font-mono text-slate-400">
                        {project.slug} :: technical breakdown
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10">
                        Verified Architecture
                      </span>
                    </div>

                    {project.architecture.clientApps && (
                      <div className="space-y-2">
                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                          Included Monorepo Packages:
                        </span>
                        {project.architecture.clientApps.map((ca, i) => (
                          <div key={i} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-xs">
                            <span className="font-semibold text-white block">{ca.name}</span>
                            <span className="text-[11px] text-slate-400">{ca.tech}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {project.architecture.portals && (
                      <div className="space-y-2">
                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                          Included Role Portals:
                        </span>
                        {project.architecture.portals.map((po, i) => (
                          <div key={i} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-xs">
                            <span className="font-semibold text-white block">{po.name}</span>
                            <span className="text-[11px] text-slate-400">{po.desc}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {project.isInternal && (
                      <div className="space-y-2 text-xs">
                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                          Internal Stack Layers:
                        </span>
                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                          <span className="font-semibold text-white block">Next.js 16 + React 19 Frontend</span>
                          <span className="text-[11px] text-slate-400">App Router, Tailwind CSS, Dark Theme Design System</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                          <span className="font-semibold text-white block">Node.js + Express 5 Backend</span>
                          <span className="text-[11px] text-slate-400">MySQL Database, Contact Form Pipeline, Admin CMS</span>
                        </div>
                      </div>
                    )}

                    <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-white/5">
                      <span>Full Source Code Maintained</span>
                      <span className="text-blue-400">Node / React / MySQL</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}

          {/* Honest Transparent Coming Soon Banner */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-dashed border-white/10 text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
              Integrity First
            </span>
            <h3 className="text-lg font-bold text-white">
              More Genuine Projects Coming Soon
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
              We never fabricate client projects or inflate our portfolio with fake names. Every project listed here is authentic software built by Digital Crowd Technologies.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#05070B] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Have a Similar Software Project to Build?
          </h2>
          <p className="text-sm text-slate-400">
            Tell us about your requirements. We&apos;ll schedule a direct technical consultation.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition"
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
