"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ShieldCheck,
  Building,
  User,
  Layers,
  IndianRupee,
  Sparkles,
} from "lucide-react";
import SectionHeading from "../Component/SectionHeading";
import { COMPANY } from "../data/company";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    service: "Business Website",
    budget: "Under ₹10,000",
    message: "",
    _hp: "", // Honeypot spam protection
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const serviceOptions = [
    "Business Website",
    "Custom Website / Web Application",
    "E-commerce",
    "Backend / API",
    "ERP",
    "School Management",
    "Other",
  ];

  const budgetOptions = [
    "Under ₹10,000",
    "₹10,000 – ₹25,000",
    "₹25,000 – ₹50,000",
    "₹50,000+",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Honeypot check
    if (formData._hp) {
      setSuccess(true);
      return;
    }

    // Validation
    if (!formData.name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      setErrorMessage("Please enter a valid contact phone number.");
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMessage("Please provide a brief description of your project (at least 10 characters).");
      return;
    }

    setLoading(true);

    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_API_URL 
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/contact`
        : "/api/contact";

      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          businessName: formData.businessName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          service: formData.service,
          budget: formData.budget,
          subject: `${formData.service} Inquiry - ${formData.name}`,
          message: formData.message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok && !data.ok) {
        throw new Error(data.message || "Failed to submit inquiry. Please try again.");
      }

      setSuccess(true);
      setFormData({
        name: "",
        businessName: "",
        email: "",
        phone: "",
        service: "Business Website",
        budget: "Under ₹10,000",
        message: "",
        _hp: "",
      });
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage(
        err.message || "Could not reach server. Please call us at +91 9985960692 or message on WhatsApp."
      );
    } finally {
      setLoading(false);
    }
  };

  const whatsappLink = `https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    COMPANY.whatsappPrefill
  )}`;

  return (
    <div className="flex flex-col bg-transparent">
      {/* HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-white/10 [html.light_&]:border-slate-200">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#2F7DE1]/20 to-[#F87000]/15 blur-[120px] pointer-events-none -z-10 rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6 backdrop-blur-md">
            <Sparkles size={13} />
            <span>Direct Engineering Consultation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white [html.light_&]:text-[#0A2540] tracking-tight leading-tight">
            Let&apos;s Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F7DE1] to-[#F87000]">Next Project</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
            Tell us about your business, idea or software requirements and we&apos;ll schedule a direct technical consultation.
          </p>
        </div>
      </section>

      {/* MAIN FORM & CONTACT DETAILS */}
      <section className="py-20 bg-transparent border-b border-white/10 [html.light_&]:border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl glass-card-premium shadow-2xl relative overflow-hidden">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white [html.light_&]:text-[#0A2540] mb-2">Project Inquiry Form</h2>
                  <p className="text-xs sm:text-sm text-slate-400 [html.light_&]:text-slate-600">
                    Fill out your requirements below. All inquiries receive direct attention from our engineering team within one business day.
                  </p>
                </div>

                {success ? (
                  <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-in fade-in">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white [html.light_&]:text-[#0A2540]">Inquiry Received</h3>
                    <p className="text-sm text-slate-300 [html.light_&]:text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thank you! Your enquiry has been received. We&apos;ll get back to you within one business day.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setSuccess(false)}
                        className="px-5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot field (hidden from real users) */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="_hp"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData._hp}
                        onChange={handleChange}
                      />
                    </div>

                    {errorMessage && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-300 text-sm">
                        <AlertCircle size={18} className="shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 [html.light_&]:text-slate-700 mb-2">
                          Full Name <span className="text-blue-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-4 py-3 rounded-xl bg-black/40 [html.light_&]:bg-white border border-white/10 [html.light_&]:border-slate-300 text-white [html.light_&]:text-slate-800 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition backdrop-blur-md"
                        />
                      </div>

                      {/* Business Name */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 [html.light_&]:text-slate-700 mb-2">
                          Business Name
                        </label>
                        <input
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          placeholder="e.g. Ruchi Retail Pvt Ltd"
                          className="w-full px-4 py-3 rounded-xl bg-black/40 [html.light_&]:bg-white border border-white/10 [html.light_&]:border-slate-300 text-white [html.light_&]:text-slate-800 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition backdrop-blur-md"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 [html.light_&]:text-slate-700 mb-2">
                          Email Address <span className="text-blue-400">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@business.com"
                          className="w-full px-4 py-3 rounded-xl bg-black/40 [html.light_&]:bg-white border border-white/10 [html.light_&]:border-slate-300 text-white [html.light_&]:text-slate-800 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition backdrop-blur-md"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 [html.light_&]:text-slate-700 mb-2">
                          Phone Number <span className="text-blue-400">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 9985960692"
                          className="w-full px-4 py-3 rounded-xl bg-black/40 [html.light_&]:bg-white border border-white/10 [html.light_&]:border-slate-300 text-white [html.light_&]:text-slate-800 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition backdrop-blur-md"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Service Required */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 [html.light_&]:text-slate-700 mb-2">
                          Service Required <span className="text-blue-400">*</span>
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-black/40 [html.light_&]:bg-white border border-white/10 [html.light_&]:border-slate-300 text-white [html.light_&]:text-slate-800 text-sm focus:outline-none focus:border-blue-500 transition backdrop-blur-md"
                        >
                          {serviceOptions.map((opt) => (
                            <option key={opt} value={opt} className="bg-[#0B1220] text-white">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Estimated Budget */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 [html.light_&]:text-slate-700 mb-2">
                          Estimated Budget <span className="text-[10px] text-slate-400 normal-case">(optional range)</span>
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-black/40 [html.light_&]:bg-white border border-white/10 [html.light_&]:border-slate-300 text-white [html.light_&]:text-slate-800 text-sm focus:outline-none focus:border-blue-500 transition backdrop-blur-md"
                        >
                          {budgetOptions.map((opt) => (
                            <option key={opt} value={opt} className="bg-[#0B1220] text-white">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Transparent Pricing Disclaimer */}
                    <div className="p-3.5 rounded-xl bg-blue-500/10 [html.light_&]:bg-blue-50 border border-blue-500/20 [html.light_&]:border-blue-200 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[#F87000]">Transparent Starting Rates:</span>
                        <span className="font-mono font-semibold text-slate-300 [html.light_&]:text-slate-700">₹4,999 / ₹9,999</span>
                      </div>
                      <span className="text-[11px] text-slate-400 [html.light_&]:text-slate-600 block leading-relaxed">
                        Business Websites starting from ₹4,999. Custom Web Applications starting from ₹9,999. Final pricing depends on project requirements.
                      </span>
                    </div>

                    {/* Project Description */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 [html.light_&]:text-slate-700 mb-2">
                        Project Description <span className="text-blue-400">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please describe your business requirements, pages needed, user roles, integrations or reference ideas..."
                        className="w-full px-4 py-3 rounded-xl bg-black/40 [html.light_&]:bg-white border border-white/10 [html.light_&]:border-slate-300 text-white [html.light_&]:text-slate-800 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition backdrop-blur-md"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 px-6 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>Submitting Your Inquiry...</span>
                      ) : (
                        <>
                          <span>Submit Project Inquiry</span>
                          <Send size={15} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Contact Details & Map */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Quick Contact Cards */}
              <div className="p-8 rounded-3xl glass-card-premium shadow-xl space-y-5">
                <h3 className="text-lg font-bold text-white [html.light_&]:text-[#0A2540] pb-3 border-b border-white/10 [html.light_&]:border-slate-200">
                  Direct Contact Channels
                </h3>

                <div className="space-y-4 text-sm">
                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 [html.light_&]:text-slate-500 block">Phone Support</span>
                      <a
                        href={`tel:${COMPANY.phone}`}
                        className="font-semibold text-white [html.light_&]:text-[#0A2540] hover:text-blue-400 transition"
                      >
                        {COMPANY.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 [html.light_&]:text-slate-500 block">Inquiry Email</span>
                      <a
                        href={`mailto:${COMPANY.email}`}
                        className="font-semibold text-white [html.light_&]:text-[#0A2540] hover:text-blue-400 transition break-all"
                      >
                        {COMPANY.email}
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                      <MessageCircle size={18} />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 [html.light_&]:text-slate-500 block">WhatsApp Chat</span>
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-emerald-400 hover:text-emerald-300 transition"
                      >
                        Chat Directly (+91 9985960692)
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 [html.light_&]:text-slate-500 block">Registered Office</span>
                      <p className="text-slate-300 [html.light_&]:text-slate-600 leading-snug">
                        {COMPANY.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hyderabad Google Maps Embed */}
              <div className="rounded-3xl glass-card-premium shadow-xl p-6 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white [html.light_&]:text-[#0A2540]">Madhapur, Hyderabad Location</span>
                  <span className="text-blue-400 font-mono text-[11px]">Telangana, India</span>
                </div>
                
                <div className="w-full h-56 rounded-2xl overflow-hidden border border-white/10 [html.light_&]:border-slate-200 relative">
                  <iframe
                    title="Digital Crowd Technologies Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3267592476597!2d78.37525417516624!3d17.444063283452298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc5bc68953%3A0xe54d6fa7c645ecb3!2sSBR%20CV%20Towers!5e0!3m2!1sen!2sin!4v1717550000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <p className="text-[11px] text-slate-400 [html.light_&]:text-slate-600 leading-relaxed">
                  Located in the IT hub of Madhapur, Hyderabad. Available for scheduled in-person requirement meetings across the Hyderabad tech corridor.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
