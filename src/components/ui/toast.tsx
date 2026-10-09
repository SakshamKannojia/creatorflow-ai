"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

let globalShowToast: ((toast: Omit<ToastItem, "id">) => void) | null = null;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ type = "info", title, description, duration = 4000 }: Omit<ToastItem, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { id, type, title, description, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  globalShowToast = showToast;

  const success = useCallback(
    (title: string, description?: string) => showToast({ type: "success", title, description }),
    [showToast]
  );
  const error = useCallback(
    (title: string, description?: string) => showToast({ type: "error", title, description }),
    [showToast]
  );
  const info = useCallback(
    (title: string, description?: string) => showToast({ type: "info", title, description }),
    [showToast]
  );
  const warning = useCallback(
    (title: string, description?: string) => showToast({ type: "warning", title, description }),
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{ toasts, showToast, removeToast, success, error, info, warning }}
    >
      {children}
      <div
        aria-live="assertive"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      >
        {toasts.map((toast) => {
          return (
            <div
              key={toast.id}
              role="alert"
              className={cn(
                "pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-md transition-all duration-200 animate-in fade-in slide-in-from-bottom-5",
                toast.type === "success" &&
                  "bg-[#0F172A]/95 border-emerald-500/30 text-emerald-100",
                toast.type === "error" &&
                  "bg-[#0F172A]/95 border-rose-500/30 text-rose-100",
                toast.type === "warning" &&
                  "bg-[#0F172A]/95 border-amber-500/30 text-amber-100",
                toast.type === "info" &&
                  "bg-[#0F172A]/95 border-indigo-500/30 text-indigo-100"
              )}
            >
              <div className="shrink-0 mt-0.5">
                {toast.type === "success" && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                )}
                {toast.type === "error" && (
                  <AlertCircle className="w-5 h-5 text-rose-400" />
                )}
                {toast.type === "warning" && (
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                )}
                {toast.type === "info" && (
                  <Info className="w-5 h-5 text-indigo-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-100">
                  {toast.title}
                </div>
                {toast.description && (
                  <div className="text-xs text-slate-400 mt-1 break-words">
                    {toast.description}
                  </div>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 text-slate-400 hover:text-white p-1 transition-colors rounded-lg hover:bg-white/5"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export const toast = {
  success: (title: string, description?: string) => {
    if (globalShowToast) globalShowToast({ type: "success", title, description });
  },
  error: (title: string, description?: string) => {
    if (globalShowToast) globalShowToast({ type: "error", title, description });
  },
  info: (title: string, description?: string) => {
    if (globalShowToast) globalShowToast({ type: "info", title, description });
  },
  warning: (title: string, description?: string) => {
    if (globalShowToast) globalShowToast({ type: "warning", title, description });
  },
};
