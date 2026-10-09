import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { analyzeContentDnaWithGemini } from "@/lib/ai/content-dna";

const ContentDnaAnalysisSchema = z.object({
  samples: z
    .array(z.string().min(10, "Each sample must be at least 10 characters"))
    .min(2, "Please provide at least 2 writing samples for analysis")
    .max(15, "Maximum 15 samples allowed per analysis"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parseResult = ContentDnaAnalysisSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid samples provided",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const dnaProfile = await analyzeContentDnaWithGemini(parseResult.data.samples);

    return NextResponse.json({
      success: true,
      data: dnaProfile,
    });
  } catch (error: unknown) {
    console.error("API /api/content-dna error:", error);
    const message = error instanceof Error ? error.message : "Failed to analyze Content DNA";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
