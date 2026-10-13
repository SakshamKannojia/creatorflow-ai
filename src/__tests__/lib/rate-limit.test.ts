import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { rateLimit, generateLimiter, rewriteLimiter } from '@/lib/rate-limit'

// We need to reset the in-memory store between tests.
// Since the store is module-level, we reload the module.
describe('rateLimit', () => {
  it('allows requests within the limit', () => {
    const result = rateLimit('test-user-1', { maxTokens: 5, refillRate: 5 / 60_000 })
    expect(result.success).toBe(true)
  })

  it('blocks requests that exceed the limit', () => {
    const id = 'test-user-burst'
    // Exhaust 3 tokens
    rateLimit(id, { maxTokens: 3, refillRate: 3 / 60_000 })
    rateLimit(id, { maxTokens: 3, refillRate: 3 / 60_000 })
    rateLimit(id, { maxTokens: 3, refillRate: 3 / 60_000 })

    // 4th request should be blocked
    const result = rateLimit(id, { maxTokens: 3, refillRate: 3 / 60_000 })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.retryAfterMs).toBeGreaterThan(0)
    }
  })

  it('provides a retryAfterMs when blocked', () => {
    const id = 'test-user-retry'
    // Exhaust tokens with a 1-token bucket
    rateLimit(id, { maxTokens: 1, refillRate: 1 / 60_000 })
    const result = rateLimit(id, { maxTokens: 1, refillRate: 1 / 60_000 })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(typeof result.retryAfterMs).toBe('number')
      expect(result.retryAfterMs).toBeGreaterThan(0)
      // At 1 token per 60 seconds, retry should be ≤ 60_000ms
      expect(result.retryAfterMs).toBeLessThanOrEqual(60_000)
    }
  })

  it('gives different buckets to different identifiers', () => {
    const config = { maxTokens: 1, refillRate: 1 / 60_000 }
    rateLimit('user-a', config) // exhausts user-a
    const resultA = rateLimit('user-a', config)
    const resultB = rateLimit('user-b', config) // user-b untouched

    expect(resultA.success).toBe(false)
    expect(resultB.success).toBe(true)
  })
})

describe('pre-configured limiters', () => {
  it('generateLimiter accepts the first request', () => {
    const result = generateLimiter('gen-test-user')
    expect(result.success).toBe(true)
  })

  it('rewriteLimiter accepts the first request', () => {
    const result = rewriteLimiter('rewrite-test-user')
    expect(result.success).toBe(true)
  })
})
