"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  Copy,
  Star,
  Trash2,
  Check,
  Wand2,
  Calendar,
  X,
} from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ContentItem, ContentStatus, Platform, ContentType } from "@/types/database";
import { toast } from "@/components/ui/toast";
import { RewriteModal } from "@/components/generator/rewrite-modal";

interface ContentEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ContentItem | null;
  onSave: (id: string, updates: Partial<ContentItem>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onSchedule?: (item: ContentItem) => void;
}

const STATUS_OPTIONS: { label: string; value: ContentStatus }[] = [
  { label: "Draft", value: "draft" },
  { label: "Ready to Publish", value: "ready" },
  { label: "Published", value: "published" },
  { label: "Saved Idea", value: "idea" },
];

export function ContentEditorModal({
  isOpen,
  onClose,
  item,
  onSave,
  onDelete,
  onSchedule,
}: ContentEditorModalProps) {
  const [title, setTitle] = useState("");
  const [hook, setHook] = useState("");
  const [content, setContent] = useState("");
  const [cta, setCta] = useState("");
  const [hashtagsStr, setHashtagsStr] = useState("");
  const [status, setStatus] = useState<ContentStatus>("draft");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isRewriteOpen, setIsRewriteOpen] = useState(false);

  useEffect(() => {
    if (item) {
      setTitle(item.title || "");
      setHook(item.hook || "");
      setContent(item.content || "");
      setCta(item.cta || "");
      setHashtagsStr(item.hashtags?.join(" ") || "");
      setStatus(item.status);
      setIsFavorite(item.is_favorite);
    }
  }, [item]);

  if (!item) return null;

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const tags = hashtagsStr
        .split(/[\s,]+/)
        .map((t) => (t.startsWith("#") ? t : `#${t}`))
        .filter((t) => t.length > 1);

      await onSave(item.id, {
        title,
        hook,
        content,
        cta,
        hashtags: tags,
        status,
        is_favorite: isFavorite,
      });

      toast.success("Changes saved successfully");
      onClose();
    } catch {
      toast.error("Failed to save changes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    const text = `${hook ? hook + "\n\n" : ""}${content}${
      cta ? "\n\n" + cta : ""
    }${hashtagsStr ? "\n\n" + hashtagsStr : ""}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied content to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this content item?")) {
      await onDelete(item.id);
      toast.info("Deleted from library");
      onClose();
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Content Editor"
        description="Fine-tune and manage your saved content piece"
        size="2xl"
      >
        <div className="space-y-4">
          {/* Top metadata & quick actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Badge variant="platform" platform={item.platform}>
                {item.platform}
              </Badge>
              <Badge variant="secondary">{item.content_type}</Badge>
              <button
                type="button"
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-1.5 rounded-lg border transition-colors ${
                  isFavorite
                    ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                    : "bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300"
                }`}
                title={isFavorite ? "Favorited" : "Mark as Favorite"}
              >
                <Star
                  className={`w-3.5 h-3.5 ${isFavorite ? "fill-amber-400" : ""}`}
                />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Copy */}
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span className="text-xs">{copied ? "Copied" : "Copy"}</span>
              </Button>

              {/* AI Rewrite */}
              <Button
                variant="subtle"
                size="sm"
                onClick={() => setIsRewriteOpen(true)}
              >
                <Wand2 className="w-3.5 h-3.5 mr-1" />
                <span className="text-xs">AI Rewrite</span>
              </Button>

              {/* Schedule */}
              {onSchedule && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onSchedule(item);
                    onClose();
                  }}
                >
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  <span className="text-xs">Schedule</span>
                </Button>
              )}

              {/* Delete */}
              <Button variant="danger" size="sm" onClick={handleDelete}>
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <Input
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Post title..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Pipeline Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ContentStatus)}
                  className="w-full rounded-xl bg-slate-900/80 px-3 py-2.5 text-xs text-slate-100 border border-slate-800 focus:outline-none focus:border-indigo-500"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Textarea
                label="Hook / Scroll-Stopper Opening"
                value={hook}
                onChange={(e) => setHook(e.target.value)}
                rows={2}
                placeholder="The opening line that captures attention..."
              />
            </div>

            <div>
              <Textarea
                label="Main Body"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                placeholder="Content body..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Call to Action (CTA)"
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                placeholder="e.g. Save this post for later..."
              />

              <Input
                label="Hashtags"
                value={hashtagsStr}
                onChange={(e) => setHashtagsStr(e.target.value)}
                placeholder="#growth #creator #marketing"
              />
            </div>
          </div>

          {/* Bottom Save Footer */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleSave}
              isLoading={isLoading}
            >
              <Save className="w-4 h-4 mr-1.5" />
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      {/* AI Rewrite Modal for this item */}
      <RewriteModal
        isOpen={isRewriteOpen}
        onClose={() => setIsRewriteOpen(false)}
        originalContent={content}
        platform={item.platform}
        onApply={(newText) => setContent(newText)}
      />
    </>
  );
}
