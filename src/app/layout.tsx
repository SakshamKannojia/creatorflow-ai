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
  themeColor: "#f2ede4",
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
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-[#faf8f5] text-[#1c1611] font-sans">
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
