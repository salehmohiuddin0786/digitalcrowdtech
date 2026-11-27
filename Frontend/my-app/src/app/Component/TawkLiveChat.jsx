"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function TawkLiveChat() {
  const pathname = usePathname();
  const isAdmin = pathname ? pathname.startsWith("/admin") : false;

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Guard against third-party Tawk.to internal logger telemetry in console.error.
    // Tawk.to's twk-main.js internally calls `console.error("[Tawk/Logger]: Error report sent", i)`
    // whenever it encounters transient network/socket disconnects or privacy blocking.
    // In Next.js Turbopack, console.error is captured by the dev overlay.
    const originalConsoleError = console.error;
    console.error = function (...args) {
      if (
        args.length > 0 &&
        typeof args[0] === "string" &&
        (args[0].includes("[Tawk/Logger]") ||
          args[0].includes("tawk.to") ||
          args[0].includes("twk-main.js"))
      ) {
        // Silenced internal telemetry to prevent Turbopack console error overlay
        return;
      }
      originalConsoleError.apply(console, args);
    };

    // 2. Initialize Tawk_API namespace safely
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // 3. Do not inject widget on admin pages
    if (isAdmin) {
      if (window.Tawk_API && typeof window.Tawk_API.hideWidget === "function") {
        try {
          window.Tawk_API.hideWidget();
        } catch {}
      }
      return () => {
        console.error = originalConsoleError;
      };
    } else {
      if (window.Tawk_API && typeof window.Tawk_API.showWidget === "function") {
        try {
          window.Tawk_API.showWidget();
        } catch {}
      }
    }

    // 4. Inject Tawk script once if not already present
    // Note: Do not set crossorigin attribute, as embed.tawk.to CDN does not send CORS
    // headers to arbitrary dev origins like http://localhost:3000, triggering browser CORS blocks.
    const existingScript = document.getElementById("tawk-to-script");
    if (!existingScript) {
      const s1 = document.createElement("script");
      s1.id = "tawk-to-script";
      s1.async = true;
      s1.src = "https://embed.tawk.to/6aeb59c5f00c943c36e1a9a1/1k6jldbgc";
      s1.charset = "UTF-8";
      const s0 = document.getElementsByTagName("script")[0];
      if (s0 && s0.parentNode) {
        s0.parentNode.insertBefore(s1, s0);
      } else {
        document.head.appendChild(s1);
      }
    }

    return () => {
      console.error = originalConsoleError;
    };
  }, [isAdmin, pathname]);

  return null;
}
