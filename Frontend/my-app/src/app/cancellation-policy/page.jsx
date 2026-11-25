import React from "react";
import Link from "next/link";
import { ArrowLeft, XCircle, CheckCircle2, Clock, ShieldAlert, Mail, Phone, MapPin } from "lucide-react";
import { COMPANY } from "../data/company";

export const metadata = {
  title: "Cancellation Policy | Digital Crowd Technologies",
  description:
    "Cancellation Policy for custom web development, software engineering, and milestone contracts by Digital Crowd Technologies.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/cancellation-policy",
  },
};

export default function CancellationPolicyPage() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-3">
            <XCircle size={13} />
            <span>Service Contract &amp; Order Cancellation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Cancellation Policy
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-2">
            Last Updated: November 2026 • Digital Crowd Technologies
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            At <strong>Digital Crowd Technologies</strong>, we are dedicated to building transparent, high-performing software and web solutions. Because our work involves custom software architecture, allocated developer hours, and customized cloud infrastructure, cancellations are governed by structured guidelines outlined below.
          </p>

          {/* 1. Cancellation Window */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 m-0">
              <Clock size={18} className="text-amber-400" />
              <span>1. Cancellation Prior to Project Commencement</span>
            </h2>
            <p className="text-sm text-slate-300 m-0 leading-relaxed">
              If a cancellation request is submitted within <strong>48 hours of project confirmation</strong> and prior to the commencement of any UI design, database planning, or code implementation:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-300 pt-2">
              <li>Your advance payment will be refunded in full, minus a nominal 10% to 15% administrative and technical consultation fee.</li>
              <li>Refunds are credited directly back to the <strong>original source of payment (Bank/UPI/Card)</strong> within <strong>5 to 7 business days</strong>.</li>
            </ul>
          </div>

          {/* 2. Cancellation During Active Development */}
          <h2 className="text-xl font-bold text-white pt-4">2. Cancellation During Active Development</h2>
          <p>
            If a client requests project termination after development has begun:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300">
            <li>Work on the project is halted immediately upon receipt of the written cancellation notice.</li>
            <li>An engineering audit will reconcile developer hours, milestone progress, and deliverables completed up to the cancellation timestamp.</li>
            <li>Any unutilized balance exceeding the completed milestone work will be refunded to the client within 5 to 7 business days.</li>
            <li>All custom source code, design assets, and database schemas developed up to that point will be formally handed over to the client.</li>
          </ul>

          {/* 3. Non-Cancellable Stages */}
          <h2 className="text-xl font-bold text-white pt-4">3. Non-Cancellable Milestones &amp; Post-Deployment</h2>
          <p>
            Cancellation cannot be accepted for:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
            <li>Milestones that have already been formally reviewed, approved, and signed off by the client.</li>
            <li>Projects that have been successfully deployed to the client&apos;s live production domain or handed over in full.</li>
            <li>Third-party costs incurred on behalf of the client (such as domain registrations, VPS hosting fees, SSL certificates, or paid third-party API licenses).</li>
          </ul>

          {/* 4. Cancellation Procedure */}
          <h2 className="text-xl font-bold text-white pt-4">4. How to Submit a Cancellation Request</h2>
          <p>
            To initiate a formal cancellation, the authorized client representative must send an email to our official support desk:
          </p>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm space-y-1.5">
            <p><strong>To:</strong> <a href={`mailto:${COMPANY.email}`} className="text-blue-400">{COMPANY.email}</a></p>
            <p><strong>Subject:</strong> Project Cancellation Request – [Your Project Name / Invoice ID]</p>
            <p><strong>Information Required:</strong> Authorized Client Name, Registered Phone Number, Agreement Date, and Reason for Cancellation.</p>
          </div>
          <p className="text-xs text-slate-400">
            Our team will acknowledge your cancellation request within 24 to 48 business hours and initiate milestone reconciliation.
          </p>

          {/* 5. Company Termination Rights */}
          <h2 className="text-xl font-bold text-white pt-4">5. Cancellation Initiated by Digital Crowd Technologies</h2>
          <p>
            Digital Crowd Technologies reserves the right to suspend or cancel an agreement if:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
            <li>The client fails to provide essential project information, credentials, or approvals for more than 30 consecutive business days despite repeated written notices.</li>
            <li>The project involves unlawful, fraudulent, or defamatory content violating Indian cyber laws.</li>
          </ul>
          <p>
            In such events, accounts will be reconciled strictly against work delivered.
          </p>

          {/* 6. Customer Support */}
          <h2 className="text-xl font-bold text-white pt-4">6. Assistance &amp; Escalations</h2>
          <p>
            For questions or discussions regarding service contracts and cancellations:
          </p>
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 text-xs sm:text-sm space-y-2">
            <p className="font-bold text-white text-base">Digital Crowd Technologies</p>
            <p className="flex items-center gap-2 text-slate-300">
              <MapPin size={15} className="text-blue-400 shrink-0" />
              <span>{COMPANY.address}</span>
            </p>
            <p className="flex items-center gap-2 text-slate-300">
              <Mail size={15} className="text-blue-400 shrink-0" />
              <span>Email: <a href={`mailto:${COMPANY.email}`} className="text-blue-400 hover:underline">{COMPANY.email}</a></span>
            </p>
            <p className="flex items-center gap-2 text-slate-300">
              <Phone size={15} className="text-blue-400 shrink-0" />
              <span>Customer Support Phone: {COMPANY.phoneDisplay}</span>
            </p>
            <p className="text-slate-400 pt-1 border-t border-white/5">
              Support Hours: Monday to Saturday, 9:30 AM to 6:30 PM IST (Response within 24–48 hours)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
