"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";

export default function FuturisticNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs" },
    { label: "AI Translate", href: "/translate" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled
          ? "bg-[rgba(12,12,24,0.8)] backdrop-blur-2xl border-b border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.25)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 md:px-10 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <SparklesIcon className="text-accent2 w-6 h-6" />
          </motion.div>
          <motion.h1
            className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.3 }}
          >
            Universal<span className="opacity-70">.AI</span>
          </motion.h1>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-10 text-sm font-medium">
          {navItems.map((item, idx) => (
            <motion.li
              key={idx}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              className="relative"
            >
              <Link
                href={item.href}
                className="relative text-slate-300 hover:text-white transition-all duration-300"
              >
                {item.label}
                {hovered === idx && (
                  <motion.span
                    layoutId="hover-line"
                    className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Neon Button */}
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow:
              "0 0 15px rgba(168,85,247,0.8), 0 0 30px rgba(34,211,238,0.4)",
          }}
          whileTap={{ scale: 0.97 }}
          className="hidden md:block px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 text-white font-semibold shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all"
        >
          Launch App
        </motion.button>

        {/* Mobile menu button */}
        <div className="md:hidden flex flex-col gap-1 cursor-pointer">
          <span className="w-6 h-0.5 bg-slate-300"></span>
          <span className="w-6 h-0.5 bg-slate-300"></span>
          <span className="w-6 h-0.5 bg-slate-300"></span>
        </div>
      </nav>
    </motion.header>
  );
}
