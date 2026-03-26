"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ShowLayout } from "@/components/templates/ShowLayout";
import { EpisodeCard } from "@/components/molecules/EpisodeCard";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Skeleton, EpisodeCardSkeleton } from "@/components/atoms/Skeleton";

interface EpisodeData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  duration: number;
  thumbnail: string;
  episodeNumber: number;
  views: number;
}

export default function SeriesPage() {
  const params = useParams();
  const slug = params.slug as string;
  const seriesSlug = params.seriesSlug as string;
  const [data, setData] = useState<{ series: Record<string, string | number>; episodes: EpisodeData[]; show: Record<string, unknown> } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/series/${seriesSlug}`);
        if (res.ok) setData(await res.json());
      } catch {
        /* noop */
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [seriesSlug]);

  if (loading) {
    return (
      <ShowLayout>
        <div className="px-4 md:px-12 py-8 max-w-4xl">
          <Skeleton className="w-48 h-8 rounded mb-4" />
          <Skeleton className="w-96 h-5 rounded mb-8" />
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <EpisodeCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </ShowLayout>
    );
  }

  if (!data) {
    return (
      <ShowLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#F5F5F5] mb-2">Series Not Found</h1>
            <Link href={`/show/${slug}`}>
              <Button className="mt-4">Back to Show</Button>
            </Link>
          </div>
        </div>
      </ShowLayout>
    );
  }

  const { series, episodes, show } = data;
  const showTitle = (show as Record<string, unknown>)?.title as string;
  const comedianId = (show as Record<string, unknown>)?.comedianId as Record<string, string>;

  return (
    <ShowLayout>
      <div className="px-4 md:px-12 py-8 max-w-4xl">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-[#A3A3A3] mb-6">
          <Link href={`/show/${slug}`} className="hover:text-[#BFFF00] transition-colors">
            {showTitle || slug}
          </Link>
          <span>/</span>
          <span className="text-[#F5F5F5]">{series.title}</span>
        </div>

        {/* Series header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="accent">Season {series.seasonNumber}</Badge>
              <span className="text-sm text-[#A3A3A3]">{episodes.length} episodes</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#F5F5F5] mb-2">
              {series.title}
            </h1>
            <p className="text-[#A3A3A3] text-sm">{series.description}</p>
            {comedianId && (
              <p className="text-xs text-[#666] mt-2">
                by <span className="text-[#BFFF00]">{comedianId.name}</span>
              </p>
            )}
          </div>
        </div>

        {/* Episodes */}
        <div className="space-y-2">
          {episodes.map((ep) => (
            <EpisodeCard
              key={ep._id}
              id={ep._id}
              title={ep.title}
              description={ep.description}
              thumbnail={ep.thumbnail}
              duration={ep.duration}
              episodeNumber={ep.episodeNumber}
              views={ep.views}
            />
          ))}
        </div>

        {episodes.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#A3A3A3]">No episodes yet. Stay tuned! 🎤</p>
          </div>
        )}
      </div>
    </ShowLayout>
  );
}
