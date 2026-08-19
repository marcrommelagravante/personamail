"use client";

import { Check, Copy, Loader2, Mail, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ComposeSkeleton } from "../components/SkeletonLoaders";
import { API_URL, fetchWithAuth } from "../lib/api";

type Contact = { id: string; name: string; relationship: string; tone: string };
type Message = { subject: string; body: string };

const API = API_URL;

export default function GeneratePage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactId, setContactId] = useState("");
  const [purpose, setPurpose] = useState("");
  const [isLoadingContacts, setIsLoadingContacts] = useState(true);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<Message | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWithAuth(`${API}/contacts/`)
      .then((response) => {
        if (!response.ok) throw new Error("Could not load contacts");
        return response.json();
      })
      .then(setContacts)
      .catch(() =>
        setError(
          "We couldn’t load your contacts. Refresh the page and try again.",
        ),
      )
      .finally(() => setIsLoadingContacts(false));
  }, []);

  const selectedContact = contacts.find((contact) => contact.id === contactId);

  const handleGenerate = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setResult(null);
    if (!contactId) {
      setError("Choose who this message is for before composing.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${API}/email/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact_id: contactId, purpose }),
      });
      if (!response.ok) throw new Error("Could not compose message");
      setResult(await response.json());
    } catch {
      setError("We couldn’t prepare your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    void navigator.clipboard.writeText(
      `Subject: ${result.subject}\n\n${result.body}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoadingContacts) {
    return <ComposeSkeleton />;
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full flex-1 max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
        <header className="animate-fade-in-up mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <Mail className="h-3.5 w-3.5 text-slate-700 dark:text-slate-300" /> Start from scratch
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Compose Message
          </h1>
          <p className="mt-1.5 text-slate-600 dark:text-slate-300">
            Create a complete email using your relationship context for the recipient.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          <form
            onSubmit={(e) => void handleGenerate(e)}
            className="animate-fade-in-up animate-stagger-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 lg:col-span-2"
          >
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="contact"
                  className="mb-2 block text-sm font-semibold text-primary dark:text-white"
                >
                  Who is this for?
                </label>
                <select
                  id="contact"
                  value={contactId}
                  onChange={(event) => setContactId(event.target.value)}
                  disabled={isLoadingContacts}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-sky-400 dark:focus:ring-sky-400/20 disabled:bg-slate-50 dark:disabled:bg-slate-950"
                >
                  <option value="">
                    {isLoadingContacts
                      ? "Loading contacts…"
                      : "Choose a contact"}
                  </option>
                  {contacts.map((contact) => (
                    <option key={contact.id} value={contact.id}>
                      {contact.name} · {contact.relationship} · {contact.tone}
                    </option>
                  ))}
                </select>
                {!isLoadingContacts && contacts.length === 0 && (
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Add a contact first so PersonaMail can use the right
                    communication style.
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="purpose"
                  className="mb-2 block text-sm font-semibold text-primary dark:text-white"
                >
                  What needs to happen?
                </label>
                <textarea
                  id="purpose"
                  value={purpose}
                  onChange={(event) => setPurpose(event.target.value)}
                  required
                  rows={7}
                  placeholder="For example: ask for a one-week extension on the final project, explain that I have been unwell, and propose a new deadline."
                  className="w-full resize-y rounded-xl border border-slate-300 px-3 py-3 text-sm leading-6 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-sky-400 dark:focus:ring-sky-400/20"
                />
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Include the key fact, your request, and any deadline or next
                  step.
                </p>
              </div>
              {error && (
                <p
                  className="animate-slide-down-fade rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
                  role="alert"
                >
                  {error}
                </p>
              )}
              <button
                type="button"
                onClick={(e) => void handleGenerate(e)}
                disabled={loading || isLoadingContacts || contacts.length === 0}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Composing your message…
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4" aria-hidden="true" /> Compose message
                  </>
                )}
              </button>
            </div>
          </form>
          <aside className="animate-fade-in-up animate-stagger-2 space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <UserRound
                  className="h-4 w-4 text-sky-700 dark:text-sky-400"
                  aria-hidden="true"
                />
                <h2 className="font-semibold text-slate-900 dark:text-white">Message context</h2>
              </div>
              {selectedContact ? (
                <div className="mt-4">
                  <p className="font-medium text-primary dark:text-white">
                    {selectedContact.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {selectedContact.relationship} · {selectedContact.tone} tone
                  </p>
                </div>
              ) : (
                <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Select a contact to use their saved relationship and
                  communication style.
                </p>
              )}
            </div>
            {result ? (
              <div className="animate-scale-in rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-sky-700 dark:text-sky-400">
                      Draft ready
                    </p>
                    <h2 className="mt-1 font-semibold text-slate-900 dark:text-white">Your message</h2>
                  </div>
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-primary transition-all hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 active:scale-95"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    ) : (
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    )}
                    {copied ? <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied</span> : "Copy"}
                  </button>
                </div>
                <div className="mt-5 border-y border-slate-100 py-4 dark:border-slate-800">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Subject
                  </p>
                  <p className="mt-1 font-medium text-primary dark:text-white">
                    {result.subject}
                  </p>
                </div>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:text-slate-200">
                  {result.body}
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/60">
                <p className="font-semibold text-primary dark:text-white">
                  Your draft will appear here
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Review it, make it yours, then copy it into your email client.
                </p>
              </div>
            )}
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
