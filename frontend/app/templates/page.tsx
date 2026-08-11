"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API_URL, fetchWithAuth } from "../lib/api";
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  Copy,
  Check,
  X,
  Loader2,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

type Template = {
  id: string;
  name: string;
  subject: string;
  body: string;
  relationship: string | null;
  tone: string | null;
};

const emptyForm = {
  name: "",
  subject: "",
  body: "",
  relationship: "",
  tone: "",
};

const API = API_URL;

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadTemplates = async () => {
    const response = await fetchWithAuth(`${API}/templates/`);
    if (!response.ok) throw new Error("Could not load templates");
    setTemplates(await response.json());
  };

  useEffect(() => {
    const loadPage = async () => {
      try {
        const [authResponse, templatesResponse] = await Promise.all([
          fetchWithAuth(`${API}/auth/me`),
          fetchWithAuth(`${API}/templates/`),
        ]);
        if (!authResponse.ok) {
          setIsAuthenticated(false);
          return;
        }
        if (!templatesResponse.ok) throw new Error("Could not load templates");
        setTemplates(await templatesResponse.json());
      } catch {
        setError("We couldn’t load your templates. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void loadPage();
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSaving(true);
    const url = editingId
      ? `${API}/templates/${editingId}`
      : `${API}/templates/`;
    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetchWithAuth(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          relationship: form.relationship || null,
          tone: form.tone || null,
        }),
      });
      if (!response.ok) throw new Error("Could not save template");
      resetForm();
      await loadTemplates();
    } catch {
      setError("We couldn’t save this template. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (template: Template) => {
    setForm({
      name: template.name,
      subject: template.subject,
      body: template.body,
      relationship: template.relationship || "",
      tone: template.tone || "",
    });
    setEditingId(template.id);
    setShowForm(true);
  };

  const [deletingTemplate, setDeletingTemplate] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (!deletingTemplate) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDeletingTemplate(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [deletingTemplate]);

  const handleDeleteClick = (template: Template) => {
    setDeletingTemplate({ id: template.id, name: template.name });
  };

  const confirmDeleteTemplate = async () => {
    if (!deletingTemplate) return;
    setIsDeleting(true);
    setError("");
    try {
      const response = await fetchWithAuth(`${API}/templates/${deletingTemplate.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Could not delete template");
      const name = deletingTemplate.name;
      setDeletingTemplate(null);
      await loadTemplates();
      showToast(`Template "${name}" deleted`);
    } catch {
      setError("We couldn’t delete this template. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const copyTemplate = (template: Template) => {
    const textToCopy = `Subject: ${template.subject}\n\n${template.body}`;
    void navigator.clipboard.writeText(textToCopy);
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10";

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full flex-1 max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="animate-fade-in-up mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              <FileText className="h-3.5 w-3.5 text-slate-700" /> Reusable blueprints
            </span>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              Templates
            </h1>
            <p className="mt-1.5 text-slate-600">
              Save the messages you send often, then tailor them with PersonaMail adaptive style profiles.
            </p>
          </div>
          {isAuthenticated && (
            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowForm(!showForm);
              }}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              {showForm ? (
                <>
                  <X className="h-4 w-4" /> Cancel
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" /> New template
                </>
              )}
            </button>
          )}
        </div>

        {!isAuthenticated ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <FileText className="h-6 w-6" />
            </div>
            <h2 className="mt-4 font-semibold text-slate-900">Sign in to manage templates</h2>
            <p className="mt-1.5 text-sm text-slate-600">
              Your saved template blueprints stay private to your account.
            </p>
          </div>
        ) : (
          <>
        {showForm && (
          <div
            aria-modal="true"
            aria-labelledby="template-modal-title"
            role="dialog"
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 sm:p-6 backdrop-blur-sm animate-fade-in-up"
            onClick={resetForm}
          >
            <form
              onSubmit={handleSubmit}
              onClick={(e) => e.stopPropagation()}
              className="animate-scale-in w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl grid gap-4 sm:grid-cols-2"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 sm:col-span-2">
                <div>
                  <h2 id="template-modal-title" className="text-base font-semibold text-slate-900">
                    {editingId ? "Edit Template" : "New Template Blueprint"}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Save key message patterns for re-use across various contacts.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div>
                <label htmlFor="template-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Template Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="template-name"
                  required
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  placeholder="e.g. Weekly Status Update"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="template-subject" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Subject Line <span className="text-red-500">*</span>
                </label>
                <input
                  id="template-subject"
                  required
                  value={form.subject}
                  onChange={(event) =>
                    setForm({ ...form, subject: event.target.value })
                  }
                  placeholder="e.g. Project Update - [Date]"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="template-relationship" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Suggested Relationship
                </label>
                <input
                  id="template-relationship"
                  value={form.relationship}
                  onChange={(event) =>
                    setForm({ ...form, relationship: event.target.value })
                  }
                  placeholder="e.g. Client or Stakeholder"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="template-tone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Suggested Tone
                </label>
                <select
                  id="template-tone"
                  value={form.tone}
                  onChange={(event) =>
                    setForm({ ...form, tone: event.target.value })
                  }
                  className={inputClass}
                  aria-label="Suggested tone"
                >
                  <option value="">Any tone</option>
                  <option value="formal">Formal</option>
                  <option value="friendly">Friendly</option>
                  <option value="casual">Casual</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="template-body" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Message Blueprint Body <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="template-body"
                  required
                  value={form.body}
                  onChange={(event) =>
                    setForm({ ...form, body: event.target.value })
                  }
                  placeholder="Write your reusable email content here..."
                  className={`${inputClass} min-h-40`}
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
                      <Check className="h-4 w-4" /> {editingId ? "Update template" : "Save template"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
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
              <div className="space-y-4" aria-label="Loading templates">
                <div className="h-28 animate-pulse rounded-2xl bg-slate-200" />
                <div className="h-28 animate-pulse rounded-2xl bg-slate-200" />
                <div className="h-28 animate-pulse rounded-2xl bg-slate-200" />
              </div>
            ) : templates.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  <FileText className="h-6 w-6" />
                </div>
                <h2 className="mt-4 font-semibold text-slate-900">No templates created yet</h2>
                <p className="mx-auto mt-1.5 max-w-sm text-sm text-slate-600">
                  Save messages you send frequently to quickly compose personalized emails for any contact.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowForm(true);
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  <Plus className="h-4 w-4" /> Create first template
                </button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {templates.map((template) => (
                  <article
                    key={template.id}
                    className="flex min-h-60 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {template.relationship && (
                            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                              {template.relationship}
                            </span>
                          )}
                          {template.tone && (
                            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 capitalize">
                              {template.tone}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => copyTemplate(template)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-900"
                          title="Copy subject and body"
                        >
                          {copiedId === template.id ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                              <Check className="h-3.5 w-3.5" /> Copied
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1">
                              <Copy className="h-3.5 w-3.5" /> Copy
                            </span>
                          )}
                        </button>
                      </div>

                      <h2 className="mt-3 font-semibold text-slate-900">{template.name}</h2>
                      <p className="mt-1 text-xs font-medium text-slate-500">
                        Subject: {template.subject}
                      </p>
                      <p className="mt-3 line-clamp-4 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                        {template.body}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center gap-2 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleEdit(template)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        <Edit2 className="h-3.5 w-3.5" /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(template)}
                        className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />

      {/* Delete Confirmation Modal */}
      {deletingTemplate && (
        <div
          aria-modal="true"
          aria-labelledby="delete-template-modal-title"
          role="dialog"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 sm:p-6 backdrop-blur-sm animate-fade-in-up"
          onClick={() => setDeletingTemplate(null)}
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
                <h3 id="delete-template-modal-title" className="text-base font-semibold text-slate-900">
                  Delete Template Blueprint?
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  Are you sure you want to delete <span className="font-semibold text-slate-900">{deletingTemplate.name}</span>? You will no longer be able to select this template blueprint for email generation.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeletingTemplate(null)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => void confirmDeleteTemplate()}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700 active:scale-[0.98] disabled:opacity-50 cursor-pointer shadow-xs"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Deleting…
                  </>
                ) : (
                  <>
                    <Trash2 className="h-3.5 w-3.5" /> Delete template
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
