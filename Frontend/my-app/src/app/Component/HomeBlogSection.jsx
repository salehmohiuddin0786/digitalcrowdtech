"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Calendar, Sparkles, TrendingUp } from "lucide-react";
import { BLOG_POSTS } from "../data/blogs";

export default function HomeBlogSection() {
  const [posts, setPosts] = useState(BLOG_POSTS.slice(0, 3));

  useEffect(() => {
    // Attempt to load fresh posts from backend API or local storage if admin added new ones
    const fetchFreshPosts = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
        const res = await fetch(`${apiBase}/api/blogs`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data && data.ok && Array.isArray(data.items) && data.items.length > 0) {
            const published = data.items.filter((p) => (p.status || "Published") === "Published");
            if (published.length > 0) {
              setPosts(published.slice(0, 3));
              return;
            }
          }
        }
      } catch {
        // Fallback silently to static verified blogs
      }

      // Check localStorage for custom admin blogs
      if (typeof window !== "undefined") {
        try {
          const custom = JSON.parse(window.localStorage.getItem("dct_admin_custom_blogs") || "[]");
          if (Array.isArray(custom) && custom.length > 0) {
            setPosts([...custom, ...BLOG_POSTS].slice(0, 3));
          }
        } catch {
          // ignore
        }
      }
    };

    fetchFreshPosts();
  }, []);

  const getCategoryColor = (cat) => {
    const c = (cat || "").toLowerCase();
    if (c.includes("cost") || c.includes("price") || c.includes("e-commerce")) {
      return "bg-[#F87000]/10 text-[#F87000] border-[#F87000]/30";
    }
    if (c.includes("erp") || c.includes("school") || c.includes("backend")) {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    }
    return "bg-[#2F7DE1]/10 text-[#2F7DE1] border-[#2F7DE1]/30";
  };

  return (
    <section className="py-20 md:py-28 bg-transparent border-b border-white/5 [html.light_&]:border-slate-200/80 relative" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#2F7DE1]/10 border border-[#2F7DE1]/30 text-[#2F7DE1] mb-4">
              <BookOpen size={13} />
              <span>Engineering Guides & Industry Insights</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white [html.light_&]:text-[#0A2540] tracking-tight leading-tight">
              Practical Insights for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F7DE1] to-[#F87000]">
                Modern Businesses
              </span>
            </h2>
            
            <p className="mt-3 text-sm sm:text-base text-[#8494AD] [html.light_&]:text-[#64748B] leading-relaxed">
              Transparent breakdowns on realistic website costs in India, system architecture decisions, and choosing the right tech stack for long-term reliability.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 [html.light_&]:bg-slate-100 hover:bg-white/10 [html.light_&]:hover:bg-slate-200 border border-[#26344F] [html.light_&]:border-slate-300 text-xs sm:text-sm font-bold text-white [html.light_&]:text-[#0A2540] transition shrink-0 group self-start md:self-auto shadow-md"
          >
            <span>Explore All Articles</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform text-[#2F7DE1]" />
          </Link>
        </div>

        {/* 3 Featured Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post) => (
            <article
              key={post.id || post.slug}
              className="p-6 sm:p-7 rounded-2xl glass-card-premium flex flex-col justify-between group hover:border-[#2F7DE1]/50 shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle Ambient Hover Glow */}
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#2F7DE1]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#2F7DE1]/20 transition-all duration-500" />

              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs text-[#8494AD] [html.light_&]:text-[#64748B] mb-4 gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-semibold tracking-wide ${getCategoryColor(post.category)}`}>
                    {post.category || "Web Development"}
                  </span>
                  
                  <span className="flex items-center gap-1 font-mono text-[11px] shrink-0 text-slate-400 [html.light_&]:text-slate-500">
                    <Clock size={12} className="text-[#2F7DE1]" />
                    {post.readTime || "5 min read"}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white [html.light_&]:text-[#0A2540] group-hover:text-[#2F7DE1] transition-colors mb-3 leading-snug">
                  <Link href={`/blog/${post.slug}`} className="hover:underline focus:outline-none">
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-[#8494AD] [html.light_&]:text-[#64748B] leading-relaxed line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
              </div>

              {/* Meta Footer */}
              <div className="pt-4 border-t border-white/5 [html.light_&]:border-slate-200 flex items-center justify-between text-xs mt-auto">
                <span className="flex items-center gap-1.5 text-[#8494AD] [html.light_&]:text-[#64748B] font-mono text-[11px]">
                  <Calendar size={12} />
                  <span>{post.date || "Recent"}</span>
                </span>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 font-bold text-[#F87000] group-hover:text-[#FF8A24] transition-colors"
                >
                  <span>Read Guide</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Quick Highlights Banner */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#2F7DE1]/10 via-[#16223A]/80 to-[#F87000]/10 border border-[#26344F] [html.light_&]:border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-slate-300 [html.light_&]:text-[#0A2540]">
            <div className="w-8 h-8 rounded-lg bg-[#2F7DE1]/20 flex items-center justify-center shrink-0 text-[#2F7DE1]">
              <TrendingUp size={16} />
            </div>
            <div>
              <span className="font-bold block text-white [html.light_&]:text-[#0A2540] text-sm">
                Need Specific Guidance on Your Tech Stack or Pricing?
              </span>
              <span className="text-[#8494AD] [html.light_&]:text-[#64748B]">
                We provide free 30-minute architecture reviews and clear upfront cost estimates.
              </span>
            </div>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F87000] hover:bg-[#FF8A24] text-[#0B1220] font-bold shrink-0 transition shadow-md shadow-orange-500/20"
          >
            <span>Ask an Engineer</span>
            <ArrowRight size={13} />
          </Link>
        </div>

      </div>
    </section>
  );
}
