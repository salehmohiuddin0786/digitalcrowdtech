"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

function applyTheme(mode) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (mode === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
  } else if (mode === "light") {
    root.classList.add("light");
    root.classList.remove("dark");
  } else {
    const isDark = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }
}

function subscribe(callback) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const handleMedia = () => {
    if (localStorage.getItem("dct_theme") === "system") {
      applyTheme("system");
      callback();
    }
  };
  media.addEventListener("change", handleMedia);
  return () => {
    window.removeEventListener("storage", callback);
    media.removeEventListener("change", handleMedia);
  };
}

function getSnapshot() {
  if (typeof window === "undefined") return "system";
  return localStorage.getItem("dct_theme") || "system";
}

function getServerSnapshot() {
  return "system";
}

export default function ThemeToggle() {
  const themeMode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    applyTheme(themeMode);
  }, [themeMode]);

  const cycleTheme = () => {
    const nextMode = themeMode === "system" ? "dark" : themeMode === "dark" ? "light" : "system";
    localStorage.setItem("dct_theme", nextMode);
    applyTheme(nextMode);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <button
      onClick={cycleTheme}
      type="button"
      title={`Theme: ${themeMode.toUpperCase()} (Click to toggle)`}
      aria-label="Toggle dark/light mode"
      className="relative flex items-center justify-center w-8 h-8 rounded-full border border-[#26344F] [html.light_&]:border-slate-300 bg-white/5 [html.light_&]:bg-slate-100 hover:bg-white/10 [html.light_&]:hover:bg-slate-200 text-slate-300 [html.light_&]:text-[#0A2540] transition-colors"
    >
      {themeMode === "system" ? (
        <Monitor className="h-4 w-4 text-[#2F7DE1]" />
      ) : themeMode === "dark" ? (
        <Moon className="h-4 w-4 text-amber-300" />
      ) : (
        <Sun className="h-4 w-4 text-[#F87000]" />
      )}
    </button>
  );
}
