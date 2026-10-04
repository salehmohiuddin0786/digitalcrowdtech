import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function Custom404() {
  return (
    <Layout>
      <SEO
        title="Page Not Found"
        description="The requested page could not be located."
        noIndex={true}
      />
      <section className="relative z-10 min-h-[85vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="rounded-[2.5rem] border border-white/15 bg-[#0A192F]/50 p-10 sm:p-14 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] max-w-lg mx-auto">
          <p className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-500 mb-4" aria-hidden="true">
            404
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Endpoint Not Found
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed mb-8">
            The page you requested does not exist or has been restructured.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg hover:scale-105 transition-transform"
            >
              <Home size={16} />
              <span>Return Home</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10 transition-colors"
            >
              <span>Contact Support</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
