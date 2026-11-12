"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Code2,
  CheckCircle2,
  Layers,
  Database,
  Server,
  Globe,
  Sparkles,
  ShieldCheck,
  Zap,
  Search,
  Clock,
  LayoutGrid,
  TableProperties,
  X,
  ChevronRight,
  Terminal,
  Info,
} from "lucide-react";
import ProjectArchitectureDiagram from "./ProjectArchitectureDiagram";
import { hasLiveUrl } from "../data/projects";

/**
 * Cleanly format domain display text (e.g. "stareggs3.vercel.app")
 */
function cleanUrlDisplay(url) {
  if (!url) return "";
  return url.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}

/**
 * Detect whether an image is a logo/brand mark that needs full-capture contain
 * and ambient backdrop rather than raw cropping.
 */
function isLogoImage(url) {
  if (!url || typeof url !== "string") return false;
  const clean = url.toLowerCase();
  return (
    clean.includes("logo") ||
    clean.includes("brand") ||
    clean.includes("icon") ||
    clean.includes("monogram") ||
    clean.includes("ruchi-logo") ||
    clean.endsWith("/logo.png")
  );
}

function getPricingText(project) {
  if (project.isInternal) {
    return "Starting from ₹4,999";
  }
  if (
    project.id === "ruchi-bazzar" ||
    project.id === "multi-tenant-clinic-management-saas"
  ) {
    return "Starting from ₹14,999";
  }
  return "Starting from ₹9,999";
}

export default function ProjectsShowcaseView({ initialProjects = [] }) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // "all" | "live" | "ecommerce" | "saas" | "healthcare-fintech" | "edtech"
  const [viewMode, setViewMode] = useState("bento"); // "bento" | "detailed" | "table"
  const [drawerProject, setDrawerProject] = useState(null);

  // Close drawer on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") setDrawerProject(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Count metrics
  const totalCount = initialProjects.length;
  const liveCount = useMemo(
    () => initialProjects.filter((p) => hasLiveUrl(p)).length,
    [initialProjects]
  );

  // Tab categories
  const tabs = [
    { id: "all", label: "All Deliverables", count: totalCount },
    { id: "live", label: "🟢 Live Websites", count: liveCount, highlight: true },
    { id: "ecommerce", label: "E-Commerce & Food" },
    { id: "saas", label: "SaaS & Enterprise" },
    { id: "healthcare-fintech", label: "FinTech & Healthcare" },
    { id: "edtech", label: "EdTech & Public" },
  ];

  // Filtered and prioritized list
  const displayedProjects = useMemo(() => {
    // 1. Text Search Filter
    let list = initialProjects.filter((p) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      const titleMatch = (p.title || "").toLowerCase().includes(q);
      const descMatch = (p.description || "").toLowerCase().includes(q);
      const clientMatch = (p.client || "").toLowerCase().includes(q);
      const techMatch = (p.technologies || []).some((t) =>
        t.toLowerCase().includes(q)
      );
      return titleMatch || descMatch || clientMatch || techMatch;
    });

    // 2. Category Tab Filter
    if (activeTab === "live") {
      list = list.filter((p) => hasLiveUrl(p));
    } else if (activeTab === "ecommerce") {
      list = list.filter((p) =>
        /food|store|ecommerce|retail|bazaar|distribution/i.test(
          `${p.category} ${p.shortCategory} ${p.title}`
        )
      );
    } else if (activeTab === "saas") {
      list = list.filter((p) =>
        /saas|task|internal|management|erp/i.test(
          `${p.category} ${p.shortCategory} ${p.title}`
        )
      );
    } else if (activeTab === "healthcare-fintech") {
      list = list.filter((p) =>
        /clinic|health|medical|credit|banking|finance/i.test(
          `${p.category} ${p.shortCategory} ${p.title}`
        )
      );
    } else if (activeTab === "edtech") {
      list = list.filter((p) =>
        /upsc|school|learning|education|exam/i.test(
          `${p.category} ${p.shortCategory} ${p.title}`
        )
      );
    }

    // 3. PRIORITY SORT: Live Websites ALWAYS appear at the top!
    return [...list].sort((a, b) => {
      const aLive = hasLiveUrl(a) ? 0 : 1;
      const bLive = hasLiveUrl(b) ? 0 : 1;
      if (aLive !== bLive) return aLive - bLive;
      return 0;
    });
  }, [initialProjects, search, activeTab]);

  // Spotlight project (first live project if available, only when in bento mode and not searching)
  const spotlightProject = useMemo(() => {
    if (viewMode !== "bento" || search.trim() || displayedProjects.length === 0) return null;
    return displayedProjects[0];
  }, [viewMode, search, displayedProjects]);

  // Remaining bento grid projects
  const bentoGridProjects = useMemo(() => {
    if (!spotlightProject) return displayedProjects;
    return displayedProjects.slice(1);
  }, [spotlightProject, displayedProjects]);

  return (
    <div className="space-y-10">
      {/* CONTROL DECK: CATEGORY TABS + SEARCH + VIEW SWITCHER */}
      <div className="p-4 sm:p-6 rounded-3xl glass-card-premium border border-white/10 [html.light_&]:border-slate-200/90 shadow-xl space-y-4">
        
        {/* Top Controls Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400"
                      : tab.highlight
                      ? "bg-emerald-500/10 text-emerald-300 [html.light_&]:text-emerald-700 hover:bg-emerald-500/20 border border-emerald-500/30"
                      : "bg-white/5 [html.light_&]:bg-slate-100 text-slate-300 [html.light_&]:text-slate-700 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>{tab.label}</span>
                  {typeof tab.count === "number" && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-black/30 [html.light_&]:bg-white/80 text-slate-400"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Search & View Switcher */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tech, client..."
                className="w-full pl-9 pr-7 py-2 rounded-xl text-xs bg-white/5 [html.light_&]:bg-slate-50 border border-white/10 [html.light_&]:border-slate-300 text-white [html.light_&]:text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2F7DE1]"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Layout Mode Switcher */}
            <div className="flex items-center bg-black/40 [html.light_&]:bg-slate-100 p-1 rounded-xl border border-white/10 [html.light_&]:border-slate-300 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("bento")}
                title="Bento Showcase Grid"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  viewMode === "bento"
                    ? "bg-[#2F7DE1] text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <LayoutGrid size={13} />
                <span className="hidden sm:inline">Bento Grid</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("detailed")}
                title="Deep Architectural Specs"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  viewMode === "detailed"
                    ? "bg-[#2F7DE1] text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Layers size={13} />
                <span className="hidden sm:inline">Architecture</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("table")}
                title="Engineering Table View"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  viewMode === "table"
                    ? "bg-[#2F7DE1] text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <TableProperties size={13} />
                <span className="hidden sm:inline">Index</span>
              </button>
            </div>

          </div>

        </div>

        {/* Status Counter Bar */}
        <div className="pt-2 border-t border-white/5 [html.light_&]:border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-slate-300 [html.light_&]:text-slate-700">
              Showing <strong className="text-white [html.light_&]:text-slate-900">{displayedProjects.length}</strong> of {totalCount} verified deliverables
            </span>
          </div>
          <div className="text-[11px] font-mono text-emerald-400 [html.light_&]:text-emerald-700 flex items-center gap-1.5">
            <ShieldCheck size={13} />
            <span>Top Priority: Live production websites pinned with direct domain access</span>
          </div>
        </div>

      </div>

      {/* EMPTY SEARCH STATE */}
      {displayedProjects.length === 0 && (
        <div className="p-12 text-center rounded-3xl glass-card-premium border border-white/10 space-y-3">
          <Layers size={36} className="mx-auto text-slate-500" />
          <h3 className="text-lg font-bold text-white [html.light_&]:text-slate-800">
            No matching deliverables found
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query or clear filters to view all verified engineering platforms.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setActiveTab("all");
            }}
            className="mt-2 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LAYOUT 1: BENTO SHOWCASE GRID (Visual-first, Device Windows, Spotlight)    */}
      {/* ========================================================================= */}
      {viewMode === "bento" && displayedProjects.length > 0 && (
        <div className="space-y-8">
          
          {/* FLAGSHIP SPOTLIGHT HERO (Featured #1 Live Deliverable) */}
          {spotlightProject && (
            <div className="rounded-[2.25rem] glass-card-premium border border-emerald-500/30 p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-2xl bg-gradient-to-br from-[#0B1528] via-[#0B1220] to-[#070D18]">
              {/* Background ambient glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-3xl pointer-events-none -z-0" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 blur-3xl pointer-events-none -z-0" />

              {/* Top Banner Row */}
              <div className="pb-6 mb-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 relative z-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F87000]/15 border border-[#F87000]/30 text-[#F87000] flex items-center gap-1.5">
                    <Sparkles size={12} />
                    <span>Featured Production Deliverable</span>
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    {spotlightProject.shortCategory || spotlightProject.category}
                  </span>
                </div>

                {/* TOP URL ON HEADER */}
                <div>
                  {hasLiveUrl(spotlightProject) ? (
                    <a
                      href={spotlightProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 transition shadow-lg shadow-emerald-950/50 hover:scale-105 group/toplink"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-mono">
                        🌐 Live: {cleanUrlDisplay(spotlightProject.liveUrl)}
                      </span>
                      <ExternalLink
                        size={12}
                        className="group-hover/toplink:translate-x-0.5 group-hover/toplink:-translate-y-0.5 transition-transform"
                      />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30">
                      <Clock size={12} className="text-amber-400" />
                      <span>Live Site Coming Soon</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Spotlight 2-Col Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                
                {/* Left Info Column */}
                <div className="lg:col-span-7 space-y-5 text-left">
                  <div>
                    <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                      {spotlightProject.title}
                    </h2>
                    {spotlightProject.client && (
                      <p className="mt-1.5 text-xs font-mono text-slate-400">
                        Client / Ecosystem:{" "}
                        <span className="text-slate-200 font-semibold">
                          {spotlightProject.client}
                        </span>
                      </p>
                    )}
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                    {spotlightProject.description}
                  </p>

                  {/* Core Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(spotlightProject.technologies || []).slice(0, 6).map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/5 text-slate-300 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* 3 Architecture Bullet Proofs */}
                  <div className="space-y-2 pt-1 text-xs">
                    {(spotlightProject.architectureLayers || []).slice(0, 3).map((layer, lIdx) => (
                      <div
                        key={lIdx}
                        className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-2.5"
                      >
                        <Zap size={14} className="text-[#F87000] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-white block">{layer.title}</span>
                          <span className="text-slate-400 text-[11px] leading-relaxed block">{layer.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing + Actions */}
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    {hasLiveUrl(spotlightProject) ? (
                      <a
                        href={spotlightProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl transition shadow-lg shadow-emerald-950/40 hover:scale-[1.02] group/btn"
                      >
                        <Globe size={15} />
                        <span>Visit Live Website</span>
                        <ExternalLink
                          size={14}
                          className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                        />
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-amber-300/80 bg-amber-500/10 border border-amber-500/30 rounded-xl cursor-not-allowed opacity-90"
                      >
                        <Clock size={15} className="text-amber-400" />
                        <span>Coming Soon</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setDrawerProject(spotlightProject)}
                      className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-200 bg-white/10 hover:bg-white/15 rounded-xl border border-white/15 transition cursor-pointer"
                    >
                      <Terminal size={14} className="text-blue-400" />
                      <span>Inspect Full Architecture</span>
                    </button>

                    {spotlightProject.caseStudyUrl && (
                      <Link
                        href={spotlightProject.caseStudyUrl}
                        className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        <span>Case Study</span>
                        <ArrowRight size={12} />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Right Device Browser Window */}
                <div className="lg:col-span-5 w-full">
                  <div
                    onClick={() => setDrawerProject(spotlightProject)}
                    className="rounded-2xl overflow-hidden border border-white/15 bg-[#090D16] shadow-2xl group cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                  >
                    {/* Browser Mockup Header */}
                    <div className="px-4 py-2.5 bg-[#0D1525] border-b border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <div className="px-3 py-0.5 rounded-md bg-black/40 border border-white/10 text-[11px] font-mono text-slate-300 truncate max-w-[200px]">
                        {hasLiveUrl(spotlightProject)
                          ? cleanUrlDisplay(spotlightProject.liveUrl)
                          : `${spotlightProject.slug}.dct.internal`}
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">200 OK</span>
                    </div>

                    {/* Image Banner Container with Logo Ambient Backdrop */}
                    <div className="relative aspect-video bg-[#070D18] flex items-center justify-center overflow-hidden">
                      {spotlightProject.imageUrl && (
                        isLogoImage(spotlightProject.imageUrl) ? (
                          <>
                            {/* Ambient blurred backdrop that 100% covers container */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={spotlightProject.imageUrl}
                              alt=""
                              aria-hidden="true"
                              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 filter pointer-events-none"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#0B1220]/90 pointer-events-none" />
                            {/* Foreground Logo: 100% captured without edge cropping */}
                            <div className="relative z-10 w-full h-full flex items-center justify-center p-6 sm:p-8">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={spotlightProject.imageUrl}
                                alt={spotlightProject.title}
                                className="max-h-[80%] max-w-[85%] w-auto h-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={spotlightProject.imageUrl}
                              alt={spotlightProject.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-black/30 to-transparent pointer-events-none" />
                          </>
                        )
                      )}

                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none" />
                      
                      <div className="absolute bottom-3 right-3 z-20">
                        <span className="text-[10px] font-mono text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15 flex items-center gap-1 group-hover:border-blue-400 transition-colors">
                          <Terminal size={11} className="text-blue-400" />
                          <span>Click to Inspect Specs</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* BENTO CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {bentoGridProjects.map((project) => {
              const isLive = hasLiveUrl(project);

              return (
                <div
                  key={project.id || project.slug}
                  className={`rounded-2xl glass-card-premium border p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden group ${
                    isLive
                      ? "border-emerald-500/25 hover:border-emerald-500/50 shadow-[0_10px_30px_rgba(16,185,129,0.06)]"
                      : "border-white/10 [html.light_&]:border-slate-200/90 hover:border-blue-500/40"
                  }`}
                >
                  {/* Subtle top corner ambient glow for live sites */}
                  {isLive && (
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                  )}

                  {/* Top Header Bar inside card */}
                  <div className="pb-3.5 mb-3 border-b border-white/10 [html.light_&]:border-slate-200/80 flex items-center justify-between gap-2 relative z-10">
                    {/* Browser Dots */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-red-500/70" />
                      <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                    </div>

                    {/* TOP URL ON HEADER */}
                    <div className="truncate text-right">
                      {isLive ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/35 transition truncate max-w-[210px]"
                          title={`Visit live website: ${project.liveUrl}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                          <span className="font-mono truncate">
                            {cleanUrlDisplay(project.liveUrl)}
                          </span>
                          <ExternalLink size={10} className="shrink-0" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold text-amber-300/90 bg-amber-500/10 border border-amber-500/25">
                          <Clock size={10} className="text-amber-400" />
                          <span>Coming Soon</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Media Preview Container */}
                  <div
                    onClick={() => setDrawerProject(project)}
                    className="rounded-xl overflow-hidden border border-white/10 [html.light_&]:border-slate-200 aspect-[16/10] bg-[#070D18] relative flex items-center justify-center cursor-pointer mb-4"
                  >
                    {project.imageUrl && (
                      isLogoImage(project.imageUrl) ? (
                        <>
                          {/* Ambient blurred backdrop covers container */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={project.imageUrl}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-125 filter pointer-events-none"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#0B1220]/90 pointer-events-none" />

                          {/* Foreground Logo: 100% captured */}
                          <div className="relative z-10 w-full h-full flex items-center justify-center p-5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="max-h-[82%] max-w-[85%] w-auto h-auto object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-black/30 to-transparent pointer-events-none" />
                        </>
                      )
                    )}

                    {/* Bottom Category Overlay */}
                    <div className="absolute bottom-2.5 left-2.5 z-20">
                      <span className="font-mono text-white text-[10px] bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-white/15">
                        {project.shortCategory || project.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-2.5 flex-1">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white [html.light_&]:text-slate-900 tracking-tight leading-snug group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      {project.client && (
                        <p className="text-[11px] font-mono text-slate-400 truncate">
                          {project.client}
                        </p>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 [html.light_&]:text-slate-600 line-clamp-2 leading-relaxed">
                      {project.summary || project.description}
                    </p>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {(project.technologies || []).slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 [html.light_&]:bg-slate-100 text-slate-300 [html.light_&]:text-slate-700 border border-white/10 [html.light_&]:border-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="pt-4 mt-4 border-t border-white/10 [html.light_&]:border-slate-200/80 space-y-2.5">
                    
                    {/* Rate line */}
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Engineering:</span>
                      <span className="font-mono font-bold text-[#F87000]">
                        {getPricingText(project)}
                      </span>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="flex items-center gap-2">
                      {isLive ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl transition shadow-md shadow-emerald-950/40 text-center"
                        >
                          <Globe size={13} />
                          <span>Visit Live Website</span>
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-amber-300/80 bg-amber-500/10 border border-amber-500/25 rounded-xl cursor-not-allowed opacity-90"
                        >
                          <Clock size={13} className="text-amber-400" />
                          <span>Coming Soon</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setDrawerProject(project)}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
                        title="Inspect Architecture Specs"
                      >
                        <Terminal size={14} />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* LAYOUT 2: DETAILED ARCHITECTURE VIEW (2-Column Deep Specification Cards)  */}
      {/* ========================================================================= */}
      {viewMode === "detailed" && displayedProjects.length > 0 && (
        <div className="space-y-12">
          {displayedProjects.map((project) => {
            const isLive = hasLiveUrl(project);
            const hasDiagram =
              project.id === "ruchi-bazzar" ||
              project.id === "school-management-system";

            return (
              <div
                key={project.id || project.slug}
                className={`rounded-[2.25rem] glass-card-premium p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden transition-all duration-300 border ${
                  isLive
                    ? "border-emerald-500/30 hover:border-emerald-500/60 shadow-[0_20px_50px_rgba(16,185,129,0.08)]"
                    : "border-white/10 [html.light_&]:border-slate-200/90 hover:border-blue-500/40"
                }`}
              >
                {/* Glow accent */}
                {isLive && (
                  <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-emerald-500/10 to-transparent blur-3xl pointer-events-none -z-0" />
                )}

                {/* TOP HEADER ROW: Badges + Live URL / Coming Soon on Top */}
                <div className="pb-6 mb-6 border-b border-white/10 [html.light_&]:border-slate-200/80 flex flex-wrap items-center justify-between gap-3 relative z-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400">
                      {project.shortCategory || project.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Verified Architecture
                    </span>
                  </div>

                  {/* Right: TOP URL LINK OR Coming Soon Badge */}
                  <div>
                    {isLive ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/35 transition shadow-sm hover:scale-105 group/toplink"
                        title={`Visit live website: ${project.liveUrl}`}
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-mono font-bold tracking-tight">
                          🌐 Live: {cleanUrlDisplay(project.liveUrl)}
                        </span>
                        <ExternalLink
                          size={13}
                          className="group-hover/toplink:translate-x-0.5 group-hover/toplink:-translate-y-0.5 transition-transform"
                        />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-amber-300/90 bg-amber-500/10 border border-amber-500/25">
                        <Clock size={12} className="text-amber-400" />
                        <span>Live Site Coming Soon</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* 2-Column Main Content Body */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
                  {/* Left Column: Project Info */}
                  <div className="lg:col-span-6 space-y-5">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-white [html.light_&]:text-[#0A2540] tracking-tight">
                        {project.title}
                      </h2>
                      {project.client && (
                        <p className="mt-1 text-xs font-mono text-slate-400">
                          Client / Ecosystem:{" "}
                          <span className="text-slate-200 font-semibold">
                            {project.client}
                          </span>
                        </p>
                      )}
                    </div>

                    <p className="text-sm sm:text-base text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Core Technologies */}
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                        Core Technologies Used:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {(project.technologies || []).map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/5 text-slate-300 border border-white/10"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Verified Capabilities Checklist */}
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                        Verified Capabilities:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                        {(project.features || []).slice(0, 6).map((f, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2
                              size={14}
                              className="text-emerald-400 shrink-0 mt-0.5"
                            />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing Callout */}
                    <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[#F87000]">Transparent Pricing:</span>
                        <span className="font-mono font-bold text-white">
                          {getPricingText(project)}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Custom full-stack web applications with dedicated APIs, database schema, and admin console.
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      {project.caseStudyUrl && (
                        <Link
                          href={project.caseStudyUrl}
                          className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/20 transition"
                        >
                          <span>View Full Case Study</span>
                          <ArrowRight size={15} />
                        </Link>
                      )}

                      {isLive ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl transition shadow-lg shadow-emerald-950/40 hover:scale-[1.02] group/btn"
                        >
                          <Globe size={15} />
                          <span>Visit Live Website</span>
                          <ExternalLink
                            size={15}
                            className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                          />
                        </a>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-amber-300/80 bg-amber-500/10 border border-amber-500/25 rounded-xl cursor-not-allowed opacity-90"
                        >
                          <Clock size={15} className="text-amber-400" />
                          <span>Coming Soon</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Visual Architecture */}
                  <div className="lg:col-span-6 w-full">
                    {hasDiagram ? (
                      <ProjectArchitectureDiagram projectId={project.id} />
                    ) : (
                      <div className="rounded-2xl glass-card-premium p-6 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                            </span>
                            <span className="font-mono text-slate-400">
                              {project.slug} :: technical architecture
                            </span>
                          </div>
                          <span className="text-[11px] font-semibold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10">
                            {isLive ? "Live in Production" : "100% In-House"}
                          </span>
                        </div>

                        {/* Project Image Banner */}
                        {project.imageUrl && (
                          <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-video group bg-[#070D18] flex items-center justify-center">
                            {isLogoImage(project.imageUrl) ? (
                              <>
                                {/* Ambient blurred backdrop */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={project.imageUrl}
                                  alt=""
                                  aria-hidden="true"
                                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-125 filter pointer-events-none"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#0B1220]/90 pointer-events-none" />

                                {/* Foreground Logo: 100% captured */}
                                <div className="relative z-10 w-full h-full flex items-center justify-center p-6 sm:p-8">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="max-h-[82%] max-w-[85%] w-auto h-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={project.imageUrl}
                                  alt={project.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-black/30 to-transparent pointer-events-none" />
                              </>
                            )}

                            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs z-20 pointer-events-auto">
                              <span className="font-mono text-white text-[11px] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15">
                                {project.shortCategory || project.category}
                              </span>
                              {isLive && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 px-2.5 py-1 rounded-md flex items-center gap-1 hover:text-white"
                                >
                                  <span>{cleanUrlDisplay(project.liveUrl)}</span>
                                  <ExternalLink size={11} />
                                </a>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Architecture Layers Breakdown */}
                        <div className="space-y-2.5 text-xs">
                          {project.architectureLayers && project.architectureLayers.length > 0 ? (
                            project.architectureLayers.map((layer, lIdx) => (
                              <div
                                key={lIdx}
                                className="p-3 rounded-xl bg-white/[0.02] border border-white/5"
                              >
                                <span className="font-semibold text-white block mb-0.5">
                                  {layer.title}
                                </span>
                                <span className="text-[11px] text-slate-400 leading-relaxed block">
                                  {layer.desc}
                                </span>
                              </div>
                            ))
                          ) : (
                            (project.highlights || []).map((highlight, hIdx) => (
                              <div
                                key={hIdx}
                                className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                                <span className="text-[12px] text-slate-300 leading-relaxed">
                                  {highlight}
                                </span>
                              </div>
                            ))
                          )}
                        </div>

                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* LAYOUT 3: ENGINEERING INDEX (Developer Scannable Table Mode)              */}
      {/* ========================================================================= */}
      {viewMode === "table" && displayedProjects.length > 0 && (
        <div className="rounded-3xl glass-card-premium border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#080D1A] text-slate-400 uppercase tracking-wider text-[11px] border-b border-white/10 font-mono">
                <tr>
                  <th className="py-4 px-5">Deliverable</th>
                  <th className="py-4 px-5">Sector / Client</th>
                  <th className="py-4 px-5">Tech Stack</th>
                  <th className="py-4 px-5">Pricing Starting</th>
                  <th className="py-4 px-5">Production Status &amp; Live URL</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {displayedProjects.map((project) => {
                  const isLive = hasLiveUrl(project);

                  return (
                    <tr
                      key={project.id || project.slug}
                      className="hover:bg-white/[0.03] transition-colors"
                    >
                      {/* Title + Logo Thumb */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#070D18] border border-white/10 overflow-hidden shrink-0 flex items-center justify-center p-1">
                            {project.imageUrl && (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="max-h-full max-w-full object-contain"
                              />
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-white text-sm block">
                              {project.title}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              {project.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Client / Sector */}
                      <td className="py-4 px-5 text-slate-300">
                        <span className="block font-medium">{project.shortCategory || project.category}</span>
                        <span className="text-[11px] text-slate-400 font-mono block">
                          {project.client}
                        </span>
                      </td>

                      {/* Tech Chips */}
                      <td className="py-4 px-5">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {(project.technologies || []).slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 text-slate-300 border border-white/10"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Pricing */}
                      <td className="py-4 px-5 font-mono font-bold text-[#F87000]">
                        {getPricingText(project)}
                      </td>

                      {/* Status + Live URL */}
                      <td className="py-4 px-5">
                        {isLive ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/35 transition"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>{cleanUrlDisplay(project.liveUrl)}</span>
                            <ExternalLink size={11} />
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium text-amber-300/80 bg-amber-500/10 border border-amber-500/20">
                            <Clock size={11} className="text-amber-400" />
                            <span>Coming Soon</span>
                          </span>
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-5 text-right space-x-2 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setDrawerProject(project)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition cursor-pointer"
                        >
                          Specs
                        </button>
                        {isLive && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition inline-flex items-center gap-1"
                          >
                            <span>Live</span>
                            <ExternalLink size={11} />
                          </a>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SLIDE-OVER TECHNICAL SPECIFICATIONS DRAWER                                */}
      {/* ========================================================================= */}
      {drawerProject && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            onClick={() => setDrawerProject(null)}
            className="absolute inset-0 cursor-pointer"
            aria-label="Close modal overlay"
          />

          <div className="relative w-full max-w-2xl bg-[#0B1220] border-l border-white/15 h-full overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl z-10 text-left">
            
            {/* Drawer Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono font-semibold text-[#F87000] uppercase tracking-wider block mb-1">
                  {drawerProject.shortCategory || drawerProject.category}
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  {drawerProject.title}
                </h3>
                {drawerProject.client && (
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    Client: <strong className="text-slate-200">{drawerProject.client}</strong>
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setDrawerProject(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Live URL Pill or Coming Soon */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs">
              <span className="text-slate-400 font-mono">Production Status:</span>
              {hasLiveUrl(drawerProject) ? (
                <a
                  href={drawerProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{cleanUrlDisplay(drawerProject.liveUrl)}</span>
                  <ExternalLink size={12} />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-amber-300/80 bg-amber-500/10 border border-amber-500/20">
                  <Clock size={12} className="text-amber-400" />
                  <span>Coming Soon</span>
                </span>
              )}
            </div>

            {/* Architecture Diagram or Layers */}
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                System Architecture:
              </span>
              {drawerProject.id === "ruchi-bazzar" ||
              drawerProject.id === "school-management-system" ? (
                <ProjectArchitectureDiagram projectId={drawerProject.id} />
              ) : (
                <div className="space-y-3">
                  {(drawerProject.architectureLayers || []).map((layer, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1"
                    >
                      <span className="text-xs font-bold text-white block">
                        {layer.title}
                      </span>
                      <span className="text-xs text-slate-400 leading-relaxed block">
                        {layer.desc}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Core Tech Stack */}
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Technologies &amp; Libraries:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(drawerProject.technologies || []).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/5 text-slate-300 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Capabilities */}
            {drawerProject.features && drawerProject.features.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Verified Features &amp; Modules:
                </span>
                <div className="space-y-1.5 text-xs text-slate-300">
                  {drawerProject.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Challenges & Solutions */}
            {drawerProject.challenges && drawerProject.challenges.length > 0 && (
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-2 text-xs">
                <span className="font-bold text-[#F87000] block">Engineering Challenge &amp; Solution:</span>
                {drawerProject.challenges.map((c, i) => (
                  <div key={i} className="space-y-1 text-slate-300">
                    <p><strong className="text-white">Challenge:</strong> {c.challenge}</p>
                    <p><strong className="text-emerald-400">Solution:</strong> {c.solution}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Transparent Rate & Handover */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block">Transparent Starting Price:</span>
                <span className="font-mono font-bold text-white text-sm">
                  {getPricingText(drawerProject)}
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                100% Code Handover
              </span>
            </div>

            {/* Action Buttons in Drawer */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {hasLiveUrl(drawerProject) && (
                <a
                  href={drawerProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl hover:from-emerald-500 hover:to-teal-500 transition text-center shadow-lg shadow-emerald-950/40"
                >
                  <Globe size={15} />
                  <span>Open Live Website</span>
                  <ExternalLink size={14} />
                </a>
              )}

              {drawerProject.caseStudyUrl && (
                <Link
                  href={drawerProject.caseStudyUrl}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition"
                >
                  <span>Case Study</span>
                  <ArrowRight size={14} />
                </Link>
              )}

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-200 bg-white/10 hover:bg-white/15 rounded-xl border border-white/10 transition"
              >
                <span>Discuss Similar Project</span>
              </Link>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
