"use client";

import Link from "next/link";
import { Badge } from "../atoms/Badge";

interface ShowCardProps {
  title: string;
  slug: string;
  thumbnail: string;
  comedianName: string;
  category: string;
  featured?: boolean;
  isNew?: boolean;
}

export function ShowCard({
  title,
  slug,
  thumbnail,
  comedianName,
  category,
  featured,
  isNew,
}: ShowCardProps) {
  return (
    <Link
      href={`/show/${slug}`}
      className="group flex-shrink-0 w-[160px] sm:w-[200px] md:w-[240px] cursor-pointer"
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-[#141414] border border-transparent group-hover:border-[#BFFF00]/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-[#BFFF00]/5">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1C1C1C] to-[#0A0A0A] flex items-center justify-center">
            <span className="text-4xl">🏋️</span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {isNew && <Badge variant="new">NEW</Badge>}
          {featured && <Badge variant="accent">Featured</Badge>}
        </div>

        {/* Bottom info on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-xs text-[#BFFF00] font-medium">{category}</p>
        </div>
      </div>
      <div className="mt-2 px-0.5">
        <h3 className="text-sm font-semibold text-[#F5F5F5] truncate group-hover:text-[#BFFF00] transition-colors">
          {title}
        </h3>
        <p className="text-xs text-[#A3A3A3] truncate">{comedianName}</p>
      </div>
    </Link>
  );
}
