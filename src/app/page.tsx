"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Layers, 
  Dna, 
  Video, 
  CalendarDays, 
  Zap, 
  ShieldCheck, 
  Star, 
  TrendingUp, 
  CheckCircle2, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Flame,
  Clock,
  Compass,
  Cpu
} from "lucide-react";

import Hero3DCanvas from "@/components/landing/Hero3DCanvas";
import Hero3DStudio from "@/components/landing/Hero3DStudio";
import InteractiveWorkflowSimulator from "@/components/landing/InteractiveWorkflowSimulator";
import Bento3DShowcase from "@/components/landing/Bento3DShowcase";
import Testimonials3D from "@/components/landing/Testimonials3D";
import Card3DTilt from "@/components/landing/Card3DTilt";

// Clean wrapper component without text movement or animation
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
      <div className="min-h-screen bg-[#070b14] flex items-center justify-center text-indigo-400">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const faqs = [
    {
      q: "How does CreatorFlow's Content DNA differ from regular AI chatbots?",
      a: "Generic AI chatbots output repetitive, robotic copy that sounds identical across every user. CreatorFlow's Content DNA extracts your exact sentence cadence, vocabulary rules, banned cliches, and storytelling structure, ensuring every generated script sounds indistinguishable from your own writing."
    },
    {
      q: "Can I export directly into my teleprompter and editing software?",
      a: "Yes! CreatorFlow includes a built-in auto-scrolling smart teleprompter with cadence guidance. You can also export your visual blueprints, shot lists, and script drafts to Notion, Markdown, Google Docs, or copy them formatted with one click."
    },
    {
      q: "What video formats are supported?",
      a: "CreatorFlow specializes in short-form and high-retention video: YouTube Shorts, Instagram Reels, TikTok, LinkedIn Video, as well as multi-part longform YouTube outlines with visual B-roll cues."
    },
    {
      q: "Is there a free trial to test the workflow?",
      a: "Yes, you can sign up and start generating right away without a credit card. You'll get access to the live Script Studio, Content DNA setup, and production pipeline."
    }
  ];

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-x-hidden bg-grid-pattern">
      
      {/* 3D WebGL Background Layer */}
      <Hero3DCanvas />

      {/* Ambient Gradient Flares */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-indigo-600/15 via-blue-600/10 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="fixed top-[60vh] -left-[200px] w-[600px] h-[600px] bg-cyan-600/10 blur-[140px] pointer-events-none -z-10" />

      {/* TOP NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#070B14]/80 backdrop-blur-xl border-b border-indigo-950/60 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-600/30 group-hover:shadow-indigo-500/50 transition-all">
              <div className="w-full h-full bg-[#080d1a] rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1">
                CreatorFlow <span className="text-indigo-400 font-mono text-xs">AI</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#simulator" className="text-slate-400 hover:text-indigo-300 transition-colors">
              Workflow Simulator
            </a>
            <a href="#features" className="text-slate-400 hover:text-indigo-300 transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-slate-400 hover:text-indigo-300 transition-colors">
              Creators
            </a>
            <a href="#faq" className="text-slate-400 hover:text-indigo-300 transition-colors">
              FAQ
            </a>
          </div>

          {/* Nav Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/login"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold rounded-xl group bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 hover:from-indigo-600 hover:via-blue-600 hover:to-cyan-500 shadow-lg shadow-indigo-600/25 active:scale-95 transition-all"
            >
              <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-[#080d1a] group-hover:bg-opacity-0 rounded-[10px] text-white flex items-center gap-1.5 font-bold">
                Deploy Workspace <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button 
            className="md:hidden text-slate-300 p-2" 
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
              className="md:hidden border-b border-indigo-950 bg-[#070b14]/95 backdrop-blur-2xl px-6 py-6 space-y-4"
            >
              <div className="flex flex-col gap-3 font-medium text-sm">
                <a href="#simulator" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 py-1">Workflow Simulator</a>
                <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 py-1">Features</a>
                <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 py-1">Creators</a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 py-1">FAQ</a>
              </div>
              <div className="pt-4 border-t border-indigo-950 flex flex-col gap-3">
                <a href="/login" className="w-full text-center py-2.5 rounded-lg border border-indigo-950 text-slate-200 text-sm font-semibold">
                  Sign In
                </a>
                <a href="/signup" className="w-full text-center py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30">
                  Deploy Workspace
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-7 relative z-10">
          
          {/* Main Title */}
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.08]">
              Standardise Your <br className="hidden sm:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-indigo-400 to-cyan-300">
                Content Operations.
              </span>
            </h1>
          </FadeIn>

          {/* Subtitle */}
          <FadeIn delay={0.2}>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Transform messy drafts and creative chaos into systematic, high-retention video blueprints. 
              Built with custom Content DNA for creators who scale like software teams.
            </p>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="/signup"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm rounded-xl transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 group hover:scale-[1.02]"
              >
                <span>Deploy Free Workspace</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#simulator"
                className="w-full sm:w-auto px-7 py-4 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm rounded-xl border border-indigo-900/60 transition-all flex items-center justify-center gap-2 backdrop-blur-md"
              >
                <Play className="w-4 h-4 text-indigo-400 fill-indigo-400/20" />
                <span>Test Workflow Simulator</span>
              </a>
            </div>
          </FadeIn>
        </div>

        {/* 3D Floating Hero Console */}
        <FadeIn delay={0.5}>
          <Hero3DStudio />
        </FadeIn>
      </section>

      {/* INTERACTIVE 3D SIMULATOR SECTION */}
      <section id="simulator" className="py-24 px-6 relative border-t border-indigo-950/60">
        <div className="max-w-6xl mx-auto space-y-12">
          <FadeIn>
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Realtime Pipeline Playground
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Try The Production Engine Live
              </h2>
              <p className="text-slate-400 text-base sm:text-lg">
                Pick a creator archetype below and witness how CreatorFlow parses your idea into Content DNA, scripted hooks, B-roll checklists, and calendar distribution.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <InteractiveWorkflowSimulator />
          </FadeIn>
        </div>
      </section>

      {/* CORE 3D BENTO FEATURES SECTION */}
      <section id="features" className="py-24 px-6 relative border-t border-indigo-950/60 bg-[#060a14]/60">
        <div className="max-w-6xl mx-auto space-y-14">
          <FadeIn>
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5 text-indigo-400" /> Architectural Advantage
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                The Operating System for Professional Creators
              </h2>
              <p className="text-slate-400 text-base sm:text-lg">
                Eliminate blank-page syndrome and fragmented Google Docs. Everything is calibrated for maximum viewer retention.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Bento3DShowcase />
          </FadeIn>
        </div>
      </section>

      {/* HIGH-IMPACT METRICS STRIP */}
      <section className="py-20 px-6 border-y border-indigo-950/60 bg-gradient-to-b from-[#080d1a] to-[#060a14]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { stat: "+340%", title: "Viewer Retention Rate", desc: "Hooks engineered against 2.4M viral videos." },
              { stat: "4.2x", title: "Faster Turnaround", desc: "From idea to ready-to-shoot blueprint in under 3 minutes." },
              { stat: "Zero", title: "Creative Burnout", desc: "Infinite pipeline of high-intent topics calibrated to your DNA." },
              { stat: "100%", title: "Voice Consistency", desc: "Every word follows your custom tone, pace, and rhythm." }
            ].map((metric, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Card3DTilt intensity={8} glareOpacity={0.15} className="h-full">
                  <div className="p-6 rounded-2xl bg-slate-900/70 border border-indigo-900/30 h-full flex flex-col justify-between">
                    <div>
                      <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-400 mb-2 font-mono">
                        {metric.stat}
                      </div>
                      <div className="text-sm font-bold text-white mb-2">{metric.title}</div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{metric.desc}</p>
                  </div>
                </Card3DTilt>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3D TESTIMONIALS */}
      <section id="testimonials" className="py-28 px-6 relative">
        <div className="max-w-6xl mx-auto space-y-14">
          <FadeIn>
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Real Creator Results
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Trusted by Creators with Millions of Views
              </h2>
              <p className="text-slate-400 text-base sm:text-lg">
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
      <section id="faq" className="py-28 px-6 border-t border-indigo-950/60">
        <div className="max-w-4xl mx-auto space-y-12">
          <FadeIn>
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-400 text-base">
                Everything you need to know about CreatorFlow's AI production architecture.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <FadeIn key={idx} delay={idx * 0.05}>
                  <div
                    className={`rounded-2xl border transition-all ${
                      isOpen
                        ? "bg-slate-900/80 border-indigo-500/40 shadow-lg shadow-indigo-950/30"
                        : "bg-slate-900/40 border-indigo-950 hover:border-indigo-900"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4"
                    >
                      <span className="text-base sm:text-lg font-bold text-white">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-indigo-400 transition-transform duration-300 flex-shrink-0 ${
                          isOpen ? "rotate-180" : ""
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
                          className="px-6 pb-6 text-slate-300 text-sm leading-relaxed"
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

      {/* FINAL HIGH-CONVERSION 3D CTA */}
      <section className="py-32 px-6 relative overflow-hidden border-t border-indigo-950/60">
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <FadeIn>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1px] mx-auto shadow-2xl shadow-indigo-600/40">
              <div className="w-full h-full bg-[#080d1a] rounded-[15px] flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-indigo-400" />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              Ready to Upgrade From a Hobbyist <br />
              to an <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-400 to-cyan-300">Infinite Studio</span>?
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Stop letting brilliant ideas die in messy notes. Deploy your CreatorFlow workspace now and produce with military precision.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="/signup"
                className="w-full sm:w-auto px-9 py-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-sm rounded-xl transition-all shadow-2xl shadow-indigo-600/40 flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <span>Deploy Workspace For Free</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/login"
                className="w-full sm:w-auto px-8 py-4 bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-sm rounded-xl border border-indigo-900/60 transition-all flex items-center justify-center"
              >
                Sign In to Account
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-indigo-950/80 py-14 px-6 bg-[#04060c] text-sm text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <span className="font-bold text-white tracking-tight">CreatorFlow AI Inc.</span>
            <span className="text-xs text-slate-600 font-mono">v3.0.4</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-medium">
            <a href="#simulator" className="hover:text-white transition-colors">Workflow Simulator</a>
            <a href="#features" className="hover:text-white transition-colors">Platform</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
            All Systems Operational • © {new Date().getFullYear()} CreatorFlow AI.
          </div>
        </div>
      </footer>
    </div>
  );
}
