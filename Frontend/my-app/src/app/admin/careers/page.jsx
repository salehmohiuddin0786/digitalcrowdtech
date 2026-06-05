"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Eye, Plus, Trash2, X } from "lucide-react";
import AdminLayout from "../AdminLayout";
import { createCareer, deleteCareer, getCareers, updateCareer, verifyAdmin } from "../adminData";

const emptyCareer = {
  title: "",
  type: "Full Time",
  location: "",
  experience: "",
  description: "",
  status: "Open",
};

const AdminCareersPage = () => {
  const router = useRouter();
  const [careers, setCareers] = useState([]);
  const [form, setForm] = useState(emptyCareer);
  const [editingId, setEditingId] = useState(null);
  const [viewingCareer, setViewingCareer] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadCareers = async () => {
      if (!(await verifyAdmin())) {
        router.replace("/admin");
        return;
      }

      setCareers(await getCareers());
      if (new URLSearchParams(window.location.search).get("mode") === "new") {
        setShowForm(true);
      }
    };

    loadCareers().catch((error) => setMessage(error.message || "Unable to load careers."));
  }, [router]);

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
        setCareers(careers.map((career) => (career.id === editingId ? updatedCareer : career)));
        setMessage("Career opening updated successfully.");
      } else {
        const nextCareer = await createCareer(form);
        setCareers([nextCareer, ...careers]);
        setMessage("Career opening added successfully.");
      }

      resetForm();
    } catch (error) {
      setMessage(error.message || "Unable to save career opening.");
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
  };

  const handleDelete = async (id) => {
    setMessage("");

    try {
      await deleteCareer(id);
      setCareers(careers.filter((career) => career.id !== id));
      setMessage("Career opening deleted successfully.");
    } catch (error) {
      setMessage(error.message || "Unable to delete career opening.");
    }
  };

  return (
    <AdminLayout>
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">Career</h1>
            <p className="mt-2 text-slate-600">Add, edit, view, and delete job openings.</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" />
            Add Career
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-950">{editingId ? "Edit Career" : "Add Career"}</h2>
              <button type="button" onClick={resetForm} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input required placeholder="Job Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-xl border border-slate-300 px-4 py-3" />
              <input required placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="rounded-xl border border-slate-300 px-4 py-3" />
              <input required placeholder="Experience" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="rounded-xl border border-slate-300 px-4 py-3" />
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="rounded-xl border border-slate-300 px-4 py-3">
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="rounded-xl border border-slate-300 px-4 py-3 md:col-span-2">
                <option>Open</option>
                <option>Closed</option>
              </select>
            </div>
            <textarea required placeholder="Job Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3" rows={6} />
            <button disabled={isSaving} className="mt-4 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white disabled:opacity-70">
              {isSaving ? "Saving..." : editingId ? "Update Career" : "Save Career"}
            </button>
          </form>
        )}

        {message && <p className="mb-5 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">{message}</p>}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-12 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-600">
            <span className="col-span-4">Role</span>
            <span className="col-span-2">Location</span>
            <span className="col-span-2">Experience</span>
            <span className="col-span-1">Status</span>
            <span className="col-span-3 text-right">Actions</span>
          </div>
          {careers.map((career) => (
            <div key={career.id} className="grid grid-cols-12 items-center border-t border-slate-100 px-5 py-4 text-sm">
              <div className="col-span-4">
                <p className="font-semibold text-slate-950">{career.title}</p>
                <p className="text-slate-500">{career.type}</p>
              </div>
              <span className="col-span-2 text-slate-600">{career.location}</span>
              <span className="col-span-2 text-slate-600">{career.experience}</span>
              <span className="col-span-1 text-slate-600">{career.status}</span>
              <div className="col-span-3 flex justify-end gap-2">
                <button onClick={() => setViewingCareer(career)} className="rounded-lg border border-slate-200 p-2 text-slate-600"><Eye className="h-4 w-4" /></button>
                <button onClick={() => handleEdit(career)} className="rounded-lg border border-slate-200 p-2 text-blue-600"><Edit className="h-4 w-4" /></button>
                <button onClick={() => handleDelete(career.id)} className="rounded-lg border border-slate-200 p-2 text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>

        {viewingCareer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
            <article className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-6">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-blue-600">{viewingCareer.type} - {viewingCareer.status}</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-950">{viewingCareer.title}</h2>
                  <p className="mt-1 text-sm text-slate-500">{viewingCareer.location} - {viewingCareer.experience}</p>
                </div>
                <button onClick={() => setViewingCareer(null)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X className="h-5 w-5" /></button>
              </div>
              <p className="whitespace-pre-wrap text-slate-600">{viewingCareer.description}</p>
            </article>
          </div>
        )}
      </main>
    </AdminLayout>
  );
};

export default AdminCareersPage;
