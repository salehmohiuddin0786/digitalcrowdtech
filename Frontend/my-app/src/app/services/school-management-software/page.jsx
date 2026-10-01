import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Users,
  Calendar,
  CreditCard,
  Bell,
  FileSpreadsheet,
  ShieldCheck,
  UserCheck,
  BookOpen,
} from "lucide-react";
import SectionHeading from "../../Component/SectionHeading";

export const metadata = {
  title: "School Management Software | Digital Crowd Technologies",
  description:
    "Complete school and educational institution management software with dedicated portals for Admin, Teachers, Students, and Parents. Fees, attendance, timetable, and reports.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/services/school-management-software",
  },
};

export default function SchoolManagementSoftwarePage() {
  const portals = [
    {
      role: "Super Admin & Principal Portal",
      badge: "Administration",
      desc: "Centralized institutional command center for principal, directors, and head office staff.",
      features: [
        "Student admission lifecycle, documentation, and class allocation",
        "Teacher staff hiring, profile verification, and subject assignments",
        "Campus-wide daily attendance monitoring across all grades",
        "Fee structure setup, installment tracking, and balance reconciliation",
        "Instant digital notices and circular distribution to all portals",
        "Master academic timetable scheduling and classroom assignments",
        "Institutional audit logs and downloadable regulatory reports",
      ],
    },
    {
      role: "Teacher Portal",
      badge: "Classroom",
      desc: "Fast, mobile-friendly interface designed for teachers to complete daily tasks in seconds.",
      features: [
        "1-click daily classroom attendance marking from phone or computer",
        "Student roster inspection with emergency contact details",
        "Teacher leave request submissions and approval status",
        "Class subject schedules and daily substitution alerts",
        "Homework assignments and exam grade entry",
        "Institutional teacher circulars and staff meeting announcements",
      ],
    },
    {
      role: "Student Portal",
      badge: "Academics",
      desc: "Empowers students to stay organized with their academic schedules and performance.",
      features: [
        "Personal attendance percentage and presence history",
        "Weekly class timetable with subject timings and room numbers",
        "Digital school bulletin board for holidays, exams, and competitions",
        "Subject syllabus tracking and homework assignment deadlines",
        "Exam schedules, date sheets, and published report cards",
      ],
    },
    {
      role: "Parent Portal",
      badge: "Guardians",
      desc: "Provides transparency and peace of mind to parents regarding their child's education.",
      features: [
        "Child profile overview and enrolled class details",
        "Real-time attendance alerts preventing unauthorized absences",
        "Fee dues breakdown, payment history, and instant PDF receipts",
        "School announcements, parent-teacher meeting notifications",
        "Direct visibility into academic test scores and remarks",
      ],
    },
  ];

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden tech-grid-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-6">
            <span>Education ERP Solution</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Simplify School & <br />
            <span className="text-gradient-brand">Institute Management</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
            Unite administrators, teachers, students, and parents into one unified digital system. Manage admissions, fee collections, attendance, and timetables without paperwork.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition"
            >
              <span>Request a Demo</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/projects/school-management-system"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition"
            >
              <span>View ERP Case Study</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4 DEDICATED PORTALS */}
      <section className="py-20 bg-[#07090E] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Role-Scoped Access"
            title="Four Dedicated Portals for Clear Collaboration"
            subtitle="Each stakeholder gets a tailored experience focused strictly on their everyday tasks."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portals.map((p) => (
              <div key={p.role} className="p-8 rounded-2xl bg-[#090D16] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{p.role}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                <div className="pt-2 border-t border-white/5 space-y-2">
                  {p.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 bg-[#05070B] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Schedule a School ERP Demonstration
          </h2>
          <p className="text-sm text-slate-400">
            See how our school management system simplifies attendance, fee records, and communication for your institution.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition"
            >
              <span>Request a Demo</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
