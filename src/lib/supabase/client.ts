import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith("http") &&
    !supabaseUrl.includes("your-project")
);

export function createClient() {
  if (!isSupabaseConfigured) {
    // Provide a valid fallback client structure for SSR or unconfigured states
    return createBrowserClient(
      supabaseUrl || "https://dummy-project.supabase.co",
      supabaseAnonKey || "dummy-anon-key"
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
