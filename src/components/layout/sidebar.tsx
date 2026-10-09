"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sparkles,
  LayoutDashboard,
  Wand2,
  FolderKanban,
  CalendarDays,
  Dna,
  Settings,
  LogOut,
  Menu,
  X,
  User as UserIcon,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/toast";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Generate",
    href: "/generate",
    icon: Wand2,
    badge: "AI",
  },
  {
    name: "Library",
    href: "/library",
    icon: FolderKanban,
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    name: "Content DNA",
    href: "/content-dna",
    icon: Dna,
    highlight: true,
  },
];

const secondaryNav = [
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    toast.info("Signed out", "You have been logged out successfully.");
    router.push("/login");
  };

  const displayName = profile?.display_name || user?.email?.split("@")[0] || "Creator";
  const userEmail = user?.email || "creator@creatorflow.ai";

  const renderNavLinks = () => (
    <div className="flex flex-col flex-1 justify-between p-4">
      <div className="space-y-6">
        {/* Brand */}
        <div className="px-2">
          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-white flex items-center gap-1">
                CreatorFlow<span className="text-indigo-400">.ai</span>
              </span>
              <span className="text-[10px] text-slate-400 block tracking-wider uppercase font-medium">
                SaaS Workspace
              </span>
            </div>
          </Link>
        </div>

        {/* Primary Navigation */}
        <nav className="space-y-1">
          <p className="px-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Workspace
          </p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group",
                  isActive
                    ? "bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-sm shadow-indigo-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "w-4 h-4 transition-colors",
                      isActive
                        ? "text-indigo-400"
                        : "text-slate-400 group-hover:text-slate-200"
                    )}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-bold tracking-wider">
                    {item.badge}
                  </span>
                )}
                {item.highlight && !isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Navigation & Profile */}
      <div className="space-y-4 pt-4 border-t border-slate-800/80">
        <nav className="space-y-1">
          {secondaryNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                )}
              >
                <Icon className="w-4 h-4 text-slate-400" />
                <span>{item.name}</span>
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </nav>

        {/* User Card */}
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-300 text-xs font-semibold shrink-0">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">
                {displayName}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {userEmail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-[#090D16]/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white">
            CreatorFlow<span className="text-indigo-400">.ai</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={cn(
          "md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-[#0B101D] border-r border-slate-800 transition-transform duration-200 flex flex-col pt-4",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {renderNavLinks()}
      </aside>

      {/* Desktop Permanent Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 bg-[#0B101D] border-r border-slate-800/80 min-h-screen sticky top-0 h-screen overflow-y-auto">
        {renderNavLinks()}
      </aside>
    </>
  );
}
