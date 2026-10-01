import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShoppingBag, Truck, MapPin, CreditCard, ShieldCheck } from "lucide-react";
import SectionHeading from "../Component/SectionHeading";
import { COMPANY } from "../data/company";

export const metadata = {
  title: "E-commerce Development in Hyderabad | Digital Crowd Technologies",
  description:
    "Custom online stores and food delivery platform development in Hyderabad. Real-time orders, payment gateway integration, and merchant portals built with Next.js and Node.js.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/ecommerce-development-hyderabad",
  },
};

export default function EcommerceDevelopmentHyderabadPage() {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden tech-grid-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-orange-500/10 border border-orange-500/20 text-orange-400 mb-6">
            <MapPin size={13} />
            <span>Hyderabad, Telangana</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            E-Commerce Development <br />
            <span className="text-gradient-brand">in Hyderabad</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
            From single-brand direct-to-consumer online stores to multi-vendor delivery marketplaces (such as Ruchi Bazzar), we engineer transactional commerce platforms for businesses across Hyderabad and India.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition"
            >
              <span>Request a Custom Quote</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/projects/ruchi-bazzar"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition"
            >
              <span>Inspect Ruchi Bazzar Platform</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="py-20 bg-[#07090E] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Local Commerce Engineering"
            title="Engineered for High-Conversion Transactions"
            subtitle="Tailored to Indian payment preferences and local dispatch logistics."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-7 rounded-2xl bg-[#090D16] border border-white/10 space-y-3">
              <h3 className="text-lg font-bold text-white">Instant UPI & Card Checkout</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Seamless Razorpay & Cashfree integrations supporting GPay, PhonePe, Paytm, cards, net banking, and Cash on Delivery.
              </p>
            </div>
            <div className="p-7 rounded-2xl bg-[#090D16] border border-white/10 space-y-3">
              <h3 className="text-lg font-bold text-white">Hyperlocal Delivery Logistics</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Dynamic delivery zone calculation, order dispatch workflows, and real-time rider status via WebSockets.
              </p>
            </div>
            <div className="p-7 rounded-2xl bg-[#090D16] border border-white/10 space-y-3">
              <h3 className="text-lg font-bold text-white">Zero Commission Traps</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                You retain 100% of your sales profits and complete customer phone number databases without sharing margins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#05070B] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Plan Your Online Store with Our Hyderabad Team
          </h2>
          <p className="text-sm text-slate-400">
            Discuss your catalog, checkout requirements, and delivery zones.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition"
            >
              <span>Request a Custom Quote</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
