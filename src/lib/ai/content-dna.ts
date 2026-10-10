import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { ContentDNA } from "@/types/database";

export const ContentDnaResultSchema = z.object({
  tone: z.string(),
  language: z.string(),
  average_length: z.string(),
  vocabulary_style: z.string(),
  hook_style: z.string(),
  cta_style: z.string(),
  emoji_usage: z.string(),
  formatting_style: z.string(),
  personality: z.string(),
  content_preferences: z.object({
    preferred_topics: z.array(z.string()).default([]),
    banned_words: z.array(z.string()).default([]),
    common_phrases: z.array(z.string()).default([]),
    special_rules: z.array(z.string()).default([]),
  }),
});

export type ContentDnaResult = z.infer<typeof ContentDnaResultSchema>;

function extractJSON(text: string): Record<string, unknown> {
  let cleaned = text.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }
  return JSON.parse(cleaned);
}

function analyzeFallbackStyle(samples: string[]): ContentDnaResult {
  const combined = samples.join(" ").toLowerCase();
  const hasHindiWords =
    combined.includes("karo") ||
    combined.includes("nahi") ||
    combined.includes("bhai") ||
    combined.includes("aap") ||
    combined.includes("kyun") ||
    combined.includes("hota");

  const hasHighEmoji = (combined.match(/[\u{1F300}-\u{1F6FF}]/gu) || []).length > 5;
  const isShort = samples.reduce((acc, s) => acc + s.length, 0) / samples.length < 250;

  return {
    tone: "Casual + Conversational & Authoritative",
    language: hasHindiWords ? "Hinglish" : "English",
    average_length: isShort ? "Short & Punchy" : "Medium Narrative",
    vocabulary_style: "Modern, direct, creator-focused without corporate fluff",
    hook_style: "Curiosity-driven and bold pattern-interrupts",
    cta_style: "Soft conversion focused on bookmarking and community feedback",
    emoji_usage: hasHighEmoji ? "Moderate (accent points only)" : "Low & minimalist",
    formatting_style: "Single-line rhythmic spacing with bullet takeaways",
    personality: "A relatable mentor who values systems over raw hustle",
    content_preferences: {
      preferred_topics: ["Productivity", "Creator Workflows", "Growth Systems"],
      banned_words: ["Synergy", "Paradigm", "Guru", "Hustle 24/7"],
      common_phrases: ["Here is the real breakdown", "Stop doing this manually", "Save for later"],
      special_rules: ["Always break paragraphs after 2 sentences", "Use bold hooks"],
    },
  };
}

export async function analyzeContentDnaWithGemini(
  samples: string[]
): Promise<ContentDnaResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "your-gemini-api-key") {
    return analyzeFallbackStyle(samples);
  }

  const systemPrompt = `You are a world-class linguistic profiler and creator branding specialist.
Your task is to analyze the provided writing samples from a content creator and extract their unique "Content DNA".
Notice subtle patterns: sentence cadence, vocabulary choices, hook formulas, rhetorical devices, and emoji habits.

Return ONLY a valid JSON object matching this schema:
{
  "tone": "e.g. Casual + Cinematic, Authoritative yet approachable",
  "language": "e.g. English, Hinglish, Hindi",
  "average_length": "e.g. Short, Medium, Long",
  "vocabulary_style": "e.g. Direct, witty, industry-specific, punchy",
  "hook_style": "e.g. Curiosity-driven question, shocking statistic, contrarian statement",
  "cta_style": "e.g. Soft engagement question, direct save prompt, newsletter link",
  "emoji_usage": "e.g. None, Low, Moderate, High",
  "formatting_style": "e.g. Double line-spaced, bullet points, narrative paragraphs",
  "personality": "e.g. Pragmatic builder, empathetic guide, provocative thinker",
  "content_preferences": {
    "preferred_topics": ["Topic 1", "Topic 2"],
    "banned_words": ["Cliche 1", "Cliche 2"],
    "common_phrases": ["Catchphrase 1", "Catchphrase 2"],
    "special_rules": ["Rule 1", "Rule 2"]
  }
}`;

  const userPrompt = `Analyze these writing samples from the creator:\n\n${samples
    .map((s, idx) => `--- SAMPLE ${idx + 1} ---\n${s}`)
    .join("\n\n")}`;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2, // Low temperature for consistent profiling
      },
    });

    const result = await model.generateContent(`${systemPrompt}\n\n${userPrompt}`);
    const text = result.response.text();
    const parsed = extractJSON(text);
    return ContentDnaResultSchema.parse(parsed);
  } catch (error) {
    console.error("Gemini Content DNA analysis error:", error);
    return analyzeFallbackStyle(samples);
  }
}
