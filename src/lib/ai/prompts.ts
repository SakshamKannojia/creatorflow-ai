import {
  GenerateRequestPayload,
  ContentDNA,
  Platform,
  ContentType,
} from "@/types/database";

export function buildContentPrompt(
  payload: GenerateRequestPayload,
  dna?: ContentDNA | null
): { systemInstruction: string; userPrompt: string } {
  const {
    topic,
    platform,
    contentType,
    tone,
    language,
    targetAudience,
    length,
    cta,
    keywords,
    reelDuration,
    reelFormat,
    useContentDna,
  } = payload;

  const isReel = contentType === "Reel Script";

  const systemInstruction = `You are CreatorFlow AI, an elite social media content strategist and creative director for top-tier creators.
Your mission is to generate viral, high-converting, authentic content that drives exceptional engagement, saves creators time, and sounds like a real human.

Rules:
1. NEVER output cheesy generic corporate jargon or robotic clichés like "In today's fast-paced world" or "Unlock your potential".
2. Match the requested tone, language, platform nuances, and length strictly.
3. Only generate 3-5 hyper-relevant hashtags, never excessive spam tags.
4. Return ONLY a valid JSON object matching the requested schema. Do not wrap in extra prose.`;

  let dnaDirectives = "";
  if (useContentDna && dna) {
    dnaDirectives = `
### USER'S CONTENT DNA (Strict Personalization Directives):
The user has trained an explicit voice profile from their past high-performing posts. You MUST align the generation with these stylistic traits:
- Tone: ${dna.tone || tone}
- Language / Idioms: ${dna.language || language}
- Vocabulary Style: ${dna.vocabulary_style}
- Hook Methodology: ${dna.hook_style}
- Call-To-Action Style: ${dna.cta_style}
- Emoji Density: ${dna.emoji_usage}
- Formatting / Linebreaks: ${dna.formatting_style}
- Core Creator Persona: ${dna.personality}
${
  dna.content_preferences?.preferred_topics?.length
    ? `- Preferred Topics/Themes: ${dna.content_preferences.preferred_topics.join(", ")}`
    : ""
}
${
  dna.content_preferences?.banned_words?.length
    ? `- Banned Words to Avoid: ${dna.content_preferences.banned_words.join(", ")}`
    : ""
}
`;
  }

  let specificDetails = "";
  if (isReel) {
    specificDetails = `
This is a REEL / SHORT-FORM VIDEO SCRIPT:
- Duration Target: ${reelDuration || "30 seconds"}
- Video Format: ${reelFormat || "Talking Head"}
- Requirements:
  - Generate a stopping 3-second HOOK.
  - Break down into sequential scenes (Scene 1, Scene 2, Scene 3, Scene 4) with timing.
  - For each scene, specify: visual action, voiceover script, and on-screen text overlay.
  - Provide realistic, actionable B-roll suggestions that someone can actually film.
  - A compelling closing CTA.
`;
  } else {
    specificDetails = `
- Content Type: ${contentType}
- Deliverables:
  - High-impact HOOK (the opening line/first 2 lines that stop the scroll).
  - MAIN CONTENT (formatted with clean spacing, line breaks, bullet points, or slides depending on ${contentType}).
  - High-converting CTA tailored to ${cta} preference.
  - 3-5 focused hashtags.
`;
  }

  const jsonSchemaInstruction = isReel
    ? `
Return a JSON object with this EXACT structure:
{
  "title": "Short catchy title for the script",
  "hook": "The first 3 seconds video hook line",
  "mainContent": "Full formatted teleprompter-ready script",
  "cta": "Closing call to action",
  "hashtags": ["#tag1", "#tag2", "#tag3"],
  "voiceover": "Complete continuous voiceover text",
  "onScreenText": "Summary of on-screen text graphics",
  "bRollSuggestions": ["B-roll idea 1", "B-roll idea 2"],
  "reelScenes": [
    {
      "scene_number": 1,
      "visual": "What is shown on camera",
      "voiceover": "Spoken dialogue",
      "on_screen_text": "Text graphic overlay",
      "b_roll": "Cutaway b-roll footage idea"
    }
  ]
}
`
    : `
Return a JSON object with this EXACT structure:
{
  "title": "Short descriptive title for this piece",
  "hook": "Attention-grabbing opening hook",
  "mainContent": "The complete post/caption body with clean paragraphs and linebreaks",
  "cta": "Call to action sentence",
  "hashtags": ["#tag1", "#tag2", "#tag3"]
}
`;

  const userPrompt = `
Generate social media content for:
- Platform: ${platform}
- Content Type: ${contentType}
- Topic / Product: ${topic}
- Tone: ${tone}
- Language: ${language}
- Target Audience: ${targetAudience || "General audience"}
- Desired Length: ${length}
- Call to Action (CTA) Type: ${cta}
${keywords && keywords.length > 0 ? `- Target Keywords: ${keywords.join(", ")}` : ""}

${specificDetails}
${dnaDirectives}

${jsonSchemaInstruction}
`;

  return { systemInstruction, userPrompt };
}
