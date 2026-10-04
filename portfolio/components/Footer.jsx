import Link from 'next/link';
import { Mail, MapPin, Globe, ArrowUpRight, Sparkles } from 'lucide-react';
import { SITE, NAV_LINKS, SERVICES } from '@/lib/data';

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Admin Portal', href: '/admin' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#060D1A]/90 backdrop-blur-xl" role="contentinfo">
      {/* Top ambient glow */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Info (Cols 1-4) */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-5 group" aria-label="Digital Crowd Technologies">
              <div className="inline-flex items-center px-3 py-1.5 rounded-xl bg-white/95 hover:bg-white shadow-[0_4px_20px_rgba(0,102,255,0.2)] transition-all">
                <img
                  src="/logo.png"
                  alt="Digital Crowd Technologies"
                  className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </div>
            </Link>

            <p className="text-slate-300/80 text-sm leading-relaxed mb-6 max-w-sm">
              Digital Crowd Technologies builds modern websites, scalable e-commerce platforms, ERP systems, school management suites, and custom business software.
            </p>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-blue-400 mt-0.5 shrink-0" />
                <span>{SITE.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-blue-400 shrink-0" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="hover:text-blue-400 transition-colors"
                >
                  {SITE.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe size={16} className="text-blue-400 shrink-0" />
                <span className="font-mono text-xs">digitalcrowdtech.in</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation (Cols 5-6) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2.5" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services (Cols 7-9) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Services
            </h3>
            <ul className="space-y-2.5" role="list">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services#${s.id}`}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Status (Cols 10-12) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Legal &amp; Trust
            </h3>
            <ul className="space-y-2.5 mb-6" role="list">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs font-bold text-white">Engineering Base</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Registered tech venture in Hyderabad, Telangana, India. Dedicated client-first architecture.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} {SITE.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Built with Next.js &amp; Tailwind CSS</span>
            <span>•</span>
            <span className="text-blue-400 font-mono">digitalcrowdtech.in</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
