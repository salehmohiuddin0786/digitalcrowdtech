"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Instagram,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { COMPANY } from "../data/company";
import { SERVICES } from "../data/services";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Turnkey Products", href: "/products" },
    { label: "Projects", href: "/projects" },
    { label: "Engineering Portfolio", href: "/portfolio" },
    { label: "Pricing", href: "/pricing" },
    { label: "Process", href: "/process" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ];

  const localPages = [
    { label: "Web Development Company in Hyderabad", href: "/web-development-company-hyderabad" },
    { label: "E-commerce Development in Hyderabad", href: "/ecommerce-development-hyderabad" },
    { label: "Custom Software Development in Hyderabad", href: "/custom-software-development-hyderabad" },
  ];

  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    COMPANY.whatsappPrefill
  )}`;

  return (
    <footer className="bg-white [html.dark_&]:bg-[#0D1520] text-slate-600 [html.dark_&]:text-slate-300 border-t border-slate-200 [html.dark_&]:border-[#22344D] pt-14 pb-12 font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-200 [html.dark_&]:border-slate-800">
          
          {/* Brand & Description (2 cols on large screen) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1 shadow-sm border border-slate-200">
                <Image
                  src="/logo.png"
                  alt="Digital Crowd Technologies Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-[#1E293B] [html.dark_&]:text-white">
                  <span className="text-[#567785] [html.dark_&]:text-[#6D8E9D]">Digital</span>{" "}
                  <span className="text-[#E89228]">Crowd</span>{" "}
                  <span>Tech</span>
                </span>
                <span className="text-xs font-bold text-[#E89228] tracking-wide">
                  {COMPANY.tagline}
                </span>
              </div>
            </Link>

            <p className="text-slate-600 [html.dark_&]:text-slate-400 text-sm leading-relaxed max-w-md">
              Professional web development, custom software engineering, and turnkey digital commerce systems for businesses and organizations across Hyderabad and India.
            </p>

            <div className="pt-1 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 [html.dark_&]:bg-slate-800 text-slate-700 [html.dark_&]:text-slate-300 border border-slate-200 [html.dark_&]:border-slate-700 font-semibold">
                <CheckCircle2 size={12} className="text-[#567785]" />
                Frontend + Backend + DB
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FFF3E0] text-[#E89228] border border-[#FFD099] font-bold">
                <CheckCircle2 size={12} className="text-[#E89228]" />
                Starting ₹4,999
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#E8F8EE] text-[#27AE60] border border-[#A9DFBF] font-bold">
                <CheckCircle2 size={12} className="text-[#27AE60]" />
                100% Code Ownership
              </span>
            </div>

            {/* Social Links & WhatsApp */}
            <div className="pt-2 flex items-center space-x-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] flex items-center justify-center text-white transition-colors duration-200 shadow-sm"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href={COMPANY.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-slate-100 [html.dark_&]:bg-slate-800 hover:bg-[#567785] text-slate-600 [html.dark_&]:text-slate-300 hover:text-white flex items-center justify-center transition-colors duration-200 border border-slate-200 [html.dark_&]:border-slate-700"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={COMPANY.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg bg-slate-100 [html.dark_&]:bg-slate-800 hover:bg-slate-900 text-slate-600 [html.dark_&]:text-slate-300 hover:text-white flex items-center justify-center transition-colors duration-200 border border-slate-200 [html.dark_&]:border-slate-700"
              >
                <Github size={16} />
              </a>
              <a
                href={COMPANY.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-slate-100 [html.dark_&]:bg-slate-800 hover:bg-pink-600 text-slate-600 [html.dark_&]:text-slate-300 hover:text-white flex items-center justify-center transition-colors duration-200 border border-slate-200 [html.dark_&]:border-slate-700"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1E293B] [html.dark_&]:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              {quickLinks.slice(0, 7).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-600 [html.dark_&]:text-slate-400 hover:text-[#567785] transition-colors duration-150 inline-block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1E293B] [html.dark_&]:text-white">
              Core Services
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-slate-600 [html.dark_&]:text-slate-400 hover:text-[#567785] transition-colors duration-150 inline-block py-0.5"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1E293B] [html.dark_&]:text-white">
              Direct Contact
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5 text-slate-600 [html.dark_&]:text-slate-400">
                <MapPin size={15} className="text-[#567785] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {COMPANY.address}
                </span>
              </div>
              <div>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="flex items-center gap-2.5 text-slate-700 [html.dark_&]:text-slate-300 font-bold hover:text-[#E89228] transition-colors"
                >
                  <Phone size={15} className="text-[#E89228] shrink-0" />
                  <span>{COMPANY.phoneDisplay}</span>
                </a>
              </div>
              <div>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-2.5 text-slate-600 [html.dark_&]:text-slate-400 hover:text-[#567785] transition-colors break-all"
                >
                  <Mail size={15} className="text-[#567785] shrink-0" />
                  <span>{COMPANY.email}</span>
                </a>
              </div>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E89228] hover:text-[#D78119]"
                >
                  <span>Request Custom Quote</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Local Services Bar */}
        <div className="py-5 border-b border-slate-200 [html.dark_&]:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <span className="font-bold text-slate-700 [html.dark_&]:text-slate-300">
            Serving Hyderabad &amp; Businesses Across India:
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {localPages.map((lp) => (
              <Link key={lp.href} href={lp.href} className="hover:text-[#567785] transition-colors">
                {lp.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-[#567785] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/admin" className="text-slate-400 hover:text-slate-600 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
