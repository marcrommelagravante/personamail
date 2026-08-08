"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

export default function GrammarCheckPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ corrected_text: string; changes_summary: string } | null>(null);
  const [error, setError] = useState("");

  const API = "http://localhost:8000";

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
    } catch (err) {
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
      <main className="mx-auto max-w-2xl p-8">
        <h1 className="mb-6 text-2xl font-bold">Grammar Checker</h1>

        <form onSubmit={handleCheck} className="flex flex-col gap-4">
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
              className="w-full rounded border p-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Checking..." : "Check Grammar"}
          </button>
        </form>

        {error && <p className="mt-4 text-red-600">{error}</p>}

        {result && (
          <div className="mt-8 rounded-lg border border-gray-300 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-semibold">Corrected Text</h2>
              <button
                onClick={copyToClipboard}
                className="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
              >
                Copy
              </button>
            </div>
            <p className="mb-4 whitespace-pre-wrap text-gray-700">
              {result.corrected_text}
            </p>
            <p className="text-sm italic text-gray-500">
              {result.changes_summary}
            </p>
          </div>
        )}
      </main>
    </>
  );
}