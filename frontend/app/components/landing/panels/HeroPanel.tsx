import React, { useState } from "react";
import { ArrowRight, Mail, UserRound } from "lucide-react";
import ScrollReveal from "../../ScrollReveal";

type SampleProfile = {
  id: string;
  name: string;
  relationship: string;
  tone: string;
  composeSubject: string;
  composeBody: string;
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
  },
  {
    id: "marcus",
    name: "Marcus Vance",
    relationship: "Colleague",
    tone: "Casual",
    composeSubject: "Quick sync on tomorrow's sprint review",
    composeBody:
      "Hey Marcus,\n\nQuick heads up — I just pushed the draft API specs for tomorrow's review. Take a look when you get a sec and let me know if anything looks off.\n\nCatch you at the standup,\nAlex",
  },
];

export default function HeroPanel({ onGetStarted }: { onGetStarted: () => void }) {
  const [activeProfile, setActiveProfile] = useState<SampleProfile>(
    sampleProfiles[0]
  );

  return (
    <div className="panel w-screen shrink-0 h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Soft background radial highlight */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-sky-200/40 dark:bg-sky-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Copy */}
        <ScrollReveal delayMs={100} direction="up">
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

          <div className="mt-8 flex flex-col sm:flex-row sm:gap-4 gap-3">
            <button
              type="button"
              onClick={onGetStarted}
              className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg active:scale-95 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 sm:w-auto"
            >
              Get Started
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </div>
        </ScrollReveal>

        {/* Right: Interactive Live Preview */}
        <ScrollReveal delayMs={200} direction="left" className="relative rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="mb-4 flex flex-col gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
            {/* Profile Picker Pill Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 shrink-0">
                Hover to switch:
              </span>
              {sampleProfiles.map((profile) => (
                <button
                  key={profile.id}
                  type="button"
                  onMouseEnter={() => setActiveProfile(profile)}
                  onClick={() => setActiveProfile(profile)}
                  className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
                    activeProfile.id === profile.id
                      ? "bg-primary text-white shadow-xs dark:bg-sky-500 dark:text-slate-950"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
                >
                  <UserRound className="h-3.5 w-3.5" />
                  {profile.name} ({profile.tone})
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-xl border border-slate-200/70 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
            {/* Context Summary Sidebar style integrated */}
            <div className="flex items-center gap-2.5 mb-2">
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

            <div className="rounded-xl border border-slate-200/70 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 transition-all duration-300">
              <div className="border-b border-slate-100 pb-2 dark:border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Subject
                </span>
                <p className="mt-1 font-semibold text-primary dark:text-white">
                  {activeProfile.composeSubject}
                </p>
              </div>
              <div className="pt-2">
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200 whitespace-pre-wrap">
                  {activeProfile.composeBody}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
