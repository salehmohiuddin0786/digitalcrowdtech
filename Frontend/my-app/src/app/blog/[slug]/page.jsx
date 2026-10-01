import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Tag, User, Calendar, Share2 } from "lucide-react";
import { BLOG_POSTS, getBlogPostBySlug } from "../../data/blogs";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found | Digital Crowd Technologies" };
  }

  return {
    title: `${post.title} | Digital Crowd Technologies Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://digitalcrowdtech.in/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Parse simple markdown paragraphs / headings
  const renderContent = (content) => {
    const paragraphs = content.split("\n\n");
    return paragraphs.map((para, i) => {
      const trimmed = para.trim();
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={i} className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            {trimmed.replace("### ", "")}
          </h3>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={i} className="text-2xl sm:text-3xl font-extrabold text-white mt-10 mb-4">
            {trimmed.replace("## ", "")}
          </h2>
        );
      }
      if (trimmed.startsWith("- ")) {
        const items = trimmed.split("\n");
        return (
          <ul key={i} className="space-y-2 my-4 list-disc list-inside text-slate-300 text-sm sm:text-base leading-relaxed">
            {items.map((it, idx) => (
              <li key={idx}>
                {it.replace(/^- /, "")}
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={i} className="text-slate-300 text-sm sm:text-base leading-relaxed mb-5">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col">
      {/* ARTICLE HEADER */}
      <section className="relative pt-16 pb-16 md:pt-20 md:pb-24 overflow-hidden tech-grid-bg border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition"
          >
            <ArrowLeft size={14} />
            <span>Back to All Articles</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
              {post.category}
            </span>
            <span className="flex items-center gap-1 font-mono">
              <Calendar size={13} />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-mono">
              <Clock size={13} />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4.5xl font-black text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-200">Written by:</span>
            <span>{post.author}</span>
          </div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <article className="py-16 bg-[#07090E] border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 mb-10 text-sm text-slate-300 italic leading-relaxed">
            {post.excerpt}
          </div>

          <div className="prose prose-invert max-w-none">
            {renderContent(post.content)}
          </div>

          {/* AUTHOR BOX */}
          <div className="mt-14 pt-8 border-t border-white/10 p-6 rounded-2xl bg-[#090D16] border border-white/5 flex flex-col sm:flex-row items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-mono text-xl font-bold flex items-center justify-center shrink-0">
              DCT
            </div>
            <div className="text-center sm:text-left space-y-1">
              <h4 className="text-sm font-bold text-white">Digital Crowd Technologies Engineering</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                We build professional business websites, custom web applications, e-commerce platforms, and backend systems for businesses in Hyderabad and across India.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* NEXT STEP CTA */}
      <section className="py-16 bg-[#05070B] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Have Questions About Your Web Project?
          </h2>
          <p className="text-sm text-slate-400">
            Reach out to our engineering team for transparent guidance and a requirements review.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition"
            >
              <span>Start Your Project</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
