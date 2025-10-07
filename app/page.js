"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import LanguageSelector from "@/components/LanguageSelector";
import TranslatorCard from "@/components/TranslatorCard";
import HistoryPanel from "@/components/HistoryPanel";
import { languages } from "@/utils/languages";

export default function HomePage() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("en");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ut_history") || "[]"); } catch { return []; }
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    localStorage.setItem("ut_history", JSON.stringify(history));
  }, [history]);

  const handleTranslate = async () => {
    if (!inputText.trim()) { setStatus("Type something to translate."); return; }
    setLoading(true);
    setStatus("");
    setTranslatedText("");

    try {
      const res = await axios.post("/api/translate", {
        text: inputText,
        sourceLang,
        targetLang
      }, { timeout: 20000 });

      if (res.data?.translatedText) {
        setTranslatedText(res.data.translatedText);
        const record = {
          id: Date.now(),
          input: inputText,
          output: res.data.translatedText,
          source: sourceLang === "auto" ? res.data.detectedSource || "auto" : sourceLang,
          target: targetLang,
          when: new Date().toISOString()
        };
        setHistory((s) => [record, ...s].slice(0, 200));
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
    // swap only languages (keep auto logic)
    setSourceLang(targetLang === "auto" ? "auto" : targetLang);
    setTargetLang(sourceLang === "auto" ? "en" : sourceLang);
    // swap texts
    setInputText(translatedText || "");
    setTranslatedText("");
  };

  const handleSelectHistory = (h) => {
    setInputText(h.input);
    setTargetLang(h.target);
    setSourceLang(h.source === "auto" ? "auto" : h.source);
  };

  return (
    <>
      <Navbar />
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="mb-6 grid md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <LanguageSelector value={sourceLang} onChange={setSourceLang} label="From" />
              </div>
              <div className="md:col-span-1">
                <LanguageSelector value={targetLang} onChange={setTargetLang} label="To" />
              </div>
              <div className="md:col-span-1 flex items-end">
                <div className="text-xs text-slate-400">Pro tip: use Auto detect on the left for convenience.</div>
              </div>
            </div>

            <TranslatorCard
              inputText={inputText}
              setInputText={setInputText}
              translatedText={translatedText}
              loading={loading}
              onTranslate={handleTranslate}
              sourceLang={sourceLang}
              setSourceLang={setSourceLang}
              targetLang={targetLang}
              setTargetLang={setTargetLang}
              onSwap={handleSwap}
            >
              <div className="text-slate-300 text-xs">
                <div className="mb-2">Quick Actions</div>
                <button className="w-full text-left rounded-md px-2 py-1 mb-2 bg-white/5" onClick={() => setInputText("Hello, how are you?")}>Example</button>
                <button className="w-full text-left rounded-md px-2 py-1 bg-white/5" onClick={() => { setInputText(""); setTranslatedText(""); setStatus(""); }}>Clear</button>
              </div>
            </TranslatorCard>

            {status && <div className="mt-4 max-w-4xl mx-auto text-center text-sm text-rose-400">{status}</div>}
          </div>

          <div className="lg:col-span-1">
            <HistoryPanel history={history} onSelect={handleSelectHistory} />
          </div>
        </div>
      </main>
    </>
  );
}
