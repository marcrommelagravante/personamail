"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ReviewSkeleton } from "../components/SkeletonLoaders";
import { API_URL, fetchWithAuth } from "../lib/api";
import {
  CheckCircle2,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  FileCheck,
} from "lucide-react";

const API = API_URL;

export default function GrammarCheckPage() {
  const [text, setText] = useState("");
  const [isMounting, setIsMounting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<{
    corrected_text: string;
    changes_summary: string;
  } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsMounting(false);
  }, []);

  if (isMounting) {
    return <ReviewSkeleton />;
  }

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await fetchWithAuth(`${API}/email/grammar-check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("Failed to review text");
      const data = await res.json();
      setResult(data);
    } catch {
      setError("We couldn’t review your text right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    void navigator.clipboard.writeText(result.corrected_text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-sky-400 dark:focus:ring-sky-400/20";

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full flex-1 max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="animate-fade-in-up mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <CheckCircle2 className="h-3.5 w-3.5 text-slate-700 dark:text-slate-300" /> Polish & Proofread
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Review
          </h1>
          <p className="mt-1.5 text-slate-600 dark:text-slate-300">
            Check spelling, grammar, and clarity before sending — without losing your voice.
          </p>
        </div>

        <form
          onSubmit={handleCheck}
          className="animate-fade-in-up animate-stagger-1 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-8"
        >
          <div>
            <label htmlFor="review-text" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Message Text to Review <span className="text-red-500">*</span>
            </label>
            <textarea
              id="review-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              rows={6}
              placeholder="Paste any email text here to check grammar, spelling, and phrasing clarity…"
              className={`${inputClass} min-h-36`}
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Reviewing text…
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Review message
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div
            className="animate-slide-down-fade mt-6 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
            role="alert"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="animate-scale-in mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                <h2 className="font-semibold text-slate-900 dark:text-white">Reviewed Output</h2>
              </div>
              <button
                type="button"
                onClick={copyToClipboard}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Copy text
                  </>
                )}
              </button>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-800 dark:bg-slate-950 dark:text-slate-200 whitespace-pre-wrap">
                {result.corrected_text}
              </div>

              {result.changes_summary && (
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                  <span className="font-medium text-slate-700 dark:text-slate-300 not-italic">Key Changes:</span> {result.changes_summary}
                </p>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
