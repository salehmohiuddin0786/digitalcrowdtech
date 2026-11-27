"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Briefcase,
  FileText,
  LayoutDashboard,
  LogOut,
  MessagesSquare,
  Layers,
  Package,
  ShoppingBag,
  CreditCard,
  Tag,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { logoutAdmin, getQueries } from "./adminData";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Offers", href: "/admin/offers", icon: Tag },
  { label: "PhonePe", href: "/admin/payment-settings", icon: CreditCard },
  { label: "Inquiries", href: "/admin/queries", icon: MessagesSquare, hasBadge: true },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Projects", href: "/admin/projects", icon: Layers },
  { label: "Blogs", href: "/admin/blogs", icon: FileText },
  { label: "Careers", href: "/admin/careers", icon: Briefcase },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [newQueriesCount, setNewQueriesCount] = useState(0);

  useEffect(() => {
    let isMounted = true;
    getQueries()
      .then((items) => {
        if (isMounted && Array.isArray(items)) {
          const fresh = items.filter((q) => (q.status || "New") === "New").length;
          setNewQueriesCount(fresh);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  const handleLogout = () => {
    logoutAdmin();
    router.replace("/admin");
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-200 font-sans selection:bg-[#2F7DE1]/30">
      <header className="sticky top-0 z-40 border-b border-[#26344F] bg-[#101A2E]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition px-2.5 py-1 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
              title="Open public website in new tab"
            >
              <ArrowLeft size={13} />
              <span className="hidden sm:inline">View Live Site</span>
              <ExternalLink size={11} className="text-slate-500" />
            </Link>
            <span className="text-slate-700">|</span>
            <Link
              href="/admin/dashboard"
              className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2 group"
            >
              <span>
                <span className="text-[#2F7DE1]">Digital</span>
                <span className="text-[#F87000]">Crowd</span> Tech
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/25">
                Admin Console
              </span>
            </Link>
          </div>

          <nav className="hidden items-center gap-1 lg:gap-1.5 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                    active
                      ? "bg-[#F87000] text-white shadow-md shadow-orange-500/20"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                  {item.hasBadge && newQueriesCount > 0 && (
                    <span
                      className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        active
                          ? "bg-white text-orange-600"
                          : "bg-orange-500 text-white animate-pulse"
                      }`}
                    >
                      {newQueriesCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>DB Connected</span>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition"
              title="Sign out of Admin"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <nav className="flex gap-1 overflow-x-auto px-4 pb-2.5 md:hidden border-t border-white/5 pt-2 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold ${
                  active
                    ? "bg-[#F87000] text-white shadow-sm"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
                {item.hasBadge && newQueriesCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-orange-500 text-white">
                    {newQueriesCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </header>
      {children}
    </div>
  );
}
