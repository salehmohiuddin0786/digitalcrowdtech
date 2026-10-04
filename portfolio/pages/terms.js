import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { SectionReveal } from '@/components/animations';
import { SITE } from '@/lib/data';

function Section({ title, children }) {
  return (
    <section className="mb-10" aria-labelledby={`t-section-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <h2
        id={`t-section-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className="text-lg font-bold text-white mb-3"
      >
        {title}
      </h2>
      <div className="text-slate-300 text-sm leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <Layout>
      <SEO
        title="Terms & Conditions"
        description="Terms and Conditions for Digital Crowd Technologies — governing use of our website and services."
        canonical="/terms"
      />

      <section className="relative z-10 pt-36 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <SectionReveal>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-2">
              Legal Disclosure
            </span>
            <h1 className="text-4xl font-extrabold text-white mb-3">Terms &amp; Conditions</h1>
            <p className="text-slate-400 text-sm">Last updated: October 2026 · Digital Crowd Technologies</p>
          </SectionReveal>
        </div>
      </section>

      <article className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 pb-28 max-w-4xl mx-auto">
        <SectionReveal>
          <div className="rounded-[2.5rem] border border-white/15 bg-[#0A192F]/40 p-8 sm:p-12 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <Section title="Acceptance of Terms">
              <p>
                By accessing or navigating this website at {SITE.url}, you agree to comply with and be bound by these Terms and Conditions.
              </p>
            </Section>

            <Section title="Engineering Agreements">
              <p>
                All custom software development projects, ERP implementations, and commercial license transactions are governed by explicit Statement of Work (SOW) agreements signed between Digital Crowd Technologies and the client.
              </p>
            </Section>

            <Section title="Intellectual Property">
              <p>
                Upon complete milestone settlement, full ownership of custom codebases and deliverables produced specifically for the client is transferred to the client, ensuring complete operational independence.
              </p>
            </Section>

            <Section title="Jurisdiction">
              <p>
                These terms are governed by the laws of India. Any legal dispute or interpretation shall fall under the exclusive jurisdiction of the competent courts in Hyderabad, Telangana.
              </p>
            </Section>
          </div>
        </SectionReveal>
      </article>
    </Layout>
  );
}
