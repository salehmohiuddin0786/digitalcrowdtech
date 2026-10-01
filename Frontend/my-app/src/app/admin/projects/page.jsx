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
  Layers,
  ExternalLink,
  Upload,
  Globe,
  Tag,
  CheckCircle,
  FileText,
  AlertCircle,
  ImageIcon,
} from "lucide-react";
import AdminLayout from "../AdminLayout";
import {
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
  verifyAdmin,
} from "../adminData";

const emptyProject = {
  title: "",
  slug: "",
  client: "",
  category: "Web Development & Software",
  isInternal: false,
  label: "Client Project",
  summary: "",
  description: "",
  technologies: ["React", "Next.js", "Node.js", "MySQL"],
  features: ["Responsive UI", "Secure Authentication", "REST APIs"],
  liveUrl: "",
  imageUrl: "",
  caseStudyUrl: "",
  status: "Published",
};

export default function AdminProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [form, setForm] = useState(emptyProject);
  const [techInput, setTechInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAdminProjects();
      setProjects(data);
    } catch (error) {
      setMessage(error.message || "Unable to load projects.");
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
      await loadProjects();
    };

    initializePage();
  }, [router, loadProjects]);

  const resetForm = () => {
    setForm(emptyProject);
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
      const url = await uploadProjectImage(file);
      setForm((prev) => ({ ...prev, imageUrl: url }));
      setMessage("Project image uploaded successfully.");
    } catch (err) {
      // Local preview fallback if backend upload fails
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({ ...prev, imageUrl: reader.result }));
        setMessage("Image loaded locally for preview.");
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    if (!form.technologies.includes(techInput.trim())) {
      setForm({ ...form, technologies: [...form.technologies, techInput.trim()] });
    }
    setTechInput("");
  };

  const handleRemoveTech = (techToRemove) => {
    setForm({
      ...form,
      technologies: form.technologies.filter((t) => t !== techToRemove),
    });
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setForm({ ...form, features: [...form.features, featureInput.trim()] });
    setFeatureInput("");
  };

  const handleRemoveFeature = (indexToRemove) => {
    setForm({
      ...form,
      features: form.features.filter((_, idx) => idx !== indexToRemove),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      const payload = {
        ...form,
        slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        label: form.isInternal ? "Company Website / Internal Project" : form.label || "Client Project",
      };

      if (editingId) {
        const updated = await updateProject(editingId, payload);
        setProjects(projects.map((p) => (p.id === editingId ? updated : p)));
        setMessage("Project updated successfully.");
      } else {
        const created = await createProject(payload);
        setProjects([created, ...projects]);
        setMessage("New project added to portfolio successfully.");
      }
      resetForm();
    } catch (error) {
      setMessage(error.message || "Unable to save project.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setForm({
      title: project.title || "",
      slug: project.slug || "",
      client: project.client || "",
      category: project.category || "Web Development & Software",
      isInternal: Boolean(project.isInternal),
      label: project.label || (project.isInternal ? "Company Website / Internal Project" : "Client Project"),
      summary: project.summary || "",
      description: project.description || "",
      technologies: Array.isArray(project.technologies) ? project.technologies : [],
      features: Array.isArray(project.features) ? project.features : [],
      liveUrl: project.liveUrl || "",
      imageUrl: project.imageUrl || "",
      caseStudyUrl: project.caseStudyUrl || "",
      status: project.status || "Published",
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    setMessage("");

    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
      setMessage("Project deleted successfully.");
    } catch (error) {
      setMessage(error.message || "Unable to delete project.");
    }
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        search === "" ||
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.category?.toLowerCase().includes(search.toLowerCase()) ||
        p.client?.toLowerCase().includes(search.toLowerCase()) ||
        p.summary?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || p.status?.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: projects.length,
      published: projects.filter((p) => p.status === "Published").length,
      client: projects.filter((p) => !p.isInternal).length,
      internal: projects.filter((p) => p.isInternal).length,
    };
  }, [projects]);

  return (
    <AdminLayout>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Top Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Portfolio & Projects</h1>
            <p className="mt-1 text-xs text-slate-400">
              Manage live client platforms, internal showcases, screenshots, deliverables, and tech stacks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
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
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 px-4 py-2 text-xs font-semibold text-white transition shadow-sm"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{showForm ? "Cancel" : "Add Project"}</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-[#090D16] p-4">
            <span className="text-xs text-slate-400 font-medium">Total Projects</span>
            <p className="text-xl font-bold text-white mt-1">{stats.total}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#090D16] p-4">
            <span className="text-xs text-slate-400 font-medium">Published Live</span>
            <p className="text-xl font-bold text-emerald-400 mt-1">{stats.published}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#090D16] p-4">
            <span className="text-xs text-slate-400 font-medium">Client Projects</span>
            <p className="text-xl font-bold text-blue-400 mt-1">{stats.client}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#090D16] p-4">
            <span className="text-xs text-slate-400 font-medium">Internal / Company</span>
            <p className="text-xl font-bold text-orange-400 mt-1">{stats.internal}</p>
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

        {/* Add/Edit Project Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-8 rounded-2xl border border-white/10 bg-[#090D16] p-6 shadow-2xl relative"
          >
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-base font-bold text-white">
                  {editingId ? "Edit Project Details" : "Create New Project Showcase"}
                </h2>
                <p className="text-xs text-slate-400">
                  Upload screenshot, links, feature list, and verified tech stack.
                </p>
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
                <label className="block text-xs font-medium text-slate-300 mb-1">Project Title *</label>
                <input
                  required
                  placeholder="e.g. Ruchi Bazzar, School Management System"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#0F1422] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category / Domain *</label>
                <input
                  required
                  placeholder="e.g. Food Delivery Platform, Education ERP, Business Website"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#0F1422] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Client / Organization</label>
                <input
                  placeholder="e.g. Ruchi Bazaar Hyperlocal Retail"
                  value={form.client}
                  onChange={(e) => setForm({ ...form, client: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#0F1422] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Project Classification</label>
                <select
                  value={form.isInternal ? "internal" : "client"}
                  onChange={(e) => {
                    const isInt = e.target.value === "internal";
                    setForm({
                      ...form,
                      isInternal: isInt,
                      label: isInt ? "Company Website / Internal Project" : "Client Project",
                    });
                  }}
                  className="w-full rounded-xl border border-white/10 bg-[#0F1422] px-3.5 py-2.5 text-xs text-white outline-none focus:border-blue-500"
                >
                  <option value="client">Client Project / External Delivery</option>
                  <option value="internal">Company Website / Internal Project</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Live Website URL</label>
                <input
                  placeholder="https://..."
                  value={form.liveUrl}
                  onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
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
                  <option value="Published">Published (Visible in Portfolio)</option>
                  <option value="Draft">Draft (Hidden)</option>
                </select>
              </div>
            </div>

            {/* Image Upload & URL Section */}
            <div className="mt-4 rounded-xl border border-white/10 bg-[#0F1422] p-4">
              <label className="block text-xs font-semibold text-white mb-2 flex items-center gap-1.5">
                <ImageIcon className="h-4 w-4 text-blue-400" />
                <span>Project Screenshot / Logo Asset</span>
              </label>

              <div className="grid gap-4 md:grid-cols-3 items-center">
                <div className="md:col-span-2 space-y-3">
                  <div className="flex items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 px-4 py-2 text-xs font-semibold text-white transition border border-white/10">
                      <Upload className="h-3.5 w-3.5 text-blue-400" />
                      <span>{isUploading ? "Uploading..." : "Upload Screenshot Image"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[11px] text-slate-500">or enter path below:</span>
                  </div>

                  <input
                    placeholder="/projects/ruchi-logo.png or https://..."
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#090D16] px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col items-center justify-center p-2 rounded-xl border border-white/10 bg-[#090D16] min-h-[90px]">
                  {form.imageUrl ? (
                    <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center border border-white/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={form.imageUrl}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain p-1"
                      />
                    </div>
                  ) : (
                    <span className="text-[11px] text-slate-500 text-center">No image selected</span>
                  )}
                </div>
              </div>
            </div>

            {/* Short Summary */}
            <div className="mt-4">
              <label className="block text-xs font-medium text-slate-300 mb-1">Short Tagline / Summary *</label>
              <textarea
                required
                placeholder="1-2 sentences summarizing the project for cards and lists..."
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#0F1422] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                rows={2}
              />
            </div>

            {/* Full Description */}
            <div className="mt-4">
              <label className="block text-xs font-medium text-slate-300 mb-1">Architecture & Case Study Description *</label>
              <textarea
                required
                placeholder="Detailed explanation of the engineering problem, solution architecture, and execution..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#0F1422] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                rows={4}
              />
            </div>

            {/* Technologies Tags */}
            <div className="mt-4">
              <label className="block text-xs font-medium text-slate-300 mb-1">Technologies Used</label>
              <div className="flex gap-2">
                <input
                  placeholder="e.g. Next.js, Node.js, MySQL, Socket.io"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTech();
                    }
                  }}
                  className="flex-1 rounded-xl border border-white/10 bg-[#0F1422] px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddTech}
                  className="rounded-xl bg-white/10 hover:bg-white/15 px-4 py-2 text-xs font-medium text-white transition"
                >
                  Add Tech
                </button>
              </div>

              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {form.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 rounded-md bg-blue-500/10 border border-blue-500/20 px-2 py-1 text-[11px] text-blue-300"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="text-blue-400 hover:text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features List */}
            <div className="mt-4">
              <label className="block text-xs font-medium text-slate-300 mb-1">Key Deliverables & Features</label>
              <div className="flex gap-2">
                <input
                  placeholder="e.g. Customer OTP Auth, Real-time tracking"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                  className="flex-1 rounded-xl border border-white/10 bg-[#0F1422] px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="rounded-xl bg-white/10 hover:bg-white/15 px-4 py-2 text-xs font-medium text-white transition"
                >
                  Add Feature
                </button>
              </div>

              <div className="mt-2.5 space-y-1.5">
                {form.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg bg-white/[0.03] border border-white/5 px-3 py-1.5 text-xs text-slate-300"
                  >
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                      <span>{feat}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(idx)}
                      className="text-slate-500 hover:text-red-400"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/5 transition"
              >
                Cancel
              </button>
              <button
                disabled={isSaving}
                className="rounded-xl bg-orange-500 hover:bg-orange-600 px-5 py-2 text-xs font-semibold text-white disabled:opacity-50 transition shadow-sm"
              >
                {isSaving ? "Saving..." : editingId ? "Update Project" : "Publish Project"}
              </button>
            </div>
          </form>
        )}

        {/* Projects List */}
        <div className="rounded-2xl bg-[#090D16] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#0D121F] border-b border-white/10 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3.5">Project</th>
                  <th className="px-5 py-3.5">Classification</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Tech Stack</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      Loading projects...
                    </td>
                  </tr>
                ) : filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      No projects found.
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-white/[0.02] transition">
                      <td className="px-5 py-4 max-w-xs">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden p-1">
                            {project.imageUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="max-h-full max-w-full object-contain"
                              />
                            ) : (
                              <Layers className="h-5 w-5 text-slate-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-white">{project.title}</p>
                            <p className="text-[11px] text-slate-400 line-clamp-1">{project.summary}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${
                            project.isInternal
                              ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                              : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          }`}
                        >
                          {project.isInternal ? "Company Website / Internal" : "Client Project"}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-slate-300">
                        {project.category}
                      </td>
                      <td className="px-5 py-4 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {(Array.isArray(project.technologies) ? project.technologies : [])
                            .slice(0, 3)
                            .map((t) => (
                              <span
                                key={t}
                                className="rounded bg-white/5 border border-white/5 px-1.5 py-0.5 text-[10px] text-slate-400"
                              >
                                {t}
                              </span>
                            ))}
                          {(project.technologies?.length || 0) > 3 && (
                            <span className="text-[10px] text-slate-500">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${
                            project.status === "Published"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Visit Live URL"
                              className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/5 transition"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                          <button
                            onClick={() => setViewingProject(project)}
                            title="Preview Details"
                            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/5 transition"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleEdit(project)}
                            title="Edit Project"
                            className="rounded-lg p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            title="Delete Project"
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
        {viewingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <article className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#090D16] border border-white/15 p-6 shadow-2xl">
              <div className="mb-4 flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-1.5">
                    {viewingProject.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={viewingProject.imageUrl}
                        alt={viewingProject.title}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <Layers className="h-6 w-6 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-blue-400">{viewingProject.category}</span>
                      <span className="text-slate-600">•</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border ${
                          viewingProject.isInternal
                            ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }`}
                      >
                        {viewingProject.isInternal ? "Company Website / Internal" : "Client Project"}
                      </span>
                    </div>
                    <h2 className="mt-1 text-xl font-bold text-white">{viewingProject.title}</h2>
                  </div>
                </div>
                <button
                  onClick={() => setViewingProject(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 font-medium mb-4">
                {viewingProject.summary}
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <div>
                  <h4 className="font-semibold text-white mb-1.5">Architecture & Overview:</h4>
                  <p className="whitespace-pre-wrap leading-relaxed">{viewingProject.description}</p>
                </div>

                {viewingProject.technologies?.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-white mb-1.5">Technologies:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {viewingProject.technologies.map((t) => (
                        <span key={t} className="rounded-md bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-blue-300 text-[11px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {viewingProject.features?.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-white mb-1.5">Key Features:</h4>
                    <ul className="space-y-1 list-disc list-inside text-slate-300">
                      {viewingProject.features.map((f, idx) => (
                        <li key={idx}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {viewingProject.liveUrl && (
                  <div className="pt-2">
                    <a
                      href={viewingProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-orange-400 hover:text-orange-300 font-semibold"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      <span>Visit Live Website ({viewingProject.liveUrl})</span>
                    </a>
                  </div>
                )}
              </div>
            </article>
          </div>
        )}
      </main>
    </AdminLayout>
  );
}
