"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  Mail,
  Phone,
  RefreshCw,
  Search,
  X,
  Trash2,
  CheckCircle2,
  Clock,
  Filter,
  Building,
  Calendar,
} from "lucide-react";
import AdminLayout from "../AdminLayout";
import { getQueries, updateQueryStatus, deleteQuery, verifyAdmin } from "../adminData";

const formatDate = (value) => {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const statusColors = {
  New: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Contacted: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  "In Progress": "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  Converted: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
};

export default function AdminQueriesPage() {
  const router = useRouter();
  const [queries, setQueries] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewingQuery, setViewingQuery] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadQueries = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const items = await getQueries();
      setQueries(items);
    } catch (error) {
      setMessage(error.message || "Unable to load queries.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializePage = async () => {
      if (!(await verifyAdmin())) {
        router.replace("/admin");
        return;
      }
      await loadQueries();
    };

    initializePage();
  }, [router]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateQueryStatus(id, newStatus);
      setQueries((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
      );
      if (viewingQuery && viewingQuery.id === id) {
        setViewingQuery((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      await deleteQuery(id);
      setQueries((prev) => prev.filter((q) => q.id !== id));
      if (viewingQuery && viewingQuery.id === id) {
        setViewingQuery(null);
      }
    } catch (err) {
      alert("Failed to delete enquiry: " + err.message);
    }
  };

  const filteredQueries = useMemo(() => {
    return queries.filter((query) => {
      const term = search.trim().toLowerCase();
      const matchesSearch =
        !term ||
        [query.name, query.email, query.phone, query.businessName, query.service, query.subject, query.message]
          .filter(Boolean)
          .some((val) => String(val).toLowerCase().includes(term));

      const matchesStatus = statusFilter === "All" || query.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [queries, search, statusFilter]);

  return (
    <AdminLayout>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-2xl font-bold text-white">Client Inquiries & CRM</h1>
            <p className="mt-1 text-xs text-slate-400">
              Manage, search, filter, and track status of incoming project inquiries.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search inquiries..."
                className="pl-9 pr-4 py-2 text-xs rounded-xl bg-[#0F1422] border border-white/10 text-white placeholder-slate-500 outline-none focus:border-blue-500 w-56"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl bg-[#0F1422] border border-white/10 text-white outline-none focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Converted">Converted</option>
            </select>

            <button
              onClick={loadQueries}
              disabled={isLoading}
              title="Refresh"
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {message && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs">
            {message}
          </div>
        )}

        {/* Table / List */}
        <div className="rounded-2xl bg-[#090D16] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#0D121F] border-b border-white/10 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3.5">Client & Business</th>
                  <th className="px-5 py-3.5">Service & Budget</th>
                  <th className="px-5 py-3.5">Contact Details</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredQueries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-slate-500">
                      No inquiries found matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredQueries.map((q) => (
                    <tr key={q.id} className="hover:bg-white/[0.02] transition">
                      <td className="px-5 py-4">
                        <div className="font-semibold text-white">{q.name}</div>
                        {q.businessName && (
                          <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <Building size={11} className="text-slate-500" />
                            <span>{q.businessName}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-blue-400 font-medium">{q.service}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{q.budget || "Under ₹10,000"}</div>
                      </td>
                      <td className="px-5 py-4 space-y-0.5">
                        <a href={`mailto:${q.email}`} className="text-slate-300 hover:text-white block">
                          {q.email}
                        </a>
                        <a href={`tel:${q.phone}`} className="text-slate-400 hover:text-blue-400 block font-mono">
                          {q.phone}
                        </a>
                      </td>
                      <td className="px-5 py-4">
                        <select
                          value={q.status || "New"}
                          onChange={(e) => handleStatusChange(q.id, e.target.value)}
                          className={`text-[11px] font-semibold px-2 py-1 rounded-md outline-none cursor-pointer ${
                            statusColors[q.status || "New"] || "bg-white/5 text-slate-300"
                          }`}
                        >
                          <option value="New" className="bg-[#090D16] text-blue-400">New</option>
                          <option value="Contacted" className="bg-[#090D16] text-amber-400">Contacted</option>
                          <option value="In Progress" className="bg-[#090D16] text-purple-400">In Progress</option>
                          <option value="Converted" className="bg-[#090D16] text-emerald-400">Converted</option>
                        </select>
                      </td>
                      <td className="px-5 py-4 text-slate-400 font-mono text-[11px]">
                        {formatDate(q.createdAt)}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setViewingQuery(q)}
                            className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"
                            title="View Full Details"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(q.id)}
                            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                            title="Delete Enquiry"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Drawer: View Query */}
        {viewingQuery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-xl rounded-2xl bg-[#0D121F] border border-white/10 p-6 shadow-2xl space-y-5 text-sm">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white">{viewingQuery.name}</h3>
                  <span className="text-xs text-slate-400">{viewingQuery.businessName || "Individual Client"}</span>
                </div>
                <button
                  onClick={() => setViewingQuery(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">Service Required</span>
                  <span className="font-semibold text-blue-400">{viewingQuery.service}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Budget Qualification</span>
                  <span className="font-semibold text-slate-200">{viewingQuery.budget || "Under ₹10,000"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Email</span>
                  <a href={`mailto:${viewingQuery.email}`} className="text-slate-200 hover:underline">
                    {viewingQuery.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block">Phone</span>
                  <a href={`tel:${viewingQuery.phone}`} className="text-slate-200 font-mono">
                    {viewingQuery.phone}
                  </a>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-500 block mb-1">Project Description</span>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {viewingQuery.message}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Status:</span>
                  <select
                    value={viewingQuery.status || "New"}
                    onChange={(e) => handleStatusChange(viewingQuery.id, e.target.value)}
                    className={`font-semibold px-2.5 py-1 rounded-md outline-none cursor-pointer ${
                      statusColors[viewingQuery.status || "New"] || "bg-white/5 text-slate-300"
                    }`}
                  >
                    <option value="New" className="bg-[#090D16] text-blue-400">New</option>
                    <option value="Contacted" className="bg-[#090D16] text-amber-400">Contacted</option>
                    <option value="In Progress" className="bg-[#090D16] text-purple-400">In Progress</option>
                    <option value="Converted" className="bg-[#090D16] text-emerald-400">Converted</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => setViewingQuery(null)}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </AdminLayout>
  );
}
