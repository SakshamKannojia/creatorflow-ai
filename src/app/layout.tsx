import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#090D16",
};

export const metadata: Metadata = {
  title: "CreatorFlow AI — Create content. Stay consistent.",
  description:
    "Generate, personalize, organize and plan your social media content from one intelligent workspace.",
  keywords: [
    "content creator",
    "social media AI",
    "reel script generator",
    "content calendar",
    "social media planner",
    "AI caption generator",
    "Content DNA",
  ],
  authors: [{ name: "CreatorFlow AI" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark antialiased`}>
      <body className="min-h-screen bg-[#090D16] text-[#F8FAFC] font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
