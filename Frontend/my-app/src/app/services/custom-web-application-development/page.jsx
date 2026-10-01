import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Server,
  Database,
  Lock,
  Layers,
  CreditCard,
  Zap,
  ShieldCheck,
  Check,
} from "lucide-react";
import SectionHeading from "../../Component/SectionHeading";
import { getServiceBySlug } from "../../data/services";

export const metadata = {
  title: "Custom Websites & Web Applications | Starting from ₹9,999 | Digital Crowd Technologies",
  description:
    "Build custom web applications with Next.js, Node.js, Express, and MySQL. Frontend, backend APIs, relational databases, user authentication, and admin dashboards starting from ₹9,999.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/services/custom-web-application-development",
  },
};

export default function CustomWebApplicationDevelopmentPage() {
  const service = getServiceBySlug("custom-web-application-development");

  const pillars = [
    {
      title: "Frontend Development",
      desc: "Fast, accessible user interfaces built with React 19, Next.js App Router, and Tailwind CSS.",
      icon: Code2,
    },
    {
      title: "Backend Development",
      desc: "Modular Node.js and Express.js server architecture with clean RESTful endpoints.",
      icon: Server,
    },
    {
      title: "Database Development",
      desc: "Relational MySQL database schemas, data normalization, indexing, and Prisma/Sequelize ORMs.",
      icon: Database,
    },
    {
      title: "API Development",
      desc: "Secure, predictable REST APIs with comprehensive input validation, status codes, and error handling.",
      icon: Layers,
    },
    {
      title: "Authentication & Security",
      desc: "PBKDF2/bcrypt salted hashing, JWT access tokens, session lifecycles, and protected route middleware.",
      icon: Lock,
    },
    {
      title: "Admin Dashboards",
      desc: "Custom administrative portals to search, filter, update records, and monitor business activity.",
      icon: ShieldCheck,
    },
    {
      title: "Role-Based Access (RBAC)",
      desc: "Granular permissions ensuring admins, managers, staff, and customers only see authorized data.",
      icon: CheckCircle2,
    },
    {
      title: "Payment Integration",
      desc: "Secure online payment collection with Razorpay, Cashfree, UPI, Net Banking, and automated webhooks.",
      icon: CreditCard,
    },
    {
      title: "Third-Party APIs",
      desc: "Integration with external CRMs, SMS gateways (Fast2SMS/Twilio), email dispatch (Nodemailer), and maps.",
      icon: Zap,
    },
    {
      title: "Real-Time Features",
      desc: "Bi-directional event streaming using Socket.io for live notifications, status updates, and chat.",
      icon: Zap,
    },
    {
      title: "Production Deployment",
      desc: "Configuration of Linux VPS servers, Nginx reverse proxy, PM2 process management, and SSL encryption.",
      icon: Server,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden tech-grid-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-6">
            <span>Full-Stack Engineering</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Custom Websites & Web Applications <br />
            <span className="text-gradient-brand">Starting From ₹9,999</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
            Build more than a website. We develop custom frontend, backend, database and business functionality around your requirements.
          </p>

          <div className="mt-6 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 max-w-md mx-auto text-xs text-cyan-300 font-medium">
            * ₹9,999 is a starting price. Final pricing depends on project requirements.
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition"
            >
              <span>Discuss Your Project</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition"
            >
              <span>Explore Real Projects</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 11 CORE APPLICATION CAPABILITIES */}
      <section className="py-20 bg-[#07090E] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Full-Stack Capabilities"
            title="Engineered from Frontend to Database"
            subtitle="Everything required to build and deploy complex, high-reliability business software."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pil) => {
              const Icon = pil.icon;
              return (
                <div key={pil.title} className="p-6 rounded-2xl bg-[#0B0F19] border border-white/10 hover:border-cyan-500/30 transition">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{pil.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{pil.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* REAL EXAMPLES LINKAGE */}
      <section className="py-20 bg-[#05070B] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Real Systems in Production"
            title="Real Custom Web Applications We Built"
            subtitle="Inspect actual architecture breakdowns from our delivered projects."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-7 rounded-2xl bg-[#090D16] border border-white/10 space-y-4">
              <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider block">
                Food Delivery Platform
              </span>
              <h3 className="text-xl font-bold text-white">Ruchi Bazzar</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Customer Next.js storefront, restaurant partner kitchen dashboard, delivery fleet app, and superadmin management with Socket.io real-time orders.
              </p>
              <div className="pt-2">
                <Link
                  href="/projects/ruchi-bazzar"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
                >
                  <span>Read Ruchi Bazzar Case Study</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-[#090D16] border border-white/10 space-y-4">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block">
                Multi-Tenant ERP
              </span>
              <h3 className="text-xl font-bold text-white">School Management System</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Four role-isolated portals for Super Admins, Teachers, Students, and Parents, managing fee collections, attendance, and student reports on MySQL.
              </p>
              <div className="pt-2">
                <Link
                  href="/projects/school-management-system"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
                >
                  <span>Read School ERP Case Study</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 bg-[#07090E] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Have a Custom Web Application in Mind?
          </h2>
          <p className="text-sm text-slate-400">
            Tell us about your workflows, user roles, and database needs. We&apos;ll help you scope the architecture.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition"
            >
              <span>Discuss Your Project</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
