"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  Package,
  Phone,
  Mail,
  RotateCw,
  Clock,
  Tag,
  Ticket,
  Percent,
  Check,
  X,
  Sparkles,
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

  // Offers & Coupons state
  const [availableOffers, setAvailableOffers] = useState([]);
  const [couponInput, setCouponInput] = useState("");
  const [appliedOffer, setAppliedOffer] = useState(null);
  const [discountBreakdown, setDiscountBreakdown] = useState(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  // Checkout flow state
  const [step, setStep] = useState(1); // 1 = Details, 2 = PhonePe Payment
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeOrder, setActiveOrder] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  // Fetch active offers
  useEffect(() => {
    let isMounted = true;
    fetch(`${apiBase}/api/offers/active`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.ok && Array.isArray(data.offers)) {
          setAvailableOffers(data.offers);
        }
      })
      .catch((err) => console.warn("Failed to load active offers:", err.message));

    return () => {
      isMounted = false;
    };
  }, [apiBase]);

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
      const plans =
        Array.isArray(prod.pricingPlans) && prod.pricingPlans.length > 0
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

  // Base raw amount from selected plan
  const originalAmount = selectedPlan?.numericPrice || 9999;

  // Re-validate coupon if plan / amount changes
  useEffect(() => {
    if (appliedOffer && appliedOffer.couponCode) {
      handleValidateCoupon(appliedOffer.couponCode, false);
    }
  }, [selectedPlan?.numericPrice, selectedProduct?.id]);

  // Handle Server-Side Coupon Validation
  const handleValidateCoupon = async (codeToValidate, showSuccessMsg = true) => {
    const code = (codeToValidate || couponInput).trim().toUpperCase();
    if (!code) {
      setCouponError("Please enter a coupon code.");
      return;
    }

    setIsValidatingCoupon(true);
    setCouponError("");
    setCouponSuccess("");

    try {
      const res = await fetch(`${apiBase}/api/offers/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          couponCode: code,
          amount: originalAmount,
          productId: selectedProduct?.id || selectedProduct?.slug,
          customerEmail: customerEmail.trim() || undefined,
          customerPhone: customerPhone.replace(/\D/g, "") || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Invalid or ineligible coupon code.");
      }

      setAppliedOffer(data.offer);
      setDiscountBreakdown(data.breakdown);
      setCouponInput(code);
      if (showSuccessMsg) {
        setCouponSuccess(
          data.breakdown?.savingsText || `Coupon "${code}" applied successfully!`
        );
      }
    } catch (err) {
      setAppliedOffer(null);
      setDiscountBreakdown(null);
      setCouponError(err.message || "Could not apply coupon.");
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  // Remove Applied Coupon
  const handleRemoveCoupon = () => {
    setAppliedOffer(null);
    setDiscountBreakdown(null);
    setCouponInput("");
    setCouponError("");
    setCouponSuccess("");
  };

  // Calculate final payable amount
  const finalPayableAmount = discountBreakdown
    ? discountBreakdown.finalAmount
    : originalAmount;
  const discountAmount = discountBreakdown ? discountBreakdown.discountAmount : 0;

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
      const res = await fetch(`${apiBase}/api/orders/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct?.id || selectedProduct?.slug,
          productTitle: selectedProduct?.title,
          productSlug: selectedProduct?.slug,
          planName: selectedPlan?.name,
          amount: originalAmount,
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim(),
          customerPhone: phoneClean,
          companyName: companyName.trim() || undefined,
          address: address.trim(),
          couponCode: appliedOffer?.couponCode || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Failed to initialize order.");
      }

      setActiveOrder(data.order);
      setPaymentData(data.payment);

      // Direct Automated Redirection to Official PhonePe Gateway
      if (data.payment?.redirectUrl) {
        window.location.href = data.payment.redirectUrl;
        return;
      }

      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setErrorMsg(err.message || "Unable to proceed to payment. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

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
                        Phone / WhatsApp (10 digits) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="9876543210"
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
                      placeholder="e.g. Apex Enterprises Pvt Ltd"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] [html.light_&]:bg-slate-100 border border-white/10 [html.light_&]:border-slate-300 text-sm text-white [html.light_&]:text-slate-900 focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>

                  {/* Complete Billing Address */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider font-mono">
                      Complete Billing Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Flat/Door No., Building, Street, Area, City, State, PIN Code"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] [html.light_&]:bg-slate-100 border border-white/10 [html.light_&]:border-slate-300 text-sm text-white [html.light_&]:text-slate-900 focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>

                  {/* Terms & Policies Checkbox */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-300">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="mt-0.5 rounded border-white/20 bg-white/5 text-blue-600 focus:ring-0"
                      />
                      <span>
                        I acknowledge and agree to the{" "}
                        <Link href="/terms-and-conditions" target="_blank" className="text-blue-400 underline">
                          Terms &amp; Conditions
                        </Link>
                        ,{" "}
                        <Link href="/cancellation-and-refund" target="_blank" className="text-blue-400 underline">
                          Cancellation &amp; Refund Policy
                        </Link>
                        , and{" "}
                        <Link href="/shipping-and-delivery" target="_blank" className="text-blue-400 underline">
                          Electronic Delivery Policy
                        </Link>
                        .
                      </span>
                    </label>
                  </div>

                  {/* Proceed to Payment Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 px-6 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-[#F87000] to-orange-500 hover:from-orange-500 hover:to-orange-600 shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <RotateCw size={18} className="animate-spin" />
                        <span>Initializing PhonePe Session...</span>
                      </>
                    ) : (
                      <>
                        <span>Proceed to Pay ₹{finalPayableAmount.toLocaleString("en-IN")}</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* STEP 2: PHONEPE OFFICIAL PAYMENT GATEWAY SCREEN */
              <div className="p-6 sm:p-8 rounded-3xl glass-card-premium border border-purple-500/30 shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-5 border-b border-purple-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#5F259F]/30 border border-purple-500/40 text-purple-300 flex items-center justify-center font-bold">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">
                        PhonePe Business Gateway
                      </h2>
                      <p className="text-xs text-slate-400">
                        Official PhonePe Merchant Gateway with instant automated verification.
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
                    <span className="text-slate-400 block font-mono">OFFICIAL ORDER REFERENCE:</span>
                    <span className="font-mono font-bold text-white text-sm">
                      {activeOrder?.orderNumber}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block font-mono">PAYABLE AMOUNT:</span>
                    <div className="flex items-baseline gap-2">
                      {discountAmount > 0 && (
                        <span className="text-xs text-slate-400 line-through">
                          ₹{originalAmount.toLocaleString("en-IN")}
                        </span>
                      )}
                      <span className="font-bold text-emerald-400 text-lg">
                        ₹{finalPayableAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 10-Minute Session Notice Banner */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5 text-xs text-slate-300">
                  <Clock size={16} className="text-purple-400 shrink-0" />
                  <span>
                    Payment session is reserved for <strong>10 minutes</strong>. Transaction will be verified automatically upon completion.
                  </span>
                </div>

                {/* PRIMARY OPTION: Official PhonePe Payment Gateway Redirection */}
                {paymentData?.redirectUrl ? (
                  <div className="p-6 rounded-2xl bg-gradient-to-b from-[#5F259F]/20 to-[#0A0D17] border border-purple-500/30 space-y-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold mb-2">
                        <CheckCircle2 size={13} />
                        <span>Instant Automated PhonePe Verification</span>
                      </div>
                      <h3 className="text-base font-bold text-white">
                        Pay Securely with PhonePe
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Complete your payment on PhonePe’s official merchant checkout. Supports all UPI apps (PhonePe, GPay, Paytm, BHIM), Credit &amp; Debit Cards, and 50+ Net Banking options.
                      </p>
                    </div>

                    {/* Supported Methods Badges */}
                    <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-300 pt-1">
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">PhonePe UPI</span>
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">GPay / Paytm / BHIM</span>
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">All Bank Cards</span>
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">50+ Net Banking</span>
                    </div>

                    {/* Big Action Button */}
                    <div className="pt-2">
                      <a
                        href={paymentData.redirectUrl}
                        className="w-full py-4 px-6 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-[#5F259F] to-[#7B2CBF] hover:from-[#521e8a] hover:to-[#6a24a6] shadow-xl shadow-purple-950/60 transition-all inline-flex items-center justify-center gap-3 border border-purple-400/40 group"
                      >
                        <ShieldCheck size={20} className="text-purple-200 group-hover:scale-110 transition-transform" />
                        <span>Proceed to Pay ₹{finalPayableAmount.toLocaleString("en-IN")} on PhonePe</span>
                        <ArrowRight size={18} className="text-purple-200 group-hover:translate-x-1 transition-transform" />
                      </a>
                      <p className="text-[11px] text-center text-slate-400 mt-2">
                        🔒 256-bit encrypted official checkout. No manual UTR entry needed.
                      </p>
                    </div>
                  </div>
                ) : paymentData ? (
                  <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
                      <AlertCircle size={24} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">PhonePe Gateway Not Ready</h3>
                      <p className="text-xs text-amber-200/80 mt-1.5 leading-relaxed max-w-md mx-auto">
                        {paymentData.pgError || "Could not initialize PhonePe Payment Gateway session. Please verify your Merchant Credentials in Admin Settings."}
                      </p>
                    </div>

                    {paymentData.upiUri && (
                      <div className="pt-2 space-y-2">
                        <a
                          href={paymentData.upiUri}
                          className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-950/50 transition-all inline-flex items-center justify-center gap-2"
                        >
                          <ShieldCheck size={18} />
                          <span>Pay ₹{finalPayableAmount.toLocaleString("en-IN")} via PhonePe / UPI App</span>
                        </a>
                        <p className="text-[11px] text-slate-400">
                          Direct payment to verified Business UPI: <span className="font-mono text-purple-300">{paymentData.merchantUpiId || "9985960692@ybl"}</span>
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-3">
                    <RotateCw size={24} className="animate-spin text-purple-400 mx-auto" />
                    <p className="text-sm text-slate-300">
                      Connecting to PhonePe Business Gateway...
                    </p>
                  </div>
                )}

                {/* Back to Step 1 Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-2.5 px-4 rounded-xl text-xs text-slate-400 hover:text-white bg-white/5 border border-white/10 transition cursor-pointer"
                  >
                    ← Edit Customer &amp; Billing Details
                  </button>
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
                  {step === 1 &&
                    Array.isArray(selectedProduct.pricingPlans) &&
                    selectedProduct.pricingPlans.length > 1 && (
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

                  {/* Available Promotional Offers Chips */}
                  {availableOffers.length > 0 && !appliedOffer && step === 1 && (
                    <div className="p-3 rounded-xl bg-orange-500/5 border border-orange-500/20 space-y-2">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#F87000]">
                        <Sparkles size={13} />
                        <span>Available Special Promotions</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {availableOffers.map((off) => {
                          const code = off.couponCode;
                          if (!code) return null;
                          return (
                            <button
                              key={off.id}
                              type="button"
                              onClick={() => handleValidateCoupon(code)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-[#101A2E] text-orange-400 border border-orange-500/30 hover:bg-orange-500/15 hover:border-orange-500/60 transition cursor-pointer"
                              title={`Click to apply ${code}`}
                            >
                              <Ticket size={11} />
                              <span>{code}</span>
                              <span className="text-[10px] text-slate-400 font-sans font-normal">
                                ({off.discountType === "PERCENTAGE" ? `${off.discountValue}% off` : `₹${off.discountValue} off`})
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Apply Coupon Input / Applied Badge (Step 1 only) */}
                  {step === 1 && (
                    <div className="pt-2">
                      {appliedOffer ? (
                        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-emerald-300">
                                  {appliedOffer.couponCode}
                                </span>
                                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                                  APPLIED
                                </span>
                              </div>
                              <p className="text-[11px] text-emerald-400/90 mt-0.5">
                                {discountBreakdown?.savingsText || `Discount: -₹${discountAmount.toLocaleString("en-IN")}`}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveCoupon}
                            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
                            title="Remove coupon"
                          >
                            <X size={15} />
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <label className="block text-[11px] font-mono text-slate-400 uppercase font-semibold">
                            Have a Coupon Code?
                          </label>
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                              <input
                                type="text"
                                placeholder="Enter coupon code"
                                value={couponInput}
                                onChange={(e) => {
                                  setCouponInput(e.target.value.toUpperCase());
                                  setCouponError("");
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleValidateCoupon();
                                  }
                                }}
                                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono uppercase text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleValidateCoupon()}
                              disabled={isValidatingCoupon || !couponInput.trim()}
                              className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition disabled:opacity-50 cursor-pointer"
                            >
                              {isValidatingCoupon ? "Checking..." : "Apply"}
                            </button>
                          </div>

                          {couponError && (
                            <p className="text-[11px] text-rose-400 flex items-center gap-1 pt-0.5">
                              <AlertCircle size={12} className="shrink-0" />
                              <span>{couponError}</span>
                            </p>
                          )}
                          {couponSuccess && (
                            <p className="text-[11px] text-emerald-400 flex items-center gap-1 pt-0.5">
                              <CheckCircle2 size={12} className="shrink-0" />
                              <span>{couponSuccess}</span>
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Pricing Breakdown */}
                  <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">License Subtotal</span>
                      <span className="font-mono">₹{originalAmount.toLocaleString("en-IN")}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400 font-semibold animate-in fade-in">
                        <span className="flex items-center gap-1">
                          <Tag size={12} />
                          <span>Promotional Discount ({appliedOffer?.couponCode})</span>
                        </span>
                        <span className="font-mono">-₹{discountAmount.toLocaleString("en-IN")}</span>
                      </div>
                    )}

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
                        Final Payable Amount
                      </span>
                      <span className="text-[11px] text-emerald-400 font-semibold">
                        One-Time Perpetual Ownership
                      </span>
                    </div>
                    <div className="text-right">
                      {discountAmount > 0 && (
                        <span className="text-xs text-slate-500 line-through block font-mono">
                          ₹{originalAmount.toLocaleString("en-IN")}
                        </span>
                      )}
                      <span className="text-2xl font-extrabold text-[#F87000] font-mono">
                        ₹{finalPayableAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
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
