import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { SectionReveal } from '@/components/animations';
import { SITE } from '@/lib/data';

function Section({ title, children }) {
  return (
    <section className="mb-10" aria-labelledby={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <h2
        id={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className="text-lg font-bold text-white mb-3"
      >
        {title}
      </h2>
      <div className="text-slate-300 text-sm leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for Digital Crowd Technologies — how we handle and protect data."
        canonical="/privacy-policy"
      />

      <section className="relative z-10 pt-36 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <SectionReveal>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-2">
              Legal Disclosure
            </span>
            <h1 className="text-4xl font-extrabold text-white mb-3">Privacy Policy</h1>
            <p className="text-slate-400 text-sm">Last updated: October 2026 · Digital Crowd Technologies</p>
          </SectionReveal>
        </div>
      </section>

      <article className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 pb-28 max-w-4xl mx-auto">
        <SectionReveal>
          <div className="rounded-[2.5rem] border border-white/15 bg-[#0A192F]/40 p-8 sm:p-12 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <Section title="Introduction">
              <p>
                This Privacy Policy describes how Digital Crowd Technologies (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), operating at {SITE.url}, handles data collected through our web portal and direct communications.
              </p>
              <p>
                By using our website, you acknowledge the terms outlined in this policy. For questions or data requests, contact us at{' '}
                <a href={`mailto:${SITE.email}`} className="text-blue-400 hover:text-white transition-colors underline">{SITE.email}</a>.
              </p>
            </Section>

            <Section title="Data Collected">
              <p>We only collect information voluntarily provided by you through our project enquiry and contact forms, including:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Name, email address, and phone or WhatsApp contact details</li>
                <li>Business, school, or organization name</li>
                <li>Project requirements, specifications, and scope descriptions</li>
              </ul>
              <p>We do not store or process sensitive payment credentials on this marketing website.</p>
            </Section>

            <Section title="Data Utilization">
              <p>Your submitted contact details are utilized exclusively to:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Respond to your software requests, quote inquiries, and architectural feasibility questions</li>
                <li>Coordinate development milestones throughout project engagements</li>
              </ul>
              <p>We maintain a strict zero-spam policy: we never sell, lease, or distribute your information to third-party marketing brokers.</p>
            </Section>

            <Section title="Cookies & Analytics">
              <p>
                Our website utilizes minimal essential cookies necessary for page state and security. Anonymized performance telemetry may be logged to understand site reliability, browser compatibility, and core performance.
              </p>
            </Section>

            <Section title="Security & Confidentiality">
              <p>
                We employ industry-standard encryption, SSL/TLS certificates, and secure servers to safeguard information in transit and at rest.
              </p>
            </Section>

            <Section title="Contact Information">
              <p>
                For data privacy requests or inquiries:
              </p>
              <p className="font-mono text-xs text-blue-300">
                Digital Crowd Technologies · {SITE.location} · {SITE.email}
              </p>
            </Section>
          </div>
        </SectionReveal>
      </article>
    </Layout>
  );
}
