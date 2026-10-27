"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Phone,
  Briefcase,
  Layers,
  Sparkles,
  MapPin,
  Search,
  Mic,
  SlidersHorizontal,
  User,
  ShoppingBag,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { COMPANY } from "../data/company";
import { SERVICES } from "../data/services";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const servicesDropdownRef = useRef(null);
  const aboutDropdownRef = useRef(null);

  // Close mobile and dropdown menus on navigation
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setServicesOpen(false);
    setAboutOpen(false);
  }

  // Handle outside click for dropdown menus
  useEffect(() => {
    function handleClickOutside(event) {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target)) {
        setAboutOpen(false);
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase().trim();
    if (q.includes("product") || q.includes("ruchi") || q.includes("erp") || q.includes("school")) {
      router.push(`/products?q=${encodeURIComponent(q)}`);
    } else if (q.includes("price") || q.includes("cost") || q.includes("quote")) {
      router.push(`/pricing`);
    } else if (q.includes("contact") || q.includes("hire") || q.includes("reach")) {
      router.push(`/contact`);
    } else {
      router.push(`/services?q=${encodeURIComponent(q)}`);
    }
  };

  const navLinks = [
    { name: "Services", href: "/services", dropdownType: "services" },
    { name: "Products", href: "/products", badge: "Turnkey" },
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
    <header className="sticky top-0 z-50 flex flex-col font-sans transition-all duration-300 shadow-md">
      {/* 1. TOP PETROL BLUE ANNOUNCEMENT & LOCATION BAR (Screenshot 1 Reference) */}
      <div className="bg-[#567785] text-white py-2 px-4 sm:px-6 lg:px-8 border-b border-[#476673] select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
          
          {/* Location Delivery Indicator with dashed underline matching reference */}
          <div className="flex items-center gap-1.5 truncate">
            <MapPin size={14} className="text-[#E89228] shrink-0" />
            <span className="text-white/80 hidden sm:inline">Operating Base:</span>
            <span className="font-semibold text-white border-b border-dashed border-white/70 hover:border-white cursor-pointer transition-colors">
              Madhapur, Hyderabad, TS (Serving Pan-India)
            </span>
          </div>

          {/* Center Announcement on larger screens */}
          <div className="hidden md:flex items-center gap-2 text-white/90">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#27AE60] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#27AE60]" />
            </span>
            <span className="font-medium">Direct Engineering Support &amp; Deployment</span>
          </div>

          {/* Right Direct Call & Profile Avatar matching Screenshot 1 */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${COMPANY.phone}`}
              className="flex items-center gap-1.5 text-white/95 hover:text-white font-bold transition-colors"
              title="Call Direct Support"
            >
              <Phone size={13} className="text-[#E89228]" />
              <span className="hidden xs:inline">{COMPANY.phoneDisplay}</span>
            </a>
            <div className="h-3 w-px bg-white/30 hidden sm:block" />
            <Link
              href="/contact"
              className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 flex items-center justify-center text-white transition-transform active:scale-95"
              title="Contact / Profile"
              aria-label="User Profile"
            >
              <User size={13} />
            </Link>
          </div>

        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div
        className={`bg-white [html.dark_&]:bg-[#101B2A] border-b border-slate-200 [html.dark_&]:border-[#22344D] transition-all duration-200 ${
          scrolled ? "py-2.5 shadow-sm" : "py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            
            {/* BRAND LOGO */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group shrink-0 focus:outline-none"
              aria-label="Digital Crowd Technologies Home"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white flex items-center justify-center p-1 shadow-sm border border-slate-200 transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Digital Crowd Technologies Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col leading-tight">
                <div className="text-base sm:text-lg font-black tracking-tight text-[#1E293B] [html.dark_&]:text-white">
                  <span className="text-[#567785] [html.dark_&]:text-[#6D8E9D]">Digital</span>
                  <span className="text-[#E89228]">Crowd</span>{" "}
                  <span className="text-[#1E293B] [html.dark_&]:text-white">Tech</span>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-[10px] text-slate-500 [html.dark_&]:text-slate-400 font-semibold tracking-wider uppercase">
                  <span>Web &amp; Software Agency</span>
                </div>
              </div>
            </Link>

            {/* WHITE PILL SEARCH BAR (Screenshot 1 Reference) */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex flex-1 max-w-md relative items-center"
              role="search"
            >
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search size={15} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search services, turnkey apps, ERPs, stack..."
                  className="w-full pl-9 pr-10 py-2 text-xs rounded-full bg-slate-100/90 [html.dark_&]:bg-[#182638] text-slate-800 [html.dark_&]:text-slate-100 placeholder-slate-400 border border-slate-300 [html.dark_&]:border-[#2A3E59] focus:outline-none focus:border-[#567785] focus:bg-white [html.dark_&]:focus:bg-[#152232] shadow-inner transition-all"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-[#E89228] transition-colors"
                  aria-label="Submit Search"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>

            {/* DESKTOP NAVIGATION LINKS */}
            <nav
              className="hidden xl:flex items-center gap-1"
              aria-label="Main Navigation"
            >
              {navLinks.map((item) => {
                const active = isLinkActive(item);

                // Services Dropdown
                if (item.dropdownType === "services") {
                  return (
                    <div
                      key={item.name}
                      ref={servicesDropdownRef}
                      className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-150 ${
                          active
                            ? "bg-[#567785] text-white shadow-sm"
                            : "text-slate-700 [html.dark_&]:text-slate-200 hover:text-[#567785] [html.dark_&]:hover:text-white hover:bg-slate-100 [html.dark_&]:hover:bg-slate-800"
                        }`}
                        aria-expanded={servicesOpen}
                        aria-haspopup="true"
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
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-84 z-50 animate-in fade-in zoom-in-95 duration-150">
                          <div className="bg-white [html.dark_&]:bg-[#152232] border border-slate-200 [html.dark_&]:border-[#26344F] rounded-2xl shadow-xl p-2.5">
                            <div className="px-3 py-2 border-b border-slate-100 [html.dark_&]:border-slate-800 mb-1 flex items-center justify-between">
                              <span className="text-[11px] font-extrabold text-[#567785] [html.dark_&]:text-[#6D8E9D] uppercase tracking-wider">
                                All Services
                              </span>
                              <span className="text-[10px] text-[#27AE60] font-bold bg-[#E8F8EE] [html.dark_&]:bg-[#27AE60]/20 px-2 py-0.5 rounded-full">
                                6 Core Offerings
                              </span>
                            </div>
                            {SERVICES.map((service) => (
                              <Link
                                key={service.id}
                                href={`/services/${service.slug}`}
                                onClick={() => setServicesOpen(false)}
                                className="group block px-3 py-2 rounded-xl hover:bg-slate-50 [html.dark_&]:hover:bg-slate-800/60 transition-colors"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-slate-800 [html.dark_&]:text-slate-100 group-hover:text-[#567785] transition-colors">
                                    {service.title}
                                  </span>
                                  {service.startingPrice && service.startingPrice.includes("₹") && (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF3E0] text-[#E89228] border border-[#FFD099]">
                                      {service.startingPrice.replace("Starting from ", "From ")}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 [html.dark_&]:text-slate-400 line-clamp-1 mt-0.5">
                                  {service.summary}
                                </p>
                              </Link>
                            ))}
                            <div className="pt-2 mt-1 border-t border-slate-100 [html.dark_&]:border-slate-800">
                              <Link
                                href="/services"
                                onClick={() => setServicesOpen(false)}
                                className="flex items-center justify-between px-3 py-1.5 text-xs font-bold text-[#567785] hover:text-[#415C68] rounded-lg hover:bg-slate-50 [html.dark_&]:hover:bg-slate-800 transition-colors"
                              >
                                <span>Browse All Services &amp; Packages</span>
                                <ArrowRight size={13} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                // About Dropdown
                if (item.dropdownType === "about") {
                  return (
                    <div
                      key={item.name}
                      ref={aboutDropdownRef}
                      className="relative"
                      onMouseEnter={() => setAboutOpen(true)}
                      onMouseLeave={() => setAboutOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => setAboutOpen(!aboutOpen)}
                        className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-150 ${
                          active
                            ? "bg-[#567785] text-white shadow-sm"
                            : "text-slate-700 [html.dark_&]:text-slate-200 hover:text-[#567785] [html.dark_&]:hover:text-white hover:bg-slate-100 [html.dark_&]:hover:bg-slate-800"
                        }`}
                        aria-expanded={aboutOpen}
                        aria-haspopup="true"
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
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-76 z-50 animate-in fade-in zoom-in-95 duration-150">
                          <div className="bg-white [html.dark_&]:bg-[#152232] border border-slate-200 [html.dark_&]:border-[#26344F] rounded-2xl shadow-xl p-2.5 space-y-1">
                            <Link
                              href="/about"
                              onClick={() => setAboutOpen(false)}
                              className="group block px-3 py-2.5 rounded-xl hover:bg-slate-50 [html.dark_&]:hover:bg-slate-800 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-800 [html.dark_&]:text-slate-100 group-hover:text-[#567785] transition-colors">
                                  About Us
                                </span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                  Agency
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 [html.dark_&]:text-slate-400 line-clamp-1 mt-0.5">
                                Leadership team, engineering ethos &amp; Hyderabad roots.
                              </p>
                            </Link>

                            <Link
                              href="/portfolio"
                              onClick={() => setAboutOpen(false)}
                              className="group block px-3 py-2.5 rounded-xl hover:bg-slate-50 [html.dark_&]:hover:bg-slate-800 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-800 [html.dark_&]:text-slate-100 group-hover:text-[#E89228] transition-colors">
                                  Engineering Portfolio
                                </span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF3E0] text-[#E89228] border border-[#FFD099]">
                                  Live Demos
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 [html.dark_&]:text-slate-400 line-clamp-1 mt-0.5">
                                Ruchi Bazzar, School ERP &amp; full architecture.
                              </p>
                            </Link>
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
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-150 ${
                      active
                        ? "bg-[#567785] text-white shadow-sm"
                        : "text-slate-700 [html.dark_&]:text-slate-200 hover:text-[#567785] [html.dark_&]:hover:text-white hover:bg-slate-100 [html.dark_&]:hover:bg-slate-800"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-[#E89228] text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT ACTION CONTROLS */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <ThemeToggle />

              {/* Primary Call-to-Action in Screenshot Warm Orange (#E89228) */}
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#E89228] hover:bg-[#D78119] rounded-lg shadow-sm hover:shadow transition-all duration-150 transform active:scale-95"
              >
                <span>Get a Quote</span>
                <ArrowRight size={13} />
              </Link>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="xl:hidden p-2 rounded-lg text-slate-600 [html.dark_&]:text-slate-200 hover:bg-slate-100 [html.dark_&]:hover:bg-slate-800 transition"
                aria-label="Toggle Navigation Menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>

          {/* MOBILE SEARCH BAR (Visible on smaller screens) */}
          <div className="mt-3 md:hidden">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={14} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services, products, tech..."
                className="w-full pl-8 pr-8 py-1.5 text-xs rounded-full bg-slate-100 [html.dark_&]:bg-[#182638] text-slate-800 [html.dark_&]:text-slate-100 placeholder-slate-400 border border-slate-300 [html.dark_&]:border-[#2A3E59] focus:outline-none focus:border-[#567785]"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400"
                aria-label="Search"
              >
                <ArrowRight size={13} />
              </button>
            </form>
          </div>
        </div>

        {/* 3. MOBILE ACCORDION DRAWER */}
        {mobileOpen && (
          <div className="xl:hidden mt-3 px-4 pt-3 pb-6 border-t border-slate-200 [html.dark_&]:border-[#22344D] bg-white [html.dark_&]:bg-[#101B2A] animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 text-xs font-bold rounded-lg ${
                  pathname === "/"
                    ? "bg-[#567785] text-white"
                    : "text-slate-700 [html.dark_&]:text-slate-200 hover:bg-slate-100 [html.dark_&]:hover:bg-slate-800"
                }`}
              >
                Home
              </Link>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-slate-700 [html.dark_&]:text-slate-200 rounded-lg hover:bg-slate-100 [html.dark_&]:hover:bg-slate-800"
                >
                  <span>Services</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {servicesOpen && (
                  <div className="pl-3 pr-2 py-1.5 space-y-1 bg-slate-50 [html.dark_&]:bg-slate-900/60 rounded-xl mt-1 border-l-2 border-[#567785] ml-2">
                    <Link
                      href="/services"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-xs font-bold text-[#567785]"
                    >
                      All Services Overview →
                    </Link>
                    {SERVICES.map((s) => (
                      <Link
                        key={s.id}
                        href={`/services/${s.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-1.5 text-xs text-slate-600 [html.dark_&]:text-slate-300 hover:text-slate-900 rounded"
                      >
                        {s.title}
                        {s.startingPrice && s.startingPrice.includes("₹") && (
                          <span className="ml-1.5 text-[10px] text-[#E89228] font-bold">
                            ({s.startingPrice.replace("Starting from ", "from ")})
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/products"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2 text-xs font-bold rounded-lg ${
                  pathname.startsWith("/products")
                    ? "bg-[#567785] text-white"
                    : "text-slate-700 [html.dark_&]:text-slate-200 hover:bg-slate-100 [html.dark_&]:hover:bg-slate-800"
                }`}
              >
                <span>Products</span>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-[#E89228] text-white">
                  Turnkey
                </span>
              </Link>

              <Link
                href="/projects"
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 text-xs font-bold rounded-lg ${
                  pathname.startsWith("/projects")
                    ? "bg-[#567785] text-white"
                    : "text-slate-700 [html.dark_&]:text-slate-200 hover:bg-slate-100 [html.dark_&]:hover:bg-slate-800"
                }`}
              >
                Projects
              </Link>

              <Link
                href="/portfolio"
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 text-xs font-bold rounded-lg ${
                  pathname === "/portfolio"
                    ? "bg-[#567785] text-white"
                    : "text-slate-700 [html.dark_&]:text-slate-200 hover:bg-slate-100 [html.dark_&]:hover:bg-slate-800"
                }`}
              >
                Engineering Portfolio
              </Link>

              <Link
                href="/pricing"
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 text-xs font-bold rounded-lg ${
                  pathname === "/pricing"
                    ? "bg-[#567785] text-white"
                    : "text-slate-700 [html.dark_&]:text-slate-200 hover:bg-slate-100 [html.dark_&]:hover:bg-slate-800"
                }`}
              >
                Pricing
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 text-xs font-bold rounded-lg ${
                  pathname === "/about"
                    ? "bg-[#567785] text-white"
                    : "text-slate-700 [html.dark_&]:text-slate-200 hover:bg-slate-100 [html.dark_&]:hover:bg-slate-800"
                }`}
              >
                About Us
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 text-xs font-bold rounded-lg ${
                  pathname === "/contact"
                    ? "bg-[#567785] text-white"
                    : "text-slate-700 [html.dark_&]:text-slate-200 hover:bg-slate-100 [html.dark_&]:hover:bg-slate-800"
                }`}
              >
                Contact
              </Link>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 [html.dark_&]:border-slate-800 space-y-2">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-white bg-[#E89228] hover:bg-[#D78119] rounded-lg shadow-sm"
              >
                <span>Request Project Proposal</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
