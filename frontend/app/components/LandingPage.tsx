"use client";

import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  PenLine,
  RefreshCw,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";
import { Suspense, useState } from "react";
import Logo from "./Logo";
import ScrollReveal from "./ScrollReveal";
import LoginModal from "./LoginModal";
import ThemeToggle from "./ThemeToggle";

type SampleProfile = {
  id: string;
  name: string;
  relationship: string;
  tone: string;
  composeSubject: string;
  composeBody: string;
  improveOriginal: string;
  improveResult: string;
  reviewResult: string;
};

const sampleProfiles: SampleProfile[] = [
  {
    id: "sarah",
    name: "Sarah Jenkins",
    relationship: "Client",
    tone: "Formal",
    composeSubject: "Q3 Project Milestone Update & Next Steps",
    composeBody:
      "Dear Sarah,\n\nI am pleased to share that we have finalized the Q3 milestone deliverables ahead of schedule. Attached is the summary for your review.\n\nPlease let me know if you would like to schedule a brief call this Thursday to discuss the next deployment phase.\n\nBest regards,\nAlex",
    improveOriginal:
      "Hey Sarah, finished the Q3 stuff early. Let me know if you want to chat Thursday.",
    improveResult:
      "Dear Sarah,\n\nI am glad to update you that our team completed the Q3 milestone early. Please review the attached deliverables at your convenience.\n\nWould Thursday afternoon work for a brief check-in regarding phase two?\n\nSincerely,\nAlex",
    reviewResult:
      "Dear Sarah,\n\nI am writing to confirm that all Q3 milestones are complete. Attached is the project breakdown for your evaluation.\n\nLet me know if Thursday works for a short alignment meeting.\n\nBest regards,\nAlex",
  },
  {
    id: "marcus",
    name: "Marcus Vance",
    relationship: "Colleague",
    tone: "Casual",
    composeSubject: "Quick sync on tomorrow's sprint review",
    composeBody:
      "Hey Marcus,\n\nQuick heads up — I just pushed the draft API specs for tomorrow's review. Take a look when you get a sec and let me know if anything looks off.\n\nCatch you at the standup,\nAlex",
    improveOriginal:
      "Marcus, I uploaded the API docs. Look at them before tomorrow.",
    improveResult:
      "Hey Marcus,\n\nJust dropped the updated API docs into the shared folder for tomorrow's review. Give them a quick skim whenever you have a free minute!\n\nThanks,\nAlex",
    reviewResult:
      "Hey Marcus,\n\nThe API specifications for tomorrow's sprint review are ready. Feel free to review them before standup tomorrow morning.\n\nCheers,\nAlex",
  },
];

function LandingPageContent() {
  const searchParams = useSearchParams();
  const loggedOut = searchParams.get("logout") === "true";
  const [dismissToast, setDismissToast] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [activeProfile, setActiveProfile] = useState<SampleProfile>(
    sampleProfiles[0],
  );
  const [activeTab, setActiveTab] = useState<"compose" | "improve" | "review">(
    "compose",
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-primary antialiased dark:bg-[#0b0f19] dark:text-slate-100 transition-colors duration-200">
      {/* Signed Out Confirmation Toast */}
      {loggedOut && !dismissToast && (
        <div
          className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] flex w-[90%] max-w-md items-center justify-between gap-3 rounded-2xl border border-sky-200 bg-white/95 px-4 py-3 text-sm font-medium text-sky-900 shadow-xl backdrop-blur-md dark:border-sky-800 dark:bg-slate-900/95 dark:text-sky-200 animate-slide-down-fade"
          role="status"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2
              className="h-5 w-5 shrink-0 text-sky-600 dark:text-sky-400"
              aria-hidden="true"
            />
            <span>Signed out of PersonaMail</span>
          </div>
          <button
            type="button"
            onClick={() => setDismissToast(true)}
            className="cursor-pointer rounded-lg px-2.5 py-1 text-xs font-semibold text-sky-700 transition hover:bg-sky-50 hover:text-sky-900 dark:text-sky-300 dark:hover:bg-sky-950/60 dark:hover:text-sky-100"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 1. Header / Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Logo href="/" variant="full" size="md" onClick={scrollToTop} />

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-white"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-white"
            >
              How It Works
            </a>
            <a
              href="#value-prop"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-white"
            >
              Why PersonaMail
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle size="sm" />
            <button
              type="button"
              onClick={() => setShowLoginModal(true)}
              className="cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-primary dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setShowLoginModal(true)}
              className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-sm dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section (Combined with Prominent Product Preview) */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24">
        {/* Soft background radial highlight */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-sky-200/40 dark:bg-sky-500/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="animate-fade-in-up mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1.5 text-xs font-semibold text-sky-900 dark:border-sky-800 dark:bg-sky-950/60 dark:text-sky-300">
              <Mail className="h-3.5 w-3.5 text-sky-700 dark:text-sky-400" aria-hidden="true" />
              Relationship-aware communication
            </span>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-primary dark:text-white sm:text-6xl sm:leading-tight">
              The right words for every relationship.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl sm:leading-8">
              PersonaMail learns how you communicate with each person — and helps
              you write emails that sound like you, every time.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <button
                type="button"
                onClick={() => setShowLoginModal(true)}
                className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 sm:w-auto"
              >
                Get Started
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
              <a
                href="#how-it-works"
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:text-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:w-auto"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* Single Prominent Interactive Product Preview Visual */}
          <ScrollReveal delayMs={100} scale={0.96} className="mx-auto mt-12 max-w-5xl">
            <div className="relative rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-6 lg:p-8">
              <div className="mb-4 flex flex-col gap-4 border-b border-slate-100 pb-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
                {/* Profile Picker Pill Buttons */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Select Recipient:
                  </span>
                  {sampleProfiles.map((profile) => (
                    <button
                      key={profile.id}
                      type="button"
                      onClick={() => setActiveProfile(profile)}
                      className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                        activeProfile.id === profile.id
                          ? "bg-primary text-white shadow-xs dark:bg-sky-500 dark:text-slate-950"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                      }`}
                    >
                      <UserRound className="h-3.5 w-3.5" />
                      {profile.name} ({profile.relationship} · {profile.tone})
                    </button>
                  ))}
                </div>

                {/* Action Tabs */}
                <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
                  {(["compose", "improve", "review"] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                        activeTab === tab
                          ? "bg-white text-primary shadow-xs dark:bg-slate-900 dark:text-white"
                          : "text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Preview Container */}
              <div className="grid gap-6 rounded-2xl bg-slate-50 p-5 dark:bg-slate-950/70 sm:p-6 lg:grid-cols-[280px_1fr]">
                {/* Context Summary Sidebar */}
                <div className="space-y-4 rounded-xl border border-slate-200/70 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100 font-semibold text-primary dark:bg-sky-950 dark:text-sky-300">
                      {activeProfile.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-primary dark:text-white">
                        {activeProfile.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {activeProfile.relationship} Profile
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-slate-100 pt-3 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400 dark:text-slate-500">Communication Style:</span>
                      <span className="font-medium text-primary dark:text-white">
                        {activeProfile.tone}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 dark:text-slate-500">Adaptive Profile:</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">Active</span>
                    </div>
                  </div>
                </div>

                {/* Live Preview Display Box */}
                <div className="space-y-3 rounded-xl border border-slate-200/70 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                  {activeTab === "compose" && (
                    <div className="space-y-3">
                      <div className="border-b border-slate-100 pb-2 dark:border-slate-800">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          Subject
                        </span>
                        <p className="mt-1 font-semibold text-primary dark:text-white">
                          {activeProfile.composeSubject}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          Generated Email
                        </span>
                        <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200 whitespace-pre-wrap">
                          {activeProfile.composeBody}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "improve" && (
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          Rough Input Draft
                        </span>
                        <p className="mt-1 rounded-lg bg-slate-50 p-2.5 text-xs text-slate-600 dark:bg-slate-950 dark:text-slate-300">
                          {activeProfile.improveOriginal}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-400">
                          Improved Version ({activeProfile.tone})
                        </span>
                        <p className="mt-1 text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-100 whitespace-pre-wrap">
                          {activeProfile.improveResult}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "review" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                          Grammar &amp; Clarity Check
                        </span>
                        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                          Ready to send
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                        {activeProfile.reviewResult}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Problem / Value Proposition */}
      <section id="value-prop" className="border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-[#0b0f19] sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal direction="up" distancePx={24}>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-primary dark:text-white sm:text-4xl">
                Every relationship deserves its own voice.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
                The way you write to your manager isn’t the way you write to a close colleague — and it shouldn’t be. Most email tools give you one generic voice for everyone. PersonaMail remembers who you’re writing to, so your tone, warmth, and formality shift naturally with the relationship.
              </p>
              <p className="mt-4 text-sm font-semibold text-sky-700 dark:text-sky-400">
                Every conversation remembers who it’s for.
              </p>
            </div>
          </ScrollReveal>

          {/* Side-by-Side Comparison Visual */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* Generic Voice (Before) */}
            <ScrollReveal delayMs={100} direction="up" distancePx={24}>
              <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/60">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  Generic Email Tools
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                  One rigid tone for all contacts
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Uses robotic, one-size-fits-all prompts that sound identical whether emailing a client, executive, or teammate.
                </p>
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-xs leading-relaxed text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                  &quot;Dear Valued Partner, Please find attached the document for your perusal. Regards, User.&quot;
                </div>
              </div>
            </ScrollReveal>

            {/* Relationship-Aware Voice (After) */}
            <ScrollReveal delayMs={200} direction="up" distancePx={24}>
              <div className="h-full rounded-2xl border border-sky-200 bg-sky-50/50 p-6 shadow-xs dark:border-sky-800 dark:bg-sky-950/30">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-sky-900 dark:bg-sky-900/50 dark:text-sky-300">
                  PersonaMail
                </span>
                <h3 className="mt-4 text-lg font-semibold text-primary dark:text-white">
                  A voice that adapts to the relationship
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Automatically adjusts vocabulary, greetings, closings, and formality levels per contact profile.
                </p>
                <div className="mt-4 rounded-xl border border-sky-100 bg-white p-4 text-xs font-medium leading-relaxed text-slate-800 dark:border-sky-900/60 dark:bg-slate-900 dark:text-slate-200">
                  &quot;Hi Sarah, here are the updated Q3 project deliverables for your review. Let me know if Thursday works to align.&quot;
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. Features */}
      <section id="features" className="border-t border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-[#090c14] sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal direction="up" distancePx={24}>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-primary dark:text-white sm:text-4xl">
                Everything you need to write with confidence.
              </h2>
              <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
                Four core capabilities built seamlessly around human communication.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1: Compose */}
            <ScrollReveal delayMs={0} direction="up" distancePx={24}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-primary dark:bg-sky-950 dark:text-sky-300">
                  <PenLine className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-semibold text-primary dark:text-white">Compose</h3>
                <p className="mt-2 text-xs font-semibold text-sky-700 dark:text-sky-400">
                  Start with the idea. PersonaMail helps shape it into the right message.
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Start from a blank page and create a complete draft in a tone that fits — formal, friendly, or casual — tailored to the recipient.
                </p>
              </div>
            </ScrollReveal>

            {/* Feature 2: Contacts */}
            <ScrollReveal delayMs={100} direction="up" distancePx={24}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-primary dark:bg-sky-950 dark:text-sky-300">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-semibold text-primary dark:text-white">Contacts</h3>
                <p className="mt-2 text-xs font-semibold text-sky-700 dark:text-sky-400">
                  Remember the person, not just the email address.
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Build a communication profile for each person you email, including their preferred tone, history, and details that make every message personal.
                </p>
              </div>
            </ScrollReveal>

            {/* Feature 3: Improve */}
            <ScrollReveal delayMs={200} direction="up" distancePx={24}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-primary dark:bg-sky-950 dark:text-sky-300">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-semibold text-primary dark:text-white">Improve</h3>
                <p className="mt-2 text-xs font-semibold text-sky-700 dark:text-sky-400">
                  Already wrote it? Make it better without losing your voice.
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Improve refines your rough draft by sharpening tone, tightening wording, and helping your message land as intended.
                </p>
              </div>
            </ScrollReveal>

            {/* Feature 4: Review */}
            <ScrollReveal delayMs={300} direction="up" distancePx={24}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-primary dark:bg-sky-950 dark:text-sky-300">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-semibold text-primary dark:text-white">Review</h3>
                <p className="mt-2 text-xs font-semibold text-sky-700 dark:text-sky-400">
                  Make sure your message is ready before you send it.
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Review catches grammar, spelling, and clarity issues so every email goes out polished, clear, and ready.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. How It Works */}
      <section id="how-it-works" className="border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-[#0b0f19] sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal direction="up" distancePx={24}>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-primary dark:text-white sm:text-4xl">
                Three steps to a better email.
              </h2>
              <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
                Simple, natural workflow from idea to final send.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <ScrollReveal delayMs={0} direction="up" distancePx={24}>
              <div className="relative flex h-full flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900/60">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-base font-bold text-white shadow-xs dark:bg-sky-500 dark:text-slate-950">
                  1
                </span>
                <h3 className="mt-4 font-semibold text-primary dark:text-white">Add a contact</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Tell PersonaMail who you’re writing to and how you usually communicate with them.
                </p>
              </div>
            </ScrollReveal>

            {/* Step 2 */}
            <ScrollReveal delayMs={100} direction="up" distancePx={24}>
              <div className="relative flex h-full flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900/60">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-base font-bold text-white shadow-xs dark:bg-sky-500 dark:text-slate-950">
                  2
                </span>
                <h3 className="mt-4 font-semibold text-primary dark:text-white">Compose or Improve</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Write from scratch or bring in a draft. PersonaMail shapes the message to fit the relationship.
                </p>
              </div>
            </ScrollReveal>

            {/* Step 3 */}
            <ScrollReveal delayMs={200} direction="up" distancePx={24}>
              <div className="relative flex h-full flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900/60">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-base font-bold text-white shadow-xs dark:bg-sky-500 dark:text-slate-950">
                  3
                </span>
                <h3 className="mt-4 font-semibold text-primary dark:text-white">Review and send</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Check the message, make your final adjustments, and send with confidence.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 6. Social Proof / Trust */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-[#090c14] sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal direction="up" distancePx={24} scale={0.97}>
            <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-12">
              <ShieldCheck className="mx-auto h-10 w-10 text-sky-700 dark:text-sky-400" />
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-primary dark:text-white sm:text-3xl">
                Built for people who write a lot of email.
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                PersonaMail keeps your data private, runs AI server-side securely via Groq, and never exposes your API keys or personal contact notes.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="border-t border-slate-200 bg-primary py-16 text-white dark:border-slate-800 dark:bg-slate-950 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <ScrollReveal direction="up" distancePx={28} scale={0.96}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Write like you know exactly who you’re talking to.
            </h2>
            <p className="mt-4 text-xl font-medium text-sky-200 dark:text-sky-300">Because you do.</p>
            <p className="mt-2 text-sm text-slate-300">
              Every conversation remembers who it’s for.
            </p>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowLoginModal(true)}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-base font-semibold text-primary transition-all hover:-translate-y-0.5 hover:bg-sky-200 hover:shadow-lg dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ScrollReveal direction="up" distancePx={16}>
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <Logo href="/" variant="full" theme="dark" size="md" onClick={scrollToTop} />
                <p className="mt-3 text-xs text-slate-400">
                  Every conversation remembers who it’s for.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 text-xs">
                <div>
                  <p className="font-semibold uppercase tracking-wider text-slate-200">
                    Product
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <button
                        type="button"
                        onClick={() => setShowLoginModal(true)}
                        className="cursor-pointer hover:text-white"
                      >
                        Compose
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => setShowLoginModal(true)}
                        className="cursor-pointer hover:text-white"
                      >
                        Contacts
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => setShowLoginModal(true)}
                        className="cursor-pointer hover:text-white"
                      >
                        Improve
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => setShowLoginModal(true)}
                        className="cursor-pointer hover:text-white"
                      >
                        Review
                      </button>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold uppercase tracking-wider text-slate-200">
                    Company
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <a href="#value-prop" className="hover:text-white">
                        About
                      </a>
                    </li>
                    <li>
                      <a href="#how-it-works" className="hover:text-white">
                        Workflow
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold uppercase tracking-wider text-slate-200">
                    Legal
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <span className="cursor-pointer hover:text-white">
                        Privacy
                      </span>
                    </li>
                    <li>
                      <span className="cursor-pointer hover:text-white">
                        Terms
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 border-t border-slate-800/80 pt-6 text-center text-xs text-slate-400">
              © {new Date().getFullYear()} PersonaMail. All rights reserved.
            </div>
          </ScrollReveal>
        </div>
      </footer>

      {/* Login Modal Overlay */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={null}>
      <LandingPageContent />
    </Suspense>
  );
}
