"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock,
  FilePenLine,
  Mail,
  PenLine,
  Plus,
  UserPlus,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { API_URL } from "./lib/api";

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
    description: "Start a new message with the right context.",
    icon: PenLine,
  },
  {
    href: "/rewrite",
    title: "Improve",
    description: "Refine a draft while preserving your voice.",
    icon: FilePenLine,
  },
  {
    href: "/grammar-check",
    title: "Review",
    description: "Check clarity and correctness before sending.",
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

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const authRes = await fetch(`${API_URL}/auth/me`, {
          credentials: "include",
        });
        if (!authRes.ok) {
          setUser(null);
          return;
        }
        const userData = await authRes.json();
        setUser(userData);

        // Fetch contacts & history in parallel for dashboard state layer
        const [contactsRes, historyRes] = await Promise.allSettled([
          fetch(`${API_URL}/contacts/`, { credentials: "include" }),
          fetch(`${API_URL}/history/`, { credentials: "include" }),
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
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="mx-auto min-h-[calc(100vh-64px)] max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
          <div className="space-y-6" aria-label="Loading workspace">
            <div className="h-8 w-56 animate-pulse rounded bg-slate-200" />
            <div className="h-32 rounded-2xl bg-slate-200" />
            <div className="h-48 rounded-2xl bg-slate-200" />
          </div>
        </main>
      </>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  const firstName = user.name.split(" ")[0];

  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-[calc(100vh-64px)] max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="space-y-8">
          {/* Step 1: Collapsed Hero Banner */}
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
              className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-primary transition-all hover:-translate-y-0.5 hover:bg-sky-200 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <PenLine className="h-4 w-4" aria-hidden="true" /> Compose a
              message
            </Link>
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
          <section aria-labelledby="quick-actions-heading" className="animate-fade-in-up animate-stagger-1">
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
                    className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-semibold text-primary">
                      {action.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600">
                      {action.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-slate-700 group-hover:text-primary">
                      Open {action.title}{" "}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Step 2: Recent Contacts Strip (if any contacts exist) */}
          {contacts.length > 0 && (
            <section aria-labelledby="contacts-heading">
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
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-xs transition-colors hover:border-slate-300 hover:bg-slate-50"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                      {getInitials(contact.name)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-primary">
                        {contact.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {contact.relationship}
                      </p>
                    </div>
                  </Link>
                ))}
                <Link
                  href="/contacts"
                  className="flex items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-2.5 text-xs font-medium text-slate-600 hover:border-slate-400 hover:text-primary"
                >
                  <Plus className="h-4 w-4" /> Add contact
                </Link>
              </div>
            </section>
          )}

          {/* Step 2: Recent Activity List (State Layer) */}
          <section aria-labelledby="activity-heading">
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
              /* Quiet row for new users */
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
                    className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="shrink-0 rounded-md bg-sky-100 px-2.5 py-1 text-xs font-semibold text-primary">
                        {activityLabels[item.kind]}
                      </span>
                      <p className="line-clamp-1 text-sm font-medium text-slate-800">
                        {item.subject ||
                          item.output_text.slice(0, 60) ||
                          "Untitled draft"}
                      </p>
                    </div>
                    <span className="text-xs text-slate-500">
                      {formatRelativeTime(item.created_at)}
                    </span>
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
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-slate-50"
              >
                Contacts
              </Link>
              <Link
                href="/templates"
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-slate-50"
              >
                Templates
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
