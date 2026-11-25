import React from "react";
import { notFound } from "next/navigation";
import { PRODUCTS, findProductBySlugOrAlias, getAllProductSlugs } from "../../data/products";
import ProductDetailClient from "./ProductDetailClient";

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

async function getProductBySlug(rawSlug) {
  if (!rawSlug) return null;
  const decodedSlug = decodeURIComponent(rawSlug).trim().toLowerCase();
  const staticFallback = findProductBySlugOrAlias(decodedSlug) || {};

  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
    const res = await fetch(`${apiBase}/api/products/${encodeURIComponent(decodedSlug)}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      const p = data.product || data.item;
      if (data.ok && p) {
        const parsedTech =
          typeof p.technologies === "string"
            ? JSON.parse(p.technologies || "[]")
            : p.technologies || [];
        const parsedFeatures =
          typeof p.features === "string"
            ? JSON.parse(p.features || "[]")
            : p.features || [];
        const parsedScreenshots =
          typeof p.screenshots === "string"
            ? JSON.parse(p.screenshots || "[]")
            : p.screenshots || [];
        const parsedPricing =
          typeof p.pricingPlans === "string"
            ? JSON.parse(p.pricingPlans || "[]")
            : p.pricingPlans || [];
        const parsedOverview =
          typeof p.overview === "string"
            ? JSON.parse(p.overview || "{}")
            : p.overview || {};

        return {
          ...staticFallback,
          ...p,
          imageUrl:
            p.imageUrl && p.imageUrl !== "/logo.png"
              ? p.imageUrl
              : staticFallback.imageUrl || `/products/${p.slug}-preview.png`,
          price:
            p.price && p.price !== "Starting from ₹4,999"
              ? p.price
              : staticFallback.price || p.price,
          technologies:
            parsedTech.length > 0
              ? parsedTech
              : staticFallback.technologies || [],
          features:
            parsedFeatures.length > 0
              ? parsedFeatures
              : staticFallback.features || [],
          screenshots:
            parsedScreenshots.length > 0
              ? parsedScreenshots
              : staticFallback.screenshots || [],
          pricingPlans:
            parsedPricing.length > 0
              ? parsedPricing
              : staticFallback.pricingPlans || [],
          overview:
            parsedOverview && Object.keys(parsedOverview).length > 0
              ? parsedOverview
              : staticFallback.overview || {},
        };
      }
    }
  } catch (err) {
    // API network error fallback to static data
  }

  // Fallback to static PRODUCTS with intelligent alias mapping
  const found = findProductBySlugOrAlias(decodedSlug);
  return found || null;
}

async function getAllProducts() {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
    const res = await fetch(`${apiBase}/api/products`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (data.ok && Array.isArray(data.items) && data.items.length > 0) {
        return data.items.map((p) => ({
          ...p,
          imageUrl: p.imageUrl || `/products/${p.slug}-preview.png`,
          technologies:
            typeof p.technologies === "string"
              ? JSON.parse(p.technologies || "[]")
              : p.technologies || [],
          features:
            typeof p.features === "string"
              ? JSON.parse(p.features || "[]")
              : p.features || [],
          screenshots:
            typeof p.screenshots === "string"
              ? JSON.parse(p.screenshots || "[]")
              : p.screenshots || [],
          pricingPlans:
            typeof p.pricingPlans === "string"
              ? JSON.parse(p.pricingPlans || "[]")
              : p.pricingPlans || [],
          overview:
            typeof p.overview === "string"
              ? JSON.parse(p.overview || "{}")
              : p.overview || {},
        }));
      }
    }
  } catch (e) {
    // Fallback
  }
  return PRODUCTS;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Digital Crowd Technologies",
      description: "The requested software platform could not be found.",
    };
  }

  return {
    title: `${product.title} - Turnkey Software Suite | Digital Crowd Tech`,
    description: product.summary || product.description,
    alternates: {
      canonical: `https://digitalcrowdtech.in/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.title} | Digital Crowd Tech`,
      description: product.summary,
      url: `https://digitalcrowdtech.in/products/${product.slug}`,
      siteName: "Digital Crowd Technologies",
      locale: "en_IN",
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getAllProducts(),
  ]);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} allProducts={allProducts} />;
}
