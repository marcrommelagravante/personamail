import React from "react";
import { Users } from "lucide-react";
import ScrollReveal from "../../ScrollReveal";
import InteractiveFeatureDemo from "../InteractiveFeatureDemo";

export default function ProfilesPanel() {
  return (
    <div className="panel w-[85vw] shrink-0 h-screen flex flex-col justify-center relative overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Interactive/Visual */}
        <ScrollReveal delayMs={100} direction="up" className="relative w-full max-w-xl mx-auto lg:max-w-none">
          <InteractiveFeatureDemo feature="contact" />
        </ScrollReveal>

        {/* Right: Copy */}
        <ScrollReveal delayMs={200} direction="left" className="max-w-xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-primary dark:bg-sky-950 dark:text-sky-300 mb-6">
            <Users className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-primary dark:text-white sm:text-5xl">
            Remember the person, not just the email.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Build a communication profile for each person you email. Store their preferred tone, history, and the little details that make every message personal. 
          </p>
          <p className="mt-4 text-sm font-semibold text-sky-700 dark:text-sky-400">
            Every conversation remembers who it’s for.
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}
