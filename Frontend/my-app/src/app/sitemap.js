import { SERVICES } from "./data/services";
import { PROJECTS } from "./data/projects";
import { PRODUCTS } from "./data/products";
import { BLOG_POSTS } from "./data/blogs";

/**
 * ==============================================================================
 * SITEMAP SECURITY POLICY & RULES ENFORCEMENT
 * ==============================================================================
 * 1. NEVER include private user URLs (/user, /account, /profile, /settings, etc.).
 * 2. NEVER include admin dashboard URLs (/admin, /admin/*, /login, etc.).
 * 3. NEVER include API routes (/api, /api/*, /webhook, etc.).
 * 4. NEVER expose sensitive information, query tokens, or internal database IDs.
 * 5. Keep sitemap updated automatically as pages/data change (force-dynamic).
 * 6. Always return HTTP 200 OK when accessed publicly.
 * ==============================================================================
 */

// Force dynamic computation so new pages and data additions are reflected immediately
export const dynamic = "force-dynamic";
export const revalidate = 0;

const BASE_URL = "https://digitalcrowdtech.in";

// Strict pattern blacklist for security enforcement
const DISALLOWED_PATTERNS = [
  /^\/admin(\/.*)?$/i,
  /^\/api(\/.*)?$/i,
  /^\/user(\/.*)?$/i,
  /^\/account(\/.*)?$/i,
  /^\/profile(\/.*)?$/i,
  /^\/dashboard(\/.*)?$/i,
  /^\/auth(\/.*)?$/i,
  /^\/login(\/.*)?$/i,
  /^\/logout(\/.*)?$/i,
  /^\/signin(\/.*)?$/i,
  /^\/signup(\/.*)?$/i,
  /^\/settings(\/.*)?$/i,
  /^\/checkout(\/.*)?$/i,
  /^\/cart(\/.*)?$/i,
  /^\/orders?(\/.*)?$/i,
  /^\/reset-password(\/.*)?$/i,
  /^\/forgot-password(\/.*)?$/i,
  /^\/verify(\/.*)?$/i,
  /[?&#](id|token|key|secret|session|auth|password|jwt)=/i,
  /\.(env|git|json|sql|log|bak|lock)$/i,
];

/**
 * Validates whether a relative path or full URL complies with all security rules.
 */
function isSecurityCompliantPath(path) {
  if (!path || typeof path !== "string") return false;

  const normalized = path.startsWith(BASE_URL)
    ? path.replace(BASE_URL, "")
    : path;

  // Must start with '/' or be empty (for homepage)
  if (normalized !== "" && !normalized.startsWith("/")) return false;

  // Check against all security blacklist patterns
  for (const pattern of DISALLOWED_PATTERNS) {
    if (pattern.test(normalized)) {
      return false;
    }
  }

  // Reject raw integer internal IDs (e.g., /projects/123 instead of /projects/ruchi-bazzar)
  const segments = normalized.split("/").filter(Boolean);
  for (const seg of segments) {
    if (/^\d+$/.test(seg)) {
      return false;
    }
  }

  return true;
}

export default function sitemap() {
  const currentDate = new Date().toISOString();

  try {
    // 1. Core Public Static Pages (strictly verified)
    const staticRoutes = [
      "",
      "/about",
      "/services",
      "/products",
      "/projects",
      "/portfolio",
      "/pricing",
      "/process",
      "/blog",
      "/careers",
      "/contact",
      "/faq",
      "/sitemap",
      "/privacy-policy",
      "/terms-and-conditions",
      "/refund-policy",
      "/cookie-policy",
      "/web-development-company-hyderabad",
      "/ecommerce-development-hyderabad",
      "/custom-software-development-hyderabad",
    ];

    const staticPages = staticRoutes
      .filter((route) => isSecurityCompliantPath(route))
      .map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: currentDate,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : route.startsWith("/services") ? 0.9 : 0.8,
      }));

    // 2. Dynamic Engineering Services (from services data)
    const servicePages = (Array.isArray(SERVICES) ? SERVICES : [])
      .filter((s) => s && s.slug && isSecurityCompliantPath(`/services/${s.slug}`))
      .map((service) => ({
        url: `${BASE_URL}/services/${encodeURIComponent(service.slug)}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.9,
      }));

    // 3. Dynamic Case Studies & Verified Projects (public only, no drafts/internal IDs)
    const projectPages = (Array.isArray(PROJECTS) ? PROJECTS : [])
      .filter(
        (p) =>
          p &&
          p.caseStudyUrl &&
          p.status !== "Draft" &&
          p.status !== "Internal" &&
          isSecurityCompliantPath(p.caseStudyUrl)
      )
      .map((project) => ({
        url: `${BASE_URL}${project.caseStudyUrl}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.85,
      }));

    // 4. Dynamic Turnkey Products (public only)
    const productPages = (Array.isArray(PRODUCTS) ? PRODUCTS : [])
      .filter(
        (prod) =>
          prod &&
          prod.slug &&
          prod.status !== "Draft" &&
          isSecurityCompliantPath(`/products#${prod.slug}`)
      )
      .map((prod) => ({
        url: `${BASE_URL}/products#${encodeURIComponent(prod.slug)}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.85,
      }));

    // 5. Dynamic Technical Blog Posts (published articles only)
    const blogPages = (Array.isArray(BLOG_POSTS) ? BLOG_POSTS : [])
      .filter(
        (post) =>
          post &&
          post.slug &&
          post.status !== "Draft" &&
          isSecurityCompliantPath(`/blog/${post.slug}`)
      )
      .map((post) => ({
        url: `${BASE_URL}/blog/${encodeURIComponent(post.slug)}`,
        lastModified: post.date ? new Date(post.date).toISOString() : currentDate,
        changeFrequency: "monthly",
        priority: 0.75,
      }));

    // Deduplicate and final security sweep
    const seenUrls = new Set();
    const finalEntries = [];

    const allEntries = [
      ...staticPages,
      ...servicePages,
      ...projectPages,
      ...productPages,
      ...blogPages,
    ];

    for (const entry of allEntries) {
      if (!seenUrls.has(entry.url) && isSecurityCompliantPath(entry.url)) {
        seenUrls.add(entry.url);
        finalEntries.push(entry);
      }
    }

    return finalEntries;
  } catch (error) {
    // Fail-safe fallback to guarantee HTTP 200 OK publicly at all times
    return [
      {
        url: BASE_URL,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 1.0,
      },
      {
        url: `${BASE_URL}/services`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/contact`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.8,
      },
    ];
  }
}
