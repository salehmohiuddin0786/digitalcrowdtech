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
} from "lucide-react";
import { COMPANY } from "../data/company";
import { SERVICES } from "../data/services";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Portfolio", href: "/portfolio" },
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

  return (
    <footer className="bg-[#0B1220] [html.light_&]:bg-[#F4F7FB] text-[#C5CEDD] [html.light_&]:text-[#40484C] border-t border-[#26344F] [html.light_&]:border-slate-200 pt-16 pb-12 font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#26344F] [html.light_&]:border-slate-200">
          
          {/* Brand & Description (2 cols on large screen) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1 shadow-md shadow-blue-500/10 border border-slate-200">
                <Image
                  src="/logo.png"
                  alt="Digital Crowd Technologies Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight transition-colors">
                  <span className="text-[#2F7DE1]">Digital</span> <span className="text-[#F87000]">Crowd</span> <span className="text-white [html.light_&]:text-[#40484C]">Technologies</span>
                </span>
                <span className="text-xs font-semibold text-[#F87000] tracking-wide">
                  {COMPANY.tagline}
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Web development and software solutions for businesses and organizations. We build modern digital solutions using reliable frontend, backend and database technologies, from business websites to complete custom web applications.
            </p>

            <div className="pt-1 flex flex-wrap gap-2 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/5">
                <CheckCircle2 size={12} className="text-blue-400" />
                Frontend + Backend + DB
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/5">
                <CheckCircle2 size={12} className="text-cyan-400" />
                APIs & Deployment
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/5">
                <CheckCircle2 size={12} className="text-emerald-400" />
                Zero Fake Claims
              </span>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center space-x-3">
              <a
                href={COMPANY.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-blue-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors duration-200"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={COMPANY.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors duration-200"
              >
                <Github size={16} />
              </a>
              <a
                href={COMPANY.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-pink-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors duration-200"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-150 inline-block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="space-y-2 text-sm">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-150 inline-block py-0.5"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5 text-slate-400">
                <MapPin size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {COMPANY.address}
                </span>
              </div>
              <div>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="flex items-center gap-2.5 text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <Phone size={16} className="text-blue-400 shrink-0" />
                  <span>{COMPANY.phoneDisplay}</span>
                </a>
              </div>
              <div>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-2.5 text-slate-400 hover:text-blue-400 transition-colors break-all"
                >
                  <Mail size={16} className="text-blue-400 shrink-0" />
                  <span>{COMPANY.email}</span>
                </a>
              </div>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300"
                >
                  <span>Open Contact Form</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Local Services Bar */}
        <div className="py-6 border-b border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <span className="font-medium text-slate-400">Serving Hyderabad & Businesses Across India:</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {localPages.map((lp) => (
              <Link key={lp.href} href={lp.href} className="hover:text-slate-300 transition-colors">
                {lp.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-slate-300 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/admin" className="text-slate-600 hover:text-slate-400 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
