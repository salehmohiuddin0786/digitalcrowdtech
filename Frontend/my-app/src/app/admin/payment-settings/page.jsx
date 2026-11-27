"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../AdminLayout";
import {
  isAdminLoggedIn,
  getAdminPaymentSettings,
  updateAdminPaymentSettings,
  testAdminPaymentSettings,
} from "../adminData";
import {
  CreditCard,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Eye,
  EyeOff,
  Radio,
  Sliders,
  HelpCircle,
  Server,
} from "lucide-react";

export default function PaymentSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [testResult, setTestResult] = useState(null);
  const [showSaltKey, setShowSaltKey] = useState(false);
  const [showClientSecret, setShowClientSecret] = useState(false);
  const [copiedWebhook, setCopiedWebhook] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    merchantId: "",
    clientId: "",
    clientSecret: "",
    clientVersion: "1",
    merchantName: "Digital Crowd Technologies",
    merchantUpiId: "9985960692@ybl",
    saltKey: "",
    saltIndex: "1",
    sandboxMode: true,
    qrImageUrl: "/payment/phonepe-business-qr.png",
    isActive: true,
    businessPhone: "+91 9985960692",
    businessEmail: "support@digitalcrowdtech.in",
  });

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      router.replace("/admin");
      return;
    }

    loadSettings();
  }, [router]);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await getAdminPaymentSettings();
      if (data) {
        setFormData({
          merchantId: data.merchantId || "",
          clientId: data.clientId || "",
          clientSecret: data.clientSecret || "",
          clientVersion: data.clientVersion || "1",
          merchantName: data.merchantName || "Digital Crowd Technologies",
          merchantUpiId: data.merchantUpiId || "9985960692@ybl",
          saltKey: data.saltKey || "",
          saltIndex: data.saltIndex || "1",
          sandboxMode: data.sandboxMode !== undefined ? Boolean(data.sandboxMode) : true,
          qrImageUrl: data.qrImageUrl || "/payment/phonepe-business-qr.png",
          isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
          businessPhone: data.businessPhone || "+91 9985960692",
          businessEmail: data.businessEmail || "support@digitalcrowdtech.in",
        });
      }
    } catch (err) {
      setErrorMsg("Failed to load payment settings from server.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");
    setSaveSuccess(false);

    try {
      await updateAdminPaymentSettings(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      setErrorMsg(err.message || "Failed to update payment settings.");
    } finally {
      setSaving(false);
    }
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await testAdminPaymentSettings();
      setTestResult(res);
    } catch (err) {
      setTestResult({
        ok: false,
        success: false,
        message: err.message || "Failed to test PhonePe gateway connectivity.",
      });
    } finally {
      setTesting(false);
    }
  };

  const copyWebhookUrl = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://digitalcrowdtech.in";
    const webhookUrl = `${origin}/api/payment/phonepe/callback`;
    navigator.clipboard?.writeText(webhookUrl);
    setCopiedWebhook(true);
    setTimeout(() => setCopiedWebhook(false), 2500);
  };

  return (
    <AdminLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-[#5F259F]/20 text-purple-400 border border-[#5F259F]/30">
                <CreditCard size={18} />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                Payment Infrastructure
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              PhonePe Business Gateway Settings
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Configure your PhonePe Payment Gateway (PG), API keys, automated verification, and merchant details.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold border ${
                formData.sandboxMode
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              }`}
            >
              <Radio size={12} className={formData.sandboxMode ? "text-amber-400" : "animate-pulse text-emerald-400"} />
              <span>{formData.sandboxMode ? "Sandbox / Test Mode Active" : "Live Production Active"}</span>
            </span>
          </div>
        </div>

        {/* Notifications */}
        {saveSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2">
            <CheckCircle2 size={18} className="shrink-0" />
            <span>PhonePe Gateway settings saved and updated in database successfully!</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-2">
            <AlertCircle size={18} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {loading ? (
          <div className="p-12 text-center text-slate-400 font-mono text-sm flex items-center justify-center gap-2">
            <RefreshCw size={16} className="animate-spin" />
            <span>Loading gateway settings...</span>
          </div>
        ) : (
          <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 8 Cols: Gateway Form */}
            <div className="lg:col-span-8 space-y-8">
              {/* Card 1: Environment & Mode */}
              <div className="p-6 sm:p-7 rounded-3xl bg-[#101A2E]/80 border border-[#26344F] shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <Sliders size={18} className="text-[#F87000]" />
                    <h2 className="text-base font-bold text-white">Gateway Mode &amp; Status</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Test Mode Option */}
                  <div
                    onClick={() => setFormData({ ...formData, sandboxMode: true })}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                      formData.sandboxMode
                        ? "bg-amber-500/10 border-amber-500/50 shadow-md shadow-amber-500/5"
                        : "bg-white/[0.02] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-white flex items-center gap-2">
                          <span>Testing / Sandbox (UAT)</span>
                        </span>
                        <input
                          type="radio"
                          name="mode"
                          checked={formData.sandboxMode}
                          onChange={() => setFormData({ ...formData, sandboxMode: true })}
                          className="accent-[#F87000]"
                        />
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Safe simulator environment. Pre-configured with PhonePe official test keys for simulating complete payments with zero real charges.
                      </p>
                    </div>
                    <span className="mt-3 text-[11px] font-mono text-amber-400 font-semibold">
                      UAT Endpoint: api-preprod.phonepe.com
                    </span>
                  </div>

                  {/* Live Production Option */}
                  <div
                    onClick={() => setFormData({ ...formData, sandboxMode: false })}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                      !formData.sandboxMode
                        ? "bg-emerald-500/10 border-emerald-500/50 shadow-md shadow-emerald-500/5"
                        : "bg-white/[0.02] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-white flex items-center gap-2">
                          <span>Live Production Mode</span>
                        </span>
                        <input
                          type="radio"
                          name="mode"
                          checked={!formData.sandboxMode}
                          onChange={() => setFormData({ ...formData, sandboxMode: false })}
                          className="accent-emerald-500"
                        />
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Real customer transactions. Requires approved Merchant ID and Salt Key from your PhonePe Business portal. Funds settle to your bank account.
                      </p>
                    </div>
                    <span className="mt-3 text-[11px] font-mono text-emerald-400 font-semibold">
                      Production: api.phonepe.com/apis/hermes
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: PhonePe API Credentials */}
              <div className="p-6 sm:p-7 rounded-3xl bg-[#101A2E]/80 border border-[#26344F] shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck size={18} className="text-purple-400" />
                    <h2 className="text-base font-bold text-white">PhonePe API Credentials</h2>
                  </div>
                  <span className="text-xs font-mono text-slate-400">SHA256 Encrypted</span>
                </div>

                <div className="space-y-4">
                  {/* Client ID (PhonePe Standard Checkout V2) */}
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Client ID (OAuth 2.0 / V2 API)
                    </label>
                    <input
                      type="text"
                      value={formData.clientId}
                      onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                      placeholder="e.g. M23NO5H2OWJEL_2611271819"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-purple-500 transition"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Your PhonePe Developer Client ID for OAuth token generation and Standard Checkout.
                    </p>
                  </div>

                  {/* Client Secret (PhonePe Standard Checkout V2) */}
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Client Secret (OAuth 2.0 / V2 API)
                    </label>
                    <div className="relative">
                      <input
                        type={showClientSecret ? "text" : "password"}
                        value={formData.clientSecret}
                        onChange={(e) => setFormData({ ...formData, clientSecret: e.target.value })}
                        placeholder="e.g. Zjg3YTc3MjQtNmE1NS00OTUwLTgwNDgtNmZmMTIwYjliODU5"
                        className="w-full px-4 py-3 pr-12 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-purple-500 transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowClientSecret(!showClientSecret)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-white transition"
                      >
                        {showClientSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Confidential secret key used to request PhonePe bearer tokens for hosted checkout.
                    </p>
                  </div>

                  {/* Merchant ID */}
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Merchant ID (MID) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.merchantId}
                      onChange={(e) => setFormData({ ...formData, merchantId: e.target.value })}
                      placeholder="e.g. M23NO5H2OWJEL"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-purple-500 transition"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Your official PhonePe Business Merchant identifier.
                    </p>
                  </div>

                  {/* Salt Key (V1 / Checksum fallback) */}
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Salt Key (API Secret / Key)
                    </label>
                    <div className="relative">
                      <input
                        type={showSaltKey ? "text" : "password"}
                        value={formData.saltKey}
                        onChange={(e) => setFormData({ ...formData, saltKey: e.target.value })}
                        placeholder="e.g. f87a7724-6a55-4950-8048-6ff120b9b859"
                        className="w-full px-4 py-3 pr-12 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-purple-500 transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSaltKey(!showSaltKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-white transition"
                      >
                        {showSaltKey ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Used for SHA256 <code className="text-purple-300">X-VERIFY</code> checksums and legacy endpoint compatibility.
                    </p>
                  </div>

                  {/* Salt Index */}
                  <div className="max-w-xs">
                    <label className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Key Index (Salt Index)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.saltIndex}
                      onChange={(e) => setFormData({ ...formData, saltIndex: e.target.value })}
                      placeholder="1"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-purple-500 transition"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Typically <code className="text-purple-300">1</code> unless PhonePe assigns an alternate key index.
                    </p>
                  </div>
                </div>

                {/* Test Connection Button & Result Box */}
                <div className="pt-4 border-t border-white/5 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      disabled={testing}
                      onClick={handleTestConnection}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-md shadow-purple-600/20 transition flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      <Zap size={14} />
                      <span>{testing ? "Testing Handshake..." : "Test PhonePe API Connection"}</span>
                    </button>
                    <span className="text-xs text-slate-400">
                      Tests live handshake against PhonePe status endpoints without charging any amount.
                    </span>
                  </div>

                  {testResult && (
                    <div
                      className={`p-4 rounded-xl text-xs space-y-1 border ${
                        testResult.authenticated
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                          : "bg-red-500/10 border-red-500/30 text-red-300"
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold">
                        {testResult.authenticated ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                        <span>{testResult.message}</span>
                      </div>
                      <p className="font-mono text-[11px] opacity-80">
                        Environment: {testResult.environment} | Merchant ID: {testResult.merchantId}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Card 3: Business Display & UPI VPA Fallback */}
              <div className="p-6 sm:p-7 rounded-3xl bg-[#101A2E]/80 border border-[#26344F] shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <Server size={18} className="text-blue-400" />
                    <h2 className="text-base font-bold text-white">Merchant Display &amp; UPI VPA</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Business Display Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.merchantName}
                      onChange={(e) => setFormData({ ...formData, merchantName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Merchant UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.merchantUpiId}
                      onChange={(e) => setFormData({ ...formData, merchantUpiId: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Customer Care Phone
                    </label>
                    <input
                      type="text"
                      value={formData.businessPhone}
                      onChange={(e) => setFormData({ ...formData, businessPhone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Customer Care Email
                    </label>
                    <input
                      type="email"
                      value={formData.businessEmail}
                      onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button Bar */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#F87000] to-orange-600 hover:from-orange-500 hover:to-orange-600 shadow-xl shadow-orange-500/25 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Check size={16} />
                  <span>{saving ? "Saving Changes..." : "Save Gateway Settings"}</span>
                </button>
              </div>
            </div>

            {/* Right 4 Cols: Integration Guide & Webhook */}
            <div className="lg:col-span-4 space-y-6">
              {/* Webhook Endpoint Card */}
              <div className="p-6 rounded-3xl bg-[#101A2E]/80 border border-[#26344F] shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Radio size={16} className="text-purple-400" />
                  <span>Server Callback Webhook</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Provide this webhook callback URL in your PhonePe Business portal under <strong>Webhook Configuration</strong>:
                </p>

                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-2">
                  <code className="text-[11px] font-mono text-purple-300 truncate">
                    /api/payment/phonepe/callback
                  </code>
                  <button
                    type="button"
                    onClick={copyWebhookUrl}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition"
                    title="Copy full webhook URL"
                  >
                    {copiedWebhook ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                {copiedWebhook && (
                  <span className="text-[11px] text-emerald-400 font-semibold block">
                    ✓ Full URL copied to clipboard!
                  </span>
                )}
              </div>

              {/* How Automatic Verification Works */}
              <div className="p-6 rounded-3xl bg-[#101A2E]/80 border border-[#26344F] shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Zap size={16} className="text-amber-400" />
                  <span>How Automatic Verification Works</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-3 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                      1
                    </span>
                    <span>Customer clicks <strong>Pay with PhonePe</strong> and is redirected to PhonePe PG.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                      2
                    </span>
                    <span>Customer approves payment via UPI, Credit/Debit card, or Net Banking.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                      3
                    </span>
                    <span>PhonePe redirects back to order confirmation. Our backend instantly checks the SHA256-signed status endpoint.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                      4
                    </span>
                    <span>Order is automatically marked <strong>COMPLETED</strong> in your database with zero manual intervention.</span>
                  </li>
                </ul>
              </div>

              {/* Help & Documentation */}
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-3 text-xs text-slate-400">
                <div className="flex items-center gap-2 font-bold text-white">
                  <HelpCircle size={15} />
                  <span>Where to find live keys?</span>
                </div>
                <p>
                  Visit <a href="https://business.phonepe.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-1">business.phonepe.com <ExternalLink size={10} /></a>, log in to your account, and navigate to <strong>Integration &gt; API Keys</strong>.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
