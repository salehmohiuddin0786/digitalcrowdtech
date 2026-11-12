"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Phone,
  Briefcase,
  Layers,
  Sparkles,
  Package,
  HelpCircle,
  FolderTree,
} from "lucide-react";
import { COMPANY } from "../data/company";
import { SERVICES } from "../data/services";
import ThemeToggle from "./ThemeToggle";
import ShimmerButton from "./ShimmerButton";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef(null);
  const servicesDropdownRef = useRef(null);
  const aboutDropdownRef = useRef(null);

  // Close mobile and dropdown menus on navigation
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setAboutOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Handle outside click & touch for dropdown menus and mobile drawer
  useEffect(() => {
    function handleClickOutside(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setServicesOpen(false);
        setAboutOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Streamlined primary navigation links
  const navLinks = [
    { name: "Services", href: "/services", dropdownType: "services" },
    { name: "Products", href: "/products" },
    { name: "Projects", href: "/projects" },
    { name: "About & Portfolio", href: "/about", dropdownType: "about" },
    { name: "Pricing", href: "/pricing" },
    { name: "Process", href: "/process" },
    { name: "Blog", href: "/blog" },
  ];

  const isLinkActive = (item) => {
    if (item.href === "/") return pathname === "/";
    if (item.dropdownType === "services") {
      return pathname.startsWith("/services") || pathname.startsWith("/service");
    }
    if (item.dropdownType === "about") {
      return pathname.startsWith("/about") || pathname.startsWith("/portfolio");
    }
    return pathname.startsWith(item.href);
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        mobileOpen
          ? "bg-[#0B1220] [html.light_&]:bg-white shadow-2xl border-b border-[#26344F] [html.light_&]:border-slate-200 py-3"
          : scrolled
          ? "bg-[#0B1220]/95 [html.light_&]:bg-white/95 backdrop-blur-md border-b border-[#26344F] [html.light_&]:border-slate-200 shadow-xl py-2.5"
          : "bg-[#0B1220]/80 [html.light_&]:bg-white/85 backdrop-blur-sm border-b border-[#26344F]/50 [html.light_&]:border-slate-200/80 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* 1. BRAND LOGO */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 group shrink-0 focus:outline-none"
            aria-label="Digital Crowd Technologies Home"
          >
            {/* Seamless Brand Wordmark (Dark & Light theme adaptive, zero harsh white box) */}
            <div className="relative h-8 sm:h-9 md:h-10 flex items-center transition-transform duration-200 group-hover:scale-[1.02]">
              <Image
                src="/logo-dark.png"
                alt="Digital Crowd Technologies"
                width={160}
                height={44}
                className="h-8 sm:h-9 md:h-10 w-auto object-contain block [html.light_&]:hidden"
                priority
              />
              <Image
                src="/logo.png"
                alt="Digital Crowd Technologies"
                width={160}
                height={44}
                className="h-8 sm:h-9 md:h-10 w-auto object-contain hidden [html.light_&]:block"
                priority
              />
            </div>

            {/* Live Availability Badge */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-medium">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span>Available for Projects</span>
            </div>
          </Link>

          {/* 2. DESKTOP NAVIGATION BAR */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const active = isLinkActive(item);

              // Services Dropdown
              if (item.dropdownType === "services") {
                return (
                  <div key={item.name} className="relative" ref={servicesDropdownRef}>
                    <button
                      type="button"
                      onClick={() => {
                        setServicesOpen(!servicesOpen);
                        setAboutOpen(false);
                      }}
                      className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                        active || servicesOpen
                          ? "bg-[#2F7DE1] text-white shadow-sm shadow-blue-500/30"
                          : "text-slate-300 [html.light_&]:text-[#40484C] hover:text-white [html.light_&]:hover:text-[#0A2540] hover:bg-white/10 [html.light_&]:hover:bg-slate-200"
                      }`}
                      aria-expanded={servicesOpen}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {servicesOpen && (
                      <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl glass-card-premium p-3 shadow-2xl border border-[#26344F] [html.light_&]:border-slate-200 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="px-3 py-2 border-b border-white/5 [html.light_&]:border-slate-100 flex items-center justify-between">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                            Our Capabilities
                          </span>
                          <Link
                            href="/services"
                            onClick={() => setServicesOpen(false)}
                            className="text-[11px] font-bold text-[#2F7DE1] hover:underline"
                          >
                            All Services →
                          </Link>
                        </div>
                        <div className="mt-2 space-y-1">
                          {SERVICES.map((s) => (
                            <Link
                              key={s.id}
                              href={`/services/${s.slug}`}
                              onClick={() => setServicesOpen(false)}
                              className="flex flex-col p-2 rounded-xl hover:bg-white/5 [html.light_&]:hover:bg-slate-100 transition-colors group/item"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-white [html.light_&]:text-[#0A2540] group-hover/item:text-[#2F7DE1] transition-colors">
                                  {s.title}
                                </span>
                                {s.startingPrice && s.startingPrice.includes("₹") && (
                                  <span className="text-[10px] text-[#F87000] font-semibold">
                                    {s.startingPrice.replace("Starting from ", "from ")}
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                {s.summary}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              // About & Portfolio Unified Dropdown
              if (item.dropdownType === "about") {
                return (
                  <div key={item.name} className="relative" ref={aboutDropdownRef}>
                    <button
                      type="button"
                      onClick={() => {
                        setAboutOpen(!aboutOpen);
                        setServicesOpen(false);
                      }}
                      className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                        active || aboutOpen
                          ? "bg-[#2F7DE1] text-white shadow-sm shadow-blue-500/30"
                          : "text-slate-300 [html.light_&]:text-[#40484C] hover:text-white [html.light_&]:hover:text-[#0A2540] hover:bg-white/10 [html.light_&]:hover:bg-slate-200"
                      }`}
                      aria-expanded={aboutOpen}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${
                          aboutOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {aboutOpen && (
                      <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl glass-card-premium p-3 shadow-2xl border border-[#26344F] [html.light_&]:border-slate-200 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="space-y-1">
                          <Link
                            href="/about"
                            onClick={() => setAboutOpen(false)}
                            className="flex flex-col p-2.5 rounded-xl hover:bg-white/5 [html.light_&]:hover:bg-slate-100 transition-colors group/about"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-blue-400" />
                              <span className="text-xs font-bold text-white [html.light_&]:text-[#0A2540] group-hover/about:text-[#2F7DE1]">
                                About Us
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1 pl-4">
                              Company vision, engineering standards, and real leadership team.
                            </p>
                          </Link>

                          <Link
                            href="/portfolio"
                            onClick={() => setAboutOpen(false)}
                            className="flex flex-col p-2.5 rounded-xl hover:bg-white/5 [html.light_&]:hover:bg-slate-100 transition-colors group/port"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#F87000]" />
                              <span className="text-xs font-bold text-white [html.light_&]:text-[#0A2540] group-hover/port:text-[#F87000]">
                                Engineering Portfolio
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1 pl-4">
                              Ruchi Bazzar, School ERP &amp; live architectures.
                            </p>
                          </Link>

                          <div className="pt-2 mt-1 border-t border-[#26344F]/60 [html.light_&]:border-slate-100">
                            <Link
                              href="/portfolio#inquiry-form"
                              onClick={() => setAboutOpen(false)}
                              className="flex items-center justify-between px-3 py-1.5 text-xs font-bold text-[#2F7DE1] hover:text-[#2F7DE1]/80 rounded-lg hover:bg-[#2F7DE1]/10 transition-colors"
                            >
                              <span>Request Portfolio Consultation</span>
                              <ArrowRight size={13} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                    active
                      ? "bg-[#2F7DE1] text-white shadow-sm shadow-blue-500/30"
                      : "text-slate-300 [html.light_&]:text-[#40484C] hover:text-white [html.light_&]:hover:text-[#0A2540] hover:bg-white/10 [html.light_&]:hover:bg-slate-200"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* 3. DESKTOP ACTION CTAS */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <a
              href={`tel:${COMPANY.phone}`}
              className="w-8 h-8 rounded-full border border-[#26344F] [html.light_&]:border-slate-300 flex items-center justify-center text-slate-300 [html.light_&]:text-[#40484C] hover:text-[#2F7DE1] hover:border-[#2F7DE1]/50 hover:bg-[#2F7DE1]/10 transition-all duration-200"
              title={`Call directly: ${COMPANY.phoneDisplay}`}
              aria-label={`Call directly: ${COMPANY.phoneDisplay}`}
            >
              <Phone size={14} className="text-[#2F7DE1]" />
            </a>

            <ThemeToggle />

            <ShimmerButton href="/contact" className="px-4 py-2 text-xs font-bold">
              <span>Get a Quote</span>
            </ShimmerButton>
          </div>

          {/* 4. MOBILE / TABLET CONTROLS */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-1.5 text-xs font-bold text-[#0B1220] [html.light_&]:text-white bg-[#F87000] hover:bg-[#FF8A24] rounded-full shadow-sm transition"
            >
              Quote
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 sm:p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-200 hover:text-white [html.light_&]:text-[#0A2540] hover:bg-white/10 [html.light_&]:hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* 5. MOBILE ACCORDION DRAWER (Scrollable, High Contrast & Responsive) */}
        {mobileOpen && (
          <div className="lg:hidden mt-3 pb-8 pt-3 border-t border-[#26344F] [html.light_&]:border-slate-200 overflow-y-auto max-h-[calc(100vh-80px)] overscroll-contain pr-1 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1">
              
              {/* Home */}
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className={`px-3.5 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-between ${
                  pathname === "/"
                    ? "bg-[#2F7DE1]/15 text-[#2F7DE1] font-bold"
                    : "text-slate-200 [html.light_&]:text-[#0A2540] hover:bg-white/5 [html.light_&]:hover:bg-slate-100"
                }`}
              >
                <span>Home</span>
                {pathname === "/" && <span className="w-1.5 h-1.5 rounded-full bg-[#2F7DE1]" />}
              </Link>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold rounded-xl transition ${
                    pathname.startsWith("/services") || pathname.startsWith("/service")
                      ? "text-[#2F7DE1] bg-[#2F7DE1]/10 font-bold"
                      : "text-slate-200 [html.light_&]:text-[#0A2540] hover:bg-white/5 [html.light_&]:hover:bg-slate-100"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>Services</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-mono">
                      {SERVICES.length}
                    </span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      servicesOpen ? "rotate-180 text-[#2F7DE1]" : ""
                    }`}
                  />
                </button>

                {servicesOpen && (
                  <div className="pl-3 pr-2 py-2 space-y-1 bg-[#101A2E]/70 [html.light_&]:bg-slate-50 rounded-xl mt-1 border-l-2 border-[#2F7DE1] ml-2">
                    <Link
                      href="/services"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs font-bold text-[#2F7DE1] hover:underline"
                    >
                      <span>All Services Overview</span>
                      <ArrowRight size={13} />
                    </Link>
                    {SERVICES.map((s) => (
                      <Link
                        key={s.id}
                        href={`/services/${s.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-xs text-slate-300 [html.light_&]:text-[#40484C] hover:text-white [html.light_&]:hover:text-[#0A2540] rounded-lg transition"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{s.title}</span>
                          {s.startingPrice && s.startingPrice.includes("₹") && (
                            <span className="ml-1.5 text-[10px] text-[#F87000] font-semibold">
                              {s.startingPrice.replace("Starting from ", "from ")}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Products */}
              <Link
                href="/products"
                onClick={() => setMobileOpen(false)}
                className={`px-3.5 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-between ${
                  pathname.startsWith("/products") || pathname.startsWith("/product")
                    ? "bg-[#2F7DE1]/15 text-[#2F7DE1] font-bold"
                    : "text-slate-200 [html.light_&]:text-[#0A2540] hover:bg-white/5 [html.light_&]:hover:bg-slate-100"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>Products</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-orange-500/10 text-[#F87000] font-mono">
                    Turnkey
                  </span>
                </span>
                {pathname.startsWith("/products") && <span className="w-1.5 h-1.5 rounded-full bg-[#2F7DE1]" />}
              </Link>

              {/* Projects */}
              <Link
                href="/projects"
                onClick={() => setMobileOpen(false)}
                className={`px-3.5 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-between ${
                  pathname.startsWith("/projects")
                    ? "bg-[#2F7DE1]/15 text-[#2F7DE1] font-bold"
                    : "text-slate-200 [html.light_&]:text-[#0A2540] hover:bg-white/5 [html.light_&]:hover:bg-slate-100"
                }`}
              >
                <span>Projects</span>
                {pathname.startsWith("/projects") && <span className="w-1.5 h-1.5 rounded-full bg-[#2F7DE1]" />}
              </Link>

              {/* Mobile About & Portfolio Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setAboutOpen(!aboutOpen)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold rounded-xl transition ${
                    pathname.startsWith("/about") || pathname.startsWith("/portfolio")
                      ? "text-[#2F7DE1] bg-[#2F7DE1]/10 font-bold"
                      : "text-slate-200 [html.light_&]:text-[#0A2540] hover:bg-white/5 [html.light_&]:hover:bg-slate-100"
                  }`}
                >
                  <span>About &amp; Portfolio</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      aboutOpen ? "rotate-180 text-[#2F7DE1]" : ""
                    }`}
                  />
                </button>
                {aboutOpen && (
                  <div className="pl-3 pr-2 py-2 space-y-1 bg-[#101A2E]/70 [html.light_&]:bg-slate-50 rounded-xl mt-1 border-l-2 border-[#2F7DE1] ml-2">
                    <Link
                      href="/about"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs text-slate-300 [html.light_&]:text-[#40484C] hover:text-white rounded"
                    >
                      <span>About Us</span>
                      <span className="text-[10px] text-blue-400 font-medium">Agency</span>
                    </Link>
                    <Link
                      href="/portfolio"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs text-slate-300 [html.light_&]:text-[#40484C] hover:text-white rounded"
                    >
                      <span>Engineering Portfolio</span>
                      <span className="text-[10px] text-[#F87000] font-medium">Live Systems</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Pricing */}
              <Link
                href="/pricing"
                onClick={() => setMobileOpen(false)}
                className={`px-3.5 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-between ${
                  pathname === "/pricing"
                    ? "bg-[#2F7DE1]/15 text-[#2F7DE1] font-bold"
                    : "text-slate-200 [html.light_&]:text-[#0A2540] hover:bg-white/5 [html.light_&]:hover:bg-slate-100"
                }`}
              >
                <span>Pricing</span>
                {pathname === "/pricing" && <span className="w-1.5 h-1.5 rounded-full bg-[#2F7DE1]" />}
              </Link>

              {/* Process */}
              <Link
                href="/process"
                onClick={() => setMobileOpen(false)}
                className={`px-3.5 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-between ${
                  pathname === "/process"
                    ? "bg-[#2F7DE1]/15 text-[#2F7DE1] font-bold"
                    : "text-slate-200 [html.light_&]:text-[#0A2540] hover:bg-white/5 [html.light_&]:hover:bg-slate-100"
                }`}
              >
                <span>Process</span>
                {pathname === "/process" && <span className="w-1.5 h-1.5 rounded-full bg-[#2F7DE1]" />}
              </Link>

              {/* Blog */}
              <Link
                href="/blog"
                onClick={() => setMobileOpen(false)}
                className={`px-3.5 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-between ${
                  pathname.startsWith("/blog")
                    ? "bg-[#2F7DE1]/15 text-[#2F7DE1] font-bold"
                    : "text-slate-200 [html.light_&]:text-[#0A2540] hover:bg-white/5 [html.light_&]:hover:bg-slate-100"
                }`}
              >
                <span>Blog</span>
                {pathname.startsWith("/blog") && <span className="w-1.5 h-1.5 rounded-full bg-[#2F7DE1]" />}
              </Link>

              {/* Careers */}
              <Link
                href="/careers"
                onClick={() => setMobileOpen(false)}
                className={`px-3.5 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-between ${
                  pathname.startsWith("/careers")
                    ? "bg-[#2F7DE1]/15 text-[#2F7DE1] font-bold"
                    : "text-slate-200 [html.light_&]:text-[#0A2540] hover:bg-white/5 [html.light_&]:hover:bg-slate-100"
                }`}
              >
                <span>Careers</span>
                {pathname.startsWith("/careers") && <span className="w-1.5 h-1.5 rounded-full bg-[#2F7DE1]" />}
              </Link>

              {/* FAQ */}
              <Link
                href="/faq"
                onClick={() => setMobileOpen(false)}
                className={`px-3.5 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-between ${
                  pathname === "/faq"
                    ? "bg-[#2F7DE1]/15 text-[#2F7DE1] font-bold"
                    : "text-slate-200 [html.light_&]:text-[#0A2540] hover:bg-white/5 [html.light_&]:hover:bg-slate-100"
                }`}
              >
                <span>FAQ</span>
                {pathname === "/faq" && <span className="w-1.5 h-1.5 rounded-full bg-[#2F7DE1]" />}
              </Link>

              {/* Sitemap */}
              <Link
                href="/sitemap"
                onClick={() => setMobileOpen(false)}
                className={`px-3.5 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-between ${
                  pathname === "/sitemap"
                    ? "bg-[#2F7DE1]/15 text-[#2F7DE1] font-bold"
                    : "text-slate-200 [html.light_&]:text-[#0A2540] hover:bg-white/5 [html.light_&]:hover:bg-slate-100"
                }`}
              >
                <span>Sitemap</span>
                {pathname === "/sitemap" && <span className="w-1.5 h-1.5 rounded-full bg-[#2F7DE1]" />}
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className={`px-3.5 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-between ${
                  pathname === "/contact"
                    ? "bg-[#2F7DE1]/15 text-[#2F7DE1] font-bold"
                    : "text-slate-200 [html.light_&]:text-[#0A2540] hover:bg-white/5 [html.light_&]:hover:bg-slate-100"
                }`}
              >
                <span>Contact</span>
                {pathname === "/contact" && <span className="w-1.5 h-1.5 rounded-full bg-[#2F7DE1]" />}
              </Link>
            </div>

            {/* Bottom Mobile Action Buttons */}
            <div className="mt-5 pt-4 border-t border-[#26344F] [html.light_&]:border-slate-200 space-y-2.5">
              <a
                href={`tel:${COMPANY.phone}`}
                className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-200 [html.light_&]:text-[#0A2540] px-4 py-3 rounded-xl bg-white/5 [html.light_&]:bg-slate-100 border border-[#26344F] [html.light_&]:border-slate-300"
              >
                <Phone size={15} className="text-[#2F7DE1]" />
                <span>Call {COMPANY.phoneDisplay}</span>
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-[#0B1220] [html.light_&]:text-white bg-[#F87000] hover:bg-[#FF8A24] rounded-xl shadow-lg shadow-orange-500/20 active:scale-[0.99] transition"
              >
                <span>Start Your Project</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
