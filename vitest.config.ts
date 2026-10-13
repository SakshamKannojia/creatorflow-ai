import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    // Use jsdom for component tests
    environment: 'jsdom',
    // Setup file runs before every test file
    setupFiles: ['./src/__tests__/setup.ts'],
    // Include patterns
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      // Enforce 80% coverage on lib/ per roadmap
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80,
      },
      include: ['src/lib/**'],
      exclude: [
        'src/lib/supabase/**', // Supabase client wrappers
        'src/lib/ai/generator.ts', // External Google Gemini SDK caller
        'src/lib/ai/rewrite.ts', // External Google Gemini SDK caller
        'src/lib/ai/content-dna.ts', // External Google Gemini SDK caller
        'src/lib/data/**', // Supabase data layer
        'node_modules/**',
      ],
    },
    // Global test utilities (describe, it, expect) without imports
    globals: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
