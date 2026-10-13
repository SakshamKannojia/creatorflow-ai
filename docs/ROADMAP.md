# 🗺️ CreatorFlow AI — Product Roadmap

> **Last Updated:** October 2026 · **Version:** 0.1.0 · **Status:** Active Development

---

## Table of Contents

1. [Vision & North Star](#vision--north-star)
2. [Current State (v0.1.0)](#current-state-v010)
3. [Milestone Overview](#milestone-overview)
4. [Phase 1 — Foundation Hardening (v0.2.0)](#phase-1--foundation-hardening-v020)
5. [Phase 2 — Growth & Engagement (v0.3.0)](#phase-2--growth--engagement-v030)
6. [Phase 3 — Platform Integrations (v0.4.0)](#phase-3--platform-integrations-v040)
7. [Phase 4 — Monetization & Team Features (v0.5.0)](#phase-4--monetization--team-features-v050)
8. [Phase 5 — Enterprise & Scale (v1.0.0)](#phase-5--enterprise--scale-v100)
9. [Technical Debt & Infrastructure](#technical-debt--infrastructure)
10. [Design System Evolution](#design-system-evolution)
11. [AI/ML Research Pipeline](#aiml-research-pipeline)
12. [Success Metrics & KPIs](#success-metrics--kpis)
13. [Contribution Guidelines](#contribution-guidelines)

---

## Vision & North Star

> **"The operating system for the modern content creator."**

CreatorFlow AI aims to be the single unified workspace where solo creators and content teams ideate, generate, schedule, publish, and analyze content — powered by a deeply personalized AI that learns and evolves with your creative voice.

### Core Principles

| Principle | Description |
|-----------|-------------|
| 🎯 **Creator-First** | Every feature must directly reduce a creator's time-to-publish or improve content quality |
| 🧠 **AI That Learns You** | The Content DNA engine must get smarter with every interaction, not just store static profiles |
| ⚡ **Zero-Friction Workflow** | Generating and publishing content should require the fewest possible clicks |
| 🔒 **Privacy by Default** | User data, prompts, and AI-generated content are never used for model training without explicit opt-in |
| 🌍 **Multi-Lingual First** | English, Hinglish, and Hindi are first-class citizens — not afterthoughts |

---

## Current State (v0.1.0)

### ✅ Shipped Features

| Feature | Module | Status |
|---------|--------|--------|
| AI Content Generator | `/generate` | ✅ Live |
| Reel Script Generator (15s/30s/60s) | `/generate` | ✅ Live |
| Content DNA Engine | `/content-dna` | ✅ Live |
| 10-Mode AI Rewrite | Rewrite Modal | ✅ Live |
| Content Library (CRUD + Search + Filters) | `/library` | ✅ Live |
| Visual Content Calendar | `/calendar` | ✅ Live |
| Supabase Auth (Email/Password) | Auth System | ✅ Live |
| Local Sandbox Mode | Auth Context | ✅ Live |
| Dark SaaS UI (Glassmorphic) | Design System | ✅ Live |
| Row Level Security (RLS) | Database | ✅ Live |
| Zod Schema Validation | API Layer | ✅ Live |
| Marketing Landing Page | `/` | ✅ Live |

### 🏗️ Known Gaps at v0.1.0

- No direct social media publishing (manual copy-paste required)
- Single-user only — no teams or collaboration
- Analytics entirely absent — no performance data loops back into the AI
- No subscription/billing layer — app is ungated
- Content DNA is a one-time static snapshot — not continuously learned
- Mobile UX is responsive but not native-app-quality
- No webhook or Zapier integration for external automation

---

## Milestone Overview

```
Q4 2026   ──── Phase 1: Foundation Hardening    ──── v0.2.0
Q1 2027   ──── Phase 2: Growth & Engagement     ──── v0.3.0
Q2 2027   ──── Phase 3: Platform Integrations   ──── v0.4.0
Q3 2027   ──── Phase 4: Monetization & Teams    ──── v0.5.0
Q4 2027   ──── Phase 5: Enterprise & Scale      ──── v1.0.0
```

---

## Phase 1 — Foundation Hardening (v0.2.0)

> **Target:** Q4 2026 · **Theme:** _"Make it bulletproof before making it bigger"_

This phase focuses on production reliability, performance, security hardening, and developer experience — ensuring the foundation can carry the weight of all future phases.

### 1.1 — Performance & Core Web Vitals

- [ ] **Bundle analysis & code splitting** — Audit and split large chunks; target Lighthouse score ≥ 95
- [x] **Image optimization** — Next/image configuration with AVIF/WebP serving and remote Supabase pattern
- [ ] **Streaming Server Components** — Convert heavy dashboard and library pages to use React streaming
- [ ] **Edge Runtime** — Move `/api/generate` and `/api/rewrite` to Vercel Edge for sub-100ms cold starts
- [x] **Rate limiting** — Token-bucket rate limiting implemented on all AI API routes (`/api/generate`, `/api/rewrite`, `/api/content-dna`)
- [ ] **Request deduplication** — SWR/React Query integration to prevent redundant AI calls

### 1.2 — Error Handling & Observability

- [x] **Global error boundary** — Next.js global & route-level error boundaries (`global-error.tsx`, `error.tsx`)
- [ ] **Sentry integration** — Client + server error tracking with source map uploads
- [x] **Structured logging** — Production JSON / dev ANSI pretty-print structured logger (`src/lib/logger.ts`) across all routes and stores
- [ ] **OpenTelemetry tracing** — Trace AI generation requests from UI → API → Gemini → DB
- [x] **Health check endpoint** — `/api/health` returning service status for all external dependencies (Supabase, Gemini)
- [ ] **Uptime monitoring** — BetterUptime or Checkly monitors on critical routes

### 1.3 — Testing Infrastructure

- [x] **Unit tests** — Vitest test suite with 36 unit tests passing across core utilities (`src/lib/`)
- [ ] **Integration tests** — API route tests with MSW (Mock Service Worker) for Gemini API mocking
- [x] **E2E tests** — Playwright test configuration & smoke tests (`e2e/smoke.spec.ts`)
- [x] **CI pipeline** — GitHub Actions: lint → type-check → npm audit → unit tests → E2E tests (`.github/workflows/ci.yml`)
- [x] **Coverage gates** — Enforce ≥ 80% coverage on core library (currently at 93.6% in `vitest.config.ts`)
- [ ] **Visual regression** — Chromatic or Percy snapshots for UI component library

### 1.4 — Security Hardening

- [x] **Content Security Policy (CSP)** — Strict CSP & security headers via `next.config.ts` (HSTS, X-Frame-Options, Permissions-Policy)
- [x] **Input sanitization** — DOMPurify (`isomorphic-dompurify`) on user-provided rich text in `src/lib/sanitize.ts` and `content-store.ts`
- [ ] **API key rotation** — Document and implement zero-downtime Gemini API key rotation process
- [x] **Supabase RLS audit** — Full table-by-table RLS policies verified in `supabase/migrations/20261013000000_initial_schema.sql`
- [x] **CORS policy** — Restrict API routes via origin checks and headers scoped to `NEXT_PUBLIC_APP_URL`
- [x] **Dependency audit** — `npm audit --audit-level=high` integrated in CI pipeline

### 1.5 — Developer Experience

- [x] **Environment validation** — `@t3-oss/env-nextjs` schema in `src/env.ts` + `.env.example` template
- [x] **Husky + lint-staged** — Pre-commit hooks configured for automated linting
- [ ] **Storybook** — Component library documentation for all `src/components/ui/` primitives
- [x] **Database migrations** — Supabase CLI versioned migrations in `supabase/migrations/`
- [x] **API documentation** — OpenAPI 3.1 spec in `docs/openapi.yaml`
- [x] **Contributing guide** — `docs/CONTRIBUTING.md` with branching, testing, and PR conventions


---

## Phase 2 — Growth & Engagement (v0.3.0)

> **Target:** Q1 2027 · **Theme:** _"Give creators a reason to come back every day"_

### 2.1 — Intelligent Content DNA v2

- [ ] **Continuous learning** — DNA profile updates incrementally with every saved piece of content (not just on manual re-analysis)
- [ ] **Engagement-weighted training** — Allow creators to mark content that "performed well" to bias future generations
- [ ] **DNA version history** — Track how a creator's voice has evolved over time; restore to previous profiles
- [ ] **Cross-platform DNA variants** — Separate sub-profiles per platform (Instagram voice ≠ LinkedIn voice)
- [ ] **DNA sharing** — Exportable DNA profile for agency handoffs or brand collaborator briefs
- [ ] **Ghost-writing mode** — Generate content that deliberately masks the creator's voice (for brand collaborations)

### 2.2 — Analytics & Performance Dashboard

- [ ] **Content performance tracking** — Manual performance input (views, likes, saves, shares) per piece
- [ ] **AI recommendation engine** — "Your Reel Scripts get 3× more saves than Captions — generate more?" prompts
- [ ] **Publish time optimizer** — Historical analysis of scheduled posts vs. engagement to suggest optimal posting windows
- [ ] **Hook effectiveness scoring** — A/B test two AI-generated hooks and track which drives more engagement
- [ ] **Content velocity tracker** — Weekly/monthly cadence tracking vs. creator's personal publishing goals
- [ ] **Export analytics** — CSV/PDF reports for brand deal negotiations and media kits

### 2.3 — Content Generation Expansion

- [ ] **TikTok script format** — Duet, stitch, trend-hijack, and sound-on formats with platform-specific constraints
- [ ] **Twitter/X thread generator** — Auto-numbered thread format with hook tweet, body tweets, and CTA tweet
- [ ] **Pinterest description generator** — SEO-optimized pin descriptions with keyword clustering
- [ ] **Podcast episode outline** — Host intro, 3-point structure, guest question bank, and CTA generator
- [ ] **Newsletter template engine** — Subject line, preview text, body sections, and CTA for email creators
- [ ] **Batch generation** — Generate 7, 14, or 30 days of content in a single session from a topic list

### 2.4 — AI Rewrite Engine v2

- [ ] **Platform transplant** — "Convert this Instagram caption to a LinkedIn post" in one click
- [ ] **Tone blend** — Mix two tones (e.g. 60% Professional + 40% Gen-Z) with a slider UI
- [ ] **Readability optimizer** — Flesch-Kincaid analysis and automatic simplification
- [ ] **SEO rewrite** — Inject target keywords naturally without keyword stuffing
- [ ] **Competitor analysis mode** — Paste a viral competitor post; generate a non-plagiarized reimagining
- [ ] **Bulk rewrite** — Apply the same transformation to multiple library items simultaneously

### 2.5 — Enhanced Calendar & Scheduling

- [ ] **Recurring content series** — Create a series (e.g. "Monday Motivation") that auto-populates the calendar
- [ ] **Drag-and-drop calendar** — Reschedule posts by dragging between calendar cells
- [ ] **Content pipeline swimlanes** — Kanban-style view: Ideas → In Progress → Review → Scheduled → Published
- [ ] **Deadline reminders** — Push notifications (PWA) and email reminders for scheduled posts
- [ ] **Holiday & trend calendar** — Pre-populated with major global + Indian holidays and trending content moments
- [ ] **Content gap detector** — Highlight weeks with no scheduled content in red with AI suggestions to fill gaps

### 2.6 — UI/UX Improvements

- [ ] **Onboarding flow** — 3-step guided onboarding: DNA setup → first generation → first calendar item
- [ ] **Command palette** — `⌘K` / `Ctrl+K` universal search and action launcher
- [ ] **Keyboard shortcuts** — Full shortcut map for power users (generate, save, copy, rewrite)
- [ ] **Dark/light mode toggle** — User-controlled theme preference persisted to profile
- [ ] **Mobile PWA** — Manifest, service worker, and offline-capable content library browsing
- [ ] **Accessibility audit** — WCAG 2.1 AA compliance across all interactive components

---

## Phase 3 — Platform Integrations (v0.4.0)

> **Target:** Q2 2027 · **Theme:** _"Close the loop from creation to publishing"_

### 3.1 — Direct Publishing APIs

- [ ] **Instagram Graph API** — Publish single images, carousels, and Reels directly from CreatorFlow
  - Scope: `instagram_basic`, `instagram_content_publish`
  - Token management: OAuth 2.0 long-lived tokens with auto-refresh
  - Rate limits: Respect 200 API calls/user/hour cap
- [ ] **LinkedIn Community API** — Publish text posts and articles to personal profiles and company pages
  - Scope: `w_member_social`, `w_organization_social`
- [ ] **YouTube Data API v3** — Upload Shorts descriptions, full video descriptions, and title variants
  - Scope: `youtube.upload`, `youtube.readonly`
- [ ] **X (Twitter) API v2** — Post tweets and threads with scheduled delivery
  - Scope: `tweet.write`, `tweet.read`, `users.read`
- [ ] **TikTok Content Posting API** — Video upload + caption + hashtag publishing
- [ ] **Pinterest API v5** — Create pins with optimized descriptions

### 3.2 — OAuth Connection Management

- [ ] **Connected accounts dashboard** — `/settings/connections` showing all linked platforms with token health
- [ ] **Token health monitoring** — Proactive alerts when API tokens approach expiry (7-day, 1-day warnings)
- [ ] **Multi-account support** — Connect multiple accounts per platform (personal + brand pages)
- [ ] **Disconnect flow** — Revoke OAuth tokens with confirmation dialogs and immediate UI update
- [ ] **Permission scope display** — Show exactly what permissions are requested and why

### 3.3 — AI Thumbnail & Visual Generator

- [ ] **Google Imagen 3 integration** — Generate branded thumbnail concepts from video titles and hooks
- [ ] **Brand kit** — Store creator's brand colors, fonts, and logo for consistent visual generation
- [ ] **Thumbnail A/B variants** — Generate 3 thumbnail concepts; mark winner after performance data arrives
- [ ] **Caption card generator** — Auto-generate Instagram quote cards and carousel slide designs
- [ ] **Reels cover frame generator** — Suggest optimal cover frame timestamps from script structure

### 3.4 — Zapier / Make.com / n8n Integrations

- [ ] **Webhook outbound** — Fire webhooks on content save, status change, and calendar events
- [ ] **Zapier app** — Official Zapier integration with triggers (New Content, New Calendar Event) and actions (Create Content, Schedule Post)
- [ ] **REST API (public)** — Authenticated public API with SDK-ready endpoints for developer integrations
- [ ] **Notion sync** — Two-way sync: push generated content to Notion databases; import Notion content ideas

---

## Phase 4 — Monetization & Team Features (v0.5.0)

> **Target:** Q3 2027 · **Theme:** _"Build the business model that sustains the mission"_

### 4.1 — Subscription & Billing

- [ ] **Stripe Billing integration** — Checkout, customer portal, invoice management, and webhooks
- [ ] **Pricing tiers:**

  | Tier | Price | Limits | Target |
  |------|-------|--------|--------|
  | **Free** | ₹0 / $0/mo | 15 AI generations/mo, 1 platform, 50 library items | Students, hobbyists |
  | **Creator** | ₹799 / $9/mo | 200 AI generations/mo, all platforms, unlimited library, Content DNA | Solo creators |
  | **Pro** | ₹1,999 / $25/mo | Unlimited generations, direct publishing, analytics, priority AI | Full-time creators |
  | **Team** | ₹5,999 / $69/mo | Everything in Pro + 5 seats, team workspaces, role-based access | Agencies, brands |

- [ ] **Usage metering** — Real-time generation count tracking per billing cycle with soft/hard limits
- [ ] **Annual discount** — 2 months free on annual plans; auto-renewal with advance notice
- [ ] **Upgrade prompts** — Contextual upsell triggers when approaching usage limits (not aggressive banners)
- [ ] **Referral program** — Affiliate links tracked via custom codes; reward: free Creator month per referral

### 4.2 — Team Workspaces

- [ ] **Organization model** — Org → Workspace → Member hierarchy in Supabase
- [ ] **Role-based permissions:**
  - **Owner** — Full access, billing, member management
  - **Editor** — Create, edit, and publish content; no billing access
  - **Contributor** — Create drafts only; no publish or delete access
  - **Viewer** — Read-only access to library and calendar
- [ ] **Shared Content Library** — Team-scoped content pool separate from personal library
- [ ] **Content approval workflow** — Draft → Pending Review → Approved → Published pipeline with comment threads
- [ ] **Brand voice shared DNA** — Org-level Content DNA that all editors inherit and can extend
- [ ] **Audit log** — Full activity history: who created, edited, approved, and published what and when

### 4.3 — Collaboration Features

- [ ] **Inline comments** — Thread-based comments on specific paragraphs within content editor
- [ ] **@mentions** — Notify team members in comments via email and in-app notifications
- [ ] **Content assignments** — Assign pieces to specific team members with due dates
- [ ] **Real-time co-editing** — Liveblocks or Yjs CRDT-based collaborative text editing
- [ ] **Version history** — Full diff-based version history for every content item with restore capability
- [ ] **Notification center** — In-app notification bell for assignments, comments, approvals, and publishing events

---

## Phase 5 — Enterprise & Scale (v1.0.0)

> **Target:** Q4 2027 · **Theme:** _"The platform that agencies and media houses rely on"_

### 5.1 — Enterprise Features

- [ ] **SSO / SAML 2.0** — Okta, Azure AD, and Google Workspace SSO via WorkOS or Auth0
- [ ] **Custom domains** — White-label CreatorFlow under a brand's own subdomain (e.g. `content.agency.com`)
- [ ] **SLA & dedicated support** — 99.9% uptime SLA with a dedicated Slack channel for Enterprise accounts
- [ ] **Data residency** — EU and US data region selection for GDPR compliance
- [ ] **Custom AI model fine-tuning** — Enterprise accounts can fine-tune a Gemini model on their brand corpus
- [ ] **Contract & invoicing** — NET-30/60 invoicing, PO support, and enterprise procurement flows

### 5.2 — Advanced AI Features

- [ ] **Trend intelligence** — Real-time trending topic ingestion (Google Trends, Twitter Trending, Reddit) surfaced as content ideas
- [ ] **Competitor benchmarking** — Analyze top-performing public posts by competitor handles and extract winning patterns
- [ ] **AI content scoring** — Pre-publish virality score, estimated reach estimate, and engagement prediction
- [ ] **Voice-over preview** — Text-to-speech preview of reel scripts using ElevenLabs or Google TTS
- [ ] **Auto-captions** — Upload a video and auto-generate platform-optimized descriptions and hashtags
- [ ] **Multimodal inputs** — Generate content from an image (product photo → caption) or video screenshot (frame → hook idea)

### 5.3 — Data & Analytics (Advanced)

- [ ] **Platform analytics ingestion** — Pull actual performance data from connected Instagram/LinkedIn/YouTube accounts via API
- [ ] **AI performance correlation** — Map which content parameters (tone, length, hook type) correlate with high performance
- [ ] **Content ROI dashboard** — Track engagement per content type, platform, and campaign
- [ ] **Predictive scheduling** — ML model suggesting optimal publish times based on audience activity patterns
- [ ] **Creator growth dashboard** — Follower growth, engagement rate trend, and content consistency score over time

### 5.4 — Mobile Applications

- [ ] **React Native app (iOS + Android)** — Core generation, library browse, and calendar check — built with Expo
- [ ] **Capture mode** — Quick-capture voice memos and photo ideas on mobile; AI converts to full content later
- [ ] **Push notifications** — Scheduled post reminders and team mention alerts
- [ ] **Offline support** — Queue generations while offline; sync when connectivity restored

### 5.5 — Marketplace & Ecosystem

- [ ] **Prompt marketplace** — Community-contributed custom prompt templates; free and paid listings
- [ ] **Content DNA marketplace** — Purchase or sell "voice packs" — DNA profiles for specific niches (finance influencer, fitness coach, etc.)
- [ ] **Agency directory** — Verified agency partners who offer CreatorFlow-powered content services
- [ ] **Plugin/extension system** — Third-party developers can build and publish integrations against the public API

---

## Technical Debt & Infrastructure

### Ongoing (Every Phase)

| Area | Action | Priority |
|------|--------|----------|
| **Next.js upgrades** | Track next.js releases; test and upgrade within 30 days of stable release | 🔴 High |
| **Gemini model upgrades** | Evaluate each Gemini release for quality/cost improvements; maintain model version config | 🔴 High |
| **Dependency updates** | Weekly Dependabot PRs reviewed and merged; no package more than 2 major versions behind | 🟡 Medium |
| **Database indexing** | Profile slow queries with `pg_stat_statements`; add indexes proactively | 🟡 Medium |
| **Supabase plan scaling** | Monitor row counts, egress, and realtime connections; upgrade plan before hitting limits | 🟡 Medium |
| **AI prompt versioning** | Store prompt templates with version hashes; track regression in output quality across versions | 🟡 Medium |
| **Cost monitoring** | Dashboards for Gemini API token spend, Supabase egress, and Vercel bandwidth with alert thresholds | 🟢 Low |

### Architecture Evolution

```
v0.1.0 (Current)        v0.3.0 (Target)             v1.0.0 (Target)
─────────────────────   ─────────────────────────   ──────────────────────────────
Next.js Monolith     →  Next.js + Background Jobs →  Next.js + Microservices (optional)
Gemini 1.5 Flash     →  Gemini 2.x (upgrade)      →  Custom fine-tuned model (Enterprise)
Supabase (Free)      →  Supabase (Pro)             →  Supabase (Team) + Read Replicas
Vercel (Hobby)       →  Vercel (Pro)               →  Vercel (Enterprise) / Self-hosted option
No queue             →  BullMQ / Upstash QStash    →  Dedicated job workers
No cache             →  Upstash Redis              →  Redis Cluster + CDN edge cache
```

---

## Design System Evolution

### Phase 1–2: Consolidation

- [ ] Extract all design tokens into a single `tokens.css` source of truth
- [ ] Build a documented component library (`src/components/ui/`) with Storybook
- [ ] Establish spacing, typography, and color scales as CSS custom properties
- [ ] Audit and remove all inline `style` props in favor of utility classes

### Phase 3–4: Expansion

- [ ] Introduce a data visualization design language for analytics charts (Recharts or D3)
- [ ] Create a mobile-first component variant system for React Native parity
- [ ] Define motion/animation standards (duration, easing curves, reduced-motion support)

### Phase 5: Maturity

- [ ] Publish CreatorFlow Design System as an open-source npm package
- [ ] Figma design file fully synced with production tokens via Token Studio
- [ ] Accessibility: Full WCAG 2.1 AA audit with automated axe-core CI checks

---

## AI/ML Research Pipeline

These are research initiatives that may influence future product decisions:

| Research Area | Potential Impact | Horizon |
|--------------|-----------------|---------|
| **Fine-tuned Creator Voice Model** | Replace generic Gemini prompts with a model specifically tuned on high-engagement creator content | 2027 |
| **Engagement Prediction Model** | Classify content as high/medium/low engagement potential before publishing | 2027 |
| **Multi-modal Content Generation** | Generate thumbnail + caption + script as a unified multimodal output | 2027 |
| **RAG-based Trend Engine** | Retrieval-Augmented Generation over real-time trending content to ground generations in current culture | 2027 |
| **Creator Persona Clustering** | Unsupervised clustering of Content DNA profiles to identify archetype communities | 2028 |
| **Cross-platform Voice Consistency** | NLP model to ensure content "sounds like the same person" across Instagram, LinkedIn, and X | 2028 |

---

## Success Metrics & KPIs

### Product Health (Monthly)

| Metric | v0.2.0 Target | v0.5.0 Target | v1.0.0 Target |
|--------|--------------|--------------|--------------|
| Monthly Active Users (MAU) | 500 | 5,000 | 25,000 |
| AI Generations / MAU | 12 | 20 | 30 |
| Content Library Items Created | 3,000 | 50,000 | 500,000 |
| Content DNA Profiles Active | 200 | 2,000 | 15,000 |
| D30 Retention | 25% | 35% | 45% |
| NPS Score | > 40 | > 55 | > 65 |

### Technical Health (Continuous)

| Metric | Target |
|--------|--------|
| Lighthouse Score (all pages) | ≥ 95 |
| API P99 Latency (generation) | < 8s |
| API P99 Latency (rewrite) | < 4s |
| Error Rate (5xx) | < 0.1% |
| Test Coverage (`src/lib/`) | ≥ 80% |
| E2E Test Pass Rate (CI) | 100% |
| Time to First Byte (TTFB) | < 200ms |

### Business Health (Monthly, post-Phase 4)

| Metric | Target |
|--------|--------|
| Monthly Recurring Revenue (MRR) | Growing ≥ 15% MoM |
| Churn Rate | < 5% monthly |
| Free → Paid Conversion | ≥ 8% |
| Average Revenue Per User (ARPU) | ≥ ₹1,200 / $15 |
| Support Ticket Resolution Time | < 24 hours |

---

## Contribution Guidelines

> See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full guide.

### Roadmap Item Lifecycle

```
💡 Idea          → GitHub Discussion (community vote)
📋 Accepted      → GitHub Issue with "roadmap" label and phase milestone
🔨 In Progress   → GitHub Issue assigned + PR linked
✅ Shipped       → PR merged, issue closed, CHANGELOG.md updated
```

### Branching Strategy

```
main          → Production-ready, protected branch
dev           → Integration branch for phase work
feat/<name>   → Feature branches (merged via PR into dev)
fix/<name>    → Hotfix branches (can merge directly to main for critical bugs)
```

### Release Cadence

- **Patch releases** (0.x.y): As needed for bug fixes and security patches
- **Minor releases** (0.x.0): End of each phase milestone, accompanied by a changelog post
- **Major release** (1.0.0): Full Phase 5 completion — production-grade, enterprise-ready

---

## Changelog

| Version | Date | Highlights |
|---------|------|-----------|
| `v0.1.0` | Oct 2026 | Initial release — AI generator, Content DNA, Library, Calendar, Auth |

---

<div align="center">

**Built with ❤️ for creators who take their craft seriously.**

</div>
