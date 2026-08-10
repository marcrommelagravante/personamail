"use client";

import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { Suspense, useState } from "react";
import { API_URL } from "../lib/api";

import Logo from "../components/Logo";

function LoginContent() {
  const searchParams = useSearchParams();
  const loggedOut = searchParams.get("logout") === "true";
  const [dismissToast, setDismissToast] = useState(false);

  const handleLogin = () => {
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.assign(`${API_URL}/auth/google/login`);
  };

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

      {/* Right Panel - White Surface */}
      <div className="flex flex-col justify-center bg-white p-8 sm:p-12 lg:p-16">
        <div className="mx-auto w-full max-w-sm animate-scale-in">
          {loggedOut && !dismissToast && (
            <div
              className="animate-slide-down-fade mb-8 flex items-center justify-between gap-3 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm font-medium text-sky-900 shadow-xs"
              role="status"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2
                  className="h-5 w-5 shrink-0 text-sky-600"
                  aria-hidden="true"
                />
                <span>Signed out successfully</span>
              </div>
              <button
                type="button"
                onClick={() => setDismissToast(true)}
                className="cursor-pointer text-xs font-semibold text-sky-700 hover:text-sky-900"
              >
                Dismiss
              </button>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-primary">
              Sign in to PersonaMail
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Access your personalized email assistant and communication
              profiles.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
          >
            <svg
              className="h-5 w-5 shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
              />
            </svg>
            <span>Continue with Google</span>
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>

          <p className="mt-8 text-center text-xs leading-relaxed text-slate-500">
            By continuing, you agree to PersonaMail’s single-sign-on OAuth
            security policies.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <p className="text-sm text-slate-500">Loading sign in…</p>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
