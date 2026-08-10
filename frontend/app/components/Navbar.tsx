"use client";

import Link from "next/link";
import { Menu, Settings, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Logo from "./Logo";

const navigation = [
  { href: "/generate", label: "Compose" },
  { href: "/contacts", label: "Contacts" },
  { href: "/templates", label: "Templates" },
  { href: "/history", label: "History" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <nav
        className="mx-auto max-w-7xl px-5 sm:px-8"
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo href="/" variant="full" size="sm" />

          <div className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={[
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
                  isActive(item.href)
                    ? "bg-sky-100 text-primary"
                    : "text-slate-600 hover:bg-slate-100 hover:text-primary",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/settings"
              aria-label="Settings"
              className={[
                "rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
                isActive("/settings") ? "bg-sky-100 text-primary" : "",
              ].join(" ")}
            >
              <Settings className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/generate"
              className="rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              New message
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 md:hidden"
          >
            {isOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {isOpen && (
          <div className="border-t border-slate-100 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={[
                    "rounded-lg px-3 py-2.5 text-sm font-medium",
                    isActive(item.href)
                      ? "bg-sky-100 text-primary"
                      : "text-slate-600 hover:bg-slate-100",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className={[
                  "rounded-lg px-3 py-2.5 text-sm font-medium",
                  isActive("/settings")
                    ? "bg-sky-100 text-primary"
                    : "text-slate-600 hover:bg-slate-100",
                ].join(" ")}
              >
                Settings
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
