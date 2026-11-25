import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { COMPANY } from "../data/company";

export const metadata = {
  title: "Terms & Conditions | Digital Crowd Technologies",
  description:
    "Terms and Conditions for development services, milestone planning, approvals, and deliverables by Digital Crowd Technologies.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/terms-and-conditions",
  },
};

export default function TermsAndConditionsPage() {
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
            Terms & Conditions
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-2">
            Last Updated: November 2026 • Digital Crowd Technologies
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            Welcome to <strong>Digital Crowd Technologies</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By accessing our website or engaging our web development, custom software engineering, API development, or consulting services, you agree to comply with and be bound by the following Terms &amp; Conditions.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">1. Scope of Development Services</h2>
          <p>
            Digital Crowd Technologies provides professional web design, custom web application engineering, backend API development, e-commerce solutions, and software consulting. Each engagement is governed by a mutually agreed scope of work, functional specification, and sequential milestone delivery roadmap.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">2. Milestone Deliverables &amp; Client Approvals</h2>
          <p>
            Projects are structured into sequential milestones (e.g., Requirements &amp; Architecture, Staging Development, Final Deployment). Clients are required to test, review, and formally approve each milestone. Subsequent development stages proceed upon sign-off and milestone clearance. Electronic delivery procedures are governed by our <Link href="/shipping-policy" className="text-blue-400 hover:underline">Shipping &amp; Delivery Policy</Link>.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">3. Payment Terms, Milestone Invoicing &amp; Currency</h2>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 text-sm">
            <ul className="list-disc list-inside space-y-2 pl-1 text-slate-300">
              <li>
                <strong>Pricing Currency:</strong> All project quotations, proposals, and commercial invoices are quoted and payable strictly in <strong>Indian National Rupees (INR / ₹)</strong>, inclusive of applicable taxes unless specified otherwise in writing.
              </li>
              <li>
                <strong>Milestone Payment Structure:</strong> Custom development engagements are divided into sequential milestones (e.g., discovery &amp; architecture kickoff, functional staging review, and final production handover). Work on subsequent milestones proceeds only upon formal approval and settlement of the preceding deliverable.
              </li>
              <li>
                <strong>Online Payment Collection:</strong> Online payments are facilitated via RBI-authorized payment aggregators (such as PhonePe) supporting UPI, Credit Cards, Debit Cards, and Net Banking.
              </li>
              <li>
                <strong>Failed &amp; Interrupted Transactions:</strong> If an account is debited during a failed or interrupted online transaction, the funds are held by the intermediary banking network and are typically reversed automatically to the customer&apos;s source account within 3 to 7 business days according to standard banking protocols.
              </li>
              <li>
                <strong>Duplicate Charges:</strong> In the rare instance of a duplicate debit for the same invoice, the client should notify <code>support@digitalcrowdtech.in</code> with the transaction reference IDs. Verified duplicate charges will be refunded directly to the original payment source within 5 to 7 business days.
              </li>
              <li>
                <strong>Billing Disputes:</strong> Any billing discrepancies, milestone queries, or transaction concerns must be reported in writing to <code>support@digitalcrowdtech.in</code> within 14 calendar days of the invoice or charge date. Our accounts team will review and respond within 3 business days.
              </li>
              <li>
                <strong>Refunds &amp; Cancellations:</strong> Project cancellations and refunds are governed strictly by our dedicated <Link href="/refund-policy" className="text-blue-400 hover:underline">Refund Policy</Link> and <Link href="/cancellation-policy" className="text-blue-400 hover:underline">Cancellation Policy</Link>.
              </li>
            </ul>
          </div>

          <h2 className="text-xl font-bold text-white pt-4">4. Source Code Ownership &amp; Handover</h2>
          <p>
            Upon full settlement of all agreed project milestones and contractual invoices, complete ownership of the custom code, database schemas, repository files, and administrative credentials created specifically for your project is transferred to you. Digital Crowd Technologies retains the right to reference non-confidential project names and public case studies in our portfolio unless a formal non-disclosure agreement (NDA) specifies otherwise.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">5. Third-Party Services &amp; Infrastructure</h2>
          <p>
            Domain name registrations, web hosting servers/VPS, third-party payment gateways, SMS gateways, and external APIs are independent third-party services. Clients are responsible for third-party hosting charges and compliance with the terms of those providers. We assist in configuring these services directly under client-owned accounts so you retain total ownership.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">6. Governing Law &amp; Dispute Resolution</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with our services or online payments shall be subject to the exclusive jurisdiction of the competent courts in Hyderabad, Telangana.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">7. Contact &amp; Contractual Support</h2>
          <p>
            For any contractual, invoicing, or legal questions:
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
