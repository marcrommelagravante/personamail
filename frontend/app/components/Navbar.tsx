"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/generate", label: "Compose" },
  { href: "/contacts", label: "Contacts" },
  { href: "/templates", label: "Templates" },
  { href: "/history", label: "History" },
  { href: "/settings", label: "Settings" },
  { href: "/rewrite", label: "Improve" },
  { href: "/grammar-check", label: "Review" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-slate-200 bg-white" aria-label="Main navigation">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight text-[#0F172A]">
          Persona<span className="text-sky-500">Mail</span>
        </Link>
        <div className="flex items-center gap-1 overflow-x-auto" aria-label="Workspace pages">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-lg px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
                  isActive
                    ? "bg-sky-100 text-[#0F172A]"
                    : "text-slate-600 hover:bg-slate-100 hover:text-[#0F172A]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
