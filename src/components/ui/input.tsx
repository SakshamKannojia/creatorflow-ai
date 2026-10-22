"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, hint, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-[#6b5744] tracking-wide"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              "w-full rounded-xl bg-white px-3.5 py-2.5 text-sm text-[#1c1611] placeholder:text-[#9c836a]",
              "border border-[#d8cdb8] transition-all duration-200",
              "focus:outline-none focus:border-[#7c5533] focus:ring-1 focus:ring-[#7c5533]/30",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-rose-400 focus:border-rose-400 focus:ring-rose-400/30",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-rose-600 font-medium">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-[#9c836a]">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
