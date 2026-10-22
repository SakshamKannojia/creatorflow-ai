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
} from "lucide-react";

import Hero3DStudio from "@/components/landing/Hero3DStudio";
import InteractiveWorkflowSimulator from "@/components/landing/InteractiveWorkflowSimulator";
import Bento3DShowcase from "@/components/landing/Bento3DShowcase";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="w-5 h-5 border-[1.5px] border-amber-200 border-t-amber-600 rounded-full animate-spin" />
      </div>
    );
  }

  const faqs = [
    {
      q: "How does CreatorFlow's Content DNA differ from regular AI chatbots?",
      a: "Generic AI chatbots output repetitive, robotic copy identical across every user. CreatorFlow's Content DNA extracts your exact sentence cadence, vocabulary rules, banned clichés, and storytelling structure — ensuring every generated script sounds indistinguishable from your own writing.",
    },
    {
      q: "Can I export directly into my production and editing workflows?",
      a: "Yes. Export scripts, visual blueprints, and shot lists to Notion, Markdown, Google Docs, or copy them formatted with one click for recording and teleprompter apps.",
    },
    {
      q: "What video formats are supported?",
      a: "CreatorFlow specializes in short-form and high-retention video: YouTube Shorts, Instagram Reels, TikTok, LinkedIn Video, as well as multi-part longform YouTube outlines with visual B-roll cues.",
    },
    {
      q: "Is there a free trial to test the workflow?",
      a: "Yes. Sign up and start generating right away without a credit card. You'll get instant access to the Script Generator, Content DNA calibration, and production pipeline.",
    },
  ];

  const metrics = [
    { stat: "+340%", title: "Viewer Retention", desc: "Hooks engineered against 2.4M viral short-form videos." },
    { stat: "4.2×",  title: "Faster Turnaround", desc: "From idea to ready-to-shoot blueprint in under 3 minutes." },
    { stat: "Zero",  title: "Creative Burnout", desc: "Infinite pipeline of high-intent topics calibrated to your DNA." },
    { stat: "100%",  title: "Voice Consistency", desc: "Every word follows your custom tone, pace, and rhythm." },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1611] font-sans selection:bg-amber-200 selection:text-amber-900 overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[#faf8f5]/95 backdrop-blur-sm border-b border-[#e8dece] shadow-[0_1px_0_0_rgba(162,100,40,0.06)]"
          : "bg-[#faf8f5]/80 backdrop-blur-sm"
      }`}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-600 flex items-center justify-center shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-[#1c1611]">
              CreatorFlow <span className="text-amber-700/60 font-normal">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm text-[#6b5744]">
            <a href="#simulator" className="hover:text-[#1c1611] transition-colors">Simulator</a>
            <a href="#features"  className="hover:text-[#1c1611] transition-colors">Features</a>
            <a href="#faq"       className="hover:text-[#1c1611] transition-colors">FAQ</a>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/login" className="text-sm text-[#6b5744] hover:text-[#1c1611] transition-colors px-3 py-1.5">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-colors shadow-sm"
            >
              Get started
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <button
            className="md:hidden text-[#6b5744] p-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[#e8dece] bg-[#faf8f5] px-6 py-5"
            >
              <div className="flex flex-col gap-2 text-sm text-[#6b5744]">
                <a href="#simulator" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#1c1611]">Simulator</a>
                <a href="#features"  onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#1c1611]">Features</a>
                <a href="#faq"       onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#1c1611]">FAQ</a>
              </div>
              <div className="pt-3 border-t border-[#e8dece] flex flex-col gap-2 mt-3">
                <Link href="/login" className="w-full text-center py-2 rounded-lg border border-[#e8dece] text-[#6b5744] text-sm font-medium bg-white">Sign in</Link>
                <Link href="/signup" className="w-full text-center py-2 rounded-lg bg-amber-600 text-white text-sm font-medium">Get started</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-20 px-6 bg-dot-pattern overflow-hidden">
        {/* Warm radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-amber-100/60 to-transparent blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#faf8f5] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-7 relative z-10">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#e8dece] text-xs font-medium text-[#6b5744] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Creator Operating System</span>
            <span className="text-[#d4c4b0]">·</span>
            <span className="text-amber-700 font-semibold">AI Content Engine</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] text-[#1c1611] leading-[1.06]">
            Standardize your<br className="hidden sm:block" />
            content operations.
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-[#6b5744] max-w-xl mx-auto leading-relaxed">
            Transform messy drafts into systematic, high-retention video blueprints — calibrated with custom Content DNA for creators who publish consistently.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              Deploy free workspace
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="#simulator"
              className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-amber-50 text-[#6b5744] text-sm font-medium rounded-lg border border-[#e8dece] transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 text-amber-600" />
              Test simulator
            </a>
          </div>

          <p className="text-xs text-[#9c836a]">
            No credit card required · Free to get started
          </p>
        </div>

        <div className="relative z-10">
          <Hero3DStudio />
        </div>
      </section>

      {/* ── METRICS ── */}
      <section className="py-14 px-6 border-y border-[#e8dece] bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#e8dece] border border-[#e8dece] rounded-2xl overflow-hidden">
          {metrics.map((m, i) => (
            <div key={i} className="px-8 py-7 flex flex-col gap-1 bg-white hover:bg-amber-50/40 transition-colors">
              <div className="text-2xl font-black tracking-tight text-amber-700">{m.stat}</div>
              <div className="text-xs font-bold text-[#1c1611] uppercase tracking-wide">{m.title}</div>
              <p className="text-xs text-[#9c836a] leading-relaxed mt-0.5">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SIMULATOR ── */}
      <section id="simulator" className="py-20 px-6 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
              <Cpu className="w-3.5 h-3.5" />
              Pipeline Playground
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.02em] text-[#1c1611]">
              Try the production engine live.
            </h2>
            <p className="text-[#6b5744] text-sm leading-relaxed">
              Pick a creator archetype and watch CreatorFlow parse raw ideas into hooks, shot lists, and calendar slots.
            </p>
          </div>
          <InteractiveWorkflowSimulator />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 px-6 bg-white border-t border-[#e8dece]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1c1611] text-amber-200 text-xs font-medium">
              <Layers className="w-3.5 h-3.5" />
              Architectural Advantage
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.02em] text-[#1c1611]">
              The operating system for serious creators.
            </h2>
            <p className="text-[#6b5744] text-sm leading-relaxed">
              Eliminate blank-page syndrome and fragmented Google Docs. Everything calibrated for maximum viewer retention.
            </p>
          </div>
          <Bento3DShowcase />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 px-6 border-t border-[#e8dece] bg-white">
        <div className="max-w-2xl mx-auto space-y-10">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.02em] text-[#1c1611]">
              Frequently asked questions.
            </h2>
            <p className="text-[#6b5744] text-sm">
              Everything you need to know about CreatorFlow's AI production architecture.
            </p>
          </div>

          <div className="divide-y divide-[#e8dece]">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full py-4 text-left flex items-center justify-between gap-4 group"
                  >
                    <span className="text-sm font-semibold text-[#1c1611] group-hover:text-amber-700 transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-amber-600" : "text-[#9c836a]"
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
                        className="pb-4 text-sm text-[#6b5744] leading-relaxed"
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
      <section className="py-24 px-6 bg-[#1c1611]">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-[-0.03em] text-[#faf8f5] leading-tight">
            Ready to automate your<br className="hidden sm:block" /> content engine?
          </h2>
          <p className="text-[#9c836a] text-sm sm:text-base leading-relaxed">
            Stop letting ideas die in messy notes. Deploy your CreatorFlow workspace and produce with repeatable consistency.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              Deploy workspace for free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-6 py-3 bg-transparent hover:bg-[#2a2018] text-[#9c836a] hover:text-[#d4bea0] font-medium text-sm rounded-lg border border-[#3a2e20] transition-all flex items-center justify-center"
            >
              Sign in to account
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1c1611] border-t border-[#2e2416] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#6b5744]">

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-amber-600 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-[#d4bea0] text-sm">CreatorFlow AI</span>
            <span className="font-mono text-[#3a2e20]">v0.2.0</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <a href="#simulator" className="hover:text-[#d4bea0] transition-colors">Simulator</a>
            <a href="#features"  className="hover:text-[#d4bea0] transition-colors">Platform</a>
            <Link href="/privacy" className="hover:text-[#d4bea0] transition-colors">Privacy</Link>
            <Link href="/terms"   className="hover:text-[#d4bea0] transition-colors">Terms</Link>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>All systems operational · © {new Date().getFullYear()} CreatorFlow AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
