"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Package,
  Layers,
  Sparkles,
  CheckCircle2,
  Check,
  ShoppingBag,
  ShieldCheck,
  Eye,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { SpotlightCard } from "./SpotlightCard";

export default function WhatWeBuildSection({ services = [], products = [] }) {
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'products' | 'services'

  const showProducts = activeTab === "all" || activeTab === "products";
  const showServices = activeTab === "all" || activeTab === "services";

  return (
    <section
      className="py-20 md:py-28 bg-transparent border-b border-white/5 [html.light_&]:border-slate-200/80 relative"
      id="services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          badge="Digital Solutions & Products"
          title="Explore Our Digital Products"
          subtitle="Discover powerful digital solutions designed to simplify businesses, improve customer experiences, and accelerate growth."
        />

        {/* Filter Tabs Bar */}
        <div className="mt-8 mb-12 flex items-center justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/[0.04] [html.light_&]:bg-slate-100 border border-white/10 [html.light_&]:border-slate-200 backdrop-blur-md shadow-inner gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "all"
                  ? "bg-[#2F7DE1] text-white shadow-md shadow-blue-500/25"
                  : "text-slate-400 hover:text-white [html.light_&]:text-slate-600 [html.light_&]:hover:text-slate-900"
              }`}
            >
              All Solutions ({products.length + services.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("products")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                activeTab === "products"
                  ? "bg-[#F87000] text-white shadow-md shadow-orange-500/25"
                  : "text-slate-400 hover:text-white [html.light_&]:text-slate-600 [html.light_&]:hover:text-slate-900"
              }`}
            >
              <Package size={14} />
              <span>Turnkey Products ({products.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("services")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                activeTab === "services"
                  ? "bg-[#2F7DE1] text-white shadow-md shadow-blue-500/25"
                  : "text-slate-400 hover:text-white [html.light_&]:text-slate-600 [html.light_&]:hover:text-slate-900"
              }`}
            >
              <Layers size={14} />
              <span>Custom Services ({services.length})</span>
            </button>
          </div>
        </div>

        {/* 1. PRODUCTS SUBSECTION */}
        {showProducts && (
          <div className="mb-16">
            {activeTab === "all" && (
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/5 [html.light_&]:border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F87000] animate-pulse" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#F87000]">
                    Turnkey Digital Products &amp; Platforms
                  </h3>
                </div>
                <Link
                  href="/products"
                  className="text-xs font-semibold text-slate-400 hover:text-[#F87000] inline-flex items-center gap-1 transition-colors"
                >
                  <span>View All 8 Products</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
              {products.map((product) => {
                const coverImage = product.imageUrl || `/products/${product.slug}-preview.png`;

                return (
                  <SpotlightCard
                    key={product.id || product.slug}
                    className="p-0 flex flex-col justify-between group overflow-hidden border-orange-500/20 hover:border-orange-500/40 bg-[#0B1220]/80 [html.light_&]:bg-white"
                    spotlightColor="rgba(248, 112, 0, 0.14)"
                  >
                    <div>
                      {/* Product Visual Mockup / Cover Banner */}
                      <div className="relative w-full h-52 sm:h-60 bg-[#07090E] overflow-hidden border-b border-white/10 [html.light_&]:border-slate-200">
                        <img
                          src={coverImage}
                          alt={product.title}
                          className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                          loading="lazy"
                          onError={(e) => {
                            // Fallback if image fails
                            e.currentTarget.style.display = "none";
                          }}
                        />

                        {/* Top Overlay Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#F87000] px-2.5 py-1 rounded-md bg-[#0B1220]/90 backdrop-blur-md border border-[#F87000]/30 shadow-sm">
                            <Package size={12} />
                            <span>{product.label || "Turnkey Solution"}</span>
                          </span>

                          {product.price && (
                            <span className="text-[11px] font-bold text-emerald-400 px-2.5 py-1 rounded-md bg-[#0B1220]/90 backdrop-blur-md border border-emerald-500/30 shadow-sm shrink-0">
                              {product.price}
                            </span>
                          )}
                        </div>

                        {/* Bottom Gradient overlay */}
                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0B1220] to-transparent pointer-events-none" />
                      </div>

                      {/* Content Area */}
                      <div className="p-6 sm:p-7">
                        {/* Category */}
                        <p className="text-xs font-mono text-[#F87000] [html.light_&]:text-orange-600 mb-1.5 uppercase tracking-wider font-semibold">
                          {product.category}
                        </p>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-white [html.light_&]:text-[#0A2540] group-hover:text-[#F87000] transition-colors mb-2.5">
                          <Link href={`/products/${product.slug}`}>
                            {product.title}
                          </Link>
                        </h3>

                        {/* Summary */}
                        <p className="text-sm text-slate-300 [html.light_&]:text-slate-600 leading-relaxed mb-5 line-clamp-2">
                          {product.summary}
                        </p>

                        {/* Key Feature Highlights */}
                        {Array.isArray(product.features) && product.features.length > 0 && (
                          <div className="space-y-2 mb-6">
                            {product.features.slice(0, 3).map((f, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-2 text-xs text-slate-300 [html.light_&]:text-slate-600"
                              >
                                <CheckCircle2
                                  size={14}
                                  className="text-emerald-400 shrink-0 mt-0.5"
                                />
                                <span className="line-clamp-1">{f}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tech Stack Chips */}
                        {Array.isArray(product.technologies) && product.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {product.technologies.slice(0, 5).map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] [html.light_&]:bg-slate-100 text-slate-300 [html.light_&]:text-slate-600 border border-white/5 [html.light_&]:border-slate-200"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer: Action Buttons (Explore Product & Buy Now) */}
                    <div className="p-6 sm:p-7 pt-0 border-t border-white/5 [html.light_&]:border-slate-200 mt-auto">
                      <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
                        {/* Explore Product Button */}
                        <Link
                          href={`/products/${product.slug}`}
                          className="w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 [html.light_&]:text-slate-700 bg-white/[0.05] [html.light_&]:bg-slate-100 hover:bg-white/[0.1] [html.light_&]:hover:bg-slate-200 border border-white/10 [html.light_&]:border-slate-300 text-center transition-all inline-flex items-center justify-center gap-2 group/btn"
                        >
                          <Eye size={14} className="text-slate-400 group-hover/btn:text-white" />
                          <span>Explore Product</span>
                          <ArrowRight size={13} className="text-slate-400 group-hover/btn:translate-x-0.5 transition-transform" />
                        </Link>

                        {/* Buy Now Button */}
                        <Link
                          href={`/checkout?product=${product.slug}`}
                          className="w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#F87000] to-orange-600 hover:from-orange-500 hover:to-orange-600 shadow-md shadow-orange-500/25 text-center transition-all inline-flex items-center justify-center gap-2"
                        >
                          <ShoppingBag size={14} />
                          <span>Buy Now</span>
                        </Link>
                      </div>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. SERVICES SUBSECTION */}
        {showServices && (
          <div>
            {activeTab === "all" && (
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/5 [html.light_&]:border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2F7DE1]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400">
                    Custom Web Development &amp; Software Engineering Services
                  </h3>
                </div>
                <Link
                  href="/services"
                  className="text-xs font-semibold text-slate-400 hover:text-blue-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>View All Services</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const isBusinessSite = service.id === "business-website-development";
                const isCustomApp = service.id === "custom-web-application-development";

                return (
                  <SpotlightCard
                    key={service.id}
                    className="p-6 sm:p-7 flex flex-col justify-between group"
                    spotlightColor="rgba(47, 125, 225, 0.16)"
                  >
                    <div>
                      {/* Card Header: Number & Starting Price Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-bold text-blue-400 px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20">
                          {service.number}
                        </span>
                        {service.startingPrice && service.startingPrice.includes("₹") ? (
                          <span className="text-xs font-bold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            {service.startingPrice}
                          </span>
                        ) : (
                          <span className="text-[11px] font-medium text-slate-400 px-2 py-0.5 rounded bg-white/5">
                            Custom Quote
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-white [html.light_&]:text-[#0A2540] group-hover:text-blue-400 transition-colors mb-2.5">
                        {service.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-sm text-slate-400 [html.light_&]:text-slate-600 leading-relaxed mb-6">
                        {service.summary}
                      </p>

                      {/* Key Technical Bullets */}
                      <div className="space-y-2 mb-6">
                        {service.id === "backend-api-development" && (
                          <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300 [html.light_&]:text-slate-600">
                            {[
                              "Node.js",
                              "Express.js",
                              "REST APIs",
                              "Auth & RBAC",
                              "Database Integration",
                              "OTP & Payments",
                              "Real-Time WebSockets",
                            ].map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded bg-white/[0.04] [html.light_&]:bg-slate-100 border border-white/5 [html.light_&]:border-slate-200"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        {service.id === "erp-development" && (
                          <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300 [html.light_&]:text-slate-600">
                            {[
                              "Inventory",
                              "Customers",
                              "Orders",
                              "Employees",
                              "Accounts",
                              "Reports",
                              "Admin Dashboard",
                              "Role-Based Access",
                            ].map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded bg-white/[0.04] [html.light_&]:bg-slate-100 border border-white/5 [html.light_&]:border-slate-200"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        {service.id === "school-management-software" && (
                          <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300 [html.light_&]:text-slate-600">
                            {[
                              "Students",
                              "Teachers",
                              "Parents",
                              "Attendance",
                              "Fees",
                              "Notices",
                              "Timetable",
                              "Reports",
                              "Admin Dashboard",
                            ].map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded bg-white/[0.04] [html.light_&]:bg-slate-100 border border-white/5 [html.light_&]:border-slate-200"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        {isBusinessSite && (
                          <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300 [html.light_&]:text-slate-600">
                            {[
                              "Responsive Layouts",
                              "Contact & WhatsApp",
                              "SEO Semantic HTML",
                              "Fast Performance",
                              "VPS / Cloud Setup",
                            ].map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded bg-white/[0.04] [html.light_&]:bg-slate-100 border border-white/5 [html.light_&]:border-slate-200"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        {isCustomApp && (
                          <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300 [html.light_&]:text-slate-600">
                            {[
                              "Frontend + Backend",
                              "MySQL Relational DB",
                              "Authentication & RBAC",
                              "Admin Dashboards",
                              "Payment APIs",
                            ].map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded bg-white/[0.04] [html.light_&]:bg-slate-100 border border-white/5 [html.light_&]:border-slate-200"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        {service.id === "ecommerce-development" && (
                          <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300 [html.light_&]:text-slate-600">
                            {[
                              "Product Catalog",
                              "Shopping Cart",
                              "UPI & Card Checkout",
                              "Orders & Coupons",
                              "Merchant Portal",
                            ].map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded bg-white/[0.04] [html.light_&]:bg-slate-100 border border-white/5 [html.light_&]:border-slate-200"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Bottom CTA */}
                    <div className="pt-4 border-t border-white/5 [html.light_&]:border-slate-200 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">
                        {service.startingPrice && service.startingPrice.includes("₹")
                          ? "Starting price"
                          : "Custom requirements"}
                      </span>
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 group-hover:text-blue-300 transition-colors"
                      >
                        <span>{service.ctaText}</span>
                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Exploration CTAs */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white px-5 py-2.5 rounded-xl bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/30 transition shadow-sm"
          >
            <Package size={15} className="text-[#F87000]" />
            <span>Explore All 8 Turnkey Products</span>
            <ArrowRight size={14} />
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition shadow-sm"
          >
            <Layers size={15} className="text-blue-400" />
            <span>Explore All Custom Services</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
