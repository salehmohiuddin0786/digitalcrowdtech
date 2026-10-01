"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowLeft, ShieldCheck } from "lucide-react";
import { ADMIN_EMAIL, isAdminLoggedIn, loginAdmin } from "./adminData";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: ADMIN_EMAIL, password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAdminLoggedIn()) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await loginAdmin(form.email, form.password);
      router.replace("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Invalid admin email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07090E] px-4 tech-grid-bg">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            <ArrowLeft size={13} />
            <span>Return to Website</span>
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-[#090D16] border border-white/10 p-8 shadow-2xl space-y-6"
        >
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
              <ShieldCheck size={12} />
              <span>Admin Authentication</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin Sign In</h1>
            <p className="text-xs text-slate-400">
              Manage client inquiries, blogs, and agency settings.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl bg-[#0F1422] border border-white/10 py-3 pl-10 pr-4 text-white text-xs outline-none focus:border-blue-500 transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-xl bg-[#0F1422] border border-white/10 py-3 pl-10 pr-4 text-white text-xs outline-none focus:border-blue-500 transition"
                  placeholder="Enter admin password"
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-3 text-xs font-bold text-white transition disabled:opacity-60 shadow-lg shadow-blue-600/30"
          >
            {isSubmitting ? "Authenticating..." : "Sign In to Admin Portal"}
          </button>
        </form>
      </div>
    </main>
  );
}
