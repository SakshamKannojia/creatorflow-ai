"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Lock, User, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, isConfigured } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isPasswordLong = password.length >= 6;
  const isPasswordMatching = password.length > 0 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!displayName.trim()) {
      setErrorMessage("Please enter your creator or display name.");
      return;
    }
    if (!email.trim() || !password) {
      setErrorMessage("Please provide all required fields.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await signUp(email, password, displayName);
      if (error) {
        setErrorMessage(error);
        toast.error("Registration failed", error);
      } else {
        toast.success(
          "Account created!",
          "Welcome to CreatorFlow AI. Redirecting to your dashboard..."
        );
        router.push("/dashboard");
      }
    } catch {
      setErrorMessage("An unexpected error occurred during signup.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glowing ambient orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

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
            Create your CreatorFlow account
          </h2>
          <p className="mt-1.5 text-xs text-slate-400">
            Start generating high-converting content with your unique voice
          </p>
        </div>

        {/* Card Form */}
        <div className="mt-8 rounded-2xl bg-[#0F172A]/80 border border-slate-800/80 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 flex items-start gap-2 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                label="Creator or Channel Name"
                placeholder="e.g. Maya Tech / @mayacodes"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>

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
              <Input
                label="Password"
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            <div>
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            {/* Password Validation checklist */}
            <div className="py-1 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px]">
                <CheckCircle2
                  className={`w-3.5 h-3.5 ${
                    isPasswordLong ? "text-emerald-400" : "text-slate-600"
                  }`}
                />
                <span className={isPasswordLong ? "text-slate-300" : "text-slate-500"}>
                  Minimum 6 characters
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px]">
                <CheckCircle2
                  className={`w-3.5 h-3.5 ${
                    isPasswordMatching ? "text-emerald-400" : "text-slate-600"
                  }`}
                />
                <span className={isPasswordMatching ? "text-slate-300" : "text-slate-500"}>
                  Passwords match
                </span>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              isLoading={isLoading}
            >
              Start Creating Now
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
            >
              Sign in here
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <Lock className="w-3 h-3" />
          No credit card required. Free creator tier included.
        </p>
      </div>
    </div>
  );
}
