"use client";

import React from "react";

/**
 * 21st.dev / Magic UI style BorderBeam component.
 * Renders an animated luminous light beam travelling along the container perimeter.
 */
export function BorderBeam({
  className = "",
  duration = 7,
  colorFrom = "#2F7DE1",
  colorTo = "#F87000",
  rx = 16,
  strokeWidth = 2,
}) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 w-full h-full rounded-[inherit] ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="border-beam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colorFrom} stopOpacity="1" />
          <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.85" />
          <stop offset="100%" stopColor={colorTo} stopOpacity="1" />
        </linearGradient>
      </defs>
      <rect
        x={strokeWidth / 2}
        y={strokeWidth / 2}
        width={`calc(100% - ${strokeWidth}px)`}
        height={`calc(100% - ${strokeWidth}px)`}
        rx={rx}
        stroke="url(#border-beam-gradient)"
        strokeWidth={strokeWidth}
        strokeDasharray="160 800"
        strokeLinecap="round"
        className="animate-border-beam-svg"
        style={{ animationDuration: `${duration}s` }}
      />
    </svg>
  );
}

export default BorderBeam;
