-- ==============================================================================
-- CREATORFLOW AI - SUPABASE DATABASE SCHEMA
-- Migration: Complete schema with Tables, RLS, Indexes, Triggers
-- ==============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. CONTENT TABLE
CREATE TABLE IF NOT EXISTS public.content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  platform TEXT NOT NULL, -- Instagram, LinkedIn, YouTube, X
  content_type TEXT NOT NULL, -- Caption, Reel Script, Carousel, LinkedIn Post, YouTube Description, Content Idea
  topic TEXT,
  tone TEXT,
  language TEXT,
  content TEXT NOT NULL,
  hook TEXT,
  cta TEXT,
  hashtags TEXT[] DEFAULT '{}'::text[],
  status TEXT NOT NULL DEFAULT 'draft', -- draft, ready, published, idea
  is_favorite BOOLEAN NOT NULL DEFAULT false,
  metadata JSONB DEFAULT '{}'::jsonb, -- extra platform-specific fields (e.g. reel script breakdown)
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. CONTENT GENERATIONS LOG TABLE
CREATE TABLE IF NOT EXISTS public.content_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_id UUID REFERENCES public.content(id) ON DELETE SET NULL,
  prompt TEXT NOT NULL,
  response JSONB NOT NULL,
  model TEXT DEFAULT 'gemini-1.5-flash',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. CONTENT DNA TABLE
CREATE TABLE IF NOT EXISTS public.content_dna (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  tone TEXT,
  language TEXT,
  average_length TEXT,
  vocabulary_style TEXT,
  hook_style TEXT,
  cta_style TEXT,
  emoji_usage TEXT,
  formatting_style TEXT,
  personality TEXT,
  content_preferences JSONB DEFAULT '{}'::jsonb,
  source_examples TEXT[] DEFAULT '{}'::text[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. CALENDAR POSTS TABLE
CREATE TABLE IF NOT EXISTS public.calendar_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_id UUID NOT NULL REFERENCES public.content(id) ON DELETE CASCADE,
  scheduled_date TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled', -- scheduled, published, missed
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_content_user_id ON public.content(user_id);
CREATE INDEX IF NOT EXISTS idx_content_created_at ON public.content(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_content_platform ON public.content(platform);
CREATE INDEX IF NOT EXISTS idx_content_status ON public.content(status);
CREATE INDEX IF NOT EXISTS idx_content_is_favorite ON public.content(is_favorite);

CREATE INDEX IF NOT EXISTS idx_content_generations_user_id ON public.content_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_content_dna_user_id ON public.content_dna(user_id);
CREATE INDEX IF NOT EXISTS idx_calendar_posts_user_id ON public.calendar_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_calendar_posts_scheduled_date ON public.calendar_posts(scheduled_date ASC);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_dna ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_posts ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Content Policies
CREATE POLICY "Users can view their own content"
  ON public.content FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own content"
  ON public.content FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own content"
  ON public.content FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own content"
  ON public.content FOR DELETE
  USING (auth.uid() = user_id);

-- Content Generations Policies
CREATE POLICY "Users can view their own generations"
  ON public.content_generations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own generations"
  ON public.content_generations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own generations"
  ON public.content_generations FOR DELETE
  USING (auth.uid() = user_id);

-- Content DNA Policies
CREATE POLICY "Users can view their own content DNA"
  ON public.content_dna FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own content DNA"
  ON public.content_dna FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own content DNA"
  ON public.content_dna FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own content DNA"
  ON public.content_dna FOR DELETE
  USING (auth.uid() = user_id);

-- Calendar Posts Policies
CREATE POLICY "Users can view their own calendar posts"
  ON public.calendar_posts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own calendar posts"
  ON public.calendar_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own calendar posts"
  ON public.calendar_posts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own calendar posts"
  ON public.calendar_posts FOR DELETE
  USING (auth.uid() = user_id);

-- ==============================================================================
-- AUTOMATIC PROFILE CREATION TRIGGER
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'avatar_url', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Trigger for auto-updating updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  new.updated_at = timezone('utc'::text, now());
  RETURN new;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_content_updated_at ON public.content;
CREATE TRIGGER update_content_updated_at
  BEFORE UPDATE ON public.content
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS update_content_dna_updated_at ON public.content_dna;
CREATE TRIGGER update_content_dna_updated_at
  BEFORE UPDATE ON public.content_dna
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS update_calendar_posts_updated_at ON public.calendar_posts;
CREATE TRIGGER update_calendar_posts_updated_at
  BEFORE UPDATE ON public.calendar_posts
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
