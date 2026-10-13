"use client";

import React, { useState } from "react";
import { 
  Video, 
  Sparkles,
  Film,
  CheckCircle2,
  ChevronRight,
  Radio,
  SlidersHorizontal,
  Wand2,
  FileText
} from "lucide-react";
import Card3DTilt from "./Card3DTilt";

export default function Hero3DStudio() {
  const [activeTab, setActiveTab] = useState<"script" | "blueprint">("script");
  const [activeFormat, setActiveFormat] = useState<"reels" | "linkedin" | "thread">("reels");
  const [hookTension, setHookTension] = useState(94);
  const [toneAssertiveness, setToneAssertiveness] = useState(88);

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-10 lg:mt-14 px-4 select-none">
      <Card3DTilt intensity={6} glareOpacity={0.08} scale={1.01} className="w-full">
        
        {/* CHASSIS CONTAINER — MODERN MINIMAL LIGHT */}
        <div className="relative rounded-2xl border border-slate-200/90 bg-white shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08),0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden transition-all">
          
          {/* STUDIO WINDOW TITLEBAR */}
          <div className="h-14 border-b border-slate-100 bg-slate-50/70 px-4 sm:px-6 flex items-center justify-between">
            
            {/* Left: Window Dots & Status */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 pr-3 border-r border-slate-200">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>

              {/* Status Pill */}
              <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-md border border-slate-200/80 text-xs text-slate-600 font-medium shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-800 font-semibold">Studio Engine</span>
                <span className="text-slate-400 font-mono text-[11px]">v2.4</span>
              </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-1 bg-slate-200/60 p-1 rounded-xl">
              {(
                [
                  { id: "script", label: "Script Blueprint" },
                  { id: "blueprint", label: "Visual Director" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-tight transition-all ${
                    activeTab === tab.id
                      ? "bg-white text-slate-900 shadow-xs font-semibold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Right: Technical Spec Indicator */}
            <div className="hidden md:flex items-center gap-3 text-xs text-slate-500 font-medium">
              <span className="px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 text-[11px] font-semibold">
                Gemini 1.5 Pro • Content DNA
              </span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1 text-[11px]">
                <Radio className="w-3 h-3 animate-pulse" /> Live
              </span>
            </div>
          </div>

          {/* MAIN CONSOLE INTERIOR GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px]">
            
            {/* LEFT 7 COLS: SCRIPT & VISUAL BLUEPRINT */}
            <div className="lg:col-span-7 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-100 bg-white flex flex-col justify-between space-y-6">
              
              {/* TAB 1: SCRIPT CONSOLE */}
              {activeTab === "script" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> High-Retention Script Blueprint
                    </span>
                    <span className="text-[11px] bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-medium">
                      3-Part Structure
                    </span>
                  </div>

                  {/* Clean Script Blocks */}
                  <div className="space-y-3 font-sans">
                    {/* Beat 1: Hook */}
                    <div className="p-4 rounded-xl border border-indigo-200/80 bg-indigo-50/50 shadow-xs">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wide">
                          Hook Strike (First 3 Seconds)
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                          98% Retention Prob.
                        </span>
                      </div>
                      <p className="text-sm text-slate-900 font-semibold leading-relaxed">
                        &quot;Stop writing video scripts like essays. Here is why the top 0.1% creators structure their first 3 seconds backwards.&quot;
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-500">
                        <span className="text-indigo-600 font-medium">Directive: Snap cut to lens • Direct eye contact</span>
                      </div>
                    </div>

                    {/* Beat 2: Core Narrative & Tension */}
                    <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                          Tension & Value Injection
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-semibold">
                          Value Compounding
                        </span>
                      </div>
                      <p className="text-sm text-slate-800 leading-relaxed font-normal">
                        &quot;Most writers state the problem. High-retention directors reveal the cost of inaction before introducing the solution framework.&quot;
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-500">
                        <span className="text-sky-600 font-medium">Directive: Macro screen cut • High contrast typography</span>
                      </div>
                    </div>

                    {/* Beat 3: Retention Loop & Payoff */}
                    <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                          Closing Payoff & Loop
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-semibold">
                          Loop Ready
                        </span>
                      </div>
                      <p className="text-sm text-slate-800 leading-relaxed font-normal">
                        &quot;Hit deploy once, and your script exports directly into your distribution calendar and production pipeline.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: VISUAL DIRECTOR BLUEPRINT */}
              {activeTab === "blueprint" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5 text-indigo-600" /> Shot List & Visual Directives
                    </span>
                    <span className="text-xs font-medium text-slate-500">3 Planned Cuts</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Shot #01 • Hook</div>
                      <div className="text-xs font-bold text-slate-900">Talking Head Lock</div>
                      <div className="text-[11px] text-slate-600">50mm f/1.4 lens, eye-level, bright studio key light.</div>
                      <div className="text-[10px] font-semibold text-indigo-600">Fast push-in</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Shot #02 • Value</div>
                      <div className="text-xs font-bold text-slate-900">Macro Console</div>
                      <div className="text-[11px] text-slate-600">85mm Macro, shallow depth, smooth screen movement.</div>
                      <div className="text-[10px] font-semibold text-sky-600">B-Roll Cut</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Shot #03 • Payoff</div>
                      <div className="text-xs font-bold text-slate-900">Kinetic Typography</div>
                      <div className="text-[11px] text-slate-600">Clean geometric layout, seamless match cut back to Shot 1.</div>
                      <div className="text-[10px] font-semibold text-purple-600">Loop Graphic</div>
                    </div>
                  </div>

                  {/* Visual Production Matrix */}
                  <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-700 font-semibold">Visual Ratio Balance</span>
                      <span className="text-emerald-700 font-semibold">Optimized for Retention</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                      <div className="bg-indigo-500 h-full w-[25%]" title="Talking Head" />
                      <div className="bg-sky-400 h-full w-[45%]" title="Product B-Roll" />
                      <div className="bg-purple-500 h-full w-[30%]" title="Kinetic Graphic" />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                      <span>A-Roll (25%)</span>
                      <span>B-Roll Visuals (45%)</span>
                      <span>Motion Loops (30%)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* GENERATION STATUS TOOLBAR */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Calibrated to Content DNA tone &amp; rules</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-600">
                  <span className="font-semibold text-slate-900">68 Words</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-indigo-600 font-semibold">30s Short-Form Format</span>
                </div>
              </div>
            </div>

            {/* RIGHT 5 COLS: CONTROLS & FORMAT MONITOR */}
            <div className="lg:col-span-5 p-5 sm:p-6 bg-slate-50/60 flex flex-col justify-between space-y-5">
              
              {/* FORMAT MONITOR SCREEN */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Wand2 className="w-3.5 h-3.5 text-indigo-600" /> Multi-Format Preview
                  </span>
                  
                  {/* Format Selector */}
                  <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 shadow-xs">
                    <button
                      onClick={() => setActiveFormat("reels")}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                        activeFormat === "reels" ? "bg-slate-900 text-white font-semibold shadow-xs" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Reels
                    </button>
                    <button
                      onClick={() => setActiveFormat("linkedin")}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                        activeFormat === "linkedin" ? "bg-slate-900 text-white font-semibold shadow-xs" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      LinkedIn
                    </button>
                    <button
                      onClick={() => setActiveFormat("thread")}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                        activeFormat === "thread" ? "bg-slate-900 text-white font-semibold shadow-xs" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Thread
                    </button>
                  </div>
                </div>

                {/* Simulated Content Viewport */}
                <div className="relative aspect-video rounded-xl bg-white border border-slate-200/90 overflow-hidden shadow-xs flex items-center justify-center p-4">
                  <div className="absolute top-2.5 left-3 text-[10px] font-semibold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> AI Optimized
                  </div>
                  <div className="absolute top-2.5 right-3 text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200/60">
                    Virality 98.4%
                  </div>

                  {/* Center Content based on selected format */}
                  <div className="text-center w-full z-10 px-2 pt-2">
                    {activeFormat === "reels" && (
                      <div className="space-y-1.5">
                        <div className="w-10 h-10 mx-auto rounded-xl bg-indigo-50 border border-indigo-150 flex items-center justify-center text-indigo-600 shadow-xs">
                          <Video className="w-5 h-5" />
                        </div>
                        <div className="text-xs font-bold text-slate-900 tracking-tight">9:16 Short-Form Reel</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">&quot;Stop writing video scripts like essays...&quot;</div>
                      </div>
                    )}
                    {activeFormat === "linkedin" && (
                      <div className="space-y-1.5">
                        <div className="w-10 h-10 mx-auto rounded-xl bg-sky-50 border border-sky-150 flex items-center justify-center text-sky-600 shadow-xs">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="text-xs font-bold text-slate-900 tracking-tight">Structured Thought Leadership</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">3 Framework takeaways • 5 carousel slides</div>
                      </div>
                    )}
                    {activeFormat === "thread" && (
                      <div className="space-y-1.5">
                        <div className="w-10 h-10 mx-auto rounded-xl bg-purple-50 border border-purple-150 flex items-center justify-center text-purple-600 shadow-xs">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div className="text-xs font-bold text-slate-900 tracking-tight">5-Post Viral Thread Blueprint</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">Pattern interrupt hook • High repost ratio</div>
                      </div>
                    )}
                  </div>

                  {/* Viewport Bottom Spec Line */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Retention Calibrated
                    </span>
                    <span className="text-slate-500 font-medium">DNA Match: 100%</span>
                  </div>
                </div>
              </div>

              {/* TACTILE ADJUSTMENT SLIDERS */}
              <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-3.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" />
                    AI Tuning Matrix
                  </span>
                  <span className="text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full font-semibold">
                    Live Calibration
                  </span>
                </div>

                {/* Tone Assertiveness Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-medium">
                    <span className="text-slate-600">Tone Assertiveness</span>
                    <span className="text-slate-900 font-bold">{toneAssertiveness}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={toneAssertiveness}
                    onChange={(e) => setToneAssertiveness(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                {/* Hook Aggressiveness Tension Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-medium">
                    <span className="text-slate-600">Hook Tension Index</span>
                    <span className="text-slate-900 font-bold">{hookTension}% / 100</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={hookTension}
                    onChange={(e) => setHookTension(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                {/* Multi-Platform Engine Grid */}
                <div className="pt-1">
                  <div className="flex justify-between text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1.5">
                    <span>Export Distribution</span>
                    <span className="text-indigo-600">Active</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/70 text-center">
                      <div className="text-[10px] text-slate-500 font-medium">Reels / Shorts</div>
                      <div className="text-[11px] font-bold text-slate-900 mt-0.5">9:16 Video</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/70 text-center">
                      <div className="text-[10px] text-slate-500 font-medium">LinkedIn</div>
                      <div className="text-[11px] font-bold text-slate-900 mt-0.5">Carousel</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/70 text-center">
                      <div className="text-[10px] text-slate-500 font-medium">X (Twitter)</div>
                      <div className="text-[11px] font-bold text-slate-900 mt-0.5">Thread</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* QUICK ONE-CLICK ACTION BUTTON */}
              <a
                href="/signup"
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wide flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.98]"
              >
                <span>Launch AI Script Workspace</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </Card3DTilt>
    </div>
  );
}
