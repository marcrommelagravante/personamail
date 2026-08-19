"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImproveSkeleton } from "../components/SkeletonLoaders";
import PlaceholderHighlighter, {
  PlaceholderSummaryBanner,
} from "../components/PlaceholderHighlighter";
import { API_URL, fetchWithAuth } from "../lib/api";
import {
  RefreshCw,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  Sliders,
  FileText,
  Edit3,
  Eye,
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
  const [isLoadingContacts, setIsLoadingContacts] = useState(true);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<{
    subject: string;
    body: string;
  } | null>(null);
  const [editedSubject, setEditedSubject] = useState("");
  const [editedBody, setEditedBody] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWithAuth(`${API}/contacts/`)
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch(() => {
        // Quiet fallback if contacts load fails
      })
      .finally(() => setIsLoadingContacts(false));
  }, []);

  const handleRewrite = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setIsEditing(false);

    if (!contactId) {
      setError("Please select a contact to apply their communication profile.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetchWithAuth(`${API}/email/rewrite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact_id: contactId,
          original_text: originalText,
        }),
      });

      if (!res.ok) throw new Error("Failed to improve draft");
      const data = await res.json();
      setResult(data);
      setEditedSubject(data.subject);
      setEditedBody(data.body);
    } catch {
      setError("We couldn’t improve your draft right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    const subjectToCopy = isEditing || editedSubject ? editedSubject : result?.subject;
    const bodyToCopy = isEditing || editedBody ? editedBody : result?.body;
    if (!bodyToCopy && !subjectToCopy) return;
    const textToCopy = `Subject: ${subjectToCopy || ""}\n\n${bodyToCopy || ""}`;
    void navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-sky-400 dark:focus:ring-sky-400/20";

  if (isLoadingContacts) {
    return <ImproveSkeleton />;
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full flex-1 max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="animate-fade-in-up mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <Sliders className="h-3.5 w-3.5 text-slate-700 dark:text-slate-300" /> Adaptive Tone & Phrasing
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Improve
          </h1>
          <p className="mt-1.5 text-slate-600 dark:text-slate-300">
            Keep your original meaning while tailoring tone and phrasing for the recipient.
          </p>
        </div>

        <form
          onSubmit={handleRewrite}
          className="animate-fade-in-up animate-stagger-1 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-8"
        >
          <div>
            <label htmlFor="select-contact" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
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
              <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                No contacts found. You can add contact profiles under the Contacts tab.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="original-draft" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
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
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Improving draft…
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" /> Improve message
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
                <FileText className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                <h2 className="font-semibold text-slate-900 dark:text-white">Improved Message</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 active:scale-95"
                >
                  {isEditing ? (
                    <>
                      <Eye className="h-3.5 w-3.5" /> View
                    </>
                  ) : (
                    <>
                      <Edit3 className="h-3.5 w-3.5" /> Edit
                    </>
                  )}
                </button>
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
                      <Copy className="h-3.5 w-3.5" /> Copy message
                    </>
                  )}
                </button>
              </div>
            </div>

            <PlaceholderSummaryBanner
              subject={editedSubject}
              body={editedBody}
              onEditClick={() => setIsEditing(!isEditing)}
              isEditing={isEditing}
            />

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Subject</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedSubject}
                    onChange={(e) => setEditedSubject(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-medium text-primary outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                ) : (
                  <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                    <PlaceholderHighlighter
                      text={editedSubject}
                      onPlaceholderClick={() => setIsEditing(true)}
                    />
                  </p>
                )}
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Body</p>
                {isEditing ? (
                  <textarea
                    rows={10}
                    value={editedBody}
                    onChange={(e) => setEditedBody(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm leading-6 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                ) : (
                  <div className="mt-1 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-800 dark:bg-slate-950 dark:text-slate-200">
                    <PlaceholderHighlighter
                      text={editedBody}
                      onPlaceholderClick={() => setIsEditing(true)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

