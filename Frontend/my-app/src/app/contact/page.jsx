"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  ArrowRight,
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
    <div className="flex flex-col bg-slate-50/50 [html.dark_&]:bg-transparent">
      {/* 1. HERO */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-200 [html.dark_&]:border-[#22344D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-[#567785]/10 text-[#567785] [html.dark_&]:text-[#8EAEBD] border border-[#567785]/30 mb-4">
            <Sparkles size={14} className="text-[#E89228]" />
            <span>Direct Technical Consultation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E293B] [html.dark_&]:text-white tracking-tight leading-tight">
            Let&apos;s Build Your <span className="text-[#E89228]">Next Project</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 [html.dark_&]:text-slate-300 leading-relaxed">
            Tell us about your business, idea or software requirements and we&apos;ll schedule a direct technical consultation with our engineering team.
          </p>
        </div>
      </section>

      {/* 2. MAIN FORM & DETAILS (Screenshot 5 Reference) */}
      <section className="py-14 md:py-20 bg-transparent border-b border-slate-200 [html.dark_&]:border-[#22344D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form Card with Petrol Header matching Screenshot 5 */}
            <div className="lg:col-span-7">
              <div className="bg-white [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-[#26364A] rounded-2xl shadow-sm overflow-hidden">
                
                {/* Petrol Blue Card Header */}
                <div className="bg-[#567785] text-white py-3 px-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User size={15} className="text-[#E89228]" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Project Inquiry Form
                    </span>
                  </div>
                  <span className="text-xs text-white/80">
                    Response within 1 business day
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  {success ? (
                    <div className="p-8 rounded-xl bg-[#E8F8EE] border border-[#A9DFBF] text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-[#27AE60]/20 text-[#27AE60] flex items-center justify-center mx-auto">
                        <CheckCircle2 size={24} />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Inquiry Received Successfully</h3>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                        Thank you! Your requirements have reached our engineering leads. We will review your project and get in touch within one business day.
                      </p>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setSuccess(false)}
                          className="btn-peach text-xs font-bold"
                        >
                          Submit Another Inquiry
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Honeypot field */}
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
                        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                          <AlertCircle size={15} className="shrink-0 mt-0.5" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 [html.dark_&]:text-slate-300 mb-1">
                            Your Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 [html.dark_&]:border-slate-700 bg-white [html.dark_&]:bg-[#182638] text-slate-900 [html.dark_&]:text-white focus:outline-none focus:border-[#567785]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 [html.dark_&]:text-slate-300 mb-1">
                            Business / Company Name
                          </label>
                          <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            placeholder="Acme Enterprises"
                            className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 [html.dark_&]:border-slate-700 bg-white [html.dark_&]:bg-[#182638] text-slate-900 [html.dark_&]:text-white focus:outline-none focus:border-[#567785]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 [html.dark_&]:text-slate-300 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 [html.dark_&]:border-slate-700 bg-white [html.dark_&]:bg-[#182638] text-slate-900 [html.dark_&]:text-white focus:outline-none focus:border-[#567785]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 [html.dark_&]:text-slate-300 mb-1">
                            Phone / Mobile Number *
                          </label>
                          <div className="flex rounded-lg border border-slate-300 [html.dark_&]:border-slate-700 bg-white [html.dark_&]:bg-[#182638] overflow-hidden focus-within:border-[#567785]">
                            <div className="flex items-center gap-1 px-3 bg-slate-50 [html.dark_&]:bg-slate-800 border-r border-slate-200 [html.dark_&]:border-slate-700 text-xs font-bold text-slate-700 [html.dark_&]:text-slate-300">
                              <span>🇮🇳</span>
                              <span>+91</span>
                            </div>
                            <input
                              type="tel"
                              name="phone"
                              required
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="9876543210"
                              className="w-full px-3 py-2 text-xs text-slate-900 [html.dark_&]:text-white bg-transparent focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 [html.dark_&]:text-slate-300 mb-1">
                            Service Needed
                          </label>
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 [html.dark_&]:border-slate-700 bg-white [html.dark_&]:bg-[#182638] text-slate-900 [html.dark_&]:text-white focus:outline-none focus:border-[#567785]"
                          >
                            {serviceOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 [html.dark_&]:text-slate-300 mb-1">
                            Estimated Budget
                          </label>
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 [html.dark_&]:border-slate-700 bg-white [html.dark_&]:bg-[#182638] text-slate-900 [html.dark_&]:text-white focus:outline-none focus:border-[#567785]"
                          >
                            {budgetOptions.map((b) => (
                              <option key={b} value={b}>
                                {b}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 [html.dark_&]:text-slate-300 mb-1">
                          Project Description *
                        </label>
                        <textarea
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Briefly describe your business, required features, pages, or target timeline..."
                          className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 [html.dark_&]:border-slate-700 bg-white [html.dark_&]:bg-[#182638] text-slate-900 [html.dark_&]:text-white focus:outline-none focus:border-[#567785]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-brand-orange py-3 text-xs font-bold shadow-sm"
                      >
                        {loading ? "Submitting Inquiry..." : "Submit Project Inquiry"}
                      </button>
                    </form>
                  )}
                </div>

              </div>
            </div>

            {/* Right Column: Contact Details Cards */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* WhatsApp Fast Reply Card */}
              <div className="bg-white [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-[#26364A] rounded-2xl p-6 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center">
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 [html.dark_&]:text-white">
                      Instant WhatsApp Chat
                    </h3>
                    <span className="text-[11px] text-[#27AE60] font-bold">
                      Typically replies in under 15 minutes
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 [html.dark_&]:text-slate-400">
                  Prefer direct messaging? Message our engineering lead directly on WhatsApp with your questions.
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold transition shadow-xs"
                >
                  <MessageCircle size={15} />
                  <span>Start WhatsApp Conversation</span>
                </a>
              </div>

              {/* Direct Phone & Email Card */}
              <div className="bg-white [html.dark_&]:bg-[#152234] border border-slate-200 [html.dark_&]:border-[#26364A] rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#567785] [html.dark_&]:text-[#8EAEBD]">
                  Direct Contact Information
                </h3>
                
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-3">
                    <Phone size={16} className="text-[#E89228] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800 [html.dark_&]:text-slate-200 block">
                        Direct Phone:
                      </span>
                      <a href={`tel:${COMPANY.phone}`} className="text-slate-600 [html.dark_&]:text-slate-400 hover:text-[#E89228]">
                        {COMPANY.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail size={16} className="text-[#567785] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800 [html.dark_&]:text-slate-200 block">
                        Official Support Email:
                      </span>
                      <a href={`mailto:${COMPANY.email}`} className="text-slate-600 [html.dark_&]:text-slate-400 hover:text-[#567785]">
                        {COMPANY.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-[#567785] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800 [html.dark_&]:text-slate-200 block">
                        Office Location:
                      </span>
                      <span className="text-slate-600 [html.dark_&]:text-slate-400 leading-snug">
                        {COMPANY.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transparent Ethics Note */}
              <div className="p-4 rounded-xl bg-[#FFF3E0] border border-[#FFD099] text-xs space-y-1">
                <span className="font-black text-[#E89228] block uppercase text-[10px]">
                  No Sales Harassment
                </span>
                <p className="text-slate-700 text-[11px] leading-relaxed">
                  We are engineers, not cold-call brokers. Your contact details are never shared, sold, or used for unsolicited spam.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
