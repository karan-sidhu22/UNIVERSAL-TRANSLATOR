"use client";

import { useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [inputText, setInputText] = useState("");
  const [targetLang, setTargetLang] = useState("es"); // default Spanish
  const [outputText, setOutputText] = useState("");

  const handleTranslate = async () => {
    if (!inputText) return;

    try {
      const res = await axios.post("/api/translate", {
        text: inputText,
        targetLang,
      });
      setOutputText(res.data.translatedText);
    } catch (err) {
      console.error(err);
      setOutputText("❌ Translation failed.");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1>🌍 Universal Translator</h1>
      <textarea
        rows="4"
        style={{ width: "100%", marginBottom: "10px" }}
        placeholder="Type something to translate..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <br />
      <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="hi">Hindi</option>
        <option value="zh">Chinese</option>
      </select>
      <br />
      <button onClick={handleTranslate} style={{ marginTop: "10px" }}>
        Translate
      </button>

      {outputText && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h3>Translated:</h3>
          <p>{outputText}</p>
        </div>
      )}
    </div>
  );
}
