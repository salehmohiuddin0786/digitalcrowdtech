"use client";

import React from "react";

/**
 * 21st.dev style Infinite Marquee component.
 * Horizontally scrolls an array of elements in a seamless loop with edge fades and pause on hover.
 */
export function TechMarquee({
  items = [],
  speed = 32,
  pauseOnHover = true,
  reverse = false,
  className = "",
}) {
  if (!items.length) return null;

  return (
    <div
      className={`relative w-full overflow-hidden select-none flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}
    >
      <div
        className={`flex min-w-full shrink-0 items-center justify-around gap-4 py-2 animate-marquee ${
          reverse ? "[animation-direction:reverse]" : ""
        } ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((item, idx) => (
          <div key={`m1-${idx}`} className="shrink-0">
            {item}
          </div>
        ))}
      </div>

      <div
        aria-hidden="true"
        className={`flex min-w-full shrink-0 items-center justify-around gap-4 py-2 animate-marquee ${
          reverse ? "[animation-direction:reverse]" : ""
        } ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((item, idx) => (
          <div key={`m2-${idx}`} className="shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechMarquee;
