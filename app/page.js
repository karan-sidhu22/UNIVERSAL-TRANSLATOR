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

  // ✅ Load history safely
  useEffect(() => {
    setMounted(true);
    try {
      const saved = JSON.parse(localStorage.getItem("ut_history") || "[]");
      setHistory(saved);
    } catch {
      setHistory([]);
    }
  }, []);

  // ✅ Save history on updates
  useEffect(() => {
    if (mounted) localStorage.setItem("ut_history", JSON.stringify(history));
  }, [history, mounted]);

  // 🌍 Translation
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
        setHistory((prev) => [record, ...prev].slice(0, 100));
      } else {
        setStatus("No translation returned.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Translation failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Swap
  const handleSwap = () => {
    setSourceLang(targetLang === "auto" ? "auto" : targetLang);
    setTargetLang(sourceLang === "auto" ? "en" : sourceLang);
    setInputText(translatedText || "");
    setTranslatedText("");
  };

  // 🧠 Select from history
  const handleSelectHistory = (h) => {
    setInputText(h.input);
    setTargetLang(h.target);
    setSourceLang(h.source === "auto" ? "auto" : h.source);
  };

  // 🗑 Clear history
  const handleClearHistory = () => {
    if (confirm("Clear all translation history?")) {
      setHistory([]);
      localStorage.removeItem("ut_history");
    }
  };

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen text-white overflow-hidden font-inter selection:bg-accent/40 selection:text-white">
      {/* ✨ Background */}
      <div className="absolute inset-0 bg-animated-gradient animate-gradientShift"></div>
      <ParticlesBackground />
      <Navbar />

      {/* 🌌 Ambient light blobs */}
      <div className="absolute top-[-6rem] left-[-6rem] w-96 h-96 bg-accent/25 blur-[160px] rounded-full animate-float"></div>
      <div className="absolute bottom-[-10rem] right-[-8rem] w-[34rem] h-[34rem] bg-accent2/25 blur-[200px] rounded-full animate-float"></div>

      {/* 🧩 Main Content */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-24 grid grid-cols-1 lg:grid-cols-3 gap-10"
      >
        {/* 🧠 Translator Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 backdrop-blur-2xl bg-white/[0.05] border border-white/10 
                     rounded-3xl p-8 shadow-[0_0_60px_rgba(139,92,246,0.15)] 
                     hover:shadow-[0_0_80px_rgba(139,92,246,0.25)] transition-all duration-500"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent2 to-accent bg-clip-text text-transparent">
              Universal Translator
            </h1>
            <p className="text-slate-400 text-sm mt-2">
              Translate effortlessly with AI-enhanced context, tone, and precision.
            </p>
          </div>

          {/* 🌍 Language Selectors */}
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
            <div className="hidden lg:flex items-end text-xs text-slate-400 italic">
              💡 Tip: Use Auto-detect for convenience.
            </div>
          </div>

          {/* 🧾 Translator Interface */}
          <TranslatorCard
            inputText={inputText}
            setInputText={setInputText}
            translatedText={translatedText}
            loading={loading}
            onTranslate={handleTranslate}
            onSwap={handleSwap}
          >
            {/* ⚙️ Quick Actions */}
            <div className="mt-6 border-t border-white/10 pt-4">
              <div className="mb-3 text-slate-400 text-xs uppercase tracking-wide">
                Quick Actions
              </div>
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setInputText("Hello, how are you?")}
                  className="px-4 py-2 text-sm rounded-md font-medium
                             bg-gradient-to-r from-accent2 to-accent text-white
                             shadow-[0_0_20px_rgba(139,92,246,0.4)]
                             hover:shadow-[0_0_25px_rgba(139,92,246,0.6)]
                             transition-all duration-300"
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
                  className="px-4 py-2 text-sm rounded-md font-medium
                             bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 text-slate-200
                             hover:text-accent2 transition-all duration-300 backdrop-blur-md"
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

        {/* 🕹️ History Panel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="backdrop-blur-2xl bg-white/[0.05] border border-white/10 rounded-3xl p-6
                     shadow-[0_0_40px_rgba(139,92,246,0.1)]"
        >
          <HistoryPanel
            history={history}
            onSelect={handleSelectHistory}
            onClear={handleClearHistory}
          />
        </motion.div>
      </motion.section>

      {/* 📱 Mobile Floating Translate Button */}
      <motion.button
        onClick={handleTranslate}
        whileTap={{ scale: 0.95 }}
        className="lg:hidden fixed bottom-8 right-8 z-50 px-6 py-3 rounded-full
                   bg-gradient-to-r from-accent2 to-accent text-white font-semibold
                   shadow-[0_0_30px_rgba(139,92,246,0.4)]
                   hover:shadow-[0_0_40px_rgba(139,92,246,0.6)]
                   transition-all duration-300"
      >
        {loading ? "Translating..." : "Translate"}
      </motion.button>
    </main>
  );
}
