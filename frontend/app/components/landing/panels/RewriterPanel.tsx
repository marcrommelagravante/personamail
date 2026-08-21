import React from "react";
import { RefreshCw, CheckCircle2 } from "lucide-react";
import ScrollReveal from "../../ScrollReveal";

export default function RewriterPanel() {
  return (
    <div className="panel w-[85vw] shrink-0 h-screen flex flex-col justify-center relative overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Visual */}
        <ScrollReveal delayMs={100} direction="up" className="relative rounded-3xl border border-slate-200/90 bg-slate-50 p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900/60">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Rough Input Draft
              </span>
              <p className="mt-2 rounded-lg bg-white p-3 text-sm text-slate-600 border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
                Hey Sarah, finished the Q3 stuff early. Let me know if you want to chat Thursday.
              </p>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-400 flex items-center gap-1 mb-2">
                  <RefreshCw className="h-3 w-3" /> Improved
                </span>
                <p className="rounded-lg bg-sky-50 border border-sky-100 p-3 text-xs font-medium leading-relaxed text-slate-800 shadow-sm dark:border-sky-900/60 dark:bg-sky-950/30 dark:text-slate-200 h-full">
                  Dear Sarah, I am glad to update you that our team completed the Q3 milestone early. Would Thursday afternoon work for a brief check-in regarding phase two?
                </p>
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1 mb-2">
                  <CheckCircle2 className="h-3 w-3" /> Reviewed
                </span>
                <p className="rounded-lg bg-emerald-50 border border-emerald-100 p-3 text-xs font-medium leading-relaxed text-slate-800 shadow-sm dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-slate-200 h-full">
                  Dear Sarah, I am writing to confirm that all Q3 milestones are complete. Let me know if Thursday works for a short alignment meeting.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right: Copy */}
        <ScrollReveal delayMs={200} direction="left" className="max-w-xl lg:pl-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-primary dark:bg-sky-950 dark:text-sky-300 mb-6">
            <RefreshCw className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-primary dark:text-white sm:text-5xl">
            Already wrote it?
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Make it better without losing your voice. Improve refines your rough draft by sharpening tone and tightening wording. 
          </p>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Then, use Review to catch grammar, spelling, and clarity issues so every email goes out polished and ready.
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}
