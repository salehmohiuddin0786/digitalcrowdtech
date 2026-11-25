"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Package,
  Layers,
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Zap,
  Building,
  Check,
  Code2,
  AlertCircle,
  HelpCircle,
  Target,
  TrendingUp,
  Award,
} from "lucide-react";

export default function ProductDetailClient({ product, allProducts = [] }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const carouselRef = useRef(null);

  const screenshots = Array.isArray(product.screenshots) && product.screenshots.length > 0
    ? product.screenshots
    : [
        {
          title: `${product.title} - Main Dashboard`,
          description: "High-resolution real-time monitoring and administrative dashboard interface.",
          url: product.imageUrl || `/products/${product.slug}-preview.png`,
          tag: "Dashboard",
        },
        {
          title: `${product.title} - Operational View`,
          description: "Streamlined operational workflows engineered for daily business productivity.",
          url: `/products/${product.slug}-storefront.png`,
          tag: "Operations",
        },
        {
          title: `${product.title} - Administrative Control`,
          description: "Role-based access control, configuration settings, and database management.",
          url: `/products/${product.slug}-admin.png`,
          tag: "Admin Suite",
        },
        {
          title: `${product.title} - Analytics & Reports`,
          description: "Actionable financial analytics, transactional logs, and exportable data reports.",
          url: `/products/${product.slug}-analytics.png`,
          tag: "Analytics",
        },
      ];

  const pricingPlans = Array.isArray(product.pricingPlans) && product.pricingPlans.length > 0
    ? product.pricingPlans
    : [
        {
          name: "Starter Solution",
          price: product.price || "₹9,999",
          numericPrice: 9999,
          description: "Core platform package designed for independent businesses and single-branch setups.",
          features: [
            "Complete Customer Web Platform",
            "Core Administrative Control Panel",
            "MySQL Database Schema & Setup",
            "Integrated PhonePe & UPI Payment Readiness",
            "Standard Security & SSL Hardening",
            "100% Full Source Code Ownership",
          ],
        },
        {
          name: "Business Growth",
          price: "₹18,999",
          numericPrice: 18999,
          popular: true,
          description: "Enhanced capabilities for expanding enterprises needing automated workflows.",
          features: [
            "Everything in Starter Solution",
            "Automated Email & WhatsApp Notifications",
            "Multi-Role Staff Access (RBAC)",
            "Automated Invoicing & Financial Reports",
            "Custom Domain & Cloud VPS Setup Assistance",
            "6 Months Priority Maintenance & Support",
          ],
        },
        {
          name: "Enterprise Custom",
          price: "₹34,999",
          numericPrice: 34999,
          description: "Complete full-stack architecture customized to specific operational requirements.",
          features: [
            "Everything in Business Growth",
            "Dedicated Mobile PWA / Hybrid App Setup",
            "Custom 3rd-Party API & ERP Integrations",
            "High-Throughput Performance Tuning",
            "Database Replication & Automated Daily Backups",
            "1 Year Full SLA Technical Support",
          ],
        },
      ];

  const defaultWhyChoose = [
    "Customized Solutions: Solutions developed according to your business requirements instead of generic template software.",
    "Modern Scalable Stack: Built with modern technologies (Next.js, React, Node.js, MySQL) for long-term reliability.",
    "100% Full Code Ownership: You own 100% of the full source code and database with zero recurring vendor lock-in.",
    "User-Friendly Experience: Intuitive interfaces, smooth navigation, and responsive experiences across all devices.",
    "Reliable Support: Direct assistance with deployment, troubleshooting, maintenance, and technical training.",
    "Business-Focused Approach: Technology engineered to improve operational productivity and accelerate client trust.",
  ];

  const overview = product.overview || {};

  const whoCanUseList =
    Array.isArray(overview.whoCanUse) && overview.whoCanUse.length > 0
      ? overview.whoCanUse
      : typeof overview.whoCanUse === "string" && overview.whoCanUse.trim()
      ? [overview.whoCanUse]
      : ["Growing Businesses", "Retailers & Service Providers", "Corporate Teams", "Digital Enterprises"];

  const problemsSolvedList =
    Array.isArray(overview.problemsSolved) && overview.problemsSolved.length > 0
      ? overview.problemsSolved
      : typeof overview.problemsSolved === "string" && overview.problemsSolved.trim()
      ? [overview.problemsSolved]
      : [
          "Eliminates recurring monthly subscription charges from external aggregators.",
          "Solves inventory, operational, and customer communication bottlenecks.",
          "Prevents vendor lock-in by providing 100% source code ownership.",
        ];

  const businessBenefitsList =
    Array.isArray(overview.businessBenefits) && overview.businessBenefits.length > 0
      ? overview.businessBenefits
      : typeof overview.businessBenefits === "string" && overview.businessBenefits.trim()
      ? [overview.businessBenefits]
      : [
          "Immediate reduction in operating overheads with direct customer transactions.",
          "Faster turnaround time with instant order verification and payment status.",
          "Reliable 99.9% availability hosted on your own server or cloud infrastructure.",
        ];

  const whyChooseCustomHighlight =
    typeof overview.whyChoose === "string" && overview.whyChoose.trim()
      ? overview.whyChoose.trim()
      : null;

  const whyChooseList =
    Array.isArray(overview.whyChoose) && overview.whyChoose.length > 0
      ? overview.whyChoose
      : defaultWhyChoose;

  // Other products for related carousel (exclude current)
  const relatedProducts = allProducts.filter(
    (p) => p.slug !== product.slug && p.id !== product.id
  );

  // Keyboard navigation for lightbox
  useEffect(() => {
    function handleKeyDown(e) {
      if (!selectedImage) return;
      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, activeGalleryIndex]);

  const handleNextImage = () => {
    const nextIdx = (activeGalleryIndex + 1) % screenshots.length;
    setActiveGalleryIndex(nextIdx);
    setSelectedImage(screenshots[nextIdx]);
  };

  const handlePrevImage = () => {
    const prevIdx = (activeGalleryIndex - 1 + screenshots.length) % screenshots.length;
    setActiveGalleryIndex(prevIdx);
    setSelectedImage(screenshots[prevIdx]);
  };

  const openLightbox = (idx) => {
    setActiveGalleryIndex(idx);
    setSelectedImage(screenshots[idx]);
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const offset = direction === "left" ? -320 : 320;
      carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col bg-transparent text-slate-100">
      {/* 1. HERO SECTION */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-20 border-b border-white/5 [html.light_&]:border-slate-200 overflow-hidden">
        {/* Ambient Gradient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#2F7DE1]/15 to-[#F87000]/15 blur-[140px] pointer-events-none -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-mono">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-slate-200 truncate max-w-[200px] sm:max-w-none">
              {product.title}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Product Info & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold bg-[#F87000]/10 text-[#F87000] border border-[#F87000]/25 shadow-sm">
                  <Package size={13} />
                  <span>{product.label || "Turnkey Solution"}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/25">
                  {product.category}
                </span>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                  <ShieldCheck size={13} />
                  <span>100% Code Ownership</span>
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white [html.light_&]:text-[#0A2540] tracking-tight leading-tight">
                {product.title}
              </h1>

              {/* Summary Description */}
              <p className="text-base sm:text-lg text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                {product.description || product.summary}
              </p>

              {/* Starting Price Box */}
              <div className="inline-flex items-baseline gap-3 p-4 rounded-2xl bg-white/[0.03] [html.light_&]:bg-slate-100 border border-white/10 [html.light_&]:border-slate-200 backdrop-blur-md">
                <div>
                  <span className="text-xs uppercase font-mono tracking-wider text-slate-400 block">
                    Transparent License Pricing
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
                      {product.price || "Starting from ₹9,999"}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      Zero Recurring Commissions
                    </span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {/* Buy Now Primary CTA */}
                <Link
                  href={`/checkout?product=${product.slug}`}
                  className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#F87000] to-orange-600 hover:from-orange-500 hover:to-orange-600 shadow-xl shadow-orange-500/25 transition-all inline-flex items-center gap-2 group cursor-pointer"
                >
                  <ShoppingBag size={16} />
                  <span>Buy Now &amp; Deploy</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* View Plans CTA */}
                <a
                  href="#pricing"
                  className="px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 [html.light_&]:text-slate-800 bg-white/[0.06] hover:bg-white/[0.12] [html.light_&]:bg-slate-200 border border-white/10 [html.light_&]:border-slate-300 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>View Pricing Plans</span>
                </a>

                {/* Live Demo CTA if available */}
                {product.liveUrl && (
                  <a
                    href={product.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 rounded-xl text-sm font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Interactive Demo</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>

              {/* Verified Features Pills */}
              <div className="pt-2 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  Verified PhonePe UPI Checkout
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-blue-400" />
                  Staging URL &amp; Deployment Handover
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-[#F87000]" />
                  Verified Commercial Invoicing &amp; Receipts
                </span>
              </div>
            </div>

            {/* Right Column: Hero Mockup Visual */}
            <div className="lg:col-span-5 relative">
              <div
                onClick={() => openLightbox(0)}
                className="group relative rounded-2xl bg-[#070D18] border border-white/10 [html.light_&]:border-slate-200 shadow-2xl overflow-hidden cursor-pointer"
              >
                <div className="relative aspect-[16/10] w-full bg-[#0B1220] overflow-hidden">
                  <img
                    src={product.imageUrl || `/products/${product.slug}-preview.png`}
                    alt={product.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-black/20 to-transparent pointer-events-none" />

                  {/* Zoom Overlay Pill */}
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 text-xs font-semibold text-white inline-flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={12} />
                    <span>Click to Zoom</span>
                  </div>
                </div>

                {/* Banner Footer */}
                <div className="p-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Architecture: Full-Stack Turnkey</span>
                  <span className="text-emerald-400 font-bold">Ready to Deploy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT OVERVIEW SECTION */}
      <section className="py-16 md:py-24 border-b border-white/5 [html.light_&]:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider uppercase text-blue-400 bg-blue-500/10 border border-blue-500/25">
              Comprehensive Platform Overview
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
              Built for Real Business Operations
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
              Every system is engineered from the ground up to solve practical operational bottlenecks, eliminate third-party commission bleed, and ensure smooth data management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: What It Does */}
            <div className="p-7 rounded-2xl glass-card-premium border border-white/10 [html.light_&]:border-slate-200 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 mb-5">
                  <Zap size={22} />
                </div>
                <h3 className="text-lg font-bold text-white [html.light_&]:text-[#0A2540] mb-3">
                  What It Does
                </h3>
                <p className="text-sm text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                  {overview.whatItDoes}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-xs font-mono text-blue-400 font-semibold">
                Turnkey Workflow Engine
              </div>
            </div>

            {/* Card 2: Who Can Use It */}
            <div className="p-7 rounded-2xl glass-card-premium border border-white/10 [html.light_&]:border-slate-200 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-[#F87000] mb-5">
                  <Target size={22} />
                </div>
                <h3 className="text-lg font-bold text-white [html.light_&]:text-[#0A2540] mb-3">
                  Who Can Use It
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Tailored specifically for businesses operating in high-demand consumer and enterprise sectors:
                </p>
                <div className="space-y-2">
                  {whoCanUseList.map((aud, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-slate-300 [html.light_&]:text-slate-700"
                    >
                      <CheckCircle2 size={13} className="text-[#F87000] shrink-0" />
                      <span>{aud}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-xs font-mono text-[#F87000] font-semibold">
                Multi-Audience Architecture
              </div>
            </div>

            {/* Card 3: Problems Solved */}
            <div className="p-7 rounded-2xl glass-card-premium border border-white/10 [html.light_&]:border-slate-200 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/25 flex items-center justify-center text-red-400 mb-5">
                  <AlertCircle size={22} />
                </div>
                <h3 className="text-lg font-bold text-white [html.light_&]:text-[#0A2540] mb-3">
                  Problems It Solves
                </h3>
                <div className="space-y-2.5">
                  {problemsSolvedList.map((prob, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-slate-300 [html.light_&]:text-slate-600 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />
                      <span>{prob}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-xs font-mono text-red-400 font-semibold">
                Operational Pain-Point Resolution
              </div>
            </div>

            {/* Card 4: Key Business Benefits */}
            <div className="p-7 rounded-2xl glass-card-premium border border-white/10 [html.light_&]:border-slate-200 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-5">
                  <TrendingUp size={22} />
                </div>
                <h3 className="text-lg font-bold text-white [html.light_&]:text-[#0A2540] mb-3">
                  Business Benefits
                </h3>
                <div className="space-y-2.5">
                  {businessBenefitsList.map((ben, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-slate-300 [html.light_&]:text-slate-600 leading-relaxed"
                    >
                      <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{ben}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-xs font-mono text-emerald-400 font-semibold">
                Measurable ROI &amp; Revenue Lift
              </div>
            </div>

            {/* Card 5: Why Choose Digital Crowd Tech */}
            <div className="p-7 rounded-2xl glass-card-premium border border-white/10 [html.light_&]:border-slate-200 shadow-xl flex flex-col justify-between md:col-span-2 lg:col-span-2">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 mb-5">
                  <Award size={22} />
                </div>
                <h3 className="text-lg font-bold text-white [html.light_&]:text-[#0A2540] mb-2">
                  Why Choose Digital Crowd Tech
                </h3>

                {/* If product has a custom whyChoose string, highlight it prominently */}
                {whyChooseCustomHighlight && (
                  <div className="mb-5 p-4 rounded-xl bg-purple-500/10 [html.light_&]:bg-purple-50 border border-purple-500/25 [html.light_&]:border-purple-200 text-xs text-purple-200 [html.light_&]:text-purple-900 leading-relaxed">
                    <span className="font-bold text-purple-400 [html.light_&]:text-purple-700 uppercase tracking-wider text-[10px] block mb-1 font-mono">
                      Product Advantage &amp; Value Guarantee
                    </span>
                    {whyChooseCustomHighlight}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {whyChooseList.map((why, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-slate-300 [html.light_&]:text-slate-600 leading-relaxed"
                    >
                      <div className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-300 [html.light_&]:text-purple-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                        ✓
                      </div>
                      <span>{why}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono">
                <span>Direct Engineering Ownership</span>
                <span className="text-purple-400 font-semibold">Hyderabad Support Hub</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT FEATURES SECTION */}
      <section className="py-16 md:py-24 border-b border-white/5 [html.light_&]:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider uppercase text-[#F87000] bg-orange-500/10 border border-orange-500/25">
              Features &amp; Technical Capabilities
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
              Everything Included Out of the Box
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
              Engineered with clean architectural patterns, robust error handling, and modern security standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.isArray(product.features) &&
              product.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/[0.03] [html.light_&]:bg-white border border-white/10 [html.light_&]:border-slate-200 hover:border-orange-500/30 transition-all duration-300 group shadow-lg"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F87000]/10 border border-[#F87000]/20 flex items-center justify-center text-[#F87000] mb-4 group-hover:scale-105 transition-transform">
                    <CheckCircle2 size={18} />
                  </div>
                  <h4 className="text-sm font-bold text-white [html.light_&]:text-[#0A2540] mb-2">
                    {feat}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Production-tested implementation with verified schema validations and role guards.
                  </p>
                </div>
              ))}
          </div>

          {/* Tech Stack Chips Bar */}
          {Array.isArray(product.technologies) && product.technologies.length > 0 && (
            <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-center gap-3">
              <span className="text-xs font-mono text-slate-400 mr-2 uppercase tracking-wider font-semibold">
                Technology Stack:
              </span>
              {product.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.05] [html.light_&]:bg-slate-100 text-slate-200 [html.light_&]:text-slate-700 border border-white/10 [html.light_&]:border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. INTERACTIVE PRODUCT IMAGE GALLERY & LIGHTBOX */}
      <section className="py-16 md:py-24 border-b border-white/5 [html.light_&]:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider uppercase text-blue-400 bg-blue-500/10 border border-blue-500/25">
                Interface Previews
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
                Product Interface Gallery
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Click any screenshot below to expand and inspect the high-fidelity user workflows.
              </p>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Showing {screenshots.length} Interactive Views
            </div>
          </div>

          {/* Screenshots Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {screenshots.map((shot, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(idx)}
                className="group relative rounded-2xl bg-[#070D18] [html.light_&]:bg-white border border-white/10 [html.light_&]:border-slate-200 overflow-hidden shadow-xl cursor-pointer hover:border-blue-500/40 transition-all duration-300"
              >
                <div className="aspect-[16/10] w-full bg-[#0B1220] [html.light_&]:bg-slate-100 overflow-hidden relative">
                  <img
                    src={shot.url}
                    alt={shot.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Badge */}
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-blue-300 border border-blue-500/30">
                    {shot.tag || "View"}
                  </span>

                  {/* Click to Zoom Icon */}
                  <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={13} />
                  </div>
                </div>

                <div className="p-4 bg-white/[0.02] [html.light_&]:bg-slate-50 border-t border-white/5 [html.light_&]:border-slate-100">
                  <h4 className="text-xs font-bold text-white [html.light_&]:text-[#0A2540] truncate mb-1">
                    {shot.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 [html.light_&]:text-slate-600 line-clamp-1">
                    {shot.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL LIGHTBOX */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute top-5 right-5 z-[101] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X size={22} />
          </button>

          {/* Prev Button */}
          <button
            type="button"
            onClick={handlePrevImage}
            className="absolute left-5 top-1/2 -translate-y-1/2 z-[101] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer hidden sm:flex items-center justify-center"
            aria-label="Previous Image"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNextImage}
            className="absolute right-5 top-1/2 -translate-y-1/2 z-[101] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer hidden sm:flex items-center justify-center"
            aria-label="Next Image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Modal Container */}
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <div className="relative w-full min-h-[300px] sm:min-h-[480px] max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-[#0B1220] shadow-2xl p-2 sm:p-4">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-w-full max-h-[72vh] w-auto h-auto object-contain rounded-xl shadow-lg"
              />
            </div>

            {/* Bottom Info Bar in Lightbox */}
            <div className="mt-4 w-full flex flex-col sm:flex-row items-center justify-between gap-2 px-2 text-center sm:text-left">
              <div>
                <h4 className="text-sm font-bold text-white">
                  {selectedImage.title}
                </h4>
                <p className="text-xs text-slate-300">
                  {selectedImage.description}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">
                  {activeGalleryIndex + 1} / {screenshots.length}
                </span>
                <div className="flex items-center gap-1 sm:hidden">
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="p-1.5 rounded-lg bg-white/10 text-white"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="p-1.5 rounded-lg bg-white/10 text-white"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. PRODUCT PRICING SECTION */}
      <section
        id="pricing"
        className="py-16 md:py-24 border-b border-white/5 [html.light_&]:border-slate-200 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/25">
              Transparent Commercial Packages
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
              Predictable Pricing. Zero Hidden Fees.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
              Select the licensing tier that matches your business scale. Pay securely via PhonePe UPI or Net Banking with verified invoice generation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => {
              const isPopular = plan.popular || idx === 1;

              return (
                <div
                  key={plan.name}
                  className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                    isPopular
                      ? "bg-gradient-to-b from-[#16223A] to-[#0B1220] [html.light_&]:from-orange-50/80 [html.light_&]:to-white border-2 border-[#F87000] shadow-2xl shadow-orange-500/10 scale-[1.02] lg:-translate-y-2"
                      : "glass-card-premium [html.light_&]:bg-white border border-white/10 [html.light_&]:border-slate-200"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#F87000] to-orange-600 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                      Most Popular Tier
                    </div>
                  )}

                  <div>
                    {/* Plan Header */}
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white [html.light_&]:text-[#0A2540]">
                        {plan.name}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400">
                        Perpetual License
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-6">
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-6 pb-6 border-b border-white/10 [html.light_&]:border-slate-200">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
                          {plan.price}
                        </span>
                        <span className="text-xs text-slate-400">
                          (One-Time License)
                        </span>
                      </div>
                      <span className="text-[11px] text-emerald-400 block mt-1 font-semibold">
                        ✓ 100% Full Source Code Handover Included
                      </span>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
                        Included In This Package:
                      </span>
                      {Array.isArray(plan.features) &&
                        plan.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300 [html.light_&]:text-slate-600">
                            <CheckCircle2
                              size={15}
                              className={`shrink-0 mt-0.5 ${
                                isPopular ? "text-[#F87000]" : "text-emerald-400"
                              }`}
                            />
                            <span>{feat}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Buy Plan CTA */}
                  <div className="pt-4 border-t border-white/5">
                    <Link
                      href={`/checkout?product=${product.slug}&plan=${encodeURIComponent(
                        plan.name
                      )}&amount=${plan.numericPrice || 9999}`}
                      className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-center transition-all inline-flex items-center justify-center gap-2 shadow-lg ${
                        isPopular
                          ? "bg-gradient-to-r from-[#F87000] to-orange-600 hover:from-orange-500 hover:to-orange-600 text-white shadow-orange-500/25"
                          : "bg-white/[0.08] hover:bg-white/[0.15] text-white [html.light_&]:bg-slate-200 [html.light_&]:text-slate-800"
                      }`}
                    >
                      <ShoppingBag size={15} />
                      <span>Buy {plan.name}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. RELATED PRODUCTS CAROUSEL ("Explore More Products") */}
      {relatedProducts.length > 0 && (
        <section className="py-16 md:py-24 border-b border-white/5 [html.light_&]:border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider uppercase text-[#F87000] bg-orange-500/10 border border-orange-500/25">
                  Portfolio Showcase
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
                  Explore More Products
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Discover our other ready-to-deploy turnkey software and management platforms.
                </p>
              </div>

              {/* Prev/Next Carousel Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollCarousel("left")}
                  className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel("right")}
                  className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Scroll Track */}
            <div
              ref={carouselRef}
              className="flex items-stretch gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id || rel.slug}
                  className="w-[280px] sm:w-[320px] shrink-0 rounded-2xl glass-card-premium [html.light_&]:bg-white border border-white/10 [html.light_&]:border-slate-200 overflow-hidden flex flex-col justify-between group snap-start shadow-xl"
                >
                  <div>
                    {/* Media */}
                    <div className="relative aspect-[16/10] w-full bg-[#070D18] [html.light_&]:bg-slate-100 overflow-hidden">
                      <img
                        src={rel.imageUrl || `/products/${rel.slug}-preview.png`}
                        alt={rel.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-black/30 to-transparent pointer-events-none" />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-[#F87000] border border-orange-500/30">
                        {rel.label || "Turnkey"}
                      </span>
                    </div>

                    <div className="p-5">
                      <p className="text-[11px] font-mono text-blue-400 uppercase tracking-wider mb-1 font-semibold">
                        {rel.category}
                      </p>
                      <h3 className="text-base font-bold text-white [html.light_&]:text-[#0A2540] group-hover:text-[#F87000] transition-colors mb-2 line-clamp-1">
                        <Link href={`/products/${rel.slug}`}>
                          {rel.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-slate-300 [html.light_&]:text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {rel.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-white/5 mt-auto">
                    <div className="flex items-center justify-between pt-3">
                      <span className="text-xs font-bold text-emerald-400">
                        {rel.price || "₹9,999"}
                      </span>
                      <Link
                        href={`/products/${rel.slug}`}
                        className="text-xs font-bold text-[#F87000] hover:text-orange-300 inline-flex items-center gap-1 transition"
                      >
                        <span>Explore</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. BUSINESS CONTACT SECTION ("Interested in This Product?") */}
      <section
        id="contact"
        className="py-16 md:py-24 bg-gradient-to-b from-transparent to-black/30"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-12 rounded-3xl glass-card-premium border border-white/10 [html.light_&]:border-slate-200 shadow-2xl relative overflow-hidden">
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[90px] pointer-events-none rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[90px] pointer-events-none rounded-full" />

            <span className="px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider uppercase text-blue-400 bg-blue-500/10 border border-blue-500/25">
              Direct Business Communication
            </span>

            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
              Interested in This Product?
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-300 [html.light_&]:text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Have questions or want to purchase this solution? Get in touch with our team for live walkthroughs, custom feature scoping, or staging deployment.
            </p>

            {/* Official Contact Info Card */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">
                  COMPANY &amp; BRAND
                </span>
                <span className="text-sm font-bold text-white block">
                  Digital Crowd Tech
                </span>
                <span className="text-xs text-slate-400">
                  digitalcrowdtech.in
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">
                  OFFICIAL EMAIL
                </span>
                <a
                  href="mailto:support@digitalcrowdtech.in"
                  className="text-sm font-bold text-blue-400 hover:underline block truncate"
                >
                  support@digitalcrowdtech.in
                </a>
                <span className="text-xs text-slate-400">
                  Response within 4-12 hours
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">
                  PHONE &amp; WHATSAPP
                </span>
                <a
                  href="tel:+919985960692"
                  className="text-sm font-bold text-emerald-400 hover:underline block"
                >
                  +91 9985960692
                </a>
                <span className="text-xs text-slate-400">
                  Mon-Sat: 9:00 AM - 7:00 PM IST
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="tel:+919985960692"
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md transition inline-flex items-center gap-2"
              >
                <Phone size={15} />
                <span>Call Now</span>
              </a>

              <a
                href="mailto:support@digitalcrowdtech.in"
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 [html.light_&]:text-slate-800 bg-white/[0.06] hover:bg-white/[0.12] [html.light_&]:bg-slate-200 border border-white/10 [html.light_&]:border-slate-300 transition inline-flex items-center gap-2"
              >
                <Mail size={15} />
                <span>Email Us</span>
              </a>

              <a
                href="https://wa.me/919985960692?text=Hello%20Digital%20Crowd%20Tech%2C%20I%20am%20interested%20in%20purchasing%20your%20digital%20product"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition inline-flex items-center gap-2"
              >
                <MessageCircle size={15} />
                <span>WhatsApp Us</span>
              </a>

              <Link
                href={`/checkout?product=${product.slug}`}
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#F87000] to-orange-600 hover:from-orange-500 hover:to-orange-600 shadow-md shadow-orange-500/25 transition inline-flex items-center gap-2"
              >
                <ShoppingBag size={15} />
                <span>Instant Checkout</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
