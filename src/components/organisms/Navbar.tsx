"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { SearchBar } from "../molecules/SearchBar";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-[#2A2A2A]/50" : "bg-gradient-to-b from-[#0A0A0A]/80 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-12 h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xl md:text-2xl font-black uppercase tracking-tighter" style={{ fontFamily: "var(--font-display)" }}>
            <span className="text-[#BFFF00]">GYM</span>
            <span className="text-[#F5F5F5]">&</span>
            <span className="text-[#BFFF00]">TONIC</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm text-[#F5F5F5] hover:text-[#BFFF00] transition-colors font-medium">
            Home
          </Link>
          <Link href="/search" className="text-sm text-[#A3A3A3] hover:text-[#BFFF00] transition-colors">
            Browse
          </Link>
          <Link href="/my-list" className="text-sm text-[#A3A3A3] hover:text-[#BFFF00] transition-colors">
            My List
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Search toggle */}
          <div className="hidden md:block">
            {showSearch ? (
              <div className="flex items-center gap-2" style={{ animation: "fade-in 0.2s ease-out" }}>
                <SearchBar compact className="w-64" />
                <button
                  onClick={() => setShowSearch(false)}
                  className="text-[#A3A3A3] hover:text-[#F5F5F5] p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="text-[#A3A3A3] hover:text-[#BFFF00] transition-colors p-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </div>

          {/* Auth */}
          <Link
            href="/sign-in"
            className="px-4 py-2 bg-[#BFFF00] text-[#0A0A0A] text-sm font-semibold rounded-lg hover:bg-[#D4FF33] transition-colors"
          >
            Sign In
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden text-[#F5F5F5] p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="md:hidden bg-[#0A0A0A] border-t border-[#2A2A2A] px-4 py-4 space-y-3" style={{ animation: "fade-in 0.2s ease-out" }}>
          <SearchBar compact />
          <Link href="/" className="block py-2 text-[#F5F5F5] font-medium" onClick={() => setMobileMenu(false)}>
            Home
          </Link>
          <Link href="/search" className="block py-2 text-[#A3A3A3]" onClick={() => setMobileMenu(false)}>
            Browse
          </Link>
          <Link href="/my-list" className="block py-2 text-[#A3A3A3]" onClick={() => setMobileMenu(false)}>
            My List
          </Link>
        </div>
      )}
    </nav>
  );
}
