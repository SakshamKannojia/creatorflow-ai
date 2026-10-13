// ────────────────────────────────────────────────────────────────────────────
// In-Memory Token Bucket Rate Limiter — src/lib/rate-limit.ts
// Per Phase 1.1: implement token-bucket rate limiting on all AI API routes.
//
// NOTE: This is an in-memory implementation suitable for single-instance
// deployments (local dev + single Vercel serverless function region).
// For multi-region production, swap for Upstash Redis (@upstash/ratelimit).
// ────────────────────────────────────────────────────────────────────────────

interface Bucket {
  tokens: number
  lastRefill: number
}

interface RateLimitConfig {
  /** Maximum tokens in the bucket (= max requests per window) */
  maxTokens: number
  /** Refill rate: how many tokens are added per millisecond */
  refillRate: number
}

// Global store — persists across requests in the same Node.js process
const store = new Map<string, Bucket>()

/**
 * Token-bucket rate limiter.
 *
 * @param identifier - Unique key (e.g. IP address or userId)
 * @param config     - Bucket configuration
 * @returns `{ success: true }` if request is allowed, `{ success: false, retryAfterMs }` otherwise
 *
 * @example
 * // Allow 20 requests per minute per user
 * const result = rateLimit(userId, { maxTokens: 20, refillRate: 20 / 60_000 })
 * if (!result.success) {
 *   return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
 * }
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { maxTokens: 20, refillRate: 20 / 60_000 }
): { success: true } | { success: false; retryAfterMs: number } {
  const now = Date.now()
  let bucket = store.get(identifier)

  if (!bucket) {
    bucket = { tokens: config.maxTokens, lastRefill: now }
    store.set(identifier, bucket)
  }

  // Refill tokens based on elapsed time
  const elapsed = now - bucket.lastRefill
  const refilled = Math.min(config.maxTokens, bucket.tokens + elapsed * config.refillRate)
  bucket.tokens = refilled
  bucket.lastRefill = now

  if (bucket.tokens >= 1) {
    bucket.tokens -= 1
    return { success: true }
  }

  // Calculate how long until at least 1 token is refilled
  const retryAfterMs = Math.ceil((1 - bucket.tokens) / config.refillRate)
  return { success: false, retryAfterMs }
}

// ─── Pre-configured limiters for each AI route ───────────────────────────────

/** /api/generate — 20 requests/minute per identifier */
export const generateLimiter = (id: string) =>
  rateLimit(id, { maxTokens: 20, refillRate: 20 / 60_000 })

/** /api/rewrite — 30 requests/minute per identifier */
export const rewriteLimiter = (id: string) =>
  rateLimit(id, { maxTokens: 30, refillRate: 30 / 60_000 })

/** /api/content-dna — 10 requests/minute per identifier */
export const dnalimiter = (id: string) =>
  rateLimit(id, { maxTokens: 10, refillRate: 10 / 60_000 })
