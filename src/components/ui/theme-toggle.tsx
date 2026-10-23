"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  /** compact = icon-only pill; full = icon + label */
  variant?: "compact" | "full";
}

export function ThemeToggle({ className, variant = "compact" }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative inline-flex items-center gap-2 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
        variant === "compact"
          ? "p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/60 text-[#6b5744] hover:text-[#1c1611] hover:bg-[#f0ebe2]"
          : "px-3 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/60 text-[#6b5744] hover:text-[#1c1611] hover:bg-[#f0ebe2]",
        className
      )}
    >
      <div className="relative w-4 h-4">
        {/* Sun icon for light mode trigger */}
        <Sun
          className={cn(
            "absolute inset-0 w-4 h-4 transition-all duration-300",
            isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"
          )}
        />
        {/* Moon icon for dark mode trigger */}
        <Moon
          className={cn(
            "absolute inset-0 w-4 h-4 transition-all duration-300",
            isDark ? "opacity-0 -rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
          )}
        />
      </div>
      {variant === "full" && (
        <span>{isDark ? "Light mode" : "Dark mode"}</span>
      )}
    </button>
  );
}
