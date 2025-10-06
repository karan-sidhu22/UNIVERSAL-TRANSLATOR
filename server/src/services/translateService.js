import axios from "axios";

export async function translateText(text, sourceLang = "en", targetLang = "es") {
  try {
    const response = await axios.get("https://api.mymemory.translated.net/get", {
      params: { q: text, langpair: `${sourceLang}|${targetLang}` },
    });

    return response.data.responseData.translatedText;
  } catch (err) {
    console.error("Translation API error:", err.message);
    throw new Error("Translation API failed.");
  }
}
