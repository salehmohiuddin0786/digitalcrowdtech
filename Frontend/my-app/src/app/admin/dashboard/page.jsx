"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  FileText,
  MessagesSquare,
  Plus,
  ArrowRight,
  Layers,
  Package,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageCircle,
  Phone,
  Database,
  Server,
  Sparkles,
  Eye,
  RefreshCw,
} from "lucide-react";
import AdminLayout from "../AdminLayout";
import {
  getBlogs,
  getCareers,
  getQueries,
  getAdminProjects,
  getAdminProducts,
  verifyAdmin,
  updateQueryStatus,
} from "../adminData";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [counts, setCounts] = useState({
    blogs: 0,
    careers: 0,
    queries: 0,
    newQueries: 0,
    projects: 0,
    liveProjects: 0,
    products: 0,
  });
  const [recentQueries, setRecentQueries] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [systemHealth, setSystemHealth] = useState({
    apiOnline: false,
    dbConnected: false,
    checkedAt: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadDashboard = async () => {
    setIsLoading(true);
    try {
      if (!(await verifyAdmin())) {
        router.replace("/admin");
        return;
      }

      // Check system health
      try {
        const healthRes = await fetch("http://localhost:5001/api/health").catch(() => null);
        if (healthRes && healthRes.ok) {
          const healthData = await healthRes.json();
          setSystemHealth({
            apiOnline: true,
            dbConnected: Boolean(healthData.database),
            checkedAt: new Date().toLocaleTimeString(),
          });
        }
      } catch {
        setSystemHealth({ apiOnline: false, dbConnected: false, checkedAt: new Date().toLocaleTimeString() });
      }

      const [blogs, careers, queries, projects, products] = await Promise.all([
        getBlogs().catch(() => []),
        getCareers().catch(() => []),
        getQueries().catch(() => []),
        getAdminProjects().catch(() => []),
        getAdminProducts().catch(() => []),
      ]);

      const newQ = queries.filter((q) => (q.status || "New") === "New").length;
      const liveP = projects.filter((p) => p.liveUrl && p.liveUrl.startsWith("http")).length;

      setCounts({
        blogs: blogs.length,
        careers: careers.length,
        queries: queries.length,
        newQueries: newQ,
        projects: projects.length,
        liveProjects: liveP,
        products: products.length,
      });

      setRecentQueries(queries.slice(0, 5));
      setRecentProjects(projects.slice(0, 6));
    } catch {
      router.replace("/admin");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [router]);

  const handleQuickStatusChange = async (id, newStatus) => {
    try {
      await updateQueryStatus(id, newStatus);
      setRecentQueries((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
      );
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  return (
    <AdminLayout>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 space-y-8">
        
        {/* Top Header & System Status Banner */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Operations Command Center
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                v2.4
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Real-time monitoring of client inquiries, portfolio deployments, turnkey products, and content.
            </p>
          </div>

          {/* System Heartbeat Pill */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#090D16] border border-white/10 text-xs">
              <span
                className={`w-2 h-2 rounded-full ${
                  systemHealth.apiOnline ? "bg-emerald-400 animate-pulse" : "bg-red-400"
                }`}
              />
              <span className="text-slate-300 font-mono text-[11px]">
                API: {systemHealth.apiOnline ? "Online (Port 5001)" : "Offline"}
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300 font-mono text-[11px]">
                DB: {systemHealth.dbConnected ? "MySQL `dct`" : "Disconnected"}
              </span>
            </div>

            <button
              onClick={loadDashboard}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 border border-white/10 transition"
              title="Refresh Dashboard"
            >
              <RefreshCw size={13} className={isLoading ? "animate-spin text-blue-400" : ""} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Quick Actions Action Bar */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#16223A]/80 via-[#101A2E]/90 to-[#16223A]/80 border border-[#26344F] flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[#F87000]" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Quick Actions:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/admin/projects"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 text-xs font-semibold transition"
            >
              <Plus size={13} />
              <span>Add Portfolio Project</span>
            </Link>
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition"
            >
              <Plus size={13} />
              <span>Add Digital Product</span>
            </Link>
            <Link
              href="/admin/blogs"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition"
            >
              <Plus size={13} />
              <span>Write Blog Article</span>
            </Link>
            <Link
              href="/admin/queries"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 text-xs font-semibold transition"
            >
              <MessagesSquare size={13} />
              <span>Review Inquiries ({counts.newQueries} New)</span>
            </Link>
          </div>
        </div>

        {/* 5 Core Metric Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {/* Card 1: Inquiries */}
          <div className="rounded-2xl border border-blue-500/20 bg-[#090D16] p-5 shadow-xl flex flex-col justify-between group hover:border-blue-500/40 transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <MessagesSquare className="h-4.5 w-4.5" />
                </div>
                {counts.newQueries > 0 ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-500 text-white animate-pulse">
                    {counts.newQueries} Uncontacted
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-slate-400">
                    All caught up
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-400 font-medium">Client Inquiries</span>
              <p className="text-2xl font-black text-white mt-1">{counts.queries}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5">
              <Link
                href="/admin/queries"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
              >
                <span>Open CRM Pipeline</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Card 2: Products */}
          <div className="rounded-2xl border border-emerald-500/20 bg-[#090D16] p-5 shadow-xl flex flex-col justify-between group hover:border-emerald-500/40 transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Package className="h-4.5 w-4.5" />
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                  Turnkey
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium">Turnkey Products</span>
              <p className="text-2xl font-black text-emerald-400 mt-1">{counts.products}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5">
              <Link
                href="/admin/products"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
              >
                <span>Manage Products</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Card 3: Portfolio Projects */}
          <div className="rounded-2xl border border-purple-500/20 bg-[#090D16] p-5 shadow-xl flex flex-col justify-between group hover:border-purple-500/40 transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Layers className="h-4.5 w-4.5" />
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/25">
                  {counts.liveProjects} Live URLs
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium">Portfolio Deliverables</span>
              <p className="text-2xl font-black text-purple-400 mt-1">{counts.projects}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5">
              <Link
                href="/admin/projects"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300"
              >
                <span>Manage Portfolio</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Card 4: Blogs */}
          <div className="rounded-2xl border border-cyan-500/20 bg-[#090D16] p-5 shadow-xl flex flex-col justify-between group hover:border-cyan-500/40 transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <FileText className="h-4.5 w-4.5" />
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-slate-400">
                  Engineering
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium">Published Articles</span>
              <p className="text-2xl font-black text-cyan-400 mt-1">{counts.blogs}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5">
              <Link
                href="/admin/blogs"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300"
              >
                <span>View Articles</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Card 5: Careers */}
          <div className="rounded-2xl border border-indigo-500/20 bg-[#090D16] p-5 shadow-xl flex flex-col justify-between group hover:border-indigo-500/40 transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <Briefcase className="h-4.5 w-4.5" />
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-slate-400">
                  Hyderabad
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium">Career Openings</span>
              <p className="text-2xl font-black text-indigo-400 mt-1">{counts.careers}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5">
              <Link
                href="/admin/careers"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300"
              >
                <span>Hiring Roles</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* Section 1: Recent Client Inquiries Stream */}
        <section className="rounded-2xl bg-[#090D16] border border-white/10 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <MessagesSquare size={17} className="text-blue-400" />
                <span>Recent Client Inquiries & Leads</span>
              </h2>
              <p className="text-xs text-slate-400">
                Direct client queries captured from the website contact forms.
              </p>
            </div>
            <Link
              href="/admin/queries"
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300"
            >
              <span>View All ({counts.queries})</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {recentQueries.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              No inquiries recorded in the database yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="border-b border-white/10 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="pb-3">Client</th>
                    <th className="pb-3">Service & Budget</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Submitted</th>
                    <th className="pb-3 text-right">Instant Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentQueries.map((q) => {
                    const cleanPhone = (q.phone || "").replace(/[^0-9]/g, "");
                    const waLink = `https://wa.me/${cleanPhone.startsWith("91") ? cleanPhone : "91" + cleanPhone}?text=${encodeURIComponent(
                      `Hi ${q.name}, thank you for reaching out to DigitalCrowd Tech regarding your inquiry about ${q.service || "our services"}!`
                    )}`;

                    return (
                      <tr key={q.id} className="hover:bg-white/[0.02] transition">
                        <td className="py-3.5 pr-4">
                          <div className="font-semibold text-white">{q.name}</div>
                          <div className="text-[11px] text-slate-400">{q.businessName || q.email}</div>
                        </td>
                        <td className="py-3.5 pr-4">
                          <div className="text-blue-400 font-medium">{q.service}</div>
                          <div className="text-[11px] text-slate-500">{q.budget || "Under ₹10,000"}</div>
                        </td>
                        <td className="py-3.5 pr-4">
                          <select
                            value={q.status || "New"}
                            onChange={(e) => handleQuickStatusChange(q.id, e.target.value)}
                            className="text-[11px] font-semibold px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white outline-none cursor-pointer"
                          >
                            <option value="New" className="bg-[#090D16] text-blue-400">New</option>
                            <option value="Contacted" className="bg-[#090D16] text-amber-400">Contacted</option>
                            <option value="In Progress" className="bg-[#090D16] text-purple-400">In Progress</option>
                            <option value="Converted" className="bg-[#090D16] text-emerald-400">Converted</option>
                          </select>
                        </td>
                        <td className="py-3.5 pr-4 font-mono text-[11px] text-slate-400">
                          {q.createdAt ? new Date(q.createdAt).toLocaleDateString("en-IN") : "Today"}
                        </td>
                        <td className="py-3.5 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            {cleanPhone && (
                              <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold transition"
                                title="Reply directly via WhatsApp"
                              >
                                <MessageCircle size={12} />
                                <span>WhatsApp</span>
                              </a>
                            )}
                            <a
                              href={`tel:${q.phone}`}
                              className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition"
                              title="Call Client"
                            >
                              <Phone size={13} />
                            </a>
                            <Link
                              href="/admin/queries"
                              className="p-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition"
                              title="View Full Details"
                            >
                              <Eye size={13} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Section 2: Portfolio Projects Showcase & Live Link Status */}
        <section className="rounded-2xl bg-[#090D16] border border-white/10 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Layers size={17} className="text-purple-400" />
                <span>Featured Deliverables & Live Website Links</span>
              </h2>
              <p className="text-xs text-slate-400">
                Live URLs automatically pin the project to the top of the portfolio showcase with a direct visit button.
              </p>
            </div>
            <Link
              href="/admin/projects"
              className="inline-flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300"
            >
              <span>Manage All Projects</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recentProjects.map((p) => {
              const hasLiveUrl = p.liveUrl && p.liveUrl.startsWith("http");

              return (
                <div
                  key={p.id}
                  className="rounded-xl border border-white/5 bg-[#0D121F] p-4 flex flex-col justify-between hover:border-purple-500/30 transition group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
                        {p.category || "Web App"}
                      </span>
                      {hasLiveUrl ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/25">
                          <CheckCircle2 size={10} />
                          <span>Pinned Live</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                          <Clock size={10} />
                          <span>Coming Soon</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {p.summary || p.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                    {hasLiveUrl ? (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-400 hover:underline font-semibold"
                      >
                        <span>Visit Site</span>
                        <ExternalLink size={11} />
                      </a>
                    ) : (
                      <span className="text-slate-500">In Development</span>
                    )}

                    <Link
                      href="/admin/projects"
                      className="text-slate-400 hover:text-white"
                    >
                      Edit →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </AdminLayout>
  );
}
