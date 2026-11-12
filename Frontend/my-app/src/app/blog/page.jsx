import React from "react";
import Link from "next/link";
import { Sparkles, BookOpen } from "lucide-react";
import { HaikeiMeshGlow } from "../Component/HaikeiDecorations";
import { fetchLiveBlogs } from "../data/blogs";
import BlogListFeed from "./BlogListFeed";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Engineering & Technology Blog | Digital Crowd Technologies",
  description:
    "Practical web development insights, software costs in India, architecture comparisons, and digital guidance for modern businesses.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/blog",
  },
};

export default async function BlogHubPage() {
  const initialBlogs = await fetchLiveBlogs();

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

      {/* ARTICLES FEED */}
      <section className="py-16 md:py-20 bg-[#0B1220] [html.light_&]:bg-white border-b border-[#26344F]/60 [html.light_&]:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogListFeed initialBlogs={initialBlogs} />
        </div>
      </section>
    </div>
  );
}
