"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FolderKanban,
  Search,
  Filter,
  Plus,
  Star,
  Copy,
  Check,
  Edit3,
  CopyPlus,
  Trash2,
  Calendar,
  Share2,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { useAuth } from "@/context/auth-context";
import {
  getUserContent,
  saveContent,
  updateContent,
  deleteContent,
  toggleFavorite,
} from "@/lib/data/content-store";
import {
  ContentItem,
  Platform,
  ContentType,
  ContentStatus,
} from "@/types/database";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabItem } from "@/components/ui/tabs";
import { ContentCardSkeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/toast";
import { formatDate, truncate } from "@/lib/utils";
import { ContentEditorModal } from "@/components/library/content-editor-modal";

const CATEGORY_TABS: TabItem[] = [
  { id: "all", label: "All" },
  { id: "idea", label: "Ideas" },
  { id: "draft", label: "Drafts" },
  { id: "ready", label: "Ready to Publish" },
  { id: "published", label: "Published" },
  { id: "favorites", label: "Favorites" },
];

function LibraryContent() {
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const [items, setItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters & Sorting
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");

  // Active item in editor modal
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load content
  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await getUserContent(user?.id);
      setItems(data);

      // Check if URL has ?id=... to auto-open
      const targetId = searchParams.get("id");
      if (targetId) {
        const found = data.find((i) => i.id === targetId);
        if (found) setEditingItem(found);
      }
    } catch (err) {
      console.error("Library load error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user, searchParams]);

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      all: items.length,
      idea: items.filter((i) => i.status === "idea").length,
      draft: items.filter((i) => i.status === "draft").length,
      ready: items.filter((i) => i.status === "ready").length,
      published: items.filter((i) => i.status === "published").length,
      favorites: items.filter((i) => i.is_favorite).length,
    };
  }, [items]);

  const tabsWithCounts = useMemo(() => {
    return CATEGORY_TABS.map((t) => ({
      ...t,
      count: tabCounts[t.id as keyof typeof tabCounts],
    }));
  }, [tabCounts]);

  // Filtered & Sorted items
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        // Tab filter
        if (activeTab === "favorites") {
          if (!item.is_favorite) return false;
        } else if (activeTab !== "all") {
          if (item.status !== activeTab) return false;
        }

        // Platform filter
        if (platformFilter !== "all" && item.platform !== platformFilter) {
          return false;
        }

        // Type filter
        if (typeFilter !== "all" && item.content_type !== typeFilter) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = item.title?.toLowerCase().includes(q);
          const matchesHook = item.hook?.toLowerCase().includes(q);
          const matchesContent = item.content?.toLowerCase().includes(q);
          const matchesTags = item.hashtags?.some((t) =>
            t.toLowerCase().includes(q)
          );
          if (!matchesTitle && !matchesHook && !matchesContent && !matchesTags) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        }
        if (sortBy === "oldest") {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        }
        if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [items, activeTab, platformFilter, typeFilter, searchQuery, sortBy]);

  // Actions
  const handleToggleFavorite = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Optimistic update
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, is_favorite: !i.is_favorite } : i))
    );
    const newStatus = await toggleFavorite(id);
    toast.info(newStatus ? "Added to Favorites" : "Removed from Favorites");
  };

  const handleCopy = (item: ContentItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `${item.hook ? item.hook + "\n\n" : ""}${item.content}${
      item.cta ? "\n\n" + item.cta : ""
    }${item.hashtags?.length ? "\n\n" + item.hashtags.join(" ") : ""}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDuplicate = async (item: ContentItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user?.id) return;
    const duplicated = await saveContent({
      user_id: user.id,
      title: `${item.title} (Copy)`,
      platform: item.platform,
      content_type: item.content_type,
      topic: item.topic,
      tone: item.tone,
      language: item.language,
      content: item.content,
      hook: item.hook,
      cta: item.cta,
      hashtags: item.hashtags,
      status: "draft",
      is_favorite: false,
      metadata: item.metadata,
    });
    setItems((prev) => [duplicated, ...prev]);
    toast.success("Duplicated post as draft");
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (confirm("Are you sure you want to delete this piece?")) {
      await deleteContent(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast.info("Deleted from library");
    }
  };

  const handleSaveModal = async (id: string, updates: Partial<ContentItem>) => {
    const updated = await updateContent(id, updates);
    if (updated) {
      setItems((prev) => prev.map((i) => (i.id === id ? updated : i)));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-3 border-b border-slate-800/80">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-indigo-400" />
            Content Library
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Organize, search, edit, and plan all your generated social media assets.
          </p>
        </div>

        <Link href="/generate">
          <Button variant="primary" size="md">
            <Plus className="w-4 h-4 mr-1.5" />
            Create New Content
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={tabsWithCounts}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Search */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, hook, text or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-slate-900/80 pl-9 pr-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 border border-slate-800 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Platform Filter */}
        <div className="sm:col-span-2">
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            aria-label="Filter by Platform"
            className="w-full rounded-xl bg-slate-900/80 px-3 py-2 text-xs text-slate-200 border border-slate-800 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Platforms</option>
            <option value="Instagram">Instagram</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="YouTube">YouTube</option>
            <option value="X">X (Twitter)</option>
          </select>
        </div>

        {/* Content Type Filter */}
        <div className="sm:col-span-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            aria-label="Filter by Content Type"
            className="w-full rounded-xl bg-slate-900/80 px-3 py-2 text-xs text-slate-200 border border-slate-800 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Formats</option>
            <option value="Caption">Caption</option>
            <option value="Reel Script">Reel Script</option>
            <option value="Carousel">Carousel</option>
            <option value="LinkedIn Post">LinkedIn Post</option>
            <option value="YouTube Description">YouTube Description</option>
            <option value="Content Idea">Content Idea</option>
          </select>
        </div>

        {/* Sort */}
        <div className="sm:col-span-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            aria-label="Sort Content By"
            className="w-full rounded-xl bg-slate-900/80 px-3 py-2 text-xs text-slate-200 border border-slate-800 focus:outline-none focus:border-indigo-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title A–Z</option>
          </select>
        </div>
      </div>

      {/* Grid of Content Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <ContentCardSkeleton key={n} />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        /* Empty State */
        <div className="rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 p-12 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 mb-3">
            <FolderKanban className="w-6 h-6 text-indigo-400" />
          </div>
          <h3 className="text-sm font-semibold text-white">No content found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            {searchQuery || platformFilter !== "all" || typeFilter !== "all"
              ? "No items match your selected filters. Try resetting the search or filter options."
              : "Your library is empty. Generate content to start building your creator catalog."}
          </p>
          <div className="mt-4 flex gap-2">
            {(searchQuery || platformFilter !== "all" || typeFilter !== "all") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setPlatformFilter("all");
                  setTypeFilter("all");
                  setActiveTab("all");
                }}
              >
                Reset Filters
              </Button>
            )}
            <Link href="/generate">
              <Button variant="primary" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Generate New Piece
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setEditingItem(item)}
              className="group cursor-pointer rounded-2xl bg-[#0F172A]/70 border border-slate-800/80 p-5 hover:border-indigo-500/40 hover:bg-[#0F172A]/90 transition-all duration-200 flex flex-col justify-between space-y-4 hover:shadow-xl hover:shadow-black/30"
            >
              <div className="space-y-3">
                {/* Badges + Favorite */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Badge variant="platform" platform={item.platform}>
                      {item.platform}
                    </Badge>
                    <Badge variant="secondary">{item.content_type}</Badge>
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
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleToggleFavorite(item.id, e)}
                    className="p-1 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-amber-400 transition-colors"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        item.is_favorite
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-600"
                      }`}
                    />
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors line-clamp-2">
                  {item.title}
                </h3>

                {/* Hook / Content Snippet */}
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {item.hook ? (
                    <strong className="text-slate-300 font-medium">
                      &ldquo;{truncate(item.hook, 90)}&rdquo;
                    </strong>
                  ) : (
                    truncate(item.content, 120)
                  )}
                </p>

                {/* Hashtags Preview */}
                {item.hashtags && item.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.hashtags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.hashtags.length > 3 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{item.hashtags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Card Footer: Date & Quick Actions */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[11px] text-slate-400">
                  {formatDate(item.created_at)}
                </span>

                <div className="flex items-center gap-1">
                  {/* Copy */}
                  <button
                    type="button"
                    onClick={(e) => handleCopy(item, e)}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    title="Copy full content"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {/* Duplicate */}
                  <button
                    type="button"
                    onClick={(e) => handleDuplicate(item, e)}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    title="Duplicate as draft"
                  >
                    <CopyPlus className="w-3.5 h-3.5" />
                  </button>

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingItem(item);
                    }}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-indigo-400 transition-colors"
                    title="Open editor"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={(e) => handleDelete(item.id, e)}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content Editor Modal */}
      <ContentEditorModal
        isOpen={Boolean(editingItem)}
        onClose={() => setEditingItem(null)}
        item={editingItem}
        onSave={handleSaveModal}
        onDelete={async (id) => {
          await deleteContent(id);
          setItems((prev) => prev.filter((i) => i.id !== id));
        }}
      />
    </div>
  );
}

export default function LibraryPage() {
  return (
    <AppLayout>
      <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading Library...</div>}>
        <LibraryContent />
      </Suspense>
    </AppLayout>
  );
}
