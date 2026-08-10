"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { API_URL } from "../lib/api";
import {
  Wand2,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

type Contact = {
  id: string;
  name: string;
  relationship: string;
  tone: string;
};

const API = API_URL;

export default function RewritePage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactId, setContactId] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<{
    subject: string;
    body: string;
  } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API}/contacts/`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch(() => {
        // Quiet fallback if contacts load fails
      });
  }, []);

  const handleRewrite = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!contactId) {
      setError("Please select a contact to apply their communication profile.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/email/rewrite`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact_id: contactId,
          original_text: originalText,
        }),
      });

      if (!res.ok) throw new Error("Failed to improve email draft");
      const data = await res.json();
      setResult(data);
    } catch {
      setError("We couldn’t improve your draft right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    const textToCopy = `Subject: ${result.subject}\n\n${result.body}`;
    void navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200";

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Wand2 className="h-3.5 w-3.5" /> Adaptive Tone & Phrasing
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Improve
          </h1>
          <p className="mt-1.5 text-slate-600">
            Keep your original meaning while tailoring tone and phrasing for the recipient.
          </p>
        </div>

        <form
          onSubmit={handleRewrite}
          className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div>
            <label htmlFor="select-contact" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Recipient Contact <span className="text-red-500">*</span>
            </label>
            <select
              id="select-contact"
              value={contactId}
              onChange={(e) => setContactId(e.target.value)}
              className={inputClass}
              required
            >
              <option value="">Select a contact profile…</option>
              {contacts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.relationship} · {c.tone})
                </option>
              ))}
            </select>
            {contacts.length === 0 && (
              <p className="mt-1.5 text-xs text-slate-500">
                No contacts found. You can add contact profiles under the Contacts tab.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="original-draft" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Your Rough Draft <span className="text-red-500">*</span>
            </label>
            <textarea
              id="original-draft"
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              required
              rows={6}
              placeholder="Paste your rough draft or notes here…"
              className={`${inputClass} min-h-36`}
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Improving draft…
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" /> Improve message
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div
            className="mt-6 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-slate-700" />
                <h2 className="font-semibold text-slate-900">Improved Message</h2>
              </div>
              <button
                type="button"
                onClick={copyToClipboard}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Copy message
                  </>
                )}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Subject</p>
                <p className="mt-1 font-semibold text-slate-900">{result.subject}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Body</p>
                <div className="mt-1 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">
                  {result.body}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
