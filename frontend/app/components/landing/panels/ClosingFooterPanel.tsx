import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "../../ScrollReveal";

export default function ClosingFooterPanel({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="panel w-[90vw] shrink-0 h-screen flex flex-col justify-center relative overflow-hidden pr-[5vw]">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 grid lg:grid-cols-[1fr_auto] gap-16 items-center">
        
        {/* Left: Closing Headline */}
        <ScrollReveal delayMs={100} direction="left" className="text-center lg:text-left max-w-2xl">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-6xl sm:leading-tight">
            Write like you know exactly who you’re talking to.
          </h2>
          <p className="mt-6 text-2xl font-medium text-sky-600 dark:text-sky-400">Because you do.</p>
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

        {/* Right: Footer Link Stack */}
        <ScrollReveal delayMs={200} direction="up" className="lg:text-right flex flex-col gap-6 lg:items-end">
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
            PersonaMail · © {new Date().getFullYear()} PersonaMail
          </div>
          
          <Link
            href="/#workflow"
            onClick={(e) => {
              if (window.location.pathname === '/' || window.location.pathname === '/landing') {
                e.preventDefault();
                const panel = document.getElementById("workflow");
                if (panel) {
                  const isDesktop = window.innerWidth >= 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                  if (isDesktop) {
                    const container = panel.closest('.h-screen.w-full.overflow-hidden') as HTMLElement;
                    if (container) {
                      window.scrollTo({
                        top: container.offsetTop + panel.offsetLeft,
                        behavior: 'smooth'
                      });
                      return;
                    }
                  }
                  panel.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
            className="text-lg font-medium text-slate-600 transition-all duration-150 hover:-translate-y-0.5 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
          >
            Workflow
          </Link>
          <Link
            href="/privacy"
            className="text-lg font-medium text-slate-600 transition-all duration-150 hover:-translate-y-0.5 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
          >
            Privacy
          </Link>
          <Link
            href="/tech-stack"
            className="text-lg font-medium text-slate-600 transition-all duration-150 hover:-translate-y-0.5 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
          >
            Tech Stack
          </Link>
        </ScrollReveal>
        
      </div>
    </div>
  );
}
