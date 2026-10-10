import React from "react";
import Link from "next/link";
import {
  FolderKanban,
  Video,
  Calendar,
  Layers,
  CheckCircle2,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-slate-200 selection:bg-slate-800 selection:text-white">
      {/* NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 bg-black border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white flex items-center justify-center text-black font-bold text-xs">
              CF
            </div>
            <span className="font-bold text-sm tracking-tight text-white">
              CreatorFlow
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#workflow" className="hover:text-white transition-colors">Workflow</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="sm">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center border-b border-slate-800">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          A structured workspace for social media content generation and planning.
        </h1>
        <p className="mt-6 text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          CreatorFlow provides a centralized environment to draft scripts, organize your content library, and schedule posts across supported platforms.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
          </Link>
          <a href="#features">
            <Button variant="outline" size="lg">
              View Documentation
            </Button>
          </a>
        </div>
      </section>

      {/* 2. DASHBOARD PREVIEW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-slate-800">
        <div className="rounded-md bg-slate-900 border border-slate-800 p-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs text-slate-400 font-medium">CreatorFlow Workspace</span>
            <span className="px-2 py-0.5 rounded-sm bg-slate-800 text-slate-300 text-[10px] uppercase tracking-wider">
              System Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 rounded-md bg-black border border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-white">Input Parameters</div>
              <div className="p-2 bg-slate-900 text-xs text-slate-300 border border-slate-800 font-mono">
                Topic: Workspace efficiency
              </div>
              <div className="flex gap-2 text-[10px] uppercase text-slate-400 font-medium">
                <span>Format: Video Script</span>
                <span>Length: 60s</span>
              </div>
            </div>

            <div className="p-4 rounded-md bg-black border border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-white">System Output</div>
              <div className="p-2 bg-slate-900 text-xs text-slate-300 border border-slate-800 font-mono">
                [Scene 1] Camera positioned at desk.
                "A structured environment reduces cognitive load."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURES SECTION */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">Core Capabilities</h2>
          <p className="text-sm text-slate-400">
            Tools designed to standardize the content production lifecycle.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Settings className="w-5 h-5" />,
              title: "Parameter Configuration",
              desc: "Define strict guidelines for tone, length, and format before generating text."
            },
            {
              icon: <FolderKanban className="w-5 h-5" />,
              title: "Asset Library",
              desc: "Store, tag, and retrieve past scripts and captions in a searchable database."
            },
            {
              icon: <Calendar className="w-5 h-5" />,
              title: "Scheduling Matrix",
              desc: "Map out publication dates using a grid-based calendar view."
            },
            {
              icon: <Layers className="w-5 h-5" />,
              title: "Version Control",
              desc: "Keep a history of script revisions and modifications."
            },
            {
              icon: <Video className="w-5 h-5" />,
              title: "Production Blueprints",
              desc: "Generate structured documents containing visual directions and voiceovers."
            },
            {
              icon: <CheckCircle2 className="w-5 h-5" />,
              title: "Format Validation",
              desc: "Ensure outputs adhere to platform-specific character limits and structures."
            }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-md bg-slate-900/50 border border-slate-800 space-y-4">
              <div className="text-slate-400">{item.icon}</div>
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WORKFLOW SECTION */}
      <section id="workflow" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-800">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">Standardized Workflow</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-md border border-slate-800 space-y-3 bg-slate-900/30">
            <span className="text-xs font-mono text-slate-500">Step 1</span>
            <h3 className="text-sm font-semibold text-white">Input Parameters</h3>
            <p className="text-sm text-slate-400">Provide reference material and technical constraints.</p>
          </div>
          <div className="p-6 rounded-md border border-slate-800 space-y-3 bg-slate-900/30">
            <span className="text-xs font-mono text-slate-500">Step 2</span>
            <h3 className="text-sm font-semibold text-white">Generate Draft</h3>
            <p className="text-sm text-slate-400">Produce the initial copy based on provided constraints.</p>
          </div>
          <div className="p-6 rounded-md border border-slate-800 space-y-3 bg-slate-900/30">
            <span className="text-xs font-mono text-slate-500">Step 3</span>
            <h3 className="text-sm font-semibold text-white">Review and Schedule</h3>
            <p className="text-sm text-slate-400">Approve the draft and assign a publication date.</p>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-slate-800 flex items-center justify-center text-white font-bold text-[10px]">
              CF
            </div>
            <span className="font-semibold text-white">CreatorFlow</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms and Conditions</Link>
          </div>

          <div>
            &copy; {new Date().getFullYear()} CreatorFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
