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
  Check,
  Globe,
  ShoppingBag,
} from "lucide-react";
import SectionHeading from "../Component/SectionHeading";
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
    <div className="flex flex-col bg-slate-50/50 [html.dark_&]:bg-transparent">
      {/* 1. HERO */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-200 [html.dark_&]:border-[#22344D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-[#567785]/10 text-[#567785] [html.dark_&]:text-[#8EAEBD] border border-[#567785]/30 mb-4">
            <Sparkles size={14} className="text-[#E89228]" />
            <span>Our Service Portfolio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E293B] [html.dark_&]:text-white tracking-tight leading-tight">
            Digital Solutions Built Around{" "}
            <span className="text-[#E89228]">
              Your Business
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 [html.dark_&]:text-slate-300 leading-relaxed">
            From modern business websites to custom full-stack software, we design, develop, and deploy solutions tailored to your operational requirements.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <span className="px-3 py-1.5 rounded-lg bg-white [html.dark_&]:bg-[#152234] text-xs font-bold text-slate-700 [html.dark_&]:text-slate-300 border border-slate-200 [html.dark_&]:border-slate-700 shadow-xs">
              Frontend + Backend + Database
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white [html.dark_&]:bg-[#152234] text-xs font-bold text-slate-700 [html.dark_&]:text-slate-300 border border-slate-200 [html.dark_&]:border-slate-700 shadow-xs">
              Clean REST APIs
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white [html.dark_&]:bg-[#152234] text-xs font-bold text-slate-700 [html.dark_&]:text-slate-300 border border-slate-200 [html.dark_&]:border-slate-700 shadow-xs">
              100% Source Code Ownership
            </span>
          </div>
        </div>
      </section>

      {/* 2. SERVICES GRID (Screenshot 1 & 4 Reference) */}
      <section className="py-14 md:py-20 bg-transparent border-b border-slate-200 [html.dark_&]:border-[#22344D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-white [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-[#26364A] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#567785] transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-black text-[#567785] px-2.5 py-1 rounded bg-[#567785]/10 border border-[#567785]/20">
                      {service.number}
                    </span>
                    {service.startingPrice && service.startingPrice.includes("₹") ? (
                      <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#FFF3E0] text-[#E89228] border border-[#FFD099]">
                        {service.startingPrice}
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-500 px-2.5 py-1 rounded-full bg-slate-100 [html.dark_&]:bg-slate-800">
                        Custom Quote
                      </span>
                    )}
                  </div>

                  <h2 className="text-lg font-black uppercase text-[#1E293B] [html.dark_&]:text-white group-hover:text-[#567785] transition-colors mb-2.5">
                    {service.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 [html.dark_&]:text-slate-400 leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-5">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#567785] [html.dark_&]:text-[#8EAEBD] block mb-1">
                      Key Highlights:
                    </span>
                    {service.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 [html.dark_&]:text-slate-300">
                        <Check size={14} className="text-[#27AE60] shrink-0 mt-0.5" />
                        <span>{f.title}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {service.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 [html.dark_&]:bg-slate-800/80 text-slate-600 [html.dark_&]:text-slate-400 border border-slate-200 [html.dark_&]:border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 [html.dark_&]:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {service.startingPrice && service.startingPrice.includes("₹")
                      ? "Baseline price"
                      : "Requirements-based"}
                  </span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="btn-peach text-xs font-bold py-1.5 px-3"
                  >
                    <span>Read Details</span>
                    <ArrowRight size={12} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CTA */}
      <section className="py-14 md:py-20 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-[#26364A] rounded-2xl p-8 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-[#1E293B] [html.dark_&]:text-white">
              Need a Custom Solution?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 [html.dark_&]:text-slate-400">
              Tell us your functional requirements and we&apos;ll help you plan the architecture, timeline, and pricing.
            </p>
            <div className="pt-2 flex justify-center">
              <Link
                href="/contact"
                className="btn-brand-orange text-xs font-bold"
              >
                <span>Request Custom Service Proposal</span>
                <ArrowRight size={13} className="ml-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
