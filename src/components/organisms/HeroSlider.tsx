"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "../atoms/Button";
import { Badge } from "../atoms/Badge";

interface HeroSlide {
  showSlug: string;
  title: string;
  description: string;
  comedianName: string;
  banner: string;
  category: string;
  featured: boolean;
}

interface HeroSliderProps {
  slides: HeroSlide[];
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  if (!slides.length) return null;

  const slide = slides[current];

  return (
    <div className="relative w-full h-[75vh] min-h-[500px] max-h-[800px] overflow-hidden">
      {/* Background image */}
      {slides.map((s, i) => (
        <div
          key={s.showSlug}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {s.banner ? (
            <img
              src={s.banner}
              alt={s.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1C1C1C] to-[#0A0A0A]" />
          )}
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 pb-12 md:pb-20">
        <div className="max-w-2xl space-y-4" style={{ animation: "fade-in 0.5s ease-out" }}>
          <div className="flex items-center gap-2">
            <Badge variant="accent">{slide.category}</Badge>
            {slide.featured && <Badge variant="new">FEATURED</Badge>}
          </div>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {slide.title}
          </h1>

          <p className="text-sm md:text-base text-[#A3A3A3] max-w-lg leading-relaxed">
            with <span className="text-[#BFFF00] font-semibold">{slide.comedianName}</span>
            {" · "}
            {slide.description.slice(0, 150)}
            {slide.description.length > 150 ? "..." : ""}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <Link href={`/show/${slide.showSlug}`}>
              <Button size="lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Now
              </Button>
            </Link>
            <Link href={`/show/${slide.showSlug}`}>
              <Button variant="secondary" size="lg">
                More Info
              </Button>
            </Link>
          </div>
        </div>

        {/* Slide indicators */}
        {slides.length > 1 && (
          <div className="flex gap-1.5 mt-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === current
                    ? "w-8 bg-[#BFFF00]"
                    : "w-4 bg-[#F5F5F5]/30 hover:bg-[#F5F5F5]/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
