// ────────────────────────────────────────────────────────────────────────────
// Vitest global test setup
// ────────────────────────────────────────────────────────────────────────────
import '@testing-library/jest-dom'
import { afterEach, beforeEach, vi } from 'vitest'

import { cleanup } from '@testing-library/react'

// Cleanup after each test to prevent state leakage
afterEach(() => {
  cleanup()
})

// ── Global mocks ──────────────────────────────────────────────────────────────

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    pathname: '/',
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock next/font/google — prevents network calls in tests
vi.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-sans', className: 'font-sans' }),
  Outfit: () => ({ variable: '--font-display', className: 'font-display' }),
}))

// Silence console.error in test output unless explicitly checked
const originalError = console.error
beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation((...args) => {
    // Allow intentional error logging checks by re-checking spy in test
    if (process.env.VITEST_ALLOW_CONSOLE_ERROR) {
      originalError(...args)
    }
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})
