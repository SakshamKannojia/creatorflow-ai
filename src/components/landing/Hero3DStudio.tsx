"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause,
  Video, 
  Mic, 
  Volume2, 
  Sliders, 
  Maximize2, 
  Layers, 
  Clock, 
  Sparkles,
  Camera,
  Film,
  Activity,
  CheckCircle2,
  RefreshCw,
  Share2,
  ChevronRight,
  Disc,
  Radio,
  SlidersHorizontal
} from "lucide-react";
import Card3DTilt from "./Card3DTilt";

export default function Hero3DStudio() {
  const [activeTab, setActiveTab] = useState<"script" | "blueprint" | "teleprompter">("script");
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(8.4); // in seconds (0 to 30)
  const [activeAngle, setActiveAngle] = useState<"hook" | "macro" | "graphics">("hook");
  const [cadenceWpm, setCadenceWpm] = useState(165);
  const [hookTension, setHookTension] = useState(94);
  const [teleprompterSpeed, setTeleprompterSpeed] = useState(1.0);
  const [teleprompterScroll, setTeleprompterScroll] = useState(0);

  // Audio spectrum simulation
  const [audioLevels, setAudioLevels] = useState<number[]>([
    45, 68, 82, 95, 70, 58, 88, 92, 64, 40, 78, 86, 90, 72, 60, 84, 52, 96, 74, 62
  ]);

  // Scrub / Playhead loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + 0.1;
        return next > 30 ? 0 : next;
      });

      setAudioLevels((prev) =>
        prev.map((val) => Math.max(15, Math.min(100, val + (Math.random() * 24 - 12))))
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Auto-scrolling teleprompter when active
  useEffect(() => {
    if (activeTab !== "teleprompter" || !isPlaying) return;
    const interval = setInterval(() => {
      setTeleprompterScroll((prev) => (prev >= 260 ? 0 : prev + teleprompterSpeed * 0.8));
    }, 50);
    return () => clearInterval(interval);
  }, [activeTab, isPlaying, teleprompterSpeed]);

  // Format timecode (00:00:SS:FF)
  const formatTimecode = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    const frames = Math.floor((sec % 1) * 24);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
  };

  const timelinePercentage = (currentTime / 30) * 100;

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, clickX / rect.width));
    setCurrentTime(percent * 30);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-10 lg:mt-14 px-4 select-none">
      <Card3DTilt intensity={8} glareOpacity={0.18} scale={1.01} className="w-full">
        
        {/* PHYSICAL HARDWARE CHASSIS */}
        <div className="relative rounded-2xl border border-slate-700/60 bg-[#070b14]/98 shadow-[0_30px_90px_-20px_rgba(2,6,23,0.9),0_0_50px_-10px_rgba(99,102,241,0.25)] overflow-hidden transition-all backdrop-blur-2xl">
          
          {/* TOP CHASSIS BEZEL & MACHINED STATUS BAR */}
          <div className="h-14 border-b border-slate-800/80 bg-gradient-to-r from-[#090d1a] via-[#0d1326] to-[#090d1a] px-4 sm:px-6 flex items-center justify-between">
            
            {/* Left: Studio Deck Label & Power Indicator */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 pr-3 border-r border-slate-800">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-sm shadow-emerald-500" />
                </span>
                <span className="text-[11px] font-mono tracking-wider text-slate-300 font-bold uppercase">
                  MASTER DECK 01
                </span>
              </div>

              {/* Hardware Clock / Timecode */}
              <div className="flex items-center gap-2 bg-[#050811] px-3 py-1 rounded border border-slate-800/80 font-mono text-xs">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-white font-bold tracking-widest">{formatTimecode(currentTime)}</span>
                <span className="text-[10px] text-slate-500 font-sans">24.0 FPS</span>
              </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-1 bg-[#050811] p-1 rounded-lg border border-slate-800/80">
              {(
                [
                  { id: "script", label: "Script Console" },
                  { id: "blueprint", label: "Visual Director" },
                  { id: "teleprompter", label: "Teleprompter Deck" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold tracking-tight transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/40"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Right: Technical Spec Indicator */}
            <div className="hidden md:flex items-center gap-3 text-[11px] font-mono text-slate-400">
              <span className="px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 font-medium">
                4K UHD • 10-BIT
              </span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Radio className="w-3 h-3 animate-pulse" /> LIVE SYNC
              </span>
            </div>
          </div>

          {/* MAIN CONSOLE INTERIOR GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
            
            {/* LEFT 7 COLS: INTERACTIVE WORKSPACE SCREEN */}
            <div className="lg:col-span-7 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-800/80 bg-[#070b14] flex flex-col justify-between space-y-6">
              
              {/* TAB 1: SCRIPT CONSOLE */}
              {activeTab === "script" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-indigo-400" /> Script Cadence Stream
                      </span>
                      <span className="text-[10px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded font-mono text-cyan-400">
                        {currentTime < 5 ? "HOOK PHASE" : currentTime < 18 ? "NARRATIVE ENGINE" : "RETENTION LOOP"}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      Target Duration: <span className="text-white font-bold">00:30</span>
                    </span>
                  </div>

                  {/* Dynamic Script Block synced with current timecode */}
                  <div className="space-y-2.5 font-sans">
                    {/* Beat 1: Hook (0s - 5s) */}
                    <div
                      className={`p-3.5 rounded-xl border transition-all ${
                        currentTime < 5
                          ? "bg-indigo-950/40 border-indigo-500/60 shadow-lg shadow-indigo-950/40 translate-x-1"
                          : "bg-slate-900/40 border-slate-800/60 opacity-60"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-mono text-[11px] font-bold text-indigo-400">
                          [00:00 - 00:05] HOOK STRIKE
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-semibold">
                          98% RETENTION PROBABILITY
                        </span>
                      </div>
                      <p className="text-sm text-slate-100 font-medium leading-relaxed">
                        &quot;Stop writing video scripts like essays. Here is why the top 0.1% creators structure their first 3 seconds backwards.&quot;
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-400 font-mono">
                        <span>Pacing: 178 WPM</span>
                        <span className="text-indigo-300">Action: Hard snap cut to lens</span>
                      </div>
                    </div>

                    {/* Beat 2: Core Thesis (5s - 18s) */}
                    <div
                      className={`p-3.5 rounded-xl border transition-all ${
                        currentTime >= 5 && currentTime < 18
                          ? "bg-indigo-950/40 border-indigo-500/60 shadow-lg shadow-indigo-950/40 translate-x-1"
                          : "bg-slate-900/40 border-slate-800/60 opacity-60"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-mono text-[11px] font-bold text-cyan-400">
                          [00:05 - 00:18] VALUE MONOLITH
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono font-semibold">
                          SYNAPSE PACED
                        </span>
                      </div>
                      <p className="text-sm text-slate-100 font-medium leading-relaxed">
                        &quot;Most writers state the problem. High-retention directors show the cost of inaction. In CreatorFlow, we calibrate your Content DNA so every sentence strips filler.&quot;
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-400 font-mono">
                        <span>Pacing: 155 WPM</span>
                        <span className="text-cyan-300">Action: Kinetic macro product shot</span>
                      </div>
                    </div>

                    {/* Beat 3: Retention Loop & Payoff (18s - 30s) */}
                    <div
                      className={`p-3.5 rounded-xl border transition-all ${
                        currentTime >= 18
                          ? "bg-indigo-950/40 border-indigo-500/60 shadow-lg shadow-indigo-950/40 translate-x-1"
                          : "bg-slate-900/40 border-slate-800/60 opacity-60"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-mono text-[11px] font-bold text-purple-400">
                          [00:18 - 00:30] CLOSING PAYOFF & LOOP
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 font-mono font-semibold">
                          SEAMLESS LOOP READY
                        </span>
                      </div>
                      <p className="text-sm text-slate-100 font-medium leading-relaxed">
                        &quot;Hit deploy once, and your script exports directly into teleprompter and camera logs without a second thought.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: VISUAL DIRECTOR BLUEPRINT */}
              {activeTab === "blueprint" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5 text-cyan-400" /> Shot List & Optical Directives
                    </span>
                    <span className="text-xs font-mono text-cyan-400">3 Planned Cuts</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                      <div className="text-[10px] font-mono text-slate-400">SHOT #01 • 0-5s</div>
                      <div className="text-xs font-bold text-white">Talking Head Lock</div>
                      <div className="text-[11px] text-slate-300">50mm f/1.4 lens, eye-level, dark studio key light.</div>
                      <div className="text-[10px] font-mono text-indigo-400">Hook Lock • Fast push</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                      <div className="text-[10px] font-mono text-slate-400">SHOT #02 • 5-18s</div>
                      <div className="text-xs font-bold text-white">Macro Screen/Console</div>
                      <div className="text-[11px] text-slate-300">85mm Macro, shallow depth, glowing cyan rim highlights.</div>
                      <div className="text-[10px] font-mono text-cyan-400">B-Roll Cut • Slider track</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                      <div className="text-[10px] font-mono text-slate-400">SHOT #03 • 18-30s</div>
                      <div className="text-xs font-bold text-white">Dynamic Typographic</div>
                      <div className="text-[11px] text-slate-300">Clean geometric layout, seamless loop match cut back to Shot 1.</div>
                      <div className="text-[10px] font-mono text-purple-400">Loop Match • Graphic</div>
                    </div>
                  </div>

                  {/* Visual Production Matrix */}
                  <div className="p-4 rounded-xl bg-[#050811] border border-slate-800/80 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">B-Roll Density Ratio</span>
                      <span className="font-mono text-emerald-400 font-bold">1 Cut / 3.2 Seconds</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden flex">
                      <div className="bg-indigo-500 h-full w-[25%]" title="Talking Head" />
                      <div className="bg-cyan-400 h-full w-[45%]" title="Product B-Roll" />
                      <div className="bg-purple-500 h-full w-[30%]" title="Kinetic Graphic" />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>A-Roll (25%)</span>
                      <span>B-Roll Visuals (45%)</span>
                      <span>Motion Loops (30%)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: TELEPROMPTER DECK */}
              {activeTab === "teleprompter" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5 text-emerald-400" /> Active Teleprompter Stream
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">Speed:</span>
                      {[0.8, 1.0, 1.2, 1.5].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => setTeleprompterSpeed(spd)}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            teleprompterSpeed === spd
                              ? "bg-indigo-600 text-white font-bold"
                              : "bg-slate-900 text-slate-400 hover:text-white"
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Teleprompter Display Box */}
                  <div className="relative h-44 rounded-xl bg-[#04060c] border border-slate-800 overflow-hidden p-6 flex flex-col justify-center">
                    {/* Center Pacing Reading Guide Line */}
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-8 bg-indigo-500/10 border-y border-indigo-500/30 pointer-events-none flex items-center justify-between px-3">
                      <span className="text-[9px] font-mono text-indigo-400 tracking-wider">READ FOCUS</span>
                      <span className="text-[9px] font-mono text-indigo-400">▲</span>
                    </div>

                    <div
                      className="space-y-6 text-center transition-transform duration-75"
                      style={{ transform: `translateY(-${teleprompterScroll}px)` }}
                    >
                      <p className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-relaxed">
                        Stop writing video scripts like essays.
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-slate-200 tracking-tight leading-relaxed">
                        The top 0.1% creators structure their first 3 seconds backwards.
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-indigo-300 tracking-tight leading-relaxed">
                        Most writers state the problem. Directors show the cost of inaction.
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-slate-200 tracking-tight leading-relaxed">
                        Hit deploy once, and your script exports to teleprompter and camera logs.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* HARDWARE SCRUBBER & TIMELINE CONTROL */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all"
                      aria-label={isPlaying ? "Pause Timeline" : "Play Timeline"}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                    </button>
                    <span className="text-white font-semibold">{formatTimecode(currentTime)}</span>
                  </div>
                  <span>Total Sequence: 00:30:00</span>
                </div>

                {/* Interactive Scrubber Bar */}
                <div
                  onClick={handleTimelineClick}
                  className="relative h-6 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer overflow-hidden flex items-center group"
                >
                  {/* Visual Timeline Waveform bars */}
                  <div className="absolute inset-0 flex items-center justify-between px-2 gap-1 opacity-40 group-hover:opacity-60 transition-opacity">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-indigo-400 rounded-full"
                        style={{ height: `${20 + (i % 6) * 12}%` }}
                      />
                    ))}
                  </div>

                  {/* Cut Markers */}
                  <div className="absolute left-[16.6%] top-0 bottom-0 w-0.5 bg-cyan-400 z-10" title="Hook Cut" />
                  <div className="absolute left-[60%] top-0 bottom-0 w-0.5 bg-purple-400 z-10" title="Payoff Cut" />

                  {/* Active Played Fill */}
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-indigo-600/30 border-r-2 border-indigo-400 transition-all pointer-events-none"
                    style={{ width: `${timelinePercentage}%` }}
                  />

                  {/* Playhead Marker */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg shadow-white/50 -translate-x-1/2 pointer-events-none"
                    style={{ left: `${timelinePercentage}%` }}
                  >
                    <div className="w-2.5 h-2.5 bg-white rounded-full -translate-x-1 -translate-y-1 shadow" />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT 5 COLS: STUDIO DIRECTOR MONITOR & TACTILE CONTROLS */}
            <div className="lg:col-span-5 p-5 sm:p-6 bg-[#060913] flex flex-col justify-between space-y-5">
              
              {/* STUDIO MONITOR SCREEN */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400 font-bold flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-rose-500" /> PROGRAM OUT • REC
                  </span>
                  
                  {/* Camera Angle Switcher */}
                  <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded border border-slate-800">
                    <button
                      onClick={() => setActiveAngle("hook")}
                      className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                        activeAngle === "hook" ? "bg-indigo-600 text-white font-bold" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      CAM A
                    </button>
                    <button
                      onClick={() => setActiveAngle("macro")}
                      className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                        activeAngle === "macro" ? "bg-indigo-600 text-white font-bold" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      CAM B
                    </button>
                    <button
                      onClick={() => setActiveAngle("graphics")}
                      className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                        activeAngle === "graphics" ? "bg-indigo-600 text-white font-bold" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      GFX
                    </button>
                  </div>
                </div>

                {/* Simulated High-Res Video Viewfinder */}
                <div className="relative aspect-video rounded-xl bg-[#04060c] border border-slate-800 overflow-hidden shadow-inner flex items-center justify-center group">
                  {/* Viewfinder Reticle / Safe Area Guides */}
                  <div className="absolute inset-3 border border-dashed border-slate-700/50 pointer-events-none rounded" />
                  <div className="absolute top-2 left-2 text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" /> REC 4K UHD
                  </div>
                  <div className="absolute top-2 right-2 text-[9px] font-mono text-slate-400">
                    ISO 400 • f/2.0 • 1/50s
                  </div>

                  {/* Center Content based on selected angle */}
                  <div className="text-center p-4">
                    {activeAngle === "hook" && (
                      <div className="space-y-1.5">
                        <div className="w-14 h-14 mx-auto rounded-full bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-600/30">
                          <Video className="w-7 h-7" />
                        </div>
                        <div className="text-xs font-bold text-white tracking-wide">Talking Head • Face Lock Active</div>
                        <div className="text-[10px] font-mono text-slate-400">Tracking: Centered • Eye Level</div>
                      </div>
                    )}
                    {activeAngle === "macro" && (
                      <div className="space-y-1.5">
                        <div className="w-14 h-14 mx-auto rounded-full bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-600/30">
                          <Film className="w-7 h-7" />
                        </div>
                        <div className="text-xs font-bold text-white tracking-wide">Cinematic Macro Studio</div>
                        <div className="text-[10px] font-mono text-slate-400">B-Roll Track 01 • 120 FPS Slow</div>
                      </div>
                    )}
                    {activeAngle === "graphics" && (
                      <div className="space-y-1.5">
                        <div className="w-14 h-14 mx-auto rounded-full bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-600/30">
                          <Activity className="w-7 h-7" />
                        </div>
                        <div className="text-xs font-bold text-white tracking-wide">Kinetic Typography HUD</div>
                        <div className="text-[10px] font-mono text-slate-400">Dynamic Keyframing Enabled</div>
                      </div>
                    )}
                  </div>

                  {/* Viewfinder Bottom Audio VU Meters */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] font-mono text-slate-400">
                    <span>CH 1/2 [MIC]</span>
                    <div className="flex items-center gap-1">
                      <span className="text-emerald-400">-12dB</span>
                      <div className="w-16 h-1.5 bg-slate-900 rounded-full overflow-hidden flex">
                        <div className="bg-emerald-400 h-full w-[70%]" />
                        <div className="bg-amber-400 h-full w-[20%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TACTILE HARDWARE ADJUSTMENT KNOBS & SLIDERS */}
              <div className="p-4 rounded-xl bg-[#050811] border border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
                    Pacing & Tension Knobs
                  </span>
                  <span className="text-[10px] font-mono text-indigo-400">REALTIME MATRIX</span>
                </div>

                {/* Cadence WPM Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Speaking Cadence</span>
                    <span className="font-mono text-cyan-400 font-bold">{cadenceWpm} WPM</span>
                  </div>
                  <input
                    type="range"
                    min="120"
                    max="220"
                    value={cadenceWpm}
                    onChange={(e) => setCadenceWpm(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                {/* Hook Aggressiveness Tension Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Hook Tension Index</span>
                    <span className="font-mono text-emerald-400 font-bold">{hookTension}% / 100</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={hookTension}
                    onChange={(e) => setHookTension(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                </div>

                {/* Dynamic Audio Visualizer Spectrum */}
                <div className="pt-1">
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-1.5">
                    <span>AUDIO SPECTRUM (30Hz - 16kHz)</span>
                    <span className="text-indigo-400">BALANCED</span>
                  </div>
                  <div className="h-8 flex items-end gap-1">
                    {audioLevels.map((lvl, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-gradient-to-t from-indigo-600 via-cyan-400 to-emerald-400 rounded-t transition-all duration-150"
                        style={{ height: `${lvl}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* QUICK ONE-CLICK ACTION */}
              <a
                href="/signup"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01] active:scale-95"
              >
                <span>Launch This Studio Setup</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </Card3DTilt>
    </div>
  );
}
