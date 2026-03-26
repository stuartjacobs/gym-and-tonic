"use client";

interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
}

export function ProgressBar({ progress, className = "" }: ProgressBarProps) {
  return (
    <div className={`w-full h-1 bg-[#2A2A2A] rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-[#BFFF00] rounded-full transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
}
