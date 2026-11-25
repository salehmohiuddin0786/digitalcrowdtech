"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  ArrowRight,
  CheckCircle2,
  Lock,
  Building,
  Mail,
  Phone,
  FileText,
  IndianRupee,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { COMPANY } from "../data/company";

export default function ClientPaymentPage() {
  const [formData, setFormData] = useState({
    clientName: "",
    businessName: "",
    email: "",
    phone: "",
    invoiceId: "",
    milestoneType: "custom",
    amount: "4999",
  });

  const [paymentInitiating, setPaymentInitiating] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'ready', 'success'
  const [errorMessage, setErrorMessage] = useState("");

  const milestones = [
    { label: "Website Advance", amount: "4999", desc: "Standard 50% website kickoff deposit" },
    { label: "Web App Staging", amount: "9999", desc: "Core API & database milestone settlement" },
    { label: "Turnkey Final", amount: "14999", desc: "Final production deployment & code handover" },
    { label: "Custom Amount", amount: "", desc: "Enter amount as specified on your invoice" },
  ];

  const handleMilestoneSelect = (m) => {
    setFormData((prev) => ({
      ...prev,
      milestoneType: m.label,
      amount: m.amount || prev.amount,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleInitiatePayment = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const parsedAmount = parseFloat(formData.amount);
    if (!formData.clientName.trim()) {
      setErrorMessage("Please enter the primary contact or client name.");
      return;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid billing email address for your payment receipt.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMessage("Please enter a valid contact phone number.");
      return;
    }
    if (!formData.invoiceId.trim()) {
      setErrorMessage("Please provide an Invoice Number or Project Reference ID.");
      return;
    }
    if (isNaN(parsedAmount) || parsedAmount < 100) {
      setErrorMessage("Minimum payable transaction amount is ₹100.");
      return;
    }

    setPaymentInitiating(true);

    // Simulate payment intent preparation
    setTimeout(() => {
      setPaymentInitiating(false);
      const generatedRef = "DCT-" + Date.now().toString(36).toUpperCase() + "-" + Math.floor(1000 + Math.random() * 9000);
      setPaymentStatus({
        referenceId: generatedRef,
        amount: parsedAmount,
        invoiceId: formData.invoiceId.trim(),
        clientName: formData.clientName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
      });
    }, 700);
  };

  return (
    <div className="py-14 md:py-20 bg-[#07090E]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Lock size={12} />
            <span>256-Bit SSL Encrypted Payment Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Client Milestone Payment Portal
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Settle project milestones, invoice deposits, and retainer services securely via UPI, QR, Credit/Debit cards, or Net Banking.
          </p>
        </div>

        {/* Security & Supported Rails Strip */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-blue-400 shrink-0" />
            <span>Authorized RBI Payment Aggregators (PhonePe / UPI)</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">UPI Auto-Debit</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">GPay / PhonePe</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">RuPay / Visa / MC</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">Net Banking</span>
          </div>
        </div>

        {/* Main Payment Section */}
        {paymentStatus ? (
          /* Payment Initiated / Confirmation Modal State */
          <div className="p-8 sm:p-10 rounded-3xl glass-card-premium border border-emerald-500/30 shadow-2xl space-y-6 text-center animate-in fade-in duration-200">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 size={32} />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                Payment Order Generated
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                ₹{paymentStatus.amount.toLocaleString("en-IN")}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Transaction Reference: <strong className="text-white">{paymentStatus.referenceId}</strong>
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 rounded-xl bg-black/40 border border-white/10 text-left text-xs space-y-2 text-slate-300">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Client / Company:</span>
                <span className="font-semibold text-white">{paymentStatus.clientName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Invoice / Milestone ID:</span>
                <span className="font-mono font-semibold text-blue-400">{paymentStatus.invoiceId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Receipt Recipient:</span>
                <span className="font-semibold text-white">{paymentStatus.email}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Currency:</span>
                <span className="font-semibold text-emerald-400">INR (Indian Rupees)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 max-w-md mx-auto text-xs text-slate-300 text-left space-y-2">
              <p className="font-semibold text-blue-400 flex items-center gap-1.5">
                <QrCode size={14} />
                <span>UPI Merchant QR &amp; Gateway Direct Link</span>
              </p>
              <p className="leading-relaxed">
                Please scan the official Digital Crowd Technologies PhonePe Business QR code or complete transaction via the designated UPI handle (<code>9985960692@ybl</code> / PhonePe Business).
              </p>
              <p className="text-[11px] text-slate-400">
                Mention Reference ID <strong>{paymentStatus.referenceId}</strong> in transaction remarks. Your official GST receipt will be dispatched to <strong>{paymentStatus.email}</strong> within 1 hour.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/919985960692?text=${encodeURIComponent(
                  `Hi Digital Crowd Technologies, I have submitted a milestone payment order of ₹${paymentStatus.amount} for Invoice ${paymentStatus.invoiceId} (Ref: ${paymentStatus.referenceId}). Please confirm payment receipt.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs tracking-wide transition shadow-lg shadow-emerald-500/20"
              >
                <span>Notify Accounts Desk via WhatsApp</span>
                <ArrowRight size={14} />
              </a>

              <button
                type="button"
                onClick={() => setPaymentStatus(null)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition border border-white/10"
              >
                Create Another Payment
              </button>
            </div>
          </div>
        ) : (
          /* Payment Form */
          <div className="p-6 sm:p-10 rounded-3xl glass-card-premium shadow-2xl border border-white/10 space-y-8">
            <form onSubmit={handleInitiatePayment} className="space-y-6">
              
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-300 text-xs sm:text-sm">
                  <AlertCircle size={18} className="shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Milestone Presets */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Select Milestone Tier or Custom Amount
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {milestones.map((m) => {
                    const isSelected = formData.milestoneType === m.label;
                    return (
                      <button
                        key={m.label}
                        type="button"
                        onClick={() => handleMilestoneSelect(m)}
                        className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                          isSelected
                            ? "bg-blue-600/15 border-blue-500 text-white shadow-md shadow-blue-500/10"
                            : "bg-white/[0.02] border-white/10 text-slate-400 hover:bg-white/5 hover:border-white/20"
                        }`}
                      >
                        <span className="text-xs font-semibold block">{m.label}</span>
                        <div className="mt-2 flex items-baseline gap-1">
                          {m.amount ? (
                            <>
                              <span className="text-base font-extrabold text-white">₹{parseInt(m.amount).toLocaleString("en-IN")}</span>
                              <span className="text-[10px] text-slate-400">INR</span>
                            </>
                          ) : (
                            <span className="text-xs text-blue-400 font-semibold">Custom</span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 line-clamp-1 mt-1">{m.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Client & Invoice Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Client Full Name <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    required
                    value={formData.clientName}
                    onChange={handleInputChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Company / Business Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="e.g. Acme Tech Solutions"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Billing Email (for GST Receipt) <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="accounts@yourbusiness.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Contact Phone (WhatsApp) <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Invoice ID / Project Reference <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="invoiceId"
                    required
                    value={formData.invoiceId}
                    onChange={handleInputChange}
                    placeholder="e.g. INV-2026-042 or Project Name"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Payment Amount (INR ₹) <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                    <input
                      type="number"
                      name="amount"
                      min="100"
                      step="1"
                      required
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder="e.g. 4999"
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Legal & Policy Acknowledgement */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-[11px] text-slate-400 space-y-1.5">
                <p>
                  By proceeding, you agree to our{" "}
                  <Link href="/terms-and-conditions" className="text-blue-400 hover:underline">Terms &amp; Conditions</Link>,{" "}
                  <Link href="/refund-policy" className="text-blue-400 hover:underline">Refund Policy</Link>,{" "}
                  <Link href="/cancellation-policy" className="text-blue-400 hover:underline">Cancellation Policy</Link>, and{" "}
                  <Link href="/shipping-policy" className="text-blue-400 hover:underline">Shipping &amp; Delivery Policy</Link>.
                </p>
                <p className="text-slate-500">
                  Payments are processed in Indian Rupees (INR) via RBI-authorized payment aggregators (PhonePe). Zero transaction surcharge is billed to clients for UPI payments.
                </p>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={paymentInitiating}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#2F7DE1] to-[#1E60B8] hover:from-[#3D8CF0] hover:to-[#2F7DE1] text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-500/25 transition active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {paymentInitiating ? (
                  <span>Generating Secure Order...</span>
                ) : (
                  <>
                    <span>Proceed to Secure Pay (₹{formData.amount || "0"})</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* FAQ & Support Help Desk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
            <h3 className="font-bold text-white flex items-center gap-1.5">
              <HelpCircle size={14} className="text-blue-400" />
              <span>Need an Official Tax Invoice First?</span>
            </h3>
            <p className="text-slate-400 leading-relaxed">
              If your finance department requires a GST proforma invoice prior to milestone settlement, email our accounts desk at <a href={`mailto:${COMPANY.email}`} className="text-blue-400 hover:underline">{COMPANY.email}</a>.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
            <h3 className="font-bold text-white flex items-center gap-1.5">
              <Phone size={14} className="text-emerald-400" />
              <span>Direct Bank NEFT / IMPS Available</span>
            </h3>
            <p className="text-slate-400 leading-relaxed">
              For corporate payments exceeding ₹50,000, current account NEFT/RTGS wire details can be requested directly via our accounts manager at {COMPANY.phoneDisplay}.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
