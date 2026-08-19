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
          <div className="space-y-8">
            {/* Hero Banner Skeleton */}
            <div className="flex flex-col justify-between gap-4 rounded-2xl bg-slate-900/90 px-6 py-6 shadow-xs sm:flex-row sm:items-center sm:px-8">
              <div className="space-y-2.5">
                <div className="h-4 w-40 animate-pulse rounded-full bg-slate-700/60" />
                <div className="h-8 w-64 animate-pulse rounded-xl bg-slate-700/60 sm:w-80" />
              </div>
              <div className="h-10 w-44 shrink-0 animate-pulse rounded-xl bg-slate-700/80" />
            </div>

            {/* Metric Strip Skeleton */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                  <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                  <div className="space-y-2 flex-1">
                    <div className="h-7 w-12 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3.5 w-28 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action Cards Skeleton */}
            <div className="grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
                  <div>
                    <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                    <div className="mt-4 h-5 w-28 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                    <div className="mt-2.5 space-y-1.5">
                      <div className="h-3.5 w-full animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                      <div className="h-3.5 w-4/5 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>
                  <div className="mt-6 pt-2 h-4 w-24 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                </div>
              ))}
            </div>

            {/* Recent Profiles Skeleton */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-5 w-32 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-20 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                    <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                    <div className="space-y-1.5">
                      <div className="h-3.5 w-20 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                      <div className="h-3 w-28 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Skeleton */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-5 w-36 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-24 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white shadow-xs dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-16 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                      <div className="h-4 w-48 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800 sm:w-64" />
                    </div>
                    <div className="h-3.5 w-16 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                  </div>
                ))}
              </div>
            </div>
          </div>
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
          {/* Header Skeleton */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <div className="h-6 w-44 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-8 w-36 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-64 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="h-10 w-32 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex min-h-[170px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                    <div className="space-y-1.5">
                      <div className="h-4 w-28 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                      <div className="h-3 w-36 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>
                  <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="h-3.5 w-4/5 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3.5 w-3/5 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <div className="h-8 w-16 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                  <div className="h-8 w-16 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
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

export function TemplatesSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased dark:bg-[#0b0f19] dark:text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="mx-auto w-full flex-1 max-w-4xl px-5 py-8 sm:px-8 sm:py-12" aria-label="Loading templates">
          {/* Header Skeleton */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <div className="h-6 w-40 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-8 w-44 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-72 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="h-10 w-36 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex min-h-60 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                      <div className="h-5 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                    </div>
                    <div className="h-4 w-12 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="h-5 w-36 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 w-4/5 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                  <div className="space-y-2 pt-2">
                    <div className="h-3.5 w-full animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3.5 w-5/6 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3.5 w-2/3 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="h-8 w-16 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                  <div className="h-8 w-16 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
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

export function HistorySkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased dark:bg-[#0b0f19] dark:text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="mx-auto w-full flex-1 max-w-4xl px-5 py-8 sm:px-8 sm:py-12" aria-label="Loading history">
          {/* Header Skeleton */}
          <div className="mb-8 space-y-2">
            <div className="h-6 w-36 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="h-8 w-32 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-64 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Filters & Search Row Skeleton */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 w-20 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
              ))}
            </div>
            <div className="h-9 w-full sm:w-64 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Row Cards Skeleton */}
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex h-16 items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900/90"
              >
                <div className="flex items-center gap-3.5">
                  <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                  <div className="space-y-1.5">
                    <div className="h-3.5 w-24 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                    <div className="h-4 w-48 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800 sm:w-64" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-16 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                  <div className="h-7 w-7 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
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

export function ComposeSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased dark:bg-[#0b0f19] dark:text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="mx-auto w-full flex-1 max-w-5xl px-5 py-8 sm:px-8 sm:py-12" aria-label="Loading compose">
          {/* Header Skeleton */}
          <div className="mb-8 space-y-2">
            <div className="h-6 w-36 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="h-8 w-48 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-72 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form Panel Skeleton */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 lg:col-span-2 space-y-6">
              <div className="space-y-2">
                <div className="h-4 w-28 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-32 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="h-32 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="pt-2">
                <div className="h-11 w-40 animate-pulse rounded-xl bg-slate-900/80 dark:bg-sky-500/80" />
              </div>
            </div>

            {/* Output Preview Skeleton */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                <div className="h-5 w-32 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-4/5 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="h-3.5 w-full animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="h-3.5 w-5/6 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                <div className="h-3.5 w-2/3 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          </div>
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
          {/* Header Skeleton */}
          <div className="mb-8 space-y-2">
            <div className="h-6 w-44 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="h-8 w-28 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-64 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-8 space-y-6">
            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
              <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-36 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
              <div className="h-36 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="flex justify-end pt-2">
              <div className="h-11 w-36 animate-pulse rounded-xl bg-slate-900/80 dark:bg-sky-500/80" />
            </div>
          </div>
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
          {/* Header Skeleton */}
          <div className="mb-8 space-y-2">
            <div className="h-6 w-40 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="h-8 w-28 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-72 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-8 space-y-6">
            <div className="space-y-2">
              <div className="h-4 w-40 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
              <div className="h-40 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="flex justify-end pt-2">
              <div className="h-11 w-36 animate-pulse rounded-xl bg-slate-900/80 dark:bg-sky-500/80" />
            </div>
          </div>
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
          {/* Header Skeleton */}
          <div className="mb-8 space-y-2">
            <div className="h-4 w-40 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
            <div className="h-8 w-32 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-72 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-6 space-y-5">
            <div className="space-y-2">
              <div className="h-4 w-24 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
              <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
              <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
              <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="pt-2">
              <div className="h-11 w-36 animate-pulse rounded-xl bg-slate-900/80 dark:bg-sky-500/80" />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
