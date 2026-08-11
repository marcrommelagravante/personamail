"use client";

import { useEffect, useState } from "react";
import { Loader2, LogOut, ShieldAlert, X } from "lucide-react";

type User = {
  id?: string;
  name: string;
  email: string;
  picture?: string;
};

type LogoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirmLogout: () => Promise<void> | void;
  user: User | null;
};

function getInitials(name: string): string {
  if (!name) return "PM";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function LogoutModal({
  isOpen,
  onClose,
  onConfirmLogout,
  user,
}: LogoutModalProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoggingOut) {
        onClose();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, isLoggingOut]);

  if (!isOpen) return null;

  const handleLogoutClick = async () => {
    setIsLoggingOut(true);
    // Smooth intermediate loading animation delay before redirecting
    await new Promise((resolve) => setTimeout(resolve, 550));
    await onConfirmLogout();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fade-in-up"
      onClick={() => {
        if (!isLoggingOut) onClose();
      }}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl transition-all sm:p-8 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        {!isLoggingOut && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 cursor-pointer rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close logout dialog"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 shadow-inner">
            <ShieldAlert className="h-6 w-6" aria-hidden="true" />
          </div>

          <h2
            id="logout-modal-title"
            className="mt-4 text-xl font-semibold tracking-tight text-primary"
          >
            Are you sure you want to log out?
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            You will need to sign in again to access your communication profiles.
          </p>
        </div>

        {/* User Account Card */}
        {user && (
          <div className="mt-6 flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-xs">
            {user.picture ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.picture}
                alt={user.name}
                className="h-11 w-11 shrink-0 rounded-full border border-slate-200 object-cover"
              />
            ) : (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white shadow-xs">
                {getInitials(user.name)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-primary">
                {user.name}
              </p>
              <p className="truncate text-xs text-slate-500">{user.email}</p>
              <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-900">
                Adaptive Tone Active
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons & Loading State */}
        <div className="mt-6 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={handleLogoutClick}
            disabled={isLoggingOut}
            className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-80"
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span>Securing session &amp; signing out…</span>
              </>
            ) : (
              <>
                <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Log out</span>
              </>
            )}
          </button>

          {!isLoggingOut && (
            <button
              type="button"
              onClick={onClose}
              className="flex w-full cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:text-primary active:scale-[0.98]"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
