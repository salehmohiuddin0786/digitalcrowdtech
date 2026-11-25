import React from "react";
import Link from "next/link";
import { ArrowLeft, Truck, CheckCircle2, Clock, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import { COMPANY } from "../data/company";

export const metadata = {
  title: "Shipping & Delivery Policy | Digital Crowd Technologies",
  description:
    "Shipping & Delivery Policy for digital services, software deliverables, milestone deployments, and electronic source code handover by Digital Crowd Technologies.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/shipping-policy",
  },
};

export default function ShippingPolicyPage() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3">
            <Truck size={13} />
            <span>Digital Services & Electronic Delivery</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Shipping &amp; Delivery Policy
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-2">
            Last Updated: November 2026 • Digital Crowd Technologies
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            At <strong>Digital Crowd Technologies</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we provide custom software development, professional website engineering, backend API solutions, and digital consulting services. This Shipping &amp; Delivery Policy explains the nature, timelines, and procedures governing the electronic delivery of our digital deliverables.
          </p>

          {/* 1. Nature of Services */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 m-0">
              <CheckCircle2 size={18} className="text-blue-400" />
              <span>1. 100% Digital &amp; Electronic Services (No Physical Goods)</span>
            </h2>
            <p className="text-sm text-slate-300 m-0 leading-relaxed">
              All services rendered by Digital Crowd Technologies are entirely digital and knowledge-based. We do not manufacture, package, or physically ship physical commodities. Therefore, standard courier, postal, or freight services do not apply to our commercial operations.
            </p>
          </div>

          {/* 2. Methods of Delivery */}
          <h2 className="text-xl font-bold text-white pt-4">2. Electronic Delivery Methods</h2>
          <p>
            Depending on your signed scope of work and agreed milestone roadmap, deliverables are transmitted and provided through the following secure electronic channels:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300">
            <li>
              <strong>Live Staging Previews:</strong> Hosted on secure test subdomains (e.g., <code>client.digitalcrowdtech.in</code>) allowing you to test interfaces, forms, and workflows in real time.
            </li>
            <li>
              <strong>Cloud &amp; VPS Production Deployment:</strong> Direct configuration, containerization, and deployment on client-owned Linux VPS, AWS, Cloudflare, or cloud infrastructure.
            </li>
            <li>
              <strong>Source Code &amp; Repository Handover:</strong> Transfer of Git repository ownership (GitHub, GitLab, or Bitbucket) containing custom frontend, backend APIs, and database schemas upon milestone clearance.
            </li>
            <li>
              <strong>Digital Documentation &amp; Access Credentials:</strong> Administrative access keys, API documentation, and architecture manuals delivered directly to your registered business email.
            </li>
          </ul>

          {/* 3. Delivery Timelines */}
          <h2 className="text-xl font-bold text-white pt-4">3. Estimated Delivery Timelines &amp; Milestones</h2>
          <p>
            Delivery schedules are determined by the technical complexity and functional specifications of each project:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 not-prose my-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <span className="text-xs font-mono uppercase text-blue-400 font-bold">Standard Websites</span>
              <p className="text-lg font-extrabold text-white">5–7 Business Days</p>
              <p className="text-xs text-slate-400">Responsive business sites, landing pages, and portfolio showcases.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <span className="text-xs font-mono uppercase text-[#F87000] font-bold">Custom Web Apps</span>
              <p className="text-lg font-extrabold text-white">10–14 Business Days</p>
              <p className="text-xs text-slate-400">Full-stack web apps with databases, auth, and admin management.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <span className="text-xs font-mono uppercase text-emerald-400 font-bold">Turnkey Platforms</span>
              <p className="text-lg font-extrabold text-white">Milestone Sprints</p>
              <p className="text-xs text-slate-400">Enterprise software, school management systems, and e-commerce.</p>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            * Note: Timelines commence from the date of advance deposit receipt, requirement freezing, and provision of required assets (content, logos, credentials) by the client.
          </p>

          {/* 4. Shipping & Delivery Charges */}
          <h2 className="text-xl font-bold text-white pt-4">4. Shipping &amp; Delivery Charges</h2>
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm">
            <strong>Zero Delivery Charges (₹0 / Free):</strong> Because all our software code, website deployments, and technical assets are delivered electronically via the internet, there are <strong>zero shipping, handling, or courier charges</strong> levied on your invoices.
          </div>

          {/* 5. Proof of Delivery */}
          <h2 className="text-xl font-bold text-white pt-4">5. Proof of Delivery &amp; Milestone Sign-Off</h2>
          <p>
            Delivery of a milestone or final project is officially documented and confirmed through:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
            <li>An official delivery email sent from <code>support@digitalcrowdtech.in</code> containing access credentials or live URLs.</li>
            <li>Formal milestone acceptance sign-off or approval provided by the client via email or written communication.</li>
            <li>Successful deployment and verification of the web service on the client&apos;s specified production domain.</li>
          </ul>

          {/* 6. Delays */}
          <h2 className="text-xl font-bold text-white pt-4">6. Project Delays &amp; Dependency Bottlenecks</h2>
          <p>
            While we make every effort to adhere strictly to agreed milestones, delivery schedules may be adjusted in the event of:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
            <li>Delays in receiving essential client assets (brand text, high-resolution media, access credentials).</li>
            <li>Scope modifications, new feature requests, or functional redesigns requested during active development.</li>
            <li>Downtime or verification delays from third-party services (domain registrars, payment gateway approvals, SMS gateway verifications).</li>
          </ul>
          <p>
            In any such event, our project lead will proactively notify you with a revised delivery timeline.
          </p>

          {/* 7. Contact Details */}
          <h2 className="text-xl font-bold text-white pt-4">7. Contact &amp; Delivery Support</h2>
          <p>
            For inquiries regarding project delivery schedules, staging access, or credential handover, please reach out directly:
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
