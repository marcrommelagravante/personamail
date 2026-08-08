"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { API_URL } from "../lib/api";

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
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const loadTemplates = async () => {
    const response = await fetch(`${API}/templates/`, { credentials: "include" });
    if (!response.ok) throw new Error("Could not load templates");
    setTemplates(await response.json());
  };

  useEffect(() => {
    const loadPage = async () => {
      try {
        const [authResponse, templatesResponse] = await Promise.all([
          fetch(`${API}/auth/me`, { credentials: "include" }),
          fetch(`${API}/templates/`, { credentials: "include" }),
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    const url = editingId ? `${API}/templates/${editingId}` : `${API}/templates/`;
    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        credentials: "include",
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

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this template?")) return;
    setError("");
    try {
      const response = await fetch(`${API}/templates/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Could not delete template");
      await loadTemplates();
    } catch {
      setError("We couldn’t delete this template. Please try again.");
    }
  };

  const inputClass = "rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100";

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-sky-700">Ready when you are</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">Templates</h1>
            <p className="mt-2 text-slate-600">Save the messages you send often, then make them personal when needed.</p>
          </div>
          {isAuthenticated && <button onClick={() => { resetForm(); setShowForm(!showForm); }} className="rounded-lg bg-[#0F172A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">{showForm ? "Cancel" : "New template"}</button>}
        </div>

        {!isAuthenticated ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"><h2 className="font-semibold">Sign in to use templates</h2><p className="mt-2 text-sm text-slate-600">Your saved messages stay private to your PersonaMail account.</p></div>
        ) : (
          <>
            {showForm && <form onSubmit={handleSubmit} className="mb-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2">
              <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Template name" className={inputClass} />
              <input required value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} placeholder="Subject line" className={inputClass} />
              <input value={form.relationship} onChange={(event) => setForm({ ...form, relationship: event.target.value })} placeholder="Relationship (optional)" className={inputClass} />
              <select value={form.tone} onChange={(event) => setForm({ ...form, tone: event.target.value })} className={inputClass} aria-label="Suggested tone"><option value="">Suggested tone (optional)</option><option value="formal">Formal</option><option value="friendly">Friendly</option><option value="casual">Casual</option></select>
              <textarea required value={form.body} onChange={(event) => setForm({ ...form, body: event.target.value })} placeholder="Write your reusable message…" className={`${inputClass} min-h-40 sm:col-span-2`} />
              <button type="submit" className="rounded-lg bg-[#0F172A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 sm:col-span-2">{editingId ? "Update template" : "Save template"}</button>
            </form>}

            {error && <p className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</p>}
            {loading ? <p className="text-sm text-slate-500">Loading templates…</p> : templates.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center"><h2 className="font-semibold">No templates yet</h2><p className="mt-2 text-sm text-slate-600">Save a message you send often, so the next version starts closer to done.</p></div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {templates.map((template) => <article key={template.id} className="flex min-h-56 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex-1"><div className="flex flex-wrap gap-2 text-xs font-medium text-sky-700">{template.relationship && <span>{template.relationship}</span>}{template.tone && <span>{template.tone}</span>}</div><h2 className="mt-3 font-semibold">{template.name}</h2><p className="mt-1 text-sm text-slate-500">{template.subject}</p><p className="mt-4 line-clamp-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">{template.body}</p></div><div className="mt-5 flex gap-2"><button onClick={() => handleEdit(template)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50">Edit</button><button onClick={() => handleDelete(template.id)} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#0F172A]">Delete</button></div></article>)}
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
