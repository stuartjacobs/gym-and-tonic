"use client";

import { Navbar } from "../organisms/Navbar";
import { Footer } from "../organisms/Footer";

interface ShowLayoutProps {
  children: React.ReactNode;
}

export function ShowLayout({ children }: ShowLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <main className="pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  );
}
