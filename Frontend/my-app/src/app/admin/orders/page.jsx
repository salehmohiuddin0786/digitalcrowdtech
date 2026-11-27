"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Search,
  Filter,
  RefreshCw,
  Eye,
  CheckCircle2,
  Clock,
  X,
  Copy,
  Check,
  AlertCircle,
  ShieldCheck,
  QrCode,
  DollarSign,
  FileText,
  User,
  Phone,
  Mail,
  Building,
  RotateCw,
  Download,
  Send,
  FileCheck,
} from "lucide-react";
import AdminLayout from "../AdminLayout";
import {
  getAdminOrders,
  updateOrderStatus,
  getAdminPaymentSettings,
  updateAdminPaymentSettings,
  verifyAdmin,
  getAdminReceipts,
  downloadAdminReceiptPdf,
  resendAdminReceipt,
  regenerateAdminReceipt,
} from "../adminData";

const formatDate = (value) => {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const statusStyles = {
  PENDING: "bg-blue-500/10 text-blue-400 border-blue-500/25",
  MANUAL_VERIFICATION: "bg-amber-500/15 text-amber-300 border-amber-500/30 animate-pulse",
  COMPLETED: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  FAILED: "bg-red-500/15 text-red-300 border-red-500/30",
  CANCELLED: "bg-slate-500/15 text-slate-400 border-slate-500/30",
};

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewingOrder, setViewingOrder] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [copiedText, setCopiedText] = useState("");

  // Receipt management state
  const [orderReceipt, setOrderReceipt] = useState(null);
  const [receiptLoading, setReceiptLoading] = useState(false);
  const [receiptActionLoading, setReceiptActionLoading] = useState(false);

  // Payment settings state
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [paymentSettings, setPaymentSettings] = useState(null);
  const [merchantUpiId, setMerchantUpiId] = useState("9985960692@ybl");
  const [merchantName, setMerchantName] = useState("Digital Crowd Technologies");
  const [settingsSaving, setSettingsSaving] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const isAuthed = await verifyAdmin();
      if (!isAuthed) {
        router.replace("/admin");
        return;
      }

      const [orderItems, settings] = await Promise.all([
        getAdminOrders(),
        getAdminPaymentSettings(),
      ]);

      setOrders(Array.isArray(orderItems) ? orderItems : []);
      if (settings) {
        setPaymentSettings(settings);
        setMerchantUpiId(settings.merchantUpiId || "9985960692@ybl");
        setMerchantName(settings.merchantName || "Digital Crowd Technologies");
      }
    } catch (err) {
      setMessage(err.message || "Unable to load orders data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const copyText = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(""), 2000);
    }
  };

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const matchSearch =
        search === "" ||
        (ord.orderNumber || "").toLowerCase().includes(search.toLowerCase()) ||
        (ord.customerName || "").toLowerCase().includes(search.toLowerCase()) ||
        (ord.customerEmail || "").toLowerCase().includes(search.toLowerCase()) ||
        (ord.productTitle || "").toLowerCase().includes(search.toLowerCase()) ||
        (ord.utrNumber || "").toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "All" || ord.paymentStatus === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [orders, search, statusFilter]);

  const fetchReceiptForOrder = async (orderNumber) => {
    setReceiptLoading(true);
    setOrderReceipt(null);
    try {
      const res = await getAdminReceipts({ search: orderNumber, limit: 1 });
      if (res && res.receipts && res.receipts.length > 0) {
        setOrderReceipt(res.receipts[0]);
      }
    } catch (e) {
      console.warn("Could not load receipt for order:", e.message);
    } finally {
      setReceiptLoading(false);
    }
  };

  const handleOpenDetail = (ord) => {
    setViewingOrder(ord);
    setAdminNotes(ord.adminNotes || "");
    fetchReceiptForOrder(ord.orderNumber);
  };

  const handleDownloadReceipt = async () => {
    if (!orderReceipt) return;
    try {
      await downloadAdminReceiptPdf(
        orderReceipt.id,
        orderReceipt.pdfFilename || `Receipt-${orderReceipt.receiptNumber}.pdf`
      );
    } catch (e) {
      alert(e.message || "Failed to download receipt PDF");
    }
  };

  const handleResendReceiptEmail = async (type) => {
    if (!orderReceipt) return;
    setReceiptActionLoading(true);
    try {
      const res = await resendAdminReceipt(orderReceipt.id, type);
      if (res.ok && res.receipt) {
        setOrderReceipt(res.receipt);
        setMessage(`Receipt email resent to ${type} successfully.`);
      }
    } catch (e) {
      alert(e.message || `Failed to resend receipt to ${type}`);
    } finally {
      setReceiptActionLoading(false);
    }
  };

  const handleRegeneratePdf = async () => {
    if (!orderReceipt) return;
    setReceiptActionLoading(true);
    try {
      const res = await regenerateAdminReceipt(orderReceipt.id);
      if (res.ok && res.receipt) {
        setOrderReceipt(res.receipt);
        setMessage("Receipt PDF regenerated successfully.");
      }
    } catch (e) {
      alert(e.message || "Failed to regenerate receipt PDF");
    } finally {
      setReceiptActionLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!viewingOrder) return;
    setIsUpdating(true);

    try {
      const res = await updateOrderStatus(viewingOrder.id, newStatus, adminNotes);
      if (res.ok && res.order) {
        setOrders((prev) =>
          prev.map((o) => (o.id === viewingOrder.id ? { ...o, ...res.order } : o))
        );
        setViewingOrder((prev) => ({ ...prev, ...res.order }));
        setMessage(`Order ${viewingOrder.orderNumber} updated to ${newStatus}`);
      }
    } catch (err) {
      alert(err.message || "Failed to update order status");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSettingsSaving(true);
    try {
      const res = await updateAdminPaymentSettings({
        merchantUpiId,
        merchantName,
      });
      if (res.ok) {
        setPaymentSettings(res.settings);
        setShowSettingsModal(false);
        setMessage("PhonePe Business payment settings updated successfully.");
      }
    } catch (err) {
      alert(err.message || "Failed to save payment settings.");
    } finally {
      setSettingsSaving(false);
    }
  };

  const pendingVerificationCount = orders.filter(
    (o) => o.paymentStatus === "MANUAL_VERIFICATION"
  ).length;

  return (
    <AdminLayout>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F87000]" />
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Customer Orders &amp; PhonePe Payments
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Audit incoming digital product orders, verify 12-digit UTR credits, and authorize software handover.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowSettingsModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer"
            >
              <QrCode size={14} className="text-purple-400" />
              <span>Payment Settings</span>
            </button>

            <button
              onClick={loadData}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {message && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-300 flex items-center justify-between">
            <span>{message}</span>
            <button onClick={() => setMessage("")} className="text-emerald-400 hover:text-white">
              <X size={14} />
            </button>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order #, client, UTR..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {["All", "MANUAL_VERIFICATION", "PENDING", "COMPLETED", "FAILED"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 cursor-pointer ${
                  statusFilter === st
                    ? "bg-[#F87000] text-white"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{st === "MANUAL_VERIFICATION" ? "In Verification" : st}</span>
                {st === "MANUAL_VERIFICATION" && pendingVerificationCount > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-white text-orange-600">
                    {pendingVerificationCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="rounded-2xl border border-white/10 bg-[#0E1726]/80 overflow-hidden shadow-2xl">
          {isLoading ? (
            <div className="py-24 text-center text-slate-400 font-mono text-xs">
              <RotateCw size={24} className="animate-spin mx-auto mb-2 text-blue-400" />
              <span>Loading customer orders...</span>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-20 text-center text-slate-400 text-xs">
              No orders matched your search criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                    <th className="py-3.5 px-4">Order ID &amp; Date</th>
                    <th className="py-3.5 px-4">Product &amp; Plan</th>
                    <th className="py-3.5 px-4">Customer</th>
                    <th className="py-3.5 px-4">Amount</th>
                    <th className="py-3.5 px-4">UTR Reference</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {filteredOrders.map((ord) => {
                    const statusClass = statusStyles[ord.paymentStatus] || "bg-white/5 text-slate-300";

                    return (
                      <tr key={ord.id} className="hover:bg-white/[0.02] transition">
                        {/* Order ID & Date */}
                        <td className="py-3.5 px-4 font-mono">
                          <span className="font-bold text-white block">
                            {ord.orderNumber}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {formatDate(ord.createdAt)}
                          </span>
                        </td>

                        {/* Product & Plan */}
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-white block truncate max-w-[200px]">
                            {ord.productTitle}
                          </span>
                          <span className="text-[11px] text-blue-400 font-mono">
                            {ord.planName}
                          </span>
                        </td>

                        {/* Customer */}
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-white block">
                            {ord.customerName}
                          </span>
                          <span className="text-[11px] text-slate-400 block truncate max-w-[180px]">
                            {ord.customerEmail}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {ord.customerPhone}
                          </span>
                        </td>

                        {/* Amount */}
                        <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                          ₹{Number(ord.amount).toLocaleString("en-IN")}
                        </td>

                        {/* UTR */}
                        <td className="py-3.5 px-4 font-mono">
                          {ord.utrNumber ? (
                            <div className="flex items-center gap-1.5">
                              <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[11px] font-bold">
                                {ord.utrNumber}
                              </span>
                              <button
                                onClick={() => copyText(ord.utrNumber)}
                                className="text-slate-400 hover:text-white"
                                title="Copy UTR"
                              >
                                {copiedText === ord.utrNumber ? (
                                  <Check size={12} className="text-emerald-400" />
                                ) : (
                                  <Copy size={12} />
                                )}
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-600 italic text-[11px]">Pending UTR</span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase border ${statusClass}`}
                          >
                            <span>{ord.paymentStatus}</span>
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleOpenDetail(ord)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Eye size={12} />
                            <span>Inspect</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ORDER DETAIL MODAL */}
        {viewingOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl bg-[#0D1524] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-orange-500/20 text-[#F87000] flex items-center justify-center font-bold">
                    <ShoppingBag size={16} />
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-white">
                      Order #{viewingOrder.orderNumber}
                    </h2>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Created: {formatDate(viewingOrder.createdAt)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setViewingOrder(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Status and Action Ribbon */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    CURRENT PAYMENT STATUS
                  </span>
                  <span className="text-sm font-bold text-white">
                    {viewingOrder.paymentStatus}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus("COMPLETED")}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={13} />
                    <span>Mark Verified</span>
                  </button>

                  <button
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus("FAILED")}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-300 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 transition cursor-pointer disabled:opacity-50"
                  >
                    Mark Failed
                  </button>

                  <button
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus("CANCELLED")}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 bg-white/5 hover:bg-white/10 transition cursor-pointer disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Financial & UTR Summary */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-slate-400 block mb-1 font-mono">PAYABLE AMOUNT</span>
                  <span className="text-xl font-bold font-mono text-emerald-400">
                    ₹{Number(viewingOrder.amount).toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    PhonePe UPI Payment
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-slate-400 block mb-1 font-mono">UTR REFERENCE #</span>
                  <span className="text-sm font-bold font-mono text-purple-300">
                    {viewingOrder.utrNumber || "Not submitted yet"}
                  </span>
                  {viewingOrder.utrNumber && (
                    <button
                      onClick={() => copyText(viewingOrder.utrNumber)}
                      className="text-[10px] text-blue-400 hover:underline block mt-1"
                    >
                      Copy Reference Number
                    </button>
                  )}
                </div>
              </div>

              {/* Customer Information Box */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
                <span className="font-mono text-slate-400 uppercase font-semibold block mb-2">
                  Customer &amp; Billing Details:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                  <div><strong>Name:</strong> {viewingOrder.customerName}</div>
                  <div><strong>Email:</strong> {viewingOrder.customerEmail}</div>
                  <div><strong>Phone:</strong> {viewingOrder.customerPhone}</div>
                  <div><strong>Company:</strong> {viewingOrder.companyName || "N/A"}</div>
                </div>
                {viewingOrder.address && (
                  <div className="pt-2 text-slate-400 text-[11px] border-t border-white/5">
                    <strong>Address:</strong> {viewingOrder.address}
                  </div>
                )}
              </div>

              {/* Payment Receipt & Automated Email Card */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-blue-500/20 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCheck className="text-blue-400" size={16} />
                    <span className="font-mono text-white font-bold uppercase tracking-wider text-[11px]">
                      Automated Receipt &amp; Email System
                    </span>
                  </div>
                  {orderReceipt && (
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {orderReceipt.receiptNumber}
                    </span>
                  )}
                </div>

                {receiptLoading ? (
                  <div className="py-2 text-slate-400 font-mono text-[11px] flex items-center gap-2">
                    <RotateCw className="animate-spin text-blue-400" size={12} />
                    <span>Checking receipt status...</span>
                  </div>
                ) : orderReceipt ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                      <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
                        <span className="text-slate-500 block text-[10px] uppercase font-mono">PDF STATUS</span>
                        <span className={`font-semibold ${orderReceipt.status === 'GENERATED' ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {orderReceipt.status}
                        </span>
                      </div>
                      <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
                        <span className="text-slate-500 block text-[10px] uppercase font-mono">CUSTOMER EMAIL</span>
                        <span className={`font-semibold ${orderReceipt.customerEmailStatus === 'SENT' ? 'text-emerald-400' : orderReceipt.customerEmailStatus === 'FAILED' ? 'text-red-400' : 'text-slate-400'}`}>
                          {orderReceipt.customerEmailStatus}
                        </span>
                      </div>
                      <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
                        <span className="text-slate-500 block text-[10px] uppercase font-mono">ADMIN NOTIFICATION</span>
                        <span className={`font-semibold ${orderReceipt.adminEmailStatus === 'SENT' ? 'text-emerald-400' : orderReceipt.adminEmailStatus === 'FAILED' ? 'text-red-400' : 'text-slate-400'}`}>
                          {orderReceipt.adminEmailStatus}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        onClick={handleDownloadReceipt}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <Download size={13} />
                        <span>Download PDF Receipt</span>
                      </button>

                      <button
                        disabled={receiptActionLoading}
                        onClick={() => handleResendReceiptEmail("customer")}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-[11px] flex items-center gap-1.5 transition cursor-pointer border border-white/10 disabled:opacity-50"
                      >
                        <Send size={13} />
                        <span>Resend to Customer</span>
                      </button>

                      <button
                        disabled={receiptActionLoading}
                        onClick={() => handleResendReceiptEmail("admin")}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-[11px] flex items-center gap-1.5 transition cursor-pointer border border-white/10 disabled:opacity-50"
                      >
                        <Send size={13} />
                        <span>Resend to Admin</span>
                      </button>

                      <button
                        disabled={receiptActionLoading}
                        onClick={handleRegeneratePdf}
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 font-semibold text-[11px] flex items-center gap-1 transition cursor-pointer border border-white/5 disabled:opacity-50"
                        title="Regenerate PDF from latest data"
                      >
                        <RefreshCw size={12} className={receiptActionLoading ? "animate-spin" : ""} />
                        <span>Regen PDF</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-500 text-[11px]">
                    No receipt record yet. (Receipts are automatically generated when PhonePe marks payment as COMPLETED).
                  </div>
                )}
              </div>

              {/* Admin Notes Box */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase font-mono">
                  Internal Verification Notes:
                </label>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="e.g. Bank statement checked on 25-Nov. Credit verified."
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500 transition resize-none"
                />
              </div>

              {/* Footer */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">
                  ID: {viewingOrder.id}
                </span>
                <button
                  onClick={() => setViewingOrder(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PAYMENT SETTINGS MODAL */}
        {showSettingsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-[#0D1524] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                    <QrCode size={16} />
                  </span>
                  <h2 className="text-base font-bold text-white">
                    PhonePe Payment Settings
                  </h2>
                </div>

                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase font-mono">
                    Merchant Name
                  </label>
                  <input
                    type="text"
                    required
                    value={merchantName}
                    onChange={(e) => setMerchantName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase font-mono">
                    Merchant UPI VPA
                  </label>
                  <input
                    type="text"
                    required
                    value={merchantUpiId}
                    onChange={(e) => setMerchantUpiId(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-purple-500 transition"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    PhonePe Business QR code and UPI intent links use this VPA.
                  </span>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowSettingsModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={settingsSaving}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition disabled:opacity-50"
                  >
                    {settingsSaving ? "Saving..." : "Save Settings"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </AdminLayout>
  );
}
