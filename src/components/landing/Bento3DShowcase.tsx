"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Dna, 
  Layers, 
  Video, 
  CalendarDays, 
  Sliders, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  ArrowUpRight,
  Shield,
  Gauge,
  Film,
  Sparkle
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
        <Card3DTilt intensity={12} glareOpacity={0.2} className="h-full">
          <div className="h-full rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-[#0c1222] to-[#070b14] p-7 md:p-8 flex flex-col justify-between shadow-xl shadow-indigo-950/30 overflow-hidden relative group">
            {/* Ambient accent blur */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-500 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-md shadow-indigo-600/20">
                  <Dna className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-800 text-indigo-300">
                  Adaptive Persona
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                Content DNA™ Engine
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Never sound like a generic AI bot again. Calibrate your distinct voice, rhythm, taboo words, and intellectual depth. Every generated script sounds strictly like you.
              </p>
            </div>

            {/* Interactive Tone Slider Mockup */}
            <div className="p-5 rounded-xl bg-slate-900/80 border border-indigo-950 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                  Voice Archetype Calibration
                </span>
                <span className="text-indigo-400 font-mono font-bold">
                  {toneValue < 40 ? "Casual Storyteller" : toneValue < 75 ? "Direct Pragmatist" : "High Authority Expert"}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={toneValue}
                onChange={(e) => setToneValue(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-950 rounded-lg appearance-none"
              />

              <div className="flex justify-between text-[11px] text-slate-500">
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
        <Card3DTilt intensity={14} glareOpacity={0.2} className="h-full">
          <div className="h-full rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-[#0c1222] to-[#070b14] p-7 md:p-8 flex flex-col justify-between shadow-xl shadow-indigo-950/30 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-500 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-md shadow-cyan-600/20">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300">
                  Instant Retention
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                AI Hook Optimizer
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
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
                    className={`w-full p-3 text-left rounded-xl border transition-all ${
                      isSelected
                        ? "bg-slate-900 border-cyan-500/50 shadow-md shadow-cyan-950/30"
                        : "bg-slate-900/40 border-indigo-950/80 hover:bg-slate-900/80 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-cyan-300 uppercase">
                        {h.type}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 font-bold">
                        {h.score}% Retention
                      </span>
                    </div>
                    <div className="text-xs text-slate-200 line-clamp-2">
                      "{h.text}"
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
        <Card3DTilt intensity={14} glareOpacity={0.2} className="h-full">
          <div className="h-full rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-[#0c1222] to-[#070b14] p-7 flex flex-col justify-between shadow-xl shadow-indigo-950/30 overflow-hidden relative">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-md shadow-blue-600/20 mb-4">
                <Film className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                Visual Blueprints
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">
                Automatically transforms your script into a shot-by-shot shooting list with camera angles and B-roll cues.
              </p>
            </div>

            <div className="space-y-2 p-3.5 rounded-xl bg-slate-900/80 border border-indigo-950 text-xs">
              <div className="flex items-center justify-between text-slate-300 pb-2 border-b border-indigo-950">
                <span className="font-semibold">0:00 - 0:05</span>
                <span className="text-[10px] text-blue-400 font-mono">A-Roll Close-up</span>
              </div>
              <div className="flex items-center justify-between text-slate-300 pb-2 border-b border-indigo-950">
                <span className="font-semibold">0:05 - 0:22</span>
                <span className="text-[10px] text-cyan-400 font-mono">B-Roll Cutaway</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-semibold">0:22 - 0:50</span>
                <span className="text-[10px] text-emerald-400 font-mono">Screen Graphic</span>
              </div>
            </div>
          </div>
        </Card3DTilt>
      </div>

      {/* Bento Card 4: Precision Teleprompter (Spans 4 cols) */}
      <div className="lg:col-span-4">
        <Card3DTilt intensity={14} glareOpacity={0.2} className="h-full">
          <div className="h-full rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-[#0c1222] to-[#070b14] p-7 flex flex-col justify-between shadow-xl shadow-indigo-950/30 overflow-hidden relative">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-600/20 mb-4">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                Smart Teleprompter
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">
                Real-time speech pacing tracker with adjustable cadence markers so you never stutter or rush through key ideas.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-indigo-950 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Current Pacing</span>
                <span className="text-xs font-mono font-bold text-emerald-400">150 WPM (Optimal)</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
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
        <Card3DTilt intensity={14} glareOpacity={0.2} className="h-full">
          <div className="h-full rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-[#0c1222] to-[#070b14] p-7 flex flex-col justify-between shadow-xl shadow-indigo-950/30 overflow-hidden relative">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-md shadow-amber-600/20 mb-4">
                <CalendarDays className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                Production Pipeline
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">
                Drag, drop, and publish. Connects directly to your content calendar so consistency is completely automated.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-1.5 p-3 rounded-xl bg-slate-900/80 border border-indigo-950">
              {["Mon", "Tue", "Wed", "Thu"].map((d, i) => (
                <div key={d} className="p-2 rounded bg-slate-950/80 border border-indigo-950/60 text-center">
                  <div className="text-[10px] text-slate-500 font-semibold mb-1">{d}</div>
                  <div className={`w-2 h-2 rounded-full mx-auto ${i === 1 || i === 3 ? "bg-indigo-400" : "bg-emerald-400"}`} />
                </div>
              ))}
            </div>
          </div>
        </Card3DTilt>
      </div>

    </div>
  );
}
