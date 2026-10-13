import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright E2E configuration — Phase 1.3
 * Covers: auth flow, content generation, library CRUD, calendar scheduling
 */
export default defineConfig({
  testDir: './e2e',
  /* Run tests in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Workers — limit to 1 on CI to avoid resource contention */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter */
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],
  /* Global test settings */
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL ?? 'http://localhost:3000',
    /* Collect trace on first retry */
    trace: 'on-first-retry',
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
    /* Video on retry */
    video: 'on-first-retry',
  },
  /* Test against major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    // Mobile viewport
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  /* Start local dev server for tests (skip if using a running server via PLAYWRIGHT_TEST_BASE_URL) */
  webServer: process.env.CI
    ? undefined
    : {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: true,
        timeout: 120_000,
      },
})
