"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Briefcase, FileText, MessagesSquare, Plus, ArrowRight, Layers } from "lucide-react";
import AdminLayout from "../AdminLayout";
import { getBlogs, getCareers, getQueries, verifyAdmin } from "../adminData";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [counts, setCounts] = useState({ blogs: 0, careers: 0, queries: 0 });

  useEffect(() => {
    const loadDashboard = async () => {
      if (!(await verifyAdmin())) {
        router.replace("/admin");
        return;
      }

      const [blogs, careers, queries] = await Promise.all([
        getBlogs().catch(() => []),
        getCareers().catch(() => []),
        getQueries().catch(() => []),
      ]);
      setCounts({ blogs: blogs.length, careers: careers.length, queries: queries.length });
    };

    loadDashboard().catch(() => {
      router.replace("/admin");
    });
  }, [router]);

  return (
    <AdminLayout>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Management Console</h1>
          <p className="mt-1 text-xs text-slate-400">
            Overview of inquiries, published articles, and system assets.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Queries */}
          <section className="rounded-2xl border border-white/10 bg-[#090D16] p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                <MessagesSquare className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Client Inquiries</h2>
              <p className="mt-1 text-xs text-slate-400">
                {counts.queries} inquiries recorded in database.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5">
              <Link
                href="/admin/queries"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
              >
                <span>Manage Inquiries & Status</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </section>

          {/* Blogs */}
          <section className="rounded-2xl border border-white/10 bg-[#090D16] p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Articles & Insights</h2>
              <p className="mt-1 text-xs text-slate-400">
                {counts.blogs} published engineering guides.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <Link
                href="/admin/blogs"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300"
              >
                <span>View Articles</span>
                <ArrowRight size={13} />
              </Link>
              <Link
                href="/admin/blogs?mode=new"
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-slate-300 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10"
              >
                <Plus size={12} />
                <span>New</span>
              </Link>
            </div>
          </section>

          {/* Career */}
          <section className="rounded-2xl border border-white/10 bg-[#090D16] p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
                <Briefcase className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Careers & Hiring</h2>
              <p className="mt-1 text-xs text-slate-400">
                {counts.careers} roles configured.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5">
              <Link
                href="/admin/careers"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300"
              >
                <span>View Careers Manager</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </AdminLayout>
  );
}
