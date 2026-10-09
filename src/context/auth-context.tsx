"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { Profile } from "@/types/database";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (
    email: string,
    password: string,
    displayName?: string
  ) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  enableDemoMode: (demoEmail?: string) => void;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Local storage key for demo creator session
const DEMO_USER_KEY = "creatorflow_demo_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);

  const supabase = createClient();

  const fetchProfile = useCallback(
    async (userId: string, email: string) => {
      if (!isSupabaseConfigured) {
        setProfile({
          id: userId,
          email,
          display_name: email.split("@")[0],
          avatar_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error fetching profile:", error);
        }

        if (data) {
          setProfile(data as Profile);
        } else {
          // If profile does not exist yet, create one
          const fallbackProfile: Profile = {
            id: userId,
            email,
            display_name: email.split("@")[0],
            avatar_url: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          await supabase.from("profiles").upsert(fallbackProfile);
          setProfile(fallbackProfile);
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    },
    [supabase]
  );

  useEffect(() => {
    // Check if we are running in real Supabase mode or demo fallback
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        if (currentSession?.user) {
          fetchProfile(currentSession.user.id, currentSession.user.email || "");
        }
        setIsLoading(false);
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        if (newSession?.user) {
          await fetchProfile(newSession.user.id, newSession.user.email || "");
        } else {
          setProfile(null);
        }
        setIsLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Demo / Local development session support
      try {
        const savedDemoUser = localStorage.getItem(DEMO_USER_KEY);
        if (savedDemoUser) {
          const parsed = JSON.parse(savedDemoUser);
          setUser(parsed);
          setIsDemoMode(true);
          setProfile({
            id: parsed.id,
            email: parsed.email,
            display_name: parsed.user_metadata?.display_name || "Creator",
            avatar_url: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        }
      } catch (err) {
        console.warn("Local storage read error", err);
      }
      setIsLoading(false);
    }
  }, [fetchProfile, supabase]);

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      // Demo authentication simulation
      const mockId = "demo-" + Math.abs(email.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0));
      const mockUser = {
        id: mockId,
        email,
        app_metadata: {},
        user_metadata: { display_name: email.split("@")[0] },
        aud: "authenticated",
        created_at: new Date().toISOString(),
      } as unknown as User;

      setUser(mockUser);
      setIsDemoMode(true);
      setProfile({
        id: mockId,
        email,
        display_name: email.split("@")[0],
        avatar_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(mockUser));
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }
      return { error: null };
    } catch (err: unknown) {
      return {
        error: err instanceof Error ? err.message : "An unexpected network error occurred",
      };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    displayName?: string
  ) => {
    if (!isSupabaseConfigured) {
      // Demo sign up simulation
      const mockId = "demo-" + Math.abs(email.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0));
      const mockUser = {
        id: mockId,
        email,
        app_metadata: {},
        user_metadata: { display_name: displayName || email.split("@")[0] },
        aud: "authenticated",
        created_at: new Date().toISOString(),
      } as unknown as User;

      setUser(mockUser);
      setIsDemoMode(true);
      setProfile({
        id: mockId,
        email,
        display_name: displayName || email.split("@")[0],
        avatar_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(mockUser));
      return { error: null };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName || email.split("@")[0],
          },
        },
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        await fetchProfile(data.user.id, data.user.email || email);
      }

      return { error: null };
    } catch (err: unknown) {
      return {
        error: err instanceof Error ? err.message : "An unexpected network error occurred",
      };
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(DEMO_USER_KEY);
    setUser(null);
    setSession(null);
    setProfile(null);
    setIsDemoMode(false);
  };

  const enableDemoMode = (demoEmail = "creator@creatorflow.ai") => {
    const mockUser = {
      id: "demo-creator-uuid",
      email: demoEmail,
      app_metadata: {},
      user_metadata: { display_name: "Alex Vance" },
      aud: "authenticated",
      created_at: new Date().toISOString(),
    } as unknown as User;

    setUser(mockUser);
    setIsDemoMode(true);
    setProfile({
      id: "demo-creator-uuid",
      email: demoEmail,
      display_name: "Alex Vance",
      avatar_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(mockUser));
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id, user.email || "");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        isConfigured: isSupabaseConfigured,
        signIn,
        signUp,
        signOut,
        refreshProfile,
        enableDemoMode,
        isDemoMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
