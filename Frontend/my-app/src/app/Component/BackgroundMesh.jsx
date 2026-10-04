"use client";

import React from "react";

/**
 * Ambient Futuristic Background Mesh
 * Features smooth, breathing animated radial gradient orbs (Royal Blue + Deep Orange + Cyan + Indigo)
 * coupled with a subtle matrix grid overlay and depth vignette.
 */
export default function BackgroundMesh() {
  return (
    <>
      {/* Dynamic Animated Mesh Gradient Orbs */}
      <div className="mesh-gradient-bg" aria-hidden="true">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
        <div className="mesh-orb mesh-orb-4" />
      </div>

      {/* Futuristic Subtle Grid Overlay */}
      <div className="tech-grid-overlay" aria-hidden="true" />
    </>
  );
}
