"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Eye, Plus, Trash2, X } from "lucide-react";
import AdminLayout from "../AdminLayout";
import { createBlog, deleteBlog, getBlogs, updateBlog, verifyAdmin } from "../adminData";

const emptyBlog = {
  title: "",
  category: "",
  date: "",
  excerpt: "",
  content: "",
  status: "Published",
};

const AdminBlogsPage = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(emptyBlog);
  const [editingId, setEditingId] = useState(null);
  const [viewingBlog, setViewingBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadBlogs = async () => {
      if (!(await verifyAdmin())) {
        router.replace("/admin");
        return;
      }

      setBlogs(await getBlogs());
      if (new URLSearchParams(window.location.search).get("mode") === "new") {
        setShowForm(true);
      }
    };

    loadBlogs().catch((error) => setMessage(error.message || "Unable to load blogs."));
  }, [router]);

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
        setBlogs(blogs.map((blog) => (blog.id === editingId ? updatedBlog : blog)));
        setMessage("Blog updated successfully.");
      } else {
        const nextBlog = await createBlog(form);
        setBlogs([nextBlog, ...blogs]);
        setMessage("Blog added successfully.");
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
  };

  const handleDelete = async (id) => {
    setMessage("");

    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      setMessage("Blog deleted successfully.");
    } catch (error) {
      setMessage(error.message || "Unable to delete blog.");
    }
  };

  return (
    <AdminLayout>
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">Blogs</h1>
            <p className="mt-2 text-slate-600">Add, edit, view, and delete blog posts.</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" />
            Add Blog
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-950">{editingId ? "Edit Blog" : "Add Blog"}</h2>
              <button type="button" onClick={resetForm} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-xl border border-slate-300 px-4 py-3" />
              <input required placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-xl border border-slate-300 px-4 py-3" />
              <input required placeholder="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="rounded-xl border border-slate-300 px-4 py-3" />
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="rounded-xl border border-slate-300 px-4 py-3">
                <option>Published</option>
                <option>Draft</option>
              </select>
            </div>
            <textarea required placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3" rows={3} />
            <textarea required placeholder="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3" rows={6} />
            <button disabled={isSaving} className="mt-4 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white disabled:opacity-70">
              {isSaving ? "Saving..." : editingId ? "Update Blog" : "Save Blog"}
            </button>
          </form>
        )}

        {message && <p className="mb-5 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">{message}</p>}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-12 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-600">
            <span className="col-span-5">Title</span>
            <span className="col-span-2">Category</span>
            <span className="col-span-2">Status</span>
            <span className="col-span-3 text-right">Actions</span>
          </div>
          {blogs.map((blog) => (
            <div key={blog.id} className="grid grid-cols-12 items-center border-t border-slate-100 px-5 py-4 text-sm">
              <div className="col-span-5">
                <p className="font-semibold text-slate-950">{blog.title}</p>
                <p className="text-slate-500">{blog.date}</p>
              </div>
              <span className="col-span-2 text-slate-600">{blog.category}</span>
              <span className="col-span-2 text-slate-600">{blog.status}</span>
              <div className="col-span-3 flex justify-end gap-2">
                <button onClick={() => setViewingBlog(blog)} className="rounded-lg border border-slate-200 p-2 text-slate-600"><Eye className="h-4 w-4" /></button>
                <button onClick={() => handleEdit(blog)} className="rounded-lg border border-slate-200 p-2 text-blue-600"><Edit className="h-4 w-4" /></button>
                <button onClick={() => handleDelete(blog.id)} className="rounded-lg border border-slate-200 p-2 text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>

        {viewingBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
            <article className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-6">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-blue-600">{viewingBlog.category} - {viewingBlog.status}</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-950">{viewingBlog.title}</h2>
                  <p className="mt-1 text-sm text-slate-500">{viewingBlog.date}</p>
                </div>
                <button onClick={() => setViewingBlog(null)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X className="h-5 w-5" /></button>
              </div>
              <p className="font-medium text-slate-700">{viewingBlog.excerpt}</p>
              <p className="mt-4 whitespace-pre-wrap text-slate-600">{viewingBlog.content}</p>
            </article>
          </div>
        )}
      </main>
    </AdminLayout>
  );
};

export default AdminBlogsPage;
