"use client";

import { Layers, Server, Database, Brain, Zap, Boxes, Network } from "lucide-react";
import LandingNavbar from "../components/LandingNavbar";
import ScrollReveal from "../components/ScrollReveal";
import { useState } from "react";
import LoginModal from "../components/LoginModal";

export default function TechStackPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 selection:bg-sky-200 selection:text-sky-900 dark:selection:bg-sky-900 dark:selection:text-sky-100 font-sans antialiased">
      <LandingNavbar onLoginClick={() => setShowLoginModal(true)} />

      <main className="flex-1 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal direction="up" distancePx={30} scale={0.97}>
            <div className="mb-20 text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-slate-200/50 px-4 py-1.5 text-sm font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-200 mb-6 border border-slate-300/50 dark:border-slate-700">
                <Layers className="mr-2 h-4 w-4" />
                Architecture
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-slate-900 dark:text-white">
                The PersonaMail Stack
              </h1>
              <p className="mt-6 text-xl leading-8 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                A modern, decoupled architecture designed for speed, security, and exceptional AI performance.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 mb-20">
            {/* Frontend Card */}
            <ScrollReveal direction="up" distancePx={20} className="delay-100">
              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 h-full">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <svg className="h-6 w-6" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180ZM147.202 140.751C131.782 158.468 112.023 170.923 89.8465 174.582L144.137 101.405L147.202 140.751ZM122.95 62.0673L72.4497 130.134C53.7915 120.301 39.5398 103.228 32.7231 82.2618L84.2868 12.8718C99.6833 -7.86906 123.636 1.83852 122.95 62.0673Z" fill="currentColor" />
                  </svg>
                </div>
                <h3 className="mb-6 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Frontend</h3>
                <ul className="space-y-4 text-base font-medium text-slate-800 dark:text-slate-200">
                  <li className="flex items-center gap-3">
                    <img src="https://cdn.simpleicons.org/nextdotjs" alt="Next.js" className="h-5 w-5 dark:invert" /> Next.js (App Router)
                  </li>
                  <li className="flex items-center gap-3">
                    <img src="https://cdn.simpleicons.org/react" alt="React" className="h-5 w-5" /> React & TypeScript
                  </li>
                  <li className="flex items-center gap-3">
                    <img src="https://cdn.simpleicons.org/tailwindcss" alt="Tailwind CSS" className="h-5 w-5" /> Tailwind CSS v4
                  </li>
                  <li className="flex items-center gap-3">
                    <img src="https://cdn.simpleicons.org/vercel" alt="Vercel" className="h-5 w-5 dark:invert" /> Hosted on Vercel
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            {/* Backend Card */}
            <ScrollReveal direction="up" distancePx={20} className="delay-200">
              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 h-full">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <Server className="h-6 w-6" />
                </div>
                <h3 className="mb-6 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Backend</h3>
                <ul className="space-y-4 text-base font-medium text-slate-800 dark:text-slate-200">
                  <li className="flex items-center gap-3">
                    <img src="https://cdn.simpleicons.org/fastapi" alt="FastAPI" className="h-5 w-5" /> FastAPI & Python
                  </li>
                  <li className="flex items-center gap-3">
                    <Boxes className="h-5 w-5 text-indigo-500" /> Pydantic Schemas
                  </li>
                  <li className="flex items-center gap-3">
                    <img src="https://cdn.simpleicons.org/google" alt="Google" className="h-5 w-5" /> Google OAuth 2.0 (JWT)
                  </li>
                  <li className="flex items-center gap-3">
                    <img src="https://cdn.simpleicons.org/render" alt="Render" className="h-5 w-5 dark:invert" /> Hosted on Render
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            {/* Database Card */}
            <ScrollReveal direction="up" distancePx={20} className="delay-300">
              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 h-full">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="mb-6 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Database</h3>
                <ul className="space-y-4 text-base font-medium text-slate-800 dark:text-slate-200">
                  <li className="flex items-center gap-3">
                    <img src="https://cdn.simpleicons.org/postgresql" alt="PostgreSQL" className="h-5 w-5" /> PostgreSQL
                  </li>
                  <li className="flex items-center gap-3">
                    <Network className="h-5 w-5 text-sky-500" /> SQLAlchemy ORM
                  </li>
                  <li className="flex items-center gap-3">
                    <Database className="h-5 w-5 text-emerald-500" /> Alembic Migrations
                  </li>
                  <li className="flex items-center gap-3">
                    <img src="https://cdn.simpleicons.org/neon" alt="Neon" className="h-5 w-5" /> Neon Serverless
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            {/* AI & Logic Card */}
            <ScrollReveal direction="up" distancePx={20} className="delay-500">
              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 h-full">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className="mb-6 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">AI Engine</h3>
                <ul className="space-y-4 text-base font-medium text-slate-800 dark:text-slate-200">
                  <li className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-rose-500" /> Groq API (LPU Inference)
                  </li>
                  <li className="flex items-center gap-3">
                    <img src="https://cdn.simpleicons.org/meta" alt="Meta" className="h-5 w-5" /> Llama-3.3-70b-versatile
                  </li>
                  <li className="flex items-center gap-3">
                    <Brain className="h-5 w-5 text-rose-500" /> Tone Calibration Engine
                  </li>
                  <li className="flex items-center gap-3">
                    <img src="https://cdn.simpleicons.org/json" alt="JSON" className="h-5 w-5 dark:invert" /> Strict JSON Output Parsing
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>


          <div className="mt-12 text-center">
            <a href="https://github.com/marcrommelagravante/personamail" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              View source on GitHub
            </a>
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
