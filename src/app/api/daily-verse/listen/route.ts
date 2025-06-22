import { NextRequest, NextResponse } from "next/server";
import googleTTS from "google-tts-api";

export async function GET(request: NextRequest) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(`https://alkitab-ecru.vercel.app/api/daily-verse`, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Daily verse API failed: ${res.status}`);
    }

    const data = await res.json();
    console.log("Daily verse data:", data);

    if (!data || !data.success || !data.data?.text) {
      console.error("Invalid API response:", data);
      return NextResponse.json(
        { error: "Invalid daily verse data" },
        { status: 400 }
      );
    }

    const text = adjustPronunciation(data.data.text);
    if (!text || typeof text !== "string" || text.length > 500) {
      console.error("Invalid text:", text);
      return NextResponse.json(
        { error: "Invalid verse text" },
        { status: 400 }
      );
    }

    let urls;
    try {
      urls = googleTTS.getAllAudioUrls(text, {
        lang: "id",
        slow: false,
        host: "https://translate.google.com",
      });

      if (!urls || urls.length === 0) {
        throw new Error("No TTS URLs generated");
      }

      console.log(`Generated ${urls.length} TTS URLs`);
    } catch (ttsError) {
      console.error("Google TTS error:", ttsError);
      return NextResponse.json(
        { error: "TTS service unavailable" },
        { status: 503 }
      );
    }

    const stream = new ReadableStream({
      async start(controller) {
        try {
          let processedCount = 0;

          for (const item of urls) {
            console.log(
              `Processing TTS URL ${processedCount + 1}/${urls.length}`
            );

            const maxRetries = 3;
            let retryCount = 0;
            let audioRes;

            while (retryCount < maxRetries) {
              try {
                audioRes = await fetch(item.url, {
                  headers: {
                    "User-Agent":
                      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                    Referer: "https://translate.google.com/",
                  },
                  signal: AbortSignal.timeout(5000),
                });

                if (audioRes.ok) break;
                throw new Error(`HTTP ${audioRes.status}`);
              } catch (fetchError) {
                retryCount++;
                console.warn(
                  `Retry ${retryCount}/${maxRetries} for URL ${
                    processedCount + 1
                  }:`,
                  fetchError
                );

                if (retryCount === maxRetries) {
                  throw new Error(
                    `Failed to fetch audio after ${maxRetries} retries: ${fetchError}`
                  );
                }

                await new Promise((resolve) =>
                  setTimeout(resolve, 1000 * retryCount)
                );
              }
            }

            if (!audioRes || !audioRes.body) {
              throw new Error(
                `No audio data received for chunk ${processedCount + 1}`
              );
            }

            const reader = audioRes.body.getReader();
            let chunkCount = 0;

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              if (value && value.length > 0) {
                controller.enqueue(value);
                chunkCount++;
              }
            }

            console.log(
              `Processed ${chunkCount} chunks for URL ${processedCount + 1}`
            );
            processedCount++;
          }

          console.log(`Successfully processed all ${processedCount} TTS URLs`);
          controller.close();
        } catch (error) {
          console.error("Streaming error:", error);
          controller.error(error);
        }
      },
    });

    return new NextResponse(stream, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    });
  } catch (error) {
    console.error("TTS Error:", error);

    return NextResponse.json(
      {
        error: "Failed to generate TTS",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
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
