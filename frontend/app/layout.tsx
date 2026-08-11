import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PersonaMail | Relationship-aware communication",
  description: "Compose thoughtful messages for every relationship.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/logo-icon-dark-transparent.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo-icon-dark-transparent.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col justify-between bg-slate-50 font-sans text-primary">
        {children}
      </body>
    </html>
  );
}
