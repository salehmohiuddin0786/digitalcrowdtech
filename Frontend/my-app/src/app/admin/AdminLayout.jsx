"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Briefcase, FileText, LayoutDashboard, LogOut, MessagesSquare } from "lucide-react";
import { logoutAdmin } from "./adminData";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Blogs", href: "/admin/blogs", icon: FileText },
  { label: "Career", href: "/admin/careers", icon: Briefcase },
  { label: "Queries", href: "/admin/queries", icon: MessagesSquare },
];

const AdminLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logoutAdmin();
    router.replace("/admin");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <Link href="/admin/dashboard" className="text-xl font-bold text-slate-950">
            DigitalCrowdTech Admin
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    active ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-4 pb-3 md:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${
                  active ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      {children}
    </div>
  );
};

export default AdminLayout;
