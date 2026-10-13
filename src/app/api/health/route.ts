// ────────────────────────────────────────────────────────────────────────────
// Health Check Endpoint — GET /api/health
// Returns service status for all external dependencies.
// Used by uptime monitoring (BetterUptime, Checkly) per Phase 1.2 roadmap.
// ────────────────────────────────────────────────────────────────────────────
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

interface ServiceStatus {
  status: 'ok' | 'degraded' | 'down'
  latencyMs?: number
  message?: string
}

interface HealthResponse {
  status: 'ok' | 'degraded' | 'down'
  version: string
  timestamp: string
  services: {
    api: ServiceStatus
    supabase: ServiceStatus
    gemini: ServiceStatus
  }
  uptime: number
}

async function checkSupabase(): Promise<ServiceStatus> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) {
    return { status: 'degraded', message: 'SUPABASE_URL not configured' }
  }
  try {
    const start = Date.now()
    const res = await fetch(`${url}/rest/v1/`, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
      },
      signal: AbortSignal.timeout(3000),
    })
    const latencyMs = Date.now() - start
    if (res.ok || res.status === 401 || res.status === 200) {
      // 401 = reachable but unauthorized (expected without JWT in health check)
      return { status: 'ok', latencyMs }
    }
    return { status: 'degraded', latencyMs, message: `HTTP ${res.status}` }
  } catch (err) {
    return {
      status: 'down',
      message: err instanceof Error ? err.message : 'Unreachable',
    }
  }
}

async function checkGemini(): Promise<ServiceStatus> {
  const key = process.env.GEMINI_API_KEY
  if (!key || key === 'your-gemini-api-key') {
    return { status: 'degraded', message: 'GEMINI_API_KEY not configured — using fallback generator' }
  }
  // We don't want to burn tokens just for health — return ok if key is present
  return { status: 'ok', message: 'API key configured' }
}

export async function GET() {
  const [supabaseStatus, geminiStatus] = await Promise.all([
    checkSupabase(),
    checkGemini(),
  ])

  const services = {
    api: { status: 'ok' as const },
    supabase: supabaseStatus,
    gemini: geminiStatus,
  }

  const overallStatus: 'ok' | 'degraded' | 'down' =
    Object.values(services).some((s) => s.status === 'down')
      ? 'down'
      : Object.values(services).some((s) => s.status === 'degraded')
      ? 'degraded'
      : 'ok'

  const body: HealthResponse = {
    status: overallStatus,
    version: process.env.npm_package_version ?? '0.1.0',
    timestamp: new Date().toISOString(),
    services,
    uptime: process.uptime(),
  }

  return NextResponse.json(body, {
    status: overallStatus === 'down' ? 503 : 200,
    headers: {
      // Do not cache health responses
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
