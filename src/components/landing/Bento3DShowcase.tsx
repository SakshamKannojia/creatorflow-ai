"use client";

import React, { useState } from "react";
import {
  Dna,
  Film,
  CalendarDays,
  Sliders,
  Zap,
  Gauge,
} from "lucide-react";
import Card3DTilt from "./Card3DTilt";

export default function Bento3DShowcase() {
  const [toneValue, setToneValue] = useState(75);
  const [activeHookIndex, setActiveHookIndex] = useState(0);

  const hookVariations = [
    { type: "Contrarian Hook", text: "Why 99% of creators are wasting 10 hours a week on editing software.", score: 98 },
    { type: "Curiosity Gap",   text: "The psychological reason your first 3 seconds decide your entire month's revenue.", score: 95 },
    { type: "Data Proof",      text: "We analyzed 2.4 million reels. The top 0.1% do this exact pacing shift.", score: 99 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-4">

      {/* Card 1: Content DNA — 7 cols */}
      <div className="lg:col-span-7">
        <Card3DTilt intensity={5} glareOpacity={0.04} className="h-full">
          <div className="h-full rounded-2xl border dark:border-slate-800 border-[#e8dece] dark:bg-slate-900 bg-white p-7 md:p-8 flex flex-col justify-between card-hover overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-sm">
                  <Dna className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-medium px-2.5 py-1 rounded-full dark:bg-amber-950/50 dark:border-amber-800/50 dark:text-amber-300 bg-[#f5f0e8] border border-[#d8cdb8] text-[#6b4226]">
                  Adaptive Persona
                </span>
              </div>

              <h3 className="text-xl font-bold dark:text-white text-[#1c1611] tracking-tight mb-2">
                Content DNA™ Engine
              </h3>
              <p className="dark:text-slate-400 text-[#6b5744] text-sm leading-relaxed mb-6">
                Never sound like a generic AI. Calibrate your distinct voice, rhythm, taboo words, and intellectual depth. Every generated script sounds strictly like you.
              </p>
            </div>

            <div className="p-4 rounded-xl dark:bg-slate-800/60 dark:border-slate-700 bg-[#faf8f5] border border-[#e8dece] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="dark:text-slate-200 text-[#1c1611] font-semibold flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  Voice Archetype Calibration
                </span>
                <span className="dark:text-slate-200 text-[#1c1611] font-bold dark:bg-slate-700 bg-white px-2.5 py-0.5 rounded-full border dark:border-slate-600 border-[#e8dece] text-[11px]">
                  {toneValue < 40 ? "Casual Storyteller" : toneValue < 75 ? "Direct Pragmatist" : "High Authority Expert"}
                </span>
              </div>
              <input
                type="range" min="0" max="100" value={toneValue}
                onChange={(e) => setToneValue(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer h-1.5 dark:bg-slate-700 bg-[#e8dece] rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[11px] dark:text-slate-400 text-[#9c836a] font-medium">
                <span>Conversational</span>
                <span>Structured</span>
                <span>Rigorous Thesis</span>
              </div>
            </div>
          </div>
        </Card3DTilt>
      </div>

      {/* Card 2: Hook Optimizer — 5 cols */}
      <div className="lg:col-span-5">
        <Card3DTilt intensity={5} glareOpacity={0.04} className="h-full">
          <div className="h-full rounded-2xl border dark:border-slate-800 border-[#e8dece] dark:bg-slate-900 bg-white p-7 md:p-8 flex flex-col justify-between card-hover overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl dark:bg-slate-800 dark:text-amber-400 bg-[#f0ebe2] flex items-center justify-center text-[#6b5744]">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-medium px-2.5 py-1 rounded-full dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 bg-[#f0ebe2] border border-[#e8dece] text-[#6b5744]">
                  Instant Retention
                </span>
              </div>

              <h3 className="text-xl font-bold dark:text-white text-[#1c1611] tracking-tight mb-2">
                AI Hook Optimizer
              </h3>
              <p className="dark:text-slate-400 text-[#6b5744] text-sm leading-relaxed mb-5">
                Generates high-stopping-power opening sentences tested against viral retention heuristics.
              </p>
            </div>

            <div className="space-y-2">
              {hookVariations.map((h, i) => {
                const isActive = activeHookIndex === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveHookIndex(i)}
                    className={`w-full p-3 text-left rounded-xl border transition-all ${
                      isActive
                        ? "dark:bg-amber-950/40 dark:border-amber-700/50 bg-[#2a1a08] border-[#5c3d22]/30 text-white"
                        : "dark:bg-slate-800/50 dark:border-slate-700/60 dark:hover:border-slate-600 bg-[#faf8f5] border-[#e8dece] hover:border-[#d4bea0] dark:text-slate-300 text-[#6b5744]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[11px] font-bold uppercase tracking-wide ${isActive ? "text-amber-300 dark:text-amber-300" : "dark:text-slate-400 text-[#9c836a]"}`}>
                        {h.type}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-emerald-900/60 text-emerald-400 border border-emerald-800/40"
                          : "dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 bg-[#f0ebe2] text-[#6b5744] border border-[#e8dece]"
                      }`}>
                        {h.score}% Retention
                      </span>
                    </div>
                    <div className={`text-xs font-medium line-clamp-2 ${isActive ? "text-amber-100 dark:text-amber-100" : "dark:text-slate-200 text-[#1c1611]"}`}>
                      &quot;{h.text}&quot;
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </Card3DTilt>
      </div>

      {/* Card 3: Visual Blueprints — 4 cols */}
      <div className="lg:col-span-4">
        <Card3DTilt intensity={5} glareOpacity={0.04} className="h-full">
          <div className="h-full rounded-2xl border dark:border-slate-800 border-[#e8dece] dark:bg-slate-900 bg-white p-6 flex flex-col justify-between card-hover overflow-hidden">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white mb-5 shadow-sm">
                <Film className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold dark:text-white text-[#1c1611] tracking-tight mb-2">Visual Blueprints</h3>
              <p className="dark:text-slate-400 text-[#6b5744] text-xs leading-relaxed mb-5">
                Transforms your script into a shot-by-shot shooting list with camera angles and B-roll cues.
              </p>
            </div>

            <div className="divide-y dark:divide-slate-800 divide-[#f0ebe2] rounded-xl border dark:border-slate-800 border-[#e8dece] dark:bg-slate-800/60 bg-[#faf8f5] overflow-hidden">
              {[
                { time: "0:00 – 0:05", type: "A-Roll Close-up",  color: "dark:text-amber-400 text-[#7c5533]" },
                { time: "0:05 – 0:22", type: "B-Roll Cutaway",   color: "dark:text-slate-300 text-[#6b5744]" },
                { time: "0:22 – 0:50", type: "Screen Graphic",   color: "text-emerald-500" },
              ].map((row) => (
                <div key={row.time} className="flex items-center justify-between px-3.5 py-2.5 text-xs">
                  <span className="dark:text-slate-400 text-[#9c836a] font-medium">{row.time}</span>
                  <span className={`font-semibold ${row.color}`}>{row.type}</span>
                </div>
              ))}
            </div>
          </div>
        </Card3DTilt>
      </div>

      {/* Card 4: Smart Teleprompter — 4 cols */}
      <div className="lg:col-span-4">
        <Card3DTilt intensity={5} glareOpacity={0.04} className="h-full">
          <div className="h-full rounded-2xl border dark:border-slate-800 border-[#e8dece] dark:bg-slate-900 bg-white p-6 flex flex-col justify-between card-hover overflow-hidden">
            <div>
              <div className="w-10 h-10 rounded-xl dark:bg-slate-800 dark:text-amber-400 bg-[#f0ebe2] flex items-center justify-center text-[#6b5744] mb-5">
                <Gauge className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold dark:text-white text-[#1c1611] tracking-tight mb-2">Smart Teleprompter</h3>
              <p className="dark:text-slate-400 text-[#6b5744] text-xs leading-relaxed mb-5">
                Real-time speech pacing tracker with adjustable cadence markers so you never stutter or rush through key ideas.
              </p>
            </div>

            <div className="p-4 rounded-xl dark:bg-slate-800/60 dark:border-slate-700 bg-[#faf8f5] border border-[#e8dece] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs dark:text-slate-400 text-[#6b5744] font-medium">Current Pacing</span>
                <span className="text-xs font-bold dark:text-slate-200 text-[#1c1611] dark:bg-slate-700 bg-white px-2 py-0.5 rounded-full border dark:border-slate-600 border-[#e8dece]">150 WPM · Optimal</span>
              </div>
              <div className="w-full dark:bg-slate-700 bg-[#e8dece] h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-full w-[85%] rounded-full" />
              </div>
              <div className="flex items-center justify-between text-[11px] dark:text-slate-400 text-[#9c836a]">
                <span>Natural pauses</span>
                <span>Breath marks tagged</span>
              </div>
            </div>
          </div>
        </Card3DTilt>
      </div>

      {/* Card 5: Production Pipeline — 4 cols */}
      <div className="lg:col-span-4">
        <Card3DTilt intensity={5} glareOpacity={0.04} className="h-full">
          <div className="h-full rounded-2xl border dark:border-slate-800 border-[#e8dece] dark:bg-slate-900 bg-white p-6 flex flex-col justify-between card-hover overflow-hidden">
            <div>
              <div className="w-10 h-10 rounded-xl dark:bg-slate-800 dark:text-amber-400 bg-[#f0ebe2] flex items-center justify-center text-[#6b5744] mb-5">
                <CalendarDays className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold dark:text-white text-[#1c1611] tracking-tight mb-2">Production Pipeline</h3>
              <p className="dark:text-slate-400 text-[#6b5744] text-xs leading-relaxed mb-5">
                Drag, drop, and publish. Connects directly to your content calendar so consistency is completely automated.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2 p-3 rounded-xl dark:bg-slate-800/60 dark:border-slate-700 bg-[#faf8f5] border border-[#e8dece]">
              {["Mon", "Tue", "Wed", "Thu"].map((d, i) => (
                <div key={d} className="p-2 rounded-lg dark:bg-slate-900 dark:border-slate-700 bg-white border border-[#e8dece] text-center shadow-sm">
                  <div className="text-[11px] dark:text-slate-400 text-[#9c836a] font-semibold mb-1.5">{d}</div>
                  <div className={`w-1.5 h-1.5 rounded-full mx-auto ${i % 2 === 0 ? "bg-emerald-500" : "bg-amber-600"}`} />
                </div>
              ))}
            </div>
          </div>
        </Card3DTilt>
      </div>

    </div>
  );
}
