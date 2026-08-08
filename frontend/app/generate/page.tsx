"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { API_URL } from "../lib/api";

type Contact = {
  id: string;
  name: string;
  relationship: string;
  tone: string;
};

const API = API_URL;

export default function GeneratePage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactId, setContactId] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ subject: string; body: string } | null>(null);
  const [error, setError] = useState("");


  useEffect(() => {
    fetch(`${API}/contacts/`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setContacts(data));
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!contactId) {
      setError("Please select a contact.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/email/generate`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact_id: contactId, purpose }),
      });

      if (!res.ok) throw new Error("Failed to generate email");
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
    navigator.clipboard.writeText(`Subject: ${result.subject}\n\n${result.body}`);
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-5 py-10 sm:px-8">
        <p className="text-sm font-medium text-sky-700">A message for the relationship</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Compose</h1>
        <p className="mt-2 mb-8 text-slate-600">Start with what you need to say. PersonaMail adapts it to your contact.</p>

        <form onSubmit={handleGenerate} className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div>
            <label className="mb-1 block text-sm font-medium">Contact</label>
            <select
              value={contactId}
              onChange={(e) => setContactId(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            >
              <option value="">Select a contact...</option>
              {contacts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.relationship} · {c.tone})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              What do you want to say?
            </label>
            <textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
              rows={4}
              placeholder="e.g. Ask for a one week extension on the final project deadline"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[#0F172A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Preparing your message…" : "Compose message"}
          </button>
        </form>

        {error && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</p>}

        {result && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-semibold">Your message</h2>
              <button
                onClick={copyToClipboard}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50"
              >
                Copy
              </button>
            </div>
            <p className="mb-2 font-medium">Subject: {result.subject}</p>
            <p className="whitespace-pre-wrap text-slate-700">{result.body}</p>
          </div>
        )}
      </main>
    </>
  );
}
