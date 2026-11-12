"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  ExternalLink,
  Code2,
  CheckCircle2,
} from "lucide-react";
import ProjectArchitectureDiagram from "./ProjectArchitectureDiagram";
import TiltCard from "./TiltCard";
import { PROJECTS } from "../data/projects";

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

const FEATURED_PROJECTS = [
  {
    id: "ruchi-bazzar",
    title: "Ruchi Bazaar",
    category: "Food Delivery & Multi-Vendor Restaurant Ecosystem",
    tagline: "Customer Storefront, Kitchen KOT, Rider App & SuperAdmin Control",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&auto=format&fit=crop&q=80",
    fallback: "/projects/ruchi-logo.png",
    caseStudyUrl: "/projects/ruchi-bazzar",
    liveUrl: "https://ruchibazzar.com",
    badge: "Food Delivery",
    tech: ["Next.js", "Node.js", "MySQL", "Socket.io"],
    stats: "Live WebSocket Sync • <25ms Latency",
  },
  {
    id: "ruchi-store",
    title: "Ruchi Store",
    category: "Merchant Inventory & Grocery Store Management",
    tagline: "Real-Time SKU Barcode Scanning, Multi-Counter POS & Supplier Ledger",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=80",
    fallback: "/projects/ruchi-logo.png",
    caseStudyUrl: "/products#ruchi-bazzar-food-delivery",
    liveUrl: "https://ruchibazzar.com",
    badge: "Retail & Store SaaS",
    tech: ["Next.js", "React", "Express.js", "MySQL"],
    stats: "20,000+ SKUs • Offline-Resilient POS",
  },
  {
    id: "task-digital-crowd",
    title: "TaskDigitalCrowd",
    category: "Agile Task & Team Project Management SaaS",
    tagline: "Interactive 60fps Kanban Boards, Sprint Velocity & Client Handover",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&auto=format&fit=crop&q=80",
    fallback: "/projects/ruchi-logo.png",
    caseStudyUrl: "https://task.digitalcrowdtech.in/",
    isExternal: true,
    badge: "Agency SaaS",
    tech: ["Next.js App Router", "Express", "MySQL", "Socket.io"],
    stats: "Real-Time Collaboration • 0 Recurring Fees",
  },
  {
    id: "ruchi-food-sharing",
    title: "Ruchi Food Sharing",
    category: "Surplus Food Redistribution & Community Network",
    tagline: "Zero-Waste Surplus Meal Rescue, Donor Matching & Volunteer Dispatch",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80",
    fallback: "/projects/ruchi-logo.png",
    caseStudyUrl: "https://foodsharing.ruchibazaar.in/",
    isExternal: true,
    badge: "CSR & Community",
    tech: ["Next.js", "Geolocation", "WhatsApp API", "MySQL"],
    stats: "10,000+ Meals Rescued • Sub-15min Match",
  },
  {
    id: "stareggs",
    title: "StarEggs",
    category: "Wholesale & Retail White Egg Distribution Platform",
    tagline: "Daily NECC Price Index Sync, Bulk Wholesale Orders & Route Manifests",
    image: "/projects/stareggs-fresh-eggs.jpg",
    fallback: "https://stareggs3.vercel.app/images/fresh-eggs-basket.jpg",
    caseStudyUrl: "https://stareggs3.vercel.app/",
    isExternal: true,
    badge: "Wholesale Agro B2B",
    tech: ["Next.js", "React", "Tailwind CSS", "Node.js"],
    stats: "Wholesale & Retail • Adilabad, TS & Vidarbha",
  },
  {
    id: "multi-tenant-clinic-management-saas",
    title: "Multi-Tenant Clinic Management SaaS",
    category: "Healthcare, Telemedicine & Clinical EHR Portal",
    tagline: "Multi-Tenant Doctor Schedules, Patient EHR Records & Digital Rx Billing",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    fallback: "/projects/ruchi-logo.png",
    caseStudyUrl: "/services/custom-web-application-development",
    badge: "Healthcare SaaS",
    tech: ["Next.js", "TypeScript", "MySQL", "WebRTC"],
    stats: "100% Paperless • Multi-Branch Isolation",
  },
  {
    id: "upsc-aspirant-learning-portal",
    title: "UPSC Aspirant Learning Portal",
    category: "Civil Services EdTech & Mock Test Engine",
    tagline: "Timed Prelims CBT Exam Engine, Mains PDF Evaluation & Subject Analytics",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
    fallback: "/projects/ruchi-logo.png",
    caseStudyUrl: "/projects/school-management-system",
    badge: "EdTech Platform",
    tech: ["Next.js", "React", "Node.js", "MySQL"],
    stats: "50,000+ Question Bank • Instant Scorecards",
  },
  {
    id: "unity-credit-cooperative-harmony",
    title: "Unity Credit / Cooperative Harmony",
    category: "Cooperative Banking, Micro-Lending & Savings Portal",
    tagline: "Double-Entry Accounting Ledger, Member Deposits & Loan Amortization",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80",
    fallback: "/projects/ruchi-logo.png",
    caseStudyUrl: "https://unitycredit.in/",
    isExternal: true,
    badge: "Banking & FinTech",
    tech: ["Next.js", "TypeScript", "Node.js", "Redis", "MySQL"],
    stats: "Double-Entry Integrity • Audit Compliant",
  },
];

const PROCESS_STEPS = [
  { num: "#01", title: "Strategy & Planning" },
  { num: "#02", title: "Design & Development" },
  { num: "#03", title: "Launch & Growth" },
  { num: "#04", title: "Ongoing Support" },
];

export default function OurWorkShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const total = FEATURED_PROJECTS.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Continuous auto-play rotation every 3.5s
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      nextSlide();
    } else if (distance < -45) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  };

  // 3D Curved Perspective Stage calculation for 8 projects wrap-around
  const getCardTransform = (index) => {
    let diff = index - activeIndex;

    // Circular wrap around [-4, 3]
    while (diff > total / 2) diff -= total;
    while (diff < -total / 2) diff += total;

    const absDiff = Math.abs(diff);

    // 0: Center Active Card
    if (diff === 0) {
      return {
        transform: "translateX(0px) translateY(0px) scale(1.15) rotateY(0deg)",
        zIndex: 40,
        opacity: 1,
        filter: "none",
        pointerEvents: "auto",
      };
    }

    // 1 / -1: Immediate Neighbors
    if (absDiff === 1) {
      const x = diff * 195;
      const rot = diff > 0 ? -18 : 18;
      return {
        transform: `translateX(${x}px) translateY(10px) scale(0.92) rotateY(${rot}deg)`,
        zIndex: 30,
        opacity: 0.95,
        filter: "brightness(0.95)",
        pointerEvents: "auto",
      };
    }

    // 2 / -2: Secondary Cards
    if (absDiff === 2) {
      const x = diff * 185;
      const rot = diff > 0 ? -32 : 32;
      return {
        transform: `translateX(${x}px) translateY(22px) scale(0.80) rotateY(${rot}deg)`,
        zIndex: 20,
        opacity: 0.85,
        filter: "brightness(0.85)",
        pointerEvents: "auto",
      };
    }

    // 3 / -3: Outer Edge Wings
    if (absDiff === 3) {
      const x = diff * 170;
      const rot = diff > 0 ? -44 : 44;
      return {
        transform: `translateX(${x}px) translateY(36px) scale(0.68) rotateY(${rot}deg)`,
        zIndex: 10,
        opacity: 0.65,
        filter: "brightness(0.75)",
        pointerEvents: "auto",
      };
    }

    // Furthest opposite card (behind)
    const x = diff * 140;
    return {
      transform: `translateX(${x}px) translateY(50px) scale(0.55) rotateY(0deg)`,
      zIndex: 2,
      opacity: 0,
      filter: "brightness(0.4) blur(2px)",
      pointerEvents: "none",
    };
  };

  return (
    <section
      className="py-20 md:py-28 bg-transparent border-b border-white/5 [html.light_&]:border-slate-200/80 relative overflow-hidden"
      id="projects"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Our Work 3D Carousel"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-[550px] h-[400px] bg-gradient-to-tr from-[#2F7DE1]/15 to-[#1E40AF]/10 blur-[140px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute bottom-10 -right-20 w-[500px] h-[360px] bg-gradient-to-tl from-[#F87000]/10 to-[#2F7DE1]/10 blur-[130px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Floating Elevated Showcase Container */}
        <div className="rounded-[2.25rem] sm:rounded-[2.75rem] lg:rounded-[3rem] bg-[#0B1220]/95 [html.light_&]:bg-white border border-white/10 [html.light_&]:border-slate-200/90 shadow-[0_25px_70px_rgba(0,0,0,0.65)] [html.light_&]:shadow-[0_25px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl p-6 sm:p-12 lg:p-16 transition-all duration-300 relative overflow-hidden">
          
          {/* Header Block matching reference mockup */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs sm:text-sm font-bold tracking-wider text-[#F87000] uppercase block">
              Behind the Designs
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white [html.light_&]:text-slate-900 tracking-tight leading-tight">
              Curious What Else We&apos;ve Created?
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-400 [html.light_&]:text-slate-500 max-w-xl mx-auto leading-relaxed pt-1">
              Explore full-stack platforms, healthcare suites, banking portals, and turnkey e-commerce systems in our extended portfolio.
            </p>

            {/* Pill Action Button */}
            <div className="pt-2 flex justify-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white/5 [html.light_&]:bg-slate-100 hover:bg-white/10 [html.light_&]:hover:bg-slate-200 border border-white/10 [html.light_&]:border-slate-300 text-white [html.light_&]:text-slate-800 transition shadow-xs group cursor-pointer"
              >
                <span>See more Projects</span>
                <span className="w-7 h-7 rounded-full bg-[#F87000] text-white flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform shadow-xs">
                  <ArrowRight size={13} />
                </span>
              </Link>
            </div>
          </div>

          {/* Carousel Stage Wrapper */}
          <div
            className="mt-10 sm:mt-14 relative px-0 sm:px-4 py-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Previous Arrow Button */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous Project"
              className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-[#0B1220]/85 [html.light_&]:bg-white/95 border border-white/20 [html.light_&]:border-slate-300 text-white [html.light_&]:text-slate-800 flex items-center justify-center shadow-2xl hover:bg-[#2F7DE1] hover:text-white transition-all transform hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Next Arrow Button */}
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next Project"
              className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-[#0B1220]/85 [html.light_&]:bg-white/95 border border-white/20 [html.light_&]:border-slate-300 text-white [html.light_&]:text-slate-800 flex items-center justify-center shadow-2xl hover:bg-[#2F7DE1] hover:text-white transition-all transform hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
            >
              <ChevronRight size={20} />
            </button>

            {/* Desktop 3D Curved Perspective Stage (True Panoramic Amphitheater) */}
            <div className="hidden lg:flex items-center justify-center relative w-full h-[460px] xl:h-[500px] overflow-hidden [perspective:1400px]">
              {FEATURED_PROJECTS.map((project, idx) => {
                const style = getCardTransform(idx);
                const isActive = activeIndex === idx;

                return (
                  <div
                    key={project.id}
                    onClick={() => setActiveIndex(idx)}
                    style={{
                      ...style,
                      transition:
                        "transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms ease, filter 500ms ease",
                    }}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transform-gpu cursor-pointer group ${
                      isActive
                        ? "w-56 xl:w-64 h-84 xl:h-[390px] ring-2 ring-[#2F7DE1] shadow-blue-500/40"
                        : "w-44 xl:w-48 h-72 xl:h-80 ring-1 ring-white/10 [html.light_&]:ring-slate-200 hover:ring-[#F87000]/60"
                    }`}
                  >
                    {/* Card Media: Full Cover for Photos or Ambient Backdrop for Logos */}
                    {isLogoImage(project.image) ? (
                      <div className="absolute inset-0 bg-[#070D18] flex items-center justify-center overflow-hidden">
                        {/* Ambient blurred backdrop that 100% covers the vertical card */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.image}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-150 filter pointer-events-none"
                        />
                        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
                        
                        {/* Centered logo fully captured without cropping */}
                        <div className="relative z-10 w-full h-full flex items-center justify-center p-6 pb-28">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={project.image}
                            alt={project.title}
                            className="max-h-[60%] max-w-[85%] w-auto h-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = project.fallback;
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-[#0B1220] via-black/40 to-transparent transition-opacity ${
                        isActive ? "opacity-90" : "opacity-75 group-hover:opacity-85"
                      }`}
                    />

                    {/* Domain Category Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[#F87000]">
                        {project.badge}
                      </span>
                    </div>

                    {/* Card Content Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 space-y-1.5 text-left flex flex-col justify-end z-10">
                      <span className="text-[10px] font-mono text-[#F87000] uppercase tracking-wider font-semibold">
                        {project.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white leading-tight drop-shadow-xs">
                        {project.title}
                      </h3>
                      
                      {/* Active Card Expanded Info */}
                      {isActive && (
                        <div className="pt-1 space-y-2 animate-in fade-in duration-300">
                          <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                            {project.tagline}
                          </p>

                          {/* Tech Pills */}
                          <div className="flex flex-wrap gap-1 pt-0.5">
                            {project.tech.slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-200"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* Action Button */}
                          <div className="pt-1">
                            {project.caseStudyUrl?.startsWith("http") ? (
                              <a
                                href={project.caseStudyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F87000] hover:text-[#FF8A24] transition-colors"
                              >
                                <span>Explore Live Project</span>
                                <ExternalLink size={12} />
                              </a>
                            ) : (
                              <Link
                                href={project.caseStudyUrl}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F87000] hover:text-[#FF8A24] transition-colors"
                              >
                                <span>Explore Project</span>
                                <ArrowRight size={12} />
                              </Link>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile / Tablet Horizontal Animated Slider Track */}
            <div className="flex lg:hidden relative w-full overflow-hidden py-4">
              <div
                className="flex transition-transform duration-500 ease-out will-change-transform"
                style={{
                  transform: `translateX(calc(50% - 135px - ${activeIndex * 286}px))`,
                }}
              >
                {FEATURED_PROJECTS.map((project, idx) => {
                  const isActive = activeIndex === idx;

                  return (
                    <div
                      key={project.id}
                      onClick={() => setActiveIndex(idx)}
                      className={`w-[270px] h-[380px] mr-4 rounded-2xl overflow-hidden shadow-xl relative shrink-0 transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "ring-2 ring-[#2F7DE1] scale-100 opacity-100 shadow-blue-500/30"
                          : "ring-1 ring-white/10 scale-95 opacity-55"
                      }`}
                    >
                      {isLogoImage(project.image) ? (
                        <div className="absolute inset-0 bg-[#070D18] flex items-center justify-center overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={project.image}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-150 filter pointer-events-none"
                          />
                          <div className="absolute inset-0 bg-black/50 pointer-events-none" />
                          <div className="relative z-10 w-full h-full flex items-center justify-center p-6 pb-24">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={project.image}
                              alt={project.title}
                              className="max-h-[60%] max-w-[85%] w-auto h-auto object-contain drop-shadow-2xl"
                            />
                          </div>
                        </div>
                      ) : (
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = project.fallback;
                          }}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-black/40 to-transparent" />
                      
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/60 text-[#F87000]">
                          {project.badge}
                        </span>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-4 text-left space-y-1.5 z-10">
                        <span className="text-[10px] font-mono text-[#F87000] uppercase font-bold block">
                          {project.category}
                        </span>
                        <h3 className="text-base font-bold text-white">{project.title}</h3>
                        <p className="text-xs text-slate-300 line-clamp-2">{project.tagline}</p>
                        
                        {/* Tech Chips on Mobile */}
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {project.tech.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-200"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="pt-2">
                          {project.caseStudyUrl?.startsWith("http") ? (
                            <a
                              href={project.caseStudyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-bold text-[#F87000]"
                            >
                              <span>Explore Live Project</span>
                              <ExternalLink size={12} />
                            </a>
                          ) : (
                            <Link
                              href={project.caseStudyUrl}
                              className="inline-flex items-center gap-1 text-xs font-bold text-[#F87000]"
                            >
                              <span>Explore Project</span>
                              <ArrowRight size={12} />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Carousel Pagination Dots Track (8 indicators) */}
            <div className="mt-8 flex items-center justify-center gap-2">
              {FEATURED_PROJECTS.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Jump to ${p.title}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? "w-8 bg-[#F87000] shadow-sm shadow-orange-500/50"
                      : "w-2 bg-white/20 [html.light_&]:bg-slate-300 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

          </div>

          {/* Process Step Numbers (matching reference mockup #01, #02, #03, #04) */}
          <div className="mt-14 pt-8 border-t border-white/10 [html.light_&]:border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="space-y-1">
                <span className="text-xs sm:text-sm font-mono font-bold text-[#F87000] block">
                  {step.num}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white [html.light_&]:text-slate-800">
                  {step.title}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Expandable Technical Architecture Details */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-slate-300 [html.light_&]:text-slate-700 bg-white/5 [html.light_&]:bg-slate-100 hover:bg-white/10 border border-white/10 [html.light_&]:border-slate-300 transition cursor-pointer"
          >
            <Layers size={14} className="text-[#2F7DE1]" />
            <span>
              {showTechnicalDetails ? "Hide Live System Architectures" : "Inspect Live System Architectures & Schemas"}
            </span>
          </button>
        </div>

        {/* Detailed Architecture Diagrams & Case Studies */}
        {showTechnicalDetails && (
          <div className="mt-10 space-y-12 animate-in fade-in duration-300">
            {PROJECTS.map((project, idx) => {
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={project.id}
                  className="rounded-3xl glass-card-premium p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Project Info */}
                    <div className={`lg:col-span-6 space-y-4 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                      {project.isInternal ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300">
                          <span>{project.label}</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400">
                          <span>{project.category}</span>
                        </div>
                      )}

                      <h3 className="text-2xl sm:text-3xl font-bold text-white [html.light_&]:text-[#0A2540]">
                        {project.title}
                      </h3>

                      <p className="text-sm text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2.5 py-1 rounded-md bg-white/5 [html.light_&]:bg-slate-100 border border-white/5 [html.light_&]:border-slate-200 text-slate-300 [html.light_&]:text-slate-700 font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="pt-2 flex flex-wrap items-center gap-4">
                        {project.caseStudyUrl && (
                          <Link
                            href={project.caseStudyUrl}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2F7DE1] hover:text-blue-400"
                          >
                            <span>Read Case Study</span>
                            <ArrowRight size={14} />
                          </Link>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
                          >
                            <span>Visit Live Website</span>
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Architecture Diagram */}
                    <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                      {project.id === "ruchi-bazzar" || project.id === "school-management-system" ? (
                        <ProjectArchitectureDiagram projectId={project.id} />
                      ) : (
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                          <span className="text-xs font-mono text-slate-400 block">
                            Architecture Highlights
                          </span>
                          {(project.highlights || []).map((h, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 size={13} className="text-blue-400 shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
