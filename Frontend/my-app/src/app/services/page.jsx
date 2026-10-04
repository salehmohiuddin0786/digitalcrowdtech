import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Server,
  Database,
  Smartphone,
  ShieldCheck,
  Zap,
  Sparkles,
} from "lucide-react";
import SectionHeading from "../Component/SectionHeading";
import { HaikeiMeshGlow, HaikeiWave } from "../Component/HaikeiDecorations";
import { SERVICES } from "../data/services";

export const metadata = {
  title: "Services & Solutions | Digital Crowd Technologies",
  description:
    "Explore our complete range of web development and software engineering services: Business Websites, Custom Web Apps, E-commerce, Backends & APIs, ERPs, and School Management Software.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* 1. HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-white/10 [html.light_&]:border-slate-200">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#2F7DE1]/20 to-[#F87000]/15 blur-[120px] pointer-events-none -z-10 rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#2F7DE1]/10 border border-[#2F7DE1]/30 text-[#2F7DE1] mb-6 backdrop-blur-md">
            <Sparkles size={13} />
            <span>Our Service Portfolio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white [html.light_&]:text-[#0A2540] tracking-tight leading-tight">
            Digital Solutions Built Around{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F7DE1] to-[#F87000]">
              Your Business
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#C5CEDD] [html.light_&]:text-[#40484C] leading-relaxed">
            From modern business websites to custom full-stack software, we design, develop, and deploy solutions tailored to your operational requirements.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="px-3 py-1.5 rounded-full bg-[#16223A] [html.light_&]:bg-slate-100 text-xs font-medium text-[#C5CEDD] [html.light_&]:text-[#40484C] border border-[#26344F] [html.light_&]:border-slate-200">
              Frontend + Backend + Database
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[#16223A] [html.light_&]:bg-slate-100 text-xs font-medium text-[#C5CEDD] [html.light_&]:text-[#40484C] border border-[#26344F] [html.light_&]:border-slate-200">
              Clean REST APIs
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[#16223A] [html.light_&]:bg-slate-100 text-xs font-medium text-[#C5CEDD] [html.light_&]:text-[#40484C] border border-[#26344F] [html.light_&]:border-slate-200">
              100% Source Code Ownership
            </span>
          </div>
        </div>
      </section>

      {/* 2. SERVICES GRID */}
      <section className="py-20 bg-transparent border-b border-white/10 [html.light_&]:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="glass-card-premium rounded-3xl p-8 flex flex-col justify-between shadow-xl hover:border-[#2F7DE1]/40 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#2F7DE1] px-2.5 py-1 rounded-full bg-[#2F7DE1]/10 border border-[#2F7DE1]/20">
                      {service.number}
                    </span>
                    {service.startingPrice && service.startingPrice.includes("₹") ? (
                      <span className="text-xs font-bold text-[#F87000] px-2.5 py-0.5 rounded-full bg-[#F87000]/10 border border-[#F87000]/30">
                        {service.startingPrice}
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-[#8494AD] [html.light_&]:text-[#64748B] px-2.5 py-0.5 rounded-full bg-white/5 [html.light_&]:bg-slate-200">
                        Custom Quote
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-white [html.light_&]:text-[#0A2540] group-hover:text-[#2F7DE1] transition-colors mb-3">
                    {service.title}
                  </h2>

                  <p className="text-sm text-[#8494AD] [html.light_&]:text-[#64748B] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8494AD] [html.light_&]:text-[#64748B] block mb-1">
                      Key Highlights:
                    </span>
                    {service.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#C5CEDD] [html.light_&]:text-[#40484C]">
                        <CheckCircle2 size={14} className="text-[#2F7DE1] shrink-0 mt-0.5" />
                        <span>{f.title}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] [html.light_&]:bg-white text-[#8494AD] [html.light_&]:text-[#64748B] border border-[#26344F] [html.light_&]:border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 [html.light_&]:border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-[#8494AD] [html.light_&]:text-[#64748B]">
                    {service.startingPrice && service.startingPrice.includes("₹")
                      ? "Starting price"
                      : "Requirements-based"}
                  </span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F87000] hover:text-[#FF8A24] transition-colors"
                  >
                    <span>Read Full Details</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CAPABILITIES CALLOUT */}
      <section className="py-20 bg-transparent border-b border-white/10 [html.light_&]:border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <SectionHeading
            badge="Full-Stack Engineering"
            title="Frontend + Backend + Database + APIs + Deployment"
            subtitle="You don't need five different vendors to launch software. We handle the complete engineering stack under one unified development process."
          />

          <div className="p-8 sm:p-10 rounded-3xl glass-card-premium text-left grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#C5CEDD] [html.light_&]:text-[#40484C] shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2F7DE1]" />
              <span>React & Next.js App Router</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2F7DE1]" />
              <span>Node.js & Express.js REST APIs</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2F7DE1]" />
              <span>MySQL Relational Databases & Migrations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2F7DE1]" />
              <span>JWT Authentication & Role-Based Access</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2F7DE1]" />
              <span>Payment Gateways (UPI, Cards, Net Banking)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2F7DE1]" />
              <span>Linux VPS, Nginx, SSL & Domain Setup</span>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-[#0B1220] [html.light_&]:text-white bg-[#F87000] hover:bg-[#FF8A24] rounded-full shadow-lg shadow-orange-500/25 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <span>Discuss Your Custom Solution</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
