"use client";

import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-4">
      <Link href="/" className="mb-8">
        <span
          className="text-3xl font-black uppercase tracking-tighter"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="text-[#BFFF00]">GYM</span>
          <span className="text-[#F5F5F5]">&</span>
          <span className="text-[#BFFF00]">TONIC</span>
        </span>
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
