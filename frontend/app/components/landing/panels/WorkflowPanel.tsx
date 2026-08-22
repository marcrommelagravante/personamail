import React from "react";
import ScrollReveal from "../../ScrollReveal";

export default function WorkflowPanel() {
  return (
    <div id="workflow" className="panel w-[85vw] shrink-0 h-screen flex flex-col justify-center relative overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl font-semibold tracking-tight text-primary dark:text-white sm:text-5xl">
            Three steps to a better email.
          </h2>
          <p className="mt-6 text-xl leading-8 text-slate-600 dark:text-slate-300">
            Simple, natural workflow from idea to final send.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Step 1 */}
          <ScrollReveal delayMs={100} direction="up" className="relative flex h-full flex-col items-center rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-md transition-transform hover:-translate-y-2 dark:border-slate-800 dark:bg-slate-900/80">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-white shadow-xs dark:bg-sky-500 dark:text-slate-950">
              1
            </span>
            <h3 className="mt-8 text-xl font-semibold text-primary dark:text-white">Add a contact</h3>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              Tell PersonaMail who you’re writing to and how you usually communicate with them.
            </p>
          </ScrollReveal>

          {/* Step 2 */}
          <ScrollReveal delayMs={200} direction="up" className="relative flex h-full flex-col items-center rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-md transition-transform hover:-translate-y-2 dark:border-slate-800 dark:bg-slate-900/80">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-white shadow-xs dark:bg-sky-500 dark:text-slate-950">
              2
            </span>
            <h3 className="mt-8 text-xl font-semibold text-primary dark:text-white">Compose or Improve</h3>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              Write from scratch or bring in a draft. PersonaMail shapes the message to fit the relationship.
            </p>
          </ScrollReveal>

          {/* Step 3 */}
          <ScrollReveal delayMs={300} direction="up" className="relative flex h-full flex-col items-center rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-md transition-transform hover:-translate-y-2 dark:border-slate-800 dark:bg-slate-900/80">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-white shadow-xs dark:bg-sky-500 dark:text-slate-950">
              3
            </span>
            <h3 className="mt-8 text-xl font-semibold text-primary dark:text-white">Review and send</h3>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              Check the message, make your final adjustments, and send with confidence.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
