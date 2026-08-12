"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API_URL, fetchWithAuth } from "../lib/api";
import {
  Plus,
  User,
  HeartHandshake,
  Edit2,
  Trash2,
  X,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
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
    setError("");
    try {
      const res = await fetchWithAuth(`${API}/contacts/`);
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
        const res = await fetchWithAuth(`${API}/contacts/`);
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

  useEffect(() => {
    if (!showForm) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") resetForm();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showForm]);

  const startNewContact = async () => {
    resetForm();
    try {
      const response = await fetchWithAuth(`${API}/settings/`);
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
      const res = await fetchWithAuth(url, {
        method,
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

  const [deletingContact, setDeletingContact] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (!deletingContact) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDeletingContact(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [deletingContact]);

  const handleDeleteClick = (contact: Contact) => {
    setDeletingContact({ id: contact.id, name: contact.name });
  };

  const confirmDeleteContact = async () => {
    if (!deletingContact) return;
    setIsDeleting(true);
    setError("");
    try {
      const res = await fetchWithAuth(`${API}/contacts/${deletingContact.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Could not delete contact");
      const name = deletingContact.name;
      setDeletingContact(null);
      await fetchContacts();
      showToast(`Contact "${name}" deleted`);
    } catch {
      setError("We couldn’t delete this contact. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-sky-400 dark:focus:ring-sky-400/20";

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full flex-1 max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="animate-fade-in-up mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <HeartHandshake className="h-3.5 w-3.5 text-slate-700 dark:text-slate-300" /> Communication profiles
            </span>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Contacts
            </h1>
            <p className="mt-1.5 text-slate-600 dark:text-slate-300">
              Remember the style, tone, and relationship that works best for each person.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (showForm) resetForm();
              else void startNewContact();
            }}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-sm dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
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
          <div
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            role="dialog"
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 sm:p-6 backdrop-blur-sm animate-fade-in-up"
            onClick={resetForm}
          >
            <form
              onSubmit={handleSubmit}
              onClick={(e) => e.stopPropagation()}
              className="animate-scale-in w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 grid gap-4 sm:grid-cols-2"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800 sm:col-span-2">
                <div>
                  <h2 id="contact-modal-title" className="text-base font-semibold text-slate-900 dark:text-white">
                    {editingId ? "Edit Contact Profile" : "New Contact Profile"}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    PersonaMail will automatically tailor email tone and phrasing to match this contact.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
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

              <div className="flex justify-end gap-3 sm:col-span-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50 active:scale-[0.98] cursor-pointer"
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
          </div>
        )}

        {error && (
          <div
            className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            <div className="flex items-center gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p>{error}</p>
            </div>
            <button
              type="button"
              onClick={() => void fetchContacts()}
              className="font-semibold text-red-700 underline hover:text-red-900 cursor-pointer shrink-0"
            >
              Try again
            </button>
          </div>
        )}

        {loading ? (
          <div className="space-y-3" aria-label="Loading contacts">
            <div className="h-20 animate-pulse rounded-2xl bg-slate-200" />
            <div className="h-20 animate-pulse rounded-2xl bg-slate-200" />
            <div className="h-20 animate-pulse rounded-2xl bg-slate-200" />
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
                className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-slate-700 sm:flex-row sm:items-center"
              >
                <div className="flex items-start gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white dark:bg-sky-950 dark:text-sky-300">
                    {contact.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-slate-900 dark:text-white">{contact.name}</h2>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300 capitalize">
                        {contact.tone}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
                      {contact.relationship}
                      {contact.email && (
                        <span className="text-slate-400 dark:text-slate-500"> · {contact.email}</span>
                      )}
                    </p>
                    {contact.notes && (
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-1 italic">
                        &quot;{contact.notes}&quot;
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleEdit(contact)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    <Edit2 className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteClick(contact)}
                    className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/40 dark:hover:text-red-400 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />

      {/* Delete Confirmation Modal */}
      {deletingContact && (
        <div
          aria-modal="true"
          aria-labelledby="delete-modal-title"
          role="dialog"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 sm:p-6 backdrop-blur-sm animate-fade-in-up"
          onClick={() => setDeletingContact(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-scale-in space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 id="delete-modal-title" className="text-base font-semibold text-slate-900">
                  Delete Contact Profile?
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  Are you sure you want to delete <span className="font-semibold text-slate-900">{deletingContact.name}</span>? PersonaMail will no longer adapt tone and style for this contact profile.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeletingContact(null)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => void confirmDeleteContact()}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700 active:scale-[0.98] disabled:opacity-50 cursor-pointer shadow-xs"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Deleting…
                  </>
                ) : (
                  <>
                    <Trash2 className="h-3.5 w-3.5" /> Delete contact
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-900 px-4 py-3 text-xs font-medium text-white shadow-2xl animate-slide-down-fade"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}
    </>
  );
}
