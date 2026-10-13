"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Layers, 
  Star, 
  Menu, 
  X, 
  ChevronDown, 
  Cpu
} from "lucide-react";

import Hero3DCanvas from "@/components/landing/Hero3DCanvas";
import Hero3DStudio from "@/components/landing/Hero3DStudio";
import InteractiveWorkflowSimulator from "@/components/landing/InteractiveWorkflowSimulator";
import Bento3DShowcase from "@/components/landing/Bento3DShowcase";
import Testimonials3D from "@/components/landing/Testimonials3D";
import Card3DTilt from "@/components/landing/Card3DTilt";

const FadeIn = ({ 
  children, 
  className = ""
}: { 
  children: React.ReactNode; 
  delay?: number; 
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center text-indigo-600">
        <div className="w-7 h-7 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const faqs = [
    {
      q: "How does CreatorFlow's Content DNA differ from regular AI chatbots?",
      a: "Generic AI chatbots output repetitive, robotic copy that sounds identical across every user. CreatorFlow's Content DNA extracts your exact sentence cadence, vocabulary rules, banned cliches, and storytelling structure, ensuring every generated script sounds indistinguishable from your own writing."
    },
    {
      q: "Can I export directly into my production and editing workflows?",
      a: "Yes! You can export your scripts, visual blueprints, and shot lists directly to Notion, Markdown, Google Docs, or copy them formatted with one click for easy recording and teleprompter apps."
    },
    {
      q: "What video formats are supported?",
      a: "CreatorFlow specializes in short-form and high-retention video: YouTube Shorts, Instagram Reels, TikTok, LinkedIn Video, as well as multi-part longform YouTube outlines with visual B-roll cues."
    },
    {
      q: "Is there a free trial to test the workflow?",
      a: "Yes, you can sign up and start generating right away without a credit card. You'll get instant access to the Script Generator, Content DNA calibration, and production pipeline."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-indigo-500/20 selection:text-indigo-900 relative overflow-x-hidden bg-dot-pattern">
      
      {/* Soft Ethereal 3D WebGL Background Layer */}
      <Hero3DCanvas />

      {/* Ambient Pastel Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-indigo-100/50 via-sky-50/40 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="fixed top-[55vh] -left-[200px] w-[600px] h-[600px] bg-indigo-50/50 blur-[150px] pointer-events-none -z-10" />

      {/* TOP NAVIGATION — MINIMAL LIGHT */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-slate-900 flex items-center gap-1">
                CreatorFlow <span className="text-indigo-600 font-mono text-xs">AI</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#simulator" className="hover:text-slate-900 transition-colors">
              Simulator
            </a>
            <a href="#features" className="hover:text-slate-900 transition-colors">
              Features
            </a>
            <a href="#testimonials" className="hover:text-slate-900 transition-colors">
              Creators
            </a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">
              FAQ
            </a>
          </div>

          {/* Nav Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-all active:scale-[0.98] gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button 
            className="md:hidden text-slate-700 p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-slate-200 bg-white/98 backdrop-blur-2xl px-6 py-5 space-y-4 shadow-lg"
            >
              <div className="flex flex-col gap-3 font-medium text-sm text-slate-700">
                <a href="#simulator" onClick={() => setMobileMenuOpen(false)} className="py-1">Simulator</a>
                <a href="#features" onClick={() => setMobileMenuOpen(false)} className="py-1">Features</a>
                <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="py-1">Creators</a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-1">FAQ</a>
              </div>
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                <Link href="/login" className="w-full text-center py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold">
                  Sign In
                </Link>
                <Link href="/signup" className="w-full text-center py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold shadow-xs">
                  Get Started
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION — MODERN MINIMAL */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          
          {/* Subtle Minimal Pill Badge */}
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-medium text-slate-700 mx-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Creator Operating System</span>
              <span className="text-slate-300">•</span>
              <span className="text-indigo-600 font-semibold">Gemini 1.5 Pro</span>
            </div>
          </FadeIn>

          {/* Main Title */}
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-950 leading-[1.08]">
              Standardize Your <br className="hidden sm:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-indigo-700 to-sky-600">
                Content Operations.
              </span>
            </h1>
          </FadeIn>

          {/* Subtitle */}
          <FadeIn delay={0.2}>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Transform messy drafts and creative chaos into systematic, high-retention video blueprints. 
              Calibrated with custom Content DNA for creators who publish consistently.
            </p>
          </FadeIn>

          {/* Minimal Modern Buttons */}
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-xl transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>Deploy Free Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#simulator"
                className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm rounded-xl border border-slate-200/90 shadow-xs transition-all flex items-center justify-center gap-2 hover:border-slate-300 active:scale-[0.98]"
              >
                <Play className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600/10" />
                <span>Test Simulator</span>
              </a>
            </div>
          </FadeIn>
        </div>

        {/* 3D Modern Studio Console */}
        <FadeIn delay={0.4}>
          <Hero3DStudio />
        </FadeIn>
      </section>

      {/* INTERACTIVE WORKFLOW SIMULATOR SECTION */}
      <section id="simulator" className="py-20 px-6 relative border-t border-slate-200/70 bg-white/50">
        <div className="max-w-6xl mx-auto space-y-10">
          <FadeIn>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 text-xs font-semibold">
                <Cpu className="w-3.5 h-3.5 text-indigo-600" /> Pipeline Playground
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Try The Production Engine Live
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Pick a creator archetype below and witness how CreatorFlow parses raw ideas into Content DNA, scripted hooks, B-roll checklists, and calendar distribution.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <InteractiveWorkflowSimulator />
          </FadeIn>
        </div>
      </section>

      {/* CORE BENTO FEATURES SECTION */}
      <section id="features" className="py-20 px-6 relative border-t border-slate-200/70 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto space-y-12">
          <FadeIn>
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 text-xs font-semibold">
                <Layers className="w-3.5 h-3.5 text-indigo-600" /> Architectural Advantage
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                The Operating System for Professional Creators
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Eliminate blank-page syndrome and fragmented Google Docs. Everything is calibrated for maximum viewer retention.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Bento3DShowcase />
          </FadeIn>
        </div>
      </section>

      {/* METRICS STRIP — MINIMAL LIGHT */}
      <section className="py-16 px-6 border-y border-slate-200/80 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { stat: "+340%", title: "Viewer Retention Rate", desc: "Hooks engineered against 2.4M viral short-form videos." },
              { stat: "4.2x", title: "Faster Turnaround", desc: "From idea to ready-to-shoot blueprint in under 3 minutes." },
              { stat: "Zero", title: "Creative Burnout", desc: "Infinite pipeline of high-intent topics calibrated to your DNA." },
              { stat: "100%", title: "Voice Consistency", desc: "Every word follows your custom tone, pace, and rhythm." }
            ].map((metric, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Card3DTilt intensity={6} glareOpacity={0.05} className="h-full">
                  <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 h-full flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="text-3xl font-extrabold text-indigo-600 mb-1 font-mono tracking-tight">
                        {metric.stat}
                      </div>
                      <div className="text-sm font-bold text-slate-900 mb-1.5">{metric.title}</div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{metric.desc}</p>
                  </div>
                </Card3DTilt>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 px-6 relative bg-[#fafafa]">
        <div className="max-w-6xl mx-auto space-y-12">
          <FadeIn>
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-800 text-xs font-semibold">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Real Creator Results
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Trusted by Creators with Millions of Views
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                See how top operators replaced fragile workflows with CreatorFlow's systematic production matrix.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Testimonials3D />
          </FadeIn>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 px-6 border-t border-slate-200/80 bg-white">
        <div className="max-w-3xl mx-auto space-y-10">
          <FadeIn>
            <div className="text-center space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600 text-sm">
                Everything you need to know about CreatorFlow's AI production architecture.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <FadeIn key={idx} delay={idx * 0.05}>
                  <div
                    className={`rounded-xl border transition-all ${
                      isOpen
                        ? "bg-slate-50/70 border-indigo-200 shadow-xs"
                        : "bg-white border-slate-200/80 hover:border-slate-300"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4"
                    >
                      <span className="text-base font-bold text-slate-900">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? "rotate-180 text-indigo-600" : ""
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
                          className="px-5 pb-5 text-slate-600 text-sm leading-relaxed"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION — MINIMAL LIGHT */}
      <section className="py-24 px-6 relative border-t border-slate-200/80 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <FadeIn>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-150 flex items-center justify-center text-indigo-600 mx-auto shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 leading-tight">
              Ready to Upgrade to an <br className="hidden sm:block" />
              <span className="text-indigo-600">Automated Content Engine</span>?
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Stop letting ideas die in messy notes. Deploy your CreatorFlow workspace now and produce with repeatable consistency.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>Deploy Workspace For Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl border border-slate-200 shadow-xs transition-all flex items-center justify-center active:scale-[0.98]"
              >
                Sign In to Account
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER — MINIMAL LIGHT */}
      <footer className="border-t border-slate-200 py-10 px-6 bg-white text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-slate-900 tracking-tight text-sm">CreatorFlow AI</span>
            <span className="text-[11px] text-slate-400 font-mono">v0.2.0</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-medium text-slate-600">
            <a href="#simulator" className="hover:text-slate-900 transition-colors">Simulator</a>
            <a href="#features" className="hover:text-slate-900 transition-colors">Platform</a>
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
          </div>

          <div className="flex items-center gap-2 text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            All Systems Operational • © {new Date().getFullYear()} CreatorFlow AI
          </div>
        </div>
      </footer>
    </div>
  );
}
