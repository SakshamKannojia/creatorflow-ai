"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Wand2,
  Sparkles,
  Copy,
  Check,
  Save,
  RefreshCw,
  Trash2,
  Edit3,
  Dna,
  Video,
  Share2,
  BookmarkCheck,
  ArrowRight,
  Sliders,
  CheckCircle2,
} from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { useAuth } from "@/context/auth-context";
import {
  getUserContentDna,
  saveContent,
  CreatorStats,
} from "@/lib/data/content-store";
import {
  Platform,
  ContentType,
  Tone,
  Language,
  ContentLength,
  CtaType,
  ReelDuration,
  ReelFormat,
  ContentDNA,
  GenerateRequestPayload,
  GenerateResponsePayload,
} from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/toast";
import { ReelBreakdownView } from "@/components/generator/reel-breakdown-view";
import { RewriteModal } from "@/components/generator/rewrite-modal";

const PLATFORMS: Platform[] = ["Instagram", "LinkedIn", "YouTube", "X"];

const CONTENT_TYPES: ContentType[] = [
  "Caption",
  "Reel Script",
  "Carousel",
  "LinkedIn Post",
  "YouTube Description",
  "Content Idea",
];

const TONES: Tone[] = [
  "Professional",
  "Casual",
  "Cinematic",
  "Funny",
  "Educational",
  "Gen-Z",
  "Storytelling",
];

const LANGUAGES: Language[] = ["English", "Hinglish", "Hindi"];

const LENGTHS: ContentLength[] = ["Short", "Medium", "Long"];

const CTA_TYPES: CtaType[] = ["None", "Soft", "Direct"];

const REEL_DURATIONS: ReelDuration[] = [
  "15 seconds",
  "30 seconds",
  "60 seconds",
];

const REEL_FORMATS: ReelFormat[] = [
  "Talking Head",
  "Faceless",
  "Cinematic",
  "Tutorial",
  "Storytelling",
];

function GeneratorContent() {
  const searchParams = useSearchParams();
  const { user } = useAuth();

  // Generator Configuration State
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState<Platform>("Instagram");
  const [contentType, setContentType] = useState<ContentType>("Caption");
  const [tone, setTone] = useState<Tone>("Casual");
  const [language, setLanguage] = useState<Language>("English");
  const [targetAudience, setTargetAudience] = useState("");
  const [length, setLength] = useState<ContentLength>("Medium");
  const [cta, setCta] = useState<CtaType>("Soft");
  const [keywords, setKeywords] = useState("");
  const [reelDuration, setReelDuration] = useState<ReelDuration>("30 seconds");
  const [reelFormat, setReelFormat] = useState<ReelFormat>("Talking Head");

  // Content DNA & Automation
  const [dna, setDna] = useState<ContentDNA | null>(null);
  const [useDna, setUseDna] = useState(true);

  // Output & UI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<GenerateResponsePayload | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedHook, setEditedHook] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedCta, setEditedCta] = useState("");
  const [editedHashtags, setEditedHashtags] = useState<string[]>([]);

  // Action status
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isRewriteOpen, setIsRewriteOpen] = useState(false);

  // Initialize query params
  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam && CONTENT_TYPES.includes(typeParam as ContentType)) {
      setContentType(typeParam as ContentType);
    }
  }, [searchParams]);

  // Load Content DNA
  useEffect(() => {
    async function loadDna() {
      if (user?.id) {
        const d = await getUserContentDna(user.id);
        setDna(d);
        if (d) {
          // Pre-populate tone & language if DNA is present
          if (d.tone && TONES.includes(d.tone as Tone)) setTone(d.tone as Tone);
          if (d.language && LANGUAGES.includes(d.language as Language))
            setLanguage(d.language as Language);
        }
      }
    }
    loadDna();
  }, [user]);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.warning("Please enter a topic or product", "Topic cannot be empty");
      return;
    }

    setIsGenerating(true);
    setIsSaved(false);
    setIsEditing(false);

    const payload: GenerateRequestPayload = {
      topic: topic.trim(),
      platform,
      contentType,
      tone,
      language,
      targetAudience: targetAudience.trim() || undefined,
      length,
      cta,
      keywords: keywords
        ? keywords
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean)
        : undefined,
      reelDuration: contentType === "Reel Script" ? reelDuration : undefined,
      reelFormat: contentType === "Reel Script" ? reelFormat : undefined,
      useContentDna: useDna && Boolean(dna),
    };

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload, dna: useDna ? dna : null }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || "Generation request failed");
      }

      const generatedData: GenerateResponsePayload = resData.data;
      setOutput(generatedData);
      setEditedTitle(generatedData.title);
      setEditedHook(generatedData.hook);
      setEditedContent(generatedData.mainContent);
      setEditedCta(generatedData.cta);
      setEditedHashtags(generatedData.hashtags || []);

      toast.success(
        "Content generated successfully!",
        `${contentType} for ${platform}`
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error generating content";
      toast.error("Generation failed", message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToLibrary = async (saveStatus: "draft" | "ready" | "idea" = "ready") => {
    if (!output || !user?.id) return;
    setIsSaving(true);
    try {
      await saveContent({
        user_id: user.id,
        title: editedTitle || output.title,
        platform,
        content_type: contentType,
        topic,
        tone,
        language,
        hook: editedHook,
        content: editedContent,
        cta: editedCta,
        hashtags: editedHashtags,
        status: saveStatus,
        is_favorite: false,
        metadata: {
          reel_scenes: output.reelScenes,
          duration: reelDuration,
          format: reelFormat,
          target_audience: targetAudience,
        },
      });

      setIsSaved(true);
      toast.success("Saved to Library", `Marked as ${saveStatus}`);
    } catch (err) {
      toast.error("Failed to save content", "Please try again");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    const isReel = contentType === "Reel Script";
    let text = "";

    if (isReel && output.reelScenes) {
      text = `TITLE: ${editedTitle}\nHOOK: ${editedHook}\n\n`;
      text += `SCENES:\n` + output.reelScenes.map(s => `SCENE ${s.scene_number}: Visual: ${s.visual}\nVO: ${s.voiceover}\nOverlay: ${s.on_screen_text || ''}`).join("\n\n");
      text += `\n\nCTA: ${editedCta}\n${editedHashtags.join(" ")}`;
    } else {
      text = `${editedHook ? editedHook + "\n\n" : ""}${editedContent}${
        editedCta ? "\n\n" + editedCta : ""
      }${editedHashtags.length ? "\n\n" + editedHashtags.join(" ") : ""}`;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyRewrite = (newText: string) => {
    setEditedContent(newText);
    if (output) {
      setOutput({ ...output, mainContent: newText });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-3 border-b border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Wand2 className="w-6 h-6 text-indigo-400" />
              AI Content Generator
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Create high-retention captions, viral reel blueprints, and post concepts tailored to your voice.
            </p>
          </div>

          {dna && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs">
              <Dna className="w-4 h-4 text-indigo-400" />
              <span className="text-slate-300 text-[11px]">
                DNA: <strong>{dna.tone}</strong>
              </span>
              <label className="flex items-center gap-1.5 ml-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useDna}
                  onChange={(e) => setUseDna(e.target.checked)}
                  className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                />
                <span className="text-[11px] text-indigo-300 font-medium">Use Voice</span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid: Left Controls / Right Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Generator Form (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-[#0F172A]/80 border border-slate-800 p-5 space-y-5">
          {/* 1. Topic */}
          <div>
            <Textarea
              label="Topic, Product, or Story Idea"
              placeholder="e.g. 5 AI workflows that save creators 15 hours every week..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={3}
              required
            />
          </div>

          {/* 2. Platform Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              Target Platform
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {PLATFORMS.map((p) => {
                const isSelected = platform === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlatform(p)}
                    className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                      isSelected
                        ? "bg-indigo-600/20 border-indigo-500 text-white shadow-sm"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Content Type */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              Content Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {CONTENT_TYPES.map((t) => {
                const isSelected = contentType === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setContentType(t)}
                    className={`py-2 px-2 rounded-xl text-xs font-medium border text-center truncate transition-all ${
                      isSelected
                        ? "bg-indigo-600/20 border-indigo-500 text-white shadow-sm"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reel Specific Options */}
          {contentType === "Reel Script" && (
            <div className="p-3.5 rounded-xl bg-violet-950/20 border border-violet-500/20 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-violet-300 uppercase tracking-wider">
                <Video className="w-3.5 h-3.5" />
                <span>Reel Script Blueprint Specs</span>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">
                  Target Duration
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {REEL_DURATIONS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setReelDuration(d)}
                      className={`py-1.5 text-[11px] rounded-lg border font-medium ${
                        reelDuration === d
                          ? "bg-violet-600/30 border-violet-500 text-white"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">
                  Production Format
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {REEL_FORMATS.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setReelFormat(f)}
                      className={`py-1.5 text-[11px] rounded-lg border font-medium truncate ${
                        reelFormat === f
                          ? "bg-violet-600/30 border-violet-500 text-white"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. Tone & Language */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as Tone)}
                className="w-full rounded-xl bg-slate-900/80 px-3 py-2 text-xs text-slate-100 border border-slate-800 focus:outline-none focus:border-indigo-500"
              >
                {TONES.map((t) => (
                  <option key={t} value={t} className="bg-slate-900 text-white">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full rounded-xl bg-slate-900/80 px-3 py-2 text-xs text-slate-100 border border-slate-800 focus:outline-none focus:border-indigo-500"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l} className="bg-slate-900 text-white">
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 5. Length & CTA */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">
                Length
              </label>
              <div className="grid grid-cols-3 gap-1">
                {LENGTHS.map((len) => (
                  <button
                    key={len}
                    type="button"
                    onClick={() => setLength(len)}
                    className={`py-1.5 text-xs rounded-lg border font-medium ${
                      length === len
                        ? "bg-indigo-600/30 border-indigo-500 text-white"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {len}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">
                CTA Preference
              </label>
              <div className="grid grid-cols-3 gap-1">
                {CTA_TYPES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCta(c)}
                    className={`py-1.5 text-xs rounded-lg border font-medium ${
                      cta === c
                        ? "bg-indigo-600/30 border-indigo-500 text-white"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 6. Target Audience & Keywords */}
          <div className="space-y-3">
            <Input
              label="Target Audience (Optional)"
              placeholder="e.g. Solopreneurs, Devs, Fitness Enthusiasts"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
            />

            <Input
              label="Keywords (Optional, comma-separated)"
              placeholder="e.g. AI tools, productivity, time management"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>

          {/* Generate Button */}
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="w-full mt-2"
            isLoading={isGenerating}
            onClick={handleGenerate}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {isGenerating ? "Synthesizing with Gemini..." : "Generate Content"}
          </Button>
        </div>

        {/* Right Column: AI Output & Editing (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {!output && !isGenerating && (
            /* Empty State */
            <div className="rounded-2xl bg-[#0F172A]/50 border border-dashed border-slate-800 p-12 text-center flex flex-col items-center justify-center min-h-[460px]">
              <div className="w-14 h-14 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3 shadow-lg shadow-indigo-500/10">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-base font-semibold text-white">
                Content Engine Ready
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 max-w-sm">
                Enter your topic, select your platform, and CreatorFlow will generate an optimized hook, body, and CTA.
              </p>
            </div>
          )}

          {isGenerating && (
            /* Shimmer Loading State */
            <div className="rounded-2xl bg-[#0F172A] border border-slate-800 p-6 space-y-5 animate-pulse min-h-[460px]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="h-6 bg-slate-800 rounded-md w-1/3" />
                <div className="h-6 bg-slate-800 rounded-full w-24" />
              </div>
              <div className="h-16 bg-indigo-950/30 border border-indigo-500/20 rounded-xl" />
              <div className="space-y-3">
                <div className="h-4 bg-slate-800 rounded w-full" />
                <div className="h-4 bg-slate-800 rounded w-5/6" />
                <div className="h-4 bg-slate-800 rounded w-4/6" />
                <div className="h-4 bg-slate-800 rounded w-full" />
              </div>
              <div className="h-12 bg-slate-800/60 rounded-xl" />
            </div>
          )}

          {output && !isGenerating && (
            /* Result Card */
            <div className="rounded-2xl bg-[#0F172A] border border-slate-800 p-6 space-y-6 shadow-2xl">
              {/* Output Actions Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Badge variant="platform" platform={platform}>
                    {platform}
                  </Badge>
                  <Badge variant="secondary">
                    {contentType}
                  </Badge>
                  {isSaved && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Saved
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Copy Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    title="Copy full content"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span className="text-xs">{copied ? "Copied" : "Copy"}</span>
                  </Button>

                  {/* Inline Edit Toggle */}
                  <Button
                    variant={isEditing ? "subtle" : "ghost"}
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span className="text-xs">{isEditing ? "Done" : "Edit"}</span>
                  </Button>

                  {/* AI Rewrite Button */}
                  <Button
                    variant="subtle"
                    size="sm"
                    onClick={() => setIsRewriteOpen(true)}
                  >
                    <Wand2 className="w-3.5 h-3.5 mr-1" />
                    <span className="text-xs">Rewrite</span>
                  </Button>

                  {/* Regenerate */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleGenerate}
                    title="Regenerate"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </Button>

                  {/* Save to Library */}
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleSaveToLibrary("ready")}
                    isLoading={isSaving}
                  >
                    <Save className="w-3.5 h-3.5 mr-1" />
                    Save
                  </Button>
                </div>
              </div>

              {/* Title */}
              {isEditing ? (
                <Input
                  label="Title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {editedTitle}
                </h2>
              )}

              {/* Content Body Based on Type */}
              {contentType === "Reel Script" ? (
                <ReelBreakdownView
                  hook={editedHook}
                  reelScenes={output.reelScenes}
                  voiceover={output.voiceover}
                  onScreenText={output.onScreenText}
                  bRollSuggestions={output.bRollSuggestions}
                  cta={editedCta}
                />
              ) : (
                /* Standard Post / Caption / Carousel View */
                <div className="space-y-4">
                  {/* Hook */}
                  <div className="rounded-xl bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-indigo-500/30 p-4">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                      Hook (Scroll Stopper)
                    </span>
                    {isEditing ? (
                      <textarea
                        value={editedHook}
                        onChange={(e) => setEditedHook(e.target.value)}
                        className="w-full bg-slate-900 border border-indigo-500/50 rounded-lg p-2 text-xs text-white"
                        rows={2}
                      />
                    ) : (
                      <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                        &ldquo;{editedHook}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* Main Body */}
                  <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Main Content
                    </span>
                    {isEditing ? (
                      <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-100"
                        rows={8}
                      />
                    ) : (
                      <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                        {editedContent}
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  {editedCta && (
                    <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-3.5">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                        Call to Action (CTA)
                      </span>
                      {isEditing ? (
                        <input
                          value={editedCta}
                          onChange={(e) => setEditedCta(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                        />
                      ) : (
                        <p className="text-xs sm:text-sm text-slate-200 font-medium">
                          {editedCta}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Hashtags */}
                  {editedHashtags.length > 0 && (
                    <div className="pt-2 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mr-1">
                        Tags:
                      </span>
                      {editedHashtags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-800 text-[11px] font-medium text-indigo-300 border border-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Save Actions Drawer */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-slate-400">
                  Ready to store or plan for publishing?
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSaveToLibrary("draft")}
                  >
                    Save as Draft
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleSaveToLibrary("ready")}
                    isLoading={isSaving}
                  >
                    <Save className="w-3.5 h-3.5 mr-1" />
                    Save to Library
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Rewrite Modal */}
      {output && (
        <RewriteModal
          isOpen={isRewriteOpen}
          onClose={() => setIsRewriteOpen(false)}
          originalContent={editedContent || output.mainContent}
          platform={platform}
          onApply={handleApplyRewrite}
        />
      )}
    </div>
  );
}

export default function GeneratePage() {
  return (
    <AppLayout>
      <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading Generator...</div>}>
        <GeneratorContent />
      </Suspense>
    </AppLayout>
  );
}
