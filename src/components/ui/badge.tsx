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
    default: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    secondary: "bg-slate-800 text-slate-300 border-slate-700",
    outline: "bg-transparent text-slate-400 border-slate-800",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    danger: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    platform: "bg-slate-800/80 text-slate-200 border-slate-700",
  };

  const platformColors: Record<string, string> = {
    Instagram: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    LinkedIn: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    YouTube: "bg-red-500/10 text-red-400 border-red-500/20",
    X: "bg-slate-700/30 text-slate-200 border-slate-600/30",
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
