"use client";

import React, { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "subtle";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090D16] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/20",
      secondary:
        "bg-slate-800/80 hover:bg-slate-750 text-slate-100 hover:text-white border border-slate-700/60 shadow-sm",
      outline:
        "bg-transparent hover:bg-white/[0.04] text-slate-200 hover:text-white border border-slate-700 hover:border-slate-600",
      ghost:
        "bg-transparent hover:bg-white/[0.05] text-slate-300 hover:text-white",
      danger:
        "bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:border-rose-500/50",
      subtle:
        "bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs rounded-lg gap-1.5",
      md: "h-10 px-4 text-sm rounded-xl gap-2",
      lg: "h-12 px-6 text-base rounded-xl gap-2.5 font-semibold",
      icon: "h-9 w-9 rounded-lg p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
