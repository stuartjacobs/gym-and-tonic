"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ShowLayout } from "@/components/templates/ShowLayout";
import { SearchBar } from "@/components/molecules/SearchBar";
import { ShowCard } from "@/components/molecules/ShowCard";
import { EpisodeCard } from "@/components/molecules/EpisodeCard";
import { ComedianGrid } from "@/components/organisms/ComedianGrid";
import { CategoryPill } from "@/components/molecules/CategoryPill";

const CATEGORIES = [
  "All",
  "HIIT Comedy",
  "Yoga & Giggles",
  "Stand-Up & Squat",
  "Cardio Roast",
  "Strength & Punchlines",
  "Dance & Laugh",
];

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [results, setResults] = useState<{
    shows: Array<Record<string, unknown>>;
    comedians: Array<Record<string, string>>;
    episodes: Array<Record<string, unknown>>;
  }>({ shows: [], comedians: [], episodes: [] });
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults({ shows: [], comedians: [], episodes: [] });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (res.ok) setResults(await res.json());
    } catch {
      /* noop */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    search(q);
  }, [q, search]);

  const filteredShows =
    activeCategory === "All"
      ? results.shows
      : results.shows.filter((s) => s.category === activeCategory);

  return (
    <ShowLayout>
      <div className="px-4 md:px-12 py-8 max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-[#F5F5F5] mb-6">Search</h1>

        <SearchBar defaultValue={q} className="max-w-xl mb-6" />

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-8 pb-2">
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-[#BFFF00] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && q && (
          <div className="space-y-10">
            {/* Comedians */}
            {results.comedians.length > 0 && (
              <ComedianGrid
                comedians={results.comedians.map((c) => ({
                  name: c.name,
                  slug: c.slug,
                  avatar: c.avatar,
                  bio: c.bio,
                }))}
                title="Comedians"
              />
            )}

            {/* Shows */}
            {filteredShows.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-[#F5F5F5] mb-4">Shows</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredShows.map((s) => (
                    <ShowCard
                      key={s.slug as string}
                      title={s.title as string}
                      slug={s.slug as string}
                      thumbnail={s.thumbnail as string}
                      comedianName={((s.comedianId as Record<string, string>)?.name) || "Unknown"}
                      category={s.category as string}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Episodes */}
            {results.episodes.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-[#F5F5F5] mb-4">Episodes</h2>
                <div className="space-y-2 max-w-3xl">
                  {results.episodes.map((ep) => (
                    <EpisodeCard
                      key={ep._id as string}
                      id={ep._id as string}
                      title={ep.title as string}
                      description={ep.description as string}
                      thumbnail={ep.thumbnail as string}
                      duration={ep.duration as number}
                      episodeNumber={ep.episodeNumber as number}
                      views={ep.views as number}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Empty state */}
            {results.shows.length === 0 &&
              results.comedians.length === 0 &&
              results.episodes.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-4xl mb-4">🔍</p>
                  <p className="text-[#A3A3A3]">
                    No results for &ldquo;{q}&rdquo;. Try another search!
                  </p>
                </div>
              )}
          </div>
        )}

        {!q && !loading && (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">💪</p>
            <p className="text-[#A3A3A3]">Search for comedians, shows, or workouts</p>
          </div>
        )}
      </div>
    </ShowLayout>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
      <SearchContent />
    </Suspense>
  );
}
