"use client";
import React, { useState } from "react";
import axios from "axios";
import LanguageSelector from "../client/src/components/LanguageSelector";
import { languages } from "../utils/languages";

export default function Page() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("/api/translate", {
        text,
        sourceLang,
        targetLang,
      });
      setTranslated(res.data.translatedText);
    } catch (err) {
      console.error(err);
      setTranslated("⚠️ Translation failed. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        🌍 Universal Translator
      </h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg space-y-4">
        <LanguageSelector
          sourceLang={sourceLang}
          targetLang={targetLang}
          setSourceLang={setSourceLang}
          setTargetLang={setTargetLang}
        />

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to translate..."
          className="w-full p-3 border rounded-md"
          rows={4}
        />

        <button
          onClick={handleTranslate}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Translating..." : "Translate"}
        </button>

        {translated && (
          <div className="mt-4 p-3 border rounded-md bg-gray-100">
            <strong>Translated Text:</strong>
            <p className="mt-2 text-gray-800">{translated}</p>
          </div>
        )}
      </div>
    </div>
  );
}
