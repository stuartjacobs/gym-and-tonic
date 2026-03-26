"use client";

import Link from "next/link";
import { Avatar } from "../atoms/Avatar";

interface ComedianItem {
  name: string;
  slug: string;
  avatar: string;
  bio: string;
}

interface ComedianGridProps {
  comedians: ComedianItem[];
  title?: string;
}

export function ComedianGrid({ comedians, title }: ComedianGridProps) {
  return (
    <section className="py-6 md:py-10 px-4 md:px-12">
      {title && (
        <h2 className="text-lg md:text-xl font-bold text-[#F5F5F5] mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {comedians.map((c) => (
          <Link
            key={c.slug}
            href={`/show/${c.slug}`}
            className="group flex flex-col items-center text-center gap-3 p-4 rounded-xl hover:bg-[#141414] transition-colors"
          >
            <div className="relative">
              <Avatar src={c.avatar} alt={c.name} size="xl" className="group-hover:border-[#BFFF00] transition-colors" />
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-[#BFFF00]/10" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#F5F5F5] group-hover:text-[#BFFF00] transition-colors">
                {c.name}
              </h3>
              <p className="text-xs text-[#A3A3A3] mt-0.5 line-clamp-1">{c.bio}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
