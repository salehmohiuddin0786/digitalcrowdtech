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
            Last Updated: June 2026 • Digital Crowd Technologies
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            At Digital Crowd Technologies (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we respect your privacy and are committed to protecting the information you share with us through our website (
            <a href="https://digitalcrowdtech.in" className="text-blue-400 hover:underline">
              https://digitalcrowdtech.in
            </a>
            ) and our direct consultation channels.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">1. Information We Collect</h2>
          <p>
            We only collect personal and business information that you voluntarily provide to us when submitting an inquiry form, calling us, or sending a message on WhatsApp or email. This includes:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
            <li>Your full name and company/business name</li>
            <li>Contact email address and phone number</li>
            <li>Project specifications, requirements, and estimated budgets</li>
          </ul>

          <h2 className="text-xl font-bold text-white pt-4">2. How We Use Your Information</h2>
          <p>We use the information collected solely for legitimate business purposes:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
            <li>To respond to your inquiries and schedule project consultations</li>
            <li>To prepare accurate technical scope estimates and milestone quotations</li>
            <li>To communicate project status, staging links, and delivery milestones during development</li>
          </ul>
          <p>
            We do not sell, rent, trade, or distribute your contact details to any third-party marketing companies.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">3. Data Security & Storage</h2>
          <p>
            All inquiries submitted through our website are transmitted securely using industry-standard SSL (HTTPS) encryption and stored in our protected database. Access to your contact records is strictly restricted to our internal engineering team.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">4. Third-Party Links & Services</h2>
          <p>
            Our website may reference external tools (such as WhatsApp, Google Maps, or hosting providers). When you navigate to third-party services, their respective privacy policies govern your data.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">5. Contact Us</h2>
          <p>
            If you have questions regarding this Privacy Policy, you may contact us at:
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
