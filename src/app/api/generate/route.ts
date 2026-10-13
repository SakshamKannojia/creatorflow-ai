import { NextRequest, NextResponse } from 'next/server'
import { GenerateRequestSchema, generateContentWithGemini } from '@/lib/ai/generator'
import { ContentDNA } from '@/types/database'
import { generateLimiter } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'

export async function POST(req: NextRequest) {
  // ── Rate limiting ─────────────────────────────────────────────────────────
  // Use forwarded IP → userId header as identifier (Vercel sets x-forwarded-for)
  const identifier =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'anonymous'

  const limit = generateLimiter(identifier)
  if (!limit.success) {
    logger.warn('Rate limit exceeded on /api/generate', { identifier })
    return NextResponse.json(
      { error: 'Too many requests. Please slow down.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(limit.retryAfterMs / 1000)),
          'X-RateLimit-Limit': '20',
        },
      }
    )
  }

  // ── Request parsing ───────────────────────────────────────────────────────
  try {
    const body = await req.json()

    const parseResult = GenerateRequestSchema.safeParse(body.payload || body)
    if (!parseResult.success) {
      logger.warn('Invalid generate request', {
        errors: parseResult.error.flatten().fieldErrors,
        identifier,
      })
      return NextResponse.json(
        {
          error: 'Invalid request parameters',
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const payload = parseResult.data
    const dna: ContentDNA | null = body.dna || null

    logger.info('Generating content', {
      platform: payload.platform,
      contentType: payload.contentType,
      identifier,
    })

    const generated = await generateContentWithGemini(payload, dna)

    logger.info('Content generated successfully', { identifier })

    return NextResponse.json({ success: true, data: generated })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to generate content'
    logger.error('POST /api/generate error', { message, identifier })
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
