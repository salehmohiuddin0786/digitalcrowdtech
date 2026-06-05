"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { ADMIN_EMAIL, isAdminLoggedIn, loginAdmin } from "./adminData";

const AdminLoginPage = () => {
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
    } catch (error) {
      setError(error.message || "Invalid admin email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-600">DigitalCrowdTech</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">Admin Login</h1>
          <p className="mt-2 text-sm text-slate-500">Sign in to manage blogs and careers.</p>
        </div>

        <div className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Email</span>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter admin password"
                required
              />
            </div>
          </label>
        </div>

        {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <button
          disabled={isSubmitting}
          className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
};

export default AdminLoginPage;
