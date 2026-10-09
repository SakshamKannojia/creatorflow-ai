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
            className="block text-xs font-medium text-slate-300 tracking-wide"
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
              "w-full rounded-xl bg-slate-900/80 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500",
              "border border-slate-800 transition-all duration-200",
              "focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-rose-400 font-medium">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-slate-500">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
