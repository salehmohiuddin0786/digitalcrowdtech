import { SERVICES } from "./data/services";
import { PROJECTS } from "./data/projects";
import { BLOG_POSTS } from "./data/blogs";

export default function sitemap() {
  const baseUrl = "https://digitalcrowdtech.in";
  const currentDate = new Date().toISOString();

  // Core static pages
  const staticPages = [
    "",
    "/about",
    "/services",
    "/projects",
    "/pricing",
    "/process",
    "/blog",
    "/careers",
    "/contact",
    "/faq",
    "/privacy-policy",
    "/terms-and-conditions",
    "/refund-policy",
    "/cookie-policy",
    "/web-development-company-hyderabad",
    "/ecommerce-development-hyderabad",
    "/custom-software-development-hyderabad",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/services") ? 0.9 : 0.8,
  }));

  // Services
  const servicePages = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Projects
  const projectPages = PROJECTS.filter((p) => p.caseStudyUrl).map((project) => ({
    url: `${baseUrl}${project.caseStudyUrl}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Blog Posts
  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticPages, ...servicePages, ...projectPages, ...blogPages];
}
