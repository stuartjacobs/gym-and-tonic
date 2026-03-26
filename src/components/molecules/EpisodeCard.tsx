"use client";

import Link from "next/link";
import { ProgressBar } from "../atoms/ProgressBar";

interface EpisodeCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  episodeNumber: number;
  views: number;
  progress?: number;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatViews(views: number): string {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;
  return views.toString();
}

export function EpisodeCard({
  id,
  title,
  description,
  thumbnail,
  duration,
  episodeNumber,
  views,
  progress,
}: EpisodeCardProps) {
  return (
    <Link
      href={`/watch/${id}`}
      className="group flex gap-4 p-3 rounded-lg hover:bg-[#1C1C1C] transition-colors duration-200"
    >
      <div className="relative flex-shrink-0 w-40 sm:w-48 aspect-video rounded-lg overflow-hidden bg-[#141414]">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1C1C1C] to-[#0A0A0A] flex items-center justify-center">
            <span className="text-2xl">▶️</span>
          </div>
        )}
        {/* Duration badge */}
        <div className="absolute bottom-1.5 right-1.5 bg-black/80 px-1.5 py-0.5 rounded text-xs font-medium text-white">
          {formatDuration(duration)}
        </div>
        {/* Play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
          <div className="w-10 h-10 rounded-full bg-[#BFFF00] flex items-center justify-center">
            <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {progress !== undefined && progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0">
            <ProgressBar progress={progress} />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 py-1">
        <div className="flex items-start gap-2">
          <span className="text-xs text-[#A3A3A3] font-medium flex-shrink-0">E{episodeNumber}</span>
          <h4 className="text-sm font-semibold text-[#F5F5F5] truncate group-hover:text-[#BFFF00] transition-colors">
            {title}
          </h4>
        </div>
        <p className="text-xs text-[#A3A3A3] mt-1 line-clamp-2">{description}</p>
        <p className="text-xs text-[#666] mt-2">{formatViews(views)} views</p>
      </div>
    </Link>
  );
}
