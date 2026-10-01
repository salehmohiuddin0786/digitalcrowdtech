"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Code2,
  Database,
  Server,
  Layers,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Cpu,
  Globe,
} from "lucide-react";
import BorderBeam from "./BorderBeam";

export default function HeroArchitectureVisual() {
  const [activeTab, setActiveTab] = useState("architecture");

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-2xl bg-[#0B0F19] [html.light_&]:bg-white border border-white/10 [html.light_&]:border-slate-300 shadow-2xl shadow-blue-950/30 overflow-hidden">
      {/* 21st.dev Magic UI BorderBeam */}
      <BorderBeam duration={8} rx={16} strokeWidth={2} />
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#080B12] border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs font-mono text-slate-400">
            digitalcrowdtech-stack :: production
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            live-stack
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 bg-[#090D16] text-xs font-medium">
        <button
          type="button"
          onClick={() => setActiveTab("architecture")}
          className={`flex items-center gap-2 px-4 py-2.5 transition-colors border-b-2 ${
            activeTab === "architecture"
              ? "border-blue-500 text-blue-400 bg-white/[0.03]"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Layers size={14} />
          <span>Full-Stack Architecture</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("ruchi")}
          className={`flex items-center gap-2 px-4 py-2.5 transition-colors border-b-2 ${
            activeTab === "ruchi"
              ? "border-blue-500 text-blue-400 bg-white/[0.03]"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Globe size={14} />
          <span>Ruchi Bazzar (Real System)</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("school")}
          className={`flex items-center gap-2 px-4 py-2.5 transition-colors border-b-2 ${
            activeTab === "school"
              ? "border-blue-500 text-blue-400 bg-white/[0.03]"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Cpu size={14} />
          <span>School ERP (Real SaaS)</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-5 font-sans">
        {activeTab === "architecture" && (
          <div className="space-y-3.5">
            <div className="text-xs text-slate-400 font-mono mb-2">
              {"// Engineering pipeline delivered under one development process:"}
            </div>

            {/* Layer 1: Frontend */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-blue-500/20 hover:border-blue-500/40 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400">
                    <Code2 size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white">01. Frontend Engineering</h3>
                    <p className="text-[11px] text-slate-400">
                      Next.js, React, Tailwind CSS, Responsive UI & Web Vitals
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-300">
                  Client Layer
                </span>
              </div>
            </div>

            {/* Layer 2: Backend APIs */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-cyan-500/20 hover:border-cyan-500/40 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-400">
                    <Server size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white">02. Backend & REST APIs</h3>
                    <p className="text-[11px] text-slate-400">
                      Node.js, Express.js, JWT Authentication, OTPs & WebSockets
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300">
                  API & Logic
                </span>
              </div>
            </div>

            {/* Layer 3: Database */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-indigo-500/20 hover:border-indigo-500/40 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/15 flex items-center justify-center text-indigo-400">
                    <Database size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white">03. Relational Database</h3>
                    <p className="text-[11px] text-slate-400">
                      MySQL & MongoDB, Relational Schemas, Indexing & ACID transactions
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300">
                  Data Persistence
                </span>
              </div>
            </div>

            {/* Layer 4: Production Deployment */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-emerald-500/20 hover:border-emerald-500/40 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white">04. Deployment & Handover</h3>
                    <p className="text-[11px] text-slate-400">
                      VPS/Cloud hosting, SSL certificates, Nginx, Source Code Handover
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
                  100% Client Owned
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "ruchi" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400">
                  <Globe size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Ruchi Bazzar Monorepo</h3>
                  <p className="text-[11px] text-slate-400">Hyperlocal Food & Grocery Delivery Ecosystem</p>
                </div>
              </div>
              <Link
                href="/projects/ruchi-bazzar"
                className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>Case Study</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-slate-400 text-[10px] uppercase font-mono block">Storefront</span>
                <span className="font-medium text-slate-200">Customer Next.js App</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">OTP auth, Cart, Checkout</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-slate-400 text-[10px] uppercase font-mono block">Merchant Portal</span>
                <span className="font-medium text-slate-200">Restaurant Dashboard</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Live orders, Kitchen timer</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-slate-400 text-[10px] uppercase font-mono block">Delivery Portal</span>
                <span className="font-medium text-slate-200">Rider Dispatch</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Active route, Order acceptance</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-slate-400 text-[10px] uppercase font-mono block">Backend & Real-Time</span>
                <span className="font-medium text-slate-200">Express & Socket.io</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">MySQL database, JWT auth</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-slate-300 text-[11px] flex items-center gap-2">
              <CheckCircle2 size={14} className="text-blue-400 shrink-0" />
              <span>Real production code built by Digital Crowd Technologies engineering.</span>
            </div>
          </div>
        )}

        {activeTab === "school" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Cpu size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Multi-Portal School ERP</h3>
                  <p className="text-[11px] text-slate-400">Multi-Tenant Education & Operations SaaS</p>
                </div>
              </div>
              <Link
                href="/projects/school-management-system"
                className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>Case Study</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-slate-400 text-[10px] uppercase font-mono block">Super Admin</span>
                <span className="font-medium text-slate-200">Management Console</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Fee ledger, Staff allocation</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-slate-400 text-[10px] uppercase font-mono block">Teacher Portal</span>
                <span className="font-medium text-slate-200">Classroom Manager</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">1-click attendance, Marks entry</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-slate-400 text-[10px] uppercase font-mono block">Parent Portal</span>
                <span className="font-medium text-slate-200">Student Visibility</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Fee receipts, Attendance alerts</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-slate-400 text-[10px] uppercase font-mono block">Architecture</span>
                <span className="font-medium text-slate-200">Next.js + MySQL</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Tenant isolation, Audit logs</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-slate-300 text-[11px] flex items-center gap-2">
              <CheckCircle2 size={14} className="text-indigo-400 shrink-0" />
              <span>Full ERP architecture with 50+ guarded endpoints & role-based permissions.</span>
            </div>
          </div>
        )}
      </div>

      {/* Terminal Footer */}
      <div className="px-4 py-2.5 bg-[#080B12] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal size={12} className="text-blue-400" />
          <span>node server.js --env=production</span>
        </div>
        <span className="text-slate-500">Node v20+ / React 19 / MySQL 8.0</span>
      </div>
    </div>
  );
}
