"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  FileText,
  Video,
  Lightbulb,
  CheckCircle2,
  Clock,
  Send,
  Bookmark,
  ArrowRight,
  Copy,
  Calendar,
  Dna,
  Check,
  Plus,
} from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { useAuth } from "@/context/auth-context";
import {
  getUserContent,
  getUserStats,
  getUserContentDna,
  CreatorStats,
} from "@/lib/data/content-store";
import { ContentItem, ContentDNA } from "@/types/database";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/toast";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState<CreatorStats | null>(null);
  const [recentContent, setRecentContent] = useState<ContentItem[]>([]);
  const [dna, setDna] = useState<ContentDNA | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const userId = user?.id;
        const [statsData, contentData, dnaData] = await Promise.all([
          getUserStats(userId),
          getUserContent(userId),
          getUserContentDna(userId),
        ]);
        setStats(statsData);
        setRecentContent(contentData.slice(0, 5));
        setDna(dnaData);
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboardData();
  }, [user]);

  const handleCopyContent = (item: ContentItem) => {
    const textToCopy = `${item.hook ? item.hook + "\n\n" : ""}${item.content}${
      item.cta ? "\n\n" + item.cta : ""
    }${item.hashtags?.length ? "\n\n" + item.hashtags.join(" ") : ""}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    toast.success("Copied to clipboard", `Copied "${item.title}"`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const displayName = profile?.display_name || user?.email?.split("@")[0] || "Creator";
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-300">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-800/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                {currentDate}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Good to see you, {displayName}.
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Here is your content pipeline summary and latest generations.
            </p>
          </div>

          <Link href="/generate">
            <Button variant="primary" size="md" className="shrink-0 shadow-indigo-500/20">
              <Sparkles className="w-4 h-4 mr-1.5" />
              New Content
            </Button>
          </Link>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <Link href="/generate?type=Caption" className="group">
              <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-4 hover:border-indigo-500/40 hover:bg-slate-850/60 transition-all duration-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Generate Caption</h3>
                    <p className="text-[11px] text-slate-400">Instagram, LinkedIn, X</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>

            <Link href="/generate?type=Reel+Script" className="group">
              <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-4 hover:border-violet-500/40 hover:bg-slate-850/60 transition-all duration-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Create Reel Script</h3>
                    <p className="text-[11px] text-slate-400">15s, 30s, 60s Breakdown</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>

            <Link href="/generate?type=Content+Idea" className="group">
              <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-4 hover:border-amber-500/40 hover:bg-slate-850/60 transition-all duration-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Generate Content Idea</h3>
                    <p className="text-[11px] text-slate-400">Angles, Hooks & Angles</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Overview
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Total Content */}
            <div className="rounded-2xl bg-[#0F172A]/70 border border-slate-800/80 p-4 sm:p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium">Total Content</span>
                <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Bookmark className="w-4 h-4" />
                </div>
              </div>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold text-white tracking-tight">
                  {stats?.totalContent ?? 0}
                </div>
              )}
              <p className="text-[11px] text-slate-500 mt-1">Across all platforms</p>
            </div>

            {/* Drafts */}
            <div className="rounded-2xl bg-[#0F172A]/70 border border-slate-800/80 p-4 sm:p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium">Drafts</span>
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold text-white tracking-tight">
                  {stats?.drafts ?? 0}
                </div>
              )}
              <p className="text-[11px] text-slate-500 mt-1">In progress & editing</p>
            </div>

            {/* Published / Ready */}
            <div className="rounded-2xl bg-[#0F172A]/70 border border-slate-800/80 p-4 sm:p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium">Published</span>
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold text-white tracking-tight">
                  {stats?.published ?? 0}
                </div>
              )}
              <p className="text-[11px] text-slate-500 mt-1">Posted to channels</p>
            </div>

            {/* Saved Ideas */}
            <div className="rounded-2xl bg-[#0F172A]/70 border border-slate-800/80 p-4 sm:p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium">Saved Ideas</span>
                <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400">
                  <Lightbulb className="w-4 h-4" />
                </div>
              </div>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold text-white tracking-tight">
                  {stats?.savedIdeas ?? 0}
                </div>
              )}
              <p className="text-[11px] text-slate-500 mt-1">Concepts to produce</p>
            </div>
          </div>
        </div>

        {/* Content DNA Status Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900/60 border border-indigo-500/20 p-5 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center shrink-0">
                <Dna className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white">Content DNA Engine</h3>
                  {dna ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Active Voice Profile
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/20">
                      Not Calibrated Yet
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  {dna
                    ? `Configured: Tone: "${dna.tone}" • Style: "${dna.vocabulary_style}" • Language: "${dna.language}". All future generations automatically reflect your distinct voice.`
                    : "Paste 5-10 past posts so Gemini AI can extract your hook style, vocabulary, and formatting habits."}
                </p>
              </div>
            </div>

            <Link href="/content-dna" className="shrink-0">
              <Button variant={dna ? "outline" : "primary"} size="sm">
                <Dna className="w-3.5 h-3.5 mr-1.5" />
                {dna ? "Manage Voice DNA" : "Calibrate Voice DNA"}
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent Generations Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-white">Recent Generations</h2>
              <p className="text-xs text-slate-400">
                Recently saved posts, reel scripts, and ideas
              </p>
            </div>
            <Link
              href="/library"
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group"
            >
              <span>View all in Library</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="rounded-xl bg-slate-900/60 border border-slate-800 p-4 space-y-2"
                >
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : recentContent.length === 0 ? (
            /* Empty State */
            <div className="rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 p-10 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 mb-3">
                <Sparkles className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-sm font-semibold text-white">No content generated yet</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                Get started by creating your first caption, reel breakdown, or carousel idea.
              </p>
              <Link href="/generate" className="mt-4">
                <Button variant="primary" size="sm">
                  <Plus className="w-4 h-4 mr-1.5" />
                  Generate First Piece
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentContent.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl bg-[#0F172A]/70 border border-slate-800/80 p-4 hover:border-slate-700 transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="platform" platform={item.platform}>
                        {item.platform}
                      </Badge>
                      <Badge variant="secondary">
                        {item.content_type}
                      </Badge>
                      <Badge
                        variant={
                          item.status === "published"
                            ? "success"
                            : item.status === "ready"
                            ? "purple"
                            : item.status === "idea"
                            ? "warning"
                            : "outline"
                        }
                      >
                        {item.status}
                      </Badge>
                      <span className="text-[11px] text-slate-500">
                        {formatDate(item.created_at)}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-white truncate">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-400 line-clamp-1">
                      {item.hook || item.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyContent(item)}
                      title="Copy content"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span className="text-xs">{copiedId === item.id ? "Copied" : "Copy"}</span>
                    </Button>

                    <Link href={`/library?id=${item.id}`}>
                      <Button variant="secondary" size="sm">
                        View & Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
