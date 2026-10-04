import Navbar from './Navbar';
import Footer from './Footer';
import BackgroundMesh from './BackgroundMesh';
import Link from 'next/link';
import { MessageSquare, ArrowUpRight } from 'lucide-react';

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#060D1A] text-slate-100 selection:bg-blue-600/40 selection:text-white">
      {/* Background Animated Gradient Orbs and Futuristic Grid */}
      <BackgroundMesh />

      {/* Main Glass Header */}
      <Navbar />

      {/* Content Area */}
      <main id="main-content" className="relative z-10 flex-1" role="main">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Quick Project Enquiry Pill (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40">
        <Link
          href="/contact"
          className="group flex items-center gap-2.5 rounded-full border border-white/20 bg-[#0A192F]/80 px-4 py-2.5 shadow-[0_12px_36px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-blue-400/50 hover:bg-[#0E2442]/90 hover:shadow-[0_0_30px_rgba(0,102,255,0.4)]"
          aria-label="Quick Project Enquiry"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500" />
          </span>
          <span className="text-xs font-semibold text-white">Let&apos;s Talk</span>
          <ArrowUpRight size={14} className="text-blue-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
