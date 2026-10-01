"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * 21st.dev / Magic UI style ShimmerButton component.
 * High-conversion CTA with continuous light shimmer sweep and hover scale.
 */
export function ShimmerButton({
  href,
  children,
  className = "",
  background = "#F87000",
  hoverBackground = "#FF8A24",
  shimmerDuration = "3s",
  icon = true,
  onClick,
  ...props
}) {
  const content = (
    <>
      {/* Animated Light Sweep */}
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full animate-shimmer-sweep bg-gradient-to-r from-transparent via-white/40 to-transparent"
        style={{ animationDuration: shimmerDuration }}
      />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        {icon && (
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        )}
      </span>
    </>
  );

  const baseClasses = `relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 group ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={baseClasses}
        style={{ backgroundColor: background }}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={baseClasses}
      style={{ backgroundColor: background }}
      {...props}
    >
      {content}
    </button>
  );
}

export default ShimmerButton;
