import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const res = await fetch(`https://alkitab-ecru.vercel.app/api/daily-verse`);

    if (!res.ok) {
      throw new Error(`Daily verse API failed: ${res.status}`);
    }

    const data = await res.json();

    if (!data || !data.success || !data.data?.text) {
      return NextResponse.json(
        { error: "Invalid daily verse data" },
        { status: 400 }
      );
    }

    const text = adjustPronunciation(data.data.text);

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Invalid verse text" },
        { status: 400 }
      );
    }

    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
      text
    )}&tl=id&client=tw-ob`;

    const audioResponse = await fetch(ttsUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Referer: "https://translate.google.com/",
        Accept: "audio/webm,audio/ogg,audio/wav,audio/*;q=0.9,*/*;q=0.8",
      },
    });

    if (!audioResponse.ok) {
      throw new Error(`TTS request failed: ${audioResponse.status}`);
    }

    const audioBuffer = await audioResponse.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
        "Content-Length": audioBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("TTS Error:", error);

    return NextResponse.json(
      {
        error: "TTS service unavailable",
        details: error instanceof Error ? error.message : "Unknown error",
        fallback: "Use client-side Web Speech API",
      },
      { status: 503 }
    );
  }
}

function adjustPronunciation(text: string): string {
  if (!text || typeof text !== "string") return "";

  return text
    .replace(/\bAllah\b/gi, "A llah")
    .replace(/\bYesus\b/gi, "Ye sus")
    .replace(/\bTuhan\b/gi, "Tu han")
    .trim();
}
