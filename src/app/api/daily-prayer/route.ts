import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface DailyPrayData {
  prayer: string;
  date: string;
  generated_at: string;
}

interface ApiResponse {
  status_code: number;
  success: boolean;
  message: string;
  data?: DailyPrayData;
  error?: string;
  meta?: {
    cached: boolean;
    seed: string;
  };
}

const prayCache = new Map<string, DailyPrayData>();

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY || "");

function getTodayWIBDateKey(): string {
  const now = new Date();
  const wibTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);

  const year = wibTime.getUTCFullYear();
  const month = String(wibTime.getUTCMonth() + 1).padStart(2, "0");
  const day = String(wibTime.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}-06:00:00-WIB`;
}

function generateDeterministicSeed(dateKey: string): string {
  return crypto.createHash("md5").update(dateKey).digest("hex");
}

async function generatePrayWithAI(
  seed: string,
  dateKey: string
): Promise<DailyPrayData> {
  const prompt = `Kamu adalah seorang pendeta yang berpengalaman dan memahami Alkitab dengan baik. 

Buatkan satu doa untuk memulai, menjalankan atau menghadapi hari ini pada tanggal ${
    dateKey.split("-06:00:00-WIB")[0]
  } dengan seed: ${seed.substring(0, 8)}.

Syarat:
1. Berikan teks ayat dalam bahasa Indonesia

Format response dalam JSON:
{
  "prayer": "Doa nya disini",
}

Pastikan doa yang diberikan dapat bermanfaat bagi pembaca. jangan memasukan tanggal kedalam nya`;

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 500,
    },
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const aiResponse = response.text();

  if (!aiResponse) {
    throw new Error("No response from AI");
  }

  const cleanedResponse = aiResponse.replace(/```json\n?|\n?```/g, "").trim();
  const parsedResponse = JSON.parse(cleanedResponse);

  return {
    prayer: parsedResponse.prayer,
    date: dateKey.split("-06:00:00-WIB")[0],
    generated_at: new Date().toISOString(),
  };
}

function getFallbackVerse(dateKey: string): DailyPrayData {
  return {
    prayer: "Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan.",
    date: dateKey.split("-06:00:00-WIB")[0],
    generated_at: new Date().toISOString(),
  };
}

export async function GET(): Promise<NextResponse<ApiResponse>> {
  try {
    if (!API_KEY) {
      return NextResponse.json<ApiResponse>(
        {
          status_code: 500,
          success: false,
          message: "Service configuration error",
          error: "Gemini API key not configured",
        },
        { status: 500 }
      );
    }

    const dateKey = getTodayWIBDateKey();

    if (prayCache.has(dateKey)) {
      const cachedPray = prayCache.get(dateKey)!;
      return NextResponse.json<ApiResponse>({
        status_code: 200,
        success: true,
        message: "Daily pray retrieved successfully",
        data: cachedPray,
        meta: {
          cached: true,
          seed: generateDeterministicSeed(dateKey).substring(0, 8),
        },
      });
    }

    const seed = generateDeterministicSeed(dateKey);
    let pray: DailyPrayData;

    try {
      pray = await generatePrayWithAI(seed, dateKey);
    } catch (error) {
      console.error("AI generation failed, using fallback:", error);
      pray = getFallbackVerse(dateKey);
    }

    prayCache.set(dateKey, pray);

    if (prayCache.size > 7) {
      const oldestKey = prayCache.keys().next().value;
      if (typeof oldestKey === "string") {
        prayCache.delete(oldestKey);
      }
    }

    return NextResponse.json<ApiResponse>({
      status_code: 200,
      success: true,
      message: "Daily verse generated successfully",
      data: pray,
      meta: {
        cached: false,
        seed: seed.substring(0, 8),
      },
    });
  } catch (error) {
    console.error("Daily verse API error:", error);

    return NextResponse.json<ApiResponse>(
      {
        status_code: 500,
        success: false,
        message: "Internal server error",
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    if (!API_KEY) {
      return NextResponse.json<ApiResponse>(
        {
          status_code: 500,
          success: false,
          message: "Service configuration error",
          error: "Gemini API key not configured",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { forceRefresh } = body;

    if (!forceRefresh) {
      return NextResponse.json<ApiResponse>(
        {
          status_code: 400,
          success: false,
          message: "Bad request",
          error: "forceRefresh parameter is required",
        },
        { status: 400 }
      );
    }

    const dateKey = getTodayWIBDateKey();
    prayCache.delete(dateKey);

    const seed = generateDeterministicSeed(dateKey);
    let verse: DailyPrayData;

    try {
      verse = await generatePrayWithAI(seed, dateKey);
    } catch (error) {
      console.error("AI generation failed, using fallback:", error);
      verse = getFallbackVerse(dateKey);
    }

    prayCache.set(dateKey, verse);

    return NextResponse.json<ApiResponse>({
      status_code: 200,
      success: true,
      message: "Daily Prayer refreshed successfully",
      data: verse,
      meta: {
        cached: false,
        seed: seed.substring(0, 8),
      },
    });
  } catch (error) {
    console.error("Daily verse POST error:", error);

    return NextResponse.json<ApiResponse>(
      {
        status_code: 500,
        success: false,
        message: "Internal server error",
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
