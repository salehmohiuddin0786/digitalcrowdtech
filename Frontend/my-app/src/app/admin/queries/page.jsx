"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Mail, Phone, RefreshCw, Search, X } from "lucide-react";
import AdminLayout from "../AdminLayout";
import { getQueries, verifyAdmin } from "../adminData";

const formatDate = (value) => {
  if (!value) return "";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const statusClasses = {
  Sent: "bg-emerald-50 text-emerald-700",
  Failed: "bg-red-50 text-red-700",
  Pending: "bg-amber-50 text-amber-700",
};

const AdminQueriesPage = () => {
  const router = useRouter();
  const [queries, setQueries] = useState([]);
  const [search, setSearch] = useState("");
  const [viewingQuery, setViewingQuery] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadQueries = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      setQueries(await getQueries());
    } catch (error) {
      setMessage(error.message || "Unable to load queries.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializePage = async () => {
      if (!(await verifyAdmin())) {
        router.replace("/admin");
        return;
      }

      await loadQueries();
    };

    initializePage();

    const refreshTimer = window.setInterval(() => {
      getQueries().then(setQueries).catch(() => {});
    }, 15000);

    return () => window.clearInterval(refreshTimer);
  }, [router]);

  const filteredQueries = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return queries;

    return queries.filter((query) =>
      [query.name, query.email, query.phone, query.subject, query.message]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term))
    );
  }, [queries, search]);

  return (
    <AdminLayout>
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">Customer Queries</h1>
            <p className="mt-2 text-slate-600">View every saved message submitted through the contact form.</p>
          </div>
          <div className="flex w-full gap-2 md:max-w-md">
            <label className="flex flex-1 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search queries"
                className="w-full bg-transparent text-sm outline-none"
              />
            </label>
            <button
              onClick={loadQueries}
              disabled={isLoading}
              aria-label="Refresh queries"
              className="rounded-xl border border-slate-300 bg-white px-4 text-blue-600 disabled:opacity-60"
            >
              <RefreshCw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {message && <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{message}</p>}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="hidden grid-cols-12 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-600 md:grid">
            <span className="col-span-3">Customer</span>
            <span className="col-span-4">Subject</span>
            <span className="col-span-2">Mail Status</span>
            <span className="col-span-2">Received</span>
            <span className="col-span-1 text-right">View</span>
          </div>

          {filteredQueries.map((query) => (
            <div key={query.id} className="grid gap-3 border-t border-slate-100 px-5 py-4 text-sm md:grid-cols-12 md:items-center">
              <div className="md:col-span-3">
                <p className="font-semibold text-slate-950">{query.name}</p>
                <p className="break-all text-slate-500">{query.email}</p>
              </div>
              <div className="md:col-span-4">
                <p className="font-semibold text-slate-800">{query.subject}</p>
                <p className="mt-1 truncate text-slate-500">{query.message}</p>
              </div>
              <div className="md:col-span-2">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusClasses[query.mailStatus] || statusClasses.Pending}`}>
                  {query.mailStatus}
                </span>
              </div>
              <time className="text-slate-500 md:col-span-2">{formatDate(query.createdAt)}</time>
              <div className="md:col-span-1 md:text-right">
                <button
                  onClick={() => setViewingQuery(query)}
                  aria-label={`View query from ${query.name}`}
                  className="rounded-lg border border-slate-200 p-2 text-blue-600 hover:bg-blue-50"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          {filteredQueries.length === 0 && (
            <p className="border-t border-slate-100 px-5 py-12 text-center text-slate-500">
              {queries.length === 0 ? "No customer queries have been received yet." : "No queries match your search."}
            </p>
          )}
        </div>

        {viewingQuery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
            <article className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusClasses[viewingQuery.mailStatus] || statusClasses.Pending}`}>
                    Mail {viewingQuery.mailStatus}
                  </span>
                  <h2 className="mt-3 text-2xl font-bold text-slate-950">{viewingQuery.subject}</h2>
                  <p className="mt-1 text-sm text-slate-500">{formatDate(viewingQuery.createdAt)}</p>
                </div>
                <button onClick={() => setViewingQuery(null)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid gap-3 rounded-xl bg-slate-50 p-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Name</p>
                  <p className="mt-1 font-semibold text-slate-900">{viewingQuery.name}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Contact</p>
                  <a href={`mailto:${viewingQuery.email}`} className="mt-1 flex items-center gap-2 text-blue-600">
                    <Mail className="h-4 w-4" />
                    {viewingQuery.email}
                  </a>
                  {viewingQuery.phone && (
                    <a href={`tel:${viewingQuery.phone}`} className="mt-1 flex items-center gap-2 text-blue-600">
                      <Phone className="h-4 w-4" />
                      {viewingQuery.phone}
                    </a>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Message</p>
                <p className="mt-3 whitespace-pre-wrap text-slate-700">{viewingQuery.message}</p>
              </div>

              {viewingQuery.mailError && (
                <div className="mt-6 rounded-xl bg-red-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-red-600">Mail error</p>
                  <p className="mt-2 text-sm text-red-700">{viewingQuery.mailError}</p>
                </div>
              )}
            </article>
          </div>
        )}
      </main>
    </AdminLayout>
  );
};

export default AdminQueriesPage;
