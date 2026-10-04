"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";
import BackgroundMesh from "./BackgroundMesh";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <div className="min-h-screen bg-[#07090E] text-slate-100">{children}</div>;
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[#07090E] [html.light_&]:bg-[#F8FAFC] text-slate-100 [html.light_&]:text-[#1E293B] selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <BackgroundMesh />
      <Header />
      <main className="relative z-10 flex-1 flex flex-col">{children}</main>
      <WhatsAppFloat />
      <Footer />
    </div>
  );
}
