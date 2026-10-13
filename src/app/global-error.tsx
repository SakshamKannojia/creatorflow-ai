'use client'
// ────────────────────────────────────────────────────────────────────────────
// Global Error Boundary — catches errors in the root layout/template.
// Must include its own <html> + <body> tags per Next.js 13+ spec.
// ────────────────────────────────────────────────────────────────────────────
import { useEffect } from 'react'

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    // TODO: replace with Sentry.captureException(error) in Phase 1.2 Sentry integration
    console.error('[GlobalError]', error)
  }, [error])

  return (
    <html lang="en">
      <head>
        <title>Something went wrong — CreatorFlow AI</title>
        <style>{`
          *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
          body{
            background:#090d16;
            color:#f8fafc;
            font-family:'Inter',system-ui,sans-serif;
            min-height:100vh;
            display:flex;
            align-items:center;
            justify-content:center;
            padding:1.5rem;
          }
          .card{
            max-width:520px;
            width:100%;
            background:rgba(15,23,42,0.85);
            border:1px solid rgba(239,68,68,0.25);
            border-radius:1rem;
            padding:2.5rem;
            backdrop-filter:blur(16px);
            text-align:center;
          }
          .icon{font-size:3rem;margin-bottom:1rem}
          h1{font-size:1.5rem;font-weight:700;margin-bottom:.75rem;color:#f8fafc}
          p{color:#94a3b8;line-height:1.6;margin-bottom:1.5rem;font-size:.9375rem}
          .digest{
            font-family:monospace;
            font-size:.75rem;
            color:#475569;
            background:rgba(15,23,42,0.6);
            border:1px solid rgba(255,255,255,0.06);
            border-radius:.5rem;
            padding:.5rem .75rem;
            margin-bottom:1.75rem;
            word-break:break-all;
          }
          .actions{display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap}
          button{
            display:inline-flex;
            align-items:center;
            gap:.4rem;
            padding:.625rem 1.25rem;
            border-radius:.625rem;
            font-size:.875rem;
            font-weight:600;
            cursor:pointer;
            border:none;
            transition:all .2s ease;
          }
          .btn-primary{background:#6366f1;color:#fff}
          .btn-primary:hover{background:#4f46e5;transform:translateY(-1px)}
          .btn-secondary{
            background:transparent;
            color:#94a3b8;
            border:1px solid rgba(255,255,255,0.1);
          }
          .btn-secondary:hover{background:rgba(255,255,255,0.05);color:#f8fafc}
        `}</style>
      </head>
      <body>
        <div className="card">
          <div className="icon">⚠️</div>
          <h1>Something went wrong</h1>
          <p>
            An unexpected error occurred. Our team has been notified and is working on it.
            You can try again or reload the page.
          </p>
          {error.digest && (
            <div className="digest">Error ID: {error.digest}</div>
          )}
          <div className="actions">
            <button className="btn-primary" onClick={retry}>
              ↺ Try Again
            </button>
            <button
              className="btn-secondary"
              onClick={() => (window.location.href = '/')}
            >
              ← Go Home
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
