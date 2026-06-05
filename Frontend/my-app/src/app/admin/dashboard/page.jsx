"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Briefcase, FileText, MessagesSquare, Plus } from "lucide-react";
import AdminLayout from "../AdminLayout";
import { getBlogs, getCareers, getQueries, verifyAdmin } from "../adminData";

const AdminDashboardPage = () => {
  const router = useRouter();
  const [counts, setCounts] = useState({ blogs: 0, careers: 0, queries: 0 });

  useEffect(() => {
    const loadDashboard = async () => {
      if (!(await verifyAdmin())) {
        router.replace("/admin");
        return;
      }

      const [blogs, careers, queries] = await Promise.all([getBlogs(), getCareers(), getQueries()]);
      setCounts({ blogs: blogs.length, careers: careers.length, queries: queries.length });
    };

    loadDashboard().catch(() => {
      router.replace("/admin");
    });
  }, [router]);

  return (
    <AdminLayout>
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-950">Dashboard</h1>
          <p className="mt-2 text-slate-600">Manage website content and customer queries.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <FileText className="h-10 w-10 text-blue-600" />
            <h2 className="mt-5 text-2xl font-bold text-slate-950">Blogs</h2>
            <p className="mt-2 text-slate-600">{counts.blogs} blog posts saved.</p>
            <div className="mt-6 flex gap-3">
              <Link href="/admin/blogs" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                View Blogs
              </Link>
              <Link href="/admin/blogs?mode=new" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
                <Plus className="h-4 w-4" />
                Add Blog
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Briefcase className="h-10 w-10 text-blue-600" />
            <h2 className="mt-5 text-2xl font-bold text-slate-950">Career</h2>
            <p className="mt-2 text-slate-600">{counts.careers} career openings saved.</p>
            <div className="mt-6 flex gap-3">
              <Link href="/admin/careers" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                View Careers
              </Link>
              <Link href="/admin/careers?mode=new" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
                <Plus className="h-4 w-4" />
                Add Career
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <MessagesSquare className="h-10 w-10 text-blue-600" />
            <h2 className="mt-5 text-2xl font-bold text-slate-950">Queries</h2>
            <p className="mt-2 text-slate-600">{counts.queries} customer messages saved.</p>
            <div className="mt-6">
              <Link href="/admin/queries" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                View Queries
              </Link>
            </div>
          </section>
        </div>
      </main>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
