"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#A3A3A3] mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-2.5 bg-[#1C1C1C] border border-[#2A2A2A] rounded-lg text-[#F5F5F5] 
            placeholder-[#666] text-sm transition-colors duration-200
            focus:outline-none focus:border-[#BFFF00]/50 focus:ring-1 focus:ring-[#BFFF00]/30
            ${error ? "border-[#E50914]" : ""} ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-[#E50914]">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
