"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { WatchLayout } from "@/components/templates/WatchLayout";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { EpisodeCard } from "@/components/molecules/EpisodeCard";
import { Skeleton } from "@/components/atoms/Skeleton";

interface EpisodeData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  duration: number;
  thumbnail: string;
  videoUrl: string;
  episodeNumber: number;
  views: number;
}

export default function WatchPage() {
  const params = useParams();
  const episodeId = params.episodeId as string;
  const [data, setData] = useState<{
    episode: EpisodeData;
    siblings: EpisodeData[];
    series: Record<string, unknown>;
    show: Record<string, unknown>;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/episodes/${episodeId}`);
        if (res.ok) setData(await res.json());
      } catch {
        /* noop */
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [episodeId]);

  if (loading) {
    return (
      <WatchLayout>
        <div className="pt-16 md:pt-20">
          <Skeleton className="w-full aspect-video max-h-[70vh] rounded-none" />
          <div className="px-4 md:px-12 py-6">
            <Skeleton className="w-96 h-8 rounded" />
            <Skeleton className="w-full h-16 rounded mt-4 max-w-2xl" />
          </div>
        </div>
      </WatchLayout>
    );
  }

  if (!data) {
    return (
      <WatchLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#F5F5F5] mb-2">Episode Not Found</h1>
            <Link href="/"><Button className="mt-4">Back to Home</Button></Link>
          </div>
        </div>
      </WatchLayout>
    );
  }

  const { episode, siblings, series, show } = data;
  const showData = show as Record<string, unknown>;
  const comedianId = showData?.comedianId as Record<string, string>;
  const showSlug = showData?.slug as string;
  const upNext = siblings.filter((s) => s.episodeNumber > episode.episodeNumber);

  return (
    <WatchLayout>
      <div className="pt-16 md:pt-20">
        {/* Video player area */}
        <div className="relative w-full aspect-video max-h-[70vh] bg-black flex items-center justify-center">
          {episode.videoUrl ? (
            <video
              src={episode.videoUrl}
              controls
              className="w-full h-full"
              poster={episode.thumbnail}
            />
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[#BFFF00]/20 flex items-center justify-center mb-4 mx-auto">
                <svg className="w-10 h-10 text-[#BFFF00] ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-[#A3A3A3] text-sm">Video player placeholder</p>
              <p className="text-[#666] text-xs mt-1">Connect R2 storage to stream real content</p>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-12 py-6 max-w-7xl mx-auto">
          {/* Episode info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="accent">E{episode.episodeNumber}</Badge>
              {series && <span className="text-sm text-[#A3A3A3]">{(series as Record<string, string>).title}</span>}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-[#F5F5F5] mb-3">
              {episode.title}
            </h1>

            <p className="text-[#A3A3A3] text-sm leading-relaxed mb-4">
              {episode.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-[#666]">
              <span>{Math.floor(episode.duration / 60)} min</span>
              <span>{episode.views.toLocaleString()} views</span>
            </div>

            {/* Show link */}
            {showData && (
              <div className="mt-6 p-4 bg-[#141414] rounded-xl border border-[#2A2A2A]">
                <Link href={`/show/${showSlug}`} className="flex items-center gap-3 group">
                  {comedianId?.avatar ? (
                    <img src={comedianId.avatar} alt="" className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#1C1C1C] flex items-center justify-center text-[#BFFF00] font-bold">
                      {(comedianId?.name || "?")[0]}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-[#F5F5F5] group-hover:text-[#BFFF00] transition-colors">
                      {showData.title as string}
                    </p>
                    <p className="text-xs text-[#A3A3A3]">by {comedianId?.name}</p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Up Next sidebar */}
          {upNext.length > 0 && (
            <div className="lg:w-96">
              <h3 className="text-sm font-semibold text-[#F5F5F5] mb-3">Up Next</h3>
              <div className="space-y-2">
                {upNext.slice(0, 5).map((ep) => (
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
            </div>
          )}
        </div>
      </div>
    </WatchLayout>
  );
}
