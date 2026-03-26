"use client";

import { Navbar } from "../organisms/Navbar";
import { Footer } from "../organisms/Footer";

interface BrowseLayoutProps {
  children: React.ReactNode;
}

export function BrowseLayout({ children }: BrowseLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
