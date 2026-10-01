import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Server,
  Database,
  Lock,
  Zap,
  Layers,
  Cpu,
  Mail,
  Smartphone,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import SectionHeading from "../../Component/SectionHeading";

export const metadata = {
  title: "Backend & API Development | Digital Crowd Technologies",
  description:
    "Powerful backend systems and REST APIs built with Node.js, Express, MySQL, MongoDB, and Socket.io. Authentication, database design, payment integrations, and server deployment.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/services/backend-api-development",
  },
};

export default function BackendApiDevelopmentPage() {
  const backendServices = [
    { title: "Node.js Development", desc: "Non-blocking, event-driven server runtime designed for fast I/O and high concurrency." },
    { title: "Express.js Development", desc: "Modular routing, layered middleware, centralized error handling, and robust CORS management." },
    { title: "REST API Engineering", desc: "Structured, versioned JSON endpoints with filtering, sorting, pagination, and strict HTTP status codes." },
    { title: "Database Design & Migrations", desc: "Normalized relational schemas in MySQL with foreign key constraints, indexes, and Sequelize/Prisma ORMs." },
    { title: "Authentication Engines", desc: "PBKDF2/bcrypt salted password hashing, JWT access and refresh token lifecycles, and session invalidation." },
    { title: "Authorization & RBAC", desc: "Granular permission gates inspecting user roles to strictly prevent unauthorized horizontal and vertical access." },
    { title: "Admin & Analytics APIs", desc: "Dedicated backend endpoints for querying operational metrics, audit trails, and aggregate business reports." },
    { title: "Payment Gateway APIs", desc: "Seamless handling of payment sessions, Razorpay/Cashfree webhooks, signature verification, and automated refunds." },
    { title: "Mobile OTP Verification APIs", desc: "Integration with SMS providers (Fast2SMS, Twilio) for high-speed OTP dispatch, cooldowns, and verification." },
    { title: "Email & Transactional Alerts", desc: "Configured SMTP dispatch using Nodemailer for welcome emails, order receipts, and admin notices." },
    { title: "Third-Party API Integrations", desc: "Connecting with CRM platforms, maps, logistics providers, and external data feeds via authenticated REST/GraphQL." },
    { title: "Real-Time WebSockets", desc: "Bi-directional event streaming using Socket.io for live order tracking, multiplayer coordination, and chat." },
    { title: "Linux Server & VPS Deployment", desc: "Setting up production Ubuntu VPS environments with Nginx reverse proxy, systemd/PM2 supervision, and SSL." },
  ];

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden tech-grid-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6">
            <span>Server Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Powerful Backends Behind <br />
            <span className="text-gradient-brand">Modern Applications</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
            The frontend is only as reliable as the engine behind it. Digital Crowd Technologies develops secure, scalable backend systems, APIs, and databases that power websites and mobile applications.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition"
            >
              <span>Discuss Your Backend Project</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* TECH STRIP */}
      <section className="py-6 bg-[#06080D] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2"><Cpu size={14} className="text-blue-400" /> Node.js v20+</span>
          <span className="flex items-center gap-2"><Server size={14} className="text-cyan-400" /> Express.js</span>
          <span className="flex items-center gap-2"><Database size={14} className="text-indigo-400" /> MySQL 8.0</span>
          <span className="flex items-center gap-2"><Layers size={14} className="text-emerald-400" /> MongoDB</span>
          <span className="flex items-center gap-2"><Zap size={14} className="text-amber-400" /> Socket.io</span>
        </div>
      </section>

      {/* 13 BACKEND CAPABILITIES */}
      <section className="py-20 bg-[#07090E] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Engineering Specializations"
            title="Complete Backend & API Services"
            subtitle="Engineered with security, strict validation, and production-tested data integrity."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {backendServices.map((srv) => (
              <div key={srv.title} className="p-6 rounded-2xl bg-[#0B0F19] border border-white/10 hover:border-blue-500/30 transition">
                <h3 className="text-base font-bold text-white mb-2">{srv.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 bg-[#05070B] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Need a Robust Server or API Built?
          </h2>
          <p className="text-sm text-slate-400">
            Whether powering a web application, mobile app, or internal tool, we build dependable backend infrastructure.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition"
            >
              <span>Discuss Your Backend Project</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
