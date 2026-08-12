"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

interface LogoProps {
  variant?: "full" | "icon" | "wordmark";
  theme?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function Logo({
  variant = "full",
  theme,
  size = "md",
  showTagline = false,
  className = "",
  href,
  onClick,
}: LogoProps) {
  const pathname = usePathname();
  const themeContext = useTheme();
  
  // Use explicit theme prop if passed, otherwise fall back to themeContext
  const isDark = theme ? theme === "dark" : themeContext?.theme === "dark";

  const sizeClasses = {
    sm: { icon: "h-7 w-7", text: "text-lg", tagline: "text-[9px]" },
    md: { icon: "h-9 w-9", text: "text-xl", tagline: "text-[11px]" },
    lg: { icon: "h-12 w-12", text: "text-3xl", tagline: "text-xs" },
  }[size];

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
    }
    // If clicking on logo when already on the href page (e.g. '/' on landing page or dashboard), scroll to top smoothly
    if (href && (pathname === href || (href === "/" && (pathname === "/" || pathname === "/landing")))) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const content = (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Official PersonaMail Brand Vector Icon */}
      {(variant === "full" || variant === "icon") && (
        <div className={`relative shrink-0 ${sizeClasses.icon}`}>
          <svg
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full object-contain"
          >
            <defs>
              <linearGradient id="pm-cyan-fold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>
            </defs>

            {/* Stylized P Shell (Navy in Light Mode, White/Slate in Dark Mode) */}
            <path
              d="M 32 10 C 18 10 10 18 10 32 L 10 88 C 10 102 18 110 32 110 L 52 110 C 66 110 74 102 74 88 L 74 66 L 82 66 C 102 66 112 52 112 36 C 112 18 100 10 82 10 Z M 44 32 C 44 26 50 22 58 22 L 78 22 C 88 22 94 28 94 36 C 94 44 88 50 78 50 L 58 50 C 50 50 44 44 44 36 Z"
              className={isDark ? "fill-white" : "fill-[#0F172A]"}
            />

            {/* Cyan Envelope Fold in Bottom Loop */}
            <path
              d="M 10 76 L 52 110 C 52 110 74 102 74 88 L 74 66 Z"
              fill="url(#pm-cyan-fold)"
            />

            {/* 3 Cyan Dots in Chat Bubble */}
            <circle cx="56" cy="36" r="5" fill="#38BDF8" />
            <circle cx="68" cy="36" r="5" fill="#38BDF8" />
            <circle cx="80" cy="36" r="5" fill="#38BDF8" />
          </svg>
        </div>
      )}

      {/* PersonaMail Wordmark */}
      {(variant === "full" || variant === "wordmark") && (
        <div className="flex flex-col">
          <span
            className={`font-bold tracking-tight ${sizeClasses.text} ${
              isDark ? "text-white" : "text-slate-900 dark:text-white"
            }`}
          >
            Persona<span className="text-[#38BDF8] dark:text-[#7CE3FF]">Mail</span>
          </span>
          {showTagline && (
            <span
              className={`font-semibold tracking-wider uppercase ${sizeClasses.tagline} ${
                isDark ? "text-slate-400" : "text-slate-500 dark:text-slate-400"
              }`}
            >
              Every conversation remembers who it’s for.
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={handleClick}
        className="inline-flex rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7CE3FF]"
      >
        {content}
      </Link>
    );
  }

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {content}
    </div>
  );
}
