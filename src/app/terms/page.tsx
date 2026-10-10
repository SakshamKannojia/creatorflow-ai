import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsAndConditions() {
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
        <h1 className="text-3xl font-semibold text-white mb-8">Terms and Conditions</h1>
        
        <div className="space-y-6 text-sm text-slate-400 leading-relaxed">
          <p>Effective Date: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-lg font-semibold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using CreatorFlow, you agree to be bound by these Terms and Conditions. 
            If you disagree with any part of the terms, you do not have permission to access the service.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8 mb-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily access the materials (information or software) on 
            CreatorFlow's website for personal, non-commercial transitory viewing only.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8 mb-4">3. User Obligations</h2>
          <p>
            You agree to use the platform only for lawful purposes and in a way that does not infringe 
            the rights of, restrict, or inhibit anyone else's use and enjoyment of the platform.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8 mb-4">4. Limitations</h2>
          <p>
            In no event shall CreatorFlow or its suppliers be liable for any damages (including, without limitation, 
            damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
            to use the materials on CreatorFlow's website.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8 mb-4">5. Revisions and Errata</h2>
          <p>
            The materials appearing on CreatorFlow's website could include technical, typographical, or 
            photographic errors. We do not warrant that any of the materials on its website are accurate, 
            complete, or current.
          </p>
        </div>
      </main>
    </div>
  );
}
