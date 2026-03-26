"use client";

import { Navbar } from "../organisms/Navbar";

interface WatchLayoutProps {
  children: React.ReactNode;
}

export function WatchLayout({ children }: WatchLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
