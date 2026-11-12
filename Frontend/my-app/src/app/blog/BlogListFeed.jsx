"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, Search, Sparkles, Filter, BookOpen } from "lucide-react";

export default function BlogListFeed({ initialBlogs = [] }) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  // Sync with live backend API & local storage on client mount
  useEffect(() => {
    setMounted(true);
    const syncLatestBlogs = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
        const res = await fetch(`${apiBase}/api/blogs`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data && data.ok && Array.isArray(data.items)) {
            // Check for custom blogs saved in local storage by admin
            let customBlogs = [];
            try {
              customBlogs = JSON.parse(window.localStorage.getItem("dct_admin_custom_blogs") || "[]");
            } catch {}

            // Merge unique by slug or id
            const map = new Map();
            customBlogs.forEach((b) => map.set(b.slug || b.id, b));
            data.items.forEach((b) => map.set(b.slug || b.id, b));
            initialBlogs.forEach((b) => {
              if (!map.has(b.slug || b.id)) {
                map.set(b.slug || b.id, b);
              }
            });

            const merged = Array.from(map.values()).filter(
              (b) => (b.status || "Published") === "Published"
            );
            setBlogs(merged);
            return;
          }
        }
      } catch (err) {
        console.warn("Client blogs sync notice:", err.message);
      }

      // Local storage fallback check
      try {
        const customBlogs = JSON.parse(window.localStorage.getItem("dct_admin_custom_blogs") || "[]");
        if (Array.isArray(customBlogs) && customBlogs.length > 0) {
          const map = new Map();
          customBlogs.forEach((b) => map.set(b.slug || b.id, b));
          initialBlogs.forEach((b) => {
            if (!map.has(b.slug || b.id)) map.set(b.slug || b.id, b);
          });
          setBlogs(Array.from(map.values()));
        }
      } catch {}
    };

    syncLatestBlogs();
  }, [initialBlogs]);

  // Extract unique categories
  const categories = [
    "All",
    ...Array.from(new Set(blogs.map((b) => b.category).filter(Boolean))),
  ];

  // Filtered blogs
  const filtered = blogs.filter((post) => {
    const matchesCat =
      activeCategory === "All" ||
      (post.category || "").toLowerCase() === activeCategory.toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      (post.title || "").toLowerCase().includes(q) ||
      (post.excerpt || "").toLowerCase().includes(q) ||
      (post.category || "").toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const getCategoryBadgeClass = (category) => {
    const cat = (category || "").toLowerCase();
    if (cat.includes("cost") || cat.includes("price") || cat.includes("e-commerce")) {
      return "bg-[#F87000]/10 text-[#F87000] border-[#F87000]/30";
    }
    if (cat.includes("erp") || cat.includes("school") || cat.includes("backend")) {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    }
    return "bg-[#2F7DE1]/10 text-[#2F7DE1] border-[#2F7DE1]/30";
  };

  return (
    <div className="space-y-8">
      {/* Search and Category Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#16223A]/80 [html.light_&]:bg-slate-100/90 border border-[#26344F] [html.light_&]:border-slate-300 shadow-md">
        
        {/* Category Pills (horizontal scrollable on mobile) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-[#2F7DE1] text-white shadow-sm shadow-blue-500/25"
                    : "text-slate-300 [html.light_&]:text-[#40484C] hover:text-white [html.light_&]:hover:text-[#0A2540] hover:bg-white/5 [html.light_&]:hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px] sm:min-w-[280px]">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0B1220]/70 [html.light_&]:bg-white border border-[#26344F] [html.light_&]:border-slate-300 text-xs text-white [html.light_&]:text-[#0A2540] placeholder-slate-400 focus:outline-none focus:border-[#2F7DE1] transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Result Count Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-400 [html.light_&]:text-slate-600 px-1">
        <span>
          Showing <strong className="text-white [html.light_&]:text-[#0A2540]">{filtered.length}</strong> {filtered.length === 1 ? "article" : "articles"}
          {activeCategory !== "All" && ` in ${activeCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
        {(activeCategory !== "All" || searchQuery) && (
          <button
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className="text-[#2F7DE1] hover:underline font-semibold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Articles Grid */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl glass-card-premium border border-dashed border-[#26344F] text-slate-400">
          <BookOpen size={32} className="mx-auto mb-3 text-slate-500 opacity-60" />
          <h3 className="text-base font-bold text-white [html.light_&]:text-[#0A2540] mb-1">No articles found</h3>
          <p className="text-xs text-slate-400 mb-4">No published articles match your selected filters.</p>
          <button
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-xl bg-[#2F7DE1] text-white text-xs font-bold hover:bg-[#2F7DE1]/80 transition"
          >
            View All Articles
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((post, idx) => (
            <article
              key={post.id || post.slug || idx}
              className="bg-[#16223A] [html.light_&]:bg-[#F4F7FB] border border-[#26344F] [html.light_&]:border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl hover:border-[#2F7DE1]/50 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Subtle top glow */}
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#2F7DE1]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#2F7DE1]/20 transition-all duration-500" />

              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs text-[#8494AD] [html.light_&]:text-[#64748B] mb-4 gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full border text-[11px] font-semibold tracking-wide ${getCategoryBadgeClass(
                      post.category
                    )}`}
                  >
                    {post.category || "Web Development"}
                  </span>

                  <span className="flex items-center gap-1 font-mono text-[11px] text-slate-400 [html.light_&]:text-slate-500 shrink-0">
                    <Clock size={12} className="text-[#2F7DE1]" />
                    {post.readTime || "5 min read"}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-base sm:text-lg font-bold text-white [html.light_&]:text-[#0A2540] group-hover:text-[#2F7DE1] transition-colors mb-3 leading-snug">
                  <Link href={`/blog/${post.slug || post.id}`} className="hover:underline focus:outline-none">
                    {post.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-[#8494AD] [html.light_&]:text-[#64748B] leading-relaxed line-clamp-3 mb-6">
                  {post.excerpt || (post.content ? post.content.slice(0, 140) + "..." : "")}
                </p>
              </div>

              {/* Meta Footer */}
              <div className="pt-4 border-t border-[#26344F]/60 [html.light_&]:border-slate-200 flex items-center justify-between text-xs mt-auto">
                <span className="flex items-center gap-1.5 text-[#8494AD] [html.light_&]:text-[#64748B] font-mono text-[11px]">
                  <Calendar size={12} />
                  <span>{post.date || "Recent"}</span>
                </span>

                <Link
                  href={`/blog/${post.slug || post.id}`}
                  className="inline-flex items-center gap-1.5 font-bold text-[#F87000] group-hover:text-[#FF8A24] transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
