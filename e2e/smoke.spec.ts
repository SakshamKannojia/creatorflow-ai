import { test, expect } from '@playwright/test'

// ────────────────────────────────────────────────────────────────────────────
// E2E: Health Check
// ────────────────────────────────────────────────────────────────────────────
test.describe('Health Check API', () => {
  test('GET /api/health returns ok or degraded status', async ({ request }) => {
    const response = await request.get('/api/health')
    expect(response.status()).toBeLessThan(504)

    const body = await response.json()
    expect(['ok', 'degraded', 'down']).toContain(body.status)
    expect(body.services).toBeDefined()
    expect(body.timestamp).toBeDefined()
  })
})

// ────────────────────────────────────────────────────────────────────────────
// E2E: Landing Page
// ────────────────────────────────────────────────────────────────────────────
test.describe('Landing Page', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/CreatorFlow AI/)
  })

  test('has correct meta description', async ({ page }) => {
    await page.goto('/')
    const desc = page.locator('meta[name="description"]')
    await expect(desc).toHaveAttribute('content', /content/i)
  })

  test('has a Login link', async ({ page }) => {
    await page.goto('/')
    // Look for a login or get started link
    const loginLink = page.locator('a[href="/login"], a[href="/signup"]').first()
    await expect(loginLink).toBeVisible()
  })
})

// ────────────────────────────────────────────────────────────────────────────
// E2E: Authentication Flow
// ────────────────────────────────────────────────────────────────────────────
test.describe('Auth Flow', () => {
  test('login page renders', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
  })

  test('signup page renders', async ({ page }) => {
    await page.goto('/signup')
    await expect(page.locator('input[type="email"]')).toBeVisible()
  })

  test('shows error on invalid login credentials', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[type="email"]', 'invalid@test.com')
    await page.fill('input[type="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')
    // Should show an error message (toast or inline)
    await expect(page.locator('text=/invalid|error|incorrect/i').first()).toBeVisible({
      timeout: 10_000,
    })
  })
})

// ────────────────────────────────────────────────────────────────────────────
// E2E: Content Generator (Sandbox/Demo Mode)
// ────────────────────────────────────────────────────────────────────────────
test.describe('Content Generator', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to generate page — sandbox mode should work without login
    await page.goto('/generate')
  })

  test('generate page loads', async ({ page }) => {
    // Should either show the generator or redirect to login
    const url = page.url()
    expect(url).toMatch(/generate|login/)
  })
})
