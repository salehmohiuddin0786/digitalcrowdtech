import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Code2,
  Database,
  Server,
  Smartphone,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Globe,
  HelpCircle,
  Sparkles,
  Layers,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  Cpu,
  Clock,
  Check,
} from "lucide-react";
import HeroArchitectureVisual from "./Component/HeroArchitectureVisual";
import SectionHeading from "./Component/SectionHeading";
import { HaikeiMeshGlow, StatusBadge, HaikeiWave, HaikeiLayeredWave } from "./Component/HaikeiDecorations";
import FlipWords from "./Component/FlipWords";
import BorderBeam from "./Component/BorderBeam";
import SpotlightCard from "./Component/SpotlightCard";
import TechMarquee from "./Component/TechMarquee";
import ShimmerButton from "./Component/ShimmerButton";
import TiltCard from "./Component/TiltCard";
import ProjectArchitectureDiagram from "./Component/ProjectArchitectureDiagram";
import { COMPANY } from "./data/company";
import { SERVICES } from "./data/services";
import { PROJECTS } from "./data/projects";
import { FAQS } from "./data/faqs";

export const metadata = {
  title: "Digital Crowd Technologies | We Design. We Develop. We Deploy.",
  description:
    "Digital Crowd Technologies builds professional websites, custom web applications, e-commerce platforms and backend systems for businesses in Hyderabad and across India.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/",
  },
};

export default function HomePage() {
  const whyPoints = [
    {
      title: "Business-Focused Development",
      description:
        "We understand your business model, customer workflows, and operational requirements before writing a single line of code.",
      icon: Zap,
    },
    {
      title: "Modern Technology",
      description:
        "We use proven, production-grade frontend, backend, and database technologies (React, Next.js, Node.js, Express, MySQL) built for longevity.",
      icon: Code2,
    },
    {
      title: "Complete Development",
      description:
        "Frontend, backend APIs, relational database schemas, payment integrations, and cloud deployment handled under one unified engineering team.",
      icon: Layers,
    },
    {
      title: "Responsive by Default",
      description:
        "Every website and web application is engineered to perform seamlessly across mobile phones, tablets, laptops, and desktop displays.",
      icon: Smartphone,
    },
    {
      title: "Transparent Communication",
      description:
        "Direct consultation, milestone-based planning, regular staging previews, and clear communication throughout the build lifecycle.",
      icon: ShieldCheck,
    },
    {
      title: "Post-Launch Support",
      description:
        "Comprehensive support for deployment, domain setup, server monitoring, bug fixes, updates, and ongoing improvements.",
      icon: Clock,
    },
  ];

  const steps = [
    { num: "01", name: "Discover", desc: "Understand your business, target users, and functional requirements." },
    { num: "02", name: "Plan", desc: "Define feature specifications, architecture, milestones, and deliverable scope." },
    { num: "03", name: "Design", desc: "Create intuitive, high-conversion user interfaces and mobile layouts." },
    { num: "04", name: "Develop", desc: "Build clean frontend components, backend REST APIs, and database schemas." },
    { num: "05", name: "Test", desc: "Validate functionality, multi-device responsiveness, security, and performance." },
    { num: "06", name: "Deploy", desc: "Configure production server/VPS, install SSL, connect domain, and go live." },
    { num: "07", name: "Support", desc: "Provide post-launch assistance, updates, maintenance, and future iterations." },
  ];

  const techCategories = [
    {
      category: "Frontend",
      skills: ["React", "Next.js", "JavaScript (ES6+)", "Tailwind CSS", "HTML5 & CSS3"],
    },
    {
      category: "Backend & APIs",
      skills: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "OTP Verifications"],
    },
    {
      category: "Databases",
      skills: ["MySQL (Relational)", "MongoDB", "Sequelize ORM", "Prisma ORM", "ACID Transactions"],
    },
    {
      category: "Real-Time & Integration",
      skills: ["Socket.io (WebSockets)", "Payment Gateway APIs", "Nodemailer (SMTP)", "Cloud/VPS Deployment", "Nginx"],
    },
  ];

  const homeFaqs = FAQS.slice(0, 9);

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-[#26344F]/60 [html.light_&]:border-slate-200">
        {/* Haikei Generative Tech Mesh & Radial Gradient Glow Background */}
        <HaikeiMeshGlow />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Motion Primitives Animated Status Badge */}
              <div className="flex items-center justify-center lg:justify-start">
                <StatusBadge text="Available for New Projects" tone="emerald" />
              </div>

              {/* Primary Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl font-black text-white [html.light_&]:text-[#0A2540] tracking-tight leading-[1.15]">
                We Design. <br className="hidden sm:inline" />
                We Develop. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F7DE1] via-[#2F7DE1] to-[#F87000]">
                  We Deploy.
                </span>
              </h1>

              {/* 21st.dev Dynamic FlipWords Capability Display */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-sm sm:text-base font-medium text-[#8494AD] [html.light_&]:text-slate-600">
                <span>Building high-performance</span>
                <FlipWords
                  words={[
                    "Web Applications",
                    "Business Websites",
                    "E-Commerce Systems",
                    "Relational Databases",
                    "Custom REST APIs",
                  ]}
                  duration={2400}
                  className="font-bold"
                />
              </div>

              {/* Primary Description */}
              <p className="text-base sm:text-lg text-[#C5CEDD] [html.light_&]:text-[#40484C] leading-relaxed max-w-xl mx-auto lg:mx-0">
                Digital Crowd Technologies builds professional websites, custom web applications, e-commerce platforms and backend systems for businesses in Hyderabad and across India.
              </p>

              {/* Supporting Line: Full Stack Capability */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-mono text-[#2F7DE1] py-1">
                <span className="px-3 py-1.5 rounded-full bg-[#2F7DE1]/10 border border-[#2F7DE1]/25 font-semibold">
                  Frontend + Backend + Database + APIs + Deployment
                </span>
              </div>

              {/* 21st.dev CTA Buttons with ShimmerButton */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <ShimmerButton href="/contact">
                  <span>Start Your Project</span>
                </ShimmerButton>
                <Link
                  href="/projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white [html.light_&]:text-[#0A2540] bg-[#16223A] [html.light_&]:bg-slate-100 hover:bg-white/10 [html.light_&]:hover:bg-slate-200 border border-[#26344F] [html.light_&]:border-slate-300 rounded-full transition-all duration-200"
                >
                  <span>View Our Work</span>
                  <ChevronRight size={16} />
                </Link>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-[#26344F]/80 [html.light_&]:border-slate-200 text-left">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white [html.light_&]:text-[#0A2540]">Authentic Code</span>
                  <span className="text-[11px] text-[#8494AD] [html.light_&]:text-[#64748B]">Zero fake templates</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#F87000]">From ₹4,999</span>
                  <span className="text-[11px] text-[#8494AD] [html.light_&]:text-[#64748B]">Transparent pricing</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white [html.light_&]:text-[#0A2540]">Full Handover</span>
                  <span className="text-[11px] text-[#8494AD] [html.light_&]:text-[#64748B]">100% source ownership</span>
                </div>
              </div>
            </div>

            {/* Right Visual Column (Interactive Terminal Architecture) */}
            <div className="lg:col-span-6 w-full flex justify-center">
              <HeroArchitectureVisual />
            </div>

          </div>
        </div>

        {/* Subtle luminous accent divider */}
        <div className="mt-12 sm:mt-16 w-full h-px bg-gradient-to-r from-transparent via-[#2F7DE1]/40 to-transparent" />
      </section>

      {/* 2. TECHNOLOGY STRIP WITH 21ST.DEV INFINITE MARQUEE */}
      <section className="py-6 bg-white/[0.02] [html.light_&]:bg-white/60 backdrop-blur-xl border-y border-white/5 [html.light_&]:border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="shrink-0 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2F7DE1] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#8494AD] [html.light_&]:text-[#64748B]">
                Core Tech Stack:
              </span>
            </div>
            <div className="w-full flex-1 overflow-hidden">
              <TechMarquee
                speed={28}
                pauseOnHover={true}
                items={[
                  "React",
                  "Next.js 16",
                  "Node.js",
                  "Express.js",
                  "MySQL Relational DB",
                  "PostgreSQL",
                  "Tailwind CSS v4",
                  "REST & GraphQL APIs",
                  "JWT & Bcrypt Security",
                  "Linux VPS & Ubuntu",
                  "Sequelize ORM",
                  "Framer Motion",
                ].map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/[0.04] [html.light_&]:bg-white border border-white/10 [html.light_&]:border-slate-200 text-[#C5CEDD] [html.light_&]:text-[#40484C] hover:text-[#2F7DE1] hover:border-[#2F7DE1]/40 shadow-sm transition-all duration-200 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F7DE1]" />
                    <span>{tech}</span>
                  </div>
                ))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES: WHAT WE BUILD */}
      <section className="py-20 md:py-28 bg-transparent border-b border-white/5 [html.light_&]:border-slate-200/80 relative" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Solutions & Services"
            title="What We Build"
            subtitle="From professional business websites to complete custom software, we build digital solutions around your requirements."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => {
              const isBusinessSite = service.id === "business-website-development";
              const isCustomApp = service.id === "custom-web-application-development";

              return (
                <SpotlightCard
                  key={service.id}
                  className="p-7 flex flex-col justify-between group"
                >
                  <div>
                    {/* Card Header: Number & Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-blue-400 px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20">
                        {service.number}
                      </span>
                      {service.startingPrice && service.startingPrice.includes("₹") ? (
                        <span className="text-xs font-bold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                          {service.startingPrice}
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-slate-400 px-2 py-0.5 rounded bg-white/5">
                          Custom Quote
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-2.5">
                      {service.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                      {service.summary}
                    </p>

                    {/* Key Technical Bullets */}
                    <div className="space-y-2 mb-6">
                      {service.id === "backend-api-development" && (
                        <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
                          {[
                            "Node.js",
                            "Express.js",
                            "REST APIs",
                            "Auth & RBAC",
                            "Database Integration",
                            "OTP & Payments",
                            "Real-Time WebSockets",
                          ].map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {service.id === "erp-development" && (
                        <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
                          {[
                            "Inventory",
                            "Customers",
                            "Orders",
                            "Employees",
                            "Accounts",
                            "Reports",
                            "Admin Dashboard",
                            "Role-Based Access",
                          ].map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {service.id === "school-management-software" && (
                        <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
                          {[
                            "Students",
                            "Teachers",
                            "Parents",
                            "Attendance",
                            "Fees",
                            "Notices",
                            "Timetable",
                            "Reports",
                            "Admin Dashboard",
                          ].map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {isBusinessSite && (
                        <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
                          {[
                            "Responsive Layouts",
                            "Contact & WhatsApp",
                            "SEO Semantic HTML",
                            "Fast Performance",
                            "VPS / Cloud Setup",
                          ].map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {isCustomApp && (
                        <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
                          {[
                            "Frontend + Backend",
                            "MySQL Relational DB",
                            "Authentication & RBAC",
                            "Admin Dashboards",
                            "Payment APIs",
                          ].map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {service.id === "ecommerce-development" && (
                        <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
                          {[
                            "Product Catalog",
                            "Shopping Cart",
                            "UPI & Card Checkout",
                            "Orders & Coupons",
                            "Merchant Portal",
                          ].map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      {service.startingPrice && service.startingPrice.includes("₹")
                        ? "Starting price"
                        : "Custom requirements"}
                    </span>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 group-hover:text-blue-300 transition-colors"
                    >
                      <span>{service.ctaText}</span>
                      <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition"
            >
              <span>Explore All Detailed Service Pages</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS: OUR WORK */}
      <section className="py-20 md:py-28 bg-transparent border-b border-white/5 [html.light_&]:border-slate-200/80 relative" id="projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Verified Portfolio"
            title="Our Work"
            subtitle="Explore real digital products and software solutions built by Digital Crowd Technologies."
          />

          <div className="space-y-12">
            {PROJECTS.map((project, idx) => {
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={project.id}
                  className="rounded-3xl glass-card-premium p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Project Info */}
                    <div className={`lg:col-span-6 space-y-4 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                      {project.isInternal ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300">
                          <span>{project.label}</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400">
                          <span>{project.category}</span>
                        </div>
                      )}

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
                        {project.title}
                      </h3>

                      <p className="text-sm sm:text-base text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                        {project.summary}
                      </p>

                      {/* Tech Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.technologies.slice(0, 6).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-white/5 [html.light_&]:bg-slate-100 text-slate-300 [html.light_&]:text-slate-700 border border-white/5 [html.light_&]:border-slate-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Features Snippet */}
                      <ul className="space-y-1.5 pt-2 text-xs sm:text-sm text-slate-400 [html.light_&]:text-slate-600">
                        {project.features.slice(0, 4).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <CheckCircle2 size={15} className="text-blue-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div className="pt-4 flex items-center gap-4">
                        {project.caseStudyUrl ? (
                          <Link
                            href={project.caseStudyUrl}
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md transition"
                          >
                            <span>View Case Study</span>
                            <ArrowRight size={15} />
                          </Link>
                        ) : (
                          <Link
                            href={project.liveUrl || "/"}
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white [html.light_&]:text-[#0A2540] bg-white/10 [html.light_&]:bg-slate-100 hover:bg-white/15 [html.light_&]:hover:bg-slate-200 border border-white/10 [html.light_&]:border-slate-300 rounded-xl transition"
                          >
                            <span>Live Internal Site</span>
                            <ArrowRight size={15} />
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Project Architecture & Mock Visual */}
                    <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                      {project.id === "ruchi-bazzar" || project.id === "school-management-system" ? (
                        <ProjectArchitectureDiagram projectId={project.id} />
                      ) : (
                        <TiltCard tiltAmount={6}>
                          <div className="rounded-2xl glass-card-premium p-5 space-y-4 shadow-inner">
                            <div className="flex items-center justify-between pb-3 border-b border-white/5 text-xs">
                              <span className="font-mono text-slate-400 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                {project.title.toLowerCase().replace(/\s+/g, "-")} :: overview
                              </span>
                              <span className="text-[11px] font-semibold text-slate-400">
                                {project.category}
                              </span>
                            </div>

                            <div className="space-y-2.5 text-xs text-slate-300 [html.light_&]:text-slate-700">
                              <div className="p-3 rounded-lg bg-white/[0.02] [html.light_&]:bg-slate-50 border border-white/5 [html.light_&]:border-slate-200">
                                <span className="font-semibold text-white [html.light_&]:text-slate-900 block mb-0.5">Agency Infrastructure & Admin Portal</span>
                                <p className="text-slate-400 [html.light_&]:text-slate-600 text-[11px]">
                                  Next.js App Router frontend with authenticated inquiry CRM, MySQL persistence, and Nodemailer integration.
                                </p>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-[11px]">
                                <div className="p-2 rounded bg-white/[0.02] [html.light_&]:bg-slate-50 border border-white/5 [html.light_&]:border-slate-200">
                                  <span className="text-blue-400 font-semibold block">Inquiry Tracking</span>
                                  <span className="text-slate-400 [html.light_&]:text-slate-600">New → Contacted → Done</span>
                                </div>
                                <div className="p-2 rounded bg-white/[0.02] [html.light_&]:bg-slate-50 border border-white/5 [html.light_&]:border-slate-200">
                                  <span className="text-cyan-400 font-semibold block">High Performance</span>
                                  <span className="text-slate-400 [html.light_&]:text-slate-600">90+ Core Web Vitals</span>
                                </div>
                              </div>
                            </div>

                            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                              <span>Verified Production Deliverable</span>
                              <span className="text-blue-400 font-semibold">100% Client-Ready</span>
                            </div>
                          </div>
                        </TiltCard>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}

            {/* Honest 'More Projects Coming Soon' banner */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-dashed border-white/10 text-center">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Portfolio Transparency
              </span>
              <p className="text-sm font-semibold text-slate-300">
                More Genuine Projects Coming Soon
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                We believe in genuine engineering. We do not invent fake client logos, fabricated case studies, or mock testimonials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="py-20 md:py-28 bg-transparent border-b border-white/5 [html.light_&]:border-slate-200/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Engineering Integrity"
            title="Why Work With Digital Crowd Technologies?"
            subtitle="Capable, honest software development built around real client outcomes and clean technical execution."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="p-7 rounded-2xl glass-card-premium group hover:border-[#2F7DE1]/50 shadow-xl transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#2F7DE1]/10 border border-[#2F7DE1]/25 text-[#2F7DE1] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white [html.light_&]:text-[#0A2540] mb-2">
                    {point.title}
                  </h3>
                  <p className="text-sm text-[#8494AD] [html.light_&]:text-[#64748B] leading-relaxed">
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. HOW WE WORK: FROM IDEA TO LAUNCH */}
      <section className="py-20 md:py-28 bg-transparent border-b border-white/5 [html.light_&]:border-slate-200/80 relative" id="process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Development Workflow"
            title="From Idea to Launch"
            subtitle="A clear, structured 7-step process from requirements gathering to production deployment and beyond."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {steps.map((st) => (
              <div
                key={st.num}
                className="p-5 rounded-2xl glass-card-premium flex flex-col justify-between group hover:border-[#2F7DE1]/50 shadow-md transition-all duration-300"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#2F7DE1] block mb-2 group-hover:text-[#F87000] transition-colors">
                    {st.num}
                  </span>
                  <h3 className="text-sm font-bold text-white [html.light_&]:text-[#0A2540] mb-2">
                    {st.name}
                  </h3>
                  <p className="text-xs text-[#8494AD] [html.light_&]:text-[#64748B] leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/process"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2F7DE1] hover:text-[#2F7DE1]/80"
            >
              <span>Learn More About Communication & Milestones</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. PRICING PREVIEW: SIMPLE STARTING PRICES */}
      <section className="py-20 md:py-28 bg-transparent border-b border-white/5 [html.light_&]:border-slate-200/80 relative" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Transparent Pricing"
            title="Simple Starting Prices"
            subtitle="Straightforward starting prices for standard websites and web applications. No hidden markups."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Price 1: Business Website */}
            <div className="p-8 rounded-3xl glass-card-premium flex flex-col justify-between shadow-2xl relative group hover:border-[#2F7DE1]/40 transition">
              <div>
                <span className="text-xs font-bold text-[#2F7DE1] uppercase tracking-wider block mb-2">
                  Standard Tier
                </span>
                <h3 className="text-xl font-bold text-white [html.light_&]:text-[#0A2540] mb-1">
                  Business Website
                </h3>
                <div className="my-5 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
                    ₹4,999
                  </span>
                  <span className="text-xs text-[#8494AD] [html.light_&]:text-[#64748B] uppercase font-mono">
                    Starting from
                  </span>
                </div>
                <p className="text-sm text-[#C5CEDD] [html.light_&]:text-[#40484C] mb-6">
                  Professional responsive website for businesses, startups, clinics, and professionals.
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#C5CEDD] [html.light_&]:text-[#40484C] mb-8">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-[#2F7DE1] shrink-0" />
                    <span>Responsive mobile & desktop design</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-[#2F7DE1] shrink-0" />
                    <span>Essential business pages (Home, About, Services, Contact)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-[#2F7DE1] shrink-0" />
                    <span>WhatsApp button & contact form integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-[#2F7DE1] shrink-0" />
                    <span>Fast performance & SEO-friendly structure</span>
                  </li>
                </ul>
              </div>

              <div>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center py-3 text-sm font-bold text-[#0B1220] [html.light_&]:text-white bg-[#F87000] hover:bg-[#FF8A24] rounded-full shadow-lg shadow-orange-500/25 transition"
                >
                  Start Your Project
                </Link>
              </div>
            </div>

            {/* Price 2: Custom Website & Web Application */}
            <div className="p-8 rounded-3xl glass-card-premium border-2 border-[#2F7DE1]/60 flex flex-col justify-between relative shadow-2xl overflow-hidden">
              <BorderBeam duration={8} rx={24} strokeWidth={2} />
              <div className="absolute -top-3 right-6 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#2F7DE1] text-white">
                Full-Stack
              </div>

              <div>
                <span className="text-xs font-bold text-[#2F7DE1] uppercase tracking-wider block mb-2">
                  Application Tier
                </span>
                <h3 className="text-xl font-bold text-white [html.light_&]:text-[#0A2540] mb-1">
                  Custom Website & Web Application
                </h3>
                <div className="my-5 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
                    ₹9,999
                  </span>
                  <span className="text-xs text-[#8494AD] [html.light_&]:text-[#64748B] uppercase font-mono">
                    Starting from
                  </span>
                </div>
                <p className="text-sm text-[#C5CEDD] [html.light_&]:text-[#40484C] mb-6">
                  Custom frontend + backend + database + business functionality tailored to your process.
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#C5CEDD] [html.light_&]:text-[#40484C] mb-8">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-[#2F7DE1] shrink-0" />
                    <span>Custom Next.js/React frontend interface</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-[#2F7DE1] shrink-0" />
                    <span>Node.js / Express backend with REST APIs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-[#2F7DE1] shrink-0" />
                    <span>MySQL / MongoDB relational database integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-[#2F7DE1] shrink-0" />
                    <span>Authentication, admin controls, and business logic</span>
                  </li>
                </ul>
              </div>

              <div>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center py-3 text-sm font-bold text-[#0B1220] [html.light_&]:text-white bg-[#F87000] hover:bg-[#FF8A24] rounded-full shadow-lg shadow-orange-500/25 transition"
                >
                  Discuss Your Project
                </Link>
              </div>
            </div>

          </div>

          {/* Pricing Disclaimer & Custom Quote prompt */}
          <div className="mt-8 text-center max-w-xl mx-auto space-y-3">
            <p className="text-xs font-medium text-[#8494AD] [html.light_&]:text-[#64748B]">
              * Final pricing depends on project requirements. Domain, hosting, third-party APIs or infrastructure services may be billed separately where applicable.
            </p>
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2F7DE1] hover:text-[#2F7DE1]/80"
              >
                <span>Need Something Custom? Get a Quote</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TECHNOLOGY WE WORK WITH */}
      <section className="py-20 md:py-28 bg-transparent border-b border-white/5 [html.light_&]:border-slate-200/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Engineering Foundation"
            title="Technology We Work With"
            subtitle="We exclusively deploy technologies our engineering team has mastered and uses in production every day."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techCategories.map((cat) => (
              <div
                key={cat.category}
                className="p-6 rounded-2xl glass-card-premium shadow-md"
              >
                <h3 className="text-base font-bold text-white [html.light_&]:text-[#0A2540] mb-4 pb-2 border-b border-white/10 [html.light_&]:border-slate-200">
                  {cat.category}
                </h3>
                <ul className="space-y-2 text-sm text-[#C5CEDD] [html.light_&]:text-[#40484C]">
                  {cat.skills.map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2F7DE1]" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="py-20 md:py-28 bg-transparent border-b border-white/5 [html.light_&]:border-slate-200/80 relative" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Clear Answers"
            title="Frequently Asked Questions"
            subtitle="Transparent answers regarding cost, backend capabilities, hosting ownership, and project kick-off."
          />

          <div className="space-y-4">
            {homeFaqs.map((faq) => (
              <div
                key={faq.id}
                className="p-5 rounded-xl glass-card-premium shadow-sm"
              >
                <h3 className="text-base font-bold text-white [html.light_&]:text-[#0A2540] mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-[#8494AD] [html.light_&]:text-[#64748B] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2F7DE1] hover:text-[#2F7DE1]/80"
            >
              <span>View Full FAQ Page with More Technical Details</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA: HAVE A PROJECT IN MIND? */}
      <section className="py-20 md:py-28 bg-transparent relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative rounded-3xl glass-card-premium p-8 sm:p-14 text-center space-y-6 shadow-2xl overflow-hidden">
            {/* 21st.dev Magic UI BorderBeam */}
            <BorderBeam duration={9} rx={24} strokeWidth={2} />

            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-[#2F7DE1]/10 border border-[#2F7DE1]/25 text-[#2F7DE1] uppercase tracking-wider">
              Let&apos;s Build Together
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white [html.light_&]:text-[#0A2540] tracking-tight">
              Have a Project in Mind?
            </h2>

            <p className="text-base sm:text-lg text-[#C5CEDD] [html.light_&]:text-[#40484C] max-w-xl mx-auto leading-relaxed">
              Tell us what you&apos;re building. We&apos;ll understand your requirements and help you plan the right solution.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <ShimmerButton href="/contact">
                <span>Start Your Project</span>
              </ShimmerButton>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white [html.light_&]:text-[#0A2540] bg-[#16223A]/80 [html.light_&]:bg-slate-100 hover:bg-white/10 [html.light_&]:hover:bg-slate-200 border border-[#26344F] [html.light_&]:border-slate-300 rounded-full transition"
              >
                <span>Contact Us</span>
                <MessageSquare size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
