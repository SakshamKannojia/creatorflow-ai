"use client";

import React from "react";
import { Video, Film, Eye, Type, Clapperboard, Sparkles } from "lucide-react";
import { ReelScene } from "@/types/database";

interface ReelBreakdownViewProps {
  hook: string;
  reelScenes?: ReelScene[];
  voiceover?: string;
  onScreenText?: string;
  bRollSuggestions?: string[];
  cta: string;
}

export function ReelBreakdownView({
  hook,
  reelScenes,
  voiceover,
  onScreenText,
  bRollSuggestions,
  cta,
}: ReelBreakdownViewProps) {
  return (
    <div className="space-y-6">
      {/* 1. HOOK SECTION */}
      <div className="rounded-xl bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-indigo-500/30 p-4">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1.5">
          <Sparkles className="w-4 h-4" />
          <span>3-Second Stopping Hook (First 0–3s)</span>
        </div>
        <p className="text-sm font-semibold text-white leading-relaxed">
          &ldquo;{hook}&rdquo;
        </p>
      </div>

      {/* 2. SCENE BY SCENE BREAKDOWN */}
      {reelScenes && reelScenes.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Clapperboard className="w-4 h-4 text-violet-400" />
            <span>Scene Breakdown & Camera Actions</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {reelScenes.map((scene, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
                  <span className="text-xs font-bold text-violet-400">
                    SCENE {scene.scene_number || idx + 1}
                  </span>
                  {scene.b_roll && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      B-Roll: {scene.b_roll}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Visual */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      Visual / Action
                    </span>
                    <p className="text-slate-200">{scene.visual}</p>
                  </div>

                  {/* Voiceover */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5 text-slate-400" />
                      Voiceover Script
                    </span>
                    <p className="text-indigo-200 font-medium italic">
                      &ldquo;{scene.voiceover}&rdquo;
                    </p>
                  </div>
                </div>

                {scene.on_screen_text && (
                  <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center gap-2 text-xs text-amber-300/90">
                    <Type className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                    <span>On-Screen Graphic: <strong>{scene.on_screen_text}</strong></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. CONTINUOUS VOICEOVER (TELEPROMPTER) */}
      {voiceover && (
        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
            <Video className="w-4 h-4 text-indigo-400" />
            Teleprompter Voiceover
          </span>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
            {voiceover}
          </p>
        </div>
      )}

      {/* 4. B-ROLL SUGGESTIONS */}
      {bRollSuggestions && bRollSuggestions.length > 0 && (
        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
            Recommended B-Roll Shots
          </span>
          <ul className="space-y-1.5">
            {bRollSuggestions.map((shot, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                <span>{shot}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 5. CTA */}
      <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
          Final Call to Action (CTA)
        </span>
        <p className="text-xs sm:text-sm text-slate-200 font-medium">
          {cta}
        </p>
      </div>
    </div>
  );
}
