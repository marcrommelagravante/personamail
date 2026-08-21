import React from "react";
import { ArrowRight, Mail } from "lucide-react";
import ScrollReveal from "../../ScrollReveal";

import InteractiveFeatureDemo from "../InteractiveFeatureDemo";

export default function HeroPanel({ onGetStarted }: { onGetStarted: () => void }) {
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
        <ScrollReveal delayMs={200} direction="left" className="relative w-full max-w-xl mx-auto lg:max-w-none">
          <InteractiveFeatureDemo feature="compose" />
        </ScrollReveal>
      </div>
    </div>
  );
}
