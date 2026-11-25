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
            Last Updated: November 2026 • Digital Crowd Technologies
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            At <strong>Digital Crowd Technologies</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we strive for complete client satisfaction through rigorous requirement scoping, transparent milestone tracking, and regular staging previews before final deployment sign-off.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">1. Custom Development &amp; Completed Milestones</h2>
          <p>
            Because custom web development, mobile applications, and software engineering involve dedicated engineer hours, bespoke code architecture, and cloud infrastructure setup, payments made for completed and client-approved milestones are non-refundable.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">2. Refund Eligibility, Mode &amp; Processing Timelines</h2>
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm leading-relaxed space-y-2">
            <p>
              <strong>Original Payment Source:</strong> All eligible, approved refunds are credited strictly back to the <strong>original payment method</strong> (the same Bank Account, Credit/Debit Card, or UPI VPA used when making the transaction). We do not issue cash refunds or third-party transfers.
            </p>
            <p className="text-xs text-slate-300">
              <strong>Processing Timeline:</strong> Once a refund request is reviewed and approved in writing by Digital Crowd Technologies, refund instructions are submitted to the payment gateway within 2 business days. The funds typically reflect in the customer&apos;s bank account or card balance within <strong>5 to 7 business days</strong>, subject to intermediary payment aggregator and issuing bank settlement cycles.
            </p>
          </div>

          <h2 className="text-xl font-bold text-white pt-4">3. Project Cancellation Prior to Commencement</h2>
          <p>
            If a client formally requests cancellation within 48 hours of project agreement and before any technical architecture, design, or coding implementation has commenced, the advance deposit will be refunded in full minus a nominal 10% to 15% administrative and technical consultation overhead within 5 to 7 business days. For detailed cancellation rules, please refer to our dedicated <Link href="/cancellation-policy" className="text-blue-400 hover:underline">Cancellation Policy</Link>.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">4. Mid-Development Milestone Reconciliation</h2>
          <p>
            If a project is halted mid-development by mutual agreement, payment will be reconciled strictly against completed milestones and work delivered up to the termination notice. Any surplus balance exceeding the completed milestone deliverables will be refunded to the client within 5 to 7 business days, and corresponding code developed up to that milestone will be handed over to the client.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">5. Third-Party Infrastructure Fees</h2>
          <p>
            Third-party fees paid to external service providers—such as domain registrars, cloud VPS hosts, SSL certificate authorities, SMS gateways, or payment gateway processing charges—are non-refundable by Digital Crowd Technologies and are subject to the terms of those respective providers.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">6. Delivery of Digital Services</h2>
          <p>
            To understand how digital deliverables, staging URLs, source code repositories, and cloud servers are electronically handed over, please review our <Link href="/shipping-policy" className="text-blue-400 hover:underline">Shipping &amp; Delivery Policy</Link>.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">7. Refund Inquiries &amp; Customer Support</h2>
          <p>
            To check the status of an ongoing refund or request clarification regarding milestone invoicing, please reach out to our accounts desk:
          </p>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs sm:text-sm space-y-1.5">
            <p><strong>Digital Crowd Technologies</strong></p>
            <p>Email: <a href={`mailto:${COMPANY.email}`} className="text-blue-400 hover:underline">{COMPANY.email}</a></p>
            <p>Phone: {COMPANY.phoneDisplay}</p>
            <p>Address: {COMPANY.address}</p>
            <p className="text-slate-400 pt-1 border-t border-white/5">
              Support Hours: Monday to Saturday, 9:30 AM to 6:30 PM IST (Response within 24–48 hours)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
