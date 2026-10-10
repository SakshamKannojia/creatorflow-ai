"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FolderKanban,
  Video,
  Calendar,
  Layers,
  CheckCircle2,
  Settings,
  ArrowRight,
  Database,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// A component for mechanical, non-bouncy reveals
const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// Scramble text effect for a technical feel
const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText(
        text.split("")
          .map((letter, index) => {
            if(index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      if(iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 20);
    
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-white selection:text-black font-sans overflow-x-hidden">
      
      {/* BACKGROUND ELEMENTS - Technical Grid, no blur/gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "linear" }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
        />
        <motion.div 
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/[0.05] origin-top"
        />
      </div>

      {/* HEADER */}
      <header className="relative z-50 bg-[#050505]/80 backdrop-blur-sm border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3, ease: "linear" }}
              className="w-6 h-6 bg-white flex items-center justify-center text-black font-bold text-[10px] tracking-tighter"
            >
              CF
            </motion.div>
            <span className="font-semibold text-sm tracking-tight text-white uppercase">
              CreatorFlow
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors uppercase text-[10px] tracking-widest">Features</a>
            <a href="#workflow" className="hover:text-white transition-colors uppercase text-[10px] tracking-widest">Workflow</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-[10px] tracking-widest uppercase font-medium text-slate-400 hover:text-white transition-colors">
              Log In
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="sm" className="h-8 rounded-sm text-xs font-semibold">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A0A0A] border border-white/[0.1] text-white text-[10px] uppercase tracking-widest mb-8 font-mono"
        >
          <motion.span 
            animate={{ opacity: [1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="w-1.5 h-1.5 bg-white" 
          />
          System Active
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter text-white leading-[1.1]">
          <ScrambleText text="A STRUCTURED WORKSPACE" /> <br />
          <span className="text-slate-500">FOR SOCIAL MEDIA PRODUCTION.</span>
        </h1>
        
        <Reveal delay={0.4} className="mt-8">
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            CreatorFlow provides a centralized environment to draft scripts, organize your content library, and schedule posts across supported platforms.
          </p>
        </Reveal>

        <Reveal delay={0.5} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup">
            <Button variant="primary" size="lg" className="h-12 px-8 rounded-sm relative overflow-hidden group">
              <span className="relative z-10 flex items-center">
                Deploy Workspace
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <motion.div 
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 font-medium">
                Deploy Workspace <ArrowRight className="w-4 h-4 ml-2" />
              </span>
            </Button>
          </Link>
          <a href="#features">
            <Button variant="outline" size="lg" className="h-12 px-8 bg-transparent rounded-sm hover:bg-white/[0.05]">
              View Documentation
            </Button>
          </a>
        </Reveal>
      </section>

      {/* DASHBOARD PREVIEW - Technical Console */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Reveal delay={0.2}>
          <div className="bg-[#050505] border border-white/[0.1] shadow-2xl relative overflow-hidden">
            {/* Scanning line animation */}
            <motion.div 
              animate={{ y: ["0%", "100%", "0%"] }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute left-0 right-0 h-[1px] bg-white/[0.05] z-20 pointer-events-none shadow-[0_0_10px_rgba(255,255,255,0.1)]"
            />
            
            <div className="flex items-center justify-between p-3 border-b border-white/[0.1] bg-[#0A0A0A]">
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-slate-500" />
                <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Workspace Console</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 font-mono border border-white/[0.1] px-1.5 py-0.5">CF-SYS-1.0</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[300px]">
              <div className="col-span-4 p-5 border-r border-white/[0.1] bg-black">
                <div className="text-[10px] text-white mb-6 uppercase tracking-widest border-b border-white/[0.1] pb-2">Parameters</div>
                <div className="space-y-6">
                  {[
                    { label: "Topic Focus", val: "Workspace efficiency" },
                    { label: "Content Format", val: "Standard Video Script" },
                    { label: "Duration", val: "60 seconds" }
                  ].map((p, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1), ease: "easeOut" }}
                      className="space-y-1.5"
                    >
                      <label className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">{p.label}</label>
                      <div className="text-xs text-slate-300 font-mono bg-white/[0.02] p-2 border border-white/[0.05]">
                        {p.val}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="col-span-8 p-5 bg-[#050505]">
                <div className="text-[10px] text-white mb-6 uppercase tracking-widest border-b border-white/[0.1] pb-2">Standard Output</div>
                <div className="text-xs text-slate-300 font-mono leading-loose relative">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    transition={{ duration: 2, ease: "linear" }}
                    className="overflow-hidden"
                  >
                    <span className="text-slate-600">[SCENE 1: STATIC CAMERA, OFFICE DESK]</span><br/><br/>
                    <strong className="text-white">AUDIO:</strong> "A structured environment reduces cognitive load by 40%."<br/><br/>
                    <span className="text-slate-600">[VISUAL: Cut to clean workspace. Show timeline interface.]</span><br/><br/>
                    <strong className="text-white">AUDIO:</strong> "When your tools are standardized, your output scales infinitely. Here is the exact architecture."<br/>
                  </motion.div>
                  <motion.span 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="inline-block w-2 h-4 bg-white align-middle mt-2" 
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CORE CAPABILITIES - Mechanical Grid */}
      <section id="features" className="relative z-10 py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl space-y-4 mb-16 border-l-2 border-white pl-6">
            <h2 className="text-3xl font-semibold tracking-tight text-white uppercase">Core Capabilities</h2>
            <p className="text-sm text-slate-400 font-mono">
              Engineered tools to standardize the content production lifecycle.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.1] border border-white/[0.1]">
          {[
            { icon: <Settings className="w-5 h-5" />, title: "Parameter Config", desc: "Define strict guidelines for tone, length, and format." },
            { icon: <Database className="w-5 h-5" />, title: "Asset Library", desc: "Store, tag, and retrieve past scripts in a searchable database." },
            { icon: <Calendar className="w-5 h-5" />, title: "Scheduling Matrix", desc: "Map out publication dates using a grid-based calendar view." },
            { icon: <Layers className="w-5 h-5" />, title: "Version Control", desc: "Keep an immutable history of script revisions and modifications." },
            { icon: <Video className="w-5 h-5" />, title: "Production Blueprints", desc: "Generate structured documents containing visual directions." },
            { icon: <CheckCircle2 className="w-5 h-5" />, title: "Format Validation", desc: "Ensure outputs adhere to platform-specific character limits." }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="p-8 bg-[#050505] space-y-4 hover:bg-[#0A0A0A] transition-colors relative group"
            >
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="text-white">
                {item.icon}
              </div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WORKFLOW SECTION */}
      <section id="workflow" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/[0.1]">
        <Reveal>
          <div className="max-w-2xl space-y-4 mb-16 border-l-2 border-white pl-6">
            <h2 className="text-3xl font-semibold tracking-tight text-white uppercase">Standardized Workflow</h2>
            <p className="text-sm text-slate-400 font-mono">A linear, predictable process for taking concepts to final publication.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "01", title: "Input Parameters", desc: "Provide reference material, target platform, and technical constraints." },
            { step: "02", title: "Generate Draft", desc: "Produce the initial copy structured exactly to your defined specifications." },
            { step: "03", title: "Review & Schedule", desc: "Approve the draft, store it in the database, and assign a publication date." }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="p-6 border border-white/[0.1] bg-[#0A0A0A] group relative overflow-hidden"
            >
              <motion.div 
                className="absolute inset-0 bg-white"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="relative z-10 space-y-4 group-hover:text-black transition-colors duration-300">
                <span className="text-xs font-mono text-slate-500 group-hover:text-black font-bold border border-slate-500 group-hover:border-black px-1.5 py-0.5">{item.step}</span>
                <h3 className="text-sm font-semibold uppercase">{item.title}</h3>
                <p className="text-xs leading-relaxed font-mono">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 bg-black py-12 border-t border-white/[0.1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] text-slate-500 uppercase tracking-widest font-mono">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-white flex items-center justify-center text-black font-bold">
              CF
            </div>
            <span className="font-bold text-white">CreatorFlow</span>
          </div>
          
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms and Conditions</Link>
          </div>

          <div>
            &copy; {new Date().getFullYear()} CreatorFlow. System Online.
          </div>
        </div>
      </footer>
    </div>
  );
}
