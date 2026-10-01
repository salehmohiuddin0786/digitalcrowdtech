import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  Layers,
  Users,
  ShieldCheck,
  FileText,
  BarChart3,
  Bell,
  Clock,
  Briefcase,
} from "lucide-react";
import SectionHeading from "../../Component/SectionHeading";

export const metadata = {
  title: "ERP & Custom Business Software | Digital Crowd Technologies",
  description:
    "Custom ERP and operational business software built strictly around your workflow. Inventory, CRM, employee management, invoicing, reports, and role-based access.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/services/erp-development",
  },
};

export default function ErpDevelopmentPage() {
  const erpModules = [
    { title: "Inventory Management", desc: "Track stock across multiple warehouses, monitor reorder thresholds, batch numbers, and audit adjustments." },
    { title: "Customer Relationship (CRM)", desc: "Consolidated customer 360 profiles, inquiry status timelines, quotation history, and follow-up reminders." },
    { title: "Employee & Staff Records", desc: "Maintain employee directories, role allocations, departmental structures, and essential documentation." },
    { title: "Order Processing", desc: "Automate sales orders, purchase orders, fulfillment handoffs, delivery statuses, and fulfillment tracking." },
    { title: "Accounts & GST Invoicing", desc: "Generate tax-compliant invoices with automatic GST calculations, payment ledger tracking, and receivables." },
    { title: "Business Reports & Export", desc: "Actionable operational dashboards, financial summaries, and one-click data export to Excel and PDF." },
    { title: "Staff Attendance Logging", desc: "Track daily staff shifts, biometric/manual clock-ins, leave request approvals, and monthly attendance ratios." },
    { title: "Automated Notifications", desc: "Trigger email and SMS alerts for pending approvals, low stock warnings, and outstanding customer dues." },
    { title: "Role-Based Access Control", desc: "Define precise permissions so managers, sales reps, accountants, and staff only access permitted screens." },
    { title: "Centralized Admin Dashboard", desc: "High-level overview of daily revenue, operational bottlenecks, active workflows, and system audit logs." },
  ];

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden tech-grid-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-6">
            <span>Operations & ERP Software</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Custom Business Software Built <br />
            <span className="text-gradient-brand">Around Your Workflow</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
            Stop forcing your business into rigid off-the-shelf software with recurring per-user fees. We build custom ERP and operations systems designed specifically for your team.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition"
            >
              <span>Request a Custom Quote</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CORE MODULES */}
      <section className="py-20 bg-[#07090E] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Custom Modules"
            title="Integrated Modules for Your Entire Organization"
            subtitle="Eliminate disconnected spreadsheets and centralize your operations into one unified database."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {erpModules.map((mod) => (
              <div key={mod.title} className="p-6 rounded-2xl bg-[#0B0F19] border border-white/10 hover:border-indigo-500/30 transition">
                <h3 className="text-base font-bold text-white mb-2">{mod.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 bg-[#05070B] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Discuss Your Business Software Requirements
          </h2>
          <p className="text-sm text-slate-400">
            Every business workflow is unique. We conduct a thorough requirement review to design a solution that fits your team.
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
