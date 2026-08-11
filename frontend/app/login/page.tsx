"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle2, Mail } from "lucide-react";
import { Suspense, useState } from "react";

import Logo from "../components/Logo";
import LoginModal from "../components/LoginModal";

function LoginContent() {
  const searchParams = useSearchParams();
  const loggedOut = searchParams.get("logout") === "true";
  const [dismissToast, setDismissToast] = useState(false);

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

      {/* Right Panel - White Surface with Embedded Login Card */}
      <div className="flex flex-col justify-center bg-slate-50 p-6 sm:p-12 lg:p-16">
        <div className="mx-auto w-full max-w-md">
          {loggedOut && !dismissToast && (
            <div
              className="animate-slide-down-fade mb-6 flex items-center justify-between gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm font-medium text-sky-900 shadow-xs"
              role="status"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2
                  className="h-5 w-5 shrink-0 text-sky-600"
                  aria-hidden="true"
                />
                <span>Signed out of PersonaMail</span>
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
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <p className="text-sm text-slate-500">Loading sign in…</p>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}

