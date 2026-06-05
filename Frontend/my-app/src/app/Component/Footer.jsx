"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  ChevronRight,
  Circle,
  Code,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { label: "Facebook", href: "#", icon: Facebook },
    { label: "Twitter", href: "#", icon: Twitter },
    { label: "LinkedIn", href: "#", icon: Linkedin },
    { label: "Instagram", href: "https://www.instagram.com/digitalcrowd2021/", icon: Instagram },
  ];
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/service" },
    { label: "Portfolio", href: "/projects" },
    { label: "Career", href: "/career" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-200 pt-16 pb-8 px-4 md:px-8 font-sans">
      {/* Main footer container */}
      <div className="max-w-7xl mx-auto">
        {/* Top section with 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-gray-700/50">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-11 h-11 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30 overflow-hidden bg-white">
                <Image
                  src="/logo.png"
                  alt="DigitalCrowdTech logo"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                DigitalCrowdTech
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Crafting digital excellence with modern web development, innovative design, and scalable solutions that drive business growth.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="social-icon w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  <Icon size={16} strokeWidth={2.2} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-0.5 after:bg-blue-500 after:rounded-full">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group">
                    <ChevronRight size={12} className="text-blue-500 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-0.5 after:bg-blue-500 after:rounded-full">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {[
                "Web Development",
                "Mobile App Development",
                "UI/UX Design",
                "Cloud Solutions",
                "SEO & Marketing",
                "IT Consulting",
              ].map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group">
                    <Circle size={6} fill="currentColor" className="text-blue-500 group-hover:scale-125 transition-transform" aria-hidden="true" />
                    <span>{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-0.5 after:bg-blue-500 after:rounded-full">
              Contact Us
            </h3>
            <div className="space-y-4">
              {/* Address with icon */}
              <div className="flex gap-3 group">
                <div className="mt-1 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                  <MapPin size={16} className="text-blue-400 group-hover:text-white" aria-hidden="true" />
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Unit No 203, 2nd Floor Suite No.806, SBR CV Towers, Madhapur, Hyderabad – TG
                </p>
              </div>
              {/* Phone */}
              <div className="flex gap-3 group">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                  <Phone size={16} className="text-blue-400 group-hover:text-white" aria-hidden="true" />
                </div>
                <a href="tel:+919985960692" className="text-gray-400 hover:text-blue-400 transition">
                  +91 9985960692
                </a>
              </div>
              {/* Email */}
              <div className="flex gap-3 group">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                  <Mail size={16} className="text-blue-400 group-hover:text-white" aria-hidden="true" />
                </div>
                <a href="mailto:support@digitalcrowdtech.in" className="text-gray-400 hover:text-blue-400 transition break-all">
                  support@digitalcrowdtech.in
                </a>
              </div>
              {/* Social Handle - digitalcrowdtech */}
              <div className="flex gap-3 group">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                  <Instagram size={16} className="text-blue-400 group-hover:text-white" aria-hidden="true" />
                </div>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                  @digitalcrowdtech
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section with Newsletter */}
        <div className="py-10 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray-700/50">
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold text-lg">Let&apos;s Build Something Great Together</h4>
            <p className="text-gray-400 text-sm mt-1">Subscribe to get updates on latest trends & exclusive offers.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-5 py-3 rounded-full bg-gray-800 border border-gray-700 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium shadow-lg shadow-blue-600/30 transition-all duration-300 transform hover:scale-[1.02]">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Bar - Copyright + Legal + micro brand */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="flex flex-wrap justify-center gap-4">
            <span>© {currentYear} DigitalCrowdTech. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition">Cookie Policy</a>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <span>Web Development Excellence</span>
            <Code size={12} className="text-blue-500 mx-1" aria-hidden="true" />
            <span>by DEW</span>
          </div>
        </div>
      </div>
      
      {/* optional back to top button - nice touch */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-10 h-10 rounded-full shadow-lg shadow-blue-600/40 flex items-center justify-center hover:bg-blue-500 transition-all duration-200 z-50 opacity-80 hover:opacity-100"
        aria-label="Back to top"
      >
        <ArrowUp size={16} aria-hidden="true" />
      </button>
    </footer>
  );
};

export default Footer;
