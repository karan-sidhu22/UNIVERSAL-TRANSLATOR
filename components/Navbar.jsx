"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-bg/60 backdrop-blur-md border-b border-white/10 shadow-soft">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">
        <h1 className="text-xl font-semibold tracking-wide text-accent">
          UT <span className="text-accent2">Translator</span>
        </h1>
        <div className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-accent2 transition">
            Home
          </Link>
          <Link href="/docs" className="hover:text-accent2 transition">
            Docs
          </Link>
          <Link href="/pricing" className="hover:text-accent2 transition">
            Pricing
          </Link>
        </div>
      </div>
    </nav>
  );
}
