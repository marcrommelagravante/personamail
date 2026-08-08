"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-4 border-b border-gray-200 p-4">
      <Link href="/" className="text-sm font-medium hover:underline">
        Home
      </Link>
      <Link href="/contacts" className="text-sm font-medium hover:underline">
        Contacts
      </Link>
      <Link href="/generate" className="text-sm font-medium hover:underline">
        Generate Email
      </Link>
      <Link href="/rewrite" className="text-sm font-medium hover:underline">
        Rewrite Email
      </Link>
      <Link
        href="/grammar-check"
        className="text-sm font-medium hover:underline"
      >
        Grammar Check
      </Link>
    </nav>
  );
}