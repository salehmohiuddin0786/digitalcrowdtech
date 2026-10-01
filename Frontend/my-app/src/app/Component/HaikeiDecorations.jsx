import React from "react";

/**
 * Haikei-inspired SVG layered wave divider for smooth section transitions.
 * Supports flipped orientation (top/bottom) and custom fill colors.
 */
export function HaikeiWave({
  className = "",
  flip = false,
  fillColor = "fill-[#101A2E]",
  lightFillColor = "[html.light_&]:fill-[#F4F7FB]",
  height = "h-12 sm:h-16 lg:h-20",
}) {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${
        flip ? "rotate-180" : ""
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        className={`w-full ${height} ${fillColor} ${lightFillColor} transition-colors duration-300`}
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0,32L48,42.7C96,53,192,75,288,74.7C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,74.7C1248,64,1344,32,1392,16L1440,0L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

/**
 * Haikei-inspired layered double-wave divider for more organic depth.
 */
export function HaikeiLayeredWave({
  className = "",
  flip = false,
  topFill = "fill-[#2F7DE1]/10",
  bottomFill = "fill-[#101A2E]",
  lightBottomFill = "[html.light_&]:fill-[#F4F7FB]",
}) {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${
        flip ? "rotate-180 -mt-1" : "-mb-1"
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-14 sm:h-20 lg:h-24"
        viewBox="0 0 1440 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Layer 1: Semi-transparent accent curve */}
        <path
          d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,80C960,96,1056,128,1152,128C1248,128,1344,96,1392,80L1440,64L1440,160L1392,160C1344,160,1248,160,1152,160C1056,160,960,160,864,160C768,160,672,160,576,160C480,160,384,160,288,160C192,160,96,160,48,160L0,160Z"
          className={topFill}
        />
        {/* Layer 2: Solid target background curve */}
        <path
          d="M0,96L60,101.3C120,107,240,117,360,106.7C480,96,600,64,720,58.7C840,53,960,75,1080,85.3C1200,96,1320,96,1380,96L1440,96L1440,160L1380,160C1320,160,1200,160,1080,160C960,160,840,160,720,160C600,160,480,160,360,160C240,160,120,160,60,160L0,160Z"
          className={`${bottomFill} ${lightBottomFill}`}
        />
      </svg>
    </div>
  );
}

/**
 * Haikei polygon mesh & radial glow background for hero and featured sections.
 */
export function HaikeiMeshGlow({ className = "" }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}
      aria-hidden="true"
    >
      {/* Radial ambient glow (Blue & Orange) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#2F7DE1]/15 to-[#F87000]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-24 right-10 w-96 h-96 bg-[#2F7DE1]/10 [html.light_&]:bg-[#2F7DE1]/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-[#F87000]/10 [html.light_&]:bg-[#F87000]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Subtle geometric SVG polygon constellation */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20 [html.light_&]:opacity-10 stroke-[#2F7DE1]/30 [html.light_&]:stroke-slate-400/40"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <pattern
            id="haikei-tech-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="2 4"
            />
            <circle cx="0" cy="0" r="1.5" fill="#2F7DE1" className="opacity-40" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#haikei-tech-grid)" />
      </svg>
    </div>
  );
}

/**
 * Motion Primitives Badge with glowing status pulse.
 */
export function StatusBadge({
  text = "Available for New Projects",
  tone = "emerald",
  className = "",
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md transition-all duration-300 ${
        tone === "emerald"
          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shadow-sm shadow-emerald-500/10"
          : tone === "orange"
          ? "bg-[#F87000]/10 text-[#F87000] border border-[#F87000]/30 shadow-sm shadow-orange-500/10"
          : "bg-[#2F7DE1]/10 text-[#2F7DE1] border border-[#2F7DE1]/30 shadow-sm shadow-blue-500/10"
      } ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            tone === "emerald"
              ? "bg-emerald-400"
              : tone === "orange"
              ? "bg-[#F87000]"
              : "bg-[#2F7DE1]"
          }`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            tone === "emerald"
              ? "bg-emerald-500"
              : tone === "orange"
              ? "bg-[#F87000]"
              : "bg-[#2F7DE1]"
          }`}
        />
      </span>
      <span>{text}</span>
    </div>
  );
}
