import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { COMPANY } from "../data/company";

export const metadata = {
  title: "Privacy Policy | Digital Crowd Technologies",
  description:
    "Privacy Policy for Digital Crowd Technologies. Learn how we handle your business inquiries and information.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-2">
            Last Updated: November 2026 • Digital Crowd Technologies
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            At <strong>Digital Crowd Technologies</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we respect your privacy and are committed to protecting the information you share with us through our website (
            <a href="https://digitalcrowdtech.in" className="text-blue-400 hover:underline">
              https://digitalcrowdtech.in
            </a>
            ) and our direct consultation channels.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">1. Information We Collect</h2>
          <p>
            We only collect personal and business information that you voluntarily provide to us when submitting an inquiry form, booking a consultation, calling us, or sending a message on WhatsApp or email. This includes:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
            <li>Your full name, job title, and company/business name</li>
            <li>Contact email address and phone number</li>
            <li>Project specifications, architectural requirements, and estimated budgets</li>
            <li>Billing details required for tax invoices (GSTIN, company billing address)</li>
          </ul>

          <h2 className="text-xl font-bold text-white pt-4">2. How We Use Your Information</h2>
          <p>We use the information collected solely for legitimate business purposes:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
            <li>To respond to your inquiries and schedule project consultations</li>
            <li>To prepare accurate technical scope estimates and milestone quotations</li>
            <li>To communicate project status, staging links, and delivery milestones during development</li>
            <li>To generate statutory tax invoices and reconcile project milestone settlements</li>
          </ul>
          <p>
            We do not sell, rent, trade, or distribute your personal data or contact details to any third-party marketing companies.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">3. Data Security &amp; Storage</h2>
          <p>
            All inquiries and data transmissions on our website are protected using industry-standard SSL (HTTPS) 256-bit encryption and stored in secure, access-controlled databases. Access to client records is strictly limited to authorized engineers and account managers.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">4. Third-Party Payment Processing &amp; Transaction Data</h2>
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-slate-200 text-sm leading-relaxed space-y-2.5">
            <p>
              When clients settle invoices or milestone fees online, payments are facilitated through <strong>RBI-authorized third-party payment aggregators and payment gateways (such as PhonePe)</strong>.
            </p>
            <p className="text-xs text-slate-300">
              <strong>Handling of Payment Credentials:</strong> All sensitive payment credentials—including full credit/debit card numbers, CVVs, net banking login credentials, and UPI PINs—are submitted directly to and processed securely by the third-party payment processor under their certified bank-grade encryption infrastructure. Digital Crowd Technologies does not receive, store, or process sensitive payment credentials on our servers, and Digital Crowd Technologies does not claim independent PCI-DSS certification.
            </p>
            <p className="text-xs text-slate-300">
              <strong>Retained Transaction Information:</strong> For statutory accounting, legal records, and audit reconciliation, Digital Crowd Technologies retains only non-sensitive transaction records, including: Transaction Reference ID, transaction date and time, amount paid, payment method category (e.g., UPI, Card, Net Banking), client billing name, email, phone number, and invoice/milestone reference.
            </p>
          </div>

          <h2 className="text-xl font-bold text-white pt-4">5. Third-Party Links &amp; External Services</h2>
          <p>
            Our website may reference external services (such as WhatsApp, Google Maps, or cloud hosting providers). When you navigate to third-party platforms, their respective privacy policies govern your data.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">6. Contact &amp; Grievance Redressal</h2>
          <p>
            If you have questions, privacy requests, or grievances regarding this Privacy Policy, please contact our designated privacy officer:
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
