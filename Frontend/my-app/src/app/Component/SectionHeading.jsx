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
      className={`flex flex-col max-w-3xl mb-10 md:mb-14 ${alignmentClasses[align] || alignmentClasses.center} ${className}`}
    >
      {badge && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#567785]/10 [html.dark_&]:bg-[#567785]/20 border border-[#567785]/30 text-[#567785] [html.dark_&]:text-[#8EAEBD] mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E89228]" />
          <span>{badge}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1E293B] [html.dark_&]:text-white tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-slate-600 [html.dark_&]:text-slate-400 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
