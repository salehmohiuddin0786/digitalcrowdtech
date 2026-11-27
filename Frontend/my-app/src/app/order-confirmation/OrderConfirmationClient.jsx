"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Printer,
  ArrowRight,
  ShieldCheck,
  Package,
  Phone,
  Mail,
  AlertCircle,
  RotateCw,
  ExternalLink,
  MessageCircle,
  Tag,
  Ticket,
  Download,
} from "lucide-react";

export default function OrderConfirmationClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || searchParams.get("orderId") || "";

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [pollCount, setPollCount] = useState(0);

  // 10-Minute Retry Window & Actions
  const [timeLeft, setTimeLeft] = useState(600);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryError, setRetryError] = useState("");

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const fetchOrderAndVerify = async (manual = false) => {
    if (!orderNumber) {
      setLoading(false);
      return;
    }

    if (manual) setIsCheckingStatus(true);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
      // First attempt to query the real-time PhonePe status endpoint which initiates auto-verification
      const statusRes = await fetch(`${apiBase}/api/payment/phonepe/status/${encodeURIComponent(orderNumber)}`);
      const statusData = await statusRes.json();

      if (statusRes.ok && statusData.ok && statusData.order) {
        setOrder(statusData.order);
        setError("");
        return statusData.order;
      } else {
        // Fallback to standard order lookup
        const fallbackRes = await fetch(`${apiBase}/api/orders/${encodeURIComponent(orderNumber)}`);
        const fallbackData = await fallbackRes.json();
        if (fallbackRes.ok && fallbackData.ok && fallbackData.order) {
          setOrder(fallbackData.order);
          setError("");
          return fallbackData.order;
        } else {
          setError(fallbackData.message || "Order not found.");
        }
      }
    } catch (e) {
      setError("Unable to retrieve order details. Please verify your order number.");
    } finally {
      setLoading(false);
      if (manual) setIsCheckingStatus(false);
    }
    return null;
  };

  useEffect(() => {
    fetchOrderAndVerify();
  }, [orderNumber]);

  // Automated polling if status is PENDING (stops immediately on COMPLETED, FAILED, EXPIRED, CANCELLED)
  useEffect(() => {
    let timer = null;
    if (order && order.paymentStatus === "PENDING" && pollCount < 5) {
      timer = setTimeout(async () => {
        setPollCount((prev) => prev + 1);
        const updated = await fetchOrderAndVerify();
        if (
          updated &&
          (updated.paymentStatus === "COMPLETED" ||
            updated.paymentStatus === "FAILED" ||
            updated.paymentStatus === "EXPIRED" ||
            updated.paymentStatus === "CANCELLED")
        ) {
          clearTimeout(timer);
        }
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [order, pollCount]);

  // 10-Minute Retry Window Countdown
  useEffect(() => {
    if (!order) return;
    const isUnsuccessful =
      order.paymentStatus === "FAILED" ||
      order.paymentStatus === "EXPIRED" ||
      order.paymentStatus === "TIMED_OUT" ||
      order.paymentStatus === "CANCELLED" ||
      order.paymentStatus === "USER_DROPPED";

    if (!isUnsuccessful) return;

    // 10-minute window from the latest status update or order creation
    const baseTime = order.updatedAt ? new Date(order.updatedAt).getTime() : Date.now();
    const expiryTime = baseTime + 10 * 60 * 1000;

    const tick = () => {
      const remaining = Math.max(0, Math.floor((expiryTime - Date.now()) / 1000));
      setTimeLeft(remaining);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [order]);

  // 1-Click Automated PhonePe Retry
  const handleRetryPayment = async () => {
    if (!order) return;
    setIsRetrying(true);
    setRetryError("");

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
      const res = await fetch(
        `${apiBase}/api/payment/phonepe/retry/${encodeURIComponent(order.orderNumber)}`,
        { method: "POST" }
      );
      const data = await res.json();
      if (res.ok && data.ok && data.payment?.redirectUrl) {
        window.location.href = data.payment.redirectUrl;
        return;
      }
      // Fallback: route to checkout
      router.push(
        `/checkout?product=${encodeURIComponent(
          order.productSlug || order.productId || ""
        )}&plan=${encodeURIComponent(order.planName || "")}`
      );
    } catch {
      router.push(
        `/checkout?product=${encodeURIComponent(
          order.productSlug || order.productId || ""
        )}&plan=${encodeURIComponent(order.planName || "")}`
      );
    } finally {
      setIsRetrying(false);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleDownloadPdfReceipt = () => {
    if (!order) return;
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
    const downloadUrl = `${apiBase}/api/receipts/download/${encodeURIComponent(
      order.orderNumber
    )}?email=${encodeURIComponent(order.customerEmail)}`;
    window.open(downloadUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="py-28 text-center text-slate-400 font-mono text-sm">
        <RotateCw size={24} className="animate-spin mx-auto mb-3 text-blue-400" />
        <span>Loading verified order details...</span>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="py-20 max-w-xl mx-auto px-4 text-center">
        <div className="p-8 rounded-3xl glass-card-premium border border-white/10 shadow-2xl">
          <AlertCircle size={40} className="mx-auto text-amber-400 mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">Order Notice</h1>
          <p className="text-sm text-slate-300 mb-6">
            {error || "No active order reference was provided in the URL."}
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/products"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition"
            >
              Browse Products
            </Link>
            <Link
              href="/"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isVerified = order.paymentStatus === "COMPLETED";
  const isUnderReview = order.paymentStatus === "MANUAL_VERIFICATION";
  const isFailed = order.paymentStatus === "FAILED";
  const isExpired = order.paymentStatus === "EXPIRED" || order.paymentStatus === "TIMED_OUT";
  const isCancelled = order.paymentStatus === "CANCELLED" || order.paymentStatus === "USER_DROPPED";
  const isUnsuccessful = isFailed || isExpired || isCancelled;

  return (
    <div className="py-12 md:py-20 bg-transparent text-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Receipt Container */}
        <div className="p-8 sm:p-12 rounded-3xl glass-card-premium border border-white/10 [html.light_&]:border-slate-200 shadow-2xl space-y-8">
          {/* Header Status Banner */}
          <div className="text-center pb-8 border-b border-white/10">
            {isVerified ? (
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                <CheckCircle2 size={32} />
              </div>
            ) : isFailed ? (
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto mb-4">
                <XCircle size={32} />
              </div>
            ) : isExpired ? (
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-4">
                <Clock size={32} />
              </div>
            ) : isCancelled ? (
              <div className="w-16 h-16 rounded-2xl bg-slate-500/10 border border-slate-500/30 flex items-center justify-center text-slate-400 mx-auto mb-4">
                <AlertCircle size={32} />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto mb-4">
                <RotateCw size={32} className="animate-spin" />
              </div>
            )}

            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border mb-3 ${
                isVerified
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                  : isFailed
                  ? "bg-red-500/10 text-red-400 border-red-500/25"
                  : isExpired
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/25"
                  : "bg-blue-500/10 text-blue-400 border-blue-500/25"
              }`}
            >
              <ShieldCheck size={13} />
              <span>Official Order Reference #{order.orderNumber}</span>
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
              {isVerified
                ? "Payment Verified & Order Confirmed!"
                : isFailed
                ? "Payment Failed / Declined"
                : isExpired
                ? "Payment Session Expired"
                : isCancelled
                ? "Payment Cancelled"
                : isUnderReview
                ? "Payment Submitted for Verification"
                : "Payment Processing / Awaiting Confirmation"}
            </h1>

            <p className="mt-2 text-sm text-slate-300 [html.light_&]:text-slate-600 max-w-lg mx-auto leading-relaxed">
              {isVerified
                ? "Your transaction has been confirmed automatically via PhonePe Business Gateway. Our technical engineering team is provisioning your staging environment."
                : isFailed
                ? order.failureReason
                  ? `PhonePe reported: "${order.failureReason}". Your bank account was not charged. You can retry with another UPI app, card, or net banking below.`
                  : "The transaction was declined by your bank or UPI provider. Your account was not charged. You can retry immediately."
                : isExpired
                ? "The PhonePe payment session has timed out. For security, payment sessions expire automatically after 10 minutes."
                : isCancelled
                ? "The payment session was cancelled. You can retry anytime or choose an alternative payment option."
                : isUnderReview
                ? "Thank you for your purchase. Your payment reference has been recorded and our accounts team is confirming the UTR credit."
                : "Awaiting payment settlement from PhonePe. If you completed payment, click 'Check Payment Status' below."}
            </p>
          </div>

          {/* Status Alert Box */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                className={`w-3 h-3 rounded-full ${
                  isVerified
                    ? "bg-emerald-400"
                    : isFailed
                    ? "bg-red-500"
                    : isExpired
                    ? "bg-amber-400"
                    : isCancelled
                    ? "bg-slate-400"
                    : isUnderReview
                    ? "bg-amber-400 animate-pulse"
                    : "bg-blue-400 animate-pulse"
                }`}
              />
              <div>
                <span className="text-xs text-slate-400 block font-mono">PAYMENT STATUS:</span>
                <span
                  className={`text-sm font-bold uppercase tracking-wide ${
                    isVerified
                      ? "text-emerald-400"
                      : isFailed
                      ? "text-red-400"
                      : isExpired
                      ? "text-amber-400"
                      : isCancelled
                      ? "text-slate-400"
                      : isUnderReview
                      ? "text-amber-400"
                      : "text-blue-400"
                  }`}
                >
                  {isVerified
                    ? "✓ COMPLETED (PhonePe Verified)"
                    : isFailed
                    ? "✕ PAYMENT FAILED"
                    : isExpired
                    ? "⏱ SESSION EXPIRED"
                    : isCancelled
                    ? "CANCELLED"
                    : isUnderReview
                    ? "Verification In Progress"
                    : "Awaiting Confirmation"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {!isVerified && !isUnsuccessful && (
                <button
                  type="button"
                  onClick={() => fetchOrderAndVerify(true)}
                  disabled={isCheckingStatus}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 shadow transition inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RotateCw size={12} className={isCheckingStatus ? "animate-spin" : ""} />
                  <span>{isCheckingStatus ? "Checking PhonePe..." : "Check Payment Status"}</span>
                </button>
              )}

              {order.failureReason && (
                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-400 block font-mono">REASON:</span>
                  <span className="text-xs font-mono font-bold text-red-300 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded">
                    {order.failureReason}
                  </span>
                </div>
              )}

              {order.transactionId && (
                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-400 block font-mono">PHONEPE TXN ID:</span>
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${
                      isVerified
                        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                        : "text-slate-300 bg-white/5 border-white/10"
                    }`}
                  >
                    {order.transactionId}
                  </span>
                </div>
              )}

              {order.utrNumber && !order.transactionId && (
                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-400 block font-mono">UTR / REF:</span>
                  <span className="text-xs font-mono font-bold text-white bg-white/5 px-2.5 py-1 rounded">
                    {order.utrNumber}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Prominent Retry & New Payment Options for Failed or Expired Payments */}
          {isUnsuccessful && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-[#130d1e] to-black/40 border border-red-500/30 [html.light_&]:from-orange-50 [html.light_&]:via-amber-50/60 [html.light_&]:to-white [html.light_&]:border-orange-200 shadow-lg space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10 [html.light_&]:border-orange-200">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={18} className="text-orange-400 [html.light_&]:text-orange-600 shrink-0" />
                  <h3 className="text-sm font-bold text-white [html.light_&]:text-[#0A2540]">
                    {isExpired ? "Payment Session Expired" : "Payment Not Completed – Retry Window Active"}
                  </h3>
                </div>

                {/* Live 10-Minute Countdown Timer Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-orange-500/10 border border-orange-500/30 text-orange-300 [html.light_&]:bg-orange-100 [html.light_&]:border-orange-300 [html.light_&]:text-orange-900 shadow-xs">
                  <Clock size={13} className={timeLeft > 0 ? "animate-pulse" : ""} />
                  <span>
                    {timeLeft > 0
                      ? `10-Min Retry Window: ${formatTimer(timeLeft)} left`
                      : "Retry Window Expired"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="text-xs text-slate-300 [html.light_&]:text-slate-700 leading-relaxed max-w-xl">
                  {order.failureReason ? (
                    <span className="block mb-1">
                      <strong className="text-red-400 [html.light_&]:text-red-600 font-bold">Reason:</strong>{" "}
                      <span className="font-medium">{order.failureReason}</span>. Your account was not charged.
                    </span>
                  ) : null}
                  <span>
                    {timeLeft > 0
                      ? "You have a 10-minute validity window to complete this transaction via PhonePe. You can also start a fresh checkout with new details anytime."
                      : "The initial 10-minute window has elapsed. You can retry with PhonePe or start a fresh checkout below."}
                  </span>
                </div>

                {/* Two Action Buttons: 1) Retry Payment, 2) Try New Payment */}
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0">
                  <button
                    type="button"
                    onClick={handleRetryPayment}
                    disabled={isRetrying}
                    className="flex-1 sm:flex-none py-3 px-5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#F87000] to-orange-600 hover:from-orange-500 hover:to-orange-600 shadow-lg shadow-orange-500/25 transition inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <RotateCw size={15} className={isRetrying ? "animate-spin" : ""} />
                    <span>{isRetrying ? "Launching PhonePe..." : "Retry Payment (PhonePe)"}</span>
                  </button>

                  <Link
                    href={`/checkout?product=${encodeURIComponent(
                      order.productSlug || order.productId || ""
                    )}&plan=${encodeURIComponent(order.planName || "")}`}
                    className="flex-1 sm:flex-none py-3 px-5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 [html.light_&]:text-slate-800 bg-white/10 hover:bg-white/20 [html.light_&]:bg-white [html.light_&]:hover:bg-slate-100 border border-white/15 [html.light_&]:border-slate-300 shadow-sm transition inline-flex items-center justify-center gap-2"
                  >
                    <ArrowRight size={14} />
                    <span>Try New Payment</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Itemized Order Details */}
          <div>
            <h2 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold mb-4">
              Purchased Product Details
            </h2>

            <div className="p-5 rounded-2xl bg-black/20 border border-white/5 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <div>
                  <h3 className="font-bold text-white">{order.productTitle}</h3>
                  <span className="text-xs text-blue-400 font-mono">
                    Plan: {order.planName}
                  </span>
                </div>
                <div className="text-right">
                  {order.discountAmount > 0 && (
                    <span className="text-xs text-slate-400 line-through block font-mono">
                      ₹{Number(order.originalAmount || order.amount).toLocaleString("en-IN")}
                    </span>
                  )}
                  <span className="text-lg font-bold font-mono text-[#F87000]">
                    ₹{Number(order.amount).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {order.discountAmount > 0 && (
                <div className="pt-2 border-t border-white/5 flex justify-between text-xs text-emerald-400 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Tag size={13} />
                    <span>Promotional Discount {order.couponCode ? `(${order.couponCode})` : ""}</span>
                  </span>
                  <span className="font-mono">-₹{Number(order.discountAmount).toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="pt-3 border-t border-white/5 flex justify-between text-xs text-slate-400">
                <span>Payment Method</span>
                <span className="text-slate-200">PhonePe Business Gateway</span>
              </div>

              <div className="flex justify-between text-xs text-slate-400">
                <span>Electronic Delivery</span>
                <span className="text-emerald-400 font-medium">Staging URL &amp; Full Source Code Handover</span>
              </div>

              <div className="flex justify-between text-xs text-slate-400">
                <span>Order Date &amp; Time</span>
                <span className="font-mono text-slate-200">
                  {order.createdAt ? new Date(order.createdAt).toLocaleString("en-IN") : "Just now"}
                </span>
              </div>
            </div>
          </div>

          {/* Customer & Billing Details */}
          <div>
            <h2 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold mb-4">
              Customer &amp; Invoicing Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-slate-400 block mb-1">CLIENT NAME</span>
                <span className="font-bold text-white">{order.customerName}</span>
                {order.companyName && (
                  <span className="text-slate-400 block mt-0.5">{order.companyName}</span>
                )}
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-slate-400 block mb-1">CONTACT CHANNELS</span>
                <span className="text-slate-200 block">{order.customerEmail}</span>
                <span className="text-slate-200 block">{order.customerPhone}</span>
              </div>
            </div>
          </div>

          {/* Next Steps / Troubleshooting Section */}
          <div
            className={`p-6 rounded-2xl border space-y-3 ${
              isUnsuccessful
                ? "bg-amber-950/20 border-amber-500/20"
                : "bg-blue-950/20 border-blue-500/20"
            }`}
          >
            <h3
              className={`text-xs uppercase font-mono tracking-wider font-bold ${
                isUnsuccessful ? "text-amber-400" : "text-blue-400"
              }`}
            >
              {isUnsuccessful ? "Troubleshooting & Next Steps" : "What Happens Next (Delivery Workflow)"}
            </h3>
            {isUnsuccessful ? (
              <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside leading-relaxed">
                <li>
                  <strong>Bank Reversals:</strong> If any amount was debited by your bank during this failed transaction, standard UPI protocols mandate an automatic refund to your source account within 2-3 business days.
                </li>
                <li>
                  <strong>Alternative Payment:</strong> You can click "Retry Payment" to use PhonePe Net Banking, Debit/Credit Card, or direct merchant UPI transfer.
                </li>
                <li>
                  <strong>Dedicated Support:</strong> If you face repeated issues, contact our Hyderabad accounts desk directly at support@digitalcrowdtech.in or WhatsApp +91 9985960692.
                </li>
              </ol>
            ) : (
              <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside leading-relaxed">
                <li>
                  <strong>Payment &amp; Bank Settlement:</strong> Our accounts desk verifies the PhonePe credit on our merchant statement.
                </li>
                <li>
                  <strong>Technical Environment Setup:</strong> We provision an isolated staging environment and configure your database parameters.
                </li>
                <li>
                  <strong>Handover &amp; Training:</strong> You receive administrative access credentials and source code archive via secure electronic email dispatch.
                </li>
              </ol>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
            {isVerified && (
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadPdfReceipt}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md transition inline-flex items-center gap-2 cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download PDF Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition inline-flex items-center gap-2 cursor-pointer"
                >
                  <Printer size={14} />
                  <span>Print Receipt</span>
                </button>
              </div>
            )}

            {isUnsuccessful && (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleRetryPayment}
                  disabled={isRetrying}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#F87000] to-orange-600 hover:from-orange-500 hover:to-orange-600 shadow-md transition inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RotateCw size={13} className={isRetrying ? "animate-spin" : ""} />
                  <span>{isRetrying ? "Connecting..." : "Retry Payment"}</span>
                </button>
                <Link
                  href={`/checkout?product=${encodeURIComponent(
                    order.productSlug || order.productId || ""
                  )}&plan=${encodeURIComponent(order.planName || "")}`}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/10 transition inline-flex items-center gap-1.5"
                >
                  <span>Try New Payment</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/919985960692?text=${encodeURIComponent(
                  `Hi Digital Crowd Tech, regarding order ${order.orderNumber} (${
                    order.paymentStatus === "COMPLETED" ? "Confirmed" : "Failed/Need Help"
                  }).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition inline-flex items-center gap-1.5"
              >
                <MessageCircle size={14} />
                <span>WhatsApp Help</span>
              </a>

              <Link
                href="/products"
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition"
              >
                Explore More Products
              </Link>

              <Link
                href="/"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md transition inline-flex items-center gap-1.5"
              >
                <span>Go to Homepage</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Footer Contact Reminder */}
          <div className="text-center pt-4 border-t border-white/5 text-xs text-slate-400">
            Digital Crowd Tech Support:{" "}
            <a href="mailto:support@digitalcrowdtech.in" className="text-blue-400 underline">
              support@digitalcrowdtech.in
            </a>{" "}
            | +91 9985960692
          </div>
        </div>
      </div>
    </div>
  );
}
