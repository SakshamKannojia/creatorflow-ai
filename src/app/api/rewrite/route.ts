import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { rewriteContentWithGemini } from '@/lib/ai/rewrite'
import { rewriteLimiter } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'

const RewriteRequestSchema = z.object({
  content: z.string().min(5, 'Content must be at least 5 characters long'),
  instruction: z.enum([
    'Make shorter',
    'Make longer',
    'Improve hook',
    'Improve CTA',
    'Make more professional',
    'Make more cinematic',
    'Make more engaging',
    'Make Gen-Z',
    'Convert to Hinglish',
    'Convert to LinkedIn style',
  ]),
  platform: z.enum(['Instagram', 'LinkedIn', 'YouTube', 'X']).optional(),
})

export async function POST(req: NextRequest) {
  // ── Rate limiting ─────────────────────────────────────────────────────────
  const identifier =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'anonymous'

  const limit = rewriteLimiter(identifier)
  if (!limit.success) {
    logger.warn('Rate limit exceeded on /api/rewrite', { identifier })
    return NextResponse.json(
      { error: 'Too many requests. Please slow down.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(limit.retryAfterMs / 1000)),
          'X-RateLimit-Limit': '30',
        },
      }
    )
  }

  // ── Request parsing ───────────────────────────────────────────────────────
  try {
    const body = await req.json()

    const parseResult = RewriteRequestSchema.safeParse(body)
    if (!parseResult.success) {
      logger.warn('Invalid rewrite request', {
        errors: parseResult.error.flatten().fieldErrors,
        identifier,
      })
      return NextResponse.json(
        {
          error: 'Invalid rewrite request parameters',
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    logger.info('Rewriting content', { instruction: parseResult.data.instruction, identifier })

    const result = await rewriteContentWithGemini(parseResult.data)

    logger.info('Content rewritten successfully', { identifier })

    return NextResponse.json({ success: true, data: result })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to rewrite content'
    logger.error('POST /api/rewrite error', { message, identifier })
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
