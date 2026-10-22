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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
      {testimonials.map((t, idx) => (
        <Card3DTilt key={t.handle} intensity={5} glareOpacity={0.04} className="h-full">
          <div
            className={`h-full rounded-2xl p-6 border flex flex-col justify-between card-hover ${
              idx === 1
                ? "bg-[#2a1a08] border-[#5c3d22]/30"
                : "bg-white border-[#e8dece]"
            }`}
          >
            <div>
              {/* Metric badge */}
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mb-5 ${
                  idx === 1
                    ? "bg-[#5c3d22]/40 text-[#d4bea0] border border-[#5c3d22]/30"
                    : "bg-[#f5f0e8] text-[#6b4226] border border-[#d8cdb8]"
                }`}
              >
                <TrendingUp className="w-3 h-3" />
                {t.metric}
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${idx === 1 ? "text-[#c4a882]" : "text-[#8c6a47]"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className={`text-sm leading-relaxed mb-5 ${idx === 1 ? "text-[#ede7da]" : "text-[#6b5744]"}`}>
                &quot;{t.quote}&quot;
              </p>
            </div>

            {/* Author */}
            <div className={`flex items-center gap-3 pt-4 border-t ${idx === 1 ? "border-[#5c3d22]/30" : "border-[#f0ebe2]"}`}>
              <div
                className={`w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center flex-shrink-0 ${
                  idx === 1
                    ? "bg-[#7c5533] text-white"
                    : "bg-[#1c1611] text-[#d4bea0]"
                }`}
              >
                {t.initials}
              </div>
              <div className="min-w-0">
                <div className={`text-sm font-semibold truncate ${idx === 1 ? "text-[#ede7da]" : "text-[#1c1611]"}`}>
                  {t.name}
                </div>
                <div className={`text-xs truncate ${idx === 1 ? "text-[#9c836a]" : "text-[#9c836a]"}`}>
                  {t.handle} · {t.channel}
                </div>
              </div>
            </div>
          </div>
        </Card3DTilt>
      ))}
    </div>
  );
}
