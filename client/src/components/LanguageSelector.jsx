import React from "react";
import { languages } from "../../../utils/languages";

export default function LanguageSelector({ sourceLang, targetLang, setSourceLang, setTargetLang }) {
  return (
    <div className="flex justify-between gap-4">
      <select
        value={sourceLang}
        onChange={(e) => setSourceLang(e.target.value)}
        className="p-2 border rounded-md"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>

      <select
        value={targetLang}
        onChange={(e) => setTargetLang(e.target.value)}
        className="p-2 border rounded-md"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
