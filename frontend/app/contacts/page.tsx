"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { API_URL } from "../lib/api";

type Contact = {
  id: string;
  name: string;
  email: string | null;
  relationship: string;
  tone: string;
  greeting: string | null;
  closing: string | null;
  notes: string | null;
};

const emptyForm = {
  name: "",
  email: "",
  relationship: "",
  tone: "formal",
  greeting: "",
  closing: "",
  notes: "",
};

const API = API_URL;

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/contacts/`, { credentials: "include" });
      if (!res.ok) throw new Error("Could not load contacts");
      setContacts(await res.json());
    } catch {
      setError("We couldn’t load your contacts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialContacts = async () => {
      try {
        const res = await fetch(`${API}/contacts/`, { credentials: "include" });
        if (!res.ok) throw new Error("Could not load contacts");
        setContacts(await res.json());
      } catch {
        setError("We couldn’t load your contacts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void loadInitialContacts();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const startNewContact = async () => {
    resetForm();
    try {
      const response = await fetch(`${API}/settings/`, { credentials: "include" });
      if (response.ok) {
        const settings = await response.json();
        setForm({
          ...emptyForm,
          tone: settings.default_tone || emptyForm.tone,
          greeting: settings.default_greeting || "",
          closing: settings.default_closing || "",
        });
      }
    } catch {
      // Keep the built-in defaults if settings are unavailable.
    } finally {
      setShowForm(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    const url = editingId ? `${API}/contacts/${editingId}` : `${API}/contacts/`;
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Could not save contact");
      resetForm();
      fetchContacts();
    } catch {
      setError("We couldn’t save this contact. Please try again.");
    }
  };

  const handleEdit = (contact: Contact) => {
    setForm({
      name: contact.name,
      email: contact.email || "",
      relationship: contact.relationship,
      tone: contact.tone,
      greeting: contact.greeting || "",
      closing: contact.closing || "",
      notes: contact.notes || "",
    });
    setEditingId(contact.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this contact?")) return;
    try {
      const res = await fetch(`${API}/contacts/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Could not delete contact");
      fetchContacts();
    } catch {
      setError("We couldn’t delete this contact. Please try again.");
    }
  };

  const inputClass = "rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100";

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-sky-700">Communication profiles</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">Contacts</h1>
            <p className="mt-2 text-slate-600">Remember the style that works best for each person.</p>
          </div>
          <button onClick={() => { if (showForm) resetForm(); else void startNewContact(); }} className="rounded-lg bg-[#0F172A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">
            {showForm ? "Cancel" : "Add contact"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2">
            <input type="text" placeholder="Name" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className={inputClass} />
            <input type="email" placeholder="Email (optional)" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className={inputClass} />
            <input type="text" placeholder="Relationship (for example, professor or client)" required value={form.relationship} onChange={(event) => setForm({ ...form, relationship: event.target.value })} className={inputClass} />
            <select value={form.tone} onChange={(event) => setForm({ ...form, tone: event.target.value })} className={inputClass} aria-label="Preferred tone">
              <option value="formal">Formal</option><option value="casual">Casual</option><option value="friendly">Friendly</option>
            </select>
            <input type="text" placeholder="Preferred greeting (optional)" value={form.greeting} onChange={(event) => setForm({ ...form, greeting: event.target.value })} className={inputClass} />
            <input type="text" placeholder="Preferred closing (optional)" value={form.closing} onChange={(event) => setForm({ ...form, closing: event.target.value })} className={inputClass} />
            <textarea placeholder="Notes (optional)" value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} className={`${inputClass} min-h-24 sm:col-span-2`} />
            <button type="submit" className="rounded-lg bg-[#0F172A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 sm:col-span-2">{editingId ? "Update contact" : "Save contact"}</button>
          </form>
        )}

        {error && <p className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</p>}
        {loading ? <p className="text-sm text-slate-500">Loading contacts…</p> : contacts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center"><h2 className="font-semibold">No contacts yet</h2><p className="mt-2 text-sm text-slate-600">Add someone to start building their communication profile.</p></div>
        ) : (
          <div className="flex flex-col gap-3">
            {contacts.map((contact) => (
              <article key={contact.id} className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div><p className="font-semibold">{contact.name}</p><p className="text-sm text-slate-500">{contact.relationship} · {contact.tone}</p>{contact.email && <p className="text-sm text-slate-400">{contact.email}</p>}</div>
                <div className="flex gap-2"><button onClick={() => handleEdit(contact)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50">Edit</button><button onClick={() => handleDelete(contact.id)} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#0F172A]">Delete</button></div>
              </article>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
