"use client";

import { BLOG_POSTS } from "../data/blogs";
import { PROJECTS } from "../data/projects";

export const ADMIN_EMAIL = "admin@digitalcrowdtech.in";

const tokenKey = "digitalcrowdtech_admin_token";
const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5001"
    : "");

const canUseStorage = () => typeof window !== "undefined";

const getToken = () => (canUseStorage() ? window.localStorage.getItem(tokenKey) : "");

const request = async (path, options = {}) => {
  const fullUrl = apiBaseUrl ? `${apiBaseUrl}${path}` : path;

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
        message: "We need a custom web portal to track driver trips, fuel expenses, and customer billing with GST invoices.",
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

  const fullUrl = apiBaseUrl ? `${apiBaseUrl}/api/admin/upload` : "/api/admin/upload";

  const response = await fetch(fullUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });

  const data = await response.json();
  if (!response.ok || !data.ok) {
    throw new Error(data.message || "Failed to upload image.");
  }

  return data.url;
};
