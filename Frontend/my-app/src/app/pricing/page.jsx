import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import SectionHeading from "../Component/SectionHeading";
import { COMPANY } from "../data/company";

export const metadata = {
  title: "Simple Starting Prices | Digital Crowd Technologies",
  description:
    "Transparent starting prices: Business Websites starting from ₹4,999, Custom Web Applications starting from ₹9,999. Final pricing depends on project requirements.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/pricing",
  },
};

export default function PricingPage() {
  return (
    <div className="flex flex-col bg-slate-50/50 [html.dark_&]:bg-transparent">
      {/* 1. HERO */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-200 [html.dark_&]:border-[#22344D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-[#567785]/10 text-[#567785] [html.dark_&]:text-[#8EAEBD] border border-[#567785]/30 mb-4">
            <Sparkles size={14} className="text-[#E89228]" />
            <span>Transparent Pricing Policy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E293B] [html.dark_&]:text-white tracking-tight leading-tight">
            Simple Starting Prices
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 [html.dark_&]:text-slate-300 leading-relaxed">
            Honest baseline pricing without hidden markups or inflated subscription tiers. We provide clear milestone estimates based on your exact functional scope.
          </p>

          <div className="mt-5 p-2.5 rounded-lg bg-[#FFF3E0] border border-[#FFD099] max-w-md mx-auto text-xs text-[#E89228] font-bold">
            * Final pricing depends on project requirements.
          </div>
        </div>
      </section>

      {/* 2. THE TWO PUBLIC BASELINE PRICING CARDS */}
      <section className="py-14 md:py-20 bg-transparent border-b border-slate-200 [html.dark_&]:border-[#22344D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* 1. Business Website */}
            <div className="p-7 sm:p-9 rounded-2xl bg-white [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-[#26364A] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-black text-[#567785] uppercase tracking-wider block mb-1">
                  Professional Presence
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] [html.dark_&]:text-white mb-2">
                  Business Website Development
                </h2>
                
                <div className="my-5 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-[#1E293B] [html.dark_&]:text-white">
                    ₹4,999
                  </span>
                  <span className="text-xs text-slate-400 uppercase font-mono font-bold">
                    Starting from
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 [html.dark_&]:text-slate-300 mb-5 leading-relaxed">
                  For professional business websites. Fast, responsive, and optimized to capture customer inquiries and WhatsApp messages.
                </p>

                <div className="p-2.5 rounded-lg bg-slate-50 [html.dark_&]:bg-slate-800 border border-slate-200 [html.dark_&]:border-slate-700 text-xs text-slate-500 mb-6 font-medium">
                  Final pricing depends on project requirements.
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-700 [html.dark_&]:text-slate-300 mb-8">
                  <li className="flex items-center gap-2.5">
                    <Check size={16} className="text-[#27AE60] shrink-0" />
                    <span>Responsive mobile, tablet &amp; desktop layout</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check size={16} className="text-[#27AE60] shrink-0" />
                    <span>Essential business pages (Home, About, Services, Contact)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check size={16} className="text-[#27AE60] shrink-0" />
                    <span>WhatsApp quick-chat &amp; interactive contact form</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check size={16} className="text-[#27AE60] shrink-0" />
                    <span>SEO-friendly HTML structure &amp; Google Maps embed</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check size={16} className="text-[#27AE60] shrink-0" />
                    <span>Complete deployment assistance on your hosting</span>
                  </li>
                </ul>
              </div>

              <div>
                <Link
                  href="/contact"
                  className="w-full btn-brand-orange py-3 text-xs font-bold text-center"
                >
                  Start Your Project
                </Link>
              </div>
            </div>

            {/* 2. Custom Website & Web Application */}
            <div className="p-7 sm:p-9 rounded-2xl bg-white [html.dark_&]:bg-[#152234] border-2 border-[#567785] shadow-md transition-all flex flex-col justify-between relative">
              <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#567785] text-white">
                Full-Stack Architecture
              </div>

              <div>
                <span className="text-[11px] font-black text-[#567785] uppercase tracking-wider block mb-1">
                  Database &amp; Application Logic
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] [html.dark_&]:text-white mb-2">
                  Custom Web Application
                </h2>
                
                <div className="my-5 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-[#1E293B] [html.dark_&]:text-white">
                    ₹9,999
                  </span>
                  <span className="text-xs text-slate-400 uppercase font-mono font-bold">
                    Starting from
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 [html.dark_&]:text-slate-300 mb-5 leading-relaxed">
                  For custom web applications requiring frontend, backend REST APIs, relational database and tailored functionality.
                </p>

                <div className="p-2.5 rounded-lg bg-slate-50 [html.dark_&]:bg-slate-800 border border-slate-200 [html.dark_&]:border-slate-700 text-xs text-slate-500 mb-6 font-medium">
                  Final pricing depends on project requirements.
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-700 [html.dark_&]:text-slate-300 mb-8">
                  <li className="flex items-center gap-2.5">
                    <Check size={16} className="text-[#27AE60] shrink-0" />
                    <span>Custom Next.js/React frontend with dynamic components</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check size={16} className="text-[#27AE60] shrink-0" />
                    <span>Node.js / Express backend with modular REST APIs</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check size={16} className="text-[#27AE60] shrink-0" />
                    <span>MySQL / MongoDB relational database modeling</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check size={16} className="text-[#27AE60] shrink-0" />
                    <span>Authentication, admin controls, and business logic</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check size={16} className="text-[#27AE60] shrink-0" />
                    <span>Production deployment on your Ubuntu VPS with SSL</span>
                  </li>
                </ul>
              </div>

              <div>
                <Link
                  href="/contact"
                  className="w-full btn-brand-orange py-3 text-xs font-bold text-center"
                >
                  Discuss Application Scope
                </Link>
              </div>
            </div>

          </div>

          {/* Pricing Disclaimer */}
          <div className="mt-8 text-center max-w-xl mx-auto space-y-2">
            <p className="text-xs text-slate-500">
              * Final pricing depends on project requirements. Domain, hosting, third-party APIs or infrastructure services may be billed separately where applicable.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CTA */}
      <section className="py-14 text-center">
        <div className="max-w-xl mx-auto px-4">
          <Link
            href="/contact"
            className="btn-peach text-xs font-bold"
          >
            <span>Need Something Custom? Request a Written Quote</span>
            <ArrowRight size={13} className="ml-1.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
