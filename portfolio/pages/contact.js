'use client';
import { useState } from 'react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Mail, MapPin, Globe, Send, CheckCircle, Sparkles, Phone, MessageSquare } from 'lucide-react';
import { SectionReveal } from '@/components/animations';
import { SITE } from '@/lib/data';

const PROJECT_TYPES = [
  'Business Website',
  'E-Commerce Platform',
  'ERP Solutions',
  'School Management System',
  'Mobile Application',
  'Custom Software & API',
  'Other Inquiries',
];

const BUDGET_RANGES = [
  'Under ₹25,000',
  '₹25,000 – ₹75,000',
  '₹75,000 – ₹1,50,000',
  '₹1,50,000 – ₹3,00,000',
  'Above ₹3,00,000',
  'To be discussed based on scope',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Please enter your name.';
    if (!form.email.trim()) newErrors.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Please enter a valid email address.';
    if (!form.message.trim()) newErrors.message = 'Please provide details about your project.';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message || 'Failed to submit enquiry.');
      }
      setSubmitted(true);
    } catch (err) {
      alert(err.message || 'Error submitting form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3.5 rounded-xl border border-white/10 bg-[#0A192F]/60 text-slate-100 placeholder-slate-500 text-sm backdrop-blur-md transition-all focus:outline-none focus:border-blue-400/60 focus:bg-[#0E2442]/80 focus:ring-2 focus:ring-blue-500/20';

  return (
    <Layout>
      <SEO
        title="Contact Us"
        description="Contact Digital Crowd Technologies in Hyderabad to discuss your software development, ERP, school management, or e-commerce project."
        canonical="/contact"
      />

      {/* Header */}
      <section className="relative z-10 pt-36 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-3.5 py-1 mb-4 backdrop-blur-md">
              <Sparkles size={13} className="text-orange-400" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-orange-300">
                Let&apos;s Build Together
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Have a project in mind? <br />
              <span className="text-gradient-orange">Let&apos;s build it</span>.
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Tell us about your requirements, workflow challenges, or digital objectives. We will get back to you within 24 hours.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Form + Information Section */}
      <section className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Contact Form (Cols 1-8) */}
            <div className="lg:col-span-8">
              <SectionReveal>
                <div className="rounded-[2.5rem] border border-white/15 bg-[#0A192F]/40 p-6 sm:p-10 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.4)]">
                  
                  {submitted ? (
                    <div className="py-16 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto mb-6">
                        <CheckCircle size={32} />
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-3">Project Request Received</h2>
                      <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
                        Thank you for reaching out to Digital Crowd Technologies. Our engineering lead will review your requirements and reach out to you shortly.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-2.5 rounded-xl border border-white/20 bg-white/5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        
                        <div>
                          <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                            Full Name <span className="text-orange-400">*</span>
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className={inputClass}
                          />
                          {errors.fullName && <p className="mt-1.5 text-xs text-red-400">{errors.fullName}</p>}
                        </div>

                        <div>
                          <label htmlFor="company" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                            Business / Organization
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            placeholder="Acme Enterprises"
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                            Email Address <span className="text-orange-400">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className={inputClass}
                          />
                          {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                            Phone / WhatsApp
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label htmlFor="projectType" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                            Project Type
                          </label>
                          <select
                            id="projectType"
                            name="projectType"
                            value={form.projectType}
                            onChange={handleChange}
                            className={`${inputClass} cursor-pointer`}
                          >
                            <option value="" className="bg-[#0A192F] text-slate-400">Select project category</option>
                            {PROJECT_TYPES.map((t) => (
                              <option key={t} value={t} className="bg-[#0A192F] text-white">{t}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label htmlFor="budget" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                            Estimated Budget
                          </label>
                          <select
                            id="budget"
                            name="budget"
                            value={form.budget}
                            onChange={handleChange}
                            className={`${inputClass} cursor-pointer`}
                          >
                            <option value="" className="bg-[#0A192F] text-slate-400">Select budget estimate</option>
                            {BUDGET_RANGES.map((b) => (
                              <option key={b} value={b} className="bg-[#0A192F] text-white">{b}</option>
                            ))}
                          </select>
                        </div>

                      </div>

                      <div className="mb-6">
                        <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                          Project Details &amp; Requirements <span className="text-orange-400">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Briefly describe what you're building, target audience, and any preferred timeline..."
                          className={`${inputClass} resize-none`}
                        />
                        {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 px-8 py-4 text-sm font-bold text-white shadow-[0_10px_35px_rgba(0,102,255,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                      >
                        {submitting ? (
                          <>
                            <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            <span>Processing Request...</span>
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            <span>Send Project Request</span>
                          </>
                        )}
                      </button>

                    </form>
                  )}

                </div>
              </SectionReveal>
            </div>

            {/* Direct Contact Card (Cols 9-12) */}
            <div className="lg:col-span-4">
              <SectionReveal delay={0.1}>
                <div className="rounded-[2.5rem] border border-white/15 bg-[#0A192F]/40 p-8 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.4)] space-y-6">
                  
                  <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                    <div className="px-2.5 py-1 rounded-lg bg-white/95">
                      <img src="/logo.png" alt="DCT" className="h-6 w-auto object-contain" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Direct Contact</h3>
                      <p className="text-xs text-slate-400">Hyderabad Hub</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
                      <MapPin size={18} className="text-blue-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs font-mono uppercase text-slate-400">Office Location</span>
                        <p className="text-sm font-medium text-white">{SITE.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
                      <Mail size={18} className="text-blue-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs font-mono uppercase text-slate-400">Official Inquiries</span>
                        <a href={`mailto:${SITE.email}`} className="text-sm font-medium text-blue-300 hover:text-white transition-colors block">
                          {SITE.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
                      <Globe size={18} className="text-blue-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs font-mono uppercase text-slate-400">Official Web Portal</span>
                        <p className="text-sm font-medium text-white font-mono">digitalcrowdtech.in</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-blue-500/20 bg-blue-500/5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-mono text-xs font-bold text-white">Engineering Response</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      We respond directly with technical feasibility assessments, architectural advice, and initial milestone estimates.
                    </p>
                  </div>

                </div>
              </SectionReveal>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
