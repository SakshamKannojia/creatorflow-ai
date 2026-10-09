"use client";

import React from "react";
import { Sidebar } from "./sidebar";
import { ProtectedRoute } from "@/components/auth/protected-route";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#090D16] flex">
        <Sidebar />
        <main className="flex-1 min-w-0 md:pt-0 pt-16 flex flex-col">
          <div className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
