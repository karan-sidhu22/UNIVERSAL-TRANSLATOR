// app/api/translate/route.js
import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { text, sourceLang, targetLang } = await req.json();

    const prompt = `
    Translate the following text from ${sourceLang} to ${targetLang}.
    Text: "${text}"
    Only return the translated text, nothing else.
    `;

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
    });

    const translatedText = response.output[0].content[0].text;

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error("Translation Error:", error);
    return NextResponse.json(
      { error: "Translation failed" },
      { status: 500 }
    );
  }
}
