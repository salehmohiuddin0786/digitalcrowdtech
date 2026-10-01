"use client";

import React, { useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

/**
 * 21st.dev style SpotlightCard component.
 * Follows mouse position with a dynamic radial illumination beam.
 */
export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(47, 125, 225, 0.16)",
  borderColor = "rgba(47, 125, 225, 0.35)",
  radius = 320,
  ...props
}) {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[#26344F]/80 [html.light_&]:border-slate-200 bg-[#16223A]/70 [html.light_&]:bg-white transition-all duration-300 group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(-1000);
        mouseY.set(-1000);
      }}
      {...props}
    >
      {/* Background Spotlight Radial Gradient */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 -z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />

      {/* Border Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 border border-transparent -z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          borderImage: useMotionTemplate`
            radial-gradient(
              180px circle at ${mouseX}px ${mouseY}px,
              ${borderColor},
              transparent 70%
            ) 1
          `,
        }}
      />

      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}

export default SpotlightCard;
