import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rewriteContentWithGemini } from "@/lib/ai/rewrite";

const RewriteRequestSchema = z.object({
  content: z.string().min(5, "Content must be at least 5 characters long"),
  instruction: z.enum([
    "Make shorter",
    "Make longer",
    "Improve hook",
    "Improve CTA",
    "Make more professional",
    "Make more cinematic",
    "Make more engaging",
    "Make Gen-Z",
    "Convert to Hinglish",
    "Convert to LinkedIn style",
  ]),
  platform: z.enum(["Instagram", "LinkedIn", "YouTube", "X"]).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parseResult = RewriteRequestSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid rewrite request parameters",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const result = await rewriteContentWithGemini(parseResult.data);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: unknown) {
    console.error("API /api/rewrite error:", error);
    const message = error instanceof Error ? error.message : "Failed to rewrite content";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
