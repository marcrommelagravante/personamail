"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

type Contact = {
  id: string;
  name: string;
  relationship: string;
  tone: string;
};

export default function GeneratePage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactId, setContactId] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ subject: string; body: string } | null>(null);
  const [error, setError] = useState("");

  const API = "http://localhost:8000";

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
    } catch (err) {
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
      <main className="mx-auto max-w-2xl p-8">
        <h1 className="mb-6 text-2xl font-bold">AI Email Generator</h1>

        <form onSubmit={handleGenerate} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Contact</label>
            <select
              value={contactId}
              onChange={(e) => setContactId(e.target.value)}
              className="w-full rounded border p-2"
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
              className="w-full rounded border p-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Email"}
          </button>
        </form>

        {error && <p className="mt-4 text-red-600">{error}</p>}

        {result && (
          <div className="mt-8 rounded-lg border border-gray-300 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-semibold">Generated Email</h2>
              <button
                onClick={copyToClipboard}
                className="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
              >
                Copy
              </button>
            </div>
            <p className="mb-2 font-medium">Subject: {result.subject}</p>
            <p className="whitespace-pre-wrap text-gray-700">{result.body}</p>
          </div>
        )}
      </main>
    </>
  );
}