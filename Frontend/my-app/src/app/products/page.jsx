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
  Cpu,
  Code2,
  DollarSign,
  HelpCircle,
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
    <div className="flex flex-col bg-transparent">
      {/* HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-white/10 [html.light_&]:border-slate-200">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-emerald-500/20 to-[#0050B0]/20 blur-[130px] pointer-events-none -z-10 rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-6 backdrop-blur-md">
            <Package size={13} />
            <span>Turnkey Web Applications &amp; Digital Products</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white [html.light_&]:text-[#0A2540] tracking-tight leading-tight">
            Ready-to-Deploy <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#2F7DE1] to-[#F87000]">
              Digital Web Products
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
            Stop building from scratch or paying recurring SaaS subscription penalties. We engineer complete, verified digital platforms with live websites, customer storefronts, admin suites, and dedicated databases you 100% own.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300 [html.light_&]:text-slate-600">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <CheckCircle2 size={13} className="text-emerald-400" />
              100% Full Source Code Ownership
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <CheckCircle2 size={13} className="text-blue-400" />
              Live Interactive Website Demos
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <CheckCircle2 size={13} className="text-orange-400" />
              Transparent Starting Pricing
            </span>
          </div>
        </div>
      </section>

      {/* PRODUCTS SHOWCASE */}
      <section className="py-20 bg-transparent border-b border-white/10 [html.light_&]:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeading
            badge="Flagship Platforms"
            title="Featured Software Products"
            subtitle="Click 'Go to Website' on any product to test the live running application, explore real workflows, or request customized deployment."
          />

          <div className="space-y-16">
            {productList.map((product, idx) => {
              const isExternal = product.liveUrl && product.liveUrl.startsWith("http");

              return (
                <div
                  key={product.id || idx}
                  className="rounded-3xl glass-card-premium p-6 sm:p-8 lg:p-12 shadow-2xl relative overflow-hidden transition-all duration-300 border border-white/10 hover:border-emerald-500/30"
                >
                  {/* Ambient accent badge */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl pointer-events-none -z-10 rounded-full" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    
                    {/* Left Column: Product Information */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 [html.light_&]:bg-emerald-50 [html.light_&]:text-emerald-700">
                          {product.category}
                        </span>

                        {product.label && (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 border border-orange-500/25 text-[#F87000] [html.light_&]:bg-orange-50 [html.light_&]:text-orange-700">
                            {product.label}
                          </span>
                        )}

                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 [html.light_&]:text-emerald-700 bg-emerald-500/10 [html.light_&]:bg-emerald-50 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Live Website
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white [html.light_&]:text-[#0A2540] tracking-tight">
                        {product.title}
                      </h2>

                      <p className="text-sm sm:text-base text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                        {product.description || product.summary}
                      </p>

                      {/* Key Capabilities */}
                      {product.features && product.features.length > 0 && (
                        <div>
                          <span className="text-xs font-semibold text-slate-400 [html.light_&]:text-slate-500 uppercase tracking-wider block mb-3">
                            Verified Capabilities &amp; Modules:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300 [html.light_&]:text-slate-600">
                            {product.features.slice(0, 6).map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-2">
                                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech Stack */}
                      {product.technologies && product.technologies.length > 0 && (
                        <div>
                          <span className="text-xs font-semibold text-slate-400 [html.light_&]:text-slate-500 uppercase tracking-wider block mb-2">
                            Underlying Technology Stack:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {product.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/5 [html.light_&]:bg-slate-100 text-slate-300 [html.light_&]:text-slate-700 border border-white/10 [html.light_&]:border-slate-200"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Pricing Tag */}
                      <div className="p-4 rounded-2xl bg-emerald-500/10 [html.light_&]:bg-emerald-50 border border-emerald-500/20 [html.light_&]:border-emerald-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="font-bold text-emerald-400 [html.light_&]:text-emerald-700 block text-xs uppercase tracking-wider">
                            Transparent Deployment Pricing
                          </span>
                          <span className="text-[11px] text-slate-400 [html.light_&]:text-slate-600">
                            Includes complete source code, branding adjustments, and server deployment.
                          </span>
                        </div>
                        <span className="font-mono font-bold text-lg text-white [html.light_&]:text-slate-900 shrink-0">
                          {product.price || "Starting from ₹9,999"}
                        </span>
                      </div>

                      {/* Action Links */}
                      <div className="pt-2 flex flex-wrap items-center gap-4">
                        {/* Go to Website Button */}
                        {product.liveUrl && (
                          <a
                            href={product.liveUrl}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl shadow-lg shadow-emerald-900/30 transition-all transform hover:-translate-y-0.5 group"
                          >
                            <span>Go to Website</span>
                            <ExternalLink size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        )}

                        {/* Request Demo / Inquiry Button */}
                        <Link
                          href={`/contact?service=${encodeURIComponent(product.title)}`}
                          className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition"
                        >
                          <span>Request Custom Demo</span>
                          <ArrowRight size={15} />
                        </Link>

                        {/* Case Study Link if available */}
                        {product.caseStudyUrl && (
                          <Link
                            href={product.caseStudyUrl}
                            className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 transition"
                          >
                            <span>Read Architecture Breakdown</span>
                            <ArrowRight size={12} />
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Architectural Highlights Card */}
                    <div className="lg:col-span-5 w-full">
                      <div className="rounded-2xl glass-card-premium p-6 sm:p-8 space-y-5 border border-white/10">
                        <div className="flex items-center justify-between pb-3 border-b border-white/10 [html.light_&]:border-slate-200 text-xs">
                          <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                            <Zap size={14} />
                            <span>Product Deployment Specs</span>
                          </span>
                          <span className="text-[11px] font-semibold text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                            100% In-House
                          </span>
                        </div>

                        <div className="space-y-3.5 text-xs">
                          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                            <span className="font-semibold text-white [html.light_&]:text-slate-800 block mb-1">
                              Ready-to-Deploy Frontend
                            </span>
                            <span className="text-[11px] text-slate-400 [html.light_&]:text-slate-600">
                              Modern React 19 / Next.js with mobile-first responsive layout, dark/light theme tokens, and sub-second loading speeds.
                            </span>
                          </div>

                          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                            <span className="font-semibold text-white [html.light_&]:text-slate-800 block mb-1">
                              Node.js &amp; MySQL Enterprise Core
                            </span>
                            <span className="text-[11px] text-slate-400 [html.light_&]:text-slate-600">
                              REST APIs, parameterized database queries, JWT authentication, bcrypt encryption, and rate-limiting protections.
                            </span>
                          </div>

                          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                            <span className="font-semibold text-white [html.light_&]:text-slate-800 block mb-1">
                              Multi-Role Stakeholder Workflows
                            </span>
                            <span className="text-[11px] text-slate-400 [html.light_&]:text-slate-600">
                              Engineered for customers, staff, administrators, and field operators with role-based permission boundaries.
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-white/10 [html.light_&]:border-slate-200">
                          <span>Complete Database Schema &amp; Seeders</span>
                          <span className="text-emerald-400 font-mono font-semibold">Included</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE OUR PRODUCTS */}
      <section className="py-20 bg-transparent border-b border-white/10 [html.light_&]:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Engineering Integrity"
            title="Why Choose Our Digital Web Products?"
            subtitle="Clear architectural differences between our custom products and generic template providers."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl glass-card-premium space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-white [html.light_&]:text-[#0A2540]">
                Zero Recurring Subscription Fees
              </h3>
              <p className="text-sm text-slate-400 [html.light_&]:text-slate-600 leading-relaxed">
                Most platforms charge monthly subscription fees that escalate as your business grows. With Digital Crowd Technologies, you buy the product once, own the complete code, and host it wherever you prefer.
              </p>
            </div>

            <div className="p-8 rounded-3xl glass-card-premium space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Code2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-white [html.light_&]:text-[#0A2540]">
                Customizable to Your Exact Needs
              </h3>
              <p className="text-sm text-slate-400 [html.light_&]:text-slate-600 leading-relaxed">
                Unlike closed-source SaaS tools where you cannot change a single button, our software is 100% modular. We tailor workflows, add custom payment options, and integrate with your existing tools seamlessly.
              </p>
            </div>

            <div className="p-8 rounded-3xl glass-card-premium space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-[#F87000] flex items-center justify-center">
                <Server size={24} />
              </div>
              <h3 className="text-xl font-bold text-white [html.light_&]:text-[#0A2540]">
                Full Deployment &amp; Domain Setup
              </h3>
              <p className="text-sm text-slate-400 [html.light_&]:text-slate-600 leading-relaxed">
                We handle the technical heavy lifting: configuring your custom domain, setting up SSL certificates, seeding MySQL databases, and configuring instant email/WhatsApp notification pipelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="py-20 bg-transparent border-b border-white/10 [html.light_&]:border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            badge="Frequently Asked Questions"
            title="Common Questions About Our Products"
            subtitle="Transparent answers regarding delivery timelines, customizations, and code ownership."
          />

          <div className="space-y-4">
            <div className="p-6 rounded-2xl glass-card-premium space-y-2">
              <h4 className="text-base font-bold text-white [html.light_&]:text-[#0A2540]">
                How quickly can a digital product be deployed for my business?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 [html.light_&]:text-slate-600 leading-relaxed">
                Standard deployments with your company name, logo, domain, and colors are typically ready within 3 to 7 business days. Custom integrations (like specialized payment gateways or third-party APIs) take 1 to 2 weeks.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card-premium space-y-2">
              <h4 className="text-base font-bold text-white [html.light_&]:text-[#0A2540]">
                Do I receive the full source code and database?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 [html.light_&]:text-slate-600 leading-relaxed">
                Yes. Upon final delivery and sign-off, you receive full source code repository access and full MySQL database credentials. You are never locked into our servers.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card-premium space-y-2">
              <h4 className="text-base font-bold text-white [html.light_&]:text-[#0A2540]">
                Can you add custom features specific to my company?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 [html.light_&]:text-slate-600 leading-relaxed">
                Absolutely. Because our team wrote every line of frontend and backend code in-house, we can easily add new modules, payment gateways, custom reports, or role permissions to fit your unique operational workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-transparent text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl glass-card-premium shadow-2xl space-y-5 border border-white/10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
              Need a Tailored Product or Live Walkthrough?
            </h2>
            <p className="text-sm text-slate-300 [html.light_&]:text-slate-600 max-w-xl mx-auto">
              Our Hyderabad engineering team is ready to demonstrate live systems and consult on your platform requirements.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-full shadow-lg shadow-blue-600/30 transition transform hover:-translate-y-0.5"
              >
                <span>Book a Product Walkthrough</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition"
              >
                <span>View Client Case Studies</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
