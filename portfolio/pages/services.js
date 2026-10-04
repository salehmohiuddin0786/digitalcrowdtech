import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Globe, ShoppingCart, LayoutGrid, GraduationCap, Smartphone, Server, ArrowRight, CheckCircle2, Sparkles, ArrowUpRight } from 'lucide-react';
import { SectionReveal, StaggerContainer, StaggerItem } from '@/components/animations';
import { SERVICES, SITE } from '@/lib/data';
import Link from 'next/link';

const ICON_MAP = { Globe, ShoppingCart, LayoutGrid, GraduationCap, Smartphone, Server };

const SERVICE_DETAILS = {
  'web-development': {
    deliverables: ['Custom Next.js & React frontend', 'Server-Side Rendering (SSR) & SEO optimization', 'Responsive mobile-first layout', 'Production deployment & CDN setup'],
  },
  ecommerce: {
    deliverables: ['Product catalog & multi-category filters', 'Shopping cart & customer account portal', 'Razorpay / Stripe payment gateway integration', 'Order tracking & dispatch dashboard', 'Inventory management interface'],
  },
  erp: {
    deliverables: ['Custom business module development', 'Role-based access control (RBAC)', 'Operational analytics & visual reporting', 'Database indexing & automated backups'],
  },
  'school-management': {
    deliverables: ['Student & faculty management suite', 'Automated fee ledger & receipt generator', 'Parent notification portal', 'Timetable scheduling & attendance tracking', 'Examination reports & administrative controls'],
  },
  'mobile-apps': {
    deliverables: ['Cross-platform iOS & Android compatibility', 'RESTful API synchronization', 'Push notifications & background sync', 'Clean intuitive UX design'],
  },
  'api-backend': {
    deliverables: ['High-throughput Node.js & Express architecture', 'JWT authentication & role authorization', 'Optimized MySQL database queries & migrations', 'Swagger / Postman API documentation', 'Rate-limiting & security headers'],
  },
};

export default function ServicesPage() {
  return (
    <Layout>
      <SEO
        title="Engineering Services"
        description="Comprehensive software development services by Digital Crowd Technologies — web development, e-commerce, ERP systems, school management, and backend APIs."
        canonical="/services"
      />

      {/* Header */}
      <section className="relative z-10 pt-36 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3.5 py-1 mb-4 backdrop-blur-md">
              <Sparkles size={13} className="text-blue-400" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-300">
                End-to-End Capabilities
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Solutions for the way your <br />
              <span className="text-gradient-blue">business works</span>.
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed max-w-xl mx-auto">
              Every service is grounded in production reality. We architect and build systems that seamlessly align with your operations.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Services List */}
      <section className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 pb-28">
        <div className="max-w-7xl mx-auto space-y-8">
          {SERVICES.map((service, i) => {
            const Icon = ICON_MAP[service.icon];
            const details = SERVICE_DETAILS[service.id];

            return (
              <SectionReveal key={service.id} delay={i * 0.05}>
                <div
                  id={service.id}
                  className="rounded-[2rem] border border-white/15 bg-[#0A192F]/40 p-7 sm:p-10 backdrop-blur-2xl transition-all duration-300 hover:border-blue-400/40 hover:bg-[#0E2442]/60 hover:shadow-[0_20px_50px_rgba(0,102,255,0.2)]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left: Service description */}
                    <div className="lg:col-span-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-5">
                        {Icon && <Icon size={24} />}
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-3">{service.title}</h2>
                      <p className="text-slate-300 text-sm leading-relaxed mb-6">
                        {service.description}
                      </p>
                      
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-white transition-colors"
                      >
                        <span>Discuss this solution</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>

                    {/* Middle: Technologies */}
                    <div className="lg:col-span-3">
                      <span className="font-mono text-xs uppercase tracking-wider text-slate-400 block mb-3 font-bold">
                        Primary Technologies:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-slate-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Deliverables */}
                    <div className="lg:col-span-5 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                      <span className="font-mono text-xs uppercase tracking-wider text-slate-400 block mb-3 font-bold">
                        What&apos;s Delivered:
                      </span>
                      <ul className="space-y-2" role="list">
                        {details.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
