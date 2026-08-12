"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md";
}

export default function ThemeToggle({
  className = "",
  size = "md",
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const sizeClasses =
    size === "sm"
      ? "p-1.5 rounded-lg"
      : "p-2 rounded-xl";

  const iconClasses = size === "sm" ? "h-4 w-4" : "h-4 w-4";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={[
        "flex cursor-pointer items-center justify-center border transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
        sizeClasses,
        isDark
          ? "border-slate-800 bg-slate-800/80 text-amber-300 hover:bg-slate-700 hover:text-amber-200 hover:border-slate-700"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-primary hover:border-slate-300 shadow-xs",
        className,
      ].join(" ")}
    >
      {isDark ? (
        <Sun className={`${iconClasses} animate-scale-in`} aria-hidden="true" />
      ) : (
        <Moon className={`${iconClasses} animate-scale-in`} aria-hidden="true" />
      )}
    </button>
  );
}
