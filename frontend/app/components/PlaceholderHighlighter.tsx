"use client";

import React, { useMemo } from "react";
import { Tag, Edit3, Eye } from "lucide-react";

interface PlaceholderHighlighterProps {
  text: string;
  className?: string;
  placeholderClassName?: string;
  onPlaceholderClick?: (placeholder: string) => void;
}

// Regex to detect bracketed variable tags e.g. [Your Name], [Assignment Name]
const PLACEHOLDER_REGEX = /(\[[^\]]+\])/g;

export function extractPlaceholders(text: string | null | undefined): string[] {
  if (!text) return [];
  const matches = text.match(PLACEHOLDER_REGEX);
  if (!matches) return [];
  // Return unique placeholders in order of appearance
  return Array.from(new Set(matches));
}

export default function PlaceholderHighlighter({
  text,
  className = "",
  placeholderClassName = "",
  onPlaceholderClick,
}: PlaceholderHighlighterProps) {
  const parts = useMemo(() => {
    if (!text) return [];
    return text.split(PLACEHOLDER_REGEX);
  }, [text]);

  if (!text) return null;

  return (
    <span className={`whitespace-pre-wrap ${className}`}>
      {parts.map((part, index) => {
        if (part.startsWith("[") && part.endsWith("]")) {
          return (
            <span
              key={index}
              onClick={() => onPlaceholderClick?.(part)}
              title="Fill-in placeholder: replace before sending"
              className={`inline-flex items-center mx-0.5 px-1.5 py-0.5 rounded-md text-xs font-semibold tracking-wide bg-sky-100 text-sky-800 border border-sky-300 dark:bg-sky-950/80 dark:text-sky-300 dark:border-sky-700/80 transition-all duration-150 ${
                onPlaceholderClick ? "cursor-pointer hover:bg-sky-200 dark:hover:bg-sky-900" : ""
              } ${placeholderClassName}`}
            >
              {part}
            </span>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
}

interface PlaceholderSummaryBannerProps {
  subject?: string | null;
  body: string | null;
  onEditClick?: () => void;
  isEditing?: boolean;
}

export function PlaceholderSummaryBanner({
  subject,
  body,
  onEditClick,
  isEditing = false,
}: PlaceholderSummaryBannerProps) {
  const allPlaceholders = useMemo(() => {
    const combined = `${subject || ""} ${body || ""}`;
    return extractPlaceholders(combined);
  }, [subject, body]);

  if (allPlaceholders.length === 0) return null;

  return (
    <div className="animate-slide-down-fade mb-3 rounded-xl border border-sky-200 bg-sky-50/80 p-3 text-xs text-sky-900 dark:border-sky-800/80 dark:bg-sky-950/50 dark:text-sky-200">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <Tag className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-600 dark:text-sky-400" aria-hidden="true" />
          <div>
            <p className="font-semibold text-sky-900 dark:text-sky-100">
              {allPlaceholders.length} {allPlaceholders.length === 1 ? "placeholder" : "placeholders"} to customize before sending
            </p>
            <p className="mt-0.5 text-slate-600 dark:text-slate-300">
              Replace bracketed fields like <code className="rounded bg-sky-100/90 px-1 py-0.5 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200">{allPlaceholders.slice(0, 2).join(", ")}</code> with your details.
            </p>
          </div>
        </div>
        {onEditClick && (
          <button
            type="button"
            onClick={onEditClick}
            className="inline-flex cursor-pointer shrink-0 items-center gap-1 rounded-lg border border-sky-300 bg-white px-2.5 py-1 text-xs font-semibold text-sky-700 transition hover:bg-sky-50 dark:border-sky-700 dark:bg-slate-900 dark:text-sky-300 dark:hover:bg-slate-800 active:scale-95"
          >
            {isEditing ? (
              <>
                <Eye className="h-3 w-3" /> View Tags
              </>
            ) : (
              <>
                <Edit3 className="h-3 w-3" /> Fill In Details
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
