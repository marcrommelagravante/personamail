"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { API_URL } from "../lib/api";
import {
  Plus,
  User,
  HeartHandshake,
  Edit2,
  Trash2,
  X,
  AlertCircle,
  Loader2,
  Check,
} from "lucide-react";

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
  const [saving, setSaving] = useState(false);
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
      const response = await fetch(`${API}/settings/`, {
        credentials: "include",
      });
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
      // Keep built-in defaults if settings are unavailable
    } finally {
      setShowForm(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSaving(true);
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
      await fetchContacts();
    } catch {
      setError("We couldn’t save this contact. Please try again.");
    } finally {
      setSaving(false);
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
      await fetchContacts();
    } catch {
      setError("We couldn’t delete this contact. Please try again.");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10";

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="animate-fade-in-up mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              <HeartHandshake className="h-3.5 w-3.5 text-slate-700" /> Communication profiles
            </span>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              Contacts
            </h1>
            <p className="mt-1.5 text-slate-600">
              Remember the style, tone, and relationship that works best for each person.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (showForm) resetForm();
              else void startNewContact();
            }}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            {showForm ? (
              <>
                <X className="h-4 w-4" /> Cancel
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" /> Add contact
              </>
            )}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="animate-scale-in mb-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2"
          >
            <div className="sm:col-span-2">
              <h2 className="text-base font-semibold text-slate-900">
                {editingId ? "Edit Contact Profile" : "New Contact Profile"}
              </h2>
              <p className="text-xs text-slate-500">
                PersonaMail will automatically tailor email tone and phrasing to match this contact.
              </p>
            </div>

            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Jane Doe"
                required
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="contact-relationship" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Relationship <span className="text-red-500">*</span>
              </label>
              <input
                id="contact-relationship"
                type="text"
                placeholder="e.g. Professor, Client, Manager"
                required
                value={form.relationship}
                onChange={(event) =>
                  setForm({ ...form, relationship: event.target.value })
                }
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="contact-tone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Preferred Tone
              </label>
              <select
                id="contact-tone"
                value={form.tone}
                onChange={(event) =>
                  setForm({ ...form, tone: event.target.value })
                }
                className={inputClass}
                aria-label="Preferred tone"
              >
                <option value="formal">Formal</option>
                <option value="friendly">Friendly</option>
                <option value="casual">Casual</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-greeting" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Preferred Greeting
              </label>
              <input
                id="contact-greeting"
                type="text"
                placeholder="e.g. Dear Dr. Smith,"
                value={form.greeting}
                onChange={(event) =>
                  setForm({ ...form, greeting: event.target.value })
                }
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="contact-closing" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Preferred Closing
              </label>
              <input
                id="contact-closing"
                type="text"
                placeholder="e.g. Best regards,"
                value={form.closing}
                onChange={(event) =>
                  setForm({ ...form, closing: event.target.value })
                }
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="contact-notes" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Notes & Communication Preferences
              </label>
              <textarea
                id="contact-notes"
                placeholder="e.g. Prefers concise bullet points, values formal academic titles."
                value={form.notes}
                onChange={(event) =>
                  setForm({ ...form, notes: event.target.value })
                }
                className={`${inputClass} min-h-24`}
              />
            </div>

            <div className="flex justify-end gap-3 sm:col-span-2 pt-2">
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Saving…
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" /> {editingId ? "Update contact" : "Save contact"}
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {error && (
          <div
            className="mb-6 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            <span className="text-sm">Loading contacts…</span>
          </div>
        ) : contacts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <User className="h-6 w-6" />
            </div>
            <h2 className="mt-4 font-semibold text-slate-900">No contacts added yet</h2>
            <p className="mx-auto mt-1.5 max-w-sm text-sm text-slate-600">
              Add contacts to build adaptive communication profiles so generated messages automatically sound like you.
            </p>
            <button
              type="button"
              onClick={() => void startNewContact()}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Plus className="h-4 w-4" /> Add your first contact
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {contacts.map((contact) => (
              <article
                key={contact.id}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 sm:flex-row sm:items-center"
              >
                <div className="flex items-start gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {contact.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-slate-900">{contact.name}</h2>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 capitalize">
                        {contact.tone}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-slate-600">
                      {contact.relationship}
                      {contact.email && (
                        <span className="text-slate-400"> · {contact.email}</span>
                      )}
                    </p>
                    {contact.notes && (
                      <p className="mt-2 text-xs text-slate-500 line-clamp-1 italic">
                        &quot;{contact.notes}&quot;
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleEdit(contact)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    <Edit2 className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDelete(contact.id)}
                    className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
