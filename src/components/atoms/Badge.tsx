"use client";

type BadgeVariant = "default" | "accent" | "live" | "new" | "premium";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[#1C1C1C] text-[#A3A3A3] border border-[#2A2A2A]",
  accent: "bg-[#BFFF00]/20 text-[#BFFF00]",
  live: "bg-[#E50914] text-white animate-pulse",
  new: "bg-[#BFFF00] text-[#0A0A0A] font-bold",
  premium: "bg-[#FFD700]/20 text-[#FFD700]",
};

export function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full uppercase tracking-wider ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
