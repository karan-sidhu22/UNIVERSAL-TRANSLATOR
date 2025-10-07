import axios from "axios";
import { NextResponse } from "next/server";
import OpenAI from "openai";

/**
 * Returns { translatedText, detectedSource? }
 * Uses OpenAI if possible (high-quality). Falls back to MyMemory.
 */

async function openaiTranslate(text, sourceLang, targetLang) {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  // Build a clear system prompt to return only the translated text
  const system = `You are a translation assistant. Translate the user's text from ${sourceLang === "auto" ? "the detected source language" : sourceLang} to ${targetLang}. Only return the translated text and nothing else.`;
  try {
    const resp = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        { role: "system", content: system },
        { role: "user", content: text }
      ],
      // temperature: 0
    });
    // Extract plain text
    const out = resp.output?.[0]?.content?.map(c => (c.text ?? c.data?.text)).join("") ?? "";
    return { translatedText: out.trim() };
  } catch (err) {
    console.error("OpenAI error:", err?.message ?? err);
    throw err;
  }
}

async function myMemoryTranslate(text, sourceLang, targetLang) {
  // MyMemory doesn't accept 'auto' source — if auto, try detect via LibreTranslate, otherwise fallback to 'en'
  let detected = sourceLang;
  if (sourceLang === "auto") {
    try {
      const d = await axios.post("https://libretranslate.de/detect", { q: text });
      if (Array.isArray(d.data) && d.data[0] && d.data[0].language) detected = d.data[0].language;
    } catch (e) {
      detected = "en";
    }
  }
  try {
    const res = await axios.get("https://api.mymemory.translated.net/get", {
      params: { q: text, langpair: `${detected}|${targetLang}` }
    });
    const translated = res?.data?.responseData?.translatedText ?? "";
    return { translatedText: translated, detectedSource: detected };
  } catch (err) {
    console.error("MyMemory error:", err?.message ?? err);
    throw err;
  }
}

export async function POST(req) {
  try {
    const { text, sourceLang = "auto", targetLang } = await req.json();

    if (!text || !targetLang) {
      return NextResponse.json({ error: "Missing text or targetLang" }, { status: 400 });
    }

    // Try OpenAI if API key is present
    if (process.env.OPENAI_API_KEY) {
      try {
        const r = await openaiTranslate(text, sourceLang, targetLang);
        return NextResponse.json({ translatedText: r.translatedText });
      } catch (e) {
        // If OpenAI fails, log and continue to fallback
        console.warn("OpenAI failed, falling back to MyMemory:", e?.message ?? e);
      }
    }

    // Fallback to MyMemory (free)
    const mem = await myMemoryTranslate(text, sourceLang, targetLang);
    return NextResponse.json({ translatedText: mem.translatedText, detectedSource: mem.detectedSource });
  } catch (err) {
    console.error("Translation endpoint error:", err?.message ?? err);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
