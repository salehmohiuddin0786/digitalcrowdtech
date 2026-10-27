"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Package, MessageCircle, FileText } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";
import BackgroundMesh from "./BackgroundMesh";
import { COMPANY } from "../data/company";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <div className="min-h-screen bg-[#07090E] text-slate-100">{children}</div>;
  }

  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    COMPANY.whatsappPrefill
  )}`;

  const navTabs = [
    { name: "Home", href: "/", icon: Home, isActive: pathname === "/" },
    {
      name: "Services",
      href: "/services",
      icon: LayoutGrid,
      isActive: pathname.startsWith("/services") || pathname.startsWith("/service"),
    },
    {
      name: "Products",
      href: "/products",
      icon: Package,
      isActive: pathname.startsWith("/products") || pathname.startsWith("/product"),
    },
    {
      name: "Pricing",
      href: "/pricing",
      icon: FileText,
      isActive: pathname.startsWith("/pricing"),
    },
    {
      name: "WhatsApp",
      href: whatsappUrl,
      icon: MessageCircle,
      isExternal: true,
      badge: "Fast",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-[#0C131D] [html.light_&]:bg-[#F5F6F8] text-slate-100 [html.light_&]:text-[#1E293B] selection:bg-[#E89228] selection:text-white overflow-x-hidden">
      <BackgroundMesh />
      <Header />
      <main className="relative z-10 flex-1 flex flex-col pb-16 md:pb-0">{children}</main>
      <WhatsAppFloat />
      <Footer />

      {/* 4-5 TAB MOBILE BOTTOM NAVIGATION BAR (Screenshot 1 & 2 Reference) */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 [html.dark_&]:bg-[#101B2A]/95 backdrop-blur-md border-t border-slate-200 [html.dark_&]:border-[#22344D] px-2 py-1.5 flex items-center justify-around shadow-lg"
        aria-label="Mobile Bottom Navigation"
      >
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          if (tab.isExternal) {
            return (
              <a
                key={tab.name}
                href={tab.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center py-1 px-2 text-[10px] font-bold text-[#25D366] hover:text-[#20BD5A] transition-colors relative"
              >
                <div className="relative">
                  <Icon size={19} />
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 text-[8px] bg-[#25D366] text-white font-extrabold rounded-full">
                    {tab.badge}
                  </span>
                </div>
                <span className="mt-0.5">{tab.name}</span>
              </a>
            );
          }

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex flex-col items-center justify-center py-1 px-2 text-[10px] font-bold transition-all relative ${
                tab.isActive
                  ? "text-[#567785] [html.dark_&]:text-[#6D8E9D]"
                  : "text-slate-500 [html.dark_&]:text-slate-400 hover:text-slate-900"
              }`}
            >
              <div className="relative">
                <Icon size={19} className={tab.isActive ? "text-[#567785] [html.dark_&]:text-[#6D8E9D]" : ""} />
                {tab.isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#E89228]" />
                )}
              </div>
              <span className="mt-0.5">{tab.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
