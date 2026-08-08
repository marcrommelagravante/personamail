"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { API_URL } from "./lib/api";

type User = {
  id: string;
  email: string;
  name: string;
  picture: string;
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/auth/me`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = () => {
    // Google OAuth begins on the backend, outside the Next.js application.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.assign(`${API_URL}/auth/google/login`);
  };

  const handleLogout = async () => {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl items-center px-5 sm:px-8">
          <p className="text-sm text-slate-500">Loading your workspace…</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl items-center px-5 py-16 sm:px-8">
        <section className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold tracking-[0.16em] text-sky-600 uppercase">
            Relationship-aware communication
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            The right words for every relationship.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Keep each message personal, consistent, and appropriate for the person receiving it.
          </p>

          {user ? (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Your workspace</p>
              <div className="mt-3 flex items-center gap-3">
                <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-[#0F172A]">
                  {user.name.slice(0, 1).toUpperCase()}
                </span>
                <div>
                  <p className="font-semibold">Welcome back, {user.name}</p>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/generate" className="rounded-lg bg-[#0F172A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">
                  Compose a message
                </Link>
                <Link href="/contacts" className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">
                  Manage contacts
                </Link>
                <button onClick={handleLogout} className="px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-[#0F172A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-10">
              <button onClick={handleLogin} className="rounded-lg bg-[#0F172A] px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">
                Sign in with Google
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
