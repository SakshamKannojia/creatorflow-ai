# CreatorFlow AI

> **"Create content. Stay consistent."**

An AI-powered content workspace for modern social media creators. Generate high-retention captions, practical reel scripts, carousel blueprints, and viral hooks—then calibrate your unique creator voice, organize your catalog, and schedule your publishing pipeline from one unified SaaS interface.

---

## ⚡ Key Features

- **🎯 AI Content Generator (`/generate`)**:
  - Multi-platform generation for **Instagram**, **LinkedIn**, **YouTube**, and **X (Twitter)**.
  - Tailored content types: Captions, Reel Scripts, Carousels, LinkedIn Posts, YouTube Descriptions, and Content Ideas.
  - Granular control over Tone (*Professional, Casual, Cinematic, Funny, Educational, Gen-Z, Storytelling*), Language (*English, Hinglish, Hindi*), Length, and Call-to-Action style.
  - Returns structured, scroll-stopping hooks, formatted content, relevant hashtags, and conversion-focused CTAs.

- **🎬 Production-Ready Reel Script Generator**:
  - Generates real shooting blueprints for 15s, 30s, and 60s reels.
  - Configurable formats: *Talking Head, Faceless, Cinematic, Tutorial, and Storytelling*.
  - Provides a 3-second stopping hook, scene-by-scene camera directions, voiceover script, on-screen text overlays, and realistic B-roll suggestions.

- **🧬 Content DNA Engine (`/content-dna`)**:
  - Train CreatorFlow on 3–10 examples of your previous writing.
  - Uses Gemini AI to analyze your sentence cadence, vocabulary style, hook construction, emoji frequency, and personality persona.
  - Automatically injects your Content DNA profile as context into future AI generations so every script sounds genuinely like you.
  - Edit stylistic preferences, add banned words/clichés, and set preferred topics.

- **🪄 1-Click AI Rewrite**:
  - Transform any selected piece of content with 10 distinct stylistic adapters:
    - *Make shorter*, *Make longer*, *Improve hook*, *Improve CTA*, *Make more professional*, *Make more cinematic*, *Make more engaging*, *Make Gen-Z*, *Convert to Hinglish*, *Convert to LinkedIn style*.
  - Side-by-side diff preview and explanation before applying changes.

- **📂 Content Library (`/library`)**:
  - Central repository with pipeline categories: *All, Ideas, Drafts, Ready to Publish, Published, and Favorites*.
  - Instant search across titles, hooks, content body, and tags.
  - Multi-attribute filtering (Platform, Content Type) and sorting (Newest, Oldest, Title).
  - Rich actions: favorite, duplicate as draft, copy full script, inline edit modal, and delete.

- **📅 Visual Content Calendar (`/calendar`)**:
  - Interactive monthly planning grid with date navigation and day inspector.
  - Schedule saved library assets, set publishing dates/times, and track workflow status (*Scheduled, Published, Postponed*).
  - Designed for operational content planning and drop scheduling.

- **🔒 Enterprise-Grade Authentication & Dark SaaS Aesthetic**:
  - Supabase Auth integration with email/password signup, session persistence, and Row Level Security (RLS).
  - Dark-first aesthetic featuring deep obsidian surfaces, subtle violet/indigo accents, glassmorphic panels, and smooth micro-animations.
  - Fully responsive across desktop, tablet, and mobile screens.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16+ (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 & Lucide React |
| **Backend** | Next.js Server Actions & Route Handlers (`/api/generate`, `/api/rewrite`, `/api/content-dna`) |
| **Database** | Supabase (PostgreSQL with Row Level Security) |
| **Authentication** | Supabase Auth (`@supabase/ssr`) |
| **AI Engine** | Google Gemini API (`@google/generative-ai`, Gemini 1.5 Flash/Pro) |
| **Validation** | Zod Schema Validation |
| **Dates** | `date-fns` |

---

## 🏛 Architecture & Project Structure

```
creatorflow-ai/
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   └── page.tsx              # Polished 9-section marketing landing page
│   │   ├── api/
│   │   │   ├── generate/route.ts     # Server-side Gemini content generation handler
│   │   │   ├── rewrite/route.ts      # Server-side AI text transformation handler
│   │   │   └── content-dna/route.ts  # Server-side voice profiling handler
│   │   ├── login/page.tsx            # Supabase auth sign-in with sandbox mode
│   │   ├── signup/page.tsx           # Account registration with password validation
│   │   ├── dashboard/page.tsx        # Overview stats, recent content, quick actions
│   │   ├── generate/page.tsx         # AI generator with Reel breakdown & DNA toggle
│   │   ├── library/page.tsx          # Content library with search, filter, tabs, CRUD
│   │   ├── calendar/page.tsx         # Interactive monthly planning calendar
│   │   ├── content-dna/page.tsx      # Voice analyzer and visual profile display
│   │   ├── settings/page.tsx         # User profile and API health monitoring
│   │   ├── globals.css               # Dark theme design tokens & glassmorphic utilities
│   │   └── layout.tsx                # App root layout with metadata & providers
│   ├── components/
│   │   ├── auth/
│   │   │   └── protected-route.tsx   # Auth guard for authenticated routes
│   │   ├── generator/
│   │   │   ├── reel-breakdown-view.tsx # Teleprompter & scene-by-scene script cards
│   │   │   └── rewrite-modal.tsx       # AI rewrite preview dialog
│   │   ├── layout/
│   │   │   ├── app-layout.tsx        # Shell layout with responsive drawer
│   │   │   └── sidebar.tsx           # Dark sidebar navigation
│   │   ├── library/
│   │   │   └── content-editor-modal.tsx # Inline content editor with live preview
│   │   └── ui/                       # Reusable buttons, inputs, modals, tabs, toasts
│   ├── context/
│   │   └── auth-context.tsx          # Real Supabase session management & demo sandbox
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── generator.ts          # Gemini model client & structured output parsing
│   │   │   ├── prompts.ts            # Dynamic prompt builder with DNA injection
│   │   │   ├── content-dna.ts        # Linguistic profiler & trait extractor
│   │   │   └── rewrite.ts            # 10 transformation adapters
│   │   ├── data/
│   │   │   └── content-store.ts      # Unified data store (Supabase RLS + offline resilience)
│   │   ├── supabase/
│   │   │   ├── client.ts             # Browser Supabase client
│   │   │   └── server.ts             # Server Supabase client with cookies
│   │   └── utils.ts                  # Class merger & date formatters
│   └── types/
│       └── database.ts               # Complete TypeScript interfaces for all schemas
├── supabase/
│   └── schema.sql                    # Full PostgreSQL migration with RLS & triggers
├── .env.example                      # Sample environment variables
├── .gitignore                        # Git ignore rules
├── LICENSE                           # MIT License
└── README.md                         # Documentation
```

---

## 🗄 Database Schema (PostgreSQL / Supabase)

The complete SQL migration script is located at `supabase/schema.sql`.

### Core Tables:

1. **`profiles`**
   - `id UUID PRIMARY KEY REFERENCES auth.users(id)`
   - `email TEXT`, `display_name TEXT`, `avatar_url TEXT`, `created_at`, `updated_at`

2. **`content`**
   - `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
   - `user_id UUID REFERENCES auth.users(id)`
   - `title TEXT`, `platform TEXT`, `content_type TEXT`, `topic TEXT`, `tone TEXT`, `language TEXT`
   - `content TEXT`, `hook TEXT`, `cta TEXT`, `hashtags TEXT[]`
   - `status TEXT DEFAULT 'draft'`, `is_favorite BOOLEAN DEFAULT false`, `metadata JSONB`

3. **`content_generations`**
   - `id UUID PRIMARY KEY`, `user_id UUID`, `content_id UUID`, `prompt TEXT`, `response JSONB`, `model TEXT`, `created_at`

4. **`content_dna`**
   - `id UUID PRIMARY KEY`, `user_id UUID UNIQUE`
   - `tone TEXT`, `language TEXT`, `average_length TEXT`, `vocabulary_style TEXT`
   - `hook_style TEXT`, `cta_style TEXT`, `emoji_usage TEXT`, `formatting_style TEXT`
   - `personality TEXT`, `content_preferences JSONB`, `source_examples TEXT[]`

5. **`calendar_posts`**
   - `id UUID PRIMARY KEY`, `user_id UUID`, `content_id UUID REFERENCES content(id)`
   - `scheduled_date TIMESTAMPTZ`, `status TEXT DEFAULT 'scheduled'`

### Row Level Security (RLS)
All tables have strict RLS policies enabled. Users can strictly `SELECT`, `INSERT`, `UPDATE`, and `DELETE` only their own records (`auth.uid() = user_id`).

---

## 🤖 AI Prompt Architecture

Prompts are decoupled from UI components inside `src/lib/ai/`:

1. **Prompt Compilation (`src/lib/ai/prompts.ts`)**:
   - Compiles platform constraints (e.g. character count, linebreaks, hashtag caps).
   - Injects the user's active **Content DNA** traits (*Tone, Idioms, Vocabulary, Hook formula, Banned words*).
   - Enforces strict JSON output schemas.
2. **Execution & Validation (`src/lib/ai/generator.ts`)**:
   - Uses `gemini-1.5-flash` with JSON mime-type response mode.
   - Cleans and strips markdown fences.
   - Validates all output fields against Zod schemas prior to dispatching to the client.
   - Server-side API key protection: `GEMINI_API_KEY` is never transmitted to the browser.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm, pnpm, or bun

### 1. Clone & Install Dependencies
```bash
cd creatorflow-ai
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
GEMINI_API_KEY=your-gemini-api-key
```

> **Note:** If you want to test the app before connecting a live Supabase project, CreatorFlow includes a seamless **Local Sandbox Mode** that operates instantly using secure local state.

### 3. Setup Supabase Database
1. Create a new project on [Supabase](https://supabase.com/).
2. Open the **SQL Editor** in the Supabase Dashboard.
3. Paste the contents of `supabase/schema.sql` and run the script.
4. Enable Email Authentication in **Authentication -> Providers**.

### 4. Run Locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deployment (Vercel)

1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com/).
3. Add the environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY`
4. Click **Deploy**. Next.js App Router will generate static and dynamic edge routes automatically.

---

## 🔒 Security Practices

- **API Keys**: Private Gemini API keys are executed strictly in server-side Route Handlers.
- **Row Level Security**: PostgreSQL RLS policies prevent unauthorized cross-tenant data access.
- **Input Sanitization**: User inputs and AI responses are verified through Zod schemas.
- **Cookie Security**: Auth cookies are managed via secure headers in `@supabase/ssr`.

---

## 🔮 Roadmap / Future Improvements

- [ ] Direct publishing integration with Instagram Graph API, LinkedIn Community API, and YouTube Data API v3.
- [ ] Multi-creator team workspaces with role-based permissions.
- [ ] Automated thumbnail generation with Google Imagen 3.
- [ ] TikTok script formats and voice-over preview generation.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
