import type { NextConfig } from 'next'

// ────────────────────────────────────────────────────────────────────────────
// next.config.ts — Phase 1 hardened configuration
// ────────────────────────────────────────────────────────────────────────────

// Content Security Policy directives
// NOTE: In Phase 1 we use a permissive-but-sensible CSP.
// Tighten `script-src` with nonces once Sentry/analytics scripts are finalized.
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: blob: https:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self'
    https://*.supabase.co
    https://*.supabase.net
    https://generativelanguage.googleapis.com
    wss://*.supabase.co;
  media-src 'self' blob: data:;
  object-src 'none';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, ' ')
  .trim()

const securityHeaders = [
  // CSP
  { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
  // HSTS — 2 year max-age, include subdomains
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  // No MIME sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Referrer
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  // Permissions — minimal footprint
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  // Clickjacking — superseded by CSP frame-ancestors but kept for older browsers
  { key: 'X-Frame-Options', value: 'DENY' },
  // DNS prefetch
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
]

const nextConfig: NextConfig = {
  // ── Performance ────────────────────────────────────────────────────────────
  // Package import optimization — tree-shake heavy icon libraries
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Enable React strict mode for catching side-effect issues early
  reactStrictMode: true,

  // Image optimization config
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      // Allow Supabase storage buckets for user-uploaded assets
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/**',
      },
    ],
  },

  // ── Security Headers ───────────────────────────────────────────────────────
  async headers() {
    return [
      // Apply security headers to ALL routes
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // CORS for API routes — same-origin only (no external calls)
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
          { key: 'Access-Control-Max-Age', value: '86400' },
        ],
      },
    ]
  },

  // ── Logging ────────────────────────────────────────────────────────────────
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },

  // ── Powered-by header removal ──────────────────────────────────────────────
  poweredByHeader: false,
}

export default nextConfig
