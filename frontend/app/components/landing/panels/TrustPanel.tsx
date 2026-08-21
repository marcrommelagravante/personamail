import React from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";
import ScrollReveal from "../../ScrollReveal";

export default function TrustPanel({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="panel w-[90vw] shrink-0 h-screen flex flex-col justify-center relative overflow-hidden pr-[5vw]">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Trust */}
        <ScrollReveal delayMs={100} direction="up" className="rounded-3xl border border-slate-700 bg-slate-900/50 p-10 shadow-2xl backdrop-blur-md">
          <ShieldCheck className="h-12 w-12 text-sky-400" />
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white">
            Built for people who write a lot of email.
          </h2>
          <p className="mt-4 text-lg leading-7 text-slate-300">
            PersonaMail keeps your data private, runs AI server-side securely via Groq, and never exposes your API keys or personal contact notes.
          </p>
        </ScrollReveal>

        {/* Right: CTA */}
        <ScrollReveal delayMs={200} direction="left" className="text-center lg:text-left">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-6xl sm:leading-tight">
            Write like you know exactly who you’re talking to.
          </h2>
          <p className="mt-6 text-2xl font-medium text-sky-400">Because you do.</p>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Every conversation remembers who it’s for.
          </p>

          <div className="mt-12">
            <button
              type="button"
              onClick={onGetStarted}
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-lg font-semibold text-primary transition-all duration-200 hover:-translate-y-1 hover:bg-sky-200 hover:shadow-xl active:scale-95 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
            >
              Get Started Now
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </ScrollReveal>
        
      </div>
    </div>
  );
}
