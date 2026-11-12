"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Check,
  X,
  MessageCircle,
  Sparkles,
  Calculator,
  ArrowRight,
  ShieldCheck,
  Clock,
  Layers,
  HelpCircle,
} from "lucide-react";
import BorderBeam from "./BorderBeam";
import ShimmerButton from "./ShimmerButton";

const BASE_TIERS = [
  {
    id: "business-website",
    name: "Business Website",
    basePrice: 4999,
    baseDays: 5,
    tagline: "Professional responsive presence for local businesses, clinics, and service providers.",
    included: [
      "Mobile, tablet & desktop responsive layout",
      "Essential business pages (Home, About, Services, Contact)",
      "WhatsApp direct chat & contact enquiry form",
      "SEO semantic HTML & Google Maps embed",
      "Deployment on your hosting / VPS",
    ],
  },
  {
    id: "custom-webapp",
    name: "Custom Web Application",
    basePrice: 9999,
    baseDays: 10,
    tagline: "Full-stack application with custom business logic, database, and authentication.",
    popular: true,
    included: [
      "Custom Next.js / React frontend user interface",
      "Node.js / Express backend with secure REST APIs",
      "MySQL relational database schema design",
      "User authentication & session management",
      "Admin dashboard with CRUD management",
    ],
  },
  {
    id: "turnkey-platform",
    name: "Turnkey Digital Product",
    basePrice: 14999,
    baseDays: 14,
    tagline: "Complete multi-role software ecosystem (E-commerce, Clinic ERP, Logistics).",
    included: [
      "Multi-role user portals (Admin, Merchant, Customer)",
      "Automated order / lead routing & status pipelines",
      "Real-time alerts & WebSocket updates",
      "Relational MySQL database with backup automation",
      "Production VPS setup with SSL & Nginx proxy",
    ],
  },
];

const ADDONS = [
  { id: "payments", name: "Razorpay / UPI Payment Gateway", price: 1999, days: 1 },
  { id: "admin-metrics", name: "Advanced Analytics & Revenue Dashboard", price: 2499, days: 2 },
  { id: "wa-bot", name: "Instant WhatsApp Lead Notification Bot", price: 999, days: 1 },
  { id: "rbac", name: "Multi-Role RBAC (Staff, Managers, Admins)", price: 1499, days: 2 },
  { id: "vps-setup", name: "Production Linux VPS & SSL Configuration", price: 999, days: 1 },
];

const MATRIX_ROWS = [
  { feature: "Responsive Mobile & Desktop Layout", web: true, app: true, turnkey: true },
  { feature: "Essential Business Content Pages", web: "Up to 5 Pages", app: "Custom Screens", turnkey: "Unlimited Screens" },
  { feature: "WhatsApp Quick-Chat Integration", web: true, app: true, turnkey: true },
  { feature: "SEO Semantic Metadata & Sitemap", web: true, app: true, turnkey: true },
  { feature: "Custom Node.js / Express REST Backend", web: false, app: true, turnkey: true },
  { feature: "Relational MySQL Database (ACID)", web: false, app: true, turnkey: true },
  { feature: "Admin Management Console", web: false, app: true, turnkey: true },
  { feature: "User Authentication & Roles (JWT)", web: false, app: true, turnkey: true },
  { feature: "UPI / Card Payment Gateway", web: "Optional", app: "Optional", turnkey: true },
  { feature: "100% Full Source Code Handover", web: true, app: true, turnkey: true },
  { feature: "Post-Launch Warranty & Support", web: "30 Days", app: "60 Days", turnkey: "90 Days" },
];

export default function PricingScopeCalculator() {
  const [selectedTierId, setSelectedTierId] = useState("custom-webapp");
  const [selectedAddons, setSelectedAddons] = useState(["wa-bot"]);
  const [showMatrix, setShowMatrix] = useState(false);

  const currentTier = useMemo(() => {
    return BASE_TIERS.find((t) => t.id === selectedTierId) || BASE_TIERS[0];
  }, [selectedTierId]);

  const toggleAddon = (addonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const { totalPrice, totalDays } = useMemo(() => {
    const addonsCost = selectedAddons.reduce((sum, addonId) => {
      const found = ADDONS.find((a) => a.id === addonId);
      return sum + (found ? found.price : 0);
    }, 0);

    const addonsDays = selectedAddons.reduce((sum, addonId) => {
      const found = ADDONS.find((a) => a.id === addonId);
      return sum + (found ? found.days : 0);
    }, 0);

    return {
      totalPrice: currentTier.basePrice + addonsCost,
      totalDays: currentTier.baseDays + addonsDays,
    };
  }, [currentTier, selectedAddons]);

  const waMessage = useMemo(() => {
    const addonNames = selectedAddons
      .map((id) => ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const text = `Hi DigitalCrowd Tech! I used your Interactive Scope Calculator and would like to build:
- Tier: ${currentTier.name} (Base ₹${currentTier.basePrice.toLocaleString("en-IN")})
- Add-ons: ${addonNames || "None"}
- Estimated Total: ₹${totalPrice.toLocaleString("en-IN")}
- Target Delivery: ~${totalDays} business days

Please review my requirements and let me know the next steps!`;

    return `https://wa.me/917997098480?text=${encodeURIComponent(text)}`;
  }, [currentTier, selectedAddons, totalPrice, totalDays]);

  return (
    <div className="w-full space-y-12">
      
      {/* 1. Base Tier Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BASE_TIERS.map((tier) => {
          const isSelected = tier.id === selectedTierId;

          return (
            <div
              key={tier.id}
              onClick={() => setSelectedTierId(tier.id)}
              className={`p-7 rounded-3xl cursor-pointer transition-all duration-300 relative flex flex-col justify-between border ${
                isSelected
                  ? "bg-[#101A2E] border-blue-400 shadow-2xl shadow-blue-500/20 scale-[1.02]"
                  : "bg-[#0D121F]/80 border-white/10 hover:border-white/20 hover:bg-[#0D121F]"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500 text-white shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-blue-400">
                    Tier 0{BASE_TIERS.indexOf(tier) + 1}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                      isSelected
                        ? "bg-blue-500 border-blue-400 text-white"
                        : "border-white/20 bg-white/5"
                    }`}
                  >
                    {isSelected && <Check size={12} strokeWidth={3} />}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1.5">{tier.name}</h3>
                <p className="text-xs text-slate-400 mb-5 leading-relaxed">{tier.tagline}</p>

                <div className="flex items-baseline gap-1.5 mb-6">
                  <span className="text-3xl font-black text-white">
                    ₹{tier.basePrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Starting</span>
                </div>

                <ul className="space-y-2 text-xs text-slate-300 mb-6">
                  {tier.included.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check size={13} className="text-blue-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono flex items-center gap-1">
                  <Clock size={12} className="text-blue-400" />
                  <span>~{tier.baseDays} Days Delivery</span>
                </span>
                <span
                  className={`font-semibold ${
                    isSelected ? "text-blue-400" : "text-slate-500"
                  }`}
                >
                  {isSelected ? "Selected ✓" : "Select Tier"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Interactive Add-ons & Live WhatsApp Scope Drawer */}
      <div className="rounded-3xl border border-white/10 bg-[#0D121F] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <BorderBeam duration={12} rx={24} strokeWidth={2} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Add-ons Selector */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <Calculator size={18} className="text-[#F87000]" />
              <h4 className="text-base font-bold text-white">
                Customize with Verified Feature Modules
              </h4>
            </div>
            <p className="text-xs text-slate-400">
              Select any additional features your business needs. Your price and delivery timeline update dynamically.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {ADDONS.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);

                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between text-xs ${
                      isChecked
                        ? "bg-blue-500/10 border-blue-400/40 text-white"
                        : "bg-white/[0.02] border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                          isChecked
                            ? "bg-blue-500 border-blue-400 text-white"
                            : "border-white/20 bg-white/5"
                        }`}
                      >
                        {isChecked && <Check size={10} strokeWidth={3} />}
                      </div>
                      <span className="font-medium">{addon.name}</span>
                    </div>
                    <span className="font-mono font-bold text-emerald-400 shrink-0 ml-2">
                      +₹{addon.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Live Calculation & Direct WhatsApp Action */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-[#16223A] to-[#101A2E] border border-blue-500/30 flex flex-col justify-between shadow-xl space-y-5">
            <div>
              <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider block mb-1">
                Calculated Scope Summary
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-white">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-xs font-mono text-slate-400 uppercase">
                  Estimated Total
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                Selected: <strong className="text-white">{currentTier.name}</strong>
                {selectedAddons.length > 0 && ` + ${selectedAddons.length} module(s)`}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs border-y border-white/10 py-3">
              <div>
                <span className="text-slate-400 block text-[11px]">Estimated Timeline</span>
                <span className="font-bold text-white flex items-center gap-1 mt-0.5">
                  <Clock size={12} className="text-emerald-400" />
                  <span>~{totalDays} Business Days</span>
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Ownership</span>
                <span className="font-bold text-white flex items-center gap-1 mt-0.5">
                  <ShieldCheck size={12} className="text-blue-400" />
                  <span>100% Full Codebase</span>
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <a
                href={waMessage}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-[#0B1220] bg-[#25D366] hover:bg-[#20BD5A] transition shadow-lg shadow-emerald-600/20"
              >
                <MessageCircle size={15} />
                <span>Discuss This Scope on WhatsApp</span>
              </a>

              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center py-2 px-4 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
              >
                <span>Submit Official Project Brief</span>
                <ArrowRight size={13} className="ml-1" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Toggleable Deliverables Comparison Matrix */}
      <div className="text-center">
        <button
          onClick={() => setShowMatrix(!showMatrix)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition"
        >
          <Layers size={14} className="text-blue-400" />
          <span>{showMatrix ? "Hide Feature Comparison Matrix" : "View Complete Feature Comparison Matrix"}</span>
          <ArrowRight size={13} className={`transition-transform ${showMatrix ? "rotate-90" : ""}`} />
        </button>
      </div>

      {showMatrix && (
        <div className="rounded-3xl border border-white/10 bg-[#0D121F] overflow-hidden shadow-2xl animate-in fade-in duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#101A2E] border-b border-white/10 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-6 py-4">Capability / Deliverable</th>
                  <th className="px-6 py-4 text-center">Business Website (₹4,999)</th>
                  <th className="px-6 py-4 text-center bg-blue-500/10 text-blue-300">Custom Web App (₹9,999)</th>
                  <th className="px-6 py-4 text-center">Turnkey Product (₹14,999+)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {MATRIX_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition">
                    <td className="px-6 py-3.5 font-medium text-white">{row.feature}</td>
                    
                    {/* Web column */}
                    <td className="px-6 py-3.5 text-center">
                      {typeof row.web === "boolean" ? (
                        row.web ? (
                          <Check size={16} className="text-emerald-400 mx-auto" />
                        ) : (
                          <X size={16} className="text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="font-mono text-slate-300">{row.web}</span>
                      )}
                    </td>

                    {/* App column */}
                    <td className="px-6 py-3.5 text-center bg-blue-500/5">
                      {typeof row.app === "boolean" ? (
                        row.app ? (
                          <Check size={16} className="text-blue-400 mx-auto" />
                        ) : (
                          <X size={16} className="text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="font-mono text-blue-300 font-bold">{row.app}</span>
                      )}
                    </td>

                    {/* Turnkey column */}
                    <td className="px-6 py-3.5 text-center">
                      {typeof row.turnkey === "boolean" ? (
                        row.turnkey ? (
                          <Check size={16} className="text-emerald-400 mx-auto" />
                        ) : (
                          <X size={16} className="text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="font-mono text-slate-300">{row.turnkey}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Transparency Commitment */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center text-xs text-slate-400 max-w-2xl mx-auto space-y-1">
        <p className="font-semibold text-slate-300">
          Our Absolute Transparency Commitment:
        </p>
        <p>
          No hidden recurring licensing fees. You receive 100% of the source code, database scripts, and administrative control. Third-party infrastructure (domain, cloud VPS, SMS credits) is billed at direct provider cost.
        </p>
      </div>

    </div>
  );
}
