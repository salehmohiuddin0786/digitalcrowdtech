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
import FaqSection from "./Component/FaqSection";
import OurWorkShowcase from "./Component/OurWorkShowcase";
import ClientProofsSection from "./Component/ClientProofsSection";
import PricingScopeCalculator from "./Component/PricingScopeCalculator";
import WhatWeBuildSection from "./Component/WhatWeBuildSection";
import WhyChooseSection from "./Component/WhyChooseSection";
import { COMPANY } from "./data/company";
import { PRODUCTS } from "./data/products";
import { SERVICES } from "./data/services";
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

      {/* 3. SOLUTIONS & SERVICES: WHAT WE BUILD (PRODUCTS + SERVICES) */}
      <WhatWeBuildSection services={SERVICES} products={PRODUCTS} />

      <OurWorkShowcase />

      {/* 5. VERIFIED CLIENT PROOFS & DELIVERABLES */}
      <ClientProofsSection />

      {/* 6. WHY CHOOSE DIGITAL CROWD TECH */}
      <WhyChooseSection id="why-choose" />

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
            badge="Transparent Pricing & Scope Estimator"
            title="Simple Starting Prices. Calculate Your Exact Scope."
            subtitle="Straightforward starting prices with zero hidden markups. Select your tier, configure verified feature modules, and discuss directly on WhatsApp."
          />

          <PricingScopeCalculator />
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

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <FaqSection id="faq" className="border-b border-white/5 [html.light_&]:border-slate-200/80" />

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
