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
} from "lucide-react";
import { COMPANY } from "../data/company";
import { SERVICES } from "../data/services";
import ThemeToggle from "./ThemeToggle";
import ShimmerButton from "./ShimmerButton";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  // Close mobile and dropdown menus on navigation
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setServicesOpen(false);
  }

  // Handle outside click for services dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Streamlined primary navigation links (Home is represented by Logo to eliminate crowding)
  const navLinks = [
    { name: "Services", href: "/services", hasDropdown: true },
    { name: "Projects", href: "/projects" },
    { name: "Pricing", href: "/pricing" },
    { name: "Process", href: "/process" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
  ];

  const isLinkActive = (href, hasDropdown) => {
    if (href === "/") return pathname === "/";
    if (hasDropdown) return pathname.startsWith("/services") || pathname.startsWith("/service");
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B1220]/95 [html.light_&]:bg-white/95 backdrop-blur-md border-b border-[#26344F] [html.light_&]:border-slate-200 shadow-xl py-2.5"
          : "bg-[#0B1220]/80 [html.light_&]:bg-white/85 backdrop-blur-sm border-b border-[#26344F]/50 [html.light_&]:border-slate-200/80 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* 1. BRAND LOGO (Decongested & Sleek) */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0 focus:outline-none"
            aria-label="Digital Crowd Technologies Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white flex items-center justify-center p-1 shadow-md shadow-blue-500/10 border border-slate-200 transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Digital Crowd Technologies"
                width={36}
                height={36}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <div className="text-base sm:text-lg font-bold tracking-tight">
                <span className="text-[#2F7DE1]">Digital</span>
                <span className="text-[#F87000]">Crowd</span>{" "}
                <span className="text-white [html.light_&]:text-[#0A2540]">
                  Tech
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span>Available for Projects</span>
              </div>
            </div>
          </Link>

          {/* 2. MOTION PRIMITIVES FLOATING PILL NAVIGATION (Desktop) */}
          <nav
            className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#101A2E]/80 [html.light_&]:bg-slate-100/90 backdrop-blur-md border border-[#26344F]/70 [html.light_&]:border-slate-300/80 shadow-inner"
            aria-label="Main Navigation"
          >
            {navLinks.map((item) => {
              const active = isLinkActive(item.href, item.hasDropdown);

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.name}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                        active
                          ? "bg-[#2F7DE1] text-white shadow-sm shadow-blue-500/30"
                          : "text-slate-300 [html.light_&]:text-[#40484C] hover:text-white [html.light_&]:hover:text-[#0A2540] hover:bg-white/10 [html.light_&]:hover:bg-slate-200"
                      }`}
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Services Dropdown Menu (Motion Primitives Floating Glass Card) */}
                    {servicesOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-80 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="bg-[#0B1220]/95 [html.light_&]:bg-white/95 backdrop-blur-xl border border-[#26344F] [html.light_&]:border-slate-200 rounded-2xl shadow-2xl p-2.5">
                          <div className="px-3 py-2 border-b border-[#26344F]/60 [html.light_&]:border-slate-100 mb-1 flex items-center justify-between">
                            <span className="text-[11px] font-bold text-[#8494AD] [html.light_&]:text-[#64748B] uppercase tracking-wider">
                              Our Solutions
                            </span>
                            <span className="text-[10px] text-[#2F7DE1] font-medium flex items-center gap-1">
                              <Sparkles size={11} /> 6 Services
                            </span>
                          </div>
                          {SERVICES.map((service) => (
                            <Link
                              key={service.id}
                              href={`/services/${service.slug}`}
                              className="group block px-3 py-2 rounded-xl hover:bg-white/5 [html.light_&]:hover:bg-slate-50 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-white [html.light_&]:text-[#0A2540] group-hover:text-[#2F7DE1] transition-colors">
                                  {service.title}
                                </span>
                                {service.startingPrice && service.startingPrice.includes("₹") && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2F7DE1]/15 text-[#2F7DE1] border border-[#2F7DE1]/30">
                                    {service.startingPrice.replace("Starting from ", "From ")}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-[#8494AD] [html.light_&]:text-[#64748B] line-clamp-1 mt-0.5">
                                {service.summary}
                              </p>
                            </Link>
                          ))}
                          <div className="pt-2 mt-1 border-t border-[#26344F]/60 [html.light_&]:border-slate-100">
                            <Link
                              href="/services"
                              className="flex items-center justify-between px-3 py-1.5 text-xs font-bold text-[#2F7DE1] hover:text-[#2F7DE1]/80 rounded-lg hover:bg-[#2F7DE1]/10 transition-colors"
                            >
                              <span>Explore All Services</span>
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

          {/* 3. STREAMLINED ACTION CTAS (Desktop) */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {/* Direct Phone Call Icon Button (Decongested) */}
            <a
              href={`tel:${COMPANY.phone}`}
              className="w-8 h-8 rounded-full border border-[#26344F] [html.light_&]:border-slate-300 flex items-center justify-center text-slate-300 [html.light_&]:text-[#40484C] hover:text-[#2F7DE1] hover:border-[#2F7DE1]/50 hover:bg-[#2F7DE1]/10 transition-all duration-200"
              title={`Call directly: ${COMPANY.phoneDisplay}`}
              aria-label={`Call directly: ${COMPANY.phoneDisplay}`}
            >
              <Phone size={14} className="text-[#2F7DE1]" />
            </a>

            {/* Dark / Light Mode Switcher */}
            <ThemeToggle />

            {/* Primary Action Button with 21st.dev Shimmer effect */}
            <ShimmerButton href="/contact" className="px-4 py-2 text-xs font-bold">
              <span>Get a Quote</span>
            </ShimmerButton>
          </div>

          {/* 4. MOBILE / TABLET CONTROLS */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <Link
              href="/contact"
              className="px-3 py-1.5 text-xs font-bold text-[#0B1220] [html.light_&]:text-white bg-[#F87000] hover:bg-[#FF8A24] rounded-full shadow-sm"
            >
              Quote
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white [html.light_&]:text-[#0A2540] hover:bg-white/10 [html.light_&]:hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* 5. MOBILE ACCORDION DRAWER */}
        {mobileOpen && (
          <div className="lg:hidden mt-3 pb-6 pt-3 border-t border-[#26344F] [html.light_&]:border-slate-200 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                className={`px-3 py-2 text-sm font-semibold rounded-xl ${
                  pathname === "/"
                    ? "bg-[#2F7DE1]/15 text-[#2F7DE1]"
                    : "text-slate-200 [html.light_&]:text-[#0A2540] hover:bg-white/5"
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`px-3 py-2 text-sm font-semibold rounded-xl ${
                  pathname === "/about"
                    ? "bg-[#2F7DE1]/15 text-[#2F7DE1]"
                    : "text-slate-200 [html.light_&]:text-[#0A2540] hover:bg-white/5"
                }`}
              >
                About
              </Link>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-slate-200 [html.light_&]:text-[#0A2540] rounded-xl hover:bg-white/5"
                >
                  <span>Services</span>
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {servicesOpen && (
                  <div className="pl-3 pr-2 py-1.5 space-y-1 bg-[#101A2E]/50 [html.light_&]:bg-slate-50 rounded-xl mt-1 border-l-2 border-[#2F7DE1] ml-2">
                    <Link
                      href="/services"
                      className="block px-3 py-1.5 text-xs font-bold text-[#2F7DE1]"
                    >
                      All Services Overview →
                    </Link>
                    {SERVICES.map((s) => (
                      <Link
                        key={s.id}
                        href={`/services/${s.slug}`}
                        className="block px-3 py-1.5 text-xs text-slate-300 [html.light_&]:text-[#40484C] hover:text-white rounded"
                      >
                        {s.title}
                        {s.startingPrice && s.startingPrice.includes("₹") && (
                          <span className="ml-1.5 text-[10px] text-[#F87000] font-semibold">
                            ({s.startingPrice.replace("Starting from ", "from ")})
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/projects"
                className={`px-3 py-2 text-sm font-semibold rounded-xl ${
                  pathname.startsWith("/projects")
                    ? "bg-[#2F7DE1]/15 text-[#2F7DE1]"
                    : "text-slate-200 [html.light_&]:text-[#0A2540] hover:bg-white/5"
                }`}
              >
                Projects
              </Link>
              <Link
                href="/pricing"
                className={`px-3 py-2 text-sm font-semibold rounded-xl ${
                  pathname === "/pricing"
                    ? "bg-[#2F7DE1]/15 text-[#2F7DE1]"
                    : "text-slate-200 [html.light_&]:text-[#0A2540] hover:bg-white/5"
                }`}
              >
                Pricing
              </Link>
              <Link
                href="/process"
                className={`px-3 py-2 text-sm font-semibold rounded-xl ${
                  pathname === "/process"
                    ? "bg-[#2F7DE1]/15 text-[#2F7DE1]"
                    : "text-slate-200 [html.light_&]:text-[#0A2540] hover:bg-white/5"
                }`}
              >
                Process
              </Link>
              <Link
                href="/blog"
                className={`px-3 py-2 text-sm font-semibold rounded-xl ${
                  pathname.startsWith("/blog")
                    ? "bg-[#2F7DE1]/15 text-[#2F7DE1]"
                    : "text-slate-200 [html.light_&]:text-[#0A2540] hover:bg-white/5"
                }`}
              >
                Blog
              </Link>
              <Link
                href="/careers"
                className={`px-3 py-2 text-sm font-semibold rounded-xl ${
                  pathname.startsWith("/careers")
                    ? "bg-[#2F7DE1]/15 text-[#2F7DE1]"
                    : "text-slate-200 [html.light_&]:text-[#0A2540] hover:bg-white/5"
                }`}
              >
                Careers
              </Link>
              <Link
                href="/contact"
                className={`px-3 py-2 text-sm font-semibold rounded-xl ${
                  pathname === "/contact"
                    ? "bg-[#2F7DE1]/15 text-[#2F7DE1]"
                    : "text-slate-200 [html.light_&]:text-[#0A2540] hover:bg-white/5"
                }`}
              >
                Contact
              </Link>
            </div>

            <div className="mt-4 pt-4 border-t border-[#26344F] [html.light_&]:border-slate-200 space-y-2.5">
              <a
                href={`tel:${COMPANY.phone}`}
                className="flex items-center gap-2 text-xs font-semibold text-slate-300 [html.light_&]:text-[#0A2540] px-3.5 py-2.5 rounded-xl bg-white/5 [html.light_&]:bg-slate-100 border border-[#26344F] [html.light_&]:border-slate-300"
              >
                <Phone size={14} className="text-[#2F7DE1]" />
                <span>Call {COMPANY.phoneDisplay}</span>
              </a>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3 text-sm font-bold text-[#0B1220] [html.light_&]:text-white bg-[#F87000] hover:bg-[#FF8A24] rounded-xl shadow-lg shadow-orange-500/20"
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
