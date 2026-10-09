export type Platform = "Instagram" | "LinkedIn" | "YouTube" | "X";

export type ContentType =
  | "Caption"
  | "Reel Script"
  | "Carousel"
  | "LinkedIn Post"
  | "YouTube Description"
  | "Content Idea";

export type Tone =
  | "Professional"
  | "Casual"
  | "Cinematic"
  | "Funny"
  | "Educational"
  | "Gen-Z"
  | "Storytelling";

export type Language = "English" | "Hinglish" | "Hindi";

export type ContentLength = "Short" | "Medium" | "Long";

export type CtaType = "None" | "Soft" | "Direct";

export type ReelDuration = "15 seconds" | "30 seconds" | "60 seconds";

export type ReelFormat =
  | "Talking Head"
  | "Faceless"
  | "Cinematic"
  | "Tutorial"
  | "Storytelling";

export type ContentStatus = "draft" | "ready" | "published" | "idea";

export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReelScene {
  scene_number: number;
  visual: string;
  voiceover: string;
  on_screen_text?: string;
  b_roll?: string;
}

export interface ContentItem {
  id: string;
  user_id: string;
  title: string;
  platform: Platform;
  content_type: ContentType;
  topic?: string | null;
  tone?: string | null;
  language?: string | null;
  content: string;
  hook?: string | null;
  cta?: string | null;
  hashtags: string[];
  status: ContentStatus;
  is_favorite: boolean;
  metadata?: {
    reel_scenes?: ReelScene[];
    duration?: string;
    format?: string;
    target_audience?: string;
    [key: string]: unknown;
  } | null;
  created_at: string;
  updated_at: string;
}

export interface ContentGeneration {
  id: string;
  user_id: string;
  content_id?: string | null;
  prompt: string;
  response: Record<string, unknown>;
  model: string;
  created_at: string;
}

export interface ContentDNA {
  id: string;
  user_id: string;
  tone: string;
  language: string;
  average_length: string;
  vocabulary_style: string;
  hook_style: string;
  cta_style: string;
  emoji_usage: string;
  formatting_style: string;
  personality: string;
  content_preferences: {
    preferred_topics?: string[];
    banned_words?: string[];
    common_phrases?: string[];
    special_rules?: string[];
    [key: string]: unknown;
  };
  source_examples: string[];
  created_at: string;
  updated_at: string;
}

export interface CalendarPost {
  id: string;
  user_id: string;
  content_id: string;
  scheduled_date: string;
  status: "scheduled" | "published" | "missed";
  created_at: string;
  updated_at: string;
  content?: ContentItem;
}

export interface GenerateRequestPayload {
  topic: string;
  platform: Platform;
  contentType: ContentType;
  tone: Tone;
  language: Language;
  targetAudience?: string;
  length: ContentLength;
  cta: CtaType;
  keywords?: string[];
  reelDuration?: ReelDuration;
  reelFormat?: ReelFormat;
  useContentDna?: boolean;
}

export interface GenerateResponsePayload {
  title: string;
  hook: string;
  mainContent: string;
  cta: string;
  hashtags: string[];
  reelScenes?: ReelScene[];
  voiceover?: string;
  onScreenText?: string;
  bRollSuggestions?: string[];
}

export interface RewriteRequestPayload {
  content: string;
  instruction:
    | "Make shorter"
    | "Make longer"
    | "Improve hook"
    | "Improve CTA"
    | "Make more professional"
    | "Make more cinematic"
    | "Make more engaging"
    | "Make Gen-Z"
    | "Convert to Hinglish"
    | "Convert to LinkedIn style";
  platform?: Platform;
}
