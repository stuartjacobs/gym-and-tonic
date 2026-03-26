"use client";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`bg-[#1C1C1C] rounded-lg animate-pulse ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, #1C1C1C 0%, #2A2A2A 50%, #1C1C1C 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
      }}
    />
  );
}

export function ShowCardSkeleton() {
  return (
    <div className="flex-shrink-0 w-[200px] md:w-[240px]">
      <Skeleton className="w-full aspect-[2/3] rounded-lg" />
      <Skeleton className="w-3/4 h-4 mt-2 rounded" />
      <Skeleton className="w-1/2 h-3 mt-1 rounded" />
    </div>
  );
}

export function EpisodeCardSkeleton() {
  return (
    <div className="flex gap-3">
      <Skeleton className="w-40 h-24 rounded-lg flex-shrink-0" />
      <div className="flex-1">
        <Skeleton className="w-3/4 h-4 rounded" />
        <Skeleton className="w-full h-3 mt-2 rounded" />
        <Skeleton className="w-1/3 h-3 mt-1 rounded" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative w-full h-[70vh] min-h-[500px]">
      <Skeleton className="absolute inset-0 rounded-none" />
      <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-2/3 space-y-4">
        <Skeleton className="w-1/4 h-6 rounded" />
        <Skeleton className="w-3/4 h-12 rounded" />
        <Skeleton className="w-full h-16 rounded" />
        <div className="flex gap-3">
          <Skeleton className="w-32 h-12 rounded-lg" />
          <Skeleton className="w-32 h-12 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
