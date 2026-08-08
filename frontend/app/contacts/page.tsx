"use client";

import { useEffect, useState } from "react";

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

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    relationship: "",
    tone: "formal",
    greeting: "",
    closing: "",
    notes: "",
  });

  const API = "http://localhost:8000";

  const fetchContacts = async () => {
    setLoading(true);
    const res = await fetch(`${API}/contacts/`, { credentials: "include" });
    if (res.ok) {
      setContacts(await res.json());
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      relationship: "",
      tone: "formal",
      greeting: "",
      closing: "",
      notes: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = editingId
      ? `${API}/contacts/${editingId}`
      : `${API}/contacts/`;
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      resetForm();
      fetchContacts();
    } else {
      alert("Failed to save contact");
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
    const res = await fetch(`${API}/contacts/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) fetchContacts();
  };

  return (
    <main className="mx-auto max-w-3xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Contacts</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "+ Add Contact"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 flex flex-col gap-3 rounded-lg border border-gray-300 p-4"
        >
          <input
            type="text"
            placeholder="Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded border p-2"
          />
          <input
            type="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded border p-2"
          />
          <input
            type="text"
            placeholder="Relationship (e.g. Professor, HR, Client, Friend)"
            required
            value={form.relationship}
            onChange={(e) =>
              setForm({ ...form, relationship: e.target.value })
            }
            className="rounded border p-2"
          />
          <select
            value={form.tone}
            onChange={(e) => setForm({ ...form, tone: e.target.value })}
            className="rounded border p-2"
          >
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
            <option value="friendly">Friendly</option>
          </select>
          <input
            type="text"
            placeholder="Preferred greeting (optional)"
            value={form.greeting}
            onChange={(e) => setForm({ ...form, greeting: e.target.value })}
            className="rounded border p-2"
          />
          <input
            type="text"
            placeholder="Preferred closing (optional)"
            value={form.closing}
            onChange={(e) => setForm({ ...form, closing: e.target.value })}
            className="rounded border p-2"
          />
          <textarea
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="rounded border p-2"
          />
          <button
            type="submit"
            className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            {editingId ? "Update Contact" : "Save Contact"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-gray-500">Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <p className="text-gray-500">No contacts yet. Add your first one!</p>
      ) : (
        <div className="flex flex-col gap-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
            >
              <div>
                <p className="font-semibold">{contact.name}</p>
                <p className="text-sm text-gray-500">
                  {contact.relationship} · {contact.tone}
                </p>
                {contact.email && (
                  <p className="text-sm text-gray-400">{contact.email}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(contact)}
                  className="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}