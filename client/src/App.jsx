import React, { useState } from "react";
import LanguageSelector from "./components/LanguageSelector";
import LANGUAGES from "./utils/languages";

export default function App() {
  const [source, setSource] = useState("auto");
  const [target, setTarget] = useState("en");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  async function handleTranslate() {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, source, target })
    });
    const data = await res.json();
    setResult(data.translatedText || "");
  }

  return (
    <div style={{ padding: 24, maxWidth: 700, margin: "0 auto" }}>
      <h1>Universal Translator</h1>

      <div style={{ display: "flex", gap: 12 }}>
        <LanguageSelector value={source} onChange={setSource} label="From" />
        <LanguageSelector value={target} onChange={setTarget} label="To" />
      </div>

      <textarea
        rows="5"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here..."
        style={{ width: "100%", marginTop: 12 }}
      />

      <button onClick={handleTranslate} style={{ marginTop: 12 }}>
        Translate
      </button>

      <div style={{ marginTop: 20, padding: 12, border: "1px solid #ccc" }}>
        <strong>Result:</strong>
        <p>{result}</p>
      </div>
    </div>
  );
}
