'use client';
import { useState } from 'react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { ChevronDown, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionReveal } from '@/components/animations';
import { FAQ_ITEMS, SITE } from '@/lib/data';
import Link from 'next/link';

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${index}`;
  const panelId = `faq-panel-${index}`;

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        id={id}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-between py-6 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-xl px-2 transition-colors hover:bg-white/[0.02]"
      >
        <span className="text-base sm:text-lg font-semibold text-white pr-6 group-hover:text-blue-300 transition-colors">
          {item.question}
        </span>
        <span
          className={`flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] transition-all duration-300 ${
            open ? 'border-orange-500/50 bg-orange-500/20 text-orange-400 rotate-180' : 'group-hover:border-blue-400/40 text-slate-400'
          }`}
          aria-hidden="true"
        >
          <ChevronDown size={16} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed pb-6 px-2">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  return (
    <Layout>
      <SEO
        title="Frequently Asked Questions"
        description="Clear answers regarding Digital Crowd Technologies services, ERP customization, school management software, timelines, and costs."
        canonical="/faq"
      />

      {/* Header */}
      <section className="relative z-10 pt-36 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3.5 py-1 mb-4 backdrop-blur-md">
              <Sparkles size={13} className="text-blue-400" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-300">
                Got Questions?
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Frequently Asked <br />
              <span className="text-gradient-blue">Questions</span>.
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed max-w-xl mx-auto">
              Straightforward answers about our engineering process, pricing models, and service capabilities.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* FAQ Accordion List */}
      <section className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 pb-28">
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <div
              className="rounded-[2.5rem] border border-white/15 bg-[#0A192F]/40 p-6 sm:p-10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
              itemScope
              itemType="https://schema.org/FAQPage"
            >
              {FAQ_ITEMS.map((item, i) => (
                <div
                  key={item.question}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <meta itemProp="name" content={item.question} />
                  <div
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <meta itemProp="text" content={item.answer} />
                  </div>
                  <FAQItem item={item} index={i} />
                </div>
              ))}
            </div>
          </SectionReveal>

          {/* Quick enquiry prompt */}
          <SectionReveal delay={0.15} className="mt-12 text-center">
            <div className="p-8 rounded-2xl border border-white/10 bg-[#0A192F]/30 backdrop-blur-xl">
              <h2 className="text-lg font-bold text-white mb-2">Have a question not listed here?</h2>
              <p className="text-sm text-slate-400 mb-6">
                Our engineering team is always ready to discuss technical questions or project inquiries.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-orange-500 px-6 py-3 text-sm font-bold text-white shadow-md hover:scale-105 transition-transform"
              >
                <span>Talk with an Engineer</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </Layout>
  );
}
