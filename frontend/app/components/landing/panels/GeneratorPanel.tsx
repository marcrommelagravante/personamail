import React from "react";
import { PenLine } from "lucide-react";
import ScrollReveal from "../../ScrollReveal";

export default function GeneratorPanel() {
  return (
    <div className="panel w-[85vw] shrink-0 h-screen flex flex-col justify-center relative overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Copy */}
        <ScrollReveal delayMs={100} direction="up" className="max-w-xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-primary dark:bg-sky-950 dark:text-sky-300 mb-6">
            <PenLine className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-primary dark:text-white sm:text-5xl">
            Start with the idea.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Start from a blank page or a rough thought. PersonaMail helps shape it into a complete draft in a tone that fits — formal, friendly, or casual — perfectly tailored to the recipient.
          </p>
        </ScrollReveal>

        {/* Right: Visual */}
        <ScrollReveal delayMs={200} direction="left" className="relative rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                You write:
              </span>
              <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-950 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
                Ask Marcus for the quarterly report and see if he wants to grab coffee tomorrow morning.
              </div>
            </div>
            
            <div className="flex justify-center py-2">
              <div className="h-8 w-[1px] bg-sky-200 dark:bg-sky-800 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase">
                  Generates
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-400">
                PersonaMail writes (Colleague Tone):
              </span>
              <div className="rounded-xl border border-sky-100 bg-white p-5 text-sm font-medium leading-relaxed text-slate-800 shadow-sm dark:border-sky-900/60 dark:bg-slate-900 dark:text-slate-200">
                Hey Marcus,<br/><br/>Could you send over the quarterly report when you have a chance?<br/><br/>Also, let me know if you&apos;re around for a quick coffee tomorrow morning — would be great to catch up!<br/><br/>Best,<br/>Alex
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
