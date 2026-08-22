"use client";

import { ShieldCheck, Server, Key, Cookie, Lock } from "lucide-react";
import LandingNavbar from "../components/LandingNavbar";
import ScrollReveal from "../components/ScrollReveal";
import { useState } from "react";
import LoginModal from "../components/LoginModal";

export default function PrivacyPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 selection:bg-sky-200 selection:text-sky-900 dark:selection:bg-sky-900 dark:selection:text-sky-100 font-sans antialiased">
      <LandingNavbar onLoginClick={() => setShowLoginModal(true)} />

      <main className="flex-1 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal direction="up" distancePx={30} scale={0.97}>
            <div className="mb-16 text-center md:text-left">
              <div className="inline-flex items-center justify-center rounded-full bg-sky-100 px-4 py-1.5 text-sm font-semibold text-sky-700 dark:bg-sky-900/40 dark:text-sky-300 mb-6">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Privacy & Security
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-slate-900 dark:text-white">
                Your data is yours. We just help you write better.
              </h1>
              <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                Last updated: August 2026
              </p>
              <p className="mt-6 text-xl leading-8 text-slate-600 dark:text-slate-400 max-w-2xl">
                PersonaMail is built on a foundation of trust. We don&apos;t train models on your emails, we don&apos;t read your contacts, and we secure everything server-side.
              </p>
            </div>
          </ScrollReveal>

          <div className="flex flex-col md:flex-row gap-12 lg:gap-24 relative">
            {/* Sticky Navigation */}
            <aside className="w-full md:w-56 lg:w-64 shrink-0">
              <nav className="sticky top-24 flex flex-row overflow-x-auto md:flex-col gap-1 pb-4 md:pb-0 scrollbar-hide text-sm font-medium">
                <a href="#ai-data" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200 whitespace-nowrap transition-colors">AI & Data</a>
                <a href="#auth" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200 whitespace-nowrap transition-colors">Authentication</a>
                <a href="#cookies" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200 whitespace-nowrap transition-colors">Cookies & Storage</a>
                <a href="#database" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200 whitespace-nowrap transition-colors">Database Security</a>
              </nav>
            </aside>

            {/* Content Sections */}
            <div className="flex-1 space-y-20">
              <ScrollReveal direction="up" distancePx={20}>
                <section id="ai-data" className="group scroll-mt-24">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 transition-colors">
                      <Server className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-semibold tracking-tight">AI & Data Processing</h2>
                  </div>
                  <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed">
                    <p>
                      All AI generation and rewriting is powered by the Groq API (Llama-3 models). When you generate an email, the necessary context (recipient name, tone, and your prompt) is sent to Groq. 
                    </p>
                    <ul className="mt-4 space-y-2 list-disc pl-5">
                      <li><strong>Zero Data Retention:</strong> Groq does not retain your prompts or generated text to train foundation models.</li>
                      <li><strong>Server-Side Only:</strong> Our API keys and communication with Groq happen exclusively on our secure backend. Your browser never interacts with the AI provider directly.</li>
                    </ul>
                  </div>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" distancePx={20}>
                <section id="auth" className="group scroll-mt-24">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 transition-colors">
                      <Key className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-semibold tracking-tight">Authentication & Google OAuth</h2>
                  </div>
                  <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed">
                    <p>
                      We use Google OAuth 2.0 to securely authenticate you. We only request the absolute minimum permissions needed to verify your identity (your name and email address).
                    </p>
                    <p className="mt-4">
                      PersonaMail <strong>does not</strong> request permissions to read your Gmail inbox, send emails on your behalf, or access your Google Contacts. All contacts managed in PersonaMail are stored independently in our encrypted database.
                    </p>
                  </div>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" distancePx={20}>
                <section id="cookies" className="group scroll-mt-24">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 transition-colors">
                      <Cookie className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-semibold tracking-tight">Cookies & Local Storage</h2>
                  </div>
                  <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed">
                    <p>
                      We prioritize your privacy and minimize tracking.
                    </p>
                    <ul className="mt-4 space-y-2 list-disc pl-5">
                      <li><strong>Authentication:</strong> We use secure, HTTP-only JWT cookies to maintain your logged-in session. These cannot be accessed by client-side scripts.</li>
                      <li><strong>Preferences:</strong> We use <code>localStorage</code> purely for interface preferences, such as remembering your Light/Dark mode theme choice and temporary draft states to prevent data loss if you accidentally close a tab.</li>
                      <li><strong>No Third-Party Trackers:</strong> We do not inject third-party ad trackers, analytics pixels, or cross-site tracking cookies.</li>
                    </ul>
                  </div>
                </section>
              </ScrollReveal>

              <ScrollReveal direction="up" distancePx={20}>
                <section id="database" className="group scroll-mt-24">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 transition-colors">
                      <Lock className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-semibold tracking-tight">Database Security</h2>
                  </div>
                  <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed">
                    <p>
                      Your data (contacts, templates, and history) is stored in a secure PostgreSQL database hosted on Neon Serverless.
                    </p>
                    <p className="mt-4">
                      Every database query is strictly scoped to your authenticated user ID. We use parameterized queries via SQLAlchemy to prevent SQL injection, and enforce strict CORS policies to ensure requests only originate from our official frontend.
                    </p>
                  </div>
                </section>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </main>

      {/* Footer removed per user request */}

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
