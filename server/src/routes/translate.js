import express from "express";
import { translateText } from "../services/translateService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { text, sourceLang, targetLang } = req.body;

  if (!text || !targetLang) {
    return res.status(400).json({ error: "Missing text or target language." });
  }

  try {
    const translatedText = await translateText(text, sourceLang, targetLang);
    res.json({ translatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Translation failed." });
  }
});

export default router;
