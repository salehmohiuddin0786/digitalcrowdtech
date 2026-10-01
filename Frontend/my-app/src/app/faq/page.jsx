import React from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle, CheckCircle2 } from "lucide-react";
import SectionHeading from "../Component/SectionHeading";
import { FAQS } from "../data/faqs";

export const metadata = {
  title: "Frequently Asked Questions | Digital Crowd Technologies",
  description:
    "Comprehensive answers regarding website development costs, custom web applications, backend engineering, domain & hosting ownership, and our 7-step development process.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/faq",
  },
};

export default function FaqPage() {
  const categories = ["Pricing", "Capabilities", "Services", "Process", "Ownership", "Support"];

  // Generate FAQ JSON-LD schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <div className="flex flex-col">
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden tech-grid-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6">
            <span>Help & Clarifications</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Frequently Asked <span className="text-gradient-brand">Questions</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
            Everything you need to know about our web development services, starting prices, backend capabilities, hosting setup, and project timelines.
          </p>
        </div>
      </section>

      {/* ALL FAQS */}
      <section className="py-20 bg-[#07090E] border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {categories.map((cat) => {
            const catFaqs = FAQS.filter((f) => f.category === cat);
            if (catFaqs.length === 0) return null;

            return (
              <div key={cat} className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider text-xs">
                    {cat}
                  </h2>
                </div>

                <div className="space-y-4">
                  {catFaqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="p-6 rounded-2xl bg-[#090D16] border border-white/10 space-y-2 hover:border-blue-500/30 transition"
                    >
                      <h3 className="text-base font-bold text-white">
                        {faq.question}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* STILL HAVE QUESTIONS */}
      <section className="py-16 bg-[#05070B] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Have a Specific Question We Haven&apos;t Answered?
          </h2>
          <p className="text-sm text-slate-400">
            Reach out directly. We will answer your technical or pricing questions without sales pressure.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition"
            >
              <span>Contact Our Engineering Team</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
