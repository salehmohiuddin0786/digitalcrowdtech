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

function isLogoImage(url) {
  if (!url || typeof url !== "string") return false;
  const clean = url.toLowerCase();
  return (
    clean.includes("logo") ||
    clean.includes("brand") ||
    clean.includes("icon") ||
    clean.includes("monogram") ||
    clean.includes("ruchi-logo") ||
    clean.endsWith("/logo.png")
  );
}

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
    <div className="flex flex-col">
      {/* 1. HERO */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-[#26344F]/60 [html.light_&]:border-slate-200">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#2F7DE1]/15 to-[#F87000]/10 blur-[130px] pointer-events-none -z-10 rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6 backdrop-blur-md">
            <Package size={14} className="text-[#F87000]" />
            <span>Turnkey Web Applications &amp; Digital Products</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white [html.light_&]:text-[#0A2540] tracking-tight leading-tight">
            Ready-to-Deploy <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F7DE1] to-[#F87000]">
              Digital Web Products
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
            Stop building from scratch or paying recurring monthly SaaS commissions. We engineer complete, verified digital platforms with customer storefronts, admin suites, and dedicated databases you 100% own.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-xs text-slate-300 [html.light_&]:text-slate-700">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-card-premium font-medium">
              <CheckCircle2 size={13} className="text-emerald-400" />
              100% Full Source Code Ownership
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-card-premium font-medium">
              <CheckCircle2 size={13} className="text-blue-400" />
              Live Interactive Storefront Demos
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-card-premium font-medium">
              <CheckCircle2 size={13} className="text-[#F87000]" />
              Transparent Starting Pricing
            </span>
          </div>
        </div>
      </section>

      {/* 2. PRODUCTS SHOWCASE */}
      <section className="py-16 md:py-24 bg-transparent border-b border-white/5 [html.light_&]:border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <SectionHeading
            badge="Verified Deliverables"
            title="Software Products"
            subtitle="Click 'Live Storefront Demo' to test running applications, explore order states, or request customized deployment."
          />

          <div className="space-y-8">
            {productList.map((product, idx) => {
              const isExternal = product.liveUrl && product.liveUrl.startsWith("http");

              return (
                <div
                  key={product.id || idx}
                  className="rounded-3xl glass-card-premium p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left Thumbnail Media Box */}
                    <div className="lg:col-span-4 relative rounded-2xl bg-[#070D18] border border-white/10 [html.light_&]:border-slate-200 overflow-hidden min-h-[220px] aspect-[4/3] flex items-center justify-center">
                      <span className="absolute top-3 left-3 z-20 text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 backdrop-blur-md">
                        Turnkey Product
                      </span>

                      {product.imageUrl ? (
                        isLogoImage(product.imageUrl) ? (
                          <>
                            {/* Ambient blurred backdrop that 100% covers the container */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={product.imageUrl}
                              alt=""
                              aria-hidden="true"
                              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 filter pointer-events-none"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#0B1220]/90 pointer-events-none" />
                            <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={product.imageUrl}
                                alt={product.title}
                                className="max-h-[75%] max-w-[85%] w-auto h-auto object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Full-bleed photo */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={product.imageUrl}
                              alt={product.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-black/30 to-transparent pointer-events-none" />
                          </>
                        )
                      ) : (
                        <div className="flex flex-col items-center justify-center p-6 text-center">
                          <div className="w-16 h-16 rounded-2xl bg-[#16223A] [html.light_&]:bg-white flex items-center justify-center text-[#2F7DE1] shadow-lg mb-3 border border-[#26344F] [html.light_&]:border-slate-200 group-hover:scale-105 transition-transform">
                            <ShoppingBag size={32} className="text-[#2F7DE1]" />
                          </div>
                          <span className="text-xs font-bold text-white [html.light_&]:text-[#0A2540]">
                            {product.category}
                          </span>
                        </div>
                      )}

                      {product.liveUrl && (
                        <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between text-[11px] font-semibold text-emerald-300 bg-black/60 backdrop-blur-md border border-emerald-500/30 px-2.5 py-1 rounded-md">
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Live Demo
                          </span>
                          <ExternalLink size={11} />
                        </div>
                      )}
                    </div>

                    {/* Right Product Details */}
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
                          {product.title}
                        </h2>
                        {product.label && (
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                            {product.label}
                          </span>
                        )}
                      </div>

                      {/* Pricing Row */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-2xl sm:text-3xl font-extrabold text-[#F87000]">
                          {product.price || "Starting from ₹14,999"}
                        </span>
                        <span className="text-xs text-slate-400 [html.light_&]:text-slate-500">
                          Production-grade architecture
                        </span>
                      </div>

                      <p className="text-sm text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                        {product.description || product.summary}
                      </p>

                      {/* Capabilities */}
                      {product.features && product.features.length > 0 && (
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#2F7DE1] block mb-2">
                            Core Modules &amp; Capabilities:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 [html.light_&]:text-slate-600">
                            {product.features.slice(0, 6).map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-2">
                                <CheckCircle2 size={14} className="text-blue-400 shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Links */}
                      <div className="pt-3 flex flex-wrap items-center gap-3">
                        {product.liveUrl && (
                          <a
                            href={product.liveUrl}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md transition"
                          >
                            <span>Live Storefront Demo</span>
                            <ExternalLink size={14} />
                          </a>
                        )}

                        <Link
                          href={`/contact?service=${encodeURIComponent(product.title)}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-[#0B1220] [html.light_&]:text-white bg-[#F87000] hover:bg-[#FF8A24] rounded-xl shadow-lg shadow-orange-500/20 transition"
                        >
                          <span>Request Deployment</span>
                          <ArrowRight size={14} />
                        </Link>

                        {product.caseStudyUrl && (
                          <Link
                            href={product.caseStudyUrl}
                            className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 ml-auto"
                          >
                            <span>Architecture Details</span>
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
      <section className="py-16 md:py-24 bg-transparent border-b border-white/5 [html.light_&]:border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Engineering Integrity"
            title="Why Our Platforms?"
            subtitle="Clear advantages over generic templates and recurring SaaS aggregators."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl glass-card-premium shadow-md space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-base font-bold text-white [html.light_&]:text-[#0A2540]">Zero Aggregator Commissions</h3>
              <p className="text-xs sm:text-sm text-slate-400 [html.light_&]:text-slate-600 leading-relaxed">
                Take complete ownership of your margins. Stop giving 25-30% of each order to delivery and marketplace aggregators.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card-premium shadow-md space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                <Database size={20} />
              </div>
              <h3 className="text-base font-bold text-white [html.light_&]:text-[#0A2540]">Dedicated Relational DB</h3>
              <p className="text-xs sm:text-sm text-slate-400 [html.light_&]:text-slate-600 leading-relaxed">
                Your database runs on an isolated MySQL schema. You retain 100% control over customer records, transaction histories, and private business data.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card-premium shadow-md space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-[#2F7DE1] flex items-center justify-center font-bold">
                <Sparkles size={20} />
              </div>
              <h3 className="text-base font-bold text-white [html.light_&]:text-[#0A2540]">Customizable Architecture</h3>
              <p className="text-xs sm:text-sm text-slate-400 [html.light_&]:text-slate-600 leading-relaxed">
                Need custom tax rules, regional delivery zones, specific ERP integrations, or WhatsApp alerts? We modify the codebase to match your exact business model.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="py-20 bg-transparent text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl glass-card-premium shadow-2xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
              Ready to Launch Your Platform?
            </h2>
            <p className="text-sm text-slate-300 [html.light_&]:text-slate-600 max-w-xl mx-auto">
              Schedule a technical consultation or request a live guided walkthrough of our food delivery, school ERP, or e-commerce suites.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-[#0B1220] [html.light_&]:text-white bg-[#F87000] hover:bg-[#FF8A24] rounded-full shadow-lg shadow-orange-500/20 transition"
              >
                <span>Speak with Our Team</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
