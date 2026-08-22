"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";

export function LandingPageSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased dark:bg-[#0b0f19] dark:text-slate-100 flex flex-col justify-between" aria-label="Loading page content">
      <div>
        {/* Navbar Skeleton */}
        <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#0b0f19]/80">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
              <div className="h-5 w-28 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="hidden md:flex items-center gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 w-16 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-900/10 dark:bg-slate-800" />
            </div>
          </div>
        </header>

        {/* Hero Skeleton */}
        <main className="mx-auto max-w-7xl px-5 pt-12 pb-16 sm:px-8 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="mx-auto h-7 w-56 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="mx-auto space-y-3">
              <div className="mx-auto h-10 w-full max-w-2xl animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="mx-auto h-10 w-4/5 max-w-xl animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="mx-auto space-y-2">
              <div className="mx-auto h-4 w-3/4 max-w-lg animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
              <div className="mx-auto h-4 w-2/3 max-w-md animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="flex items-center justify-center gap-4 pt-2">
              <div className="h-12 w-44 animate-pulse rounded-xl bg-slate-900/80 dark:bg-sky-500/80" />
              <div className="h-12 w-36 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>

          {/* Interactive Preview Skeleton */}
          <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-8 space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-1.5">
                  <div className="h-4 w-28 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-20 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <div className="h-4 w-32 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="h-40 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800/60" />
              </div>
              <div className="space-y-3">
                <div className="h-4 w-36 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="h-40 animate-pulse rounded-xl bg-sky-50/60 dark:bg-slate-800/80" />
              </div>
            </div>
          </div>

          {/* Feature Grid Skeleton */}
          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
                <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="h-5 w-32 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-2">
                  <div className="h-3.5 w-full animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3.5 w-4/5 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased dark:bg-[#0b0f19] dark:text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="mx-auto w-full flex-1 max-w-7xl px-5 py-8 sm:px-8 sm:py-12" aria-label="Loading workspace">
          {/* Content will fade in smoothly once loaded */}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export function ContactsSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased dark:bg-[#0b0f19] dark:text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="mx-auto w-full flex-1 max-w-4xl px-5 py-8 sm:px-8 sm:py-12" aria-label="Loading contacts">
        </main>
      </div>
      <Footer />
    </div>
  );
}

export function TemplatesSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased dark:bg-[#0b0f19] dark:text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="mx-auto w-full flex-1 max-w-4xl px-5 py-8 sm:px-8 sm:py-12" aria-label="Loading templates">
        </main>
      </div>
      <Footer />
    </div>
  );
}

export function HistorySkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased dark:bg-[#0b0f19] dark:text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="mx-auto w-full flex-1 max-w-4xl px-5 py-8 sm:px-8 sm:py-12" aria-label="Loading history">
        </main>
      </div>
      <Footer />
    </div>
  );
}

export function ComposeSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased dark:bg-[#0b0f19] dark:text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="mx-auto w-full flex-1 max-w-5xl px-5 py-8 sm:px-8 sm:py-12" aria-label="Loading compose">
        </main>
      </div>
      <Footer />
    </div>
  );
}

export function ImproveSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased dark:bg-[#0b0f19] dark:text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="mx-auto w-full flex-1 max-w-3xl px-5 py-8 sm:px-8 sm:py-12" aria-label="Loading improve">
        </main>
      </div>
      <Footer />
    </div>
  );
}

export function ReviewSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased dark:bg-[#0b0f19] dark:text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="mx-auto w-full flex-1 max-w-3xl px-5 py-8 sm:px-8 sm:py-12" aria-label="Loading review">
        </main>
      </div>
      <Footer />
    </div>
  );
}

export function SettingsSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased dark:bg-[#0b0f19] dark:text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="mx-auto w-full flex-1 max-w-2xl px-5 py-8 sm:px-8 sm:py-12" aria-label="Loading settings">
        </main>
      </div>
      <Footer />
    </div>
  );
}
