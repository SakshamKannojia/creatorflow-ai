"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Loader2 } from "lucide-react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#090D16] flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 blur-xl -z-10 animate-pulse" />
          </div>
          <p className="text-xs text-slate-400 font-medium tracking-wide">
            Loading CreatorFlow...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
