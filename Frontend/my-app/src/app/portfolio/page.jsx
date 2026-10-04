"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Code2,
  Server,
  Database,
  Globe,
  Layers,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Smartphone,
  Sparkles,
  Send,
  Building,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  Zap,
  Check,
} from "lucide-react";
import { PROJECTS } from "../data/projects";
import { COMPANY } from "../data/company";
import { BorderBeam } from "../Component/BorderBeam";
import { SpotlightCard } from "../Component/SpotlightCard";
import ShimmerButton from "../Component/ShimmerButton";
import ProjectArchitectureDiagram from "../Component/ProjectArchitectureDiagram";

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    service: "Custom Website / Web Application",
    budget: "Starting from ₹9,999",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // { ok: boolean, message: string }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "Portfolio",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Failed to submit inquiry. Please try again.");
      }

      setFormStatus({
        ok: true,
        message:
          "Thank you! Your portfolio inquiry has been logged directly into our central system. Our engineering team will review your requirements and reach out within 24 hours.",
      });

      setFormData({
        name: "",
        businessName: "",
        email: "",
        phone: "",
        service: "Custom Website / Web Application",
        budget: "Starting from ₹9,999",
        message: "",
      });
    } catch (err) {
      setFormStatus({
        ok: false,
        message: err.message || "Submission failed. Please check your connection or contact us via WhatsApp.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredProjects =
    activeTab === "all"
      ? PROJECTS
      : activeTab === "internal"
      ? PROJECTS.filter((p) => p.isInternal)
      : PROJECTS.filter((p) => !p.isInternal);

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-[#C5CEDD] [html.light_&]:text-[#334155] font-sans">
      {/* ========================================================
          HERO SECTION
          ======================================================== */}
      <section className="relative pt-20 pb-20 md:pt-28 md:pb-28 overflow-hidden border-b border-white/10 [html.light_&]:border-slate-200">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#0050B0]/20 to-[#F87000]/15 blur-[120px] pointer-events-none -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#2F7DE1]/10 border border-[#2F7DE1]/25 text-[#2F7DE1] [html.light_&]:bg-blue-50 [html.light_&]:text-[#0050B0] mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#2F7DE1] animate-pulse" />
            <span>Full-Stack Engineering &amp; Systems Portfolio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white [html.light_&]:text-[#0B1220] tracking-tight leading-tight">
            We Design. We Develop. <br className="hidden sm:inline" />
            <span className="text-gradient-brand">We Deploy.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 [html.light_&]:text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Digital Crowd Technologies builds professional websites, custom web applications, e-commerce platforms, and backend systems for businesses and organizations across India.
          </p>

          {/* Quick Value Metrics */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-xs font-medium text-slate-300 [html.light_&]:text-slate-700">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] [html.light_&]:bg-white border border-white/10 [html.light_&]:border-slate-200 shadow-sm">
              <CheckCircle2 size={13} className="text-blue-400" />
              Frontend + Backend + DB
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] [html.light_&]:bg-white border border-white/10 [html.light_&]:border-slate-200 shadow-sm">
              <CheckCircle2 size={13} className="text-cyan-400" />
              APIs &amp; Cloud Deployment
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] [html.light_&]:bg-white border border-white/10 [html.light_&]:border-slate-200 shadow-sm">
              <CheckCircle2 size={13} className="text-emerald-400" />
              Zero Fake Claims or Stock Projects
            </span>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#inquiry-form">
              <ShimmerButton className="px-6 py-3 text-sm font-semibold">
                <span>Start a Project Discussion</span>
                <ArrowRight size={15} className="ml-2 inline" />
              </ShimmerButton>
            </a>
            <a
              href="#systems-showcase"
              className="px-6 py-3 rounded-xl text-sm font-semibold bg-white/5 [html.light_&]:bg-white text-slate-200 [html.light_&]:text-slate-800 border border-white/10 [html.light_&]:border-slate-200 hover:bg-white/10 transition"
            >
              Explore Live Systems
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================
          PORTFOLIO FILTER & SYSTEMS SHOWCASE
          ======================================================== */}
      <section id="systems-showcase" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 [html.light_&]:border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#F87000] mb-2 font-bold">
              <span>Production Architectures</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white [html.light_&]:text-[#0B1220]">
              Verified Software Deliverables
            </h2>
            <p className="mt-2 text-sm text-slate-400 [html.light_&]:text-slate-600 max-w-xl">
              Real platforms designed, coded, and architected by our engineering team. Full stack coverage with zero fabricated statistics.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center p-1 rounded-xl bg-white/[0.03] [html.light_&]:bg-slate-100 border border-white/10 [html.light_&]:border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === "all"
                  ? "bg-[#0050B0] text-white shadow-md"
                  : "text-slate-400 hover:text-white [html.light_&]:text-slate-600 [html.light_&]:hover:text-black"
              }`}
            >
              All Deliverables ({PROJECTS.length})
            </button>
            <button
              onClick={() => setActiveTab("client")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === "client"
                  ? "bg-[#0050B0] text-white shadow-md"
                  : "text-slate-400 hover:text-white [html.light_&]:text-slate-600 [html.light_&]:hover:text-black"
              }`}
            >
              Client &amp; SaaS Systems
            </button>
            <button
              onClick={() => setActiveTab("internal")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === "internal"
                  ? "bg-[#0050B0] text-white shadow-md"
                  : "text-slate-400 hover:text-white [html.light_&]:text-slate-600 [html.light_&]:hover:text-black"
              }`}
            >
              Internal Projects
            </button>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="space-y-16">
          {filteredProjects.map((project, idx) => {
            const isRuchi = project.id === "ruchi-bazzar";
            const isSchool = project.id === "school-management-system";

            return (
              <div
                key={project.id}
                className="relative rounded-3xl glass-card-premium p-6 sm:p-8 lg:p-12 shadow-2xl overflow-hidden transition"
              >
                {/* 21st.dev Border Beam highlight on flagship card */}
                {idx === 0 && <BorderBeam duration={8} colorFrom="#2F7DE1" colorTo="#F87000" />}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column: Project Description & Features */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex flex-wrap items-center gap-2.5">
                      {project.isInternal ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400 [html.light_&]:bg-amber-50 [html.light_&]:text-amber-700">
                          {project.label || "Company Website / Internal Project"}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/25 text-blue-400 [html.light_&]:bg-blue-50 [html.light_&]:text-blue-700">
                          {project.category}
                        </span>
                      )}

                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 [html.light_&]:text-emerald-700 bg-emerald-500/10 [html.light_&]:bg-emerald-50 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Production Ready
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white [html.light_&]:text-[#0B1220] tracking-tight">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400 [html.light_&]:text-slate-500 font-medium">
                        Client / Context: {project.client}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Architecture / Multi-role Apps Breakdown */}
                    {project.architecture?.clientApps && (
                      <div className="p-4 rounded-2xl bg-white/[0.02] [html.light_&]:bg-slate-50 border border-white/5 [html.light_&]:border-slate-200 space-y-3">
                        <span className="text-xs font-mono uppercase tracking-wider text-blue-400 [html.light_&]:text-blue-700 font-semibold block">
                          Integrated Portals &amp; Modules:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          {project.architecture.clientApps.map((app) => (
                            <div key={app.name} className="p-2.5 rounded-xl bg-white/[0.03] [html.light_&]:bg-white border border-white/5 [html.light_&]:border-slate-200">
                              <span className="font-semibold text-white [html.light_&]:text-slate-800 block">
                                {app.name}
                              </span>
                              <span className="text-[11px] text-slate-400 [html.light_&]:text-slate-500 block mt-0.5">
                                {app.desc}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Features List */}
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400 [html.light_&]:text-slate-500 font-semibold block mb-3">
                        Key Engineering Features:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300 [html.light_&]:text-slate-600">
                        {project.features.slice(0, 6).map((feat) => (
                          <div key={feat} className="flex items-start gap-2">
                            <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Badges */}
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400 [html.light_&]:text-slate-500 font-semibold block mb-2">
                        Technologies:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/[0.04] [html.light_&]:bg-slate-100 text-slate-300 [html.light_&]:text-slate-700 border border-white/5 [html.light_&]:border-slate-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visual Architecture or Specs Box */}
                  <div className="lg:col-span-5 space-y-6">
                    {isRuchi || isSchool ? (
                      <div className="space-y-4">
                        <ProjectArchitectureDiagram projectId={project.id} />
                        <div className="p-4 rounded-2xl glass-card-premium text-xs space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#F87000]">Transparent Pricing Model:</span>
                            <span className="text-xs font-mono font-semibold text-emerald-400">Starting from ₹9,999</span>
                          </div>
                          <span className="text-slate-300 [html.light_&]:text-slate-700 block leading-relaxed text-[11px]">
                            Custom Web Applications starting from ₹9,999 with frontend, backend APIs, relational database &amp; deployment. Final pricing depends on project requirements.
                          </span>
                          <div className="pt-2">
                            <a
                              href="#inquiry-form"
                              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 bg-[#0050B0] hover:bg-[#003E8A] text-white transition shadow-lg"
                            >
                              <span>Request Similar Custom System</span>
                              <ArrowRight size={13} />
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 rounded-2xl glass-card-premium space-y-5">
                        <div className="flex items-center justify-between pb-3 border-b border-white/10 [html.light_&]:border-slate-200">
                          <span className="text-xs font-mono uppercase text-slate-400 [html.light_&]:text-slate-600 font-semibold">
                            System Specifications
                          </span>
                          <span className="text-xs font-semibold text-[#F87000]">
                            100% Custom Code
                          </span>
                        </div>

                        <div className="space-y-3 text-xs">
                          <div>
                            <span className="text-slate-500 [html.light_&]:text-slate-500 block">Frontend Stack</span>
                            <span className="font-semibold text-white [html.light_&]:text-slate-800">
                              Next.js, React, Tailwind CSS, Responsive Viewports
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500 [html.light_&]:text-slate-500 block">Backend &amp; APIs</span>
                            <span className="font-semibold text-white [html.light_&]:text-slate-800">
                              Node.js, Express.js REST APIs, JWT, Rate Limiting
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500 [html.light_&]:text-slate-500 block">Database Architecture</span>
                            <span className="font-semibold text-white [html.light_&]:text-slate-800">
                              MySQL Relational Schema with Sequelize ORM
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500 [html.light_&]:text-slate-500 block">Infrastructure</span>
                            <span className="font-semibold text-white [html.light_&]:text-slate-800">
                              Production Linux VPS, Nginx, SSL, PM2
                            </span>
                          </div>
                        </div>

                        {/* Pricing Transparency Callout */}
                        <div className="p-3.5 rounded-xl bg-blue-500/10 [html.light_&]:bg-blue-50 border border-blue-500/20 [html.light_&]:border-blue-200 text-xs">
                          <span className="font-bold text-blue-400 [html.light_&]:text-blue-700 block">
                            Transparent Pricing Model:
                          </span>
                          <span className="text-slate-300 [html.light_&]:text-slate-700 mt-1 block leading-relaxed text-[11px]">
                            Business Websites starting from ₹4,999. Final pricing depends on project requirements.
                          </span>
                        </div>

                        <div className="pt-2">
                          <a
                            href="#inquiry-form"
                            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 bg-[#0050B0] hover:bg-[#003E8A] text-white transition shadow-lg"
                          >
                            <span>Request Similar System</span>
                            <ArrowRight size={13} />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          FULL-STACK ARCHITECTURAL PILLARS (21st.dev CARDS)
          ======================================================== */}
      <section className="py-20 bg-transparent border-y border-white/10 [html.light_&]:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-wider text-[#2F7DE1] font-bold block mb-2">
              Engineering Disciplines
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white [html.light_&]:text-[#0B1220]">
              Complete End-to-End Capabilities
            </h2>
            <p className="mt-3 text-sm text-slate-400 [html.light_&]:text-slate-600">
              We don&apos;t just slice UI templates. We design databases, write backend APIs, handle authentication, and deploy on production servers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SpotlightCard className="p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                <Globe size={20} />
              </div>
              <h3 className="text-lg font-bold text-white [html.light_&]:text-[#0B1220]">
                1. Modern Frontend
              </h3>
              <p className="text-xs text-slate-400 [html.light_&]:text-slate-600 leading-relaxed">
                Responsive Next.js &amp; React interfaces with mobile-first layouts, dark/light theme, accessible markup, and zero layout shift.
              </p>
              <div className="pt-2 text-[11px] font-mono text-blue-400">
                Next.js • Tailwind • Framer Motion
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Server size={20} />
              </div>
              <h3 className="text-lg font-bold text-white [html.light_&]:text-[#0B1220]">
                2. Backend &amp; APIs
              </h3>
              <p className="text-xs text-slate-400 [html.light_&]:text-slate-600 leading-relaxed">
                Structured Node.js and Express RESTful services with strict input sanitization, rate limiting, bcrypt hashing, and JWT tokens.
              </p>
              <div className="pt-2 text-[11px] font-mono text-cyan-400">
                Node.js • Express • REST • JWT
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                <Database size={20} />
              </div>
              <h3 className="text-lg font-bold text-white [html.light_&]:text-[#0B1220]">
                3. Database Design
              </h3>
              <p className="text-xs text-slate-400 [html.light_&]:text-slate-600 leading-relaxed">
                Normalized relational schemas in MySQL with Sequelize ORM, atomic transactions, parameterized queries, and indexing for speed.
              </p>
              <div className="pt-2 text-[11px] font-mono text-purple-400">
                MySQL • Sequelize • Indexing • SQL
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[#F87000] flex items-center justify-center">
                <Zap size={20} />
              </div>
              <h3 className="text-lg font-bold text-white [html.light_&]:text-[#0B1220]">
                4. Production Deploy
              </h3>
              <p className="text-xs text-slate-400 [html.light_&]:text-slate-600 leading-relaxed">
                Linux VPS orchestration, Nginx reverse proxy, automated SSL certs, PM2 process management, and SMTP email dispatch.
              </p>
              <div className="pt-2 text-[11px] font-mono text-[#F87000]">
                Linux • Nginx • SSL • PM2 • SMTP
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* ========================================================
          TRANSPARENT PRICING SECTION
          ======================================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-wider text-[#F87000] font-bold block mb-2">
            No Hidden Fees
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white [html.light_&]:text-[#0B1220]">
            Transparent Starting Rates
          </h2>
          <p className="mt-3 text-sm text-slate-400 [html.light_&]:text-slate-600">
            We show our real starting prices upfront. Final pricing depends on project requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: Business Website */}
          <div className="p-8 rounded-3xl glass-card-premium shadow-xl space-y-6 relative group hover:border-[#2F7DE1]/40 transition">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400 [html.light_&]:bg-blue-50 [html.light_&]:text-blue-700">
                Business Presence
              </span>
              <h3 className="text-2xl font-bold text-white [html.light_&]:text-[#0B1220]">
                Business Website Development
              </h3>
              <p className="text-xs text-slate-400 [html.light_&]:text-slate-600 leading-relaxed">
                For professional business websites, local businesses, clinics, institutions, and service companies.
              </p>
            </div>

            <div className="pt-2 pb-4 border-y border-white/10 [html.light_&]:border-slate-200">
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-slate-400 [html.light_&]:text-slate-500">Starting from</span>
                <span className="text-4xl font-extrabold text-white [html.light_&]:text-[#0B1220]">₹4,999</span>
              </div>
              <p className="mt-2 text-[11px] text-[#F87000] font-medium">
                * Final pricing depends on project requirements.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300 [html.light_&]:text-slate-600">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-blue-400" />
                <span>Responsive mobile-first design</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-blue-400" />
                <span>Contact form with automated email dispatch</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-blue-400" />
                <span>Direct WhatsApp click-to-chat integration</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-blue-400" />
                <span>Basic search engine optimization (SEO) setup</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-blue-400" />
                <span>Deployment assistance to production hosting</span>
              </li>
            </ul>

            <a
              href="#inquiry-form"
              className="block text-center py-3 px-4 rounded-xl text-xs font-semibold bg-white/5 [html.light_&]:bg-slate-100 text-white [html.light_&]:text-slate-800 border border-white/10 [html.light_&]:border-slate-200 hover:bg-[#0050B0] hover:text-white hover:border-[#0050B0] transition"
            >
              Request Business Website Quote
            </a>
          </div>

          {/* Card 2: Custom Web Application */}
          <div className="relative p-8 rounded-3xl glass-card-premium border-2 border-[#2F7DE1]/50 shadow-2xl space-y-6 overflow-hidden">
            <BorderBeam duration={9} colorFrom="#2F7DE1" colorTo="#F87000" />

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F87000]/15 border border-[#F87000]/30 text-[#F87000] [html.light_&]:bg-orange-50 [html.light_&]:text-orange-700">
                Full-Stack Architecture
              </span>
              <h3 className="text-2xl font-bold text-white [html.light_&]:text-[#0B1220]">
                Custom Website &amp; Web Application
              </h3>
              <p className="text-xs text-slate-400 [html.light_&]:text-slate-600 leading-relaxed">
                For custom websites and web applications requiring frontend, backend, database, and custom business logic.
              </p>
            </div>

            <div className="pt-2 pb-4 border-y border-white/10 [html.light_&]:border-slate-200">
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-slate-400 [html.light_&]:text-slate-500">Starting from</span>
                <span className="text-4xl font-extrabold text-white [html.light_&]:text-[#0B1220]">₹9,999</span>
              </div>
              <p className="mt-2 text-[11px] text-[#F87000] font-medium">
                * Final pricing depends on project requirements.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300 [html.light_&]:text-slate-600">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400" />
                <span>Everything in Business Website</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400" />
                <span>Custom relational database schema (MySQL)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400" />
                <span>Dedicated backend REST APIs &amp; business workflows</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400" />
                <span>Multi-role user authentication &amp; role security</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400" />
                <span>Custom admin panel &amp; real-time dashboards</span>
              </li>
            </ul>

            <a
              href="#inquiry-form"
              className="block text-center py-3 px-4 rounded-xl text-xs font-semibold bg-[#0050B0] hover:bg-[#003E8A] text-white shadow-lg shadow-blue-500/20 transition"
            >
              Request Custom Software Quote
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================
          UNIFIED PORTFOLIO INQUIRY FORM (Connected to backend)
          ======================================================== */}
      <section id="inquiry-form" className="py-20 bg-transparent border-t border-white/10 [html.light_&]:border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-8 sm:p-12 rounded-3xl glass-card-premium shadow-2xl overflow-hidden">
            <BorderBeam duration={10} rx={24} strokeWidth={2} />
            <div className="text-center max-w-xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 [html.light_&]:bg-emerald-50 [html.light_&]:text-emerald-700 mb-3">
                <Clock size={13} />
                <span>Fast Response Within 24 Hours</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white [html.light_&]:text-[#0B1220]">
                Submit a Project Inquiry
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 [html.light_&]:text-slate-600">
                Send your requirements directly to our engineering team. All queries are logged into our central CRM portal and followed up promptly.
              </p>
            </div>

            {formStatus && (
              <div
                className={`mb-6 p-4 rounded-2xl text-xs border ${
                  formStatus.ok
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 [html.light_&]:bg-emerald-50 [html.light_&]:text-emerald-800"
                    : "bg-red-500/10 border-red-500/30 text-red-300 [html.light_&]:bg-red-50 [html.light_&]:text-red-800"
                }`}
              >
                {formStatus.message}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 [html.light_&]:text-slate-700 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-white/[0.03] [html.light_&]:bg-slate-50 border border-white/10 [html.light_&]:border-slate-200 text-white [html.light_&]:text-slate-900 placeholder-slate-500 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 [html.light_&]:text-slate-700 mb-1.5">
                    Business / Company Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="e.g. Sharma Logistics / Retail Store"
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-white/[0.03] [html.light_&]:bg-slate-50 border border-white/10 [html.light_&]:border-slate-200 text-white [html.light_&]:text-slate-900 placeholder-slate-500 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 [html.light_&]:text-slate-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="rahul@example.com"
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-white/[0.03] [html.light_&]:bg-slate-50 border border-white/10 [html.light_&]:border-slate-200 text-white [html.light_&]:text-slate-900 placeholder-slate-500 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 [html.light_&]:text-slate-700 mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98490 12345"
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-white/[0.03] [html.light_&]:bg-slate-50 border border-white/10 [html.light_&]:border-slate-200 text-white [html.light_&]:text-slate-900 placeholder-slate-500 outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 [html.light_&]:text-slate-700 mb-1.5">
                    Project Type Needed
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#0D121F] [html.light_&]:bg-slate-50 border border-white/10 [html.light_&]:border-slate-200 text-white [html.light_&]:text-slate-900 outline-none focus:border-blue-500"
                  >
                    <option value="Custom Website / Web Application">Custom Website &amp; Web Application</option>
                    <option value="Business Website">Business Website (Starting ₹4,999)</option>
                    <option value="E-Commerce Platform">E-Commerce Platform</option>
                    <option value="School Management System">School Management ERP</option>
                    <option value="Custom ERP & Business Portal">Custom ERP / Portal</option>
                    <option value="API & Backend Engineering">API &amp; Backend Engineering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 [html.light_&]:text-slate-700 mb-1.5">
                    Estimated Budget Tier
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#0D121F] [html.light_&]:bg-slate-50 border border-white/10 [html.light_&]:border-slate-200 text-white [html.light_&]:text-slate-900 outline-none focus:border-blue-500"
                  >
                    <option value="Starting from ₹4,999">Starting from ₹4,999 (Business Website)</option>
                    <option value="Starting from ₹9,999">Starting from ₹9,999 (Custom Web App)</option>
                    <option value="₹25,000 to ₹50,000">₹25,000 - ₹50,000 (Multi-portal / ERP)</option>
                    <option value="₹50,000+ Enterprise">₹50,000+ (Full Enterprise Solution)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 [html.light_&]:text-slate-700 mb-1.5">
                  Project Description &amp; Requirements *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe what you want to build, key features required, target timeline, or any specific integrations needed..."
                  className="w-full px-4 py-3 text-xs rounded-xl bg-white/[0.03] [html.light_&]:bg-slate-50 border border-white/10 [html.light_&]:border-slate-200 text-white [html.light_&]:text-slate-900 placeholder-slate-500 outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <span className="text-[11px] text-slate-400 [html.light_&]:text-slate-500">
                  Direct WhatsApp:{" "}
                  <a
                    href="https://wa.me/918688172740"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 [html.light_&]:text-emerald-600 font-mono font-semibold"
                  >
                    +91 86881 72740
                  </a>
                </span>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl text-xs font-semibold bg-[#0050B0] hover:bg-[#003E8A] text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50 transition"
                >
                  {submitting ? (
                    <span>Submitting to CRM...</span>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Send Project Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
