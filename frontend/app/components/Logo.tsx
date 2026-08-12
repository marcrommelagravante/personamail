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
    sm: { icon: "h-8 w-8 rounded-lg", text: "text-lg", tagline: "text-[9px]" },
    md: { icon: "h-10 w-10 rounded-xl", text: "text-xl", tagline: "text-[11px]" },
    lg: { icon: "h-12 w-12 rounded-2xl", text: "text-3xl", tagline: "text-xs" },
  }[size];

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
    }
    // If clicking on logo when already on the href page, scroll to top smoothly
    if (href && (pathname === href || (href === "/" && (pathname === "/" || pathname === "/landing")))) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const content = (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* PersonaMail Stylized P Icon */}
      {(variant === "full" || variant === "icon") && (
        <div
          className={`relative shrink-0 flex items-center justify-center bg-slate-900 shadow-xs border border-slate-800 dark:bg-slate-800 dark:border-slate-700/80 ${sizeClasses.icon}`}
        >
          <svg className="h-3/5 w-3/5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 3.5H13.5C16.8137 3.5 19.5 6.18629 19.5 9.5C19.5 12.8137 16.8137 15.5 13.5 15.5H10V20.5H5V3.5Z"
              fill="url(#logo-p-grad)"
            />
            <path
              d="M10 7.5H13.5C14.6046 7.5 15.5 8.39543 15.5 9.5C15.5 10.6046 14.6046 11.5 13.5 11.5H10V7.5Z"
              className="fill-slate-900 dark:fill-slate-800"
            />
            <circle cx="18" cy="4.5" r="2" fill="#7CE3FF" />
            <defs>
              <linearGradient id="logo-p-grad" x1="5" y1="3.5" x2="20" y2="20.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7CE3FF" />
                <stop offset="1" stopColor="#38BDF8" />
              </linearGradient>
            </defs>
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
            Persona<span className="text-[#7CE3FF]">Mail</span>
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
