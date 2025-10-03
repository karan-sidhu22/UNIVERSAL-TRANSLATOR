import { Router } from "express";
import { translateText } from "../services/translateService.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { text, source, target } = req.body;
    if (!text) return res.status(400).json({ error: "Missing text" });
    const translatedText = await translateText(text, source, target);
    res.json({ translatedText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Translation failed" });
  }
});

export default router;
