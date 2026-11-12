"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Zap,
  Lightbulb,
  Pencil,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Search,
  Filter,
} from "lucide-react";
import { FAQS } from "../data/faqs";

const SUPPORT_AVATARS = [
  {
    name: "Engineering Lead",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
    fallback: "/avatars/avatar-1.svg",
  },
  {
    name: "Full-Stack Dev",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
    fallback: "/avatars/avatar-2.svg",
  },
  {
    name: "UI/UX Designer",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces",
    fallback: "/avatars/avatar-3.svg",
  },
  {
    name: "Backend Architect",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
    fallback: "/avatars/avatar-4.svg",
  },
  {
    name: "Project Consultant",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=faces",
    fallback: "/avatars/avatar-5.svg",
  },
];

export default function FaqPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Pricing", "Capabilities", "Services", "Process", "Ownership", "Support"];

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((f) => {
      const matchCategory = selectedCategory === "All" || f.category === selectedCategory;
      const matchSearch =
        searchQuery === "" ||
        f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const renderIconBadge = (idx) => {
    const mod = idx % 3;
    if (mod === 0) {
      return (
        <div
          className="w-10 h-10 rounded-full bg-[#F87000]/10 [html.light_&]:bg-orange-50 border border-[#F87000]/25 [html.light_&]:border-orange-200 text-[#F87000] [html.light_&]:text-orange-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0"
          aria-hidden="true"
        >
          <Zap size={18} strokeWidth={2.2} />
        </div>
      );
    }
    if (mod === 1) {
      return (
        <div
          className="w-10 h-10 rounded-full bg-[#2F7DE1]/10 [html.light_&]:bg-blue-50 border border-[#2F7DE1]/25 [html.light_&]:border-blue-200 text-[#2F7DE1] [html.light_&]:text-blue-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0"
          aria-hidden="true"
        >
          <Lightbulb size={18} strokeWidth={2.2} />
        </div>
      );
    }
    return (
      <div
        className="w-10 h-10 rounded-full bg-emerald-500/10 [html.light_&]:bg-emerald-50 border border-emerald-500/25 [html.light_&]:border-emerald-200 text-emerald-400 [html.light_&]:text-emerald-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0"
        aria-hidden="true"
      >
        <Pencil size={18} strokeWidth={2.2} />
      </div>
    );
  };

  const handleLiveChatClick = () => {
    if (typeof window !== "undefined" && window.Tawk_API && typeof window.Tawk_API.maximize === "function") {
      window.Tawk_API.maximize();
    } else {
      window.location.href = "/contact";
    }
  };

  // Generate FAQ JSON-LD schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <div className="flex flex-col bg-transparent">
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Main Container Section with atmospheric glows */}
      <section className="relative py-14 sm:py-20 md:py-24 overflow-hidden bg-transparent">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 -left-20 w-[550px] h-[400px] bg-gradient-to-tr from-[#2F7DE1]/15 to-[#1E40AF]/10 blur-[140px] pointer-events-none -z-10 rounded-full" />
        <div className="absolute bottom-10 -right-20 w-[500px] h-[350px] bg-gradient-to-tl from-[#F87000]/10 to-[#2F7DE1]/10 blur-[130px] pointer-events-none -z-10 rounded-full" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Main Elevated Card Container */}
          <div className="rounded-[2.25rem] sm:rounded-[2.75rem] lg:rounded-[3rem] bg-[#0B1220]/95 [html.light_&]:bg-white border border-white/10 [html.light_&]:border-slate-200/90 shadow-[0_25px_70px_rgba(0,0,0,0.65)] [html.light_&]:shadow-[0_25px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl p-7 sm:p-12 lg:p-16 transition-all duration-300">
            
            {/* Header (Exact Match to Mockup) */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
              <div className="max-w-2xl">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white [html.light_&]:text-slate-900 tracking-tight leading-tight">
                  Frequently Asked Questions
                </h1>
                <p className="mt-2 text-sm sm:text-base text-slate-400 [html.light_&]:text-slate-500 font-normal leading-relaxed">
                  Here are the most asked questions based from our users.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-[#070D18] [html.light_&]:bg-slate-50 border border-white/10 [html.light_&]:border-slate-200 text-white [html.light_&]:text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2F7DE1] transition"
                />
              </div>
            </div>

            {/* Filter Pills */}
            <div className="mt-8 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline-block">
                Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#2F7DE1] text-white shadow-xs"
                      : "bg-white/5 [html.light_&]:bg-slate-100 text-slate-400 [html.light_&]:text-slate-600 hover:text-white [html.light_&]:hover:text-slate-900 border border-white/5 [html.light_&]:border-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 3-Column FAQ Grid */}
            {filteredFaqs.length === 0 ? (
              <div className="py-16 text-center text-slate-400 text-sm">
                No questions found matching &quot;{searchQuery}&quot;. Try another term.
              </div>
            ) : (
              <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-10 sm:gap-y-12">
                {filteredFaqs.map((item, idx) => (
                  <div key={item.id} className="space-y-3 flex flex-col justify-start group">
                    {/* Circular Icon Badge */}
                    {renderIconBadge(idx)}

                    {/* Question */}
                    <h2 className="text-base font-bold text-white [html.light_&]:text-slate-900 leading-snug tracking-tight">
                      {item.question}
                    </h2>

                    {/* Answer */}
                    <p className="text-xs sm:text-sm text-slate-400 [html.light_&]:text-slate-600 leading-relaxed font-normal">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Support Live Chat Card */}
            <div className="mt-14 sm:mt-16 rounded-2xl sm:rounded-3xl bg-[#070D18]/90 [html.light_&]:bg-[#F8FAFC] border border-white/10 [html.light_&]:border-slate-200/80 p-7 sm:p-10 text-center relative overflow-hidden transition-all duration-200">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-32 bg-[#2F7DE1]/5 blur-2xl pointer-events-none rounded-full" />

              {/* Overlapping Avatar Stack */}
              <div className="flex items-center justify-center -space-x-2.5 mb-4 relative z-10">
                {SUPPORT_AVATARS.map((av, idx) => (
                  <div
                    key={idx}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full ring-2 ring-[#0B1220] [html.light_&]:ring-white overflow-hidden shadow-xs bg-slate-800 [html.light_&]:bg-slate-200 shrink-0 transition-transform hover:scale-110 hover:z-20 duration-150"
                    title={av.name}
                  >
                    <img
                      src={av.src}
                      alt={av.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = av.fallback;
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-white [html.light_&]:text-slate-900 tracking-tight relative z-10">
                Join Our Support Live Chat
              </h3>

              {/* Subtext */}
              <p className="mt-1.5 text-xs sm:text-sm text-slate-400 [html.light_&]:text-slate-600 max-w-md mx-auto relative z-10 leading-relaxed">
                If you still have other questions, why not join our live chat channel?
              </p>

              {/* Action Button */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 relative z-10">
                <button
                  type="button"
                  onClick={handleLiveChatClick}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#2F7DE1] hover:bg-blue-600 shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>Get In Touch</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
