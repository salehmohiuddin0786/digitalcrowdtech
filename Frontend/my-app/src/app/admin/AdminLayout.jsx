"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Briefcase,
  FileText,
  LayoutDashboard,
  LogOut,
  MessagesSquare,
  Layers,
  ArrowLeft,
} from "lucide-react";
import { logoutAdmin } from "./adminData";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Inquiries", href: "/admin/queries", icon: MessagesSquare },
  { label: "Projects", href: "/admin/projects", icon: Layers },
  { label: "Blogs", href: "/admin/blogs", icon: FileText },
  { label: "Careers", href: "/admin/careers", icon: Briefcase },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logoutAdmin();
    router.replace("/admin");
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-200 font-sans">
      <header className="sticky top-0 z-40 border-b border-[#26344F] bg-[#101A2E]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 md:px-8">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition">
              <ArrowLeft size={13} />
              <span>Back to Site</span>
            </Link>
            <span className="text-slate-600">|</span>
            <Link href="/admin/dashboard" className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
              <span><span className="text-[#2F7DE1]">Digital</span> <span className="text-[#F87000]">Crowd</span> Tech</span>
              <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Admin</span>
            </Link>
          </div>

          <nav className="hidden items-center gap-1.5 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                    active
                      ? "bg-[#F87000] text-white shadow-sm"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/5 transition"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Logout</span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex gap-1 overflow-x-auto px-4 pb-2.5 md:hidden border-t border-white/5 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${
                  active ? "bg-[#F87000] text-white shadow-sm" : "bg-white/5 text-slate-300"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </header>
      {children}
    </div>
  );
}
