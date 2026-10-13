'use client'
// ────────────────────────────────────────────────────────────────────────────
// Route-level Error Boundary — wraps individual page segments.
// Placed at app/error.tsx so it covers all routes below the root layout.
// ────────────────────────────────────────────────────────────────────────────
import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'


export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    // TODO: Sentry.captureException(error)
    console.error('[RouteError]', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#090D16] flex items-center justify-center p-6">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="glass-panel rounded-2xl p-8 text-center border border-red-500/20">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 mb-6">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>

          <h1 className="text-2xl font-bold text-[#F8FAFC] mb-3">
            Something went wrong
          </h1>
          <p className="text-[#94A3B8] leading-relaxed mb-6 text-sm">
            An unexpected error occurred while rendering this page.
            {error.digest && (
              <>
                {' '}Our team has been notified.
              </>
            )}
          </p>

          {error.digest && (
            <div className="bg-[#0F172A] border border-white/5 rounded-lg px-4 py-2.5 mb-6 text-left">
              <span className="text-[#475569] text-xs font-mono">
                Error ID: {error.digest}
              </span>
            </div>
          )}

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={retry}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-px"
              id="error-retry-btn"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 text-[#94A3B8] hover:text-[#F8FAFC] text-sm font-semibold transition-all duration-200"
              id="error-home-link"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}
