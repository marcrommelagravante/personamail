"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  name: string;
  picture: string;
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/auth/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google/login";
  };

  const handleLogout = async () => {
    await fetch("http://localhost:8000/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold">PersonaMail</h1>

      {user ? (
        <div className="flex flex-col items-center gap-4">
          <img
            src={user.picture}
            alt={user.name}
            className="h-16 w-16 rounded-full"
          />

          <p className="text-lg font-medium">
            Welcome, {user.name}!
          </p>

          <p className="text-sm text-gray-500">
            {user.email}
          </p>

          <Link
            href="/contacts"
            className="rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-900"
          >
            Manage Contacts
          </Link>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Log out
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      )}
    </main>
  );
}