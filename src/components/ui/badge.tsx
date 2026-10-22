import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "success"
    | "warning"
    | "danger"
    | "purple"
    | "platform";
  platform?: "Instagram" | "LinkedIn" | "YouTube" | "X" | string;
}

export function Badge({
  className,
  variant = "default",
  platform,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-[#f5f0e8] text-[#4a2e10] border-[#d8cdb8]",
    secondary: "bg-[#f0ebe2] text-[#6b5744] border-[#d8cdb8]",
    outline: "bg-transparent text-[#9c836a] border-[#d8cdb8]",
    success: "bg-emerald-50 text-emerald-800 border-emerald-200",
    warning: "bg-[#f5f0e8] text-[#6b4226] border-[#c4b49a]",
    danger: "bg-rose-50 text-rose-700 border-rose-200",
    purple: "bg-[#ede7da] text-[#3d1f08] border-[#c4b49a]",
    platform: "bg-[#f0ebe2] text-[#1c1611] border-[#d8cdb8]",
  };

  const platformColors: Record<string, string> = {
    Instagram: "bg-pink-50 text-pink-700 border-pink-200",
    LinkedIn: "bg-sky-50 text-sky-700 border-sky-200",
    YouTube: "bg-red-50 text-red-700 border-red-200",
    X: "bg-[#f0ebe2] text-[#1c1611] border-[#d8cdb8]",
  };

  const chosenStyle =
    variant === "platform" && platform && platformColors[platform]
      ? platformColors[platform]
      : variants[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors",
        chosenStyle,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
