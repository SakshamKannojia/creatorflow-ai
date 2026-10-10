import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-slate-200 selection:bg-slate-800 selection:text-white">
      <header className="sticky top-0 z-50 bg-black border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white flex items-center justify-center text-black font-bold text-xs">
              CF
            </div>
            <span className="font-bold text-sm tracking-tight text-white">
              CreatorFlow
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="outline" size="sm">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-white mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-sm text-slate-400 leading-relaxed">
          <p>Effective Date: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-lg font-semibold text-white mt-8 mb-4">1. Information Collection</h2>
          <p>
            We collect information you provide directly to us when you register for an account, 
            update your profile, or use our services. This may include your name, email address, 
            and content you submit for processing.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8 mb-4">2. Use of Information</h2>
          <p>
            The information we collect is used strictly to provide, maintain, and improve our services, 
            to communicate with you, and to ensure technical functionality.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8 mb-4">3. Data Sharing</h2>
          <p>
            We do not sell your personal data. We may share data with third-party service providers 
            solely for the purpose of operating our infrastructure, subject to strict confidentiality agreements.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8 mb-4">4. Security</h2>
          <p>
            We implement industry-standard security measures to protect your data. However, no electronic 
            transmission is entirely secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8 mb-4">5. Contact</h2>
          <p>
            If you have questions regarding this Privacy Policy, please contact our support team.
          </p>
        </div>
      </main>
    </div>
  );
}
