"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 bg-bg/40 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="flex items-center gap-2">
          <h1 className="text-lg md:text-xl font-semibold tracking-tight text-accent">
            UT<span className="text-accent2">.</span>
          </h1>
          <p className="hidden sm:block text-sm text-slate-400">
            Universal Translator
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-accent2 transition-colors">
            Home
          </Link>
          <Link href="/docs" className="hover:text-accent2 transition-colors">
            Docs
          </Link>
          <Link href="/pricing" className="hover:text-accent2 transition-colors">
            Pricing
          </Link>
        </div>
      </nav>
    </header>
  );
}
