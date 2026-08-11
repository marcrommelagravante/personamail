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
  X,
  AlertTriangle,
  Loader2,
  Search,
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
  compose: { title: "Compose", icon: PenTool },
  improve: { title: "Improve", icon: RefreshCw },
  review: { title: "Review", icon: CheckCircle2 },
};

const API = API_URL;
const ITEMS_PER_PAGE = 6;

export default function HistoryPage() {
  const [items, setItems] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<Activity | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "compose" | "improve" | "review">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [deletingHistoryItem, setDeletingHistoryItem] = useState<{ id: string; title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (!selectedItem && !deletingHistoryItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
        setDeletingHistoryItem(null);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem, deletingHistoryItem]);

  const loadHistory = async () => {
    const response = await fetchWithAuth(`${API}/history/`);
    if (!response.ok) throw new Error("Could not load history");
    const data = await response.json();
    setItems(data);
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

  const handleDeleteClick = (item: Activity) => {
    const title = item.subject || item.output_text.slice(0, 40) || "activity entry";
    setDeletingHistoryItem({ id: item.id, title });
  };

  const confirmDeleteHistory = async () => {
    if (!deletingHistoryItem) return;
    setIsDeleting(true);
    setError("");
    try {
      const response = await fetchWithAuth(`${API}/history/${deletingHistoryItem.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Could not delete history item");
      const title = deletingHistoryItem.title;
      setDeletingHistoryItem(null);
      setSelectedItem(null);
      await loadHistory();
      showToast(`History record "${title}" deleted`);
    } catch {
      setError("We couldn’t delete this history item. Please try again.");
    } finally {
      setIsDeleting(false);
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

  // Filter & search logic
  const filteredItems = items.filter((item) => {
    const matchesFilter = activeFilter === "all" || item.kind === activeFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      (item.subject && item.subject.toLowerCase().includes(query)) ||
      item.output_text.toLowerCase().includes(query) ||
      (item.input_text && item.input_text.toLowerCase().includes(query));
    return matchesFilter && matchesSearch;
  });

  const counts = {
    all: items.length,
    compose: items.filter((i) => i.kind === "compose").length,
    improve: items.filter((i) => i.kind === "improve").length,
    review: items.filter((i) => i.kind === "review").length,
  };

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const currentItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full flex-1 max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="animate-fade-in-up mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Clock className="h-3.5 w-3.5 text-slate-700" /> Recent activity
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            History
          </h1>
          <p className="mt-1.5 text-slate-600">
            Click any message row to view full details, copy output, or delete records.
          </p>
        </div>

        {!isAuthenticated ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs">
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

            {/* Filter Tabs & Search Header */}
            {!loading && items.length > 0 && (
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1 shadow-xs">
                  {(["all", "compose", "improve", "review"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setActiveFilter(type);
                        setCurrentPage(1);
                      }}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer capitalize ${
                        activeFilter === type
                          ? "bg-primary text-white shadow-xs"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <span>{type}</span>
                      <span
                        className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                          activeFilter === type
                            ? "bg-slate-800 text-sky-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {counts[type]}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search history..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 shadow-xs"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {loading ? (
              <div className="space-y-3" aria-label="Loading history">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="flex h-16 items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200" />
                      <div className="space-y-1.5">
                        <div className="h-3.5 w-24 animate-pulse rounded-md bg-slate-200" />
                        <div className="h-4 w-48 animate-pulse rounded-md bg-slate-200 sm:w-64" />
                      </div>
                    </div>
                    <div className="h-7 w-20 animate-pulse rounded-xl bg-slate-200" />
                  </div>
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-xs">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  <Clock className="h-6 w-6" />
                </div>
                <h2 className="mt-4 font-semibold text-slate-900">No activity logged yet</h2>
                <p className="mx-auto mt-1.5 max-w-sm text-sm text-slate-600">
                  Your composed, improved, and reviewed messages will automatically be recorded here.
                </p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs">
                <p className="text-sm font-medium text-slate-700">
                  No records matching &quot;{searchQuery}&quot; in {activeFilter} category.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("all");
                  }}
                  className="mt-3 text-xs font-semibold text-sky-700 hover:underline cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-2.5">
                  {currentItems.map((item) => {
                    const meta = labels[item.kind] || labels.compose;
                    const Icon = meta.icon;

                    return (
                      <article
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className="group flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs transition-all duration-150 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md active:scale-[0.99]"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold transition-transform group-hover:scale-105 ${
                              item.kind === "compose"
                                ? "bg-sky-100 text-sky-900"
                                : item.kind === "improve"
                                ? "bg-emerald-100 text-emerald-900"
                                : "bg-indigo-100 text-indigo-900"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-700">
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
                            <h2 className="mt-0.5 truncate font-semibold text-slate-900 group-hover:text-primary">
                              {item.subject || item.output_text.slice(0, 60) || "Untitled draft"}
                            </h2>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyOutput(item);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 cursor-pointer"
                            title="Copy message output"
                          >
                            {copiedId === item.id ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-emerald-600" />
                                <span className="text-emerald-600 font-semibold">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5" /> Copy
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(item);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600 cursor-pointer"
                            title="Delete entry"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {totalPages > 1 && (
                  <div className="mt-4 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row">
                    <p className="text-xs font-medium text-slate-500">
                      Showing <span className="font-semibold text-slate-800">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{" "}
                      <span className="font-semibold text-slate-800">{Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length)}</span> of{" "}
                      <span className="font-semibold text-slate-800">{filteredItems.length}</span> activity logs
                    </p>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                        className="inline-flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 active:scale-95 cursor-pointer"
                      >
                        <ChevronLeft className="h-4 w-4" /> Previous
                      </button>
                      <div className="flex items-center gap-1 px-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            type="button"
                            onClick={() => handlePageChange(page)}
                            className={`h-8 w-8 rounded-lg text-xs font-semibold transition cursor-pointer ${
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
                        className="inline-flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 active:scale-95 cursor-pointer"
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

      {/* History Item Detail Modal */}
      {selectedItem && (
        <div
          aria-modal="true"
          aria-labelledby="history-modal-title"
          role="dialog"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 sm:p-6 backdrop-blur-sm animate-fade-in-up"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${
                    selectedItem.kind === "compose"
                      ? "bg-sky-100 text-sky-900 border border-sky-200"
                      : selectedItem.kind === "improve"
                      ? "bg-emerald-100 text-emerald-900 border border-emerald-200"
                      : "bg-indigo-100 text-indigo-900 border border-indigo-200"
                  }`}
                >
                  {selectedItem.kind}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(selectedItem.created_at).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition cursor-pointer"
                aria-label="Close detail modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="my-4 space-y-4 overflow-y-auto pr-1">
              <div>
                <h3 id="history-modal-title" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Subject / Heading
                </h3>
                <p className="mt-1 font-semibold text-slate-900 text-base">
                  {selectedItem.subject || "No Subject Line"}
                </p>
              </div>

              {selectedItem.input_text && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Input Text
                  </p>
                  <div className="mt-1.5 max-h-40 overflow-y-auto rounded-xl bg-slate-100 p-3 text-xs leading-relaxed text-slate-700 whitespace-pre-wrap border border-slate-200">
                    {selectedItem.input_text}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Generated Output
                </p>
                <div className="mt-1.5 max-h-60 overflow-y-auto rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-800 whitespace-pre-wrap border border-slate-200">
                  {selectedItem.output_text}
                </div>
              </div>

              {selectedItem.summary && (
                <div className="rounded-xl border border-sky-100 bg-sky-50/70 p-3 text-xs text-sky-900">
                  <span className="font-semibold">Summary:</span> {selectedItem.summary}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleDeleteClick(selectedItem)}
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete entry
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => copyOutput(selectedItem)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98] cursor-pointer"
                >
                  {copiedId === selectedItem.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copy output
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingHistoryItem && (
        <div
          aria-modal="true"
          aria-labelledby="delete-history-modal-title"
          role="dialog"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 sm:p-6 backdrop-blur-sm animate-fade-in-up"
          onClick={() => setDeletingHistoryItem(null)}
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
                <h3 id="delete-history-modal-title" className="text-base font-semibold text-slate-900">
                  Delete Activity Record?
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  Are you sure you want to delete <span className="font-semibold text-slate-900">&quot;{deletingHistoryItem.title}&quot;</span>? This entry will be permanently removed from your history.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeletingHistoryItem(null)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => void confirmDeleteHistory()}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700 active:scale-[0.98] disabled:opacity-50 cursor-pointer shadow-xs"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Deleting…
                  </>
                ) : (
                  <>
                    <Trash2 className="h-3.5 w-3.5" /> Delete entry
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

