import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShoppingCart,
  CreditCard,
  Truck,
  Tag,
  ShieldCheck,
  Users,
  Bell,
  Layers,
  Globe,
} from "lucide-react";
import SectionHeading from "../../Component/SectionHeading";

export const metadata = {
  title: "E-commerce Development | Digital Crowd Technologies",
  description:
    "Scalable online stores, hyperlocal delivery platforms, product catalogs, carts, payment gateways, and merchant administration built with Next.js, Node.js, and MySQL.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/services/ecommerce-development",
  },
};

export default function EcommerceDevelopmentPage() {
  const modules = [
    { title: "Product Management", desc: "Multi-category hierarchies, SKU variants, product specs, image galleries, and stock availability toggles." },
    { title: "Categories & Filtering", desc: "Instant search, price sliders, brand/cuisine filters, and collection sorting." },
    { title: "Shopping Cart & Persistence", desc: "Session-preserved carts with real-time tax calculation, discount updates, and item notes." },
    { title: "Secure Checkout", desc: "Streamlined single-page checkout supporting multiple delivery addresses and billing contacts." },
    { title: "Payment Gateways", desc: "Direct integration with Razorpay, Cashfree, UPI QR, Credit/Debit cards, and Cash on Delivery (COD)." },
    { title: "Order Lifecycle Management", desc: "Automated states: Order Placed → Confirmed → Processing → Out for Delivery → Delivered." },
    { title: "Coupons & Discounts", desc: "Percentage or flat-rate discount codes, minimum order value gates, and single-use limits." },
    { title: "Customer Profiles", desc: "Order history, reorder shortcuts, saved delivery addresses, and invoice PDF downloads." },
    { title: "Admin Management Dashboard", desc: "Centralized console to process orders, update pricing, view revenue metrics, and manage customers." },
    { title: "Delivery Workflows", desc: "Driver assignment, delivery fee computation by zone or distance, and dispatch coordination." },
    { title: "Automated Notifications", desc: "Real-time order confirmation alerts via SMS, WhatsApp, and transactional emails via SMTP." },
  ];

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden tech-grid-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-orange-500/10 border border-orange-500/20 text-orange-400 mb-6">
            <span>E-Commerce & Delivery Platforms</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Scalable Online Stores & <br />
            <span className="text-gradient-brand">Hyperlocal Commerce</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
            Own your customer relationships without paying 30% marketplace commissions. We build high-speed transactional e-commerce platforms and delivery ecosystems tailored to your business model.
          </p>

          <div className="mt-6 p-3 rounded-xl bg-white/[0.03] border border-white/10 max-w-md mx-auto text-xs text-slate-400">
            Final pricing depends on project requirements, catalog size, and fulfillment workflows.
          </div>

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
              <span>View Ruchi Bazzar Case Study</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED CASE STUDY: RUCHI BAZZAR */}
      <section className="py-20 bg-[#07090E] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#090D16] border border-white/10 p-8 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 border border-orange-500/30 text-orange-400">
                  <span>Featured Production Project</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Ruchi Bazzar — Hyperlocal Food & Grocery Platform
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  A complete multi-portal delivery ecosystem built by Digital Crowd Technologies. Connects hungry customers, restaurant kitchens, delivery riders, and operations managers in real time using Next.js, Node.js, Express, MySQL, and Socket.io.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300 pt-2">
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5">Customer Web App</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5">Restaurant Dashboard</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5">Rider Fleet Portal</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5">SuperAdmin Console</span>
                </div>
                <div className="pt-3">
                  <Link
                    href="/projects/ruchi-bazzar"
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300"
                  >
                    <span>Inspect Full Ruchi Bazzar Architecture</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="p-6 rounded-xl bg-[#0F1422] border border-white/10 space-y-3 text-xs">
                  <span className="text-slate-400 font-mono uppercase tracking-wider block">Live Ecosystem Metrics</span>
                  <div className="space-y-2">
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-slate-400">Architecture:</span>
                      <span className="text-slate-200 font-semibold">Monorepo (5 Packages)</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-slate-400">Real-Time Engine:</span>
                      <span className="text-slate-200 font-semibold">Socket.io Event Rooms</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-slate-400">Auth Method:</span>
                      <span className="text-slate-200 font-semibold">Fast Mobile OTP</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-slate-400">Database:</span>
                      <span className="text-slate-200 font-semibold">MySQL with Sequelize</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11 CORE MODULES */}
      <section className="py-20 bg-[#05070B] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Platform Architecture"
            title="Complete E-Commerce Capabilities"
            subtitle="Every module required to run a high-volume transactional online business."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => (
              <div key={mod.title} className="p-6 rounded-2xl bg-[#090D16] border border-white/10">
                <h3 className="text-base font-bold text-white mb-2">{mod.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#07090E] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Plan Your E-Commerce Store
          </h2>
          <p className="text-sm text-slate-400">
            Tell us about your products, catalog size, and fulfillment channels. We&apos;ll prepare a custom quotation.
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
