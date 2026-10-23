"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import {
  Sparkles,
  ArrowRight,
  Play,
  Layers,
  Menu,
  X,
  ChevronDown,
  Cpu,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Video,
  Flame,
  Check,
  XCircle,
  Dna,
  Share2,
  FileText,
  Sliders,
} from "lucide-react";

import Hero3DStudio from "@/components/landing/Hero3DStudio";
import InteractiveWorkflowSimulator from "@/components/landing/InteractiveWorkflowSimulator";
import Bento3DShowcase from "@/components/landing/Bento3DShowcase";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const ROTATING_WORDS = [
  "content operations.",
  "video retention.",
  "script blueprints.",
  "creative pipelines.",
];

const PLATFORMS = [
  { name: "YouTube Shorts", icon: "▶", badge: "9:16 Vertical" },
  { name: "Instagram Reels", icon: "📸", badge: "9:16 High-Retention" },
  { name: "YouTube Longform", icon: "🎬", badge: "16:9 Chapter Outlines" },
  { name: "Instagram Carousels", icon: "📑", badge: "Multi-Slide Value" },
  { name: "YouTube Community", icon: "💬", badge: "Hooks & Polls" },
  { name: "Instagram Stories", icon: "⚡", badge: "Daily Pacing" },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });

    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(interval);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen dark:bg-[#090d16] bg-[#faf8f5] flex items-center justify-center">
        <div className="w-5 h-5 border-[1.5px] border-amber-200 border-t-amber-600 rounded-full animate-spin" />
      </div>
    );
  }

  const faqs = [
    {
      q: "How does CreatorFlow's Content DNA differ from generic AI copywriters?",
      a: "Generic AI chatbots output repetitive, robotic copy identical across every user. CreatorFlow's Content DNA extracts your exact sentence cadence, vocabulary rules, banned clichés, and storytelling structure — ensuring every generated script sounds indistinguishable from your own writing.",
    },
    {
      q: "Can I export directly into my production and editing workflows?",
      a: "Yes. Export scripts, visual blueprints, and shot lists directly to Notion, Markdown, Google Docs, or copy them formatted with one click for recording and teleprompter apps.",
    },
    {
      q: "What video formats are supported?",
      a: "CreatorFlow is engineered specifically for Instagram and YouTube: Instagram Reels, Instagram Carousels, YouTube Shorts, and YouTube Longform video blueprints with visual B-roll cues and chapter breakdowns.",
    },
    {
      q: "How does the hook optimization engine structure opening lines?",
      a: "The engine formats your opening 0–3 seconds using proven retention structures: curiosity gaps, contrarian statements, problem agitation, and high-stopping-power pattern interrupts tailored to video delivery.",
    },
    {
      q: "Is there a free tier to test the workflow?",
      a: "Yes. Sign up and start generating right away without a credit card. You'll get instant access to the Script Generator, Content DNA calibration, and production pipeline.",
    },
  ];

  const features = [
    {
      stat: "0–3s",
      title: "Hook Strike Architecture",
      desc: "Curiosity-gap, contrarian, and pattern-interrupt openings engineered to stop the scroll.",
      icon: <Flame className="w-4 h-4 text-amber-500" />,
    },
    {
      stat: "A/B-Roll",
      title: "Visual Director Blueprints",
      desc: "Scene-by-scene camera directives, focal length suggestions, and b-roll placement.",
      icon: <Video className="w-4 h-4 text-sky-500" />,
    },
    {
      stat: "100%",
      title: "Custom Voice DNA",
      desc: "Calibrated to your vocabulary, tone, pace, and taboo words so it never sounds like a bot.",
      icon: <Dna className="w-4 h-4 text-emerald-500" />,
    },
    {
      stat: "IG & YT",
      title: "Cross-Platform Syndication",
      desc: "One prompt adapts into Instagram Reels, YouTube Shorts, and 16:9 Longform scripts.",
      icon: <Share2 className="w-4 h-4 text-amber-600" />,
    },
  ];

  const comparisonRows = [
    {
      feature: "Voice Archetype (Content DNA)",
      creatorFlow: "Custom-calibrated tone, cadence & banned words",
      genericAI: "Robotic, formulaic tone identical across users",
      manual: "Exhausting to maintain consistently across drafts",
    },
    {
      feature: "Visual Director & B-Roll Cues",
      creatorFlow: "Shot-by-shot lens, angle, and timing directives",
      genericAI: "Plain text with zero cinematography guidance",
      manual: "Requires hours of manual shot planning",
    },
    {
      feature: "Hook Optimization Engine",
      creatorFlow: "Tested retention structures & pattern interrupts",
      genericAI: "Generic opening lines like 'In this video...'",
      manual: "Trial and error with unpredictable results",
    },
    {
      feature: "Production Pipeline & Sync",
      creatorFlow: "One-click export to Notion, teleprompter & calendar",
      genericAI: "Copy-paste chaos across 5 different tabs",
      manual: "Fragmented spreadsheets and lost files",
    },
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Calibrate Your Content DNA",
      desc: "Define your voice archetype, sentence cadence, signature vocabulary, and banned clichés. CreatorFlow locks in your style so every script feels authentically yours.",
      icon: <Dna className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      tag: "Voice Alignment",
    },
    {
      step: "02",
      title: "Generate Script & Visual Blueprints",
      desc: "Input your core idea and get high-retention 0–3 second hooks, speech pacing cues (WPM), and shot-by-shot camera angles for seamless shooting.",
      icon: <Video className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      tag: "Production Blueprint",
    },
    {
      step: "03",
      title: "Record with Smart Teleprompter & Export",
      desc: "Read along with optimal speech pacing markers. When finished, sync your script and visual cues directly to Notion, Google Docs, or your distribution calendar.",
      icon: <Share2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      tag: "Frictionless Delivery",
    },
  ];

  return (
    <div className="min-h-screen dark:bg-[#0d1117] dark:text-[#e2e8f0] bg-[#faf8f5] text-[#1c1611] font-sans selection:bg-amber-200 selection:text-amber-900 dark:selection:bg-amber-950 dark:selection:text-amber-200 overflow-x-hidden transition-colors duration-200">

      {/* ── NAV ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? "dark:bg-[#0d1117]/95 dark:border-slate-800/80 dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#e8dece] shadow-[0_1px_10px_rgba(162,100,40,0.06)]"
            : "dark:bg-[#0d1117]/80 bg-[#faf8f5]/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-15 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm sm:text-base tracking-tight dark:text-slate-100 text-[#1c1611]">
              CreatorFlow{" "}
              <span className="dark:text-amber-400 text-amber-700 font-semibold">
                AI
              </span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-sm font-medium dark:text-slate-400 text-[#6b5744]">
            <a
              href="#simulator"
              className="dark:hover:text-amber-400 hover:text-amber-700 transition-colors"
            >
              Simulator
            </a>
            <a
              href="#features"
              className="dark:hover:text-amber-400 hover:text-amber-700 transition-colors"
            >
              Features
            </a>
            <a
              href="#workflow"
              className="dark:hover:text-amber-400 hover:text-amber-700 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#comparison"
              className="dark:hover:text-amber-400 hover:text-amber-700 transition-colors"
            >
              Comparison
            </a>
            <a
              href="#faq"
              className="dark:hover:text-amber-400 hover:text-amber-700 transition-colors"
            >
              FAQ
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/login"
              className="text-sm font-medium dark:text-slate-300 dark:hover:text-white text-[#6b5744] hover:text-[#1c1611] transition-colors px-3 py-1.5"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-amber-600 hover:bg-amber-700 text-white transition-all shadow-md shadow-amber-600/20 hover:shadow-lg hover:shadow-amber-600/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              Get started free
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="dark:text-slate-300 text-[#6b5744] p-1.5 rounded-lg border dark:border-slate-800 border-[#e8dece]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden dark:border-slate-800 dark:bg-[#0d1117] border-t border-[#e8dece] bg-[#faf8f5] px-6 py-5 shadow-lg"
            >
              <div className="flex flex-col gap-2.5 text-sm dark:text-slate-300 text-[#6b5744] font-medium">
                <a
                  href="#simulator"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 dark:hover:text-amber-400 hover:text-amber-700"
                >
                  Simulator
                </a>
                <a
                  href="#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 dark:hover:text-amber-400 hover:text-amber-700"
                >
                  Features
                </a>
                <a
                  href="#workflow"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 dark:hover:text-amber-400 hover:text-amber-700"
                >
                  How It Works
                </a>
                <a
                  href="#comparison"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 dark:hover:text-amber-400 hover:text-amber-700"
                >
                  Comparison
                </a>
                <a
                  href="#faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 dark:hover:text-amber-400 hover:text-amber-700"
                >
                  FAQ
                </a>
              </div>
              <div className="pt-4 dark:border-slate-800 border-t border-[#e8dece] flex flex-col gap-2.5 mt-3">
                <Link
                  href="/login"
                  className="w-full text-center py-2.5 rounded-xl dark:border-slate-700 dark:text-slate-200 dark:bg-slate-800/80 border border-[#e8dece] text-[#6b5744] text-sm font-semibold bg-white"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="w-full text-center py-2.5 rounded-xl bg-amber-600 text-white text-sm font-semibold shadow-md shadow-amber-600/20"
                >
                  Get started free
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 bg-dot-pattern overflow-hidden dark:bg-[#0d1117]">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[380px] dark:bg-gradient-to-b dark:from-amber-600/15 dark:via-indigo-900/10 dark:to-transparent bg-gradient-to-b from-amber-200/50 via-amber-100/20 to-transparent blur-[110px] pointer-events-none" />
        <div className="absolute top-40 right-10 w-[300px] h-[300px] dark:bg-amber-500/10 bg-amber-100/40 blur-[90px] pointer-events-none" />
        <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-transparent dark:via-transparent dark:to-[#0d1117] bg-gradient-to-b from-transparent via-transparent to-[#faf8f5] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-7 relative z-10">

          {/* Genuine Capability Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full dark:bg-slate-800/80 dark:border-slate-700/80 dark:text-slate-300 bg-white border border-[#e8dece] text-xs font-semibold text-[#6b5744] shadow-sm hover:scale-[1.02] transition-transform">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Built Exclusively for Instagram &amp; YouTube</span>
            <span className="dark:text-slate-600 text-[#d4c4b0]">·</span>
            <span className="dark:text-amber-400 text-amber-700 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> AI Video Director
            </span>
          </div>

          {/* Dynamic Headline with cycling words */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] dark:text-white text-[#1c1611] leading-[1.08]">
            Standardize your<br />
            <span className="relative inline-block min-w-[280px] sm:min-w-[420px] text-amber-600 dark:text-amber-400">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="inline-block"
                >
                  {ROTATING_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg dark:text-slate-300 text-[#6b5744] max-w-2xl mx-auto leading-relaxed">
            Stop letting chaotic notes slow down your uploads. Transform raw ideas into structured, high-retention video blueprints calibrated for Instagram Reels, YouTube Shorts, and Longform video.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-amber-600/25 hover:shadow-xl hover:shadow-amber-600/35 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              Deploy free workspace
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#simulator"
              className="w-full sm:w-auto px-6 py-3 dark:bg-slate-800/90 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 bg-white hover:bg-amber-50/60 text-[#4a3525] text-sm font-semibold rounded-xl border border-[#e8dece] transition-all flex items-center justify-center gap-2 shadow-sm hover:-translate-y-0.5 active:translate-y-0"
            >
              <Play className="w-4 h-4 text-amber-600 fill-amber-600" />
              Try interactive simulator
            </a>
          </div>

          {/* Real Trust & Guarantee Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs dark:text-slate-400 text-[#9c836a] font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> No credit card required
            </span>
            <span className="text-[#d4c4b0] dark:text-slate-700">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Free to get started
            </span>
            <span className="text-[#d4c4b0] dark:text-slate-700">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Export to Notion, Markdown &amp; Docs
            </span>
          </div>
        </div>

        {/* Studio Preview Widget */}
        <div className="relative z-10">
          <Hero3DStudio />
        </div>
      </section>

      {/* ── PLATFORM INTEGRATION TICKER ── */}
      <section className="py-8 px-6 dark:bg-slate-950/60 dark:border-y dark:border-slate-800/80 bg-white border-y border-[#e8dece]">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs font-semibold uppercase tracking-wider dark:text-slate-400 text-[#9c836a] mb-5">
            Engineered exclusively for Instagram &amp; YouTube formats
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {PLATFORMS.map((platform) => (
              <div
                key={platform.name}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl dark:bg-slate-900 dark:border-slate-800 bg-[#faf8f5] border border-[#e8dece] text-xs font-medium dark:text-slate-300 text-[#6b5744] shadow-xs hover:scale-105 transition-transform"
              >
                <span className="text-sm">{platform.icon}</span>
                <span className="font-semibold dark:text-slate-200 text-[#1c1611]">{platform.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md dark:bg-slate-800 dark:text-amber-400 bg-[#f0ebe2] text-amber-800 font-mono">
                  {platform.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE CAPABILITIES / METRICS ── */}
      <section className="py-16 px-6 dark:bg-[#0d1117] bg-[#faf8f5]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((m, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl dark:bg-slate-900/80 dark:border-slate-800 bg-white border border-[#e8dece] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl dark:bg-slate-800 bg-[#faf8f5] border dark:border-slate-700 border-[#e8dece]">
                    {m.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider dark:text-slate-400 text-[#9c836a]">
                    Feature Focus
                  </span>
                </div>
                <div>
                  <div className="text-2xl font-black tracking-tight text-amber-600 dark:text-amber-400 font-mono">
                    {m.stat}
                  </div>
                  <div className="text-sm font-bold dark:text-slate-100 text-[#1c1611] mt-0.5">
                    {m.title}
                  </div>
                  <p className="text-xs dark:text-slate-400 text-[#6b5744] leading-relaxed mt-1">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIMULATOR ── */}
      <section id="simulator" className="py-20 px-6 dark:bg-slate-950/40 dark:border-t dark:border-slate-800 bg-white border-t border-[#e8dece]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full dark:bg-amber-950/50 dark:border-amber-800/50 dark:text-amber-300 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Pipeline Playground
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.02em] dark:text-white text-[#1c1611]">
              Try the production engine live.
            </h2>
            <p className="dark:text-slate-300 text-[#6b5744] text-sm sm:text-base leading-relaxed">
              Pick a creator archetype and watch CreatorFlow turn fuzzy ideas into 3-second retention hooks, cinematographic shot lists, and distribution calendar slots.
            </p>
          </div>
          <InteractiveWorkflowSimulator />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 px-6 dark:bg-[#0d1117] dark:border-t dark:border-slate-800 bg-[#faf8f5] border-t border-[#e8dece]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full dark:bg-slate-800 dark:border-slate-700 dark:text-amber-400 bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Architectural Advantage
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.02em] dark:text-white text-[#1c1611]">
              The operating system for serious creators.
            </h2>
            <p className="dark:text-slate-300 text-[#6b5744] text-sm sm:text-base leading-relaxed">
              Eliminate blank-page syndrome and fragmented Google Docs. Every component is engineered strictly for high-watch-time retention.
            </p>
          </div>
          <Bento3DShowcase />
        </div>
      </section>

      {/* ── REAL 3-STEP WORKFLOW ── */}
      <section id="workflow" className="py-20 px-6 dark:bg-slate-950/60 dark:border-t dark:border-slate-800 bg-white border-t border-[#e8dece]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full dark:bg-amber-950/50 dark:border-amber-800/50 dark:text-amber-300 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Simple &amp; Repeatable
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.02em] dark:text-white text-[#1c1611]">
              From concept to ready-to-shoot in 3 steps.
            </h2>
            <p className="dark:text-slate-400 text-[#6b5744] text-sm sm:text-base leading-relaxed">
              How CreatorFlow replaces chaotic scattered notes with a linear, reliable production engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workflowSteps.map((ws) => (
              <div
                key={ws.step}
                className="p-7 rounded-2xl dark:bg-slate-900 dark:border-slate-800 bg-[#faf8f5] border border-[#e8dece] shadow-sm flex flex-col justify-between space-y-5 hover:-translate-y-1 transition-transform"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-lg dark:bg-amber-950/50 dark:border-amber-800/50 bg-amber-100 border border-amber-200">
                      STEP {ws.step}
                    </span>
                    <span className="text-[11px] font-semibold dark:text-slate-400 text-[#9c836a]">
                      {ws.tag}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl dark:bg-slate-800 bg-white border dark:border-slate-700 border-[#e8dece] flex items-center justify-center shadow-xs">
                    {ws.icon}
                  </div>
                  <h3 className="text-lg font-bold dark:text-white text-[#1c1611] tracking-tight">
                    {ws.title}
                  </h3>
                  <p className="text-xs sm:text-sm dark:text-slate-300 text-[#6b5744] leading-relaxed">
                    {ws.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CREATORS SWITCH (COMPARISON) ── */}
      <section id="comparison" className="py-20 px-6 dark:bg-[#0d1117] dark:border-t dark:border-slate-800 bg-[#faf8f5] border-t border-[#e8dece]">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full dark:bg-amber-950/50 dark:border-amber-800/50 dark:text-amber-300 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Strategic Advantage
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.02em] dark:text-white text-[#1c1611]">
              Why choose CreatorFlow over generic AI.
            </h2>
            <p className="dark:text-slate-400 text-[#6b5744] text-sm sm:text-base leading-relaxed">
              Most tools output generic corporate copy. CreatorFlow is custom-engineered for modern short-form and high-retention video.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border dark:border-slate-800 border-[#e8dece] dark:bg-slate-900/60 bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b dark:border-slate-800 border-[#e8dece] dark:bg-slate-900 bg-[#faf8f5]">
                  <th className="p-4 sm:p-5 font-bold dark:text-slate-400 text-[#6b5744] w-1/4">Feature</th>
                  <th className="p-4 sm:p-5 font-bold text-amber-600 dark:text-amber-400 w-1/3 dark:bg-amber-950/20 bg-amber-50/60">
                    CreatorFlow AI
                  </th>
                  <th className="p-4 sm:p-5 font-semibold dark:text-slate-400 text-[#9c836a] w-1/4">Generic AI (ChatGPT)</th>
                  <th className="p-4 sm:p-5 font-semibold dark:text-slate-400 text-[#9c836a] w-1/6">Manual Notion Docs</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-slate-800 divide-[#e8dece]">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:dark:bg-slate-800/30 hover:bg-amber-50/30 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold dark:text-slate-200 text-[#1c1611]">
                      {row.feature}
                    </td>
                    <td className="p-4 sm:p-5 font-medium dark:text-amber-200 text-amber-900 dark:bg-amber-950/10 bg-amber-50/40">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{row.creatorFlow}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 dark:text-slate-400 text-[#6b5744]">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-rose-500/80 flex-shrink-0 mt-0.5" />
                        <span>{row.genericAI}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 dark:text-slate-400 text-[#6b5744]">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-rose-500/80 flex-shrink-0 mt-0.5" />
                        <span>{row.manual}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 px-6 dark:border-t dark:border-slate-800 dark:bg-slate-950/40 border-t border-[#e8dece] bg-white">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full dark:bg-slate-800 dark:border-slate-700 dark:text-amber-400 bg-[#f5f0e8] border border-[#d8cdb8] text-amber-800 text-xs font-semibold">
              Got Questions?
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.02em] dark:text-white text-[#1c1611]">
              Frequently asked questions.
            </h2>
            <p className="dark:text-slate-400 text-[#6b5744] text-sm sm:text-base">
              Everything you need to know about CreatorFlow's AI production architecture.
            </p>
          </div>

          <div className="dark:divide-slate-800 divide-y divide-[#e8dece] rounded-2xl border dark:border-slate-800 border-[#e8dece] dark:bg-slate-900/60 bg-[#faf8f5] p-2 sm:p-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="p-2 sm:p-3">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full py-3 text-left flex items-center justify-between gap-4 group"
                  >
                    <span className="text-sm sm:text-base font-semibold dark:text-slate-200 dark:group-hover:text-amber-400 text-[#1c1611] group-hover:text-amber-700 transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-amber-600 dark:text-amber-400" : "dark:text-slate-500 text-[#9c836a]"
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pb-3 text-xs sm:text-sm dark:text-slate-300 text-[#6b5744] leading-relaxed pt-1"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 sm:py-32 px-6 dark:bg-slate-900 bg-[#1c1611] overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-amber-600/30 via-amber-500/20 to-amber-700/20 blur-[130px] pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center space-y-7 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center mx-auto shadow-lg shadow-amber-600/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-[-0.03em] text-[#faf8f5] dark:text-white leading-tight">
            Ready to standardize your<br className="hidden sm:block" /> content engine?
          </h2>
          <p className="dark:text-slate-300 text-[#c4b49a] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Stop letting valuable ideas die in messy notes. Deploy your free CreatorFlow workspace and publish with repeatable, high-retention consistency.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold text-sm rounded-xl transition-all shadow-xl shadow-amber-600/30 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              Deploy free workspace
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-7 py-3.5 bg-transparent dark:hover:bg-slate-800 hover:bg-[#2a2018] dark:text-slate-300 dark:hover:text-white text-[#c4b49a] hover:text-white font-semibold text-sm rounded-xl dark:border-slate-700 border border-[#3a2e20] transition-all flex items-center justify-center"
            >
              Sign in to account
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs dark:text-slate-400 text-[#9c836a] pt-3">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>No credit card required</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Instant setup in 60 seconds</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Unlimited idea drafts</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="dark:bg-slate-950 dark:border-slate-800/80 bg-[#140f0c] border-t border-[#2e2416] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs dark:text-slate-400 text-[#8c745f]">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-amber-600 flex items-center justify-center shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold dark:text-slate-200 text-[#d4bea0] text-sm">
              CreatorFlow AI
            </span>
            <span className="font-mono dark:text-slate-400 text-[#8c745f] text-[11px] px-2 py-0.5 rounded-md dark:bg-slate-900 bg-[#241a13]">
              v2.5.0
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-medium">
            <a
              href="#simulator"
              className="dark:hover:text-amber-400 hover:text-amber-200 transition-colors"
            >
              Simulator
            </a>
            <a
              href="#features"
              className="dark:hover:text-amber-400 hover:text-amber-200 transition-colors"
            >
              Platform
            </a>
            <a
              href="#workflow"
              className="dark:hover:text-amber-400 hover:text-amber-200 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#comparison"
              className="dark:hover:text-amber-400 hover:text-amber-200 transition-colors"
            >
              Comparison
            </a>
            <Link
              href="/privacy"
              className="dark:hover:text-amber-400 hover:text-amber-200 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="dark:hover:text-amber-400 hover:text-amber-200 transition-colors"
            >
              Terms
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>All systems operational · © {new Date().getFullYear()} CreatorFlow AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
