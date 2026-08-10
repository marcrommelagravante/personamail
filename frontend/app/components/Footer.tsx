"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-primary py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Logo variant="full" theme="dark" size="md" href="/" />
            <p className="mt-3 max-w-sm text-xs leading-5 text-slate-400">
              Adaptive AI Email Assistant matching tone, style, and relationship context for every recipient.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-medium text-slate-300">
            <Link href="/generate" className="transition-colors hover:text-white">
              Compose
            </Link>
            <Link href="/rewrite" className="transition-colors hover:text-white">
              Improve
            </Link>
            <Link href="/grammar-check" className="transition-colors hover:text-white">
              Review
            </Link>
            <Link href="/contacts" className="transition-colors hover:text-white">
              Contacts
            </Link>
            <Link href="/templates" className="transition-colors hover:text-white">
              Templates
            </Link>
            <Link href="/history" className="transition-colors hover:text-white">
              History
            </Link>
            <Link href="/settings" className="transition-colors hover:text-white">
              Settings
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-800/80 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} PersonaMail. All rights reserved.</p>
          <p className="text-[11px] text-slate-400">
            Every conversation remembers who it’s for.
          </p>
        </div>
      </div>
    </footer>
  );
}
