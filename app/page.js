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

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setStatus("Type something to translate.");
      return;
    }

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

  const handleSwap = () => {
    setSourceLang(targetLang === "auto" ? "auto" : targetLang);
    setTargetLang(sourceLang === "auto" ? "en" : sourceLang);
    setInputText(translatedText || "");
    setTranslatedText("");
  };

  const handleSelectHistory = (h) => {
    setInputText(h.input);
    setTargetLang(h.target);
    setSourceLang(h.source === "auto" ? "auto" : h.source);
  };

  if (!mounted) return null;

  return (
    <>
      <main className="relative min-h-screen overflow-hidden text-white">
        {/* ✨ Background animations */}
        <div className="absolute inset-0 bg-animated-gradient animate-gradientShift"></div>
        <ParticlesBackground />

        <Navbar />

        {/* 🌈 Glowing background blobs */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-accent/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-accent2/30 rounded-full blur-3xl animate-float"></div>

        {/* 🌐 Page Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-4 gap-6"
        >
          {/* 🗣 Translator Section */}
          <motion.div
            className="lg:col-span-3 backdrop-blur-md bg-card p-6 rounded-2xl border border-white/10 shadow-soft"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Language selectors */}
            <div className="mb-6 grid md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <LanguageSelector
                  value={sourceLang}
                  onChange={setSourceLang}
                  label="From"
                />
              </div>
              <div className="md:col-span-1">
                <LanguageSelector
                  value={targetLang}
                  onChange={setTargetLang}
                  label="To"
                />
              </div>
              <motion.div
                className="md:col-span-1 flex items-end text-xs text-slate-400"
                whileHover={{ scale: 1.05 }}
              >
                💡 Tip: Use Auto Detect for smart recognition.
              </motion.div>
            </div>

            {/* Translator Card */}
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
              <div className="text-slate-300 text-xs mt-4">
                <div className="mb-2 font-semibold tracking-wide uppercase text-slate-400">
                  Quick Actions
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full text-left rounded-md px-3 py-2 mb-2 bg-white/10 hover:bg-white/20 transition-all"
                  onClick={() => setInputText("Hello, how are you?")}
                >
                  Example
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full text-left rounded-md px-3 py-2 bg-white/10 hover:bg-white/20 transition-all"
                  onClick={() => {
                    setInputText("");
                    setTranslatedText("");
                    setStatus("");
                  }}
                >
                  Clear
                </motion.button>
              </div>
            </TranslatorCard>

            {status && (
              <motion.div
                className="mt-4 text-center text-sm text-rose-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {status}
              </motion.div>
            )}
          </motion.div>

          {/* 📚 History Panel */}
          <motion.div
            className="lg:col-span-1 backdrop-blur-md bg-card p-4 rounded-2xl border border-white/10 shadow-soft"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <HistoryPanel history={history} onSelect={handleSelectHistory} />
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}
