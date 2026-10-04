'use client';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Sparkles, Phone, Mail } from 'lucide-react';
import { SectionReveal } from '@/components/animations';

export default function CTASection() {
  return (
    <section className="relative z-10 py-24 lg:py-32" aria-labelledby="cta-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="relative rounded-[2.5rem] border border-white/20 bg-gradient-to-br from-[#0B1F3A]/90 via-[#0A192F]/80 to-[#060D1A]/95 p-8 sm:p-14 lg:p-20 text-center backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.6)] overflow-hidden">
            
            {/* Ambient Background Glows */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-blue-500/25 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute -bottom-24 right-10 w-72 h-72 bg-orange-500/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 mb-6 backdrop-blur-md">
                <Sparkles size={14} className="text-orange-400" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-200">
                  Ready to Build Something Remarkable?
                </span>
              </div>

              <h2
                id="cta-heading"
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight"
              >
                Let&apos;s engineer your next <br className="hidden sm:inline" />
                <span className="text-gradient-orange">digital milestone</span>.
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
                Discuss your web application, ERP system, school management platform, or custom architecture directly with our team in Hyderabad.
              </p>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 px-8 py-4 text-base font-bold text-white shadow-[0_12px_40px_rgba(0,102,255,0.45)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <span>Start a Project</span>
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-7 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/[0.1] hover:border-blue-400/40"
                >
                  <span>Explore Solutions</span>
                  <ArrowUpRight size={18} className="text-blue-400" />
                </Link>
              </div>

              {/* Quick direct communication links */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-white/10 text-xs sm:text-sm text-slate-300">
                <a
                  href="mailto:support@digitalcrowdtech.in"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail size={16} className="text-blue-400" />
                  <span>support@digitalcrowdtech.in</span>
                </a>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="font-mono text-xs text-slate-400">Hyderabad, Telangana, India</span>
              </div>

            </div>

          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
