"use client";

import { useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, Mail } from "lucide-react";
import { Suspense, useEffect, useState } from "react";

import Logo from "../components/Logo";
import LoginModal from "../components/LoginModal";

function LoginContent() {
  const searchParams = useSearchParams();
  const loggedOut = searchParams.get("logout") === "true";
  const authError = searchParams.get("error");
  const [dismissToast, setDismissToast] = useState(false);
  const [isToastFading, setIsToastFading] = useState(false);
  const [dismissError, setDismissError] = useState(false);

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
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Panel - Dark Surface with quiet radial glow */}
      <div className="relative flex flex-col justify-between overflow-hidden bg-primary p-8 text-white sm:p-12 lg:p-16">
        <div
          className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative z-10 animate-fade-in-up">
          <Logo href="/" variant="full" theme="dark" size="md" />
        </div>

        <div className="relative z-10 my-auto py-12">
          <p className="animate-fade-in-up animate-stagger-1 mb-4 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3.5 py-1.5 text-xs font-medium text-sky-200 backdrop-blur-xs">
            <Mail className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            Your communication workspace
          </p>
          <h1 className="animate-fade-in-up animate-stagger-2 max-w-xl text-3xl font-semibold tracking-tight sm:text-5xl">
            Relationship-aware communication.
          </h1>
          <p className="animate-fade-in-up animate-stagger-3 mt-6 max-w-lg text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Every conversation remembers who it’s for. Write thoughtfully, keep
            your voice, and adapt naturally to each contact.
          </p>
        </div>

        <p className="relative z-10 text-xs text-slate-400">
          © {new Date().getFullYear()} PersonaMail. All rights reserved.
        </p>
      </div>

      {/* Right Panel - Surface with Embedded Login Card */}
      <div className="flex flex-col justify-center bg-slate-50 p-6 dark:bg-slate-950 sm:p-12 lg:p-16">
        <div className="mx-auto w-full max-w-md">
          {loggedOut && !dismissToast && (
            <div
              className={`mb-6 flex items-center justify-between gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm font-medium text-sky-900 shadow-xs transition-all duration-300 dark:border-sky-900/60 dark:bg-sky-950/50 dark:text-sky-200 ${
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
                className="cursor-pointer rounded-lg px-2.5 py-1 text-xs font-semibold text-sky-700 transition-all duration-150 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-sky-900 active:scale-95 dark:text-sky-300 dark:hover:bg-sky-900/60 dark:hover:text-sky-100"
              >
                Dismiss
              </button>
            </div>
          )}

          {authError && !dismissError && (
            <div
              className="animate-slide-down-fade mb-6 flex items-center justify-between gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-900 shadow-xs dark:border-rose-900/60 dark:bg-rose-950/50 dark:text-rose-200"
              role="alert"
            >
              <div className="flex items-center gap-2.5">
                <AlertCircle
                  className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400"
                  aria-hidden="true"
                />
                <span>
                  {authError === "access_denied"
                    ? "Sign in was cancelled."
                    : "Sign in failed. Please try again."}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setDismissError(true)}
                className="cursor-pointer text-xs font-semibold text-rose-700 hover:text-rose-900 dark:text-rose-400 dark:hover:text-rose-200"
              >
                Dismiss
              </button>
            </div>
          )}

          <LoginModal isEmbedded={true} />
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
          <p className="text-sm text-slate-500 dark:text-slate-400">Loading sign in…</p>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
