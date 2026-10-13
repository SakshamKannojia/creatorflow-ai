// ────────────────────────────────────────────────────────────────────────────
// Structured Logger — src/lib/logger.ts
// Lightweight Pino-style structured logger that works on both server + edge.
// Emits JSON in production (parseable by Vercel Log Drains) and
// pretty-prints in development for DX.
// Replace console.log/error/warn throughout the app with this.
// ────────────────────────────────────────────────────────────────────────────

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  msg: string
  ts: string
  [key: string]: unknown
}

const isProd = process.env.NODE_ENV === 'production'

// ANSI colours for dev pretty-print (stripped in prod JSON output)
const COLOURS: Record<LogLevel, string> = {
  debug: '\x1b[36m', // cyan
  info: '\x1b[32m',  // green
  warn: '\x1b[33m',  // yellow
  error: '\x1b[31m', // red
}
const RESET = '\x1b[0m'

function emit(level: LogLevel, msg: string, meta?: Record<string, unknown>) {
  const entry: LogEntry = {
    level,
    msg,
    ts: new Date().toISOString(),
    ...meta,
  }

  if (isProd) {
    // JSON output — picked up by Vercel Log Drains / any JSON log aggregator
    const line = JSON.stringify(entry)
    if (level === 'error') {
      if (typeof process.stderr?.write === 'function') {
        process.stderr.write(line + '\n')
      } else {
        console.error(line)
      }
    } else {
      if (typeof process.stdout?.write === 'function') {
        process.stdout.write(line + '\n')
      } else {
        console.log(line)
      }
    }

  } else {
    // Pretty-print for local development
    const colour = COLOURS[level]
    const prefix = `${colour}[${level.toUpperCase()}]${RESET}`
    const metaStr = meta && Object.keys(meta).length > 0
      ? `\n${JSON.stringify(meta, null, 2)}`
      : ''
    const logFn = level === 'error' ? console.error
                : level === 'warn'  ? console.warn
                : console.log
    logFn(`${prefix} ${msg}${metaStr}`)
  }
}

/**
 * Structured logger for CreatorFlow AI.
 *
 * @example
 * import { logger } from '@/lib/logger'
 * logger.info('API called', { route: '/api/generate', userId })
 * logger.error('Gemini error', { error: err.message })
 */
export const logger = {
  debug: (msg: string, meta?: Record<string, unknown>) => emit('debug', msg, meta),
  info:  (msg: string, meta?: Record<string, unknown>) => emit('info',  msg, meta),
  warn:  (msg: string, meta?: Record<string, unknown>) => emit('warn',  msg, meta),
  error: (msg: string, meta?: Record<string, unknown>) => emit('error', msg, meta),
}

export default logger
