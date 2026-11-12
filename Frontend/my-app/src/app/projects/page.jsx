import React from "react";
import Link from "next/link";
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
  Check,
  CheckCircle,
  Zap,
} from "lucide-react";
import SectionHeading from "../Component/SectionHeading";
import { PROJECTS, hasLiveUrl } from "../data/projects";
import ProjectsShowcaseView from "../Component/ProjectsShowcaseView";

export const metadata = {
  title: "Projects & Portfolio | Digital Crowd Technologies",
  description:
    "Explore real software solutions and live production platforms engineered by Digital Crowd Technologies: StarEggs, Ruchi Bazaar, TaskDigitalCrowd, Clinic EHR SaaS, and more.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/projects",
  },
};

async function getProjectsData() {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
    const res = await fetch(`${apiBase}/api/projects`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data.ok && Array.isArray(data.items) && data.items.length > 0) {
        const dbItems = data.items.map((p) => ({
          ...p,
          technologies:
            typeof p.technologies === "string"
              ? JSON.parse(p.technologies || "[]")
              : p.technologies || [],
          features:
            typeof p.features === "string"
              ? JSON.parse(p.features || "[]")
              : p.features || [],
        }));

        // Merge with PROJECTS to guarantee curated 8-project sequence and assets
        const merged = PROJECTS.map((staticP) => {
          const dbMatch = dbItems.find(
            (d) =>
              d.slug === staticP.slug ||
              d.id === staticP.id ||
              d.title?.toLowerCase() === staticP.title?.toLowerCase()
          );
          return dbMatch ? { ...staticP, ...dbMatch } : staticP;
        });

        // Append any extra DB projects (such as new ones created via Admin Panel)
        for (const dbP of dbItems) {
          if (!merged.some((m) => m.slug === dbP.slug || m.id === dbP.id)) {
            merged.push(dbP);
          }
        }

        // Live websites ALWAYS sorted to the top
        return [...merged].sort((a, b) => {
          const aLive = hasLiveUrl(a) ? 0 : 1;
          const bLive = hasLiveUrl(b) ? 0 : 1;
          if (aLive !== bLive) return aLive - bLive;
          return 0;
        });
      }
    }
  } catch (err) {
    // Graceful fallback to static PROJECTS
  }

  return [...PROJECTS].sort((a, b) => {
    const aLive = hasLiveUrl(a) ? 0 : 1;
    const bLive = hasLiveUrl(b) ? 0 : 1;
    if (aLive !== bLive) return aLive - bLive;
    return 0;
  });
}

export default async function ProjectsPage() {
  const projectList = await getProjectsData();
  const liveCount = projectList.filter((p) => hasLiveUrl(p)).length;

  return (
    <div className="flex flex-col bg-transparent">
      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-white/10 [html.light_&]:border-slate-200">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#0050B0]/20 via-[#2F7DE1]/15 to-[#F87000]/15 blur-[140px] pointer-events-none -z-10 rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6 backdrop-blur-md">
            <Sparkles size={13} className="text-[#F87000]" />
            <span>Verified Engineering Deliverables</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white [html.light_&]:text-[#0A2540] tracking-tight leading-tight">
            Our Work: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F7DE1] via-[#60A5FA] to-[#F87000]">Live Software Platforms</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 [html.light_&]:text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We build real software for real businesses. Explore live production deployments, custom SaaS applications, and enterprise platforms with authentic technical breakdowns.
          </p>

          {/* Value Proof Badges */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-2xl glass-card-premium border border-white/10 [html.light_&]:border-slate-200 space-y-1">
              <span className="text-[11px] font-mono text-emerald-400 [html.light_&]:text-emerald-700 flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {liveCount} Live Websites
              </span>
              <span className="text-xs text-white [html.light_&]:text-slate-900 font-semibold block">
                Active in Production
              </span>
            </div>

            <div className="p-3.5 rounded-2xl glass-card-premium border border-white/10 [html.light_&]:border-slate-200 space-y-1">
              <span className="text-[11px] font-mono text-blue-400 [html.light_&]:text-blue-700 font-bold block">
                100% In-House
              </span>
              <span className="text-xs text-white [html.light_&]:text-slate-900 font-semibold block">
                Source Code Handover
              </span>
            </div>

            <div className="p-3.5 rounded-2xl glass-card-premium border border-white/10 [html.light_&]:border-slate-200 space-y-1">
              <span className="text-[11px] font-mono text-[#F87000] font-bold block">
                Transparent Rates
              </span>
              <span className="text-xs text-white [html.light_&]:text-slate-900 font-semibold block">
                From ₹4,999 to ₹14,999
              </span>
            </div>

            <div className="p-3.5 rounded-2xl glass-card-premium border border-white/10 [html.light_&]:border-slate-200 space-y-1">
              <span className="text-[11px] font-mono text-purple-400 [html.light_&]:text-purple-700 font-bold block">
                Zero Aggregator Cut
              </span>
              <span className="text-xs text-white [html.light_&]:text-slate-900 font-semibold block">
                100% Client Ownership
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* PROJECTS SHOWCASE CONTENT */}
      <section className="py-16 md:py-20 bg-transparent border-b border-white/10 [html.light_&]:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectsShowcaseView initialProjects={projectList} />

          {/* Honest Transparent Coming Soon Banner */}
          <div className="mt-16 p-8 rounded-3xl glass-card-premium border-dashed border-white/20 text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 [html.light_&]:text-slate-500 block">
              Integrity First
            </span>
            <h3 className="text-lg font-bold text-white [html.light_&]:text-[#0A2540]">
              More Genuine Projects In Active Development
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 [html.light_&]:text-slate-600 max-w-lg mx-auto">
              We never fabricate client projects or inflate our portfolio with fake names. Every platform listed here is authentic software built by Digital Crowd Technologies.
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
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
