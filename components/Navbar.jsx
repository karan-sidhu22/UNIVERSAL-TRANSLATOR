"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg/70 backdrop-blur-lg border-b border-white/10 shadow-[0_0_40px_rgba(139,92,246,0.15)]"
          : "bg-transparent backdrop-blur-none border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 md:px-8 py-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-accent2 to-accent bg-clip-text text-transparent group-hover:from-accent group-hover:to-accent2 transition-all"
          >
            UT<span className="opacity-80">.</span>
          </motion.h1>
          <p className="hidden sm:block text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
            Universal Translator
          </p>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="relative group text-slate-300 hover:text-white transition-colors"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-accent to-accent2 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu (optional simple button) */}
        <button className="md:hidden flex flex-col gap-1.5 focus:outline-none group">
          <span className="w-6 h-0.5 bg-slate-300 group-hover:bg-accent transition-all"></span>
          <span className="w-6 h-0.5 bg-slate-300 group-hover:bg-accent2 transition-all"></span>
          <span className="w-6 h-0.5 bg-slate-300 group-hover:bg-accent transition-all"></span>
        </button>
      </nav>
    </motion.header>
  );
}
