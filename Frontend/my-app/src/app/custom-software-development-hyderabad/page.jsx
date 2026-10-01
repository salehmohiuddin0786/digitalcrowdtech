import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Database, Server, ShieldCheck, Cpu } from "lucide-react";
import SectionHeading from "../Component/SectionHeading";
import { COMPANY } from "../data/company";

export const metadata = {
  title: "Custom Software Development in Hyderabad | Digital Crowd Technologies",
  description:
    "Custom web application, ERP, and software solutions engineering in Madhapur, Hyderabad. Full-stack development with Next.js, Node.js, Express, and MySQL.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/custom-software-development-hyderabad",
  },
};

export default function CustomSoftwareDevelopmentHyderabadPage() {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden tech-grid-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-6">
            <MapPin size={13} />
            <span>Madhapur, Hyderabad</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Custom Software Development <br />
            <span className="text-gradient-brand">in Hyderabad</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
            Replace disconnected spreadsheets and manual tools with purpose-built full-stack software. We engineer custom web applications, operational ERPs, and database systems tailored strictly around your business workflows.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition"
            >
              <span>Discuss Your Custom Software</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition"
            >
              <span>View Case Studies</span>
            </Link>
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="py-20 bg-[#07090E] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Engineering Integrity"
            title="Why Custom Software Outperforms Generic Tools"
            subtitle="Built to fit your exact business process rather than forcing compromises."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-7 rounded-2xl bg-[#090D16] border border-white/10 space-y-3">
              <h3 className="text-lg font-bold text-white">Zero Per-User Licensing</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Off-the-shelf SaaS charges escalating monthly fees per seat. With our custom software, you own the asset and add users freely without license penalties.
              </p>
            </div>
            <div className="p-7 rounded-2xl bg-[#090D16] border border-white/10 space-y-3">
              <h3 className="text-lg font-bold text-white">Full Database Ownership</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Your confidential financial data, customer lists, and transaction histories reside securely in your dedicated MySQL database.
              </p>
            </div>
            <div className="p-7 rounded-2xl bg-[#090D16] border border-white/10 space-y-3">
              <h3 className="text-lg font-bold text-white">Multi-Role Portals</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Dedicated interfaces for managers, staff, vendors, and customers with strict role-based access control and forensic audit trails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#05070B] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Schedule a Technical Requirement Session
          </h2>
          <p className="text-sm text-slate-400">
            Visit our office in Madhapur, Hyderabad or connect remotely for a direct discovery call.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition"
            >
              <span>Start Your Project</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
