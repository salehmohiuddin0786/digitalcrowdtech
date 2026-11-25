import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Package, Home, HelpCircle } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | Digital Crowd Technologies",
  description: "The requested page or digital product could not be located.",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-transparent text-slate-100">
      <div className="max-w-xl w-full p-8 sm:p-12 rounded-3xl glass-card-premium border border-white/10 shadow-2xl text-center relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 blur-[80px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 blur-[80px] pointer-events-none rounded-full" />

        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 mx-auto mb-6">
          <AlertCircle size={32} />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/5 border border-white/10 text-slate-400 mb-3">
          Error 404
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
          Product or Page Not Found
        </h1>

        <p className="text-sm text-slate-300 leading-relaxed mb-8 max-w-md mx-auto">
          The requested URL does not match any active digital product, service, or article in our directory. Please check the address or explore our catalog.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/products"
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#F87000] to-orange-600 hover:from-orange-500 hover:to-orange-600 shadow-lg shadow-orange-500/20 transition inline-flex items-center gap-2"
          >
            <Package size={15} />
            <span>Explore All Products</span>
          </Link>

          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition inline-flex items-center gap-2"
          >
            <Home size={15} />
            <span>Go to Homepage</span>
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-xs text-slate-400">
          Need assistance? Email us at{" "}
          <a href="mailto:support@digitalcrowdtech.in" className="text-blue-400 hover:underline">
            support@digitalcrowdtech.in
          </a>
        </div>
      </div>
    </div>
  );
}
