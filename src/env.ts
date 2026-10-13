// ────────────────────────────────────────────────────────────────────────────
// Environment Variables — src/env.ts
// @t3-oss/env-nextjs compile-time validation per Phase 1.5.
// This file is the single source of truth for all env vars in the app.
// Import `env` from here instead of accessing process.env directly.
// ────────────────────────────────────────────────────────────────────────────
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /**
   * Server-side environment variables.
   * These are NOT exposed to the browser.
   */
  server: {
    // Google Gemini
    GEMINI_API_KEY: z
      .string()
      .min(1)
      .optional()
      .default('your-gemini-api-key'),

    // Node environment
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  },

  /**
   * Client-side environment variables.
   * Must be prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
    NEXT_PUBLIC_APP_URL: z.string().url().optional().default('http://localhost:3000'),
  },

  /**
   * What object to use to destructure the env.
   * By default, `process.env` is used.
   */
  runtimeEnv: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },

  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
})
