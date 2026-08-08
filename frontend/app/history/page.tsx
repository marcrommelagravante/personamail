"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { API_URL } from "../lib/api";

type Activity = {
  id: string;
  kind: "compose" | "improve" | "review";
  input_text: string;
  subject: string | null;
  output_text: string;
  summary: string | null;
  created_at: string;
};

const labels = { compose: "Compose", improve: "Improve", review: "Review" };
const API = API_URL;

export default function HistoryPage() {
  const [items, setItems] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const loadHistory = async () => {
    const response = await fetch(`${API}/history/`, { credentials: "include" });
    if (!response.ok) throw new Error("Could not load history");
    setItems(await response.json());
  };

  useEffect(() => {
    const loadPage = async () => {
      try {
        const [authResponse, historyResponse] = await Promise.all([
          fetch(`${API}/auth/me`, { credentials: "include" }),
          fetch(`${API}/history/`, { credentials: "include" }),
        ]);
        if (!authResponse.ok) {
          setIsAuthenticated(false);
          return;
        }
        if (!historyResponse.ok) throw new Error("Could not load history");
        setItems(await historyResponse.json());
      } catch {
        setError("We couldn’t load your history. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void loadPage();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this history item?")) return;
    setError("");
    try {
      const response = await fetch(`${API}/history/${id}`, { method: "DELETE", credentials: "include" });
      if (!response.ok) throw new Error("Could not delete history item");
      await loadHistory();
    } catch {
      setError("We couldn’t delete this history item. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
        <div className="mb-8"><p className="text-sm font-medium text-sky-700">Your recent work</p><h1 className="mt-1 text-3xl font-semibold tracking-tight">History</h1><p className="mt-2 text-slate-600">Revisit messages you composed, improved, or reviewed.</p></div>
        {!isAuthenticated ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"><h2 className="font-semibold">Sign in to see your history</h2><p className="mt-2 text-sm text-slate-600">Your message history is private to your PersonaMail account.</p></div>
        ) : (
          <>
            {error && <p className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</p>}
            {loading ? <p className="text-sm text-slate-500">Loading your history…</p> : items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center"><h2 className="font-semibold">No history yet</h2><p className="mt-2 text-sm text-slate-600">Your composed, improved, and reviewed messages will appear here.</p></div>
            ) : (
              <div className="flex flex-col gap-4">
                {items.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start"><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-sky-700">{labels[item.kind]}</p><h2 className="mt-2 font-semibold">{item.subject || "Reviewed text"}</h2><p className="mt-1 text-xs text-slate-500">{new Date(item.created_at).toLocaleString()}</p></div><button onClick={() => handleDelete(item.id)} className="self-start rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#0F172A]">Delete</button></div><p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-700">{item.output_text}</p>{item.summary && <p className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-500">Summary: {item.summary}</p>}</article>)}
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
