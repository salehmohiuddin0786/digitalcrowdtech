import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SiteChrome from "./Component/SiteChrome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B1220",
};

export const metadata = {
  metadataBase: new URL("https://digitalcrowdtech.in"),
  title: {
    default: "Digital Crowd Technologies | We Design. We Develop. We Deploy.",
    template: "%s | Digital Crowd Technologies",
  },
  description:
    "Digital Crowd Technologies builds professional websites, custom web applications, e-commerce platforms and backend systems for businesses in Hyderabad and across India.",
  keywords: [
    "web development company Hyderabad",
    "website development Hyderabad",
    "custom web development Hyderabad",
    "e-commerce development Hyderabad",
    "backend development Hyderabad",
    "REST API development Hyderabad",
    "ERP software Hyderabad",
    "school management software Hyderabad",
  ],
  authors: [{ name: "Digital Crowd Technologies" }],
  creator: "Digital Crowd Technologies",
  publisher: "Digital Crowd Technologies",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Digital Crowd Technologies | We Design. We Develop. We Deploy.",
    description:
      "Digital Crowd Technologies builds professional websites, custom web applications, e-commerce platforms and backend systems for businesses in Hyderabad and across India.",
    url: "https://digitalcrowdtech.in",
    siteName: "Digital Crowd Technologies",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Crowd Technologies | We Design. We Develop. We Deploy.",
    description:
      "Digital Crowd Technologies builds professional websites, custom web applications, e-commerce platforms and backend systems for businesses in Hyderabad and across India.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Anti-flash theme bootstrap script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("dct_theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;if(s==="dark"||(!s&&d)||(s==="system"&&d)){document.documentElement.classList.add("dark");document.documentElement.classList.remove("light");}else{document.documentElement.classList.add("light");document.documentElement.classList.remove("dark");}}catch(e){}})();`,
          }}
        />

        {/* LocalBusiness JSON-LD Schema for Google Local Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://digitalcrowdtech.in/#organization",
              "name": "Digital Crowd Technologies",
              "url": "https://digitalcrowdtech.in",
              "telephone": "+91-9985960692",
              "email": "support@digitalcrowdtech.in",
              "priceRange": "₹4,999+",
              "parentOrganization": {
                "@type": "Organization",
                "name": "DEW Solutions",
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress":
                  "Unit No 203, 2nd Floor, Suite No. 806, SBR CV Towers, Madhapur",
                "addressLocality": "Hyderabad",
                "addressRegion": "Telangana",
                "postalCode": "500081",
                "addressCountry": "IN",
              },
              "areaServed": ["Madhapur", "Hyderabad", "Telangana", "India"],
              "sameAs": [
                "https://www.instagram.com/digitalcrowdtech/",
                "https://www.linkedin.com/company/digitalcrowdtech",
                "https://github.com/digitalcrowdtech",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SiteChrome>{children}</SiteChrome>

        {/* Tawk.to Live Chat Script */}
        <Script
          id="tawk-to-live-chat"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
              (function(){
                var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
                s1.async = true;
                s1.src = 'https://embed.tawk.to/6aeb59c5f00c943c36e1a9a1/1k6jldbgc';
                s1.charset = 'UTF-8';
                s1.setAttribute('crossorigin', '*');
                s0.parentNode.insertBefore(s1, s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
