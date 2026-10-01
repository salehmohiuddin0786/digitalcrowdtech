import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Server,
  Database,
  Layers,
  Globe,
  Clock,
  Zap,
  ShoppingBag,
  Truck,
  Users,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import SectionHeading from "../../Component/SectionHeading";
import { getProjectBySlug } from "../../data/projects";

export const metadata = {
  title: "Ruchi Bazzar Case Study | Digital Crowd Technologies",
  description:
    "Case study of Ruchi Bazzar: A complete hyperlocal food and grocery delivery platform connecting customers, restaurants, riders, and administrators built with Next.js, Node.js, Express, MySQL, and Socket.io.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/projects/ruchi-bazzar",
  },
};

export default function RuchiBazzarCaseStudyPage() {
  const project = getProjectBySlug("ruchi-bazzar");

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden tech-grid-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-orange-500/10 border border-orange-500/20 text-orange-400 mb-6">
            <span>Case Study</span>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-white p-2 mx-auto mb-6 shadow-xl shadow-orange-500/10 flex items-center justify-center">
            <Image
              src="/projects/ruchi-logo.png"
              alt="Ruchi Bazzar Logo"
              width={56}
              height={56}
              className="w-full h-full object-contain"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Ruchi Bazzar <br />
            <span className="text-gradient-brand">Hyperlocal Food & Delivery Ecosystem</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
            A full-stack monorepo connecting customers, restaurant merchants, delivery riders, and superadmin operators into one synchronized real-time platform.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono rounded-lg bg-white/5 text-slate-300 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* OVERVIEW & PROBLEM */}
      <section className="py-20 bg-[#07090E] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* The Business Problem */}
            <div className="p-8 rounded-2xl bg-[#090D16] border border-white/10 space-y-4">
              <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider block">
                01. The Business Problem
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Aggregator Commissions & Fragmented Order Dispatch
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Local restaurants and hyperlocal merchants struggle with two major challenges:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Exorbitant aggregator marketplace commissions of 20% to 35% on every meal sold.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Lack of direct customer data, phone numbers, and repeat loyalty communication.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Miscommunication between kitchen order preparation, rider availability, and customer tracking.</span>
                </li>
              </ul>
            </div>

            {/* The Engineering Solution */}
            <div className="p-8 rounded-2xl bg-[#090D16] border border-white/10 space-y-4">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                02. The Engineering Solution
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                A Unified Monorepo with Real-Time WebSockets
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Digital Crowd Technologies architected a complete custom delivery ecosystem featuring four synchronized Next.js web applications sharing a high-performance Express/Sequelize API and MySQL database.
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>Customer web app with mobile OTP sign-in, live dish customization, cart, and order tracking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>Dedicated merchant kitchen dashboard with live audible order alerts and cooking timers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>Rider dispatch web application for active order pickup and delivery milestones.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ARCHITECTURE OVERVIEW */}
      <section className="py-20 bg-[#05070B] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Technical Architecture"
            title="Monorepo Structure & System Architecture"
            subtitle="How data and real-time events flow across the Ruchi Bazzar ecosystem."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {project.architecture.clientApps.map((app, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#090D16] border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider block">
                  Package 0{i + 1}
                </span>
                <h3 className="text-base font-bold text-white">{app.name}</h3>
                <span className="text-xs font-mono text-cyan-400 block">{app.tech}</span>
                <p className="text-xs text-slate-400 leading-relaxed pt-1">{app.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-2xl bg-[#0B0F19] border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase block mb-1">
                Backend Architecture
              </span>
              <p className="text-slate-300 leading-relaxed">
                {project.architecture.backend}
              </p>
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase block mb-1">
                Database Schema
              </span>
              <p className="text-slate-300 leading-relaxed">
                {project.architecture.database}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLETE FEATURE LIST */}
      <section className="py-20 bg-[#07090E] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Production Capabilities"
            title="Features Implemented in Ruchi Bazzar"
            subtitle="Verified functionality operating within the platform code."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {project.features.map((feat, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#0B0F19] border border-white/10 flex items-start gap-3">
                <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-300">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEVELOPMENT CHALLENGES */}
      <section className="py-20 bg-[#05070B] border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Engineering Insights"
            title="Development Challenges & Solutions"
            subtitle="Real technical problems encountered during development and how we solved them."
          />

          <div className="space-y-6">
            {project.challenges.map((c, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#090D16] border border-white/10 space-y-2">
                <h3 className="text-base font-bold text-white">
                  Challenge: {c.challenge}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  <strong className="text-blue-400 font-semibold">Solution: </strong>
                  {c.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#07090E] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Need an E-Commerce or Delivery Platform?
          </h2>
          <p className="text-sm text-slate-400">
            We have the real architecture and engineering experience to build and launch your custom delivery or transactional platform.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition"
            >
              <span>Discuss Your E-Commerce Platform</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
