"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import Card3DTilt from "./Card3DTilt";

export default function Testimonials3D() {
  const testimonials = [
    {
      name: "Marcus Vance",
      handle: "@marcusvance_tech",
      channel: "840K Subscribers on YouTube",
      metric: "+340% Retention on 60s Shorts",
      initials: "MV",
      quote:
        "Before CreatorFlow, my team spent two whole days just arguing over script hooks and b-roll lists. Now we generate full blueprints in 5 minutes, shoot in one take, and our retention spiked past 85%.",
    },
    {
      name: "Elena Rostova",
      handle: "@elenacodes",
      channel: "420K Followers on TikTok & IG",
      metric: "From 1 Video/Week to 5/Week",
      initials: "ER",
      quote:
        "The Content DNA calibration is terrifyingly accurate. It doesn't sound like robotic copy; it captures my exact punchy sentence structure and dry humor. Absolute game changer.",
    },
    {
      name: "David Sterling",
      handle: "@davidgrowth",
      channel: "Founder, SaaS Weekly (180K Subs)",
      metric: "$42K Inbound ARR from Organic",
      initials: "DS",
      quote:
        "We replaced three separate apps (Notion, an AI copywriter, and our teleprompter) with just CreatorFlow. It operates like linear production software for serious creators.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
      {testimonials.map((t, idx) => {
        const isFeatured = idx === 1;
        return (
          <Card3DTilt key={t.handle} intensity={5} glareOpacity={0.04} className="h-full">
            <div
              className={`h-full rounded-2xl p-7 border flex flex-col justify-between card-hover relative overflow-hidden transition-all duration-300 ${
                isFeatured
                  ? "dark:bg-gradient-to-b dark:from-slate-900 dark:to-amber-950/30 dark:border-amber-700/50 bg-[#2a1a08] border-[#5c3d22]/30 shadow-lg"
                  : "dark:bg-slate-900/80 dark:border-slate-800 bg-white border-[#e8dece] shadow-sm"
              }`}
            >
              {isFeatured && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              )}

              <div>
                {/* Metric badge */}
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-5 ${
                    isFeatured
                      ? "dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700/50 bg-[#5c3d22]/40 text-[#d4bea0] border border-[#5c3d22]/30"
                      : "dark:bg-slate-800 dark:text-emerald-400 dark:border-slate-700 bg-emerald-50 text-emerald-800 border border-emerald-200/60"
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  {t.metric}
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        isFeatured
                          ? "text-amber-400"
                          : "dark:text-amber-400 text-amber-500"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p
                  className={`text-sm leading-relaxed mb-6 font-normal ${
                    isFeatured
                      ? "dark:text-slate-200 text-[#ede7da]"
                      : "dark:text-slate-300 text-[#544232]"
                  }`}
                >
                  &quot;{t.quote}&quot;
                </p>
              </div>

              {/* Author */}
              <div
                className={`flex items-center gap-3 pt-4 border-t ${
                  isFeatured
                    ? "dark:border-slate-800 border-[#5c3d22]/30"
                    : "dark:border-slate-800 border-[#f0ebe2]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm ${
                    isFeatured
                      ? "bg-amber-600 text-white"
                      : "dark:bg-slate-800 dark:text-amber-400 bg-amber-100 text-amber-900 border dark:border-slate-700 border-amber-200"
                  }`}
                >
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <div
                    className={`text-sm font-semibold truncate ${
                      isFeatured ? "dark:text-white text-[#ede7da]" : "dark:text-white text-[#1c1611]"
                    }`}
                  >
                    {t.name}
                  </div>
                  <div
                    className={`text-xs truncate ${
                      isFeatured ? "dark:text-amber-300/70 text-[#9c836a]" : "dark:text-slate-400 text-[#9c836a]"
                    }`}
                  >
                    {t.handle} · {t.channel}
                  </div>
                </div>
              </div>
            </div>
          </Card3DTilt>
        );
      })}
    </div>
  );
}
