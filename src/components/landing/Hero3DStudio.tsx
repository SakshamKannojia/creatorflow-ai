"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Terminal, 
  Play, 
  Layers, 
  Activity, 
  TrendingUp, 
  CheckCircle2, 
  Share2, 
  Mic, 
  Sliders, 
  Eye, 
  Flame, 
  ShieldCheck,
  Video,
  ChevronRight
} from "lucide-react";
import Card3DTilt from "./Card3DTilt";

export default function Hero3DStudio() {
  const [activeTab, setActiveTab] = useState<"script" | "blueprint" | "teleprompter">("script");
  const [audioBars, setAudioBars] = useState<number[]>([40, 65, 30, 85, 95, 55, 75, 45, 90, 60, 35, 80, 50, 70, 95, 40]);

  // Subtle pulsing animation on audio waveform
  useEffect(() => {
    const interval = setInterval(() => {
      setAudioBars((prev) =>
        prev.map((val) => Math.max(20, Math.min(100, val + (Math.random() * 30 - 15))))
      );
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-12 lg:mt-16 px-4">
      <Card3DTilt intensity={10} glareOpacity={0.15} scale={1.01} className="w-full">
        {/* Main 3D Container Console */}
        <div className="relative rounded-2xl border border-indigo-500/30 bg-[#080d1a]/95 backdrop-blur-2xl shadow-[0_25px_80px_-15px_rgba(79,70,229,0.35)] overflow-hidden">
          
          {/* Top Window Header */}
          <div className="h-13 border-b border-indigo-900/40 bg-[#060a14] px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-400/40" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400/40" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/40" />
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400 ml-4 px-3 py-1 rounded-md bg-slate-900/80 border border-indigo-950">
                <span className="text-indigo-400 font-semibold">creatorflow.engine</span>
                <span className="text-slate-600">/</span>
                <span>session_live.dna</span>
              </div>
            </div>

            {/* Top Workspace Mode Switcher */}
            <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-indigo-950">
              <button
                onClick={() => setActiveTab("script")}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  activeTab === "script"
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Script Studio
              </button>
              <button
                onClick={() => setActiveTab("blueprint")}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  activeTab === "blueprint"
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Visual Blueprint
              </button>
              <button
                onClick={() => setActiveTab("teleprompter")}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  activeTab === "teleprompter"
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Teleprompter Pro
              </button>
            </div>

            {/* Quick Live indicator */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="hidden md:inline text-[11px] font-mono text-emerald-400">99.8% Sync</span>
            </div>
          </div>

          {/* Internal Workspace Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
            
            {/* Left Rail: Script Pipeline & Meta */}
            <div className="md:col-span-4 border-r border-indigo-900/30 p-5 bg-[#070b16] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Content Intelligence
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono">
                    GPT-4.5 + Gemini
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-indigo-950 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-medium">Predicted Retention</span>
                    <span className="text-xs font-bold text-emerald-400">92.4% Avg</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 h-full w-[92%]" />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Hook (0-5s): 98%</span>
                    <span>Drop-off: &lt; 4%</span>
                  </div>
                </div>

                {/* Speech Cadence & Audio Spectrum */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-indigo-950 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5 text-indigo-400" />
                      Dynamic Cadence Pacing
                    </span>
                    <span className="font-mono text-cyan-400 font-semibold">158 WPM</span>
                  </div>

                  {/* Audio Bars */}
                  <div className="h-10 flex items-end gap-1 pt-2">
                    {audioBars.map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-indigo-600 to-cyan-400 rounded-t transition-all duration-300"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Multi-Platform Channels */}
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                    Target Distribution
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {["YouTube Shorts", "Instagram Reels", "TikTok", "LinkedIn Video"].map((plat) => (
                      <span
                        key={plat}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-indigo-950/60 border border-indigo-900/40 text-slate-300"
                      >
                        {plat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status footer inside left rail */}
              <div className="pt-4 border-t border-indigo-950 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Render
                </span>
                <span className="font-mono text-slate-500">01:04 Length</span>
              </div>
            </div>

            {/* Right Main Stage: Content Editor / Blueprint / Teleprompter */}
            <div className="md:col-span-8 p-6 bg-[#080d1a] flex flex-col justify-between">
              {activeTab === "script" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-indigo-950">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                        Structured Master Script
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                        Validated
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">Target: 140-160 Words</span>
                  </div>

                  {/* Hook Block */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-500/30 hover:border-indigo-400/50 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-amber-400" />
                        Hook Segment (0:00 - 0:05)
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Pacing: 2.8 sec</span>
                    </div>
                    <p className="text-sm font-semibold text-white leading-relaxed">
                      "Stop filming without a visual blueprint. 92% of viewers click away within 4 seconds if your first cut is static."
                    </p>
                  </div>

                  {/* Core Body Block */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-indigo-900/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">
                        Body Argument & Demonstration (0:05 - 0:45)
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">68 Words</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      "When you pre-plan your A-Roll framing with an AI-directed shot checklist, editing takes 20 minutes instead of 4 hours. You never record redundant takes, and every single second serves a metric."
                    </p>
                  </div>

                  {/* Climax & Conversion */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-indigo-900/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">
                        Call to Action / Loop Climax (0:45 - 1:00)
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">High Conversion</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      "Bookmark this framework right now, and deploy CreatorFlow to turn your raw ideas into high-retention production schedules."
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "blueprint" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-indigo-950">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                      Camera Director & B-Roll Checklist
                    </span>
                    <span className="text-xs text-slate-400">3 Shots Planned</span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-indigo-900/40 flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400">
                        <Video className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white uppercase">A-Roll Main</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400">
                            Done
                          </span>
                        </div>
                        <p className="text-xs text-slate-300">
                          Direct to lens, medium chest-up shot. High contrast key lighting with slight blue rim light.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-indigo-900/40 flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-cyan-600/20 text-cyan-400">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white uppercase">B-Roll Cutaway</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300">
                            In Queue
                          </span>
                        </div>
                        <p className="text-xs text-slate-300">
                          Over-the-shoulder POV typing on mechanical keyboard, showing timeline snapping into place.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-indigo-900/40 flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white uppercase">Motion Graphics</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300">
                            Automated
                          </span>
                        </div>
                        <p className="text-xs text-slate-300">
                          Kinetic text: "92% Drop-off Rate" in bold sans-serif with red hazard glow.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "teleprompter" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-indigo-950">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                      Studio Teleprompter Display
                    </span>
                    <span className="text-xs font-mono text-emerald-400 animate-pulse">● RECORDING READY</span>
                  </div>

                  <div className="p-6 rounded-xl bg-[#04060c] border border-indigo-950 text-center space-y-4">
                    <div className="text-[11px] font-mono text-indigo-400 tracking-widest uppercase">
                      Current Line (Auto-Scroll)
                    </div>
                    <div className="text-lg md:text-xl font-bold text-white leading-relaxed max-w-xl mx-auto">
                      "When you pre-plan your A-Roll framing with an AI-directed shot checklist, editing takes 20 minutes instead of 4 hours."
                    </div>
                    <div className="flex justify-center items-center gap-4 pt-3">
                      <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 flex items-center gap-2">
                        <Play className="w-3.5 h-3.5 fill-current" /> Start Prompter
                      </button>
                      <span className="text-xs text-slate-500 font-mono">Speed: 1.2x • Mirror Mode</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Toolbar */}
              <div className="pt-6 border-t border-indigo-950 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Content DNA rules enforced</span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href="/generate"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    Open Live Generator <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card3DTilt>

      {/* 3D Floating Holographic Overlays */}
      <div className="hidden lg:block">
        {/* Floating Badge Left */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-6 -left-6 z-20 p-3.5 rounded-xl bg-slate-900/90 border border-indigo-500/40 shadow-xl shadow-indigo-950/60 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">AI Script Matrix</div>
              <div className="text-[11px] text-emerald-400 font-medium">99.4% Virality Match</div>
            </div>
          </div>
        </motion.div>

        {/* Floating Badge Right */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -bottom-6 -right-6 z-20 p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 shadow-xl shadow-cyan-950/60 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Multi-Platform Ready</div>
              <div className="text-[11px] text-slate-400">Auto-formatted for 4 feeds</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
