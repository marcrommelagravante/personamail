"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import { API_URL } from "../lib/api";

const API = API_URL;

export default function GrammarCheckPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    corrected_text: string;
    changes_summary: string;
  } | null>(null);
  const [error, setError] = useState("");

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch(`${API}/email/grammar-check`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("Failed to check grammar");
      const data = await res.json();
      setResult(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.corrected_text);
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-5 py-10 sm:px-8">
        <p className="text-sm font-medium text-sky-700">
          Clarity, without losing your voice
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Review</h1>
        <p className="mt-2 mb-8 text-slate-600">
          Check spelling, grammar, and clarity before you send.
        </p>

        <form
          onSubmit={handleCheck}
          className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div>
            <label className="mb-1 block text-sm font-medium">
              Text to check
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              rows={6}
              placeholder="Paste any text here to check grammar and clarity..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Reviewing your message…" : "Review message"}
          </button>
        </form>

        {error && (
          <p
            className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {error}
          </p>
        )}

        {result && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-semibold">Reviewed text</h2>
              <button
                onClick={copyToClipboard}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50"
              >
                Copy
              </button>
            </div>
            <p className="mb-4 whitespace-pre-wrap text-gray-700">
              {result.corrected_text}
            </p>
            <p className="text-sm italic text-slate-500">
              {result.changes_summary}
            </p>
          </div>
        )}
      </main>
    </>
  );
}
