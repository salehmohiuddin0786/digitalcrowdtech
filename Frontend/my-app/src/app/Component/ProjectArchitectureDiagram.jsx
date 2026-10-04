"use client";

import React, { useState } from "react";
import {
  Smartphone,
  Server,
  Database,
  ChefHat,
  Bike,
  ShieldCheck,
  Zap,
  Layers,
  ArrowRight,
  CheckCircle2,
  Users,
  GraduationCap,
  FileText,
  Clock,
  Activity,
  Lock,
} from "lucide-react";

/**
 * Visual Interactive System Architecture & Dataflow Diagram
 * Provides clients with transparent, authentic technical credibility for real deliverables.
 * Supports: "ruchi-bazzar" | "school-management-system" | "digital-crowd-technologies-website"
 */
export default function ProjectArchitectureDiagram({ projectId = "ruchi-bazzar" }) {
  const [activeTab, setActiveTab] = useState("flow"); // "flow" | "specs" | "security"

  if (projectId === "ruchi-bazzar") {
    return (
      <div className="w-full rounded-2xl glass-card-premium overflow-hidden border border-white/10 [html.light_&]:border-slate-200">
        {/* Terminal Header Bar */}
        <div className="px-4 py-3 bg-[#0B1528]/80 [html.light_&]:bg-slate-100 border-b border-white/10 [html.light_&]:border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-white [html.light_&]:text-slate-800">
              ruchi-bazzar :: live-architecture-map
            </span>
          </div>

          {/* Sub-tabs */}
          <div className="flex items-center gap-1 bg-black/30 [html.light_&]:bg-white/80 p-0.5 rounded-lg border border-white/5 [html.light_&]:border-slate-200 text-[11px] font-medium">
            <button
              type="button"
              onClick={() => setActiveTab("flow")}
              className={`px-2.5 py-1 rounded-md transition ${
                activeTab === "flow"
                  ? "bg-[#0050B0] text-white shadow-sm"
                  : "text-slate-400 hover:text-white [html.light_&]:text-slate-600 [html.light_&]:hover:text-black"
              }`}
            >
              System Flow
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("specs")}
              className={`px-2.5 py-1 rounded-md transition ${
                activeTab === "specs"
                  ? "bg-[#0050B0] text-white shadow-sm"
                  : "text-slate-400 hover:text-white [html.light_&]:text-slate-600 [html.light_&]:hover:text-black"
              }`}
            >
              Telemetry
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("security")}
              className={`px-2.5 py-1 rounded-md transition ${
                activeTab === "security"
                  ? "bg-[#0050B0] text-white shadow-sm"
                  : "text-slate-400 hover:text-white [html.light_&]:text-slate-600 [html.light_&]:hover:text-black"
              }`}
            >
              Database & Security
            </button>
          </div>
        </div>

        {/* Tab 1: Visual System Flow Nodes */}
        {activeTab === "flow" && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="text-[11px] text-slate-400 [html.light_&]:text-slate-500 font-mono flex items-center justify-between">
              <span>// Monorepo 4-Portal Synchronized Data Flow</span>
              <span className="text-emerald-400 [html.light_&]:text-emerald-600 font-semibold flex items-center gap-1">
                <Activity size={12} className="animate-spin" />
                Socket.io Event Bus: Active
              </span>
            </div>

            {/* Visual Node Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
              {/* Node 1: Customer App */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] [html.light_&]:bg-slate-50 border border-blue-500/20 [html.light_&]:border-blue-200 relative group hover:border-blue-500/50 transition">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <Smartphone size={15} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white [html.light_&]:text-slate-900 block">
                      1. Customer Mobile / Web
                    </span>
                    <span className="text-[10px] text-slate-400 [html.light_&]:text-slate-500">
                      Menu browse • Cart • UPI / Cash
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                  Next.js responsive PWA with geolocation-based delivery fee calculations.
                </div>
                <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-mono text-blue-400">
                  <span>POST /api/orders/place</span>
                  <ArrowRight size={10} />
                </span>
              </div>

              {/* Node 2: Kitchen Dashboard */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] [html.light_&]:bg-slate-50 border border-orange-500/20 [html.light_&]:border-orange-200 relative group hover:border-orange-500/50 transition">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-[#F87000]/10 text-[#F87000] flex items-center justify-center">
                    <ChefHat size={15} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white [html.light_&]:text-slate-900 block">
                      2. Kitchen Merchant Portal
                    </span>
                    <span className="text-[10px] text-slate-400 [html.light_&]:text-slate-500">
                      Sound alerts • KOT • Prep status
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                  Instant audio chime on incoming orders with 1-click status transitions: Prep ➔ Ready.
                </div>
                <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-mono text-[#F87000]">
                  <span>WS order:confirmed</span>
                  <ArrowRight size={10} />
                </span>
              </div>

              {/* Node 3: Delivery App */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] [html.light_&]:bg-slate-50 border border-emerald-500/20 [html.light_&]:border-emerald-200 relative group hover:border-emerald-500/50 transition">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Bike size={15} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white [html.light_&]:text-slate-900 block">
                      3. Delivery Fleet App
                    </span>
                    <span className="text-[10px] text-slate-400 [html.light_&]:text-slate-500">
                      Live dispatch • OTP verification
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                  Rider accept workflow with delivery OTP confirmation to prevent fraud.
                </div>
                <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                  <span>POST /api/orders/verify-otp</span>
                  <ArrowRight size={10} />
                </span>
              </div>

              {/* Node 4: Backend API & DB */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] [html.light_&]:bg-slate-50 border border-purple-500/20 [html.light_&]:border-purple-200 relative group hover:border-purple-500/50 transition">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <Database size={15} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white [html.light_&]:text-slate-900 block">
                      4. Relational MySQL Engine
                    </span>
                    <span className="text-[10px] text-slate-400 [html.light_&]:text-slate-500">
                      ACID transactions • Ledger logs
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                  Sequelize ORM with relational foreign keys, inventory deductions, and billing.
                </div>
                <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-mono text-purple-400">
                  <span>START TRANSACTION; COMMIT;</span>
                  <CheckCircle2 size={10} />
                </span>
              </div>
            </div>

            {/* Central Event Bus Bar */}
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-blue-500/10 via-[#F87000]/10 to-emerald-500/10 border border-white/10 [html.light_&]:border-slate-200 flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-slate-300 [html.light_&]:text-slate-700 flex items-center gap-1.5">
                <Zap size={13} className="text-[#F87000]" />
                Event Broker: Socket.io Room Sync
              </span>
              <span className="font-mono text-[10px] text-blue-400 font-semibold">
                Latency: &lt; 85ms
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Telemetry Metrics */}
        {activeTab === "specs" && (
          <div className="p-4 sm:p-6 space-y-3 font-mono text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-lg bg-white/[0.02] [html.light_&]:bg-slate-50 border border-white/5 [html.light_&]:border-slate-200">
                <span className="text-[10px] text-slate-400 block">Socket Sync</span>
                <span className="text-sm font-bold text-emerald-400">&lt; 80ms</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] [html.light_&]:bg-slate-50 border border-white/5 [html.light_&]:border-slate-200">
                <span className="text-[10px] text-slate-400 block">Mobile Auth</span>
                <span className="text-sm font-bold text-blue-400">OTP / SMS</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] [html.light_&]:bg-slate-50 border border-white/5 [html.light_&]:border-slate-200">
                <span className="text-[10px] text-slate-400 block">Architecture</span>
                <span className="text-sm font-bold text-[#F87000]">Monorepo</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] [html.light_&]:bg-slate-50 border border-white/5 [html.light_&]:border-slate-200">
                <span className="text-[10px] text-slate-400 block">DB Schema</span>
                <span className="text-sm font-bold text-purple-400">14 Tables</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-black/20 [html.light_&]:bg-slate-100 text-[11px] text-slate-300 [html.light_&]:text-slate-700 space-y-1 font-mono">
              <div className="text-slate-400 font-semibold">// Micro-event emission sample:</div>
              <div className="text-emerald-400">{`io.to("kitchen_" + merchantId).emit("new_order", orderPayload);`}</div>
              <div className="text-blue-400">{`io.to("user_" + customerId).emit("status_update", { status: "PREPARING" });`}</div>
              <div className="text-orange-400">{`io.to("riders_zone_" + zoneId).emit("available_pickup", routeData);`}</div>
            </div>
          </div>
        )}

        {/* Tab 3: Database & Security */}
        {activeTab === "security" && (
          <div className="p-4 sm:p-6 space-y-3 text-xs">
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-slate-300 [html.light_&]:text-slate-700">
                <ShieldCheck size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Role-Based Access Control (RBAC):</strong> Multi-tenant isolation ensuring kitchen staff cannot view customer contact logs or SuperAdmin credentials.</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300 [html.light_&]:text-slate-700">
                <Lock size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Atomic Transactions:</strong> Order placement deductions and payment settlements execute inside ACID blocks with zero race conditions.</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300 [html.light_&]:text-slate-700">
                <Database size={16} className="text-purple-400 shrink-0 mt-0.5" />
                <span><strong>Indexed Queries:</strong> Geolocation radius lookups and merchant category filters run under 15ms query execution times.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // School Management ERP Visual Flow
  if (projectId === "school-management-system") {
    return (
      <div className="w-full rounded-2xl glass-card-premium overflow-hidden border border-white/10 [html.light_&]:border-slate-200">
        {/* Terminal Header Bar */}
        <div className="px-4 py-3 bg-[#0B1528]/80 [html.light_&]:bg-slate-100 border-b border-white/10 [html.light_&]:border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-white [html.light_&]:text-slate-800">
              school-erp :: multi-role-architecture
            </span>
          </div>

          <div className="flex items-center gap-1 bg-black/30 [html.light_&]:bg-white/80 p-0.5 rounded-lg border border-white/5 [html.light_&]:border-slate-200 text-[11px] font-medium">
            <button
              type="button"
              onClick={() => setActiveTab("flow")}
              className={`px-2.5 py-1 rounded-md transition ${
                activeTab === "flow"
                  ? "bg-[#0050B0] text-white shadow-sm"
                  : "text-slate-400 hover:text-white [html.light_&]:text-slate-600 [html.light_&]:hover:text-black"
              }`}
            >
              Role Portals
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("specs")}
              className={`px-2.5 py-1 rounded-md transition ${
                activeTab === "specs"
                  ? "bg-[#0050B0] text-white shadow-sm"
                  : "text-slate-400 hover:text-white [html.light_&]:text-slate-600 [html.light_&]:hover:text-black"
              }`}
            >
              Automated Fee Engine
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("security")}
              className={`px-2.5 py-1 rounded-md transition ${
                activeTab === "security"
                  ? "bg-[#0050B0] text-white shadow-sm"
                  : "text-slate-400 hover:text-white [html.light_&]:text-slate-600 [html.light_&]:hover:text-black"
              }`}
            >
              Academic Ledger
            </button>
          </div>
        </div>

        {/* Tab 1: Role Portals */}
        {activeTab === "flow" && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="text-[11px] text-slate-400 [html.light_&]:text-slate-500 font-mono flex items-center justify-between">
              <span>// 4 Isolated Stakeholder Portals via Single Unified Backend</span>
              <span className="text-blue-400 [html.light_&]:text-blue-600 font-semibold">
                JWT Multi-Role Engine
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Role 1: SuperAdmin */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] [html.light_&]:bg-slate-50 border border-blue-500/20 [html.light_&]:border-blue-200">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <ShieldCheck size={15} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white [html.light_&]:text-slate-900 block">
                      1. Institution Admin Console
                    </span>
                    <span className="text-[10px] text-slate-400 [html.light_&]:text-slate-500">
                      Staff management • Global fee control
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-300 [html.light_&]:text-slate-600">
                  Comprehensive oversight of classrooms, teacher rosters, fee collections, and notices.
                </div>
              </div>

              {/* Role 2: Teacher Portal */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] [html.light_&]:bg-slate-50 border border-emerald-500/20 [html.light_&]:border-emerald-200">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <GraduationCap size={15} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white [html.light_&]:text-slate-900 block">
                      2. Teacher Gradebook &amp; Attendance
                    </span>
                    <span className="text-[10px] text-slate-400 [html.light_&]:text-slate-500">
                      1-click daily register • Marks entry
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-300 [html.light_&]:text-slate-600">
                  Fast attendance tracking with instant notification triggers sent to absent students&apos; parents.
                </div>
              </div>

              {/* Role 3: Parent & Student Portal */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] [html.light_&]:bg-slate-50 border border-purple-500/20 [html.light_&]:border-purple-200">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <Users size={15} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white [html.light_&]:text-slate-900 block">
                      3. Parent &amp; Student Portal
                    </span>
                    <span className="text-[10px] text-slate-400 [html.light_&]:text-slate-500">
                      Fee receipts • Timetables • Notices
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-300 [html.light_&]:text-slate-600">
                  Transparent fee statements, PDF invoice downloads, and real-time academic progress view.
                </div>
              </div>

              {/* Role 4: Fee & Ledger Engine */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] [html.light_&]:bg-slate-50 border border-orange-500/20 [html.light_&]:border-orange-200">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-[#F87000]/10 text-[#F87000] flex items-center justify-center">
                    <FileText size={15} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white [html.light_&]:text-slate-900 block">
                      4. Automated PDF Billing Engine
                    </span>
                    <span className="text-[10px] text-slate-400 [html.light_&]:text-slate-500">
                      Instantly generated receipts &amp; reports
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-300 [html.light_&]:text-slate-600">
                  Automated quarterly fee schedules with balance carryover and audit-compliant reporting.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Automated Fee Engine */}
        {activeTab === "specs" && (
          <div className="p-4 sm:p-6 space-y-3 font-mono text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-lg bg-white/[0.02] [html.light_&]:bg-slate-50 border border-white/5 [html.light_&]:border-slate-200">
                <span className="text-[10px] text-slate-400 block">Fee Generation</span>
                <span className="text-sm font-bold text-emerald-400">PDF Invoices</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] [html.light_&]:bg-slate-50 border border-white/5 [html.light_&]:border-slate-200">
                <span className="text-[10px] text-slate-400 block">Attendance</span>
                <span className="text-sm font-bold text-blue-400">Instant Sync</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] [html.light_&]:bg-slate-50 border border-white/5 [html.light_&]:border-slate-200">
                <span className="text-[10px] text-slate-400 block">Access Control</span>
                <span className="text-sm font-bold text-[#F87000]">4 Scopes</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] [html.light_&]:bg-slate-50 border border-white/5 [html.light_&]:border-slate-200">
                <span className="text-[10px] text-slate-400 block">Integrity</span>
                <span className="text-sm font-bold text-purple-400">100% Relational</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-black/20 [html.light_&]:bg-slate-100 text-[11px] text-slate-300 [html.light_&]:text-slate-700 space-y-1 font-mono">
              <div className="text-slate-400 font-semibold">// Automated Fee Ledger Algorithm:</div>
              <div>{`totalDue = tuitionFee + transportFee + termDiscount;`}</div>
              <div className="text-emerald-400">{`pdfService.generateReceipt(studentId, invoiceNum, totalDue);`}</div>
              <div className="text-blue-400">{`smsService.sendNotification(parentPhone, "Payment received");`}</div>
            </div>
          </div>
        )}

        {/* Tab 3: Security & Ledger */}
        {activeTab === "security" && (
          <div className="p-4 sm:p-6 space-y-3 text-xs">
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-slate-300 [html.light_&]:text-slate-700">
                <ShieldCheck size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Cryptographic Password Hashing:</strong> Strict bcrypt salt rounds protect student and staff credentials with zero plaintext vulnerability.</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300 [html.light_&]:text-slate-700">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Relational Integrity:</strong> Foreign key constraints across Enrollments, Classes, Teachers, and Payments eliminate orphaned records.</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300 [html.light_&]:text-slate-700">
                <FileText size={16} className="text-[#F87000] shrink-0 mt-0.5" />
                <span><strong>Audit Logs:</strong> Complete timestamped change history for student marks adjustments and payment reconciliations.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Fallback / Agency Site
  return null;
}
