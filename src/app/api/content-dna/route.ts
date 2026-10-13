import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { analyzeContentDnaWithGemini } from "@/lib/ai/content-dna";
import { dnalimiter } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const ContentDnaAnalysisSchema = z.object({
  samples: z
    .array(z.string().min(10, "Each sample must be at least 10 characters"))
    .min(2, "Please provide at least 2 writing samples for analysis")
    .max(15, "Maximum 15 samples allowed per analysis"),
});

export async function POST(req: NextRequest) {
  const identifier =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "anonymous";

  const limit = dnalimiter(identifier);
  if (!limit.success) {
    logger.warn("Rate limit exceeded on /api/content-dna", { identifier });
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(limit.retryAfterMs / 1000)),
          "X-RateLimit-Limit": "10",
        },
      }
    );
  }

  try {
    const body = await req.json();

    const parseResult = ContentDnaAnalysisSchema.safeParse(body);
    if (!parseResult.success) {
      logger.warn("Invalid content-dna request parameters", {
        errors: parseResult.error.flatten().fieldErrors,
        identifier,
      });
      return NextResponse.json(
        {
          error: "Invalid samples provided",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const dnaProfile = await analyzeContentDnaWithGemini(parseResult.data.samples);

    logger.info("Successfully analyzed content DNA", { identifier });

    return NextResponse.json({
      success: true,
      data: dnaProfile,
    });
  } catch (error: unknown) {
    logger.error("API /api/content-dna error", { error, identifier });
    const message = error instanceof Error ? error.message : "Failed to analyze Content DNA";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

