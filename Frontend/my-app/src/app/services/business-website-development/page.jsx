import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Zap,
  Globe,
  MessageSquare,
  ShieldCheck,
  Search,
  Check,
} from "lucide-react";
import SectionHeading from "../../Component/SectionHeading";
import { getServiceBySlug } from "../../data/services";

export const metadata = {
  title: "Business Website Development | Starting from ₹4,999 | Digital Crowd Technologies",
  description:
    "Professional, responsive business websites starting from ₹4,999. Fast loading, mobile optimized, WhatsApp integration, and SEO friendly structure for businesses in Hyderabad and India.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/services/business-website-development",
  },
};

export default function BusinessWebsiteDevelopmentPage() {
  const service = getServiceBySlug("business-website-development");

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden tech-grid-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6">
            <span>Website Development</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Professional Websites <span className="text-gradient-brand">Starting From ₹4,999</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
            Build a credible, modern web presence that showcases your services, engages customers on mobile, and turns visitors into verified business inquiries.
          </p>

          <div className="mt-6 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 max-w-md mx-auto text-xs text-blue-300 font-medium">
            * ₹4,999 is a starting price. Final pricing depends on project requirements.
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition"
            >
              <span>Start Your Website</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition"
            >
              <span>View Pricing Details</span>
            </Link>
          </div>
        </div>
      </section>

      {/* TARGET CUSTOMERS */}
      <section className="py-16 bg-[#07090E] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Who This Is For"
            title="Designed for Growing Businesses & Professionals"
            subtitle="Whether you are launching your first website or modernizing an obsolete one, we deliver clean results."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Small Businesses",
                desc: "Establish brand credibility and answer customer questions 24/7 with a professional profile.",
              },
              {
                title: "Startups",
                desc: "Launch your product concept quickly with a sleek landing page ready for marketing campaigns.",
              },
              {
                title: "Professionals & Clinics",
                desc: "Showcase services, credentials, consultation hours, and instant WhatsApp booking.",
              },
              {
                title: "Local Businesses",
                desc: "Rank in Hyderabad local search queries with Google Maps embeds and mobile tap-to-call.",
              },
            ].map((tgt) => (
              <div key={tgt.title} className="p-6 rounded-xl bg-[#0B0F19] border border-white/10">
                <h3 className="text-base font-bold text-white mb-2">{tgt.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{tgt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="py-20 bg-[#05070B] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Features Included"
            title="Everything Your Business Website Needs"
            subtitle="Built with clean standards, modern performance, and zero bloat."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feat) => (
              <div key={feat.title} className="p-6 rounded-2xl bg-[#090D16] border border-white/10">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                  <CheckCircle2 size={18} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-[#07090E] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Process"
            title="How We Build Your Business Website"
            subtitle="A transparent, streamlined roadmap from first call to live deployment."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "01", name: "Content & Requirements", desc: "We gather your logos, service details, photos, and contact preferences." },
              { step: "02", name: "Modern Design & Layout", desc: "We draft responsive layouts tailored to your brand colors and typography." },
              { step: "03", name: "Frontend Development", desc: "We write clean, semantic Next.js/React code with mobile optimization." },
              { step: "04", name: "Deployment & Launch", desc: "We deploy on your hosting, connect your domain name, and configure SSL." },
            ].map((p) => (
              <div key={p.step} className="p-6 rounded-xl bg-[#0B0F19] border border-white/10">
                <span className="text-xs font-mono font-bold text-blue-400 block mb-2">{p.step}</span>
                <h3 className="text-sm font-bold text-white mb-1">{p.name}</h3>
                <p className="text-xs text-slate-400">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="py-20 bg-[#05070B] border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Frequently Asked"
            title="Questions About Business Websites"
          />

          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <div key={i} className="p-5 rounded-xl bg-[#090D16] border border-white/10">
                <h3 className="text-sm sm:text-base font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 bg-[#07090E] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Launch Your Business Website?
          </h2>
          <p className="text-sm text-slate-400">
            Get started from ₹4,999. Tell us about your business and we&apos;ll prepare your project outline.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition"
            >
              <span>Start Your Website</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
