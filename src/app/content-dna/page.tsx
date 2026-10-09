"use client";

import React, { useState, useEffect } from "react";
import {
  Dna,
  Sparkles,
  RefreshCw,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Plus,
  X,
  Sliders,
  ShieldAlert,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { useAuth } from "@/context/auth-context";
import {
  getUserContentDna,
  saveContentDna,
  deleteContentDna,
} from "@/lib/data/content-store";
import { ContentDNA } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/toast";
import { Modal } from "@/components/ui/modal";

const SAMPLE_STARTER_POSTS = [
  "Stop wasting 4 hours every single morning scrolling through Twitter for 'inspiration'.\n\nHere's the harsh truth: The top 1% of creators have an operational system. They never write when they feel inspired; they write on an automated schedule.\n\n3 rules to steal today:\n1. Never edit while you write.\n2. Keep an idea vault on your phone.\n3. Turn 1 long-form thought into 4 micro-posts.\n\nSave this post before you forget it.",
  "Agar aap bhi content creation me consistency lose kar rahe ho, toh problem aapki creativity nahi hai — aapka distribution pipeline hai.\n\nEk simple framework follow karo:\n• Weekdays: Capture raw thoughts in 60 seconds.\n• Saturday: Batch write 5 hooks.\n• Sunday: Schedule everything for the week.\n\nConsistency is a muscle, bhai. Comment 'PIPELINE' agar aapko full template chahiye!",
  "Most creators quit before their 50th post because they check analytics every 20 minutes.\n\nAttention isn't an overnight spike; it's a compounding interest account.\n\nIf you post value for 180 days straight, the algorithm has no choice but to recognize your frequency.\n\nDouble tap if you're building for the long run.",
  "Here is my entire creator stack that runs a 6-figure solopreneur business without hiring a team:\n- Notion: Master content engine & sponsorship pipeline\n- Descript: One-click video filler word removal\n- CreatorFlow: Voice-calibrated scripts & post drafts\n- Figma: Clean carousel visual assets\n\nWhich tool are you testing this week? Drop it below.",
  "The 3-second hook is 80% of your video's retention curve.\n\nIf your first line starts with 'Hey guys, welcome back to my channel', people swiped away 2 seconds ago.\n\nStart in media res:\n'I tested 10 productivity apps for 30 days and 9 of them were garbage.'\n\nPattern interruption wins every single time.",
];

export default function ContentDnaPage() {
  const { user } = useAuth();
  const [dna, setDna] = useState<ContentDNA | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Analyzing state & sample inputs
  const [samples, setSamples] = useState<string[]>(["", "", ""]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);

  // Preference edit fields
  const [editTone, setEditTone] = useState("");
  const [editLanguage, setEditLanguage] = useState("");
  const [editPersonality, setEditPersonality] = useState("");
  const [editBannedWords, setEditBannedWords] = useState("");
  const [editPreferredTopics, setEditPreferredTopics] = useState("");

  useEffect(() => {
    async function load() {
      if (user?.id) {
        try {
          const data = await getUserContentDna(user.id);
          setDna(data);
          if (data) {
            setEditTone(data.tone || "");
            setEditLanguage(data.language || "");
            setEditPersonality(data.personality || "");
            setEditBannedWords(
              data.content_preferences?.banned_words?.join(", ") || ""
            );
            setEditPreferredTopics(
              data.content_preferences?.preferred_topics?.join(", ") || ""
            );
          }
        } catch (err) {
          console.error("Content DNA load error:", err);
        } finally {
          setIsLoading(false);
        }
      }
    }
    load();
  }, [user]);

  const handleAddSampleBox = () => {
    if (samples.length < 10) {
      setSamples([...samples, ""]);
    } else {
      toast.info("Maximum 10 sample posts allowed");
    }
  };

  const handleUpdateSample = (idx: number, val: string) => {
    const updated = [...samples];
    updated[idx] = val;
    setSamples(updated);
  };

  const handleRemoveSample = (idx: number) => {
    if (samples.length <= 2) {
      toast.warning("Keep at least 2 sample slots for analysis");
      return;
    }
    setSamples(samples.filter((_, i) => i !== idx));
  };

  const handleLoadPresetSamples = () => {
    setSamples(SAMPLE_STARTER_POSTS);
    toast.info("Loaded 5 realistic creator samples");
  };

  const handleAnalyzeStyle = async () => {
    const validSamples = samples.map((s) => s.trim()).filter((s) => s.length >= 10);
    if (validSamples.length < 2) {
      toast.warning(
        "Please provide at least 2 substantive writing samples (captions, posts or scripts)"
      );
      return;
    }

    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/content-dna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ samples: validSamples }),
      });

      const resJson = await res.json();
      if (!res.ok) {
        throw new Error(resJson.error || "Analysis failed");
      }

      const analyzed = resJson.data;
      if (!user?.id) throw new Error("User session required");

      const saved = await saveContentDna({
        user_id: user.id,
        tone: analyzed.tone,
        language: analyzed.language,
        average_length: analyzed.average_length,
        vocabulary_style: analyzed.vocabulary_style,
        hook_style: analyzed.hook_style,
        cta_style: analyzed.cta_style,
        emoji_usage: analyzed.emoji_usage,
        formatting_style: analyzed.formatting_style,
        personality: analyzed.personality,
        content_preferences: analyzed.content_preferences,
        source_examples: validSamples,
      });

      setDna(saved);
      setEditTone(saved.tone || "");
      setEditLanguage(saved.language || "");
      setEditPersonality(saved.personality || "");
      setEditBannedWords(
        saved.content_preferences?.banned_words?.join(", ") || ""
      );
      setEditPreferredTopics(
        saved.content_preferences?.preferred_topics?.join(", ") || ""
      );

      toast.success(
        "Content DNA calibrated successfully!",
        `Tone: ${saved.tone}`
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error analyzing style";
      toast.error("DNA Analysis Failed", msg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDeleteDna = async () => {
    if (
      confirm(
        "Are you sure you want to delete your Content DNA? Future AI generations will use default tone parameters."
      )
    ) {
      if (user?.id) {
        await deleteContentDna(user.id);
        setDna(null);
        toast.info("Content DNA removed");
      }
    }
  };

  const handleSavePreferences = async () => {
    if (!dna || !user?.id) return;

    const updated = await saveContentDna({
      ...dna,
      tone: editTone,
      language: editLanguage,
      personality: editPersonality,
      content_preferences: {
        ...dna.content_preferences,
        banned_words: editBannedWords
          .split(",")
          .map((w) => w.trim())
          .filter(Boolean),
        preferred_topics: editPreferredTopics
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      },
    });

    setDna(updated);
    setIsEditingPreferences(false);
    toast.success("Preferences updated");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-3 border-b border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Dna className="w-4 h-4" />
              </div>
              Content DNA
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Extract and calibrate your unique creator voice. The AI automatically incorporates your DNA into every generated script and post.
            </p>
          </div>

          {dna && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingPreferences(true)}
              >
                <Sliders className="w-3.5 h-3.5 mr-1.5" />
                Edit Preferences
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleDeleteDna}
                title="Delete DNA"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Display: Active DNA vs Calibration Workspace */}
      {dna ? (
        /* Visual DNA Profile Display */
        <div className="space-y-6">
          {/* Top Banner Card */}
          <div className="rounded-2xl bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-[#0F172A] border border-indigo-500/30 p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Dna className="w-64 h-64 text-indigo-400" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    DNA Voice Active
                  </span>
                  <span className="text-xs text-slate-400">
                    Auto-injected into AI Generator
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {dna.personality}
                </h2>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  Your content communicates with a <strong>{dna.tone}</strong> tone, utilizing <strong>{dna.language}</strong> vernacular and <strong>{dna.average_length}</strong> structure.
                </p>
              </div>

              <div className="shrink-0 flex gap-2">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    if (
                      confirm(
                        "Re-analyze style? You will be prompted to paste writing samples again."
                      )
                    ) {
                      setDna(null);
                    }
                  }}
                >
                  <RefreshCw className="w-4 h-4 mr-1.5" />
                  Analyze Again
                </Button>
              </div>
            </div>
          </div>

          {/* DNA Attributes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Tone & Vibe */}
            <div className="rounded-2xl bg-[#0F172A]/70 border border-slate-800 p-5 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Tone & Cadence
              </span>
              <p className="text-base font-bold text-white">{dna.tone}</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Vocabulary Style: <em>{dna.vocabulary_style}</em>
              </p>
            </div>

            {/* Language & Length */}
            <div className="rounded-2xl bg-[#0F172A]/70 border border-slate-800 p-5 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Language & Density
              </span>
              <div className="flex items-center gap-2">
                <Badge variant="purple">{dna.language}</Badge>
                <Badge variant="secondary">{dna.average_length}</Badge>
                <Badge variant="outline">Emoji: {dna.emoji_usage}</Badge>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                Formatting habit: {dna.formatting_style}
              </p>
            </div>

            {/* Hook Style */}
            <div className="rounded-2xl bg-[#0F172A]/70 border border-slate-800 p-5 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Hook Methodology
              </span>
              <p className="text-sm font-semibold text-indigo-300">
                {dna.hook_style}
              </p>
              <p className="text-xs text-slate-400">
                Opening sentences prioritize curiosity and immediate pattern interrupts.
              </p>
            </div>

            {/* CTA Style */}
            <div className="rounded-2xl bg-[#0F172A]/70 border border-slate-800 p-5 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                CTA Conversion Formula
              </span>
              <p className="text-sm font-semibold text-emerald-300">
                {dna.cta_style}
              </p>
              <p className="text-xs text-slate-400">
                Naturally guides audience toward engagement or bookmarking without sounding pushy.
              </p>
            </div>

            {/* Preferred Topics */}
            <div className="rounded-2xl bg-[#0F172A]/70 border border-slate-800 p-5 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Core Themes & Topics
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {dna.content_preferences?.preferred_topics?.length ? (
                  dna.content_preferences.preferred_topics.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium"
                    >
                      {t}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500">None specified</span>
                )}
              </div>
            </div>

            {/* Banned Words / Clichés */}
            <div className="rounded-2xl bg-[#0F172A]/70 border border-slate-800 p-5 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Banned Clichés
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {dna.content_preferences?.banned_words?.length ? (
                  dna.content_preferences.banned_words.map((w, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium line-through"
                    >
                      {w}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500">None filtered</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Calibration Form */
        <div className="rounded-2xl bg-[#0F172A]/80 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white">
                Train Your Content DNA
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                Paste 3 to 10 examples of your previous captions, LinkedIn posts, or video scripts. Gemini will inspect your vocabulary, rhythm, hook construction, and personality.
              </p>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleLoadPresetSamples}
              className="shrink-0"
            >
              <BookOpen className="w-4 h-4 mr-1.5" />
              Load Realistic Demo Samples
            </Button>
          </div>

          {/* Sample Input Boxes */}
          <div className="space-y-4">
            {samples.map((sample, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-slate-900/60 border border-slate-800 p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">
                    Sample Post #{idx + 1}
                  </label>
                  {samples.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSample(idx)}
                      className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors"
                      title="Remove sample"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <textarea
                  value={sample}
                  onChange={(e) => handleUpdateSample(idx, e.target.value)}
                  placeholder={`Paste sample post #${idx + 1} here (e.g. caption, reel script, LinkedIn post)...`}
                  className="w-full h-24 p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 resize-y font-sans"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleAddSampleBox}
              disabled={samples.length >= 10}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Another Sample Box ({samples.length}/10)
            </Button>

            <Button
              type="button"
              variant="primary"
              size="lg"
              isLoading={isAnalyzing}
              onClick={handleAnalyzeStyle}
              className="w-full sm:w-auto shadow-indigo-500/20"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Analyze My Style with Gemini
            </Button>
          </div>
        </div>
      )}

      {/* Edit Preferences Modal */}
      {dna && (
        <Modal
          isOpen={isEditingPreferences}
          onClose={() => setIsEditingPreferences(false)}
          title="Edit Content DNA Preferences"
          description="Manually fine-tune tone attributes, vocabulary bans, or preferred topics"
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Tone"
                value={editTone}
                onChange={(e) => setEditTone(e.target.value)}
                placeholder="e.g. Casual + Cinematic"
              />
              <Input
                label="Primary Language"
                value={editLanguage}
                onChange={(e) => setEditLanguage(e.target.value)}
                placeholder="e.g. English, Hinglish"
              />
            </div>

            <Input
              label="Personality Persona"
              value={editPersonality}
              onChange={(e) => setEditPersonality(e.target.value)}
              placeholder="e.g. Pragmatic builder, relatable mentor"
            />

            <Input
              label="Banned Words & Clichés (comma-separated)"
              value={editBannedWords}
              onChange={(e) => setEditBannedWords(e.target.value)}
              placeholder="e.g. synergy, unlock, 10x guru, game changer"
              hint="The AI will avoid using these words in your generations"
            />

            <Input
              label="Preferred Topics & Themes (comma-separated)"
              value={editPreferredTopics}
              onChange={(e) => setEditPreferredTopics(e.target.value)}
              placeholder="e.g. Productivity, AI workflows, Solopreneurship"
            />

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditingPreferences(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleSavePreferences}
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
