import { describe, it, expect } from "vitest";
import { buildContentPrompt } from "@/lib/ai/prompts";
import { GenerateRequestPayload, ContentDNA } from "@/types/database";

describe("buildContentPrompt", () => {
  const basePayload: GenerateRequestPayload = {
    topic: "AI Agents in 2026",
    platform: "LinkedIn",
    contentType: "LinkedIn Post",
    tone: "Professional",
    language: "English",
    targetAudience: "Tech Leaders",
    length: "Medium",
    cta: "Direct",
    keywords: ["AI", "Automation"],
  };

  it("builds prompt for standard post without Content DNA", () => {
    const { systemInstruction, userPrompt } = buildContentPrompt(basePayload);

    expect(systemInstruction).toContain("CreatorFlow AI");
    expect(systemInstruction).toContain("Rules:");
    expect(userPrompt).toContain("Platform: LinkedIn");
    expect(userPrompt).toContain("Topic / Product: AI Agents in 2026");
    expect(userPrompt).toContain("AI, Automation");
    expect(userPrompt).toContain("LinkedIn Post");
    expect(userPrompt).not.toContain("USER'S CONTENT DNA");
  });

  it("builds prompt for Reel Script with scene breakdown instructions", () => {
    const reelPayload: GenerateRequestPayload = {
      ...basePayload,
      platform: "Instagram",
      contentType: "Reel Script",
      reelDuration: "30 seconds",
      reelFormat: "Talking Head",
    };

    const { userPrompt } = buildContentPrompt(reelPayload);

    expect(userPrompt).toContain("REEL / SHORT-FORM VIDEO SCRIPT");
    expect(userPrompt).toContain("Duration Target: 30 seconds");
    expect(userPrompt).toContain("Video Format: Talking Head");
    expect(userPrompt).toContain("reelScenes");
    expect(userPrompt).toContain("bRollSuggestions");
  });

  it("injects Content DNA personalization directives when enabled", () => {
    const dna = {
      tone: "Witty & Authoritative",
      language: "English",
      vocabulary_style: "Punchy, no fluff",
      hook_style: "Contrarian truth",
      cta_style: "Ask for opinions in comments",
      emoji_usage: "Minimal (1-2 per post)",
      formatting_style: "One sentence per line",
      personality: "Visionary Tech Founder",
      content_preferences: {
        preferred_topics: ["Startups", "AI Agents"],
        banned_words: ["synergy", "delve"],
      },
    } as unknown as ContentDNA;


    const payloadWithDna: GenerateRequestPayload = {
      ...basePayload,
      useContentDna: true,
    };

    const { userPrompt } = buildContentPrompt(payloadWithDna, dna);

    expect(userPrompt).toContain("USER'S CONTENT DNA");
    expect(userPrompt).toContain("Witty & Authoritative");
    expect(userPrompt).toContain("Punchy, no fluff");
    expect(userPrompt).toContain("Contrarian truth");
    expect(userPrompt).toContain("Startups, AI Agents");
    expect(userPrompt).toContain("Banned Words to Avoid: synergy, delve");
  });

  it("handles empty keywords and default fallback audience", () => {
    const minimalPayload: GenerateRequestPayload = {
      topic: "Morning Routine",
      platform: "Instagram",
      contentType: "Caption",
      tone: "Casual",
      language: "English",
      length: "Short",
      cta: "None",
    };

    const { userPrompt } = buildContentPrompt(minimalPayload);

    expect(userPrompt).toContain("Target Audience: General audience");
    expect(userPrompt).not.toContain("Target Keywords:");
  });
});
