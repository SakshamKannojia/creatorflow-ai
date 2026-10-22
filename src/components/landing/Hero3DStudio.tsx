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
  FileText,
} from "lucide-react";
import Card3DTilt from "./Card3DTilt";

export default function Hero3DStudio() {
  const [activeTab, setActiveTab] = useState<"script" | "blueprint">("script");
  const [activeFormat, setActiveFormat] = useState<"reels" | "linkedin" | "thread">("reels");
  const [hookTension, setHookTension] = useState(94);
  const [toneAssertiveness, setToneAssertiveness] = useState(88);

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-10 lg:mt-14 px-4 select-none">
      <Card3DTilt intensity={4} glareOpacity={0.04} scale={1.005} className="w-full">

        <div className="relative rounded-2xl border border-[#e8dece] bg-white shadow-[0_20px_60px_-20px_rgba(92,61,34,0.10)] overflow-hidden">

          {/* TITLEBAR */}
          <div className="h-12 border-b border-[#f0ebe2] bg-[#faf8f5] px-4 sm:px-5 flex items-center justify-between">

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 pr-3 border-r border-[#e8dece]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e8dece]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#d8cdb8]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#c4b49a]" />
              </div>
              <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-[#e8dece] text-xs text-[#6b5744] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[#1c1611] font-semibold">Studio Engine</span>
                <span className="text-[#9c836a] font-mono text-[10px]">v2.4</span>
              </div>
            </div>

            {/* Mode tabs */}
            <div className="flex items-center gap-0.5 bg-[#f0ebe2] p-0.5 rounded-lg">
              {(
                [
                  { id: "script", label: "Script Blueprint" },
                  { id: "blueprint", label: "Visual Director" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-white text-[#1c1611] shadow-sm"
                      : "text-[#6b5744] hover:text-[#1c1611]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2.5 text-xs text-[#9c836a]">
              <span className="px-2.5 py-1 rounded-full bg-[#f5f0e8] border border-[#d8cdb8] text-[#6b4226] text-[11px] font-medium">
                Gemini 1.5 Pro · Content DNA
              </span>
              <span className="text-emerald-600 font-medium flex items-center gap-1 text-[11px]">
                <Radio className="w-3 h-3 animate-pulse" /> Live
              </span>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">

            {/* LEFT: Script / Blueprint */}
            <div className="lg:col-span-7 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-[#f0ebe2] bg-white flex flex-col justify-between space-y-5">

              {activeTab === "script" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9c836a] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#7c5533]" />
                      High-Retention Script Blueprint
                    </span>
                    <span className="text-[11px] bg-[#f0ebe2] border border-[#e8dece] text-[#6b5744] px-2 py-0.5 rounded-full font-medium">
                      3-Part Structure
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {/* Hook — warm dark card */}
                    <div className="p-4 rounded-xl border border-[#5c3d22]/20 bg-[#2a1a08] shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-[#c4a882] uppercase tracking-wide">
                          Hook Strike (First 3 Seconds)
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-400 font-medium border border-emerald-800/40">
                          98% Retention Prob.
                        </span>
                      </div>
                      <p className="text-sm text-[#faf0e0] font-medium leading-relaxed">
                        &quot;Stop writing video scripts like essays. Here is why the top 0.1% creators structure their first 3 seconds backwards.&quot;
                      </p>
                      <div className="text-[11px] text-[#9c836a] mt-2">
                        Directive: Snap cut to lens · Direct eye contact
                      </div>
                    </div>

                    {/* Tension */}
                    <div className="p-4 rounded-xl border border-[#e8dece] bg-[#faf8f5] hover:bg-[#f5f0e8] transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-[#6b5744] uppercase tracking-wide">
                          Tension &amp; Value Injection
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#f5f0e8] text-[#6b4226] font-medium border border-[#d8cdb8]">
                          Value Compounding
                        </span>
                      </div>
                      <p className="text-sm text-[#1c1611] leading-relaxed">
                        &quot;Most writers state the problem. High-retention directors reveal the cost of inaction before introducing the solution framework.&quot;
                      </p>
                      <div className="text-[11px] text-[#9c836a] mt-2">
                        Directive: Macro screen cut · High contrast typography
                      </div>
                    </div>

                    {/* Payoff */}
                    <div className="p-4 rounded-xl border border-[#e8dece] bg-[#faf8f5] hover:bg-[#f5f0e8] transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-[#6b5744] uppercase tracking-wide">
                          Closing Payoff &amp; Loop
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#f0ebe2] text-[#6b5744] font-medium border border-[#e8dece]">
                          Loop Ready
                        </span>
                      </div>
                      <p className="text-sm text-[#1c1611] leading-relaxed">
                        &quot;Hit deploy once, and your script exports directly into your distribution calendar and production pipeline.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "blueprint" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9c836a] flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5 text-[#7c5533]" />
                      Shot List &amp; Visual Directives
                    </span>
                    <span className="text-xs font-medium text-[#9c836a]">3 Planned Cuts</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { num: "01", label: "Hook",   title: "Talking Head Lock",    desc: "50mm f/1.4 lens, eye-level, bright studio key light.", note: "Fast push-in",  color: "text-[#7c5533]" },
                      { num: "02", label: "Value",  title: "Macro Console",        desc: "85mm Macro, shallow depth, smooth screen movement.", note: "B-Roll Cut",     color: "text-[#6b5744]" },
                      { num: "03", label: "Payoff", title: "Kinetic Typography",   desc: "Clean geometric layout, seamless match cut back to Shot 1.", note: "Loop Graphic", color: "text-emerald-700" },
                    ].map((s) => (
                      <div key={s.num} className="p-3.5 rounded-xl bg-[#faf8f5] border border-[#e8dece] space-y-1">
                        <div className="text-[10px] font-semibold text-[#9c836a] uppercase tracking-wider">Shot #{s.num} · {s.label}</div>
                        <div className="text-xs font-bold text-[#1c1611]">{s.title}</div>
                        <div className="text-[11px] text-[#6b5744]">{s.desc}</div>
                        <div className={`text-[10px] font-semibold ${s.color}`}>{s.note}</div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e8dece] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#1c1611] font-semibold">Visual Ratio Balance</span>
                      <span className="text-emerald-700 font-semibold">Optimized for Retention</span>
                    </div>
                    <div className="w-full bg-[#e8dece] h-1.5 rounded-full overflow-hidden flex">
                      <div className="bg-[#7c5533] h-full w-[25%]" />
                      <div className="bg-[#6b5744] h-full w-[45%]" />
                      <div className="bg-[#c4b49a] h-full w-[30%]" />
                    </div>
                    <div className="flex justify-between text-[11px] text-[#9c836a] font-medium">
                      <span>A-Roll (25%)</span>
                      <span>B-Roll (45%)</span>
                      <span>Motion (30%)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Status bar */}
              <div className="pt-3 border-t border-[#f0ebe2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-[#9c836a]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Calibrated to Content DNA tone &amp; rules</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-[#6b5744]">
                  <span className="font-bold text-[#1c1611]">68 Words</span>
                  <span className="text-[#d4bea0]">·</span>
                  <span className="font-semibold text-[#7c5533]">30s Short-Form</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Controls */}
            <div className="lg:col-span-5 p-5 sm:p-6 bg-[#faf8f5] flex flex-col justify-between space-y-5">

              {/* Format preview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9c836a] flex items-center gap-1.5">
                    <Wand2 className="w-3.5 h-3.5 text-[#7c5533]" />
                    Multi-Format Preview
                  </span>
                  <div className="flex items-center gap-0.5 bg-white p-0.5 rounded-lg border border-[#e8dece] shadow-sm">
                    {(["reels", "linkedin", "thread"] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setActiveFormat(f)}
                        className={`px-2 py-1 text-[11px] font-medium rounded-md transition-all ${
                          activeFormat === f
                            ? "bg-[#7c5533] text-white shadow-xs"
                            : "text-[#6b5744] hover:text-[#1c1611]"
                        }`}
                      >
                        {f === "reels" ? "Reels" : f === "linkedin" ? "LinkedIn" : "Thread"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative aspect-video rounded-xl bg-white border border-[#e8dece] overflow-hidden flex items-center justify-center p-4">
                  <div className="absolute top-2.5 left-3 text-[10px] font-medium text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> AI Optimized
                  </div>
                  <div className="absolute top-2.5 right-3 text-[10px] font-medium text-[#4a2e10] bg-[#f5f0e8] px-2 py-0.5 rounded-full border border-[#d8cdb8]">
                    Virality 98.4%
                  </div>

                  <div className="text-center w-full z-10 px-2 pt-2">
                    {activeFormat === "reels" && (
                      <div className="space-y-1.5">
                        <div className="w-10 h-10 mx-auto rounded-xl bg-[#7c5533] flex items-center justify-center text-white">
                          <Video className="w-5 h-5" />
                        </div>
                        <div className="text-xs font-bold text-[#1c1611]">9:16 Short-Form Reel</div>
                        <div className="text-[11px] text-[#9c836a] line-clamp-1">&quot;Stop writing video scripts like essays...&quot;</div>
                      </div>
                    )}
                    {activeFormat === "linkedin" && (
                      <div className="space-y-1.5">
                        <div className="w-10 h-10 mx-auto rounded-xl bg-[#f0ebe2] flex items-center justify-center text-[#6b5744]">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="text-xs font-bold text-[#1c1611]">Structured Thought Leadership</div>
                        <div className="text-[11px] text-[#9c836a] line-clamp-1">3 Framework takeaways · 5 carousel slides</div>
                      </div>
                    )}
                    {activeFormat === "thread" && (
                      <div className="space-y-1.5">
                        <div className="w-10 h-10 mx-auto rounded-xl bg-[#f5f0e8] flex items-center justify-center text-[#7c5533]">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div className="text-xs font-bold text-[#1c1611]">5-Post Viral Thread Blueprint</div>
                        <div className="text-[11px] text-[#9c836a] line-clamp-1">Pattern interrupt hook · High repost ratio</div>
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] text-[#9c836a]">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Retention Calibrated
                    </span>
                    <span>DNA Match: 100%</span>
                  </div>
                </div>
              </div>

              {/* Sliders */}
              <div className="p-4 rounded-xl bg-white border border-[#e8dece] space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1c1611] flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#7c5533]" />
                    AI Tuning Matrix
                  </span>
                  <span className="text-[10px] text-[#4a2e10] bg-[#f5f0e8] px-2 py-0.5 rounded-full font-medium border border-[#d8cdb8]">
                    Live Calibration
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-medium">
                    <span className="text-[#6b5744]">Tone Assertiveness</span>
                    <span className="text-[#1c1611] font-bold">{toneAssertiveness}%</span>
                  </div>
                  <input
                    type="range" min="50" max="100" value={toneAssertiveness}
                    onChange={(e) => setToneAssertiveness(Number(e.target.value))}
                    className="w-full h-1 bg-[#e8dece] rounded-lg appearance-none cursor-pointer accent-[#7c5533]"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-medium">
                    <span className="text-[#6b5744]">Hook Tension Index</span>
                    <span className="text-[#1c1611] font-bold">{hookTension}% / 100</span>
                  </div>
                  <input
                    type="range" min="50" max="100" value={hookTension}
                    onChange={(e) => setHookTension(Number(e.target.value))}
                    className="w-full h-1 bg-[#e8dece] rounded-lg appearance-none cursor-pointer accent-[#7c5533]"
                  />
                </div>

                <div className="pt-1 border-t border-[#f0ebe2]">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { p: "Reels / Shorts", f: "9:16 Video" },
                      { p: "LinkedIn", f: "Carousel" },
                      { p: "X (Twitter)", f: "Thread" },
                    ].map((item) => (
                      <div key={item.p} className="p-2 rounded-lg bg-[#faf8f5] border border-[#e8dece] text-center">
                        <div className="text-[10px] text-[#9c836a] font-medium">{item.p}</div>
                        <div className="text-[11px] font-bold text-[#1c1611] mt-0.5">{item.f}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <a
                href="/signup"
                className="w-full py-2.5 px-4 rounded-xl bg-[#7c5533] hover:bg-[#5c3d22] text-white font-semibold text-xs tracking-wide flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                Launch AI Script Workspace
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </Card3DTilt>
    </div>
  );
}
