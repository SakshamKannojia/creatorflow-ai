"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Check, X, RefreshCw, Wand2 } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Platform } from "@/types/database";
import { toast } from "@/components/ui/toast";

const rewriteOptions = [
  { label: "Make shorter", description: "Condense into punchy, high-impact lines" },
  { label: "Make longer", description: "Elaborate with examples & deeper reasoning" },
  { label: "Improve hook", description: "Inject high-stopping curiosity interrupt" },
  { label: "Improve CTA", description: "Enhance conversion & bookmark probability" },
  { label: "Make more professional", description: "Refined vocabulary & executive clarity" },
  { label: "Make more cinematic", description: "Atmospheric beats & visual storytelling" },
  { label: "Make more engaging", description: "Interactive questions & conversational tone" },
  { label: "Make Gen-Z", description: "Modern internet slang & punchy cadence" },
  { label: "Convert to Hinglish", description: "Relatable Hindi-English vernacular" },
  { label: "Convert to LinkedIn style", description: "Line-spaced insights & discussion prompts" },
] as const;

type RewriteInstruction = (typeof rewriteOptions)[number]["label"];

interface RewriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalContent: string;
  platform?: Platform;
  onApply: (newContent: string) => void;
}

export function RewriteModal({
  isOpen,
  onClose,
  originalContent,
  platform,
  onApply,
}: RewriteModalProps) {
  const [selectedInstruction, setSelectedInstruction] =
    useState<RewriteInstruction>("Improve hook");
  const [rewrittenText, setRewrittenText] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRewrite = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: originalContent,
          instruction: selectedInstruction,
          platform,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Rewrite failed");
      }

      setRewrittenText(data.data.rewrittenContent);
      setExplanation(data.data.explanation);
      toast.success("Content rewritten", selectedInstruction);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error executing rewrite";
      toast.error("Rewrite failed", msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (rewrittenText) {
      onApply(rewrittenText);
      toast.success("Applied rewritten version");
      onClose();
    }
  };

  const handleReset = () => {
    setRewrittenText(null);
    setExplanation(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="AI Content Rewrite & Transformation"
      description="Select a stylistic transformation to enhance engagement, clarity, or tone."
      size="xl"
    >
      <div className="space-y-5">
        {!rewrittenText ? (
          <>
            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                Select Transformation
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {rewriteOptions.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setSelectedInstruction(opt.label)}
                    className={`text-left p-3 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                      selectedInstruction === opt.label
                        ? "bg-indigo-600/20 border-indigo-500/60 text-white shadow-sm shadow-indigo-500/10"
                        : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40"
                    }`}
                  >
                    <span className="font-semibold text-white">{opt.label}</span>
                    <span className="text-[11px] text-slate-400 mt-1">
                      {opt.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                Current Text to Transform
              </label>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 max-h-36 overflow-y-auto whitespace-pre-wrap">
                {originalContent}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <Button variant="ghost" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleRewrite}
                isLoading={isLoading}
              >
                <Wand2 className="w-4 h-4 mr-1.5" />
                Transform with AI
              </Button>
            </div>
          </>
        ) : (
          /* Side by side / Rewritten Preview */
          <div className="space-y-4">
            {explanation && (
              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-indigo-300">Transformation Applied:</strong>{" "}
                  {explanation}
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-semibold text-slate-400 block mb-1.5 uppercase tracking-wider">
                  Original
                </span>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 h-64 overflow-y-auto whitespace-pre-wrap">
                  {originalContent}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-indigo-400 block mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Rewritten Version ({selectedInstruction})
                </span>
                <textarea
                  value={rewrittenText}
                  onChange={(e) => setRewrittenText(e.target.value)}
                  className="w-full h-64 p-3 rounded-xl bg-slate-900 border border-indigo-500/40 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                Try Another Style
              </Button>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" onClick={handleApply}>
                  <Check className="w-4 h-4 mr-1.5" />
                  Use This Version
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
