# Contributing to CreatorFlow AI

> Thank you for taking the time to contribute! Please read this guide before opening a PR.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Workflow](#development-workflow)
3. [Code Standards](#code-standards)
4. [Testing Requirements](#testing-requirements)
5. [PR Process](#pr-process)
6. [Commit Messages](#commit-messages)

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/your-org/creatorflow-ai.git
cd creatorflow-ai

# Install dependencies
npm install --legacy-peer-deps

# Copy env template and fill in your values
cp .env.example .env.local

# Start development server
npm run dev
```

The app runs in **sandbox/demo mode** without any real API keys — all generations use high-quality fallback content. Set `GEMINI_API_KEY` in `.env.local` to enable real AI generation.

---

## Development Workflow

### Branching

```
main          → Production-ready, protected. Requires PR + review.
dev           → Integration branch. All feature PRs target here.
feat/<name>   → Feature branches (e.g. feat/command-palette)
fix/<name>    → Bug/hotfix branches (e.g. fix/calendar-timezone)
```

### Making Changes

1. Branch from `dev`:
   ```bash
   git checkout dev && git pull
   git checkout -b feat/your-feature
   ```

2. Make your changes following the [Code Standards](#code-standards) below.

3. Add/update tests:
   ```bash
   npm run test:watch           # unit tests in watch mode
   npm run test:e2e:ui          # E2E with Playwright UI
   ```

4. Ensure CI passes locally:
   ```bash
   npm run lint && npm run type-check && npm run test:ci
   ```

5. Open a PR targeting `dev`.

---

## Code Standards

### TypeScript

- **Strict mode** — no `any` types; use `unknown` and narrow safely.
- Prefer `const` assertions over loose types where possible.
- Export types from `@/types/database.ts` for shared domain types.

### File Structure

```
src/
├── app/            → Next.js App Router pages and API routes
│   └── api/        → Route handlers (one file per route)
├── components/
│   ├── ui/         → Primitive components (Button, Card, Input, etc.)
│   ├── layout/     → Sidebar, Navbar, wrappers
│   └── <feature>/  → Feature-specific components
├── lib/
│   ├── ai/         → AI generation and rewrite logic
│   ├── data/       → Data access layer (Supabase queries)
│   └── utils.ts    → Shared utilities
├── context/        → React context providers
├── types/          → TypeScript types and Zod schemas
└── __tests__/      → Unit tests (mirrors src/lib/ structure)
e2e/                → Playwright E2E tests
```

### Styling

- Use the **glassmorphism design system** from `globals.css` (`.glass-panel`, `.glow-subtle`, etc.)
- Add Tailwind utility classes; avoid inline `style` props.
- Use `cn()` from `@/lib/utils` for conditional class merging.
- Do not add ad-hoc colours — use the CSS custom properties from `:root`.

### API Routes

- Always validate input with **Zod** schemas.
- Always apply **rate limiting** via `@/lib/rate-limit`.
- Always use **logger** from `@/lib/logger` instead of `console.log`.
- Return structured `{ success, data }` on success, `{ error, details? }` on failure.

---

## Testing Requirements

| Layer | Tool | Coverage Gate |
|-------|------|---------------|
| Unit | Vitest + Testing Library | ≥ 80% on `src/lib/` |
| Integration | Vitest + MSW | API route mocking |
| E2E | Playwright | Auth, generate, library, calendar |
| Visual Regression | _Planned (Phase 1.3 Chromatic)_ | — |

Every new `src/lib/` file **must** have a corresponding test in `src/__tests__/lib/`.

Run all tests:

```bash
npm run test:ci       # unit + coverage
npm run test:e2e      # E2E
```

---

## PR Process

1. **Title format:** `feat: add command palette` / `fix: calendar timezone bug` / `chore: update deps`
2. **Link the GitHub Issue** in the PR description.
3. **Screenshots/videos** required for UI changes.
4. **CI must pass** — all jobs green before merge.
5. **One approval** required from a maintainer.
6. Squash merge into `dev`; merge commits into `main` for releases.

---

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat:     New feature
fix:      Bug fix
chore:    Maintenance (deps, config)
docs:     Documentation only
test:     Adding or updating tests
refactor: Code restructuring without behaviour change
style:    Formatting only
perf:     Performance improvements
ci:       CI/CD configuration
```

Examples:

```
feat: add token-bucket rate limiting to AI routes
fix: resolve calendar timezone offset on DST change
chore: upgrade lucide-react to v1.48
test: add unit tests for rate-limit utility
```

---

> See [ROADMAP.md](./ROADMAP.md) for upcoming features and [docs/openapi.yaml](./openapi.yaml) for the API specification.
