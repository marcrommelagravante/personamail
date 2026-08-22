import React from "react";
import { PenLine } from "lucide-react";
import ScrollReveal from "../../ScrollReveal";
import InteractiveFeatureDemo from "../InteractiveFeatureDemo";

export default function GeneratorPanel() {
  return (
    <div className="panel w-[85vw] shrink-0 h-screen flex flex-col justify-center relative overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 grid lg:grid-cols-[1fr_1.25fr] gap-12 items-center">
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
        <ScrollReveal delayMs={200} direction="left" className="relative w-full max-w-xl mx-auto lg:max-w-none">
          <InteractiveFeatureDemo feature="compose" />
        </ScrollReveal>
      </div>
    </div>
  );
}
