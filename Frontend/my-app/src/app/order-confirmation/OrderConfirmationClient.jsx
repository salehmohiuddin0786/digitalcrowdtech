"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
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
} from "lucide-react";

export default function OrderConfirmationClient() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || searchParams.get("orderId") || "";

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrder = async () => {
    if (!orderNumber) {
      setLoading(false);
      return;
    }

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
      const res = await fetch(`${apiBase}/api/orders/${encodeURIComponent(orderNumber)}`);
      const data = await res.json();

      if (res.ok && data.ok && data.order) {
        setOrder(data.order);
      } else {
        setError(data.message || "Order not found.");
      }
    } catch (e) {
      setError("Unable to retrieve order details. Please verify your order number.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderNumber]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
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

  return (
    <div className="py-12 md:py-20 bg-transparent text-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Receipt Container */}
        <div className="p-8 sm:p-12 rounded-3xl glass-card-premium border border-white/10 [html.light_&]:border-slate-200 shadow-2xl space-y-8">
          {/* Header Status Banner */}
          <div className="text-center pb-8 border-b border-white/10">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
              <CheckCircle2 size={32} />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 mb-3">
              <ShieldCheck size={13} />
              <span>Official Order Reference #{order.orderNumber}</span>
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white [html.light_&]:text-[#0A2540]">
              {isVerified
                ? "Payment Verified & Order Confirmed!"
                : isUnderReview
                ? "Payment Submitted for Verification"
                : "Order Registered Successfully"}
            </h1>

            <p className="mt-2 text-sm text-slate-300 [html.light_&]:text-slate-600 max-w-lg mx-auto">
              {isUnderReview
                ? "Thank you for your purchase. Your payment reference has been recorded and our accounts team is confirming the UTR credit."
                : "Your software deployment request has been logged. Staging credentials and repository access are being prepared."}
            </p>
          </div>

          {/* Status Alert Box */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="text-xs text-slate-400 block font-mono">CURRENT STATUS:</span>
                <span className="text-sm font-bold text-emerald-400 uppercase tracking-wide">
                  {order.paymentStatus === "MANUAL_VERIFICATION"
                    ? "Payment Verification In Progress"
                    : order.paymentStatus}
                </span>
              </div>
            </div>

            {order.utrNumber && (
              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-400 block font-mono">UTR / REF NUMBER:</span>
                <span className="text-xs font-mono font-bold text-white bg-white/5 px-2.5 py-1 rounded">
                  {order.utrNumber}
                </span>
              </div>
            )}
          </div>

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
                <span className="text-lg font-bold font-mono text-[#F87000]">
                  ₹{Number(order.amount).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="pt-3 border-t border-white/5 flex justify-between text-xs text-slate-400">
                <span>Payment Method</span>
                <span className="text-slate-200">PhonePe Business UPI</span>
              </div>

              <div className="flex justify-between text-xs text-slate-400">
                <span>Electronic Delivery</span>
                <span className="text-emerald-400 font-medium">Staging URL &amp; Full Source Code Handover</span>
              </div>

              <div className="flex justify-between text-xs text-slate-400">
                <span>Order Date &amp; Time</span>
                <span className="font-mono text-slate-200">
                  {new Date(order.createdAt).toLocaleString("en-IN")}
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

          {/* What Happens Next Section */}
          <div className="p-6 rounded-2xl bg-blue-950/20 border border-blue-500/20 space-y-3">
            <h3 className="text-xs uppercase font-mono tracking-wider text-blue-400 font-bold">
              What Happens Next (Delivery Workflow)
            </h3>
            <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside leading-relaxed">
              <li>
                <strong>Payment &amp; Bank Settlement:</strong> Our accounts desk verifies the UTR reference with our merchant statement.
              </li>
              <li>
                <strong>Technical Environment Setup:</strong> We provision an isolated staging environment and configure your database parameters.
              </li>
              <li>
                <strong>Handover &amp; Training:</strong> You receive administrative access credentials and source code archive via secure electronic email dispatch.
              </li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition inline-flex items-center gap-2 cursor-pointer"
            >
              <Printer size={14} />
              <span>Print / Save Receipt</span>
            </button>

            <div className="flex items-center gap-3">
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
