"use client";

import { useRef, useState, useEffect } from "react";
import { ShowCard } from "../molecules/ShowCard";

interface CarouselShow {
  title: string;
  slug: string;
  thumbnail: string;
  comedianName: string;
  category: string;
  featured?: boolean;
}

interface ContentCarouselProps {
  title: string;
  shows: CarouselShow[];
  showAll?: string;
}

export function ContentCarousel({ title, shows, showAll }: ContentCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
  }, [shows]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (!shows.length) return null;

  return (
    <section className="relative py-4 md:py-6">
      <div className="flex items-center justify-between px-4 md:px-12 mb-3">
        <h2 className="text-lg md:text-xl font-bold text-[#F5F5F5] group cursor-default">
          {title}
          {showAll && (
            <span className="text-sm text-[#BFFF00] ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Explore All →
            </span>
          )}
        </h2>
      </div>

      <div className="relative group/carousel">
        {/* Left arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-8 z-10 w-12 md:w-16 
              bg-gradient-to-r from-[#0A0A0A] to-transparent flex items-center justify-center
              opacity-0 group-hover/carousel:opacity-100 transition-opacity"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Right arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-8 z-10 w-12 md:w-16 
              bg-gradient-to-l from-[#0A0A0A] to-transparent flex items-center justify-center
              opacity-0 group-hover/carousel:opacity-100 transition-opacity"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide px-4 md:px-12 scroll-smooth"
        >
          {shows.map((show) => (
            <ShowCard
              key={show.slug}
              title={show.title}
              slug={show.slug}
              thumbnail={show.thumbnail}
              comedianName={show.comedianName}
              category={show.category}
              featured={show.featured}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
