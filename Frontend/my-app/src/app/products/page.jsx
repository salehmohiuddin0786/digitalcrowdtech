import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Package,
  Layers,
  Database,
  Server,
  Globe,
  Sparkles,
  ShieldCheck,
  Zap,
  Check,
  ShoppingBag,
  Code2,
} from "lucide-react";
import SectionHeading from "../Component/SectionHeading";
import { PRODUCTS } from "../data/products";

export const metadata = {
  title: "Turnkey Digital Products & SaaS Web Applications | Digital Crowd Technologies",
  description:
    "Explore ready-to-deploy digital products built by Digital Crowd Technologies: Food Delivery & Grocery Ecosystem (Ruchi Bazzar), School Management ERP, Retail E-Commerce, and Agency Platforms with live website demos.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/products",
  },
};

async function getProductsData() {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
    const res = await fetch(`${apiBase}/api/products`, { next: { revalidate: 30 } });
    if (res.ok) {
      const data = await res.json();
      if (data.ok && Array.isArray(data.items) && data.items.length > 0) {
        return data.items.map((p) => ({
          ...p,
          technologies: typeof p.technologies === "string" ? JSON.parse(p.technologies || "[]") : (p.technologies || []),
          features: typeof p.features === "string" ? JSON.parse(p.features || "[]") : (p.features || []),
        }));
      }
    }
  } catch (err) {
    // Graceful fallback to static PRODUCTS
  }
  return PRODUCTS;
}

export default async function ProductsPage() {
  const productList = await getProductsData();

  return (
    <div className="flex flex-col bg-slate-50/50 [html.dark_&]:bg-transparent">
      {/* 1. HERO */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-200 [html.dark_&]:border-[#22344D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-[#567785]/10 text-[#567785] [html.dark_&]:text-[#8EAEBD] border border-[#567785]/30 mb-4">
            <Package size={14} className="text-[#E89228]" />
            <span>Turnkey Web Applications &amp; Digital Products</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E293B] [html.dark_&]:text-white tracking-tight leading-tight">
            Ready-to-Deploy <br />
            <span className="text-[#E89228]">
              Digital Web Products
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 [html.dark_&]:text-slate-300 leading-relaxed">
            Stop building from scratch or paying recurring monthly SaaS commissions. We engineer complete, verified digital platforms with customer storefronts, admin suites, and dedicated databases you 100% own.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-xs text-slate-600 [html.dark_&]:text-slate-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-slate-700 shadow-xs font-semibold">
              <CheckCircle2 size={13} className="text-[#27AE60]" />
              100% Full Source Code Ownership
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-slate-700 shadow-xs font-semibold">
              <CheckCircle2 size={13} className="text-[#567785]" />
              Live Interactive Storefront Demos
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-slate-700 shadow-xs font-semibold">
              <CheckCircle2 size={13} className="text-[#E89228]" />
              Transparent Starting Pricing
            </span>
          </div>
        </div>
      </section>

      {/* 2. PRODUCTS SHOWCASE (Screenshot 4 Reference) */}
      <section className="py-14 md:py-20 bg-transparent border-b border-slate-200 [html.dark_&]:border-[#22344D]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <SectionHeading
            badge="Flagship Platforms"
            title="FEATURED SOFTWARE PRODUCTS"
            subtitle="Click 'View Live Storefront Demo' to test running applications, explore order states, or request customized deployment."
          />

          <div className="space-y-6">
            {productList.map((product, idx) => {
              const isExternal = product.liveUrl && product.liveUrl.startsWith("http");

              return (
                <div
                  key={product.id || idx}
                  className="bg-white [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-[#26364A] rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left Thumbnail Box with Badge matching Screenshot 4 */}
                    <div className="lg:col-span-4 relative rounded-xl bg-slate-100 [html.dark_&]:bg-[#182638] p-6 flex flex-col items-center justify-center text-center border border-slate-200 [html.dark_&]:border-slate-700 overflow-hidden min-h-[200px]">
                      <span className="absolute top-2.5 left-2.5 badge-discount">
                        Turnkey SaaS
                      </span>
                      <div className="w-16 h-16 rounded-2xl bg-white [html.dark_&]:bg-[#152234] flex items-center justify-center text-[#567785] shadow-sm mb-3 border border-slate-200 [html.dark_&]:border-slate-700">
                        <ShoppingBag size={32} className="text-[#567785]" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider text-slate-800 [html.dark_&]:text-slate-200">
                        {product.category}
                      </span>
                      {product.liveUrl && (
                        <span className="mt-2 text-[11px] text-[#27AE60] font-bold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#27AE60] animate-ping" />
                          Live Running Demo
                        </span>
                      )}
                    </div>

                    {/* Right Product Details */}
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h2 className="text-xl sm:text-2xl font-black uppercase text-[#1E293B] [html.dark_&]:text-white">
                          {product.title}
                        </h2>
                        {product.label && (
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#567785]/10 text-[#567785] [html.dark_&]:text-[#8EAEBD] border border-[#567785]/30">
                            {product.label}
                          </span>
                        )}
                      </div>

                      {/* Pricing Row: Price, Strikethrough, Green Savings Badge */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-2xl sm:text-3xl font-black text-[#1E293B] [html.dark_&]:text-white">
                          {product.price || "Starting from ₹14,999"}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ₹35,000 Market Avg
                        </span>
                        <span className="badge-savings">
                          <CheckCircle2 size={13} />
                          Save ₹15,000+
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 [html.dark_&]:text-slate-300 leading-relaxed">
                        {product.description || product.summary}
                      </p>

                      {/* Capabilities */}
                      {product.features && product.features.length > 0 && (
                        <div>
                          <span className="text-xs font-extrabold uppercase tracking-wider text-[#567785] [html.dark_&]:text-[#8EAEBD] block mb-2">
                            Core Workflows &amp; Modules:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 [html.dark_&]:text-slate-300">
                            {product.features.slice(0, 6).map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-2">
                                <Check size={14} className="text-[#27AE60] shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Links with Peach button matching Screenshot 4 */}
                      <div className="pt-3 flex flex-wrap items-center gap-3">
                        {product.liveUrl && (
                          <a
                            href={product.liveUrl}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            className="btn-peach text-xs font-bold"
                          >
                            <span>Go to Live Storefront</span>
                            <ExternalLink size={13} className="ml-1.5" />
                          </a>
                        )}

                        <Link
                          href={`/contact?service=${encodeURIComponent(product.title)}`}
                          className="btn-brand-orange text-xs font-bold"
                        >
                          <span>Request Deployment</span>
                          <ArrowRight size={13} className="ml-1.5" />
                        </Link>

                        {product.caseStudyUrl && (
                          <Link
                            href={product.caseStudyUrl}
                            className="text-xs font-bold text-[#567785] hover:text-[#415C68] inline-flex items-center gap-1 ml-auto"
                          >
                            <span>Read Architecture Breakdown</span>
                            <ArrowRight size={12} />
                          </Link>
                        )}
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE OUR PRODUCTS */}
      <section className="py-14 md:py-20 bg-white [html.dark_&]:bg-[#0D1520] border-b border-slate-200 [html.dark_&]:border-[#22344D]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Engineering Integrity"
            title="WHY OUR TURNKEY PLATFORMS?"
            subtitle="Clear advantages over generic templates and recurring SaaS aggregators."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-[#26364A] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#27AE60]/10 text-[#27AE60] flex items-center justify-center font-bold">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-base font-extrabold text-[#1E293B] [html.dark_&]:text-white">
                Zero Monthly Commissions
              </h3>
              <p className="text-xs text-slate-600 [html.dark_&]:text-slate-400 leading-relaxed">
                Platforms like Zomato/Swiggy or Shopify take 20–30% of your revenue. With Digital Crowd Tech turnkey systems, you keep 100% of customer orders and direct UPI payments.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-[#26364A] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#567785]/10 text-[#567785] flex items-center justify-center font-bold">
                <Code2 size={20} />
              </div>
              <h3 className="text-base font-extrabold text-[#1E293B] [html.dark_&]:text-white">
                100% Source Code Handover
              </h3>
              <p className="text-xs text-slate-600 [html.dark_&]:text-slate-400 leading-relaxed">
                You receive full GitHub repository access, Express server code, and normalized MySQL migration scripts. You can host anywhere without lock-in.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-[#26364A] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E89228]/10 text-[#E89228] flex items-center justify-center font-bold">
                <Server size={20} />
              </div>
              <h3 className="text-base font-extrabold text-[#1E293B] [html.dark_&]:text-white">
                Turnkey Deployment Assistance
              </h3>
              <p className="text-xs text-slate-600 [html.dark_&]:text-slate-400 leading-relaxed">
                We handle the technical setup: domain propagation, Ubuntu server provisioning, SSL certification, and database initialization on your own cloud.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="py-14 md:py-20 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-[#26364A] rounded-2xl p-8 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-[#1E293B] [html.dark_&]:text-white">
              Need a Custom Product Walkthrough?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 [html.dark_&]:text-slate-400">
              Our engineering team is available for live demonstrations and requirements planning.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="btn-brand-orange text-xs font-bold"
              >
                <span>Schedule Live Demonstration</span>
                <ArrowRight size={13} className="ml-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
