"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/service" },
    { name: "Projects", href: "/projects" },
    { name: "Career", href: "/career" },
    { name: "Blog", href: "/blog" },
    // { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 sticky top-0 z-50 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 transform transition-transform group-hover:scale-105 duration-300 overflow-hidden bg-white">
                <Image
                  src="/logo.png"
                  alt="DigitalCrowdTech logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl opacity-0 group-hover:opacity-30 blur transition duration-300"></div>
            </div>
            
            {/* Logo Text */}
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                DigitalCrowdTech
              </span>
              <span className="text-[10px] text-gray-400 tracking-wider -mt-1">Web Development Agency</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group
                    ${isActive
                      ? "text-blue-400"
                      : "text-gray-300 hover:text-white"
                    }`}
                >
                  {item.name}
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-500 rounded-full"></span>
                  )}
                  {/* Hover underline effect */}
                  <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-500 rounded-full transition-all duration-300 group-hover:w-6
                    ${isActive ? "hidden" : ""}`}>
                  </span>
                </Link>
              );
            })}
            
            {/* CTA Button */}
            <Link
              href="/contact"
              className="ml-4 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-medium rounded-full hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/30 transform hover:scale-105"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}></span>
              <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"}`}>
          <div className="flex flex-col space-y-2 pt-2 pb-4">
            {navItems.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200
                    ${isActive
                      ? "bg-blue-600/20 text-blue-400 border-l-4 border-blue-500"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-3 px-4">
              <Link
                href="/contact"
                className="block w-full text-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-medium rounded-full hover:from-blue-500 hover:to-blue-400 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Subtle bottom glow effect */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
    </header>
  );
};

export default Header;
