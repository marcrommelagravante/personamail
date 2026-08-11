"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API_URL, fetchWithAuth } from "../lib/api";
import {
  Clock,
  PenTool,
  RefreshCw,
  CheckCircle2,
  Trash2,
  Copy,
  Check,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Activity = {
  id: string;
  kind: "compose" | "improve" | "review";
  input_text: string;
  subject: string | null;
  output_text: string;
  summary: string | null;
  created_at: string;
};

const labels = {
  compose: { title: "Compose", icon: PenTool, bg: "bg-slate-100 text-slate-700" },
  improve: { title: "Improve", icon: RefreshCw, bg: "bg-slate-100 text-slate-700" },
  review: { title: "Review", icon: CheckCircle2, bg: "bg-slate-100 text-slate-700" },
};

const API = API_URL;
const ITEMS_PER_PAGE = 3;

export default function HistoryPage() {
  const [items, setItems] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const loadHistory = async () => {
    const response = await fetchWithAuth(`${API}/history/`);
    if (!response.ok) throw new Error("Could not load history");
    const data = await response.json();
    setItems(data);
    const maxPage = Math.max(1, Math.ceil(data.length / ITEMS_PER_PAGE));
    if (currentPage > maxPage) setCurrentPage(maxPage);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const loadPage = async () => {
      try {
        const [authResponse, historyResponse] = await Promise.all([
          fetchWithAuth(`${API}/auth/me`),
          fetchWithAuth(`${API}/history/`),
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
      const response = await fetchWithAuth(`${API}/history/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Could not delete history item");
      await loadHistory();
    } catch {
      setError("We couldn’t delete this history item. Please try again.");
    }
  };

  const copyOutput = (item: Activity) => {
    const textToCopy = item.subject
      ? `Subject: ${item.subject}\n\n${item.output_text}`
      : item.output_text;
    void navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const currentItems = items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full flex-1 max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="animate-fade-in-up mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Clock className="h-3.5 w-3.5 text-slate-700" /> Recent activity
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            History
          </h1>
          <p className="mt-1.5 text-slate-600">
            Review and copy previously composed, improved, or reviewed messages.
          </p>
        </div>

        {!isAuthenticated ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <Clock className="h-6 w-6" />
            </div>
            <h2 className="mt-4 font-semibold text-slate-900">Sign in to view history</h2>
            <p className="mt-1.5 text-sm text-slate-600">
              Your saved communication history stays private to your PersonaMail account.
            </p>
          </div>
        ) : (
          <>
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
              <div className="space-y-4" aria-label="Loading history">
                <div className="h-32 animate-pulse rounded-2xl bg-slate-200" />
                <div className="h-32 animate-pulse rounded-2xl bg-slate-200" />
                <div className="h-32 animate-pulse rounded-2xl bg-slate-200" />
              </div>
            ) : items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  <Clock className="h-6 w-6" />
                </div>
                <h2 className="mt-4 font-semibold text-slate-900">No activity logged yet</h2>
                <p className="mx-auto mt-1.5 max-w-sm text-sm text-slate-600">
                  Your composed, improved, and reviewed messages will automatically be recorded here.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  {currentItems.map((item) => {
                    const meta = labels[item.kind] || labels.compose;
                    const Icon = meta.icon;

                    return (
                      <article
                        key={item.id}
                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300"
                      >
                        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                          <div className="flex items-start gap-3">
                            <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${meta.bg}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                  {meta.title}
                                </span>
                                <span className="text-xs text-slate-400">·</span>
                                <span className="text-xs text-slate-500">
                                  {new Date(item.created_at).toLocaleDateString(undefined, {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                              <h2 className="mt-1 font-semibold text-slate-900">
                                {item.subject || "Reviewed Text"}
                              </h2>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                              type="button"
                              onClick={() => copyOutput(item)}
                              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                              {copiedId === item.id ? (
                                <>
                                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                                  <span className="text-emerald-600 font-semibold">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3.5 w-3.5" /> Copy output
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => void handleDelete(item.id)}
                              className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="h-3.5 w-3.5" /> Delete
                            </button>
                          </div>
                        </div>

                        <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                          {item.output_text}
                        </div>

                        {item.summary && (
                          <p className="mt-3 text-xs text-slate-500 italic">
                            <span className="font-medium text-slate-700 not-italic">Summary:</span> {item.summary}
                          </p>
                        )}
                      </article>
                    );
                  })}
                </div>

                {totalPages > 1 && (
                  <div className="mt-4 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row">
                    <p className="text-xs font-medium text-slate-500">
                      Showing <span className="font-semibold text-slate-800">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{" "}
                      <span className="font-semibold text-slate-800">{Math.min(currentPage * ITEMS_PER_PAGE, items.length)}</span> of{" "}
                      <span className="font-semibold text-slate-800">{items.length}</span> activity logs
                    </p>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                        className="inline-flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 active:scale-95"
                      >
                        <ChevronLeft className="h-4 w-4" /> Previous
                      </button>
                      <div className="flex items-center gap-1 px-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            type="button"
                            onClick={() => handlePageChange(page)}
                            className={`h-8 w-8 rounded-lg text-xs font-semibold transition ${
                              currentPage === page
                                ? "bg-primary text-white"
                                : "text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                        className="inline-flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 active:scale-95"
                      >
                        Next <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

