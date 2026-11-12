import React from "react";

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  className = "",
}) {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div
      className={`flex flex-col max-w-3xl mb-12 md:mb-16 ${alignmentClasses[align] || alignmentClasses.center} ${className}`}
    >
      {badge && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-3.5">
          <span>{badge}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
