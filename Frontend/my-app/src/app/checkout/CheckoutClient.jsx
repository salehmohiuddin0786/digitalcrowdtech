"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import QRCode from "qrcode";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ShoppingBag,
  Package,
  Phone,
  Mail,
  QrCode,
  Smartphone,
  ExternalLink,
  RotateCw,
} from "lucide-react";

export default function CheckoutClient({ initialProducts = [] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productSlugParam = searchParams.get("product") || "";
  const planParam = searchParams.get("plan") || "";
  const amountParam = searchParams.get("amount") || "";

  // Selected product
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Form fields
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Checkout flow state
  const [step, setStep] = useState(1); // 1 = Details, 2 = PhonePe UPI Payment
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeOrder, setActiveOrder] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  // Dynamic QR code data URL
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [copiedVpa, setCopiedVpa] = useState(false);

  // UTR submission state
  const [utrNumber, setUtrNumber] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [utrError, setUtrError] = useState("");

  // Initialize selected product and plan
  useEffect(() => {
    let prod = null;
    if (productSlugParam) {
      prod = initialProducts.find(
        (p) => p.slug === productSlugParam || p.id === productSlugParam
      );
    }
    if (!prod && initialProducts.length > 0) {
      prod = initialProducts[0];
    }
    setSelectedProduct(prod);

    if (prod) {
      const plans = Array.isArray(prod.pricingPlans) && prod.pricingPlans.length > 0
        ? prod.pricingPlans
        : [
            { name: "Starter Solution", price: prod.price || "₹9,999", numericPrice: 9999 },
            { name: "Business Growth", price: "₹18,999", numericPrice: 18999, popular: true },
            { name: "Enterprise Custom", price: "₹34,999", numericPrice: 34999 },
          ];

      let matchPlan = null;
      if (planParam) {
        matchPlan = plans.find((pl) => pl.name.toLowerCase() === planParam.toLowerCase());
      }
      if (!matchPlan) {
        matchPlan = plans[0];
      }
      setSelectedPlan(matchPlan);
    }
  }, [productSlugParam, planParam, initialProducts]);

  // Generate dynamic QR code image when payment data arrives
  useEffect(() => {
    if (paymentData && paymentData.upiUri) {
      QRCode.toDataURL(paymentData.upiUri, {
        color: { dark: "#5F259F", light: "#FFFFFF" },
        width: 400,
        margin: 2,
      })
        .then((url) => setQrDataUrl(url))
        .catch(() => setQrDataUrl("/payment/phonepe-business-qr.png"));
    }
  }, [paymentData]);

  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedVpa(true);
      setTimeout(() => setCopiedVpa(false), 2500);
    }
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Validations
    if (!customerName || customerName.trim().length < 3) {
      setErrorMsg("Please enter a valid full name (at least 3 characters).");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail || !emailRegex.test(customerEmail)) {
      setErrorMsg("Please enter a valid email address for delivery confirmation.");
      return;
    }
    const phoneClean = customerPhone.replace(/\D/g, "");
    if (!phoneClean || phoneClean.length < 10) {
      setErrorMsg("Please enter a valid 10-digit Indian phone number.");
      return;
    }
    if (!address || address.trim().length < 5) {
      setErrorMsg("Please enter a complete billing address for invoice generation.");
      return;
    }
    if (!termsAccepted) {
      setErrorMsg("Please accept the Terms & Conditions, Cancellation Policy, and Shipping Policy.");
      return;
    }

    setIsLoading(true);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
      const amount = selectedPlan?.numericPrice || 9999;

      const res = await fetch(`${apiBase}/api/orders/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct?.id || selectedProduct?.slug,
          productTitle: selectedProduct?.title,
          productSlug: selectedProduct?.slug,
          planName: selectedPlan?.name,
          amount,
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim(),
          customerPhone: phoneClean,
          companyName: companyName.trim() || undefined,
          address: address.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Failed to initialize order.");
      }

      setActiveOrder(data.order);
      setPaymentData(data.payment);
      setStep(2); // Advance to PhonePe UPI payment view
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setErrorMsg(err.message || "Unable to proceed to payment. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyPayment = async (e) => {
    e.preventDefault();
    setUtrError("");

    const cleanUtr = utrNumber.trim();
    if (!cleanUtr || cleanUtr.length < 6) {
      setUtrError("Please enter a valid 12-digit UTR or transaction reference number.");
      return;
    }

    setIsVerifying(true);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
      const res = await fetch(`${apiBase}/api/orders/verify-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber: activeOrder?.orderNumber,
          utrNumber: cleanUtr,
          transactionId: cleanUtr,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Verification submission failed.");
      }

      // Success -> Redirect to order confirmation page
      router.push(`/order-confirmation?orderNumber=${encodeURIComponent(activeOrder.orderNumber)}`);
    } catch (err) {
      setUtrError(err.message || "Error submitting payment reference. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const payableAmount = selectedPlan?.numericPrice || 9999;

  return (
    <div className="py-12 md:py-20 bg-transparent text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-mono">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-white transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-slate-200">Checkout</span>
        </nav>

        {/* Page Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3">
            <ShieldCheck size={14} />
            <span>Official PhonePe Business Checkout</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
            Complete Your Purchase
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Direct turnkey software procurement with zero aggregator commissions, instant order generation, and electronic handover.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Customer Form OR PhonePe Payment UI */}
          <div className="lg:col-span-7 space-y-6">
            {step === 1 ? (
              /* STEP 1: CUSTOMER DETAILS FORM */
              <div className="p-6 sm:p-8 rounded-3xl glass-card-premium border border-white/10 [html.light_&]:border-slate-200 shadow-2xl">
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10 [html.light_&]:border-slate-200">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-sm border border-blue-500/30">
                      1
                    </span>
                    <div>
                      <h2 className="text-lg font-bold text-white [html.light_&]:text-[#0A2540]">
                        Customer &amp; Billing Information
                      </h2>
                      <p className="text-xs text-slate-400">
                        Required for tax invoice, license assignment, and handover.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    Step 1 of 2
                  </span>
                </div>

                {errorMsg && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-start gap-2.5">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleCreateOrder} className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider font-mono">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] [html.light_&]:bg-slate-100 border border-white/10 [html.light_&]:border-slate-300 text-sm text-white [html.light_&]:text-slate-900 focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider font-mono">
                        Official Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] [html.light_&]:bg-slate-100 border border-white/10 [html.light_&]:border-slate-300 text-sm text-white [html.light_&]:text-slate-900 focus:outline-none focus:border-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider font-mono">
                        Phone (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] [html.light_&]:bg-slate-100 border border-white/10 [html.light_&]:border-slate-300 text-sm text-white [html.light_&]:text-slate-900 focus:outline-none focus:border-blue-500 transition"
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider font-mono">
                      Company / Organization Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Apex Retail Pvt Ltd"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] [html.light_&]:bg-slate-100 border border-white/10 [html.light_&]:border-slate-300 text-sm text-white [html.light_&]:text-slate-900 focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>

                  {/* Billing Address */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider font-mono">
                      Billing Address *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street, City, State, PIN Code"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] [html.light_&]:bg-slate-100 border border-white/10 [html.light_&]:border-slate-300 text-sm text-white [html.light_&]:text-slate-900 focus:outline-none focus:border-blue-500 transition resize-none"
                    />
                  </div>

                  {/* Terms & Policies Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-[#F87000] focus:ring-0 cursor-pointer"
                      />
                      <span className="text-xs text-slate-400 group-hover:text-slate-300 leading-relaxed">
                        I agree to the{" "}
                        <Link href="/terms-conditions" target="_blank" className="text-blue-400 hover:underline">
                          Terms &amp; Conditions
                        </Link>
                        ,{" "}
                        <Link href="/cancellation-policy" target="_blank" className="text-blue-400 hover:underline">
                          Cancellation Policy
                        </Link>
                        , and{" "}
                        <Link href="/shipping-policy" target="_blank" className="text-blue-400 hover:underline">
                          Shipping &amp; Delivery Policy
                        </Link>
                        . I understand that digital products are delivered electronically with milestone verification.
                      </span>
                    </label>
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#F87000] to-orange-600 hover:from-orange-500 hover:to-orange-600 shadow-xl shadow-orange-500/25 transition-all inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <RotateCw size={16} className="animate-spin" />
                          <span>Generating Secure Order...</span>
                        </>
                      ) : (
                        <>
                          <span>Proceed to PhonePe Payment</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* STEP 2: PHONEPE BUSINESS PAYMENT VIEW */
              <div className="p-6 sm:p-8 rounded-3xl glass-card-premium border-2 border-purple-500/40 shadow-2xl space-y-6 animate-in fade-in duration-300">
                {/* Header */}
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#5F259F]/20 border border-[#5F259F]/40 flex items-center justify-center text-purple-400 font-bold">
                      <QrCode size={20} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">
                        PhonePe Business UPI Payment
                      </h2>
                      <p className="text-xs text-slate-400">
                        Scan the dynamic QR code or use the UPI ID to complete payment.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-purple-300 font-bold bg-[#5F259F]/30 px-3 py-1 rounded-full border border-purple-500/40">
                    Step 2 of 2
                  </span>
                </div>

                {/* Order ID Banner */}
                <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block font-mono">ORDER ID:</span>
                    <span className="font-mono font-bold text-white text-sm">
                      {activeOrder?.orderNumber}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block font-mono">PAYABLE AMOUNT:</span>
                    <span className="font-bold text-emerald-400 text-lg">
                      ₹{payableAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* QR Code Presentation Box */}
                <div className="p-6 rounded-2xl bg-[#07090E] border border-white/10 flex flex-col items-center text-center">
                  <div className="p-3 bg-white rounded-2xl shadow-2xl mb-4 max-w-[260px] aspect-square flex items-center justify-center">
                    {qrDataUrl ? (
                      <img
                        src={qrDataUrl}
                        alt="PhonePe UPI QR Code"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-48 h-48 flex items-center justify-center text-slate-800 text-xs font-mono">
                        Loading QR...
                      </div>
                    )}
                  </div>

                  <span className="text-xs font-semibold text-slate-300 mb-1">
                    Scan with PhonePe, Google Pay, Paytm, or any UPI App
                  </span>
                  <span className="text-[11px] font-mono text-purple-400">
                    Official Merchant: Digital Crowd Technologies
                  </span>

                  {/* Copy UPI ID Bar */}
                  <div className="mt-4 flex items-center gap-2 p-2 px-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="text-xs font-mono text-slate-300">
                      {paymentData?.merchantUpiId || "9985960692@ybl"}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(paymentData?.merchantUpiId || "9985960692@ybl")
                      }
                      className="p-1 rounded text-purple-400 hover:text-purple-300 hover:bg-white/5 transition cursor-pointer"
                      title="Copy UPI ID"
                    >
                      {copiedVpa ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                    {copiedVpa && (
                      <span className="text-[10px] text-emerald-400 font-bold">
                        Copied!
                      </span>
                    )}
                  </div>

                  {/* Mobile Direct UPI Intent Link */}
                  {paymentData?.upiUri && (
                    <div className="mt-4 sm:hidden w-full">
                      <a
                        href={paymentData.upiUri}
                        className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#5F259F] hover:bg-[#722ebc] shadow-lg transition inline-flex items-center justify-center gap-2"
                      >
                        <Smartphone size={15} />
                        <span>Open in PhonePe / UPI App</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  )}
                </div>

                {/* UTR / Transaction Reference Submission Box */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <h3 className="text-sm font-bold text-white">
                      After Payment: Submit 12-Digit UTR / Ref Number
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Once you approve the payment in PhonePe or your UPI app, enter the 12-digit UTR / UPI Reference Number below to initiate immediate automated verification and dispatch.
                  </p>

                  {utrError && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300">
                      {utrError}
                    </div>
                  )}

                  <form onSubmit={handleVerifyPayment} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        required
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        placeholder="Enter 12-digit UPI UTR number (e.g. 432819283741)"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-sm font-mono text-white focus:outline-none focus:border-purple-500 transition"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        disabled={isVerifying}
                        className="flex-1 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 transition-all inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isVerifying ? (
                          <>
                            <RotateCw size={14} className="animate-spin" />
                            <span>Submitting Verification...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 size={16} />
                            <span>Confirm &amp; Complete Order</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="py-3.5 px-4 rounded-xl text-xs text-slate-400 hover:text-white bg-white/5 border border-white/10 transition"
                      >
                        Back
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Order Summary Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-3xl glass-card-premium border border-white/10 [html.light_&]:border-slate-200 shadow-2xl sticky top-24">
              <h2 className="text-base font-bold text-white [html.light_&]:text-[#0A2540] mb-4 pb-3 border-b border-white/10">
                Order Summary
              </h2>

              {selectedProduct ? (
                <div className="space-y-5">
                  {/* Selected Product Snippet */}
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-[#070D18] border border-white/10 overflow-hidden shrink-0">
                      <img
                        src={selectedProduct.imageUrl || `/products/${selectedProduct.slug}-preview.png`}
                        alt={selectedProduct.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#F87000] uppercase tracking-wider block">
                        {selectedProduct.category}
                      </span>
                      <h3 className="text-sm font-bold text-white [html.light_&]:text-[#0A2540] line-clamp-1">
                        {selectedProduct.title}
                      </h3>
                      <span className="text-xs text-slate-400 block mt-0.5">
                        Selected Plan: <strong className="text-blue-400">{selectedPlan?.name}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Plan Switcher if in Step 1 */}
                  {step === 1 && Array.isArray(selectedProduct.pricingPlans) && selectedProduct.pricingPlans.length > 1 && (
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase font-semibold">
                        Change Plan Tier:
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {selectedProduct.pricingPlans.map((pl) => (
                          <button
                            key={pl.name}
                            type="button"
                            onClick={() => setSelectedPlan(pl)}
                            className={`p-2 rounded-lg text-xs font-semibold text-center transition cursor-pointer border ${
                              selectedPlan?.name === pl.name
                                ? "bg-orange-500/20 text-[#F87000] border-orange-500/50"
                                : "bg-white/[0.03] text-slate-400 border-white/5 hover:text-white"
                            }`}
                          >
                            <span className="block truncate text-[11px]">{pl.name.split(" ")[0]}</span>
                            <span className="font-bold text-[11px] block">{pl.price}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pricing Breakdown */}
                  <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">License Subtotal</span>
                      <span className="font-mono">₹{payableAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Setup &amp; Deployment</span>
                      <span className="text-emerald-400 font-semibold font-mono">₹0 (Included)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Aggregator Commission</span>
                      <span className="text-emerald-400 font-semibold font-mono">0% (Zero Cuts)</span>
                    </div>
                  </div>

                  {/* Total Amount Due */}
                  <div className="pt-4 border-t border-white/10 flex items-baseline justify-between">
                    <div>
                      <span className="text-xs uppercase font-mono tracking-wider text-slate-400 block">
                        Total Payable
                      </span>
                      <span className="text-[11px] text-emerald-400 font-semibold">
                        One-Time Perpetual Ownership
                      </span>
                    </div>
                    <span className="text-2xl font-extrabold text-[#F87000] font-mono">
                      ₹{payableAmount.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Security Guarantees */}
                  <div className="pt-4 border-t border-white/5 space-y-2 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                      <span>Full Source Code Repository Handover</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-blue-400 shrink-0" />
                      <span>Staging URL Deployment &amp; Sanity Review</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#F87000] shrink-0" />
                      <span>Verified PhonePe Merchant Payment</span>
                    </div>
                  </div>

                  {/* Customer Help Box */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-slate-400 space-y-1">
                    <span className="font-semibold text-white block">Need Help with Purchase?</span>
                    <p>Contact our Hyderabad team at support@digitalcrowdtech.in or call +91 9985960692.</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">
                  Loading product details...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
