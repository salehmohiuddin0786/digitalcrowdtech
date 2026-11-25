import React from "react";
import Link from "next/link";
import {
  Compass,
  Layers,
  Globe,
  FileText,
  Shield,
  MapPin,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  FolderTree,
  Sparkles,
  ShoppingBag,
  Code2,
  Database,
  Server,
  BookOpen,
  Briefcase,
  HelpCircle,
  Clock,
  Phone,
} from "lucide-react";
import SectionHeading from "../Component/SectionHeading";
import { SERVICES } from "../data/services";
import { PROJECTS } from "../data/projects";
import { PRODUCTS } from "../data/products";
import { BLOG_POSTS } from "../data/blogs";
import { COMPANY } from "../data/company";

export const metadata = {
  title: "HTML Sitemap | Digital Crowd Technologies",
  description:
    "Complete directory of all pages, turnkey digital products, engineering services, case studies, technical articles, and regional Hyderabad hubs on Digital Crowd Technologies.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/sitemap",
  },
};

export default function SitemapPage() {
  const corePages = [
    {
      title: "Homepage",
      href: "/",
      description: "Overview of services, verified portfolio, process, starting prices, and engineering standards.",
      badge: "Main",
    },
    {
      title: "About Us",
      href: "/about",
      description: "Our agency story, philosophy of transparency, leadership team, and engineering vision.",
      badge: "Company",
    },
    {
      title: "Engineering Portfolio",
      href: "/portfolio",
      description: "Interactive showcase of production systems, architecture diagrams, and tech stack details.",
      badge: "Showcase",
    },
    {
      title: "Verified Projects",
      href: "/projects",
      description: "Comprehensive case studies of real web applications engineered and deployed for clients.",
      badge: "Work",
    },
    {
      title: "Turnkey Digital Products",
      href: "/products",
      description: "Ready-to-deploy platforms including food delivery suites, school ERPs, and e-commerce stores.",
      badge: "Turnkey",
    },
    {
      title: "Pricing & Starting Estimates",
      href: "/pricing",
      description: "Transparent starting prices from ₹4,999 for websites and ₹9,999 for custom software.",
      badge: "Pricing",
    },
    {
      title: "7-Step Development Process",
      href: "/process",
      description: "Discovery, architecture, UI/UX, development, database integration, QA testing, and deployment.",
      badge: "Workflow",
    },
    {
      title: "Engineering & Tech Blog",
      href: "/blog",
      description: "Realistic guides on website costs in India, custom web apps, and technical architecture.",
      badge: "Articles",
    },
    {
      title: "Careers & Team Culture",
      href: "/careers",
      description: "Job openings and career opportunities for passionate full-stack developers in Hyderabad.",
      badge: "Hiring",
    },
    {
      title: "Frequently Asked Questions",
      href: "/faq",
      description: "Clear answers regarding pricing, backend stacks, hosting ownership, and development timelines.",
      badge: "Help",
    },
    {
      title: "Contact & Discovery Call",
      href: "/contact",
      description: "Connect with our engineering team in Madhapur, Hyderabad or submit a project proposal.",
      badge: "Contact",
    },
  ];

  const regionalPages = [
    {
      title: "Web Development Company in Hyderabad",
      href: "/web-development-company-hyderabad",
      description: "Leading web development and digital solutions agency located in the Madhapur tech corridor.",
    },
    {
      title: "E-commerce Development in Hyderabad",
      href: "/ecommerce-development-hyderabad",
      description: "Full-stack e-commerce stores, catalog management, shopping cart engines, and UPI payment gateways.",
    },
    {
      title: "Custom Software Development in Hyderabad",
      href: "/custom-software-development-hyderabad",
      description: "Tailored web applications, internal enterprise tools, ERP portals, and high-load MySQL databases.",
    },
  ];

  const legalPages = [
    {
      title: "Privacy Policy",
      href: "/privacy-policy",
      description: "How we securely handle client inquiries, business contact details, and visitor data.",
    },
    {
      title: "Terms & Conditions",
      href: "/terms-and-conditions",
      description: "Development terms, milestone roadmaps, intellectual property ownership, and client agreements.",
    },
    {
      title: "Refund Policy",
      href: "/refund-policy",
      description: "Transparent refund terms structured around milestone deliverables and 5-7 business days original payment mode crediting.",
    },
    {
      title: "Cancellation Policy",
      href: "/cancellation-policy",
      description: "Service contract cancellation windows, pre-kickoff notice procedures, and milestone reconciliation terms.",
    },
    {
      title: "Shipping & Delivery Policy",
      href: "/shipping-policy",
      description: "Electronic delivery of digital services, cloud server deployments, staging URLs, and zero shipping charges.",
    },
    {
      title: "Cookie Policy",
      href: "/cookie-policy",
      description: "Details on essential session cookies, theme preferences, and visitor analytics.",
    },
    {
      title: "XML Machine Sitemap",
      href: "/sitemap.xml",
      description: "Auto-generated XML sitemap protocol for Googlebot, Bingbot, and search engine crawlers.",
      isExternal: true,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative pt-14 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-[#26344F]/60 [html.light_&]:border-slate-200">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#2F7DE1]/15 to-[#F87000]/10 blur-[130px] pointer-events-none -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6 backdrop-blur-md">
            <FolderTree size={14} className="text-[#F87000]" />
            <span>Site Navigation &amp; Index</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white [html.light_&]:text-[#0A2540] tracking-tight leading-tight">
            Complete <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F7DE1] to-[#F87000]">
              Website Sitemap
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
            Explore every corner of Digital Crowd Technologies. Browse our core agency pages, turnkey digital products, engineering services, technical case studies, and localized resources.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 [html.light_&]:bg-slate-100 [html.light_&]:hover:bg-slate-200 border border-white/10 [html.light_&]:border-slate-300 text-slate-300 [html.light_&]:text-slate-700 transition font-mono"
            >
              <span>View XML Sitemap (/sitemap.xml)</span>
              <ExternalLink size={12} />
            </a>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
              <CheckCircle2 size={13} />
              100% Crawlable &amp; Indexed
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold">
              <Shield size={13} />
              Strict Security &amp; Isolation Enforced
            </span>
          </div>
        </div>
      </section>

      {/* 2. SITEMAP SECTIONS CONTAINER */}
      <section className="py-16 md:py-24 bg-transparent border-b border-white/5 [html.light_&]:border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* SECTION A: CORE COMPANY PAGES */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-white/10 [html.light_&]:border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-[#2F7DE1] flex items-center justify-center font-bold">
                <Globe size={18} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white [html.light_&]:text-[#0A2540]">
                  Core Pages &amp; Agency Navigation
                </h2>
                <p className="text-xs text-slate-400 [html.light_&]:text-slate-500">
                  Primary pages explaining our team, pricing models, verified portfolio, and contact channels.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {corePages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="p-5 rounded-2xl glass-card-premium hover:border-[#2F7DE1]/40 transition group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-white/5 text-blue-400 border border-white/5">
                        {page.badge}
                      </span>
                      <ArrowRight size={13} className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-base font-bold text-white [html.light_&]:text-[#0A2540] group-hover:text-[#2F7DE1] transition-colors mb-1.5">
                      {page.title}
                    </h3>
                    <p className="text-xs text-slate-400 [html.light_&]:text-slate-600 leading-relaxed">
                      {page.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center text-[11px] font-mono text-slate-500 group-hover:text-slate-400">
                    <span>{page.href}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* SECTION B: TURNKEY DIGITAL PRODUCTS */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-white/10 [html.light_&]:border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-[#F87000] flex items-center justify-center font-bold">
                <ShoppingBag size={18} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white [html.light_&]:text-[#0A2540]">
                  Turnkey Digital Products &amp; SaaS Systems
                </h2>
                <p className="text-xs text-slate-400 [html.light_&]:text-slate-500">
                  Ready-to-deploy platforms with dedicated databases, customer apps, and zero recurring commissions.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className="p-5 rounded-2xl glass-card-premium hover:border-[#F87000]/40 transition group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-orange-500/10 text-[#F87000] border border-orange-500/20">
                        {prod.category}
                      </span>
                      {prod.liveUrl && (
                        <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Live Demo
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white [html.light_&]:text-[#0A2540] group-hover:text-[#F87000] transition-colors mb-1.5">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-slate-400 [html.light_&]:text-slate-600 leading-relaxed mb-3">
                      {prod.summary || prod.description}
                    </p>
                    <div className="text-xs font-bold text-[#F87000]">
                      {prod.price}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <Link
                      href={`/products/${prod.slug}`}
                      className="inline-flex items-center gap-1 font-semibold text-blue-400 hover:text-blue-300"
                    >
                      <span>Explore Product</span>
                      <ArrowRight size={12} />
                    </Link>
                    {prod.caseStudyUrl && (
                      <Link
                        href={prod.caseStudyUrl}
                        className="text-slate-400 hover:text-white text-[11px]"
                      >
                        Case Study →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION C: WEB & SOFTWARE DEVELOPMENT SERVICES */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-white/10 [html.light_&]:border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                <Code2 size={18} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white [html.light_&]:text-[#0A2540]">
                  Engineering &amp; Development Services
                </h2>
                <p className="text-xs text-slate-400 [html.light_&]:text-slate-500">
                  Full-stack engineering capabilities from business landing pages to multi-portal enterprise software.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map((serv) => (
                <Link
                  key={serv.id}
                  href={`/services/${serv.slug}`}
                  className="p-5 rounded-2xl glass-card-premium hover:border-[#2F7DE1]/40 transition group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {serv.startingPrice || "Custom Quote"}
                      </span>
                      <ArrowRight size={13} className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-base font-bold text-white [html.light_&]:text-[#0A2540] group-hover:text-blue-400 transition-colors mb-1.5">
                      {serv.title}
                    </h3>
                    <p className="text-xs text-slate-400 [html.light_&]:text-slate-600 leading-relaxed">
                      {serv.summary}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>/services/{serv.slug}</span>
                    <span className="text-blue-400 font-semibold group-hover:underline">View Service →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* SECTION D: REGIONAL & HYDERABAD LOCATION HUBS */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-white/10 [html.light_&]:border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
                <MapPin size={18} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white [html.light_&]:text-[#0A2540]">
                  Hyderabad &amp; Regional Landing Pages
                </h2>
                <p className="text-xs text-slate-400 [html.light_&]:text-slate-500">
                  Dedicated local hubs serving clients in Madhapur, Hitec City, Gachibowli, Hyderabad, and Pan-India.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {regionalPages.map((reg) => (
                <Link
                  key={reg.href}
                  href={reg.href}
                  className="p-5 rounded-2xl glass-card-premium hover:border-indigo-500/40 transition group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold text-indigo-400 flex items-center gap-1">
                        <MapPin size={12} />
                        Madhapur, Hyderabad
                      </span>
                      <ArrowRight size={13} className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-base font-bold text-white [html.light_&]:text-[#0A2540] group-hover:text-indigo-400 transition-colors mb-1.5">
                      {reg.title}
                    </h3>
                    <p className="text-xs text-slate-400 [html.light_&]:text-slate-600 leading-relaxed">
                      {reg.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-slate-500">
                    <span>{reg.href}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* SECTION E: TECHNICAL & ENGINEERING BLOG POSTS */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-white/10 [html.light_&]:border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                <BookOpen size={18} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white [html.light_&]:text-[#0A2540]">
                  Engineering &amp; Technical Articles
                </h2>
                <p className="text-xs text-slate-400 [html.light_&]:text-slate-500">
                  Comprehensive insights on software pricing, web application architectures, and backend design.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {BLOG_POSTS.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="p-5 rounded-2xl glass-card-premium hover:border-amber-500/40 transition group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white/5 text-amber-400 border border-white/5">
                        {post.category}
                      </span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Clock size={11} />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white [html.light_&]:text-[#0A2540] group-hover:text-amber-400 transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-400 [html.light_&]:text-slate-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{post.publishedDate}</span>
                    <span className="text-amber-400 font-semibold group-hover:underline">Read Article →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* SECTION F: LEGAL, SECURITY & COMPLIANCE */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-white/10 [html.light_&]:border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-slate-500/10 text-slate-300 flex items-center justify-center font-bold">
                <Shield size={18} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white [html.light_&]:text-[#0A2540]">
                  Legal, Governance &amp; Machine Protocols
                </h2>
                <p className="text-xs text-slate-400 [html.light_&]:text-slate-500">
                  Client privacy guarantees, milestone refund terms, service agreements, and XML search protocols.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {legalPages.map((leg) => {
                const Tag = leg.isExternal ? "a" : Link;
                const extraProps = leg.isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {};

                return (
                  <Tag
                    key={leg.href}
                    href={leg.href}
                    {...extraProps}
                    className="p-5 rounded-2xl glass-card-premium hover:border-slate-500/40 transition group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono text-slate-400">
                          {leg.href}
                        </span>
                        {leg.isExternal ? (
                          <ExternalLink size={13} className="text-slate-500 group-hover:text-white" />
                        ) : (
                          <ArrowRight size={13} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        )}
                      </div>
                      <h3 className="text-base font-bold text-white [html.light_&]:text-[#0A2540] group-hover:text-blue-400 transition-colors mb-1.5">
                        {leg.title}
                      </h3>
                      <p className="text-xs text-slate-400 [html.light_&]:text-slate-600 leading-relaxed">
                        {leg.description}
                      </p>
                    </div>
                  </Tag>
                );
              })}
            </div>
          </div>

          {/* SECTION F: SITEMAP SECURITY & CRAWL POLICY */}
          <div className="space-y-6 pt-6 border-t border-white/10 [html.light_&]:border-slate-200">
            <div className="flex items-center gap-3 pb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                <Shield size={18} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white [html.light_&]:text-[#0A2540]">
                  Sitemap Security &amp; Indexing Standards
                </h2>
                <p className="text-xs text-slate-400 [html.light_&]:text-slate-500">
                  Strict privacy, isolation protocols, and real-time synchronization applied to our public sitemap.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl glass-card-premium space-y-2 border border-white/5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <CheckCircle2 size={14} />
                  <span>Public URLs Only</span>
                </div>
                <p className="text-xs text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                  Zero private user profiles, authenticated sessions, or client portals are ever exposed or indexed.
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-card-premium space-y-2 border border-white/5">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                  <CheckCircle2 size={14} />
                  <span>Admin &amp; API Isolation</span>
                </div>
                <p className="text-xs text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                  All administrative dashboards (/admin) and backend endpoints (/api) are strictly isolated and disallowed.
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-card-premium space-y-2 border border-white/5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#F87000]">
                  <CheckCircle2 size={14} />
                  <span>Zero Sensitive IDs</span>
                </div>
                <p className="text-xs text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                  Only clean semantic slugs are indexed. Raw database IDs, session tokens, and query strings are blocked.
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-card-premium space-y-2 border border-white/5">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
                  <CheckCircle2 size={14} />
                  <span>Auto-Synchronized</span>
                </div>
                <p className="text-xs text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                  Dynamically updated in real time as new services, products, and articles are published, returning HTTP 200 OK.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. BOTTOM CTA: HAVE A PROJECT IN MIND? */}
      <section className="py-20 bg-transparent text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl glass-card-premium shadow-2xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
              Can&apos;t Find What You Need?
            </h2>
            <p className="text-sm text-slate-300 [html.light_&]:text-slate-600 max-w-xl mx-auto">
              Our engineering team builds custom web applications, API integrations, and turnkey commerce platforms tailored to your business model.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-[#0B1220] [html.light_&]:text-white bg-[#F87000] hover:bg-[#FF8A24] rounded-full shadow-lg shadow-orange-500/20 transition"
              >
                <span>Request Custom Consultation</span>
                <ArrowRight size={15} />
              </Link>
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white [html.light_&]:text-[#0A2540] bg-white/5 [html.light_&]:bg-slate-100 hover:bg-white/10 [html.light_&]:hover:bg-slate-200 border border-white/10 [html.light_&]:border-slate-300 rounded-full transition"
              >
                <Phone size={15} className="text-[#2F7DE1]" />
                <span>Call {COMPANY.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
