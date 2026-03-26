"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ShowLayout } from "@/components/templates/ShowLayout";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Avatar } from "@/components/atoms/Avatar";
import { Skeleton } from "@/components/atoms/Skeleton";

interface SeriesData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  seasonNumber: number;
  thumbnail: string;
}

interface ShowPageData {
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
    bio: string;
    socialLinks?: Record<string, string>;
  };
  series: SeriesData[];
}

export default function ShowPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [show, setShow] = useState<ShowPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/shows/${slug}`);
        if (res.ok) {
          setShow(await res.json());
        }
      } catch {
        /* noop */
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <ShowLayout>
        <div className="relative h-[50vh] min-h-[400px]">
          <Skeleton className="w-full h-full rounded-none" />
        </div>
        <div className="px-4 md:px-12 py-8 space-y-4">
          <Skeleton className="w-64 h-10 rounded" />
          <Skeleton className="w-full h-20 rounded max-w-2xl" />
        </div>
      </ShowLayout>
    );
  }

  if (!show) {
    return (
      <ShowLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#F5F5F5] mb-2">Show Not Found</h1>
            <p className="text-[#A3A3A3]">This show doesn&apos;t exist or has been removed.</p>
            <Link href="/" className="inline-block mt-4">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </ShowLayout>
    );
  }

  const comedian = show.comedianId;

  return (
    <ShowLayout>
      {/* Banner */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        {show.banner ? (
          <img src={show.banner} alt={show.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1C1C1C] to-[#0A0A0A]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative -mt-32 z-10 px-4 md:px-12 pb-16">
        <div className="max-w-4xl">
          {/* Category & tags */}
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="accent">{show.category}</Badge>
            {show.featured && <Badge variant="new">FEATURED</Badge>}
            {show.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          {/* Title */}
          <h1
            className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {show.title}
          </h1>

          {/* Description */}
          <p className="text-[#A3A3A3] text-sm md:text-base max-w-2xl leading-relaxed mb-6">
            {show.description}
          </p>

          {/* Comedian info */}
          <div className="flex items-center gap-4 mb-8">
            <Avatar src={comedian?.avatar} alt={comedian?.name || "Comedian"} size="lg" />
            <div>
              <h3 className="text-[#F5F5F5] font-semibold">{comedian?.name}</h3>
              <p className="text-sm text-[#A3A3A3] line-clamp-1">{comedian?.bio}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-10">
            {show.series?.[0] && (
              <Link href={`/show/${slug}/series/${show.series[0].slug}`}>
                <Button size="lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Start Watching
                </Button>
              </Link>
            )}
            <Button variant="secondary" size="lg">
              + My List
            </Button>
          </div>

          {/* Series list */}
          {show.series && show.series.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F5] mb-4">Series</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {show.series.map((s) => (
                  <Link
                    key={s._id}
                    href={`/show/${slug}/series/${s.slug}`}
                    className="group bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden hover:border-[#BFFF00]/30 transition-all"
                  >
                    <div className="aspect-video bg-[#1C1C1C] relative overflow-hidden">
                      {s.thumbnail ? (
                        <img src={s.thumbnail} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl">🎬</div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-[#BFFF00] font-medium mb-1">Season {s.seasonNumber}</p>
                      <h3 className="text-sm font-semibold text-[#F5F5F5] group-hover:text-[#BFFF00] transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-xs text-[#A3A3A3] mt-1 line-clamp-2">{s.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ShowLayout>
  );
}
