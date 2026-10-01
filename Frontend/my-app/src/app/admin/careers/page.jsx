"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Edit,
  Eye,
  Plus,
  Trash2,
  X,
  Search,
  Briefcase,
  MapPin,
  Clock,
  CheckCircle,
} from "lucide-react";
import AdminLayout from "../AdminLayout";
import { createCareer, deleteCareer, getCareers, updateCareer, verifyAdmin } from "../adminData";

const emptyCareer = {
  title: "",
  type: "Full Time",
  location: "Hyderabad / Remote",
  experience: "1-3 Years",
  description: "",
  status: "Open",
};

export default function AdminCareersPage() {
  const router = useRouter();
  const [careers, setCareers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [form, setForm] = useState(emptyCareer);
  const [editingId, setEditingId] = useState(null);
  const [viewingCareer, setViewingCareer] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadCareers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getCareers();
      setCareers(data);
      if (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("mode") === "new") {
        setShowForm(true);
      }
    } catch (error) {
      setMessage(error.message || "Unable to load careers.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initializePage = async () => {
      if (!(await verifyAdmin())) {
        router.replace("/admin");
        return;
      }
      await loadCareers();
    };

    initializePage();
  }, [router, loadCareers]);

  const resetForm = () => {
    setForm(emptyCareer);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      if (editingId) {
        const updatedCareer = await updateCareer(editingId, form);
        setCareers(careers.map((c) => (c.id === editingId ? updatedCareer : c)));
        setMessage("Job position updated successfully.");
      } else {
        const nextCareer = await createCareer(form);
        setCareers([nextCareer, ...careers]);
        setMessage("Job position added successfully.");
      }
      resetForm();
    } catch (error) {
      setMessage(error.message || "Unable to save job position.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (career) => {
    setEditingId(career.id);
    setForm({
      title: career.title,
      type: career.type,
      location: career.location,
      experience: career.experience,
      description: career.description,
      status: career.status,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this position?")) return;
    setMessage("");

    try {
      await deleteCareer(id);
      setCareers(careers.filter((c) => c.id !== id));
      setMessage("Job position removed successfully.");
    } catch (error) {
      setMessage(error.message || "Unable to delete job position.");
    }
  };

  const filteredCareers = useMemo(() => {
    return careers.filter((c) => {
      const matchesSearch =
        search === "" ||
        c.title?.toLowerCase().includes(search.toLowerCase()) ||
        c.location?.toLowerCase().includes(search.toLowerCase()) ||
        c.description?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || c.status?.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [careers, search, statusFilter]);

  return (
    <AdminLayout>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Top Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Careers & Openings</h1>
            <p className="mt-1 text-xs text-slate-400">
              Manage hiring postings, role descriptions, and candidate recruitment status.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search positions..."
                className="pl-8 pr-4 py-2 text-xs rounded-xl bg-[#0F1422] border border-white/10 text-white placeholder-slate-500 outline-none focus:border-blue-500 w-48"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl bg-[#0F1422] border border-white/10 text-white outline-none focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>

            <button
              onClick={() => {
                if (showForm) resetForm();
                else setShowForm(true);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-semibold text-white transition shadow-sm"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{showForm ? "Cancel" : "Add Opening"}</span>
            </button>
          </div>
        </div>

        {message && (
          <div className="mb-5 flex items-center justify-between rounded-xl bg-blue-500/10 border border-blue-500/20 px-4 py-3 text-xs font-medium text-blue-300">
            <span>{message}</span>
            <button onClick={() => setMessage("")} className="text-blue-400 hover:text-white">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-8 rounded-2xl border border-white/10 bg-[#090D16] p-6 shadow-xl relative"
          >
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-base font-bold text-white">
                  {editingId ? "Edit Job Position" : "Create New Job Opening"}
                </h2>
                <p className="text-xs text-slate-400">Specify requirements, location, and role expectations.</p>
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Job Title *</label>
                <input
                  required
                  placeholder="e.g. Full-Stack Developer (Node.js & Next.js)"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#0F1422] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Employment Type *</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#0F1422] px-3.5 py-2.5 text-xs text-white outline-none focus:border-blue-500"
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Location *</label>
                <input
                  required
                  placeholder="e.g. Madhapur, Hyderabad / Hybrid"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#0F1422] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Experience Level *</label>
                <input
                  required
                  placeholder="e.g. 1-3 Years / Freshers with live project proof"
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#0F1422] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#0F1422] px-3.5 py-2.5 text-xs text-white outline-none focus:border-blue-500"
                >
                  <option value="Open">Open (Accepting Applications)</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-medium text-slate-300 mb-1">Job Description & Requirements *</label>
              <textarea
                required
                placeholder="Responsibilities, required tech stack, qualifications, and how to apply..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#0F1422] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 text-xs leading-relaxed"
                rows={6}
              />
            </div>

            <div className="mt-5 flex items-center justify-end gap-3 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/5 transition"
              >
                Cancel
              </button>
              <button
                disabled={isSaving}
                className="rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2 text-xs font-semibold text-white disabled:opacity-50 transition shadow-sm"
              >
                {isSaving ? "Saving..." : editingId ? "Update Opening" : "Publish Opening"}
              </button>
            </div>
          </form>
        )}

        {/* Careers List */}
        <div className="rounded-2xl bg-[#090D16] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#0D121F] border-b border-white/10 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3.5">Position / Role</th>
                  <th className="px-5 py-3.5">Type</th>
                  <th className="px-5 py-3.5">Location</th>
                  <th className="px-5 py-3.5">Experience</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      Loading openings...
                    </td>
                  </tr>
                ) : filteredCareers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      No career positions found.
                    </td>
                  </tr>
                ) : (
                  filteredCareers.map((career) => (
                    <tr key={career.id} className="hover:bg-white/[0.02] transition">
                      <td className="px-5 py-4 font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                          <span>{career.title}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-slate-300">
                        {career.type}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-slate-400">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-slate-500" />
                          {career.location}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-slate-400">
                        {career.experience}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${
                            career.status === "Open"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                          }`}
                        >
                          {career.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setViewingCareer(career)}
                            title="Preview Details"
                            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/5 transition"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleEdit(career)}
                            title="Edit Opening"
                            className="rounded-lg p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(career.id)}
                            title="Delete Opening"
                            className="rounded-lg p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
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

        {/* View Modal */}
        {viewingCareer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <article className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-[#090D16] border border-white/15 p-6 shadow-2xl">
              <div className="mb-4 flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-blue-400">{viewingCareer.type}</span>
                    <span className="text-slate-600">•</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        viewingCareer.status === "Open"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                      }`}
                    >
                      {viewingCareer.status}
                    </span>
                  </div>
                  <h2 className="mt-2 text-xl font-bold text-white">{viewingCareer.title}</h2>
                  <p className="mt-1 text-xs text-slate-400">
                    {viewingCareer.location} • {viewingCareer.experience}
                  </p>
                </div>
                <button
                  onClick={() => setViewingCareer(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="whitespace-pre-wrap text-xs text-slate-300 leading-relaxed font-sans">
                {viewingCareer.description}
              </div>
            </article>
          </div>
        )}
      </main>
    </AdminLayout>
  );
}
