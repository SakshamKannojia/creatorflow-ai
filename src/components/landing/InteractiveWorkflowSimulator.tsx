"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Layers, 
  Video, 
  Calendar, 
  CheckCircle2, 
  Copy, 
  Check, 
  Zap, 
  TrendingUp,
  Clock,
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
    format: "YouTube Shorts & IG Reel",
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
      { type: "B-Roll", cue: "Macro footage of terminal running async agent loops", note: "Clean transition with subtle screen zoom" },
      { type: "Onscreen UI", cue: "Kinetic typography: 'State vs. Prompt'", note: "Positioned top-third, clean sans font" }
    ],
    schedule: { day: "Tuesday", time: "18:30 UTC", channel: "YouTube Shorts & Instagram Reels", estViews: "142K+" }
  },
  {
    id: "saas-growth",
    topic: "How We Scaled from $0 to $50K MRR Without Paid Ads",
    category: "Founder Story",
    format: "Instagram Reel & YT Video",
    dnaScore: 96.8,
    hookType: "Hard Numbers & Proof",
    hook: "We burned $8,000 on Google Ads before realizing organic short-form videos out-converted paid search 4 to 1.",
    scriptLines: [
      { time: "0:00 - 0:06", type: "HOOK", content: "If you are running paid ads before you have 10 organic video touchpoints, you are lighting cash on fire." },
      { time: "0:06 - 0:30", type: "BREAKDOWN", content: "Instead of pitch decks, we filmed raw screen shares of our daily bugs and customer feature requests." },
      { time: "0:30 - 0:52", type: "TACTIC", content: "Founder-led distribution compounds because people buy from accountable humans, not anonymous logos." },
      { time: "0:52 - 1:00", type: "CTA", content: "Check the link in bio for our exact free weekly distribution checklist." }
    ],
    blueprints: [
      { type: "A-Roll", cue: "Casual desk setup with soft warm lighting", note: "Authentic founder tone, zero corporate posture" },
      { type: "B-Roll", cue: "Screen recording showing Stripe MRR dashboard graph", note: "Zoom into 3-month inflection point" },
      { type: "Graphics", cue: "Minimal bullet list highlighting 3 organic channels", note: "Appear sequentially on voiceover sync" }
    ],
    schedule: { day: "Thursday", time: "14:00 UTC", channel: "Instagram & YouTube", estViews: "88K+" }
  },
  {
    id: "creator-habits",
    topic: "The 3-Step Vault System to Never Run Out of Video Ideas",
    category: "Creator Systems",
    format: "30s Short-Form Reel",
    dnaScore: 99.1,
    hookType: "Curiosity Gap",
    hook: "Top creators don't sit down to brainstorm. They built an external cognitive engine that organizes thoughts automatically.",
    scriptLines: [
      { time: "0:00 - 0:04", type: "HOOK", content: "The reason you hit creator burnout is because you combine ideation and filming into the same day." },
      { time: "0:04 - 0:18", type: "SYSTEM", content: "Capture in 5 seconds via voice notes. Calibrate through your Content DNA. Schedule into 7-day batches." },
      { time: "0:18 - 0:30", type: "ACTION", content: "Save this post and comment 'VAULT' to duplicate our free Notion workflow." }
    ],
    blueprints: [
      { type: "A-Roll", cue: "Direct eye contact, relaxed speaking pace", note: "High clarity audio, lapel mic focus" },
      { type: "B-Roll", cue: "Smartphone voice memo widget expanding into text", note: "Clean macro perspective" },
      { type: "Overlay", cue: "Step 1 -> Step 2 -> Step 3 animated timeline", note: "Minimalist slate graphics" }
    ],
    schedule: { day: "Sunday", time: "17:00 UTC", channel: "Instagram Reels & YouTube Shorts", estViews: "210K+" }
  }
];

export default function InteractiveWorkflowSimulator() {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [activeStep, setActiveStep] = useState<0 | 1 | 2 | 3>(0);
  const [isCopied, setIsCopied] = useState(false);

  const scenario = SCENARIOS[activeScenarioIndex];

  const steps = [
    { id: 0, label: "Content DNA™", icon: <Layers className="w-4 h-4" /> },
    { id: 1, label: "Script Engine", icon: <Sparkles className="w-4 h-4" /> },
    { id: 2, label: "Visual Director", icon: <Video className="w-4 h-4" /> },
    { id: 3, label: "Distribution", icon: <Calendar className="w-4 h-4" /> },
  ];

  const handleCopy = () => {
    const text = scenario.scriptLines.map((l) => `${l.time} [${l.type}]: ${l.content}`).join("\n");
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl border dark:border-slate-800 border-[#e8dece] dark:bg-slate-900 bg-white p-6 sm:p-8 shadow-[0_12px_40px_-15px_rgba(107,66,38,0.10)] dark:shadow-[0_12px_40px_-15px_rgba(0,0,0,0.5)] space-y-6">
      
      {/* Top Console Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b dark:border-slate-800 border-[#f0ebe2]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider dark:text-amber-400 text-amber-800">
              Interactive Workflow Engine
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full dark:bg-slate-800 dark:text-slate-300 bg-[#f0ebe2] text-[#6b5744] font-mono">
              Live Preview
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold dark:text-white text-[#1c1611] tracking-tight">
            Experience CreatorFlow in Real-Time
          </h3>
        </div>

        {/* Creator Scenario Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {SCENARIOS.map((sc, i) => (
            <button
              key={sc.id}
              onClick={() => {
                setActiveScenarioIndex(i);
                setActiveStep(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeScenarioIndex === i
                  ? "dark:bg-amber-600 dark:text-white bg-[#1c1611] text-amber-200 font-semibold shadow-xs"
                  : "dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200 bg-[#f0ebe2] text-[#6b5744] hover:bg-[#e8dece] hover:text-[#1c1611]"
              }`}
            >
              {sc.category}
            </button>
          ))}
        </div>
      </div>

      {/* Pipeline Step Navigator */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {steps.map((st) => {
          const isCurrent = activeStep === st.id;
          return (
            <button
              key={st.id}
              onClick={() => setActiveStep(st.id as 0 | 1 | 2 | 3)}
              className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                isCurrent
                  ? "dark:bg-amber-950/40 dark:border-amber-700/50 dark:text-white bg-amber-50/70 border-amber-200/80 text-[#1c1611] shadow-xs"
                  : "dark:bg-slate-900/60 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-slate-200 bg-[#faf8f5] border-[#e8dece] text-[#6b5744] hover:border-[#d4bea0] hover:text-[#1c1611]"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  isCurrent ? "bg-amber-600 text-white shadow-xs" : "dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 bg-white border border-[#e8dece] text-[#9c836a]"
                }`}
              >
                {st.icon}
              </div>
              <div className="min-w-0">
                <div className="text-[10px] dark:text-slate-400 text-[#9c836a] uppercase tracking-wider font-semibold">
                  Step 0{st.id + 1}
                </div>
                <div className="text-xs font-semibold truncate dark:text-slate-200 text-[#1c1611]">
                  {st.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="relative min-h-[340px] rounded-xl border dark:border-slate-800 border-[#e8dece] dark:bg-slate-950/60 bg-[#faf8f5] p-5 sm:p-6 overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* STEP 0: CONTENT DNA */}
          {activeStep === 0 && (
            <motion.div
              key="dna"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs dark:text-amber-400 text-amber-800 font-semibold uppercase tracking-wider mb-1">
                    Topic & Target Audience
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold dark:text-white text-[#1c1611]">
                    &quot;{scenario.topic}&quot;
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full dark:bg-emerald-950/40 dark:border-emerald-800/40 dark:text-emerald-400 bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    DNA Viral Score: {scenario.dnaScore}%
                  </div>
                  <div className="px-3 py-1 rounded-full dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
                    {scenario.format}
                  </div>
                </div>
              </div>

              {/* DNA Attribute Gauges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl dark:bg-slate-900 dark:border-slate-800 bg-white border border-[#e8dece] shadow-xs space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="dark:text-slate-400 text-[#6b5744] font-medium">Hook Retention Strength</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold">96%</span>
                  </div>
                  <div className="w-full dark:bg-slate-700 bg-[#e8dece] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-600 h-full rounded-full w-[96%]" />
                  </div>
                  <p className="text-[11px] dark:text-slate-400 text-[#9c836a]">
                    Hook Type: <span className="dark:text-slate-200 text-[#1c1611] font-medium">{scenario.hookType}</span>
                  </p>
                </div>

                <div className="p-4 rounded-xl dark:bg-slate-900 dark:border-slate-800 bg-white border border-[#e8dece] shadow-xs space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="dark:text-slate-400 text-[#6b5744] font-medium">Pacing & Cadence Target</span>
                    <span className="dark:text-slate-200 text-[#6b5744] font-bold">155 WPM</span>
                  </div>
                  <div className="w-full dark:bg-slate-700 bg-[#e8dece] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-700 dark:bg-amber-500 h-full rounded-full w-[88%]" />
                  </div>
                  <p className="text-[11px] dark:text-slate-400 text-[#9c836a]">
                    Duration: <span className="dark:text-slate-200 text-[#1c1611] font-medium">0:58 - 1:02 min</span>
                  </p>
                </div>

                <div className="p-4 rounded-xl dark:bg-slate-900 dark:border-slate-800 bg-white border border-[#e8dece] shadow-xs space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="dark:text-slate-400 text-[#6b5744] font-medium">Audience Archetype</span>
                    <span className="dark:text-amber-400 text-amber-800 font-bold">High Intent</span>
                  </div>
                  <div className="w-full dark:bg-slate-700 bg-[#e8dece] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-600 h-full rounded-full w-[92%]" />
                  </div>
                  <p className="text-[11px] dark:text-slate-400 text-[#9c836a]">
                    Tone: <span className="dark:text-slate-200 text-[#1c1611] font-medium">Authoritative, Pragmatic</span>
                  </p>
                </div>
              </div>

              {/* Generated Hook Highlight */}
              <div className="p-4 rounded-xl dark:bg-amber-950/30 dark:border-amber-800/40 bg-amber-50/70 border border-amber-200/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider dark:text-amber-400 text-amber-800 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    Tested 0-5s Visual & Audio Hook
                  </span>
                  <span className="text-[11px] dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800/50 text-emerald-800 font-semibold flex items-center gap-1 bg-emerald-100/60 px-2 py-0.5 rounded-full border border-emerald-200/60">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Pacing Validated
                  </span>
                </div>
                <p className="text-sm font-semibold dark:text-slate-100 text-[#1c1611] leading-relaxed">
                  &quot;{scenario.hook}&quot;
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 1: SCRIPT ENGINE */}
          {activeStep === 1 && (
            <motion.div
              key="script"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b dark:border-slate-800 border-[#f0ebe2]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-sm font-bold dark:text-white text-[#1c1611]">Teleprompter Output</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600 bg-white border border-[#e8dece] hover:border-[#d4bea0] text-[#6b5744] text-xs font-medium flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {isCopied ? "Copied Script" : "Copy Script"}
                </button>
              </div>

              <div className="space-y-2.5">
                {scenario.scriptLines.map((line, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700 bg-white border border-[#e8dece] hover:border-[#d4bea0] transition-colors flex flex-col sm:flex-row sm:items-start gap-3 shadow-xs"
                  >
                    <div className="flex sm:flex-col items-center sm:items-start justify-between min-w-[120px]">
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 bg-[#f0ebe2] border border-[#e8dece] text-[#6b5744]">
                        {line.time}
                      </span>
                      <span className="text-[10px] font-semibold dark:text-slate-400 text-[#9c836a] uppercase tracking-wider sm:mt-1">
                        {line.type}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm dark:text-slate-200 text-[#1c1611] leading-relaxed font-sans font-normal">
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="text-xs dark:text-slate-400 text-[#9c836a] font-semibold uppercase tracking-wider">
                Direct-to-Camera & B-Roll Shot List
              </div>
              <div className="grid gap-2.5">
                {scenario.blueprints.map((bp, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl dark:bg-slate-900 dark:border-slate-800 bg-white border border-[#e8dece] flex items-start gap-3 shadow-xs"
                  >
                    <div className="w-7 h-7 rounded-lg dark:bg-amber-950/50 dark:border-amber-800/50 dark:text-amber-400 bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      0{i + 1}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold dark:text-slate-200 text-[#1c1611] uppercase tracking-wider">
                          {bp.type}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full dark:bg-slate-800 dark:text-slate-300 bg-[#f0ebe2] text-[#6b5744] font-medium">
                          Ready for Shoot
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm dark:text-slate-100 text-[#1c1611] font-semibold">
                        {bp.cue}
                      </div>
                      <div className="text-xs dark:text-slate-400 text-[#9c836a]">
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="text-xs dark:text-slate-400 text-[#9c836a] font-semibold uppercase tracking-wider">
                Multi-Platform Distribution Queue
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl dark:bg-slate-900 dark:border-slate-800 bg-white border border-[#e8dece] shadow-xs space-y-2">
                  <div className="text-xs dark:text-slate-400 text-[#9c836a] uppercase tracking-wider font-semibold">
                    Optimal Scheduling Window
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40 bg-amber-50 text-amber-700 border border-amber-200">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-base font-bold dark:text-white text-[#1c1611]">
                        {scenario.schedule.day} at {scenario.schedule.time}
                      </div>
                      <div className="text-xs dark:text-slate-400 text-[#9c836a]">
                        Calculated by Historical Follower Activity
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl dark:bg-slate-900 dark:border-slate-800 bg-white border border-[#e8dece] shadow-xs space-y-2">
                  <div className="text-xs dark:text-slate-400 text-[#9c836a] uppercase tracking-wider font-semibold">
                    Simultaneous Syndication
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 bg-[#f0ebe2] text-[#6b5744] border border-[#e8dece]">
                      <Radio className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-base font-bold dark:text-white text-[#1c1611]">
                        {scenario.schedule.channel}
                      </div>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        Expected Reach: {scenario.schedule.estViews}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl dark:bg-amber-950/30 dark:border-amber-800/40 bg-amber-50/70 border border-amber-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs dark:text-amber-300 text-amber-900 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Synced with Google Calendar, Notion &amp; Social Webhooks
                </div>
                <a
                  href="/generate"
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs transition-all text-center"
                >
                  Open in Workspace
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom status bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t dark:border-slate-800 border-[#f0ebe2] text-xs dark:text-slate-400 text-[#9c836a]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>GPU-Accelerated Script Synthesis</span>
          <span className="dark:text-slate-700 text-[#d4c4b0]">•</span>
          <span>Zero manual formatting needed</span>
        </div>
        <button
          onClick={() => setActiveStep(((activeStep + 1) % 4) as 0 | 1 | 2 | 3)}
          className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
        >
          Next Stage &rarr;
        </button>
      </div>
    </div>
  );
}
