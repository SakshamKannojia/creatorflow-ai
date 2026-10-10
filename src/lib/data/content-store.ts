import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  ContentItem,
  ContentDNA,
  CalendarPost,
  ContentStatus,
  Platform,
  ContentType,
} from "@/types/database";

const LOCAL_CONTENT_KEY = "creatorflow_content_items";
const LOCAL_DNA_KEY = "creatorflow_content_dna";
const LOCAL_CALENDAR_KEY = "creatorflow_calendar_posts";

// Starter creator data for fresh or local accounts
const INITIAL_DEMO_CONTENT: ContentItem[] = [
  {
    id: "sample-1",
    user_id: "demo-creator-uuid",
    title: "5 AI Tools That Save 20 Hours a Week",
    platform: "Instagram",
    content_type: "Carousel",
    topic: "Productivity AI Tools for Creators",
    tone: "Educational",
    language: "English",
    hook: "Stop wasting 4 hours every day on repetitive tasks. Here are the 5 tools top creators use in secret.",
    content: "Slide 1: Stop wasting 4 hours every day on repetitive tasks.\nSlide 2: 1. Descript — Edit video by editing text.\nSlide 3: 2. Notion AI — Brainstorm video scripts in seconds.\nSlide 4: 3. Midjourney — High-converting thumbnails without Photoshop.\nSlide 5: 4. Taplio — Automate your LinkedIn workflow.\nSlide 6: 5. CreatorFlow AI — Generate consistent scripts in your exact voice.\nSlide 7: Save this post to 10x your output this weekend!",
    cta: "Save this carousel and comment 'TOOLS' for the complete PDF breakdown!",
    hashtags: ["#ContentCreator", "#ProductivityHacks", "#AItools", "#CreatorEconomy"],
    status: "ready",
    is_favorite: true,
    created_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
  },
  {
    id: "sample-2",
    user_id: "demo-creator-uuid",
    title: "Why 99% of Creators Fail in the First 6 Months",
    platform: "LinkedIn",
    content_type: "LinkedIn Post",
    topic: "Creator Consistency & Retention",
    tone: "Storytelling",
    language: "English",
    hook: "Most creators don't fail because their cameras are bad. They fail because their workflow is broken.",
    content: "In 2023, I spent 14 hours producing a single 30-second reel.\n\nIt got 412 views.\n\nI felt exhausted and ready to quit. But then I noticed what high-earning creators were doing differently:\n\nThey didn't create on impulse. They built a systematic pipeline.\n\nHere are 3 rules that changed everything for me:\n1. Separate ideation from execution.\n2. Develop a repeatable Content DNA.\n3. Batch-schedule your drafts so you never post on panic.\n\nConsistency is an operational habit, not an emotional mood.",
    cta: "What is your biggest bottleneck in your current workflow? Let's discuss in the comments.",
    hashtags: ["#CreatorEconomy", "#PersonalBranding", "#SocialMediaStrategy", "#Solopreneur"],
    status: "published",
    is_favorite: true,
    created_at: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
  },
  {
    id: "sample-3",
    user_id: "demo-creator-uuid",
    title: "How to Build a Second Brain in 2026",
    platform: "YouTube",
    content_type: "Reel Script",
    topic: "Knowledge Management Workflow",
    tone: "Cinematic",
    language: "English",
    hook: "Your brain is for having ideas, not holding them. Here's how to build your digital vault.",
    content: "SCENE 1: Quick cut of messy browser tabs and sticky notes.\nVO: Stop treating your memory like a hard drive.\nSCENE 2: Clean Notion / Obsidian workspace appearing.\nVO: You need a central capture hub that categorizes thoughts instantly.\nSCENE 3: Phone capturing voice note on the go.\nVO: Whenever a thought hits, speak it into your AI vault.\nSCENE 4: Showing published video based on stored note.\nVO: That's how you stay consistent without feeling drained.",
    cta: "Subscribe for weekly creator breakdowns.",
    hashtags: ["#SecondBrain", "#Productivity", "#Shorts", "#ContentStrategy"],
    status: "draft",
    is_favorite: false,
    metadata: {
      duration: "30 seconds",
      format: "Cinematic",
      reel_scenes: [
        {
          scene_number: 1,
          visual: "Close-up on stressful desk with 40 chrome tabs open",
          voiceover: "Your brain is for having ideas, not holding them.",
          on_screen_text: "Stop storing everything in your head",
          b_roll: "Frustrated typing / mouse clicking",
        },
        {
          scene_number: 2,
          visual: "Clean dark-mode digital notes interface sliding into view",
          voiceover: "Top creators build an external cognitive engine that organizes thoughts automatically.",
          on_screen_text: "The 3-Step Vault System",
          b_roll: "Smooth interface screen recording",
        },
        {
          scene_number: 3,
          visual: "Creator speaking directly to camera with relaxed posture",
          voiceover: "Capture ideas in 5 seconds. Transform them into scripts in 10 minutes.",
          on_screen_text: "Idea -> Script -> Content",
          b_roll: "Mobile app recording voice memo",
        },
      ],
    },
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: "sample-4",
    user_id: "demo-creator-uuid",
    title: "10 Viral Video Hooks for Tech Founders",
    platform: "X",
    content_type: "Content Idea",
    topic: "Hook Library for Founders",
    tone: "Gen-Z",
    language: "English",
    hook: "If your first 3 seconds don't grab them, your entire video is invisible.",
    content: "10 Hooks you can steal right now:\n1. 'I spent $10,000 testing this so you don't have to.'\n2. 'Nobody is talking about the biggest shift happening in...'\n3. 'If I lost everything today, here is how I would restart.'\n4. 'This one automation replaced my entire weekend routine.'\n5. 'Why 99% of people get this completely wrong.'",
    cta: "Bookmark this post before the algorithm buries it.",
    hashtags: ["#TechTwitter", "#BuildInPublic", "#CreatorHacks"],
    status: "idea",
    is_favorite: false,
    created_at: new Date(Date.now() - 3600000 * 36).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 36).toISOString(),
  },
];

// Helper to access LocalStorage safely
function getLocalItems<T>(key: string, defaultVal: T): T {
  if (typeof window === "undefined") return defaultVal;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setLocalItems<T>(key: string, val: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (err) {
    console.warn("LocalStorage set error:", err);
  }
}

// -------------------------------------------------------------
// CONTENT CRUD OPERATIONS
// -------------------------------------------------------------

export async function getUserContent(userId?: string): Promise<ContentItem[]> {
  const supabase = createClient();

  if (isSupabaseConfigured && userId) {
    try {
      const { data, error } = await supabase
        .from("content")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data as ContentItem[];
      }
    } catch (err) {
      console.error("Supabase fetch content error:", err);
    }
  }

  // Local storage fallback
  const items = getLocalItems<ContentItem[]>(LOCAL_CONTENT_KEY, INITIAL_DEMO_CONTENT);
  return items;
}

export async function getContentById(id: string): Promise<ContentItem | null> {
  const supabase = createClient();

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("content")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        return data as ContentItem;
      }
    } catch (err) {
      console.error("Supabase get content by id error:", err);
    }
  }

  const items = getLocalItems<ContentItem[]>(LOCAL_CONTENT_KEY, INITIAL_DEMO_CONTENT);
  return items.find((i) => i.id === id) || null;
}

export async function saveContent(
  payload: Omit<ContentItem, "id" | "created_at" | "updated_at"> & { id?: string }
): Promise<ContentItem> {
  const supabase = createClient();
  const now = new Date().toISOString();
  const id = payload.id || crypto.randomUUID ? crypto.randomUUID() : "content-" + Date.now();

  const newRecord: ContentItem = {
    ...payload,
    id,
    created_at: now,
    updated_at: now,
  };

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("content")
        .upsert(newRecord)
        .select()
        .single();

      if (!error && data) {
        return data as ContentItem;
      }
    } catch (err) {
      console.error("Supabase save content error:", err);
    }
  }

  // Update local storage
  const current = getLocalItems<ContentItem[]>(LOCAL_CONTENT_KEY, INITIAL_DEMO_CONTENT);
  const existingIndex = current.findIndex((c) => c.id === id);
  if (existingIndex >= 0) {
    current[existingIndex] = { ...current[existingIndex], ...newRecord, updated_at: now };
  } else {
    current.unshift(newRecord);
  }
  setLocalItems(LOCAL_CONTENT_KEY, current);
  return newRecord;
}

export async function updateContent(
  id: string,
  updates: Partial<ContentItem>
): Promise<ContentItem | null> {
  const supabase = createClient();
  const now = new Date().toISOString();

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("content")
        .update({ ...updates, updated_at: now })
        .eq("id", id)
        .select()
        .single();

      if (!error && data) {
        return data as ContentItem;
      }
    } catch (err) {
      console.error("Supabase update content error:", err);
    }
  }

  const current = getLocalItems<ContentItem[]>(LOCAL_CONTENT_KEY, INITIAL_DEMO_CONTENT);
  const index = current.findIndex((c) => c.id === id);
  if (index >= 0) {
    current[index] = { ...current[index], ...updates, updated_at: now };
    setLocalItems(LOCAL_CONTENT_KEY, current);
    return current[index];
  }
  return null;
}

export async function deleteContent(id: string): Promise<boolean> {
  const supabase = createClient();

  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase.from("content").delete().eq("id", id);
      if (!error) return true;
    } catch (err) {
      console.error("Supabase delete content error:", err);
    }
  }

  const current = getLocalItems<ContentItem[]>(LOCAL_CONTENT_KEY, INITIAL_DEMO_CONTENT);
  const filtered = current.filter((c) => c.id !== id);
  setLocalItems(LOCAL_CONTENT_KEY, filtered);
  return true;
}

export async function toggleFavorite(id: string): Promise<boolean> {
  const currentItem = await getContentById(id);
  if (!currentItem) return false;
  const newFavStatus = !currentItem.is_favorite;
  await updateContent(id, { is_favorite: newFavStatus });
  return newFavStatus;
}

// -------------------------------------------------------------
// DASHBOARD STATS
// -------------------------------------------------------------

export interface CreatorStats {
  totalContent: number;
  drafts: number;
  ready: number;
  published: number;
  savedIdeas: number;
}

export async function getUserStats(userId?: string): Promise<CreatorStats> {
  const items = await getUserContent(userId);
  return {
    totalContent: items.length,
    drafts: items.filter((i) => i.status === "draft").length,
    ready: items.filter((i) => i.status === "ready").length,
    published: items.filter((i) => i.status === "published").length,
    savedIdeas: items.filter((i) => i.status === "idea").length,
  };
}

// -------------------------------------------------------------
// CONTENT DNA OPERATIONS
// -------------------------------------------------------------

export async function getUserContentDna(userId?: string): Promise<ContentDNA | null> {
  const supabase = createClient();

  if (isSupabaseConfigured && userId) {
    try {
      const { data, error } = await supabase
        .from("content_dna")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (!error && data) {
        return data as ContentDNA;
      }
    } catch (err) {
      console.error("Supabase fetch content DNA error:", err);
    }
  }

  return getLocalItems<ContentDNA | null>(LOCAL_DNA_KEY, null);
}

export async function saveContentDna(
  payload: Omit<ContentDNA, "id" | "created_at" | "updated_at"> & { id?: string }
): Promise<ContentDNA> {
  const supabase = createClient();
  const now = new Date().toISOString();
  const id = payload.id || crypto.randomUUID ? crypto.randomUUID() : "dna-" + Date.now();

  const record: ContentDNA = {
    ...payload,
    id,
    created_at: now,
    updated_at: now,
  };

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("content_dna")
        .upsert(record, { onConflict: "user_id" })
        .select()
        .single();

      if (!error && data) {
        return data as ContentDNA;
      }
    } catch (err) {
      console.error("Supabase save content DNA error:", err);
    }
  }

  setLocalItems(LOCAL_DNA_KEY, record);
  return record;
}

export async function deleteContentDna(userId?: string): Promise<boolean> {
  const supabase = createClient();

  if (isSupabaseConfigured && userId) {
    try {
      await supabase.from("content_dna").delete().eq("user_id", userId);
    } catch (err) {
      console.error("Supabase delete content DNA error:", err);
    }
  }

  if (typeof window !== "undefined") {
    localStorage.removeItem(LOCAL_DNA_KEY);
  }
  return true;
}

// -------------------------------------------------------------
// CALENDAR POSTS OPERATIONS
// -------------------------------------------------------------

export async function getCalendarPosts(userId?: string): Promise<CalendarPost[]> {
  const supabase = createClient();

  if (isSupabaseConfigured && userId) {
    try {
      const { data, error } = await supabase
        .from("calendar_posts")
        .select("*, content:content_id(*)")
        .eq("user_id", userId)
        .order("scheduled_date", { ascending: true });

      if (!error && data) {
        return data as CalendarPost[];
      }
    } catch (err) {
      console.error("Supabase fetch calendar posts error:", err);
    }
  }

  return getLocalItems<CalendarPost[]>(LOCAL_CALENDAR_KEY, [
    {
      id: "cal-1",
      user_id: "demo-creator-uuid",
      content_id: "sample-1",
      scheduled_date: new Date(Date.now() + 3600000 * 24).toISOString(), // Tomorrow
      status: "scheduled",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      content: INITIAL_DEMO_CONTENT[0],
    },
    {
      id: "cal-2",
      user_id: "demo-creator-uuid",
      content_id: "sample-3",
      scheduled_date: new Date(Date.now() + 3600000 * 24 * 3).toISOString(), // 3 days later
      status: "scheduled",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      content: INITIAL_DEMO_CONTENT[2],
    },
  ]);
}

export async function schedulePost(
  userId: string,
  contentId: string,
  scheduledDate: string
): Promise<CalendarPost> {
  const supabase = createClient();
  const now = new Date().toISOString();
  const id = crypto.randomUUID ? crypto.randomUUID() : "cal-" + Date.now();

  const newPost: CalendarPost = {
    id,
    user_id: userId,
    content_id: contentId,
    scheduled_date: scheduledDate,
    status: "scheduled",
    created_at: now,
    updated_at: now,
  };

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("calendar_posts")
        .insert(newPost)
        .select("*, content:content_id(*)")
        .single();

      if (!error && data) {
        return data as CalendarPost;
      }
    } catch (err) {
      console.error("Supabase schedule post error:", err);
    }
  }

  const posts = await getCalendarPosts(userId);
  const content = await getContentById(contentId);
  newPost.content = content || undefined;
  posts.push(newPost);
  setLocalItems(LOCAL_CALENDAR_KEY, posts);
  return newPost;
}

export async function updateCalendarPost(
  id: string,
  updates: Partial<CalendarPost>
): Promise<CalendarPost | null> {
  const supabase = createClient();
  const now = new Date().toISOString();

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("calendar_posts")
        .update({ ...updates, updated_at: now })
        .eq("id", id)
        .select("*, content:content_id(*)")
        .single();

      if (!error && data) {
        return data as CalendarPost;
      }
    } catch (err) {
      console.error("Supabase update calendar post error:", err);
    }
  }

  const posts = getLocalItems<CalendarPost[]>(LOCAL_CALENDAR_KEY, []);
  const index = posts.findIndex((p) => p.id === id);
  if (index >= 0) {
    posts[index] = { ...posts[index], ...updates, updated_at: now };
    setLocalItems(LOCAL_CALENDAR_KEY, posts);
    return posts[index];
  }
  return null;
}

export async function deleteCalendarPost(id: string): Promise<boolean> {
  const supabase = createClient();

  if (isSupabaseConfigured) {
    try {
      await supabase.from("calendar_posts").delete().eq("id", id);
      return true;
    } catch (err) {
      console.error("Supabase delete calendar post error:", err);
    }
  }

  const posts = getLocalItems<CalendarPost[]>(LOCAL_CALENDAR_KEY, []);
  const filtered = posts.filter((p) => p.id !== id);
  setLocalItems(LOCAL_CALENDAR_KEY, filtered);
  return true;
}
