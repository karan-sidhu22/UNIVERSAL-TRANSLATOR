"use client";

import React, { useState } from "react";
import axios from "axios";
import LanguageSelector from "../client/src/components/LanguageSelector";


export default function Page() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/translate", {
        text,
        sourceLang,
        targetLang,
      });
      setTranslatedText(res.data.translatedText);
    } catch {
      setTranslatedText("❌ Translation failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">🌍 Universal Translator</h1>

      <div className="w-full max-w-2xl bg-white text-gray-900 rounded-2xl shadow-lg p-6">
        <LanguageSelector
          sourceLang={sourceLang}
          targetLang={targetLang}
          setSourceLang={setSourceLang}
          setTargetLang={setTargetLang}
        />

        <textarea
          className="w-full mt-4 p-3 border rounded-lg"
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your text here..."
        ></textarea>

        <button
          onClick={handleTranslate}
          className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700"
        >
          {loading ? "Translating..." : "Translate"}
        </button>

        {translatedText && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold">Translated:</p>
            <p>{translatedText}</p>
          </div>
        )}
      </div>
    </div>
  );
}
