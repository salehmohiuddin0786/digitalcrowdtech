import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Phone, Mail, Code2, Server, Database } from "lucide-react";
import SectionHeading from "../Component/SectionHeading";
import { COMPANY } from "../data/company";

export const metadata = {
  title: "Web Development Company in Hyderabad | Digital Crowd Technologies",
  description:
    "Leading web development agency based in Madhapur, Hyderabad. We build professional business websites from ₹4,999 and custom web applications from ₹9,999.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/web-development-company-hyderabad",
  },
};

export default function WebDevelopmentCompanyHyderabadPage() {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden tech-grid-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6">
            <MapPin size={13} />
            <span>Madhapur, Hyderabad • Telangana</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Web Development Company <br />
            <span className="text-gradient-brand">in Hyderabad</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
            Digital Crowd Technologies is an engineering-first web agency located in the Madhapur tech corridor. We design, develop, and deploy responsive business websites and custom software solutions for businesses across Hyderabad, Telangana, and India.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="px-3 py-1 rounded bg-white/5 text-slate-300 border border-white/5">
              Business Websites From ₹4,999
            </span>
            <span className="px-3 py-1 rounded bg-white/5 text-slate-300 border border-white/5">
              Web Applications From ₹9,999
            </span>
            <span className="px-3 py-1 rounded bg-white/5 text-slate-300 border border-white/5">
              Frontend + Backend + DB
            </span>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition"
            >
              <span>Start Your Hyderabad Project</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY HYDERABAD BUSINESSES WORK WITH US */}
      <section className="py-20 bg-[#07090E] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Local Expertise"
            title="Why Hyderabad Businesses Choose Digital Crowd Tech"
            subtitle="Accessible local collaboration combined with high-grade full-stack engineering."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-7 rounded-2xl bg-[#090D16] border border-white/10 space-y-3">
              <h3 className="text-lg font-bold text-white">Direct Local Communication</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Meet directly with developers in Madhapur or collaborate via video call and WhatsApp. You deal directly with engineers, not sales middlemen.
              </p>
            </div>
            <div className="p-7 rounded-2xl bg-[#090D16] border border-white/10 space-y-3">
              <h3 className="text-lg font-bold text-white">Complete Stack Under One Roof</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Frontend (Next.js/React), Backend (Node.js/Express), Databases (MySQL/MongoDB), and Linux VPS deployment all handled seamlessly.
              </p>
            </div>
            <div className="p-7 rounded-2xl bg-[#090D16] border border-white/10 space-y-3">
              <h3 className="text-lg font-bold text-white">Zero Fake Metrics</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Transparent starting prices (₹4,999 and ₹9,999), clear milestone deliverables, and 100% source code handover upon completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LOCAL CONTACT BAR */}
      <section className="py-16 bg-[#05070B] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Visit Us in Madhapur or Connect Online
          </h2>
          <p className="text-sm text-slate-400">
            {COMPANY.address}
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${COMPANY.phone}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold hover:bg-white/10 transition"
            >
              <Phone size={14} className="text-blue-400" />
              <span>{COMPANY.phoneDisplay}</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow transition"
            >
              <span>Get a Project Quote</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
