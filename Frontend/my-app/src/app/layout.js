import { Geist, Geist_Mono } from "next/font/google";
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
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
