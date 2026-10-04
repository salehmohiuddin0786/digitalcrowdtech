'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import {
  Search,
  Filter,
  RefreshCw,
  Trash2,
  CheckCircle2,
  Mail,
  Phone,
  MessageSquare,
  LogOut,
  ExternalLink,
  Eye,
  X,
  Building,
  Calendar,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import BackgroundMesh from '@/components/BackgroundMesh';

const STATUS_OPTIONS = ['New', 'Contacted', 'In Progress', 'Converted'];

const STATUS_BADGES = {
  New: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
  Contacted: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
  'In Progress': 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
  Converted: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
};

export default function AdminQueriesPage() {
  const router = useRouter();

  useEffect(() => {
    // Unified Admin Portal: Redirect to central admin queries
    if (typeof window !== 'undefined') {
      window.location.href = 'http://localhost:3000/admin/queries';
    }
  }, [router]);
      return localStorage.getItem('dct_admin_token') || '';
    }
    return '';
  };

  const loadQueries = async () => {
    const token = getToken();
    if (!token) {
      router.replace('/admin');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/queries', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.status === 401) {
        localStorage.removeItem('dct_admin_token');
        router.replace('/admin');
        return;
      }

      if (!res.ok || !data.ok) {
        throw new Error(data.message || 'Failed to retrieve queries');
      }

      setQueries(data.items || []);
    } catch (err) {
      setErrorMsg(err.message || 'Error loading inquiries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQueries();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const token = getToken();
    try {
      const res = await fetch('/api/admin/queries', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message || 'Status update failed');

      setQueries((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
      );
      if (viewingQuery && viewingQuery.id === id) {
        setViewingQuery((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) {
      return;
    }
    const token = getToken();
    try {
      const res = await fetch(`/api/admin/queries?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message || 'Deletion failed');

      setQueries((prev) => prev.filter((q) => q.id !== id));
      if (viewingQuery && viewingQuery.id === id) {
        setViewingQuery(null);
      }
    } catch (err) {
      alert('Error deleting query: ' + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('dct_admin_token');
    router.replace('/admin');
  };

  const filteredQueries = useMemo(() => {
    return queries.filter((q) => {
      const matchesStatus = statusFilter === 'All' || q.status === statusFilter;
      const term = search.toLowerCase().trim();
      if (!term) return matchesStatus;

      const matchesSearch =
        (q.name || '').toLowerCase().includes(term) ||
        (q.company || '').toLowerCase().includes(term) ||
        (q.email || '').toLowerCase().includes(term) ||
        (q.phone || '').toLowerCase().includes(term) ||
        (q.projectType || '').toLowerCase().includes(term) ||
        (q.message || '').toLowerCase().includes(term);

      return matchesStatus && matchesSearch;
    });
  }, [queries, statusFilter, search]);

  const metrics = useMemo(() => {
    const total = queries.length;
    const newCount = queries.filter((q) => q.status === 'New').length;
    const contacted = queries.filter((q) => q.status === 'Contacted').length;
    const converted = queries.filter((q) => q.status === 'Converted').length;
    return { total, newCount, contacted, converted };
  }, [queries]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      return new Intl.DateTimeFormat('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  return (
    <>
      <Head>
        <title>Client Inquiries | Admin Console | Digital Crowd Technologies</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <div className="relative min-h-screen bg-[#060D1A] text-slate-100 flex flex-col">
        <BackgroundMesh />

        {/* Top Floating Admin Navbar */}
        <header className="relative z-20 border-b border-white/10 bg-[#0A192F]/80 backdrop-blur-2xl px-4 sm:px-8 py-3.5 sticky top-0 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <Link href="/" className="px-2.5 py-1 rounded-lg bg-white/95 shadow-sm inline-flex items-center">
                <img src="/logo.png" alt="DCT" className="h-6 w-auto object-contain" />
              </Link>
              <div className="hidden sm:block h-5 w-px bg-white/15" />
              <div className="hidden sm:flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-300">
                  Admin Console
                </span>
                <span className="rounded-full bg-blue-500/20 border border-blue-400/30 px-2 py-0.2 text-[10px] font-mono text-blue-200">
                  Live DB
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={loadQueries}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/15 bg-white/[0.04] text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Refresh inquiries"
              >
                <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              <Link
                href="/"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/15 bg-white/[0.04] text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <span className="hidden sm:inline">View</span>
                <span>Website</span>
                <ArrowUpRight size={13} />
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-500/30 bg-red-500/10 text-xs font-semibold text-red-300 hover:bg-red-500/20 transition-colors cursor-pointer"
              >
                <LogOut size={13} />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>

          </div>
        </header>

        {/* Main Console Content */}
        <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Metrics Summary Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="rounded-2xl border border-white/10 bg-[#0A192F]/50 p-5 backdrop-blur-xl shadow-md">
              <span className="text-xs font-mono uppercase text-slate-400">Total Leads</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{metrics.total}</p>
              <p className="text-[11px] text-slate-500 mt-1">All-time received</p>
            </div>

            <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5 backdrop-blur-xl shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-blue-300 font-bold">New Leads</span>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                </span>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-blue-200 mt-1">{metrics.newCount}</p>
              <p className="text-[11px] text-blue-300/70 mt-1">Awaiting initial reply</p>
            </div>

            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 backdrop-blur-xl shadow-md">
              <span className="text-xs font-mono uppercase text-amber-300 font-bold">In Discussion</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-200 mt-1">{metrics.contacted}</p>
              <p className="text-[11px] text-amber-300/70 mt-1">Contacted clients</p>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 backdrop-blur-xl shadow-md">
              <span className="text-xs font-mono uppercase text-emerald-300 font-bold">Converted</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-200 mt-1">{metrics.converted}</p>
              <p className="text-[11px] text-emerald-300/70 mt-1">Closed project agreements</p>
            </div>
          </div>

          {/* Search & Status Filters Bar */}
          <div className="rounded-2xl border border-white/10 bg-[#0A192F]/50 p-4 sm:p-5 backdrop-blur-xl mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by client name, email, phone, company, or project..."
                className="w-full rounded-xl border border-white/10 bg-[#071324] py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-400"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-3 text-slate-500 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Status Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {['All', ...STATUS_OPTIONS].map((status) => {
                const active = statusFilter === status;
                return (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Queries Listing */}
          {loading ? (
            <div className="py-20 text-center">
              <div className="h-8 w-8 rounded-full border-2 border-blue-500/30 border-t-blue-400 animate-spin mx-auto mb-3" />
              <p className="text-xs text-slate-400 font-mono">Synchronizing inquiry database...</p>
            </div>
          ) : filteredQueries.length === 0 ? (
            <div className="rounded-[2.5rem] border border-white/10 bg-[#0A192F]/40 p-16 text-center backdrop-blur-xl">
              <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">No Inquiries Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {search || statusFilter !== 'All'
                  ? 'No inquiries match your filter criteria. Try clearing the search term.'
                  : 'New customer submissions from the website contact form will appear here automatically.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredQueries.map((query) => (
                <div
                  key={query.id}
                  className="rounded-2xl border border-white/10 bg-[#0A192F]/50 p-5 sm:p-6 backdrop-blur-xl transition-all hover:border-blue-400/30 hover:bg-[#0E2442]/60 shadow-md"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    {/* Customer Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2.5 mb-2">
                        <span className="text-base font-bold text-white">{query.name}</span>
                        {query.company && (
                          <span className="flex items-center gap-1 text-xs text-slate-400 bg-white/[0.04] px-2.5 py-0.5 rounded-md border border-white/5">
                            <Building size={12} />
                            <span>{query.company}</span>
                          </span>
                        )}
                        <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${STATUS_BADGES[query.status] || STATUS_BADGES.New}`}>
                          {query.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mb-3">
                        <a
                          href={`mailto:${query.email}`}
                          className="flex items-center gap-1.5 text-blue-300 hover:text-white transition-colors"
                        >
                          <Mail size={13} />
                          <span>{query.email}</span>
                        </a>

                        {query.phone && (
                          <a
                            href={`tel:${query.phone}`}
                            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                          >
                            <Phone size={13} />
                            <span>{query.phone}</span>
                          </a>
                        )}

                        <span className="text-slate-500">•</span>
                        <span className="text-slate-400 flex items-center gap-1">
                          <Calendar size={12} />
                          <span>{formatDate(query.createdAt)}</span>
                        </span>
                      </div>

                      {/* Project Tag & Scope */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-[11px] font-mono text-orange-400 bg-orange-500/10 border border-orange-500/25 px-2.5 py-0.5 rounded">
                          {query.projectType || 'Custom Project'}
                        </span>
                        {query.budget && (
                          <span className="text-[11px] font-mono text-slate-300 bg-white/[0.04] border border-white/5 px-2 py-0.5 rounded">
                            Budget: {query.budget}
                          </span>
                        )}
                      </div>

                      {/* Message Preview */}
                      <p className="text-xs text-slate-300/90 line-clamp-2 leading-relaxed">
                        {query.message}
                      </p>
                    </div>

                    {/* Actions & Status Dropdown */}
                    <div className="flex flex-wrap items-center gap-2 lg:flex-col lg:items-end">
                      
                      {/* Status Selector */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-mono text-slate-400">Status:</span>
                        <select
                          value={query.status}
                          onChange={(e) => handleStatusChange(query.id, e.target.value)}
                          className="rounded-lg border border-white/15 bg-[#071324] px-2.5 py-1 text-xs text-white outline-none cursor-pointer focus:border-blue-400"
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt} value={opt} className="bg-[#0A192F]">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Quick Action Buttons */}
                      <div className="flex items-center gap-1.5 mt-1">
                        
                        {/* WhatsApp Direct Reply */}
                        {query.phone && (
                          <a
                            href={`https://wa.me/${query.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Hello ${query.name}, this is Digital Crowd Technologies regarding your ${query.projectType || 'project'} inquiry.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/20 transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <span>WhatsApp</span>
                          </a>
                        )}

                        {/* View Details Modal Button */}
                        <button
                          onClick={() => setViewingQuery(query)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-semibold hover:bg-blue-500/20 transition-colors cursor-pointer"
                        >
                          <Eye size={12} />
                          <span>View</span>
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(query.id)}
                          className="flex items-center justify-center h-7 w-7 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                          title="Delete inquiry"
                        >
                          <Trash2 size={13} />
                        </button>

                      </div>

                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

        </main>

        {/* View Inquiry Details Modal */}
        {viewingQuery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-2xl rounded-[2.5rem] border border-white/20 bg-[#0A192F] p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
              
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div>
                  <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${STATUS_BADGES[viewingQuery.status] || STATUS_BADGES.New}`}>
                    {viewingQuery.status}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">{viewingQuery.name}</h3>
                  {viewingQuery.company && (
                    <p className="text-xs text-slate-400 mt-0.5">{viewingQuery.company}</p>
                  )}
                </div>

                <button
                  onClick={() => setViewingQuery(null)}
                  className="p-2 rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Inquiry Details Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs mb-6 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div>
                  <span className="text-slate-400 font-mono uppercase text-[10px] block">Email</span>
                  <a href={`mailto:${viewingQuery.email}`} className="text-blue-300 hover:underline font-medium text-sm">
                    {viewingQuery.email}
                  </a>
                </div>

                <div>
                  <span className="text-slate-400 font-mono uppercase text-[10px] block">Phone</span>
                  <span className="text-slate-200 font-medium text-sm">
                    {viewingQuery.phone || 'Not provided'}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 font-mono uppercase text-[10px] block">Project Type</span>
                  <span className="text-orange-400 font-semibold">{viewingQuery.projectType}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-mono uppercase text-[10px] block">Budget</span>
                  <span className="text-slate-200 font-semibold">{viewingQuery.budget}</span>
                </div>

                <div className="col-span-2">
                  <span className="text-slate-400 font-mono uppercase text-[10px] block">Date Received</span>
                  <span className="text-slate-300">{formatDate(viewingQuery.createdAt)}</span>
                </div>
              </div>

              {/* Message Body */}
              <div className="mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">
                  Client Message / Specifications:
                </span>
                <div className="rounded-xl border border-white/10 bg-[#071324] p-4 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {viewingQuery.message}
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">Update Status:</span>
                  <select
                    value={viewingQuery.status}
                    onChange={(e) => handleStatusChange(viewingQuery.id, e.target.value)}
                    className="rounded-lg border border-white/20 bg-[#071324] px-3 py-1.5 text-xs text-white outline-none cursor-pointer focus:border-blue-400"
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${viewingQuery.email}?subject=${encodeURIComponent(
                      `Digital Crowd Technologies: Regarding your ${viewingQuery.projectType} enquiry`
                    )}`}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-colors"
                  >
                    Reply via Email
                  </a>

                  {viewingQuery.phone && (
                    <a
                      href={`https://wa.me/${viewingQuery.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hello ${viewingQuery.name}, this is Digital Crowd Technologies regarding your ${viewingQuery.projectType || 'project'} inquiry.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition-colors"
                    >
                      Reply on WhatsApp
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </>
  );
}
