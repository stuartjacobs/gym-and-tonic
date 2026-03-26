"use client";

interface CategoryPillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function CategoryPill({ label, active, onClick }: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
        ${
          active
            ? "bg-[#BFFF00] text-[#0A0A0A]"
            : "bg-[#1C1C1C] text-[#A3A3A3] hover:bg-[#2A2A2A] hover:text-[#F5F5F5] border border-[#2A2A2A]"
        }`}
    >
      {label}
    </button>
  );
}
