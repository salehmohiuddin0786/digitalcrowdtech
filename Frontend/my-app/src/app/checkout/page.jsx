import React, { Suspense } from "react";
import { PRODUCTS } from "../data/products";
import CheckoutClient from "./CheckoutClient";

export const metadata = {
  title: "Secure Checkout | Digital Crowd Technologies",
  description: "Complete your software license purchase securely with PhonePe Business merchant UPI.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/checkout",
  },
};

async function getProducts() {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
    const res = await fetch(`${apiBase}/api/products`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (data.ok && Array.isArray(data.items) && data.items.length > 0) {
        return data.items.map((p) => ({
          ...p,
          technologies: typeof p.technologies === "string" ? JSON.parse(p.technologies || "[]") : (p.technologies || []),
          features: typeof p.features === "string" ? JSON.parse(p.features || "[]") : (p.features || []),
          screenshots: typeof p.screenshots === "string" ? JSON.parse(p.screenshots || "[]") : (p.screenshots || []),
          pricingPlans: typeof p.pricingPlans === "string" ? JSON.parse(p.pricingPlans || "[]") : (p.pricingPlans || []),
          overview: typeof p.overview === "string" ? JSON.parse(p.overview || "{}") : (p.overview || {}),
        }));
      }
    }
  } catch (e) {
    // Fallback to static PRODUCTS
  }
  return PRODUCTS;
}

export default async function CheckoutPage() {
  const products = await getProducts();

  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-slate-400 font-mono text-xs">
          Loading secure checkout environment...
        </div>
      }
    >
      <CheckoutClient initialProducts={products} />
    </Suspense>
  );
}
