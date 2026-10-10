"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-medium text-slate-300 tracking-wide"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={cn(
            "w-full rounded-xl bg-slate-900/80 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500",
            "border border-slate-800 transition-all duration-200",
            "focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50",
            "disabled:cursor-not-allowed disabled:opacity-50 resize-y",
            error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30",
            className
          )}
          {...props}
        />
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

Textarea.displayName = "Textarea";
