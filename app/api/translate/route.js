import axios from "axios";

export async function POST(req) {
  try {
    const body = await req.json();
    const { text, targetLang } = body;

    // Force source language to English for now
    const res = await axios.get("https://api.mymemory.translated.net/get", {
      params: {
        q: text,
        langpair: `en|${targetLang}`,
      },
    });

    const translatedText = res.data.responseData.translatedText;

    return new Response(JSON.stringify({ translatedText }), { status: 200 });
  } catch (err) {
    console.error("Translation API error:", err.message);
    return new Response(JSON.stringify({ error: "Translation failed" }), {
      status: 500,
    });
  }
}
