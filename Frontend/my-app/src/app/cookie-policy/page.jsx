import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { COMPANY } from "../data/company";

export const metadata = {
  title: "Cookie Policy | Digital Crowd Technologies",
  description:
    "Cookie Policy for Digital Crowd Technologies website. Understand how we use cookies and local storage.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/cookie-policy",
  },
};

export default function CookiePolicyPage() {
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
            Cookie Policy
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-2">
            Last Updated: June 2026 • Digital Crowd Technologies
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            This Cookie Policy explains how Digital Crowd Technologies (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) uses cookies and similar technologies when you visit our website at{" "}
            <a href="https://digitalcrowdtech.in" className="text-blue-400 hover:underline">
              https://digitalcrowdtech.in
            </a>
            .
          </p>

          <h2 className="text-xl font-bold text-white pt-4">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files placed on your computer or mobile device when you visit a website. They are widely used to make websites work efficiently, remember your preferences, and maintain secure sessions.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">2. Cookies We Use</h2>
          <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300">
            <li>
              <strong>Essential & Technical Cookies:</strong> Strictly necessary to navigate our website, submit inquiries safely, and protect against automated cross-site spam.
            </li>
            <li>
              <strong>Session & Security Storage:</strong> For administrative users logging into our management portal, secure local storage tokens maintain authenticated sessions.
            </li>
            <li>
              <strong>Performance & Analytics:</strong> Basic anonymous metrics to understand page load times and improve Core Web Vitals across devices.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-white pt-4">3. Managing Your Cookie Preferences</h2>
          <p>
            Most web browsers allow you to control cookies through their settings preferences. You may choose to block or delete cookies in your browser at any time, although doing so may affect certain interactive form functions.
          </p>

          <h2 className="text-xl font-bold text-white pt-4">4. Inquiries</h2>
          <p>
            For questions about our use of cookies or privacy standards:
          </p>
          <p className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs sm:text-sm">
            <strong>Digital Crowd Technologies</strong><br />
            Email: <a href={`mailto:${COMPANY.email}`} className="text-blue-400">{COMPANY.email}</a><br />
            Address: {COMPANY.address}
          </p>
        </div>
      </div>
    </div>
  );
}
