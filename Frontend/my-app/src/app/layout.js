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
  title: "Digital Crowd Tech",
  description: "Digital Crowd Tech website",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
