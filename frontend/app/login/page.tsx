"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { Suspense, useState } from "react";
import { API_URL } from "../lib/api";

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
      {/* Left Panel - Dark Surface */}
      <div className="flex flex-col justify-between bg-primary p-8 text-white sm:p-12 lg:p-16">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
          >
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-base font-bold text-white"
            >
              P
            </span>
            <span className="text-xl font-semibold tracking-tight text-white">
              Persona<span className="text-sky-300">Mail</span>
            </span>
          </Link>
        </div>

        <div className="my-auto py-12">
          <p className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-sky-200">
            <Mail className="h-4 w-4" aria-hidden="true" />
            Your communication workspace
          </p>
          <h1 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-5xl">
            Relationship-aware communication.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
            Every conversation remembers who it’s for. Write thoughtfully, keep
            your voice, and adapt naturally to each contact.
          </p>
        </div>

        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} PersonaMail. All rights reserved.
        </p>
      </div>

      {/* Right Panel - White Surface */}
      <div className="flex flex-col justify-center bg-white p-8 sm:p-12 lg:p-16">
        <div className="mx-auto w-full max-w-sm">
          {loggedOut && !dismissToast && (
            <div
              className="mb-8 flex items-center justify-between gap-3 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm font-medium text-sky-900 shadow-xs"
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
                className="text-xs font-semibold text-sky-700 hover:text-sky-900"
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
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
          >
            Continue with Google{" "}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          <p className="mt-8 text-center text-xs text-slate-500 leading-relaxed">
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
