'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { Lock, Mail, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import BackgroundMesh from '@/components/BackgroundMesh';

export default function AdminLoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Unified Admin Portal: Redirect to main website admin panel
    if (typeof window !== 'undefined') {
      window.location.href = 'http://localhost:3000/admin';
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || 'Invalid administrator credentials.');
      }

      localStorage.setItem('dct_admin_token', data.token);
      localStorage.setItem('dct_admin_email', data.user.email);
      router.replace('/admin/queries');
    } catch (err) {
      setError(err.message || 'Authentication error.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Authentication | Digital Crowd Technologies</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <div className="relative min-h-screen flex items-center justify-center bg-[#060D1A] text-slate-100 px-4 py-12">
        <BackgroundMesh />

        <div className="relative z-10 w-full max-w-md">
          
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Public Website</span>
            </Link>
          </div>

          <div className="rounded-[2.5rem] border border-white/15 bg-[#0A192F]/60 p-8 sm:p-10 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.6)]">
            
            {/* Header with Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-white/95 shadow-md mb-4">
                <img
                  src="/logo.png"
                  alt="Digital Crowd Technologies"
                  className="h-7 w-auto object-contain"
                />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-[11px] font-mono mb-2 block mx-auto w-fit">
                <ShieldCheck size={13} />
                <span>Console Authentication</span>
              </div>

              <h1 className="text-2xl font-bold text-white tracking-tight">Admin Sign In</h1>
              <p className="text-xs text-slate-400 mt-1">
                Access and manage all client inquiries and lead pipelines.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#071324]/80 py-3 pl-10 pr-4 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="admin@digitalcrowdtech.in"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#071324]/80 py-3 pl-10 pr-4 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Enter admin password"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/25 bg-red-500/10 p-3 text-xs text-red-300">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-orange-500 py-3.5 text-xs font-bold text-white shadow-[0_10px_25px_rgba(0,102,255,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer mt-2"
              >
                {submitting ? 'Verifying Credentials...' : 'Sign In to Admin Console'}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-white/10 text-center text-[11px] text-slate-500">
              Default credentials: <span className="font-mono text-slate-400">admin@digitalcrowdtech.in</span> / <span className="font-mono text-slate-400">admin123</span>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
