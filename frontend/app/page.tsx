"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  Copy,
  FilePenLine,
  Mail,
  MailCheck,
  PenLine,
  Plus,
  SlidersHorizontal,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { API_URL, fetchWithAuth } from "./lib/api";

import LandingPage from "./components/LandingPage";

type User = { id: string; email: string; name: string; picture: string };

type Contact = {
  id: string;
  name: string;
  relationship: string;
  tone: string;
};

type ActivityItem = {
  id: string;
  kind: "compose" | "improve" | "review";
  subject: string | null;
  output_text: string;
  created_at: string;
};

const quickActions = [
  {
    href: "/generate",
    title: "Compose",
    description: "Start a new message with adaptive relationship context.",
    hint: "Adapts tone and structure automatically per contact.",
    icon: PenLine,
  },
  {
    href: "/rewrite",
    title: "Improve",
    description: "Refine a draft while preserving your original voice.",
    hint: "Preserves key facts while upgrading formality.",
    icon: FilePenLine,
  },
  {
    href: "/grammar-check",
    title: "Review",
    description: "Check clarity, spelling, and correctness before sending.",
    hint: "Verifies grammar & readability without losing voice.",
    icon: BookOpen,
  },
];

const activityLabels = {
  compose: "Compose",
  improve: "Improve",
  review: "Review",
};

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 172800) return "Yesterday";
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function HomeContent() {
  const searchParams = useSearchParams();
  const isLogout = searchParams.get("logout") === "true";

  const [user, setUser] = useState<User | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewItem, setPreviewItem] = useState<ActivityItem | null>(null);
  const [copiedPreview, setCopiedPreview] = useState(false);

  useEffect(() => {
    if (isLogout) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("personamail_token");
      }
      return;
    }

    const loadDashboard = async () => {
      try {
        if (typeof window !== "undefined") {
          const urlParams = new URLSearchParams(window.location.search);
          const tokenFromUrl = urlParams.get("token");
          if (tokenFromUrl) {
            localStorage.setItem("personamail_token", tokenFromUrl);
            const cleanUrl = window.location.pathname + "?login=success";
            window.history.replaceState({}, "", cleanUrl);
          }
        }

        const authRes = await fetchWithAuth(`${API_URL}/auth/me`);
        if (!authRes.ok) {
          setUser(null);
          return;
        }
        const userData = await authRes.json();
        setUser(userData);

        // Fetch contacts & history in parallel for dashboard state layer
        const [contactsRes, historyRes] = await Promise.allSettled([
          fetchWithAuth(`${API_URL}/contacts/`),
          fetchWithAuth(`${API_URL}/history/`),
        ]);

        if (contactsRes.status === "fulfilled" && contactsRes.value.ok) {
          const contactsData = await contactsRes.value.json();
          setContacts(contactsData.slice(0, 5));
        }

        if (historyRes.status === "fulfilled" && historyRes.value.ok) {
          const historyData = await historyRes.value.json();
          setActivity(historyData.slice(0, 4));
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    void loadDashboard();
  }, [isLogout]);

  useEffect(() => {
    if (!previewItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewItem(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewItem]);

  const copyPreviewOutput = (item: ActivityItem) => {
    const textToCopy = item.subject
      ? `Subject: ${item.subject}\n\n${item.output_text}`
      : item.output_text;
    void navigator.clipboard.writeText(textToCopy);
    setCopiedPreview(true);
    setTimeout(() => setCopiedPreview(false), 2000);
  };

  if (isLogout || !user) {
    if (loading && !isLogout) {
      return <DashboardSkeleton />;
    }
    return <LandingPage />;
  }

  if (loading) {
    return <DashboardSkeleton />;
  }

  const firstName = user.name.split(" ")[0];

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full flex-1 max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="space-y-8">
          {/* Hero Banner */}
          <section className="animate-fade-in-up flex flex-col justify-between gap-4 rounded-2xl bg-primary px-6 py-6 text-white shadow-xs sm:flex-row sm:items-center sm:px-8">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-sky-200">
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                Communication Workspace
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                Good to see you, {firstName}.
              </h1>
            </div>
            <Link
              href="/generate"
              className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-primary transition-all duration-150 hover:-translate-y-0.5 hover:bg-sky-200 hover:shadow-sm active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <PenLine className="h-4 w-4" aria-hidden="true" /> Compose a message
            </Link>
          </section>

          {/* Workspace Summary Metric Strip */}
          <section
            aria-label="Workspace metrics"
            className="animate-fade-in-up animate-stagger-1 grid gap-4 sm:grid-cols-3"
          >
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-900">
                <Users className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-primary">
                  {contacts.length}
                </p>
                <p className="text-xs font-medium text-slate-500">
                  Saved Contact Profiles
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-900">
                <MailCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-primary">
                  {activity.length}
                </p>
                <p className="text-xs font-medium text-slate-500">
                  Recent Messages Handled
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-900">
                <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-primary capitalize">
                  {contacts[0]?.tone || "Adaptive"}
                </p>
                <p className="text-xs font-medium text-slate-500">
                  Primary Tone Profile
                </p>
              </div>
            </div>
          </section>

          {/* Contextual Nudge for new users without contacts */}
          {contacts.length === 0 && (
            <div className="animate-slide-down-fade flex flex-col gap-3 rounded-2xl border border-sky-200 bg-sky-50/80 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-200 text-sky-900">
                  <UserPlus className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="text-sm font-medium text-sky-900">
                  You haven’t added any contacts yet — PersonaMail adapts tone
                  and style better when writing to a saved profile.
                </p>
              </div>
              <Link
                href="/contacts"
                className="inline-flex shrink-0 cursor-pointer items-center gap-1 text-sm font-semibold text-sky-900 hover:underline"
              >
                Add first contact{" "}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          )}

          {/* Quick Action Grid */}
          <section aria-labelledby="quick-actions-heading" className="animate-fade-in-up animate-stagger-2">
            <h2 id="quick-actions-heading" className="sr-only">
              Quick Actions
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="group flex flex-col justify-between cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                  >
                    <div>
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-primary transition-transform group-hover:scale-105">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 font-semibold text-primary">
                        {action.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-6 text-slate-600">
                        {action.description}
                      </p>
                      <p className="mt-2 text-xs font-medium text-sky-700">
                        {action.hint}
                      </p>
                    </div>
                    <span className="mt-6 pt-2 inline-flex items-center gap-1 text-sm font-semibold text-slate-700 group-hover:text-primary">
                      Open {action.title}{" "}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Recent Contacts Strip */}
          {contacts.length > 0 && (
            <section aria-labelledby="contacts-heading" className="animate-fade-in-up animate-stagger-3">
              <div className="mb-4 flex items-center justify-between">
                <h2
                  id="contacts-heading"
                  className="text-base font-semibold tracking-tight text-primary"
                >
                  Recent Profiles
                </h2>
                <Link
                  href="/contacts"
                  className="text-xs font-semibold text-slate-600 hover:text-primary"
                >
                  View all ({contacts.length})
                </Link>
              </div>
              <div className="flex flex-wrap gap-3">
                {contacts.map((contact) => (
                  <Link
                    key={contact.id}
                    href={`/generate?contact_id=${contact.id}`}
                    title={`Compose email for ${contact.name}`}
                    className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-xs transition-all duration-150 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-xs active:scale-[0.98]"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700 transition-colors group-hover:bg-sky-100 group-hover:text-sky-900">
                      {getInitials(contact.name)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-primary group-hover:text-sky-900">
                        {contact.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {contact.relationship} · <span className="capitalize">{contact.tone}</span>
                      </p>
                    </div>
                  </Link>
                ))}
                <Link
                  href="/contacts"
                  className="flex items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-2.5 text-xs font-medium text-slate-600 transition-all duration-150 hover:border-slate-400 hover:text-primary active:scale-[0.98]"
                >
                  <Plus className="h-4 w-4" /> Add contact
                </Link>
              </div>
            </section>
          )}

          {/* Recent Activity List & Quick Preview Modal */}
          <section aria-labelledby="activity-heading" className="animate-fade-in-up animate-stagger-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-sky-700" aria-hidden="true" />
                <h2
                  id="activity-heading"
                  className="text-base font-semibold tracking-tight text-primary"
                >
                  Recent Activity
                </h2>
              </div>
              {activity.length > 0 && (
                <Link
                  href="/history"
                  className="text-xs font-semibold text-slate-600 hover:text-primary"
                >
                  Full history <ArrowRight className="inline h-3 w-3" />
                </Link>
              )}
            </div>

            {activity.length === 0 ? (
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-xs">
                <p className="text-sm text-slate-600">
                  No messages yet — start with{" "}
                  <span className="font-semibold text-primary">Compose</span>
                </p>
                <Link
                  href="/generate"
                  className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-slate-200"
                >
                  Start now
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white shadow-xs">
                {activity.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setPreviewItem(item)}
                    className="group flex cursor-pointer flex-col gap-2 p-4 transition-colors hover:bg-slate-50/80 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="shrink-0 rounded-md bg-sky-100 px-2.5 py-1 text-xs font-semibold text-primary">
                        {activityLabels[item.kind]}
                      </span>
                      <p className="line-clamp-1 text-sm font-medium text-slate-800 group-hover:text-primary">
                        {item.subject ||
                          item.output_text.slice(0, 60) ||
                          "Untitled draft"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500">
                        {formatRelativeTime(item.created_at)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Quick Nav Strip */}
          <section className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Users className="h-4 w-4 text-sky-700" aria-hidden="true" />
              <span>
                Maintain consistent tone across all your communication
                channels.
              </span>
            </div>
            <div className="flex gap-2">
              <Link
                href="/contacts"
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-slate-50 active:scale-95"
              >
                Contacts
              </Link>
              <Link
                href="/templates"
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-slate-50 active:scale-95"
              >
                Templates
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />

      {/* Activity Quick Preview Modal */}
      {previewItem && (
        <div
          aria-modal="true"
          aria-labelledby="modal-preview-title"
          role="dialog"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 sm:p-6 backdrop-blur-sm animate-fade-in-up"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                    previewItem.kind === "compose"
                      ? "bg-sky-100 text-sky-900 border border-sky-200"
                      : previewItem.kind === "improve"
                      ? "bg-emerald-100 text-emerald-900 border border-emerald-200"
                      : "bg-indigo-100 text-indigo-900 border border-indigo-200"
                  }`}
                >
                  {activityLabels[previewItem.kind]}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(previewItem.created_at).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition cursor-pointer"
                aria-label="Close preview"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="my-4 space-y-4 overflow-y-auto pr-1">
              {previewItem.subject && (
                <div>
                  <h3 id="modal-preview-title" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Subject
                  </h3>
                  <p className="mt-1 font-semibold text-primary text-base">
                    {previewItem.subject}
                  </p>
                </div>
              )}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Body Output
                </p>
                <div className="mt-1.5 max-h-60 overflow-y-auto rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-800 whitespace-pre-wrap border border-slate-200 font-sans">
                  {previewItem.output_text}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <Link
                href="/generate"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-900 hover:underline"
              >
                Reuse in Compose <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewItem(null)}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => copyPreviewOutput(previewItem)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98] cursor-pointer"
                >
                  {copiedPreview ? (
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
    </>
  );
}

function DashboardSkeleton() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full flex-1 max-w-7xl px-5 py-8 sm:px-8 sm:py-12" aria-label="Loading workspace">
        <div className="space-y-8">
          {/* Hero Banner Skeleton */}
          <div className="flex flex-col justify-between gap-4 rounded-2xl bg-slate-900/90 px-6 py-6 shadow-xs sm:flex-row sm:items-center sm:px-8">
            <div className="space-y-2.5">
              <div className="h-4 w-40 animate-pulse rounded-full bg-slate-700/60" />
              <div className="h-8 w-64 animate-pulse rounded-xl bg-slate-700/60 sm:w-80" />
            </div>
            <div className="h-10 w-44 shrink-0 animate-pulse rounded-xl bg-slate-700/80" />
          </div>

          {/* Metric Strip Skeleton */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
                <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-slate-200" />
                <div className="space-y-2 flex-1">
                  <div className="h-7 w-12 animate-pulse rounded-lg bg-slate-200" />
                  <div className="h-3.5 w-28 animate-pulse rounded-md bg-slate-200" />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action Cards Skeleton */}
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200" />
                <div className="mt-4 h-5 w-28 animate-pulse rounded-md bg-slate-200" />
                <div className="mt-2.5 space-y-1.5">
                  <div className="h-3.5 w-full animate-pulse rounded-md bg-slate-200" />
                  <div className="h-3.5 w-4/5 animate-pulse rounded-md bg-slate-200" />
                </div>
                <div className="mt-3 h-3 w-36 animate-pulse rounded-md bg-slate-200" />
                <div className="mt-5 h-4 w-24 animate-pulse rounded-md bg-slate-200" />
              </div>
            ))}
          </div>

          {/* Recent Profiles Skeleton */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-5 w-32 animate-pulse rounded-md bg-slate-200" />
              <div className="h-4 w-20 animate-pulse rounded-md bg-slate-200" />
            </div>
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-xs">
                  <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200" />
                  <div className="space-y-1.5">
                    <div className="h-3.5 w-20 animate-pulse rounded-md bg-slate-200" />
                    <div className="h-3 w-28 animate-pulse rounded-md bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Skeleton */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-5 w-36 animate-pulse rounded-md bg-slate-200" />
              <div className="h-4 w-24 animate-pulse rounded-md bg-slate-200" />
            </div>
            <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white shadow-xs">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-16 animate-pulse rounded-md bg-slate-200" />
                    <div className="h-4 w-48 animate-pulse rounded-md bg-slate-200 sm:w-64" />
                  </div>
                  <div className="h-3.5 w-16 animate-pulse rounded-md bg-slate-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}
