"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#2A2A2A] mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <span
                className="text-xl font-black uppercase tracking-tighter"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="text-[#BFFF00]">GYM</span>
                <span className="text-[#F5F5F5]">&</span>
                <span className="text-[#BFFF00]">TONIC</span>
              </span>
            </Link>
            <p className="text-sm text-[#A3A3A3] mt-3 max-w-xs">
              Comedy meets fitness. Get ripped while you get the giggles. 🍋
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#F5F5F5] mb-3">Browse</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-[#A3A3A3] hover:text-[#BFFF00] transition-colors">Home</Link></li>
              <li><Link href="/search" className="text-sm text-[#A3A3A3] hover:text-[#BFFF00] transition-colors">Search</Link></li>
              <li><Link href="/my-list" className="text-sm text-[#A3A3A3] hover:text-[#BFFF00] transition-colors">My List</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#F5F5F5] mb-3">Categories</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-[#A3A3A3]">HIIT Comedy</span></li>
              <li><span className="text-sm text-[#A3A3A3]">Yoga Giggles</span></li>
              <li><span className="text-sm text-[#A3A3A3]">Stand-Up & Squat</span></li>
              <li><span className="text-sm text-[#A3A3A3]">Cardio Roast</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#F5F5F5] mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-[#A3A3A3]">Terms of Service</span></li>
              <li><span className="text-sm text-[#A3A3A3]">Privacy Policy</span></li>
              <li><span className="text-sm text-[#A3A3A3]">Contact</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2A2A2A] mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#666]">© 2026 Gym & Tonic. All rights reserved. No abs were harmed in the making of this app.</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#666]">Made with 💪 and 😂</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
