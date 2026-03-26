"use client";

import { useEffect, useState } from "react";
import { BrowseLayout } from "@/components/templates/BrowseLayout";
import { HeroSlider } from "@/components/organisms/HeroSlider";
import { ContentCarousel } from "@/components/organisms/ContentCarousel";
import { ComedianGrid } from "@/components/organisms/ComedianGrid";
import { HeroSkeleton, ShowCardSkeleton } from "@/components/atoms/Skeleton";

interface ShowData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  banner: string;
  category: string;
  tags: string[];
  featured: boolean;
  comedianId: {
    _id: string;
    name: string;
    slug: string;
    avatar: string;
  };
}

interface ComedianData {
  _id: string;
  name: string;
  slug: string;
  avatar: string;
  bio: string;
}

const CATEGORIES = [
  "HIIT Comedy",
  "Yoga & Giggles",
  "Stand-Up & Squat",
  "Cardio Roast",
  "Strength & Punchlines",
  "Dance & Laugh",
];

export default function HomePage() {
  const [shows, setShows] = useState<ShowData[]>([]);
  const [comedians, setComedians] = useState<ComedianData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [showsRes, comediansRes] = await Promise.all([
          fetch("/api/shows"),
          fetch("/api/comedians"),
        ]);
        const showsData = await showsRes.json();
        const comediansData = await comediansRes.json();
        setShows(Array.isArray(showsData) ? showsData : []);
        setComedians(Array.isArray(comediansData) ? comediansData : []);
      } catch {
        // Silently fail — show empty state
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const featured = shows.filter((s) => s.featured);
  const heroSlides = featured.slice(0, 5).map((s) => ({
    showSlug: s.slug,
    title: s.title,
    description: s.description,
    comedianName: s.comedianId?.name || "Unknown",
    banner: s.banner,
    category: s.category,
    featured: s.featured,
  }));

  const showsByCategory = CATEGORIES.map((cat) => ({
    title: cat,
    shows: shows
      .filter((s) => s.category === cat)
      .map((s) => ({
        title: s.title,
        slug: s.slug,
        thumbnail: s.thumbnail,
        comedianName: s.comedianId?.name || "Unknown",
        category: s.category,
        featured: s.featured,
      })),
  })).filter((c) => c.shows.length > 0);

  const trending = shows.slice(0, 10).map((s) => ({
    title: s.title,
    slug: s.slug,
    thumbnail: s.thumbnail,
    comedianName: s.comedianId?.name || "Unknown",
    category: s.category,
    featured: s.featured,
  }));

  if (loading) {
    return (
      <BrowseLayout>
        <HeroSkeleton />
        <div className="px-4 md:px-12 py-6 space-y-8">
          <div>
            <div className="h-6 w-48 bg-[#1C1C1C] rounded mb-4" />
            <div className="flex gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <ShowCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </BrowseLayout>
    );
  }

  return (
    <BrowseLayout>
      {/* Hero */}
      {heroSlides.length > 0 ? (
        <HeroSlider slides={heroSlides} />
      ) : (
        <div className="relative w-full h-[75vh] min-h-[500px] flex items-center justify-center bg-gradient-to-br from-[#141414] to-[#0A0A0A]">
          <div className="text-center px-4">
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-[#BFFF00]">GYM</span>
              <span className="text-[#F5F5F5]"> & </span>
              <span className="text-[#BFFF00]">TONIC</span>
            </h1>
            <p className="text-[#A3A3A3] text-lg md:text-xl max-w-xl mx-auto">
              Comedy meets fitness. Get ripped while you get the giggles.
            </p>
            <p className="text-[#666] text-sm mt-4">
              Connect your database and run the seed script to populate content.
            </p>
          </div>
        </div>
      )}

      {/* Trending */}
      {trending.length > 0 && (
        <ContentCarousel title="🔥 Trending Now" shows={trending} />
      )}

      {/* By Category */}
      {showsByCategory.map((cat) => (
        <ContentCarousel key={cat.title} title={cat.title} shows={cat.shows} />
      ))}

      {/* Comedians */}
      {comedians.length > 0 && (
        <ComedianGrid comedians={comedians} title="Your Trainers (Who Happen to Be Hilarious)" />
      )}
    </BrowseLayout>
  );
}
