"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { API_URL } from "../lib/api";

const initialSettings = {
  default_tone: "formal",
  default_greeting: "",
  default_closing: "",
};
const API = API_URL;

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const [authResponse, settingsResponse] = await Promise.all([
          fetch(`${API}/auth/me`, { credentials: "include" }),
          fetch(`${API}/settings/`, { credentials: "include" }),
        ]);
        if (!authResponse.ok) {
          setIsAuthenticated(false);
          return;
        }
        if (!settingsResponse.ok) throw new Error("Could not load settings");
        const data = await settingsResponse.json();
        setSettings({
          default_tone: data.default_tone,
          default_greeting: data.default_greeting || "",
          default_closing: data.default_closing || "",
        });
      } catch {
        setError("We couldn’t load your settings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void loadPage();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      const response = await fetch(`${API}/settings/`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...settings,
          default_greeting: settings.default_greeting || null,
          default_closing: settings.default_closing || null,
        }),
      });
      if (!response.ok) throw new Error("Could not save settings");
      setSuccess("Communication defaults saved.");
    } catch {
      setError("We couldn’t save your settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Ignore network errors on logout redirect
    }
    router.push("/login?logout=true");
  };

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100";

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-5 py-10 sm:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-sky-700">
            Your communication style
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Settings
          </h1>
          <p className="mt-2 text-slate-600">
            Set the defaults PersonaMail should start with for new communication
            profiles.
          </p>
        </div>
        {!isAuthenticated ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="font-semibold">Sign in to manage settings</h2>
            <p className="mt-2 text-sm text-slate-600">
              Your communication defaults stay private to your account.
            </p>
          </div>
        ) : loading ? (
          <p className="text-sm text-slate-500">Loading settings…</p>
        ) : (
          <div className="space-y-6">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="tone"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Default tone
                  </label>
                  <select
                    id="tone"
                    value={settings.default_tone}
                    onChange={(event) =>
                      setSettings({
                        ...settings,
                        default_tone: event.target.value,
                      })
                    }
                    className={inputClass}
                  >
                    <option value="formal">Formal</option>
                    <option value="friendly">Friendly</option>
                    <option value="casual">Casual</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="greeting"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Default greeting
                  </label>
                  <input
                    id="greeting"
                    value={settings.default_greeting}
                    onChange={(event) =>
                      setSettings({
                        ...settings,
                        default_greeting: event.target.value,
                      })
                    }
                    placeholder="For example, Hello"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="closing"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Default closing
                  </label>
                  <input
                    id="closing"
                    value={settings.default_closing}
                    onChange={(event) =>
                      setSettings({
                        ...settings,
                        default_closing: event.target.value,
                      })
                    }
                    placeholder="For example, Best regards"
                    className={inputClass}
                  />
                </div>
              </div>
              {error && (
                <p
                  className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  role="alert"
                >
                  {error}
                </p>
              )}
              {success && (
                <p
                  className="mt-5 rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800"
                  role="status"
                >
                  {success}
                </p>
              )}
              <button
                type="submit"
                disabled={saving}
                className="mt-6 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save settings"}
              </button>
            </form>

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div>
                <h3 className="font-semibold text-primary">Session & Security</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Signed in with Google OAuth session.
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                Log out
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
