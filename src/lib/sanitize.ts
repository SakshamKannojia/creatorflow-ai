// ────────────────────────────────────────────────────────────────────────────
// Input Sanitization Utility — src/lib/sanitize.ts
// Per Phase 1.4: sanitize user-provided rich text and content before storage
// ────────────────────────────────────────────────────────────────────────────
import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanitizes rich text / HTML to prevent XSS attacks while preserving
 * standard safe formatting tags (b, i, strong, em, a, p, br, ul, ol, li, code, pre).
 */
export function sanitizeHtml(dirty?: string | null): string {
  if (!dirty) return ''
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'b',
      'i',
      'em',
      'strong',
      'a',
      'p',
      'br',
      'ul',
      'ol',
      'li',
      'code',
      'pre',
      'blockquote',
      'span',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  })
}

/**
 * Strips all HTML/script tags entirely for pure plain text fields (titles, hooks, handles).
 */
export function sanitizePlainText(text?: string | null): string {
  if (!text) return ''
  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  }).trim()
}
