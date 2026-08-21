import React from "react";
import { CheckCircle2 } from "lucide-react";
import ScrollReveal from "../../ScrollReveal";
import InteractiveFeatureDemo from "../InteractiveFeatureDemo";

export default function ReviewPanel() {
  return (
    <div className="panel w-[85vw] shrink-0 h-screen flex flex-col justify-center relative overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Copy */}
        <ScrollReveal delayMs={100} direction="up" className="max-w-xl pr-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 mb-6">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-primary dark:text-white sm:text-5xl">
            Check grammar and clarity.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Ensure every email goes out polished and ready. Review catches grammar, spelling, and clarity issues before you hit send.
          </p>
        </ScrollReveal>

        {/* Right: Visual */}
        <ScrollReveal delayMs={200} direction="left" className="relative w-full max-w-xl mx-auto lg:max-w-none">
          <InteractiveFeatureDemo feature="review" />
        </ScrollReveal>
      </div>
    </div>
  );
}
