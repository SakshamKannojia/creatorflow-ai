"use client";

import React, { useState } from "react";
import { 
  Dna, 
  Film, 
  CalendarDays, 
  Sliders, 
  Zap, 
  Gauge
} from "lucide-react";
import Card3DTilt from "./Card3DTilt";

export default function Bento3DShowcase() {
  const [toneValue, setToneValue] = useState(75);
  const [activeHookIndex, setActiveHookIndex] = useState(0);

  const hookVariations = [
    { type: "Contrarian Hook", text: "Why 99% of creators are wasting 10 hours a week on editing software.", score: 98 },
    { type: "Curiosity Gap", text: "The psychological reason your first 3 seconds decide your entire month's revenue.", score: 95 },
    { type: "Data Proof", text: "We analyzed 2.4 million reels. The top 0.1% do this exact pacing shift.", score: 99 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
      
      {/* Bento Card 1: Content DNA (Spans 7 cols) */}
      <div className="lg:col-span-7">
        <Card3DTilt intensity={8} glareOpacity={0.06} className="h-full">
          <div className="h-full rounded-2xl border border-slate-200/90 bg-white p-7 md:p-8 flex flex-col justify-between shadow-[0_4px_25px_-5px_rgba(0,0,0,0.04)] overflow-hidden relative group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-150 flex items-center justify-center text-indigo-600 shadow-xs">
                  <Dna className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700">
                  Adaptive Persona
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
                Content DNA™ Engine
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                Never sound like a generic AI bot again. Calibrate your distinct voice, rhythm, taboo words, and intellectual depth. Every generated script sounds strictly like you.
              </p>
            </div>

            {/* Interactive Tone Slider Mockup */}
            <div className="p-5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-3.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                  Voice Archetype Calibration
                </span>
                <span className="text-indigo-700 font-bold bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-150">
                  {toneValue < 40 ? "Casual Storyteller" : toneValue < 75 ? "Direct Pragmatist" : "High Authority Expert"}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={toneValue}
                onChange={(e) => setToneValue(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
              />

              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>Conversational</span>
                <span>Structured</span>
                <span>Rigorous Thesis</span>
              </div>
            </div>
          </div>
        </Card3DTilt>
      </div>

      {/* Bento Card 2: Viral Hook Forge (Spans 5 cols) */}
      <div className="lg:col-span-5">
        <Card3DTilt intensity={8} glareOpacity={0.06} className="h-full">
          <div className="h-full rounded-2xl border border-slate-200/90 bg-white p-7 md:p-8 flex flex-col justify-between shadow-[0_4px_25px_-5px_rgba(0,0,0,0.04)] overflow-hidden relative group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-150 flex items-center justify-center text-sky-600 shadow-xs">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-50 border border-sky-150 text-sky-700">
                  Instant Retention
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
                AI Hook Optimizer
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                Generates high-stopping-power opening sentences tested against viral retention heuristics.
              </p>
            </div>

            {/* Interactive Hook Switcher */}
            <div className="space-y-2.5">
              {hookVariations.map((h, i) => {
                const isSelected = activeHookIndex === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveHookIndex(i)}
                    className={`w-full p-3.5 text-left rounded-xl border transition-all ${
                      isSelected
                        ? "bg-sky-50/70 border-sky-300 text-slate-900 shadow-xs"
                        : "bg-slate-50/60 border-slate-200/70 hover:border-slate-300 text-slate-600"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wide">
                        {h.type}
                      </span>
                      <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-150">
                        {h.score}% Retention
                      </span>
                    </div>
                    <div className="text-xs text-slate-800 font-medium line-clamp-2">
                      &quot;{h.text}&quot;
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </Card3DTilt>
      </div>

      {/* Bento Card 3: Visual Director Blueprint (Spans 4 cols) */}
      <div className="lg:col-span-4">
        <Card3DTilt intensity={8} glareOpacity={0.06} className="h-full">
          <div className="h-full rounded-2xl border border-slate-200/90 bg-white p-7 flex flex-col justify-between shadow-[0_4px_25px_-5px_rgba(0,0,0,0.04)] overflow-hidden relative">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-150 flex items-center justify-center text-indigo-600 shadow-xs mb-5">
                <Film className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
                Visual Blueprints
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-6 font-normal">
                Automatically transforms your script into a shot-by-shot shooting list with camera angles and B-roll cues.
              </p>
            </div>

            <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
              <div className="flex items-center justify-between text-slate-700 pb-2 border-b border-slate-200/60 font-medium">
                <span>0:00 - 0:05</span>
                <span className="text-[11px] text-indigo-600 font-semibold">A-Roll Close-up</span>
              </div>
              <div className="flex items-center justify-between text-slate-700 pb-2 border-b border-slate-200/60 font-medium">
                <span>0:05 - 0:22</span>
                <span className="text-[11px] text-sky-600 font-semibold">B-Roll Cutaway</span>
              </div>
              <div className="flex items-center justify-between text-slate-700 font-medium">
                <span>0:22 - 0:50</span>
                <span className="text-[11px] text-emerald-600 font-semibold">Screen Graphic</span>
              </div>
            </div>
          </div>
        </Card3DTilt>
      </div>

      {/* Bento Card 4: Precision Teleprompter (Spans 4 cols) */}
      <div className="lg:col-span-4">
        <Card3DTilt intensity={8} glareOpacity={0.06} className="h-full">
          <div className="h-full rounded-2xl border border-slate-200/90 bg-white p-7 flex flex-col justify-between shadow-[0_4px_25px_-5px_rgba(0,0,0,0.04)] overflow-hidden relative">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-150 flex items-center justify-center text-emerald-600 shadow-xs mb-5">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
                Smart Teleprompter
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-6 font-normal">
                Real-time speech pacing tracker with adjustable cadence markers so you never stutter or rush through key ideas.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-medium">Current Pacing</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-150">150 WPM (Optimal)</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[85%]" />
              </div>
              <div className="text-[11px] text-slate-500 flex items-center justify-between">
                <span>Natural pauses</span>
                <span>Breath marks tagged</span>
              </div>
            </div>
          </div>
        </Card3DTilt>
      </div>

      {/* Bento Card 5: Pipeline & Calendar Sync (Spans 4 cols) */}
      <div className="lg:col-span-4">
        <Card3DTilt intensity={8} glareOpacity={0.06} className="h-full">
          <div className="h-full rounded-2xl border border-slate-200/90 bg-white p-7 flex flex-col justify-between shadow-[0_4px_25px_-5px_rgba(0,0,0,0.04)] overflow-hidden relative">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-150 flex items-center justify-center text-amber-600 shadow-xs mb-5">
                <CalendarDays className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
                Production Pipeline
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-6 font-normal">
                Drag, drop, and publish. Connects directly to your content calendar so consistency is completely automated.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              {["Mon", "Tue", "Wed", "Thu"].map((d, i) => (
                <div key={d} className="p-2.5 rounded-lg bg-white border border-slate-200 text-center shadow-xs">
                  <div className="text-[11px] text-slate-600 font-semibold mb-1.5">{d}</div>
                  <div className={`w-2 h-2 rounded-full mx-auto ${i === 1 || i === 3 ? "bg-indigo-600" : "bg-emerald-500"}`} />
                </div>
              ))}
            </div>
          </div>
        </Card3DTilt>
      </div>

    </div>
  );
}
