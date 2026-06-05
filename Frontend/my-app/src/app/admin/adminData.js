"use client";

export const ADMIN_EMAIL = "admin@digitalcrowdtech.in";

const tokenKey = "digitalcrowdtech_admin_token";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.digitalcrowdtech.in";

const canUseStorage = () => typeof window !== "undefined";

const getToken = () => (canUseStorage() ? window.localStorage.getItem(tokenKey) : "");

const request = async (path, options = {}) => {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.auth ? { Authorization: `Bearer ${getToken()}` } : {}),
      ...(options.headers || {}),
    },
  });
  const result = await response.json();

  if (!response.ok || !result.ok) {
    throw new Error(result.message || "Request failed.");
  }

  return result;
};

export const isAdminLoggedIn = () => Boolean(getToken());

export const loginAdmin = async (email, password) => {
  const result = await request("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (canUseStorage()) {
    window.localStorage.setItem(tokenKey, result.token);
  }

  return result;
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

export const getBlogs = async () => {
  const result = await request("/api/admin/blogs", { auth: true });
  return result.items;
};

export const createBlog = async (payload) => {
  const result = await request("/api/admin/blogs", {
    method: "POST",
    auth: true,
    body: JSON.stringify(payload),
  });
  return result.item;
};

export const updateBlog = async (id, payload) => {
  const result = await request(`/api/admin/blogs/${id}`, {
    method: "PUT",
    auth: true,
    body: JSON.stringify(payload),
  });
  return result.item;
};

export const deleteBlog = async (id) => {
  await request(`/api/admin/blogs/${id}`, {
    method: "DELETE",
    auth: true,
  });
};

export const getCareers = async () => {
  const result = await request("/api/admin/careers", { auth: true });
  return result.items;
};

export const getQueries = async () => {
  const result = await request("/api/admin/queries", { auth: true });
  return result.items;
};

export const createCareer = async (payload) => {
  const result = await request("/api/admin/careers", {
    method: "POST",
    auth: true,
    body: JSON.stringify(payload),
  });
  return result.item;
};

export const updateCareer = async (id, payload) => {
  const result = await request(`/api/admin/careers/${id}`, {
    method: "PUT",
    auth: true,
    body: JSON.stringify(payload),
  });
  return result.item;
};

export const deleteCareer = async (id) => {
  await request(`/api/admin/careers/${id}`, {
    method: "DELETE",
    auth: true,
  });
};

export const getPublicBlogs = async () => {
  const result = await request("/api/blogs");
  return result.items;
};

export const getPublicCareers = async () => {
  const result = await request("/api/careers");
  return result.items;
};
