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
  ShoppingBag,
  CreditCard,
  Building,
  GraduationCap,
  Percent,
  Phone,
} from "lucide-react";
import HeroArchitectureVisual from "./Component/HeroArchitectureVisual";
import SectionHeading from "./Component/SectionHeading";
import { HaikeiMeshGlow, StatusBadge } from "./Component/HaikeiDecorations";
import FlipWords from "./Component/FlipWords";
import BorderBeam from "./Component/BorderBeam";
import TechMarquee from "./Component/TechMarquee";
import { COMPANY } from "./data/company";
import { SERVICES } from "./data/services";
import { PROJECTS } from "./data/projects";
import { PRODUCTS } from "./data/products";
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
  const categories = [
    {
      title: "BUSINESS WEBSITES",
      desc: "Fast, responsive & inquiry-ready",
      price: "From ₹4,999",
      icon: Globe,
      href: "/services/business-website-development",
    },
    {
      title: "CUSTOM WEB APPS",
      desc: "Full-stack tailored applications",
      price: "From ₹9,999",
      icon: Code2,
      href: "/services/custom-web-application-development",
    },
    {
      title: "ECOMMERCE STORES",
      desc: "Catalog, cart & UPI payment",
      price: "Turnkey Platform",
      icon: ShoppingBag,
      href: "/services/ecommerce-development",
    },
    {
      title: "ERP SYSTEMS",
      desc: "Multi-role operations & accounts",
      price: "Modular Software",
      icon: Database,
      href: "/services/erp-development",
    },
    {
      title: "SCHOOL MANAGEMENT",
      desc: "Admissions, fees & parent app",
      price: "4-Portal Suite",
      icon: GraduationCap,
      href: "/services/school-management-software",
    },
    {
      title: "BACKEND & REST APIS",
      desc: "High-throughput Node.js & MySQL",
      price: "Secure APIs",
      icon: Server,
      href: "/services/backend-api-development",
    },
    {
      title: "PAYMENT INTEGRATION",
      desc: "Razorpay, Cashfree & UPI",
      price: "Instant Settlement",
      icon: CreditCard,
      href: "/contact",
    },
    {
      title: "VPS & DEPLOYMENT",
      desc: "Ubuntu, Nginx, SSL & Cloud",
      price: "Full Handover",
      icon: ShieldCheck,
      href: "/process",
    },
  ];

  const whyPoints = [
    {
      title: "Business-Focused Development",
      description:
        "We understand your commercial model, customer workflows, and operational requirements before writing a single line of code.",
      icon: Zap,
    },
    {
      title: "Modern Technology Stack",
      description:
        "We use proven, production-grade frontend, backend, and database technologies (React, Next.js, Node.js, Express, MySQL) built for longevity.",
      icon: Code2,
    },
    {
      title: "Unified Engineering Team",
      description:
        "Frontend, backend APIs, relational database schemas, payment integrations, and cloud deployment handled under one unified Hyderabad team.",
      icon: Layers,
    },
    {
      title: "Responsive by Default",
      description:
        "Every website and web application is engineered to perform seamlessly across smartphones, tablets, laptops, and desktop screens.",
      icon: Smartphone,
    },
    {
      title: "Transparent Communication",
      description:
        "Direct consultation, milestone-based planning, regular staging previews, and clear communication throughout the build lifecycle.",
      icon: ShieldCheck,
    },
    {
      title: "100% Code Ownership",
      description:
        "Zero vendor lock-in. Full source code, database scripts, configurations, and administrative access are completely handed over to you.",
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

  const homeFaqs = FAQS.slice(0, 8);

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION (Screenshot 1 Carousel/Hero Reference) */}
      <section className="relative pt-8 pb-14 md:pt-16 md:pb-20 overflow-hidden border-b border-slate-200 [html.dark_&]:border-[#22344D]">
        <HaikeiMeshGlow />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            
            {/* Left Column: Headline, Value Prop & CTAs */}
            <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E8F8EE] text-[#27AE60] border border-[#A9DFBF]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#27AE60] animate-pulse" />
                  <span>Available for New Projects • Hyderabad &amp; Pan-India</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E293B] [html.dark_&]:text-white tracking-tight leading-[1.15]">
                We Design. <br className="hidden sm:inline" />
                We Develop. <br className="hidden sm:inline" />
                <span className="text-[#E89228]">
                  We Deploy.
                </span>
              </h1>

              {/* Dynamic Capability Subtitle */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-sm sm:text-base font-semibold text-slate-600 [html.dark_&]:text-slate-300">
                <span>Engineering modern</span>
                <FlipWords
                  words={[
                    "Business Websites",
                    "Custom Web Applications",
                    "E-Commerce Systems",
                    "ERP & School Software",
                    "High-Throughput APIs",
                  ]}
                  duration={2400}
                  className="font-bold text-[#567785] [html.dark_&]:text-[#6D8E9D]"
                />
              </div>

              <p className="text-sm sm:text-base text-slate-600 [html.dark_&]:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Digital Crowd Technologies builds dependable business websites, full-stack software, and turnkey digital commerce platforms backed by Node.js, Express, MySQL, and Next.js.
              </p>

              {/* Dual Action CTAs matching Screenshot Colors */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto btn-brand-orange text-sm font-bold shadow-md"
                >
                  <span>Start Your Project</span>
                  <ArrowRight size={15} className="ml-1.5" />
                </Link>
                <Link
                  href="/products"
                  className="w-full sm:w-auto btn-peach text-sm font-bold"
                >
                  <span>Explore Turnkey Systems</span>
                  <ChevronRight size={15} className="ml-1" />
                </Link>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-200 [html.dark_&]:border-slate-800 text-left">
                <div className="flex flex-col">
                  <span className="text-xs font-black text-[#1E293B] [html.dark_&]:text-white">Authentic Code</span>
                  <span className="text-[11px] text-slate-500 font-medium">Zero cracked templates</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-[#E89228]">From ₹4,999</span>
                  <span className="text-[11px] text-slate-500 font-medium">Transparent pricing</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-[#27AE60]">100% Handover</span>
                  <span className="text-[11px] text-slate-500 font-medium">Source code ownership</span>
                </div>
              </div>

              {/* Carousel Pagination Indicator (Screenshot 1 Reference) */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-1.5">
                <span className="w-5 h-1.5 rounded-full bg-[#E89228]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 [html.dark_&]:bg-slate-700" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 [html.dark_&]:bg-slate-700" />
              </div>
            </div>

            {/* Right Column: Interactive Terminal Preview */}
            <div className="lg:col-span-6 w-full flex justify-center">
              <HeroArchitectureVisual />
            </div>

          </div>
        </div>
      </section>

      {/* 2. CORE TECH STACK MARQUEE */}
      <section className="py-4 bg-white/70 [html.dark_&]:bg-[#101B2A]/70 backdrop-blur-md border-b border-slate-200 [html.dark_&]:border-[#22344D] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="shrink-0 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#567785]" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 [html.dark_&]:text-slate-400">
                Engineering Stack:
              </span>
            </div>
            <div className="w-full flex-1 overflow-hidden">
              <TechMarquee
                speed={26}
                pauseOnHover={true}
                items={[
                  "React",
                  "Next.js",
                  "Node.js",
                  "Express.js",
                  "MySQL Relational DB",
                  "Tailwind CSS",
                  "REST APIs",
                  "JWT Security",
                  "Socket.io",
                  "Linux VPS & Ubuntu",
                  "Razorpay & Cashfree",
                  "Nginx Reverse Proxy",
                ].map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-[#2A3E59] text-slate-700 [html.dark_&]:text-slate-200 shadow-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E89228]" />
                    <span>{tech}</span>
                  </div>
                ))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. ALL CATEGORIES GRID (Screenshot 1 Reference: 4-Column Category Grid) */}
      <section className="py-14 md:py-20 bg-slate-50/60 [html.dark_&]:bg-transparent border-b border-slate-200 [html.dark_&]:border-[#22344D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Solutions & Offerings"
            title="ALL CATEGORIES"
            subtitle="Explore our complete software and development specializations, structured for businesses of all scales."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.title}
                  href={cat.href}
                  className="category-tile group"
                >
                  <div className="tile-icon-container">
                    <Icon size={24} />
                  </div>
                  <h3 className="tile-title group-hover:text-[#567785] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 [html.dark_&]:text-slate-400 mt-1 line-clamp-1">
                    {cat.desc}
                  </p>
                  <span className="mt-3 inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#FFF3E0] text-[#E89228] border border-[#FFD099]">
                    {cat.price}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#567785] hover:text-[#415C68] px-4 py-2 rounded-lg bg-white [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-slate-700 shadow-sm transition"
            >
              <span>View Detailed Service Breakdowns &amp; Deliverables</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. TURNKEY PRODUCTS SHOWCASE (Screenshot 4 Reference: Vertical Row Cards with Badges & Peach Buttons) */}
      <section className="py-14 md:py-20 bg-white [html.dark_&]:bg-[#0D1520] border-b border-slate-200 [html.dark_&]:border-[#22344D]" id="turnkey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Verified Live Platforms"
            title="FEATURED TURNKEY SYSTEMS"
            subtitle="Ready-to-deploy digital platforms with live websites, customer storefronts, admin control suites, and zero aggregator commissions."
          />

          <div className="space-y-6 max-w-5xl mx-auto">
            {PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="bg-white [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-[#26364A] rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Left Media Container with Discount/Price Badge matching Screenshot 4 */}
                  <div className="md:col-span-4 relative rounded-xl bg-slate-100 [html.dark_&]:bg-[#1A2A40] p-6 flex flex-col items-center justify-center text-center border border-slate-200 [html.dark_&]:border-[#2A3E59] overflow-hidden min-h-[170px]">
                    <span className="absolute top-2.5 left-2.5 badge-discount">
                      Turnkey Platform
                    </span>
                    <div className="w-14 h-14 rounded-2xl bg-white [html.dark_&]:bg-[#152234] flex items-center justify-center text-[#567785] shadow-sm mb-2 border border-slate-200 [html.dark_&]:border-slate-700">
                      <ShoppingBag size={28} className="text-[#567785]" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-700 [html.dark_&]:text-slate-300">
                      {prod.category}
                    </span>
                    {prod.liveUrl && (
                      <span className="mt-1 text-[10px] text-[#27AE60] font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#27AE60] animate-ping" />
                        Live Demo Available
                      </span>
                    )}
                  </div>

                  {/* Right Product Details matching Screenshot 4 */}
                  <div className="md:col-span-8 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg sm:text-xl font-extrabold uppercase text-[#1E293B] [html.dark_&]:text-white">
                        {prod.title}
                      </h3>
                      {prod.label && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 [html.dark_&]:bg-slate-800 text-[#567785] [html.dark_&]:text-[#8EAEBD] border border-slate-200 [html.dark_&]:border-slate-700">
                          {prod.label}
                        </span>
                      )}
                    </div>

                    {/* Pricing Row: Price, Strikethrough, Green Savings Badge */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-xl sm:text-2xl font-black text-[#1E293B] [html.dark_&]:text-white">
                        {prod.price}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹35,000 Estimate
                      </span>
                      <span className="badge-savings">
                        <CheckCircle2 size={12} />
                        Save ₹15,000+
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 [html.dark_&]:text-slate-300 leading-relaxed">
                      {prod.summary}
                    </p>

                    {/* Key Bullets */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-xs text-slate-600 [html.dark_&]:text-slate-400">
                      {prod.features.slice(0, 4).map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check size={14} className="text-[#27AE60] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Buttons: Peach button on right matching Screenshot 4 */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      {prod.liveUrl && (
                        <a
                          href={prod.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-peach text-xs font-bold"
                        >
                          <span>View Live Storefront Demo</span>
                          <ExternalLink size={13} className="ml-1.5" />
                        </a>
                      )}
                      <Link
                        href="/contact"
                        className="btn-brand-orange text-xs font-bold"
                      >
                        <span>Acquire Platform</span>
                        <ArrowRight size={13} className="ml-1.5" />
                      </Link>
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#567785] hover:text-[#415C68]"
            >
              <span>Explore All Products &amp; Turnkey Packages</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. OFFERS & PACKAGES TABS (Screenshot 3 Reference) */}
      <section className="py-14 md:py-20 bg-slate-50/60 [html.dark_&]:bg-transparent border-b border-slate-200 [html.dark_&]:border-[#22344D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Clear Packages"
            title="PACKAGES &amp; OFFERS"
            subtitle="Predictable deliverables and transparent scopes engineered for direct business deployment."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* Offer Card 1 */}
            <div className="bg-white [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-[#26364A] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#567785] bg-[#567785]/10 px-2 py-0.5 rounded">
                    Web Presence
                  </span>
                  <span className="badge-savings">Save ₹5,000</span>
                </div>
                <h3 className="text-base font-black uppercase text-[#E89228] mt-2">
                  BUSINESS WEBSITE PACKAGE
                </h3>
                <div className="my-2">
                  <span className="text-2xl font-black text-slate-900 [html.dark_&]:text-white">₹4,999</span>
                  <span className="text-xs text-slate-400 line-through ml-2">₹9,999</span>
                </div>
                <p className="text-xs text-slate-600 [html.dark_&]:text-slate-400 leading-relaxed">
                  Fast, mobile-ready 5-page business website with WhatsApp chat, contact forms, Google Map, and SEO semantic structure.
                </p>
                <div className="pt-3 border-t border-slate-100 [html.dark_&]:border-slate-800 text-[11px] text-slate-500">
                  Deliverable in 5–7 business days with full source code.
                </div>
              </div>
              <Link
                href="/contact"
                className="w-full btn-peach text-xs font-bold text-center"
              >
                Choose Website Package
              </Link>
            </div>

            {/* Offer Card 2 */}
            <div className="bg-white [html.dark_&]:bg-[#152234] border-2 border-[#567785] rounded-2xl p-6 shadow-md transition-all space-y-4 flex flex-col justify-between relative">
              <span className="absolute -top-3 right-5 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-[#567785] text-white rounded-full">
                Most Popular
              </span>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#567785] bg-[#567785]/10 px-2 py-0.5 rounded">
                    Full-Stack
                  </span>
                  <span className="badge-savings">Turnkey</span>
                </div>
                <h3 className="text-base font-black uppercase text-[#E89228] mt-2">
                  CUSTOM WEB APPLICATION
                </h3>
                <div className="my-2">
                  <span className="text-2xl font-black text-slate-900 [html.dark_&]:text-white">₹9,999</span>
                  <span className="text-xs text-slate-400 uppercase font-mono ml-1.5">Starting</span>
                </div>
                <p className="text-xs text-slate-600 [html.dark_&]:text-slate-400 leading-relaxed">
                  Custom Next.js frontend, Express REST APIs, MySQL relational database, role-based admin controls, and payment gateway.
                </p>
                <div className="pt-3 border-t border-slate-100 [html.dark_&]:border-slate-800 text-[11px] text-slate-500">
                  Custom database schema &amp; production deployment included.
                </div>
              </div>
              <Link
                href="/contact"
                className="w-full btn-brand-orange text-xs font-bold text-center"
              >
                Discuss Application Scope
              </Link>
            </div>

            {/* Offer Card 3 */}
            <div className="bg-white [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-[#26364A] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#567785] bg-[#567785]/10 px-2 py-0.5 rounded">
                    Turnkey SaaS
                  </span>
                  <span className="badge-savings">Zero Comm.</span>
                </div>
                <h3 className="text-base font-black uppercase text-[#E89228] mt-2">
                  RUCHI BAZZAR TURNKEY
                </h3>
                <div className="my-2">
                  <span className="text-2xl font-black text-slate-900 [html.dark_&]:text-white">₹19,999</span>
                  <span className="text-xs text-slate-400 line-through ml-2">₹35,000</span>
                </div>
                <p className="text-xs text-slate-600 [html.dark_&]:text-slate-400 leading-relaxed">
                  Complete hyperlocal food &amp; grocery ecosystem with customer storefront, merchant kitchen portal, delivery rider fleet, and superadmin.
                </p>
                <div className="pt-3 border-t border-slate-100 [html.dark_&]:border-slate-800 text-[11px] text-slate-500">
                  Live demo active at ruchibazzar.com. 100% white label.
                </div>
              </div>
              <Link
                href="/products"
                className="w-full btn-peach text-xs font-bold text-center"
              >
                Inspect Turnkey System
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 6. WHY WORK WITH US */}
      <section className="py-14 md:py-20 bg-white [html.dark_&]:bg-[#0D1520] border-b border-slate-200 [html.dark_&]:border-[#22344D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Engineering Integrity"
            title="WHY DIGITAL CROWD TECH?"
            subtitle="Straightforward engineering without middle brokers, subcontracting, or fabricated claims."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whyPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="p-6 rounded-2xl bg-slate-50/70 [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-[#26364A] hover:border-[#567785] transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#567785]/10 text-[#567785] flex items-center justify-center mb-3.5 group-hover:bg-[#567785] group-hover:text-white transition-colors">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-extrabold text-[#1E293B] [html.dark_&]:text-white mb-2">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 [html.dark_&]:text-slate-400 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. DEVELOPMENT PROCESS (7 STEPS) */}
      <section className="py-14 md:py-20 bg-slate-50/60 [html.dark_&]:bg-transparent border-b border-slate-200 [html.dark_&]:border-[#22344D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Workflow"
            title="FROM IDEA TO PRODUCTION LAUNCH"
            subtitle="A transparent 7-step process from requirements gathering to server configuration and deployment."
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {steps.map((st) => (
              <div
                key={st.num}
                className="p-4 rounded-xl bg-white [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-[#26364A] flex flex-col justify-between shadow-xs"
              >
                <div>
                  <span className="text-xs font-mono font-black text-[#E89228] block mb-1">
                    {st.num}
                  </span>
                  <h3 className="text-xs font-bold text-[#1E293B] [html.dark_&]:text-white mb-1">
                    {st.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 [html.dark_&]:text-slate-400 leading-snug">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/process"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#567785] hover:text-[#415C68]"
            >
              <span>Learn More About Milestones &amp; Staging Previews</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. CONSULTATION / QUICK INQUIRY (Screenshot 5 Reference: Clean Welcome / Contact Card) */}
      <section className="py-14 md:py-20 bg-white [html.dark_&]:bg-[#0D1520] relative">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-[#26364A] rounded-2xl shadow-lg overflow-hidden">
            
            {/* Top Petrol Blue Banner */}
            <div className="bg-[#567785] text-white py-3 px-6 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">
                Direct Project Consultation
              </span>
              <span className="text-xs font-semibold text-[#FFD099]">
                Zero Obligation
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-5 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 [html.dark_&]:bg-slate-800 flex items-center justify-center mx-auto border border-slate-200 [html.dark_&]:border-slate-700 p-1.5 shadow-sm">
                <Image
                  src="/logo.png"
                  alt="Digital Crowd Tech Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>

              <div>
                <h2 className="text-2xl font-black text-[#1E293B] [html.dark_&]:text-white">
                  Welcome!
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 [html.dark_&]:text-slate-400 mt-1">
                  Start your digital project consultation with Digital Crowd Technologies.
                </p>
              </div>

              {/* Quick Contact Form with Indian +91 Flag Selector matching Screenshot 5 */}
              <form action="/contact" method="GET" className="space-y-3.5 text-left max-w-md mx-auto">
                <div>
                  <label className="block text-xs font-bold text-slate-700 [html.dark_&]:text-slate-300 mb-1">
                    Your Contact Number
                  </label>
                  <div className="flex rounded-lg border border-slate-300 [html.dark_&]:border-[#2A3E59] bg-white [html.dark_&]:bg-[#182638] overflow-hidden focus-within:border-[#567785]">
                    <div className="flex items-center gap-1 px-3 bg-slate-50 [html.dark_&]:bg-slate-800/80 border-r border-slate-200 [html.dark_&]:border-slate-700 text-xs font-bold text-slate-700 [html.dark_&]:text-slate-300">
                      <span>🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter 10-digit mobile number"
                      className="w-full px-3 py-2 text-xs text-slate-900 [html.dark_&]:text-white bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full btn-brand-orange py-2.5 text-xs font-bold shadow-md"
                >
                  GET PROJECT PROPOSAL
                </button>

                <div className="text-center pt-2">
                  <Link
                    href="/contact"
                    className="text-xs font-semibold text-slate-500 hover:text-[#567785] transition-colors"
                  >
                    Or fill detailed requirements form →
                  </Link>
                </div>
              </form>

              <div className="pt-3 border-t border-slate-100 [html.dark_&]:border-slate-800 flex items-center justify-center gap-4 text-xs text-slate-500">
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="flex items-center gap-1 font-bold text-slate-700 [html.dark_&]:text-slate-300 hover:text-[#E89228]"
                >
                  <Phone size={13} className="text-[#E89228]" />
                  <span>{COMPANY.phoneDisplay}</span>
                </a>
                <span>•</span>
                <span className="text-[#27AE60] font-bold">Fast Reply via WhatsApp</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section className="py-14 md:py-20 bg-slate-50/60 [html.dark_&]:bg-transparent border-t border-slate-200 [html.dark_&]:border-[#22344D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Answers"
            title="FREQUENTLY ASKED QUESTIONS"
            subtitle="Clear, honest answers regarding pricing, code ownership, timelines, and post-launch support."
          />

          <div className="space-y-3">
            {homeFaqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-[#26364A] rounded-xl p-4 sm:p-5 shadow-xs"
              >
                <h3 className="text-sm font-bold text-[#1E293B] [html.dark_&]:text-white mb-1.5">
                  {faq.question}
                </h3>
                <p className="text-xs text-slate-600 [html.dark_&]:text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#567785] hover:text-[#415C68]"
            >
              <span>View All Frequently Asked Questions</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
