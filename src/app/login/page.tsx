"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Lock, Mail, AlertCircle, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, enableDemoMode, isConfigured } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        setErrorMessage(error);
        toast.error("Sign in failed", error);
      } else {
        toast.success("Welcome back!", "Redirecting to your creator workspace...");
        router.push("/dashboard");
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSignIn = () => {
    enableDemoMode("creator@creatorflow.ai");
    toast.success("Demo Workspace Ready", "Logged in as Creator Alex Vance");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#090D16] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glowing ambient orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all mb-4"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-base tracking-tight text-white">
              CreatorFlow<span className="text-indigo-400">.ai</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Welcome back, Creator
          </h2>
          <p className="mt-1.5 text-xs text-slate-400">
            Sign in to continue building your content engine
          </p>
        </div>

        {/* Card Form */}
        <div className="mt-8 rounded-2xl bg-[#0F172A]/80 border border-slate-800/80 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
          {!isConfigured && (
            <div className="mb-6 p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div className="text-xs text-indigo-200">
                <span className="font-semibold text-indigo-300">Local Sandbox Mode:</span>{" "}
                Supabase credentials not yet detected in environment. You can test immediately using any email or one-click Demo Mode.
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 flex items-start gap-2 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                label="Email address"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Password
                </label>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              isLoading={isLoading}
            >
              Sign In to CreatorFlow
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>

          {/* Quick Demo Mode Action */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="w-full text-xs gap-2"
              onClick={handleDemoSignIn}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Launch Instant Demo Mode (1-Click)
            </Button>
          </div>

          <div className="mt-6 text-center text-xs text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
            >
              Create free account
            </Link>
          </div>
        </div>

        {/* Security reassurance */}
        <p className="mt-6 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <Lock className="w-3 h-3" />
          Protected with Row Level Security & Enterprise Encryption
        </p>
      </div>
    </div>
  );
}
