"use client";

import Link from "next/link";
import { LogOut, Menu, Settings, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Logo from "./Logo";
import LogoutModal from "./LogoutModal";
import ThemeToggle from "./ThemeToggle";
import { API_URL, fetchWithAuth } from "../lib/api";

const navigation = [
  { href: "/generate", label: "Compose" },
  { href: "/contacts", label: "Contacts" },
  { href: "/templates", label: "Templates" },
  { href: "/history", label: "History" },
];

type User = {
  id?: string;
  name: string;
  email: string;
  picture?: string;
};

type NavbarProps = {
  user?: User | null;
};

export default function Navbar({ user: initialUser }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(
    initialUser || null,
  );

  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    if (initialUser || currentUser) return;
    const fetchCurrentUser = async () => {
      try {
        const res = await fetchWithAuth(`${API_URL}/auth/me`);
        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data);
        }
      } catch {
        // Silently fail if unauthenticated
      }
    };
    void fetchCurrentUser();
  }, [initialUser, currentUser]);

  const handleConfirmLogout = async () => {
    try {
      await fetchWithAuth(`${API_URL}/auth/logout`, {
        method: "POST",
      });
    } catch {
      // Ignore network errors on logout redirect
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("personamail_token");
    }
    setShowLogoutModal(false);
    router.push("/?logout=true");
  };

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
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
                    "rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
                    isActive(item.href)
                      ? "bg-sky-100 text-primary dark:bg-sky-950/70 dark:text-sky-300"
                      : "text-slate-600 hover:bg-slate-100 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <ThemeToggle size="sm" />

              <Link
                href="/settings"
                aria-label="Settings"
                className={[
                  "rounded-lg p-2 text-slate-600 transition-all duration-150 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-primary active:scale-95 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
                  isActive("/settings")
                    ? "bg-sky-100 text-primary dark:bg-sky-950/70 dark:text-sky-300"
                    : "",
                ].join(" ")}
              >
                <Settings className="h-4 w-4" aria-hidden="true" />
              </Link>

              <button
                type="button"
                onClick={() => setShowLogoutModal(true)}
                title="Sign out of PersonaMail"
                className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all duration-150 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-rose-50 hover:text-rose-600 active:scale-95 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-rose-950/50 dark:hover:text-rose-400"
              >
                <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Sign out</span>
              </button>

              <Link
                href="/generate"
                className="rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md active:scale-95 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                New message
              </Link>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle size="sm" />
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close navigation" : "Open navigation"}
                className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                {isOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="border-t border-slate-100 py-3 dark:border-slate-800 md:hidden">
              <div className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={[
                      "rounded-lg px-3 py-2.5 text-sm font-medium",
                      isActive(item.href)
                        ? "bg-sky-100 text-primary dark:bg-sky-950/70 dark:text-sky-300"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
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
                      ? "bg-sky-100 text-primary dark:bg-sky-950/70 dark:text-sky-300"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                  ].join(" ")}
                >
                  Settings
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setShowLogoutModal(true);
                  }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 text-left cursor-pointer"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirmLogout={handleConfirmLogout}
        user={currentUser}
      />
    </>
  );
}
