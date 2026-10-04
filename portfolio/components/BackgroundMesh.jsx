import React from 'react';

export default function BackgroundMesh() {
  return (
    <>
      {/* Dynamic Animated Mesh Gradient Orbs (liminiq-inspired) */}
      <div className="mesh-gradient" aria-hidden="true">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
        <div className="mesh-orb mesh-orb-4" />
      </div>

      {/* Subtle futuristic matrix grid overlay */}
      <div className="grid-overlay" aria-hidden="true" />
    </>
  );
}
