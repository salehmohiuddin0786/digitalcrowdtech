import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { SectionReveal } from '@/components/animations';
import { SITE } from '@/lib/data';

function Section({ title, children }) {
  return (
    <section className="mb-10" aria-labelledby={`r-section-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <h2
        id={`r-section-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className="text-lg font-bold text-white mb-3"
      >
        {title}
      </h2>
      <div className="text-slate-300 text-sm leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function RefundPolicyPage() {
  return (
    <Layout>
      <SEO
        title="Refund Policy"
        description="Refund policy for Digital Crowd Technologies software licenses and development services."
        canonical="/refund-policy"
      />

      <section className="relative z-10 pt-36 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <SectionReveal>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-2">
              Commercial Policy
            </span>
            <h1 className="text-4xl font-extrabold text-white mb-3">Refund Policy</h1>
            <p className="text-slate-400 text-sm">Last updated: October 2026 · Digital Crowd Technologies</p>
          </SectionReveal>
        </div>
      </section>

      <article className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 pb-28 max-w-4xl mx-auto">
        <SectionReveal>
          <div className="rounded-[2.5rem] border border-white/15 bg-[#0A192F]/40 p-8 sm:p-12 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <Section title="Software Licenses (e.g., School Management ERP)">
              <p>
                Commercial software licenses are delivered with digital verification. Once licensed code or access keys have been generated and dispatched, license fees are non-refundable. If any technical defect prevents operational startup, our engineering team provides dedicated remediation.
              </p>
            </Section>

            <Section title="Custom Engineering Projects">
              <p>
                Custom software engagements operate on milestone-based billing. Each milestone is formally reviewed, demonstrated, and approved before payment release. Approved milestone disbursements are non-refundable as they represent delivered engineering labor.
              </p>
            </Section>

            <Section title="Third-Party Hosting & Domain Costs">
              <p>
                Fees paid directly or on behalf of the client for third-party hosting, domains, SMS gateways, or VPS servers are subject to the refund policies of those external infrastructure providers.
              </p>
            </Section>

            <Section title="Refund Inquiries">
              <p>
                For any commercial or billing questions, write to{' '}
                <a href={`mailto:${SITE.email}`} className="text-blue-400 hover:text-white transition-colors underline">{SITE.email}</a>.
              </p>
            </Section>
          </div>
        </SectionReveal>
      </article>
    </Layout>
  );
}
