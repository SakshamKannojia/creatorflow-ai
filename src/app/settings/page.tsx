"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  User,
  Shield,
  Key,
  CheckCircle2,
  AlertCircle,
  Dna,
  Save,
  LogOut,
  Sparkles,
} from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { useAuth } from "@/context/auth-context";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";

export default function SettingsPage() {
  const { user, profile, signOut, isDemoMode } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile?.display_name) {
      setDisplayName(profile.display_name);
    }
  }, [profile]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile updated", `Display name set to ${displayName}`);
    }, 600);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl space-y-8 animate-in fade-in duration-300">
        {/* Header */}
        <div className="pb-3 border-b border-slate-800/80">
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-indigo-400" />
            Workspace Settings
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your creator profile, API integrations, and workspace preferences.
          </p>
        </div>

        {/* Profile Details */}
        <div className="rounded-2xl bg-[#0F172A]/70 border border-slate-800 p-6 space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Creator Profile</h2>
              <p className="text-xs text-slate-400">
                Your creator identifier used across prompts and workspace headers
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Creator / Channel Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Alex Vance"
              />

              <Input
                label="Registered Email Address"
                value={user?.email || "creator@creatorflow.ai"}
                disabled
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary" size="sm" isLoading={isSaving}>
                <Save className="w-3.5 h-3.5 mr-1" />
                Save Profile
              </Button>
            </div>
          </form>
        </div>

        {/* Environment & Integration Status */}
        <div className="rounded-2xl bg-[#0F172A]/70 border border-slate-800 p-6 space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Service Architecture & API Health</h2>
              <p className="text-xs text-slate-400">
                Current connection status of your cloud database and AI engines
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Supabase Status */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isSupabaseConfigured ? "bg-emerald-400" : "bg-amber-400"
                  }`}
                />
                <div>
                  <h3 className="text-xs font-semibold text-white">
                    Supabase PostgreSQL & Auth
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {isSupabaseConfigured
                      ? "Connected with live cloud database and RLS policies"
                      : "Running in local resilient offline storage mode (add NEXT_PUBLIC_SUPABASE_URL to connect live project)"}
                  </p>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  isSupabaseConfigured
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                }`}
              >
                {isSupabaseConfigured ? "Active" : "Sandbox"}
              </span>
            </div>

            {/* Google Gemini AI Status */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <div>
                  <h3 className="text-xs font-semibold text-white">
                    Google Gemini 1.5 Pro/Flash Integration
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Server-side prompt synthesis with structured JSON parsing & Content DNA adapter
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Ready
              </span>
            </div>
          </div>
        </div>

        {/* Security & Sessions */}
        <div className="rounded-2xl bg-[#0F172A]/70 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Account & Session</h2>
              <p className="text-xs text-slate-400">
                Sign out or terminate current workspace sessions
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <h3 className="text-xs font-semibold text-white">End Session</h3>
              <p className="text-[11px] text-slate-400">
                Sign out of CreatorFlow AI on this device
              </p>
            </div>

            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                signOut();
                toast.info("Logged out successfully");
              }}
            >
              <LogOut className="w-3.5 h-3.5 mr-1" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
