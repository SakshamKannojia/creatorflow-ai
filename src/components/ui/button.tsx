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
        "bg-white hover:bg-slate-100 text-black border border-transparent shadow-sm",
      secondary:
        "bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 shadow-sm",
      outline:
        "bg-transparent hover:bg-slate-800 text-slate-200 border border-slate-700",
      ghost:
        "bg-transparent hover:bg-slate-900 text-slate-300 hover:text-white",
      danger:
        "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30",
      subtle:
        "bg-slate-800/50 hover:bg-slate-800 text-slate-300 border border-slate-700",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs rounded-md gap-1.5",
      md: "h-10 px-4 text-sm rounded-md gap-2",
      lg: "h-12 px-6 text-base rounded-md gap-2.5 font-medium",
      icon: "h-9 w-9 rounded-md p-0",
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
