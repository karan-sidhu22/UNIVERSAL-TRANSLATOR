import React from "react";
import LANGUAGES from "../utils/languages";

export default function LanguageSelector({ value, onChange, label }) {
  return (
    <div style={{ flex: 1 }}>
      <label>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
