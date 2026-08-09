"use client";

import { Check, Copy, Mail, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { API_URL } from "../lib/api";

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
    fetch(`${API}/contacts/`, { credentials: "include" })
      .then((response) => {
        if (!response.ok) throw new Error("Could not load contacts");
        return response.json();
      })
      .then(setContacts)
      .catch(() => setError("We couldn’t load your contacts. Refresh the page and try again."))
      .finally(() => setIsLoadingContacts(false));
  }, []);

  const selectedContact = contacts.find((contact) => contact.id === contactId);

  const handleGenerate = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setResult(null);
    if (!contactId) { setError("Choose who this message is for before composing."); return; }
    setLoading(true);
    try {
      const response = await fetch(`${API}/email/generate`, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contact_id: contactId, purpose }) });
      if (!response.ok) throw new Error("Could not compose message");
      setResult(await response.json());
    } catch {
      setError("We couldn’t prepare your message. Please try again.");
    } finally { setLoading(false); }
  };

  const copyToClipboard = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(`Subject: ${result.subject}\n\n${result.body}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return <><Navbar /><main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12"><div className="mb-8 max-w-2xl"><p className="text-sm font-semibold text-sky-700">A message that fits the relationship</p><h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Compose</h1><p className="mt-3 text-base leading-7 text-slate-600">Choose a contact, explain the outcome you need, and start with a thoughtful draft.</p></div><div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.82fr)]"><form onSubmit={handleGenerate} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="space-y-6"><div><label htmlFor="contact" className="mb-2 block text-sm font-semibold text-[#0F172A]">Who is this for?</label><select id="contact" value={contactId} onChange={(event) => setContactId(event.target.value)} disabled={isLoadingContacts} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 disabled:bg-slate-50"><option value="">{isLoadingContacts ? "Loading contacts…" : "Choose a contact"}</option>{contacts.map((contact) => <option key={contact.id} value={contact.id}>{contact.name} · {contact.relationship} · {contact.tone}</option>)}</select>{!isLoadingContacts && contacts.length === 0 && <p className="mt-2 text-sm text-slate-600">Add a contact first so PersonaMail can use the right communication style.</p>}</div><div><label htmlFor="purpose" className="mb-2 block text-sm font-semibold text-[#0F172A]">What needs to happen?</label><textarea id="purpose" value={purpose} onChange={(event) => setPurpose(event.target.value)} required rows={7} placeholder="For example: ask for a one-week extension on the final project, explain that I have been unwell, and propose a new deadline." className="w-full resize-y rounded-xl border border-slate-300 px-3 py-3 text-sm leading-6 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100" /><p className="mt-2 text-sm text-slate-500">Include the key fact, your request, and any deadline or next step.</p></div>{error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</p>}<button type="submit" disabled={loading || isLoadingContacts || contacts.length === 0} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50">{loading ? "Preparing your message…" : <><Mail className="h-4 w-4" aria-hidden="true" /> Compose message</>}</button></div></form><aside className="space-y-5"><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-2"><UserRound className="h-4 w-4 text-sky-700" aria-hidden="true" /><h2 className="font-semibold">Message context</h2></div>{selectedContact ? <div className="mt-4"><p className="font-medium text-[#0F172A]">{selectedContact.name}</p><p className="mt-1 text-sm text-slate-600">{selectedContact.relationship} · {selectedContact.tone} tone</p></div> : <p className="mt-4 text-sm leading-6 text-slate-600">Select a contact to use their saved relationship and communication style.</p>}</div>{result ? <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold text-sky-700">Draft ready</p><h2 className="mt-1 font-semibold">Your message</h2></div><button type="button" onClick={copyToClipboard} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-[#0F172A] hover:bg-slate-50">{copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}{copied ? "Copied" : "Copy"}</button></div><div className="mt-5 border-y border-slate-100 py-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Subject</p><p className="mt-1 font-medium text-[#0F172A]">{result.subject}</p></div><p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">{result.body}</p></div> : <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5"><p className="font-semibold text-[#0F172A]">Your draft will appear here</p><p className="mt-2 text-sm leading-6 text-slate-600">Review it, make it yours, then copy it into your email client.</p></div>}</aside></div></main></>;
}
