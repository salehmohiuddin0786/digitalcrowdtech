import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Tag, User, Sparkles } from "lucide-react";
import SectionHeading from "../Component/SectionHeading";
import { HaikeiMeshGlow } from "../Component/HaikeiDecorations";
import { BLOG_POSTS } from "../data/blogs";

export const metadata = {
  title: "Engineering & Technology Blog | Digital Crowd Technologies",
  description:
    "Practical web development insights, software costs in India, architecture comparisons, and digital guidance for modern businesses.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/blog",
  },
};

export default function BlogHubPage() {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-[#26344F]/60 [html.light_&]:border-slate-200">
        <HaikeiMeshGlow />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#2F7DE1]/10 border border-[#2F7DE1]/30 text-[#2F7DE1] mb-6">
            <Sparkles size={13} />
            <span>Insights & Engineering Guides</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white [html.light_&]:text-[#0A2540] tracking-tight leading-tight">
            Digital Crowd Technologies{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F7DE1] to-[#F87000]">
              Blog
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#C5CEDD] [html.light_&]:text-[#40484C] leading-relaxed">
            Practical articles on software costs, full-stack architecture, e-commerce transition, and choosing development partners in India.
          </p>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="py-20 bg-[#0B1220] [html.light_&]:bg-white border-b border-[#26344F]/60 [html.light_&]:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.id}
                className="bg-[#16223A] [html.light_&]:bg-[#F4F7FB] border border-[#26344F] [html.light_&]:border-slate-200 rounded-2xl p-7 flex flex-col justify-between shadow-xl hover:border-[#2F7DE1]/40 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8494AD] [html.light_&]:text-[#64748B] mb-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#2F7DE1]/10 text-[#2F7DE1] border border-[#2F7DE1]/25 font-semibold">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-white [html.light_&]:text-[#0A2540] group-hover:text-[#2F7DE1] transition-colors mb-3 leading-snug">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-[#8494AD] [html.light_&]:text-[#64748B] leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#26344F]/60 [html.light_&]:border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-[#8494AD] [html.light_&]:text-[#64748B] font-mono">{post.date}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 font-bold text-[#F87000] group-hover:text-[#FF8A24] transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
