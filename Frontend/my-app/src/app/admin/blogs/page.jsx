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
  BookOpen,
  Calendar,
  Tag,
  CheckCircle,
  FileText,
  RefreshCw,
} from "lucide-react";
import AdminLayout from "../AdminLayout";
import { createBlog, deleteBlog, getBlogs, updateBlog, verifyAdmin } from "../adminData";

const emptyBlog = {
  title: "",
  category: "Web Development",
  date: new Date().toISOString().split("T")[0],
  excerpt: "",
  content: "",
  status: "Published",
};

export default function AdminBlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [form, setForm] = useState(emptyBlog);
  const [editingId, setEditingId] = useState(null);
  const [viewingBlog, setViewingBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadBlogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getBlogs();
      setBlogs(data);
      if (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("mode") === "new") {
        setShowForm(true);
      }
    } catch (error) {
      setMessage(error.message || "Unable to load blogs.");
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
      await loadBlogs();
    };

    initializePage();
  }, [router, loadBlogs]);

  const resetForm = () => {
    setForm(emptyBlog);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      if (editingId) {
        const updatedBlog = await updateBlog(editingId, form);
        setBlogs(blogs.map((b) => (b.id === editingId ? updatedBlog : b)));
        setMessage("Blog post updated successfully.");
      } else {
        const nextBlog = await createBlog(form);
        setBlogs([nextBlog, ...blogs]);
        setMessage("Blog post published successfully.");
      }
      resetForm();
    } catch (error) {
      setMessage(error.message || "Unable to save blog.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setForm({
      title: blog.title,
      category: blog.category,
      date: blog.date,
      excerpt: blog.excerpt,
      content: blog.content,
      status: blog.status,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    setMessage("");

    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((b) => b.id !== id));
      setMessage("Blog post deleted successfully.");
    } catch (error) {
      setMessage(error.message || "Unable to delete blog.");
    }
  };

  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchesSearch =
        search === "" ||
        b.title?.toLowerCase().includes(search.toLowerCase()) ||
        b.category?.toLowerCase().includes(search.toLowerCase()) ||
        b.excerpt?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || b.status?.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [blogs, search, statusFilter]);

  return (
    <AdminLayout>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Top Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Articles & Knowledge Base</h1>
            <p className="mt-1 text-xs text-slate-400">
              Publish and manage educational insights, technical guides, and architectural case studies.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="pl-8 pr-4 py-2 text-xs rounded-xl bg-[#0F1422] border border-white/10 text-white placeholder-slate-500 outline-none focus:border-blue-500 w-48"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl bg-[#0F1422] border border-white/10 text-white outline-none focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>

            <button
              onClick={() => {
                if (showForm) resetForm();
                else setShowForm(true);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-semibold text-white transition shadow-sm"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{showForm ? "Cancel" : "Add Article"}</span>
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
                  {editingId ? "Edit Blog Article" : "Create New Article"}
                </h2>
                <p className="text-xs text-slate-400">Fill in the technical and educational content details.</p>
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
                <label className="block text-xs font-medium text-slate-300 mb-1">Article Title *</label>
                <input
                  required
                  placeholder="e.g. Next.js 15 vs Traditional Multi-Page Apps: A Practical Guide"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#0F1422] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category *</label>
                <input
                  required
                  placeholder="e.g. Web Development, Backend & APIs, Architecture"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#0F1422] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Publication Date</label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#0F1422] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Publication Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#0F1422] px-3.5 py-2.5 text-xs text-white outline-none focus:border-blue-500"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-medium text-slate-300 mb-1">Summary / Excerpt *</label>
              <textarea
                required
                placeholder="Short 2-3 sentence overview shown on blog listings..."
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#0F1422] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                rows={2}
              />
            </div>

            <div className="mt-4">
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Article Content *</label>
              <textarea
                required
                placeholder="Markdown or formatted text content for the article..."
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#0F1422] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 font-mono text-[11px]"
                rows={8}
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
                {isSaving ? "Saving..." : editingId ? "Update Article" : "Publish Article"}
              </button>
            </div>
          </form>
        )}

        {/* Blogs List */}
        <div className="rounded-2xl bg-[#090D16] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#0D121F] border-b border-white/10 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3.5">Article</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      Loading articles...
                    </td>
                  </tr>
                ) : filteredBlogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      No blog articles found.
                    </td>
                  </tr>
                ) : (
                  filteredBlogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-white/[0.02] transition">
                      <td className="px-5 py-4 max-w-md">
                        <p className="font-semibold text-white line-clamp-1">{blog.title}</p>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{blog.excerpt}</p>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] text-slate-300">
                          <Tag className="h-3 w-3 text-blue-400" />
                          {blog.category}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-slate-400">
                        <span className="inline-flex items-center gap-1 text-[11px]">
                          <Calendar className="h-3 w-3 text-slate-500" />
                          {blog.date}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${
                            blog.status === "Published"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          }`}
                        >
                          {blog.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setViewingBlog(blog)}
                            title="Preview Article"
                            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/5 transition"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleEdit(blog)}
                            title="Edit Article"
                            className="rounded-lg p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(blog.id)}
                            title="Delete Article"
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
        {viewingBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <article className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#090D16] border border-white/15 p-6 shadow-2xl">
              <div className="mb-4 flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-blue-400">{viewingBlog.category}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400">{viewingBlog.date}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        viewingBlog.status === "Published"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}
                    >
                      {viewingBlog.status}
                    </span>
                  </div>
                  <h2 className="mt-2 text-xl font-bold text-white">{viewingBlog.title}</h2>
                </div>
                <button
                  onClick={() => setViewingBlog(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 font-medium italic mb-4">
                {viewingBlog.excerpt}
              </div>
              <div className="whitespace-pre-wrap text-xs text-slate-300 leading-relaxed font-sans">
                {viewingBlog.content}
              </div>
            </article>
          </div>
        )}
      </main>
    </AdminLayout>
  );
}
