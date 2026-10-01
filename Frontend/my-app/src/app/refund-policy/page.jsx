import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { COMPANY } from "../data/company";

export const metadata = {
  title: "Refund Policy | Digital Crowd Technologies",
  description:
    "Refund Policy for development services and milestone contracts by Digital Crowd Technologies.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/refund-policy",
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="py-16 md:py-24 bg-[#07090E]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition mb-6"
          >
            <ArrowLeft size={14} />
            <span>Return to Home</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Refund & Cancellation Policy
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-2">
            Last Updated: June 2026 • Digital Crowd Technologies
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            At Digital Crowd Technologies, we strive for complete client satisfaction through clear requirement analysis, transparent milestones, and regular staging previews before final sign-off.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">1. Custom Development & Milestones</h2>
          <p>
            Because web development and software engineering involve dedicated developer hours, custom code creation, and infrastructure configuration, payments made for completed and approved project milestones are non-refundable.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">2. Project Cancellation Prior to Commencement</h2>
          <p>
            If a client requests cancellation before any design, planning, or code implementation has commenced, any advance deposit minus documented consultation and administrative overhead (up to 15%) will be refunded within 7–10 business days.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">3. Cancellation During Active Development</h2>
          <p>
            If a project is halted mid-development by mutual agreement, payment will be reconciled strictly against completed milestones and work delivered to date. Any balance exceeding the work completed will be refunded, and corresponding code developed up to that point will be handed over to the client.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">4. Third-Party Infrastructure Fees</h2>
          <p>
            Third-party fees paid to external vendors—such as domain registrars, cloud VPS providers, SSL certificate authorities, or payment gateways—are subject to the respective provider&apos;s refund terms and are not refundable by Digital Crowd Technologies.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">5. Inquiries & Assistance</h2>
          <p>
            If you have any questions or require clarification regarding milestone payments, please contact:
          </p>
          <p className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs sm:text-sm">
            <strong>Digital Crowd Technologies</strong><br />
            Email: <a href={`mailto:${COMPANY.email}`} className="text-blue-400">{COMPANY.email}</a><br />
            Phone: {COMPANY.phoneDisplay}
          </p>
        </div>
      </div>
    </div>
  );
}
