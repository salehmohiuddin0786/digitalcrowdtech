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
import { HaikeiMeshGlow, HaikeiWave } from "../Component/HaikeiDecorations";
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
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-[#26344F]/60 [html.light_&]:border-slate-200">
        <HaikeiMeshGlow />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#2F7DE1]/10 border border-[#2F7DE1]/30 text-[#2F7DE1] mb-6">
            <Sparkles size={13} />
            <span>Transparent Pricing Policy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white [html.light_&]:text-[#0A2540] tracking-tight leading-tight">
            Simple Starting Prices
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#C5CEDD] [html.light_&]:text-[#40484C] leading-relaxed">
            Honest baseline pricing without hidden markups or misleading enterprise tiers. We provide clear milestone estimates based on your functional scope.
          </p>

          <div className="mt-6 p-3 rounded-xl bg-[#2F7DE1]/10 border border-[#2F7DE1]/25 max-w-lg mx-auto text-xs text-[#2F7DE1] font-semibold">
            * Final pricing depends on project requirements.
          </div>
        </div>
      </section>

      {/* THE ONLY TWO PUBLIC PRICES */}
      <section className="py-20 bg-[#0B1220] [html.light_&]:bg-white border-b border-[#26344F]/60 [html.light_&]:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* 1. Business Website */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#16223A] [html.light_&]:bg-[#F4F7FB] border border-[#26344F] [html.light_&]:border-slate-300 hover:border-[#2F7DE1]/40 transition flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-xs font-bold text-[#2F7DE1] uppercase tracking-wider block mb-2">
                  Professional Presence
                </span>
                <h2 className="text-2xl font-bold text-white [html.light_&]:text-[#0A2540] mb-2">
                  Business Website Development
                </h2>
                
                <div className="my-6 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white [html.light_&]:text-[#0A2540]">
                    ₹4,999
                  </span>
                  <span className="text-xs text-[#8494AD] [html.light_&]:text-[#64748B] uppercase font-mono">
                    Starting from
                  </span>
                </div>

                <p className="text-sm text-[#C5CEDD] [html.light_&]:text-[#40484C] mb-6 leading-relaxed">
                  For professional business websites. Fast, responsive, and optimized to capture customer inquiries and WhatsApp messages.
                </p>

                <div className="p-3 rounded-lg bg-white/[0.03] [html.light_&]:bg-white border border-[#26344F] [html.light_&]:border-slate-200 text-xs text-[#8494AD] [html.light_&]:text-[#64748B] mb-6 font-medium">
                  Final pricing depends on project requirements.
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-[#C5CEDD] [html.light_&]:text-[#40484C] mb-8">
                  <li className="flex items-center gap-2.5">
                    <Check size={16} className="text-[#2F7DE1] shrink-0" />
                    <span>Responsive mobile, tablet & desktop layout</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check size={16} className="text-[#2F7DE1] shrink-0" />
                    <span>Essential business pages (Home, About, Services, Contact)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check size={16} className="text-[#2F7DE1] shrink-0" />
                    <span>WhatsApp quick-chat & interactive contact form</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check size={16} className="text-[#2F7DE1] shrink-0" />
                    <span>SEO-friendly HTML structure & Google Maps embed</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check size={16} className="text-[#2F7DE1] shrink-0" />
                    <span>Complete deployment assistance on your hosting</span>
                  </li>
                </ul>
              </div>

              <div>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center py-3.5 text-sm font-bold text-[#0B1220] [html.light_&]:text-white bg-[#F87000] hover:bg-[#FF8A24] rounded-full shadow-lg shadow-orange-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Start Your Project
                </Link>
              </div>
            </div>

            {/* 2. Custom Website & Web Application */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#16223A] [html.light_&]:bg-white border-2 border-[#2F7DE1]/50 flex flex-col justify-between shadow-2xl relative">
              <div className="absolute -top-3 right-8 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#2F7DE1] text-white">
                Full-Stack Architecture
              </div>

              <div>
                <span className="text-xs font-bold text-[#2F7DE1] uppercase tracking-wider block mb-2">
                  Database & Application Logic
                </span>
                <h2 className="text-2xl font-bold text-white [html.light_&]:text-[#0A2540] mb-2">
                  Custom Website & Web Application
                </h2>
                
                <div className="my-6 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white [html.light_&]:text-[#0A2540]">
                    ₹9,999
                  </span>
                  <span className="text-xs text-[#8494AD] [html.light_&]:text-[#64748B] uppercase font-mono">
                    Starting from
                  </span>
                </div>

                <p className="text-sm text-[#C5CEDD] [html.light_&]:text-[#40484C] mb-6 leading-relaxed">
                  For custom websites and web applications requiring frontend, backend, database and custom functionality.
                </p>

                <div className="p-3 rounded-lg bg-white/[0.03] [html.light_&]:bg-slate-50 border border-[#26344F] [html.light_&]:border-slate-200 text-xs text-[#8494AD] [html.light_&]:text-[#64748B] mb-6 font-medium">
                  Final pricing depends on project requirements.
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-[#C5CEDD] [html.light_&]:text-[#40484C] mb-8">
                  <li className="flex items-center gap-2.5">
                    <Check size={16} className="text-[#2F7DE1] shrink-0" />
                    <span>Custom Next.js/React frontend with dynamic components</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check size={16} className="text-[#2F7DE1] shrink-0" />
                    <span>Node.js / Express backend with modular REST APIs</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check size={16} className="text-[#2F7DE1] shrink-0" />
                    <span>MySQL / MongoDB relational database modeling</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check size={16} className="text-[#2F7DE1] shrink-0" />
                    <span>Authentication, role-based access & admin dashboards</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check size={16} className="text-[#2F7DE1] shrink-0" />
                    <span>API integrations, payment handling & VPS configuration</span>
                  </li>
                </ul>
              </div>

              <div>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center py-3.5 text-sm font-bold text-[#0B1220] [html.light_&]:text-white bg-[#F87000] hover:bg-[#FF8A24] rounded-full shadow-lg shadow-orange-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Discuss Your Project
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ALL OTHER SERVICES: REQUEST A CUSTOM QUOTE */}
      <section className="py-20 bg-[#101A2E] [html.light_&]:bg-[#F4F7FB] border-b border-[#26344F]/60 [html.light_&]:border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Complex Software & Specialized Systems"
            title="Custom Software & Enterprise Solutions"
            subtitle="To guarantee realistic quotes, specialized systems are scoped individually based on your business logic, integrations, and user roles."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "E-Commerce Platforms & Marketplaces",
                desc: "Online stores, multi-vendor catalogs, delivery fleet routing, kitchen dashboards, and real-time Socket.io orders (like Ruchi Bazzar).",
                action: "Request a Custom Quote",
              },
              {
                title: "ERP & Operations Software",
                desc: "Inventory management across warehouses, CRM ledgers, staff attendance, automated GST invoicing, and financial reporting.",
                action: "Request a Custom Quote",
              },
              {
                title: "School Management Software",
                desc: "Four dedicated portals for Super Admins, Teachers, Students, and Parents with fee installment tracking and attendance percentage calculations.",
                action: "Request a Custom Quote",
              },
              {
                title: "Backend & API Engineering",
                desc: "High-performance Node.js APIs, database optimization, authentication engines, and third-party webhook integrations.",
                action: "Request a Custom Quote",
              },
            ].map((sol) => (
              <div
                key={sol.title}
                className="p-7 rounded-2xl bg-[#16223A] [html.light_&]:bg-white border border-[#26344F] [html.light_&]:border-slate-200 flex flex-col justify-between shadow-lg hover:border-[#2F7DE1]/40 transition"
              >
                <div>
                  <h3 className="text-lg font-bold text-white [html.light_&]:text-[#0A2540] mb-2">{sol.title}</h3>
                  <p className="text-xs sm:text-sm text-[#8494AD] [html.light_&]:text-[#64748B] leading-relaxed mb-6">{sol.desc}</p>
                </div>
                <div className="pt-4 border-t border-[#26344F]/60 [html.light_&]:border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#8494AD] [html.light_&]:text-[#64748B]">Custom Scope</span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F87000] hover:text-[#FF8A24] transition-colors"
                  >
                    <span>{sol.action}</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE & THIRD PARTY TRANSPARENCY */}
      <section className="py-16 bg-[#0B1220] [html.light_&]:bg-white border-b border-[#26344F]/60 [html.light_&]:border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-2xl bg-[#16223A] [html.light_&]:bg-[#F4F7FB] border border-[#26344F] [html.light_&]:border-slate-200 space-y-4 shadow-lg">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertCircle size={20} />
              <h3 className="text-base font-bold text-white [html.light_&]:text-[#0A2540]">
                Domain, Hosting & Third-Party Infrastructure Services
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#C5CEDD] [html.light_&]:text-[#40484C] leading-relaxed">
              We operate on 100% transparency. Domain registration (e.g. from Namecheap, Cloudflare, or GoDaddy), hosting servers/VPS (e.g. Hostinger, DigitalOcean, or AWS), and third-party messaging/payment APIs (e.g. SMS OTP packs, payment gateway transaction charges) are infrastructure services billed separately by the respective service providers.
            </p>
            <p className="text-xs sm:text-sm text-[#8494AD] [html.light_&]:text-[#64748B] leading-relaxed">
              We help you configure all accounts directly in your own name so you retain full, permanent ownership without proprietary agency lock-in.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL PRICING CTA */}
      <section className="py-16 bg-[#101A2E] [html.light_&]:bg-[#F4F7FB] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
            Need Something Custom? Get a Quote
          </h2>
          <p className="text-sm text-[#8494AD] [html.light_&]:text-[#64748B]">
            Tell us about your project specifications. We will review your requirements and provide an accurate, transparent milestone quote.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-[#0B1220] [html.light_&]:text-white bg-[#F87000] hover:bg-[#FF8A24] rounded-full shadow-lg shadow-orange-500/25 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <span>Request a Custom Quote</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
