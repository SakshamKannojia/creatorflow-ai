"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Dna,
  Video,
  Calendar,
  FolderKanban,
  Wand2,
  CheckCircle2,
  Flame,
  Zap,
  Shield,
  Layers,
  BarChart3,
  Clock,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import {
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
  XTwitterIcon,
} from "@/components/ui/platform-icons";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#090D16] text-[#F8FAFC] selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      {/* Background ambient gradient orbs */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-indigo-600/15 via-violet-600/10 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[140px] pointer-events-none -z-10" />

      {/* ------------------------------------------------------------- */}
      {/* NAVIGATION HEADER */}
      {/* ------------------------------------------------------------- */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090D16]/80 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-base tracking-tight text-white">
              CreatorFlow<span className="text-indigo-400">.ai</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-300">
            <a href="#problem" className="hover:text-white transition-colors">
              The Problem
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#content-dna" className="hover:text-white transition-colors">
              Content DNA
            </a>
            <a href="#platforms" className="hover:text-white transition-colors">
              Platforms
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-xs">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="sm" className="text-xs shadow-indigo-500/25">
                Start Creating Free
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6 animate-in fade-in duration-500">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Intelligent Content Engine for Modern Creators</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Create content. <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-indigo-200 to-violet-400">
            Stay consistent.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Generate, personalize, organize and plan your social media content from one intelligent workspace.
        </p>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link href="/signup" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-xl shadow-indigo-500/25">
              Start Creating
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>

          <a href="#features" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Explore Features
            </Button>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
            No generic chatbot outputs
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
            Personalized Content DNA
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
            Shooting-ready Reel Scripts
          </span>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 7. DASHBOARD & GENERATOR PREVIEW MOCKUP */}
        {/* ------------------------------------------------------------- */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/60 p-2 sm:p-3 border border-slate-700/60 shadow-2xl backdrop-blur-xl">
          <div className="rounded-xl bg-[#0B101D] border border-slate-800 p-4 sm:p-6 text-left space-y-4">
            {/* Window bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs text-slate-400 font-medium">
                  CreatorFlow AI — Workspace
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  Content DNA: Active
                </span>
              </div>
            </div>

            {/* Inner Dashboard View Preview */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-5 space-y-3 p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Generator Input</span>
                  <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    Instagram Reel
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 text-xs text-slate-300 border border-slate-800/60 font-mono text-[11px]">
                  Topic: 5 AI workflows that save creators 15 hours a week
                </div>
                <div className="flex gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Tone: Casual
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Duration: 30s
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Format: Talking Head
                  </span>
                </div>
              </div>

              <div className="md:col-span-7 space-y-3 p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    Generated Reel Script
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Validated JSON
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 text-xs text-indigo-200 border border-indigo-500/20 font-sans">
                  <strong className="text-indigo-400 block mb-1">
                    HOOK (0-3s):
                  </strong>
                  &ldquo;Stop spending 4 hours every day on repetitive tasks. Here are the 5 tools top creators use in secret.&rdquo;
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Scene 1: Close-up talking head with rapid text overlays</span>
                  <span className="text-indigo-400 font-medium">Save to Library →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. THE PROBLEM SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="problem" className="py-20 border-t border-slate-800/80 bg-[#0B101D]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              The Reality Check
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Why 90% of Creators Burn Out in 6 Months
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Most creators don&apos;t fail because their ideas are bad. They fail because their workflow is broken, exhausting, and completely unsustainable.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-[#0F172A]/70 border border-slate-800 p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">
                1. Blank Screen Paralysis
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Staring at a blinking cursor for hours, struggling to find a compelling hook before giving up and postponing your post.
              </p>
            </div>

            <div className="rounded-2xl bg-[#0F172A]/70 border border-slate-800 p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">
                2. Generic AI Soundalikes
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Basic AI wrappers generate hollow corporate clichés like &ldquo;In today&apos;s fast-paced world,&rdquo; which audiences instantly swipe away.
              </p>
            </div>

            <div className="rounded-2xl bg-[#0F172A]/70 border border-slate-800 p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">
                3. Scattered Chaos
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scripts in Apple Notes, drafts in Google Docs, post ideas in Telegram, and zero centralized calendar to keep you accountable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. FEATURES SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Engineered For Creators
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Everything You Need to Scale Your Output
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Not a simple chat interface. A purpose-built SaaS workspace designed around the daily habits of top social media creators.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="rounded-2xl bg-[#0F172A]/80 border border-slate-800 p-6 space-y-3 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
              <Wand2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              AI Content Generator
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Synthesize high-converting captions, carousel slides, LinkedIn posts, and viral hooks in seconds with Gemini 1.5.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-2xl bg-[#0F172A]/80 border border-slate-800 p-6 space-y-3 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              Reel Script Blueprints
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Scene-by-scene camera breakdown, visual directions, voiceover script, and on-screen text overlays you can actually film.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-2xl bg-[#0F172A]/80 border border-slate-800 p-6 space-y-3 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <Dna className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              Content DNA Engine
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calibrate the AI on your past writing samples. It extracts your cadence, vocabulary, and hook formulas so outputs sound 100% like you.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="rounded-2xl bg-[#0F172A]/80 border border-slate-800 p-6 space-y-3 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              1-Click AI Rewrite
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Make shorter, improve hook, convert to Hinglish, make cinematic, or adapt to LinkedIn style with side-by-side version comparison.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="rounded-2xl bg-[#0F172A]/80 border border-slate-800 p-6 space-y-3 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
              <FolderKanban className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              Structured Content Library
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Categorize drafts, ideas, and published assets. Filter by platform and content format, search instantly, and duplicate winners.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="rounded-2xl bg-[#0F172A]/80 border border-slate-800 p-6 space-y-3 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              Visual Planning Calendar
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Schedule your saved scripts and captions onto an interactive monthly grid so you never second-guess what to post next.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. HOW IT WORKS */}
      {/* ------------------------------------------------------------- */}
      <section id="how-it-works" className="py-20 border-t border-slate-800/80 bg-[#0B101D]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Simple 3-Step Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              From Raw Thought to Published Pipeline
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="rounded-2xl bg-[#0F172A] border border-slate-800 p-6 space-y-3 relative">
              <span className="text-4xl font-extrabold text-indigo-500/30">01</span>
              <h3 className="text-base font-bold text-white">
                Calibrate Your Voice
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Paste 3-10 examples of your previous posts into Content DNA. Gemini analyzes your vocabulary, cadence, and hook formulas.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl bg-[#0F172A] border border-slate-800 p-6 space-y-3 relative">
              <span className="text-4xl font-extrabold text-violet-500/30">02</span>
              <h3 className="text-base font-bold text-white">
                Generate & Polish
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pick your platform, enter your topic, and generate high-impact scripts and captions. Fine-tune with inline editing or AI rewrite.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl bg-[#0F172A] border border-slate-800 p-6 space-y-3 relative">
              <span className="text-4xl font-extrabold text-emerald-500/30">03</span>
              <h3 className="text-base font-bold text-white">
                Organize & Plan
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Save your finished assets into your Content Library and schedule them across the monthly calendar to maintain unwavering consistency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. CONTENT DNA SPOTLIGHT */}
      {/* ------------------------------------------------------------- */}
      <section id="content-dna" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-[#0F172A] border border-indigo-500/30 p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 inline-block">
                Proprietary Personalization Engine
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Content DNA: Your Writing Voice, Codified
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Generic AI tools don&apos;t know who you are. With Content DNA, CreatorFlow extracts your sentence rhythm, vernacular, preferred topics, and banned words. Every future generation sounds like you on your best writing day.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-3">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Hook Style</span>
                  <span className="text-xs font-semibold text-white">Curiosity-driven interrupts</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Languages</span>
                  <span className="text-xs font-semibold text-white">English, Hinglish, Hindi</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Emoji Density</span>
                  <span className="text-xs font-semibold text-white">Minimalist & clean</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Tone Calibration</span>
                  <span className="text-xs font-semibold text-white">Casual + Cinematic</span>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/signup">
                  <Button variant="primary" size="md">
                    Calibrate Your DNA
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="text-slate-500">// Extracted DNA Profile Object</div>
              <div className="text-indigo-400">&ldquo;tone&rdquo;: &ldquo;Casual + Cinematic&rdquo;,</div>
              <div className="text-indigo-400">&ldquo;language&rdquo;: &ldquo;Hinglish&rdquo;,</div>
              <div className="text-indigo-400">&ldquo;average_length&rdquo;: &ldquo;Short & Punchy&rdquo;,</div>
              <div className="text-indigo-400">&ldquo;hook_style&rdquo;: &ldquo;Curiosity-driven&rdquo;,</div>
              <div className="text-indigo-400">&ldquo;banned_words&rdquo;: [&ldquo;synergy&rdquo;, &ldquo;10x guru&rdquo;],</div>
              <div className="text-emerald-400 pt-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Status: Injected into generation prompts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. SUPPORTED PLATFORMS */}
      {/* ------------------------------------------------------------- */}
      <section id="platforms" className="py-20 border-t border-slate-800/80 bg-[#0B101D]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Multi-Platform Native
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Optimized for Your Core Channels
            </h2>
            <p className="text-xs text-slate-400">
              Each platform receives customized hook lengths, character counts, and formatting nuances.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-[#0F172A]/70 border border-slate-800 flex flex-col items-center text-center space-y-2.5">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center justify-center">
                <InstagramIcon className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-white">Instagram</h3>
              <p className="text-[11px] text-slate-400">
                Captions, Carousel slides & Reel scripts with visual cues
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0F172A]/70 border border-slate-800 flex flex-col items-center text-center space-y-2.5">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
                <LinkedInIcon className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-white">LinkedIn</h3>
              <p className="text-[11px] text-slate-400">
                Thought leadership posts, spacing & professional discussions
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0F172A]/70 border border-slate-800 flex flex-col items-center text-center space-y-2.5">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center">
                <YouTubeIcon className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-white">YouTube</h3>
              <p className="text-[11px] text-slate-400">
                Shorts scripts, SEO descriptions & video concept breakdowns
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0F172A]/70 border border-slate-800 flex flex-col items-center text-center space-y-2.5">
              <div className="w-12 h-12 rounded-xl bg-slate-700/20 text-slate-200 border border-slate-700/30 flex items-center justify-center">
                <XTwitterIcon className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-white">X (Twitter)</h3>
              <p className="text-[11px] text-slate-400">
                Punchy viral one-liners, threads & contrarian insights
              </p>
            </div>
          </div>

          <p className="text-center text-[11px] text-slate-500 mt-6">
            * CreatorFlow AI is a dedicated content planning and generation workspace. Automatic direct-to-social publishing will be available in future API updates.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 8. FINAL CTA SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-500/30 p-10 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Ready to Build Your Content Pipeline?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Stop creating on impulse. Join forward-thinking creators who generate, organize, and plan their entire social catalog with CreatorFlow AI.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/signup">
                <Button variant="primary" size="lg" className="shadow-xl shadow-indigo-500/25">
                  Start Creating Free
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary" size="lg">
                  Sign In to Workspace
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 9. FOOTER */}
      {/* ------------------------------------------------------------- */}
      <footer className="border-t border-slate-800/80 bg-[#070A12] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-sm text-white">
              CreatorFlow<span className="text-indigo-400">.ai</span>
            </span>
            <span className="text-slate-600">|</span>
            <span>&copy; {new Date().getFullYear()} CreatorFlow AI. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-slate-300 transition-colors">
              Log In
            </Link>
            <Link href="/signup" className="hover:text-slate-300 transition-colors">
              Sign Up
            </Link>
            <a href="#features" className="hover:text-slate-300 transition-colors">
              Features
            </a>
            <a href="#content-dna" className="hover:text-slate-300 transition-colors">
              Content DNA
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
