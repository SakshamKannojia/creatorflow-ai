import { NextRequest, NextResponse } from "next/server";
import { GenerateRequestSchema, generateContentWithGemini } from "@/lib/ai/generator";
import { ContentDNA } from "@/types/database";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parseResult = GenerateRequestSchema.safeParse(body.payload || body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request parameters",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const payload = parseResult.data;
    const dna: ContentDNA | null = body.dna || null;

    const generated = await generateContentWithGemini(payload, dna);

    return NextResponse.json({
      success: true,
      data: generated,
    });
  } catch (error: unknown) {
    console.error("API /api/generate error:", error);
    const message = error instanceof Error ? error.message : "Failed to generate content";
    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 }
    );
  }
}
