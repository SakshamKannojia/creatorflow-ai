import { describe, it, expect } from 'vitest'
import { formatDate, formatDateTime, truncate, cn } from '@/lib/utils'

describe('cn', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
  })

  it('deduplicates tailwind conflicting classes', () => {
    // tailwind-merge should take the last value
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })
})

describe('formatDate', () => {
  it('formats a valid date string', () => {
    const result = formatDate('2026-01-15T00:00:00.000Z')
    // Should contain the month, day, and year — locale-dependent
    expect(result).toMatch(/Jan/)
    expect(result).toMatch(/2026/)
  })

  it('returns empty string for null', () => {
    expect(formatDate(null)).toBe('')
  })

  it('returns empty string for undefined', () => {
    expect(formatDate(undefined)).toBe('')
  })

  it('accepts a Date object directly', () => {
    const d = new Date('2026-06-01T00:00:00.000Z')
    const result = formatDate(d)
    expect(result).toMatch(/2026/)
  })
})

describe('formatDateTime', () => {
  it('formats a valid datetime string', () => {
    const result = formatDateTime('2026-03-20T14:30:00.000Z')
    expect(result).toMatch(/2026/)
  })

  it('returns empty string for null', () => {
    expect(formatDateTime(null)).toBe('')
  })
})

describe('truncate', () => {
  it('truncates a long string with ellipsis', () => {
    const result = truncate('Hello World', 5)
    expect(result).toBe('Hello...')
  })

  it('does not truncate if string is within limit', () => {
    expect(truncate('Hi', 10)).toBe('Hi')
  })

  it('does not truncate if string equals limit', () => {
    expect(truncate('Hello', 5)).toBe('Hello')
  })

  it('handles empty string', () => {
    expect(truncate('', 10)).toBe('')
  })

  it('handles falsy input gracefully', () => {
    // @ts-expect-error — testing runtime safety
    expect(truncate(null, 10)).toBe(null)
  })
})
