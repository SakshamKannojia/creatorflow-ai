"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Layers, 
  Video, 
  Calendar, 
  CheckCircle2, 
  Play, 
  RefreshCw, 
  Copy, 
  Check, 
  Flame, 
  Zap, 
  TrendingUp,
  Cpu,
  Clock,
  Eye,
  Radio
} from "lucide-react";

interface WorkflowScenario {
  id: string;
  topic: string;
  category: string;
  format: string;
  dnaScore: number;
  hook: string;
  hookType: string;
  scriptLines: { time: string; type: string; content: string }[];
  blueprints: { type: string; cue: string; note: string }[];
  schedule: { day: string; time: string; channel: string; estViews: string };
}

const SCENARIOS: WorkflowScenario[] = [
  {
    id: "tech-ai",
    topic: "Why 90% of AI Agents Fail in Production",
    category: "Tech Analysis",
    format: "60s Short / Reel",
    dnaScore: 98.4,
    hookType: "Pattern Interrupt / Contrarian",
    hook: "Most developers build AI agents like chatbots. That's why 90% fail the moment real users break the prompt.",
    scriptLines: [
      { time: "0:00 - 0:05", type: "HOOK", content: "The biggest mistake in AI engineering isn't model choice—it's deterministic state management." },
      { time: "0:05 - 0:28", type: "PROBLEM", content: "Chatbots accept fuzzy responses. Real enterprise agents need strictly verified JSON schemas and self-healing rollbacks." },
      { time: "0:28 - 0:50", type: "FRAMEWORK", content: "Here are the 3 architectural guardrails that separate fragile weekend toys from scalable production systems." },
      { time: "0:50 - 1:00", type: "CTA", content: "Drop 'AGENT' in the comments to get our full open-source evaluation blueprint." }
    ],
    blueprints: [
      { type: "A-Roll", cue: "Tight 35mm lens, intense eye contact", note: "Delivery speed: 155 WPM, punchy cadence" },
      { type: "B-Roll", cue: "Macro footage of terminal running async agent loops", note: "Glitch transition with subtle cyan glow" },
      { type: "Onscreen UI", cue: "Kinetic typography: 'State vs. Prompt'", note: "Positioned top-third, monospace font" }
    ],
    schedule: { day: "Tuesday", time: "18:30 UTC", channel: "YouTube Shorts & IG", estViews: "142K+" }
  },
  {
    id: "saas-growth",
    topic: "The Zero-Dollar Distribution Flywheel",
    category: "Growth & SaaS",
    format: "90s Breakdown",
    dnaScore: 96.8,
    hookType: "High Stakes Revelation",
    hook: "We scaled our ARR from zero to $40K without running a single paid advertisement. Here is the exact content matrix.",
    scriptLines: [
      { time: "0:00 - 0:06", type: "HOOK", content: "Stop buying Facebook ads before your organic engine produces predictable customer retention." },
      { time: "0:06 - 0:35", type: "INSIGHT", content: "Every feature you ship is content. Every customer support ticket is a YouTube script waiting to be written." },
      { time: "0:35 - 1:10", type: "BLUEPRINT", content: "We turned our changelogs into 30-second weekly reels, driving 12,000 inbound signups completely for free." },
      { time: "1:10 - 1:30", type: "CTA", content: "Save this blueprint for your next product launch sprint." }
    ],
    blueprints: [
      { type: "A-Roll", cue: "Medium shot behind laptop, casual authority", note: "Tone: Pragmatic, zero fluff" },
      { type: "B-Roll", cue: "Live screen recording of Stripe dashboard hockey stick", note: "Motion blur blur-in on numbers" },
      { type: "Graphic", cue: "Infographic: The 4-Tier Inbound Funnel", note: "Animated diagram with neon flow indicators" }
    ],
    schedule: { day: "Thursday", time: "14:00 UTC", channel: "LinkedIn Video & TikTok", estViews: "88K+" }
  },
  {
    id: "cinematic-story",
    topic: "The Psychology of Infinite Scrolling",
    category: "Deep Dive",
    format: "3-Min Documentary",
    dnaScore: 99.1,
    hookType: "Neuroscience Curiosity Gap",
    hook: "You think you scroll because you're bored. Your brain is actually trapped in a variable reward dopamine loop.",
    scriptLines: [
      { time: "0:00 - 0:08", type: "HOOK", content: "Why can't you put your phone down at 1 AM? It's not a lack of willpower; it's casino architecture." },
      { time: "0:08 - 0:55", type: "SCIENCE", content: "Slot machines use variable ratio schedules of reinforcement. Social feeds weaponized the exact same neural trigger." },
      { time: "0:55 - 2:20", type: "RESOLUTION", content: "How the top 1% of digital creators flip this loop from passive consumption into creative compounding." },
      { time: "2:20 - 3:00", type: "CALL", content: "Reclaim your focus. Subscribe for deeper cognitive science breakdowns." }
    ],
    blueprints: [
      { type: "Cinematic", cue: "Dark ambient studio, anamorphic blue rim light", note: "Pacing slow, deep bass rumble" },
      { type: "Animation", cue: "3D brain scan showing dopamine synaptic firing", note: "Neon cyan particle flow" },
      { type: "SFX Cue", cue: "Sub-bass riser leading to sudden silence", note: "Synchronized with hard cut" }
    ],
    schedule: { day: "Sunday", time: "17:00 UTC", channel: "YouTube Longform", estViews: "310K+" }
  }
];

export default function InteractiveWorkflowSimulator() {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [activeStep, setActiveStep] = useState<0 | 1 | 2 | 3>(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const scenario = SCENARIOS[activeScenarioIndex];

  // Auto-progress simulation step when clicked
  const handleSelectScenario = (index: number) => {
    setActiveScenarioIndex(index);
    setIsSimulating(true);
    setActiveStep(0);
    setTimeout(() => setActiveStep(1), 350);
    setTimeout(() => setActiveStep(2), 700);
    setTimeout(() => {
      setActiveStep(0);
      setIsSimulating(false);
    }, 1100);
  };

  const handleCopy = () => {
    const fullText = `HOOK:\n${scenario.hook}\n\nSCRIPT:\n${scenario.scriptLines
      .map((s) => `[${s.time}] (${s.type}): ${s.content}`)
      .join("\n")}`;
    navigator.clipboard?.writeText(fullText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const steps = [
    { id: 0, label: "Content DNA & Archetype", icon: <Cpu className="w-4 h-4" /> },
    { id: 1, label: "Live Script Engine", icon: <Sparkles className="w-4 h-4" /> },
    { id: 2, label: "Visual Production Blueprint", icon: <Video className="w-4 h-4" /> },
    { id: 3, label: "Multi-Platform Syndication", icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <div className="relative rounded-2xl border border-indigo-500/20 bg-[#080d1a]/90 backdrop-blur-2xl p-6 lg:p-8 shadow-2xl shadow-indigo-950/40 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-indigo-900/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Interactive Workflow Engine
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono">
              v4.2 Live Engine
            </span>
          </div>
          <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
            Experience CreatorFlow in Real-Time
          </h3>
        </div>

        {/* Creator Scenario Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {SCENARIOS.map((sc, i) => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                activeScenarioIndex === i
                  ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30"
                  : "bg-slate-900/60 text-slate-300 border-indigo-950 hover:bg-slate-800 hover:border-indigo-800"
              }`}
            >
              {sc.category}
            </button>
          ))}
        </div>
      </div>

      {/* Pipeline Step Navigator */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 my-6">
        {steps.map((st) => {
          const isCurrent = activeStep === st.id;
          return (
            <button
              key={st.id}
              onClick={() => setActiveStep(st.id as any)}
              className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                isCurrent
                  ? "bg-gradient-to-r from-indigo-950/80 to-slate-900/80 border-indigo-500/60 text-indigo-200 shadow-lg shadow-indigo-950/40"
                  : "bg-slate-900/30 border-indigo-950/60 text-slate-400 hover:border-indigo-800/50 hover:text-slate-300"
              }`}
            >
              <div
                className={`p-1.5 rounded-lg ${
                  isCurrent ? "bg-indigo-500 text-white shadow-sm shadow-indigo-500/50" : "bg-slate-800/80 text-slate-400"
                }`}
              >
                {st.icon}
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  Step 0{st.id + 1}
                </div>
                <div className="text-xs font-semibold truncate text-slate-200">
                  {st.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="relative min-h-[360px] rounded-xl border border-indigo-900/40 bg-[#060a14] p-5 lg:p-6 overflow-hidden">
        <AnimatePresence mode="wait">
          {/* STEP 0: CONTENT DNA */}
          {activeStep === 0 && (
            <motion.div
              key="dna"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1">
                    Topic & Target Audience
                  </div>
                  <h4 className="text-lg lg:text-xl font-bold text-white">
                    "{scenario.topic}"
                  </h4>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    DNA Viral Score: {scenario.dnaScore}%
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium">
                    {scenario.format}
                  </div>
                </div>
              </div>

              {/* DNA Attribute Gauges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-indigo-900/40 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-medium">Retention Hook Strength</span>
                    <span className="text-indigo-400 font-bold">96%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full w-[96%]" />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Hook Type: <span className="text-slate-200 font-medium">{scenario.hookType}</span>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-indigo-900/40 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-medium">Pacing & Cadence Target</span>
                    <span className="text-cyan-400 font-bold">155 WPM</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full rounded-full w-[88%]" />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Target Duration: <span className="text-slate-200 font-medium">0:58 - 1:02 min</span>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-indigo-900/40 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-medium">Audience Archetype</span>
                    <span className="text-blue-400 font-bold">High Intent</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full w-[92%]" />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Tone: <span className="text-slate-200 font-medium">Authoritative, Pragmatic</span>
                  </p>
                </div>
              </div>

              {/* Generated Hook Highlight */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/70 to-slate-900/90 border border-indigo-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    Tested 0-5s Visual & Audio Hook
                  </span>
                  <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Pacing Validated
                  </span>
                </div>
                <p className="text-sm font-medium text-white italic leading-relaxed">
                  "{scenario.hook}"
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 1: SCRIPT ENGINE */}
          {activeStep === 1 && (
            <motion.div
              key="script"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-indigo-950">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm font-semibold text-white">Full Structured Teleprompter Output</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-md bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {isCopied ? "Copied Script" : "Copy Script"}
                </button>
              </div>

              <div className="space-y-3">
                {scenario.scriptLines.map((line, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-slate-900/60 border border-indigo-900/30 hover:border-indigo-500/40 transition-colors flex flex-col sm:flex-row sm:items-start gap-3"
                  >
                    <div className="flex sm:flex-col items-center sm:items-start justify-between min-w-[120px]">
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300">
                        {line.time}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider sm:mt-1">
                        {line.type}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                      {line.content}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: VISUAL BLUEPRINT */}
          {activeStep === 2 && (
            <motion.div
              key="blueprint"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                Direct-to-Camera & B-Roll Shot List
              </div>
              <div className="grid gap-3">
                {scenario.blueprints.map((bp, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-900/70 border border-indigo-900/30 flex items-start gap-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      0{i + 1}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          {bp.type}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono">
                          Ready for Shoot
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-slate-200 font-medium">
                        {bp.cue}
                      </div>
                      <div className="text-xs text-slate-400 italic">
                        {bp.note}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: SYNDICATION & CALENDAR */}
          {activeStep === 3 && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                Multi-Platform Distribution Queue
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/70 border border-indigo-900/40 space-y-3">
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Optimal Scheduling Window
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-white">
                        {scenario.schedule.day} at {scenario.schedule.time}
                      </div>
                      <div className="text-xs text-slate-400">
                        Calculated by Historical Follower Activity
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/70 border border-indigo-900/40 space-y-3">
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Simultaneous Syndication
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
                      <Radio className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-white">
                        {scenario.schedule.channel}
                      </div>
                      <div className="text-xs text-emerald-400 font-medium">
                        Expected Reach: {scenario.schedule.estViews}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-indigo-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Synced with Google Calendar, Notion & Social Webhooks
                </div>
                <a
                  href="/generate"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
                >
                  Open in CreatorFlow Workspace
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom status bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 mt-5 border-t border-indigo-950 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            GPU-Accelerated Script Synthesis
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="hidden sm:inline">Zero manual formatting needed</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveStep(((activeStep + 1) % 4) as any)}
            className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition-colors"
          >
            Next Stage &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
