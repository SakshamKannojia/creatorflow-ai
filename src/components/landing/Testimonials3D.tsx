"use client";

import React from "react";
import { Star, TrendingUp } from "lucide-react";
import Card3DTilt from "./Card3DTilt";

export default function Testimonials3D() {
  const testimonials = [
    {
      name: "Marcus Vance",
      handle: "@marcusvance_tech",
      channel: "840K Subscribers on YouTube",
      metric: "+340% Retention on 60s Shorts",
      avatarBg: "bg-indigo-600",
      initials: "MV",
      quote:
        "Before CreatorFlow, my team spent two whole days just arguing over script hooks and b-roll lists. Now we generate full blueprints in 5 minutes, shoot in one take, and our retention spiked past 85%.",
    },
    {
      name: "Elena Rostova",
      handle: "@elenacodes",
      channel: "420K Followers on TikTok & IG",
      metric: "From 1 Video/Week to 5/Week",
      avatarBg: "bg-sky-600",
      initials: "ER",
      quote:
        "The Content DNA calibration is terrifyingly accurate. It doesn't sound like robotic copy; it captures my exact punchy sentence structure and dry humor. Absolute game changer.",
    },
    {
      name: "David Sterling",
      handle: "@davidgrowth",
      channel: "Founder, SaaS Weekly (180K Subs)",
      metric: "$42K Inbound ARR from Organic",
      avatarBg: "bg-violet-600",
      initials: "DS",
      quote:
        "We replaced three separate apps (Notion, an AI copywriter, and our teleprompter) with just CreatorFlow. It operates like linear production software for serious creators.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {testimonials.map((t) => (
        <Card3DTilt key={t.handle} intensity={8} glareOpacity={0.06} className="h-full">
          <div className="h-full rounded-2xl p-7 border border-slate-200/90 bg-white flex flex-col justify-between shadow-[0_4px_25px_-5px_rgba(0,0,0,0.04)]">
            <div>
              {/* Metric Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold mb-5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                {t.metric}
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-700 text-sm leading-relaxed mb-6 font-normal">
                &quot;{t.quote}&quot;
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
              <div
                className={`w-10 h-10 rounded-full ${t.avatarBg} text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs`}
              >
                {t.initials}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-slate-900 truncate">
                  {t.name}
                </div>
                <div className="text-xs text-slate-500 truncate">
                  {t.handle} • {t.channel}
                </div>
              </div>
            </div>
          </div>
        </Card3DTilt>
      ))}
    </div>
  );
}
