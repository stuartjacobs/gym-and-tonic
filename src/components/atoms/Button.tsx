"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[#BFFF00] text-[#0A0A0A] hover:bg-[#D4FF33] font-semibold shadow-lg shadow-[#BFFF00]/10",
  secondary:
    "bg-[#1C1C1C] text-[#F5F5F5] hover:bg-[#2A2A2A] border border-[#2A2A2A]",
  ghost:
    "bg-transparent text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[#1C1C1C]",
  danger:
    "bg-[#E50914] text-white hover:bg-[#E50914]/80",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded-md",
  md: "px-5 py-2.5 text-sm rounded-lg",
  lg: "px-7 py-3.5 text-base rounded-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", isLoading, className = "", children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BFFF00]/50 
          disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]
          ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
