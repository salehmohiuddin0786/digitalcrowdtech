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
import ProjectArchitectureDiagram from "../Component/ProjectArchitectureDiagram";

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
    <div className="flex flex-col bg-transparent">
      {/* HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-white/10 [html.light_&]:border-slate-200">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#0050B0]/20 to-[#F87000]/15 blur-[120px] pointer-events-none -z-10 rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6 backdrop-blur-md">
            <Sparkles size={13} />
            <span>Verified Portfolio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white [html.light_&]:text-[#0A2540] tracking-tight leading-tight">
            Our Work: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F7DE1] to-[#F87000]">Real Software Deliverables</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
            We believe in honest engineering. We showcase only real products and software solutions built by our team with full technical breakdowns and live architecture diagrams.
          </p>

          <div className="mt-6 p-3 rounded-xl glass-card-premium max-w-md mx-auto text-xs text-slate-300 [html.light_&]:text-slate-600">
            Zero fake clients, zero stock screenshots, and zero fabricated performance metrics.
          </div>
        </div>
      </section>

      {/* PROJECTS LISTING */}
      <section className="py-20 bg-transparent border-b border-white/10 [html.light_&]:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {PROJECTS.map((project) => {
            const hasDiagram = project.id === "ruchi-bazzar" || project.id === "school-management-system";

            return (
              <div
                key={project.id}
                className="rounded-3xl glass-card-premium p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  
                  {/* Left Info Column */}
                  <div className="lg:col-span-6 space-y-5">
                    <div className="flex flex-wrap items-center gap-2">
                      {project.isInternal ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300 [html.light_&]:bg-amber-50 [html.light_&]:text-amber-700">
                          {project.label}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400 [html.light_&]:bg-blue-50 [html.light_&]:text-blue-700">
                          {project.category}
                        </span>
                      )}

                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 [html.light_&]:text-emerald-700 bg-emerald-500/10 [html.light_&]:bg-emerald-50 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Verified Architecture
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
                      {project.title}
                    </h2>

                    <p className="text-sm sm:text-base text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div>
                      <span className="text-xs font-semibold text-slate-400 [html.light_&]:text-slate-500 uppercase tracking-wider block mb-2">
                        Core Technologies Used:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/5 [html.light_&]:bg-slate-100 text-slate-300 [html.light_&]:text-slate-700 border border-white/10 [html.light_&]:border-slate-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div>
                      <span className="text-xs font-semibold text-slate-400 [html.light_&]:text-slate-500 uppercase tracking-wider block mb-2">
                        Verified Capabilities:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 [html.light_&]:text-slate-600">
                        {project.features.slice(0, 6).map((f, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing transparency */}
                    <div className="p-3.5 rounded-xl bg-blue-500/10 [html.light_&]:bg-blue-50 border border-blue-500/20 [html.light_&]:border-blue-200 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[#F87000]">Transparent Pricing:</span>
                        <span className="font-mono font-bold text-white [html.light_&]:text-slate-800">
                          {project.isInternal ? "Starting from ₹4,999" : "Starting from ₹9,999"}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 [html.light_&]:text-slate-600">
                        {project.isInternal
                          ? "Business websites starting from ₹4,999. Final pricing depends on project requirements."
                          : "Custom web applications starting from ₹9,999 with APIs and database. Final pricing depends on project requirements."}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      {project.caseStudyUrl && (
                        <Link
                          href={project.caseStudyUrl}
                          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition"
                        >
                          <span>View Full Case Study</span>
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

                  {/* Right Column: Visual Architecture or Specs */}
                  <div className="lg:col-span-6 w-full">
                    {hasDiagram ? (
                      <ProjectArchitectureDiagram projectId={project.id} />
                    ) : (
                      <div className="rounded-2xl glass-card-premium p-6 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-white/10 [html.light_&]:border-slate-200 text-xs">
                          <span className="font-mono text-slate-400 [html.light_&]:text-slate-600">
                            {project.slug} :: internal architecture
                          </span>
                          <span className="text-[11px] font-semibold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10">
                            100% In-House
                          </span>
                        </div>

                        <div className="space-y-3 text-xs">
                          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                            <span className="font-semibold text-white [html.light_&]:text-slate-800 block">Next.js 16 + React 19 Frontend</span>
                            <span className="text-[11px] text-slate-400">App Router, Tailwind CSS, Dark Theme Design System</span>
                          </div>
                          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                            <span className="font-semibold text-white [html.light_&]:text-slate-800 block">Node.js + Express 5 Backend</span>
                            <span className="text-[11px] text-slate-400">MySQL Database, Contact Form Pipeline, Admin CMS</span>
                          </div>
                          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                            <span className="font-semibold text-white [html.light_&]:text-slate-800 block">Nodemailer SMTP Pipeline</span>
                            <span className="text-[11px] text-slate-400">Instant notification emails dispatched on customer submissions</span>
                          </div>
                        </div>

                        <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-white/10 [html.light_&]:border-slate-200">
                          <span>Full Source Code Maintained</span>
                          <span className="text-blue-400 font-mono">Node / React / MySQL</span>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            );
          })}

          {/* Honest Transparent Coming Soon Banner */}
          <div className="p-8 rounded-3xl glass-card-premium border-dashed border-white/20 text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 [html.light_&]:text-slate-500 block">
              Integrity First
            </span>
            <h3 className="text-lg font-bold text-white [html.light_&]:text-[#0A2540]">
              More Genuine Projects In Active Development
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 [html.light_&]:text-slate-600 max-w-lg mx-auto">
              We never fabricate client projects or inflate our portfolio with fake names. Every project listed here is authentic software built by Digital Crowd Technologies.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-transparent text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl glass-card-premium shadow-2xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
              Have a Similar Software Project to Build?
            </h2>
            <p className="text-sm text-slate-300 [html.light_&]:text-slate-600 max-w-xl mx-auto">
              Tell us about your requirements. We&apos;ll schedule a direct technical consultation with our engineering team.
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
