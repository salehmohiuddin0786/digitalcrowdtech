"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <div className="min-h-screen bg-[#07090E] text-slate-100">{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#07090E] text-slate-100 selection:bg-blue-600 selection:text-white">
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      <WhatsAppFloat />
      <Footer />
    </div>
  );
}
