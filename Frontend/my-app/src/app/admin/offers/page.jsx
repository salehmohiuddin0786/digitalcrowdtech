"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Tag,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Ticket,
  Calendar,
  Layers,
  Users,
  Copy,
  Check,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Percent,
} from "lucide-react";
import AdminLayout from "../AdminLayout";
import {
  verifyAdmin,
  getAdminOffers,
  getAdminOfferAnalytics,
  getAdminOfferRedemptions,
  createAdminOffer,
  updateAdminOffer,
  deleteAdminOffer,
  toggleAdminOfferStatus,
  getAdminProducts,
} from "../adminData";

const formatDate = (val) => {
  if (!val) return "No limit";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(val));
};

const toInputDate = (val) => {
  if (!val) return "";
  const d = new Date(val);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
};

export default function AdminOffersPage() {
  const router = useRouter();

  // Data states
  const [offers, setOffers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [redemptions, setRedemptions] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Filter & Search states
  const [activeTab, setActiveTab] = useState("offers"); // "offers" | "redemptions"
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL"); // "ALL", "ACTIVE", "EXPIRED", "INACTIVE"
  const [copiedCode, setCopiedCode] = useState("");

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form State
  const initialForm = {
    title: "",
    description: "",
    couponCode: "",
    discountType: "PERCENTAGE",
    discountValue: 10,
    maxDiscountAmount: "",
    minOrderValue: 0,
    isAutomatic: false,
    customerEligibility: "ALL",
    firstOrderOnly: false,
    totalUsageLimit: "",
    perCustomerLimit: 1,
    startDate: toInputDate(new Date()),
    expiryDate: toInputDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
    isActive: true,
    bannerText: "",
    restrictedProductIds: [],
  };
  const [formData, setFormData] = useState(initialForm);

  // Load All Data
  const loadData = async () => {
    setIsLoading(true);
    setMessage("");
    setErrorMsg("");

    try {
      const isAuthed = await verifyAdmin();
      if (!isAuthed) {
        router.replace("/admin");
        return;
      }

      const [offersData, analyticsData, redemptionsData, productsData] =
        await Promise.all([
          getAdminOffers(),
          getAdminOfferAnalytics(),
          getAdminOfferRedemptions(),
          getAdminProducts(),
        ]);

      setOffers(offersData);
      setAnalytics(analyticsData);
      setRedemptions(redemptionsData);
      setProducts(productsData);
    } catch (err) {
      setErrorMsg(err.message || "Failed to load offers data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCopyCode = (code) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingOffer(null);
    setFormData({
      ...initialForm,
      startDate: toInputDate(new Date()),
      expiryDate: toInputDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
    });
    setShowModal(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (offer) => {
    setEditingOffer(offer);
    const existingCode = offer.coupon?.code || offer.coupons?.[0]?.code || "";
    setFormData({
      title: offer.title || "",
      description: offer.description || "",
      couponCode: existingCode,
      discountType: offer.discountType || "PERCENTAGE",
      discountValue: offer.discountValue || 0,
      maxDiscountAmount: offer.maxDiscountAmount || "",
      minOrderValue: offer.minOrderValue || 0,
      isAutomatic: Boolean(offer.isAutomatic),
      customerEligibility: offer.customerEligibility || "ALL",
      firstOrderOnly: Boolean(offer.firstOrderOnly),
      totalUsageLimit: offer.totalUsageLimit || "",
      perCustomerLimit: offer.perCustomerLimit || 1,
      startDate: toInputDate(offer.startDate),
      expiryDate: toInputDate(offer.expiryDate),
      isActive: Boolean(offer.isActive),
      bannerText: offer.bannerText || "",
      restrictedProductIds: (offer.serviceMappings || []).map((m) => m.productId),
    });
    setShowModal(true);
  };

  // Toggle Active Status
  const handleToggleStatus = async (offer) => {
    try {
      setActionLoading(true);
      const newStatus = !offer.isActive;
      await toggleAdminOfferStatus(offer.id, newStatus);
      setOffers((prev) =>
        prev.map((o) => (o.id === offer.id ? { ...o, isActive: newStatus } : o))
      );
      setMessage(`Offer "${offer.title}" ${newStatus ? "activated" : "deactivated"} successfully.`);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setErrorMsg(err.message || "Failed to toggle offer status.");
    } finally {
      setActionLoading(false);
    }
  };

  // Submit Create or Edit Form
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setErrorMsg("");

    try {
      if (!formData.title.trim()) {
        throw new Error("Offer title is required.");
      }
      if (!formData.isAutomatic && !formData.couponCode.trim()) {
        throw new Error("Coupon code is required for non-automatic offers.");
      }

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        couponCode: formData.couponCode ? formData.couponCode.trim().toUpperCase() : null,
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        maxDiscountAmount: formData.maxDiscountAmount ? Number(formData.maxDiscountAmount) : null,
        minOrderValue: Number(formData.minOrderValue) || 0,
        isAutomatic: Boolean(formData.isAutomatic),
        customerEligibility: formData.customerEligibility,
        firstOrderOnly: Boolean(formData.firstOrderOnly),
        totalUsageLimit: formData.totalUsageLimit ? Number(formData.totalUsageLimit) : null,
        perCustomerLimit: Number(formData.perCustomerLimit) || 1,
        startDate: new Date(formData.startDate).toISOString(),
        expiryDate: new Date(formData.expiryDate).toISOString(),
        isActive: Boolean(formData.isActive),
        bannerText: formData.bannerText ? formData.bannerText.trim() : null,
        restrictedProductIds: formData.restrictedProductIds,
      };

      if (editingOffer) {
        await updateAdminOffer(editingOffer.id, payload);
        setMessage(`Offer "${formData.title}" updated successfully.`);
      } else {
        await createAdminOffer(payload);
        setMessage(`New promotion "${formData.title}" created successfully.`);
      }

      setShowModal(false);
      loadData();
    } catch (err) {
      setErrorMsg(err.message || "Failed to save promotional offer.");
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Offer
  const handleDeleteOffer = async (id) => {
    try {
      setActionLoading(true);
      await deleteAdminOffer(id);
      setOffers((prev) => prev.filter((o) => o.id !== id));
      setDeleteConfirmId(null);
      setMessage("Offer deleted successfully.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setErrorMsg(err.message || "Failed to delete offer.");
    } finally {
      setActionLoading(false);
    }
  };

  // Filtered Offers List
  const filteredOffers = useMemo(() => {
    return offers.filter((off) => {
      const matchSearch =
        search === "" ||
        off.title.toLowerCase().includes(search.toLowerCase()) ||
        (off.coupon?.code || off.coupons?.[0]?.code || "").toLowerCase().includes(search.toLowerCase()) ||
        (off.description || "").toLowerCase().includes(search.toLowerCase());

      const now = new Date();
      const isExpired = off.expiryDate && new Date(off.expiryDate) < now;

      let matchStatus = true;
      if (statusFilter === "ACTIVE") matchStatus = off.isActive && !isExpired;
      if (statusFilter === "EXPIRED") matchStatus = isExpired;
      if (statusFilter === "INACTIVE") matchStatus = !off.isActive;

      return matchSearch && matchStatus;
    });
  }, [offers, search, statusFilter]);

  // Filtered Redemptions List
  const filteredRedemptions = useMemo(() => {
    return redemptions.filter((r) => {
      return (
        search === "" ||
        r.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        r.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
        r.couponCode.toLowerCase().includes(search.toLowerCase()) ||
        r.offerTitle.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [redemptions, search]);

  return (
    <AdminLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F87000]">
              <Ticket size={14} />
              <span>Growth & Revenue Engine</span>
            </div>
            <h1 className="mt-1 text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Offers & Coupon Management
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Configure promotional discounts, automated campaigns, coupon codes, and monitor redemptions integrated with PhonePe.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#F87000] to-orange-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-orange-500/25 hover:from-orange-500 hover:to-orange-600 transition"
            >
              <Plus size={16} />
              <span>Create New Offer</span>
            </button>
          </div>
        </div>

        {/* Notifications */}
        {message && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-semibold text-emerald-400 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 size={16} />
            <span>{message}</span>
          </div>
        )}
        {errorMsg && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs font-semibold text-rose-400 flex items-center gap-2 animate-in fade-in">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 5 Analytics Metric Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <div className="rounded-2xl border border-[#26344F] bg-[#101A2E] p-4.5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Active Offers</span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Tag size={16} />
              </div>
            </div>
            <div className="mt-3 text-2xl font-black text-white">
              {analytics?.totalActiveOffers ?? 0}
            </div>
            <p className="mt-1 text-[11px] text-emerald-400/80">
              Live & ready at checkout
            </p>
          </div>

          <div className="rounded-2xl border border-[#26344F] bg-[#101A2E] p-4.5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Coupons Created</span>
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Ticket size={16} />
              </div>
            </div>
            <div className="mt-3 text-2xl font-black text-white">
              {analytics?.totalCouponsCreated ?? 0}
            </div>
            <p className="mt-1 text-[11px] text-slate-400">
              Across all campaigns
            </p>
          </div>

          <div className="rounded-2xl border border-[#26344F] bg-[#101A2E] p-4.5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Redemptions</span>
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <ShieldCheck size={16} />
              </div>
            </div>
            <div className="mt-3 text-2xl font-black text-white">
              {analytics?.totalRedemptions ?? 0}
            </div>
            <p className="mt-1 text-[11px] text-purple-400/80">
              Successfully paid orders
            </p>
          </div>

          <div className="rounded-2xl border border-[#26344F] bg-[#101A2E] p-4.5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Discount Expense</span>
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Percent size={16} />
              </div>
            </div>
            <div className="mt-3 text-2xl font-black text-amber-300">
              ₹{Number(analytics?.totalDiscountGiven || 0).toLocaleString("en-IN")}
            </div>
            <p className="mt-1 text-[11px] text-amber-400/70">
              Customer savings passed
            </p>
          </div>

          <div className="rounded-2xl border border-[#26344F] bg-[#101A2E] p-4.5 col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Revenue via Offers</span>
              <div className="p-2 rounded-lg bg-orange-500/10 text-[#F87000]">
                <TrendingUp size={16} />
              </div>
            </div>
            <div className="mt-3 text-2xl font-black text-[#F87000]">
              ₹{Number(analytics?.revenueGenerated || 0).toLocaleString("en-IN")}
            </div>
            <p className="mt-1 text-[11px] text-orange-400/70">
              PhonePe settled sales
            </p>
          </div>
        </div>

        {/* Tab & Filter Controls */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#26344F] pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("offers")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === "offers"
                  ? "bg-[#F87000] text-white shadow-md shadow-orange-500/20"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <Ticket size={14} />
              <span>Promotions & Coupons</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-black/30">
                {offers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("redemptions")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === "redemptions"
                  ? "bg-[#F87000] text-white shadow-md shadow-orange-500/20"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <ShieldCheck size={14} />
              <span>Redemption Audit Log</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-black/30">
                {redemptions.length}
              </span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder={
                  activeTab === "offers"
                    ? "Search title or code..."
                    : "Search email, order, or coupon..."
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-56 md:w-64 rounded-xl border border-[#26344F] bg-[#101A2E] pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-[#F87000] focus:outline-none"
              />
            </div>

            {activeTab === "offers" && (
              <div className="flex items-center gap-1.5 rounded-xl border border-[#26344F] bg-[#101A2E] px-3 py-1.5 text-xs text-slate-300">
                <Filter size={13} className="text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer"
                >
                  <option value="ALL" className="bg-[#101A2E]">All Statuses</option>
                  <option value="ACTIVE" className="bg-[#101A2E]">Active Only</option>
                  <option value="EXPIRED" className="bg-[#101A2E]">Expired</option>
                  <option value="INACTIVE" className="bg-[#101A2E]">Disabled</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Tab 1: Offers & Coupons Table */}
        {activeTab === "offers" && (
          <div className="overflow-hidden rounded-2xl border border-[#26344F] bg-[#101A2E]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#26344F] bg-[#0B1220]/60 text-slate-400 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="px-5 py-3.5">Coupon & Title</th>
                    <th className="px-4 py-3.5">Discount Specification</th>
                    <th className="px-4 py-3.5">Eligibility & Scope</th>
                    <th className="px-4 py-3.5">Redemptions</th>
                    <th className="px-4 py-3.5">Validity Period</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1F293D] text-slate-300">
                  {filteredOffers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                        <Tag size={28} className="mx-auto mb-2 opacity-40" />
                        <p className="text-sm font-medium">No promotional offers found.</p>
                        <p className="text-xs text-slate-600 mt-1">
                          Click &quot;Create New Offer&quot; above to add your first promotion.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredOffers.map((off) => {
                      const code = off.coupon?.code || off.coupons?.[0]?.code;
                      const now = new Date();
                      const isExpired = off.expiryDate && new Date(off.expiryDate) < now;
                      const isNearlyExpired =
                        !isExpired &&
                        off.expiryDate &&
                        new Date(off.expiryDate) - now < 3 * 24 * 60 * 60 * 1000;

                      return (
                        <tr key={off.id} className="hover:bg-white/[0.02] transition">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              {code ? (
                                <button
                                  onClick={() => handleCopyCode(code)}
                                  className="group flex items-center gap-1.5 rounded-lg border border-dashed border-orange-500/40 bg-orange-500/10 px-2.5 py-1 text-xs font-mono font-bold text-orange-400 hover:bg-orange-500/20 transition"
                                  title="Click to copy coupon code"
                                >
                                  <span>{code}</span>
                                  {copiedCode === code ? (
                                    <Check size={11} className="text-emerald-400" />
                                  ) : (
                                    <Copy size={11} className="opacity-60 group-hover:opacity-100" />
                                  )}
                                </button>
                              ) : (
                                <span className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-[11px] font-semibold text-blue-400">
                                  ⚡ Automatic
                                </span>
                              )}

                              <div>
                                <div className="font-semibold text-white">{off.title}</div>
                                {off.description && (
                                  <div className="text-[11px] text-slate-400 line-clamp-1">
                                    {off.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <div className="font-bold text-emerald-400">
                              {off.discountType === "PERCENTAGE" && `${Number(off.discountValue)}% OFF`}
                              {off.discountType === "FIXED" && `₹${Number(off.discountValue).toLocaleString("en-IN")} FLAT`}
                              {off.discountType === "FREE_SERVICE" && "100% FREE"}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {off.maxDiscountAmount
                                ? `Cap: ₹${Number(off.maxDiscountAmount).toLocaleString("en-IN")}`
                                : "No cap"}
                              {off.minOrderValue > 0
                                ? ` • Min: ₹${Number(off.minOrderValue).toLocaleString("en-IN")}`
                                : ""}
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <div className="text-xs font-medium text-slate-200">
                              {off.customerEligibility === "ALL" && "All Customers"}
                              {off.customerEligibility === "NEW_CUSTOMERS" && "New Clients Only"}
                              {off.customerEligibility === "EXISTING_CUSTOMERS" && "Existing Clients"}
                              {off.firstOrderOnly && " • 1st Order"}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {off.serviceMappings && off.serviceMappings.length > 0 ? (
                                <span className="text-blue-400">
                                  Restricted ({off.serviceMappings.length} products)
                                </span>
                              ) : (
                                "All Digital Products"
                              )}
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex items-center gap-1 font-semibold text-slate-200">
                              <span>{off.usedCount || 0}</span>
                              <span className="text-slate-500">
                                / {off.totalUsageLimit || "∞"}
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-400">
                              Max {off.perCustomerLimit || 1}/client
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <div className="text-xs font-medium text-slate-300">
                              {formatDate(off.expiryDate)}
                            </div>
                            {isExpired && (
                              <span className="text-[10px] font-bold text-red-400">
                                Expired
                              </span>
                            )}
                            {isNearlyExpired && (
                              <span className="text-[10px] font-bold text-amber-400">
                                Expires soon
                              </span>
                            )}
                          </td>

                          <td className="px-4 py-4">
                            <button
                              onClick={() => handleToggleStatus(off)}
                              disabled={actionLoading}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition ${
                                off.isActive && !isExpired
                                  ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25"
                                  : "bg-slate-500/15 text-slate-400 border-slate-500/30 hover:bg-slate-500/25"
                              }`}
                              title="Click to toggle status"
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  off.isActive && !isExpired
                                    ? "bg-emerald-400 animate-pulse"
                                    : "bg-slate-500"
                                }`}
                              />
                              <span>
                                {isExpired
                                  ? "Expired"
                                  : off.isActive
                                  ? "Active"
                                  : "Disabled"}
                              </span>
                            </button>
                          </td>

                          <td className="px-5 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEdit(off)}
                                className="p-1.5 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition"
                                title="Edit Offer"
                              >
                                <Edit2 size={13} />
                              </button>

                              {deleteConfirmId === off.id ? (
                                <div className="flex items-center gap-1 bg-red-500/10 border border-red-500/30 p-1 rounded-lg">
                                  <button
                                    onClick={() => handleDeleteOffer(off.id)}
                                    className="text-[10px] font-bold text-red-400 hover:underline px-1.5"
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirmId(null)}
                                    className="text-slate-400 hover:text-white px-1"
                                  >
                                    <X size={12} />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirmId(off.id)}
                                  className="p-1.5 rounded-lg border border-white/10 text-rose-400 hover:bg-rose-500/10 transition"
                                  title="Delete Offer"
                                >
                                  <Trash2 size={13} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Redemption History Audit Log */}
        {activeTab === "redemptions" && (
          <div className="overflow-hidden rounded-2xl border border-[#26344F] bg-[#101A2E]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#26344F] bg-[#0B1220]/60 text-slate-400 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="px-5 py-3.5">Order Reference</th>
                    <th className="px-4 py-3.5">Customer</th>
                    <th className="px-4 py-3.5">Applied Coupon / Offer</th>
                    <th className="px-4 py-3.5">Original Amount</th>
                    <th className="px-4 py-3.5">Discount Given</th>
                    <th className="px-4 py-3.5">Final Paid</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-5 py-3.5">Settlement Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1F293D] text-slate-300">
                  {filteredRedemptions.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                        <ShieldCheck size={28} className="mx-auto mb-2 opacity-40" />
                        <p className="text-sm font-medium">No coupon redemptions recorded yet.</p>
                        <p className="text-xs text-slate-600 mt-1">
                          Redemptions will automatically log here when customers apply coupons and complete PhonePe checkout.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredRedemptions.map((r) => (
                      <tr key={r.id} className="hover:bg-white/[0.02] transition">
                        <td className="px-5 py-3.5">
                          <code className="rounded bg-black/40 px-2 py-0.5 font-mono text-[11px] text-blue-400 font-bold border border-blue-500/20">
                            {r.orderNumber}
                          </code>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="font-semibold text-white">{r.customerEmail}</div>
                          <div className="text-[11px] text-slate-400">{r.customerPhone}</div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="font-mono font-bold text-orange-400 bg-orange-500/10 border border-orange-500/30 px-2 py-0.5 rounded text-[11px]">
                            {r.couponCode || "DIRECT"}
                          </span>
                          <div className="text-[11px] text-slate-400 mt-0.5">{r.offerTitle}</div>
                        </td>
                        <td className="px-4 py-3.5 font-medium text-slate-400 line-through">
                          ₹{Number(r.originalAmount).toLocaleString("en-IN")}
                        </td>
                        <td className="px-4 py-3.5 font-bold text-amber-300">
                          -₹{Number(r.discountAmount).toLocaleString("en-IN")}
                        </td>
                        <td className="px-4 py-3.5 font-bold text-emerald-400">
                          ₹{Number(r.finalAmount).toLocaleString("en-IN")}
                        </td>
                        <td className="px-4 py-3.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                              r.status === "COMPLETED"
                                ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                                : r.status === "RESERVED"
                                ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                                : "bg-red-500/15 text-red-300 border-red-500/30"
                            }`}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-slate-400 text-[11px]">
                          {formatDate(r.completedAt || r.createdAt)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Create / Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <div className="relative w-full max-w-3xl rounded-2xl border border-[#26344F] bg-[#0B1220] p-6 shadow-2xl my-8">
              <div className="flex items-center justify-between border-b border-[#26344F] pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Tag size={18} className="text-[#F87000]" />
                    <span>{editingOffer ? "Edit Promotional Offer" : "Create New Promotional Offer"}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Define discount parameters, limits, eligibility, and service restrictions.
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmitForm} className="mt-5 space-y-5 text-xs">
                {/* 1. Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Offer Title <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Diwali Startup Special 20%"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full rounded-xl border border-[#26344F] bg-[#101A2E] px-3 py-2 text-white placeholder-slate-500 focus:border-[#F87000] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Coupon Code {!formData.isAutomatic && <span className="text-red-400">*</span>}
                    </label>
                    <input
                      type="text"
                      disabled={formData.isAutomatic}
                      placeholder={formData.isAutomatic ? "Automatic discount (no code required)" : "e.g. DIWALI20"}
                      value={formData.couponCode}
                      onChange={(e) =>
                        setFormData({ ...formData, couponCode: e.target.value.toUpperCase() })
                      }
                      className="w-full rounded-xl border border-[#26344F] bg-[#101A2E] px-3 py-2 text-white font-mono uppercase placeholder-slate-500 focus:border-[#F87000] focus:outline-none disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Description</label>
                  <input
                    type="text"
                    placeholder="Brief terms or promotional highlight shown to customers"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full rounded-xl border border-[#26344F] bg-[#101A2E] px-3 py-2 text-white placeholder-slate-500 focus:border-[#F87000] focus:outline-none"
                  />
                </div>

                {/* 2. Discount Configuration */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl border border-[#1F293D] bg-[#101A2E]/50">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Discount Type <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={formData.discountType}
                      onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                      className="w-full rounded-xl border border-[#26344F] bg-[#101A2E] px-3 py-2 text-white focus:border-[#F87000] focus:outline-none"
                    >
                      <option value="PERCENTAGE">Percentage (%) Off</option>
                      <option value="FIXED">Flat Fixed Amount (₹) Off</option>
                      <option value="FREE_SERVICE">100% Free Service Promotion</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Discount Value ({formData.discountType === "PERCENTAGE" ? "%" : "₹"})
                    </label>
                    <input
                      type="number"
                      min="0"
                      step={formData.discountType === "PERCENTAGE" ? "0.1" : "1"}
                      required
                      value={formData.discountValue}
                      onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                      className="w-full rounded-xl border border-[#26344F] bg-[#101A2E] px-3 py-2 text-white focus:border-[#F87000] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Max Discount Cap (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="Optional (No limit)"
                      value={formData.maxDiscountAmount}
                      onChange={(e) => setFormData({ ...formData, maxDiscountAmount: e.target.value })}
                      className="w-full rounded-xl border border-[#26344F] bg-[#101A2E] px-3 py-2 text-white placeholder-slate-500 focus:border-[#F87000] focus:outline-none"
                    />
                  </div>
                </div>

                {/* 3. Conditions & Limits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Min Order Value (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.minOrderValue}
                      onChange={(e) => setFormData({ ...formData, minOrderValue: e.target.value })}
                      className="w-full rounded-xl border border-[#26344F] bg-[#101A2E] px-3 py-2 text-white focus:border-[#F87000] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Total Campaign Limit
                    </label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Optional (Unlimited)"
                      value={formData.totalUsageLimit}
                      onChange={(e) => setFormData({ ...formData, totalUsageLimit: e.target.value })}
                      className="w-full rounded-xl border border-[#26344F] bg-[#101A2E] px-3 py-2 text-white placeholder-slate-500 focus:border-[#F87000] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Limit Per Customer
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.perCustomerLimit}
                      onChange={(e) => setFormData({ ...formData, perCustomerLimit: e.target.value })}
                      className="w-full rounded-xl border border-[#26344F] bg-[#101A2E] px-3 py-2 text-white focus:border-[#F87000] focus:outline-none"
                    />
                  </div>
                </div>

                {/* 4. Dates & Customer Eligibility */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Start Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full rounded-xl border border-[#26344F] bg-[#101A2E] px-3 py-2 text-white focus:border-[#F87000] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Expiry Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      className="w-full rounded-xl border border-[#26344F] bg-[#101A2E] px-3 py-2 text-white focus:border-[#F87000] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Customer Eligibility
                    </label>
                    <select
                      value={formData.customerEligibility}
                      onChange={(e) =>
                        setFormData({ ...formData, customerEligibility: e.target.value })
                      }
                      className="w-full rounded-xl border border-[#26344F] bg-[#101A2E] px-3 py-2 text-white focus:border-[#F87000] focus:outline-none"
                    >
                      <option value="ALL">All Customers</option>
                      <option value="NEW_CUSTOMERS">New Customers Only</option>
                      <option value="EXISTING_CUSTOMERS">Existing Customers Only</option>
                    </select>
                  </div>
                </div>

                {/* 5. Service Restrictions (Select Specific Products) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-slate-300 font-semibold">
                      Restrict to Selected Digital Products
                    </label>
                    <span className="text-[11px] text-slate-400">
                      {formData.restrictedProductIds.length === 0
                        ? "Applies to all products"
                        : `${formData.restrictedProductIds.length} product(s) selected`}
                    </span>
                  </div>
                  <div className="max-h-36 overflow-y-auto rounded-xl border border-[#26344F] bg-[#101A2E] p-2.5 space-y-1.5 scrollbar-thin">
                    {products.map((p) => {
                      const isSelected = formData.restrictedProductIds.includes(p.id);
                      return (
                        <label
                          key={p.id}
                          className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-white/5 cursor-pointer text-slate-300"
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setFormData({
                                ...formData,
                                restrictedProductIds: checked
                                  ? [...formData.restrictedProductIds, p.id]
                                  : formData.restrictedProductIds.filter((id) => id !== p.id),
                              });
                            }}
                            className="rounded border-[#26344F] text-[#F87000] focus:ring-0"
                          />
                          <span className="font-medium text-white">{p.title}</span>
                          <span className="text-[10px] text-slate-500 font-mono">({p.id})</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* 6. Banner & Flags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Checkout Announcement Banner Text
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Special Launch Offer: Use code WELCOME10 for 10% off"
                      value={formData.bannerText}
                      onChange={(e) => setFormData({ ...formData, bannerText: e.target.value })}
                      className="w-full rounded-xl border border-[#26344F] bg-[#101A2E] px-3 py-2 text-white placeholder-slate-500 focus:border-[#F87000] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col justify-center space-y-2 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                      <input
                        type="checkbox"
                        checked={formData.isAutomatic}
                        onChange={(e) => setFormData({ ...formData, isAutomatic: e.target.checked })}
                        className="rounded border-[#26344F] text-[#F87000] focus:ring-0"
                      />
                      <span className="font-semibold">Automatic Discount (Applies without code)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                      <input
                        type="checkbox"
                        checked={formData.firstOrderOnly}
                        onChange={(e) =>
                          setFormData({ ...formData, firstOrderOnly: e.target.checked })
                        }
                        className="rounded border-[#26344F] text-[#F87000] focus:ring-0"
                      />
                      <span>Strict First-Order Only</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        className="rounded border-[#26344F] text-emerald-500 focus:ring-0"
                      />
                      <span className="text-emerald-400 font-semibold">Active & Redeemable</span>
                    </label>
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#26344F]">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#F87000] to-orange-500 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-orange-500/25 hover:from-orange-500 hover:to-orange-600 transition disabled:opacity-50"
                  >
                    {actionLoading && <RefreshCw size={13} className="animate-spin" />}
                    <span>{editingOffer ? "Update Promotion" : "Save Promotion"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
