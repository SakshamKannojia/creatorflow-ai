import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import {
  GenerateRequestPayload,
  GenerateResponsePayload,
  ContentDNA,
} from "@/types/database";
import { buildContentPrompt } from "./prompts";

const ReelSceneSchema = z.object({
  scene_number: z.number(),
  visual: z.string(),
  voiceover: z.string(),
  on_screen_text: z.string().optional(),
  b_roll: z.string().optional(),
});

const GenerateResponseSchema = z.object({
  title: z.string().default("Untitled Generation"),
  hook: z.string().default(""),
  mainContent: z.string(),
  cta: z.string().default(""),
  hashtags: z.array(z.string()).default([]),
  voiceover: z.string().optional(),
  onScreenText: z.string().optional(),
  bRollSuggestions: z.array(z.string()).optional(),
  reelScenes: z.array(ReelSceneSchema).optional(),
});

export const GenerateRequestSchema = z.object({
  topic: z.string().min(2, "Topic must be at least 2 characters"),
  platform: z.enum(["Instagram", "LinkedIn", "YouTube", "X"]),
  contentType: z.enum([
    "Caption",
    "Reel Script",
    "Carousel",
    "LinkedIn Post",
    "YouTube Description",
    "Content Idea",
  ]),
  tone: z.enum([
    "Professional",
    "Casual",
    "Cinematic",
    "Funny",
    "Educational",
    "Gen-Z",
    "Storytelling",
  ]),
  language: z.enum(["English", "Hinglish", "Hindi"]),
  targetAudience: z.string().optional(),
  length: z.enum(["Short", "Medium", "Long"]),
  cta: z.enum(["None", "Soft", "Direct"]),
  keywords: z.array(z.string()).optional(),
  reelDuration: z.enum(["15 seconds", "30 seconds", "60 seconds"]).optional(),
  reelFormat: z
    .enum(["Talking Head", "Faceless", "Cinematic", "Tutorial", "Storytelling"])
    .optional(),
  useContentDna: z.boolean().optional(),
});

// Helper to extract JSON from raw model string
function extractJSON(text: string): Record<string, unknown> {
  let cleaned = text.trim();
  // Strip markdown code block wrappers if any
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  // Find the outermost JSON object bounds if there's surrounding text
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }

  return JSON.parse(cleaned);
}

// Fallback generator when Gemini API key is missing or quota limited
function generateFallbackContent(
  payload: GenerateRequestPayload,
  dna?: ContentDNA | null
): GenerateResponsePayload {
  const isReel = payload.contentType === "Reel Script";
  const duration = payload.reelDuration || "30 seconds";
  const language = payload.language || "English";
  const platform = payload.platform;

  if (isReel) {
    return {
      title: `${payload.topic} — High-Retention Reel Blueprint`,
      hook:
        language === "Hinglish"
          ? `Agar aap bhi ${payload.topic} me struggle kar rahe ho, toh ye 3 second aapki game change kar denge.`
          : `If you're still doing ${payload.topic} the old way, you are wasting 80% of your energy.`,
      mainContent:
        `HOOK: Stop doing ${payload.topic} manually.\n\n` +
        `SCENE 1: Most people start by overcomplicating the setup. Cut to quick screen capture.\n` +
        `SCENE 2: The actual secret is focusing on one single transformation point.\n` +
        `SCENE 3: Here is the exact step-by-step breakdown you can replicate right now.\n` +
        `CTA: Save this reel before you forget this technique.`,
      cta:
        payload.cta === "Direct"
          ? "Click the link in bio to get the full step-by-step blueprint."
          : "Save this reel and drop a comment below if you want the checklist.",
      hashtags: [`#${platform.replace(/\s+/g, "")}`, `#${payload.topic.replace(/\s+/g, "")}`, "#ContentCreation", "#ViralReels"],
      voiceover:
        "Stop doing this manually. Most creators overcomplicate their setup, but the real secret is focusing on one single high-impact lever. Save this reel so you have the blueprint when you shoot.",
      onScreenText: "Stop Doing This Wrong\nThe 3-Step Shortcut\nSave For Later",
      bRollSuggestions: [
        "Rapid typing or mobile phone scrolling close-up",
        "Split-screen showing before vs after workflow",
        "Pointing to on-screen bullet points with dynamic zoom",
      ],
      reelScenes: [
        {
          scene_number: 1,
          visual: "Close-up talking head, lean forward with high energy (0-3s)",
          voiceover: `Stop doing ${payload.topic} the slow way.`,
          on_screen_text: "STOP Doing This!",
          b_roll: "Visual error glitch or messy workspace",
        },
        {
          scene_number: 2,
          visual: "Screen recording or demonstration of the technique (4-12s)",
          voiceover: "Here is the exact framework top performers use to 5x their speed without burnout.",
          on_screen_text: "The 80/20 Framework",
          b_roll: "Smooth interface screen capture",
        },
        {
          scene_number: 3,
          visual: "Showing immediate tangible results or finished output (13-22s)",
          voiceover: "Notice how this eliminates all friction and gives you back 10 hours every single week.",
          on_screen_text: "Results in 5 mins",
          b_roll: "Side-by-side comparison graphics",
        },
        {
          scene_number: 4,
          visual: "Direct gaze to camera, holding phone or pointer (23-30s)",
          voiceover: "Save this reel and comment below with your thoughts.",
          on_screen_text: "Save & Comment Below",
          b_roll: "Animated save bookmark icon",
        },
      ],
    };
  }

  // Non-reel fallback
  const hook =
    language === "Hinglish"
      ? `Ye ek insight aapke ${payload.topic} ke approach ko completely badal sakti hai.`
      : `Most people treat ${payload.topic} as a chore. The top 1% treat it as an unfair advantage.`;

  const mainContent =
    payload.platform === "LinkedIn"
      ? `${hook}\n\nOver the last 12 months, I observed hundreds of creators trying to master this.\n\nHere is what separates those who gain massive traction from those who burn out:\n\n1. They don't rely on random inspiration.\n2. They build a predictable system around their strengths.\n3. They focus on clarity rather than complex jargon.\n\nWhen you master ${payload.topic}, consistency becomes second nature.\n\nWhat is your biggest friction point right now?`
      : `${hook}\n\nHere is the real breakdown of ${payload.topic} that nobody tells you:\n\n• Step 1: Strip away 80% of unnecessary noise.\n• Step 2: Implement the core fundamentals daily.\n• Step 3: Measure what works and double down on winners.\n\nConsistency compounds faster than raw talent.`;

  return {
    title: `${payload.topic} — ${payload.contentType}`,
    hook,
    mainContent,
    cta:
      payload.cta === "Direct"
        ? "Tap the link in bio to read the full guide."
        : "Save this post and share with someone who needs to see this today.",
    hashtags: [`#${payload.platform}`, `#${payload.topic.replace(/\s+/g, "")}`, "#CreatorFlow", "#Growth"],
  };
}

export async function generateContentWithGemini(
  payload: GenerateRequestPayload,
  dna?: ContentDNA | null
): Promise<GenerateResponsePayload> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "your-gemini-api-key") {
    // Return high quality structured generation
    return generateFallbackContent(payload, dna);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const { systemInstruction, userPrompt } = buildContentPrompt(payload, dna);
    const combinedPrompt = `${systemInstruction}\n\n${userPrompt}`;

    const result = await model.generateContent(combinedPrompt);
    const responseText = result.response.text();

    const rawJson = extractJSON(responseText);
    const validated = GenerateResponseSchema.parse(rawJson);

    return validated;
  } catch (error) {
    console.error("Gemini API generation error:", error);
    // Graceful fallback if quota or network issue occurs
    return generateFallbackContent(payload, dna);
  }
}
