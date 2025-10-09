"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import LanguageSelector from "@/components/LanguageSelector";
import TranslatorCard from "@/components/TranslatorCard";
import HistoryPanel from "@/components/HistoryPanel";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("en");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [history, setHistory] = useState([]);

  // ✅ Handle hydration safely
  useEffect(() => {
    setMounted(true);
    try {
      const saved = JSON.parse(localStorage.getItem("ut_history") || "[]");
      setHistory(saved);
    } catch {
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("ut_history", JSON.stringify(history));
  }, [history, mounted]);

  // 🌍 Translate handler
  const handleTranslate = async () => {
    if (!inputText.trim()) return setStatus("Type something to translate.");

    setLoading(true);
    setStatus("");
    setTranslatedText("");

    try {
      const res = await axios.post("/api/translate", {
        text: inputText,
        sourceLang,
        targetLang,
      });

      if (res.data?.translatedText) {
        setTranslatedText(res.data.translatedText);
        const record = {
          id: Date.now(),
          input: inputText,
          output: res.data.translatedText,
          source:
            sourceLang === "auto"
              ? res.data.detectedSource || "auto"
              : sourceLang,
          target: targetLang,
          when: new Date().toISOString(),
        };
        setHistory((prev) => [record, ...prev].slice(0, 200));
      } else setStatus("No translation returned.");
    } catch (err) {
      console.error(err);
      setStatus("Translation failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Swap languages
  const handleSwap = () => {
    setSourceLang(targetLang === "auto" ? "auto" : targetLang);
    setTargetLang(sourceLang === "auto" ? "en" : sourceLang);
    setInputText(translatedText || "");
    setTranslatedText("");
  };

  // 📜 Select from history
  const handleSelectHistory = (h) => {
    setInputText(h.input);
    setTargetLang(h.target);
    setSourceLang(h.source === "auto" ? "auto" : h.source);
  };

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* ✨ Animated background gradient */}
      <div className="absolute inset-0 bg-animated-gradient animate-gradientShift"></div>
      <ParticlesBackground />
      <Navbar />

      {/* 🟣 Ambient lights */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-accent/25 blur-[120px] rounded-full animate-float"></div>
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-accent2/25 blur-[160px] rounded-full animate-float"></div>

      {/* 🧠 Main grid */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-24 grid grid-cols-1 lg:grid-cols-3 gap-10"
      >
        {/* LEFT - Translator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 backdrop-blur-xl bg-white/[0.05] border border-white/10 rounded-3xl p-8 shadow-[0_0_40px_rgba(139,92,246,0.1)] hover:shadow-[0_0_60px_rgba(139,92,246,0.25)] transition-all duration-500"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-accent2 to-accent bg-clip-text text-transparent">
              Universal Translator
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Translate text instantly with context, tone, and precision.
            </p>
          </div>

          {/* Language Selectors */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <LanguageSelector
              value={sourceLang}
              onChange={setSourceLang}
              label="From"
            />
            <LanguageSelector
              value={targetLang}
              onChange={setTargetLang}
              label="To"
            />
            <div className="hidden lg:flex items-end text-xs text-slate-400">
              💡 Tip: Use Auto-detect for convenience.
            </div>
          </div>

          {/* Translator Core */}
          <TranslatorCard
            inputText={inputText}
            setInputText={setInputText}
            translatedText={translatedText}
            loading={loading}
            onTranslate={handleTranslate}
            sourceLang={sourceLang}
            targetLang={targetLang}
            onSwap={handleSwap}
          >
            {/* Quick Actions */}
            <div className="mt-4 border-t border-white/10 pt-4">
              <div className="mb-2 text-slate-400 text-xs uppercase tracking-wide">
                Quick Actions
              </div>
              <div className="flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setInputText("Hello, how are you?")}
                  className="w-full text-left px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-all text-slate-200"
                >
                  Example
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setInputText("");
                    setTranslatedText("");
                    setStatus("");
                  }}
                  className="w-full text-left px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-all text-slate-200"
                >
                  Clear
                </motion.button>
              </div>
            </div>
          </TranslatorCard>

          {status && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-sm text-rose-400"
            >
              {status}
            </motion.div>
          )}
        </motion.div>

        {/* RIGHT - History Panel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="backdrop-blur-xl bg-white/[0.05] border border-white/10 rounded-3xl p-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
        >
          <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
            History
          </h2>
          <div className="max-h-[500px] overflow-y-auto pr-1">
            <HistoryPanel history={history} onSelect={handleSelectHistory} />
          </div>
        </motion.div>
      </motion.section>

      {/* 📱 Floating Translate Button (Mobile only) */}
      <motion.button
        onClick={handleTranslate}
        whileTap={{ scale: 0.95 }}
        className="lg:hidden fixed bottom-8 right-8 z-50 px-6 py-3 rounded-full bg-gradient-to-r from-accent to-accent2 shadow-lg shadow-accent/30 hover:shadow-accent2/40 transition-all text-white font-semibold"
      >
        {loading ? "Translating..." : "Translate"}
      </motion.button>
    </main>
  );
}
