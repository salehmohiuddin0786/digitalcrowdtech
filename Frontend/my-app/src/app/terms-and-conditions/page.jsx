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
            Last Updated: June 2026 • Digital Crowd Technologies
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            Welcome to Digital Crowd Technologies. By accessing our website or engaging our web development, custom software, or consulting services, you agree to comply with and be bound by the following Terms & Conditions.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">1. Scope of Development Services</h2>
          <p>
            Digital Crowd Technologies provides professional web design, custom web application engineering, backend API development, e-commerce solutions, and software consulting. Each engagement is governed by a mutually agreed scope of work, functional specification, and milestone delivery roadmap.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">2. Milestone Deliverables & Client Approvals</h2>
          <p>
            Projects are structured into sequential milestones (e.g., Requirements & Design, Staging Development, Final Deployment). Clients are required to test, review, and formally approve each milestone. Subsequent development stages proceed upon sign-off and milestone clearance.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">3. Source Code Ownership & Handover</h2>
          <p>
            Upon full settlement of all agreed project milestones and contractual invoices, complete ownership of the custom code, database schemas, repository files, and administrative credentials created specifically for your project is transferred to you. Digital Crowd Technologies retains the right to reference non-confidential project names and public case studies in our portfolio unless a formal non-disclosure agreement (NDA) specifies otherwise.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">4. Third-Party Services & Infrastructure</h2>
          <p>
            Domain name registrations, web hosting servers/VPS, third-party payment gateways, SMS gateways, and external APIs are independent third-party services. Clients are responsible for third-party hosting charges and compliance with the terms of those providers. We assist in configuring these services directly under client-owned accounts.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">5. Governing Law & Jurisdiction</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with our services shall be subject to the exclusive jurisdiction of the competent courts in Hyderabad, Telangana.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">6. Contact</h2>
          <p>
            For any contractual or terms-related questions:
          </p>
          <p className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs sm:text-sm">
            <strong>Digital Crowd Technologies</strong><br />
            Email: <a href={`mailto:${COMPANY.email}`} className="text-blue-400">{COMPANY.email}</a><br />
            Phone: {COMPANY.phoneDisplay}<br />
            Address: {COMPANY.address}
          </p>
        </div>
      </div>
    </div>
  );
}
