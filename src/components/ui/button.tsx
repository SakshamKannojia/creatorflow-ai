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
      "relative inline-flex items-center justify-center font-medium transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c5533] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f5] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-[#7c5533] hover:bg-[#5c3d22] text-white border border-transparent shadow-sm",
      secondary:
        "bg-[#1c1611] hover:bg-[#2a1e14] text-[#e8dece] border border-[#3a2e20] shadow-sm",
      outline:
        "bg-transparent hover:bg-[#f0ebe2] text-[#6b5744] border border-[#d8cdb8] hover:border-[#c4b49a]",
      ghost:
        "bg-transparent hover:bg-[#f0ebe2] text-[#6b5744] hover:text-[#1c1611]",
      danger:
        "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200",
      subtle:
        "bg-[#f0ebe2] hover:bg-[#e8dece] text-[#6b5744] border border-[#d8cdb8]",
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
