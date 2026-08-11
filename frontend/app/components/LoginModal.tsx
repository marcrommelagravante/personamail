"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Loader2, ShieldCheck, X } from "lucide-react";
import Logo from "./Logo";
import { API_URL } from "../lib/api";

type LoginModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  isEmbedded?: boolean;
};

export default function LoginModal({
  isOpen = true,
  onClose,
  isEmbedded = false,
}: LoginModalProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (!isOpen || isEmbedded) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isEmbedded, onClose]);

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    setIsConnecting(true);
    // Smooth intermediate loading animation phase before redirecting
    setTimeout(() => {
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign(`${API_URL}/auth/google/login`);
    }, 450);
  };

  const cardContent = (
    <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xl transition-all sm:p-8 animate-scale-in">
      {/* Background soft ambient highlight */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-accent/15 blur-2xl"
        aria-hidden="true"
      />

      {/* Close button if rendered inside a modal overlay */}
      {!isEmbedded && onClose && (
        <button
          type="button"
          onClick={onClose}
          disabled={isConnecting}
          className="absolute top-4 right-4 cursor-pointer rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          aria-label="Close sign in dialog"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      {/* Card Header & Brand Logo */}
      <div className="flex flex-col items-center text-center">
        <Logo href="/" variant="full" theme="light" size="md" />

        {!isConnecting ? (
          <>
            <h2
              id="login-modal-title"
              className="mt-6 text-2xl font-semibold tracking-tight text-primary"
            >
              Sign in to PersonaMail
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Access your personalized email assistant and adaptive
              communication profiles.
            </p>
          </>
        ) : (
          <div className="my-2 flex flex-col items-center animate-fade-in-up">
            <div className="relative my-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-900 shadow-inner">
              <Loader2 className="h-7 w-7 animate-spin text-sky-700" />
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-primary">
              Connecting to Google Workspace…
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Redirecting to Google Account Chooser…
            </p>
          </div>
        )}
      </div>

      {/* Primary Google Login Button / Loading Action */}
      {!isConnecting ? (
        <div className="mt-8 space-y-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="group flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
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
        </div>
      ) : (
        <div className="mt-8 flex justify-center">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-2/3 animate-pulse rounded-full bg-sky-500" />
          </div>
        </div>
      )}

      {/* Security & SSL Trust Footer */}
      <div className="mt-8 border-t border-slate-100 pt-5 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Protected by Google OAuth 2.0 SSL</span>
        </div>
        <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
          PersonaMail uses official single sign-on to ensure zero raw password
          exposure.
        </p>
      </div>
    </div>
  );

  if (isEmbedded) {
    return cardContent;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fade-in-up"
      onClick={() => {
        if (!isConnecting && onClose) onClose();
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>{cardContent}</div>
    </div>
  );
}
