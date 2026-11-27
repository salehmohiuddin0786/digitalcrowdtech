"use client";

import { BLOG_POSTS } from "../data/blogs";
import { PROJECTS } from "../data/projects";
import { PRODUCTS } from "../data/products";

export const ADMIN_EMAIL = "admin@digitalcrowdtech.in";

const tokenKey = "digitalcrowdtech_admin_token";
const getApiBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (typeof window !== "undefined") {
    const host = window.location.hostname || "localhost";
    return `http://${host}:5001`;
  }
  return "http://localhost:5001";
};

const canUseStorage = () => typeof window !== "undefined";

const getToken = () => (canUseStorage() ? window.localStorage.getItem(tokenKey) : "");

const request = async (path, options = {}) => {
  const apiBase = getApiBaseUrl();
  const fullUrl = apiBase ? `${apiBase}${path}` : path;

  const response = await fetch(fullUrl, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.auth ? { Authorization: `Bearer ${getToken()}` } : {}),
      ...(options.headers || {}),
    },
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || !result.ok) {
    throw new Error(result.message || "Request failed.");
  }

  return result;
};

export const isAdminLoggedIn = () => Boolean(getToken());

export const loginAdmin = async (email, password) => {
  try {
    const result = await request("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (canUseStorage() && result.token) {
      window.localStorage.setItem(tokenKey, result.token);
    }

    return result;
  } catch (err) {
    throw new Error(err.message || "Invalid admin credentials or server unavailable.");
  }
};

export const logoutAdmin = () => {
  if (canUseStorage()) {
    window.localStorage.removeItem(tokenKey);
  }
  if (typeof window !== "undefined") {
    window.location.href = "/admin";
  }
};

export const verifyAdmin = async () => {
  if (!getToken()) return false;

  try {
    await request("/api/admin/me", { auth: true });
    return true;
  } catch {
    logoutAdmin();
    return false;
  }
};

// ==========================================
// QUERIES MANAGEMENT
// ==========================================
export const getQueries = async (params = {}) => {
  const queryStr = new URLSearchParams(params).toString();
  const path = `/api/admin/queries${queryStr ? `?${queryStr}` : ""}`;
  try {
    const result = await request(path, { auth: true });
    return result.items || [];
  } catch (err) {
    return [
      {
        id: "query-demo-1",
        name: "Rajesh Kumar",
        businessName: "Kumar Logistics Hyderabad",
        email: "rajesh@kumarlogistics.in",
        phone: "+91 9849012345",
        service: "Custom Website / Web Application",
        budget: "Starting from ₹9,999",
        subject: "Custom ERP & Fleet Management System",
        message: "We need a custom web portal to track driver trips, fuel expenses, and customer billing with commercial invoices.",
        source: "Website",
        status: "New",
        mailStatus: "Sent",
        createdAt: new Date().toISOString(),
      },
      {
        id: "query-demo-2",
        name: "Dr. Sunita Rao",
        businessName: "Apollo Care Clinic Madhapur",
        email: "sunita@careclinic.in",
        phone: "+91 9701234567",
        service: "Business Website",
        budget: "Starting from ₹4,999",
        subject: "Clinic Website & WhatsApp Booking",
        message: "Looking for a clean responsive website for our dental and family clinic with Google Maps and direct WhatsApp consultation booking.",
        source: "Portfolio",
        status: "Contacted",
        mailStatus: "Sent",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ];
  }
};

export const updateQueryStatus = async (id, status) => {
  const result = await request(`/api/admin/queries/${id}/status`, {
    method: "PATCH",
    auth: true,
    body: JSON.stringify({ status }),
  });
  return result.item;
};

export const deleteQuery = async (id) => {
  await request(`/api/admin/queries/${id}`, {
    method: "DELETE",
    auth: true,
  });
};

// ==========================================
// BLOGS MANAGEMENT
// ==========================================
export const getBlogs = async () => {
  try {
    const result = await request("/api/admin/blogs", { auth: true });
    if (Array.isArray(result.items) && result.items.length > 0) {
      return result.items;
    }
  } catch (err) {
    console.warn("Backend blogs fetch warning:", err.message);
  }

  // Resilient fallback using BLOG_POSTS so past articles are always available
  const storedCustom = canUseStorage()
    ? JSON.parse(window.localStorage.getItem("dct_admin_custom_blogs") || "[]")
    : [];

  const defaultMapped = BLOG_POSTS.map((b) => ({
    id: b.id,
    title: b.title,
    slug: b.slug,
    category: b.category,
    date: b.date,
    readTime: b.readTime || "5 min read",
    excerpt: b.excerpt,
    content: b.content,
    status: "Published",
  }));

  return [...storedCustom, ...defaultMapped];
};

export const createBlog = async (payload) => {
  try {
    const result = await request("/api/admin/blogs", {
      method: "POST",
      auth: true,
      body: JSON.stringify(payload),
    });
    return result.item;
  } catch (err) {
    const newBlog = {
      id: `blog-local-${Date.now()}`,
      slug: payload.slug || payload.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      ...payload,
      createdAt: new Date().toISOString(),
    };
    if (canUseStorage()) {
      const stored = JSON.parse(window.localStorage.getItem("dct_admin_custom_blogs") || "[]");
      window.localStorage.setItem("dct_admin_custom_blogs", JSON.stringify([newBlog, ...stored]));
    }
    return newBlog;
  }
};

export const updateBlog = async (id, payload) => {
  try {
    const result = await request(`/api/admin/blogs/${id}`, {
      method: "PUT",
      auth: true,
      body: JSON.stringify(payload),
    });
    return result.item;
  } catch (err) {
    if (canUseStorage()) {
      const stored = JSON.parse(window.localStorage.getItem("dct_admin_custom_blogs") || "[]");
      const updated = stored.map((b) => (b.id === id ? { ...b, ...payload } : b));
      window.localStorage.setItem("dct_admin_custom_blogs", JSON.stringify(updated));
    }
    return { id, ...payload };
  }
};

export const deleteBlog = async (id) => {
  try {
    await request(`/api/admin/blogs/${id}`, {
      method: "DELETE",
      auth: true,
    });
  } catch (err) {
    if (canUseStorage()) {
      const stored = JSON.parse(window.localStorage.getItem("dct_admin_custom_blogs") || "[]");
      const filtered = stored.filter((b) => b.id !== id);
      window.localStorage.setItem("dct_admin_custom_blogs", JSON.stringify(filtered));
    }
  }
};

// ==========================================
// CAREERS MANAGEMENT
// ==========================================
export const getCareers = async () => {
  try {
    const result = await request("/api/admin/careers", { auth: true });
    if (Array.isArray(result.items) && result.items.length > 0) {
      return result.items;
    }
  } catch (err) {
    console.warn("Backend careers fetch warning:", err.message);
  }

  const stored = canUseStorage()
    ? JSON.parse(window.localStorage.getItem("dct_admin_custom_careers") || "[]")
    : [];

  const defaultList = [
    {
      id: "career-full-stack",
      title: "Full-Stack Developer (Node.js & Next.js)",
      type: "Full Time",
      location: "Madhapur, Hyderabad / Hybrid",
      experience: "1-3 Years",
      description: "Build clean, production-grade web applications using Next.js, Node.js, Express, and MySQL. We look for engineers who write clear code, design relational databases with integrity, and take end-to-end ownership of features from API to UI.",
      status: "Closed",
    },
    {
      id: "career-frontend",
      title: "Frontend Developer (React / Tailwind CSS)",
      type: "Full Time",
      location: "Madhapur, Hyderabad",
      experience: "1-2 Years",
      description: "Design and implement responsive, high-performance web interfaces with strict attention to mobile usability, accessibility, and clean component architecture.",
      status: "Closed",
    },
  ];

  return [...stored, ...defaultList];
};

export const createCareer = async (payload) => {
  try {
    const result = await request("/api/admin/careers", {
      method: "POST",
      auth: true,
      body: JSON.stringify(payload),
    });
    return result.item;
  } catch (err) {
    const newCareer = {
      id: `career-local-${Date.now()}`,
      ...payload,
    };
    if (canUseStorage()) {
      const stored = JSON.parse(window.localStorage.getItem("dct_admin_custom_careers") || "[]");
      window.localStorage.setItem("dct_admin_custom_careers", JSON.stringify([newCareer, ...stored]));
    }
    return newCareer;
  }
};

export const updateCareer = async (id, payload) => {
  try {
    const result = await request(`/api/admin/careers/${id}`, {
      method: "PUT",
      auth: true,
      body: JSON.stringify(payload),
    });
    return result.item;
  } catch (err) {
    if (canUseStorage()) {
      const stored = JSON.parse(window.localStorage.getItem("dct_admin_custom_careers") || "[]");
      const updated = stored.map((c) => (c.id === id ? { ...c, ...payload } : c));
      window.localStorage.setItem("dct_admin_custom_careers", JSON.stringify(updated));
    }
    return { id, ...payload };
  }
};

export const deleteCareer = async (id) => {
  try {
    await request(`/api/admin/careers/${id}`, {
      method: "DELETE",
      auth: true,
    });
  } catch (err) {
    if (canUseStorage()) {
      const stored = JSON.parse(window.localStorage.getItem("dct_admin_custom_careers") || "[]");
      const filtered = stored.filter((c) => c.id !== id);
      window.localStorage.setItem("dct_admin_custom_careers", JSON.stringify(filtered));
    }
  }
};

// ==========================================
// PROJECTS MANAGEMENT & UPLOADS
// ==========================================
export const getAdminProjects = async () => {
  try {
    const result = await request("/api/admin/projects", { auth: true });
    if (Array.isArray(result.items) && result.items.length > 0) {
      return result.items.map((p) => ({
        ...p,
        technologies: typeof p.technologies === "string" ? JSON.parse(p.technologies || "[]") : (p.technologies || []),
        features: typeof p.features === "string" ? JSON.parse(p.features || "[]") : (p.features || []),
      }));
    }
  } catch (err) {
    console.warn("Backend projects fetch warning:", err.message);
  }

  const stored = canUseStorage()
    ? JSON.parse(window.localStorage.getItem("dct_admin_custom_projects") || "[]")
    : [];

  const defaultList = PROJECTS.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    client: p.client,
    category: p.category,
    isInternal: p.isInternal || false,
    label: p.label || (p.isInternal ? "Company Website / Internal Project" : "Client Project"),
    summary: p.summary,
    description: p.description,
    technologies: p.technologies || [],
    features: p.architecture ? p.architecture.clientApps.map((a) => a.name) : ["Full-Stack Architecture", "Responsive UI"],
    liveUrl: p.liveUrl || (p.id === "ruchi-bazzar" ? "https://ruchibazzar.com" : null),
    imageUrl: p.id === "ruchi-bazzar" ? "/projects/ruchi-logo.png" : p.isInternal ? "/logo.png" : "/projects/ruchi-logo.png",
    caseStudyUrl: `/projects/${p.slug}`,
    status: "Published",
  }));

  return [...stored, ...defaultList];
};

export const createProject = async (payload) => {
  try {
    const result = await request("/api/admin/projects", {
      method: "POST",
      auth: true,
      body: JSON.stringify(payload),
    });
    const item = result.item;
    return {
      ...item,
      technologies: typeof item.technologies === "string" ? JSON.parse(item.technologies || "[]") : (item.technologies || []),
      features: typeof item.features === "string" ? JSON.parse(item.features || "[]") : (item.features || []),
    };
  } catch (err) {
    const newProject = {
      id: `proj-local-${Date.now()}`,
      ...payload,
      createdAt: new Date().toISOString(),
    };
    if (canUseStorage()) {
      const stored = JSON.parse(window.localStorage.getItem("dct_admin_custom_projects") || "[]");
      window.localStorage.setItem("dct_admin_custom_projects", JSON.stringify([newProject, ...stored]));
    }
    return newProject;
  }
};

export const updateProject = async (id, payload) => {
  try {
    const result = await request(`/api/admin/projects/${id}`, {
      method: "PUT",
      auth: true,
      body: JSON.stringify(payload),
    });
    const item = result.item;
    return {
      ...item,
      technologies: typeof item.technologies === "string" ? JSON.parse(item.technologies || "[]") : (item.technologies || []),
      features: typeof item.features === "string" ? JSON.parse(item.features || "[]") : (item.features || []),
    };
  } catch (err) {
    if (canUseStorage()) {
      const stored = JSON.parse(window.localStorage.getItem("dct_admin_custom_projects") || "[]");
      const updated = stored.map((p) => (p.id === id ? { ...p, ...payload } : p));
      window.localStorage.setItem("dct_admin_custom_projects", JSON.stringify(updated));
    }
    return { id, ...payload };
  }
};

export const deleteProject = async (id) => {
  try {
    await request(`/api/admin/projects/${id}`, {
      method: "DELETE",
      auth: true,
    });
  } catch (err) {
    if (canUseStorage()) {
      const stored = JSON.parse(window.localStorage.getItem("dct_admin_custom_projects") || "[]");
      const filtered = stored.filter((p) => p.id !== id);
      window.localStorage.setItem("dct_admin_custom_projects", JSON.stringify(filtered));
    }
  }
};

// Upload Project Image File
export const uploadProjectImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const apiBase = getApiBaseUrl();
  const fullUrl = apiBase ? `${apiBase}/api/admin/upload` : "/api/admin/upload";

  const response = await fetch(fullUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.ok) {
    throw new Error(data.message || "Failed to upload image.");
  }

  return data.url;
};

// ==========================================
// PRODUCTS MANAGEMENT
// ==========================================
export const getAdminProducts = async () => {
  try {
    const result = await request("/api/admin/products", { auth: true });
    if (Array.isArray(result.items) && result.items.length > 0) {
      return result.items.map((p) => ({
        ...p,
        technologies: typeof p.technologies === "string" ? JSON.parse(p.technologies || "[]") : (p.technologies || []),
        features: typeof p.features === "string" ? JSON.parse(p.features || "[]") : (p.features || []),
      }));
    }
  } catch (err) {
    console.warn("Backend products fetch warning:", err.message);
  }

  const stored = canUseStorage()
    ? JSON.parse(window.localStorage.getItem("dct_admin_custom_products") || "[]")
    : [];

  const defaultList = PRODUCTS.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    label: p.label || "Ready to Deploy",
    summary: p.summary,
    description: p.description,
    price: p.price || "Starting from ₹9,999",
    technologies: p.technologies || [],
    features: p.features || [],
    liveUrl: p.liveUrl || null,
    imageUrl: p.imageUrl || "/projects/ruchi-logo.png",
    status: p.status || "Published",
  }));

  return [...stored, ...defaultList];
};

export const createProduct = async (payload) => {
  try {
    const result = await request("/api/admin/products", {
      method: "POST",
      auth: true,
      body: JSON.stringify(payload),
    });
    const item = result.item;
    return {
      ...item,
      technologies: typeof item.technologies === "string" ? JSON.parse(item.technologies || "[]") : (item.technologies || []),
      features: typeof item.features === "string" ? JSON.parse(item.features || "[]") : (item.features || []),
    };
  } catch (err) {
    const newProduct = {
      id: `prod-local-${Date.now()}`,
      ...payload,
      technologies: Array.isArray(payload.technologies) ? payload.technologies : JSON.parse(payload.technologies || "[]"),
      features: Array.isArray(payload.features) ? payload.features : JSON.parse(payload.features || "[]"),
      createdAt: new Date().toISOString(),
    };
    if (canUseStorage()) {
      const stored = JSON.parse(window.localStorage.getItem("dct_admin_custom_products") || "[]");
      window.localStorage.setItem("dct_admin_custom_products", JSON.stringify([newProduct, ...stored]));
    }
    return newProduct;
  }
};

export const updateProduct = async (id, payload) => {
  try {
    const result = await request(`/api/admin/products/${id}`, {
      method: "PUT",
      auth: true,
      body: JSON.stringify(payload),
    });
    const item = result.item;
    return {
      ...item,
      technologies: typeof item.technologies === "string" ? JSON.parse(item.technologies || "[]") : (item.technologies || []),
      features: typeof item.features === "string" ? JSON.parse(item.features || "[]") : (item.features || []),
    };
  } catch (err) {
    if (canUseStorage()) {
      const stored = JSON.parse(window.localStorage.getItem("dct_admin_custom_products") || "[]");
      const updated = stored.map((p) => (p.id === id ? { ...p, ...payload } : p));
      window.localStorage.setItem("dct_admin_custom_products", JSON.stringify(updated));
    }
    return { id, ...payload };
  }
};

export const deleteProduct = async (id) => {
  try {
    await request(`/api/admin/products/${id}`, {
      method: "DELETE",
      auth: true,
    });
  } catch (err) {
    if (canUseStorage()) {
      const stored = JSON.parse(window.localStorage.getItem("dct_admin_custom_products") || "[]");
      const filtered = stored.filter((p) => p.id !== id);
      window.localStorage.setItem("dct_admin_custom_products", JSON.stringify(filtered));
    }
  }
};

export const uploadProductImage = uploadProjectImage;
export const getProducts = getAdminProducts;

// ==========================================
// ORDERS & PAYMENT MANAGEMENT
// ==========================================
export const getAdminOrders = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = query ? `/api/admin/orders?${query}` : "/api/admin/orders";
  try {
    const result = await request(url, { auth: true });
    return result.items || [];
  } catch (err) {
    console.warn("Backend orders fetch warning:", err.message);
    return [];
  }
};

export const updateOrderStatus = async (id, status, notes = "") => {
  return await request(`/api/admin/orders/${id}/status`, {
    method: "PATCH",
    auth: true,
    body: JSON.stringify({ status, adminNotes: notes }),
  });
};

export const getAdminPaymentSettings = async () => {
  try {
    const result = await request("/api/admin/settings/payment", { auth: true });
    return result.settings || null;
  } catch (err) {
    console.warn("Backend payment settings fetch warning:", err.message);
    return null;
  }
};

export const updateAdminPaymentSettings = async (payload) => {
  return await request("/api/admin/settings/payment", {
    method: "PUT",
    auth: true,
    body: JSON.stringify(payload),
  });
};

export const testAdminPaymentSettings = async () => {
  return await request("/api/admin/settings/payment/test", {
    method: "POST",
    auth: true,
  });
};

// ==========================================
// OFFERS & COUPONS MANAGEMENT
// ==========================================
export const getAdminOffers = async () => {
  try {
    const result = await request("/api/admin/offers", { auth: true });
    return result.offers || result.items || [];
  } catch (err) {
    console.warn("Backend offers fetch warning:", err.message);
    return [];
  }
};

export const getAdminOfferAnalytics = async () => {
  try {
    const result = await request("/api/admin/offers/analytics", { auth: true });
    return result.analytics || null;
  } catch (err) {
    console.warn("Backend offer analytics warning:", err.message);
    return null;
  }
};

export const getAdminOfferRedemptions = async () => {
  try {
    const result = await request("/api/admin/offers/redemptions", { auth: true });
    return result.redemptions || result.items || [];
  } catch (err) {
    console.warn("Backend offer redemptions warning:", err.message);
    return [];
  }
};

export const createAdminOffer = async (payload) => {
  return await request("/api/admin/offers", {
    method: "POST",
    auth: true,
    body: JSON.stringify(payload),
  });
};

export const updateAdminOffer = async (id, payload) => {
  return await request(`/api/admin/offers/${id}`, {
    method: "PUT",
    auth: true,
    body: JSON.stringify(payload),
  });
};

export const deleteAdminOffer = async (id) => {
  return await request(`/api/admin/offers/${id}`, {
    method: "DELETE",
    auth: true,
  });
};

export const toggleAdminOfferStatus = async (id, isActive) => {
  return await request(`/api/admin/offers/${id}/status`, {
    method: "PATCH",
    auth: true,
    body: JSON.stringify({ isActive }),
  });
};

// ==========================================
// RECEIPT MANAGEMENT
// ==========================================
export const getAdminReceipts = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const path = `/api/admin/receipts${query ? `?${query}` : ""}`;
    const result = await request(path, { auth: true });
    return result;
  } catch (err) {
    console.warn("Backend receipts fetch warning:", err.message);
    return { ok: false, receipts: [], total: 0 };
  }
};

export const getAdminReceipt = async (id) => {
  return await request(`/api/admin/receipts/${id}`, { auth: true });
};

export const resendAdminReceipt = async (id, type = "customer") => {
  return await request(`/api/admin/receipts/${id}/resend`, {
    method: "POST",
    auth: true,
    body: JSON.stringify({ type }),
  });
};

export const regenerateAdminReceipt = async (id) => {
  return await request(`/api/admin/receipts/${id}/regenerate`, {
    method: "POST",
    auth: true,
  });
};

export const downloadAdminReceiptPdf = async (id, filename = "receipt.pdf") => {
  const apiBase = getApiBaseUrl();
  const fullUrl = `${apiBase}/api/admin/receipts/${id}/download`;
  const response = await fetch(fullUrl, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to download receipt PDF.");
  }

  const blob = await response.blob();
  const downloadUrl = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(downloadUrl);
};



