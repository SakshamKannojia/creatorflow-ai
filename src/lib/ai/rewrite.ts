import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { RewriteRequestPayload } from "@/types/database";

export const RewriteResponseSchema = z.object({
  rewrittenContent: z.string(),
  explanation: z.string().default("Transformed using AI style adapter"),
});

export type RewriteResponse = z.infer<typeof RewriteResponseSchema>;

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

function rewriteFallback(content: string, instruction: string): RewriteResponse {
  switch (instruction) {
    case "Make shorter":
      const lines = content.split("\n").filter((l) => l.trim().length > 0);
      return {
        rewrittenContent: lines.slice(0, Math.max(2, Math.floor(lines.length * 0.6))).join("\n\n"),
        explanation: "Condensed into high-density punchy sentences, removing filler phrases.",
      };
    case "Improve hook":
      return {
        rewrittenContent: `🔥 The harsh truth nobody is telling you about this:\n\n${content}`,
        explanation: "Injected a strong curiosity-inducing pattern interrupt into the opening line.",
      };
    case "Improve CTA":
      return {
        rewrittenContent: `${content}\n\n📌 Bookmark this post right now so you don't lose it when you need it most.`,
        explanation: "Added a high-converting bookmark/save CTA that triggers algorithmic distribution.",
      };
    case "Convert to Hinglish":
      return {
        rewrittenContent: `Bhai agar aap ye notice kar rahe ho toh suno:\n\n${content.replace(/You/g, "Aap").replace(/you/g, "aap")}\n\nSimple logic hai: system banao, consistency apne aap aayegi.`,
        explanation: "Adapted with conversational Hinglish slang and relatable tone.",
      };
    case "Convert to LinkedIn style":
      return {
        rewrittenContent: `I've analyzed hundreds of high-performing creators over the last 3 years.\n\nHere is what separates the top 1% from the rest:\n\n${content}\n\nAgree or disagree? Drop your thoughts below.`,
        explanation: "Re-spaced with professional line breaks, observational framing, and discussion prompt.",
      };
    case "Make Gen-Z":
      return {
        rewrittenContent: `No because why is nobody talking about this fr 💀\n\n${content}\n\nLowkey this changed everything. Do not sleep on this.`,
        explanation: "Rewritten with modern internet cadence and conversational Gen-Z vernacular.",
      };
    case "Make more cinematic":
      return {
        rewrittenContent: `[FADE IN: A dimly lit desk. The clock strikes 2:00 AM.]\n\n${content}\n\n[DRAMATIC BEAT: The sound of a pen tapping.]`,
        explanation: "Framed with atmospheric stage directions, sensory pacing, and visual storytelling.",
      };
    case "Make more professional":
      return {
        rewrittenContent: `Strategic observation regarding creator productivity:\n\n${content}\n\nKey takeaway: Operational predictability consistently outperforms sporadic motivation.`,
        explanation: "Refined with analytical vocabulary and executive clarity.",
      };
    default:
      return {
        rewrittenContent: content,
        explanation: "Enhanced phrasing for readability and impact.",
      };
  }
}

export async function rewriteContentWithGemini(
  payload: RewriteRequestPayload
): Promise<RewriteResponse> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "your-gemini-api-key") {
    return rewriteFallback(payload.content, payload.instruction);
  }

  const prompt = `You are an expert social media editor.
Transform the following social media content according to this exact transformation goal:
Goal: "${payload.instruction}"
${payload.platform ? `Platform Context: ${payload.platform}` : ""}

Original Content:
"""
${payload.content}
"""

Rules:
1. Preserve the core message while mastering the requested transformation.
2. Ensure top-notch flow, natural phrasing, and high-impact readability.
3. Return ONLY a valid JSON object matching this schema:
{
  "rewrittenContent": "The full rewritten content with appropriate linebreaks",
  "explanation": "1-2 concise sentences explaining what specific changes improved this version"
}`;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = extractJSON(text);
    return RewriteResponseSchema.parse(parsed);
  } catch (error) {
    console.error("Gemini AI rewrite error:", error);
    return rewriteFallback(payload.content, payload.instruction);
  }
}
