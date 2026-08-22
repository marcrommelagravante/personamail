"use client";

import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

interface LandingNavbarProps {
  position?: "sticky" | "fixed";
  onLoginClick: () => void;
}

export default function LandingNavbar({ position = "sticky", onLoginClick }: LandingNavbarProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const headerClass =
    position === "fixed"
      ? "fixed w-full top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90"
      : "sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90";

  return (
    <header className={headerClass}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Logo href="/" variant="full" size="md" onClick={scrollToTop} />

        {/* Navigation links removed per user request */}

        <div className="flex items-center gap-3">
          <ThemeToggle size="sm" />
          <button
            type="button"
            onClick={onLoginClick}
            className="cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-primary active:scale-95 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={onLoginClick}
            className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md active:scale-95 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
