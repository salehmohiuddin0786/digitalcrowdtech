"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Edit,
  Eye,
  Plus,
  Trash2,
  X,
  Search,
  Package,
  ExternalLink,
  Upload,
  Globe,
  Tag,
  CheckCircle,
  FileText,
  AlertCircle,
  ImageIcon,
  Sparkles,
} from "lucide-react";
import AdminLayout from "../AdminLayout";
import {
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  verifyAdmin,
} from "../adminData";

const emptyProduct = {
  title: "",
  slug: "",
  category: "Web Application & SaaS",
  label: "Ready to Deploy",
  summary: "",
  description: "",
  price: "Starting from ₹9,999",
  technologies: ["Next.js", "React", "Node.js", "MySQL", "Tailwind CSS"],
  features: [
    "High-speed responsive web application",
    "Secure authentication & RBAC user roles",
    "Restful backend APIs & relational MySQL database",
  ],
  liveUrl: "",
  imageUrl: "",
  status: "Published",
};

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [form, setForm] = useState(emptyProduct);
  const [techInput, setTechInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAdminProducts();
      setProducts(data);
    } catch (error) {
      setMessage(error.message || "Unable to load products.");
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
      await loadProducts();
    };

    initializePage();
  }, [router, loadProducts]);

  const resetForm = () => {
    setForm(emptyProduct);
    setTechInput("");
    setFeatureInput("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setMessage("");

    try {
      const uploadedUrl = await uploadProductImage(file);
      setForm((prev) => ({ ...prev, imageUrl: uploadedUrl }));
      setMessage("Image uploaded successfully.");
    } catch (err) {
      setMessage(err.message || "Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddTech = (e) => {
    e.preventDefault();
    if (techInput.trim() && !form.technologies.includes(techInput.trim())) {
      setForm((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput("");
    }
  };

  const handleRemoveTech = (techToRemove) => {
    setForm((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== techToRemove),
    }));
  };

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (featureInput.trim()) {
      setForm((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.title || !form.summary) {
      setMessage("Title and summary are mandatory.");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        ...form,
        slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      };

      if (editingId) {
        await updateProduct(editingId, payload);
        setMessage("Product updated successfully.");
      } else {
        await createProduct(payload);
        setMessage("New product created successfully.");
      }

      await loadProducts();
      resetForm();
    } catch (error) {
      setMessage(error.message || "Could not save product.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (prod) => {
    setForm({
      title: prod.title || "",
      slug: prod.slug || "",
      category: prod.category || "Web Application & SaaS",
      label: prod.label || "Ready to Deploy",
      summary: prod.summary || "",
      description: prod.description || "",
      price: prod.price || "Starting from ₹9,999",
      technologies: prod.technologies || [],
      features: prod.features || [],
      liveUrl: prod.liveUrl || "",
      imageUrl: prod.imageUrl || "",
      status: prod.status || "Published",
    });
    setEditingId(prod.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct(id);
      setMessage("Product deleted successfully.");
      await loadProducts();
    } catch (error) {
      setMessage(error.message || "Could not delete product.");
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const q = search.toLowerCase();
      const matchSearch =
        (prod.title || "").toLowerCase().includes(q) ||
        (prod.category || "").toLowerCase().includes(q) ||
        (prod.summary || "").toLowerCase().includes(q) ||
        (prod.price || "").toLowerCase().includes(q);

      const matchStatus = statusFilter === "All" || prod.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [products, search, statusFilter]);

  return (
    <AdminLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2">
              <Package size={13} />
              <span>Digital Products Catalog</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Products Management</h1>
            <p className="mt-1 text-sm text-slate-400">
              Manage ready-to-deploy software products, SaaS web apps, pricing, and live website links.
            </p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 hover:from-emerald-500 hover:to-teal-500 transition"
          >
            {showForm ? <X size={16} /> : <Plus size={16} />}
            <span>{showForm ? "Close Editor" : "Add Product"}</span>
          </button>
        </div>

        {/* Global Feedback Alert */}
        {message && (
          <div className="flex items-center justify-between rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-200">
            <div className="flex items-center gap-2.5">
              <AlertCircle size={16} className="text-blue-400 shrink-0" />
              <span>{message}</span>
            </div>
            <button onClick={() => setMessage("")} className="text-blue-400 hover:text-white">
              <X size={16} />
            </button>
          </div>
        )}

        {/* Add / Edit Form Modal/Drawer */}
        {showForm && (
          <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Package className="text-emerald-400" size={20} />
                <span>{editingId ? "Edit Product" : "Create New Digital Product"}</span>
              </h2>
              <button onClick={resetForm} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g., QuickKirana - Retail E-Commerce"
                    className="w-full rounded-xl border border-white/10 bg-[#090D16] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    URL Slug (auto-derived if empty)
                  </label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="e.g., quickkirana-retail-ecommerce"
                    className="w-full rounded-xl border border-white/10 bg-[#090D16] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Category / Niche
                  </label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="e.g., Food Delivery & Hyperlocal SaaS"
                    className="w-full rounded-xl border border-white/10 bg-[#090D16] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Label / Badge */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Badge / Tagline
                  </label>
                  <input
                    type="text"
                    value={form.label}
                    onChange={(e) => setForm({ ...form, label: e.target.value })}
                    placeholder="e.g., Flagship Turnkey Platform"
                    className="w-full rounded-xl border border-white/10 bg-[#090D16] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Transparent Price / Starting At
                  </label>
                  <input
                    type="text"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="e.g., Starting from ₹9,999"
                    className="w-full rounded-xl border border-white/10 bg-[#090D16] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Live Website Link */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Globe size={13} className="text-emerald-400" />
                      <span>Product Website Link (Go to Product)</span>
                    </span>
                    {form.liveUrl && (
                      <a
                        href={form.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-emerald-400 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Test Link</span>
                        <ExternalLink size={11} />
                      </a>
                    )}
                  </label>
                  <input
                    type="text"
                    value={form.liveUrl}
                    onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    placeholder="e.g., https://ruchibazzar.com or https://dskirana.in"
                    className="w-full rounded-xl border border-white/10 bg-[#090D16] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Publication Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#090D16] px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Published">Published (Visible on Website)</option>
                    <option value="Draft">Draft (Hidden)</option>
                  </select>
                </div>

                {/* Product Image Upload */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ImageIcon size={13} className="text-blue-400" />
                    <span>Product Thumbnail / Screenshot</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={form.imageUrl}
                      onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                      placeholder="e.g., /projects/ruchi-logo.png or image URL"
                      className="flex-1 rounded-xl border border-white/10 bg-[#090D16] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                    />
                    <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-white/10 transition">
                      <Upload size={14} />
                      <span>{isUploading ? "Uploading..." : "Browse"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {form.imageUrl && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-8 w-8 relative rounded bg-white/10 overflow-hidden border border-white/10">
                        <img
                          src={form.imageUrl}
                          alt="Preview"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                      <span className="text-xs text-slate-400 truncate max-w-xs">{form.imageUrl}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Short Summary *
                </label>
                <textarea
                  rows={2}
                  required
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  placeholder="One or two sentences explaining what the product does and the business value..."
                  className="w-full rounded-xl border border-white/10 bg-[#090D16] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Detailed Product Description
                </label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Comprehensive technical and feature breakdown..."
                  className="w-full rounded-xl border border-white/10 bg-[#090D16] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {/* Tech Stack Pills */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Core Technologies Used
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="e.g. Next.js 16, MySQL, Socket.io"
                    className="flex-1 rounded-xl border border-white/10 bg-[#090D16] px-4 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTech(e);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddTech}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10"
                  >
                    Add Tech
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400 mb-2.5">
                  <span className="text-slate-500">Quick add:</span>
                  {[
                    "Next.js",
                    "React",
                    "Node.js",
                    "Express.js",
                    "MySQL",
                    "PostgreSQL",
                    "Tailwind CSS",
                    "TypeScript",
                    "Socket.io",
                    "Razorpay API",
                    "Docker",
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        if (!form.technologies.includes(item)) {
                          setForm((prev) => ({
                            ...prev,
                            technologies: [...prev.technologies, item],
                          }));
                        }
                      }}
                      className={`px-2 py-0.5 rounded-full border text-[10px] transition ${
                        form.technologies.includes(item)
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                          : "bg-white/5 text-slate-300 border-white/10 hover:border-white/30"
                      }`}
                    >
                      + {item}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {form.technologies.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200"
                    >
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(t)}
                        className="text-slate-400 hover:text-red-400"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features Bullet List */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Key Product Capabilities / Features
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="e.g. Real-time kitchen timer with audio alerts"
                    className="flex-1 rounded-xl border border-white/10 bg-[#090D16] px-4 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddFeature(e);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10"
                  >
                    Add Feature
                  </button>
                </div>
                <div className="space-y-1.5">
                  {form.features.map((f, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-slate-300"
                    >
                      <span className="flex items-center gap-2">
                        <CheckCircle size={13} className="text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-slate-400 hover:text-red-400 ml-2"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/5 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg hover:from-emerald-500 hover:to-teal-500 transition disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : editingId ? "Update Product" : "Publish Product"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-3 text-slate-500" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products by title, category, pricing..."
              className="w-full rounded-xl border border-white/10 bg-[#090D16] pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            {["All", "Published", "Draft"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                  statusFilter === status
                    ? "bg-emerald-600 text-white shadow"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid / Table */}
        {isLoading ? (
          <div className="py-20 text-center text-sm text-slate-400">Loading digital products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#090D16] p-12 text-center">
            <Package size={40} className="mx-auto text-slate-600 mb-3" />
            <p className="text-base font-semibold text-white">No products found</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your search or add a new product above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="rounded-2xl border border-white/10 bg-[#090D16] p-5 shadow-xl flex flex-col justify-between relative group hover:border-emerald-500/30 transition-all"
              >
                <div>
                  {/* Top Badges & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      {prod.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        prod.status === "Published"
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {prod.status}
                    </span>
                  </div>

                  {/* Title & Label */}
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {prod.title}
                  </h3>
                  {prod.label && (
                    <p className="text-[11px] text-[#F87000] font-medium mt-0.5">{prod.label}</p>
                  )}

                  <p className="text-xs text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
                    {prod.summary}
                  </p>

                  {/* Price Tag */}
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-xs font-semibold text-slate-300">
                    <span className="text-[#F87000]">Pricing:</span>
                    <span className="font-mono text-white">{prod.price || "Contact for Quote"}</span>
                  </div>

                  {/* Tech stack badges */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {(prod.technologies || []).slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.03] text-slate-400 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                    {(prod.technologies || []).length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-white/[0.03] text-slate-500">
                        +{(prod.technologies || []).length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Links & Actions */}
                <div className="mt-5 pt-4 border-t border-white/5 space-y-3">
                  
                  {/* Go to Product Live Website Link */}
                  {prod.liveUrl ? (
                    <a
                      href={prod.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:text-white text-xs font-semibold transition"
                    >
                      <Globe size={13} />
                      <span>Go to Website (Live Product)</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <div className="text-[11px] text-slate-500 text-center py-1.5 italic">
                      No live website URL configured
                    </div>
                  )}

                  {/* Edit & Delete Bar */}
                  <div className="flex items-center justify-between text-xs">
                    <button
                      onClick={() => setViewingProduct(prod)}
                      className="text-slate-400 hover:text-white inline-flex items-center gap-1"
                    >
                      <Eye size={13} />
                      <span>Details</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(prod)}
                        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 px-2 py-1 rounded hover:bg-blue-500/10 transition"
                      >
                        <Edit size={13} />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 px-2 py-1 rounded hover:bg-red-500/10 transition"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Details Modal */}
        {viewingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0F172A] p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono uppercase text-emerald-400 font-semibold">
                  {viewingProduct.category}
                </span>
                <button onClick={() => setViewingProduct(null)} className="text-slate-400 hover:text-white">
                  <X size={18} />
                </button>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">{viewingProduct.title}</h2>
                {viewingProduct.label && (
                  <p className="text-xs text-[#F87000] font-medium mt-0.5">{viewingProduct.label}</p>
                )}
                <p className="text-xs font-mono text-slate-500 mt-1">ID: {viewingProduct.id} | Slug: {viewingProduct.slug}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <span className="text-xs font-bold text-white block">Summary:</span>
                <p className="text-xs text-slate-300 leading-relaxed">{viewingProduct.summary}</p>
              </div>

              {viewingProduct.description && (
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <span className="text-xs font-bold text-white block">Full Description:</span>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{viewingProduct.description}</p>
                </div>
              )}

              {/* Technologies */}
              <div>
                <span className="text-xs font-bold text-slate-300 block mb-2">Technologies:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(viewingProduct.technologies || []).map((t) => (
                    <span key={t} className="px-2.5 py-1 text-xs font-mono rounded bg-white/5 text-slate-300 border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <span className="text-xs font-bold text-slate-300 block mb-2">Features:</span>
                <div className="space-y-1">
                  {(viewingProduct.features || []).map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Link */}
              {viewingProduct.liveUrl && (
                <div className="pt-2">
                  <a
                    href={viewingProduct.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition shadow"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              )}

              <div className="flex justify-end pt-4 border-t border-white/10">
                <button
                  onClick={() => setViewingProduct(null)}
                  className="px-5 py-2 rounded-xl bg-white/5 text-xs font-semibold text-slate-300 hover:bg-white/10"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
