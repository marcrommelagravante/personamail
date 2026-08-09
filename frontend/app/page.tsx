"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, FilePenLine, Mail, PenLine } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { API_URL } from "./lib/api";

type User = { id: string; email: string; name: string; picture: string };

const quickActions = [
  { href: "/generate", title: "Compose", description: "Start a new message with the right context.", icon: PenLine },
  { href: "/rewrite", title: "Improve", description: "Refine a draft while preserving your voice.", icon: FilePenLine },
  { href: "/grammar-check", title: "Review", description: "Check clarity and correctness before sending.", icon: BookOpen },
];

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/auth/me`, { credentials: "include" })
      .then((response) => response.ok ? response.json() : null)
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = () => {
    // Google OAuth begins on the backend, outside the Next.js application.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.assign(`${API_URL}/auth/google/login`);
  };

  const handleLogout = async () => {
    await fetch(`${API_URL}/auth/logout`, { method: "POST", credentials: "include" });
    setUser(null);
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-[calc(100vh-64px)] max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        {loading ? <div className="space-y-6" aria-label="Loading workspace"><div className="h-8 w-56 animate-pulse rounded bg-slate-200" /><div className="h-48 rounded-2xl bg-slate-200" /></div> : user ? (
          <div className="space-y-10">
            <section className="grid gap-8 rounded-3xl bg-[#0F172A] px-6 py-8 text-white shadow-sm sm:px-10 sm:py-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-sky-200"><Mail className="h-4 w-4" aria-hidden="true" /> Your communication workspace</p>
                <h1 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Good to see you, {user.name.split(" ")[0]}.</h1>
                <p className="mt-3 max-w-xl text-base leading-7 text-slate-300">Write thoughtfully, without starting from scratch. PersonaMail remembers the people you communicate with.</p>
              </div>
              <Link href="/generate" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7CE3FF] px-4 py-3 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-sky-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><PenLine className="h-4 w-4" aria-hidden="true" /> Compose a message</Link>
            </section>

            <section aria-labelledby="start-heading"><div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-sm font-medium text-sky-700">Start here</p><h2 id="start-heading" className="mt-1 text-2xl font-semibold tracking-tight">What would you like to do?</h2></div><Link href="/contacts" className="hidden items-center gap-1 text-sm font-medium text-slate-600 hover:text-[#0F172A] sm:inline-flex">Manage contacts <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
              <div className="grid gap-4 md:grid-cols-3">{quickActions.map((action) => { const Icon = action.icon; return <Link key={action.href} href={action.href} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-[#0F172A]"><Icon className="h-5 w-5" aria-hidden="true" /></span><h3 className="mt-5 font-semibold text-[#0F172A]">{action.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{action.description}</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-slate-700 group-hover:text-[#0F172A]">Open {action.title} <ArrowRight className="h-4 w-4" aria-hidden="true" /></span></Link>; })}</div>
            </section>

            <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-[1fr_auto] sm:items-center"><div><p className="text-sm font-semibold text-[#0F172A]">Keep every message personal</p><p className="mt-1 text-sm text-slate-600">Add contacts and save templates so your communication style stays consistent.</p></div><div className="flex flex-wrap gap-3"><Link href="/contacts" className="rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-semibold text-[#0F172A] hover:bg-slate-50">Contacts</Link><Link href="/templates" className="rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-semibold text-[#0F172A] hover:bg-slate-50">Templates</Link><button type="button" onClick={handleLogout} className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-[#0F172A]">Log out</button></div></section>
          </div>
        ) : <section className="grid min-h-[calc(100vh-160px)] items-center gap-12 py-10 lg:grid-cols-[1.1fr_0.9fr]"><div><p className="text-sm font-semibold tracking-[0.14em] text-sky-700 uppercase">Relationship-aware communication</p><h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-[#0F172A] sm:text-6xl">The right words for every relationship.</h1><p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Compose thoughtful emails, keep your voice, and adapt naturally to the person you are writing to.</p><button type="button" onClick={handleLogin} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0F172A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500">Continue with Google <ArrowRight className="h-4 w-4" aria-hidden="true" /></button></div><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-sm font-medium text-sky-700">Built around people, not prompts</p><div className="mt-6 space-y-5"><div className="border-l-2 border-[#7CE3FF] pl-4"><p className="font-semibold">Remember communication styles</p><p className="mt-1 text-sm leading-6 text-slate-600">Keep greetings, tone, and context with each contact.</p></div><div className="border-l-2 border-slate-200 pl-4"><p className="font-semibold">Start with a clear next step</p><p className="mt-1 text-sm leading-6 text-slate-600">Compose, Improve, and Review stay focused on the message at hand.</p></div></div></div></section>}
      </main>
    </>
  );
}
