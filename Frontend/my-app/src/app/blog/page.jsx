"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, FileText, Sparkles } from "lucide-react";
import { getPublicBlogs } from "../admin/adminData";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPublicBlogs().then(setPosts).catch(() => setPosts([]));
  }, []);

  return (
    <main className="bg-white">
      <section className="bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-white px-4 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-4 py-2 text-sm font-medium text-blue-200">
            <Sparkles className="h-4 w-4" />
            Blog
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Ideas for websites, apps, SEO, and business growth.
          </h1>
          <p className="mt-5 max-w-2xl text-blue-100">
            Read simple, useful notes from the DigitalCrowdTech team on building better digital experiences.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => {
              return (
                <article key={post.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <FileText className="h-6 w-6" />
                  </div>
                  <p className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {post.date} - {post.category}
                  </p>
                  <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
                  <p className="mt-3 text-gray-600">{post.excerpt}</p>
                  {post.content && <p className="mt-3 line-clamp-3 text-sm text-gray-500">{post.content}</p>}
                  <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
                    Discuss this topic <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
