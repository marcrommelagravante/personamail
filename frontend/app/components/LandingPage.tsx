"use client";

import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
} from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import LoginModal from "./LoginModal";
import LandingNavbar from "./LandingNavbar";
import Link from "next/link";
import { LandingPageSkeleton } from "./SkeletonLoaders";
import InteractiveFeatureDemo from "./landing/InteractiveFeatureDemo";



function LandingPageContent() {
  const searchParams = useSearchParams();
  const loggedOut = searchParams.get("logout") === "true";
  const [dismissToast, setDismissToast] = useState(false);
  const [isToastFading, setIsToastFading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);



  useEffect(() => {
    if (loggedOut && !dismissToast) {
      const timer = setTimeout(() => {
        setIsToastFading(true);
        const hideTimer = setTimeout(() => {
          setDismissToast(true);
        }, 300);
        return () => clearTimeout(hideTimer);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [loggedOut, dismissToast]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-primary antialiased transition-colors duration-200 dark:bg-[#0b0f19] dark:text-slate-100">
      {/* Signed Out Confirmation Toast with auto-fade */}
      {loggedOut && !dismissToast && (
        <div
          className={`fixed top-5 left-1/2 z-[100] flex w-[90%] max-w-md -translate-x-1/2 items-center justify-between gap-3 rounded-2xl border border-sky-200 bg-white/95 px-4 py-3 text-sm font-medium text-sky-900 shadow-xl backdrop-blur-md transition-all duration-300 dark:border-sky-800 dark:bg-slate-900/95 dark:text-sky-200 ${
            isToastFading
              ? "pointer-events-none -translate-y-4 opacity-0"
              : "animate-slide-down-fade translate-y-0 opacity-100"
          }`}
          role="status"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2
              className="h-5 w-5 shrink-0 text-sky-600 dark:text-sky-400"
              aria-hidden="true"
            />
            <span>Signed out of PersonaMail</span>
          </div>
          <button
            type="button"
            onClick={() => setDismissToast(true)}
            className="cursor-pointer rounded-lg px-2.5 py-1 text-xs font-semibold text-sky-700 transition-all duration-150 hover:-translate-y-0.5 hover:bg-sky-50 hover:text-sky-900 active:scale-95 dark:text-sky-300 dark:hover:bg-sky-950/60 dark:hover:text-sky-100"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 1. Header / Navigation Bar */}
      <LandingNavbar onLoginClick={() => setShowLoginModal(true)} />


      {/* 2. Hero Section (Combined with Prominent Product Preview) */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24">
        {/* Soft background radial highlight */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[400px] w-[640px] -translate-x-1/2 rounded-full bg-sky-200/40 dark:bg-sky-500/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <div className="animate-fade-in-up mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-semibold text-sky-900 dark:border-sky-800 dark:bg-sky-950/60 dark:text-sky-300">
              <Mail className="h-3.5 w-3.5 text-sky-700 dark:text-sky-400" aria-hidden="true" />
              Relationship-aware communication
            </span>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-primary dark:text-white sm:text-5xl sm:leading-tight">
              The right words for every relationship.
            </h1>

            <p className="mt-5 text-lg leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
              PersonaMail learns how you communicate with each person — and helps
              you write emails that sound like you, every time.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <button
                type="button"
                onClick={() => setShowLoginModal(true)}
                className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg active:scale-95 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 sm:w-auto"
              >
                Get Started
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
              <a
                href="#how-it-works"
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:text-primary hover:shadow-sm active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:w-auto"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* Single Prominent Interactive Product Preview Visual */}
          <ScrollReveal delayMs={100} scale={0.96} className="mx-auto mt-12 max-w-5xl">
            <InteractiveFeatureDemo feature="compose" />
          </ScrollReveal>
        </div>
      </section>

      {/* Sections 3, 4, 5 removed per user request */}

      {/* 6. Final CTA & Footer */}
      <section className="border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-[#0b0f19] sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-col gap-16">
          <ScrollReveal direction="up" distancePx={28} scale={0.96} className="text-center md:text-left max-w-2xl mx-auto md:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Write like you know exactly who you’re talking to.
            </h2>
            <p className="mt-4 text-xl font-medium text-sky-600 dark:text-sky-400">Because you do.</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Every conversation remembers who it’s for.
            </p>

            <div className="mt-8 flex justify-center md:justify-start">
              <button
                type="button"
                onClick={() => setShowLoginModal(true)}
                className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-base font-semibold text-primary transition-all duration-200 hover:-translate-y-1 hover:bg-sky-200 hover:shadow-xl active:scale-95 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
              >
                Get Started Now
                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" className="flex flex-col items-center md:items-end gap-6 border-t border-slate-200 dark:border-slate-800 pt-8">
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
              PersonaMail · © {new Date().getFullYear()} PersonaMail
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-4">
              <Link
                href="/#how-it-works"
                className="text-lg font-medium text-slate-600 transition-all duration-150 hover:-translate-y-0.5 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
              >
                Workflow
              </Link>
              <Link
                href="/privacy"
                className="text-lg font-medium text-slate-600 transition-all duration-150 hover:-translate-y-0.5 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
              >
                Privacy
              </Link>
              <Link
                href="/tech-stack"
                className="text-lg font-medium text-slate-600 transition-all duration-150 hover:-translate-y-0.5 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
              >
                Tech Stack
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Login Modal Overlay */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}

import HorizontalScrollTrack from "./landing/HorizontalScrollTrack";
import HeroPanel from "./landing/panels/HeroPanel";
import ProfilesPanel from "./landing/panels/ProfilesPanel";
import GeneratorPanel from "./landing/panels/GeneratorPanel";
import RewriterPanel from "./landing/panels/RewriterPanel";
import ReviewPanel from "./landing/panels/ReviewPanel";
import WorkflowPanel from "./landing/panels/WorkflowPanel";
import ClosingFooterPanel from "./landing/panels/ClosingFooterPanel";

export default function LandingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      {/* Mobile / Reduced Motion: Vertical Layout */}
      <div className="block md:hidden motion-reduce:block">
        <Suspense fallback={<LandingPageSkeleton />}>
          <LandingPageContent />
        </Suspense>
      </div>

      {/* Desktop: Horizontal GSAP Layout */}
      <div className="hidden md:block motion-reduce:hidden font-sans text-primary antialiased dark:bg-[#0b0f19] dark:text-slate-100">
        <Suspense fallback={<LandingPageSkeleton />}>
          {/* We duplicate the Header here so it can be fixed/styled specifically for the desktop layout without breaking mobile */}
          <LandingNavbar position="fixed" onLoginClick={() => setShowLoginModal(true)} />

          <HorizontalScrollTrack>
            <HeroPanel onGetStarted={() => setShowLoginModal(true)} />
            <ProfilesPanel />
            <GeneratorPanel />
            <RewriterPanel />
            <ReviewPanel />
            <WorkflowPanel />
            <ClosingFooterPanel onGetStarted={() => setShowLoginModal(true)} />
          </HorizontalScrollTrack>
        </Suspense>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}
