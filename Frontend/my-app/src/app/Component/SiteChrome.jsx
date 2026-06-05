"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

const SiteChrome = ({ children }) => {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className="flex-1">{children}</main>
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default SiteChrome;
